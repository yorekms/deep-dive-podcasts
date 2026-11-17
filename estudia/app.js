(function () {
  'use strict';

  var LS_SUBJECTS = 'estudia_subjects_v1';
  var LS_DECKS = 'estudia_decks_v1';
  var LS_STATS = 'estudia_stats_v1';
  var DECKS_BASE = new URL('../hub/estudia-decks/', location.href).href;
  var RESONANCE_BASE = new URL('../resonance/', location.href).href;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function stripAccents(str) {
    return String(str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function normAnswer(str, ignoreAccents) {
    var s = String(str || '').toLowerCase().trim();
    if (ignoreAccents) s = stripAccents(s);
    return s.replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  }

  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  var state = {
    subjects: [],
    decks: [],
    stats: { totalReviewed: 0, currentStreak: 0, lastActiveDate: '', quizHistory: [] },
    selectedSubjectId: 'all',
    searchQuery: '',
    view: 'home', // 'home' | 'study'
    activeDeckId: null,
    studyMode: 'flashcards', // 'flashcards' | 'quiz' | 'write' | 'match' | 'cards'
    starredOnly: false,
    fcIndex: 0,
    fcFlipped: false,
    // Quiz state
    quizItems: [],
    quizIdx: 0,
    quizPicked: null,
    quizScore: 0,
    quizMissedIds: [],
    quizFinished: false,
    // Write state
    writeIdx: 0,
    writeInput: '',
    writeIgnoreAccents: true,
    writeFeedback: null,
    // Match state
    matchTiles: [],
    matchSelected: null,
    matchMismatchIds: [],
    matchStartMs: 0,
    matchDoneSec: null,
    // Modals
    modal: null, // 'podcast-library' | 'add-card' | 'paste-list' | 'new-deck' | 'mobile-qr'
    manifest: null,
    hubCache: {},
    libSelectedHub: 'pharmacology',
    libSearch: '',
    libLoading: false,
    bannerMsg: ''
  };

  function loadStorage() {
    var starter = window.ESTUDIA_STARTER_DATA || { subjects: [], decks: [] };
    try {
      var rawS = localStorage.getItem(LS_SUBJECTS);
      var rawD = localStorage.getItem(LS_DECKS);
      var rawSt = localStorage.getItem(LS_STATS);
      state.subjects = rawS ? JSON.parse(rawS) : starter.subjects.slice();
      state.decks = rawD ? JSON.parse(rawD) : JSON.parse(JSON.stringify(starter.decks));
      if (rawSt) state.stats = Object.assign(state.stats, JSON.parse(rawSt));
    } catch (e) {
      state.subjects = starter.subjects.slice();
      state.decks = JSON.parse(JSON.stringify(starter.decks));
    }
    if (!state.subjects.length) state.subjects = starter.subjects.slice();
    if (!state.decks.length) state.decks = JSON.parse(JSON.stringify(starter.decks));
  }

  function saveStorage() {
    try {
      localStorage.setItem(LS_SUBJECTS, JSON.stringify(state.subjects));
      localStorage.setItem(LS_DECKS, JSON.stringify(state.decks));
      localStorage.setItem(LS_STATS, JSON.stringify(state.stats));
    } catch (e) {}
  }

  function bumpReviewStats() {
    var td = todayISO();
    state.stats.totalReviewed = (state.stats.totalReviewed || 0) + 1;
    if (state.stats.lastActiveDate !== td) {
      var yest = new Date(Date.now() - 86400000);
      var yISO = yest.getFullYear() + '-' + String(yest.getMonth() + 1).padStart(2, '0') + '-' + String(yest.getDate()).padStart(2, '0');
      state.stats.currentStreak = (state.stats.lastActiveDate === yISO) ? ((state.stats.currentStreak || 0) + 1) : 1;
      state.stats.lastActiveDate = td;
    }
    saveStorage();
  }

  function speakText(text, langCode, rate) {
    if (!('speechSynthesis' in window) || !text) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text).replace(/\[[^\]]+\]\s*/g, ''));
      u.lang = langCode || 'en-US';
      u.rate = rate || 1.0;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function getActiveDeck() {
    return state.decks.find(function (d) { return d.id === state.activeDeckId; }) || null;
  }

  function getActiveCards(deck) {
    if (!deck) return [];
    var list = deck.cards || [];
    if (state.starredOnly) {
      var st = list.filter(function (c) { return c.isStarred; });
      if (st.length) return st;
    }
    return list;
  }

  function getSubjectForDeck(deck) {
    if (!deck) return null;
    return state.subjects.find(function (s) { return s.id === deck.subjectId; }) || null;
  }

  function ensurePodcastSubject(hubObj) {
    var sid = 'subj-dd-' + hubObj.slug;
    var existing = state.subjects.find(function (s) { return s.id === sid; });
    if (!existing) {
      existing = {
        id: sid,
        name: hubObj.title,
        icon: hubObj.icon || '🎧',
        color: hubObj.accent || '#38BDF8',
        description: 'Transcript-derived Q&A flashcards & multiple-choice questions from ' + hubObj.title + '.',
        languageCode: 'en-US'
      };
      state.subjects.push(existing);
    }
    return existing;
  }

  function importEpisodeIntoEstudia(hubData, epId, openImmediately) {
    var ep = hubData.episodes && hubData.episodes[epId];
    if (!ep) return null;
    var subj = ensurePodcastSubject(hubData);
    var deckId = 'dd-ep-' + epId;
    var existingIdx = state.decks.findIndex(function (d) { return d.id === deckId; });
    var prevMastery = {};
    if (existingIdx !== -1) {
      (state.decks[existingIdx].cards || []).forEach(function (c) {
        prevMastery[c.id] = {
          mastery: c.mastery || 0,
          timesReviewed: c.timesReviewed || 0,
          timesCorrect: c.timesCorrect || 0,
          isStarred: !!c.isStarred
        };
      });
    }
    var mappedCards = (ep.cards || []).map(function (c) {
      var pm = prevMastery[c.id] || {};
      return {
        id: c.id,
        deckId: deckId,
        front: c.front,
        back: c.back,
        example: c.timestampLabel ? ('Discussed @ ' + c.timestampLabel + ' in "' + ep.title + '"') : '',
        notes: c.explanation || '',
        options: c.options || null,
        correctIndex: typeof c.correctIndex === 'number' ? c.correctIndex : null,
        episodeId: epId,
        hubSlug: hubData.slug,
        carrdUrl: hubData.carrdUrl,
        timestampSec: c.timestampSec != null ? c.timestampSec : null,
        timestampLabel: c.timestampLabel || null,
        mastery: pm.mastery || 0,
        timesReviewed: pm.timesReviewed || 0,
        timesCorrect: pm.timesCorrect || 0,
        isStarred: !!pm.isStarred
      };
    });

    var deckObj = {
      id: deckId,
      subjectId: subj.id,
      title: (ep.ep ? ('Ep ' + ep.ep + ': ') : '') + ep.title,
      description: hubData.title + ' • ' + (ep.section || 'Deep Dive') + ' (' + mappedCards.length + ' transcript Q&A cards)',
      createdAt: Date.now(),
      tags: ['Deep Dive', hubData.slug, ep.section || 'Podcast'],
      hubSlug: hubData.slug,
      carrdUrl: hubData.carrdUrl,
      episodeId: epId,
      cards: mappedCards
    };

    if (existingIdx !== -1) state.decks[existingIdx] = deckObj;
    else state.decks.unshift(deckObj);
    saveStorage();

    if (openImmediately) {
      openDeck(deckObj.id, 'flashcards');
    }
    return deckObj;
  }

  function importSectionIntoEstudia(hubData, secIdx, openImmediately) {
    var sec = (hubData.sections || [])[secIdx];
    if (!sec) return null;
    var subj = ensurePodcastSubject(hubData);
    var deckId = 'dd-sec-' + hubData.slug + '-' + secIdx;
    var cards = [];
    (sec.episodeIds || []).forEach(function (epId) {
      var ep = hubData.episodes && hubData.episodes[epId];
      if (!ep) return;
      // Take top 3 cards per episode so a 40-episode section makes a focused ~120-card mastery deck
      (ep.cards || []).slice(0, 3).forEach(function (c) {
        cards.push({
          id: c.id,
          deckId: deckId,
          front: c.front,
          back: c.back,
          example: c.timestampLabel ? ('Ep: ' + ep.title + ' @ ' + c.timestampLabel) : ('Ep: ' + ep.title),
          notes: c.explanation || '',
          options: c.options || null,
          correctIndex: typeof c.correctIndex === 'number' ? c.correctIndex : null,
          episodeId: epId,
          hubSlug: hubData.slug,
          carrdUrl: hubData.carrdUrl,
          timestampSec: c.timestampSec != null ? c.timestampSec : null,
          timestampLabel: c.timestampLabel || null,
          mastery: 0,
          timesReviewed: 0,
          timesCorrect: 0,
          isStarred: false
        });
      });
    });
    var existingIdx = state.decks.findIndex(function (d) { return d.id === deckId; });
    var deckObj = {
      id: deckId,
      subjectId: subj.id,
      title: hubData.icon + ' ' + sec.pill + ' (' + hubData.title.split(',')[0] + ')',
      description: sec.heading + ' — ' + cards.length + ' curated Q&A cards across ' + (sec.episodeIds || []).length + ' episodes.',
      createdAt: Date.now(),
      tags: ['Deep Dive Section', hubData.slug, sec.pill],
      hubSlug: hubData.slug,
      carrdUrl: hubData.carrdUrl,
      cards: cards
    };
    if (existingIdx !== -1) state.decks[existingIdx] = deckObj;
    else state.decks.unshift(deckObj);
    saveStorage();
    if (openImmediately) openDeck(deckObj.id, 'flashcards');
    return deckObj;
  }

  function fetchManifest() {
    if (state.manifest) return Promise.resolve(state.manifest);
    return fetch(DECKS_BASE + 'manifest.json?v=1')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (m) {
        state.manifest = m;
        return m;
      })
      .catch(function () { return null; });
  }

  function fetchHubDeck(slug) {
    if (state.hubCache[slug]) return Promise.resolve(state.hubCache[slug]);
    state.libLoading = true;
    render();
    return fetch(DECKS_BASE + encodeURIComponent(slug) + '.json?v=1')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (hd) {
        state.libLoading = false;
        if (hd) state.hubCache[slug] = hd;
        render();
        return hd;
      })
      .catch(function () {
        state.libLoading = false;
        render();
        return null;
      });
  }

  function handleDeepLinkParams() {
    var sp = new URLSearchParams(location.search);
    var hub = sp.get('hub') || '';
    var ep = sp.get('ep') || sp.get('episode') || sp.get('driveId') || '';
    var mode = sp.get('mode') || 'flashcards';
    if (!hub && !ep) return;

    fetchManifest().then(function (m) {
      if (!m || !m.hubs) return;
      var slugsToTry = hub ? [hub] : m.hubs.map(function (h) { return h.slug; });
      var tryNext = function (idx) {
        if (idx >= slugsToTry.length) return;
        fetchHubDeck(slugsToTry[idx]).then(function (hd) {
          if (hd && ep && hd.episodes && hd.episodes[ep]) {
            var dk = importEpisodeIntoEstudia(hd, ep, true);
            if (dk && (mode === 'quiz' || mode === 'write' || mode === 'match')) {
              setStudyMode(mode);
            }
          } else if (hd && hub && !ep) {
            state.libSelectedHub = hub;
            state.modal = 'podcast-library';
            render();
          } else {
            tryNext(idx + 1);
          }
        });
      };
      tryNext(0);
    });
  }

  function openDeck(deckId, mode) {
    state.activeDeckId = deckId;
    state.view = 'study';
    state.starredOnly = false;
    state.fcIndex = 0;
    state.fcFlipped = false;
    state.modal = null;
    var dk = getActiveDeck();
    if (dk) {
      dk.lastStudiedAt = Date.now();
      saveStorage();
    }
    setStudyMode(mode || 'flashcards');
  }

  function buildQuizItems(deck, onlyIds) {
    var pool = (deck.cards || []).filter(function (c) {
      return !onlyIds || onlyIds.indexOf(c.id) !== -1;
    });
    var shuffled = pool.slice().sort(function () { return Math.random() - 0.5; });
    var allBacks = (deck.cards || []).map(function (c) { return c.back; });
    return shuffled.map(function (card) {
      if (Array.isArray(card.options) && card.options.length >= 2 && typeof card.correctIndex === 'number') {
        return {
          card: card,
          options: card.options.slice(),
          correctIndex: card.correctIndex,
          explanation: card.notes || card.example || ''
        };
      }
      var distractors = allBacks.filter(function (b) { return b !== card.back; })
        .sort(function () { return Math.random() - 0.5 })
        .slice(0, 3);
      while (distractors.length < 3) {
        distractors.push('Unrelated mechanism / distractor #' + (distractors.length + 1));
      }
      var opts = distractors.slice();
      var ci = Math.floor(Math.random() * (opts.length + 1));
      opts.splice(ci, 0, card.back);
      return {
        card: card,
        options: opts,
        correctIndex: ci,
        explanation: card.notes || card.example || ''
      };
    });
  }

  function initMatchBoard(deck) {
    var cards = (deck.cards || []).slice().sort(function () { return Math.random() - 0.5; }).slice(0, 6);
    var tiles = [];
    cards.forEach(function (c) {
      var fTxt = c.front.length > 110 ? c.front.slice(0, 107) + '...' : c.front;
      var bTxt = c.back.length > 110 ? c.back.slice(0, 107) + '...' : c.back;
      tiles.push({ tileId: c.id + '-f', pairId: c.id, text: fTxt, kind: 'Q', matched: false });
      tiles.push({ tileId: c.id + '-b', pairId: c.id, text: bTxt, kind: 'A', matched: false });
    });
    tiles.sort(function () { return Math.random() - 0.5; });
    state.matchTiles = tiles;
    state.matchSelected = null;
    state.matchMismatchIds = [];
    state.matchStartMs = Date.now();
    state.matchDoneSec = null;
  }

  function setStudyMode(mode, missedCardIds) {
    state.studyMode = mode;
    var deck = getActiveDeck();
    if (!deck) return;
    if (mode === 'flashcards') {
      state.fcIndex = 0;
      state.fcFlipped = false;
    } else if (mode === 'quiz') {
      state.quizItems = buildQuizItems(deck, missedCardIds || null);
      state.quizIdx = 0;
      state.quizPicked = null;
      state.quizScore = 0;
      state.quizMissedIds = [];
      state.quizFinished = false;
    } else if (mode === 'write') {
      state.writeIdx = 0;
      state.writeInput = '';
      state.writeFeedback = null;
    } else if (mode === 'match') {
      initMatchBoard(deck);
    }
    render();
  }

  function episodeAudioHref(card) {
    if (!card || !card.episodeId) return null;
    var tParam = card.timestampSec ? ('&t=' + Math.floor(card.timestampSec)) : '';
    return RESONANCE_BASE + '?view=listen&driveId=' + encodeURIComponent(card.episodeId) + tParam;
  }

  function renderTopBar() {
    var totalCards = state.decks.reduce(function (s, d) { return s + (d.cards ? d.cards.length : 0); }, 0);
    return '<div class="est-topbar">' +
      '<div class="est-brand" data-action="go-home">' +
        '<div class="est-logo">E!</div>' +
        '<div>' +
          '<div style="font-size:17px;font-weight:900;letter-spacing:-0.02em;">Estudia! Study Studio</div>' +
          '<div style="font-size:11.5px;color:var(--text-muted);font-weight:600;">Active Recall &bull; Deep Dive Transcript Q&amp;A &bull; ' + state.decks.length + ' Decks (' + totalCards + ' Cards)</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:7px;align-items:center;">' +
        '<span style="font-size:11.5px;font-weight:800;color:#FBBF24;padding:5px 10px;border-radius:999px;background:rgba(245,158,11,0.14);border:1px solid rgba(245,158,11,0.35);">&#128293; ' + (state.stats.currentStreak || 0) + 'd streak &bull; ' + (state.stats.totalReviewed || 0) + ' reviewed</span>' +
        '<button type="button" class="est-btn est-btn-podcast" data-action="open-podcast-lib">&#127911; Deep Dive Podcast Q&amp;A Library (994 Eps)</button>' +
        '<button type="button" class="est-btn" data-action="open-new-deck">+ New Deck</button>' +
        '<button type="button" class="est-btn" data-action="export-json">&#11015; Backup</button>' +
        '<label class="est-btn" style="margin:0;cursor:pointer;">&#11014; Import<input type="file" id="est-import-file" accept=".json" style="display:none;" /></label>' +
        '<button type="button" class="est-btn" data-action="open-mobile-qr">&#128241; iPhone / Phone</button>' +
      '</div>' +
    '</div>';
  }

  function renderHome() {
    var subPills = '<button type="button" class="est-pill ' + (state.selectedSubjectId === 'all' ? 'active' : '') + '" data-subj="all">All Subjects (' + state.decks.length + ')</button>';
    state.subjects.forEach(function (s) {
      var cnt = state.decks.filter(function (d) { return d.subjectId === s.id; }).length;
      if (!cnt) return;
      subPills += '<button type="button" class="est-pill ' + (state.selectedSubjectId === s.id ? 'active' : '') + '" data-subj="' + esc(s.id) + '">' + esc(s.icon) + ' ' + esc(s.name) + ' (' + cnt + ')</button>';
    });

    var q = state.searchQuery.toLowerCase().trim();
    var filtered = state.decks.filter(function (d) {
      if (state.selectedSubjectId !== 'all' && d.subjectId !== state.selectedSubjectId) return false;
      if (!q) return true;
      var hay = (d.title + ' ' + (d.description || '') + ' ' + (d.tags || []).join(' ')).toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    var cardsHtml = filtered.map(function (d) {
      var subj = getSubjectForDeck(d) || { name: 'Study Deck', icon: '📚', color: '#38BDF8' };
      var total = (d.cards || []).length;
      var mastered = (d.cards || []).filter(function (c) { return (c.mastery || 0) >= 2; }).length;
      var pct = total ? Math.round((mastered / total) * 100) : 0;
      return '<div class="est-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;">' +
        '<div>' +
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">' +
            '<span style="font-size:11px;font-weight:800;color:' + esc(subj.color) + ';background:rgba(15,23,42,0.9);border:1px solid ' + esc(subj.color) + '55;padding:3px 9px;border-radius:999px;">' + esc(subj.icon) + ' ' + esc(subj.name) + '</span>' +
            '<span style="font-size:11px;color:var(--text-muted);font-weight:700;">' + total + ' cards &bull; ' + pct + '% mastered</span>' +
          '</div>' +
          '<h3 style="margin:0 0 6px 0;font-size:16.5px;font-weight:800;line-height:1.3;">' + esc(d.title) + '</h3>' +
          '<p style="margin:0;font-size:12.5px;color:#CBD5E1;line-height:1.45;">' + esc(d.description || '') + '</p>' +
        '</div>' +
        '<div>' +
          '<div style="height:5px;border-radius:999px;background:#1E293B;overflow:hidden;margin-bottom:11px;">' +
            '<div style="height:100%;width:' + pct + '%;background:' + esc(subj.color || '#10B981') + ';"></div>' +
          '</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:6px;">' +
            '<button type="button" class="est-btn est-btn-primary" style="flex:1;justify-content:center;" data-open-deck="' + esc(d.id) + '" data-open-mode="flashcards">Cards</button>' +
            '<button type="button" class="est-btn" data-open-deck="' + esc(d.id) + '" data-open-mode="quiz">Quiz</button>' +
            '<button type="button" class="est-btn" data-open-deck="' + esc(d.id) + '" data-open-mode="write">Write</button>' +
            '<button type="button" class="est-btn" data-open-deck="' + esc(d.id) + '" data-open-mode="match">Match</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="est-card" style="margin-bottom:18px;background:linear-gradient(135deg,rgba(14,116,144,0.28),rgba(15,23,42,0.95));border-color:rgba(56,189,248,0.45);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;">' +
        '<div style="max-width:760px;">' +
          '<div style="font-size:10.5px;font-weight:800;color:#38BDF8;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px;">Synchronized With All 12 Deep Dive Podcast Hubs</div>' +
          '<div style="font-size:19px;font-weight:900;margin-bottom:4px;">7,600+ Verbatim Transcript Study Cards &amp; Multiple-Choice Quizzes</div>' +
          '<div style="font-size:13px;color:#CBD5E1;line-height:1.48;">Load Q&amp;A flashcards and 4-option clinical/mechanistic quizzes extracted directly from any of the 994 Deep Dive episodes—complete with 1-tap timestamp audio jump-backs.</div>' +
        '</div>' +
        '<button type="button" class="est-btn est-btn-primary" style="padding:11px 18px;font-size:13.5px;" data-action="open-podcast-lib">&#127911; Browse Podcast Study Decks &rarr;</button>' +
      '</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;margin-bottom:14px;">' +
        '<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">' + subPills + '</div>' +
        '<input id="est-home-search" class="est-input" style="max-width:270px;" type="search" placeholder="Search your decks..." value="' + esc(state.searchQuery) + '" />' +
      '</div>' +
      '<div class="est-grid">' + (cardsHtml || '<div style="color:var(--text-muted);padding:24px;">No decks match your filter. Click "Deep Dive Podcast Q&A Library" above to add episode or subject decks!</div>') + '</div>';
  }

  function renderStudyView() {
    var deck = getActiveDeck();
    if (!deck) { state.view = 'home'; return renderHome(); }
    var subj = getSubjectForDeck(deck) || { languageCode: 'en-US', color: '#38BDF8', icon: '📚', name: 'Study' };
    var cards = getActiveCards(deck);

    var modeTabs = [
      ['flashcards', '🗂️ Flashcards'],
      ['quiz', '🧠 Quiz Test'],
      ['write', '✍️ Write & Spell'],
      ['match', '⚡ Match Grid'],
      ['cards', '📋 All Cards (' + (deck.cards || []).length + ')']
    ].map(function (pair) {
      return '<button type="button" class="est-pill ' + (state.studyMode === pair[0] ? 'active' : '') + '" data-mode="' + pair[0] + '">' + pair[1] + '</button>';
    }).join('');

    var header = '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px;">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' +
        '<button type="button" class="est-btn" data-action="go-home">&larr; Decks</button>' +
        '<div>' +
          '<div style="font-size:17px;font-weight:900;">' + esc(deck.title) + '</div>' +
          '<div style="font-size:12px;color:var(--text-muted);">' + esc(deck.description || '') + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;">' +
        '<button type="button" class="est-btn" data-action="open-add-card">+ Add Card</button>' +
        '<button type="button" class="est-btn" data-action="open-paste-list">&#128203; Paste List</button>' +
        (deck.carrdUrl ? '<a class="est-btn" href="' + esc(deck.carrdUrl) + '" target="_blank" rel="noopener">Hub &#8599;</a>' : '') +
      '</div>' +
    '</div>' +
    '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;align-items:center;justify-content:space-between;">' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;">' + modeTabs + '</div>' +
      '<button type="button" class="est-pill ' + (state.starredOnly ? 'active' : '') + '" data-action="toggle-starred">&#9733; Starred Only</button>' +
    '</div>';

    if (!cards.length) {
      return header + '<div class="est-card">This deck has no cards yet. Click <strong>+ Add Card</strong> or <strong>Paste List</strong> above!</div>';
    }

    if (state.studyMode === 'flashcards') {
      var idx = Math.max(0, Math.min(state.fcIndex, cards.length - 1));
      var c = cards[idx];
      var epLink = episodeAudioHref(c);
      return header +
        '<div class="fc-scene" data-action="flip-card">' +
          '<div class="fc-card ' + (state.fcFlipped ? 'flipped' : '') + '">' +
            '<div class="fc-face fc-front">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">' +
                '<span style="font-size:11px;font-weight:800;color:#38BDF8;text-transform:uppercase;letter-spacing:0.06em;">Question / Prompt (' + (idx + 1) + ' of ' + cards.length + ')</span>' +
                '<div style="display:flex;gap:6px;" onclick="event.stopPropagation()">' +
                  '<button type="button" class="est-btn" style="padding:4px 9px;font-size:11px;" data-speak="front" data-rate="1">&#128266; 1&times;</button>' +
                  '<button type="button" class="est-btn" style="padding:4px 9px;font-size:11px;" data-speak="front" data-rate="0.75">&#128034; 0.75&times;</button>' +
                  '<button type="button" class="est-btn" style="padding:4px 9px;font-size:12px;color:' + (c.isStarred ? '#FBBF24' : '#94A3B8') + ';" data-star="' + esc(c.id) + '">&#9733;</button>' +
                '</div>' +
              '</div>' +
              '<div style="font-size:21px;font-weight:800;line-height:1.38;margin:18px 0;">' + esc(c.front) + '</div>' +
              '<div style="font-size:11.5px;color:var(--text-muted);display:flex;justify-content:space-between;align-items:center;">' +
                '<span>Tap card or press Space to flip</span>' +
                '<span>Mastery: ' + ['New', 'Learning', 'Good', 'Mastered'][c.mastery || 0] + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="fc-face fc-back">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">' +
                '<span style="font-size:11px;font-weight:800;color:#34D399;text-transform:uppercase;letter-spacing:0.06em;">Answer / Mechanism</span>' +
                '<div style="display:flex;gap:6px;" onclick="event.stopPropagation()">' +
                  '<button type="button" class="est-btn" style="padding:4px 9px;font-size:11px;" data-speak="back" data-rate="1">&#128266; Read</button>' +
                  (epLink ? '<a class="est-btn est-btn-podcast" style="padding:4px 9px;font-size:11px;" href="' + esc(epLink) + '" target="_blank" rel="noopener">&#9654; Hear' + (c.timestampLabel ? (' @ ' + esc(c.timestampLabel)) : ' Episode') + ' &#8599;</a>' : '') +
                '</div>' +
              '</div>' +
              '<div style="font-size:17px;font-weight:600;line-height:1.5;margin:14px 0;color:#ECFDF5;">' + esc(c.back) + '</div>' +
              (c.example ? '<div style="font-size:12px;color:#93C5FD;background:rgba(30,58,138,0.28);padding:8px 11px;border-radius:9px;">' + esc(c.example) + '</div>' : '<div></div>') +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div style="max-width:780px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;">' +
          '<button type="button" class="est-btn" data-action="fc-prev">&larr; Prev</button>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
            '<button type="button" class="est-btn" style="border-color:#EF444488;color:#FCA5A5;" data-grade="0">Again (1)</button>' +
            '<button type="button" class="est-btn" style="border-color:#F59E0B88;color:#FDE68A;" data-grade="2">Good (2)</button>' +
            '<button type="button" class="est-btn" style="border-color:#10B98188;color:#6EE7B7;" data-grade="3">Easy / Mastered (3)</button>' +
          '</div>' +
          '<button type="button" class="est-btn" data-action="fc-next">Next &rarr;</button>' +
        '</div>';
    }

    if (state.studyMode === 'quiz') {
      if (state.quizFinished) {
        var totalQ = state.quizItems.length || 1;
        var pctQ = Math.round((state.quizScore / totalQ) * 100);
        return header +
          '<div class="est-card" style="max-width:680px;margin:0 auto;text-align:center;padding:28px;">' +
            '<div style="font-size:42px;font-weight:900;color:#34D399;margin-bottom:6px;">' + pctQ + '%</div>' +
            '<div style="font-size:17px;font-weight:800;margin-bottom:14px;">Scored ' + state.quizScore + ' / ' + totalQ + ' on ' + esc(deck.title) + '</div>' +
            '<div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">' +
              '<button type="button" class="est-btn est-btn-primary" data-action="quiz-restart">Retake Full Quiz</button>' +
              (state.quizMissedIds.length ? '<button type="button" class="est-btn" style="border-color:#F59E0B;color:#FDE68A;" data-action="quiz-missed">Retry ' + state.quizMissedIds.length + ' Missed Question(s)</button>' : '') +
            '</div>' +
          '</div>';
      }
      var qi = state.quizItems[state.quizIdx];
      if (!qi) return header;
      var qEpLink = episodeAudioHref(qi.card);
      var optsHtml = qi.options.map(function (opt, oi) {
        var cls = 'quiz-opt';
        if (state.quizPicked !== null) {
          if (oi === qi.correctIndex) cls += ' correct';
          else if (oi === state.quizPicked) cls += ' wrong';
        }
        return '<button type="button" class="' + cls + '" data-quiz-opt="' + oi + '" ' + (state.quizPicked !== null ? 'disabled' : '') + '>' +
          '<strong style="color:#38BDF8;margin-right:8px;">' + ['A', 'B', 'C', 'D'][oi] + '.</strong>' + esc(opt) +
        '</button>';
      }).join('');

      return header +
        '<div class="est-card" style="max-width:780px;margin:0 auto;">' +
          '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);font-weight:700;margin-bottom:10px;">' +
            '<span>Question ' + (state.quizIdx + 1) + ' of ' + state.quizItems.length + '</span>' +
            '<span>Score: ' + state.quizScore + '</span>' +
          '</div>' +
          '<div style="font-size:18px;font-weight:800;line-height:1.4;margin-bottom:16px;">' + esc(qi.card.front) + '</div>' +
          optsHtml +
          (state.quizPicked !== null ? (
            '<div style="margin-top:12px;padding:12px 14px;border-radius:12px;background:rgba(15,23,42,0.95);border:1px solid rgba(56,189,248,0.35);font-size:13px;line-height:1.48;color:#CBD5E1;">' +
              '<div style="font-weight:800;color:' + (state.quizPicked === qi.correctIndex ? '#34D399' : '#FBBF24') + ';margin-bottom:4px;">' +
                (state.quizPicked === qi.correctIndex ? '✓ Correct!' : '✗ Review Explanation:') +
              '</div>' +
              esc(qi.explanation || qi.card.back) +
              '<div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">' +
                (qEpLink ? '<a class="est-btn est-btn-podcast" href="' + esc(qEpLink) + '" target="_blank" rel="noopener">&#9654; Listen in Episode' + (qi.card.timestampLabel ? (' @ ' + esc(qi.card.timestampLabel)) : '') + ' &#8599;</a>' : '<span></span>') +
                '<button type="button" class="est-btn est-btn-primary" data-action="quiz-next">' + (state.quizIdx + 1 < state.quizItems.length ? 'Next Question &rarr;' : 'See Final Score &rarr;') + '</button>' +
              '</div>' +
            '</div>'
          ) : '') +
        '</div>';
    }

    if (state.studyMode === 'write') {
      var wi = Math.max(0, Math.min(state.writeIdx, cards.length - 1));
      var wc = cards[wi];
      var chars = ['á','é','í','ó','ú','ñ','ü','¿','¡','Å','α','β','γ','Δ','μ'];
      return header +
        '<div class="est-card" style="max-width:740px;margin:0 auto;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:12px;color:var(--text-muted);">' +
            '<span>Prompt ' + (wi + 1) + ' of ' + cards.length + ' (Recall Term / Front from Definition)</span>' +
            '<label style="cursor:pointer;"><input type="checkbox" id="est-write-acc" ' + (state.writeIgnoreAccents ? 'checked' : '') + ' /> Ignore accents</label>' +
          '</div>' +
          '<div style="font-size:16.5px;font-weight:700;line-height:1.48;margin-bottom:14px;color:#E2E8F0;">' + esc(wc.back) + '</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px;">' +
            chars.map(function (ch) { return '<button type="button" class="est-btn" style="padding:4px 8px;font-size:12px;" data-ins-char="' + ch + '">' + ch + '</button>'; }).join('') +
          '</div>' +
          '<div style="display:flex;gap:8px;">' +
            '<input id="est-write-in" class="est-input" type="text" placeholder="Type matching term / concept..." value="' + esc(state.writeInput) + '" />' +
            '<button type="button" class="est-btn est-btn-primary" data-action="write-check">Check</button>' +
            '<button type="button" class="est-btn" data-action="write-reveal">Reveal</button>' +
          '</div>' +
          (state.writeFeedback ? (
            '<div style="margin-top:12px;padding:11px 13px;border-radius:11px;background:rgba(15,23,42,0.95);border:1px solid ' + (state.writeFeedback.ok ? '#10B981' : '#F59E0B') + ';font-size:13.5px;">' +
              '<div style="font-weight:800;color:' + (state.writeFeedback.ok ? '#34D399' : '#FDE68A') + ';margin-bottom:4px;">' + (state.writeFeedback.ok ? '✓ Spot on!' : 'Target Answer:') + '</div>' +
              '<div style="color:#FFFFFF;font-weight:700;">' + esc(wc.front) + '</div>' +
              '<div style="margin-top:9px;"><button type="button" class="est-btn est-btn-primary" data-action="write-next">Next Card &rarr;</button></div>' +
            '</div>'
          ) : '') +
        '</div>';
    }

    if (state.studyMode === 'match') {
      if (state.matchDoneSec !== null) {
        return header +
          '<div class="est-card" style="max-width:600px;margin:0 auto;text-align:center;padding:28px;">' +
            '<div style="font-size:38px;font-weight:900;color:#38BDF8;margin-bottom:6px;">' + state.matchDoneSec.toFixed(1) + 's</div>' +
            '<div style="font-size:16px;font-weight:800;margin-bottom:14px;">Board Cleared! All Pairs Matched</div>' +
            '<button type="button" class="est-btn est-btn-primary" data-action="match-restart">Play New Round</button>' +
          '</div>';
      }
      return header +
        '<div class="match-grid">' +
          state.matchTiles.map(function (t) {
            var cls = 'match-tile';
            if (t.matched) cls += ' matched';
            else if (state.matchMismatchIds.indexOf(t.tileId) !== -1) cls += ' mismatch';
            else if (state.matchSelected && state.matchSelected.tileId === t.tileId) cls += ' selected';
            return '<div class="' + cls + '" data-match-tile="' + esc(t.tileId) + '">' + esc(t.text) + '</div>';
          }).join('') +
        '</div>';
    }

    // All Cards list view
    return header +
      '<div style="display:grid;gap:9px;">' +
        (deck.cards || []).map(function (c, i) {
          var epLink = episodeAudioHref(c);
          return '<div class="est-card" style="padding:13px 16px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;align-items:flex-start;">' +
            '<div style="flex:1;min-width:250px;">' +
              '<div style="font-size:13.5px;font-weight:800;color:#FFFFFF;margin-bottom:4px;">' + (i + 1) + '. ' + esc(c.front) + '</div>' +
              '<div style="font-size:12.5px;color:#CBD5E1;line-height:1.45;">' + esc(c.back) + '</div>' +
            '</div>' +
            '<div style="display:flex;gap:6px;align-items:center;">' +
              (epLink ? '<a class="est-btn est-btn-podcast" style="padding:5px 9px;font-size:11px;" href="' + esc(epLink) + '" target="_blank" rel="noopener">&#9654; ' + esc(c.timestampLabel || 'Play') + '</a>' : '') +
              '<button type="button" class="est-btn" style="padding:5px 9px;font-size:11px;color:#FCA5A5;" data-del-card="' + esc(c.id) + '">Delete</button>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>';
  }

  function renderModal() {
    if (!state.modal) return '';
    if (state.modal === 'podcast-library') {
      var m = state.manifest;
      var hubTabs = (m && m.hubs ? m.hubs : []).map(function (h) {
        return '<button type="button" class="est-pill ' + (state.libSelectedHub === h.slug ? 'active' : '') + '" data-lib-hub="' + esc(h.slug) + '">' + esc(h.icon) + ' ' + esc(h.title.split(',')[0]) + ' (' + h.episodeCount + ')</button>';
      }).join('');
      var hd = state.hubCache[state.libSelectedHub];
      var body = '';
      if (state.libLoading || !hd) {
        body = '<div style="padding:24px;color:var(--text-muted);">Loading transcript study decks...</div>';
      } else {
        var sq = state.libSearch.toLowerCase().trim();
        var secHtml = '<div style="margin-bottom:14px;"><div style="font-size:11px;font-weight:800;color:#38BDF8;text-transform:uppercase;margin-bottom:6px;">1-Click Import Full Section Deck:</div><div style="display:flex;flex-wrap:wrap;gap:6px;">' +
          (hd.sections || []).map(function (s, si) {
            return '<button type="button" class="est-btn est-btn-podcast" data-imp-sec="' + si + '">+ ' + esc(s.pill) + ' (' + (s.episodeIds || []).length + ' eps)</button>';
          }).join('') +
        '</div></div>';

        var epList = Object.values(hd.episodes || {}).filter(function (ep) {
          if (!sq) return true;
          return (ep.title + ' ' + (ep.fullLabel || '') + ' ' + (ep.section || '')).toLowerCase().indexOf(sq) !== -1;
        }).slice(0, 60);

        body = secHtml +
          '<input id="est-lib-search" class="est-input" style="margin-bottom:12px;" type="search" placeholder="Search ' + hd.episodeCount + ' episodes in ' + esc(hd.title) + '..." value="' + esc(state.libSearch) + '" />' +
          '<div style="display:grid;gap:8px;max-height:46vh;overflow-y:auto;padding-right:4px;">' +
            epList.map(function (ep) {
              return '<div style="padding:10px 13px;border-radius:12px;background:#070D1B;border:1px solid #1E293B;display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
                '<div style="min-width:0;flex:1;">' +
                  '<div style="font-size:13px;font-weight:800;color:#F8FAFC;line-height:1.3;">' + (ep.ep ? ('Ep ' + ep.ep + ' &bull; ') : '') + esc(ep.title) + '</div>' +
                  '<div style="font-size:11px;color:var(--text-muted);">' + esc(ep.section) + ' &bull; ' + ep.cardCount + ' transcript Q&amp;A cards</div>' +
                '</div>' +
                '<button type="button" class="est-btn est-btn-primary" style="flex-shrink:0;" data-imp-ep="' + esc(ep.id) + '">Study (' + ep.cardCount + ') &rarr;</button>' +
              '</div>';
            }).join('') +
          '</div>';
      }
      return '<div class="est-modal-backdrop" data-close-modal="backdrop"><div class="est-modal">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
          '<div><div style="font-size:18px;font-weight:900;">&#127911; Deep Dive Transcript Q&amp;A Deck Library</div><div style="font-size:12px;color:var(--text-muted);">Select any hub section or individual episode to load flashcards &amp; multiple-choice quizzes</div></div>' +
          '<button type="button" class="est-btn" data-action="close-modal">&times; Close</button>' +
        '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;">' + hubTabs + '</div>' +
        body +
      '</div></div>';
    }

    if (state.modal === 'add-card') {
      return '<div class="est-modal-backdrop" data-close-modal="backdrop"><div class="est-modal" style="max-width:520px;">' +
        '<h3 style="margin:0 0 12px 0;">Add Card to Deck</h3>' +
        '<label style="font-size:12px;color:#CBD5E1;">Front (Term or Question)</label>' +
        '<input id="est-add-front" class="est-input" style="margin:4px 0 10px 0;" />' +
        '<label style="font-size:12px;color:#CBD5E1;">Back (Definition or Answer)</label>' +
        '<textarea id="est-add-back" class="est-input" rows="3" style="margin:4px 0 10px 0;"></textarea>' +
        '<label style="font-size:12px;color:#CBD5E1;">Example / Timestamp Note (optional)</label>' +
        '<input id="est-add-ex" class="est-input" style="margin:4px 0 14px 0;" />' +
        '<div style="display:flex;justify-content:flex-end;gap:8px;">' +
          '<button type="button" class="est-btn" data-action="close-modal">Cancel</button>' +
          '<button type="button" class="est-btn est-btn-primary" data-action="save-card">Save Card</button>' +
        '</div>' +
      '</div></div>';
    }

    if (state.modal === 'paste-list') {
      return '<div class="est-modal-backdrop" data-close-modal="backdrop"><div class="est-modal" style="max-width:580px;">' +
        '<h3 style="margin:0 0 6px 0;">Paste Vocabulary or Q&amp;A List</h3>' +
        '<p style="font-size:12px;color:var(--text-muted);margin:0 0 10px 0;">One card per line using <code>term - definition</code>, <code>question | answer</code>, or tab-separated columns.</p>' +
        '<textarea id="est-paste-area" class="est-input" rows="8" placeholder="Resting Potential - -70 mV maintained by K+ leak and Na+/K+-ATPase&#10;Tetrodotoxin (TTX) - Selective nanomolar pore blocker of TTX-sensitive NaV channels"></textarea>' +
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;">' +
          '<button type="button" class="est-btn" data-action="close-modal">Cancel</button>' +
          '<button type="button" class="est-btn est-btn-primary" data-action="save-paste-list">Import Cards</button>' +
        '</div>' +
      '</div></div>';
    }

    if (state.modal === 'new-deck') {
      return '<div class="est-modal-backdrop" data-close-modal="backdrop"><div class="est-modal" style="max-width:520px;">' +
        '<h3 style="margin:0 0 12px 0;">Create Custom Study Deck</h3>' +
        '<label style="font-size:12px;color:#CBD5E1;">Deck Title</label>' +
        '<input id="est-nd-title" class="est-input" style="margin:4px 0 10px 0;" placeholder="e.g., Ion Channel Pharmacology Exam 1" />' +
        '<label style="font-size:12px;color:#CBD5E1;">Subject</label>' +
        '<select id="est-nd-subj" class="est-input" style="margin:4px 0 10px 0;">' +
          state.subjects.map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.icon + ' ' + s.name) + '</option>'; }).join('') +
        '</select>' +
        '<label style="font-size:12px;color:#CBD5E1;">Description</label>' +
        '<input id="est-nd-desc" class="est-input" style="margin:4px 0 14px 0;" />' +
        '<div style="display:flex;justify-content:flex-end;gap:8px;">' +
          '<button type="button" class="est-btn" data-action="close-modal">Cancel</button>' +
          '<button type="button" class="est-btn est-btn-primary" data-action="save-new-deck">Create Deck</button>' +
        '</div>' +
      '</div></div>';
    }

    if (state.modal === 'mobile-qr') {
      var shareUrl = location.href.split('#')[0];
      var qrSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=' + encodeURIComponent(shareUrl);
      return '<div class="est-modal-backdrop" data-close-modal="backdrop"><div class="est-modal" style="max-width:520px;text-align:center;">' +
        '<h3 style="margin:0 0 6px 0;">&#128241; Open &amp; Pin Estudia! on iPhone or Android</h3>' +
        '<p style="font-size:12.5px;color:#CBD5E1;margin:0 0 14px 0;">Scan with your phone camera—opens this exact deck directly in mobile Safari or Chrome with zero App Store fee.</p>' +
        '<img src="' + qrSrc + '" width="180" height="180" alt="QR Code" style="border-radius:16px;background:#FFF;padding:6px;margin-bottom:12px;" />' +
        '<div style="text-align:left;background:#060B16;border:1px solid #1E293B;border-radius:12px;padding:12px;font-size:12.5px;color:#CBD5E1;line-height:1.5;margin-bottom:12px;">' +
          '<strong style="color:#38BDF8;">iPhone Home Screen App (Free):</strong> In Safari, tap <strong>Share &#11014;&#65039;</strong> &rarr; scroll down to <strong>&#10133; Add to Home Screen</strong>. Or visit <a href="../app/" style="color:#38BDF8;font-weight:700;">Deep Dive iPhone &amp; Android App Hub &rarr;</a>' +
        '</div>' +
        '<button type="button" class="est-btn est-btn-primary" data-action="close-modal">Done</button>' +
      '</div></div>';
    }
    return '';
  }

  function render() {
    var root = document.getElementById('estudia-app');
    if (!root) return;
    root.innerHTML = '<div class="est-shell">' +
      renderTopBar() +
      (state.view === 'study' ? renderStudyView() : renderHome()) +
    '</div>' + renderModal();

    var hs = document.getElementById('est-home-search');
    if (hs) {
      hs.oninput = function () { state.searchQuery = hs.value; render(); var el = document.getElementById('est-home-search'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } };
    }
    var ls = document.getElementById('est-lib-search');
    if (ls) {
      ls.oninput = function () { state.libSearch = ls.value; render(); var el = document.getElementById('est-lib-search'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } };
    }
    var wi = document.getElementById('est-write-in');
    if (wi) {
      wi.oninput = function () { state.writeInput = wi.value; };
      wi.onkeydown = function (ev) { if (ev.key === 'Enter') checkWriteAnswer(); };
    }
    var wa = document.getElementById('est-write-acc');
    if (wa) {
      wa.onchange = function () { state.writeIgnoreAccents = wa.checked; };
    }
    var imp = document.getElementById('est-import-file');
    if (imp) {
      imp.onchange = function () {
        var file = imp.files && imp.files[0];
        if (!file) return;
        var fr = new FileReader();
        fr.onload = function () {
          try {
            var data = JSON.parse(String(fr.result || '{}'));
            if (Array.isArray(data.subjects)) {
              data.subjects.forEach(function (s) {
                if (!state.subjects.some(function (x) { return x.id === s.id; })) state.subjects.push(s);
              });
            }
            if (Array.isArray(data.decks)) {
              data.decks.forEach(function (d) {
                var idx = state.decks.findIndex(function (x) { return x.id === d.id; });
                if (idx !== -1) state.decks[idx] = d;
                else state.decks.unshift(d);
              });
            }
            saveStorage();
            render();
          } catch (e) { alert('Invalid Estudia JSON file.'); }
        };
        fr.readAsText(file);
      };
    }
  }

  function checkWriteAnswer() {
    var deck = getActiveDeck();
    var cards = getActiveCards(deck);
    var wc = cards[state.writeIdx];
    if (!wc) return;
    var expected = normAnswer(wc.front.replace(/— in ".*$/, ''), state.writeIgnoreAccents);
    var given = normAnswer(state.writeInput, state.writeIgnoreAccents);
    var ok = given.length >= 2 && (given === expected || expected.indexOf(given) !== -1 && given.length >= Math.min(6, expected.length));
    wc.timesReviewed = (wc.timesReviewed || 0) + 1;
    if (ok) { wc.timesCorrect = (wc.timesCorrect || 0) + 1; wc.mastery = Math.min(3, (wc.mastery || 0) + 1); }
    bumpReviewStats();
    state.writeFeedback = { ok: ok };
    render();
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target;
    if (!t || !t.closest) return;

    if (t.getAttribute('data-close-modal') === 'backdrop') {
      state.modal = null; render(); return;
    }

    var actEl = t.closest('[data-action]');
    if (actEl) {
      var act = actEl.getAttribute('data-action');
      if (act === 'go-home') { state.view = 'home'; render(); return; }
      if (act === 'close-modal') { state.modal = null; render(); return; }
      if (act === 'open-podcast-lib') {
        state.modal = 'podcast-library';
        render();
        fetchManifest().then(function () { return fetchHubDeck(state.libSelectedHub); });
        return;
      }
      if (act === 'open-add-card') { state.modal = 'add-card'; render(); return; }
      if (act === 'open-paste-list') { state.modal = 'paste-list'; render(); return; }
      if (act === 'open-new-deck') { state.modal = 'new-deck'; render(); return; }
      if (act === 'open-mobile-qr') { state.modal = 'mobile-qr'; render(); return; }
      if (act === 'export-json') {
        var blob = new Blob([JSON.stringify({ subjects: state.subjects, decks: state.decks, stats: state.stats }, null, 2)], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'estudia-backup-' + todayISO() + '.json';
        a.click();
        return;
      }
      if (act === 'toggle-starred') { state.starredOnly = !state.starredOnly; state.fcIndex = 0; render(); return; }
      if (act === 'flip-card') { state.fcFlipped = !state.fcFlipped; render(); return; }
      if (act === 'fc-prev') {
        var cPrev = getActiveCards(getActiveDeck());
        state.fcIndex = (state.fcIndex - 1 + cPrev.length) % cPrev.length;
        state.fcFlipped = false; render(); return;
      }
      if (act === 'fc-next') {
        var cNext = getActiveCards(getActiveDeck());
        state.fcIndex = (state.fcIndex + 1) % cNext.length;
        state.fcFlipped = false; render(); return;
      }
      if (act === 'quiz-next') {
        if (state.quizIdx + 1 < state.quizItems.length) {
          state.quizIdx += 1; state.quizPicked = null;
        } else {
          state.quizFinished = true;
          var dkQ = getActiveDeck();
          state.stats.quizHistory.unshift({
            deckId: dkQ ? dkQ.id : '',
            deckTitle: dkQ ? dkQ.title : '',
            totalQuestions: state.quizItems.length,
            correctCount: state.quizScore,
            scorePercentage: Math.round((state.quizScore / Math.max(1, state.quizItems.length)) * 100),
            date: new Date().toISOString(),
            missedCardIds: state.quizMissedIds.slice()
          });
          saveStorage();
        }
        render(); return;
      }
      if (act === 'quiz-restart') { setStudyMode('quiz'); return; }
      if (act === 'quiz-missed') { setStudyMode('quiz', state.quizMissedIds.slice()); return; }
      if (act === 'write-check') { checkWriteAnswer(); return; }
      if (act === 'write-reveal') { state.writeFeedback = { ok: false }; render(); return; }
      if (act === 'write-next') {
        var cW = getActiveCards(getActiveDeck());
        state.writeIdx = (state.writeIdx + 1) % cW.length;
        state.writeInput = ''; state.writeFeedback = null; render(); return;
      }
      if (act === 'match-restart') { initMatchBoard(getActiveDeck()); render(); return; }
      if (act === 'save-card') {
        var dkA = getActiveDeck();
        var fr = (document.getElementById('est-add-front') || {}).value || '';
        var bk = (document.getElementById('est-add-back') || {}).value || '';
        var ex = (document.getElementById('est-add-ex') || {}).value || '';
        if (dkA && fr.trim() && bk.trim()) {
          dkA.cards.push({ id: 'c-' + Date.now(), deckId: dkA.id, front: fr.trim(), back: bk.trim(), example: ex.trim(), mastery: 0, timesReviewed: 0, timesCorrect: 0 });
          saveStorage(); state.modal = null; render();
        }
        return;
      }
      if (act === 'save-paste-list') {
        var dkP = getActiveDeck();
        var raw = (document.getElementById('est-paste-area') || {}).value || '';
        if (dkP && raw.trim()) {
          raw.split(/\r?\n/).forEach(function (ln, idx) {
            var parts = ln.indexOf('\t') !== -1 ? ln.split('\t') : (ln.indexOf(' | ') !== -1 ? ln.split(' | ') : ln.split(' - '));
            if (parts.length >= 2 && parts[0].trim() && parts.slice(1).join(' - ').trim()) {
              dkP.cards.push({ id: 'cp-' + Date.now() + '-' + idx, deckId: dkP.id, front: parts[0].trim(), back: parts.slice(1).join(' - ').trim(), mastery: 0, timesReviewed: 0, timesCorrect: 0 });
            }
          });
          saveStorage(); state.modal = null; render();
        }
        return;
      }
      if (act === 'save-new-deck') {
        var tt = ((document.getElementById('est-nd-title') || {}).value || '').trim();
        var sb = ((document.getElementById('est-nd-subj') || {}).value || state.subjects[0].id);
        var ds = ((document.getElementById('est-nd-desc') || {}).value || '').trim();
        if (tt) {
          var nd = { id: 'deck-' + Date.now(), subjectId: sb, title: tt, description: ds, createdAt: Date.now(), tags: ['Custom'], cards: [] };
          state.decks.unshift(nd); saveStorage(); openDeck(nd.id, 'cards');
        }
        return;
      }
    }

    var subjBtn = t.closest('[data-subj]');
    if (subjBtn) { state.selectedSubjectId = subjBtn.getAttribute('data-subj'); render(); return; }

    var openBtn = t.closest('[data-open-deck]');
    if (openBtn) { openDeck(openBtn.getAttribute('data-open-deck'), openBtn.getAttribute('data-open-mode')); return; }

    var modeBtn = t.closest('[data-mode]');
    if (modeBtn) { setStudyMode(modeBtn.getAttribute('data-mode')); return; }

    var gradeBtn = t.closest('[data-grade]');
    if (gradeBtn) {
      var dkG = getActiveDeck();
      var cardsG = getActiveCards(dkG);
      var cg = cardsG[state.fcIndex];
      if (cg) {
        var g = parseInt(gradeBtn.getAttribute('data-grade'), 10);
        cg.mastery = g;
        cg.timesReviewed = (cg.timesReviewed || 0) + 1;
        if (g >= 2) cg.timesCorrect = (cg.timesCorrect || 0) + 1;
        cg.lastReviewedAt = Date.now();
        bumpReviewStats();
        state.fcIndex = (state.fcIndex + 1) % cardsG.length;
        state.fcFlipped = false;
        render();
      }
      return;
    }

    var spkBtn = t.closest('[data-speak]');
    if (spkBtn) {
      var dkS = getActiveDeck();
      var subjS = getSubjectForDeck(dkS);
      var cS = getActiveCards(dkS)[state.fcIndex];
      if (cS) {
        var side = spkBtn.getAttribute('data-speak');
        var rate = parseFloat(spkBtn.getAttribute('data-rate') || '1');
        speakText(side === 'back' ? cS.back : cS.front, side === 'front' && subjS ? subjS.languageCode : 'en-US', rate);
      }
      return;
    }

    var starBtn = t.closest('[data-star]');
    if (starBtn) {
      var dkSt = getActiveDeck();
      var cid = starBtn.getAttribute('data-star');
      var cardSt = (dkSt && dkSt.cards || []).find(function (x) { return x.id === cid; });
      if (cardSt) { cardSt.isStarred = !cardSt.isStarred; saveStorage(); render(); }
      return;
    }

    var qOpt = t.closest('[data-quiz-opt]');
    if (qOpt && state.quizPicked === null) {
      var picked = parseInt(qOpt.getAttribute('data-quiz-opt'), 10);
      var curQ = state.quizItems[state.quizIdx];
      state.quizPicked = picked;
      curQ.card.timesReviewed = (curQ.card.timesReviewed || 0) + 1;
      if (picked === curQ.correctIndex) {
        state.quizScore += 1;
        curQ.card.timesCorrect = (curQ.card.timesCorrect || 0) + 1;
        curQ.card.mastery = Math.min(3, (curQ.card.mastery || 0) + 1);
      } else {
        state.quizMissedIds.push(curQ.card.id);
      }
      bumpReviewStats();
      render();
      return;
    }

    var insBtn = t.closest('[data-ins-char]');
    if (insBtn) {
      state.writeInput += insBtn.getAttribute('data-ins-char');
      render();
      var inEl = document.getElementById('est-write-in');
      if (inEl) inEl.focus();
      return;
    }

    var mTile = t.closest('[data-match-tile]');
    if (mTile) {
      var tid = mTile.getAttribute('data-match-tile');
      var tile = state.matchTiles.find(function (x) { return x.tileId === tid; });
      if (!tile || tile.matched) return;
      state.matchMismatchIds = [];
      if (!state.matchSelected) {
        state.matchSelected = tile; render(); return;
      }
      if (state.matchSelected.tileId === tile.tileId) {
        state.matchSelected = null; render(); return;
      }
      if (state.matchSelected.pairId === tile.pairId && state.matchSelected.kind !== tile.kind) {
        state.matchSelected.matched = true;
        tile.matched = true;
        state.matchSelected = null;
        bumpReviewStats();
        if (state.matchTiles.every(function (x) { return x.matched; })) {
          state.matchDoneSec = (Date.now() - state.matchStartMs) / 1000;
        }
        render();
      } else {
        var prevId = state.matchSelected.tileId;
        state.matchSelected = null;
        state.matchMismatchIds = [prevId, tile.tileId];
        render();
        setTimeout(function () { state.matchMismatchIds = []; render(); }, 550);
      }
      return;
    }

    var delBtn = t.closest('[data-del-card]');
    if (delBtn) {
      var dkD = getActiveDeck();
      var delId = delBtn.getAttribute('data-del-card');
      if (dkD) {
        dkD.cards = (dkD.cards || []).filter(function (x) { return x.id !== delId; });
        saveStorage(); render();
      }
      return;
    }

    var libHub = t.closest('[data-lib-hub]');
    if (libHub) {
      state.libSelectedHub = libHub.getAttribute('data-lib-hub');
      state.libSearch = '';
      fetchHubDeck(state.libSelectedHub);
      return;
    }

    var impEp = t.closest('[data-imp-ep]');
    if (impEp) {
      var hdEp = state.hubCache[state.libSelectedHub];
      if (hdEp) importEpisodeIntoEstudia(hdEp, impEp.getAttribute('data-imp-ep'), true);
      return;
    }

    var impSec = t.closest('[data-imp-sec]');
    if (impSec) {
      var hdSec = state.hubCache[state.libSelectedHub];
      if (hdSec) importSectionIntoEstudia(hdSec, parseInt(impSec.getAttribute('data-imp-sec'), 10), true);
      return;
    }
  });

  document.addEventListener('keydown', function (ev) {
    if (state.modal || state.view !== 'study' || state.studyMode !== 'flashcards') return;
    if (ev.target && (ev.target.tagName === 'INPUT' || ev.target.tagName === 'TEXTAREA')) return;
    if (ev.code === 'Space') { ev.preventDefault(); state.fcFlipped = !state.fcFlipped; render(); }
    else if (ev.key === 'ArrowRight') { var c1 = getActiveCards(getActiveDeck()); if (c1.length) { state.fcIndex = (state.fcIndex + 1) % c1.length; state.fcFlipped = false; render(); } }
    else if (ev.key === 'ArrowLeft') { var c2 = getActiveCards(getActiveDeck()); if (c2.length) { state.fcIndex = (state.fcIndex - 1 + c2.length) % c2.length; state.fcFlipped = false; render(); } }
  });

  loadStorage();
  render();
  handleDeepLinkParams();
})();
