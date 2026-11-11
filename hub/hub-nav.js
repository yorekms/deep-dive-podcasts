/*!
 * Shared GA4 / Google Tag + .chatgpt.site portal click tracker + Author Credentials Box
 * + 15-site Network Nav + Cross-URL Listened Sync Passthrough (#crp_s)
 * for non-podcast Carrd portfolio sites and external research portals.
 */
(function () {
  'use strict';
  if (window.__crpPortalAnalyticsLoaded) return;
  window.__crpPortalAnalyticsLoaded = true;

  var FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif";
  var B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  var incomingSyncToken = '';
  var cachedEpIds = [];

  try {
    if (location.hash && location.hash.indexOf('crp_s=') !== -1) {
      var rawHash = location.hash.replace(/^#/, '');
      var kept = [];
      rawHash.split('&').forEach(function (part) {
        if (part.indexOf('crp_s=') === 0) {
          incomingSyncToken = decodeURIComponent(part.slice(6));
        } else if (part) {
          kept.push(part);
        }
      });
      if (incomingSyncToken) {
        localStorage.setItem('crp_sync_token_pending', incomingSyncToken);
        if (!localStorage.getItem('crp_sync_token')) {
          localStorage.setItem('crp_sync_token', incomingSyncToken);
        }
      }
      var cleanUrl = location.pathname + location.search + (kept.length ? '#' + kept.join('&') : '');
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', cleanUrl);
      }
    }
  } catch (e) {}

  function decodeBitset(str, ids, cb) {
    if (!str || !ids || !ids.length) return;
    for (var g = 0; g < str.length; g++) {
      var v = B64.indexOf(str.charAt(g));
      if (v <= 0) continue;
      for (var b = 0; b < 6; b++) {
        if (v & (1 << b)) {
          var idx = g * 6 + b;
          if (idx < ids.length) cb(ids[idx]);
        }
      }
    }
  }
  function encodeBitset(ids, pred) {
    if (!ids || !ids.length) return '';
    var out = '';
    var groups = Math.ceil(ids.length / 6);
    for (var g = 0; g < groups; g++) {
      var v = 0;
      for (var b = 0; b < 6; b++) {
        var idx = g * 6 + b;
        if (idx < ids.length && pred(ids[idx])) v |= (1 << b);
      }
      out += B64.charAt(v);
    }
    return out.replace(/A+$/, '');
  }
  function applyTokenToLocal(tok, epIds) {
    if (!tok || !epIds || !epIds.length) return;
    try {
      var parts = String(tok).split('.');
      decodeBitset(parts[0] || '', epIds, function (id) {
        localStorage.setItem('crp_done_' + id, '1');
        localStorage.removeItem('crp_undone_' + id);
      });
      (parts[2] ? parts[2].split(',') : []).forEach(function (id) {
        if (/^[a-zA-Z0-9_-]{10,}$/.test(id)) {
          localStorage.setItem('crp_done_' + id, '1');
          localStorage.removeItem('crp_undone_' + id);
        }
      });
      decodeBitset(parts[1] || '', epIds, function (id) {
        localStorage.removeItem('crp_done_' + id);
        localStorage.setItem('crp_undone_' + id, '1');
      });
      (parts[3] ? parts[3].split(',') : []).forEach(function (id) {
        if (/^[a-zA-Z0-9_-]{10,}$/.test(id)) {
          localStorage.removeItem('crp_done_' + id);
          localStorage.setItem('crp_undone_' + id, '1');
        }
      });
    } catch (e) {}
  }
  function currentSyncToken() {
    try {
      if (cachedEpIds && cachedEpIds.length) {
        var idSet = {};
        cachedEpIds.forEach(function (id) { idSet[id] = true; });
        var doneBits = encodeBitset(cachedEpIds, function (id) { return localStorage.getItem('crp_done_' + id) === '1'; });
        var undoneBits = encodeBitset(cachedEpIds, function (id) {
          return localStorage.getItem('crp_done_' + id) !== '1' && localStorage.getItem('crp_undone_' + id) === '1';
        });
        var exD = [], exU = [];
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i) || '';
          if (k.indexOf('crp_done_') === 0 && localStorage.getItem(k) === '1') {
            var dId = k.slice(9);
            if (dId && !idSet[dId]) exD.push(dId);
          } else if (k.indexOf('crp_undone_') === 0 && localStorage.getItem(k) === '1') {
            var uId = k.slice(11);
            if (uId && !idSet[uId] && localStorage.getItem('crp_done_' + uId) !== '1') exU.push(uId);
          }
        }
        var built = [doneBits, undoneBits, exD.join(','), exU.join(',')].join('.').replace(/\.+$/, '');
        if (built) localStorage.setItem('crp_sync_token', built);
        return built || localStorage.getItem('crp_sync_token') || '';
      }
      return localStorage.getItem('crp_sync_token_pending') || localStorage.getItem('crp_sync_token') || '';
    } catch (e) {
      return incomingSyncToken || '';
    }
  }
  function stampCarrdLink(a) {
    if (!a) return;
    var rawHref = a.getAttribute('href') || '';
    if (rawHref.indexOf('.carrd.co') === -1) return;
    if (!a.dataset.crpBaseHref) {
      a.dataset.crpBaseHref = rawHref.replace(/([#&])crp_s=[^&]*/g, '').replace(/[?#&]+$/, '');
    }
    var baseHref = a.dataset.crpBaseHref;
    var tok = currentSyncToken();
    if (tok) {
      a.setAttribute('href', baseHref + (baseHref.indexOf('#') === -1 ? '#' : '&') + 'crp_s=' + tok);
    } else {
      a.setAttribute('href', baseHref);
    }
  }
  ['mousedown', 'auxclick', 'touchstart', 'focusin'].forEach(function (evName) {
    document.addEventListener(evName, function (ev) {
      var t = ev.target && ev.target.closest ? ev.target.closest('a[href*=".carrd.co"]') : null;
      if (t) stampCarrdLink(t);
    }, true);
  });

  try {
    if (!document.getElementById('crp-homogeneous-layout')) {
      var st = document.createElement('style');
      st.id = 'crp-homogeneous-layout';
      st.textContent = 'html{font-size:16px !important} .site-main>.inner,#main>.inner{width:min(96vw,1560px) !important;max-width:1560px !important;padding:24px 22px 145px 22px !important} #crp-standalone-estudia-wrapper,#crp-standalone-phys-wrapper,#crp-standalone-clampflow-wrapper,#crp-top-hub-nav,#crp-author-cred-box{width:100% !important;max-width:1510px !important} .crp-grid,.crp-ep-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important;gap:10px 14px !important} .crp-ep-lbl{white-space:normal !important;overflow:visible !important;display:block !important;-webkit-line-clamp:unset !important;line-height:1.35 !important;word-break:break-word !important} .crp-ep-chk{width:16px;height:16px;border-radius:50%;border:1px solid rgba(148,163,184,0.38);background:rgba(15,23,42,0.55);color:transparent;display:inline-flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:900;flex-shrink:0;cursor:pointer;transition:all 0.15s ease} .crp-ep-chk:hover{border-color:#34D399;color:#6EE7B7;background:rgba(16,185,129,0.20);transform:scale(1.14)} .crp-done-card{background:rgba(6,78,59,0.38) !important;border:1px solid rgba(16,185,129,0.50) !important;border-left:3px solid #10B981 !important} .crp-done-card .crp-ep-ico{background:rgba(16,185,129,0.22) !important;border-color:#10B981 !important;color:#34D399 !important;font-weight:900} .crp-done-card .crp-ep-chk{background:#10B981;border-color:#34D399;color:#052E16;box-shadow:0 0 8px rgba(16,185,129,0.45)} #crp-title{white-space:normal !important;overflow:visible !important;text-overflow:clip !important;line-height:1.3 !important} @media (max-width:780px){.crp-grid,.crp-ep-grid{grid-template-columns:1fr !important} .site-main>.inner,#main>.inner{padding:20px 14px 145px 14px !important}}';
      (document.head || document.documentElement).appendChild(st);
    }
  } catch (e) {}

  var sEl = document.currentScript;
  var HUB = (sEl && sEl.getAttribute('data-hub')) || location.hostname.replace(/^my-|\.carrd\.co$/g, '');
  var GA_ID = "G-EJ2SRH8M0G";
  var GTM_ID = "GTM-PSHWV3TC";
  if (GA_ID || GTM_ID) {
    try {
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag !== 'function') {
        window.gtag = function () { window.dataLayer.push(arguments); };
        var gs = document.createElement('script');
        gs.async = true;
        gs.src = GTM_ID
          ? ('https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(GTM_ID))
          : ('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID));
        document.head.appendChild(gs);
        window.gtag('js', new Date());
        if (GA_ID) window.gtag('config', GA_ID, { hub: HUB });
      }
    } catch (e) {}
  }
  function track(name, params) {
    if (typeof window.gtag !== 'function') return;
    try {
      var p = { hub: HUB };
      if (params) for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) p[k] = params[k];
      window.gtag('event', name, p);
    } catch (e) {}
  }
  function portalName(url) {
    var u = String(url || '').toLowerCase();
    if (u.indexOf('yorek-cancer-ai-primer') !== -1) return 'VCU Cancer AI Primer';
    if (u.indexOf('public-evidence-library') !== -1) return 'Public Evidence Library';
    if (u.indexOf('historical-documents-atlas') !== -1) return 'Historical Documents Atlas';
    return url;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function defaultAccent() {
    if (HUB === 'scientific-software') return '#C084FC';
    if (HUB === 'clampflow') return '#F59E0B';
    return '#38BDF8';
  }

  function buildAuthorBoxHTML(au, accent) {
    au = au || {};
    var name = au.name || 'Matthew S. Yorek';
    var role = au.role || 'Biomedical Research, Electrophysiology & Data Engineering';
    var email = au.email || 'yorekms@gmail.com';
    var orcid = au.orcid || '0000-0002-4737-9367';
    var orcidUrl = au.orcid_url || ('https://orcid.org/' + orcid);
    var pubmedUrl = au.pubmed_url || 'https://www.ncbi.nlm.nih.gov/myncbi/1XAQAfuLLOMkz/bibliography/public/';
    var pillBase = 'display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;text-decoration:none;white-space:nowrap;';
    return '<div id="crp-author-cred-box" style="width:100%;max-width:1510px;margin:0 auto 10px auto;padding:8px 14px;background:rgba(9,14,26,0.90);border:1px solid rgba(255,255,255,0.16);border-left:3px solid ' + (accent || defaultAccent()) + ';border-radius:13px;box-shadow:0 8px 24px rgba(0,0,0,0.36);backdrop-filter:blur(14px);box-sizing:border-box;font-family:' + FONT + ';display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 14px;text-align:left;">' +
      '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;">' +
        '<span style="font-size:13px;font-weight:800;color:#FFFFFF;letter-spacing:-0.01em;">' + esc(name) + '</span>' +
        '<span style="font-size:11.5px;font-weight:600;color:#94A3B8;">&bull; ' + esc(role) + '</span>' +
      '</div>' +
      '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;">' +
        '<a href="' + esc(pubmedUrl) + '" target="_blank" rel="noopener" class="crp-hub-pill" style="' + pillBase + 'color:#BAE6FD;background:rgba(14,116,144,0.36);border:1px solid rgba(56,189,248,0.52);">&#128218; PubMed Bibliography &#8599;</a>' +
        '<a href="' + esc(orcidUrl) + '" target="_blank" rel="noopener" class="crp-hub-pill" style="' + pillBase + 'color:#D9F99D;background:rgba(63,98,18,0.42);border:1px solid rgba(163,230,53,0.55);"><span style="display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border-radius:50%;background:#A6CE39;color:#090E1A;font-size:9.5px;font-weight:900;line-height:1;">iD</span> ORCID ' + esc(orcid) + ' &#8599;</a>' +
        '<a href="mailto:' + esc(email) + '" class="crp-hub-pill" style="' + pillBase + 'color:#E2E8F0;background:rgba(30,41,59,0.85);border:1px solid rgba(148,163,184,0.42);">&#9993;&#65039; ' + esc(email) + '</a>' +
      '</div>' +
    '</div>';
  }

  function ensureAuthorBox(au, accent) {
    if (document.getElementById('crp-author-cred-box')) return;
    var nav = document.getElementById('crp-top-hub-nav');
    if (!nav || !nav.parentNode) return;
    var holder = document.createElement('div');
    holder.innerHTML = buildAuthorBoxHTML(au, accent);
    if (holder.firstElementChild) {
      nav.parentNode.insertBefore(holder.firstElementChild, nav);
    }
  }

  var netSynced = false;
  function syncNavFromNetwork() {
    if (netSynced) return;
    var nav = document.getElementById('crp-top-hub-nav');
    if (!nav) return;
    netSynced = true;
    ensureAuthorBox(null, defaultAccent());
    var bust = 'v=' + Math.floor(Date.now() / 300000);
    fetch('https://yorekms.github.io/deep-dive-podcasts/hub/network.json?' + bust, { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (net) {
        if (!net) return;
        if (Array.isArray(net.ep_ids) && net.ep_ids.length) {
          cachedEpIds = net.ep_ids;
          try {
            var existingTok = localStorage.getItem('crp_sync_token') || '';
            var pendTok = incomingSyncToken || localStorage.getItem('crp_sync_token_pending') || '';
            if (existingTok && existingTok !== pendTok) applyTokenToLocal(existingTok, cachedEpIds);
            if (pendTok) {
              applyTokenToLocal(pendTok, cachedEpIds);
              localStorage.removeItem('crp_sync_token_pending');
            }
            currentSyncToken();
          } catch (e) {}
        }
        if (!net.sites || !net.sites.length) return;
        var curNav = document.getElementById('crp-top-hub-nav');
        if (!curNav) return;
        var accent = defaultAccent();
        var activePill = curNav.querySelector('a[style*="font-weight:800"], a[style*="font-weight: 800"]');
        if (activePill) {
          var mBg = (activePill.getAttribute('style') || '').match(/background\s*:\s*(#[0-9a-fA-F]{6})/);
          if (mBg && mBg[1]) accent = mBg[1];
        }
        var existingBox = document.getElementById('crp-author-cred-box');
        if (existingBox && existingBox.parentNode) existingBox.parentNode.removeChild(existingBox);
        ensureAuthorBox(net.author, accent);

        var rows = curNav.children;
        if (rows && rows[0]) {
          var base = 'display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;text-decoration:none;white-space:nowrap;';
          var html = '';
          net.sites.forEach(function (s) {
            var isAct = (s.slug === HUB) || (location.hostname && s.url && s.url.indexOf(location.hostname) !== -1);
            var st = isAct
              ? ('font-weight:800;color:#090E1A;background:' + accent + ';box-shadow:0 0 14px ' + accent + '66;border:1px solid ' + accent + ';')
              : (s.slug === 'clampflow'
                ? 'font-weight:700;color:#FDE68A;background:rgba(120,53,15,0.48);border:1px solid rgba(245,158,11,0.55);'
                : 'font-weight:600;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);');
            html += '<a href="' + esc(s.url) + '" class="crp-hub-pill" style="' + base + st + '">' + esc(s.label) + '</a>';
          });
          rows[0].innerHTML = html;
        }
        if (rows && rows[1] && net.portals && net.portals.length) {
          var phtml = '<span style="font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-right:2px;">Research Portals &amp; Feeds:</span>';
          net.portals.forEach(function (pt) {
            phtml += '<a href="' + esc(pt.url) + '" target="_blank" rel="noopener" class="crp-hub-pill" style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:700;text-decoration:none;white-space:nowrap;color:' +
              esc(pt.color || '#E2E8F0') + ';background:' + esc(pt.bg || 'rgba(15,23,42,0.72)') + ';border:1px solid ' + esc(pt.border || 'rgba(255,255,255,0.14)') + ';">' + esc(pt.label) + ' \u2197</a>';
          });
          phtml += '<button type="button" id="crp-open-rss-modal-btn" data-series-rss="https://yorekms.github.io/deep-dive-podcasts/feed.xml" style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:800;color:#090E1A;background:' +
            accent + ';border:1px solid ' + accent + ';cursor:pointer;font-family:inherit;white-space:nowrap;">\ud83d\udce1 Podcast App RSS</button>';
          rows[1].innerHTML = phtml;
        }
        if (net.master_total) {
          var rssModal = document.getElementById('crp-rss-modal');
          if (rssModal) {
            rssModal.innerHTML = rssModal.innerHTML
              .replace(/All \d+ Deep Dive Episodes/g, 'All ' + net.master_total + ' Deep Dive Episodes')
              .replace(/Apple Podcasts \(All \d+\)/g, 'Apple Podcasts (All ' + net.master_total + ')')
              .replace(/All \d+ Feeds Directory/g, 'All ' + (net.feed_count || 12) + ' Feeds Directory');
          }
        }
        wire();
      }).catch(function () {});
  }

  function refreshStandaloneEpCards() {
    document.querySelectorAll('.crp-ep-btn').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var m = href.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || href.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (!m || !m[1]) return;
      var id = m[1];
      var chk = a.querySelector('.crp-ep-chk');
      if (!chk) {
        chk = document.createElement('span');
        chk.className = 'crp-ep-chk';
        chk.setAttribute('role', 'checkbox');
        chk.innerHTML = '&#10003;';
        chk.addEventListener('click', function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          try {
            var next = localStorage.getItem('crp_done_' + id) !== '1';
            if (next) {
              localStorage.setItem('crp_done_' + id, '1');
              localStorage.removeItem('crp_undone_' + id);
            } else {
              localStorage.removeItem('crp_done_' + id);
              localStorage.setItem('crp_undone_' + id, '1');
            }
            currentSyncToken();
          } catch (e) {}
          refreshStandaloneEpCards();
        });
        a.appendChild(chk);
      }
      var done = false;
      try { done = localStorage.getItem('crp_done_' + id) === '1'; } catch (e) {}
      a.classList.toggle('crp-done-card', done);
      var ico = a.querySelector('.crp-ep-ico');
      if (ico) ico.innerHTML = done ? '&#10003;' : '&#9654;';
      chk.setAttribute('aria-checked', done ? 'true' : 'false');
      chk.title = done ? 'Listened \u2022 Click check to mark unplayed' : 'Mark as Listened';
    });
  }

  function wire() {
    var nav = document.getElementById('crp-top-hub-nav');
    if (nav) {
      ensureAuthorBox(null, defaultAccent());
      syncNavFromNetwork();
    }
    refreshStandaloneEpCards();
    document.querySelectorAll('a[href*="chatgpt.site"]').forEach(function (link) {
      if (link.dataset.crpPortalHooked) return;
      link.dataset.crpPortalHooked = 'true';
      link.addEventListener('click', function () {
        var href = link.getAttribute('href') || '';
        track('chatgpt_site_click', {
          portal_name: portalName(href),
          portal_url: href,
          placement: link.closest('#crp-top-hub-nav') ? 'top_nav' : 'showcase_banner'
        });
      });
    });
    document.querySelectorAll('a[href*=".carrd.co"]').forEach(function (link) {
      if (link.dataset.crpNavHooked) return;
      link.dataset.crpNavHooked = 'true';
      link.addEventListener('click', function () {
        stampCarrdLink(link);
        track('hub_nav_click', { target: link.dataset.crpBaseHref || link.getAttribute('href') || '' });
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
  setInterval(wire, 1500);
})();
