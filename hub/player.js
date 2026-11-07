/*!
 * Deep Dive Podcast Network - shared Carrd hub player (v1.3.0).
 * Hosted on GitHub Pages: https://yorekms.github.io/deep-dive-podcasts/hub/player.js
 *
 * Each Carrd site only needs a tiny embed:
 *   <div id="crp-hub-root" data-hub="forensic-medicine"></div>
 *   <script src="https://yorekms.github.io/deep-dive-podcasts/hub/player.js" data-hub="forensic-medicine"></script>
 *
 * Episode lists live in hub/data/<hub>.json and site-wide settings (navigation, analytics ID,
 * feed counts) in hub/network.json, so publishing new episodes never requires a Carrd republish.
 * Built by tools/build_player.py (CSS/markup templates are injected at build time).
 */
(function () {
  'use strict';
  if (window.__crpHubLoaded) return;
  window.__crpHubLoaded = true;

  var CSS_TPL = "#divider04,#divider01,#divider02,#divider03,#divider05,#divider06,#text04,#text06,#text07,#text03,#text01,#buttons03,#buttons04,#buttons05,#buttons02,#buttons01{display:none !important} .site-main>.inner,#main>.inner{width:min(94vw,1040px) !important;max-width:1040px !important;padding-bottom:145px !important} #text02{font-size:2.35rem !important;margin-bottom:0.28rem !important;letter-spacing:-0.02em !important;line-height:1.12 !important} #text08{font-size:0.98rem !important;opacity:0.88 !important;margin-bottom:0.85rem !important;line-height:1.45 !important} .crp-hub-pill{transition:all 0.18s cubic-bezier(0.16,1,0.3,1)} .crp-hub-pill:hover{transform:translateY(-1px);border-color:{A} !important;background:rgba(30,41,59,0.94) !important;box-shadow:0 4px 12px rgba(0,0,0,0.35)} .crp-spd-btn,.crp-mini-chip{appearance:none;border:1px solid #334155;background:#131C31;color:#CBD5E1;font-size:10.5px;font-weight:700;padding:3px 7px;border-radius:7px;cursor:pointer;line-height:1.15;font-family:inherit;transition:all 0.15s ease} .crp-spd-btn:hover,.crp-mini-chip:hover{border-color:{A};color:#FFFFFF} .crp-spd-btn.active,.crp-mini-chip.active{background:{A};color:#090E1A;border-color:{A};box-shadow:0 0 10px {A}66} .crp-ctrl-btn{appearance:none;border:1px solid #334155;background:#131C31;color:#E2E8F0;font-size:11px;font-weight:700;padding:5px 9px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;font-family:inherit;transition:all 0.15s ease} .crp-ctrl-btn:hover{border-color:{A};color:#FFFFFF;background:#1E293B} #crp-seek{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:999px;background:#1E293B;outline:none;cursor:pointer;margin:0} #crp-seek::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:13px;height:13px;border-radius:50%;background:{A};border:2px solid #FFFFFF;box-shadow:0 0 9px {A};cursor:pointer} #crp-seek::-moz-range-thumb{width:13px;height:13px;border-radius:50%;background:{A};border:2px solid #FFFFFF;box-shadow:0 0 9px {A};cursor:pointer} .crp-sec-pill{appearance:none;border:1px solid rgba(255,255,255,0.16);background:rgba(15,23,42,0.82);color:#CBD5E1;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;cursor:pointer;transition:all 0.16s ease;font-family:inherit} .crp-sec-pill:hover{border-color:{A};color:#FFFFFF} .crp-sec-pill.active{background:{A};color:#090E1A;border-color:{A};box-shadow:0 0 11px {A}55} .crp-done-pill{appearance:none;border:1px solid rgba(16,185,129,0.45);background:rgba(6,78,59,0.34);color:#6EE7B7;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;cursor:pointer;transition:all 0.16s ease;font-family:inherit} .crp-done-pill:hover{border-color:#34D399;color:#ECFDF5;background:rgba(6,95,70,0.52)} .crp-done-pill.active{background:#10B981;color:#052E16;border-color:#34D399;box-shadow:0 0 11px rgba(16,185,129,0.5)} .crp-ep-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(238px,1fr));gap:7px;width:100%;margin:6px 0 16px 0} .crp-ep-btn{display:flex;align-items:center;gap:7px;width:100%;min-height:34px;padding:6px 9px;border-radius:8px;text-decoration:none !important;background:rgba(15,23,42,0.80);border:1px solid rgba(255,255,255,0.14);box-shadow:0 3px 10px rgba(0,0,0,0.24);backdrop-filter:blur(10px);color:#F8FAFC !important;font-size:12.2px;font-weight:600;line-height:1.25;text-align:left;box-sizing:border-box;transition:all 0.16s ease} .crp-ep-btn:hover{transform:translateY(-1px);background:rgba(30,41,59,0.95);border-color:{A};box-shadow:0 6px 16px rgba(0,0,0,0.4),0 0 12px {A}2B} .crp-ep-ico{width:16px;height:16px;border-radius:50%;background:{A}22;color:{A};display:inline-flex;align-items:center;justify-content:center;font-size:8.5px;flex-shrink:0;border:1px solid {A}55} .crp-ep-lbl{flex:1;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical} .crp-ep-tag{font-size:9.5px;font-weight:800;color:{A};background:{A}1A;border:1px solid {A}44;padding:1px 5px;border-radius:999px;flex-shrink:0} .crp-ep-chk{width:16px;height:16px;border-radius:50%;border:1px solid rgba(148,163,184,0.38);background:rgba(15,23,42,0.55);color:transparent;display:inline-flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:900;flex-shrink:0;cursor:pointer;transition:all 0.15s ease} .crp-ep-chk:hover{border-color:#34D399;color:#6EE7B7;background:rgba(16,185,129,0.20);transform:scale(1.14)} .crp-inprog-card{border-left:3px solid #F59E0B !important;background:rgba(30,27,18,0.80) !important} .crp-inprog-card .crp-ep-ico{border-color:#F59E0B;color:#FBBF24;background:rgba(245,158,11,0.18)} .crp-done-card{background:rgba(6,78,59,0.38) !important;border:1px solid rgba(16,185,129,0.50) !important;border-left:3px solid #10B981 !important} .crp-done-card:hover{background:rgba(6,95,70,0.54) !important;border-color:#34D399 !important} .crp-done-card .crp-ep-ico{background:rgba(16,185,129,0.22);border-color:#10B981;color:#34D399;font-weight:900} .crp-done-card .crp-ep-lbl{color:#CBD5E1 !important} .crp-done-card .crp-ep-tag{color:#6EE7B7;background:rgba(16,185,129,0.14);border-color:rgba(16,185,129,0.38)} .crp-done-card .crp-ep-chk{background:#10B981;border-color:#34D399;color:#052E16;box-shadow:0 0 8px rgba(16,185,129,0.45)} .crp-playing-card{border-color:{A} !important;box-shadow:0 0 0 2px {A}66,0 8px 20px rgba(0,0,0,0.5) !important;background:rgba(30,41,59,0.96) !important} #crp-sources-drawer{display:none;max-height:120px;overflow-y:auto;background:#050914;border:1px solid #1E293B;border-radius:11px;padding:8px 11px;margin-bottom:8px;font-size:11.5px;line-height:1.45;color:#CBD5E1} #crp-sources-drawer a{color:{A};text-decoration:none;font-weight:600} #crp-sources-drawer a:hover{text-decoration:underline} @media (max-width:640px){.crp-ep-grid{grid-template-columns:1fr} #text02{font-size:1.8rem !important} }";
  var MARKUP_TPL = "<div id=\"carrd-resonance-player\" style=\"display:none;position:fixed;bottom:14px;left:50%;transform:translateX(-50%);width:95%;max-width:680px;background:rgba(9,14,26,0.97);border:1px solid {A}99;box-shadow:0 24px 60px rgba(0,0,0,0.92),0 0 38px {A}40;border-radius:18px;padding:12px 15px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F1F5F9;backdrop-filter:blur(22px);box-sizing:border-box;-webkit-font-smoothing:antialiased;\"><div style=\"display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;\"><div style=\"display:flex;align-items:center;gap:9px;overflow:hidden;flex:1;\"><div id=\"crp-pulse\" style=\"width:9px;height:9px;border-radius:50%;background:#10B981;box-shadow:0 0 10px #10B981;flex-shrink:0;\"></div><div style=\"overflow:hidden;flex:1;\"><div id=\"crp-title\" style=\"font-size:13px;font-weight:800;color:#FFFFFF;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;\">Select an episode</div><div style=\"display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:10.5px;color:#94A3B8;font-weight:600;\"><span id=\"crp-status-text\">Variable-Speed Stream</span><button id=\"crp-restart-chip\" type=\"button\" style=\"display:none;background:rgba(16,185,129,0.16);border:1px solid rgba(16,185,129,0.45);color:#34D399;border-radius:999px;padding:1px 7px;font-size:10px;font-weight:700;cursor:pointer;\">&#8634; Start Over</button><button id=\"crp-done-chip\" type=\"button\" title=\"Toggle Listened mark for this episode in your browser\" style=\"display:none;background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.45);color:#6EE7B7;border-radius:999px;padding:1px 7px;font-size:10px;font-weight:700;cursor:pointer;\">&#9675; Mark Listened</button><button id=\"crp-sources-chip\" type=\"button\" style=\"display:none;background:rgba(148,163,184,0.14);border:1px solid {A}66;color:{A};border-radius:999px;padding:1px 7px;font-size:10px;font-weight:700;cursor:pointer;\">&#128218; Sources</button></div></div></div><div style=\"display:flex;align-items:center;gap:5px;flex-shrink:0;\"><button id=\"crp-share-btn\" type=\"button\" title=\"Copy direct link to this episode (Shift+click to include current timestamp)\" style=\"font-size:10px;font-weight:700;color:#E2E8F0;background:#131C31;border:1px solid #334155;padding:4px 7px;border-radius:6px;cursor:pointer;\">&#128279; Share</button><button id=\"crp-mode-btn\" type=\"button\" title=\"Switch between variable-speed player and Google Drive iframe backup player\" style=\"font-size:10px;font-weight:600;color:#94A3B8;background:#131C31;border:1px solid #334155;padding:4px 7px;border-radius:6px;cursor:pointer;\">Backup Player</button><a id=\"crp-dl-link\" href=\"#\" target=\"_blank\" rel=\"noreferrer\" data-no-player=\"true\" title=\"Download original .m4a file\" style=\"font-size:10px;font-weight:600;color:#CBD5E1;text-decoration:none;background:#131C31;border:1px solid #334155;padding:4px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:3px;\">&#10515; Save</a><a id=\"crp-studio-link\" href=\"https://ais-dev-v3n3vsl4pvdlmev4vcfv5b-514995804668.us-west1.run.app\" target=\"_blank\" rel=\"noreferrer\" title=\"Open interactive synchronized transcript studio\" style=\"font-size:10px;font-weight:800;color:#090E1A;background:{A};text-decoration:none;padding:4px 9px;border-radius:6px;display:inline-flex;align-items:center;gap:3px;box-shadow:0 0 12px {A}55;\">Transcript &#8599;</a><button id=\"crp-close-btn\" type=\"button\" aria-label=\"Close Player\" title=\"Close\" style=\"background:transparent;border:none;color:#94A3B8;cursor:pointer;font-size:20px;line-height:1;padding:2px 5px;margin-left:1px;\">&times;</button></div></div><div id=\"crp-sources-drawer\"></div><div id=\"crp-native-wrap\" style=\"background:#050914;border:1px solid #1E293B;border-radius:13px;padding:10px 12px;\"><audio id=\"crp-audio-el\" preload=\"metadata\" style=\"display:none;\"></audio><div style=\"display:flex;align-items:center;gap:10px;margin-bottom:9px;\"><span id=\"crp-time-cur\" style=\"font-size:11px;font-variant-numeric:tabular-nums;color:#E2E8F0;font-weight:700;min-width:42px;\">0:00</span><input id=\"crp-seek\" type=\"range\" min=\"0\" max=\"1000\" value=\"0\" step=\"1\" aria-label=\"Seek timeline\" /><span id=\"crp-time-tot\" style=\"font-size:11px;font-variant-numeric:tabular-nums;color:#94A3B8;font-weight:600;min-width:42px;text-align:right;\">--:--</span></div><div style=\"display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;\"><div style=\"display:flex;align-items:center;gap:5px;flex-wrap:wrap;\"><button id=\"crp-rew-btn\" type=\"button\" class=\"crp-ctrl-btn\" title=\"Rewind 15 seconds (J or Left Arrow)\">&#8630; 15s</button><button id=\"crp-play-btn\" type=\"button\" aria-label=\"Play or Pause\" title=\"Play / Pause (Space)\" style=\"width:36px;height:36px;border-radius:50%;border:none;background:{A};color:#090E1A;font-size:14px;font-weight:900;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 0 14px {A}70;\">&#9654;</button><button id=\"crp-fwd-btn\" type=\"button\" class=\"crp-ctrl-btn\" title=\"Skip forward 30 seconds (L or Right Arrow)\">30s &#8631;</button><button id=\"crp-autonext-btn\" type=\"button\" class=\"crp-mini-chip\" title=\"Automatically play next episode when finished\">Auto-Next</button><button id=\"crp-sleep-btn\" type=\"button\" class=\"crp-mini-chip\" title=\"Cycle sleep timer (Off / 15m / 30m / 45m / End of episode)\">Sleep</button><span id=\"crp-rem-badge\" style=\"font-size:10px;color:#64748B;font-weight:600;font-variant-numeric:tabular-nums;margin-left:1px;\"></span></div><div style=\"display:flex;align-items:center;gap:4px;flex-wrap:wrap;\"><span style=\"font-size:9.5px;font-weight:800;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;margin-right:2px;\">Speed</span><button type=\"button\" class=\"crp-spd-btn\" data-spd-step=\"-0.1\" title=\"Slower (-0.1x or [ key)\">&minus;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1\">1&times;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.25\">1.25&times;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.5\">1.5&times;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.75\">1.75&times;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd=\"2\">2&times;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd-step=\"0.1\" title=\"Faster (+0.1x or ] key)\">+</button><span id=\"crp-spd-readout\" style=\"font-size:11px;font-weight:800;color:{A};min-width:34px;text-align:center;font-variant-numeric:tabular-nums;\">1.0&times;</span></div></div></div><div id=\"crp-fallback-wrap\" style=\"display:none;width:100%;height:132px;border-radius:12px;overflow:hidden;background:#030712;border:1px solid #1E293B;position:relative;\"><iframe id=\"crp-stream-frame\" src=\"about:blank\" style=\"width:100%;height:132px;border:none;display:block;\" allow=\"autoplay\" loading=\"lazy\"></iframe></div></div><div id=\"crp-rss-modal\" style=\"display:none;position:fixed;inset:0;background:rgba(3,7,18,0.84);backdrop-filter:blur(9px);z-index:1000001;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-align:left;\"><div style=\"width:100%;max-width:560px;background:#090E1A;border:1px solid {A}88;border-radius:20px;padding:22px;box-shadow:0 25px 70px rgba(0,0,0,0.92);color:#F8FAFC;\"><div style=\"display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;\"><div><div style=\"font-size:10.5px;font-weight:800;color:{A};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;\">Subscribe in Any Podcast App</div><h3 style=\"margin:0;font-size:19px;font-weight:800;color:#FFFFFF;\">Deep Dive Podcast RSS Feeds</h3></div><button id=\"crp-rss-modal-close\" type=\"button\" style=\"background:#1E293B;border:1px solid #334155;color:#CBD5E1;border-radius:8px;padding:3px 9px;font-size:16px;cursor:pointer;\">&times;</button></div><p style=\"font-size:12.5px;color:#CBD5E1;line-height:1.5;margin:0 0 14px 0;\"> Listen offline with variable-speed playback in <strong>Apple Podcasts</strong>, <strong>Overcast</strong>, <strong>Pocket Casts</strong>, or any RSS podcast player. </p><div style=\"background:rgba(15,23,42,0.95);border:1px solid {A}55;border-radius:12px;padding:12px;margin-bottom:10px;\"><div style=\"font-size:11px;font-weight:800;color:{A};margin-bottom:6px;\">This Hub's Feed ({HUBT})</div><div style=\"display:flex;flex-wrap:wrap;gap:6px;margin-bottom:7px;\"><a href=\"podcast://{RSSNP}\" class=\"crp-ctrl-btn\" style=\"background:{A};color:#090E1A;border-color:{A};text-decoration:none;font-weight:800;\">Apple Podcasts</a><a href=\"overcast://x-callback-url/add?url={RSS}\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">Overcast</a><a href=\"pktc://subscribe/{RSSNP}\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">Pocket Casts</a><button type=\"button\" class=\"crp-ctrl-btn crp-copy-rss\" data-rss=\"{RSS}\">Copy Feed URL</button></div><input type=\"text\" readonly value=\"{RSS}\" onclick=\"this.select()\" style=\"width:100%;padding:5px 8px;border-radius:6px;border:1px solid #334155;background:#050914;color:#94A3B8;font-family:monospace;font-size:11px;box-sizing:border-box;\" /></div><div style=\"background:rgba(15,23,42,0.95);border:1px solid rgba(255,255,255,0.14);border-radius:12px;padding:12px;margin-bottom:12px;\"><div style=\"font-size:11px;font-weight:800;color:#38BDF8;margin-bottom:6px;\">Master Network Feed (All {MT} Deep Dive Episodes)</div><div style=\"display:flex;flex-wrap:wrap;gap:6px;margin-bottom:7px;\"><a href=\"podcast://yorekms.github.io/deep-dive-podcasts/feed.xml\" class=\"crp-ctrl-btn\" style=\"background:#38BDF8;color:#090E1A;border-color:#38BDF8;text-decoration:none;font-weight:800;\">Apple Podcasts (All {MT})</a><button type=\"button\" class=\"crp-ctrl-btn crp-copy-rss\" data-rss=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\">Copy Master RSS URL</button><a href=\"https://yorekms.github.io/deep-dive-podcasts/\" target=\"_blank\" rel=\"noopener\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">All {NF} Feeds Directory &#8599;</a></div><input type=\"text\" readonly value=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\" onclick=\"this.select()\" style=\"width:100%;padding:5px 8px;border-radius:6px;border:1px solid #334155;background:#050914;color:#94A3B8;font-family:monospace;font-size:11px;box-sizing:border-box;\" /></div></div></div>";
  var PLAYER_VERSION = "1.3.0";

  var scriptEl = document.currentScript;
  var rootEl = document.getElementById('crp-hub-root');
  var HUB = (scriptEl && scriptEl.getAttribute('data-hub')) ||
    (rootEl && rootEl.getAttribute('data-hub')) || window.CRP_HUB || '';
  var BASE = (scriptEl && scriptEl.src) ? scriptEl.src.replace(/player\.js(\?.*)?$/, '') :
    'https://yorekms.github.io/deep-dive-podcasts/hub/';

  var STUDIO_BASE = 'https://ais-dev-v3n3vsl4pvdlmev4vcfv5b-514995804668.us-west1.run.app';
  var STREAM_BASE = 'https://culturesource-primary-archive-of-cultural-politic.ai.studio/api/audio-stream/';
  var FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif";

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  }
  function slugify(s) {
    return String(s || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  function parseTimeParam(val) {
    if (!val) return 0;
    var s = String(val).trim().toLowerCase();
    if (/^\d+(\.\d+)?$/.test(s)) return Math.max(0, Math.floor(parseFloat(s)));
    var hms = s.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+(?:\.\d+)?)s?)?$/);
    if (hms && (hms[1] || hms[2] || hms[3])) {
      return (parseInt(hms[1] || '0', 10) * 3600) + (parseInt(hms[2] || '0', 10) * 60) + Math.floor(parseFloat(hms[3] || '0'));
    }
    var col = s.split(':').map(Number);
    if (col.length === 2 && !isNaN(col[0]) && !isNaN(col[1])) return col[0] * 60 + col[1];
    if (col.length === 3 && !isNaN(col[0]) && !isNaN(col[1]) && !isNaN(col[2])) return col[0] * 3600 + col[1] * 60 + col[2];
    return 0;
  }
  function formatTimeParam(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    if (h > 0) return h + 'h' + m + 'm' + (s ? s + 's' : '');
    if (m > 0) return m + 'm' + (s ? s + 's' : '');
    return s + 's';
  }
  function fetchJSON(url) {
    var bust = 'v=' + Math.floor(Date.now() / 300000);
    return fetch(url + (url.indexOf('?') === -1 ? '?' : '&') + bust, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url);
      return r.json();
    });
  }

  if (!HUB) {
    if (rootEl) rootEl.textContent = 'Podcast hub: missing data-hub attribute.';
    return;
  }

  Promise.all([
    fetchJSON(BASE + 'data/' + HUB + '.json'),
    fetchJSON(BASE + 'network.json').catch(function () { return {}; })
  ]).then(function (res) {
    boot(res[0], res[1] || {});
  }).catch(function (err) {
    if (rootEl) {
      rootEl.innerHTML = '<div style="padding:12px;border-radius:10px;background:#1E293B;color:#F8FAFC;font-family:' + FONT +
        ';font-size:13px;">The episode list could not load right now. Please refresh the page in a moment.</div>';
    }
    if (window.console) console.error('[crp-hub]', err);
  });

  function boot(cfg, net) {
    var A = cfg.accent || '#34D399';
    var masterTotal = net.master_total || '';
    var epMetaById = {};
    var localHubIds = {};
    (cfg.sections || []).forEach(function (s) {
      (s.episodes || []).forEach(function (ep) {
        if (ep && ep.id) {
          epMetaById[ep.id] = { ep: ep, sec: s.pill || s.heading || '' };
          localHubIds[ep.id] = true;
        }
      });
    });

    function tpl(s) {
      return s.split('{A}').join(A)
        .split('{HUBT}').join(esc(cfg.title))
        .split('{RSSNP}').join(String(cfg.rss || '').replace(/^https?:\/\//, ''))
        .split('{RSS}').join(cfg.rss || '')
        .split('{MT}').join(String(masterTotal))
        .split('{NF}').join(String(net.feed_count || ''));
    }

    // ---------- Redirect retired deep links (e.g. #forensic-medicine moved to its own site) ----------
    if (cfg.redirect_hashes && location.hash) {
      var h0 = location.hash.replace(/^#/, '').toLowerCase();
      for (var key in cfg.redirect_hashes) {
        if (Object.prototype.hasOwnProperty.call(cfg.redirect_hashes, key) && h0.indexOf(key) !== -1) {
          location.replace(cfg.redirect_hashes[key]);
          return;
        }
      }
    }

    // ---------- Inject RSS auto-discovery <link> + PodcastSeries JSON-LD ----------
    try {
      if (cfg.rss && !document.querySelector('link[type="application/rss+xml"]')) {
        var rssLink = document.createElement('link');
        rssLink.rel = 'alternate';
        rssLink.type = 'application/rss+xml';
        rssLink.title = (cfg.title || 'Deep Dive Podcast') + ' RSS Feed';
        rssLink.href = cfg.rss;
        document.head.appendChild(rssLink);
      }
      if (!document.getElementById('crp-podcast-jsonld')) {
        var ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.id = 'crp-podcast-jsonld';
        ld.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'PodcastSeries',
          name: cfg.title || 'Deep Dive Podcast Series',
          description: cfg.subtitle || '',
          url: cfg.url || location.origin + location.pathname,
          webFeed: cfg.rss || '',
          image: cfg.cover || 'https://yorekms.github.io/deep-dive-podcasts/covers/cover-master.png'
        });
        document.head.appendChild(ld);
      }
    } catch (e) {}

    // ---------- Styles + player/RSS markup ----------
    var styleEl = document.createElement('style');
    styleEl.id = 'crp-hub-style';
    styleEl.textContent = tpl(CSS_TPL) + (cfg.extra_css || '');
    document.head.appendChild(styleEl);

    var holder = document.createElement('div');
    holder.innerHTML = tpl(MARKUP_TPL);
    var mount = rootEl || document.body;
    while (holder.firstChild) mount.appendChild(holder.firstChild);

    // ---------- Analytics (GA4 + Google Tag GTM-PSHWV3TC / G-EJ2SRH8M0G) ----------
    var gaId = net.ga4_id || '';
    var gtmId = net.gtm_id || '';
    var gaOn = false;
    if (gaId || gtmId) {
      try {
        window.dataLayer = window.dataLayer || [];
        if (typeof window.gtag !== 'function') {
          window.gtag = function () { window.dataLayer.push(arguments); };
          var gs = document.createElement('script');
          gs.async = true;
          gs.src = gtmId
            ? ('https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(gtmId))
            : ('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId));
          document.head.appendChild(gs);
          window.gtag('js', new Date());
          if (gaId) window.gtag('config', gaId, { hub: HUB });
        }
        gaOn = true;
      } catch (e) { gaOn = false; }
    }
    function track(name, params) {
      if (!gaOn || typeof window.gtag !== 'function') return;
      try {
        var p = { hub: HUB };
        if (params) for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) p[k] = params[k];
        window.gtag('event', name, p);
      } catch (e) {}
    }

    // ---------- Player ----------
    var player = document.getElementById('carrd-resonance-player');
    var audioEl = document.getElementById('crp-audio-el');
    var nativeWrap = document.getElementById('crp-native-wrap');
    var fallbackWrap = document.getElementById('crp-fallback-wrap');
    var frameEl = document.getElementById('crp-stream-frame');
    var titleEl = document.getElementById('crp-title');
    var statusEl = document.getElementById('crp-status-text');
    var pulseEl = document.getElementById('crp-pulse');
    var restartChip = document.getElementById('crp-restart-chip');
    var doneChip = document.getElementById('crp-done-chip');
    var sourcesChip = document.getElementById('crp-sources-chip');
    var sourcesDrawer = document.getElementById('crp-sources-drawer');
    var shareBtn = document.getElementById('crp-share-btn');
    var modeBtn = document.getElementById('crp-mode-btn');
    var dlLink = document.getElementById('crp-dl-link');
    var studioLink = document.getElementById('crp-studio-link');
    var closeBtn = document.getElementById('crp-close-btn');
    var playBtn = document.getElementById('crp-play-btn');
    var rewBtn = document.getElementById('crp-rew-btn');
    var fwdBtn = document.getElementById('crp-fwd-btn');
    var autoNextBtn = document.getElementById('crp-autonext-btn');
    var sleepBtn = document.getElementById('crp-sleep-btn');
    var seekEl = document.getElementById('crp-seek');
    var curTimeEl = document.getElementById('crp-time-cur');
    var totTimeEl = document.getElementById('crp-time-tot');
    var remBadgeEl = document.getElementById('crp-rem-badge');
    var spdReadout = document.getElementById('crp-spd-readout');

    var currentDriveId = null;
    var currentCleanTitle = '';
    var currentGhUrl = '';
    var triedGhFallback = false;
    var usingFallback = false;
    var isScrubbing = false;
    var lastSavedSec = 0;
    var savedRate = 1.0;
    var autoNextOn = false;
    var sleepMode = 'off'; // 'off' | '15' | '30' | '45' | 'end'
    var sleepDeadlineMs = 0;
    var sleepTicker = null;
    var milestonesSent = {};

    try {
      var r0 = parseFloat(localStorage.getItem('crp_playback_rate') || '1');
      if (!isNaN(r0) && r0 >= 0.5 && r0 <= 3.0) savedRate = Math.round(r0 * 100) / 100;
      autoNextOn = localStorage.getItem('crp_autonext') === '1';
    } catch (e) {}

    function fmtTime(sec) {
      if (!isFinite(sec) || sec < 0) return '0:00';
      sec = Math.floor(sec);
      var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
      var ss = s < 10 ? '0' + s : '' + s;
      if (h > 0) return h + ':' + (m < 10 ? '0' + m : '' + m) + ':' + ss;
      return m + ':' + ss;
    }

    function syncAutoNextUI() {
      if (!autoNextBtn) return;
      if (autoNextOn) autoNextBtn.classList.add('active');
      else autoNextBtn.classList.remove('active');
    }
    syncAutoNextUI();

    function syncSleepUI() {
      if (!sleepBtn) return;
      clearInterval(sleepTicker);
      if (sleepMode === 'off') {
        sleepBtn.classList.remove('active');
        sleepBtn.textContent = 'Sleep';
        return;
      }
      sleepBtn.classList.add('active');
      if (sleepMode === 'end') {
        sleepBtn.textContent = 'Sleep: End';
        return;
      }
      var updateCountdown = function () {
        var leftSec = Math.max(0, Math.ceil((sleepDeadlineMs - Date.now()) / 1000));
        if (leftSec <= 0) {
          sleepMode = 'off';
          sleepDeadlineMs = 0;
          syncSleepUI();
          if (audioEl && !audioEl.paused) {
            audioEl.pause();
            if (statusEl) statusEl.textContent = 'Paused by sleep timer';
          }
          return;
        }
        sleepBtn.textContent = 'Sleep ' + Math.ceil(leftSec / 60) + 'm';
      };
      updateCountdown();
      sleepTicker = setInterval(updateCountdown, 10000);
    }

    var hideListened = false;
    var applyFilterRef = null;

    function isEpisodeDone(id) {
      if (!id) return false;
      try { return localStorage.getItem('crp_done_' + id) === '1'; } catch (e) { return false; }
    }

    function syncDoneChipUI() {
      if (!doneChip) return;
      if (!currentDriveId) {
        doneChip.style.display = 'none';
        return;
      }
      doneChip.style.display = 'inline-block';
      var done = isEpisodeDone(currentDriveId);
      if (done) {
        doneChip.innerHTML = '&#10003; Listened';
        doneChip.style.background = '#10B981';
        doneChip.style.borderColor = '#34D399';
        doneChip.style.color = '#052E16';
      } else {
        doneChip.innerHTML = '&#9675; Mark Listened';
        doneChip.style.background = 'rgba(15,23,42,0.9)';
        doneChip.style.borderColor = 'rgba(16,185,129,0.45)';
        doneChip.style.color = '#6EE7B7';
      }
    }

    function toggleEpisodeDone(id, forceVal) {
      if (!id) return false;
      var next = (typeof forceVal === 'boolean') ? forceVal : !isEpisodeDone(id);
      try {
        if (next) localStorage.setItem('crp_done_' + id, '1');
        else localStorage.removeItem('crp_done_' + id);
      } catch (e) {}
      refreshCardStates();
      syncDoneChipUI();
      if (typeof applyFilterRef === 'function') applyFilterRef();
      track('episode_mark_listened', { episode_id: id, listened: next ? 1 : 0 });
      return next;
    }

    function refreshCardStates() {
      document.querySelectorAll('.crp-ep-btn').forEach(function (a) {
        var href = a.getAttribute('href') || '';
        var m = href.match(/id=([a-zA-Z0-9_-]+)/);
        if (!m || !m[1]) return;
        var id = m[1];
        var ico = a.querySelector('.crp-ep-ico');
        var chk = a.querySelector('.crp-ep-chk');
        var done = false, pos = 0;
        try {
          done = localStorage.getItem('crp_done_' + id) === '1';
          pos = parseFloat(localStorage.getItem('crp_pos_' + id) || '0') || 0;
        } catch (e) {}
        a.classList.toggle('crp-done-card', done);
        a.classList.toggle('crp-inprog-card', !done && pos > 15);
        if (ico) ico.innerHTML = done ? '&#10003;' : '&#9654;';
        if (chk) {
          chk.setAttribute('aria-checked', done ? 'true' : 'false');
          chk.title = done ? 'Listened \u2022 Click check to mark unplayed' : 'Mark as Listened';
        }
        if (!done && pos > 15) a.title = 'In progress (' + fmtTime(pos) + ') \u2022 Click to resume';
        else if (done) a.title = 'Listened \u2022 Click to listen again (or click check on right to unmark)';
        else a.removeAttribute('title');
      });
      var doneFilterBtn = document.getElementById('crp-done-filter-pill');
      if (doneFilterBtn) {
        var totalLocal = Object.keys(localHubIds).length;
        var doneCount = 0;
        Object.keys(localHubIds).forEach(function (id) { if (isEpisodeDone(id)) doneCount++; });
        doneFilterBtn.classList.toggle('active', hideListened);
        if (hideListened) {
          doneFilterBtn.innerHTML = '&#10003; Unplayed Only (' + (totalLocal - doneCount) + ' left)';
        } else {
          doneFilterBtn.innerHTML = '&#10003; ' + doneCount + ' / ' + totalLocal + ' Listened';
        }
      }
    }

    function applySpeed(rate) {
      rate = Math.max(0.5, Math.min(3.0, Math.round(rate * 100) / 100));
      savedRate = rate;
      try { localStorage.setItem('crp_playback_rate', String(rate)); } catch (e) {}
      if (audioEl) {
        if ('preservesPitch' in audioEl) audioEl.preservesPitch = true;
        if ('webkitPreservesPitch' in audioEl) audioEl.webkitPreservesPitch = true;
        if ('mozPreservesPitch' in audioEl) audioEl.mozPreservesPitch = true;
        audioEl.playbackRate = rate;
        audioEl.defaultPlaybackRate = rate;
      }
      if (spdReadout) {
        var label = (Math.round(rate * 100) % 10 === 0) ? rate.toFixed(1) : rate.toFixed(2);
        spdReadout.textContent = label + '\u00d7';
      }
      if (player) {
        player.querySelectorAll('.crp-spd-btn[data-spd]').forEach(function (b) {
          var v = parseFloat(b.getAttribute('data-spd'));
          if (Math.abs(v - rate) < 0.005) b.classList.add('active'); else b.classList.remove('active');
        });
      }
      updateTimeUI();
    }

    function updateSeekBackground(pct) {
      if (!seekEl) return;
      pct = Math.max(0, Math.min(100, pct || 0));
      seekEl.style.background = 'linear-gradient(to right, ' + A + ' 0%, ' + A + ' ' + pct.toFixed(1) + '%, #1E293B ' +
        pct.toFixed(1) + '%, #1E293B 100%)';
    }

    function updateTimeUI() {
      if (!audioEl) return;
      var cur = audioEl.currentTime || 0;
      var dur = audioEl.duration;
      if (curTimeEl) curTimeEl.textContent = fmtTime(cur);
      if (isFinite(dur) && dur > 0) {
        if (totTimeEl) totTimeEl.textContent = fmtTime(dur);
        if (!isScrubbing && seekEl) {
          seekEl.value = String(Math.round((cur / dur) * 1000));
          updateSeekBackground((cur / dur) * 100);
        }
        if (remBadgeEl) {
          var remMin = Math.ceil(Math.max(0, (dur - cur) / (savedRate || 1)) / 60);
          remBadgeEl.textContent = Math.abs(savedRate - 1.0) > 0.01 ? ('-' + remMin + 'm left @ ' + savedRate + '\u00d7') : ('-' + remMin + 'm left');
        }
      } else {
        if (totTimeEl) totTimeEl.textContent = '--:--';
        if (remBadgeEl) remBadgeEl.textContent = '';
        updateSeekBackground(0);
      }
    }

    function switchToFallback(reason) {
      if (!currentDriveId) return;
      usingFallback = true;
      if (audioEl) { try { audioEl.pause(); audioEl.removeAttribute('src'); audioEl.load(); } catch (e) {} }
      if (nativeWrap) nativeWrap.style.display = 'none';
      if (fallbackWrap) fallbackWrap.style.display = 'block';
      if (frameEl) frameEl.src = 'https://drive.google.com/file/d/' + currentDriveId + '/preview';
      if (modeBtn) modeBtn.textContent = 'Speed Player';
      if (statusEl) statusEl.textContent = reason || 'Google Drive Backup Stream';
      if (restartChip) restartChip.style.display = 'none';
      track('stream_fallback', { fallback_to: 'drive_preview', episode_title: currentCleanTitle });
    }

    function switchToNative() {
      usingFallback = false;
      triedGhFallback = false;
      if (frameEl) frameEl.src = 'about:blank';
      if (fallbackWrap) fallbackWrap.style.display = 'none';
      if (nativeWrap) nativeWrap.style.display = 'block';
      if (modeBtn) modeBtn.textContent = 'Backup Player';
      if (currentDriveId) loadNativeStream(currentDriveId, currentCleanTitle, false, 0);
    }

    function playAdjacentEpisode(delta) {
      var cards = Array.from(document.querySelectorAll('#crp-curated-audio-hub .crp-ep-btn')).filter(function (c) {
        return c.style.display !== 'none' && c.closest('.crp-curated-sec') && c.closest('.crp-curated-sec').style.display !== 'none';
      });
      if (!cards.length) cards = Array.from(document.querySelectorAll('#crp-curated-audio-hub .crp-ep-btn'));
      if (!cards.length || !currentDriveId) return false;
      var idx = -1;
      for (var i = 0; i < cards.length; i++) {
        if ((cards[i].getAttribute('href') || '').indexOf(currentDriveId) !== -1) { idx = i; break; }
      }
      var nextIdx = idx + delta;
      if (nextIdx < 0 || nextIdx >= cards.length) return false;
      cards[nextIdx].click();
      return true;
    }

    function setupMediaSession(title) {
      if (!('mediaSession' in navigator) || !window.MediaMetadata) return;
      try {
        var coverUrl = cfg.cover || 'https://yorekms.github.io/deep-dive-podcasts/covers/cover-master.png';
        navigator.mediaSession.metadata = new MediaMetadata({
          title: title,
          artist: cfg.artist || cfg.title,
          album: 'Deep Dive Podcast Network',
          artwork: [{ src: coverUrl, sizes: '512x512', type: 'image/png' }]
        });
        navigator.mediaSession.setActionHandler('play', function () { if (audioEl) audioEl.play(); });
        navigator.mediaSession.setActionHandler('pause', function () { if (audioEl) audioEl.pause(); });
        navigator.mediaSession.setActionHandler('seekbackward', function () { if (audioEl) audioEl.currentTime = Math.max(0, audioEl.currentTime - 15); });
        navigator.mediaSession.setActionHandler('seekforward', function () { if (audioEl && isFinite(audioEl.duration)) audioEl.currentTime = Math.min(audioEl.duration, audioEl.currentTime + 30); });
        navigator.mediaSession.setActionHandler('seekto', function (d) { if (audioEl && d && typeof d.seekTime === 'number') audioEl.currentTime = d.seekTime; });
        navigator.mediaSession.setActionHandler('previoustrack', function () { playAdjacentEpisode(-1); });
        navigator.mediaSession.setActionHandler('nexttrack', function () { playAdjacentEpisode(1); });
      } catch (e) {}
    }

    function updateSourcesUI(driveId) {
      if (!sourcesChip || !sourcesDrawer) return;
      sourcesDrawer.style.display = 'none';
      sourcesChip.classList.remove('active');
      var meta = epMetaById[driveId] && epMetaById[driveId].ep;
      var sources = meta && meta.sources;
      var notes = meta && meta.notes;
      if ((!sources || !sources.length) && !notes) {
        sourcesChip.style.display = 'none';
        sourcesDrawer.innerHTML = '';
        return;
      }
      var html = '';
      if (notes) html += '<div style="margin-bottom:' + (sources && sources.length ? '6px' : '0') + ';color:#E2E8F0;">' + esc(notes) + '</div>';
      if (sources && sources.length) {
        html += '<div style="font-size:10px;font-weight:800;color:' + A + ';text-transform:uppercase;letter-spacing:0.06em;margin-bottom:3px;">Primary Sources &amp; References</div><ul style="margin:0;padding-left:16px;">';
        sources.forEach(function (item) {
          if (typeof item === 'string') {
            html += '<li>' + esc(item) + '</li>';
          } else if (item && item.title) {
            html += '<li>' + (item.url ? '<a href="' + esc(item.url) + '" target="_blank" rel="noopener">' + esc(item.title) + ' &#8599;</a>' : '<strong>' + esc(item.title) + '</strong>') +
              (item.detail ? ' — ' + esc(item.detail) : '') + '</li>';
          }
        });
        html += '</ul>';
      }
      sourcesDrawer.innerHTML = html;
      sourcesChip.style.display = 'inline-block';
    }

    function loadNativeStream(driveId, cleanTitle, useGhStream, forcedStartSec) {
      if (!audioEl) return;
      var streamUrl = (useGhStream && currentGhUrl) ? currentGhUrl : (STREAM_BASE + encodeURIComponent(driveId));
      if (useGhStream) track('stream_fallback', { fallback_to: 'github', episode_title: cleanTitle });
      if (statusEl) statusEl.textContent = 'Connecting stream...';
      if (playBtn) playBtn.innerHTML = '&#8987;';
      if (restartChip) restartChip.style.display = 'none';
      audioEl.src = streamUrl;
      audioEl.load();
      applySpeed(savedRate);
      setupMediaSession(cleanTitle);

      var resumeSec = 0;
      if (forcedStartSec && forcedStartSec > 0) {
        resumeSec = forcedStartSec;
      } else {
        try { resumeSec = parseFloat(localStorage.getItem('crp_pos_' + driveId) || '0'); } catch (e) {}
      }

      var onLoaded = function () {
        audioEl.removeEventListener('loadedmetadata', onLoaded);
        applySpeed(savedRate);
        if (forcedStartSec && forcedStartSec > 0 && isFinite(audioEl.duration) && forcedStartSec < audioEl.duration - 2) {
          audioEl.currentTime = forcedStartSec;
          if (statusEl) statusEl.textContent = 'Jumped to ' + fmtTime(forcedStartSec);
          if (restartChip) restartChip.style.display = 'inline-block';
        } else if (resumeSec > 15 && isFinite(audioEl.duration) && resumeSec < audioEl.duration - 20) {
          audioEl.currentTime = resumeSec;
          if (statusEl) statusEl.textContent = 'Resumed at ' + fmtTime(resumeSec);
          if (restartChip) restartChip.style.display = 'inline-block';
        } else if (statusEl) {
          statusEl.textContent = 'Playing at ' + savedRate + '\u00d7 speed';
        }
        updateTimeUI();
      };
      audioEl.addEventListener('loadedmetadata', onLoaded);

      var p = audioEl.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () {
          if (audioEl.error) {
            if (!triedGhFallback && currentGhUrl) {
              triedGhFallback = true;
              loadNativeStream(driveId, cleanTitle, true, forcedStartSec);
            } else {
              switchToFallback('Switched to Drive backup stream');
            }
          } else {
            if (playBtn) playBtn.innerHTML = '&#9654;';
            if (statusEl) statusEl.textContent = (forcedStartSec ? 'Queued at ' + fmtTime(forcedStartSec) + ' \u2022 ' : 'Ready \u2022 ') + 'Tap Play (' + savedRate + '\u00d7)';
          }
        });
      }
    }

    function highlightActiveCard(driveId) {
      document.querySelectorAll('.crp-playing-card').forEach(function (el) { el.classList.remove('crp-playing-card'); });
      if (!driveId) return;
      document.querySelectorAll('a[href*="' + driveId + '"]').forEach(function (a) { a.classList.add('crp-playing-card'); });
    }

    function playEpisode(driveId, title, ghUrl, section, forcedStartSec) {
      if (!driveId || !player) return;
      var cleanTitle = (title || 'Deep Dive Podcast')
        .replace(/\s*\b60m\b\s*$/i, '')
        .replace(/^[\s\u2022\u25B6\u25BA\u2192\u2013-]+/, '')
        .replace(/^Play\s*/i, '')
        .trim();
      currentDriveId = driveId;
      currentCleanTitle = cleanTitle;
      currentGhUrl = ghUrl || '';
      triedGhFallback = false;
      milestonesSent = {};
      if (titleEl) titleEl.textContent = cleanTitle;
      if (studioLink) studioLink.href = STUDIO_BASE + '/?driveId=' + encodeURIComponent(driveId) + '&title=' + encodeURIComponent(cleanTitle) + '&autoplay=1';
      if (dlLink) dlLink.href = 'https://drive.google.com/uc?export=download&id=' + driveId;
      updateSourcesUI(driveId);
      syncDoneChipUI();
      player.style.display = 'block';
      highlightActiveCard(driveId);

      usingFallback = false;
      if (frameEl) frameEl.src = 'about:blank';
      if (fallbackWrap) fallbackWrap.style.display = 'none';
      if (nativeWrap) nativeWrap.style.display = 'block';
      if (modeBtn) modeBtn.textContent = 'Backup Player';
      track('episode_play', { episode_title: cleanTitle, episode_id: driveId, section: section || '' });
      loadNativeStream(driveId, cleanTitle, false, forcedStartSec || 0);
    }

    if (audioEl) {
      audioEl.addEventListener('play', function () {
        if (playBtn) playBtn.innerHTML = '&#10074;&#10074;';
        if (pulseEl) { pulseEl.style.background = A; pulseEl.style.boxShadow = '0 0 10px ' + A; }
        applySpeed(savedRate);
        if (statusEl && (!statusEl.textContent || (statusEl.textContent.indexOf('Resumed') === -1 && statusEl.textContent.indexOf('Jumped') === -1))) {
          statusEl.textContent = 'Variable-Speed Stream \u2022 ' + savedRate + '\u00d7';
        }
      });
      audioEl.addEventListener('waiting', function () { if (statusEl) statusEl.textContent = 'Buffering audio...'; });
      audioEl.addEventListener('playing', function () {
        if (playBtn) playBtn.innerHTML = '&#10074;&#10074;';
        if (statusEl && statusEl.textContent === 'Buffering audio...') statusEl.textContent = 'Variable-Speed Stream \u2022 ' + savedRate + '\u00d7';
      });
      audioEl.addEventListener('pause', function () {
        if (playBtn) playBtn.innerHTML = '&#9654;';
        if (pulseEl) { pulseEl.style.background = '#F59E0B'; pulseEl.style.boxShadow = '0 0 8px #F59E0B'; }
        if (statusEl && !audioEl.ended && statusEl.textContent !== 'Paused by sleep timer') {
          statusEl.textContent = 'Paused \u2022 ' + savedRate + '\u00d7';
        }
      });
      audioEl.addEventListener('timeupdate', function () {
        updateTimeUI();
        if (currentDriveId && Math.abs(audioEl.currentTime - lastSavedSec) > 4) {
          lastSavedSec = audioEl.currentTime;
          try { localStorage.setItem('crp_pos_' + currentDriveId, String(Math.floor(audioEl.currentTime))); } catch (e) {}
          refreshCardStates();
        }
        var dur = audioEl.duration;
        if (currentDriveId && isFinite(dur) && dur > 0) {
          var pct = (audioEl.currentTime / dur) * 100;
          [25, 50, 75].forEach(function (m) {
            if (pct >= m && !milestonesSent[m]) {
              milestonesSent[m] = true;
              track('episode_progress', { percent: m, episode_title: currentCleanTitle, episode_id: currentDriveId });
            }
          });
          if (dur > 60 && pct >= 90 && !milestonesSent.done90) {
            milestonesSent.done90 = true;
            try { localStorage.setItem('crp_done_' + currentDriveId, '1'); } catch (e) {}
            refreshCardStates();
            syncDoneChipUI();
          }
        }
      });
      audioEl.addEventListener('ended', function () {
        if (playBtn) playBtn.innerHTML = '&#9654;';
        if (statusEl) statusEl.textContent = 'Episode finished';
        if (currentDriveId) {
          try {
            localStorage.removeItem('crp_pos_' + currentDriveId);
            localStorage.setItem('crp_done_' + currentDriveId, '1');
          } catch (e) {}
          refreshCardStates();
          syncDoneChipUI();
          track('episode_complete', { episode_title: currentCleanTitle, episode_id: currentDriveId });
        }
        if (sleepMode === 'end') {
          sleepMode = 'off';
          syncSleepUI();
          if (statusEl) statusEl.textContent = 'Finished \u2022 Sleep timer stopped playback';
          return;
        }
        if (autoNextOn) {
          playAdjacentEpisode(1);
        }
      });
      audioEl.addEventListener('error', function () {
        if (currentDriveId && !usingFallback) {
          if (!triedGhFallback && currentGhUrl) {
            triedGhFallback = true;
            loadNativeStream(currentDriveId, currentCleanTitle, true, 0);
          } else {
            switchToFallback('Switched to Drive backup stream');
          }
        }
      });
    }

    if (playBtn) playBtn.addEventListener('click', function () { if (audioEl && currentDriveId) { if (audioEl.paused) audioEl.play(); else audioEl.pause(); } });
    if (rewBtn) rewBtn.addEventListener('click', function () { if (audioEl) { audioEl.currentTime = Math.max(0, (audioEl.currentTime || 0) - 15); updateTimeUI(); } });
    if (fwdBtn) fwdBtn.addEventListener('click', function () {
      if (audioEl) { var dur = isFinite(audioEl.duration) ? audioEl.duration : (audioEl.currentTime + 30); audioEl.currentTime = Math.min(dur, (audioEl.currentTime || 0) + 30); updateTimeUI(); }
    });
    if (autoNextBtn) autoNextBtn.addEventListener('click', function () {
      autoNextOn = !autoNextOn;
      try { localStorage.setItem('crp_autonext', autoNextOn ? '1' : '0'); } catch (e) {}
      syncAutoNextUI();
    });
    if (sleepBtn) sleepBtn.addEventListener('click', function () {
      var order = ['off', '15', '30', '45', 'end'];
      var next = order[(order.indexOf(sleepMode) + 1) % order.length];
      sleepMode = next;
      sleepDeadlineMs = (next !== 'off' && next !== 'end') ? (Date.now() + parseInt(next, 10) * 60000) : 0;
      syncSleepUI();
    });
    if (doneChip) doneChip.addEventListener('click', function () {
      if (!currentDriveId) return;
      toggleEpisodeDone(currentDriveId);
    });
    if (sourcesChip && sourcesDrawer) sourcesChip.addEventListener('click', function () {
      var open = sourcesDrawer.style.display !== 'block';
      sourcesDrawer.style.display = open ? 'block' : 'none';
      sourcesChip.classList.toggle('active', open);
    });
    if (shareBtn) shareBtn.addEventListener('click', function (ev) {
      if (!currentDriveId) return;
      var base = (cfg.url || (location.origin + location.pathname)).replace(/\/+$/, '') + '/';
      var shareUrl = base + '?ep=' + encodeURIComponent(currentDriveId);
      if (ev && ev.shiftKey && audioEl && audioEl.currentTime > 5) {
        shareUrl += '&t=' + formatTimeParam(audioEl.currentTime);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).catch(function () {});
      }
      var origHtml = shareBtn.innerHTML;
      shareBtn.innerHTML = '&#10003; Copied';
      shareBtn.style.borderColor = A;
      shareBtn.style.color = A;
      setTimeout(function () {
        shareBtn.innerHTML = origHtml;
        shareBtn.style.borderColor = '#334155';
        shareBtn.style.color = '#E2E8F0';
      }, 2000);
      track('episode_share', { episode_title: currentCleanTitle, episode_id: currentDriveId, share_url: shareUrl });
    });
    if (restartChip) restartChip.addEventListener('click', function () {
      if (!audioEl) return;
      audioEl.currentTime = 0;
      restartChip.style.display = 'none';
      if (currentDriveId) {
        try {
          localStorage.removeItem('crp_pos_' + currentDriveId);
          localStorage.removeItem('crp_done_' + currentDriveId);
        } catch (e) {}
        refreshCardStates();
      }
      if (statusEl) statusEl.textContent = 'Variable-Speed Stream \u2022 ' + savedRate + '\u00d7';
      audioEl.play();
    });
    if (seekEl) {
      seekEl.addEventListener('input', function () {
        isScrubbing = true;
        if (audioEl && isFinite(audioEl.duration) && audioEl.duration > 0) {
          var target = (parseFloat(seekEl.value) / 1000) * audioEl.duration;
          if (curTimeEl) curTimeEl.textContent = fmtTime(target);
          updateSeekBackground(parseFloat(seekEl.value) / 10);
        }
      });
      seekEl.addEventListener('change', function () {
        if (audioEl && isFinite(audioEl.duration) && audioEl.duration > 0) {
          audioEl.currentTime = (parseFloat(seekEl.value) / 1000) * audioEl.duration;
        }
        isScrubbing = false;
        updateTimeUI();
      });
    }
    if (player) {
      player.querySelectorAll('.crp-spd-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var exact = btn.getAttribute('data-spd');
          var step = btn.getAttribute('data-spd-step');
          if (exact) applySpeed(parseFloat(exact));
          else if (step) applySpeed(savedRate + parseFloat(step));
        });
      });
    }
    if (modeBtn) modeBtn.addEventListener('click', function () { if (usingFallback) switchToNative(); else switchToFallback('Google Drive Backup Stream'); });
    if (closeBtn) closeBtn.addEventListener('click', function () {
      if (audioEl) { try { audioEl.pause(); audioEl.removeAttribute('src'); audioEl.load(); } catch (e) {} }
      if (frameEl) frameEl.src = 'about:blank';
      if (player) player.style.display = 'none';
      highlightActiveCard(null);
    });

    // Keyboard shortcuts when player is open and user is not typing in a field
    document.addEventListener('keydown', function (ev) {
      if (!player || player.style.display !== 'block' || !currentDriveId || usingFallback) return;
      var t = ev.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      if (ev.key === ' ') {
        ev.preventDefault();
        if (audioEl.paused) audioEl.play(); else audioEl.pause();
      } else if (ev.key === 'j' || ev.key === 'J' || ev.key === 'ArrowLeft') {
        ev.preventDefault();
        audioEl.currentTime = Math.max(0, (audioEl.currentTime || 0) - 15);
        updateTimeUI();
      } else if (ev.key === 'l' || ev.key === 'L' || ev.key === 'ArrowRight') {
        ev.preventDefault();
        var dur = isFinite(audioEl.duration) ? audioEl.duration : (audioEl.currentTime + 30);
        audioEl.currentTime = Math.min(dur, (audioEl.currentTime || 0) + 30);
        updateTimeUI();
      } else if (ev.key === '[') {
        ev.preventDefault();
        applySpeed(savedRate - 0.1);
      } else if (ev.key === ']') {
        ev.preventDefault();
        applySpeed(savedRate + 0.1);
      }
    });

    applySpeed(savedRate);

    // ---------- RSS modal ----------
    function wireRssModal() {
      var modal = document.getElementById('crp-rss-modal');
      var openBtn = document.getElementById('crp-open-rss-modal-btn');
      var closeM = document.getElementById('crp-rss-modal-close');
      if (openBtn && modal && !openBtn.dataset.wired) {
        openBtn.dataset.wired = '1';
        openBtn.addEventListener('click', function () { modal.style.display = 'flex'; track('rss_open', {}); });
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
            track('rss_copy', { feed_url: u });
          });
        });
        modal.querySelectorAll('a[href^="podcast://"], a[href^="overcast://"], a[href^="pktc://"]').forEach(function (a) {
          if (a.dataset.wired) return;
          a.dataset.wired = '1';
          a.addEventListener('click', function () { track('rss_subscribe', { app: a.textContent.trim() }); });
        });
      }
    }

    // ---------- Cross-Hub Network Search Cache ----------
    var networkEpCache = null;
    var networkEpPromise = null;
    function loadAllNetworkEpisodes() {
      if (networkEpCache) return Promise.resolve(networkEpCache);
      if (networkEpPromise) return networkEpPromise;
      var audioHubs = ['consciousness', 'cell-death', 'nutrition-metabolism', 'pharmacology',
        'forensic-medicine', 'ancient-medicine', 'philosophy-science', 'human-origins'];
      var siteLabelMap = {};
      (net.sites || []).forEach(function (s) { if (s.slug) siteLabelMap[s.slug] = s.label || s.slug; });
      networkEpPromise = Promise.all(audioHubs.filter(function (h) { return h !== HUB; }).map(function (slug) {
        return fetchJSON(BASE + 'data/' + slug + '.json').then(function (d) {
          var list = [];
          (d.sections || []).forEach(function (sec) {
            (sec.episodes || []).forEach(function (ep) {
              if (ep && ep.id) {
                if (!epMetaById[ep.id]) epMetaById[ep.id] = { ep: ep, sec: sec.pill || sec.heading || '' };
                list.push({
                  hubSlug: slug,
                  hubLabel: siteLabelMap[slug] || d.title || slug,
                  hubUrl: d.url || ('https://my-' + slug + '.carrd.co'),
                  sec: sec.pill || sec.heading || '',
                  ep: ep
                });
              }
            });
          });
          return list;
        }).catch(function () { return []; });
      })).then(function (arrays) {
        var flat = [];
        var seen = {};
        Object.keys(localHubIds).forEach(function (id) { seen[id] = true; });
        arrays.forEach(function (arr) {
          arr.forEach(function (item) {
            if (!seen[item.ep.id]) {
              seen[item.ep.id] = true;
              flat.push(item);
            }
          });
        });
        networkEpCache = flat;
        return flat;
      });
      return networkEpPromise;
    }

    // ---------- Hub UI (navigation, banner, filter bar, episode grid) ----------
    function navPillStyle(active) {
      return active ?
        'font-weight:800;color:#090E1A;background:' + A + ';box-shadow:0 0 14px ' + A + '66;border:1px solid ' + A + ';' :
        'font-weight:600;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);';
    }
    function buildNavHTML() {
      var sites = net.sites || [];
      var base = 'display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;text-decoration:none;white-space:nowrap;';
      var html = '<div id="crp-top-hub-nav" style="width:100%;max-width:1140px;margin:0 auto 16px auto;padding:9px 12px;background:rgba(9,14,26,0.84);border:1px solid ' + A +
        '44;border-radius:15px;box-shadow:0 10px 28px rgba(0,0,0,0.38);backdrop-filter:blur(14px);box-sizing:border-box;font-family:' + FONT + ';">';
      html += '<div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;align-items:center;">';
      sites.forEach(function (s) {
        var active = s.slug === HUB || (cfg.url && s.url === cfg.url);
        html += '<a href="' + esc(s.url) + '" class="crp-hub-pill" data-nav-target="' + esc(s.slug || s.url) + '" style="' + base + navPillStyle(active) + '">' + esc(s.label) + '</a>';
      });
      html += '</div><div style="margin-top:8px;padding-top:7px;border-top:1px solid rgba(255,255,255,0.10);display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center;">';
      html += '<span style="font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-right:2px;">Research Portals &amp; Feeds:</span>';
      (net.portals || []).forEach(function (pt) {
        html += '<a href="' + esc(pt.url) + '" target="_blank" rel="noopener" class="crp-hub-pill" data-nav-target="' + esc(pt.url) +
          '" style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:700;text-decoration:none;white-space:nowrap;color:' +
          esc(pt.color || '#E2E8F0') + ';background:' + esc(pt.bg || 'rgba(15,23,42,0.72)') + ';border:1px solid ' + esc(pt.border || 'rgba(255,255,255,0.14)') + ';">' + esc(pt.label) + ' \u2197</a>';
      });
      html += '<button type="button" id="crp-open-rss-modal-btn" data-series-rss="' + esc(cfg.rss || '') +
        '" style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:800;color:#090E1A;background:' + A +
        ';border:1px solid ' + A + ';cursor:pointer;font-family:inherit;white-space:nowrap;">\ud83d\udce1 Podcast App RSS</button>';
      html += '</div></div>';
      return html;
    }

    function epButtonHTML(ep, secIdx, badgeLabel) {
      var tagTxt = badgeLabel ? (badgeLabel + (ep.tag ? ' \u00b7 ' + ep.tag : '')) : (ep.tag || '');
      var tag = tagTxt ? '<span class="crp-ep-tag">' + esc(tagTxt) + '</span>' : '';
      return '<a href="https://drive.google.com/uc?export=download&amp;id=' + esc(ep.id) + '"' +
        (ep.gh ? ' data-gh-url="' + esc(ep.gh) + '"' : '') + ' data-sec="' + secIdx + '" class="crp-ep-btn" role="button">' +
        '<span class="crp-ep-ico">&#9654;</span><span class="crp-ep-lbl">' + esc(ep.label) + '</span>' + tag +
        '<span class="crp-ep-chk" role="checkbox" aria-checked="false" title="Mark as Listened">&#10003;</span></a>';
    }

    function buildHubHTML() {
      var secs = cfg.sections || [];
      var total = 0;
      secs.forEach(function (s) { total += (s.episodes || []).length; });
      var html = '<div id="crp-curated-audio-hub" style="width:100%;font-family:' + FONT + ';text-align:left;">';
      if (cfg.banner_html) html += cfg.banner_html;
      html += '<div id="crp-episode-filter-bar" style="width:100%;margin:0 auto 12px auto;padding:9px 12px;background:rgba(9,14,26,0.76);border:1px solid rgba(255,255,255,0.14);border-radius:12px;backdrop-filter:blur(12px);box-sizing:border-box;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;">';
      html += '<div style="display:flex;flex-wrap:wrap;gap:5px;align-items:center;">';
      html += '<button type="button" class="crp-sec-pill active" data-sec-idx="all">All (' + total + ')</button>';
      secs.forEach(function (s, i) {
        html += '<button type="button" class="crp-sec-pill" data-sec-idx="' + i + '">' + esc(s.pill || s.heading) + ' (' + (s.episodes || []).length + ')</button>';
      });
      html += '<button type="button" id="crp-done-filter-pill" class="crp-done-pill" title="Click to toggle hiding episodes you have already listened to">&#10003; 0 / ' + total + ' Listened</button>';
      html += '</div><div style="position:relative;flex:1;min-width:190px;max-width:280px;"><input id="crp-ep-search" type="search" placeholder="Search ' + total +
        ' episodes..." aria-label="Search episodes" style="width:100%;padding:5px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.18);background:rgba(15,23,42,0.92);color:#F8FAFC;font-size:12px;outline:none;box-sizing:border-box;font-family:inherit;" /></div></div>';
      html += '<div id="crp-net-search-wrap" style="display:none;margin:0 0 14px 0;"></div>';
      secs.forEach(function (s, i) {
        var eps = s.episodes || [];
        var countLbl = s.count_label || (eps.length + ' episode' + (eps.length === 1 ? '' : 's'));
        html += '<div class="crp-curated-sec" data-sec-block="' + i + '" id="' + esc(s.anchor || slugify(s.pill || s.heading)) + '-episodes">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin:8px 0 5px 0;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.12);">' +
          '<h2 style="margin:0;font-size:14.5px;font-weight:800;color:#FFFFFF;letter-spacing:-0.01em;">' + esc(s.heading) + '</h2>' +
          '<span style="font-size:10.5px;font-weight:700;color:#94A3B8;">' + esc(countLbl) + '</span></div><div class="crp-ep-grid">';
        eps.forEach(function (ep) { html += epButtonHTML(ep, i, ''); });
        html += '</div></div>';
      });
      html += '</div>';
      return html;
    }

    function sectionForHash(hash) {
      var h = String(hash || '').replace(/^#/, '').toLowerCase();
      if (!h) return null;
      var secs = cfg.sections || [];
      for (var i = 0; i < secs.length; i++) {
        var keys = [slugify(secs[i].pill), slugify(secs[i].heading), secs[i].anchor].concat(secs[i].hash_aliases || []);
        for (var k = 0; k < keys.length; k++) {
          if (keys[k] && (h === keys[k] || h.indexOf(keys[k]) !== -1 || keys[k].indexOf(h) === 0)) return String(i);
        }
      }
      return null;
    }

    var deepLinkHandled = false;
    function handleDeepLinkEpisode() {
      if (deepLinkHandled) return;
      try {
        var sp = new URLSearchParams(location.search);
        var epParam = (sp.get('ep') || sp.get('episode') || '').trim();
        if (!epParam) return;
        deepLinkHandled = true;
        var tSec = parseTimeParam(sp.get('t') || sp.get('time') || '');
        var wantSlug = slugify(epParam);
        var targetCard = null;
        var cards = document.querySelectorAll('#crp-curated-audio-hub .crp-ep-btn');
        for (var i = 0; i < cards.length; i++) {
          var href = cards[i].getAttribute('href') || '';
          var m = href.match(/id=([a-zA-Z0-9_-]+)/);
          var id = m ? m[1] : '';
          var lbl = (cards[i].querySelector('.crp-ep-lbl') || cards[i]).textContent || '';
          if (id === epParam || (wantSlug && slugify(lbl).indexOf(wantSlug) !== -1)) {
            targetCard = cards[i];
            break;
          }
        }
        if (targetCard) {
          var href2 = targetCard.getAttribute('href') || '';
          var m2 = href2.match(/id=([a-zA-Z0-9_-]+)/);
          if (m2 && m2[1]) {
            var lbl2 = (targetCard.querySelector('.crp-ep-lbl') || targetCard).textContent.trim();
            var secIdx = targetCard.getAttribute('data-sec');
            var secName = (secIdx !== null && cfg.sections && cfg.sections[+secIdx]) ? (cfg.sections[+secIdx].pill || cfg.sections[+secIdx].heading) : '';
            setTimeout(function () {
              try { targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
              playEpisode(m2[1], lbl2, targetCard.getAttribute('data-gh-url') || '', secName, tSec);
            }, 150);
          }
        }
      } catch (e) {}
    }

    function injectHubUI() {
      var titleNode = document.getElementById('text02');
      var subNode = document.getElementById('text08');
      document.title = cfg.page_title || cfg.title;
      if (titleNode) titleNode.textContent = cfg.title;
      if (subNode) subNode.textContent = cfg.subtitle || '';

      var parent = (titleNode && titleNode.parentNode) ? titleNode.parentNode : (document.querySelector('.inner') || document.body);
      if (!parent) return;

      if (!document.getElementById('crp-top-hub-nav') && (net.sites || []).length) {
        var navWrap = document.createElement('div');
        navWrap.innerHTML = buildNavHTML();
        var navEl = navWrap.firstElementChild;
        parent.insertBefore(navEl, parent.firstChild);
        navEl.querySelectorAll('a[data-nav-target]').forEach(function (a) {
          a.addEventListener('click', function () { track('hub_nav_click', { target: a.getAttribute('data-nav-target') }); });
        });
      }

      if (!document.getElementById('crp-curated-audio-hub')) {
        var hubWrap = document.createElement('div');
        hubWrap.innerHTML = buildHubHTML();
        var hubEl = hubWrap.firstElementChild;
        if (subNode && subNode.nextSibling) parent.insertBefore(hubEl, subNode.nextSibling);
        else parent.appendChild(hubEl);

        refreshCardStates();

        var activeSec = 'all';
        var query = '';
        var netExpanded = false;
        var blocks = hubEl.querySelectorAll('.crp-curated-sec');
        var netWrap = document.getElementById('crp-net-search-wrap');

        var renderNetworkMatches = function (qStr) {
          if (!netWrap) return;
          loadAllNetworkEpisodes().then(function (allOther) {
            if ((query || '').trim().toLowerCase() !== qStr) return;
            var matches = allOther.filter(function (item) {
              var hay = (item.ep.label + ' ' + item.sec + ' ' + item.hubLabel).toLowerCase();
              return hay.indexOf(qStr) !== -1;
            });
            if (!matches.length) {
              netWrap.innerHTML = '<div style="padding:8px 12px;border-radius:10px;background:rgba(15,23,42,0.78);border:1px solid rgba(255,255,255,0.12);color:#94A3B8;font-size:12px;">No matching episodes found across the other hubs for <strong>' + esc(qStr) + '</strong>.</div>';
              netWrap.style.display = 'block';
              return;
            }
            var h = '<div style="padding:10px 12px;border-radius:12px;background:rgba(9,14,26,0.82);border:1px solid ' + A + '44;">' +
              '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">' +
              '<span style="font-size:11.5px;font-weight:800;color:' + A + ';">&#127760; Matches Across Sibling Hubs (' + matches.length + ')</span>' +
              '<span style="font-size:10.5px;color:#94A3B8;">Click any card to stream right here</span></div><div class="crp-ep-grid" style="margin-bottom:2px;">';
            matches.slice(0, 24).forEach(function (mItem) {
              var shortHub = String(mItem.hubLabel).replace(/\s*&.*$/, '').trim();
              h += epButtonHTML(mItem.ep, 'net', shortHub);
            });
            h += '</div></div>';
            netWrap.innerHTML = h;
            netWrap.style.display = 'block';
            refreshCardStates();
            attachInterceptors();
            track('network_search', { search_term: qStr, match_count: matches.length });
          });
        };

        var applyFilter = function () {
          var q = (query || '').trim().toLowerCase();
          var totalVis = 0;
          blocks.forEach(function (blk) {
            var idx = blk.getAttribute('data-sec-block');
            var secMatch = (activeSec === 'all' || String(idx) === String(activeSec));
            var vis = 0;
            blk.querySelectorAll('.crp-ep-btn').forEach(function (btn) {
              var txt = (btn.textContent || '').toLowerCase();
              var hrefB = btn.getAttribute('href') || '';
              var mB = hrefB.match(/id=([a-zA-Z0-9_-]+)/);
              var doneOk = !hideListened || !(mB && mB[1] && isEpisodeDone(mB[1]));
              var show = secMatch && doneOk && (!q || txt.indexOf(q) !== -1);
              btn.style.display = show ? 'flex' : 'none';
              if (show) vis++;
            });
            blk.style.display = vis > 0 ? 'block' : 'none';
            totalVis += vis;
          });
          if (netWrap) {
            if (q.length < 2) {
              netExpanded = false;
              netWrap.style.display = 'none';
              netWrap.innerHTML = '';
            } else if (totalVis === 0 || netExpanded) {
              renderNetworkMatches(q);
            } else {
              netWrap.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 11px;border-radius:9px;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.12);font-size:11.5px;color:#CBD5E1;">' +
                '<span>Showing <strong>' + totalVis + '</strong> match' + (totalVis === 1 ? '' : 'es') + ' in this hub.</span>' +
                '<button type="button" id="crp-expand-net-search" class="crp-mini-chip" style="color:' + A + ';border-color:' + A + '66;">&#127760; Search all 8 hubs' + (masterTotal ? ' (' + masterTotal + ' eps)' : '') + '</button></div>';
              netWrap.style.display = 'block';
              var expBtn = document.getElementById('crp-expand-net-search');
              if (expBtn) expBtn.addEventListener('click', function () {
                netExpanded = true;
                renderNetworkMatches(q);
              });
            }
          }
        };
        applyFilterRef = applyFilter;
        var doneFilterBtn = document.getElementById('crp-done-filter-pill');
        if (doneFilterBtn) {
          doneFilterBtn.addEventListener('click', function () {
            hideListened = !hideListened;
            refreshCardStates();
            applyFilter();
          });
        }
        var activate = function (idx, fromUser) {
          hubEl.querySelectorAll('.crp-sec-pill').forEach(function (x) {
            if (x.getAttribute('data-sec-idx') === String(idx)) x.classList.add('active'); else x.classList.remove('active');
          });
          activeSec = String(idx);
          applyFilter();
          if (fromUser && idx !== 'all') {
            var s = (cfg.sections || [])[+idx];
            track('section_filter', { section: s ? (s.pill || s.heading) : idx });
          }
        };
        hubEl.querySelectorAll('.crp-sec-pill').forEach(function (p) {
          p.addEventListener('click', function () { activate(p.getAttribute('data-sec-idx') || 'all', true); });
        });
        var sIn = document.getElementById('crp-ep-search');
        var searchTimer = null;
        if (sIn) {
          sIn.addEventListener('input', function () {
            query = sIn.value || '';
            applyFilter();
            clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
              var term = query.trim().slice(0, 80);
              if (term.length >= 3) {
                track('episode_search', { search_term: term });
                track('view_search_results', { search_term: term });
              }
            }, 1500);
          });
          try {
            var sp = new URLSearchParams(location.search);
            var urlQ = sp.get('q') || sp.get('s') || sp.get('search') || sp.get('query') || sp.get('keyword') || '';
            if (urlQ) {
              sIn.value = urlQ;
              query = urlQ;
              applyFilter();
            }
          } catch (e) {}
        }
        var fromHash = sectionForHash(location.hash);
        if (fromHash !== null) activate(fromHash, false);
        window.addEventListener('hashchange', function () {
          var hs = sectionForHash(location.hash);
          if (hs !== null) activate(hs, false);
        });
      }
      wireRssModal();
      handleDeepLinkEpisode();
    }

    function portalNameFromUrl(url) {
      var u = String(url || '').toLowerCase();
      if (u.indexOf('yorek-cancer-ai-primer') !== -1) return 'VCU Cancer AI Primer';
      if (u.indexOf('public-evidence-library') !== -1) return 'Public Evidence Library';
      if (u.indexOf('historical-documents-atlas') !== -1) return 'Historical Documents Atlas';
      return url;
    }

    function attachInterceptors() {
      injectHubUI();
      document.querySelectorAll('a[href*="chatgpt.site"]').forEach(function (link) {
        if (link.dataset.crpPortalHooked) return;
        link.dataset.crpPortalHooked = 'true';
        link.addEventListener('click', function () {
          var href = link.getAttribute('href') || '';
          var inNav = !!link.closest('#crp-top-hub-nav');
          track('chatgpt_site_click', {
            portal_name: portalNameFromUrl(href),
            portal_url: href,
            placement: inNav ? 'top_nav' : 'showcase_banner'
          });
        });
      });
      document.querySelectorAll('a[href*="drive.google.com"]').forEach(function (link) {
        if (link.dataset.crpHooked || link.dataset.noPlayer) return;
        link.dataset.crpHooked = 'true';
        link.addEventListener('click', function (e) {
          var href = link.getAttribute('href') || '';
          var match = href.match(/id=([a-zA-Z0-9_-]+)/) || href.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
          if (match && match[1]) {
            e.preventDefault();
            e.stopPropagation();
            if (e.target && e.target.closest && e.target.closest('.crp-ep-chk')) {
              toggleEpisodeDone(match[1]);
              return;
            }
            var lblEl = link.querySelector('.crp-ep-lbl');
            var text = lblEl ? lblEl.textContent.trim() : (link.innerText || link.textContent || '').trim();
            var secIdx = link.getAttribute('data-sec');
            var sec = (secIdx !== null && secIdx !== 'net' && cfg.sections && cfg.sections[+secIdx]) ? (cfg.sections[+secIdx].pill || cfg.sections[+secIdx].heading) : (epMetaById[match[1]] ? epMetaById[match[1]].sec : '');
            playEpisode(match[1], text, link.getAttribute('data-gh-url') || '', sec, 0);
          }
        });
      });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attachInterceptors);
    else attachInterceptors();
    setInterval(attachInterceptors, 1200);
    window.CRP_HUB_INFO = { hub: HUB, version: PLAYER_VERSION, episodes: (cfg.sections || []).reduce(function (n, s) { return n + (s.episodes || []).length; }, 0) };
  }
})();
