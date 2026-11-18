(function () {
  'use strict';

  var state = {
    token: null,
    user: null,
    authConfig: null,
    activeProjectId: null,
    workspace: null,
    projects: [],
    busy: false,
    activeTab: 'explore',
    exploreCacheKey: null,
    exploreData: null,
    lastCardRecommendations: [],
    lastCardPrepOps: []
  };

  try {
    state.token = sessionStorage.getItem('statweave_session_token') || localStorage.getItem('statweave_session_token');
  } catch (e) {}

  function setToken(tok) {
    state.token = tok || null;
    try {
      if (tok) {
        sessionStorage.setItem('statweave_session_token', tok);
        localStorage.setItem('statweave_session_token', tok);
      } else {
        sessionStorage.removeItem('statweave_session_token');
        localStorage.removeItem('statweave_session_token');
      }
    } catch (e) {}
  }

  function $(id) { return document.getElementById(id); }

  function esc(val) {
    return String(val === null || val === undefined ? '' : val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function api(path, opts) {
    opts = opts || {};
    var headers = Object.assign({}, opts.headers || {});
    if (state.token) {
      headers['Authorization'] = 'Bearer ' + state.token;
    }
    if (opts.json !== undefined) {
      headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(opts.json);
    }
    var resp = await fetch(path, Object.assign({}, opts, { headers: headers, credentials: 'include' }));
    if (!resp.ok) {
      var detail = 'Request failed (' + resp.status + ')';
      try {
        var errData = await resp.json();
        if (errData && errData.detail) detail = errData.detail;
      } catch (e) {}
      var err = new Error(detail);
      err.status = resp.status;
      throw err;
    }
    var ctype = resp.headers.get('content-type') || '';
    if (ctype.indexOf('application/json') !== -1) {
      return await resp.json();
    }
    return resp;
  }

  function isEmbeddedIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
  }

  function openOAuth(provider) {
    var invInput = $('inv-code');
    var codeParam = invInput && invInput.value ? '&invite_code=' + encodeURIComponent(invInput.value.trim()) : '';
    if (isEmbeddedIframe()) {
      var popupUrl = '/api/auth/' + provider + '/start?popup=1' + codeParam;
      window.open(popupUrl, 'statweave_oauth', 'width=560,height=680,menubar=no,toolbar=no');
    } else {
      window.location.href = '/api/auth/' + provider + '/start?popup=0' + codeParam;
    }
  }

  window.addEventListener('message', function (ev) {
    var data = ev.data;
    if (data && data.type === 'statweave_oauth_complete' && data.token) {
      setToken(data.token);
      boot();
    }
  });

  function updateTopBar() {
    var cfg = state.authConfig || {};
    var modeEl = $('mode-indicator');
    if (cfg.openai_configured) {
      var provLabel = cfg.llm_provider === 'gemini' ? 'Gemini API' : 'OpenAI API';
      modeEl.textContent = provLabel + ' · ' + (cfg.openai_model || 'Enabled');
      modeEl.className = 'badge badge-teal';
    } else {
      modeEl.textContent = 'Deterministic Local Engine';
      modeEl.className = 'badge badge-muted';
    }
    if (cfg.clampflow_portal_url) {
      $('clampflow-nav-link').href = cfg.clampflow_portal_url;
    }

    var loggedIn = Boolean(state.user);
    $('account-btn').classList.toggle('hidden', !loggedIn);
    $('logout-btn').classList.toggle('hidden', !loggedIn);
    $('project-switcher').classList.toggle('hidden', !loggedIn || state.projects.length === 0);
  }

  function updateQuotaPill(quota) {
    var el = $('quota-indicator');
    if (!quota || !(state.authConfig && state.authConfig.openai_configured)) {
      el.classList.add('hidden');
      return;
    }
    el.classList.remove('hidden');
    el.textContent = 'AI turns left today: ' + quota.daily_turns_remaining + '/' + quota.daily_turn_limit;
  }

  function showGate(which) {
    $('auth-gate').classList.toggle('hidden', which !== 'auth');
    $('consent-gate').classList.toggle('hidden', which !== 'consent');
    $('workbench').classList.toggle('hidden', which !== 'workbench');
  }

  function renderAuthGate() {
    var cfg = state.authConfig || {};
    var anyOAuth = Boolean(cfg.orcid_oauth_enabled || cfg.github_oauth_enabled);
    $('oauth-buttons-row').classList.toggle('hidden', !anyOAuth);
    $('orcid-login-btn').classList.toggle('hidden', !cfg.orcid_oauth_enabled);
    $('github-login-btn').classList.toggle('hidden', !cfg.github_oauth_enabled);

    $('invite-login-panel').classList.toggle('hidden', !cfg.invite_login_enabled);
    $('inv-code-wrap').classList.toggle('hidden', !cfg.invite_code_required);
    $('inv-code').required = Boolean(cfg.invite_code_required);
    if (cfg.demo_guest_invite_available) {
      $('invite-panel-title').textContent = 'Contributor Sign-In (Immediate Testing Mode)';
    }
    showGate('auth');
  }

  function renderProjectSwitcher() {
    var sel = $('project-switcher');
    sel.innerHTML = '';
    state.projects.forEach(function (p) {
      var opt = document.createElement('option');
      opt.value = p.project_id;
      opt.textContent = p.title;
      if (p.project_id === state.activeProjectId) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.classList.toggle('hidden', state.projects.length === 0);
  }

  function switchTab(tabName) {
    state.activeTab = tabName;
    document.querySelectorAll('.tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-pane').forEach(function (p) {
      p.classList.toggle('hidden', p.id !== 'tab-' + tabName);
    });
    var hasRes = Boolean(state.workspace && state.workspace.result);
    $('style-toolbar').classList.toggle('hidden', !(hasRes && tabName === 'figure'));
    if ($('studio-stats-bar')) {
      $('studio-stats-bar').classList.toggle('hidden', !(tabName === 'figure' && state.lastCardRecommendations && state.lastCardRecommendations.length > 0));
    }
    if (tabName === 'explore' && state.workspace) {
      loadExploreGallery(state.workspace, false);
    }
  }

  async function applyCardAction(prepOps, plan, style, targetTab, recs) {
    if (!state.activeProjectId || state.busy) return;
    state.busy = true;
    try {
      if (recs !== undefined) {
        state.lastCardRecommendations = recs || [];
        state.lastCardPrepOps = [];
      }
      var ws = await api('/api/projects/' + state.activeProjectId + '/apply_card', {
        method: 'POST',
        json: {
          prep_ops: prepOps || [],
          plan: plan || null,
          style: style || null
        }
      });
      // Invalidate gallery cache if working sheet changed
      if (prepOps && prepOps.length) {
        state.exploreCacheKey = null;
      }
      renderWorkspace(ws, { targetTab: targetTab || (plan ? 'figure' : 'data') });
    } catch (err) {
      alert(err.message);
    } finally {
      state.busy = false;
    }
  }

  function renderStudioStatsBar() {
    var bar = $('studio-stats-bar');
    if (!bar) return;
    bar.innerHTML = '';
    var recs = state.lastCardRecommendations || [];
    if (!recs.length || state.activeTab !== 'figure') {
      bar.classList.add('hidden');
      return;
    }
    bar.classList.remove('hidden');
    var lbl = document.createElement('strong');
    lbl.textContent = 'Step ③ Add Analysis & Stars:';
    lbl.style.color = '#7c4a03';
    bar.appendChild(lbl);

    recs.forEach(function (opt) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn-stat-pill';
      b.textContent = opt.label;
      b.title = opt.summary || '';
      b.addEventListener('click', function () {
        var curPlot = ($('st-plot') && $('st-plot').value) ? $('st-plot').value : opt.plan.plot;
        var mergedPlan = Object.assign({}, opt.plan, { plot: curPlot });
        applyCardAction(state.lastCardPrepOps || [], mergedPlan, opt.style, 'figure', recs);
      });
      bar.appendChild(b);
    });

    var backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'btn btn-ghost btn-xs';
    backBtn.style.marginLeft = 'auto';
    backBtn.innerHTML = '&#8592; All Candidate Figures';
    backBtn.addEventListener('click', function () { switchTab('explore'); });
    bar.appendChild(backBtn);
  }

  function renderSheetOverview(ws) {
    var box = $('sheet-overview-box');
    if (!box) return;
    var ov = ws.spreadsheet_overview;
    if (!ov || !ov.available) {
      box.innerHTML = '';
      return;
    }
    var html = '<div class="overview-box">';
    html += '<h3>&#9312; Spreadsheet Description — ' + esc(ws.source.active_sheet || ws.source.filename) + '</h3>';
    html += '<p><strong>Detected Layout:</strong> ' + esc(ov.headline || '') + '</p>';
    var rep = ov.replicate_structure || {};
    if (rep.detected && rep.groups) {
      var gBits = Object.keys(rep.groups).map(function (g) {
        return '<strong>' + esc(g) + '</strong> (<code>' + esc(rep.groups[g].join(', ')) + '</code>)';
      });
      html += '<p><strong>Replicate Groups:</strong> ' + gBits.join(' vs ') + '</p>';
      if (rep.time_col && rep.time_labels && rep.time_labels.length) {
        html += '<p><strong>Timepoint / Stratum Column:</strong> <code>' + esc(rep.time_col) + '</code> (' + esc(rep.time_labels.slice(0, 8).join(', ')) + ')</p>';
      }
    }
    html += '<div class="prep-actions-row" id="prep-actions-container"></div>';
    html += '</div>';

    var colRows = ov.columns_overview || [];
    if (colRows.length) {
      html += '<h4>Column Summary (' + colRows.length + ' columns)</h4>';
      html += '<div class="table-wrap"><table class="sw-table"><thead><tr><th>Column</th><th>Role</th><th>Valid / Missing</th><th>Summary / Levels</th></tr></thead><tbody>';
      colRows.forEach(function (c) {
        var summaryTxt = '';
        if (c.kind === 'numeric' && c.mean !== undefined && c.mean !== null) {
          summaryTxt = 'Mean ' + formatCell(c.mean) + (c.sd !== null && c.sd !== undefined ? ' ± ' + formatCell(c.sd) : '') +
            ' (Range: ' + formatCell(c.min) + ' to ' + formatCell(c.max) + ')';
        } else if (c.sample_levels && c.sample_levels.length) {
          summaryTxt = c.distinct_count + ' levels: ' + c.sample_levels.join(', ');
        } else {
          summaryTxt = c.distinct_count + ' distinct';
        }
        html += '<tr><td><strong>' + esc(c.name) + '</strong></td><td>' + esc(c.kind) + '</td><td>' +
          esc((ws.source.row_count - (c.missing_count || 0)) + ' / ' + (c.missing_count || 0) + ' missing') +
          '</td><td>' + esc(summaryTxt) + '</td></tr>';
      });
      html += '</tbody></table></div>';
    }
    box.innerHTML = html;

    var actWrap = $('prep-actions-container');
    if (actWrap) {
      (ov.prep_actions || []).forEach(function (act) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-secondary btn-sm';
        btn.textContent = act.label;
        btn.title = act.description || '';
        btn.addEventListener('click', function () {
          applyCardAction(act.ops, null, null, 'data');
        });
        actWrap.appendChild(btn);
      });
      var goExplore = document.createElement('button');
      goExplore.type = 'button';
      goExplore.className = 'btn btn-primary btn-sm';
      goExplore.innerHTML = 'Open &#9313; Explore All Figures &#8594;';
      goExplore.addEventListener('click', function () { switchTab('explore'); });
      actWrap.appendChild(goExplore);
    }
  }

  async function loadExploreGallery(ws, forceReload) {
    var container = $('explore-container');
    if (!container || !ws || !ws.project) return;
    var key = ws.project.project_id + ':' + (ws.source.active_sheet || '') + ':' + (ws.source.sha256 || '') + ':' + ((ws.style && ws.style.palette) || 'teal');
    if (!forceReload && state.exploreCacheKey === key && state.exploreData) {
      renderExploreCards(state.exploreData, ws);
      return;
    }
    container.innerHTML = '<div class="figure-placeholder"><h3>Generating all exploratory figures…</h3><p>Building Timecourse, Normalized, Spaghetti, Grouped, and Distribution views from your spreadsheet.</p></div>';
    try {
      var data = await api('/api/projects/' + ws.project.project_id + '/explore');
      state.exploreCacheKey = key;
      state.exploreData = data;
      renderExploreCards(data, ws);
    } catch (err) {
      container.innerHTML = '<p class="muted">Could not build exploratory gallery: ' + esc(err.message) + '</p>';
    }
  }

  function renderExploreCards(data, ws) {
    var container = $('explore-container');
    if (!container) return;
    var ov = (data && data.overview) || ws.spreadsheet_overview || {};
    var cards = (data && data.cards) || [];
    container.innerHTML = '';

    var banner = document.createElement('div');
    banner.className = 'explore-header-banner';
    banner.innerHTML =
      '<div>' +
        '<strong style="color:#185c4b;">&#9312; ' + esc(ws.source.filename) + ' (' + ws.source.row_count + '×' + ws.source.column_count + '):</strong> ' +
        '<span style="font-size:12.5px;">' + esc(ov.headline || 'Inspect candidate visual views below before adding stars or p-values.') + '</span>' +
      '</div>';
    var btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:6px;align-items:center;';
    var descBtn = document.createElement('button');
    descBtn.type = 'button';
    descBtn.className = 'btn btn-ghost btn-xs';
    descBtn.innerHTML = '&#9312; Column Stats &amp; Working Sheets';
    descBtn.addEventListener('click', function () { switchTab('data'); });
    btnRow.appendChild(descBtn);

    var refreshBtn = document.createElement('button');
    refreshBtn.type = 'button';
    refreshBtn.className = 'btn btn-ghost btn-xs';
    refreshBtn.innerHTML = '&#8635; Refresh Views';
    refreshBtn.addEventListener('click', function () { loadExploreGallery(ws, true); });
    btnRow.appendChild(refreshBtn);
    banner.appendChild(btnRow);
    container.appendChild(banner);

    if (!cards.length) {
      var empty = document.createElement('p');
      empty.className = 'muted';
      empty.textContent = 'No automatic exploratory cards available for this sheet. Describe what you want to plot in chat on the left.';
      container.appendChild(empty);
      return;
    }

    // Seed default recommendations from the first card so Figure Studio always has Step 3 options handy
    if (!state.lastCardRecommendations || !state.lastCardRecommendations.length) {
      state.lastCardRecommendations = cards[0].recommended_analyses || [];
      state.lastCardPrepOps = cards[0].prep_ops || [];
    }

    var grid = document.createElement('div');
    grid.className = 'explore-grid';
    cards.forEach(function (card) {
      var el = document.createElement('div');
      el.className = 'explore-card';

      var top = document.createElement('div');
      top.className = 'explore-card-top';
      top.innerHTML =
        '<div><h4 class="explore-card-title">' + esc(card.title) + '</h4>' +
        '<p class="explore-card-sub">' + esc(card.subtitle) + '</p></div>' +
        '<span class="explore-badge">' + esc(card.badge || 'Plot') + '</span>';
      el.appendChild(top);

      var svgBox = document.createElement('div');
      svgBox.className = 'explore-svg-box';
      svgBox.title = 'Click to open and customize this plot in Figure Studio (no statistical test forced)';
      svgBox.innerHTML = card.svg || '';
      svgBox.addEventListener('click', function () {
        applyCardAction(card.prep_ops, card.explore_plan, card.explore_style, 'figure', card.recommended_analyses);
      });
      el.appendChild(svgBox);

      var actions = document.createElement('div');
      actions.className = 'explore-actions';

      var focusBtn = document.createElement('button');
      focusBtn.type = 'button';
      focusBtn.className = 'btn btn-secondary btn-xs';
      focusBtn.innerHTML = '&#128269; Customize Plot in Studio (No Stars Yet)';
      focusBtn.addEventListener('click', function () {
        applyCardAction(card.prep_ops, card.explore_plan, card.explore_style, 'figure', card.recommended_analyses);
      });
      actions.appendChild(focusBtn);

      var recs = card.recommended_analyses || [];
      if (recs.length) {
        var pillWrap = document.createElement('div');
        pillWrap.className = 'stat-pill-row';
        recs.forEach(function (opt) {
          var sb = document.createElement('button');
          sb.type = 'button';
          sb.className = 'btn-stat-pill';
          sb.textContent = opt.label;
          sb.title = opt.summary || '';
          sb.addEventListener('click', function () {
            applyCardAction(card.prep_ops, opt.plan, opt.style, 'figure', recs);
          });
          pillWrap.appendChild(sb);
        });
        actions.appendChild(pillWrap);
      }

      el.appendChild(actions);
      grid.appendChild(el);
    });
    container.appendChild(grid);
  }

  function renderPromptChips(ws) {
    var box = $('prompt-chips');
    box.innerHTML = '';
    var chips = [];
    if (!ws || !ws.source) {
      chips.push('Control: 12.4, 13.1, 11.8, 12.9 vs Drug: 21.5, 23.0, 20.8, 22.1 — build a working sheet and run a t-test');
      chips.push('Baseline: 45, 48, 42, 50 vs WashIn: 78, 84, 71, 88 — compute % change in a working sheet and plot paired lines');
    } else {
      var cols = (ws.preview_table && ws.preview_table.columns) || [];
      var ov = ws.spreadsheet_overview || {};
      var rep = ov.replicate_structure || {};
      if (rep.detected && rep.is_timecourse) {
        var refG = rep.suggested_ref_group || Object.keys(rep.groups)[0] || 'WT';
        chips.push('Reshape into tidy groups over time, normalize to % of ' + refG + ' mean, and run per-timepoint Welch t-tests with Holm stars');
        chips.push('Run Two-Way ANOVA (Group × Timepoint) on normalized % of ' + refG + ' mean with grouped bars and stars');
        chips.push('Run per-timepoint Mann–Whitney tests across timepoints and show a timecourse line plot');
      } else if (ws.source.is_clampflow) {
        if (ws.source.active_sheet === '2_PerSweep_LONG') {
          chips.push('Compare AP_Peak_mV by Group pooled by Cell_ID, independent observations');
          chips.push('Show a superplot with Okabe-Ito palette and SD error bars');
        } else {
          chips.push('Compare AP_Peak_mV by Group pooled by Animal_ID, independent observations');
          chips.push('Build a working sheet normalizing AP_Peak_mV to % of Vehicle mean, then plot');
          chips.push('Batch compare RMP_mV, Rin_MOhms, AP_Peak_mV, APD50_ms by Group, independent observations');
        }
      } else if (ov.detected_layout === 'survival_time_to_event' && ov.survival_structure && ov.survival_structure.detected) {
        var st = ov.survival_structure;
        var g0 = (st.group_cols && st.group_cols[0]) || '';
        if (g0) {
          chips.push('Kaplan-Meier survival of "' + st.time_col + '" and "' + st.event_col + '" by "' + g0 + '", independent observations');
          chips.push('Show exact log-rank p-value and stars with Okabe-Ito palette');
        } else {
          chips.push('Kaplan-Meier survival of "' + st.time_col + '" and "' + st.event_col + '", independent observations');
        }
      } else if (ov.detected_layout === 'plate_grid') {
        chips.push('Melt the 96-well plate grid into Row, Column, Well, and Value');
      } else if (ov.detected_layout === 'long_two_factor') {
        var colLower = cols.map(function (c) { return String(c).toLowerCase(); });
        var concIdx = colLower.findIndex(function (c) { return /conc|dose|molar|nm|um|log_conc/.test(c); });
        var voltIdx = colLower.findIndex(function (c) { return /volt|vm|mv|potential/.test(c); });
        if (concIdx !== -1 && cols.length >= 3) {
          chips.push('Fit 4PL dose-response curves of "' + cols[cols.length - 1] + '" vs "' + cols[concIdx] + '" by "' + cols[0] + '", independent observations');
        } else if (voltIdx !== -1 && cols.length >= 3) {
          chips.push('Fit Boltzmann V1/2 curves of "' + cols[cols.length - 1] + '" vs "' + cols[voltIdx] + '" by "' + cols[0] + '", independent observations');
        } else {
          chips.push('Compare Group at each Timepoint with Holm-adjusted Welch t-test stars on a timecourse plot');
          chips.push('Run a Two-Way ANOVA testing Group, Timepoint, and interaction with grouped boxes');
        }
      } else if (cols.length >= 2) {
        chips.push('Describe this spreadsheet and show all candidate figures');
        chips.push('Compare "' + cols[0] + '" and "' + cols[1] + '", independent observations');
        if (ov.detected_layout === 'long_grouped' || cols.length >= 3) {
          chips.push('Run one-way ANOVA with Tukey HSD post-hoc stars, independent observations');
        }
        chips.push('Build a tidy working sheet normalized to % of control mean and run a t-test');
        if (ws.result) {
          chips.push('Keep the same analysis, use Okabe-Ito palette and stars + exact p-value');
        }
      }
    }
    chips.forEach(function (text) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn btn-chip';
      b.textContent = text;
      b.addEventListener('click', function () {
        $('chat-input').value = text;
        $('chat-input').focus();
      });
      box.appendChild(b);
    });
  }

  function formatCell(v) {
    if (v === null || v === undefined || v === '') return '—';
    if (typeof v === 'number') {
      return Number.isInteger(v) ? String(v) : Number(v.toPrecision(5)).toString();
    }
    return String(v);
  }

  function renderWorkspace(ws, opts) {
    opts = opts || {};
    var prevProjectId = state.activeProjectId;
    var prevHadFigure = Boolean(state.workspace && state.workspace.figure_svg);
    if (prevProjectId !== ws.project.project_id) {
      state.lastCardRecommendations = [];
      state.lastCardPrepOps = [];
      state.exploreCacheKey = null;
    }
    state.workspace = ws;
    state.activeProjectId = ws.project.project_id;
    updateQuotaPill(ws.quota);

    var wSheets = ws.working_sheets || [];
    var isWorkingTab = wSheets.some(function (w) { return w.sheet_name === ws.source.active_sheet; });

    // Source banner
    $('source-banner').classList.remove('hidden');
    $('source-title').textContent = ws.source.filename;
    $('clampflow-badge').classList.toggle('hidden', !ws.source.is_clampflow);
    if ($('working-sheet-badge')) {
      $('working-sheet-badge').classList.toggle('hidden', !isWorkingTab);
    }
    $('source-dims').textContent = ws.source.row_count + ' rows × ' + ws.source.column_count + ' cols';
    $('source-hash').textContent = 'SHA-256: ' + String(ws.source.sha256 || '').slice(0, 12) + '…';

    var sheets = ws.source.sheets || [];
    var sheetWrap = $('sheet-select-wrap');
    var sheetSel = $('sheet-select');
    if (sheets.length > 1) {
      sheetWrap.classList.remove('hidden');
      sheetSel.innerHTML = '';
      sheets.forEach(function (s) {
        var opt = document.createElement('option');
        opt.value = s;
        var wMatch = wSheets.find(function (w) { return w.sheet_name === s; });
        opt.textContent = wMatch ? ('✨ ' + s + ' (working)') : s;
        if (s === ws.source.active_sheet) opt.selected = true;
        sheetSel.appendChild(opt);
      });
    } else {
      sheetWrap.classList.add('hidden');
    }

    // Chat log
    var chatLog = $('chat-log');
    chatLog.innerHTML = '';
    (ws.conversation || []).forEach(function (m) {
      var div = document.createElement('div');
      div.className = 'msg ' + (m.role === 'user' ? 'msg-user' : 'msg-assistant');
      div.innerHTML =
        '<div class="msg-role">' + (m.role === 'user' ? 'You' : 'StatWeave') + '</div>' +
        '<div class="msg-bubble">' + esc(m.text) + '</div>';
      chatLog.appendChild(div);
    });
    chatLog.scrollTop = chatLog.scrollHeight;

    // Pending proposal bar
    var prop = ws.pending_proposal;
    $('proposal-bar').classList.toggle('hidden', !prop);
    if (prop) {
      $('proposal-kind-text').textContent = 'Proposed ' + (prop.kind || 'analysis') + ' ready — click Approve & Run or ask follow-up questions.';
    }

    renderPromptChips(ws);

    // Enable/disable exports & style toolbar
    var hasResult = Boolean(ws.result);
    var hasTable = Boolean(ws.source && ws.source.column_count > 0);
    if ($('dl-xlsx-btn')) {
      $('dl-xlsx-btn').disabled = !hasTable;
    }
    ['dl-svg-btn', 'dl-pdf-btn', 'dl-png-btn', 'dl-zip-btn'].forEach(function (id) {
      $(id).disabled = !hasResult;
    });
    $('contribute-case-btn').classList.toggle('hidden', !hasResult);
    $('style-toolbar').classList.toggle('hidden', !hasResult);
    if (!hasResult && $('style-drawer')) {
      $('style-drawer').classList.add('hidden');
    }

    if (hasResult) {
      var plan = ws.plan || {};
      var rawStyle = ws.style || {};
      var eff = ws.effective_style || rawStyle;
      $('st-preset').value = rawStyle.preset || '';
      if (plan.plot) $('st-plot').value = plan.plot;
      $('st-palette').value = eff.palette || 'teal';
      $('st-errorbar').value = eff.error_bar || 'ci';
      $('st-pdisplay').value = eff.p_display || 'none';
      if ($('st-fill')) $('st-fill').value = eff.fill_style || 'tinted';
      if ($('st-points')) {
        $('st-points').value = (eff.show_points === false) ? 'hidden' : (eff.point_style || 'circle');
      }
      if ($('st-ptsize')) {
        var ps = Number(eff.point_size || 4);
        $('st-ptsize').value = ps <= 3.3 ? '3' : (ps <= 4.6 ? '4' : (ps <= 6.2 ? '5.5' : '7.2'));
      }
      if ($('st-jitter')) {
        var jw = Number(eff.jitter_width !== undefined ? eff.jitter_width : 0.16);
        $('st-jitter').value = jw <= 0.01 ? '0' : (jw <= 0.11 ? '0.08' : (jw <= 0.2 ? '0.16' : '0.25'));
      }
      if ($('st-capsize')) {
        var cs = Number(eff.cap_size !== undefined ? eff.cap_size : 3);
        $('st-capsize').value = cs <= 0.1 ? '0' : (cs <= 3.8 ? '3' : '5');
      }
      if ($('st-linewidth')) {
        var lw = Number(eff.line_width || 1.5);
        $('st-linewidth').value = lw <= 1.2 ? '1' : (lw <= 1.75 ? '1.5' : (lw <= 2.3 ? '2' : '2.6'));
      }
      if ($('st-frame')) $('st-frame').value = eff.frame_style || 'open_l';
      if ($('st-grid')) $('st-grid').value = eff.grid || 'none';
      if ($('st-font')) $('st-font').value = eff.font_family || 'sans';
      if ($('st-bg')) $('st-bg').value = eff.theme_bg || 'white';
      if ($('st-legend')) $('st-legend').value = eff.legend_loc || 'auto';
      if ($('st-yscale')) $('st-yscale').value = eff.yscale || 'linear';
      if ($('st-yzero')) $('st-yzero').checked = Boolean(eff.y_zero);
      if ($('st-hline')) $('st-hline').value = (rawStyle.hline !== undefined && rawStyle.hline !== null) ? String(rawStyle.hline) : '';
      if ($('st-title')) $('st-title').value = rawStyle.title || '';
      if ($('st-xlabel')) $('st-xlabel').value = rawStyle.xlabel || '';
      if ($('st-ylabel')) $('st-ylabel').value = rawStyle.ylabel || '';
    }

    // Figure SVG
    var figCanvas = $('figure-canvas');
    var figCap = $('figure-caption');
    if (ws.figure_svg) {
      var activeBg = ((ws.effective_style || ws.style || {}).theme_bg) || 'white';
      figCanvas.style.background = activeBg === 'dark'
        ? '#0f172a'
        : (activeBg === 'paper'
          ? '#faf8f5'
          : (activeBg === 'transparent'
            ? 'repeating-conic-gradient(#f1f5f9 0% 25%, #ffffff 0% 50%) 50% / 18px 18px'
            : '#ffffff'));
      figCanvas.innerHTML = ws.figure_svg;
      figCap.textContent = ws.figure_caption || '';
      figCap.classList.toggle('hidden', !ws.figure_caption);
    } else {
      figCanvas.style.background = '#ffffff';
      figCanvas.innerHTML =
        '<div class="figure-placeholder">' +
          '<h3>Ready for your analysis</h3>' +
          '<p>' + esc(ws.figure_caption || 'Choose a quick prompt below or describe your experimental question in plain language.') + '</p>' +
        '</div>';
      figCap.classList.add('hidden');
    }

    // Results & Accounting tab
    var resBox = $('results-container');
    if (ws.result) {
      var rhtml = '<h3>' + esc(ws.result.method || 'Analysis') + '</h3>';
      rhtml += '<p>' + esc(ws.result.summary || '') + '</p>';
      (ws.result.tables || []).forEach(function (t) {
        rhtml += '<h4>' + esc(t.title) + '</h4><div class="table-wrap"><table class="sw-table"><thead><tr>';
        (t.columns || []).forEach(function (c) { rhtml += '<th>' + esc(c) + '</th>'; });
        rhtml += '</tr></thead><tbody>';
        (t.rows || []).forEach(function (row) {
          rhtml += '<tr>';
          (t.columns || []).forEach(function (c) { rhtml += '<td>' + esc(formatCell(row[c])) + '</td>'; });
          rhtml += '</tr>';
        });
        rhtml += '</tbody></table></div>';
      });
      if (ws.result.warnings && ws.result.warnings.length) {
        rhtml += '<h4>Methodological Notes &amp; Disclosures</h4><div class="warnings-list">';
        ws.result.warnings.forEach(function (w) { rhtml += '<p>' + esc(w) + '</p>'; });
        rhtml += '</div>';
      }
      if (ws.result.unit_accounting) {
        rhtml += '<h4>Biological Unit Pooling Accounting</h4><pre style="font-size:11.5px;background:#f6f8f4;padding:10px;border-radius:8px;overflow:auto;">' +
          esc(JSON.stringify(ws.result.unit_accounting, null, 2)) + '</pre>';
      }
      if (ws.result.row_accounting) {
        rhtml += '<h4>Row &amp; Mask Accounting</h4><pre style="font-size:11.5px;background:#f6f8f4;padding:10px;border-radius:8px;overflow:auto;">' +
          esc(JSON.stringify(ws.result.row_accounting, null, 2)) + '</pre>';
      }
      resBox.innerHTML = rhtml;
    } else {
      resBox.innerHTML = '<p class="muted">Run an analysis to inspect statistical tables, assumptions, and row/biological-unit accounting.</p>';
    }

    // Step 1: Spreadsheet overview + Working Sheets preview tab
    renderSheetOverview(ws);
    var warnBox = $('data-warnings');
    warnBox.innerHTML = '';
    if (wSheets.length) {
      var wsDiv = document.createElement('div');
      wsDiv.style.cssText = 'background:#eef8f4;border:1px solid #bcd8cd;border-radius:8px;padding:8px 11px;margin-bottom:10px;font-size:12px;';
      var wsHtml = '<strong>Intermediate Working Sheets (' + wSheets.length + '):</strong> ';
      wsHtml += wSheets.map(function (w) {
        return '<code>' + esc(w.sheet_name) + '</code> (' + esc(w.summary) + ')';
      }).join(' &bull; ');
      wsHtml += ' — <em>Raw source stays read-only; click <strong>&#128202; Working .xlsx</strong> above to open all tabs in Google Sheets or Excel.</em>';
      wsDiv.innerHTML = wsHtml;
      warnBox.appendChild(wsDiv);
    }
    (ws.source.warnings || []).forEach(function (w) {
      var p = document.createElement('p');
      p.textContent = w;
      warnBox.appendChild(p);
    });
    var tblWrap = $('data-table-wrap');
    var pt = ws.preview_table || { columns: [], rows: [], row_numbers: [] };
    if (pt.columns.length) {
      var dhtml = '<h4>Active Sheet Cells (' + esc(ws.source.active_sheet || 'Source') + ')</h4><table class="sw-table"><thead><tr><th>Row #</th>';
      pt.columns.forEach(function (c) { dhtml += '<th>' + esc(c) + '</th>'; });
      dhtml += '</tr></thead><tbody>';
      pt.rows.forEach(function (r, idx) {
        dhtml += '<tr><td><strong>' + esc(pt.row_numbers[idx]) + '</strong></td>';
        r.forEach(function (cell) { dhtml += '<td>' + esc(formatCell(cell)) + '</td>'; });
        dhtml += '</tr>';
      });
      dhtml += '</tbody></table>';
      if (pt.truncated) {
        dhtml += '<p class="muted-tiny">Showing first 150 rows in preview; all ' + ws.source.row_count + ' rows remain intact for calculations.</p>';
      }
      tblWrap.innerHTML = dhtml;
    }

    // Audit tab
    var aud = '<p><strong>Source SHA-256:</strong> <code>' + esc(ws.source.sha256) + '</code></p>';
    aud += '<p><strong>Study Cluster ID (Leak-Free Split Key):</strong> <code>' + esc(ws.project.study_cluster_id) + '</code></p>';
    aud += '<h4>Agreed Analysis Plan</h4><pre style="font-size:11.5px;background:#f6f8f4;padding:10px;border-radius:8px;overflow:auto;">' +
      esc(JSON.stringify(ws.plan || {}, null, 2)) + '</pre>';
    aud += '<h4>Recent Tamper-Evident Audit Chain</h4><table class="sw-table"><thead><tr><th>UTC Timestamp</th><th>Event</th><th>Chain Hash</th></tr></thead><tbody>';
    (ws.audit_events || []).forEach(function (ev) {
      aud += '<tr><td>' + esc((ev.time_utc || '').slice(0, 19).replace('T', ' ')) + '</td><td>' + esc(ev.type) + '</td><td><code>' + esc(ev.hash_prefix) + '</code></td></tr>';
    });
    aud += '</tbody></table>';
    $('audit-container').innerHTML = aud;

    // Smart 3-Step Tab Selection
    var desiredTab = state.activeTab || 'explore';
    if (opts.targetTab) {
      desiredTab = opts.targetTab;
    } else if (ws.open_explore_gallery) {
      desiredTab = 'explore';
    } else if (ws.figure_svg && (!prevHadFigure || prevProjectId !== ws.project.project_id || state.activeTab === 'figure')) {
      desiredTab = 'figure';
    } else if (!ws.figure_svg && (prevProjectId !== ws.project.project_id || state.activeTab === 'figure')) {
      desiredTab = 'explore';
    }
    switchTab(desiredTab);
    renderStudioStatsBar();
  }

  async function loadRDatasets() {
    var wrap = $('r-learning-wrap');
    var sel = $('r-dataset-select');
    if (!wrap || !sel || sel.options.length > 0) return;
    try {
      var res = await api('/api/r_datasets');
      var items = (res && res.datasets) || [];
      if (!items.length) return;
      sel.innerHTML = '';
      var trackLabels = {
        track_1_ephys_pharma: 'Track 1 · Electrophysiology & Pharmacology',
        track_2_biomedical_clinical: 'Track 2 · Biomedical & Clinical Trials',
        track_3_messy_student: 'Track 3 · Messy Student Spreadsheets',
        track_4_classroom_open: 'Track 4 · Open Classroom Labs (HarvardX / OpenIntro)',
        r_core_32: 'Core R Repository Benchmarks'
      };
      var trackOrder = ['track_4_classroom_open', 'track_1_ephys_pharma', 'track_2_biomedical_clinical', 'track_3_messy_student', 'r_core_32'];
      var buckets = {};
      items.forEach(function (d) {
        var tr = d.track || 'r_core_32';
        if (!buckets[tr]) buckets[tr] = [];
        buckets[tr].push(d);
      });
      trackOrder.forEach(function (tr) {
        var list = buckets[tr];
        if (!list || !list.length) return;
        var grp = document.createElement('optgroup');
        grp.label = (trackLabels[tr] || tr) + ' (' + list.length + ')';
        list.forEach(function (d) {
          var opt = document.createElement('option');
          opt.value = d.id;
          opt.textContent = d.r_ref + ' — ' + d.archetype + ' (' + d.rows + '×' + d.cols + ')';
          grp.appendChild(opt);
        });
        sel.appendChild(grp);
      });
      wrap.classList.remove('hidden');
    } catch (e) {
      // Non-fatal if endpoint unavailable
    }
  }

  async function refreshProjectsAndOpenLatest() {
    var data = await api('/api/projects');
    state.projects = data.projects || [];
    updateQuotaPill(data.quota);
    renderProjectSwitcher();
    if (state.projects.length > 0 && !state.activeProjectId) {
      var ws = await api('/api/projects/' + state.projects[0].project_id);
      renderWorkspace(ws);
    } else if (!state.activeProjectId) {
      renderPromptChips(null);
    }
  }

  async function downloadWithAuth(url, fallbackName) {
    var resp = await api(url);
    var blob = await resp.blob();
    var disp = resp.headers.get('content-disposition') || '';
    var match = disp.match(/filename="?([^"]+)"?/i);
    var filename = (match && match[1]) ? match[1] : fallbackName;
    var objUrl = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = objUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(objUrl); }, 1500);
  }

  async function boot() {
    try {
      state.authConfig = await api('/api/auth/config');
    } catch (e) {
      $('mode-indicator').textContent = 'Server unreachable';
      return;
    }
    updateTopBar();
    try {
      var me = await api('/api/auth/me');
      state.user = me.user;
      updateTopBar();
      updateQuotaPill(me.quota);
      if (!state.user.permissions.contributor_ready) {
        $('consent-user-name').textContent = state.user.display_name;
        showGate('consent');
        return;
      }
      showGate('workbench');
      loadRDatasets();
      await refreshProjectsAndOpenLatest();
    } catch (e) {
      state.user = null;
      updateTopBar();
      renderAuthGate();
    }
  }

  // --- Wire UI Events ---
  document.addEventListener('DOMContentLoaded', function () {
    $('orcid-login-btn').addEventListener('click', function () { openOAuth('orcid'); });
    $('github-login-btn').addEventListener('click', function () { openOAuth('github'); });

    $('invite-login-form').addEventListener('submit', async function (ev) {
      ev.preventDefault();
      var errEl = $('auth-error');
      errEl.classList.add('hidden');
      try {
        var res = await api('/api/auth/invite', {
          method: 'POST',
          json: {
            display_name: $('inv-name').value.trim(),
            handle_or_orcid: $('inv-handle').value.trim(),
            affiliation: $('inv-affil').value.trim(),
            invite_code: $('inv-code').value,
            allow_private_evaluation: $('inv-consent-train').checked,
            allow_model_training: $('inv-consent-train').checked,
            allow_public_example_library: $('inv-consent-public').checked
          }
        });
        setToken(res.token);
        await boot();
      } catch (err) {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
      }
    });

    $('consent-form').addEventListener('submit', async function (ev) {
      ev.preventDefault();
      var errEl = $('consent-error');
      errEl.classList.add('hidden');
      try {
        await api('/api/auth/consent', {
          method: 'POST',
          json: {
            allow_private_evaluation: $('oauth-consent-train').checked,
            allow_model_training: $('oauth-consent-train').checked,
            allow_public_example_library: $('oauth-consent-public').checked,
            affiliation: $('consent-affil').value.trim()
          }
        });
        await boot();
      } catch (err) {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
      }
    });

    $('logout-btn').addEventListener('click', async function () {
      try { await api('/api/auth/logout', { method: 'POST' }); } catch (e) {}
      setToken(null);
      state.user = null;
      state.activeProjectId = null;
      state.projects = [];
      await boot();
    });

    $('project-switcher').addEventListener('change', async function (ev) {
      var pid = ev.target.value;
      if (!pid) return;
      var ws = await api('/api/projects/' + pid);
      renderWorkspace(ws);
    });

    // Demos
    document.querySelectorAll('.demo-btn').forEach(function (btn) {
      btn.addEventListener('click', async function () {
        if (state.busy) return;
        state.busy = true;
        try {
          var ws = await api('/api/projects/demo', { method: 'POST', json: { kind: btn.dataset.demo } });
          await refreshProjectsAndOpenLatest();
          renderWorkspace(ws);
          renderProjectSwitcher();
        } catch (err) {
          alert(err.message);
        } finally {
          state.busy = false;
        }
      });
    });

    // R Repository Learning Set (28 datasets)
    if ($('load-r-dataset-btn')) {
      $('load-r-dataset-btn').addEventListener('click', async function () {
        var sel = $('r-dataset-select');
        var dsId = sel ? sel.value : '';
        if (!dsId || state.busy) return;
        state.busy = true;
        $('load-r-dataset-btn').disabled = true;
        try {
          var ws = await api('/api/projects/r_dataset', { method: 'POST', json: { dataset_id: dsId } });
          await refreshProjectsAndOpenLatest();
          renderWorkspace(ws, { targetTab: 'explore' });
          renderProjectSwitcher();
        } catch (err) {
          alert(err.message);
        } finally {
          state.busy = false;
          $('load-r-dataset-btn').disabled = false;
        }
      });
    }

    // File upload
    $('file-upload-input').addEventListener('change', async function (ev) {
      var file = ev.target.files && ev.target.files[0];
      if (!file) return;
      var fd = new FormData();
      fd.append('file', file);
      try {
        var ws = await api('/api/projects/upload', { method: 'POST', body: fd });
        await refreshProjectsAndOpenLatest();
        renderWorkspace(ws);
        renderProjectSwitcher();
      } catch (err) {
        alert(err.message);
      } finally {
        ev.target.value = '';
      }
    });

    // Paste modal
    $('open-paste-btn').addEventListener('click', function () {
      $('paste-modal').classList.remove('hidden');
      $('paste-textarea').focus();
    });
    $('close-paste-btn').addEventListener('click', function () {
      $('paste-modal').classList.add('hidden');
    });
    $('fill-sample-paste-btn').addEventListener('click', function () {
      $('paste-title-input').value = 'Two-Column Patch-Clamp Rheobase (pA)';
      $('paste-textarea').value = 'Vehicle_pA\tDrug_X_pA\n95\t55\n90\t50\n105\t60\n85\t45\n100\t50\n90\t55';
    });
    $('submit-paste-btn').addEventListener('click', async function () {
      var txt = $('paste-textarea').value;
      if (!txt.trim()) return;
      try {
        var ws = await api('/api/projects/paste', {
          method: 'POST',
          json: {
            text: txt,
            title: $('paste-title-input').value.trim() || 'Pasted Table'
          }
        });
        $('paste-modal').classList.add('hidden');
        $('paste-textarea').value = '';
        await refreshProjectsAndOpenLatest();
        renderWorkspace(ws);
        renderProjectSwitcher();
      } catch (err) {
        alert(err.message);
      }
    });

    // Google Sheets URL modal
    if ($('open-gsheet-btn')) {
      $('open-gsheet-btn').addEventListener('click', function () {
        $('gsheet-modal').classList.remove('hidden');
        $('gsheet-url-input').focus();
      });
    }
    if ($('close-gsheet-btn')) {
      $('close-gsheet-btn').addEventListener('click', function () {
        $('gsheet-modal').classList.add('hidden');
      });
    }
    if ($('submit-gsheet-btn')) {
      $('submit-gsheet-btn').addEventListener('click', async function () {
        var url = $('gsheet-url-input').value.trim();
        if (!url) return;
        $('submit-gsheet-btn').disabled = true;
        $('submit-gsheet-btn').textContent = 'Importing…';
        try {
          var ws = await api('/api/projects/gsheet', {
            method: 'POST',
            json: {
              url: url,
              title: $('gsheet-title-input').value.trim()
            }
          });
          $('gsheet-modal').classList.add('hidden');
          $('gsheet-url-input').value = '';
          $('gsheet-title-input').value = '';
          await refreshProjectsAndOpenLatest();
          renderWorkspace(ws);
          renderProjectSwitcher();
        } catch (err) {
          alert(err.message);
        } finally {
          $('submit-gsheet-btn').disabled = false;
          $('submit-gsheet-btn').textContent = 'Import Google Sheet';
        }
      });
    }

    // Worksheet switch
    $('sheet-select').addEventListener('change', async function (ev) {
      if (!state.activeProjectId) return;
      try {
        var ws = await api('/api/projects/' + state.activeProjectId + '/sheet', {
          method: 'POST',
          json: { sheet: ev.target.value }
        });
        renderWorkspace(ws);
      } catch (err) {
        alert(err.message);
      }
    });

    // Chat turn (supports starting right from raw numbers or a Google Sheets link even before opening a file!)
    $('chat-form').addEventListener('submit', async function (ev) {
      ev.preventDefault();
      if (state.busy) return;
      var text = $('chat-input').value.trim();
      if (!text) return;
      var autoExec = Boolean($('draft-first-toggle') ? $('draft-first-toggle').checked : true);
      $('chat-input').value = '';
      state.busy = true;
      $('send-btn').disabled = true;
      $('send-btn').textContent = 'Working…';
      try {
        var ws;
        if (!state.activeProjectId) {
          ws = await api('/api/projects/chat_start', {
            method: 'POST',
            json: {
              message: text,
              mode: $('chat-mode-select').value,
              auto_execute: autoExec
            }
          });
          await refreshProjectsAndOpenLatest();
          renderWorkspace(ws);
          renderProjectSwitcher();
        } else {
          ws = await api('/api/projects/' + state.activeProjectId + '/chat', {
            method: 'POST',
            json: {
              message: text,
              mode: $('chat-mode-select').value,
              auto_execute: autoExec
            }
          });
          renderWorkspace(ws);
        }
      } catch (err) {
        alert(err.message);
      } finally {
        state.busy = false;
        $('send-btn').disabled = false;
        $('send-btn').textContent = 'Send';
      }
    });

    $('chat-input').addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' && !ev.shiftKey) {
        ev.preventDefault();
        $('chat-form').requestSubmit();
      }
    });

    // 1-click proposal approve / dismiss
    $('approve-proposal-btn').addEventListener('click', async function () {
      if (!state.activeProjectId || !state.workspace || !state.workspace.pending_proposal) return;
      try {
        var ws = await api('/api/projects/' + state.activeProjectId + '/proposal/approve', {
          method: 'POST',
          json: { proposal_id: state.workspace.pending_proposal.proposal_id }
        });
        renderWorkspace(ws);
      } catch (err) {
        alert(err.message);
      }
    });

    $('dismiss-proposal-btn').addEventListener('click', async function () {
      if (!state.activeProjectId) return;
      try {
        var ws = await api('/api/projects/' + state.activeProjectId + '/proposal/dismiss', { method: 'POST' });
        renderWorkspace(ws);
      } catch (err) {
        alert(err.message);
      }
    });

    // Instant zero-token style toolbar + expandable Appearance Studio drawer
    if ($('toggle-appearance-btn') && $('style-drawer')) {
      $('toggle-appearance-btn').addEventListener('click', function () {
        var hidden = $('style-drawer').classList.toggle('hidden');
        $('toggle-appearance-btn').innerHTML = hidden ? '&#127912; Appearance &#9662;' : '&#127912; Appearance &#9652;';
      });
    }

    function sendStylePatch(stylePatch, plotOverride) {
      if (!state.activeProjectId || !state.workspace || !state.workspace.result) return;
      api('/api/projects/' + state.activeProjectId + '/style', {
        method: 'POST',
        json: {
          plot: plotOverride !== undefined ? plotOverride : $('st-plot').value,
          style: stylePatch
        }
      }).then(function (ws) {
        renderWorkspace(ws, { targetTab: 'figure' });
      }).catch(function (err) {
        alert(err.message);
        if (state.workspace) renderWorkspace(state.workspace, { targetTab: 'figure' });
      });
    }

    $('st-preset').addEventListener('change', function () {
      var p = $('st-preset').value;
      sendStylePatch({ preset: p || null });
    });
    $('st-plot').addEventListener('change', function () {
      sendStylePatch({}, $('st-plot').value);
    });
    $('st-palette').addEventListener('change', function () {
      sendStylePatch({ palette: $('st-palette').value });
    });
    $('st-errorbar').addEventListener('change', function () {
      sendStylePatch({ error_bar: $('st-errorbar').value });
    });
    $('st-pdisplay').addEventListener('change', function () {
      sendStylePatch({ p_display: $('st-pdisplay').value });
    });

    if ($('st-fill')) $('st-fill').addEventListener('change', function () { sendStylePatch({ fill_style: $('st-fill').value }); });
    if ($('st-points')) $('st-points').addEventListener('change', function () {
      var v = $('st-points').value;
      if (v === 'hidden') sendStylePatch({ show_points: false });
      else sendStylePatch({ show_points: true, point_style: v });
    });
    if ($('st-ptsize')) $('st-ptsize').addEventListener('change', function () { sendStylePatch({ point_size: Number($('st-ptsize').value) }); });
    if ($('st-jitter')) $('st-jitter').addEventListener('change', function () { sendStylePatch({ jitter_width: Number($('st-jitter').value) }); });
    if ($('st-capsize')) $('st-capsize').addEventListener('change', function () { sendStylePatch({ cap_size: Number($('st-capsize').value) }); });
    if ($('st-linewidth')) $('st-linewidth').addEventListener('change', function () { sendStylePatch({ line_width: Number($('st-linewidth').value) }); });
    if ($('st-frame')) $('st-frame').addEventListener('change', function () { sendStylePatch({ frame_style: $('st-frame').value }); });
    if ($('st-grid')) $('st-grid').addEventListener('change', function () { sendStylePatch({ grid: $('st-grid').value }); });
    if ($('st-font')) $('st-font').addEventListener('change', function () { sendStylePatch({ font_family: $('st-font').value }); });
    if ($('st-bg')) $('st-bg').addEventListener('change', function () { sendStylePatch({ theme_bg: $('st-bg').value }); });
    if ($('st-legend')) $('st-legend').addEventListener('change', function () { sendStylePatch({ legend_loc: $('st-legend').value }); });
    if ($('st-yscale')) $('st-yscale').addEventListener('change', function () { sendStylePatch({ yscale: $('st-yscale').value }); });
    if ($('st-yzero')) $('st-yzero').addEventListener('change', function () { sendStylePatch({ y_zero: Boolean($('st-yzero').checked) }); });

    function applyCustomLabelsAndRefLine() {
      var hlRaw = $('st-hline') ? $('st-hline').value.trim() : '';
      var tRaw = $('st-title') ? $('st-title').value.trim() : '';
      var xlRaw = $('st-xlabel') ? $('st-xlabel').value.trim() : '';
      var ylRaw = $('st-ylabel') ? $('st-ylabel').value.trim() : '';
      sendStylePatch({
        hline: hlRaw !== '' ? Number(hlRaw) : null,
        title: tRaw || null,
        xlabel: xlRaw || null,
        ylabel: ylRaw || null
      });
    }
    if ($('st-apply-labels-btn')) {
      $('st-apply-labels-btn').addEventListener('click', applyCustomLabelsAndRefLine);
    }
    ['st-hline', 'st-title', 'st-xlabel', 'st-ylabel'].forEach(function (id) {
      if ($(id)) {
        $(id).addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            applyCustomLabelsAndRefLine();
          }
        });
      }
    });
    if ($('st-reset-btn')) {
      $('st-reset-btn').addEventListener('click', function () {
        sendStylePatch({ __reset__: true });
      });
    }

    // Tabs
    document.querySelectorAll('.tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchTab(btn.dataset.tab);
        renderStudioStatsBar();
      });
    });

    // Downloads
    if ($('dl-xlsx-btn')) {
      $('dl-xlsx-btn').addEventListener('click', function () {
        if (state.activeProjectId) downloadWithAuth('/api/projects/' + state.activeProjectId + '/workbook.xlsx', 'statweave_working_sheets.xlsx');
      });
    }
    $('dl-svg-btn').addEventListener('click', function () {
      if (state.activeProjectId) downloadWithAuth('/api/projects/' + state.activeProjectId + '/figure.svg', 'figure.svg');
    });
    $('dl-pdf-btn').addEventListener('click', function () {
      if (state.activeProjectId) downloadWithAuth('/api/projects/' + state.activeProjectId + '/figure.pdf', 'figure.pdf');
    });
    $('dl-png-btn').addEventListener('click', function () {
      if (state.activeProjectId) downloadWithAuth('/api/projects/' + state.activeProjectId + '/figure.png', 'figure.png');
    });
    $('dl-zip-btn').addEventListener('click', function () {
      if (state.activeProjectId) downloadWithAuth('/api/projects/' + state.activeProjectId + '/export.zip', 'statweave_reproducible.zip');
    });

    // Feedback & Contribution Case
    $('thumb-up-btn').addEventListener('click', async function () {
      if (!state.activeProjectId) return;
      await api('/api/projects/' + state.activeProjectId + '/feedback', {
        method: 'POST',
        json: { rating: 'up', note: 'Helpful stats and figure flow' }
      });
      $('thumb-up-btn').textContent = '✓ Saved!';
      setTimeout(function () { $('thumb-up-btn').innerHTML = '&#128077; Helpful'; }, 2000);
    });

    $('thumb-down-btn').addEventListener('click', async function () {
      if (!state.activeProjectId) return;
      var note = prompt('Briefly note what StatWeave misunderstood or how the figure should look:') || '';
      await api('/api/projects/' + state.activeProjectId + '/feedback', {
        method: 'POST',
        json: { rating: 'down', note: note }
      });
      $('thumb-down-btn').textContent = '✓ Logged';
      setTimeout(function () { $('thumb-down-btn').innerHTML = '&#128078; Flag issue'; }, 2000);
    });

    $('contribute-case-btn').addEventListener('click', async function () {
      if (!state.activeProjectId) return;
      var q = prompt('Optional: Describe the scientific question for this dataset case (or leave blank to auto-fill):') || '';
      try {
        var res = await api('/api/projects/' + state.activeProjectId + '/contribute', {
          method: 'POST',
          json: { scientific_question: q }
        });
        alert('Saved validated contribution case (' + res.case_id + ') to private review quarantine.');
      } catch (err) {
        alert(err.message);
      }
    });

    // Share Session / Question Packet with PI
    if ($('share-pi-btn') && $('share-pi-modal')) {
      $('share-pi-btn').addEventListener('click', function () {
        if (!state.activeProjectId) {
          alert('Load, paste, or open a dataset first so StatWeave can package your session.');
          return;
        }
        try {
          var savedVault = localStorage.getItem('statweave_pi_vault_url') || window.__statweaveFeedbackVaultUrl || '';
          if ($('share-pi-vault-url') && !$('share-pi-vault-url').value) {
            $('share-pi-vault-url').value = savedVault;
          }
        } catch (e) {}
        if ($('share-pi-status')) $('share-pi-status').textContent = '';
        $('share-pi-modal').classList.remove('hidden');
        if ($('share-pi-note')) $('share-pi-note').focus();
      });
      if ($('close-share-pi-btn')) {
        $('close-share-pi-btn').addEventListener('click', function () {
          $('share-pi-modal').classList.add('hidden');
        });
      }
      if ($('submit-share-pi-btn')) {
        $('submit-share-pi-btn').addEventListener('click', async function () {
          if (!state.activeProjectId) return;
          var btn = $('submit-share-pi-btn');
          var statusEl = $('share-pi-status');
          btn.disabled = true;
          btn.textContent = 'Packaging…';
          if (statusEl) statusEl.textContent = 'Building session packet…';
          try {
            var res = await api('/api/projects/' + state.activeProjectId + '/student_packet', {
              method: 'POST',
              json: {
                rating: $('share-pi-category') ? $('share-pi-category').value : 'review',
                student_note: $('share-pi-note') ? $('share-pi-note').value.trim() : '',
                include_table_values: $('share-pi-include-xlsx') ? $('share-pi-include-xlsx').checked : true
              }
            });
            // Trigger immediate .zip download from base64
            var bin = atob(res.zip_base64 || '');
            var bytes = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            var blob = new Blob([bytes], { type: 'application/zip' });
            var objUrl = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = objUrl;
            a.download = res.filename || 'StatWeave_Student_Session.zip';
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(function () { URL.revokeObjectURL(objUrl); }, 2000);

            var vaultUrl = ($('share-pi-vault-url') ? $('share-pi-vault-url').value.trim() : '');
            var vaultMsg = '';
            if (vaultUrl) {
              try { localStorage.setItem('statweave_pi_vault_url', vaultUrl); } catch (e) {}
              if (vaultUrl.indexOf('https://script.google.com/macros/s/') === 0 && res.vault_payload) {
                try {
                  await fetch(vaultUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(res.vault_payload)
                  });
                  vaultMsg = ' + sent deidentified trajectory & SVG to Lab Vault';
                } catch (vErr) {
                  vaultMsg = ' (Lab Vault POST skipped/offline; .zip downloaded)';
                }
              }
            }
            if (statusEl) {
              statusEl.textContent = '✓ Downloaded ' + (res.filename || 'session packet') + vaultMsg + '.';
            }
            setTimeout(function () { $('share-pi-modal').classList.add('hidden'); }, 1200);
          } catch (err) {
            alert(err.message);
            if (statusEl) statusEl.textContent = '';
          } finally {
            btn.disabled = false;
            btn.innerHTML = '&#11015; Download Session Packet (.zip)';
          }
        });
      }
    }

    // Account modal
    $('account-btn').addEventListener('click', async function () {
      if (!state.user) return;
      var contrib = await api('/api/me/contributions');
      $('account-details').innerHTML =
        '<p><strong>Signed in as:</strong> ' + esc(state.user.display_name) + ' (' + esc(state.user.auth_provider) + ')</p>' +
        '<p><strong>Captured Learning Trajectories:</strong> ' + (contrib.trajectories || []).length +
        ' &bull; <strong>Submitted Reviewed Cases:</strong> ' + (contrib.contribution_cases || []).length + '</p>';
      $('self-export-link').onclick = function (ev) {
        ev.preventDefault();
        downloadWithAuth('/api/me/export.zip', 'statweave_my_contributions.zip');
      };
      $('account-modal').classList.remove('hidden');
    });
    $('close-account-btn').addEventListener('click', function () {
      $('account-modal').classList.add('hidden');
    });
    $('anonymize-account-btn').addEventListener('click', async function () {
      if (!confirm('Unlink your OAuth identity/name and delist any public showcase? Anonymized training trajectories remain retained per Contributor Beta terms.')) {
        return;
      }
      await api('/api/me/anonymize', { method: 'POST' });
      setToken(null);
      $('account-modal').classList.add('hidden');
      await boot();
    });

    boot();
  });
})();
