/*! Standalone Carrd App Bundle (study-apps) */
(function () {
  'use strict';
  if (window.__crpStandaloneAppLoaded_study_apps) return;
  window.__crpStandaloneAppLoaded_study_apps = true;
  function mountShell() {
    if (!document.getElementById('carrd-resonance-player')) {
      var wrap = document.createElement('div');
      wrap.id = 'crp-standalone-shell-study-apps';
      wrap.innerHTML = "<style> html{font-size:16px !important} .site-main>.inner,#main>.inner{width:min(94vw,1100px) !important;max-width:1100px !important;padding:32px 28px 145px 28px !important} #crp-standalone-estudia-wrapper,#crp-standalone-phys-wrapper{width:100% !important;max-width:1044px !important} #text02, #text08, #divider04, #divider01, #text04, #buttons03, #divider02, #text06, #buttons04, #divider05 { display: none !important; } .crp-hub-pill { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); } .crp-hub-pill:hover { transform: translateY(-1px); border-color: #38BDF8 !important; background: rgba(30, 41, 59, 0.9) !important; box-shadow: 0 4px 14px rgba(0,0,0,0.35); } .deck-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(30,41,59,0.8); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; font-size: 11.5px; font-weight: 600; color: #CBD5E1; } .crp-hub-pill { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); } .crp-hub-pill:hover { transform: translateY(-1px); border-color: #38BDF8 !important; background: rgba(30, 41, 59, 0.92) !important; box-shadow: 0 4px 14px rgba(0,0,0,0.35); } .crp-spd-btn { appearance: none; border: 1px solid #334155; background: #131C31; color: #CBD5E1; font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 7px; cursor: pointer; line-height: 1.1; font-family: inherit; transition: all 0.15s ease; } .crp-spd-btn:hover { border-color: #38BDF8; color: #FFFFFF; } .crp-spd-btn.active { background: #38BDF8; color: #090E1A; border-color: #38BDF8; box-shadow: 0 0 12px #38BDF866; } .crp-ctrl-btn { appearance: none; border: 1px solid #334155; background: #131C31; color: #E2E8F0; font-size: 11.5px; font-weight: 700; padding: 6px 10px; border-radius: 9px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-family: inherit; transition: all 0.15s ease; } .crp-ctrl-btn:hover { border-color: #38BDF8; color: #FFFFFF; background: #1E293B; } #crp-seek { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 999px; background: #1E293B; outline: none; cursor: pointer; margin: 0; } #crp-seek::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #38BDF8; border: 2px solid #FFFFFF; box-shadow: 0 0 10px #38BDF8; cursor: pointer; } #crp-seek::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: #38BDF8; border: 2px solid #FFFFFF; box-shadow: 0 0 10px #38BDF8; cursor: pointer; } .crp-playing-card { border-color: #38BDF8 !important; box-shadow: 0 0 0 2px #38BDF866, 0 12px 28px rgba(0,0,0,0.5) !important; background: rgba(30, 41, 59, 0.95) !important; } \n/* BASIC MEDICAL SERIES SECTION & GRID */\n.crp-series-section { margin: 26px 0 32px 0; background: rgba(15,23,42,0.85); border: 1px solid #38BDF866; border-radius: 20px; padding: 22px; }\n.crp-series-header { margin-bottom: 16px; }\n.crp-series-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: rgba(56,189,248,0.15); border: 1px solid rgba(56,189,248,0.4); border-radius: 999px; font-size: 10px; font-weight: 800; color: #38BDF8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }\n.crp-series-title { margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #FFFFFF; }\n.crp-series-desc { margin: 0; font-size: 12.5px; color: #94A3B8; line-height: 1.5; }\n.crp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 8px; width: 100%; margin-top: 14px; }\n.crp-ep-btn {\n display: flex; align-items: center; gap: 7px; width: 100%; min-height: 36px;\n padding: 7px 11px; border-radius: 9px; text-decoration: none !important;\n background: rgba(15, 23, 42, 0.82); border: 1px solid rgba(255, 255, 255, 0.14);\n box-shadow: 0 3px 10px rgba(0, 0, 0, 0.24); backdrop-filter: blur(10px);\n color: #F8FAFC !important; font-size: 12px; font-weight: 600; line-height: 1.25;\n text-align: left; box-sizing: border-box; transition: all 0.16s ease;\n}\n.crp-ep-btn:hover {\n transform: translateY(-1px); background: rgba(30, 41, 59, 0.95);\n border-color: #38BDF8; box-shadow: 0 6px 16px rgba(0,0,0,0.4), 0 0 12px #38BDF833;\n}\n.crp-ep-ico {\n width: 17px; height: 17px; border-radius: 50%; background: #38BDF822;\n color: #38BDF8; display: inline-flex; align-items: center; justify-content: center;\n font-size: 8.5px; flex-shrink: 0; border: 1px solid #38BDF855;\n}\n.crp-ep-lbl { flex: 1; white-space: normal; overflow: visible; display: block; line-height: 1.35; word-break: break-word; }\n.crp-ep-tag {\n font-size: 9.5px; font-weight: 800; color: #38BDF8; background: #38BDF81A;\n border: 1px solid #38BDF844; padding: 1px 5px; border-radius: 999px; flex-shrink: 0;\n}\n\n</style><div id=\"carrd-resonance-player\" style=\"display:none;position:fixed;bottom:16px;left:50%;transform:translateX(-50%);width:95%;max-width:680px;background:rgba(9,14,26,0.97);border:1px solid #38BDF899;box-shadow:0 24px 60px rgba(0,0,0,0.92),0 0 38px #38BDF840;border-radius:20px;padding:13px 16px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F1F5F9;backdrop-filter:blur(22px);box-sizing:border-box;-webkit-font-smoothing:antialiased;\"> <div style=\"display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:9px;\"> <div style=\"display:flex;align-items:center;gap:9px;overflow:hidden;flex:1;\"> <div id=\"crp-pulse\" style=\"width:9px;height:9px;border-radius:50%;background:#10B981;box-shadow:0 0 10px #10B981;flex-shrink:0;\"></div> <div style=\"overflow:hidden;flex:1;\"> <div id=\"crp-title\" style=\"font-size:13.5px;font-weight:800;color:#FFFFFF;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;\">Select an episode</div> <div style=\"display:flex;align-items:center;gap:8px;font-size:10.5px;color:#94A3B8;font-weight:600;\"> <span id=\"crp-status-text\">Variable-Speed Stream</span> <button id=\"crp-restart-chip\" type=\"button\" style=\"display:none;background:rgba(16,185,129,0.16);border:1px solid rgba(16,185,129,0.45);color:#34D399;border-radius:999px;padding:1px 7px;font-size:10px;font-weight:700;cursor:pointer;\">&#8634; Start Over</button> </div> </div> </div> <div style=\"display:flex;align-items:center;gap:5px;flex-shrink:0;\"> <button id=\"crp-mode-btn\" type=\"button\" title=\"Switch between variable-speed player and Google Drive iframe backup player\" style=\"font-size:10px;font-weight:600;color:#94A3B8;background:#131C31;border:1px solid #334155;padding:4px 7px;border-radius:6px;cursor:pointer;\">Backup Player</button> <a id=\"crp-dl-link\" href=\"#\" target=\"_blank\" rel=\"noreferrer\" data-no-player=\"true\" title=\"Download original .m4a file\" style=\"font-size:10px;font-weight:600;color:#CBD5E1;text-decoration:none;background:#131C31;border:1px solid #334155;padding:4px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:3px;\">&#10515; Save</a> <a id=\"crp-studio-link\" href=\"https://ais-dev-v3n3vsl4pvdlmev4vcfv5b-514995804668.us-west1.run.app\" target=\"_blank\" rel=\"noreferrer\" title=\"Open interactive synchronized transcript studio\" style=\"font-size:10px;font-weight:800;color:#090E1A;background:#38BDF8;text-decoration:none;padding:4px 9px;border-radius:6px;display:inline-flex;align-items:center;gap:3px;box-shadow:0 0 12px #38BDF855;\">Transcript &#8599;</a> <button id=\"crp-close-btn\" type=\"button\" aria-label=\"Close Player\" title=\"Close\" style=\"background:transparent;border:none;color:#94A3B8;cursor:pointer;font-size:20px;line-height:1;padding:2px 5px;margin-left:1px;\">&times;</button> </div> </div> <div id=\"crp-native-wrap\" style=\"background:#050914;border:1px solid #1E293B;border-radius:14px;padding:11px 13px;\"> <audio id=\"crp-audio-el\" crossorigin=\"anonymous\" preload=\"metadata\" style=\"display:none;\"></audio> <div style=\"display:flex;align-items:center;gap:10px;margin-bottom:10px;\"> <span id=\"crp-time-cur\" style=\"font-size:11.5px;font-variant-numeric:tabular-nums;color:#E2E8F0;font-weight:700;min-width:42px;\">0:00</span> <input id=\"crp-seek\" type=\"range\" min=\"0\" max=\"1000\" value=\"0\" step=\"1\" aria-label=\"Seek timeline\" /> <span id=\"crp-time-tot\" style=\"font-size:11.5px;font-variant-numeric:tabular-nums;color:#94A3B8;font-weight:600;min-width:42px;text-align:right;\">--:--</span> </div> <div style=\"display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;\"> <div style=\"display:flex;align-items:center;gap:7px;\"> <button id=\"crp-rew-btn\" type=\"button\" class=\"crp-ctrl-btn\" title=\"Rewind 15 seconds\">&#8630; 15s</button> <button id=\"crp-play-btn\" type=\"button\" aria-label=\"Play or Pause\" style=\"width:38px;height:38px;border-radius:50%;border:none;background:#38BDF8;color:#090E1A;font-size:15px;font-weight:900;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 0 16px #38BDF870;\">&#9654;</button> <button id=\"crp-fwd-btn\" type=\"button\" class=\"crp-ctrl-btn\" title=\"Skip forward 30 seconds\">30s &#8631;</button> <span id=\"crp-rem-badge\" style=\"font-size:10.5px;color:#64748B;font-weight:600;font-variant-numeric:tabular-nums;margin-left:2px;\"></span> </div> <div style=\"display:flex;align-items:center;gap:4px;flex-wrap:wrap;\"> <span style=\"font-size:10px;font-weight:800;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;margin-right:2px;\">Speed</span> <button type=\"button\" class=\"crp-spd-btn\" data-spd-step=\"-0.1\" title=\"Slower (-0.1x)\">&minus;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1\">1&times;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.25\">1.25&times;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.5\">1.5&times;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.75\">1.75&times;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd=\"2\">2&times;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd-step=\"0.1\" title=\"Faster (+0.1x)\">+</button> <span id=\"crp-spd-readout\" style=\"font-size:11px;font-weight:800;color:#38BDF8;min-width:34px;text-align:center;font-variant-numeric:tabular-nums;\">1.0&times;</span> </div> </div> </div> <div id=\"crp-fallback-wrap\" style=\"display:none;width:100%;height:132px;border-radius:12px;overflow:hidden;background:#030712;border:1px solid #1E293B;position:relative;\"> <iframe id=\"crp-stream-frame\" src=\"about:blank\" style=\"width:100%;height:132px;border:none;display:block;\" allow=\"autoplay\" loading=\"lazy\"></iframe> </div></div>\n<div id=\"crp-rss-modal\" style=\"display:none;position:fixed;inset:0;background:rgba(3,7,18,0.84);backdrop-filter:blur(9px);z-index:1000001;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-align:left;\">\n <div style=\"width:100%;max-width:560px;background:#090E1A;border:1px solid #38BDF888;border-radius:20px;padding:22px;box-shadow:0 25px 70px rgba(0,0,0,0.92);color:#F8FAFC;\">\n <div style=\"display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;\">\n <div>\n <div style=\"font-size:10.5px;font-weight:800;color:#38BDF8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;\">Subscribe in Any Podcast App</div>\n <h3 style=\"margin:0;font-size:19px;font-weight:800;color:#FFFFFF;\">Deep Dive Podcast RSS Feeds</h3>\n </div>\n <button id=\"crp-rss-modal-close\" type=\"button\" style=\"background:#1E293B;border:1px solid #334155;color:#CBD5E1;border-radius:8px;padding:3px 9px;font-size:16px;cursor:pointer;\">&times;</button>\n </div>\n <p style=\"font-size:12.5px;color:#CBD5E1;line-height:1.5;margin:0 0 14px 0;\">\n Listen offline with variable-speed playback in <strong>Apple Podcasts</strong>, <strong>Overcast</strong>, <strong>Pocket Casts</strong>, or any RSS podcast player.\n </p>\n <div style=\"background:rgba(15,23,42,0.95);border:1px solid #38BDF855;border-radius:12px;padding:12px;margin-bottom:10px;\">\n <div style=\"font-size:11px;font-weight:800;color:#38BDF8;margin-bottom:6px;\">This Hub's Feed (Deep Dive Network)</div>\n <div style=\"display:flex;flex-wrap:wrap;gap:6px;margin-bottom:7px;\">\n <a href=\"podcast://yorekms.github.io/deep-dive-podcasts/feed.xml\" class=\"crp-ctrl-btn\" style=\"background:#38BDF8;color:#090E1A;border-color:#38BDF8;text-decoration:none;font-weight:800;\">Apple Podcasts</a>\n <a href=\"overcast://x-callback-url/add?url=https://yorekms.github.io/deep-dive-podcasts/feed.xml\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">Overcast</a>\n <a href=\"pktc://subscribe/yorekms.github.io/deep-dive-podcasts/feed.xml\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">Pocket Casts</a>\n <button type=\"button\" class=\"crp-ctrl-btn crp-copy-rss\" data-rss=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\">Copy Feed URL</button>\n </div>\n <input type=\"text\" readonly value=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\" onclick=\"this.select()\" style=\"width:100%;padding:5px 8px;border-radius:6px;border:1px solid #334155;background:#050914;color:#94A3B8;font-family:monospace;font-size:11px;box-sizing:border-box;\" />\n </div>\n <div style=\"background:rgba(15,23,42,0.95);border:1px solid rgba(255,255,255,0.14);border-radius:12px;padding:12px;margin-bottom:12px;\">\n <div style=\"font-size:11px;font-weight:800;color:#38BDF8;margin-bottom:6px;\">Master Network Feed (All 280 Deep Dive Episodes)</div>\n <div style=\"display:flex;flex-wrap:wrap;gap:6px;margin-bottom:7px;\">\n <a href=\"podcast://yorekms.github.io/deep-dive-podcasts/feed.xml\" class=\"crp-ctrl-btn\" style=\"background:#38BDF8;color:#090E1A;border-color:#38BDF8;text-decoration:none;font-weight:800;\">Apple Podcasts (All 280)</a>\n <button type=\"button\" class=\"crp-ctrl-btn crp-copy-rss\" data-rss=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\">Copy Master RSS URL</button>\n <a href=\"https://yorekms.github.io/deep-dive-podcasts/\" target=\"_blank\" rel=\"noopener\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">All 8 Feeds Directory &#8599;</a>\n </div>\n <input type=\"text\" readonly value=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\" onclick=\"this.select()\" style=\"width:100%;padding:5px 8px;border-radius:6px;border:1px solid #334155;background:#050914;color:#94A3B8;font-family:monospace;font-size:11px;box-sizing:border-box;\" />\n </div>\n </div>\n</div>";
      document.body.appendChild(wrap);
    }
  }
  if (document.body) mountShell();
  else document.addEventListener('DOMContentLoaded', mountShell);
})();
(function() {
 var studioBase = "https://ais-dev-v3n3vsl4pvdlmev4vcfv5b-514995804668.us-west1.run.app";
 var estudiaUrl = "https://estudia-high-school-flashcards-study-studio.ai.studio";
 
 function injectStandaloneEstudia() {
 var target = document.querySelector('#main') || document.querySelector('.inner') || document.body;
 if (!target) return;
 
 var wrap = document.createElement('div');
 wrap.id = 'crp-standalone-estudia-wrapper';
 wrap.style.cssText = 'width:100%;max-width:1120px;margin:0 auto;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#F1F5F9;';
 
 var html = '';
 
 /* 1. TOP HUB NAVIGATION BAR */
 html += "<div id=\"crp-top-hub-nav\" style=\"width:100%;max-width:1140px;margin:0 auto 16px auto;padding:9px 12px;background:rgba(9,14,26,0.84);border:1px solid #38BDF844;border-radius:15px;box-shadow:0 10px 28px rgba(0,0,0,0.38);backdrop-filter:blur(14px);box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;\"><div style=\"display:flex;flex-wrap:wrap;gap:5px;justify-content:center;align-items:center;\"><a href=\"https://my-consciousness.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83e\udde0 Consciousness</a><a href=\"https://my-cell-death.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\u26a1 Cell Death &amp; Biophysics</a><a href=\"https://my-nutrition-metabolism.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83e\udd57 Nutrition &amp; Metabolism</a><a href=\"https://my-pharmacology.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83d\udc8a Pharmacology &amp; Oncology</a><a href=\"https://my-forensic-medicine.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83e\ude7a Forensic Medicine &amp; Testing</a><a href=\"https://my-ancient-medicine.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\u2695\ufe0f Ancient Medicine</a><a href=\"https://my-philosophy-science.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83d\udd2c Philosophy &amp; Statistics</a><a href=\"https://my-human-origins.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83c\udfdb\ufe0f Human Origins, Language &amp; Religion</a><a href=\"https://my-study-apps.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:800;text-decoration:none;color:#090E1A;background:#38BDF8;box-shadow:0 0 14px #38BDF866;border:1px solid #38BDF8;white-space:nowrap;\">\ud83c\udf93 Estudia! &amp; Web Apps</a><a href=\"https://my-scientific-software.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83d\udcbb Scientific Software</a><a href=\"https://my-clampflow.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:700;text-decoration:none;color:#FDE68A;background:rgba(120,53,15,0.48);border:1px solid rgba(245,158,11,0.55);white-space:nowrap;\">📈 ClampFlow ABF</a></div><div style=\"margin-top:8px;padding-top:7px;border-top:1px solid rgba(255,255,255,0.10);display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center;\"><span style=\"font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-right:2px;\">Research Portals &amp; Feeds:</span><a href=\"https://yorek-cancer-ai-primer.tasty-siren-3221.chatgpt.site\" target=\"_blank\" rel=\"noopener\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:800;text-decoration:none;color:#FFE4E6;background:rgba(159,18,57,0.45);border:1px solid rgba(251,113,133,0.65);white-space:nowrap;\">\ud83e\uddec VCU Cancer AI Primer \u2197</a><a href=\"https://public-evidence-library-yorek.yorekms.chatgpt.site\" target=\"_blank\" rel=\"noopener\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:700;text-decoration:none;color:#DBEAFE;background:rgba(30,58,138,0.42);border:1px solid rgba(96,165,250,0.55);white-space:nowrap;\">\ud83d\udcca Public Evidence Library \u2197</a><a href=\"https://historical-documents-atlas.yorekms.chatgpt.site\" target=\"_blank\" rel=\"noopener\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:700;text-decoration:none;color:#FEF3C7;background:rgba(120,53,15,0.42);border:1px solid rgba(251,191,36,0.55);white-space:nowrap;\">\ud83d\uddfa\ufe0f Historical Documents Atlas \u2197</a><button type=\"button\" id=\"crp-open-rss-modal-btn\" data-series-rss=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\" style=\"display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:800;color:#090E1A;background:#38BDF8;border:1px solid #38BDF8;cursor:pointer;font-family:inherit;white-space:nowrap;\">\ud83d\udce1 Podcast App RSS</button></div></div><div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:10px;margin:0 auto 14px auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-align:left;\"><a href=\"https://yorek-cancer-ai-primer.tasty-siren-3221.chatgpt.site\" target=\"_blank\" rel=\"noopener\" style=\"background:linear-gradient(135deg, rgba(136,19,55,0.40) 0%, rgba(15,23,42,0.94) 100%);border:1px solid #F43F5E66;border-radius:13px;padding:11px 14px;text-decoration:none;color:inherit;display:flex;flex-direction:column;justify-content:space-between;gap:6px;transition:transform 0.16s ease,border-color 0.16s ease;\"><div><div style=\"font-size:9.5px;font-weight:800;color:#F43F5E;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;\">Featured Application Showcase \u2022 VCU Massey Comprehensive Cancer Center</div><div style=\"font-size:13.5px;font-weight:800;color:#FFFFFF;line-height:1.25;margin-bottom:3px;\">Matthew S. Yorek \u2014 Cancer Biology, Computation &amp; Scientific Communication</div><div style=\"font-size:11.5px;color:#CBD5E1;line-height:1.4;\">Cancer biology. Computational tools. Clearer science. Interactive translational oncology &amp; AI primer built to turn complex source data into inspectable evidence.</div></div><div style=\"font-size:11px;font-weight:800;color:#F43F5E;\">Explore VCU Cancer AI Primer \u2197</div></a><a href=\"https://public-evidence-library-yorek.yorekms.chatgpt.site\" target=\"_blank\" rel=\"noopener\" style=\"background:linear-gradient(135deg, rgba(30,58,138,0.40) 0%, rgba(15,23,42,0.94) 100%);border:1px solid #60A5FA66;border-radius:13px;padding:11px 14px;text-decoration:none;color:inherit;display:flex;flex-direction:column;justify-content:space-between;gap:6px;transition:transform 0.16s ease,border-color 0.16s ease;\"><div><div style=\"font-size:9.5px;font-weight:800;color:#60A5FA;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;\">Interactive Open Data &amp; Epistemology Portal</div><div style=\"font-size:13.5px;font-weight:800;color:#FFFFFF;line-height:1.25;margin-bottom:3px;\">Public Evidence Library \u2014 Learn, Explore, Reconsider</div><div style=\"font-size:11.5px;color:#CBD5E1;line-height:1.4;\">Explore public data, inspect primary sources, follow global commodities and purchasing power across places and years, and test assumptions interactively.</div></div><div style=\"font-size:11px;font-weight:800;color:#60A5FA;\">Open Public Evidence Library \u2197</div></a><a href=\"https://historical-documents-atlas.yorekms.chatgpt.site\" target=\"_blank\" rel=\"noopener\" style=\"background:linear-gradient(135deg, rgba(120,53,15,0.40) 0%, rgba(15,23,42,0.94) 100%);border:1px solid #FBBF2466;border-radius:13px;padding:11px 14px;text-decoration:none;color:inherit;display:flex;flex-direction:column;justify-content:space-between;gap:6px;transition:transform 0.16s ease,border-color 0.16s ease;\"><div><div style=\"font-size:9.5px;font-weight:800;color:#FBBF24;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;\">Interactive Primary Source &amp; Archival Cartography</div><div style=\"font-size:13.5px;font-weight:800;color:#FFFFFF;line-height:1.25;margin-bottom:3px;\">Historical Documents &amp; State Killing Atlas</div><div style=\"font-size:11.5px;color:#CBD5E1;line-height:1.4;\">Interactive archival atlas mapping primary historical documents, state violence, institutional records, and comparative historical evidence.</div></div><div style=\"font-size:11px;font-weight:800;color:#FBBF24;\">Launch Historical Documents Atlas \u2197</div></a></div>";
 
 /* 2. ESTUDIA! HERO HEADER WITH QR CODE */
 html += '<div style="background:linear-gradient(135deg, rgba(14,116,144,0.35) 0%, rgba(15,23,42,0.92) 100%);border:1px solid #38BDF888;border-radius:22px;padding:26px;margin-bottom:24px;box-shadow:0 18px 45px rgba(0,0,0,0.55);">' +
 '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;">' +
 '<div style="flex:1;min-width:280px;">' +
 '<div style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.4);border-radius:999px;font-size:11px;font-weight:800;color:#38BDF8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">' +
 '&#127891; Featured Learning Studio \u2022 Mobile-Ready Web App' +
 '</div>' +
 '<h1 style="margin:0 0 10px 0;font-size:32px;font-weight:900;color:#FFFFFF;letter-spacing:-0.02em;line-height:1.2;">' +
 'Estudia! \u2013 High School Flashcards &amp; Study Studio' +
 '</h1>' +
 '<p style="margin:0 0 16px 0;font-size:14.5px;color:#CBD5E1;line-height:1.6;max-width:720px;">' +
 'Interactive flashcard, vocabulary, and concept mastery app built for high school and college prep. Practice active recall, spaced repetition, definitions, audio pronunciation, and self-quizzing across AP sciences, literature, history, and languages.' +
 '</p>' +
 '<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">' +
 '<a href="' + estudiaUrl + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:800;color:#090E1A;background:#38BDF8;box-shadow:0 0 16px rgba(56,189,248,0.45);text-decoration:none;">' +
 '&#128640; Launch Estudia! Full Screen &#8599;' +
 '</a>' +
 '<button id="estudia-copy-link-btn" type="button" style="display:inline-flex;align-items:center;gap:6px;padding:10px 16px;border-radius:10px;font-size:13px;font-weight:700;color:#E2E8F0;background:rgba(15,23,42,0.85);border:1px solid #475569;cursor:pointer;">' +
 '&#128203; Copy Share Link' +
 '</button>' +
 '<button id="estudia-size-toggle-btn" type="button" style="display:inline-flex;align-items:center;gap:6px;padding:10px 16px;border-radius:10px;font-size:13px;font-weight:700;color:#E2E8F0;background:rgba(15,23,42,0.85);border:1px solid #475569;cursor:pointer;">' +
 '&#128241; Toggle Phone / Desktop View' +
 '</button>' +
 '</div>' +
 '</div>' +
 
 /* QR Code Block */
 '<div style="background:rgba(15,23,42,0.92);border:1px solid #38BDF866;border-radius:16px;padding:14px;display:flex;align-items:center;gap:14px;box-shadow:0 10px 25px rgba(0,0,0,0.4);flex-shrink:0;">' +
 '<img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=https%3A%2F%2Festudia-high-school-flashcards-study-studio.ai.studio" alt="Scan QR Code for Estudia!" width="110" height="110" style="border-radius:12px;background:#FFFFFF;padding:4px;flex-shrink:0;" />' +
 '<div style="max-width:180px;">' +
 '<div style="font-size:11px;font-weight:800;color:#38BDF8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Instant Phone Access</div>' +
 '<div style="font-size:12px;color:#CBD5E1;line-height:1.45;margin-bottom:6px;">Scan with your iPhone or Android camera to open on mobile.</div>' +
 '<div style="font-size:11px;color:#10B981;font-weight:700;">&#10003; No App Store install needed</div>' +
 '</div>' +
 '</div>' +
 '</div>' +
 '</div>';
 
 /* 3. INTERACTIVE LIVE ESTUDIA IFRAME CONTAINER */
 html += '<div id="estudia-frame-container" style="width:100%;max-width:100%;margin:0 auto 26px auto;background:#090E1A;border:1px solid #38BDF866;border-radius:20px;overflow:hidden;box-shadow:0 20px 55px rgba(0,0,0,0.65);transition:max-width 0.3s ease;">' +
 '<div style="padding:10px 16px;background:rgba(14,116,144,0.45);border-bottom:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:space-between;">' +
 '<div style="display:flex;align-items:center;gap:6px;">' +
 '<span style="width:10px;height:10px;border-radius:50%;background:#EF4444;display:inline-block;"></span>' +
 '<span style="width:10px;height:10px;border-radius:50%;background:#F59E0B;display:inline-block;"></span>' +
 '<span style="width:10px;height:10px;border-radius:50%;background:#10B981;display:inline-block;"></span>' +
 '<span style="font-size:12px;color:#CBD5E1;font-weight:600;margin-left:8px;">Live Interactive App Preview \u2014 Estudia! Study Studio</span>' +
 '</div>' +
 '<a href="' + estudiaUrl + '" target="_blank" rel="noopener" style="font-size:11px;color:#38BDF8;text-decoration:none;font-weight:700;">Open Direct App &#8599;</a>' +
 '</div>' +
 '<iframe id="estudia-live-iframe" src="' + estudiaUrl + '" title="Estudia! High School Flashcards & Study Studio" style="width:100%;height:680px;border:none;display:block;background:#090E1A;" allow="clipboard-write; fullscreen"></iframe>' +
 '</div>';
 
 /* 4. CURATED STUDY DECKS & FEATURES */
 html += '<div style="background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:24px;margin-bottom:24px;">' +
 '<h2 style="margin:0 0 14px 0;font-size:20px;font-weight:800;color:#FFFFFF;">Included Subject Decks &amp; Mastery Tools</h2>' +
 '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;">' +
 '<span class="deck-pill">&#128300; AP Biology &amp; Physiology</span>' +
 '<span class="deck-pill">&#9877;&#65039; General &amp; Organic Chemistry</span>' +
 '<span class="deck-pill">&#127758; World History &amp; Civilization</span>' +
 '<span class="deck-pill">&#128220; Latin Roots &amp; Etymology</span>' +
 '<span class="deck-pill">&#128214; Literature &amp; Rhetoric</span>' +
 '<span class="deck-pill">&#128483;&#65039; Spanish Conversational Mastery</span>' +
 '<span class="deck-pill">&#129518; Physics &amp; Mechanics</span>' +
 '</div>' +
 '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;">' +
 '<div style="padding:14px;background:rgba(30,41,59,0.5);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">' +
 '<div style="font-size:13px;font-weight:800;color:#38BDF8;margin-bottom:4px;">&#128257; Spaced Repetition Scheduling</div>' +
 '<div style="font-size:12px;color:#94A3B8;line-height:1.5;">Algorithms adjust intervals based on recall confidence, keeping difficult terms in active review until mastered.</div>' +
 '</div>' +
 '<div style="padding:14px;background:rgba(30,41,59,0.5);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">' +
 '<div style="font-size:13px;font-weight:800;color:#34D399;margin-bottom:4px;">&#128266; Audio Pronunciation &amp; Etymology</div>' +
 '<div style="font-size:12px;color:#94A3B8;line-height:1.5;">Tap any card to hear phonetic speech and breakdown of Latin, Greek, and biological roots.</div>' +
 '</div>' +
 '<div style="padding:14px;background:rgba(30,41,59,0.5);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">' +
 '<div style="font-size:13px;font-weight:800;color:#FBBF24;margin-bottom:4px;">&#128242; Add to Home Screen as Native App</div>' +
 '<div style="font-size:12px;color:#94A3B8;line-height:1.5;">On iOS Safari, tap <em>Share &rarr; Add to Home Screen</em>. On Android Chrome, tap <em>Three Dots &rarr; Install App</em> for an offline-ready experience.</div>' +
 '</div>' +
 '</div>' +
 '</div>';
 
 /* 5. FORENSIC & MEDICAL TESTING HUB LINK */
 html += "<div style=\"margin:24px 0 30px 0;background:linear-gradient(135deg,rgba(251,146,60,0.16) 0%,rgba(15,23,42,0.92) 100%);border:1px solid rgba(251,146,60,0.45);border-radius:18px;padding:20px 22px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;\"><div style=\"flex:1;min-width:260px;\"><div style=\"font-size:10px;font-weight:800;color:#FB923C;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;\">\ud83e\ude7a Dedicated Audio Hub \u2022 71 Episodes</div><h3 style=\"margin:0 0 4px 0;font-size:18px;font-weight:800;color:#FFFFFF;\">Forensic Medicine &amp; Medical Testing: Behind the Curtain</h3><p style=\"margin:0;font-size:12.5px;color:#CBD5E1;line-height:1.45;\">All 20 One Medicine &amp; Clinical Cluster comparative diagnostics treatises, 16 Medical Testing Behind the Curtain episodes, and 35 Forensic Medicine episodes now live on our dedicated Forensic Medicine &amp; Testing hub with variable-speed streaming, format filtering, and per-episode listened tracking.</p></div><a href=\"https://my-forensic-medicine.carrd.co/\" style=\"display:inline-flex;align-items:center;gap:6px;padding:10px 16px;border-radius:10px;font-size:12.5px;font-weight:800;color:#090E1A;background:#FB923C;text-decoration:none;white-space:nowrap;box-shadow:0 0 14px rgba(251,146,60,0.4);\">Open Forensic &amp; Medical Testing Hub &rarr;</a></div>";
 wrap.innerHTML = html;
 target.insertBefore(wrap, target.firstChild);
 
 /* 6. WIRE UP EVENT LISTENERS */
 var copyBtn = document.getElementById('estudia-copy-link-btn');
 if (copyBtn) {
 copyBtn.addEventListener('click', function() {
 if (navigator.clipboard && navigator.clipboard.writeText) {
 navigator.clipboard.writeText(estudiaUrl);
 }
 var orig = copyBtn.innerHTML;
 copyBtn.innerHTML = '&#9989; Copied Link!';
 copyBtn.style.borderColor = '#10B981';
 copyBtn.style.color = '#34D399';
 setTimeout(function() {
 copyBtn.innerHTML = orig;
 copyBtn.style.borderColor = '#475569';
 copyBtn.style.color = '#E2E8F0';
 }, 3000);
 });
 }
 
 var sizeBtn = document.getElementById('estudia-size-toggle-btn');
 var frameWrap = document.getElementById('estudia-frame-container');
 var isPhone = false;
 if (sizeBtn && frameWrap) {
 sizeBtn.addEventListener('click', function() {
 isPhone = !isPhone;
 frameWrap.style.maxWidth = isPhone ? '420px' : '100%';
 sizeBtn.innerHTML = isPhone ? '&#128187; Switch to Full Desktop View' : '&#128241; Toggle Phone / Desktop View';
 });
 }
 }
 
 // Floating Player handlers (Resonance v2 Variable-Speed)
 
 var studioBase = "https://ais-dev-v3n3vsl4pvdlmev4vcfv5b-514995804668.us-west1.run.app";
 var player = document.getElementById('carrd-resonance-player');
 var audioEl = document.getElementById('crp-audio-el');
 var nativeWrap = document.getElementById('crp-native-wrap');
 var fallbackWrap = document.getElementById('crp-fallback-wrap');
 var frameEl = document.getElementById('crp-stream-frame');
 var titleEl = document.getElementById('crp-title');
 var statusEl = document.getElementById('crp-status-text');
 var pulseEl = document.getElementById('crp-pulse');
 var restartChip = document.getElementById('crp-restart-chip');
 var modeBtn = document.getElementById('crp-mode-btn');
 var dlLink = document.getElementById('crp-dl-link');
 var studioLink = document.getElementById('crp-studio-link');
 var closeBtn = document.getElementById('crp-close-btn');
 var playBtn = document.getElementById('crp-play-btn');
 var rewBtn = document.getElementById('crp-rew-btn');
 var fwdBtn = document.getElementById('crp-fwd-btn');
 var seekEl = document.getElementById('crp-seek');
 var curTimeEl = document.getElementById('crp-time-cur');
 var totTimeEl = document.getElementById('crp-time-tot');
 var remBadgeEl = document.getElementById('crp-rem-badge');
 var spdReadout = document.getElementById('crp-spd-readout');
 
 var currentDriveId = null;
 var currentCleanTitle = '';
 var usingFallback = false;
 var isScrubbing = false;
 var lastSavedSec = 0;
 var savedRate = 1.0;
 try {
 var r = parseFloat(localStorage.getItem('crp_playback_rate') || '1');
 if (!isNaN(r) && r >= 0.5 && r <= 3.0) savedRate = Math.round(r * 100) / 100;
 } catch (e) {}
 
 function fmtTime(sec) {
 if (!isFinite(sec) || sec < 0) return '0:00';
 sec = Math.floor(sec);
 var h = Math.floor(sec / 3600);
 var m = Math.floor((sec % 3600) / 60);
 var s = sec % 60;
 var ss = s < 10 ? '0' + s : '' + s;
 if (h > 0) {
 var mm = m < 10 ? '0' + m : '' + m;
 return h + ':' + mm + ':' + ss;
 }
 return m + ':' + ss;
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
 var btns = player.querySelectorAll('.crp-spd-btn[data-spd]');
 btns.forEach(function(b) {
 var v = parseFloat(b.getAttribute('data-spd'));
 if (Math.abs(v - rate) < 0.005) b.classList.add('active');
 else b.classList.remove('active');
 });
 }
 updateTimeUI();
 }
 
 function updateSeekBackground(pct) {
 if (!seekEl) return;
 pct = Math.max(0, Math.min(100, pct || 0));
 seekEl.style.background = 'linear-gradient(to right, #38BDF8 0%, #38BDF8 ' + pct.toFixed(1) + '%, #1E293B ' + pct.toFixed(1) + '%, #1E293B 100%)';
 }
 
 function updateTimeUI() {
 if (!audioEl) return;
 var cur = audioEl.currentTime || 0;
 var dur = audioEl.duration;
 if (curTimeEl) curTimeEl.textContent = fmtTime(cur);
 if (isFinite(dur) && dur > 0) {
 if (totTimeEl) totTimeEl.textContent = fmtTime(dur);
 if (!isScrubbing && seekEl) {
 var val = Math.round((cur / dur) * 1000);
 seekEl.value = String(val);
 updateSeekBackground((cur / dur) * 100);
 }
 if (remBadgeEl) {
 var remReal = Math.max(0, (dur - cur) / (savedRate || 1));
 var remMin = Math.ceil(remReal / 60);
 if (Math.abs(savedRate - 1.0) > 0.01) {
 remBadgeEl.textContent = '-' + remMin + 'm left @ ' + savedRate + '\u00d7';
 } else {
 remBadgeEl.textContent = '-' + remMin + 'm left';
 }
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
 if (audioEl) {
 try { audioEl.pause(); audioEl.removeAttribute('src'); audioEl.load(); } catch (e) {}
 }
 if (nativeWrap) nativeWrap.style.display = 'none';
 if (fallbackWrap) fallbackWrap.style.display = 'block';
 if (frameEl) frameEl.src = 'https://drive.google.com/file/d/' + currentDriveId + '/preview';
 if (modeBtn) modeBtn.textContent = 'Speed Player';
 if (statusEl) statusEl.textContent = reason || 'Google Drive Backup Stream';
 if (restartChip) restartChip.style.display = 'none';
 }
 
 function switchToNative() {
 usingFallback = false;
 if (frameEl) frameEl.src = 'about:blank';
 if (fallbackWrap) fallbackWrap.style.display = 'none';
 if (nativeWrap) nativeWrap.style.display = 'block';
 if (modeBtn) modeBtn.textContent = 'Backup Player';
 if (currentDriveId) {
 loadNativeStream(currentDriveId, currentCleanTitle);
 }
 }
 
 function setupMediaSession(title) {
 if (!('mediaSession' in navigator) || !window.MediaMetadata) return;
 try {
 navigator.mediaSession.metadata = new MediaMetadata({
 title: title,
 artist: "Estudia! & Deep Dive Audio",
 album: 'Deep Dive Podcast Network'
 });
 navigator.mediaSession.setActionHandler('play', function() { if (audioEl) audioEl.play(); });
 navigator.mediaSession.setActionHandler('pause', function() { if (audioEl) audioEl.pause(); });
 navigator.mediaSession.setActionHandler('seekbackward', function() { if (audioEl) audioEl.currentTime = Math.max(0, audioEl.currentTime - 15); });
 navigator.mediaSession.setActionHandler('seekforward', function() { if (audioEl && isFinite(audioEl.duration)) audioEl.currentTime = Math.min(audioEl.duration, audioEl.currentTime + 30); });
 navigator.mediaSession.setActionHandler('seekto', function(d) { if (audioEl && d && typeof d.seekTime === 'number') audioEl.currentTime = d.seekTime; });
 } catch (e) {}
 }
 
 function loadNativeStream(driveId, cleanTitle) {
 if (!audioEl) return;
 var streamUrl = 'https://culturesource-primary-archive-of-cultural-politic.ai.studio/api/audio-stream/' + encodeURIComponent(driveId);
 if (statusEl) statusEl.textContent = 'Connecting stream...';
 if (playBtn) playBtn.innerHTML = '&#8987;';
 if (restartChip) restartChip.style.display = 'none';
 audioEl.src = streamUrl;
 audioEl.load();
 applySpeed(savedRate);
 setupMediaSession(cleanTitle);
 
 var resumeSec = 0;
 try {
 resumeSec = parseFloat(localStorage.getItem('crp_pos_' + driveId) || '0');
 } catch (e) {}
 
 var onLoaded = function() {
 audioEl.removeEventListener('loadedmetadata', onLoaded);
 applySpeed(savedRate);
 if (resumeSec > 15 && isFinite(audioEl.duration) && resumeSec < audioEl.duration - 20) {
 audioEl.currentTime = resumeSec;
 if (statusEl) statusEl.textContent = 'Resumed at ' + fmtTime(resumeSec);
 if (restartChip) restartChip.style.display = 'inline-block';
 } else {
 if (statusEl) statusEl.textContent = 'Playing at ' + savedRate + '\u00d7 speed';
 }
 updateTimeUI();
 };
 audioEl.addEventListener('loadedmetadata', onLoaded);
 
 var p = audioEl.play();
 if (p && typeof p.catch === 'function') {
 p.catch(function(err) {
 if (audioEl.error) {
 switchToFallback('Switched to Drive backup stream');
 } else {
 if (playBtn) playBtn.innerHTML = '&#9654;';
 if (statusEl) statusEl.textContent = 'Ready \u2022 Tap Play (' + savedRate + '\u00d7)';
 }
 });
 }
 }
 
 function highlightActiveCard(driveId) {
 var prev = document.querySelectorAll('.crp-playing-card');
 prev.forEach(function(el) { el.classList.remove('crp-playing-card'); });
 if (!driveId) return;
 var matches = document.querySelectorAll('a[href*="' + driveId + '"]');
 matches.forEach(function(a) {
 a.classList.add('crp-playing-card');
 });
 }
 
 function playEpisode(driveId, title) {
 if (!driveId || !player) return;
 var cleanTitle = (title || 'Deep Dive Podcast')
 .replace(/^[\s\u2022\u25B6\u25BA\u2192\u2013-]+/, '')
 .replace(/^Play\s*/i, '')
 .trim();
 currentDriveId = driveId;
 currentCleanTitle = cleanTitle;
 if (titleEl) titleEl.textContent = cleanTitle;
 if (studioLink) studioLink.href = studioBase + '/?driveId=' + encodeURIComponent(driveId) + '&title=' + encodeURIComponent(cleanTitle) + '&autoplay=1';
 if (dlLink) dlLink.href = 'https://drive.google.com/uc?export=download&id=' + driveId;
 player.style.display = 'block';
 highlightActiveCard(driveId);
 
 // Reset to native speed-controlled engine on each episode selection
 usingFallback = false;
 if (frameEl) frameEl.src = 'about:blank';
 if (fallbackWrap) fallbackWrap.style.display = 'none';
 if (nativeWrap) nativeWrap.style.display = 'block';
 if (modeBtn) modeBtn.textContent = 'Backup Player';
 loadNativeStream(driveId, cleanTitle);
 }
 
 if (audioEl) {
 audioEl.addEventListener('play', function() {
 if (playBtn) playBtn.innerHTML = '&#10074;&#10074;';
 if (pulseEl) { pulseEl.style.background = '#10B981'; pulseEl.style.boxShadow = '0 0 10px #10B981'; }
 applySpeed(savedRate);
 if (statusEl && (!statusEl.textContent || statusEl.textContent.indexOf('Resumed') === -1)) {
 statusEl.textContent = 'Variable-Speed Stream \u2022 ' + savedRate + '\u00d7';
 }
 });
 audioEl.addEventListener('waiting', function() {
 if (statusEl) statusEl.textContent = 'Buffering audio...';
 });
 audioEl.addEventListener('playing', function() {
 if (playBtn) playBtn.innerHTML = '&#10074;&#10074;';
 if (statusEl && statusEl.textContent === 'Buffering audio...') {
 statusEl.textContent = 'Variable-Speed Stream \u2022 ' + savedRate + '\u00d7';
 }
 });
 audioEl.addEventListener('pause', function() {
 if (playBtn) playBtn.innerHTML = '&#9654;';
 if (pulseEl) { pulseEl.style.background = '#F59E0B'; pulseEl.style.boxShadow = '0 0 8px #F59E0B'; }
 if (statusEl && !audioEl.ended) statusEl.textContent = 'Paused \u2022 ' + savedRate + '\u00d7';
 });
 audioEl.addEventListener('timeupdate', function() {
 updateTimeUI();
 if (currentDriveId && Math.abs(audioEl.currentTime - lastSavedSec) > 4) {
 lastSavedSec = audioEl.currentTime;
 try { localStorage.setItem('crp_pos_' + currentDriveId, String(Math.floor(audioEl.currentTime))); } catch (e) {}
 }
 });
 audioEl.addEventListener('ended', function() {
 if (playBtn) playBtn.innerHTML = '&#9654;';
 if (statusEl) statusEl.textContent = 'Episode finished';
 if (currentDriveId) {
 try { localStorage.removeItem('crp_pos_' + currentDriveId); } catch (e) {}
 }
 });
 audioEl.addEventListener('error', function() {
 if (currentDriveId && !usingFallback) {
 switchToFallback('Switched to Drive backup stream');
 }
 });
 }
 
 if (playBtn) {
 playBtn.addEventListener('click', function() {
 if (!audioEl || !currentDriveId) return;
 if (audioEl.paused) audioEl.play();
 else audioEl.pause();
 });
 }
 if (rewBtn) {
 rewBtn.addEventListener('click', function() {
 if (!audioEl) return;
 audioEl.currentTime = Math.max(0, (audioEl.currentTime || 0) - 15);
 updateTimeUI();
 });
 }
 if (fwdBtn) {
 fwdBtn.addEventListener('click', function() {
 if (!audioEl) return;
 var dur = isFinite(audioEl.duration) ? audioEl.duration : (audioEl.currentTime + 30);
 audioEl.currentTime = Math.min(dur, (audioEl.currentTime || 0) + 30);
 updateTimeUI();
 });
 }
 if (restartChip) {
 restartChip.addEventListener('click', function() {
 if (!audioEl) return;
 audioEl.currentTime = 0;
 restartChip.style.display = 'none';
 if (currentDriveId) {
 try { localStorage.removeItem('crp_pos_' + currentDriveId); } catch (e) {}
 }
 if (statusEl) statusEl.textContent = 'Variable-Speed Stream \u2022 ' + savedRate + '\u00d7';
 audioEl.play();
 });
 }
 if (seekEl) {
 seekEl.addEventListener('input', function() {
 isScrubbing = true;
 if (audioEl && isFinite(audioEl.duration) && audioEl.duration > 0) {
 var target = (parseFloat(seekEl.value) / 1000) * audioEl.duration;
 if (curTimeEl) curTimeEl.textContent = fmtTime(target);
 updateSeekBackground(parseFloat(seekEl.value) / 10);
 }
 });
 seekEl.addEventListener('change', function() {
 if (audioEl && isFinite(audioEl.duration) && audioEl.duration > 0) {
 audioEl.currentTime = (parseFloat(seekEl.value) / 1000) * audioEl.duration;
 }
 isScrubbing = false;
 updateTimeUI();
 });
 }
 if (player) {
 player.querySelectorAll('.crp-spd-btn').forEach(function(btn) {
 btn.addEventListener('click', function() {
 var exact = btn.getAttribute('data-spd');
 var step = btn.getAttribute('data-spd-step');
 if (exact) applySpeed(parseFloat(exact));
 else if (step) applySpeed(savedRate + parseFloat(step));
 });
 });
 }
 if (modeBtn) {
 modeBtn.addEventListener('click', function() {
 if (usingFallback) switchToNative();
 else switchToFallback('Google Drive Backup Stream');
 });
 }
 if (closeBtn) {
 closeBtn.addEventListener('click', function() {
 if (audioEl) {
 try { audioEl.pause(); audioEl.removeAttribute('src'); audioEl.load(); } catch (e) {}
 }
 if (frameEl) frameEl.src = 'about:blank';
 if (player) player.style.display = 'none';
 highlightActiveCard(null);
 });
 }
 
 // Initial speed badge state
 applySpeed(savedRate);
 
 function attachInterceptors() {
 var anchors = document.querySelectorAll('a[href*="drive.google.com/file/d/"], a[href*="id="]');
 anchors.forEach(function(a) {
 var href = a.getAttribute('href') || '';
 var m = href.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || href.match(/[?&]id=([a-zA-Z0-9_-]+)/);
 if (m && m[1]) {
 a.addEventListener('click', function(e) {
 e.preventDefault();
 var t = a.innerText || a.getAttribute('title') || 'Podcast Audio';
 playEpisode(m[1], t);
 });
 }
 });
 }
 
 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', function() {
 injectStandaloneEstudia();
 attachInterceptors();
 });
 } else {
 injectStandaloneEstudia();
 attachInterceptors();
 }
 })();
(function() {
 function wireAppRssModal() {
 var modal = document.getElementById('crp-rss-modal');
 var openBtn = document.getElementById('crp-open-rss-modal-btn');
 var closeM = document.getElementById('crp-rss-modal-close');
 if (openBtn && modal && !openBtn.dataset.wired) {
 openBtn.dataset.wired = '1';
 openBtn.addEventListener('click', function() { modal.style.display = 'flex'; });
 }
 if (closeM && modal && !closeM.dataset.wired) {
 closeM.dataset.wired = '1';
 closeM.addEventListener('click', function() { modal.style.display = 'none'; });
 modal.addEventListener('click', function(e) { if (e.target === modal) modal.style.display = 'none'; });
 }
 if (modal) {
 modal.querySelectorAll('.crp-copy-rss').forEach(function(b) {
 if (b.dataset.wired) return;
 b.dataset.wired = '1';
 b.addEventListener('click', function() {
 var u = b.getAttribute('data-rss');
 if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u);
 var orig = b.textContent;
 b.textContent = 'Copied!';
 setTimeout(function() { b.textContent = orig; }, 2000);
 });
 });
 }
 }
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function() { setTimeout(wireAppRssModal, 150); });
 else setTimeout(wireAppRssModal, 150);
 setInterval(wireAppRssModal, 1500);
})();
/*!
 * Shared GA4 / Google Tag + .chatgpt.site portal click tracker + Forensic nav pill injector
 * for non-podcast Carrd portfolio sites and external research portals.
 */
(function () {
  'use strict';
  if (window.__crpPortalAnalyticsLoaded) return;
  window.__crpPortalAnalyticsLoaded = true;
  try {
    if (!document.getElementById('crp-homogeneous-layout')) {
      var st = document.createElement('style');
      st.id = 'crp-homogeneous-layout';
      st.textContent = 'html{font-size:16px !important} .site-main>.inner,#main>.inner{width:min(94vw,1100px) !important;max-width:1100px !important;padding:32px 28px 145px 28px !important} #crp-standalone-estudia-wrapper,#crp-standalone-phys-wrapper{width:100% !important;max-width:1044px !important} .crp-ep-lbl{white-space:normal !important;overflow:visible !important;display:block !important;-webkit-line-clamp:unset !important;line-height:1.35 !important;word-break:break-word !important} #crp-title{white-space:normal !important;overflow:visible !important;text-overflow:clip !important;line-height:1.3 !important}';
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
  var netSynced = false;
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function syncNavFromNetwork() {
    if (netSynced) return;
    var nav = document.getElementById('crp-top-hub-nav');
    if (!nav) return;
    netSynced = true;
    var bust = 'v=' + Math.floor(Date.now() / 300000);
    fetch('https://yorekms.github.io/deep-dive-podcasts/hub/network.json?' + bust, { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (net) {
        if (!net || !net.sites || !net.sites.length) return;
        var curNav = document.getElementById('crp-top-hub-nav');
        if (!curNav) return;
        var activePill = curNav.querySelector('a[style*="font-weight:800"], a[style*="font-weight: 800"]');
        var accent = (HUB === 'scientific-software') ? '#C084FC' : '#38BDF8';
        if (activePill) {
          var mBg = (activePill.getAttribute('style') || '').match(/background\s*:\s*(#[0-9a-fA-F]{6})/);
          if (mBg && mBg[1]) accent = mBg[1];
        }
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
            rssModal.innerHTML = rssModal.innerHTML.replace(/All \d+ Deep Dive Episodes/g, 'All ' + net.master_total + ' Deep Dive Episodes')
              .replace(/Apple Podcasts \(All \d+\)/g, 'Apple Podcasts (All ' + net.master_total + ')');
          }
        }
        wire();
      }).catch(function () {});
  }
  function wire() {
    var nav = document.getElementById('crp-top-hub-nav');
    if (nav) {
      syncNavFromNetwork();
      var quotesPill = nav.querySelector('a[href*="my-quotes.carrd.co"]');
      if (quotesPill && quotesPill.parentNode) quotesPill.parentNode.removeChild(quotesPill);
      if (!nav.querySelector('a[href*="my-forensic-medicine.carrd.co"]')) {
        var pharm = nav.querySelector('a[href*="my-pharmacology.carrd.co"]');
        if (pharm && pharm.parentNode) {
          var a = document.createElement('a');
          a.href = 'https://my-forensic-medicine.carrd.co';
          a.className = pharm.className;
          a.setAttribute('style', pharm.getAttribute('style') || '');
          a.style.fontWeight = '600';
          a.style.color = '#E2E8F0';
          a.style.background = 'rgba(15,23,42,0.72)';
          a.style.border = '1px solid rgba(255,255,255,0.14)';
          a.style.boxShadow = 'none';
          a.textContent = '🩺 Forensic Medicine & Testing';
          pharm.parentNode.insertBefore(a, pharm.nextSibling);
        }
      }
      if (!nav.querySelector('a[href*="my-clampflow.carrd.co"]')) {
        var sci = nav.querySelector('a[href*="my-scientific-software.carrd.co"]');
        if (sci && sci.parentNode) {
          var cf = document.createElement('a');
          cf.href = 'https://my-clampflow.carrd.co';
          cf.className = sci.className;
          cf.setAttribute('style', sci.getAttribute('style') || '');
          cf.style.fontWeight = '700';
          cf.style.color = '#FDE68A';
          cf.style.background = 'rgba(120,53,15,0.48)';
          cf.style.border = '1px solid rgba(245,158,11,0.55)';
          cf.style.boxShadow = 'none';
          cf.textContent = '📈 ClampFlow ABF';
          sci.parentNode.insertBefore(cf, sci.nextSibling);
        }
      }
    }
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
        track('hub_nav_click', { target: link.getAttribute('href') || '' });
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
  setInterval(wire, 1500);
})();
