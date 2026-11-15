/*! Standalone Carrd App Bundle (statweave) — Companion to clampflow-portal.js */
(function () {
  'use strict';
  if (window.__crpStandaloneAppLoaded_statweave) return;
  window.__crpStandaloneAppLoaded_statweave = true;

  var rawInjectedBase = "__STATWEAVE_PUBLIC_BASE_URL__";
  var rawCarrdUrl = "__STATWEAVE_CARRD_URL__";
  var rawClampflowUrl = "__CLAMPFLOW_CARRD_URL__";

  var statweaveCarrdUrl = (rawCarrdUrl && rawCarrdUrl.charAt(0) !== "_")
    ? rawCarrdUrl
    : "https://my-statweave.carrd.co";
  var clampflowCarrdUrl = (rawClampflowUrl && rawClampflowUrl.charAt(0) !== "_")
    ? rawClampflowUrl
    : "https://my-clampflow.carrd.co";

  function sanitizeBackendUrl(val) {
    var s = String(val || "").trim().replace(/\/+$/, "");
    if (!s || s.charAt(0) === "_") return "";
    if (/^https:\/\/[a-zA-Z0-9.-]+(?::\d+)?(?:\/.*)?$/.test(s)) return s.replace(/\/app.*$/, "");
    if (/^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(?:\/.*)?$/.test(s)) return s.replace(/\/app.*$/, "");
    return "";
  }

  function detectInitialBackendUrl() {
    try {
      var params = new URLSearchParams(window.location.search || "");
      var fromQuery = sanitizeBackendUrl(params.get("backend") || params.get("workbench"));
      if (fromQuery) {
        try { sessionStorage.setItem("statweave_backend_override", fromQuery); } catch (e) {}
        return fromQuery;
      }
      try {
        var saved = sanitizeBackendUrl(sessionStorage.getItem("statweave_backend_override") || localStorage.getItem("statweave_backend_url") || "");
        if (saved) return saved;
      } catch (e2) {}
    } catch (e3) {}
    var rootEl = document.getElementById("crp-hub-root");
    if (rootEl && rootEl.getAttribute("data-workbench-url")) {
      var fromAttr = sanitizeBackendUrl(rootEl.getAttribute("data-workbench-url"));
      if (fromAttr) return fromAttr;
    }
    return sanitizeBackendUrl(rawInjectedBase);
  }

  var statweaveBaseUrl = detectInitialBackendUrl();

  var SHELL_CSS = [
    "#text02, #text08, #divider04, #divider01, #text04, #buttons03, #divider02, #text06, #buttons04, #divider05, #text01, #text03, #text07, #buttons01, #buttons02, #buttons05, #divider03, #divider06 { display: none !important; }",
    "body { background-color: #070B14 !important; }",
    "body::before { background-image: radial-gradient(circle at 16% 10%, rgba(16, 185, 129, 0.18), transparent 42%), radial-gradient(circle at 85% 14%, rgba(56, 189, 248, 0.15), transparent 44%), linear-gradient(180deg, #070B14 0%, #0B1120 100%) !important; }",
    ".site-main > .inner, #main > .inner { width: min(96vw, 1560px) !important; max-width: 1560px !important; padding: 20px 18px 54px 18px !important; }",
    ".sw-step-chip { display: inline-flex; align-items: center; gap: 7px; padding: 6px 12px; border-radius: 10px; background: rgba(9, 14, 26, 0.82); border: 1px solid rgba(255, 255, 255, 0.12); font-size: 11.5px; font-weight: 600; color: #E2E8F0; }",
    ".crp-hub-pill { transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1); }",
    ".crp-hub-pill:hover { transform: translateY(-1px); border-color: #10B981 !important; background: rgba(30, 41, 59, 0.94) !important; box-shadow: 0 4px 14px rgba(0,0,0,0.4); }",
    ".crp-ctrl-btn { appearance: none; border: 1px solid #334155; background: #131C31; color: #E2E8F0; font-size: 11.5px; font-weight: 700; padding: 6px 10px; border-radius: 9px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-family: inherit; transition: all 0.15s ease; }",
    ".crp-ctrl-btn:hover { border-color: #10B981; color: #FFFFFF; background: #1E293B; }",
    ".sw-btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 10px 18px; border-radius: 11px; font-size: 12.5px; font-weight: 800; color: #090E1A !important; text-decoration: none !important; background: linear-gradient(135deg, #10B981 0%, #38BDF8 100%); box-shadow: 0 0 20px rgba(16, 185, 129, 0.35); border: none; cursor: pointer; transition: transform 0.16s ease, opacity 0.16s ease; }",
    ".sw-btn-primary:hover { transform: translateY(-1px); opacity: 0.95; }",
    ".sw-btn-sec { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 9px 14px; border-radius: 11px; font-size: 12px; font-weight: 700; color: #E2E8F0 !important; text-decoration: none !important; background: rgba(15, 23, 42, 0.88); border: 1px solid #475569; cursor: pointer; transition: border-color 0.16s ease, color 0.16s ease; }",
    ".sw-btn-sec:hover { border-color: #10B981; color: #6EE7B7 !important; }"
  ].join("\n");

  function mountModalAndStyles() {
    if (!document.getElementById('crp-statweave-style')) {
      var st = document.createElement('style');
      st.id = 'crp-statweave-style';
      st.textContent = SHELL_CSS;
      (document.head || document.documentElement).appendChild(st);
    }
    if (!document.getElementById('crp-rss-modal') && document.body) {
      var mHolder = document.createElement('div');
      mHolder.innerHTML =
        '<div id="crp-rss-modal" style="display:none;position:fixed;inset:0;background:rgba(3,7,18,0.84);backdrop-filter:blur(9px);z-index:1000001;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;text-align:left;">' +
          '<div style="width:100%;max-width:560px;background:#090E1A;border:1px solid #10B98188;border-radius:20px;padding:22px;box-shadow:0 25px 70px rgba(0,0,0,0.92);color:#F8FAFC;">' +
            '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;">' +
              '<div>' +
                '<div style="font-size:10.5px;font-weight:800;color:#10B981;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">Subscribe in Any Podcast App</div>' +
                '<h3 style="margin:0;font-size:19px;font-weight:800;color:#FFFFFF;">Deep Dive Podcast RSS Feeds</h3>' +
              '</div>' +
              '<button id="crp-rss-modal-close" type="button" style="background:#1E293B;border:1px solid #334155;color:#CBD5E1;border-radius:8px;padding:3px 9px;font-size:16px;cursor:pointer;">&times;</button>' +
            '</div>' +
            '<p style="font-size:12.5px;color:#CBD5E1;line-height:1.5;margin:0 0 14px 0;">Listen offline with variable-speed playback in <strong>Apple Podcasts</strong>, <strong>Overcast</strong>, <strong>Pocket Casts</strong>, or any RSS podcast player.</p>' +
            '<div style="background:rgba(15,23,42,0.95);border:1px solid #10B98155;border-radius:12px;padding:12px;margin-bottom:10px;">' +
              '<div style="font-size:11px;font-weight:800;color:#34D399;margin-bottom:6px;">Philosophy of Science, Causal Inference &amp; Biomedical Statistics Feed</div>' +
              '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:7px;">' +
                '<a href="podcast://yorekms.github.io/deep-dive-podcasts/feed-philosophy-science.xml" class="crp-ctrl-btn" style="background:#10B981;color:#090E1A;border-color:#10B981;text-decoration:none;font-weight:800;">Apple Podcasts</a>' +
                '<a href="overcast://x-callback-url/add?url=https://yorekms.github.io/deep-dive-podcasts/feed-philosophy-science.xml" class="crp-ctrl-btn" style="text-decoration:none;">Overcast</a>' +
                '<a href="pktc://subscribe/yorekms.github.io/deep-dive-podcasts/feed-philosophy-science.xml" class="crp-ctrl-btn" style="text-decoration:none;">Pocket Casts</a>' +
                '<button type="button" class="crp-ctrl-btn crp-copy-rss" data-rss="https://yorekms.github.io/deep-dive-podcasts/feed-philosophy-science.xml">Copy Feed URL</button>' +
              '</div>' +
              '<input type="text" readonly value="https://yorekms.github.io/deep-dive-podcasts/feed-philosophy-science.xml" onclick="this.select()" style="width:100%;padding:5px 8px;border-radius:6px;border:1px solid #334155;background:#050914;color:#94A3B8;font-family:monospace;font-size:11px;box-sizing:border-box;" />' +
            '</div>' +
            '<div style="background:rgba(15,23,42,0.95);border:1px solid rgba(255,255,255,0.14);border-radius:12px;padding:12px;">' +
              '<div style="font-size:11px;font-weight:800;color:#38BDF8;margin-bottom:6px;">Master Network Feed (All 746 Deep Dive Episodes)</div>' +
              '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:7px;">' +
                '<a href="podcast://yorekms.github.io/deep-dive-podcasts/feed.xml" class="crp-ctrl-btn" style="background:#38BDF8;color:#090E1A;border-color:#38BDF8;text-decoration:none;font-weight:800;">Apple Podcasts (All 746)</a>' +
                '<button type="button" class="crp-ctrl-btn crp-copy-rss" data-rss="https://yorekms.github.io/deep-dive-podcasts/feed.xml">Copy Master RSS URL</button>' +
                '<a href="https://yorekms.github.io/deep-dive-podcasts/" target="_blank" rel="noopener" class="crp-ctrl-btn" style="text-decoration:none;">All 12 Feeds Directory &#8599;</a>' +
              '</div>' +
              '<input type="text" readonly value="https://yorekms.github.io/deep-dive-podcasts/feed.xml" onclick="this.select()" style="width:100%;padding:5px 8px;border-radius:6px;border:1px solid #334155;background:#050914;color:#94A3B8;font-family:monospace;font-size:11px;box-sizing:border-box;" />' +
            '</div>' +
          '</div>' +
        '</div>';
      document.body.appendChild(mHolder.firstElementChild);
    }
  }

  function applyBackendUrl(baseUrl) {
    var clean = sanitizeBackendUrl(baseUrl);
    statweaveBaseUrl = clean;
    var fullLink = document.getElementById('sw-open-full-btn');
    var popLink = document.getElementById('sw-popout-link');
    var statusBadge = document.getElementById('sw-engine-status-badge');
    var bodyHost = document.getElementById('statweave-frame-body');
    if (!bodyHost) return;

    if (!clean) {
      if (fullLink) fullLink.href = '#statweave-frame-container';
      if (popLink) popLink.style.display = 'none';
      if (statusBadge) {
        statusBadge.style.color = '#FBBF24';
        statusBadge.innerHTML = '&#9679; Cloud Backend Ready to Link';
      }
      bodyHost.innerHTML =
        '<div style="padding:44px 24px;max-width:760px;margin:0 auto;text-align:left;color:#E2E8F0;">' +
          '<div style="display:inline-block;padding:4px 10px;border-radius:999px;background:rgba(56,189,248,0.16);border:1px solid rgba(56,189,248,0.45);color:#7DD3FC;font-size:11px;font-weight:800;text-transform:uppercase;margin-bottom:10px;">Cloud Workbench Endpoint Setup</div>' +
          '<h2 style="margin:0 0 10px 0;font-size:22px;font-weight:800;color:#FFFFFF;">Connect Your Live StatWeave Cloud Container</h2>' +
          '<p style="margin:0 0 16px 0;font-size:13.5px;line-height:1.6;color:#CBD5E1;">Paste your deployed HTTPS backend URL (Render, Railway, Fly.io, or Cloud Run) below to launch the interactive workbench immediately in this browser, or set <code style="color:#6EE7B7;">"workbenchUrl"</code> in <code style="color:#FDE68A;">hub/statweave-config.json</code> so every visitor connects automatically.</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">' +
            '<input id="sw-custom-backend-input" type="url" placeholder="https://statweave-workbench.onrender.com" style="flex:1;min-width:260px;padding:10px 12px;border-radius:10px;border:1px solid #334155;background:#050914;color:#F8FAFC;font-size:13px;font-family:monospace;" />' +
            '<button id="sw-connect-backend-btn" type="button" class="sw-btn-primary">Connect &amp; Launch Workbench &#8594;</button>' +
          '</div>' +
          '<div style="font-size:12px;color:#94A3B8;line-height:1.5;">Tip: You can also test any URL directly via <code style="color:#CBD5E1;">?backend=https://your-service-url</code> or launch zero-install from Google Drive using <code style="color:#6EE7B7;">StatWeave_Cloud_Workbench_Colab.ipynb</code>.</div>' +
        '</div>';
      var btn = document.getElementById('sw-connect-backend-btn');
      var inp = document.getElementById('sw-custom-backend-input');
      if (btn && inp) {
        btn.addEventListener('click', function () {
          var chosen = sanitizeBackendUrl(inp.value);
          if (!chosen) {
            inp.style.borderColor = '#EF4444';
            return;
          }
          try { localStorage.setItem('statweave_backend_url', chosen); } catch (e) {}
          applyBackendUrl(chosen);
        });
      }
      return;
    }

    var appUrl = clean + '/app?embedded=1';
    var fullUrl = clean + '/app';
    if (fullLink) fullLink.href = fullUrl;
    if (popLink) {
      popLink.href = fullUrl;
      popLink.style.display = 'inline';
    }
    if (statusBadge) {
      statusBadge.style.color = '#FBBF24';
      statusBadge.innerHTML = '&#9679; Waking Cloud Statistical Engine&hellip;';
    }
    bodyHost.innerHTML =
      '<iframe id="statweave-live-iframe" src="' + appUrl + '" title="StatWeave Contributor Workbench" style="width:100%;height:960px;min-height:84vh;border:none;display:block;background:#F4F6F2;" allow="clipboard-read; clipboard-write; fullscreen"></iframe>';

    fetch(clean + '/healthz', { mode: 'cors', cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && statusBadge) {
          statusBadge.style.color = '#34D399';
          statusBadge.innerHTML = '&#9679; Server-Protected OpenAI Key + SHA-256 Provenance';
        }
      })
      .catch(function () {});
  }

  function injectStatWeavePortal() {
    mountModalAndStyles();
    if (document.getElementById('crp-standalone-statweave-wrapper')) return;
    var target = document.querySelector('#main > .inner') || document.querySelector('.site-main > .inner') || document.querySelector('.inner') || document.body;
    if (!target) return;

    document.title = 'StatWeave — Conversational Scientific Statistics & Publication Figures — Matthew S. Yorek';

    var wrap = document.createElement('div');
    wrap.id = 'crp-standalone-statweave-wrapper';
    wrap.style.cssText = 'width:100%;max-width:1510px;margin:0 auto;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#F1F5F9;text-align:left;';

    var qrData = encodeURIComponent(statweaveCarrdUrl);
    var initFullUrl = statweaveBaseUrl ? (statweaveBaseUrl + '/app') : '#statweave-frame-container';
    var html = '';

    /* 1. TOP NETWORK HUB NAVIGATION BAR (2-row layout matching clampflow-portal.js & portal-analytics.js) */
    html += '<div id="crp-top-hub-nav" style="width:100%;max-width:1510px;margin:0 auto 14px auto;padding:9px 12px;background:rgba(9,14,26,0.88);border:1px solid rgba(16,185,129,0.42);border-radius:15px;box-shadow:0 10px 28px rgba(0,0,0,0.45);backdrop-filter:blur(14px);box-sizing:border-box;">' +
      '<div id="crp-hub-pills-row" style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;align-items:center;">' +
        '<a href="' + statweaveCarrdUrl + '" class="crp-hub-pill" style="display:inline-flex;align-items:center;gap:4px;padding:5px 11px;border-radius:999px;font-size:11px;font-weight:800;text-decoration:none;color:#090E1A;background:#10B981;box-shadow:0 0 14px rgba(16,185,129,0.55);border:1px solid #10B981;white-space:nowrap;">&#128202; StatWeave Stats</a>' +
        '<a href="' + clampflowCarrdUrl + '" class="crp-hub-pill" style="display:inline-flex;align-items:center;gap:4px;padding:5px 11px;border-radius:999px;font-size:11px;font-weight:700;text-decoration:none;color:#FDE68A;background:rgba(120,53,15,0.48);border:1px solid rgba(245,158,11,0.55);white-space:nowrap;">&#128200; ClampFlow ABF</a>' +
      '</div>' +
      '<div style="margin-top:8px;padding-top:7px;border-top:1px solid rgba(255,255,255,0.10);display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center;">' +
        '<span style="font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-right:2px;">Research Portals &amp; Feeds:</span>' +
        '<button type="button" id="crp-open-rss-modal-btn" style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:800;color:#090E1A;background:#10B981;border:1px solid #10B981;cursor:pointer;font-family:inherit;white-space:nowrap;">&#128225; Podcast App RSS</button>' +
      '</div>' +
    '</div>';

    /* 2. HERO HEADER + WORKFLOW CHIPS + QR CARD */
    html += '<div style="background:linear-gradient(135deg, rgba(6,78,59,0.38) 0%, rgba(14,116,144,0.28) 54%, rgba(15,23,42,0.95) 100%);border:1px solid rgba(16,185,129,0.45);border-radius:20px;padding:20px 24px;margin-bottom:16px;box-shadow:0 18px 45px rgba(0,0,0,0.55);">' +
      '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;">' +
        '<div style="flex:1;min-width:290px;">' +
          '<div style="display:inline-flex;align-items:center;gap:6px;padding:4px 11px;background:rgba(16,185,129,0.16);border:1px solid rgba(16,185,129,0.45);border-radius:999px;font-size:10.5px;font-weight:800;color:#6EE7B7;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">' +
            '&#128202; Conversational Lab Statistics &bull; ClampFlow 6-Tab Ready &bull; Any Computer' +
          '</div>' +
          '<h1 style="margin:0 0 7px 0;font-size:27px;font-weight:900;color:#FFFFFF;letter-spacing:-0.02em;line-height:1.18;">' +
            'StatWeave — Talk Through Your Experiment, Get Publication Figures' +
          '</h1>' +
          '<p style="margin:0 0 13px 0;font-size:13.5px;color:#CBD5E1;line-height:1.55;max-width:920px;">' +
            'Paste any <strong>2-column spreadsheet table</strong> or drop your compiled <strong>ClampFlow 6-tab Excel (<code style="color:#6EE7B7;">.xlsx</code>)</strong> workbook. Discuss experimental units, animal/cell pooling, and reversible technical masks in plain English while verified deterministic engines compute exact statistics, Superplots, multi-panel figures, and reproducible <code style="color:#FDE68A;">.zip</code> bundles.' +
          '</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">' +
            '<span class="sw-step-chip"><strong style="color:#34D399;">Step 1:</strong> Sign in (ORCID / GitHub / Lab Invite) &amp; Accept Contributor Terms</span>' +
            '<span class="sw-step-chip"><strong style="color:#38BDF8;">Step 2:</strong> Paste 2+ Columns or Drop <code style="color:#E2E8F0;">*_ClampFlow_Compiled.xlsx</code></span>' +
            '<span class="sw-step-chip"><strong style="color:#F59E0B;">Step 3:</strong> Refine Stats &amp; Figures &#8594; Export SVG, PDF, PNG &amp; Methods</span>' +
          '</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:9px;align-items:center;">' +
            '<a id="sw-open-full-btn" href="' + initFullUrl + '" target="_blank" rel="noopener" class="sw-btn-primary">&#128640; Open Full-Screen Workbench &#8599;</a>' +
            '<button id="sw-reload-frame-btn" type="button" class="sw-btn-sec">&#8635; Reload Embedded App</button>' +
            '<button id="sw-copy-link-btn" type="button" class="sw-btn-sec">&#128203; Copy Portal Link</button>' +
            '<a href="' + clampflowCarrdUrl + '" class="sw-btn-sec">&#128200; Compile Raw .abf in ClampFlow &#8594;</a>' +
            '<a href="https://my-scientific-software.carrd.co" class="sw-btn-sec">&#128187; All Scientific Software Suites &#8594;</a>' +
          '</div>' +
        '</div>' +
        '<div style="background:rgba(9,14,26,0.92);border:1px solid rgba(16,185,129,0.42);border-radius:16px;padding:12px 14px;display:flex;align-items:center;gap:12px;box-shadow:0 10px 25px rgba(0,0,0,0.45);flex-shrink:0;">' +
          '<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=' + qrData + '" alt="QR Code for my-statweave.carrd.co" width="96" height="96" style="border-radius:10px;background:#FFFFFF;padding:4px;flex-shrink:0;" />' +
          '<div style="max-width:175px;">' +
            '<div style="font-size:10.5px;font-weight:800;color:#34D399;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:3px;">Contributor Beta QR</div>' +
            '<div style="font-size:11.5px;color:#CBD5E1;line-height:1.4;margin-bottom:5px;">Open <strong>my-statweave.carrd.co</strong> on any lab rig or laptop.</div>' +
            '<div style="font-size:10.5px;color:#FBBF24;font-weight:700;">&#128274; Unpublished Raw Data Stays Private</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    /* 3. EMBEDDED LIVE STATWEAVE WORKBENCH CONTAINER */
    html += '<div id="statweave-frame-container" style="width:100%;margin:0 auto 18px auto;background:#0B0F17;border:1px solid rgba(16,185,129,0.45);border-radius:18px;overflow:hidden;box-shadow:0 24px 65px rgba(0,0,0,0.75);">' +
      '<div style="padding:9px 16px;background:rgba(15,23,42,0.95);border-bottom:1px solid rgba(255,255,255,0.10);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;">' +
        '<div style="display:flex;align-items:center;gap:7px;">' +
          '<span style="width:10px;height:10px;border-radius:50%;background:#EF4444;display:inline-block;"></span>' +
          '<span style="width:10px;height:10px;border-radius:50%;background:#F59E0B;display:inline-block;"></span>' +
          '<span style="width:10px;height:10px;border-radius:50%;background:#10B981;display:inline-block;"></span>' +
          '<span style="font-size:12px;color:#E2E8F0;font-weight:700;margin-left:6px;">Live StatWeave Contributor Workbench &mdash; Verified SciPy / Statsmodels Engine</span>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:12px;">' +
          '<span id="sw-engine-status-badge" style="font-size:11px;color:#34D399;font-weight:700;">&#9679; Server-Protected OpenAI Key + SHA-256 Provenance</span>' +
          '<a id="sw-popout-link" href="' + initFullUrl + '" target="_blank" rel="noopener" style="font-size:11.5px;color:#6EE7B7;text-decoration:none;font-weight:800;">Pop Out Full Screen &#8599;</a>' +
        '</div>' +
      '</div>' +
      '<div id="statweave-frame-body" style="min-height:420px;background:#0B0F17;"></div>' +
    '</div>';

    wrap.innerHTML = html;
    target.insertBefore(wrap, target.firstChild);

    applyBackendUrl(statweaveBaseUrl);

    /* If no backend URL was hardcoded, fetch hub/statweave-config.json from GitHub Pages */
    if (!statweaveBaseUrl) {
      var cfgBust = 'v=' + Math.floor(Date.now() / 60000);
      fetch('https://yorekms.github.io/deep-dive-podcasts/hub/statweave-config.json?' + cfgBust, { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (cfg) {
          if (cfg && cfg.workbenchUrl) {
            var resolved = sanitizeBackendUrl(cfg.workbenchUrl);
            if (resolved) applyBackendUrl(resolved);
          }
        })
        .catch(function () {});
    }

    var copyBtn = document.getElementById('sw-copy-link-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(statweaveCarrdUrl);
        }
        var orig = copyBtn.innerHTML;
        copyBtn.innerHTML = '&#9989; Copied my-statweave.carrd.co!';
        setTimeout(function () { copyBtn.innerHTML = orig; }, 2200);
      });
    }

    var reloadBtn = document.getElementById('sw-reload-frame-btn');
    if (reloadBtn) {
      reloadBtn.addEventListener('click', function () {
        if (statweaveBaseUrl) {
          var iframeEl = document.getElementById('statweave-live-iframe');
          if (iframeEl) iframeEl.src = statweaveBaseUrl + '/app?embedded=1&t=' + Date.now();
        }
      });
    }

    /* Load shared hub-nav / portal-analytics.js for Author Credentials Box, GA4, and 17-site pills */
    if (!window.__crpPortalAnalyticsLoaded && !document.getElementById('crp-shared-hub-nav-loader')) {
      var navScript = document.createElement('script');
      navScript.id = 'crp-shared-hub-nav-loader';
      navScript.src = 'https://yorekms.github.io/deep-dive-podcasts/hub/hub-nav.js';
      navScript.setAttribute('data-hub', 'statweave');
      (document.head || document.documentElement).appendChild(navScript);
    }

    /* Ensure StatWeave active pill stays present even before network.json PR merges */
    setTimeout(function () {
      var curNav = document.getElementById('crp-top-hub-nav');
      if (!curNav || !curNav.children || !curNav.children[0]) return;
      var row0 = curNav.children[0];
      if (row0.innerHTML.indexOf('my-statweave.carrd.co') === -1) {
        var pill = document.createElement('a');
        pill.href = statweaveCarrdUrl;
        pill.className = 'crp-hub-pill';
        pill.style.cssText = 'display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;text-decoration:none;white-space:nowrap;font-weight:800;color:#090E1A;background:#10B981;box-shadow:0 0 14px rgba(16,185,129,0.55);border:1px solid #10B981;';
        pill.innerHTML = '&#128202; StatWeave Stats';
        row0.appendChild(pill);
      }
    }, 1200);
  }

  function wireRssModal() {
    var modal = document.getElementById('crp-rss-modal');
    var openBtn = document.getElementById('crp-open-rss-modal-btn');
    var closeM = document.getElementById('crp-rss-modal-close');
    if (openBtn && modal && !openBtn.dataset.wired) {
      openBtn.dataset.wired = '1';
      openBtn.addEventListener('click', function () { modal.style.display = 'flex'; });
    }
    if (closeM && modal && !closeM.dataset.wired) {
      closeM.dataset.wired = '1';
      closeM.addEventListener('click', function () { modal.style.display = 'none'; });
      modal.addEventListener('click', function (e) { if (e.target === modal) modal.style.display = 'none'; });
    }
    if (modal) {
      modal.querySelectorAll('.crp-copy-rss').forEach(function (b) {
        if (b.dataset.wired) return;
        b.dataset.wired = '1';
        b.addEventListener('click', function () {
          var u = b.getAttribute('data-rss');
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u);
          var orig = b.textContent;
          b.textContent = 'Copied!';
          setTimeout(function () { b.textContent = orig; }, 2000);
        });
      });
    }
  }

  function boot() {
    injectStatWeavePortal();
    wireRssModal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  setInterval(wireRssModal, 1500);
})();
