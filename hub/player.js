/*!
 * Deep Dive Podcast Network - shared Carrd hub player (v2.4.0).
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

  var CSS_TPL = "html{font-size:16px !important} #divider04,#divider01,#divider02,#divider03,#divider05,#divider06,#text04,#text06,#text07,#text03,#text01,#buttons03,#buttons04,#buttons05,#buttons02,#buttons01{display:none !important} .site-main>.inner,#main>.inner{width:min(96vw,1560px) !important;max-width:1560px !important;padding:28px 24px 145px 24px !important} #text02{font-size:34px !important;margin-bottom:6px !important;letter-spacing:-0.02em !important;line-height:1.15 !important} #text08{font-size:15px !important;opacity:0.88 !important;margin-bottom:14px !important;line-height:1.48 !important} .crp-hub-pill{transition:all 0.18s cubic-bezier(0.16,1,0.3,1)} .crp-hub-pill:hover{transform:translateY(-1px);border-color:{A} !important;background:rgba(30,41,59,0.94) !important;box-shadow:0 4px 12px rgba(0,0,0,0.35)} .crp-spd-btn,.crp-mini-chip{appearance:none;border:1px solid #334155;background:#131C31;color:#CBD5E1;font-size:10.5px;font-weight:700;padding:3px 7px;border-radius:7px;cursor:pointer;line-height:1.15;font-family:inherit;transition:all 0.15s ease} .crp-spd-btn:hover,.crp-mini-chip:hover{border-color:{A};color:#FFFFFF} .crp-spd-btn.active,.crp-mini-chip.active{background:{A};color:#090E1A;border-color:{A};box-shadow:0 0 10px {A}66} #crp-sources-chip{appearance:none;background:rgba(15,23,42,0.92);border:1px solid {A}88;color:{A};border-radius:999px;padding:2px 9px;font-size:10.5px;font-weight:800;cursor:pointer;font-family:inherit;transition:all 0.16s ease;box-shadow:0 0 10px {A}24} #crp-sources-chip:hover{background:rgba(30,41,59,0.98);border-color:{A};color:#FFFFFF;transform:translateY(-0.5px)} #crp-sources-chip.active{background:{A} !important;color:#090E1A !important;border-color:{A} !important;box-shadow:0 0 12px {A}66} .crp-ctrl-btn{appearance:none;border:1px solid #334155;background:#131C31;color:#E2E8F0;font-size:11px;font-weight:700;padding:5px 9px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;font-family:inherit;transition:all 0.15s ease} .crp-ctrl-btn:hover{border-color:{A};color:#FFFFFF;background:#1E293B} #crp-seek{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:999px;background:#1E293B;outline:none;cursor:pointer;margin:0} #crp-seek::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:13px;height:13px;border-radius:50%;background:{A};border:2px solid #FFFFFF;box-shadow:0 0 9px {A};cursor:pointer} #crp-seek::-moz-range-thumb{width:13px;height:13px;border-radius:50%;background:{A};border:2px solid #FFFFFF;box-shadow:0 0 9px {A};cursor:pointer} .crp-sec-pill{appearance:none;border:1px solid rgba(255,255,255,0.16);background:rgba(15,23,42,0.82);color:#CBD5E1;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;cursor:pointer;transition:all 0.16s ease;font-family:inherit} .crp-sec-pill:hover{border-color:{A};color:#FFFFFF} .crp-sec-pill.active{background:{A};color:#090E1A;border-color:{A};box-shadow:0 0 11px {A}55} .crp-done-pill{appearance:none;border:1px solid rgba(16,185,129,0.45);background:rgba(6,78,59,0.34);color:#6EE7B7;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;cursor:pointer;transition:all 0.16s ease;font-family:inherit} .crp-done-pill:hover{border-color:#34D399;color:#ECFDF5;background:rgba(6,95,70,0.52)} .crp-done-pill.active{background:#10B981;color:#052E16;border-color:#34D399;box-shadow:0 0 11px rgba(16,185,129,0.5)} .crp-ep-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 14px;width:100%;margin:6px 0 18px 0} .crp-ep-btn{display:flex;flex-direction:column;justify-content:center;gap:4px;width:100%;min-height:46px;padding:10px 13px;border-radius:10px;text-decoration:none !important;background:rgba(15,23,42,0.82);border:1px solid rgba(255,255,255,0.15);box-shadow:0 3px 10px rgba(0,0,0,0.24);backdrop-filter:blur(10px);color:#F8FAFC !important;font-size:13px;font-weight:600;line-height:1.34;text-align:left;box-sizing:border-box;transition:all 0.16s ease} .crp-ep-btn:hover{transform:translateY(-1px);background:rgba(30,41,59,0.95);border-color:{A};box-shadow:0 6px 16px rgba(0,0,0,0.4),0 0 12px {A}2B} .crp-ep-top{display:flex;align-items:flex-start;gap:9px;width:100%} .crp-ep-ico{width:18px;height:18px;margin-top:1px;border-radius:50%;background:{A}22;color:{A};display:inline-flex;align-items:center;justify-content:center;font-size:8.5px;flex-shrink:0;border:1px solid {A}55} .crp-ep-lbl{flex:1;min-width:0;white-space:normal;overflow:visible;display:block;font-size:13.3px;font-weight:700;color:#FFFFFF;line-height:1.32;word-break:break-word} .crp-ep-sub{display:block;width:100%;padding-left:27px;box-sizing:border-box;font-size:11.7px;font-weight:500;color:#CBD5E1;line-height:1.38;word-break:break-word} .crp-ep-tag{font-size:9.5px;font-weight:800;color:{A};background:{A}1A;border:1px solid {A}44;padding:2px 7px;margin-top:1px;border-radius:999px;flex-shrink:0;white-space:nowrap} .crp-ep-tag[data-kind=\"one-medicine\"]{color:#38BDF8;background:rgba(56,189,248,0.15);border-color:rgba(56,189,248,0.45)} .crp-ep-tag[data-kind=\"clinical-cluster\"]{color:#FBBF24;background:rgba(251,191,36,0.15);border-color:rgba(251,191,36,0.45)} .crp-ep-tag[data-kind=\"debate\"]{color:#C084FC;background:rgba(192,132,252,0.15);border-color:rgba(192,132,252,0.42)} .crp-ep-tag[data-kind=\"shoulders-of-giants\"]{color:#FCD34D;background:rgba(245,158,11,0.16);border-color:rgba(245,158,11,0.48)} .crp-ep-tag[data-kind=\"one-angstrom\"]{color:#5EEAD4;background:rgba(20,184,166,0.16);border-color:rgba(20,184,166,0.46)} .crp-ep-tag[data-kind=\"one-angstrom-giants\"]{color:#F9A8D4;background:rgba(244,114,182,0.17);border-color:rgba(244,114,182,0.52)} .crp-ep-tag[data-kind=\"enhancement\"]{color:#FCA5A5;background:rgba(239,68,68,0.17);border-color:rgba(239,68,68,0.52)} .crp-ep-tag[data-kind=\"vice\"]{color:#BEF264;background:rgba(132,204,22,0.16);border-color:rgba(163,230,53,0.52)} .crp-fmt-bar{width:100%;margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.10);display:flex;flex-wrap:wrap;gap:5px;align-items:center;font-size:10.5px;color:#94A3B8} .crp-fmt-pill{appearance:none;border:1px solid rgba(255,255,255,0.15);background:rgba(15,23,42,0.75);color:#CBD5E1;font-size:10.2px;font-weight:700;padding:3px 8px;border-radius:999px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;font-family:inherit;transition:all 0.15s ease} .crp-fmt-pill:hover{border-color:{A};color:#FFFFFF;background:rgba(30,41,59,0.92)} .crp-fmt-pill.active{background:{A};color:#090E1A;border-color:{A};box-shadow:0 0 9px {A}55} .crp-fmt-dot{width:7px;height:7px;border-radius:50%;display:inline-block;flex-shrink:0} .crp-ep-cnt{font-size:9.5px;font-weight:900;color:#6EE7B7;background:rgba(16,185,129,0.20);border:1px solid rgba(52,211,153,0.52);padding:1px 6px;margin-top:1px;border-radius:999px;flex-shrink:0;white-space:nowrap;font-variant-numeric:tabular-nums;cursor:pointer;transition:all 0.15s ease} .crp-ep-cnt:hover{background:#10B981;color:#052E16;border-color:#34D399} .crp-paired-debate-card{border-left:3px solid #C084FC !important;background:linear-gradient(135deg,rgba(46,16,101,0.34),rgba(15,23,42,0.88)) !important} .crp-paired-line{display:block;width:100%;padding-left:27px;box-sizing:border-box;font-size:10.7px;font-weight:800;color:#D8B4FE;line-height:1.32;margin-top:1px} .crp-ep-chk{width:16px;height:16px;margin-top:1px;border-radius:50%;border:1px solid rgba(148,163,184,0.38);background:rgba(15,23,42,0.55);color:transparent;display:inline-flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:900;flex-shrink:0;cursor:pointer;transition:all 0.15s ease} .crp-ep-chk:hover{border-color:#34D399;color:#6EE7B7;background:rgba(16,185,129,0.20);transform:scale(1.14)} .crp-inprog-card{border-left:3px solid #F59E0B !important;background:rgba(30,27,18,0.80) !important} .crp-inprog-card .crp-ep-ico{border-color:#F59E0B;color:#FBBF24;background:rgba(245,158,11,0.18)} .crp-done-card{background:rgba(6,78,59,0.38) !important;border:1px solid rgba(16,185,129,0.50) !important;border-left:3px solid #10B981 !important} .crp-done-card:hover{background:rgba(6,95,70,0.54) !important;border-color:#34D399 !important} .crp-done-card .crp-ep-ico{background:rgba(16,185,129,0.22);border-color:#10B981;color:#34D399;font-weight:900} .crp-done-card .crp-ep-lbl{color:#CBD5E1 !important} .crp-done-card .crp-ep-sub{color:#94A3B8 !important} .crp-done-card .crp-ep-tag{color:#6EE7B7;background:rgba(16,185,129,0.14);border-color:rgba(16,185,129,0.38)} .crp-done-card .crp-ep-chk{background:#10B981;border-color:#34D399;color:#052E16;box-shadow:0 0 8px rgba(16,185,129,0.45)} .crp-playing-card{border-color:{A} !important;box-shadow:0 0 0 2px {A}66,0 8px 20px rgba(0,0,0,0.5) !important;background:rgba(30,41,59,0.96) !important} #crp-sources-drawer{display:none;max-height:min(52vh,380px);overflow-y:auto;background:#070D1C;border:1px solid {A}66;border-radius:13px;padding:10px 12px;margin-bottom:9px;font-size:11.8px;line-height:1.48;color:#E2E8F0;box-shadow:inset 0 1px 0 rgba(255,255,255,0.06)} #crp-sources-drawer a{color:{A};text-decoration:none;font-weight:700} #crp-sources-drawer a:hover{text-decoration:underline} .crp-src-card{padding:8px 10px;border-radius:10px;background:rgba(15,23,42,0.86);border:1px solid rgba(255,255,255,0.10);margin-bottom:6px;transition:border-color 0.15s ease,background 0.15s ease} .crp-src-card:hover{border-color:{A}88;background:rgba(30,41,59,0.94)} .crp-pdb-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:7px;margin-bottom:10px} .crp-pdb-card{padding:8px 10px;border-radius:10px;background:linear-gradient(145deg,rgba(13,31,45,0.92),rgba(15,23,42,0.92));border:1px solid rgba(45,212,191,0.40);transition:border-color 0.15s ease,transform 0.15s ease} .crp-pdb-card:hover{border-color:#2DD4BF;transform:translateY(-1px)} .crp-ext-pill{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:800;text-decoration:none !important;line-height:1.35;transition:all 0.14s ease;white-space:nowrap} .crp-pdb-pill{background:rgba(20,184,166,0.18);border:1px solid rgba(45,212,191,0.55);color:#5EEAD4 !important} .crp-pdb-pill:hover{background:#2DD4BF;color:#042F2E !important} .crp-mol-pill{background:rgba(56,189,248,0.16);border:1px solid rgba(56,189,248,0.52);color:#7DD3FC !important} .crp-mol-pill:hover{background:#38BDF8;color:#082F49 !important} .crp-pmc-pill{background:rgba(16,185,129,0.16);border:1px solid rgba(52,211,153,0.50);color:#6EE7B7 !important} .crp-pmc-pill:hover{background:#34D399;color:#052E16 !important} .crp-cite-pill{background:rgba(148,163,184,0.14);border:1px solid rgba(148,163,184,0.40);color:#E2E8F0 !important} .crp-cite-pill:hover{border-color:{A};color:#FFFFFF !important;background:rgba(30,41,59,0.95)} #crp-transcript-drawer{display:none;max-height:min(54vh,380px);overflow-y:auto;background:#080E1E;border:1px solid {A}66;border-radius:13px;padding:10px 12px;margin-bottom:9px;font-size:12px;line-height:1.5;color:#E2E8F0;box-shadow:inset 0 1px 0 rgba(255,255,255,0.06)} #crp-transcript-drawer.crp-big-txt{font-size:14px;line-height:1.6} .crp-tr-tab{appearance:none;border:none;background:transparent;color:#94A3B8;font-size:10.8px;font-weight:700;padding:4px 9px;border-radius:7px;cursor:pointer;font-family:inherit;transition:all 0.15s ease} .crp-tr-tab:hover{color:#FFFFFF} .crp-tr-tab.active{background:{A};color:#090E1A;font-weight:800} .crp-tr-turn{padding:7px 10px;border-radius:10px;margin-bottom:6px;background:rgba(15,23,42,0.82);border:1px solid rgba(255,255,255,0.08);cursor:pointer;transition:all 0.14s ease} .crp-tr-turn:hover{border-color:{A}88;background:rgba(30,41,59,0.92)} .crp-tr-turn.active{border-color:{A};background:rgba(15,23,42,0.98);box-shadow:0 0 0 1px {A}66,0 4px 12px rgba(0,0,0,0.4)} .crp-quiz-opt{display:block;width:100%;text-align:left;margin-top:5px;padding:6px 9px;border-radius:8px;border:1px solid #334155;background:#0F172A;color:#E2E8F0;font-size:11.5px;font-family:inherit;cursor:pointer;transition:all 0.14s ease} .crp-quiz-opt:hover{border-color:{A};color:#FFFFFF} @media (max-width:780px){.crp-ep-grid{grid-template-columns:1fr} .site-main>.inner,#main>.inner{padding:20px 14px 145px 14px !important} #text02{font-size:26px !important} } .crp-stance-badge{display:inline-flex;align-items:center;gap:4px;font-size:9.6px;font-weight:800;padding:2px 8px;border-radius:999px;white-space:nowrap;flex-shrink:0;letter-spacing:0.01em} .crp-theory-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;padding-left:27px;margin-top:4px;box-sizing:border-box} .crp-theory-meta{display:inline-flex;flex-wrap:wrap;align-items:center;gap:5px;font-size:10.3px;color:#94A3B8;font-weight:600} .crp-theory-open-btn{appearance:none;border:1px solid {A}77;background:rgba(14,116,144,0.22);color:#BAE6FD;font-size:10.3px;font-weight:800;padding:3px 9px;border-radius:999px;cursor:pointer;font-family:inherit;transition:all 0.15s ease} .crp-theory-open-btn:hover{background:{A};color:#090E1A;border-color:{A};box-shadow:0 0 10px {A}55} .crp-atlas-only .crp-ep-ico{background:rgba(56,189,248,0.14);border-color:rgba(56,189,248,0.45);color:#7DD3FC;font-size:10.5px} .crp-stance-pill{appearance:none;border:1px solid rgba(255,255,255,0.16);background:rgba(15,23,42,0.82);color:#CBD5E1;font-size:10.4px;font-weight:700;padding:3px 9px;border-radius:999px;cursor:pointer;display:inline-flex;align-items:center;gap:5px;font-family:inherit;transition:all 0.15s ease} .crp-stance-pill:hover{border-color:{A};color:#FFFFFF;background:rgba(30,41,59,0.94)} .crp-stance-pill.active{background:{A};color:#090E1A;border-color:{A};box-shadow:0 0 10px {A}55} #crp-theory-modal{display:none;position:fixed;inset:0;background:rgba(3,7,18,0.86);backdrop-filter:blur(10px);z-index:1000002;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-align:left} #crp-theory-modal-box{width:100%;max-width:980px;max-height:90vh;overflow-y:auto;background:#080F1E;border:1px solid {A}77;border-radius:20px;padding:22px 24px;box-shadow:0 28px 80px rgba(0,0,0,0.92),0 0 42px {A}26;color:#F8FAFC;box-sizing:border-box} .crp-tm-sec-title{font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;margin:14px 0 7px 0;display:flex;align-items:center;gap:6px} .crp-tm-box{padding:11px 14px;border-radius:12px;background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.10);font-size:12.6px;line-height:1.54;color:#E2E8F0} .crp-tm-grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;margin-top:10px} .crp-tm-timeline{position:relative;padding-left:18px;border-left:2px solid rgba(56,189,248,0.35);margin:6px 0 2px 6px} .crp-tm-tl-item{position:relative;margin-bottom:9px;font-size:12.2px;line-height:1.45;color:#CBD5E1} .crp-tm-tl-item:last-child{margin-bottom:0} .crp-tm-tl-dot{position:absolute;left:-24px;top:4px;width:10px;height:10px;border-radius:50%;background:#38BDF8;border:2px solid #080F1E;box-shadow:0 0 8px rgba(56,189,248,0.65)} .crp-tm-tl-yr{font-weight:800;color:#7DD3FC;margin-right:6px;font-variant-numeric:tabular-nums} .crp-rival-pill{appearance:none;border:1px solid rgba(245,158,11,0.45);background:rgba(120,53,15,0.34);color:#FDE68A;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;cursor:pointer;font-family:inherit;transition:all 0.14s ease} .crp-rival-pill:hover{background:#F59E0B;color:#090E1A;border-color:#FBBF24} .crp-paper-card{padding:10px 12px;border-radius:11px;background:rgba(15,23,42,0.88);border:1px solid rgba(255,255,255,0.10);margin-bottom:7px;transition:border-color 0.15s ease} .crp-paper-card.role-supporting{border-left:3px solid #10B981} .crp-paper-card.role-refuting{border-left:3px solid #FB7185} .crp-paper-card.role-foundational{border-left:3px solid #38BDF8} .crp-paper-card.role-null_mixed{border-left:3px solid #F59E0B} .crp-role-chip{display:inline-flex;align-items:center;font-size:9.4px;font-weight:800;padding:1px 7px;border-radius:999px;text-transform:uppercase;letter-spacing:0.04em;white-space:nowrap} .crp-role-chip.supporting{color:#6EE7B7;background:rgba(16,185,129,0.18);border:1px solid rgba(52,211,153,0.48)} .crp-role-chip.refuting{color:#FDA4AF;background:rgba(244,63,94,0.18);border:1px solid rgba(251,113,133,0.48)} .crp-role-chip.foundational{color:#BAE6FD;background:rgba(56,189,248,0.18);border:1px solid rgba(56,189,248,0.48)} .crp-role-chip.null_mixed{color:#FDE68A;background:rgba(245,158,11,0.18);border:1px solid rgba(251,191,36,0.48)} .crp-link-chip{display:inline-flex;align-items:center;gap:3px;font-size:9.2px;font-weight:800;padding:1px 7px;border-radius:999px;text-transform:uppercase;letter-spacing:0.04em;white-space:nowrap} .crp-link-chip.direct{color:#7DD3FC;background:rgba(14,116,144,0.24);border:1px solid rgba(56,189,248,0.48)} .crp-link-chip.indirect{color:#DDD6FE;background:rgba(139,92,246,0.24);border:1px solid rgba(167,139,250,0.58)} .crp-prox-chip{display:inline-flex;align-items:center;gap:3px;font-size:9.2px;font-weight:800;padding:1px 7px;border-radius:999px;letter-spacing:0.02em;white-space:nowrap} .crp-prox-chip.direct-test{color:#7DD3FC;background:rgba(14,116,144,0.26);border:1px solid rgba(56,189,248,0.52)} .crp-prox-chip.indirect-constraint{color:#DDD6FE;background:rgba(139,92,246,0.24);border:1px solid rgba(167,139,250,0.58)} .crp-prox-chip.adjacent-clue{color:#C7D2FE;background:rgba(79,70,229,0.26);border:1px solid rgba(129,140,248,0.55)} .crp-pillar-chip{appearance:none;display:inline-flex;align-items:center;gap:3px;font-size:9.2px;font-weight:800;padding:1px 7px;border-radius:999px;color:#BAE6FD;background:rgba(30,58,138,0.44);border:1px solid rgba(96,165,250,0.52);cursor:pointer;font-family:inherit;white-space:nowrap;transition:all 0.14s ease} .crp-pillar-chip:hover{background:#38BDF8;color:#090E1A;border-color:#38BDF8} .crp-tier-chip{display:inline-flex;align-items:center;font-size:9.2px;font-weight:800;padding:1px 7px;border-radius:999px;color:#E2E8F0;background:rgba(51,65,85,0.65);border:1px solid rgba(148,163,184,0.42);white-space:nowrap} .crp-tier-chip.tier-high{color:#FDE68A;background:rgba(120,53,15,0.38);border-color:rgba(251,191,36,0.52)} .crp-living-chip{display:inline-flex;align-items:center;gap:3px;font-size:9.2px;font-weight:800;padding:1px 7px;border-radius:999px;color:#5EEAD4;background:rgba(13,148,136,0.22);border:1px solid rgba(45,212,191,0.52);white-space:nowrap} .crp-bridge-note{font-size:11.3px;color:#E0E7FF;line-height:1.44;margin-bottom:6px;padding:6px 9px;border-radius:7px;background:rgba(79,70,229,0.16);border-left:2px solid #818CF8} .crp-escape-note{font-size:11.2px;color:#FDE68A;line-height:1.42;margin-bottom:7px;padding:5px 8px;border-radius:7px;background:rgba(120,53,15,0.24);border-left:2px solid #F59E0B} .crp-eb-bar{display:flex;width:100%;height:10px;border-radius:999px;overflow:hidden;background:rgba(2,6,23,0.78);border:1px solid rgba(255,255,255,0.10);margin:6px 0 9px 0;gap:1px} .crp-eb-seg{height:100%;transition:width 0.25s ease;min-width:4px} .crp-eb-pills{display:flex;flex-wrap:wrap;gap:6px;align-items:center} .crp-eb-pill{display:inline-flex;align-items:center;gap:4px;font-size:10.3px;font-weight:800;padding:2px 9px;border-radius:999px;white-space:nowrap} .crp-mom-pill{display:inline-flex;align-items:center;gap:5px;font-size:10.2px;font-weight:800;padding:2px 10px;border-radius:999px;letter-spacing:0.02em;white-space:nowrap} .crp-pillars-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:8px;margin-top:6px} .crp-pillar-card{appearance:none;text-align:left;width:100%;padding:10px 11px;border-radius:12px;background:linear-gradient(145deg,rgba(15,23,42,0.92),rgba(8,15,30,0.96));border:1px solid rgba(255,255,255,0.12);cursor:pointer;font-family:inherit;color:#E2E8F0;display:flex;flex-direction:column;justify-content:space-between;gap:6px;transition:all 0.16s ease;box-sizing:border-box} .crp-pillar-card:hover{border-color:{A};background:rgba(15,23,42,0.98);transform:translateY(-1px);box-shadow:0 6px 18px rgba(0,0,0,0.38)} .crp-pillar-card.active{border-color:{A};background:linear-gradient(145deg,rgba(14,116,144,0.32),rgba(15,23,42,0.96));box-shadow:0 0 0 1px {A},0 0 18px {A}44} .crp-pillar-id{font-size:9.6px;font-weight:900;padding:1px 6px;border-radius:6px;color:#BAE6FD;background:rgba(14,116,144,0.34);border:1px solid rgba(56,189,248,0.48);letter-spacing:0.04em} .crp-pillar-st{font-size:9.2px;font-weight:800;padding:1px 7px;border-radius:999px;text-transform:uppercase;letter-spacing:0.04em;white-space:nowrap} .crp-pillar-st.st-intact{color:#6EE7B7;background:rgba(16,185,129,0.18);border:1px solid rgba(52,211,153,0.52)} .crp-pillar-st.st-narrowed{color:#7DD3FC;background:rgba(56,189,248,0.18);border:1px solid rgba(56,189,248,0.52)} .crp-pillar-st.st-cracked{color:#FDE68A;background:rgba(245,158,11,0.18);border:1px solid rgba(251,191,36,0.52)} .crp-pillar-st.st-broken{color:#FDA4AF;background:rgba(244,63,94,0.20);border:1px solid rgba(251,113,133,0.56)} .crp-pillar-st.st-unresolved{color:#DDD6FE;background:rgba(139,92,246,0.20);border:1px solid rgba(167,139,250,0.55)} .crp-pillar-filter-bar{display:none;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:6px 11px;margin:0 0 8px 0;border-radius:10px;background:rgba(14,116,144,0.24);border:1px solid rgba(56,189,248,0.55);font-size:11.2px;color:#BAE6FD;font-weight:700} .crp-pillar-filter-bar.active{display:flex} .crp-pillar-clear-btn{appearance:none;border:1px solid rgba(56,189,248,0.55);background:rgba(8,15,30,0.88);color:#7DD3FC;font-size:10.3px;font-weight:800;padding:2px 9px;border-radius:999px;cursor:pointer;font-family:inherit;transition:all 0.14s ease} .crp-pillar-clear-btn:hover{background:#38BDF8;color:#090E1A} .crp-settled-bar{padding:9px 12px;border-radius:11px;background:linear-gradient(135deg,rgba(13,148,136,0.20),rgba(15,23,42,0.92));border:1px solid rgba(45,212,191,0.45);font-size:12px;line-height:1.48;color:#CCFBF1;margin-bottom:8px} .crp-steel-card{padding:11px 13px;border-radius:12px;background:rgba(15,23,42,0.88);border:1px solid rgba(255,255,255,0.10);display:flex;flex-direction:column;justify-content:space-between;gap:8px} .crp-steel-card.side-a{border-left:3px solid #10B981;background:linear-gradient(160deg,rgba(16,185,129,0.09),rgba(15,23,42,0.92))} .crp-steel-card.side-b{border-left:3px solid #FB7185;background:linear-gradient(160deg,rgba(244,63,94,0.09),rgba(15,23,42,0.92))} .crp-steel-hardest{padding:7px 9px;border-radius:8px;background:rgba(120,53,15,0.22);border:1px solid rgba(251,191,36,0.34);font-size:11.3px;line-height:1.44;color:#FEF3C7} .crp-sim-box{padding:12px 14px;border-radius:13px;background:linear-gradient(145deg,rgba(15,23,42,0.92),rgba(8,15,30,0.96));border:1px solid rgba(167,139,250,0.42)} .crp-compass-labels{display:flex;align-items:center;justify-content:space-between;gap:6px;font-size:10.2px;font-weight:800;margin-bottom:5px;flex-wrap:wrap} .crp-compass-track{position:relative;height:14px;border-radius:999px;background:linear-gradient(90deg,rgba(16,185,129,0.58) 0%,rgba(56,189,248,0.36) 28%,rgba(245,158,11,0.42) 50%,rgba(244,63,94,0.58) 100%);border:1px solid rgba(255,255,255,0.18);margin:6px 0 8px 0;box-shadow:inset 0 2px 6px rgba(0,0,0,0.45)} .crp-compass-mid{position:absolute;left:50%;top:0;bottom:0;width:2px;background:rgba(255,255,255,0.38);transform:translateX(-50%)} .crp-compass-base{position:absolute;top:-3px;bottom:-3px;width:2px;background:rgba(255,255,255,0.58);border-radius:2px;transform:translateX(-50%)} .crp-compass-needle{position:absolute;top:50%;width:18px;height:18px;border-radius:50%;background:#FFFFFF;border:3px solid #38BDF8;box-shadow:0 0 14px rgba(56,189,248,0.85),0 2px 6px rgba(0,0,0,0.7);transform:translate(-50%,-50%);transition:left 0.36s cubic-bezier(0.22,1,0.36,1),border-color 0.25s ease} .crp-sim-readout{padding:8px 11px;border-radius:9px;background:rgba(2,6,23,0.64);border:1px solid rgba(255,255,255,0.09);font-size:11.6px;line-height:1.46;color:#E2E8F0;margin:8px 0 10px 0} .crp-flip-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:8px} .crp-flip-card{appearance:none;text-align:left;width:100%;padding:9px 11px;border-radius:11px;background:rgba(15,23,42,0.84);border:1px solid rgba(255,255,255,0.12);cursor:pointer;font-family:inherit;color:#E2E8F0;transition:all 0.16s ease;box-sizing:border-box} .crp-flip-card:hover{border-color:#A78BFA;background:rgba(30,41,59,0.92)} .crp-flip-card.active{border-color:#C4B5FD;background:linear-gradient(135deg,rgba(139,92,246,0.24),rgba(15,23,42,0.95));box-shadow:0 0 0 1px rgba(196,181,253,0.65),0 0 14px rgba(139,92,246,0.35)} .crp-flip-shift{display:inline-flex;align-items:center;font-size:9.6px;font-weight:800;padding:1px 7px;border-radius:999px;white-space:nowrap} .crp-flip-shift.to-a{color:#6EE7B7;background:rgba(16,185,129,0.18);border:1px solid rgba(52,211,153,0.48)} .crp-flip-shift.to-b{color:#FDA4AF;background:rgba(244,63,94,0.18);border:1px solid rgba(251,113,133,0.50)} .crp-flip-shift.to-mid{color:#DDD6FE;background:rgba(139,92,246,0.18);border:1px solid rgba(167,139,250,0.48)} .crp-lineage-pills{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:7px;margin-bottom:9px} .crp-lineage-pill{appearance:none;text-align:left;width:100%;padding:8px 11px;border-radius:11px;background:rgba(14,116,144,0.18);border:1px solid rgba(56,189,248,0.42);color:#BAE6FD;cursor:pointer;font-family:inherit;transition:all 0.15s ease;box-sizing:border-box} .crp-lineage-pill:hover{background:rgba(14,116,144,0.36);border-color:#38BDF8;color:#FFFFFF;box-shadow:0 0 12px rgba(56,189,248,0.32)} .crp-stakes-list{margin:5px 0 0 0;padding-left:18px;font-size:11.8px;line-height:1.48;color:#E2E8F0} .crp-stakes-list li{margin-bottom:4px} .crp-stakes-list li:last-child{margin-bottom:0} .crp-lit-tabs{display:flex;flex-wrap:wrap;gap:5px;margin:7px 0 10px 0} .crp-lit-tab{appearance:none;border:1px solid rgba(255,255,255,0.15);background:rgba(15,23,42,0.85);color:#CBD5E1;font-size:10.5px;font-weight:700;padding:4px 10px;border-radius:999px;cursor:pointer;font-family:inherit;transition:all 0.14s ease} .crp-lit-tab:hover{border-color:{A};color:#FFFFFF;background:rgba(30,41,59,0.95)} .crp-lit-tab.active{background:{A};color:#090E1A;border-color:{A};box-shadow:0 0 10px {A}55;font-weight:800} .crp-h2h-table-wrap{overflow-x:auto;margin:8px 0;border-radius:10px;border:1px solid rgba(255,255,255,0.12);background:rgba(2,6,23,0.58)} .crp-h2h-table{width:100%;border-collapse:collapse;font-size:11.4px;line-height:1.42;text-align:left} .crp-h2h-table th{padding:7px 9px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid rgba(255,255,255,0.12);background:rgba(15,23,42,0.92)} .crp-h2h-table td{padding:7px 9px;vertical-align:top;border-bottom:1px solid rgba(255,255,255,0.07);color:#E2E8F0} .crp-h2h-table tr:last-child td{border-bottom:none} .crp-h2h-table tbody tr:nth-child(even){background:rgba(15,23,42,0.42)} .crp-hatch-box{margin-top:8px;padding:9px 11px;border-radius:10px;background:rgba(120,53,15,0.18);border:1px solid rgba(251,191,36,0.34)} .crp-hatch-list{margin:5px 0 0 0;padding-left:18px;font-size:11.5px;line-height:1.46;color:#FEF3C7} .crp-hatch-list li{margin-bottom:4px} .crp-hatch-list li:last-child{margin-bottom:0} .crp-h2h-details{margin-top:9px;border-radius:10px;border:1px solid rgba(56,189,248,0.34);background:rgba(2,6,23,0.62);overflow:hidden} .crp-h2h-details summary{cursor:pointer;padding:8px 11px;font-size:11.4px;font-weight:800;color:#7DD3FC;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:8px;user-select:none} .crp-h2h-details summary::-webkit-details-marker{display:none} .crp-h2h-details[open] summary{border-bottom:1px solid rgba(56,189,248,0.22);background:rgba(14,116,144,0.16)} .crp-proto-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:8px;padding:10px 11px} .crp-proto-cell{padding:7px 9px;border-radius:8px;background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.08);font-size:11.4px;line-height:1.44;color:#E2E8F0} .crp-proto-k{font-size:9.8px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#7DD3FC;margin-bottom:3px} .crp-proto-yaml{margin:0 11px 11px 11px;padding:8px 10px;border-radius:8px;background:#040812;border:1px solid rgba(255,255,255,0.09);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.6px;line-height:1.42;color:#CBD5E1;max-height:210px;overflow:auto;white-space:pre-wrap;word-break:break-word} #crp-diag-panel{display:none;width:100%;margin:0 auto 14px auto;padding:14px 16px;background:linear-gradient(145deg,rgba(14,116,144,0.22),rgba(9,14,26,0.94));border:1px solid rgba(56,189,248,0.52);border-radius:14px;box-sizing:border-box;text-align:left} .crp-diag-sample{appearance:none;border:1px solid rgba(56,189,248,0.38);background:rgba(15,23,42,0.85);color:#BAE6FD;font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:999px;cursor:pointer;font-family:inherit;transition:all 0.14s ease} .crp-diag-sample:hover{background:#38BDF8;color:#090E1A;border-color:#38BDF8} .crp-diag-res-card{padding:11px 13px;border-radius:12px;background:rgba(15,23,42,0.92);border:1px solid rgba(255,255,255,0.12);margin-top:8px} .crp-stealth-pill{display:inline-block;font-size:10px;font-weight:700;color:#CBD5E1;background:rgba(30,41,59,0.9);border:1px solid rgba(148,163,184,0.32);padding:2px 7px;border-radius:999px}";
  var MARKUP_TPL = "<div id=\"carrd-resonance-player\" style=\"display:none;position:fixed;bottom:14px;left:50%;transform:translateX(-50%);width:95%;max-width:700px;background:rgba(9,14,26,0.97);border:1px solid {A}99;box-shadow:0 24px 60px rgba(0,0,0,0.92),0 0 38px {A}40;border-radius:18px;padding:12px 15px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F1F5F9;backdrop-filter:blur(22px);box-sizing:border-box;-webkit-font-smoothing:antialiased;\"><div style=\"display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;\"><div style=\"display:flex;align-items:center;gap:9px;overflow:hidden;flex:1;\"><div id=\"crp-pulse\" style=\"width:9px;height:9px;border-radius:50%;background:#10B981;box-shadow:0 0 10px #10B981;flex-shrink:0;\"></div><div style=\"overflow:hidden;flex:1;\"><div id=\"crp-title\" style=\"font-size:13px;font-weight:800;color:#FFFFFF;white-space:normal;line-height:1.3;word-break:break-word;\">Select an episode</div><div style=\"display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:2px;font-size:10.5px;color:#94A3B8;font-weight:600;\"><span id=\"crp-status-text\">Variable-Speed Stream</span><button id=\"crp-restart-chip\" type=\"button\" style=\"display:none;background:rgba(16,185,129,0.16);border:1px solid rgba(16,185,129,0.45);color:#34D399;border-radius:999px;padding:1px 7px;font-size:10px;font-weight:700;cursor:pointer;\">&#8634; Start Over</button><button id=\"crp-done-chip\" type=\"button\" title=\"Toggle Listened mark for this episode in your browser\" style=\"display:none;background:rgba(15,23,42,0.9);border:1px solid rgba(16,185,129,0.45);color:#6EE7B7;border-radius:999px;padding:1px 7px;font-size:10px;font-weight:700;cursor:pointer;\">&#9675; Mark Listened</button><button id=\"crp-plus-play-chip\" type=\"button\" title=\"Add +1 listen count for this episode\" style=\"display:none;background:rgba(15,23,42,0.92);border:1px solid rgba(52,211,153,0.52);color:#6EE7B7;border-radius:999px;padding:1px 6px;font-size:10px;font-weight:800;cursor:pointer;font-variant-numeric:tabular-nums;\">+1&times;</button><button id=\"crp-sources-chip\" type=\"button\" title=\"View clickable primary journal citations, PubMed/PMC full text &amp; interactive 3D RCSB PDB structures\" style=\"display:none;\">&#128218; Sources &amp; PDB</button></div></div></div><div style=\"display:flex;align-items:center;gap:5px;flex-shrink:0;\"><button id=\"crp-share-btn\" type=\"button\" title=\"Copy direct link to this episode (Shift+click to include current timestamp)\" style=\"font-size:10px;font-weight:700;color:#E2E8F0;background:#131C31;border:1px solid #334155;padding:4px 7px;border-radius:6px;cursor:pointer;\">&#128279; Share</button><button id=\"crp-mode-btn\" type=\"button\" title=\"Switch between variable-speed player and Google Drive iframe backup player\" style=\"font-size:10px;font-weight:600;color:#94A3B8;background:#131C31;border:1px solid #334155;padding:4px 7px;border-radius:6px;cursor:pointer;\">Backup Player</button><a id=\"crp-dl-link\" href=\"#\" target=\"_blank\" rel=\"noreferrer\" data-no-player=\"true\" title=\"Download original .m4a file\" style=\"font-size:10px;font-weight:600;color:#CBD5E1;text-decoration:none;background:#131C31;border:1px solid #334155;padding:4px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:3px;\">&#10515; Save</a><button id=\"crp-transcript-btn\" type=\"button\" title=\"Read 15s Recap, Vocab, Sources &amp; PDB, Brain Check Quiz &amp; Synchronized Transcript (Shift+Click for full app)\" style=\"font-size:10.5px;font-weight:800;color:#090E1A;background:{A};border:none;padding:4px 10px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;cursor:pointer;box-shadow:0 0 12px {A}55;font-family:inherit;\">&#128196; Transcript</button><button id=\"crp-close-btn\" type=\"button\" aria-label=\"Close Player\" title=\"Close\" style=\"background:transparent;border:none;color:#94A3B8;cursor:pointer;font-size:20px;line-height:1;padding:2px 5px;margin-left:1px;\">&times;</button></div></div><div id=\"crp-sources-drawer\"></div><div id=\"crp-transcript-drawer\"><div style=\"display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;padding-bottom:7px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.10);\"><div style=\"display:inline-flex;align-items:center;gap:3px;flex-wrap:wrap;background:#040812;padding:3px;border-radius:9px;border:1px solid #1E293B;\"><button type=\"button\" class=\"crp-tr-tab active\" data-tr-tab=\"tldr\">&#9889; 15s Recap &amp; Vocab</button><button type=\"button\" class=\"crp-tr-tab\" data-tr-tab=\"chat\">&#128172; Full Transcript</button><button type=\"button\" class=\"crp-tr-tab\" data-tr-tab=\"sources\">&#128218; Sources &amp; PDB</button><button type=\"button\" class=\"crp-tr-tab\" data-tr-tab=\"quiz\">&#129504; Brain Check</button><button type=\"button\" class=\"crp-tr-tab\" data-tr-tab=\"estudia\">&#127891; Estudia! Q&amp;A</button></div><div style=\"display:flex;align-items:center;gap:5px;flex-wrap:wrap;\"><input id=\"crp-tr-search\" type=\"search\" placeholder=\"Find word...\" aria-label=\"Search transcript\" style=\"display:none;width:118px;padding:3px 7px;border-radius:6px;border:1px solid #334155;background:#040812;color:#F8FAFC;font-size:11px;outline:none;font-family:inherit;\" /><button id=\"crp-tr-big-btn\" type=\"button\" class=\"crp-mini-chip\" title=\"Toggle larger easy-read text\">Aa</button><a id=\"crp-estudia-link\" href=\"https://yorekms.github.io/deep-dive-podcasts/estudia/\" target=\"_blank\" rel=\"noopener\" data-no-player=\"true\" title=\"Open full 3D Flashcards, Quiz, Write &amp; Match deck in Estudia! Study Studio\" style=\"font-size:10.5px;font-weight:800;color:#FDE68A;text-decoration:none;padding:3px 8px;border-radius:7px;border:1px solid rgba(251,191,36,0.55);background:rgba(120,53,15,0.42);\">&#127891; Estudia! &#8599;</a><a id=\"crp-studio-link\" href=\"https://yorekms.github.io/deep-dive-podcasts/resonance/?view=listen\" target=\"_blank\" rel=\"noopener\" data-no-player=\"true\" title=\"Open standalone Pocket App with offline downloads &amp; transcripts (iPhone &amp; Android)\" style=\"font-size:10.5px;font-weight:800;color:{A};text-decoration:none;padding:3px 8px;border-radius:7px;border:1px solid {A}66;background:rgba(15,23,42,0.85);\">&#128241; Pocket App</a><button id=\"crp-tr-close-btn\" type=\"button\" title=\"Hide transcript drawer\" style=\"background:transparent;border:none;color:#94A3B8;cursor:pointer;font-size:16px;line-height:1;padding:1px 4px;\">&times;</button></div></div><div id=\"crp-transcript-body\">Select an episode to view its 15-second recap, vocab decoder, primary literature, quiz, and synchronized transcript.</div></div><div id=\"crp-native-wrap\" style=\"background:#050914;border:1px solid #1E293B;border-radius:13px;padding:10px 12px;\"><audio id=\"crp-audio-el\" playsinline webkit-playsinline=\"true\" preload=\"auto\" style=\"display:none;\"></audio><div style=\"display:flex;align-items:center;gap:10px;margin-bottom:9px;\"><span id=\"crp-time-cur\" style=\"font-size:11px;font-variant-numeric:tabular-nums;color:#E2E8F0;font-weight:700;min-width:42px;\">0:00</span><input id=\"crp-seek\" type=\"range\" min=\"0\" max=\"1000\" value=\"0\" step=\"1\" aria-label=\"Seek timeline\" /><span id=\"crp-time-tot\" style=\"font-size:11px;font-variant-numeric:tabular-nums;color:#94A3B8;font-weight:600;min-width:42px;text-align:right;\">--:--</span></div><div style=\"display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;\"><div style=\"display:flex;align-items:center;gap:5px;flex-wrap:wrap;\"><button id=\"crp-prev-btn\" type=\"button\" class=\"crp-ctrl-btn\" title=\"Previous episode in list (Shift+P)\" style=\"padding:5px 7px;\">&#9198;</button><button id=\"crp-rew-btn\" type=\"button\" class=\"crp-ctrl-btn\" title=\"Rewind 15 seconds (J or Left Arrow)\">&#8630; 15s</button><button id=\"crp-play-btn\" type=\"button\" aria-label=\"Play or Pause\" title=\"Play / Pause (Space)\" style=\"width:36px;height:36px;border-radius:50%;border:none;background:{A};color:#090E1A;font-size:14px;font-weight:900;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 0 14px {A}70;\">&#9654;</button><button id=\"crp-fwd-btn\" type=\"button\" class=\"crp-ctrl-btn\" title=\"Skip forward 30 seconds (L or Right Arrow)\">30s &#8631;</button><button id=\"crp-next-btn\" type=\"button\" class=\"crp-ctrl-btn\" title=\"Next episode in list (Shift+N)\" style=\"padding:5px 7px;\">&#9197;</button><button id=\"crp-autonext-btn\" type=\"button\" class=\"crp-mini-chip\" title=\"Automatically play next episode when finished\">Auto-Next</button><button id=\"crp-sleep-btn\" type=\"button\" class=\"crp-mini-chip\" title=\"Cycle sleep timer (Off / 15m / 30m / 45m / End of episode)\">Sleep</button><span id=\"crp-rem-badge\" style=\"font-size:10px;color:#64748B;font-weight:600;font-variant-numeric:tabular-nums;margin-left:1px;\"></span></div><div style=\"display:flex;align-items:center;gap:4px;flex-wrap:wrap;\"><span style=\"font-size:9.5px;font-weight:800;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;margin-right:2px;\">Speed</span><button type=\"button\" class=\"crp-spd-btn\" data-spd-step=\"-0.1\" title=\"Slower (-0.1x or [ key)\">&minus;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1\">1&times;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.25\">1.25&times;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.5\">1.5&times;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.75\">1.75&times;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd=\"2\">2&times;</button><button type=\"button\" class=\"crp-spd-btn\" data-spd-step=\"0.1\" title=\"Faster (+0.1x or ] key)\">+</button><span id=\"crp-spd-readout\" style=\"font-size:11px;font-weight:800;color:{A};min-width:34px;text-align:center;font-variant-numeric:tabular-nums;\">1.0&times;</span></div></div></div><div id=\"crp-fallback-wrap\" style=\"display:none;width:100%;height:132px;border-radius:12px;overflow:hidden;background:#030712;border:1px solid #1E293B;position:relative;\"><iframe id=\"crp-stream-frame\" src=\"about:blank\" style=\"width:100%;height:132px;border:none;display:block;\" allow=\"autoplay\" loading=\"lazy\"></iframe></div></div><div id=\"crp-rss-modal\" style=\"display:none;position:fixed;inset:0;background:rgba(3,7,18,0.84);backdrop-filter:blur(9px);z-index:1000001;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-align:left;\"><div style=\"width:100%;max-width:560px;background:#090E1A;border:1px solid {A}88;border-radius:20px;padding:22px;box-shadow:0 25px 70px rgba(0,0,0,0.92);color:#F8FAFC;\"><div style=\"display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;\"><div><div style=\"font-size:10.5px;font-weight:800;color:{A};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;\">Subscribe in Any Podcast App</div><h3 style=\"margin:0;font-size:19px;font-weight:800;color:#FFFFFF;\">Deep Dive Podcast RSS Feeds</h3></div><button id=\"crp-rss-modal-close\" type=\"button\" style=\"background:#1E293B;border:1px solid #334155;color:#CBD5E1;border-radius:8px;padding:3px 9px;font-size:16px;cursor:pointer;\">&times;</button></div><p style=\"font-size:12.5px;color:#CBD5E1;line-height:1.5;margin:0 0 14px 0;\"> Listen offline with variable-speed playback in <strong>Apple Podcasts</strong>, <strong>Overcast</strong>, <strong>Pocket Casts</strong>, or any RSS podcast player. </p><div style=\"background:rgba(15,23,42,0.95);border:1px solid {A}55;border-radius:12px;padding:12px;margin-bottom:10px;\"><div style=\"font-size:11px;font-weight:800;color:{A};margin-bottom:6px;\">This Hub's Feed ({HUBT})</div><div style=\"display:flex;flex-wrap:wrap;gap:6px;margin-bottom:7px;\"><a href=\"podcast://{RSSNP}\" class=\"crp-ctrl-btn\" style=\"background:{A};color:#090E1A;border-color:{A};text-decoration:none;font-weight:800;\">Apple Podcasts</a><a href=\"overcast://x-callback-url/add?url={RSS}\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">Overcast</a><a href=\"pktc://subscribe/{RSSNP}\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">Pocket Casts</a><button type=\"button\" class=\"crp-ctrl-btn crp-copy-rss\" data-rss=\"{RSS}\">Copy Feed URL</button></div><input type=\"text\" readonly value=\"{RSS}\" onclick=\"this.select()\" style=\"width:100%;padding:5px 8px;border-radius:6px;border:1px solid #334155;background:#050914;color:#94A3B8;font-family:monospace;font-size:11px;box-sizing:border-box;\" /></div><div style=\"background:rgba(15,23,42,0.95);border:1px solid rgba(255,255,255,0.14);border-radius:12px;padding:12px;margin-bottom:12px;\"><div style=\"font-size:11px;font-weight:800;color:#38BDF8;margin-bottom:6px;\">Master Network Feed (All {MT} Deep Dive Episodes)</div><div style=\"display:flex;flex-wrap:wrap;gap:6px;margin-bottom:7px;\"><a href=\"podcast://yorekms.github.io/deep-dive-podcasts/feed.xml\" class=\"crp-ctrl-btn\" style=\"background:#38BDF8;color:#090E1A;border-color:#38BDF8;text-decoration:none;font-weight:800;\">Apple Podcasts (All {MT})</a><button type=\"button\" class=\"crp-ctrl-btn crp-copy-rss\" data-rss=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\">Copy Master RSS URL</button><a href=\"https://yorekms.github.io/deep-dive-podcasts/\" target=\"_blank\" rel=\"noopener\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">All {NF} Feeds Directory &#8599;</a></div><input type=\"text\" readonly value=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\" onclick=\"this.select()\" style=\"width:100%;padding:5px 8px;border-radius:6px;border:1px solid #334155;background:#050914;color:#94A3B8;font-family:monospace;font-size:11px;box-sizing:border-box;\" /></div></div></div><div id=\"crp-theory-modal\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Scientific Theory Evidence Dossier\"><div id=\"crp-theory-modal-box\"></div></div>";
  var PLAYER_VERSION = "2.4.0";

  var pendingSyncToken = '';
  try {
    if (location.hash && location.hash.indexOf('crp_s=') !== -1) {
      var rawHash = location.hash.replace(/^#/, '');
      var keptParts = [];
      rawHash.split('&').forEach(function (part) {
        if (part.indexOf('crp_s=') === 0) {
          pendingSyncToken = decodeURIComponent(part.slice(6));
        } else if (part) {
          keptParts.push(part);
        }
      });
      var cleanUrl = location.pathname + location.search + (keptParts.length ? '#' + keptParts.join('&') : '');
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', cleanUrl);
      }
    }
  } catch (e) {}

  var scriptEl = document.currentScript;
  var rootEl = document.getElementById('crp-hub-root');
  var HUB = (scriptEl && scriptEl.getAttribute('data-hub')) ||
    (rootEl && rootEl.getAttribute('data-hub')) || window.CRP_HUB || '';
  var BASE = (scriptEl && scriptEl.src) ? scriptEl.src.replace(/player\.js(\?.*)?$/, '') :
    'https://yorekms.github.io/deep-dive-podcasts/hub/';

  var STUDIO_BASE = 'https://yorekms.github.io/deep-dive-podcasts/resonance';
  var ESTUDIA_BASE = 'https://yorekms.github.io/deep-dive-podcasts/estudia';
  var TOPICS_URL = 'https://yorekms.github.io/deep-dive-podcasts/topics/';
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

    // ---------- Scientific Theories Atlas v2.4.0 Helpers ----------
    var IS_THEORY_ATLAS = (cfg.atlas_mode === 'scientific-theories' || HUB === 'scientific-theories');
    var STANCE_META = {
      'foundational-consensus': {
        label: 'Foundational Consensus',
        short: 'Consensus',
        color: '#10B981',
        bg: 'rgba(16,185,129,0.16)',
        border: 'rgba(52,211,153,0.52)',
        def: 'Deeply corroborated across independent methods and scales; forms structural bedrock of its discipline.'
      },
      'dominant-refined': {
        label: 'Dominant \u00b7 Actively Refined',
        short: 'Dominant',
        color: '#38BDF8',
        bg: 'rgba(56,189,248,0.15)',
        border: 'rgba(56,189,248,0.50)',
        def: 'Leading explanatory framework with strong empirical support, actively narrowed or integrated with newer mechanisms.'
      },
      'contested-competing': {
        label: 'Contested \u00b7 Competing Paradigms',
        short: 'Contested',
        color: '#F59E0B',
        bg: 'rgba(245,158,11,0.16)',
        border: 'rgba(251,191,36,0.52)',
        def: 'Two or more well-specified rival theories generate conflicting predictions and are locked in active adversarial testing.'
      },
      'emerging-frontier': {
        label: 'Emerging \u00b7 Under-Tested',
        short: 'Emerging',
        color: '#A78BFA',
        bg: 'rgba(167,139,250,0.16)',
        border: 'rgba(196,181,253,0.52)',
        def: 'Coherent theoretical framework with intriguing initial results, awaiting decisive falsification or large-scale replication.'
      },
      'challenged-revision': {
        label: 'Challenged \u00b7 Under Revision',
        short: 'Challenged',
        color: '#FB7185',
        bg: 'rgba(251,113,133,0.16)',
        border: 'rgba(253,164,175,0.52)',
        def: 'Formerly influential or widely taught hypothesis facing major empirical anomalies, failed replications, or strong counter-evidence.'
      },
      'superseded-anchor': {
        label: 'Superseded \u00b7 Historical Anchor',
        short: 'Superseded',
        color: '#94A3B8',
        bg: 'rgba(148,163,184,0.16)',
        border: 'rgba(148,163,184,0.45)',
        def: 'Falsified or subsumed by a superior theory, retained because modern papers still inadvertently echo its assumptions.'
      }
    };
    var STANCE_ORDER = [
      'foundational-consensus',
      'dominant-refined',
      'contested-competing',
      'emerging-frontier',
      'challenged-revision',
      'superseded-anchor'
    ];
    function getStanceInfo(key) {
      return STANCE_META[key] || STANCE_META['contested-competing'];
    }
    function stanceBadgeHTML(key, useLong) {
      var st = getStanceInfo(key);
      return '<span class="crp-stance-badge" style="color:' + st.color + ';background:' + st.bg + ';border:1px solid ' + st.border + ';" title="' + esc(st.def) + '">' +
        '<span style="width:6px;height:6px;border-radius:50%;background:' + st.color + ';display:inline-block;"></span>' +
        esc(useLong ? st.label : st.short) + '</span>';
    }
    function normalizeRoleKey(raw) {
      var r = String(raw || 'foundational').toLowerCase().replace(/[\s\/-]+/g, '_');
      if (r === 'supporting' || r === 'support' || r === 'pro') return 'supporting';
      if (r === 'refuting' || r === 'challenging' || r === 'con' || r.indexOf('refut') !== -1 || r.indexOf('challeng') !== -1) return 'refuting';
      if (r === 'null_mixed' || r === 'null' || r === 'mixed' || r === 'inconclusive' || r === 'neutral') return 'null_mixed';
      return 'foundational';
    }
    function normalizeLinkType(raw) {
      var lt = String(raw || 'direct').toLowerCase();
      if (lt.indexOf('indirect') !== -1 || lt.indexOf('stealth') !== -1 || lt.indexOf('implicit') !== -1 || lt.indexOf('adjacent') !== -1 || lt.indexOf('clue') !== -1) return 'indirect';
      return 'direct';
    }
    function normalizeTestProximity(item) {
      var raw = String((item && (item.test_proximity || item.proximity)) || '').toLowerCase().replace(/[\s_]+/g, '-');
      if (raw) {
        if (raw.indexOf('adjacent') !== -1 || raw.indexOf('clue') !== -1 || raw.indexOf('context') !== -1) return 'adjacent-clue';
        if (raw.indexOf('indirect') !== -1 || raw.indexOf('constraint') !== -1 || raw.indexOf('stealth') !== -1) return 'indirect-constraint';
        if (raw.indexOf('direct') !== -1) return 'direct-test';
      }
      return normalizeLinkType(item && item.link_type) === 'indirect' ? 'indirect-constraint' : 'direct-test';
    }
    function testProximityMeta(prox) {
      if (prox === 'adjacent-clue') {
        return {
          cls: 'adjacent-clue',
          label: '\ud83e\udde9 Adjacent Clue',
          tip: 'Contextual or neighboring empirical evidence that loosely constrains or complicates the debate'
        };
      }
      if (prox === 'indirect-constraint') {
        return {
          cls: 'indirect-constraint',
          label: '\ud83d\udd17 Indirect Constraint',
          tip: 'Tests a downstream mechanism, boundary condition, or stealth assumption without naming the theory'
        };
      }
      return {
        cls: 'direct-test',
        label: '\ud83c\udfaf Direct Test',
        tip: 'Directly tests this theory or its primary discriminating prediction'
      };
    }
    function paperMatchesPillar(item, pillarId) {
      if (!pillarId) return true;
      if (!item) return false;
      var want = String(pillarId).toUpperCase();
      if (String(item.pillar_id || '').toUpperCase() === want) return true;
      if (Array.isArray(item.pillar_ids)) {
        for (var i = 0; i < item.pillar_ids.length; i++) {
          if (String(item.pillar_ids[i] || '').toUpperCase() === want) return true;
        }
      }
      return false;
    }
    function pillarStatusMeta(status) {
      var s = String(status || 'Unresolved').toLowerCase();
      if (s.indexOf('broken') !== -1 || s.indexOf('falsif') !== -1) return { cls: 'st-broken', label: 'Broken', dot: '#FB7185' };
      if (s.indexOf('crack') !== -1 || s.indexOf('strain') !== -1) return { cls: 'st-cracked', label: 'Cracked', dot: '#F59E0B' };
      if (s.indexOf('narrow') !== -1 || s.indexOf('refin') !== -1) return { cls: 'st-narrowed', label: 'Narrowed', dot: '#38BDF8' };
      if (s.indexOf('intact') !== -1 || s.indexOf('solid') !== -1) return { cls: 'st-intact', label: 'Intact', dot: '#10B981' };
      return { cls: 'st-unresolved', label: 'Unresolved', dot: '#A78BFA' };
    }
    function getMomentumMeta(mom) {
      var s = String(mom || 'Stable');
      var low = s.toLowerCase();
      if (low.indexOf('revision') !== -1 || low.indexOf('pressure') !== -1) {
        return { label: s, color: '#FDA4AF', dot: '#FB7185', bg: 'rgba(159,18,57,0.34)', border: 'rgba(251,113,133,0.55)' };
      }
      if (low.indexOf('tension') !== -1 || low.indexOf('emerg') !== -1) {
        return { label: s, color: '#FDE68A', dot: '#F59E0B', bg: 'rgba(120,53,15,0.36)', border: 'rgba(251,191,36,0.52)' };
      }
      if (low.indexOf('strength') !== -1 || low.indexOf('consensus') !== -1) {
        return { label: s, color: '#6EE7B7', dot: '#10B981', bg: 'rgba(6,78,59,0.42)', border: 'rgba(52,211,153,0.52)' };
      }
      return { label: s || 'Stable', color: '#7DD3FC', dot: '#38BDF8', bg: 'rgba(14,116,144,0.24)', border: 'rgba(56,189,248,0.48)' };
    }
    function stanceBaseCompassScore(stance) {
      if (stance === 'foundational-consensus') return 82;
      if (stance === 'dominant-refined') return 68;
      if (stance === 'contested-competing') return 50;
      if (stance === 'emerging-frontier') return 45;
      if (stance === 'challenged-revision') return 30;
      if (stance === 'superseded-anchor') return 12;
      return 50;
    }
    function compassVerdictMeta(score) {
      if (score >= 78) {
        return { label: 'Foundational Consensus \u00b7 Theory A Holds', color: '#6EE7B7', dot: '#10B981', bg: 'rgba(16,185,129,0.18)', border: 'rgba(52,211,153,0.52)' };
      }
      if (score >= 62) {
        return { label: 'Dominant \u00b7 Theory A Leads', color: '#7DD3FC', dot: '#38BDF8', bg: 'rgba(56,189,248,0.18)', border: 'rgba(56,189,248,0.52)' };
      }
      if (score >= 40) {
        return { label: 'Hybrid / Contested Zone', color: '#FDE68A', dot: '#F59E0B', bg: 'rgba(245,158,11,0.18)', border: 'rgba(251,191,36,0.52)' };
      }
      if (score >= 22) {
        return { label: 'Challenged \u00b7 Rival B Pulling Ahead', color: '#FDA4AF', dot: '#FB7185', bg: 'rgba(244,63,94,0.18)', border: 'rgba(251,113,133,0.54)' };
      }
      return { label: 'Verdict Flipped \u00b7 Rival B Supersedes', color: '#FDA4AF', dot: '#F43F5E', bg: 'rgba(159,18,57,0.36)', border: 'rgba(251,113,133,0.62)' };
    }
    function theoryByIdOrSlug(idOrSlug) {
      if (!idOrSlug) return null;
      if (epMetaById[idOrSlug]) return epMetaById[idOrSlug];
      var want = String(idOrSlug).toLowerCase().trim();
      for (var k in epMetaById) {
        if (!Object.prototype.hasOwnProperty.call(epMetaById, k)) continue;
        var wrap = epMetaById[k];
        var th = wrap && wrap.ep && wrap.ep.theory;
        if (th && (
          String(th.slug || '').toLowerCase() === want ||
          String(th.code || '').toLowerCase() === want ||
          String(th.canonical_title || '').toLowerCase() === want
        )) {
          return wrap;
        }
      }
      return null;
    }
    function renderEvidenceBalanceHTML(ebObj, srcs) {
      var eb = ebObj && typeof ebObj === 'object' ? ebObj : null;
      var fN = eb && typeof eb.foundational === 'number' ? eb.foundational : srcs.filter(function (s) { return normalizeRoleKey(s.role) === 'foundational'; }).length;
      var sN = eb && typeof eb.supporting === 'number' ? eb.supporting : srcs.filter(function (s) { return normalizeRoleKey(s.role) === 'supporting'; }).length;
      var rN = eb && typeof eb.refuting === 'number' ? eb.refuting : srcs.filter(function (s) { return normalizeRoleKey(s.role) === 'refuting'; }).length;
      var nN = eb && typeof eb.null_mixed === 'number' ? eb.null_mixed : srcs.filter(function (s) { return normalizeRoleKey(s.role) === 'null_mixed'; }).length;
      var indN = eb && typeof eb.indirect === 'number' ? eb.indirect : srcs.filter(function (s) { return normalizeTestProximity(s) !== 'direct-test'; }).length;
      var livN = eb && typeof eb.living_harvest === 'number' ? eb.living_harvest : srcs.filter(function (s) { return s.origin === 'living-harvest'; }).length;
      var tot = fN + sN + rN + nN;
      if (!tot && !eb) return '';
      var denom = Math.max(1, tot);
      var mom = getMomentumMeta((eb && (eb.momentum || eb.stance_momentum)) || 'Stable');
      var segs = [
        { k: 'Foundational', n: fN, col: '#38BDF8' },
        { k: 'Supporting', n: sN, col: '#10B981' },
        { k: 'Challenging / Refuting', n: rN, col: '#FB7185' },
        { k: 'Null / Mixed', n: nN, col: '#F59E0B' }
      ];
      var barInner = '';
      segs.forEach(function (sg) {
        if (sg.n > 0) {
          var pct = ((sg.n / denom) * 100).toFixed(1);
          barInner += '<div class="crp-eb-seg" style="width:' + pct + '%;background:' + sg.col + ';" title="' + esc(sg.k + ': ' + sg.n + ' (' + pct + '%)') + '"></div>';
        }
      });
      var h = '<div id="crp-tm-eb-wrap" style="margin-top:12px;">';
      h += '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:0 0 6px 0;">' +
        '<div class="crp-tm-sec-title" style="color:#7DD3FC;margin:0;">&#128202; Live Evidence Balance &amp; Epistemic Momentum</div>' +
        '<span class="crp-mom-pill" style="color:' + mom.color + ';background:' + mom.bg + ';border:1px solid ' + mom.border + ';" title="Living stance momentum across verified direct, indirect, and adjacent studies">' +
          '<span style="width:6px;height:6px;border-radius:50%;background:' + mom.dot + ';display:inline-block;"></span>' +
          'Stance Momentum: ' + esc(mom.label) +
        '</span>' +
      '</div>';
      h += '<div class="crp-tm-box" style="padding:10px 13px;">';
      if (tot > 0) {
        h += '<div class="crp-eb-bar" role="img" aria-label="Evidence distribution bar">' + barInner + '</div>';
      }
      h += '<div class="crp-eb-pills">';
      h += '<span class="crp-eb-pill" style="color:#BAE6FD;background:rgba(56,189,248,0.16);border:1px solid rgba(56,189,248,0.44);">&#127963;&#65039; Foundational (' + fN + ')</span>';
      h += '<span class="crp-eb-pill" style="color:#6EE7B7;background:rgba(16,185,129,0.16);border:1px solid rgba(52,211,153,0.46);">&#10003; Supporting (' + sN + ')</span>';
      h += '<span class="crp-eb-pill" style="color:#FDA4AF;background:rgba(244,63,94,0.16);border:1px solid rgba(251,113,133,0.46);">&#10007; Challenging / Refuting (' + rN + ')</span>';
      h += '<span class="crp-eb-pill" style="color:#FDE68A;background:rgba(245,158,11,0.16);border:1px solid rgba(251,191,36,0.46);">&asymp; Null / Mixed (' + nN + ')</span>';
      h += '<span class="crp-eb-pill" style="color:#DDD6FE;background:rgba(139,92,246,0.20);border:1px solid rgba(167,139,250,0.52);">&#129513; Indirect &amp; Adjacent (' + indN + ')</span>';
      if (livN > 0) {
        h += '<span class="crp-eb-pill" style="color:#5EEAD4;background:rgba(13,148,136,0.20);border:1px solid rgba(45,212,191,0.48);">&#9889; Living Harvest (+' + livN + ')</span>';
      }
      h += '</div>';
      if (eb && eb.last_updated) {
        h += '<div style="font-size:10px;color:#64748B;margin-top:6px;">Last living harvest sync: ' + esc(eb.last_updated) + (eb.displayed_total && eb.total > eb.displayed_total ? (' \u00b7 Showing top ' + eb.displayed_total + ' of ' + eb.total + ' verified ledger papers') : '') + '</div>';
      }
      h += '</div></div>';
      return h;
    }
    function renderPillarsHTML(pillars, srcs) {
      if (!Array.isArray(pillars) || !pillars.length) return '';
      var h = '<div id="crp-tm-pillars-wrap" style="margin-top:13px;">';
      h += '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:0 0 6px 0;">' +
        '<div class="crp-tm-sec-title" style="color:#7DD3FC;margin:0;">&#127963;&#65039; Foundational Pillars Under Test (Click Any Pillar to Filter Papers)</div>' +
        '<span style="font-size:10.3px;color:#94A3B8;font-weight:700;">' + pillars.length + ' Core Axioms</span>' +
      '</div>';
      h += '<div class="crp-pillars-grid">';
      pillars.forEach(function (p, idx) {
        if (!p) return;
        var pid = String(p.id || ('P' + (idx + 1))).toUpperCase();
        var pname = p.name || p.title || ('Pillar ' + (idx + 1));
        var pclaim = p.claim || p.proposition || p.description || '';
        var st = pillarStatusMeta(p.status);
        var matchCnt = srcs.filter(function (s) { return paperMatchesPillar(s, pid); }).length;
        h += '<button type="button" class="crp-pillar-card" data-pillar-id="' + esc(pid) + '" data-pillar-name="' + esc(pname) + '" aria-pressed="false" title="Click to filter the Primary Literature Ledger to papers testing ' + esc(pid + ': ' + pname) + '">' +
          '<div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:5px;flex-wrap:wrap;">' +
              '<span class="crp-pillar-id">' + esc(pid) + '</span>' +
              '<span class="crp-pillar-st ' + esc(st.cls) + '">' + esc(st.label) + '</span>' +
            '</div>' +
            '<div style="font-size:12.2px;font-weight:800;color:#FFFFFF;line-height:1.32;margin-bottom:4px;">' + esc(pname) + '</div>' +
            (pclaim ? '<div style="font-size:11.3px;color:#CBD5E1;line-height:1.42;">' + esc(pclaim) + '</div>' : '') +
            (p.note ? '<div style="font-size:10.6px;color:#94A3B8;line-height:1.38;margin-top:4px;font-style:italic;">' + esc(p.note) + '</div>' : '') +
          '</div>' +
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.08);font-size:10.2px;font-weight:700;">' +
            '<span style="color:#7DD3FC;">&#128196; ' + matchCnt + ' linked ' + (matchCnt === 1 ? 'paper' : 'papers') + '</span>' +
            '<span class="crp-pillar-cue" style="color:#94A3B8;">Filter &#8595;</span>' +
          '</div>' +
        '</button>';
      });
      h += '</div></div>';
      return h;
    }
    function renderSteelmanHTML(th) {
      var sm = th.steelman && typeof th.steelman === 'object' ? th.steelman : null;
      if (!sm) return '';
      var h2 = th.head_to_head && typeof th.head_to_head === 'object' ? th.head_to_head : {};
      var taObj = sm.theory_a && typeof sm.theory_a === 'object' ? sm.theory_a : {};
      var rbObj = sm.rival_b && typeof sm.rival_b === 'object' ? sm.rival_b : {};
      var settled = sm.settled_ground || sm.shared_ground || sm.common_ground || '';
      var taName = sm.theory_a_name || sm.theory_a_label || taObj.name || taObj.label || h2.theory_a || th.short_title || th.canonical_title || 'Theory A';
      var taCase = sm.theory_a_case || sm.theory_a_steelman || (typeof sm.theory_a === 'string' ? sm.theory_a : '') || taObj.case || taObj.steelman || '';
      var taHard = sm.theory_a_hardest || sm.theory_a_hardest_finding || taObj.hardest_finding || taObj.hardest || '';
      var rbName = sm.rival_b_name || sm.rival_b_label || rbObj.name || rbObj.label || h2.rival_b || ((th.rivals && th.rivals[0]) || 'Rival B');
      var rbCase = sm.rival_b_case || sm.rival_b_steelman || (typeof sm.rival_b === 'string' ? sm.rival_b : '') || rbObj.case || rbObj.steelman || '';
      var rbHard = sm.rival_b_hardest || sm.rival_b_hardest_finding || rbObj.hardest_finding || rbObj.hardest || '';
      if (!settled && !taCase && !rbCase) return '';

      var h = '<div id="crp-tm-steelman-wrap" style="margin-top:14px;">';
      h += '<div class="crp-tm-sec-title" style="color:#5EEAD4;margin:0 0 7px 0;">&#9878;&#65039; Steelman Both Sides &amp; Settled Ground</div>';
      if (settled) {
        h += '<div class="crp-settled-bar"><strong style="color:#5EEAD4;">&#129309; Where Both Sides Agree (Settled Ground):</strong> ' + esc(settled) + '</div>';
      }
      if (taCase || rbCase) {
        h += '<div class="crp-tm-grid2" style="margin-top:0;">';
        h += '<div class="crp-steel-card side-a">' +
          '<div>' +
            '<div style="font-size:10px;font-weight:800;color:#6EE7B7;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Theory A Steelman &middot; ' + esc(taName) + '</div>' +
            '<div style="font-size:12px;color:#E2E8F0;line-height:1.48;">' + esc(taCase) + '</div>' +
          '</div>' +
          (taHard ? '<div class="crp-steel-hardest"><strong style="color:#FDE68A;">&#9888;&#65039; Hardest Finding It Must Explain Away:</strong> ' + esc(taHard) + '</div>' : '') +
        '</div>';
        h += '<div class="crp-steel-card side-b">' +
          '<div>' +
            '<div style="font-size:10px;font-weight:800;color:#FDA4AF;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Rival B Steelman &middot; ' + esc(rbName) + '</div>' +
            '<div style="font-size:12px;color:#E2E8F0;line-height:1.48;">' + esc(rbCase) + '</div>' +
          '</div>' +
          (rbHard ? '<div class="crp-steel-hardest"><strong style="color:#FDE68A;">&#9888;&#65039; Hardest Finding It Must Explain Away:</strong> ' + esc(rbHard) + '</div>' : '') +
        '</div>';
        h += '</div>';
      }
      h += '</div>';
      return h;
    }
    function renderFlipSimulatorHTML(th) {
      var flips = Array.isArray(th.flip_scenarios) ? th.flip_scenarios : [];
      if (!flips.length) return '';
      var h2 = th.head_to_head && typeof th.head_to_head === 'object' ? th.head_to_head : {};
      var sm = th.steelman && typeof th.steelman === 'object' ? th.steelman : {};
      var taShort = sm.theory_a_name || h2.theory_a || th.short_title || 'Theory A';
      if (taShort.length > 34) taShort = taShort.slice(0, 32) + '\u2026';
      var rbShort = sm.rival_b_name || h2.rival_b || ((th.rivals && th.rivals[0]) || 'Rival B');
      if (rbShort.length > 34) rbShort = rbShort.slice(0, 32) + '\u2026';
      var baseScore = stanceBaseCompassScore(th.stance);
      var baseLeft = 100 - baseScore;
      var vm = compassVerdictMeta(baseScore);

      var h = '<div id="crp-tm-sim-wrap" style="margin-top:14px;">';
      h += '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:0 0 7px 0;">' +
        '<div class="crp-tm-sec-title" style="color:#C4B5FD;margin:0;">&#129517; Interactive &ldquo;What Would Flip the Verdict?&rdquo; Outcome Simulator</div>' +
        '<button type="button" id="crp-sim-reset" class="crp-pillar-clear-btn" style="border-color:rgba(196,181,253,0.48);color:#DDD6FE;">&#8634; Reset to 2026 Baseline</button>' +
      '</div>';
      h += '<div class="crp-sim-box">';
      h += '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:6px;">' +
        '<span id="crp-sim-verdict-pill" class="crp-mom-pill" style="color:' + vm.color + ';background:' + vm.bg + ';border:1px solid ' + vm.border + ';">' +
          '<span style="width:6px;height:6px;border-radius:50%;background:' + vm.dot + ';display:inline-block;"></span>' +
          esc(vm.label) +
        '</span>' +
        '<span id="crp-sim-score-txt" style="font-size:11.2px;font-weight:800;color:#CBD5E1;font-variant-numeric:tabular-nums;">Epistemic Compass: ' + baseScore + '% Theory A &middot; ' + (100 - baseScore) + '% Rival B (2026 Baseline)</span>' +
      '</div>';
      h += '<div class="crp-compass-labels">' +
        '<span style="color:#6EE7B7;">&#8592; Theory A (' + esc(taShort) + ')</span>' +
        '<span style="color:#FDE68A;">Hybrid / Contested</span>' +
        '<span style="color:#FDA4AF;">(' + esc(rbShort) + ') Rival B &#8594;</span>' +
      '</div>';
      h += '<div id="crp-compass-track" class="crp-compass-track" data-base-score="' + baseScore + '" data-compass-score="' + baseScore + '" data-compass-left="' + baseLeft + '" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + baseScore + '" aria-label="Epistemic Compass Meter">' +
        '<div class="crp-compass-mid" title="50% Hybrid / Contested Midpoint"></div>' +
        '<div class="crp-compass-base" style="left:' + baseLeft + '%;" title="2026 Baseline (' + baseScore + '% Theory A)"></div>' +
        '<div id="crp-compass-needle" class="crp-compass-needle" style="left:' + baseLeft + '%;border-color:' + vm.dot + ';"></div>' +
      '</div>';
      h += '<div id="crp-sim-readout" class="crp-sim-readout">' +
        '<span style="color:#94A3B8;">Toggle one or more hypothetical study outcomes below to simulate how the epistemic verdict shifts, which Foundational Pillar breaks, and what decisive experiment becomes next.</span>' +
      '</div>';
      h += '<div class="crp-flip-grid">';
      flips.forEach(function (sc, idx) {
        if (!sc) return;
        var sh = typeof sc.shift === 'number' ? sc.shift : parseInt(String(sc.shift || 0), 10) || 0;
        var shCls = sh > 0 ? 'to-a' : (sh < 0 ? 'to-b' : 'to-mid');
        var shTxt = sh > 0 ? ('+' + sh + '% \u2190 Theory A') : (sh < 0 ? (sh + '% \u2192 Rival B') : 'Hybrid Shift');
        h += '<button type="button" class="crp-flip-card" data-flip-idx="' + idx + '" aria-pressed="false">' +
          '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
            '<span style="font-size:12px;font-weight:800;color:#FFFFFF;line-height:1.32;"><span class="crp-flip-chk" style="color:#C4B5FD;margin-right:5px;">&#9744;</span>' + esc(sc.label || ('Outcome ' + (idx + 1))) + '</span>' +
            '<span class="crp-flip-shift ' + shCls + '">' + esc(shTxt) + '</span>' +
          '</div>' +
          (sc.detail ? '<div style="font-size:11.3px;color:#CBD5E1;line-height:1.42;">' + esc(sc.detail) + '</div>' : '') +
          (sc.breaks_pillar ? '<div style="font-size:10.3px;font-weight:700;color:#FDA4AF;margin-top:5px;">&#127963;&#65039; Breaks: ' + esc(sc.breaks_pillar) + '</div>' : '') +
        '</button>';
      });
      h += '</div></div></div>';
      return h;
    }
    function renderLineageHTML(th) {
      var lin = th.lineage && typeof th.lineage === 'object' ? th.lineage : null;
      if (!lin) return '';
      var builtOn = Array.isArray(lin.built_on) ? lin.built_on : [];
      var stakes = Array.isArray(lin.downstream_stakes) ? lin.downstream_stakes : [];
      if (!builtOn.length && !stakes.length) return '';

      var h = '<div id="crp-tm-lineage-wrap" style="margin-top:14px;">';
      h += '<div class="crp-tm-sec-title" style="color:#7DD3FC;margin:0 0 7px 0;">&#127795; Upstream Foundations &amp; Downstream Stakes</div>';
      h += '<div class="crp-tm-box" style="border-left:3px solid #38BDF8;">';
      if (builtOn.length) {
        h += '<div style="font-size:10.3px;font-weight:800;color:#7DD3FC;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">&#129521; Built On (Prerequisite Foundations &mdash; Click Any Pill to Open Its Dossier)</div>';
        h += '<div class="crp-lineage-pills">';
        builtOn.forEach(function (up) {
          if (!up) return;
          var target = up.slug || up.code || up.title || '';
          var title = up.title || up.code || up.slug || 'Prerequisite Theory';
          var why = up.why || '';
          h += '<button type="button" class="crp-lineage-pill" data-lineage-target="' + esc(target) + '" data-lineage-title="' + esc(title) + '" title="' + esc(why ? (title + ' — ' + why) : ('Open ' + title)) + '">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:' + (why ? '3px' : '0') + ';">' +
              '<span style="font-size:11.6px;font-weight:800;color:#FFFFFF;">' + esc(title) + '</span>' +
              '<span style="font-size:10px;font-weight:800;color:#7DD3FC;white-space:nowrap;">' + (up.code ? (esc(up.code) + ' ') : '') + '&#8599;</span>' +
            '</div>' +
            (why ? '<div style="font-size:10.9px;color:#CBD5E1;line-height:1.38;">' + esc(why) + '</div>' : '') +
          '</button>';
        });
        h += '</div>';
      }
      if (stakes.length) {
        h += '<div style="font-size:10.3px;font-weight:800;color:#FDE68A;text-transform:uppercase;letter-spacing:0.06em;' + (builtOn.length ? 'margin-top:6px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.09);' : '') + '">&#127754; Downstream Stakes (What Changes If This Flips)</div>';
        h += '<ul class="crp-stakes-list">' +
          stakes.map(function (stTxt) { return '<li>' + esc(stTxt) + '</li>'; }).join('') +
        '</ul>';
      }
      h += '</div></div>';
      return h;
    }
    function renderPaperCardHTML(item) {
      var role = normalizeRoleKey(item.role || 'foundational');
      var roleLbl = role === 'supporting' ? '\u2713 Supporting' : (role === 'refuting' ? '\u2717 Challenging / Refuting' : (role === 'null_mixed' ? '\u2248 Null / Mixed' : '\ud83c\udfdb\ufe0f Foundational'));
      var prox = normalizeTestProximity(item);
      var pm = testProximityMeta(prox);
      var linkType = prox === 'direct-test' ? 'direct' : 'indirect';
      var tier = String(item.study_tier || '').trim();
      var tierLow = tier.toLowerCase();
      var isHighTier = tierLow.indexOf('phase 3') !== -1 || tierLow.indexOf('multi-lab') !== -1 || tierLow.indexOf('replication') !== -1 || tierLow.indexOf('meta-analysis') !== -1 || tierLow.indexOf('registered') !== -1;
      var isLiving = item.origin === 'living-harvest';
      var srcApi = String(item.source_api || '').trim();
      var pillarId = String(item.pillar_id || '').trim().toUpperCase();
      var pillarName = String(item.pillar_name || '').trim();
      var pillarIds = Array.isArray(item.pillar_ids) && item.pillar_ids.length
        ? item.pillar_ids.map(function (x) { return String(x || '').trim().toUpperCase(); }).filter(Boolean)
        : (pillarId ? [pillarId] : []);
      var pillarChipsHTML = pillarIds.map(function (pid, idx) {
        var tip = (idx === 0 && pillarName) ? ('Filter by ' + pid + ': ' + pillarName) : ('Filter by Pillar ' + pid);
        return '<button type="button" class="crp-pillar-chip" data-pillar-jump="' + esc(pid) + '" title="' + esc(tip) + '">&#127963;&#65039; ' + esc(pid) + '</button>';
      }).join('');
      var url = item.url || item.doiUrl || '';
      var pmcUrl = item.pmcUrl || '';
      var doiUrl = item.doiUrl || '';
      var oaUrl = item.oaUrl || '';
      var pmidUrl = item.pmid ? ('https://pubmed.ncbi.nlm.nih.gov/' + encodeURIComponent(String(item.pmid)) + '/') : '';
      var badgeTxt = sourceBadgeLabel(url, item.kind);
      return '<div class="crp-paper-card role-' + esc(role) + '" data-role="' + esc(role) + '" data-link-type="' + esc(linkType) + '" data-test-proximity="' + esc(prox) + '"' + (pillarId ? (' data-pillar-id="' + esc(pillarId) + '"') : '') + (pillarIds.length ? (' data-pillar-ids="' + esc(pillarIds.join(',')) + '"') : '') + '>' +
        '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:5px;flex-wrap:wrap;">' +
          '<div style="font-size:12.4px;font-weight:700;line-height:1.38;flex:1;min-width:220px;">' +
            (url
              ? '<a href="' + esc(url) + '" target="_blank" rel="noopener" data-no-player="true" style="color:#FFFFFF;text-decoration:none;">' + esc(item.title) + ' <span style="color:' + A + ';">&#8599;</span></a>'
              : '<span style="color:#FFFFFF;">' + esc(item.title) + '</span>') +
          '</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;justify-content:flex-end;">' +
            '<span class="crp-prox-chip ' + esc(pm.cls) + '" title="' + esc(pm.tip) + '">' + esc(pm.label) + '</span>' +
            pillarChipsHTML +
            (tier ? '<span class="crp-tier-chip' + (isHighTier ? ' tier-high' : '') + '">' + esc(tier) + '</span>' : '') +
            (isLiving ? '<span class="crp-living-chip" title="Newly ingested by Living Epistemic Harvester">&#9889; Living Harvest' + (srcApi ? (' \u00b7 ' + esc(srcApi)) : '') + '</span>' : '') +
            '<span class="crp-role-chip ' + esc(role) + '">' + esc(roleLbl) + '</span>' +
          '</div>' +
        '</div>' +
        (item.detail ? '<div style="font-size:11px;color:#94A3B8;margin-bottom:5px;">' + esc(item.detail) + '</div>' : '') +
        (item.takeaway ? '<div style="font-size:11.8px;color:#E2E8F0;line-height:1.45;margin-bottom:6px;padding:5px 8px;border-radius:7px;background:rgba(2,6,23,0.52);">' + esc(item.takeaway) + '</div>' : '') +
        (item.debate_bridge ? '<div class="crp-bridge-note"><strong style="color:#C7D2FE;">&#128172; Debate Bridge:</strong> ' + esc(item.debate_bridge) + '</div>' : '') +
        (item.escape_hatch_note ? '<div class="crp-escape-note"><strong>&#128275; Escape Hatch Note:</strong> ' + esc(item.escape_hatch_note) + '</div>' : '') +
        '<div style="display:flex;flex-wrap:wrap;gap:5px;">' +
          (url ? '<a href="' + esc(url) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-ext-pill crp-cite-pill">' + esc(badgeTxt) + ' &#8599;</a>' : '') +
          (doiUrl && doiUrl !== url ? '<a href="' + esc(doiUrl) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-ext-pill crp-cite-pill">DOI &#8599;</a>' : '') +
          (pmidUrl && pmidUrl !== url ? '<a href="' + esc(pmidUrl) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-ext-pill crp-cite-pill">PubMed &#8599;</a>' : '') +
          (pmcUrl ? '<a href="' + esc(pmcUrl) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-ext-pill crp-pmc-pill">Free Full Text (PMC) &#8599;</a>' : '') +
          (oaUrl && !pmcUrl && oaUrl !== url && oaUrl !== doiUrl ? '<a href="' + esc(oaUrl) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-ext-pill crp-pmc-pill">Open Access &#8599;</a>' : '') +
        '</div>' +
      '</div>';
    }
    function renderLitLedgerListHTML(srcs, filterKey, pillarId) {
      var list = srcs.filter(function (s) {
        if (!s || !s.title) return false;
        if (pillarId && !paperMatchesPillar(s, pillarId)) return false;
        var rk = normalizeRoleKey(s.role);
        var prox = normalizeTestProximity(s);
        if (filterKey === 'direct') return prox === 'direct-test';
        if (filterKey === 'indirect_adjacent' || filterKey === 'indirect') return prox !== 'direct-test';
        if (filterKey === 'supporting') return rk === 'supporting';
        if (filterKey === 'refuting') return rk === 'refuting';
        if (filterKey === 'null_mixed') return rk === 'null_mixed';
        return true;
      });
      if (!list.length) {
        return '<div class="crp-tm-box" style="color:#94A3B8;font-size:12px;">No verified papers match this filter combination yet for this theory. ' +
          (pillarId ? 'Clear the active <strong>Pillar ' + esc(pillarId) + '</strong> filter or switch back to <strong>All Papers</strong>.' : 'Switch back to <strong>All Papers</strong> or check after the next Living Evidence harvest cycle.') +
        '</div>';
      }
      if (filterKey === 'supporting' || filterKey === 'refuting' || filterKey === 'null_mixed') {
        return list.map(renderPaperCardHTML).join('');
      }
      var fP = list.filter(function (s) { return normalizeRoleKey(s.role) === 'foundational'; });
      var sP = list.filter(function (s) { return normalizeRoleKey(s.role) === 'supporting'; });
      var rP = list.filter(function (s) { return normalizeRoleKey(s.role) === 'refuting'; });
      var nP = list.filter(function (s) { return normalizeRoleKey(s.role) === 'null_mixed'; });
      var out = '';
      if (fP.length) {
        out += '<div style="font-size:10.5px;font-weight:800;color:#7DD3FC;margin:8px 0 5px 0;">&#127963;&#65039; Foundational &amp; Landmark Formulations (' + fP.length + ')</div>';
        fP.forEach(function (p) { out += renderPaperCardHTML(p); });
      }
      if (sP.length) {
        out += '<div style="font-size:10.5px;font-weight:800;color:#6EE7B7;margin:10px 0 5px 0;">&#10003; Supporting Empirical Papers (' + sP.length + ')</div>';
        sP.forEach(function (p) { out += renderPaperCardHTML(p); });
      }
      if (rP.length) {
        out += '<div style="font-size:10.5px;font-weight:800;color:#FDA4AF;margin:10px 0 5px 0;">&#10007; Challenging, Refuting &amp; Rival-Paradigm Papers (' + rP.length + ')</div>';
        rP.forEach(function (p) { out += renderPaperCardHTML(p); });
      }
      if (nP.length) {
        out += '<div style="font-size:10.5px;font-weight:800;color:#FDE68A;margin:10px 0 5px 0;">&asymp; Null, Mixed &amp; Boundary-Condition Papers (' + nP.length + ')</div>';
        nP.forEach(function (p) { out += renderPaperCardHTML(p); });
      }
      return out;
    }
    function formatProtoValHTML(v) {
      if (v === null || v === undefined) return '';
      if (Array.isArray(v)) {
        return '<ul style="margin:2px 0 0 0;padding-left:15px;">' + v.map(function (it) {
          return '<li style="margin-bottom:3px;">' + esc(typeof it === 'object' ? JSON.stringify(it) : String(it)) + '</li>';
        }).join('') + '</ul>';
      }
      if (typeof v === 'object') {
        var bits = [];
        Object.keys(v).slice(0, 6).forEach(function (k) {
          var sub = v[k];
          var txt = typeof sub === 'object' ? JSON.stringify(sub) : String(sub);
          bits.push('<div><strong style="color:#CBD5E1;">' + esc(k.replace(/_/g, ' ')) + ':</strong> ' + esc(txt) + '</div>');
        });
        return bits.join('');
      }
      return esc(String(v));
    }
    function renderH2HWorkbenchHTML(th) {
      var h2 = th.head_to_head && typeof th.head_to_head === 'object' ? th.head_to_head : {};
      var divRows = Array.isArray(h2.diverging_predictions) ? h2.diverging_predictions : [];
      var hatches = Array.isArray(th.open_escape_hatches) ? th.open_escape_hatches : [];
      var psum = h2.protocol_summary && typeof h2.protocol_summary === 'object' ? h2.protocol_summary : null;
      var hasYaml = !!(h2.yaml_protocol && (typeof h2.yaml_protocol === 'string' ? h2.yaml_protocol.trim() : Object.keys(h2.yaml_protocol).length));
      if (!h2.minimum_decisive_protocol && !divRows.length && !hatches.length && !psum && !hasYaml) return '';

      var h = '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:14px 0 7px 0;">' +
        '<div class="crp-tm-sec-title" style="color:#FDE68A;margin:0;">&#9876;&#65039; Head-to-Head Crucial Experiment Workbench (Adversarial Adjudication)</div>' +
        '<button type="button" id="crp-tm-copy-h2h" class="crp-theory-open-btn" style="border-color:rgba(251,191,36,0.55);color:#FDE68A;background:rgba(120,53,15,0.40);">&#128203; Copy Stage-1 Registered Report Prompt (JSON + Markdown)</button>' +
      '</div>';
      h += '<div class="crp-tm-box" style="border-left:3px solid #F59E0B;">';
      if (h2.theory_a_prediction || h2.rival_b_prediction) {
        h += '<div class="crp-tm-grid2" style="margin-top:0;margin-bottom:8px;">' +
          '<div style="padding:8px 10px;border-radius:9px;background:rgba(16,185,129,0.10);border:1px solid rgba(52,211,153,0.35);font-size:11.8px;">' +
            '<div style="font-size:10px;font-weight:800;color:#6EE7B7;text-transform:uppercase;margin-bottom:3px;">Theory A Predicts (' + esc(h2.theory_a || 'Primary') + ')</div>' +
            esc(h2.theory_a_prediction || '') +
          '</div>' +
          '<div style="padding:8px 10px;border-radius:9px;background:rgba(244,63,94,0.10);border:1px solid rgba(251,113,133,0.35);font-size:11.8px;">' +
            '<div style="font-size:10px;font-weight:800;color:#FDA4AF;text-transform:uppercase;margin-bottom:3px;">Rival B Predicts (' + esc(h2.rival_b || 'Rival') + ')</div>' +
            esc(h2.rival_b_prediction || '') +
          '</div>' +
        '</div>';
      }
      if (divRows.length) {
        h += '<div style="font-size:10.3px;font-weight:800;color:#7DD3FC;text-transform:uppercase;letter-spacing:0.06em;margin:6px 0 4px 0;">Diverging Prediction Matrix (' + divRows.length + ' Discriminating Observables)</div>';
        h += '<div class="crp-h2h-table-wrap"><table class="crp-h2h-table"><thead><tr>' +
          '<th style="color:#7DD3FC;width:24%;">Observable</th>' +
          '<th style="color:#6EE7B7;width:38%;">Theory A Predicts</th>' +
          '<th style="color:#FDA4AF;width:38%;">Rival B Predicts</th>' +
        '</tr></thead><tbody>';
        divRows.forEach(function (row) {
          h += '<tr>' +
            '<td style="font-weight:700;color:#FFFFFF;">' + esc(row.observable || '') + '</td>' +
            '<td>' + esc(row.theory_a || '') + '</td>' +
            '<td>' + esc(row.rival_b || '') + '</td>' +
          '</tr>';
        });
        h += '</tbody></table></div>';
      }
      if (h2.confounder_trap) {
        h += '<div style="font-size:11.8px;color:#FDE68A;margin:6px 0 5px 0;"><strong>&#9888;&#65039; #1 Confounder Trap to Eliminate:</strong> ' + esc(h2.confounder_trap) + '</div>';
      }
      if (h2.minimum_decisive_protocol) {
        h += '<div style="font-size:11.8px;color:#E2E8F0;"><strong>&#129514; Minimum Decisive Protocol:</strong> ' + esc(h2.minimum_decisive_protocol) + '</div>';
      }
      if (hatches.length) {
        h += '<div class="crp-hatch-box">' +
          '<div style="font-size:10.2px;font-weight:800;color:#FDE68A;text-transform:uppercase;letter-spacing:0.06em;">&#128275; Unclosed Escape Hatches &amp; Confounder Traps (' + hatches.length + ')</div>' +
          '<ul class="crp-hatch-list">' +
            hatches.map(function (eh) { return '<li>' + esc(eh) + '</li>'; }).join('') +
          '</ul>' +
        '</div>';
      }
      if (psum || hasYaml) {
        var pidTag = (psum && psum.protocol_id) ? (' \u00b7 ' + esc(psum.protocol_id)) : '';
        h += '<details class="crp-h2h-details">' +
          '<summary><span>&#128203; Pre-Registered Protocol Parameters (Arms, Primary Endpoint, Sample Size / Power &amp; Falsification Criteria)' + pidTag + '</span><span style="font-size:10px;color:#94A3B8;">Click to expand &#9662;</span></summary>';
        if (psum) {
          h += '<div class="crp-proto-grid">';
          if (psum.design || psum.title) {
            h += '<div class="crp-proto-cell"><div class="crp-proto-k">Design &amp; Registration</div>' + formatProtoValHTML(psum.design || psum.title) + '</div>';
          }
          if (psum.arms) {
            h += '<div class="crp-proto-cell"><div class="crp-proto-k">Experimental Arms</div>' + formatProtoValHTML(psum.arms) + '</div>';
          }
          if (psum.primary_endpoint) {
            h += '<div class="crp-proto-cell"><div class="crp-proto-k">Primary Endpoint</div>' + formatProtoValHTML(psum.primary_endpoint) + '</div>';
          }
          if (psum.sample_size_power || psum.sample_size || psum.power) {
            h += '<div class="crp-proto-cell"><div class="crp-proto-k">Sample Size &amp; Power</div>' + formatProtoValHTML(psum.sample_size_power || psum.sample_size || psum.power) + '</div>';
          }
          if (psum.controls) {
            h += '<div class="crp-proto-cell"><div class="crp-proto-k">Confounder &amp; Bias Controls</div>' + formatProtoValHTML(psum.controls) + '</div>';
          }
          if (psum.falsification_criteria || psum.decision_rules) {
            h += '<div class="crp-proto-cell"><div class="crp-proto-k">Pre-Registered Falsification Criteria</div>' + formatProtoValHTML(psum.falsification_criteria || psum.decision_rules) + '</div>';
          }
          h += '</div>';
        }
        if (hasYaml) {
          var yamlText = typeof h2.yaml_protocol === 'string' ? h2.yaml_protocol : JSON.stringify(h2.yaml_protocol, null, 2);
          h += '<pre class="crp-proto-yaml">' + esc(yamlText) + '</pre>';
        }
        h += '</details>';
      }
      h += '</div>';
      return h;
    }
    function buildStage1RegisteredReportPrompt(ep, th, parts, srcs) {
      var h2 = th.head_to_head && typeof th.head_to_head === 'object' ? th.head_to_head : {};
      var eb = th.evidence_balance && typeof th.evidence_balance === 'object' ? th.evidence_balance : {};
      var divRows = Array.isArray(h2.diverging_predictions) ? h2.diverging_predictions : [];
      var hatches = Array.isArray(th.open_escape_hatches) ? th.open_escape_hatches : [];
      var pillars = Array.isArray(th.pillars) ? th.pillars : [];
      var title = th.canonical_title || parts.head || th.code || 'Scientific Theory';
      var md = [];
      md.push('# STAGE-1 REGISTERED REPORT PROMPT — ' + title + ' (' + (th.code || '') + ')');
      md.push('');
      md.push('Draft a publication-ready **Stage-1 Registered Report** (PCI Registered Reports / Nature Human Behaviour / eLife format) that decisively adjudicates between **Theory A** and **Rival B** while sealing every unclosed escape hatch listed below.');
      md.push('');
      md.push('## 1. Epistemic Context (2026 Living Verdict)');
      md.push('- **Domain:** ' + (th.domain_heading || th.domain_pill || ''));
      md.push('- **Current 2026 Stance:** ' + (th.stance_label || th.stance || ''));
      if (eb.momentum) md.push('- **Living Stance Momentum:** ' + eb.momentum + ' (Foundational: ' + (eb.foundational || 0) + ', Supporting: ' + (eb.supporting || 0) + ', Challenging/Refuting: ' + (eb.refuting || 0) + ', Null/Mixed: ' + (eb.null_mixed || 0) + ', Indirect/Adjacent: ' + (eb.indirect || 0) + ')');
      md.push('- **2026 Verdict:** ' + (th.verdict_2026 || ''));
      md.push('- **Theory A:** ' + (h2.theory_a || title));
      md.push('- **Rival B:** ' + (h2.rival_b || (th.rivals || []).join('; ')));
      md.push('');
      if (pillars.length) {
        md.push('## 1b. Foundational Pillars Under Test');
        pillars.forEach(function (p) {
          md.push('- **' + (p.id || '') + ' (' + (p.status || 'Unresolved') + ') — ' + (p.name || '') + ':** ' + (p.claim || ''));
        });
        md.push('');
      }
      if (divRows.length) {
        md.push('## 2. Diverging Prediction Matrix');
        md.push('| Observable | Theory A Predicts | Rival B Predicts |');
        md.push('| --- | --- | --- |');
        divRows.forEach(function (r) {
          var cleanCell = function (x) { return String(x || '').replace(/\|/g, '/').replace(/\r?\n/g, ' '); };
          md.push('| ' + cleanCell(r.observable) + ' | ' + cleanCell(r.theory_a) + ' | ' + cleanCell(r.rival_b) + ' |');
        });
        md.push('');
      }
      if (hatches.length) {
        md.push('## 3. Unclosed Escape Hatches & Confounder Traps to Seal');
        hatches.forEach(function (eh, i) { md.push((i + 1) + '. ' + eh); });
        md.push('');
      }
      md.push('## 4. Minimum Decisive & Pre-Registered Protocol');
      if (h2.minimum_decisive_protocol) md.push('- **Minimum Decisive Protocol:** ' + h2.minimum_decisive_protocol);
      if (h2.protocol_summary) {
        Object.keys(h2.protocol_summary).forEach(function (pk) {
          var pv = h2.protocol_summary[pk];
          md.push('- **' + pk + ':** ' + (typeof pv === 'object' ? JSON.stringify(pv) : String(pv)));
        });
      }
      md.push('');
      md.push('## 5. Verified Primary Literature (Direct, Indirect & Adjacent DOIs)');
      srcs.forEach(function (s) {
        var rTag = normalizeRoleKey(s.role).toUpperCase();
        var pTag = normalizeTestProximity(s).toUpperCase();
        var pilTag = s.pillar_id ? (' | ' + s.pillar_id) : '';
        var tierTag = s.study_tier ? (' | ' + s.study_tier) : '';
        var link = s.doiUrl || s.url || '';
        md.push('- [' + rTag + ' | ' + pTag + pilTag + tierTag + '] ' + (s.title || '') + (s.detail ? (' — ' + s.detail) : '') + (link ? (' (' + link + ')') : ''));
      });
      md.push('');
      var specPayload = {
        schema: 'scientific-theories-atlas-stage1-rr-v2.4',
        theory_code: th.code,
        theory_title: title,
        domain: th.domain_heading || th.domain_pill,
        current_stance_2026: th.stance_label,
        verdict_2026: th.verdict_2026,
        evidence_balance: eb,
        pillars: pillars,
        steelman: th.steelman || {},
        lineage: th.lineage || {},
        rivals: th.rivals || [],
        head_to_head_design: {
          theory_a: h2.theory_a || '',
          rival_b: h2.rival_b || '',
          theory_a_prediction: h2.theory_a_prediction || '',
          rival_b_prediction: h2.rival_b_prediction || '',
          confounder_trap: h2.confounder_trap || '',
          minimum_decisive_protocol: h2.minimum_decisive_protocol || ''
        },
        diverging_predictions: divRows,
        open_escape_hatches: hatches,
        pre_registered_protocol: h2.protocol_summary || h2.yaml_protocol || {},
        yaml_protocol: h2.yaml_protocol || null,
        falsification_criteria: th.falsification_criteria || '',
        common_paper_blindspot: th.common_paper_blindspot || '',
        stealth_assay_fingerprints: th.stealth_terms || [],
        verified_literature: srcs.map(function (s) {
          return {
            role: normalizeRoleKey(s.role),
            link_type: normalizeLinkType(s.link_type),
            test_proximity: normalizeTestProximity(s),
            pillar_id: s.pillar_id || '',
            study_tier: s.study_tier || '',
            origin: s.origin || 'seed',
            title: s.title,
            detail: s.detail,
            url: s.url || s.doiUrl || '',
            doiUrl: s.doiUrl || '',
            pmid: s.pmid || '',
            debate_bridge: s.debate_bridge || '',
            escape_hatch_note: s.escape_hatch_note || ''
          };
        })
      };
      md.push('## 6. Machine-Readable Specification (JSON)');
      md.push('```json');
      md.push(JSON.stringify(specPayload, null, 2));
      md.push('```');
      return md.join('\n');
    }
    var theorySearchJumpRef = null;
    function openTheoryModal(driveId) {
      if (!IS_THEORY_ATLAS) return;
      var modal = document.getElementById('crp-theory-modal');
      var box = document.getElementById('crp-theory-modal-box');
      var wrap = theoryByIdOrSlug(driveId);
      if (!modal || !box || !wrap || !wrap.ep || !wrap.ep.theory) return;
      var ep = wrap.ep;
      var th = ep.theory;
      var st = getStanceInfo(th.stance);
      var parts = splitEpLabel(ep.label || th.slug);
      var srcs = Array.isArray(ep.sources) ? ep.sources : [];
      var pillars = Array.isArray(th.pillars) ? th.pillars : [];
      var flips = Array.isArray(th.flip_scenarios) ? th.flip_scenarios : [];
      var directN = srcs.filter(function (s) { return normalizeTestProximity(s) === 'direct-test'; }).length;
      var indirectAdjN = srcs.filter(function (s) { return normalizeTestProximity(s) !== 'direct-test'; }).length;
      var suppN = srcs.filter(function (s) { return normalizeRoleKey(s.role) === 'supporting'; }).length;
      var refN = srcs.filter(function (s) { return normalizeRoleKey(s.role) === 'refuting'; }).length;
      var nullN = srcs.filter(function (s) { return normalizeRoleKey(s.role) === 'null_mixed'; }).length;
      var hasAudio = !!(th.has_audio || (ep.gh && ep.gh.length > 5) || (ep.id && ep.id.indexOf('atlas-') !== 0));

      var h = '';
      h += '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.10);">';
      h += '<div style="flex:1;min-width:0;">';
      h += '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:6px;">' +
        stanceBadgeHTML(th.stance, true) +
        '<span style="font-size:10.5px;font-weight:700;color:#94A3B8;background:rgba(30,41,59,0.85);border:1px solid rgba(255,255,255,0.12);padding:2px 8px;border-radius:999px;">' + esc(th.domain_pill || wrap.sec) + '</span>' +
        (th.subdiscipline ? '<span style="font-size:10.5px;color:#94A3B8;">' + esc(th.subdiscipline) + '</span>' : '') +
        (th.year_span ? '<span style="font-size:10.5px;font-weight:700;color:#7DD3FC;">\u00b7 ' + esc(th.year_span) + '</span>' : '') +
      '</div>';
      h += '<h2 style="margin:0 0 4px 0;font-size:20px;font-weight:900;color:#FFFFFF;line-height:1.25;letter-spacing:-0.01em;">' + esc(th.canonical_title || parts.head) + '</h2>';
      if (th.canonical_title && parts.head && parts.head.toLowerCase() !== th.canonical_title.toLowerCase()) {
        h += '<div style="font-size:12.2px;font-weight:700;color:#7DD3FC;margin-bottom:8px;">&#127897;&#65039; Deep Dive Episode: ' + esc(parts.head) + '</div>';
      } else {
        h += '<div style="height:4px;"></div>';
      }
      h += '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:7px;">';
      if (hasAudio) {
        h += '<button type="button" id="crp-tm-play-btn" style="appearance:none;border:none;background:' + A + ';color:#090E1A;font-size:12px;font-weight:900;padding:7px 14px;border-radius:999px;cursor:pointer;font-family:inherit;box-shadow:0 0 16px ' + A + '66;">&#9654; Play Deep Dive Podcast</button>';
      } else if (th.podcast_status === 'blueprint-ready' || th.wave === 1) {
        h += '<span style="font-size:11px;font-weight:800;color:#FDE68A;background:rgba(120,53,15,0.42);border:1px solid rgba(251,191,36,0.52);padding:5px 11px;border-radius:999px;">&#127897;&#65039; Wave ' + esc(th.wave || 1) + ' Flagship Deep Dive &middot; Blueprint Ready &middot; Podcast Queued</span>';
      } else {
        h += '<span style="font-size:11px;font-weight:700;color:#CBD5E1;background:rgba(30,41,59,0.75);border:1px solid rgba(255,255,255,0.14);padding:5px 11px;border-radius:999px;">&#128214; Atlas Reference Dossier &middot; Planned Podcast Wave ' + esc(th.wave || 2) + '</span>';
      }
      h += '<button type="button" id="crp-tm-copy-link" style="appearance:none;border:1px solid #334155;background:#131C31;color:#E2E8F0;font-size:11px;font-weight:700;padding:6px 11px;border-radius:999px;cursor:pointer;font-family:inherit;">&#128279; Copy Theory Link</button>';
      h += '</div></div>';
      h += '<button type="button" id="crp-tm-close" aria-label="Close Theory Dossier" style="background:#1E293B;border:1px solid #334155;color:#CBD5E1;border-radius:10px;padding:4px 11px;font-size:18px;cursor:pointer;flex-shrink:0;">&times;</button>';
      h += '</div>';

      // 2026 Current Stance & Verdict
      h += '<div class="crp-tm-sec-title" style="color:' + st.color + ';">&#9878;&#65039; Current Scientific Stance (2026 Verdict)</div>';
      h += '<div class="crp-tm-box" style="border-left:4px solid ' + st.color + ';background:linear-gradient(135deg,' + st.bg + ',rgba(15,23,42,0.92));">' +
        '<div style="font-size:11.2px;font-weight:800;color:' + st.color + ';margin-bottom:4px;">' + esc(st.label) + ' \u2014 ' + esc(st.def) + '</div>' +
        '<div>' + esc(th.verdict_2026 || ep.notes || '') + '</div></div>';

      // Visual Evidence Balance & Living Momentum Bar
      if (th.evidence_balance || srcs.length) {
        h += renderEvidenceBalanceHTML(th.evidence_balance, srcs);
      }

      // v2.4.0 Module 1: Foundational Pillars Under Test (interactive paper-ledger filter)
      h += renderPillarsHTML(pillars, srcs);

      // v2.4.0 Module 2: Steelman Both Sides & Settled Ground
      h += renderSteelmanHTML(th);

      // v2.4.0 Module 3: Interactive "What Would Flip the Verdict?" Outcome Simulator
      h += renderFlipSimulatorHTML(th);

      // Core Claim + Common Paper Blindspot + Falsification
      h += '<div class="crp-tm-grid2">';
      h += '<div><div class="crp-tm-sec-title" style="color:#7DD3FC;margin-top:4px;">&#127919; Core Testable Proposition</div>' +
        '<div class="crp-tm-box">' + esc(th.core_claim || '') + '</div></div>';
      h += '<div><div class="crp-tm-sec-title" style="color:#FDA4AF;margin-top:4px;">&#9888;&#65039; Common Paper Blindspot (What Researchers Miss)</div>' +
        '<div class="crp-tm-box" style="border-left:3px solid #FB7185;">' + esc(th.common_paper_blindspot || '') + '</div></div>';
      h += '</div>';

      if (th.falsification_criteria) {
        h += '<div class="crp-tm-sec-title" style="color:#5EEAD4;">&#128300; Crucial Falsification Test &amp; Discriminating Experiment</div>';
        h += '<div class="crp-tm-box" style="border-left:3px solid #2DD4BF;">' + esc(th.falsification_criteria) + '</div>';
      }

      // Upgraded Head-to-Head Crucial Experiment Workbench Box
      h += renderH2HWorkbenchHTML(th);

      // Recognizing This Theory in Disguise (When Papers Don't Name It)
      if ((Array.isArray(th.stealth_terms) && th.stealth_terms.length) || th.stealth_support || th.stealth_refute) {
        h += '<div class="crp-tm-sec-title" style="color:#C4B5FD;">&#128269; Recognizing This Theory in Disguise (When Papers Never Name It)</div>';
        h += '<div class="crp-tm-box" style="border-left:3px solid #A78BFA;">';
        if (Array.isArray(th.stealth_terms) && th.stealth_terms.length) {
          h += '<div style="font-size:10.5px;font-weight:800;color:#C4B5FD;margin-bottom:5px;">Stealth Assay, Metric &amp; Jargon Fingerprints in Empirical Papers:</div>' +
            '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;">' +
            th.stealth_terms.map(function (stTerm) { return '<span class="crp-stealth-pill">' + esc(stTerm) + '</span>'; }).join('') +
            '</div>';
        }
        if (th.stealth_support) {
          h += '<div style="font-size:11.8px;color:#A7F3D0;margin-bottom:5px;"><strong>&#10003; If a paper observes this &rarr; implicitly SUPPORTS:</strong> ' + esc(th.stealth_support) + '</div>';
        }
        if (th.stealth_refute) {
          h += '<div style="font-size:11.8px;color:#FECDD3;"><strong>&#10007; If a paper observes this &rarr; implicitly CHALLENGES / REFUTES:</strong> ' + esc(th.stealth_refute) + '</div>';
        }
        h += '</div>';
      }

      // Historical Evolution Timeline
      if (Array.isArray(th.historical_evolution) && th.historical_evolution.length) {
        h += '<div class="crp-tm-sec-title" style="color:#38BDF8;">&#128220; Historical Evolution Lineage</div>';
        h += '<div class="crp-tm-box"><div class="crp-tm-timeline">';
        th.historical_evolution.forEach(function (ev) {
          h += '<div class="crp-tm-tl-item"><span class="crp-tm-tl-dot"></span><span class="crp-tm-tl-yr">' + esc(ev.year || '') + '</span>' + esc(ev.milestone || '') + '</div>';
        });
        h += '</div></div>';
      }

      // v2.4.0 Module 4: Upstream Foundations & Downstream Stakes
      h += renderLineageHTML(th);

      // Rival / Competing Theories
      if (Array.isArray(th.rivals) && th.rivals.length) {
        h += '<div class="crp-tm-sec-title" style="color:#FBBF24;">&#9876;&#65039; Competing &amp; Alternative Frameworks (Click to Search Atlas)</div>';
        h += '<div style="display:flex;flex-wrap:wrap;gap:6px;">';
        th.rivals.forEach(function (rv) {
          h += '<button type="button" class="crp-rival-pill" data-rival-q="' + esc(rv) + '">' + esc(rv) + ' &#8594;</button>';
        });
        h += '</div>';
      }

      // v2.4.0 Module 5: Upgraded Calibrated Primary Literature Ledger
      h += '<div id="crp-tm-lit-anchor" class="crp-tm-sec-title" style="color:#FFFFFF;margin-top:16px;">&#128218; Verified Peer-Reviewed Literature Ledger (' + srcs.length + ' Live-Verified Citations)</div>';
      if (srcs.length) {
        h += '<div id="crp-tm-pillar-chip" class="crp-pillar-filter-bar">' +
          '<span id="crp-tm-pillar-chip-txt"></span>' +
          '<button type="button" id="crp-tm-pillar-clear" class="crp-pillar-clear-btn">Clear &#10005;</button>' +
        '</div>';
        h += '<div class="crp-lit-tabs" role="tablist" aria-label="Filter primary literature">' +
          '<button type="button" class="crp-lit-tab active" data-lit-filter="all">All Papers (' + srcs.length + ')</button>' +
          '<button type="button" class="crp-lit-tab" data-lit-filter="direct">&#127919; Direct Tests (' + directN + ')</button>' +
          '<button type="button" class="crp-lit-tab" data-lit-filter="indirect_adjacent">&#129513; Indirect &amp; Adjacent (' + indirectAdjN + ')</button>' +
          '<button type="button" class="crp-lit-tab" data-lit-filter="supporting">&#10003; Supporting (' + suppN + ')</button>' +
          '<button type="button" class="crp-lit-tab" data-lit-filter="refuting">&#10007; Challenging / Refuting (' + refN + ')</button>' +
          (nullN > 0 ? '<button type="button" class="crp-lit-tab" data-lit-filter="null_mixed">&asymp; Null / Mixed (' + nullN + ')</button>' : '') +
        '</div>';
        h += '<div id="crp-tm-lit-list">' + renderLitLedgerListHTML(srcs, 'all', null) + '</div>';
      } else {
        h += '<div class="crp-tm-box" style="color:#94A3B8;">Primary API-verified supporting and refuting paper ledger is scheduled for Wave ' + esc(th.wave || 2) + ' harvesting (zero unverified DOIs are ever displayed in this Atlas).</div>';
      }

      box.innerHTML = h;
      box.scrollTop = 0;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      var closeModal = function () {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      };
      var cBtn = document.getElementById('crp-tm-close');
      if (cBtn) cBtn.addEventListener('click', closeModal);
      modal.onclick = function (ev) { if (ev.target === modal) closeModal(); };
      var playB = document.getElementById('crp-tm-play-btn');
      if (playB) {
        playB.addEventListener('click', function () {
          closeModal();
          playEpisode(ep.id, ep.label, ep.gh || '', wrap.sec || th.domain_pill || '', 0);
        });
      }
      var copyB = document.getElementById('crp-tm-copy-link');
      if (copyB) {
        copyB.addEventListener('click', function () {
          var base = (cfg.url || (location.origin + location.pathname)).replace(/\/+$/, '') + '/';
          var shareUrl = base + '?theory=' + encodeURIComponent(th.slug || ep.id);
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(shareUrl).catch(function () {});
          copyB.textContent = '\u2713 Link Copied';
          setTimeout(function () { copyB.innerHTML = '&#128279; Copy Theory Link'; }, 1800);
        });
      }
      var copyH2h = document.getElementById('crp-tm-copy-h2h');
      if (copyH2h) {
        copyH2h.addEventListener('click', function () {
          var txtOut = buildStage1RegisteredReportPrompt(ep, th, parts, srcs);
          window.__crpLastStage1Prompt = txtOut;
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txtOut).catch(function () {});
          var orig = copyH2h.innerHTML;
          copyH2h.textContent = '\u2713 Stage-1 Registered Report Copied!';
          setTimeout(function () { copyH2h.innerHTML = orig; }, 2200);
          track('theory_export_h2h', { theory_code: th.code || '' });
        });
      }

      // Live Literature Ledger + Foundational Pillar filter coordination
      var activeLitFilter = 'all';
      var activePillarId = null;
      var pillarNameById = {};
      pillars.forEach(function (p, i) {
        if (p) {
          var pid = String(p.id || ('P' + (i + 1))).toUpperCase();
          pillarNameById[pid] = p.name || p.title || pid;
        }
      });
      var litListEl = document.getElementById('crp-tm-lit-list');
      var pillarChipBar = document.getElementById('crp-tm-pillar-chip');
      var pillarChipTxt = document.getElementById('crp-tm-pillar-chip-txt');
      var pillarClearBtn = document.getElementById('crp-tm-pillar-clear');

      function applyLedgerFilter() {
        box.querySelectorAll('.crp-pillar-card[data-pillar-id]').forEach(function (pc) {
          var isAct = !!(activePillarId && pc.getAttribute('data-pillar-id') === activePillarId);
          pc.classList.toggle('active', isAct);
          pc.setAttribute('aria-pressed', isAct ? 'true' : 'false');
          var cue = pc.querySelector('.crp-pillar-cue');
          if (cue) cue.innerHTML = isAct ? '&#10003; Filtering' : 'Filter &#8595;';
        });
        if (pillarChipBar && pillarChipTxt) {
          if (activePillarId) {
            var pNm = pillarNameById[activePillarId] || '';
            pillarChipTxt.innerHTML = '&#127963;&#65039; Filtering papers by Pillar ' + esc(activePillarId) + (pNm ? (' &mdash; ' + esc(pNm)) : '');
            pillarChipBar.classList.add('active');
          } else {
            pillarChipBar.classList.remove('active');
          }
        }
        if (litListEl) {
          litListEl.innerHTML = renderLitLedgerListHTML(srcs, activeLitFilter, activePillarId);
          litListEl.querySelectorAll('.crp-pillar-chip[data-pillar-jump]').forEach(function (pb) {
            pb.addEventListener('click', function (ev) {
              ev.preventDefault();
              ev.stopPropagation();
              var pid = (pb.getAttribute('data-pillar-jump') || '').toUpperCase();
              activePillarId = (activePillarId === pid) ? null : pid;
              applyLedgerFilter();
            });
          });
        }
      }
      if (litListEl) {
        litListEl.querySelectorAll('.crp-pillar-chip[data-pillar-jump]').forEach(function (pb) {
          pb.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var pid = (pb.getAttribute('data-pillar-jump') || '').toUpperCase();
            activePillarId = (activePillarId === pid) ? null : pid;
            applyLedgerFilter();
          });
        });
      }
      box.querySelectorAll('.crp-pillar-card[data-pillar-id]').forEach(function (pc) {
        pc.addEventListener('click', function () {
          var pid = (pc.getAttribute('data-pillar-id') || '').toUpperCase();
          activePillarId = (activePillarId === pid) ? null : pid;
          applyLedgerFilter();
          track('theory_pillar_filter', { theory_code: th.code || '', pillar_id: activePillarId || 'clear' });
        });
      });
      if (pillarClearBtn) {
        pillarClearBtn.addEventListener('click', function () {
          activePillarId = null;
          applyLedgerFilter();
        });
      }
      box.querySelectorAll('.crp-lit-tab[data-lit-filter]').forEach(function (ltBtn) {
        ltBtn.addEventListener('click', function () {
          activeLitFilter = ltBtn.getAttribute('data-lit-filter') || 'all';
          box.querySelectorAll('.crp-lit-tab[data-lit-filter]').forEach(function (x) {
            x.classList.toggle('active', x === ltBtn);
          });
          applyLedgerFilter();
        });
      });

      // Interactive "What Would Flip the Verdict?" Outcome Simulator wiring
      if (flips.length) {
        var baseScoreSim = stanceBaseCompassScore(th.stance);
        var activeFlips = {};
        var simTrack = document.getElementById('crp-compass-track');
        var simNeedle = document.getElementById('crp-compass-needle');
        var simVerdictPill = document.getElementById('crp-sim-verdict-pill');
        var simScoreTxt = document.getElementById('crp-sim-score-txt');
        var simReadout = document.getElementById('crp-sim-readout');
        var simReset = document.getElementById('crp-sim-reset');

        function updateFlipSimulator() {
          var delta = 0;
          var chosen = [];
          flips.forEach(function (sc, idx) {
            if (activeFlips[idx]) {
              var sh = typeof sc.shift === 'number' ? sc.shift : (parseInt(String(sc.shift || 0), 10) || 0);
              delta += sh;
              chosen.push(sc);
            }
          });
          var curScore = Math.max(4, Math.min(96, baseScoreSim + delta));
          var curLeft = 100 - curScore;
          var vm = compassVerdictMeta(curScore);
          if (simTrack) {
            simTrack.setAttribute('data-compass-score', String(curScore));
            simTrack.setAttribute('data-compass-left', String(curLeft));
            simTrack.setAttribute('aria-valuenow', String(curScore));
          }
          if (simNeedle) {
            simNeedle.style.left = curLeft + '%';
            simNeedle.style.borderColor = vm.dot;
          }
          if (simVerdictPill) {
            simVerdictPill.style.color = vm.color;
            simVerdictPill.style.background = vm.bg;
            simVerdictPill.style.borderColor = vm.border;
            simVerdictPill.innerHTML = '<span style="width:6px;height:6px;border-radius:50%;background:' + vm.dot + ';display:inline-block;"></span>' + esc(vm.label);
          }
          if (simScoreTxt) {
            var deltaTag = chosen.length
              ? (' (' + (delta > 0 ? ('+' + delta) : String(delta)) + '% vs 2026)')
              : ' (2026 Baseline)';
            simScoreTxt.textContent = 'Epistemic Compass: ' + curScore + '% Theory A \u00b7 ' + (100 - curScore) + '% Rival B' + deltaTag;
          }
          if (simReadout) {
            if (!chosen.length) {
              simReadout.innerHTML = '<span style="color:#94A3B8;">Toggle one or more hypothetical study outcomes below to simulate how the epistemic verdict shifts, which Foundational Pillar breaks, and what decisive experiment becomes next.</span>';
            } else {
              var brokenList = [];
              var nextExpList = [];
              chosen.forEach(function (sc) {
                if (sc.breaks_pillar) {
                  var bpKey = String(sc.breaks_pillar).trim().toUpperCase();
                  var resolved = pillarNameById[bpKey] ? (bpKey + ' (' + pillarNameById[bpKey] + ')') : sc.breaks_pillar;
                  if (brokenList.indexOf(resolved) === -1) brokenList.push(resolved);
                }
                if (sc.next_experiment && nextExpList.indexOf(sc.next_experiment) === -1) {
                  nextExpList.push(sc.next_experiment);
                }
              });
              var rHtml = '<div style="font-size:11.3px;font-weight:800;color:' + vm.color + ';margin-bottom:4px;">' +
                'Simulated Verdict (' + chosen.length + ' ' + (chosen.length === 1 ? 'outcome' : 'outcomes') + ' active, net shift ' + (delta > 0 ? ('+' + delta) : String(delta)) + '%): ' + esc(vm.label) +
              '</div>';
              if (brokenList.length) {
                rHtml += '<div style="font-size:11.4px;color:#FDA4AF;margin-bottom:4px;"><strong>&#127963;&#65039; Foundational Pillar(s) Broken / Cracked:</strong> ' + esc(brokenList.join(' ; ')) + '</div>';
              }
              if (nextExpList.length) {
                rHtml += '<div style="font-size:11.4px;color:#5EEAD4;"><strong>&#128300; Next Decisive Experiment Unlocked:</strong> ' + esc(nextExpList.join(' | ')) + '</div>';
              }
              simReadout.innerHTML = rHtml;
            }
          }
          box.querySelectorAll('.crp-flip-card[data-flip-idx]').forEach(function (fc) {
            var i = parseInt(fc.getAttribute('data-flip-idx') || '-1', 10);
            var on = !!activeFlips[i];
            fc.classList.toggle('active', on);
            fc.setAttribute('aria-pressed', on ? 'true' : 'false');
            var chk = fc.querySelector('.crp-flip-chk');
            if (chk) chk.innerHTML = on ? '&#9745;' : '&#9744;';
          });
        }

        box.querySelectorAll('.crp-flip-card[data-flip-idx]').forEach(function (fc) {
          fc.addEventListener('click', function () {
            var idx = parseInt(fc.getAttribute('data-flip-idx') || '-1', 10);
            if (idx < 0) return;
            activeFlips[idx] = !activeFlips[idx];
            updateFlipSimulator();
            track('theory_flip_sim', { theory_code: th.code || '', flip_idx: idx });
          });
        });
        if (simReset) {
          simReset.addEventListener('click', function () {
            activeFlips = {};
            updateFlipSimulator();
          });
        }
      }

      // Upstream Prerequisite Foundation pills -> jump directly to that theory's modal
      box.querySelectorAll('.crp-lineage-pill[data-lineage-target]').forEach(function (lb) {
        lb.addEventListener('click', function () {
          var tgt = lb.getAttribute('data-lineage-target') || '';
          var ttl = lb.getAttribute('data-lineage-title') || '';
          if (theoryByIdOrSlug(tgt)) {
            openTheoryModal(tgt);
            return;
          }
          if (ttl && theoryByIdOrSlug(ttl)) {
            openTheoryModal(ttl);
            return;
          }
          closeModal();
          if (typeof theorySearchJumpRef === 'function') theorySearchJumpRef(ttl || tgt);
        });
      });

      box.querySelectorAll('.crp-rival-pill').forEach(function (rb) {
        rb.addEventListener('click', function () {
          var rq = rb.getAttribute('data-rival-q') || '';
          closeModal();
          if (typeof theorySearchJumpRef === 'function') theorySearchJumpRef(rq);
        });
      });
      track('theory_dossier_open', { theory_code: th.code || '', stance: th.stance || '' });
    }
    document.addEventListener('keydown', function (ev) {
      if (IS_THEORY_ATLAS && ev.key === 'Escape') {
        var modal = document.getElementById('crp-theory-modal');
        if (modal && modal.style.display === 'flex') {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }
      }
    });

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
          var dest = cfg.redirect_hashes[key];
          if (pendingSyncToken) {
            dest += (dest.indexOf('#') === -1 ? '#' : '&') + 'crp_s=' + encodeURIComponent(pendingSyncToken);
          }
          location.replace(dest);
          return;
        }
      }
    }

    // ---------- Cross-URL Listened Sync (per-browser localStorage + #crp_s bitset + sync-bridge) ----------
    var B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var epIds = Array.isArray(net.ep_ids) ? net.ep_ids : [];
    var epIdSet = {};
    epIds.forEach(function (id) { epIdSet[id] = true; });

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

    function applyIncomingSyncToken(tok) {
      if (!tok) return;
      try {
        var parts = String(tok).split('.');
        var doneBits = parts[0] || '';
        var undoneBits = parts[1] || '';
        var extraDone = parts[2] ? parts[2].split(',') : [];
        var extraUndone = parts[3] ? parts[3].split(',') : [];
        decodeBitset(doneBits, epIds, function (id) {
          localStorage.setItem('crp_done_' + id, '1');
          localStorage.removeItem('crp_undone_' + id);
        });
        extraDone.forEach(function (id) {
          if (/^[a-zA-Z0-9_-]{10,}$/.test(id)) {
            localStorage.setItem('crp_done_' + id, '1');
            localStorage.removeItem('crp_undone_' + id);
          }
        });
        decodeBitset(undoneBits, epIds, function (id) {
          localStorage.removeItem('crp_done_' + id);
          localStorage.setItem('crp_undone_' + id, '1');
        });
        extraUndone.forEach(function (id) {
          if (/^[a-zA-Z0-9_-]{10,}$/.test(id)) {
            localStorage.removeItem('crp_done_' + id);
            localStorage.setItem('crp_undone_' + id, '1');
          }
        });
      } catch (e) {}
    }

    function buildSyncToken() {
      try {
        var doneBits = encodeBitset(epIds, function (id) { return localStorage.getItem('crp_done_' + id) === '1'; });
        var undoneBits = encodeBitset(epIds, function (id) {
          return localStorage.getItem('crp_done_' + id) !== '1' && localStorage.getItem('crp_undone_' + id) === '1';
        });
        var extraDone = [];
        var extraUndone = [];
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i) || '';
          if (k.indexOf('crp_done_') === 0 && localStorage.getItem(k) === '1') {
            var id1 = k.slice(9);
            if (id1 && !epIdSet[id1]) extraDone.push(id1);
          } else if (k.indexOf('crp_undone_') === 0 && localStorage.getItem(k) === '1') {
            var id2 = k.slice(11);
            if (id2 && !epIdSet[id2] && localStorage.getItem('crp_done_' + id2) !== '1') extraUndone.push(id2);
          }
        }
        var tok = [doneBits, undoneBits, extraDone.join(','), extraUndone.join(',')].join('.').replace(/\.+$/, '');
        if (tok) localStorage.setItem('crp_sync_token', tok);
        else localStorage.removeItem('crp_sync_token');
        return tok;
      } catch (e) {
        return '';
      }
    }

    if (pendingSyncToken) {
      applyIncomingSyncToken(pendingSyncToken);
    }
    buildSyncToken();

    var bridgeFrame = null;
    try {
      bridgeFrame = document.createElement('iframe');
      bridgeFrame.src = BASE + 'sync-bridge.html';
      bridgeFrame.style.cssText = 'display:none;width:0;height:0;border:0;position:absolute;pointer-events:none;';
      bridgeFrame.setAttribute('aria-hidden', 'true');
      bridgeFrame.tabIndex = -1;
      bridgeFrame.addEventListener('load', function () {
        try {
          var initMap = {};
          for (var i = 0; i < localStorage.length; i++) {
            var k = localStorage.key(i) || '';
            if (k.indexOf('crp_count_') === 0) {
              var cid = k.slice(10);
              var cval = parseInt(localStorage.getItem(k) || '0', 10);
              if (cid && cval > 0) initMap[cid] = cval;
            } else if (k.indexOf('crp_done_') === 0 && localStorage.getItem(k) === '1') {
              var did = k.slice(9);
              if (did && initMap[did] === undefined) initMap[did] = 1;
            } else if (k.indexOf('crp_undone_') === 0 && localStorage.getItem(k) === '1') {
              var uid = k.slice(11);
              if (initMap[uid] === undefined) initMap[uid] = 0;
            }
          }
          if (bridgeFrame.contentWindow) {
            bridgeFrame.contentWindow.postMessage({ type: 'CRPSyncInit', map: initMap }, 'https://yorekms.github.io');
          }
        } catch (e) {}
      });
      (document.body || document.documentElement).appendChild(bridgeFrame);
    } catch (e) {}

    function stampCarrdLink(a) {
      if (!a) return;
      var rawHref = a.getAttribute('href') || '';
      if (rawHref.indexOf('.carrd.co') === -1) return;
      if (!a.dataset.crpBaseHref) {
        a.dataset.crpBaseHref = rawHref.replace(/([#&])crp_s=[^&]*/g, '').replace(/[?#&]+$/, '');
      }
      var baseHref = a.dataset.crpBaseHref;
      var tok = buildSyncToken();
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
    styleEl.textContent = tpl(CSS_TPL);
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
    var plusPlayChip = document.getElementById('crp-plus-play-chip');
    var sourcesChip = document.getElementById('crp-sources-chip');
    var sourcesDrawer = document.getElementById('crp-sources-drawer');
    var shareBtn = document.getElementById('crp-share-btn');
    var modeBtn = document.getElementById('crp-mode-btn');
    var dlLink = document.getElementById('crp-dl-link');
    var estudiaLink = document.getElementById('crp-estudia-link');
    var studioLink = document.getElementById('crp-studio-link');
    var transcriptBtn = document.getElementById('crp-transcript-btn');
    var transcriptDrawer = document.getElementById('crp-transcript-drawer');
    var transcriptBody = document.getElementById('crp-transcript-body');
    var trSearchIn = document.getElementById('crp-tr-search');
    var trBigBtn = document.getElementById('crp-tr-big-btn');
    var trCloseBtn = document.getElementById('crp-tr-close-btn');
    var trTabMode = 'tldr';
    var trSearchQuery = '';
    var trQuizState = {};
    var trEstudiaQuizState = {};
    var trEstudiaFlipState = {};
    var estudiaHubCache = null;
    var estudiaHubLoading = false;
    var trDataCache = {};
    var currentTrDoc = null;
    var lastActiveTurnIdx = -1;
    var closeBtn = document.getElementById('crp-close-btn');
    var prevBtn = document.getElementById('crp-prev-btn');
    var playBtn = document.getElementById('crp-play-btn');
    var rewBtn = document.getElementById('crp-rew-btn');
    var fwdBtn = document.getElementById('crp-fwd-btn');
    var nextBtn = document.getElementById('crp-next-btn');
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
    var currentStreamStage = 'gh'; // 'gh' | 'proxy'
    var streamAttemptSeq = 0;
    var lastCascadedSeq = 0;
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

    function getEpisodePlayCount(id) {
      if (!id) return 0;
      try {
        var raw = parseInt(localStorage.getItem('crp_count_' + id) || '0', 10);
        if (isFinite(raw) && raw > 0) return raw;
        if (localStorage.getItem('crp_done_' + id) === '1') return 1;
      } catch (e) {}
      return 0;
    }

    function isEpisodeDone(id) {
      return getEpisodePlayCount(id) > 0;
    }

    function syncDoneChipUI() {
      if (!doneChip) return;
      if (!currentDriveId) {
        doneChip.style.display = 'none';
        if (plusPlayChip) plusPlayChip.style.display = 'none';
        return;
      }
      doneChip.style.display = 'inline-block';
      var cnt = getEpisodePlayCount(currentDriveId);
      if (cnt > 0) {
        doneChip.innerHTML = '&#10003; Listened &middot; ' + cnt + '&times;';
        doneChip.title = 'Listened ' + cnt + '\u00d7 \u2022 Click to reset to Unplayed (Shift+click or +1\u00d7 to log another listen)';
        doneChip.style.background = '#10B981';
        doneChip.style.borderColor = '#34D399';
        doneChip.style.color = '#052E16';
        if (plusPlayChip) plusPlayChip.style.display = 'inline-block';
      } else {
        doneChip.innerHTML = '&#9675; Mark Listened';
        doneChip.title = 'Mark this episode as Listened (1\u00d7)';
        doneChip.style.background = 'rgba(15,23,42,0.9)';
        doneChip.style.borderColor = 'rgba(16,185,129,0.45)';
        doneChip.style.color = '#6EE7B7';
        if (plusPlayChip) plusPlayChip.style.display = 'none';
      }
    }

    function setEpisodePlayCount(id, count, notifyBridge) {
      if (!id) return 0;
      var clean = Math.max(0, Math.floor(count || 0));
      try {
        if (clean > 0) {
          localStorage.setItem('crp_done_' + id, '1');
          localStorage.setItem('crp_count_' + id, String(clean));
          localStorage.removeItem('crp_undone_' + id);
        } else {
          localStorage.removeItem('crp_done_' + id);
          localStorage.removeItem('crp_count_' + id);
          localStorage.setItem('crp_undone_' + id, '1');
        }
      } catch (e) {}
      buildSyncToken();
      if (notifyBridge !== false && bridgeFrame && bridgeFrame.contentWindow) {
        try {
          bridgeFrame.contentWindow.postMessage({ type: 'CRPSyncSet', id: id, val: clean }, 'https://yorekms.github.io');
        } catch (e) {}
      }
      return clean;
    }

    function setEpisodeDoneState(id, next, notifyBridge) {
      if (!id) return false;
      if (next) {
        var cur = getEpisodePlayCount(id);
        setEpisodePlayCount(id, cur > 0 ? cur : 1, notifyBridge);
        return true;
      }
      setEpisodePlayCount(id, 0, notifyBridge);
      return false;
    }

    function recordEpisodeCompletedPlay(id) {
      if (!id) return 0;
      var nextCnt = getEpisodePlayCount(id) + 1;
      setEpisodePlayCount(id, nextCnt, true);
      refreshCardStates();
      syncDoneChipUI();
      if (typeof applyFilterRef === 'function') applyFilterRef();
      track('episode_play_counted', { episode_id: id, play_count: nextCnt });
      return nextCnt;
    }

    window.addEventListener('message', function (ev) {
      if (ev.origin !== 'https://yorekms.github.io' || !ev.data || ev.data.type !== 'CRPSyncState' || !ev.data.map) return;
      var changed = false;
      try {
        for (var id in ev.data.map) {
          if (!Object.prototype.hasOwnProperty.call(ev.data.map, id)) continue;
          var rawVal = ev.data.map[id];
          var wantCnt = (typeof rawVal === 'number' && isFinite(rawVal) && rawVal > 0) ? Math.floor(rawVal) : (rawVal ? 1 : 0);
          var curCnt = getEpisodePlayCount(id);
          var curUndone = localStorage.getItem('crp_undone_' + id) === '1';
          if (wantCnt > 0 && !curUndone && wantCnt > curCnt) {
            localStorage.setItem('crp_done_' + id, '1');
            localStorage.setItem('crp_count_' + id, String(wantCnt));
            changed = true;
          } else if (wantCnt === 0 && curCnt > 0) {
            localStorage.removeItem('crp_done_' + id);
            localStorage.removeItem('crp_count_' + id);
            localStorage.setItem('crp_undone_' + id, '1');
            changed = true;
          }
        }
      } catch (e) {}
      if (changed) {
        buildSyncToken();
        refreshCardStates();
        syncDoneChipUI();
        if (typeof applyFilterRef === 'function') applyFilterRef();
      }
    });

    function toggleEpisodeDone(id, forceVal, addOnePlay) {
      if (!id) return false;
      if (addOnePlay) {
        recordEpisodeCompletedPlay(id);
        return true;
      }
      var next = (typeof forceVal === 'boolean') ? forceVal : !isEpisodeDone(id);
      if (next) {
        setEpisodePlayCount(id, 1, true);
      } else {
        setEpisodePlayCount(id, 0, true);
      }
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
        var cntEl = a.querySelector('.crp-ep-cnt');
        var cnt = getEpisodePlayCount(id);
        var done = cnt > 0;
        var pos = 0;
        try {
          pos = parseFloat(localStorage.getItem('crp_pos_' + id) || '0') || 0;
        } catch (e) {}
        a.classList.toggle('crp-done-card', done);
        a.classList.toggle('crp-inprog-card', !done && pos > 15);
        if (ico) ico.innerHTML = done ? '&#10003;' : '&#9654;';
        if (cntEl) {
          if (done) {
            cntEl.style.display = 'inline-block';
            cntEl.textContent = '\u2713 ' + cnt + '\u00d7';
            cntEl.title = 'Listened ' + cnt + '\u00d7 \u2022 Click badge to log +1 listen';
          } else {
            cntEl.style.display = 'none';
            cntEl.textContent = '';
          }
        }
        if (chk) {
          chk.setAttribute('aria-checked', done ? 'true' : 'false');
          chk.title = done ? ('Listened ' + cnt + '\u00d7 \u2022 Click check to unmark (Shift+click for +1\u00d7)') : 'Mark as Listened (1\u00d7)';
        }
        if (!done && pos > 15) a.title = 'In progress (' + fmtTime(pos) + ') \u2022 Click to resume';
        else if (done) a.title = 'Listened ' + cnt + '\u00d7 \u2022 Click to listen again (or click check on right to unmark)';
        else a.removeAttribute('title');
      });
      var doneFilterBtn = document.getElementById('crp-done-filter-pill');
      if (doneFilterBtn) {
        var totalLocal = Object.keys(localHubIds).length;
        var doneCount = 0;
        var totalPlays = 0;
        Object.keys(localHubIds).forEach(function (id) {
          var c = getEpisodePlayCount(id);
          if (c > 0) {
            doneCount++;
            totalPlays += c;
          }
        });
        doneFilterBtn.classList.toggle('active', hideListened);
        if (hideListened) {
          doneFilterBtn.innerHTML = '&#10003; Unplayed Only (' + (totalLocal - doneCount) + ' left)';
        } else if (totalPlays > doneCount) {
          doneFilterBtn.innerHTML = '&#10003; ' + doneCount + ' / ' + totalLocal + ' Listened &middot; ' + totalPlays + '&times;';
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
      ++streamAttemptSeq;
      setMediaPlaybackState('paused');
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
      if (frameEl) frameEl.src = 'about:blank';
      if (fallbackWrap) fallbackWrap.style.display = 'none';
      if (nativeWrap) nativeWrap.style.display = 'block';
      if (modeBtn) modeBtn.textContent = 'Backup Player';
      if (currentDriveId) loadNativeStream(currentDriveId, currentCleanTitle, currentGhUrl ? 'gh' : 'proxy', 0);
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

    function setMediaPlaybackState(state) {
      if (!('mediaSession' in navigator)) return;
      try { navigator.mediaSession.playbackState = state; } catch (e) {}
    }

    function syncMediaPositionState() {
      if (!audioEl || !('mediaSession' in navigator) || typeof navigator.mediaSession.setPositionState !== 'function') return;
      if (!isFinite(audioEl.duration) || audioEl.duration <= 0) return;
      try {
        navigator.mediaSession.setPositionState({
          duration: audioEl.duration,
          playbackRate: audioEl.playbackRate || 1,
          position: Math.max(0, Math.min(audioEl.currentTime || 0, audioEl.duration))
        });
      } catch (e) {}
    }

    function setupMediaSession(title) {
      try {
        if (navigator.audioSession && navigator.audioSession.type !== 'playback') {
          navigator.audioSession.type = 'playback';
        }
      } catch (e) {}
      if (!('mediaSession' in navigator) || !window.MediaMetadata) return;
      try {
        var coverUrl = cfg.cover || 'https://yorekms.github.io/deep-dive-podcasts/covers/cover-master.png';
        navigator.mediaSession.metadata = new MediaMetadata({
          title: title,
          artist: cfg.artist || cfg.title,
          album: 'Deep Dive Podcast Network',
          artwork: [{ src: coverUrl, sizes: '512x512', type: 'image/png' }]
        });
        navigator.mediaSession.setActionHandler('play', function () {
          if (!audioEl) return;
          try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
          var resumeAt = audioEl.currentTime || 0;
          // CRITICAL iOS WebKit Rule: call audioEl.play() SYNCHRONOUSLY inside the MediaSession 'play' callback
          // to preserve the AirPods / Lock-Screen remote-command activation token; only reload if play() fails with an error.
          var p = audioEl.play();
          if (p && p.catch) {
            p.catch(function () {
              if ((audioEl.error || audioEl.readyState === 0) && audioEl.src) {
                var onReady = function () {
                  audioEl.removeEventListener('loadedmetadata', onReady);
                  audioEl.removeEventListener('canplay', onReady);
                  if (resumeAt > 3 && (!audioEl.duration || resumeAt < audioEl.duration - 10)) {
                    try { audioEl.currentTime = resumeAt; } catch (e) {}
                  }
                  audioEl.play().catch(function () {});
                };
                audioEl.addEventListener('loadedmetadata', onReady);
                audioEl.addEventListener('canplay', onReady);
                try { audioEl.load(); } catch (e) {}
                return;
              }
              setTimeout(function () { if (audioEl && audioEl.paused) audioEl.play().catch(function () {}); }, 450);
            });
          }
        });
        navigator.mediaSession.setActionHandler('pause', function () { if (audioEl) audioEl.pause(); });
        navigator.mediaSession.setActionHandler('seekbackward', function () { if (audioEl) { audioEl.currentTime = Math.max(0, audioEl.currentTime - 15); updateTimeUI(); syncMediaPositionState(); } });
        navigator.mediaSession.setActionHandler('seekforward', function () { if (audioEl && isFinite(audioEl.duration)) { audioEl.currentTime = Math.min(audioEl.duration, audioEl.currentTime + 30); updateTimeUI(); syncMediaPositionState(); } });
        navigator.mediaSession.setActionHandler('seekto', function (d) { if (audioEl && d && typeof d.seekTime === 'number') { audioEl.currentTime = d.seekTime; updateTimeUI(); syncMediaPositionState(); } });
        navigator.mediaSession.setActionHandler('previoustrack', function () { playAdjacentEpisode(-1); });
        navigator.mediaSession.setActionHandler('nexttrack', function () { playAdjacentEpisode(1); });
        syncMediaPositionState();
      } catch (e) {}
    }

    var NON_PDB_FOUR_RE = /^(5HT[1-7]|H[1-9]N[1-9]|CYP[1-9]|G6PD|P450|IL[1-9][A-Z]|19\d\d|20\d\d|16S\d|23S\d|3D\d\d|2D\d\d)$/i;

    function isLikelyPdbCode(c) {
      var u = String(c || '').trim().toUpperCase();
      return /^[1-9][A-Z0-9]{3}$/.test(u) && /[A-Z]/.test(u) && !NON_PDB_FOUR_RE.test(u);
    }

    function pdbLinkHtml(id, withPrefix) {
      var u = String(id || '').toUpperCase();
      var txt = (withPrefix ? 'PDB ' : '') + u;
      return '<a href="https://www.rcsb.org/structure/' + u + '" target="_blank" rel="noopener" data-no-player="true" title="Open PDB ' + u + ' on RCSB Protein Data Bank" style="color:#5EEAD4;font-weight:800;text-decoration:none;border-bottom:1px dotted rgba(94,234,212,0.65);">' + txt + ' &#8599;</a>';
    }

    function extractEpisodePdbs(meta) {
      if (!meta) return [];
      var out = [];
      var seen = {};
      if (Array.isArray(meta.pdbs)) {
        meta.pdbs.forEach(function (p) {
          var code = String((p && p.id) || p || '').trim().toUpperCase();
          if (!isLikelyPdbCode(code) || seen[code]) return;
          seen[code] = true;
          out.push(typeof p === 'object' && p ? p : { id: code });
        });
      }
      var blob = String(meta.label || '') + ' ' + String(meta.notes || '');
      var listRe = /\bPDBs?\s*(?:IDs?\s*|entries\s*|entry\s*|structures?\s*|codes?\s*)?[:#=\-]?\s*([1-9][A-Za-z0-9]{3}(?:\s*(?:,|\/|&amp;|&|\band\b|\bor\b|;)\s*(?:PDB\s*)?[1-9][A-Za-z0-9]{3})*)/gi;
      var m;
      while ((m = listRe.exec(blob)) !== null) {
        var codes = m[1].match(/\b[1-9][A-Za-z0-9]{3}\b/g) || [];
        codes.forEach(function (rawC) {
          var c = rawC.toUpperCase();
          if (!seen[c] && isLikelyPdbCode(c)) {
            seen[c] = true;
            out.push({ id: c });
          }
        });
      }
      var parenRe = /\(([1-9](?=[A-Z0-9]*[A-Z])[A-Z0-9]{3}(?:\s*(?:,|\/|&)\s*[1-9](?=[A-Z0-9]*[A-Z])[A-Z0-9]{3})*)\)/g;
      while ((m = parenRe.exec(blob)) !== null) {
        var pCodes = m[1].match(/\b[1-9][A-Z0-9]{3}\b/g) || [];
        pCodes.forEach(function (rawP) {
          var c = rawP.toUpperCase();
          if (!seen[c] && isLikelyPdbCode(c)) {
            seen[c] = true;
            out.push({ id: c });
          }
        });
      }
      return out;
    }

    function linkifyScientificText(raw, knownPdbs) {
      var safe = esc(raw || '');
      // 1. Multi-PDB lists: "PDB 1DH3, 1KDX, 3CC4 & 6PS5", "PDBs 6WV3/5F19", "PDB ID: 1HWK"
      safe = safe.replace(/\b(PDBs?\s*(?:IDs?\s*|entries\s*|entry\s*|structures?\s*|codes?\s*)?[:#=\-]?\s*)([1-9][A-Za-z0-9]{3}(?:\s*(?:,|\/|&amp;|\band\b|\bor\b|;)\s*(?:PDB\s*)?[1-9][A-Za-z0-9]{3})*)/gi, function (whole, prefix, listStr) {
        var first = true;
        var linkedList = listStr.replace(/\b(?:PDB\s*)?([1-9][A-Za-z0-9]{3})\b/gi, function (tok, code) {
          if (!isLikelyPdbCode(code)) return tok;
          var usePfx = first && /^\s*PDB\s*$/i.test(prefix.trim());
          first = false;
          return pdbLinkHtml(code, usePfx);
        });
        return /^\s*PDB\s*$/i.test(prefix.trim()) ? linkedList : (prefix + linkedList);
      });
      // 2. Parenthetical uppercase PDB codes like "(6WV3)" or "(1HWK, 5F19)"
      safe = safe.replace(/\(([1-9](?=[A-Z0-9]*[A-Z])[A-Z0-9]{3}(?:\s*(?:,|\/|&amp;)\s*[1-9](?=[A-Z0-9]*[A-Z])[A-Z0-9]{3})*)\)/g, function (whole, inner) {
        var linked = inner.replace(/\b([1-9][A-Z0-9]{3})\b/g, function (tok, code) {
          return isLikelyPdbCode(code) ? pdbLinkHtml(code, false) : tok;
        });
        return '(' + linked + ')';
      });
      // 3. Any verified PDB codes belonging to this episode that appeared bare without "PDB" prefix
      if (Array.isArray(knownPdbs) && knownPdbs.length) {
        var parts = safe.split(/(<a\b[^>]*>[\s\S]*?<\/a>)/gi);
        var idList = knownPdbs.map(function (p) { return String((p && p.id) || p || '').toUpperCase(); }).filter(isLikelyPdbCode);
        if (idList.length) {
          var knownRe = new RegExp('\\b(' + idList.join('|') + ')\\b', 'g');
          for (var i = 0; i < parts.length; i += 2) {
            parts[i] = parts[i].replace(knownRe, function (_, code) { return pdbLinkHtml(code, false); });
          }
          safe = parts.join('');
        }
      }
      safe = safe.replace(/\bPMID[:\s]+(\d{5,9})\b/gi, function (_, pmid) {
        return '<a href="https://pubmed.ncbi.nlm.nih.gov/' + pmid + '/" target="_blank" rel="noopener" data-no-player="true" style="color:#38BDF8;font-weight:700;text-decoration:none;">PMID ' + pmid + ' &#8599;</a>';
      });
      safe = safe.replace(/\b(PMC\d{5,9})\b/gi, function (_, pmcid) {
        var u = pmcid.toUpperCase();
        return '<a href="https://pmc.ncbi.nlm.nih.gov/articles/' + u + '/" target="_blank" rel="noopener" data-no-player="true" style="color:#6EE7B7;font-weight:700;text-decoration:none;">' + u + ' &#8599;</a>';
      });
      return safe;
    }

    function sourceBadgeLabel(url, kind) {
      var u = String(url || '').toLowerCase();
      var k = String(kind || '').toLowerCase();
      if (k === 'pubmed' || u.indexOf('pubmed.ncbi.nlm.nih.gov') !== -1) return 'PubMed Article';
      if (k === 'pmc' || u.indexOf('pmc.ncbi.nlm.nih.gov') !== -1 || u.indexOf('europepmc.org') !== -1) return 'PMC Full Text';
      if (k === 'doi' || u.indexOf('doi.org/') !== -1) return 'Journal DOI';
      if (k === 'patent' || u.indexOf('patents.google.com') !== -1) return 'US Patent';
      if (k === 'fda' || u.indexOf('dailymed') !== -1 || u.indexOf('fda.gov') !== -1) return 'FDA Label';
      if (u.indexOf('openalex.org') !== -1) return 'OpenAlex Record';
      return 'Open Article';
    }

    function buildSourcesAndPdbBodyHTML(driveId, includeCloseHeader) {
      var meta = (epMetaById[driveId] && epMetaById[driveId].ep) || {};
      var rawSources = Array.isArray(meta.sources) ? meta.sources : [];
      var sources = rawSources.filter(function (s) {
        var t = typeof s === 'string' ? s : (s && s.title) || '';
        return t && !/\.(md|pdf|txt|docx?|cif|pdb|json)\b/i.test(t) && !/^Pilot\s+\d+\b/i.test(t);
      });
      var pdbs = extractEpisodePdbs(meta);
      var notes = String(meta.notes || '').trim();
      var html = '';

      if (includeCloseHeader) {
        html += '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding-bottom:6px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.10);">' +
          '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
            '<span style="font-size:10.5px;font-weight:800;color:' + A + ';text-transform:uppercase;letter-spacing:0.06em;">&#128218; Primary Citations &amp; 1-\u00c5ngstr\u00f6m PDB Resource</span>' +
            (pdbs.length ? '<span style="font-size:10px;font-weight:800;color:#5EEAD4;background:rgba(20,184,166,0.16);border:1px solid rgba(45,212,191,0.45);padding:1px 7px;border-radius:999px;">' + pdbs.length + ' RCSB PDB' + (pdbs.length === 1 ? '' : 's') + '</span>' : '') +
            (sources.length ? '<span style="font-size:10px;font-weight:800;color:#BAE6FD;background:rgba(14,116,144,0.28);border:1px solid rgba(56,189,248,0.45);padding:1px 7px;border-radius:999px;">' + sources.length + ' Cited Paper' + (sources.length === 1 ? '' : 's') + '</span>' : '') +
          '</div>' +
          '<button type="button" id="crp-sources-close-btn" title="Close Sources &amp; PDB drawer" style="background:transparent;border:none;color:#94A3B8;cursor:pointer;font-size:16px;line-height:1;padding:1px 5px;">&times;</button>' +
        '</div>';
      }

      if (notes) {
        html += '<div style="margin-bottom:' + ((pdbs.length || sources.length) ? '9px' : '0') + ';padding:7px 10px;border-radius:9px;background:rgba(15,23,42,0.65);border:1px solid rgba(255,255,255,0.07);color:#E2E8F0;font-size:11.6px;line-height:1.46;">' +
          linkifyScientificText(notes, pdbs) + '</div>';
      }

      if (pdbs.length) {
        html += '<div style="font-size:10px;font-weight:800;color:#5EEAD4;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px;">&#128300; 1-\u00c5ngstr\u00f6m Protein Data Bank Structures (RCSB PDB)</div>';
        html += '<div class="crp-pdb-grid">';
        pdbs.forEach(function (p) {
          var pid = esc(p.id);
          var rcsbUrl = 'https://www.rcsb.org/structure/' + encodeURIComponent(p.id);
          var molUrl = 'https://www.rcsb.org/3d-view/' + encodeURIComponent(p.id);
          var metaBadge = [p.method, p.res].filter(Boolean).join(' \u00b7 ');
          var paperUrl = p.pmid ? ('https://pubmed.ncbi.nlm.nih.gov/' + encodeURIComponent(p.pmid) + '/') : (p.doi ? ('https://doi.org/' + p.doi) : '');
          html += '<div class="crp-pdb-card">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:3px;">' +
              '<a href="' + esc(rcsbUrl) + '" target="_blank" rel="noopener" data-no-player="true" style="font-family:monospace;font-size:12px;font-weight:900;color:#5EEAD4;text-decoration:none;">PDB ' + pid + ' &#8599;</a>' +
              (metaBadge ? '<span style="font-size:9.8px;font-weight:700;color:#94A3B8;background:rgba(15,23,42,0.9);border:1px solid rgba(148,163,184,0.28);padding:1px 6px;border-radius:999px;">' + esc(metaBadge) + '</span>' : '') +
            '</div>' +
            (p.title ? '<div style="font-size:11px;color:#CBD5E1;line-height:1.36;margin-bottom:6px;">' + esc(p.title) + '</div>' : '') +
            '<div style="display:flex;flex-wrap:wrap;gap:5px;">' +
              '<a href="' + esc(rcsbUrl) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-ext-pill crp-pdb-pill" title="Open experimental structure summary &amp; coordinates on RCSB.org">&#128300; RCSB Entry &#8599;</a>' +
              '<a href="' + esc(molUrl) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-ext-pill crp-mol-pill" title="Rotate &amp; inspect atomic binding pocket in interactive 3D Mol* Viewer">&#129482; 3D Mol* Viewer &#8599;</a>' +
              (paperUrl ? '<a href="' + esc(paperUrl) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-ext-pill crp-cite-pill" title="Read primary structure determination paper">&#128196; Structure Paper &#8599;</a>' : '') +
            '</div>' +
          '</div>';
        });
        html += '</div>';
      }

      if (IS_THEORY_ATLAS && meta.theory) {
        var mth = meta.theory;
        html += '<div style="margin-bottom:8px;padding:8px 10px;border-radius:10px;background:rgba(15,23,42,0.88);border:1px solid ' + getStanceInfo(mth.stance).border + ';">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;margin-bottom:4px;">' +
            stanceBadgeHTML(mth.stance, true) +
            '<button type="button" onclick="window.__crpOpenTheoryModal && window.__crpOpenTheoryModal(\'' + esc(driveId) + '\')" class="crp-theory-open-btn">&#128214; Full Theory Dossier &#8599;</button>' +
          '</div>' +
          (mth.falsification_criteria ? '<div style="font-size:11px;color:#5EEAD4;line-height:1.4;"><strong>Crucial Test:</strong> ' + esc(mth.falsification_criteria) + '</div>' : '') +
        '</div>';
      }
      if (sources.length) {
        html += '<div style="font-size:10px;font-weight:800;color:' + A + ';text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px;">&#128196; Primary Literature &amp; Cited Articles (' + sources.length + ')</div>';
        sources.forEach(function (item) {
          if (IS_THEORY_ATLAS && item && typeof item === 'object' && item.role) {
            html += renderPaperCardHTML(item);
            return;
          }
          if (typeof item === 'string') {
            html += '<div class="crp-src-card">' + linkifyScientificText(item) + '</div>';
            return;
          }
          if (!item || !item.title) return;
          var url = item.url || '';
          var pmcUrl = item.pmcUrl || '';
          var doiUrl = item.doiUrl || '';
          var badgeTxt = sourceBadgeLabel(url, item.kind);
          html += '<div class="crp-src-card">' +
            '<div style="font-size:11.8px;font-weight:700;line-height:1.38;margin-bottom:3px;">' +
              (url
                ? '<a href="' + esc(url) + '" target="_blank" rel="noopener" data-no-player="true" style="color:#FFFFFF;">' + esc(item.title) + ' <span style="color:' + A + ';">&#8599;</span></a>'
                : '<span style="color:#FFFFFF;">' + esc(item.title) + '</span>') +
            '</div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;margin-top:3px;">' +
              (item.detail ? '<span style="font-size:10.8px;color:#94A3B8;">' + linkifyScientificText(item.detail, pdbs) + '</span>' : '<span></span>') +
              '<span style="display:inline-flex;align-items:center;gap:5px;flex-wrap:wrap;">' +
                (url ? '<a href="' + esc(url) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-ext-pill crp-cite-pill">' + esc(badgeTxt) + ' &#8599;</a>' : '') +
                (pmcUrl ? '<a href="' + esc(pmcUrl) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-ext-pill crp-pmc-pill">Free Full Text (PMC) &#8599;</a>' : '') +
                (doiUrl && !pmcUrl ? '<a href="' + esc(doiUrl) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-ext-pill crp-cite-pill">DOI &#8599;</a>' : '') +
              '</span>' +
            '</div>' +
          '</div>';
        });
      }
      return html;
    }

    function updateSourcesUI(driveId) {
      if (!sourcesChip || !sourcesDrawer) return;
      sourcesDrawer.style.display = 'none';
      sourcesChip.classList.remove('active');
      var meta = epMetaById[driveId] && epMetaById[driveId].ep;
      if (!meta) {
        sourcesChip.style.display = 'none';
        sourcesDrawer.innerHTML = '';
        return;
      }
      var rawSources = Array.isArray(meta.sources) ? meta.sources : [];
      var cleanCount = rawSources.filter(function (s) {
        var t = typeof s === 'string' ? s : (s && s.title) || '';
        return t && !/\.(md|pdf|txt|docx?|cif|pdb|json)\b/i.test(t) && !/^Pilot\s+\d+\b/i.test(t);
      }).length;
      var pdbs = extractEpisodePdbs(meta);
      var notes = meta.notes;
      if (!cleanCount && !pdbs.length && !notes) {
        sourcesChip.style.display = 'none';
        sourcesDrawer.innerHTML = '';
        return;
      }
      var chipParts = [];
      if (cleanCount > 0) chipParts.push('&#128218; ' + cleanCount + ' Source' + (cleanCount === 1 ? '' : 's'));
      else chipParts.push('&#128218; Sources');
      if (pdbs.length > 0) chipParts.push('&#128300; ' + pdbs.length + ' PDB' + (pdbs.length === 1 ? '' : 's'));
      sourcesChip.innerHTML = chipParts.join(' &middot; ');
      sourcesDrawer.innerHTML = buildSourcesAndPdbBodyHTML(driveId, true);
      var sClose = document.getElementById('crp-sources-close-btn');
      if (sClose) {
        sClose.addEventListener('click', function () {
          sourcesDrawer.style.display = 'none';
          sourcesChip.classList.remove('active');
        });
      }
      sourcesChip.style.display = 'inline-block';
    }

    function buildSmartCompanionForEpisode(driveId, cleanTitle) {
      var wrap = epMetaById[driveId] || {};
      var ep = wrap.ep || {};
      var sec = wrap.sec || cfg.title || 'Deep Dive';
      var notes = String(ep.notes || '').trim();
      var sources = Array.isArray(ep.sources) ? ep.sources : [];
      var tagStr = String(ep.tag || '');
      var mMin = tagStr.match(/(\d+)\s*m\b/i);
      var estDur = mMin ? (parseInt(mMin[1], 10) * 60) : 3400;
      var parts = splitEpLabel(ep.label || cleanTitle);
      var head = parts.head || cleanTitle;
      var sub = parts.sub || '';
      var clauses = (sub || notes).split(/[,;]+/).map(function (x) { return x.trim(); }).filter(function (x) { return x.length > 4; });

      var vocab = [];
      var pdbMatch = (head + ' ' + sub + ' ' + notes).match(/\bPDB\s+[0-9A-Z]{4}\b/g);
      if (pdbMatch && pdbMatch[0]) {
        vocab.push({ term: pdbMatch[0], meaning: '3D atomic structure from the Protein Data Bank showing the exact molecular lock-and-key geometry.' });
      }
      clauses.slice(0, 3).forEach(function (cl) {
        vocab.push({
          term: cl.length > 36 ? (cl.slice(0, 34).trim() + '...') : cl,
          meaning: 'Core mechanism or historical turning point unpacked step-by-step in "' + head + '".'
        });
      });
      if (vocab.length < 2) {
        vocab.push({ term: 'Primary Evidence', meaning: 'The original lab experiments, clinical cases, or historical records behind this topic.' });
      }

      var t1 = clauses[0] ? ('Core puzzle: ' + clauses[0] + '.') : ('Breaks down "' + head + '" into plain, vivid back-and-forth.');
      var t2 = (sources[0] && sources[0].title)
        ? ('Grounded in primary evidence: ' + sources[0].title + (sources[0].detail ? (' — ' + String(sources[0].detail).replace(/\(https?:\/\/[^)]+\)/g, '').trim()) : ''))
        : (clauses[1] ? ('Turning point: ' + clauses[1] + '.') : ('Follows how investigators tested competing hypotheses in ' + sec + '.'));
      var t3 = clauses[2] ? ('Big payoff: ' + clauses[2] + '.') : ('Connects the underlying mechanism straight to everyday biology, medicine, and human life.');

      var chapters = [
        { speaker: 'Host 1', text: 'Opening Hook — Unpacking "' + head + '"' + (sub ? (' (' + sub + ').') : '.') },
        { speaker: 'Host 2', text: notes ? ('Episode Roadmap — ' + notes) : ('Tracing the key experiments and turning points in ' + sec + '.') }
      ];
      sources.slice(0, 3).forEach(function (s, idx) {
        var st = typeof s === 'string' ? s : (s.title || 'Primary Study');
        var sd = (typeof s === 'object' && s && s.detail) ? (' — ' + String(s.detail).replace(/\(https?:\/\/[^)]+\)/g, '').trim()) : '';
        chapters.push({
          speaker: idx % 2 === 0 ? 'Host 1' : 'Host 2',
          text: 'Evidence Deep Dive #' + (idx + 1) + ': ' + st + sd + ' (Click to jump to this chapter in the audio).'
        });
      });
      chapters.push({
        speaker: 'Host 2',
        text: 'Synthesis & Takeaway — Putting all the pieces of "' + head + '" together.'
      });

      var turns = chapters.map(function (c, i) {
        return {
          id: 'ch-' + (i + 1),
          speaker: c.speaker,
          text: c.text,
          startTime: Math.round((i / chapters.length) * estDur),
          endTime: Math.round(((i + 1) / chapters.length) * estDur)
        };
      });

      return {
        driveId: driveId,
        title: head,
        isWordLevelTranscript: false,
        teenKit: {
          tldr: 'In 15 seconds: Two hosts unpack "' + head + '"' + (sub ? (' — ' + sub) : '') + ' in plain, zero-jargon English so the big idea clicks fast.',
          whyItMatters: notes
            ? ('Understanding ' + notes.slice(0, 150) + (notes.length > 150 ? '...' : '') + ' shows how the real physical mechanism works under the hood.')
            : ('Seeing the actual mechanism behind ' + sec + ' turns intimidating terminology into an unforgettable detective story.'),
          keyTakeaways: [t1, t2, t3],
          vocab: vocab.slice(0, 4),
          quiz: [
            {
              question: 'What is the main focus of "' + head + '"?',
              options: [
                sub || (notes ? notes.slice(0, 88) : ('Unpacking the core mechanism and primary evidence in ' + sec)),
                'Memorizing jargon without looking at any experiments or real cases',
                'Skipping how the discovery was actually tested',
                'Unrelated trivia'
              ],
              correctIndex: 0,
              explanation: 'This episode traces ' + (sub || head) + ' through primary evidence and clear mental models.'
            },
            {
              question: 'How can you jump straight to a section while listening?',
              options: [
                'Click any timestamped bubble in Full Transcript (or open the full Mobile App above)',
                'Refresh the whole browser page',
                'Turn your volume to zero',
                'Wait until the episode ends'
              ],
              correctIndex: 0,
              explanation: 'Every bubble in Full Transcript is wired directly to the audio player timeline!'
            }
          ]
        },
        transcript: turns
      };
    }

    function ensureEstudiaHubDeck() {
      if (estudiaHubCache || estudiaHubLoading) return;
      estudiaHubLoading = true;
      fetchJSON(BASE + 'estudia-decks/' + encodeURIComponent(HUB) + '.json')
        .then(function (data) {
          estudiaHubLoading = false;
          estudiaHubCache = data || { episodes: {} };
          if (trTabMode === 'estudia') renderTranscriptDrawer();
        })
        .catch(function () {
          estudiaHubLoading = false;
          estudiaHubCache = { episodes: {} };
          if (trTabMode === 'estudia') renderTranscriptDrawer();
        });
    }

    function renderTranscriptDrawer() {
      if (!transcriptBody || !currentTrDoc) return;
      var doc = currentTrDoc;
      var tk = doc.teenKit || {};
      if (trSearchIn) trSearchIn.style.display = (trTabMode === 'chat') ? 'inline-block' : 'none';

      if (trTabMode === 'tldr') {
        var h = '<div style="background:rgba(15,23,42,0.92);border:1px solid ' + A + '55;border-radius:10px;padding:9px 11px;margin-bottom:8px;">';
        h += '<div style="font-size:10px;font-weight:800;color:' + A + ';text-transform:uppercase;letter-spacing:0.06em;margin-bottom:3px;">The 15-Second Summary</div>';
        h += '<div style="color:#FFFFFF;font-weight:600;">' + esc(tk.tldr || doc.title) + '</div>';
        if (tk.whyItMatters) {
          h += '<div style="margin-top:5px;font-size:11.5px;color:#CBD5E1;"><strong style="color:#FBBF24;">Why it actually matters: </strong>' + esc(tk.whyItMatters) + '</div>';
        }
        h += '</div>';
        if (Array.isArray(tk.keyTakeaways) && tk.keyTakeaways.length) {
          h += '<div style="font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">3 Things That Stick</div>';
          tk.keyTakeaways.forEach(function (pt, idx) {
            h += '<div style="display:flex;align-items:flex-start;gap:7px;padding:5px 8px;margin-bottom:4px;background:rgba(15,23,42,0.65);border:1px solid rgba(255,255,255,0.07);border-radius:8px;">' +
              '<span style="min-width:18px;height:18px;border-radius:5px;background:' + A + ';color:#090E1A;font-size:10.5px;font-weight:900;display:inline-flex;align-items:center;justify-content:center;margin-top:1px;">' + (idx + 1) + '</span>' +
              '<span style="color:#E2E8F0;">' + esc(pt) + '</span></div>';
          });
        }
        if (Array.isArray(tk.vocab) && tk.vocab.length) {
          h += '<div style="font-size:10px;font-weight:800;color:#FBBF24;text-transform:uppercase;letter-spacing:0.06em;margin:8px 0 4px 0;">Big Words Translated</div>';
          h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:6px;">';
          tk.vocab.forEach(function (v) {
            h += '<div style="padding:6px 9px;background:rgba(15,23,42,0.75);border:1px solid rgba(255,255,255,0.08);border-radius:8px;">' +
              '<div style="font-size:11px;font-weight:800;color:#FDE68A;">' + linkifyScientificText(v.term) + '</div>' +
              '<div style="font-size:11px;color:#CBD5E1;">' + linkifyScientificText(v.meaning) + '</div></div>';
          });
          h += '</div>';
        }
        transcriptBody.innerHTML = h;
      } else if (trTabMode === 'sources') {
        var srcHtml = currentDriveId ? buildSourcesAndPdbBodyHTML(currentDriveId, false) : '';
        transcriptBody.innerHTML = srcHtml || '<div style="color:#94A3B8;">Select an episode to view its clickable primary journal citations and 3D RCSB PDB structures.</div>';
      } else if (trTabMode === 'quiz') {
        var qs = Array.isArray(tk.quiz) ? tk.quiz : [];
        if (!qs.length) {
          transcriptBody.innerHTML = '<div style="color:#94A3B8;">Open the Mobile App above for interactive Brain Check questions.</div>';
          return;
        }
        var qh = '';
        qs.forEach(function (q, qi) {
          var picked = trQuizState[qi];
          qh += '<div style="padding:8px 10px;margin-bottom:8px;background:rgba(15,23,42,0.82);border:1px solid rgba(255,255,255,0.09);border-radius:10px;">';
          qh += '<div style="font-weight:700;color:#FFFFFF;margin-bottom:4px;">Q' + (qi + 1) + '. ' + esc(q.question) + '</div>';
          (q.options || []).forEach(function (opt, oi) {
            var st = '';
            if (picked !== undefined) {
              if (oi === q.correctIndex) st = 'border-color:#10B981;background:rgba(16,185,129,0.18);color:#ECFDF5;font-weight:700;';
              else if (oi === picked) st = 'border-color:#EF4444;background:rgba(239,68,68,0.16);color:#FECACA;';
            }
            qh += '<button type="button" class="crp-quiz-opt" data-qi="' + qi + '" data-oi="' + oi + '" style="' + st + '">' + esc(opt) + '</button>';
          });
          if (picked !== undefined && q.explanation) {
            var ok = picked === q.correctIndex;
            qh += '<div style="margin-top:6px;font-size:11px;color:' + (ok ? '#6EE7B7' : '#FDE68A') + ';">' +
              (ok ? '&#10003; Spot on! ' : '&#128161; Good try — ') + esc(q.explanation) + '</div>';
          }
          qh += '</div>';
        });
        transcriptBody.innerHTML = qh;
        transcriptBody.querySelectorAll('.crp-quiz-opt').forEach(function (b) {
          b.addEventListener('click', function () {
            var qi = parseInt(b.getAttribute('data-qi'), 10);
            var oi = parseInt(b.getAttribute('data-oi'), 10);
            trQuizState[qi] = oi;
            renderTranscriptDrawer();
          });
        });
      } else if (trTabMode === 'estudia') {
        var estDeepUrl = ESTUDIA_BASE + '/?hub=' + encodeURIComponent(HUB) + (currentDriveId ? '&ep=' + encodeURIComponent(currentDriveId) : '');
        var eh = '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:9px 11px;margin-bottom:9px;background:linear-gradient(135deg,rgba(120,53,15,0.38) 0%,rgba(14,116,144,0.30) 100%);border:1px solid rgba(251,191,36,0.48);border-radius:10px;">' +
          '<div style="flex:1;min-width:200px;">' +
            '<div style="font-size:10px;font-weight:800;color:#FDE68A;text-transform:uppercase;letter-spacing:0.06em;">&#127891; Estudia! Synchronized Transcript Study Deck</div>' +
            '<div style="font-size:11.5px;color:#E2E8F0;">Practice active-recall Q&amp;A right here or launch 3D Flashcards, Write &amp; Match in Estudia!</div>' +
          '</div>' +
          '<a href="' + esc(estDeepUrl) + '" target="_blank" rel="noopener" data-no-player="true" style="display:inline-flex;align-items:center;gap:5px;padding:6px 11px;border-radius:8px;font-size:11px;font-weight:800;color:#090E1A;background:#FBBF24;text-decoration:none;white-space:nowrap;box-shadow:0 0 12px rgba(251,191,36,0.38);">&#128640; Open Full Deck in Estudia! &#8599;</a>' +
        '</div>';
        if (!estudiaHubCache) {
          ensureEstudiaHubDeck();
          eh += '<div style="color:#94A3B8;padding:8px 2px;">Loading transcript-derived Estudia! Q&amp;A study cards...</div>';
          transcriptBody.innerHTML = eh;
          return;
        }
        var epDeck = (estudiaHubCache.episodes && currentDriveId) ? estudiaHubCache.episodes[currentDriveId] : null;
        var eCards = (epDeck && Array.isArray(epDeck.cards)) ? epDeck.cards : [];
        if (!eCards.length) {
          eh += '<div style="color:#94A3B8;padding:6px 2px;">Open the full Estudia! app above to study all ' + esc(estudiaHubCache.cardCount || '7,600+') + ' hub flashcards.</div>';
          transcriptBody.innerHTML = eh;
          return;
        }
        var kindLabels = {
          'blueprint': 'Episode Blueprint',
          'act-mechanism': 'Act Mechanism',
          'vocab': 'Key Term',
          'mc-quiz': 'Concept Check',
          'dialogue-qa': 'Host Q&A',
          'transcript-evidence': 'Transcript Evidence'
        };
        eCards.forEach(function (c, ci) {
          var pickedE = trEstudiaQuizState[ci];
          var flippedE = !!trEstudiaFlipState[ci];
          var badgeLbl = kindLabels[c.cardType] || 'Study Card';
          eh += '<div style="padding:9px 11px;margin-bottom:8px;background:rgba(15,23,42,0.86);border:1px solid rgba(255,255,255,0.10);border-radius:10px;">';
          eh += '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;margin-bottom:5px;">' +
            '<span style="font-size:9.5px;font-weight:800;color:#38BDF8;background:rgba(56,189,248,0.14);border:1px solid rgba(56,189,248,0.38);padding:1px 7px;border-radius:999px;text-transform:uppercase;letter-spacing:0.05em;">Card ' + (ci + 1) + ' &bull; ' + esc(badgeLbl) + '</span>' +
            '<div style="display:inline-flex;align-items:center;gap:5px;">';
          if (c.timestampSec != null && c.timestampLabel) {
            eh += '<button type="button" class="crp-mini-chip crp-est-jump" data-seek-sec="' + Number(c.timestampSec) + '" title="Jump audio to ' + esc(c.timestampLabel) + '">&#9654; Hear @ ' + esc(c.timestampLabel) + '</button>';
          }
          eh += '<button type="button" class="crp-mini-chip crp-est-flip" data-ci="' + ci + '">' + (flippedE ? 'Hide Answer' : 'Flip Card') + '</button>';
          eh += '</div></div>';
          eh += '<div style="font-weight:700;color:#FFFFFF;margin-bottom:5px;">' + esc(c.front) + '</div>';
          if (flippedE) {
            eh += '<div style="margin:5px 0;padding:7px 9px;border-radius:8px;background:rgba(16,185,129,0.14);border:1px solid rgba(16,185,129,0.42);color:#ECFDF5;font-size:11.5px;"><strong>Answer: </strong>' + esc(c.back) + '</div>';
          }
          if (Array.isArray(c.options) && c.options.length >= 2) {
            c.options.forEach(function (opt, oi) {
              var stE = '';
              if (pickedE !== undefined) {
                if (oi === c.correctIndex) stE = 'border-color:#10B981;background:rgba(16,185,129,0.18);color:#ECFDF5;font-weight:700;';
                else if (oi === pickedE) stE = 'border-color:#EF4444;background:rgba(239,68,68,0.16);color:#FECACA;';
              }
              eh += '<button type="button" class="crp-quiz-opt crp-est-opt" data-ci="' + ci + '" data-oi="' + oi + '" style="' + stE + '">' + esc(opt) + '</button>';
            });
            if (pickedE !== undefined) {
              var okE = pickedE === c.correctIndex;
              eh += '<div style="margin-top:6px;font-size:11px;color:' + (okE ? '#6EE7B7' : '#FDE68A') + ';">' +
                (okE ? '&#10003; Spot on! ' : '&#128161; Review: ') + esc(c.explanation || c.back) + '</div>';
            }
          }
          eh += '</div>';
        });
        transcriptBody.innerHTML = eh;
        transcriptBody.querySelectorAll('.crp-est-opt').forEach(function (b) {
          b.addEventListener('click', function () {
            var ci = parseInt(b.getAttribute('data-ci'), 10);
            var oi = parseInt(b.getAttribute('data-oi'), 10);
            trEstudiaQuizState[ci] = oi;
            renderTranscriptDrawer();
          });
        });
        transcriptBody.querySelectorAll('.crp-est-flip').forEach(function (b) {
          b.addEventListener('click', function () {
            var ci = parseInt(b.getAttribute('data-ci'), 10);
            trEstudiaFlipState[ci] = !trEstudiaFlipState[ci];
            renderTranscriptDrawer();
          });
        });
        transcriptBody.querySelectorAll('.crp-est-jump').forEach(function (b) {
          b.addEventListener('click', function () {
            var sec = parseFloat(b.getAttribute('data-seek-sec') || '0') || 0;
            if (usingFallback) switchToNative();
            if (audioEl) {
              audioEl.currentTime = sec;
              audioEl.play().catch(function () {});
              updateTimeUI();
              if (statusEl) statusEl.textContent = 'Jumped to ' + fmtTime(sec);
            }
          });
        });
      } else {
        var turns = Array.isArray(doc.transcript) ? doc.transcript : [];
        var qLow = (trSearchQuery || '').trim().toLowerCase();
        var curT = (audioEl && audioEl.currentTime) || 0;
        var chHtml = '';
        if (!doc.isWordLevelTranscript) {
          chHtml += '<div style="font-size:10.5px;color:#94A3B8;margin-bottom:6px;display:flex;align-items:center;justify-content:space-between;gap:6px;">' +
            '<span>Interactive Chapter &amp; Study Guide (click any timestamp to jump audio)</span>' +
            '<a href="' + esc(studioLink ? studioLink.href : (STUDIO_BASE + '/?view=listen')) + '" target="_blank" rel="noopener" data-no-player="true" style="color:' + A + ';font-weight:700;text-decoration:none;">Full App View &#8599;</a></div>';
        }
        var curEpPdbs = currentDriveId && epMetaById[currentDriveId] ? extractEpisodePdbs(epMetaById[currentDriveId].ep) : [];
        var shown = 0;
        turns.forEach(function (t, idx) {
          var cleanTxt = String(t.text || '').replace(/<[^>]+>|\|[^|]+\|/g, '').trim();
          if (qLow && cleanTxt.toLowerCase().indexOf(qLow) === -1 && String(t.speaker || '').toLowerCase().indexOf(qLow) === -1) return;
          shown++;
          var isAct = curT >= (t.startTime || 0) && curT < (t.endTime || 999999);
          var spkCol = (idx % 2 === 0) ? '#FBBF24' : A;
          chHtml += '<div class="crp-tr-turn' + (isAct ? ' active' : '') + '" data-turn-idx="' + idx + '" data-seek-sec="' + (t.startTime || 0) + '">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:2px;">' +
              '<span style="font-size:10.5px;font-weight:800;color:' + spkCol + ';">' + esc(t.speaker || ('Host ' + ((idx % 2) + 1))) + '</span>' +
              '<span style="font-size:10px;font-family:monospace;color:#94A3B8;">[' + fmtTime(t.startTime || 0) + ']</span>' +
            '</div>' +
            '<div style="color:#F1F5F9;">' + linkifyScientificText(cleanTxt, curEpPdbs) + '</div>' +
          '</div>';
        });
        if (!shown) {
          chHtml += '<div style="color:#94A3B8;padding:8px 0;">No transcript lines matched "' + esc(trSearchQuery) + '".</div>';
        }
        transcriptBody.innerHTML = chHtml;
        transcriptBody.querySelectorAll('.crp-tr-turn').forEach(function (row) {
          row.addEventListener('click', function (ev) {
            if (ev && ev.target && ev.target.closest && ev.target.closest('a')) return;
            var sec = parseFloat(row.getAttribute('data-seek-sec') || '0') || 0;
            if (usingFallback) switchToNative();
            if (audioEl) {
              audioEl.currentTime = sec;
              audioEl.play().catch(function () {});
              updateTimeUI();
        syncActiveTranscriptHighlight();
            }
          });
        });
      }
    }

    function syncActiveTranscriptHighlight() {
      if (!transcriptDrawer || transcriptDrawer.style.display !== 'block' || trTabMode !== 'chat' || !currentTrDoc || !audioEl) return;
      var turns = currentTrDoc.transcript || [];
      var cur = audioEl.currentTime || 0;
      var idx = -1;
      for (var i = 0; i < turns.length; i++) {
        if (cur >= (turns[i].startTime || 0) && cur < (turns[i].endTime || 999999)) { idx = i; break; }
      }
      if (idx === lastActiveTurnIdx) return;
      lastActiveTurnIdx = idx;
      if (!transcriptBody) return;
      transcriptBody.querySelectorAll('.crp-tr-turn').forEach(function (el) {
        var elIdx = parseInt(el.getAttribute('data-turn-idx') || '-1', 10);
        if (elIdx === idx) {
          el.classList.add('active');
          try {
            var dRect = transcriptDrawer.getBoundingClientRect();
            var eRect = el.getBoundingClientRect();
            var nextTop = transcriptDrawer.scrollTop + (eRect.top - dRect.top) - Math.max(0, (dRect.height - eRect.height) / 3);
            transcriptDrawer.scrollTo({ top: Math.max(0, nextTop), behavior: 'smooth' });
          } catch (e) {}
        } else {
          el.classList.remove('active');
        }
      });
    }

    function loadTranscriptForEpisode(driveId, cleanTitle) {
      if (!driveId) return;
      trQuizState = {};
      trEstudiaQuizState = {};
      trEstudiaFlipState = {};
      lastActiveTurnIdx = -1;
      if (trDataCache[driveId]) {
        currentTrDoc = trDataCache[driveId];
        renderTranscriptDrawer();
        return;
      }
      currentTrDoc = buildSmartCompanionForEpisode(driveId, cleanTitle);
      renderTranscriptDrawer();
      fetch(BASE + 'transcripts/' + encodeURIComponent(driveId) + '.json')
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
          if (data && (data.teenKit || data.transcript)) {
            trDataCache[driveId] = data;
            if (currentDriveId === driveId) {
              currentTrDoc = data;
              renderTranscriptDrawer();
            }
          } else {
            trDataCache[driveId] = currentTrDoc;
          }
        })
        .catch(function () {
          trDataCache[driveId] = currentTrDoc;
        });
    }

    function cascadeNativeFailure(seq) {
      if (!currentDriveId || usingFallback || !player || player.style.display !== 'block') return;
      if (seq !== streamAttemptSeq || lastCascadedSeq === seq) return;
      lastCascadedSeq = seq;
      var keepSec = 0;
      if (audioEl && isFinite(audioEl.currentTime) && audioEl.currentTime > 2) {
        keepSec = Math.floor(audioEl.currentTime);
      } else {
        try { keepSec = parseFloat(localStorage.getItem('crp_pos_' + currentDriveId) || '0') || 0; } catch (e) {}
      }
      if (currentStreamStage === 'gh') {
        track('stream_fallback', { fallback_to: 'cloud_proxy', episode_title: currentCleanTitle });
        loadNativeStream(currentDriveId, currentCleanTitle, 'proxy', keepSec);
      } else {
        switchToFallback('Switched to Drive backup stream');
      }
    }

    function loadNativeStream(driveId, cleanTitle, stage, forcedStartSec) {
      if (!audioEl) return;
      var useStage = (stage === 'proxy' || !currentGhUrl) ? 'proxy' : 'gh';
      currentStreamStage = useStage;
      var seq = ++streamAttemptSeq;
      var streamUrl = (useStage === 'gh') ? currentGhUrl : (STREAM_BASE + encodeURIComponent(driveId));
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
        if (seq !== streamAttemptSeq) return;
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
        syncMediaPositionState();
      };
      audioEl.addEventListener('loadedmetadata', onLoaded);

      var p = audioEl.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () {
          if (seq !== streamAttemptSeq) return;
          if (audioEl.error) {
            cascadeNativeFailure(seq);
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
      currentGhUrl = ghUrl || (epMetaById[driveId] && epMetaById[driveId].ep && epMetaById[driveId].ep.gh) || '';
      milestonesSent = { activeId: driveId };
      if (titleEl) titleEl.textContent = cleanTitle;
      if (estudiaLink) {
        estudiaLink.href = ESTUDIA_BASE + '/?hub=' + encodeURIComponent(HUB) + '&ep=' + encodeURIComponent(driveId);
      }
      if (studioLink) {
        studioLink.href = STUDIO_BASE + '/?view=listen&driveId=' + encodeURIComponent(driveId) + '&hub=' + encodeURIComponent(HUB) + '&title=' + encodeURIComponent(cleanTitle) + '&autoplay=1';
        studioLink.title = 'Open standalone Pocket App with offline downloads & transcripts (iPhone & Android)';
      }
      loadTranscriptForEpisode(driveId, cleanTitle);
      if (dlLink) dlLink.href = currentGhUrl || ('https://drive.google.com/uc?export=download&id=' + driveId);
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
      loadNativeStream(driveId, cleanTitle, currentGhUrl ? 'gh' : 'proxy', forcedStartSec || 0);
    }

    if (audioEl) {
      audioEl.addEventListener('loadedmetadata', function () {
        syncMediaPositionState();
      });
      audioEl.addEventListener('play', function () {
        if (playBtn) playBtn.innerHTML = '&#10074;&#10074;';
        if (pulseEl) { pulseEl.style.background = A; pulseEl.style.boxShadow = '0 0 10px ' + A; }
        applySpeed(savedRate);
        setMediaPlaybackState('playing');
        syncMediaPositionState();
        if (statusEl && (!statusEl.textContent || (statusEl.textContent.indexOf('Resumed') === -1 && statusEl.textContent.indexOf('Jumped') === -1))) {
          statusEl.textContent = 'Variable-Speed Stream \u2022 ' + savedRate + '\u00d7';
        }
      });
      audioEl.addEventListener('waiting', function () { if (statusEl) statusEl.textContent = 'Buffering audio...'; });
      audioEl.addEventListener('playing', function () {
        if (playBtn) playBtn.innerHTML = '&#10074;&#10074;';
        setMediaPlaybackState('playing');
        syncMediaPositionState();
        if (statusEl && statusEl.textContent === 'Buffering audio...') statusEl.textContent = 'Variable-Speed Stream \u2022 ' + savedRate + '\u00d7';
      });
      audioEl.addEventListener('pause', function () {
        if (playBtn) playBtn.innerHTML = '&#9654;';
        if (pulseEl) { pulseEl.style.background = '#F59E0B'; pulseEl.style.boxShadow = '0 0 8px #F59E0B'; }
        setMediaPlaybackState('paused');
        syncMediaPositionState();
        if (statusEl && !audioEl.ended && statusEl.textContent !== 'Paused by sleep timer') {
          statusEl.textContent = 'Paused \u2022 ' + savedRate + '\u00d7';
        }
      });
      audioEl.addEventListener('ratechange', function () {
        syncMediaPositionState();
      });
      audioEl.addEventListener('seeked', function () {
        syncMediaPositionState();
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
          if (dur > 60 && pct < 40 && milestonesSent.countedRun) {
            milestonesSent.countedRun = false;
          }
          if (dur > 30 && audioEl.currentTime > 5 && (pct >= 90 || (dur - audioEl.currentTime) <= 90) && milestonesSent.activeId === currentDriveId && !milestonesSent.countedRun) {
            milestonesSent.countedRun = true;
            recordEpisodeCompletedPlay(currentDriveId);
          }
        }
      });
      audioEl.addEventListener('ended', function () {
        if (playBtn) playBtn.innerHTML = '&#9654;';
        setMediaPlaybackState('paused');
        if (statusEl) statusEl.textContent = 'Episode finished';
        if (currentDriveId) {
          try {
            localStorage.removeItem('crp_pos_' + currentDriveId);
          } catch (e) {}
          if (!milestonesSent.countedRun) {
            milestonesSent.countedRun = true;
            recordEpisodeCompletedPlay(currentDriveId);
          } else {
            refreshCardStates();
            syncDoneChipUI();
          }
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
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState !== 'visible' || !audioEl || !currentDriveId) return;
        var dur = isFinite(audioEl.duration) && audioEl.duration > 30 ? audioEl.duration : 0;
        var curr = audioEl.currentTime || 0;
        var nearEnd = dur > 30 && curr > 5 && ((curr / dur) >= 0.90 || (dur - curr) <= 90);
        if ((audioEl.ended || nearEnd) && !milestonesSent.countedRun) {
          milestonesSent.countedRun = true;
          try { localStorage.removeItem('crp_pos_' + currentDriveId); } catch (e) {}
          recordEpisodeCompletedPlay(currentDriveId);
        }
      });
      audioEl.addEventListener('error', function () {
        if (audioEl && audioEl.error) {
          cascadeNativeFailure(streamAttemptSeq);
        }
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { playAdjacentEpisode(-1); });
    if (playBtn) playBtn.addEventListener('click', function () { if (audioEl && currentDriveId) { if (audioEl.paused) audioEl.play(); else audioEl.pause(); } });
    if (rewBtn) rewBtn.addEventListener('click', function () { if (audioEl) { audioEl.currentTime = Math.max(0, (audioEl.currentTime || 0) - 15); updateTimeUI(); } });
    if (fwdBtn) fwdBtn.addEventListener('click', function () {
      if (audioEl) { var dur = isFinite(audioEl.duration) ? audioEl.duration : (audioEl.currentTime + 30); audioEl.currentTime = Math.min(dur, (audioEl.currentTime || 0) + 30); updateTimeUI(); }
    });
    if (nextBtn) nextBtn.addEventListener('click', function () { playAdjacentEpisode(1); });
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
    if (doneChip) doneChip.addEventListener('click', function (ev) {
      if (!currentDriveId) return;
      toggleEpisodeDone(currentDriveId, undefined, !!(ev && ev.shiftKey));
    });
    if (plusPlayChip) plusPlayChip.addEventListener('click', function () {
      if (!currentDriveId) return;
      recordEpisodeCompletedPlay(currentDriveId);
    });
    if (sourcesChip && sourcesDrawer) sourcesChip.addEventListener('click', function () {
      var open = sourcesDrawer.style.display !== 'block';
      if (open && transcriptDrawer && transcriptDrawer.style.display === 'block') {
        transcriptDrawer.style.display = 'none';
      }
      sourcesDrawer.style.display = open ? 'block' : 'none';
      sourcesChip.classList.toggle('active', open);
      if (open) track('sources_open', { episode_id: currentDriveId || '', episode_title: currentCleanTitle || '' });
    });
    if (transcriptBtn && transcriptDrawer) {
      transcriptBtn.addEventListener('click', function (ev) {
        if (ev && ev.shiftKey && studioLink && studioLink.href) {
          window.open(studioLink.href, '_blank', 'noopener');
          return;
        }
        var open = transcriptDrawer.style.display !== 'block';
        if (open && sourcesDrawer && sourcesDrawer.style.display === 'block') {
          sourcesDrawer.style.display = 'none';
          if (sourcesChip) sourcesChip.classList.remove('active');
        }
        transcriptDrawer.style.display = open ? 'block' : 'none';
        if (open) {
          if (!currentTrDoc && currentDriveId) loadTranscriptForEpisode(currentDriveId, currentCleanTitle);
          else renderTranscriptDrawer();
          track('transcript_open', { episode_id: currentDriveId || '', episode_title: currentCleanTitle || '' });
        }
      });
    }
    if (trCloseBtn && transcriptDrawer) {
      trCloseBtn.addEventListener('click', function () { transcriptDrawer.style.display = 'none'; });
    }
    if (trBigBtn && transcriptDrawer) {
      trBigBtn.addEventListener('click', function () {
        var big = transcriptDrawer.classList.toggle('crp-big-txt');
        trBigBtn.classList.toggle('active', big);
      });
    }
    if (trSearchIn) {
      trSearchIn.addEventListener('input', function () {
        trSearchQuery = trSearchIn.value || '';
        renderTranscriptDrawer();
      });
    }
    if (transcriptDrawer) {
      transcriptDrawer.querySelectorAll('.crp-tr-tab').forEach(function (tb) {
        tb.addEventListener('click', function () {
          trTabMode = tb.getAttribute('data-tr-tab') || 'tldr';
          transcriptDrawer.querySelectorAll('.crp-tr-tab').forEach(function (x) {
            x.classList.toggle('active', x.getAttribute('data-tr-tab') === trTabMode);
          });
          renderTranscriptDrawer();
        });
      });
    }
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
      milestonesSent.countedRun = false;
      if (currentDriveId) {
        try {
          localStorage.removeItem('crp_pos_' + currentDriveId);
        } catch (e) {}
        refreshCardStates();
        syncDoneChipUI();
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
      ++streamAttemptSeq;
      setMediaPlaybackState('paused');
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
      } else if (ev.shiftKey && (ev.key === 'N' || ev.key === 'n')) {
        ev.preventDefault();
        playAdjacentEpisode(1);
      } else if (ev.shiftKey && (ev.key === 'P' || ev.key === 'p')) {
        ev.preventDefault();
        playAdjacentEpisode(-1);
      } else if (ev.key === 's' || ev.key === 'S') {
        if (sourcesChip && sourcesChip.style.display !== 'none') {
          ev.preventDefault();
          sourcesChip.click();
        }
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
      var nonAudioSlugs = { 'study-apps': 1, 'scientific-software': 1, 'clampflow': 1, 'statweave': 1, 'scientist': 1 };
      var audioHubs = (net.sites && net.sites.length)
        ? net.sites.map(function (s) { return s.slug; }).filter(function (sl) { return sl && !nonAudioSlugs[sl]; })
        : ['consciousness', 'cell-death', 'biophysics', 'nutrition-metabolism', 'pharmacology', 'oncology',
          'forensic-medicine', 'medical-testing', 'ancient-medicine', 'philosophy-science', 'human-origins', 'religion-cooperation', 'characters'];
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
    function navPillStyle(active, slug) {
      if (active) {
        return 'font-weight:800;color:#090E1A;background:' + A + ';box-shadow:0 0 14px ' + A + '66;border:1px solid ' + A + ';';
      }
      if (slug === 'clampflow') {
        return 'font-weight:700;color:#FDE68A;background:rgba(120,53,15,0.48);border:1px solid rgba(245,158,11,0.55);';
      }
      if (slug === 'statweave') {
        return 'font-weight:700;color:#A7F3D0;background:rgba(6,78,59,0.52);border:1px solid rgba(16,185,129,0.55);';
      }
      return 'font-weight:600;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);';
    }
    function buildAuthorBoxHTML() {
      var au = net.author || {};
      var name = au.name || 'Matthew S. Yorek';
      var role = au.role || 'Biomedical Research, Electrophysiology & Data Engineering';
      var email = au.email || 'yorekms@gmail.com';
      var orcid = au.orcid || '0000-0002-4737-9367';
      var orcidUrl = au.orcid_url || ('https://orcid.org/' + orcid);
      var pubmedUrl = au.pubmed_url || 'https://www.ncbi.nlm.nih.gov/myncbi/1XAQAfuLLOMkz/bibliography/public/';
      var pillBase = 'display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;text-decoration:none;white-space:nowrap;';
      return '<div id="crp-author-cred-box" style="width:100%;max-width:1510px;margin:0 auto 10px auto;padding:8px 14px;background:rgba(9,14,26,0.90);border:1px solid rgba(255,255,255,0.16);border-left:3px solid ' + A + ';border-radius:13px;box-shadow:0 8px 24px rgba(0,0,0,0.36);backdrop-filter:blur(14px);box-sizing:border-box;font-family:' + FONT + ';display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 14px;text-align:left;">' +
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
    function buildNavHTML() {
      var sites = net.sites || [];
      var base = 'display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;text-decoration:none;white-space:nowrap;';
      var html = '<div id="crp-top-hub-nav" style="width:100%;max-width:1510px;margin:0 auto 16px auto;padding:9px 12px;background:rgba(9,14,26,0.84);border:1px solid ' + A +
        '44;border-radius:15px;box-shadow:0 10px 28px rgba(0,0,0,0.38);backdrop-filter:blur(14px);box-sizing:border-box;font-family:' + FONT + ';">';
      html += '<div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;align-items:center;">';
      sites.forEach(function (s) {
        var active = s.slug === HUB || (cfg.url && s.url === cfg.url);
        html += '<a href="' + esc(s.url) + '" class="crp-hub-pill" data-nav-target="' + esc(s.slug || s.url) + '" style="' + base + navPillStyle(active, s.slug) + '">' + esc(s.label) + '</a>';
      });
      html += '</div><div style="margin-top:8px;padding-top:7px;border-top:1px solid rgba(255,255,255,0.10);display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center;">';
      html += '<span style="font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-right:2px;">Research Portals &amp; Feeds:</span>';
      (net.portals || []).forEach(function (pt) {
        html += '<a href="' + esc(pt.url) + '" target="_blank" rel="noopener" class="crp-hub-pill" data-nav-target="' + esc(pt.url) +
          '" style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:700;text-decoration:none;white-space:nowrap;color:' +
          esc(pt.color || '#E2E8F0') + ';background:' + esc(pt.bg || 'rgba(15,23,42,0.72)') + ';border:1px solid ' + esc(pt.border || 'rgba(255,255,255,0.14)') + ';">' + esc(pt.label) + ' \u2197</a>';
      });
      html += '<a href="' + STUDIO_BASE + '/?view=listen" target="_blank" rel="noopener" class="crp-hub-pill" data-no-player="true" style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:800;text-decoration:none;white-space:nowrap;color:#090E1A;background:#38BDF8;border:1px solid #38BDF8;">&#127911; Mobile &amp; Transcript App \u2197</a>';
      html += '<button type="button" id="crp-open-rss-modal-btn" data-series-rss="' + esc(cfg.rss || '') +
        '" style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:800;color:#090E1A;background:' + A +
        ';border:1px solid ' + A + ';cursor:pointer;font-family:inherit;white-space:nowrap;">\ud83d\udce1 Podcast App RSS</button>';
      html += '</div></div>';
      if (HUB === 'forensic-medicine') {
        html += '<div id="crp-ordinary-tuesday-spotlight" style="width:100%;max-width:1510px;margin:0 auto 14px auto;padding:12px 16px;background:linear-gradient(135deg,rgba(127,29,29,0.55),rgba(15,23,42,0.92));border:1px solid rgba(248,113,113,0.55);border-left:4px solid #EF4444;border-radius:14px;box-shadow:0 10px 26px rgba(0,0,0,0.38);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 16px;box-sizing:border-box;font-family:' + FONT + ';text-align:left;">' +
          '<div style="min-width:220px;flex:1;">' +
            '<div style="font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#FCA5A5;margin-bottom:2px;">&#128293; Featured Companion Magazine &amp; Survival Book</div>' +
            '<div style="font-size:15px;font-weight:800;color:#FFFFFF;line-height:1.25;">How Not to Die on an Ordinary Tuesday</div>' +
            '<div style="font-size:12px;color:#E2E8F0;margin-top:2px;line-height:1.4;">111+ darkly funny, dead-serious 5-minute stories built from peer-reviewed autopsies &amp; ER case reports — with Toe-Tag Verdicts, First-60-Seconds cards &amp; primary DOIs.</div>' +
          '</div>' +
          '<a href="https://yorekms.github.io/my-ordinary-tuesday/" target="_blank" rel="noopener" class="crp-hub-pill" data-nav-target="https://yorekms.github.io/my-ordinary-tuesday/" style="display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border-radius:10px;font-size:12.5px;font-weight:800;text-decoration:none;white-space:nowrap;color:#FFFFFF;background:#DC2626;border:1px solid #F87171;box-shadow:0 6px 16px rgba(220,38,38,0.35);">Open Magazine Reader &#8599;</a>' +
        '</div>';
      }
      return html;
    }

    var SOG_RE = /shoulders?\s+of\s+giants|one[-\s]+(?:\u00e5|a)ngstr(?:\u00f6|o)m\s*(?:\u00b7\s*)?giants|^how\s+(?!much\s+weight|many\s+|do\s+you\s+|to\s+)[a-z]|\b(withering|fleming|hodgkin|chain|florey|ehrlich|domagk|banting|sanger|elion|hitchings|karl\s+paul\s+link|tu\s+youyou|ge\s+hong|janssen|ondetti|cushman|ferreira|von\s+mering|minkowski|caterina|julius|patapoutian|mackinnon|neher|sakmann|kobilka|lefkowitz|warburg|krebs|sokoloff|yalow|berson|edler|r\u00f6ntgen|roentgen|curie|avery|hershey|bradford\s+hill|jenner|pasteur|semmelweis|eijkman|takaki|goldberger|whipple|minot|galvani|volta|helmholtz|starling|krogh|skou|boyer|furchgott|allison|honjo|shulgin|mark\s+a\.?\s+yorek)\b/i;
    var OA_TEXT_RE = /(?:one|1)[-\s]+(?:\u00e5|a)ngstr(?:\u00f6|o)m|\bPDB\s*[:#]?\s*[1-9][A-Za-z0-9]{3}\b/i;
    var OA_PAREN_PDB_RE = /\([1-9](?=[A-Z0-9]*[A-Z])[A-Z0-9]{3}\)/;
    var ENH_RE = /no[-\s]+free[-\s]+lunch|enhanced\s+games|human\s+enhancement|enhancement\s*\u00b7|every\s+upper\s+bills\s+a\s+downer|healthy\s+brain\s+smarter|lance\s+armstrong.*viscosity|gw501516|bpc-157|ipamorelin|\b(dinitrophenol|roxadustat|xenon\s+doping|ketone\s+monoester|jo\s+cameron|faah-out|ergogenic\s+tax)\b/i;
    var VICE_RE = /biology,\s*humor\s*(?:&|and)\s*vice|pound-a-day\s+smoker|dealers?\s+still\s+live\s+with\s+mom|slot\s+sharks|beer\s+before\s+liquor|hair\s+of\s+the\s+dog|killed\s+happy\s+hour/i;

    function epLenses(ep, secText) {
      var lbl = String((ep && ep.label) || '').trim();
      var tag = String((ep && ep.tag) || '').trim();
      var notes = String((ep && ep.notes) || '').trim();
      var epNum = parseInt((ep && ep.ep) || 0, 10) || 0;
      var blob = tag + ' ' + lbl + ' ' + notes + ' ' + String(secText || '');
      var explicitOag = /one[-\s]+(?:\u00e5|a)ngstr(?:\u00f6|o)m\s*(?:\u00b7\s*)?giants/i.test(tag + ' ' + lbl);
      var sog = explicitOag || SOG_RE.test(lbl) || SOG_RE.test(tag + ' ' + String(secText || '')) ||
        /\b(hoffmann\b.*aspirin|endo\b.*statin|cade\b.*lithium|rosenberg\b.*platinum|black\b.*(?:cimetidine|propranolol)|snow\b.*cholera|lind\b.*scurvy|harvey\b.*circulation|mitchell\b.*chemiosmo)\b/i.test(blob);
      var oa = explicitOag || OA_TEXT_RE.test(blob) || OA_PAREN_PDB_RE.test(lbl + ' ' + notes);
      var enh = (epNum >= 1997 && epNum <= 2002) || ENH_RE.test(blob);
      var vice = (epNum >= 2212 && epNum <= 2215) || epNum === 2186 || VICE_RE.test(blob);
      return { sog: !!sog, oa: !!oa, oag: !!(explicitOag || (sog && oa)), enh: !!enh, vice: !!vice };
    }

    function epKindAndTag(ep, secText) {
      var raw = String((ep && ep.tag) || '').trim();
      var kind = (ep && ep.kind) || '';
      var lenses = epLenses(ep, secText);
      var durMatch = raw.match(/(\d+m)\s*$/i);
      var durSuf = durMatch ? (' \u00b7 ' + durMatch[1]) : '';
      if (/^\d+m$/i.test(raw)) {
        raw = 'Deep Dive \u00b7 ' + raw;
        kind = 'deep-dive';
      } else if (!kind) {
        var low = raw.toLowerCase();
        if (low.indexOf('one medicine') === 0) kind = 'one-medicine';
        else if (low.indexOf('clinical cluster') === 0) kind = 'clinical-cluster';
        else if (low.indexOf('debate') === 0) kind = 'debate';
        else if (/biology,\s*humor\s*(?:&|and)\s*vice/i.test(raw)) kind = 'vice';
        else if (/no[-\s]+free[-\s]+lunch|^enhancement\b/i.test(raw)) kind = 'enhancement';
        else if (/one[-\s]+(?:\u00e5|a)ngstr(?:\u00f6|o)m\s*(?:\u00b7\s*)?giants/i.test(raw)) kind = 'one-angstrom-giants';
        else if (/^shoulders?\s+of\s+giants/i.test(raw)) kind = 'shoulders-of-giants';
        else if (/^(?:one|1)[-\s]+(?:\u00e5|a)ngstr(?:\u00f6|o)m/i.test(raw)) kind = 'one-angstrom';
        else kind = 'deep-dive';
      }
      if (kind === 'deep-dive') {
        if (/biology,\s*humor\s*(?:&|and)\s*vice/i.test(raw)) {
          kind = 'vice';
        } else if (/no[-\s]+free[-\s]+lunch|^enhancement\b/i.test(raw)) {
          kind = 'enhancement';
        } else if (lenses.oag) {
          kind = 'one-angstrom-giants';
          raw = 'One \u00c5ngstr\u00f6m \u00b7 Giants' + durSuf;
        } else if (lenses.sog) {
          kind = 'shoulders-of-giants';
          raw = 'Shoulders of Giants' + durSuf;
        } else if (lenses.oa) {
          kind = 'one-angstrom';
          raw = 'One \u00c5ngstr\u00f6m' + durSuf;
        }
      }
      return { kind: kind, tag: raw || 'Deep Dive', lenses: lenses };
    }

    function splitEpLabel(raw) {
      var s = String(raw || '').trim();
      var m = s.match(/^(.+?)\s+(?:\u2014|\u2013|--)\s+(.+)$/);
      if (m) return { head: m[1], sub: m[2] };
      var c = s.indexOf(': ');
      if (c >= 8 && c < 76 && (s.length - (c + 2)) >= 12) {
        return { head: s.slice(0, c), sub: s.slice(c + 2) };
      }
      return { head: s, sub: '' };
    }

    function excerptFromNotes(rawNotes, maxLen) {
      var txt = String(rawNotes || '').replace(/\s+/g, ' ').trim();
      if (!txt) return '';
      var lim = maxLen || 155;
      if (txt.length <= lim) return txt;
      var cut = txt.slice(0, lim);
      var pIdx = Math.max(cut.lastIndexOf('; '), cut.lastIndexOf('. '), cut.lastIndexOf(', '));
      if (pIdx >= Math.floor(lim * 0.62)) {
        cut = cut.slice(0, pIdx);
      } else {
        var sp = cut.lastIndexOf(' ');
        if (sp >= 40) cut = cut.slice(0, sp);
      }
      cut = cut.replace(/[\s,;:\u2014\u2013-]+$/, '');
      return cut + '\u2026';
    }

    function epButtonHTML(ep, secIdx, badgeLabel, secText) {
      if (IS_THEORY_ATLAS && ep && ep.theory) {
        var th = ep.theory;
        var st = getStanceInfo(th.stance);
        var partsT = splitEpLabel(ep.label || th.slug);
        var subT = th.verdict_2026 ? excerptFromNotes(th.verdict_2026, 165) : (partsT.sub || '');
        var srcsT = Array.isArray(ep.sources) ? ep.sources : [];
        var pillarsT = Array.isArray(th.pillars) ? th.pillars : [];
        var suppN = srcsT.filter(function (s) { return normalizeRoleKey(s.role) === 'supporting'; }).length;
        var refN = srcsT.filter(function (s) { return normalizeRoleKey(s.role) === 'refuting'; }).length;
        var indN = (th.evidence_balance && typeof th.evidence_balance.indirect === 'number')
          ? th.evidence_balance.indirect
          : srcsT.filter(function (s) { return normalizeTestProximity(s) !== 'direct-test'; }).length;
        var hasAud = !!(th.has_audio || (ep.gh && ep.gh.length > 5) || (ep.id && ep.id.indexOf('atlas-') !== 0));
        var searchBitsT = [
          th.code || '', th.domain_pill || '', th.subdiscipline || '', th.stance || '', th.stance_label || '',
          th.core_claim || '', th.verdict_2026 || '', th.common_paper_blindspot || '', th.falsification_criteria || '',
          (th.rivals || []).join(' '), (th.keywords || []).join(' '),
          (th.open_escape_hatches || []).join(' ')
        ];
        pillarsT.forEach(function (p) {
          if (p) searchBitsT.push((p.name || '') + ' ' + (p.claim || ''));
        });
        srcsT.forEach(function (s) {
          if (s && s.title) searchBitsT.push(s.title + ' ' + (s.detail || '') + ' ' + (s.study_tier || '') + ' ' + (s.debate_bridge || '') + ' ' + (s.escape_hatch_note || ''));
        });
        var footMeta = [];
        if (th.year_span) footMeta.push('&#127963;&#65039; ' + esc(th.year_span));
        if (srcsT.length) {
          var pSummary = '&#128196; ' + srcsT.length + ' Verified';
          if (suppN || refN) pSummary += ' (<span style="color:#6EE7B7;">' + suppN + ' Pro</span> &middot; <span style="color:#FDA4AF;">' + refN + ' Con</span>)';
          if (indN > 0) pSummary += ' &middot; <span style="color:#DDD6FE;">&#129513; ' + indN + ' Indirect/Adj</span>';
          footMeta.push(pSummary);
        } else {
          footMeta.push('&#128218; Wave ' + esc(th.wave || 2) + ' Planned');
        }
        if (pillarsT.length) {
          footMeta.push('<span style="color:#BAE6FD;">&#127963;&#65039; ' + pillarsT.length + ' Pillars</span>');
        }
        var bpReady = (th.podcast_status === 'blueprint-ready' || th.wave === 1);
        if (hasAud) footMeta.push('<span style="color:#38BDF8;font-weight:800;">&#127911; Podcast Live</span>');
        else if (bpReady) footMeta.push('<span style="color:#FDE68A;font-weight:800;">&#127897;&#65039; Wave ' + esc(th.wave || 1) + ' Queued</span>');
        var cardClsT = 'crp-ep-btn' + (hasAud ? '' : ' crp-atlas-only');
        return '<a href="https://drive.google.com/uc?export=download&amp;id=' + esc(ep.id) + '"' +
          (ep.gh ? ' data-gh-url="' + esc(ep.gh) + '"' : '') +
          ' data-ep-label="' + esc(ep.label) + '" data-sec="' + secIdx + '" data-kind="scientific-theory"' +
          ' data-stance="' + esc(th.stance) + '" data-wave="' + esc(th.wave || 2) + '"' +
          (bpReady || hasAud ? ' data-bp-ready="1"' : '') +
          (hasAud ? ' data-has-audio="1"' : ' data-atlas-only="1"') +
          ' data-theory-id="' + esc(ep.id) + '" data-search-extra="' + esc(searchBitsT.join(' ')) + '"' +
          ' class="' + cardClsT + '" style="border-left:3px solid ' + st.color + ';" role="button">' +
          '<span class="crp-ep-top">' +
            '<span class="crp-ep-ico" title="' + (hasAud ? 'Play Podcast' : 'Inspect Theory Dossier') + '">' + (hasAud ? '&#9654;' : '&#9878;') + '</span>' +
            '<span class="crp-ep-lbl">' + esc(th.canonical_title || partsT.head) + '</span>' +
            stanceBadgeHTML(th.stance, false) +
            (hasAud ? '<span class="crp-ep-cnt" style="display:none;"></span><span class="crp-ep-chk" role="checkbox" aria-checked="false" title="Mark as Listened">&#10003;</span>' : '') +
          '</span>' +
          (subT ? '<span class="crp-ep-sub">' + esc(subT) + '</span>' : '') +
          '<span class="crp-theory-foot">' +
            '<span class="crp-theory-meta">' + footMeta.join(' &middot; ') + '</span>' +
            '<button type="button" class="crp-theory-open-btn" data-open-theory="' + esc(ep.id) + '">&#128214; Dossier &amp; Papers</button>' +
          '</span>' +
          '</a>';
      }
      var kt = epKindAndTag(ep, secText);
      var ln = kt.lenses || { sog: false, oa: false, oag: false, enh: false, vice: false };
      var tagTxt = badgeLabel ? (badgeLabel + (kt.tag ? ' \u00b7 ' + kt.tag : '')) : kt.tag;
      var tag = tagTxt ? '<span class="crp-ep-tag" data-kind="' + esc(kt.kind) + '">' + esc(tagTxt) + '</span>' : '';
      var parts = splitEpLabel(ep && ep.label);
      if (!parts.sub && ep && ep.notes) {
        parts.sub = excerptFromNotes(ep.notes, 155);
      }
      var subHtml = parts.sub ? '<span class="crp-ep-sub">' + esc(parts.sub) + '</span>' : '';
      var pairedHtml = (ep && ep.pairedTitle)
        ? '<span class="crp-paired-line">&#9876;&#65039; Paired Debate &middot; Companion to &ldquo;' + esc(ep.pairedTitle) + '&rdquo;</span>'
        : '';
      var searchParts = [];
      if (ep && ep.pairedTitle) {
        searchParts.push(ep.pairedTitle);
      }
      if (ep && Array.isArray(ep.pdbs)) {
        ep.pdbs.forEach(function (p) { if (p && p.id) searchParts.push('PDB ' + p.id); });
      }
      if (ep && Array.isArray(ep.sources)) {
        ep.sources.slice(0, 4).forEach(function (s) {
          var st = typeof s === 'string' ? s : (s && s.title) || '';
          if (st) searchParts.push(st.slice(0, 48));
        });
      }
      var searchExtra = searchParts.length ? (' data-search-extra="' + esc(searchParts.join(' ')) + '"') : '';
      var cardCls = 'crp-ep-btn' + ((ep && ep.pairedTitle) ? ' crp-paired-debate-card' : '');
      return '<a href="https://drive.google.com/uc?export=download&amp;id=' + esc(ep.id) + '"' +
        (ep.gh ? ' data-gh-url="' + esc(ep.gh) + '"' : '') +
        ' data-ep-label="' + esc(ep.label) + '" data-sec="' + secIdx + '" data-kind="' + esc(kt.kind) + '"' +
        searchExtra +
        (ln.sog ? ' data-sog="1"' : '') + (ln.oa ? ' data-oa="1"' : '') + (ln.oag ? ' data-oag="1"' : '') + (ln.enh ? ' data-enh="1"' : '') + (ln.vice ? ' data-vice="1"' : '') +
        ' class="' + cardCls + '" role="button">' +
        '<span class="crp-ep-top"><span class="crp-ep-ico">&#9654;</span><span class="crp-ep-lbl">' + esc(parts.head) + '</span>' + tag +
        '<span class="crp-ep-cnt" style="display:none;"></span>' +
        '<span class="crp-ep-chk" role="checkbox" aria-checked="false" title="Mark as Listened">&#10003;</span></span>' +
        pairedHtml + subHtml + '</a>';
    }

    function buildHubHTML() {
      var secs = cfg.sections || [];
      var total = 0;
      var kindCounts = { 'deep-dive': 0, 'shoulders-of-giants': 0, 'one-angstrom': 0, 'one-angstrom-giants': 0, 'enhancement': 0, 'vice': 0, 'one-medicine': 0, 'clinical-cluster': 0, 'debate': 0 };
      var lensCounts = { sog: 0, oa: 0, oag: 0, enh: 0, vice: 0 };
      secs.forEach(function (s) {
        var secTxt = (s.pill || '') + ' ' + (s.heading || '');
        (s.episodes || []).forEach(function (ep) {
          total++;
          var kt = epKindAndTag(ep, secTxt);
          kindCounts[kt.kind] = (kindCounts[kt.kind] || 0) + 1;
          if (kt.lenses.sog) lensCounts.sog++;
          if (kt.lenses.oa) lensCounts.oa++;
          if (kt.lenses.oag) lensCounts.oag++;
          if (kt.lenses.enh) lensCounts.enh++;
          if (kt.lenses.vice) lensCounts.vice++;
        });
      });
      var synthCount = (kindCounts['deep-dive'] || 0) + (kindCounts['shoulders-of-giants'] || 0) + (kindCounts['one-angstrom'] || 0) + (kindCounts['one-angstrom-giants'] || 0) + (kindCounts['enhancement'] || 0) + (kindCounts['vice'] || 0);
      var longCount = total - (kindCounts['debate'] || 0);
      var longPct = total > 0 ? Math.round((longCount / total) * 100) : 100;
      var html = '<div id="crp-curated-audio-hub" style="width:100%;font-family:' + FONT + ';text-align:left;">';
      if (cfg.banner_html) html += cfg.banner_html;
      html += '<div id="crp-episode-filter-bar" style="width:100%;margin:0 auto 12px auto;padding:9px 12px;background:rgba(9,14,26,0.76);border:1px solid rgba(255,255,255,0.14);border-radius:12px;backdrop-filter:blur(12px);box-sizing:border-box;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;">';
      html += '<div style="display:flex;flex-wrap:wrap;gap:5px;align-items:center;">';
      html += '<button type="button" class="crp-sec-pill active" data-sec-idx="all">All (' + total + ')</button>';
      secs.forEach(function (s, i) {
        html += '<button type="button" class="crp-sec-pill" data-sec-idx="' + i + '">' + esc(s.pill || s.heading) + ' (' + (s.episodes || []).length + ')</button>';
      });
      html += '<button type="button" id="crp-done-filter-pill" class="crp-done-pill" title="Click to toggle hiding episodes you have already listened to">&#10003; 0 / ' + total + ' Listened</button>';
      html += '<a href="' + TOPICS_URL + '?hub=' + encodeURIComponent(HUB) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-sec-pill" style="text-decoration:none;border-color:rgba(244,114,182,0.55);color:#F9A8D4;font-weight:800;" title="Browse the Cross-Network Master Topic, Drug, 1-\u00c5ngstr\u00f6m PDB &amp; One-Medicine Index">&#128450;&#65039; Topic &amp; Drug Index</a>';
      html += '<a href="' + STUDIO_BASE + '/?view=listen&amp;hub=' + encodeURIComponent(HUB) + '" target="_blank" rel="noopener" data-no-player="true" class="crp-sec-pill" style="text-decoration:none;border-color:' + A + '88;color:' + A + ';font-weight:800;" title="Open standalone iPhone &amp; Android Pocket App (offline downloads, lock-screen playback &amp; full transcripts)">&#128241; Get Pocket App</a>';
      html += '</div><div style="position:relative;flex:1;min-width:190px;max-width:280px;"><input id="crp-ep-search" type="search" placeholder="Search ' + total + (IS_THEORY_ATLAS ? ' theories, assays, papers...' : ' episodes...') + '" aria-label="Search episodes" style="width:100%;padding:5px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.18);background:rgba(15,23,42,0.92);color:#F8FAFC;font-size:12px;outline:none;box-sizing:border-box;font-family:inherit;" /></div>';
      if (IS_THEORY_ATLAS) {
        var stCounts = {};
        var w1Count = 0;
        var audCount = 0;
        secs.forEach(function (s) {
          (s.episodes || []).forEach(function (ep) {
            if (ep && ep.theory) {
              stCounts[ep.theory.stance] = (stCounts[ep.theory.stance] || 0) + 1;
              if (ep.theory.podcast_status === 'blueprint-ready' || ep.theory.has_audio || ep.theory.wave === 1) w1Count++;
              if (ep.theory.has_audio || (ep.gh && ep.gh.length > 5)) audCount++;
            }
          });
        });
        html += '<div class="crp-fmt-bar"><span style="font-size:9.8px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-right:2px;">Epistemic Stance Filter:</span>';
        html += '<button type="button" class="crp-stance-pill active" data-stance-filter="all">All Theories (' + total + ')</button>';
        if (audCount > 0) {
          html += '<button type="button" class="crp-stance-pill" data-stance-filter="audio-live"><span class="crp-fmt-dot" style="background:#38BDF8;"></span>&#127911; Podcast Live (' + audCount + ')</button>';
        }
        if (w1Count > 0) {
          html += '<button type="button" class="crp-stance-pill" data-stance-filter="wave1"><span class="crp-fmt-dot" style="background:#FDE68A;"></span>&#127897;&#65039; Deep Dives Ready (' + w1Count + ')</button>';
        }
        STANCE_ORDER.forEach(function (sk) {
          var sm = getStanceInfo(sk);
          var c = stCounts[sk] || 0;
          if (c > 0) {
            html += '<button type="button" class="crp-stance-pill" data-stance-filter="' + sk + '" title="' + esc(sm.def) + '"><span class="crp-fmt-dot" style="background:' + sm.color + ';"></span>' + esc(sm.short) + ' (' + c + ')</button>';
          }
        });
        html += '<button type="button" id="crp-diag-toggle-btn" class="crp-stance-pill" style="margin-left:auto;border-color:#38BDF8;color:#BAE6FD;background:rgba(14,116,144,0.32);font-weight:800;" title="Paste any paper abstract or lab finding to uncover which theories it quietly tests">&#129514; Reverse-Diagnose a Paper</button>';
        html += '</div></div>';
        html += '<div id="crp-diag-panel">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:6px;">' +
            '<div><div style="font-size:10px;font-weight:800;color:#38BDF8;text-transform:uppercase;letter-spacing:0.07em;">Paper-to-Theory Reverse Diagnostic Engine</div>' +
            '<div style="font-size:14px;font-weight:800;color:#FFFFFF;">Paste a Paper Abstract, Title, or Study Finding (Even If It Never Names a Theory)</div></div>' +
            '<button type="button" id="crp-diag-close-btn" style="background:#1E293B;border:1px solid #334155;color:#CBD5E1;border-radius:8px;padding:3px 9px;font-size:15px;cursor:pointer;">&times;</button>' +
          '</div>' +
          '<div style="font-size:11.6px;color:#CBD5E1;margin-bottom:8px;">Most papers speak in assays, statistical metrics, and outcomes without naming the overarching theory they test. Paste text below to map stealth experimental fingerprints back to the competing theories &amp; rival predictions at stake.</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:5px;align-items:center;margin-bottom:7px;">' +
            '<span style="font-size:10.3px;font-weight:800;color:#94A3B8;">Try a real stealth abstract:</span>' +
            '<button type="button" class="crp-diag-sample" data-sample="0">Sterile Liver Injury &amp; HMGB1</button>' +
            '<button type="button" class="crp-diag-sample" data-sample="1">Metabolic Ward Keto vs Low-Fat</button>' +
            '<button type="button" class="crp-diag-sample" data-sample="2">Nuclear Foci, FRAP &amp; 1,6-Hexanediol</button>' +
            '<button type="button" class="crp-diag-sample" data-sample="3">5.4M Height GWAS &amp; Rare Exome Variants</button>' +
          '</div>' +
          '<textarea id="crp-diag-input" rows="3" placeholder="Paste an abstract, Methods/Results excerpt, or describe what your lab observed (e.g., We measured P3b and MEG gamma synchrony during a no-report binocular rivalry task...)" style="width:100%;padding:9px 11px;border-radius:10px;border:1px solid rgba(56,189,248,0.45);background:rgba(5,9,20,0.92);color:#F8FAFC;font-size:12.2px;font-family:inherit;box-sizing:border-box;outline:none;resize:vertical;"></textarea>' +
          '<div style="display:flex;align-items:center;gap:8px;margin-top:8px;">' +
            '<button type="button" id="crp-diag-run-btn" style="appearance:none;border:none;background:#38BDF8;color:#090E1A;font-size:12px;font-weight:900;padding:7px 15px;border-radius:999px;cursor:pointer;font-family:inherit;">&#128269; Diagnose Underlying Theories</button>' +
            '<button type="button" id="crp-diag-clear-btn" style="appearance:none;border:1px solid #334155;background:#131C31;color:#CBD5E1;font-size:11px;font-weight:700;padding:6px 12px;border-radius:999px;cursor:pointer;font-family:inherit;">Clear</button>' +
          '</div>' +
          '<div id="crp-diag-results"></div>' +
        '</div>';
      } else {
      html += '<div class="crp-fmt-bar"><span style="font-size:9.8px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-right:2px;">Format Legend &amp; Filter:</span>';
      html += '<button type="button" class="crp-fmt-pill active" data-fmt-filter="all" title="Show all episode formats">All Formats (' + total + ')</button>';
      if (kindCounts['debate'] > 0) {
        html += '<button type="button" class="crp-fmt-pill" data-fmt-filter="longform" title="Show only 45\u201390m long-form episodes (Deep Dive, Shoulders of Giants, One \u00c5ngstr\u00f6m, One Medicine &amp; Clinical Cluster)">&#9733; Long-Form Only (' + longCount + ' \u00b7 ' + longPct + '%)</button>';
      }
      if (synthCount > 0) {
        html += '<button type="button" class="crp-fmt-pill" data-fmt-filter="deep-dive" title="Deep Dive: 45\u201390m narrative &amp; primary-source clinical/scientific synthesis"><span class="crp-fmt-dot" style="background:' + A + ';"></span>Deep Dive \u2014 45\u201390m Synthesis (' + synthCount + ')</button>';
      }
      if (lensCounts.sog > 0) {
        html += '<button type="button" class="crp-fmt-pill" data-fmt-filter="shoulders-of-giants" title="Shoulders of Giants: Historical breakthroughs, primary experimental notebooks &amp; scientific pioneers"><span class="crp-fmt-dot" style="background:#F59E0B;"></span>&#127963;&#65039; Shoulders of Giants (' + lensCounts.sog + ')</button>';
      }
      if (lensCounts.oa > 0) {
        html += '<button type="button" class="crp-fmt-pill" data-fmt-filter="one-angstrom" title="One \u00c5ngstr\u00f6m: Atomic cryo-EM/X-ray PDB coordinates, binding pockets &amp; biophysical mechanisms"><span class="crp-fmt-dot" style="background:#2DD4BF;"></span>&#128300; One \u00c5ngstr\u00f6m \u00b7 PDB (' + lensCounts.oa + ')</button>';
      }
      if (lensCounts.oag > 0) {
        html += '<button type="button" class="crp-fmt-pill" data-fmt-filter="one-angstrom-giants" title="One-\u00c5ngstr\u00f6m Giants: Flagship synthesis uniting a scientific pioneer&#x27;s discovery directly with 1-\u00c5ngstr\u00f6m PDB atomic coordinates"><span class="crp-fmt-dot" style="background:#F472B6;"></span>&#9883;&#65039; One-\u00c5ngstr\u00f6m Giants (' + lensCounts.oag + ')</button>';
      }
      if (lensCounts.enh > 0) {
        html += '<button type="button" class="crp-fmt-pill" data-fmt-filter="enhancement" title="Human Enhancement \u00b7 No Free Lunch: 1-\u00c5ngstr\u00f6m biophysics &amp; physiological trade-offs of ergogenics, biohacking &amp; enhancement"><span class="crp-fmt-dot" style="background:#EF4444;"></span>&#9889; Enhancement \u00b7 No Free Lunch (' + lensCounts.enh + ')</button>';
      }
      if (lensCounts.vice > 0) {
        html += '<button type="button" class="crp-fmt-pill" data-fmt-filter="vice" title="Biology, Humor &amp; Vice: Barstool, casino &amp; street-economy myths unpacked at 1 \u00c5ngstr\u00f6m with PK/PD &amp; biostatistics"><span class="crp-fmt-dot" style="background:#A3E635;"></span>&#127922; Biology, Humor &amp; Vice (' + lensCounts.vice + ')</button>';
      }
      if (kindCounts['one-medicine'] > 0) {
        html += '<button type="button" class="crp-fmt-pill" data-fmt-filter="one-medicine" title="One Medicine: 60\u201390m comparative human &amp; veterinary physiology, real cases &amp; lab statistics"><span class="crp-fmt-dot" style="background:#38BDF8;"></span>One Medicine \u2014 Human + Vet Comparative (' + kindCounts['one-medicine'] + ')</button>';
      }
      if (kindCounts['clinical-cluster'] > 0) {
        html += '<button type="button" class="crp-fmt-pill" data-fmt-filter="clinical-cluster" title="Clinical Cluster: 60\u201390m multi-test bedside workups, assay physics &amp; behind-the-curtain statistics"><span class="crp-fmt-dot" style="background:#FBBF24;"></span>Clinical Cluster \u2014 Multi-Test &amp; Lab Stats (' + kindCounts['clinical-cluster'] + ')</button>';
      }
      if (kindCounts['debate'] > 0) {
        html += '<button type="button" class="crp-fmt-pill" data-fmt-filter="debate" title="Debate: 15\u201325m focused two-position methodological or clinical controversy"><span class="crp-fmt-dot" style="background:#C084FC;"></span>Debate \u2014 15\u201325m Controversy (' + kindCounts['debate'] + ')</button>';
      }
      html += '</div></div>';
      }
      html += '<div id="crp-net-search-wrap" style="display:none;margin:0 0 14px 0;"></div>';
      secs.forEach(function (s, i) {
        var eps = s.episodes || [];
        var secTxt = (s.pill || '') + ' ' + (s.heading || '');
        var countLbl = s.count_label || (eps.length + ' episode' + (eps.length === 1 ? '' : 's'));
        html += '<div class="crp-curated-sec" data-sec-block="' + i + '" id="' + esc(s.anchor || slugify(s.pill || s.heading)) + '-episodes">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin:8px 0 5px 0;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.12);">' +
          '<h2 style="margin:0;font-size:14.5px;font-weight:800;color:#FFFFFF;letter-spacing:-0.01em;">' + esc(s.heading) + '</h2>' +
          '<span style="font-size:10.5px;font-weight:700;color:#94A3B8;">' + esc(countLbl) + '</span></div><div class="crp-ep-grid">';
        eps.forEach(function (ep) { html += epButtonHTML(ep, i, '', secTxt); });
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
          var lbl = cards[i].getAttribute('data-ep-label') || (cards[i].querySelector('.crp-ep-lbl') || cards[i]).textContent || '';
          if (id === epParam || (wantSlug && slugify(lbl).indexOf(wantSlug) !== -1)) {
            targetCard = cards[i];
            break;
          }
        }
        if (targetCard) {
          var href2 = targetCard.getAttribute('href') || '';
          var m2 = href2.match(/id=([a-zA-Z0-9_-]+)/);
          if (m2 && m2[1]) {
            var lbl2 = (targetCard.getAttribute('data-ep-label') || (targetCard.querySelector('.crp-ep-lbl') || targetCard).textContent || '').trim();
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
          a.addEventListener('click', function () {
            stampCarrdLink(a);
            track('hub_nav_click', { target: a.getAttribute('data-nav-target') });
          });
        });
      }
      if (!document.getElementById('crp-author-cred-box')) {
        var auWrap = document.createElement('div');
        auWrap.innerHTML = buildAuthorBoxHTML();
        var auEl = auWrap.firstElementChild;
        var navRef = document.getElementById('crp-top-hub-nav');
        if (navRef && navRef.parentNode) navRef.parentNode.insertBefore(auEl, navRef);
        else parent.insertBefore(auEl, parent.firstChild);
      }

      if (!document.getElementById('crp-curated-audio-hub')) {
        var hubWrap = document.createElement('div');
        hubWrap.innerHTML = buildHubHTML();
        var hubEl = hubWrap.firstElementChild;
        if (subNode && subNode.nextSibling) parent.insertBefore(hubEl, subNode.nextSibling);
        else parent.appendChild(hubEl);

        refreshCardStates();

        var activeSec = 'all';
        var activeFmt = 'all';
        var activeStance = 'all';
        var query = '';
        var netExpanded = false;
        var blocks = hubEl.querySelectorAll('.crp-curated-sec');
        var netWrap = document.getElementById('crp-net-search-wrap');

        var renderNetworkMatches = function (qStr) {
          if (!netWrap) return;
          loadAllNetworkEpisodes().then(function (allOther) {
            if ((query || '').trim().toLowerCase() !== qStr) return;
            var matches = allOther.filter(function (item) {
              var pdbStr = Array.isArray(item.ep.pdbs) ? item.ep.pdbs.map(function (p) { return p.id || ''; }).join(' ') : '';
              var hay = (item.ep.label + ' ' + (item.ep.notes || '') + ' ' + pdbStr + ' ' + item.sec + ' ' + item.hubLabel).toLowerCase();
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
              var txt = ((btn.textContent || '') + ' ' + (btn.getAttribute('data-search-extra') || '')).toLowerCase();
              var hrefB = btn.getAttribute('href') || '';
              var mB = hrefB.match(/id=([a-zA-Z0-9_-]+)/);
              var doneOk = !hideListened || !(mB && mB[1] && isEpisodeDone(mB[1]));
              var bKind = btn.getAttribute('data-kind') || 'deep-dive';
              var isSynthKind = (bKind === 'deep-dive' || bKind === 'shoulders-of-giants' || bKind === 'one-angstrom' || bKind === 'one-angstrom-giants' || bKind === 'enhancement' || bKind === 'vice');
              var fmtOk = (activeFmt === 'all') ||
                (activeFmt === 'longform' && bKind !== 'debate') ||
                (activeFmt === 'deep-dive' && isSynthKind) ||
                (activeFmt === 'shoulders-of-giants' && btn.getAttribute('data-sog') === '1') ||
                (activeFmt === 'one-angstrom' && btn.getAttribute('data-oa') === '1') ||
                (activeFmt === 'one-angstrom-giants' && btn.getAttribute('data-oag') === '1') ||
                (activeFmt === 'enhancement' && btn.getAttribute('data-enh') === '1') ||
                (activeFmt === 'vice' && btn.getAttribute('data-vice') === '1') ||
                (bKind === activeFmt);
              var bStance = btn.getAttribute('data-stance') || '';
              var stanceOk = (!IS_THEORY_ATLAS || activeStance === 'all') ||
                (activeStance === 'audio-live' && btn.getAttribute('data-has-audio') === '1') ||
                (activeStance === 'wave1' && btn.getAttribute('data-bp-ready') === '1') ||
                (bStance === activeStance);
              var show = secMatch && doneOk && fmtOk && stanceOk && (!q || txt.indexOf(q) !== -1);
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
                '<button type="button" id="crp-expand-net-search" class="crp-mini-chip" style="color:' + A + ';border-color:' + A + '66;">&#127760; Search all ' + (net.feed_count || 12) + ' hubs' + (masterTotal ? ' (' + masterTotal + ' eps)' : '') + '</button></div>';
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
          hubEl.querySelectorAll('.crp-sec-pill[data-sec-idx]').forEach(function (x) {
            if (x.getAttribute('data-sec-idx') === String(idx)) x.classList.add('active'); else x.classList.remove('active');
          });
          activeSec = String(idx);
          applyFilter();
          if (fromUser && idx !== 'all') {
            var s = (cfg.sections || [])[+idx];
            track('section_filter', { section: s ? (s.pill || s.heading) : idx });
          }
        };
        hubEl.querySelectorAll('.crp-sec-pill[data-sec-idx]').forEach(function (p) {
          p.addEventListener('click', function () { activate(p.getAttribute('data-sec-idx') || 'all', true); });
        });
        hubEl.querySelectorAll('.crp-fmt-pill').forEach(function (fp) {
          fp.addEventListener('click', function () {
            var nextFmt = fp.getAttribute('data-fmt-filter') || 'all';
            activeFmt = nextFmt;
            hubEl.querySelectorAll('.crp-fmt-pill').forEach(function (x) {
              if (x.getAttribute('data-fmt-filter') === nextFmt) x.classList.add('active');
              else x.classList.remove('active');
            });
            applyFilter();
            track('format_filter', { format: nextFmt });
          });
        });
        hubEl.querySelectorAll('.crp-stance-pill[data-stance-filter]').forEach(function (spBtn) {
          spBtn.addEventListener('click', function () {
            var nextSt = spBtn.getAttribute('data-stance-filter') || 'all';
            activeStance = nextSt;
            hubEl.querySelectorAll('.crp-stance-pill[data-stance-filter]').forEach(function (x) {
              x.classList.toggle('active', x.getAttribute('data-stance-filter') === nextSt);
            });
            applyFilter();
            track('stance_filter', { stance: nextSt });
          });
        });
        var diagToggle = document.getElementById('crp-diag-toggle-btn');
        var diagPanel = document.getElementById('crp-diag-panel');
        var diagClose = document.getElementById('crp-diag-close-btn');
        var diagInput = document.getElementById('crp-diag-input');
        var diagRun = document.getElementById('crp-diag-run-btn');
        var diagClear = document.getElementById('crp-diag-clear-btn');
        var diagRes = document.getElementById('crp-diag-results');
        var DIAG_SAMPLES = [
          'Following hepatic ischemia-reperfusion in germ-free mice, necrotic hepatocytes released extracellular HMGB1, ATP, and monosodium urate crystals, driving NLRP3 inflammasome activation and CD80/CD86 dendritic cell maturation without any detectable bacterial LPS or pathogen infection.',
          'In an inpatient metabolic ward crossover study, adults consumed ad libitum either a minimally processed low-fat high-carbohydrate diet or an animal-based ketogenic diet. Despite higher postprandial glucose and insulin levels, participants on the low-fat diet consumed 689 kcal/day less and lost more body fat.',
          'Live-cell single-molecule tracking of RNA Pol II and transcription factor puncta inside nuclear foci showed rapid FRAP recovery and sensitivity to 1,6-hexanediol, yet dilute-phase concentration failed to buffer above c_sat and binding kinetics matched nonspecific DNA-scaffold recruitment.',
          'Meta-analysis of 5.4 million individuals identified 12,111 independent GWAS SNPs explaining SNP heritability across 21 percent of the genome, while 454,787 exome sequences pinpointed rare coding variants in skeletal growth-plate genes alongside pervasive trans-eQTL pleiotropy.'
        ];
        var DIAG_STOP = { the:1,and:1,for:1,with:1,from:1,that:1,this:1,into:1,were:1,was:1,are:1,have:1,has:1,had:1,not:1,but:1,all:1,can:1,our:1,their:1,they:1,which:1,when:1,where:1,more:1,less:1,than:1,study:1,paper:1,results:1,data:1,found:1,showed:1,shows:1,using:1,used:1,after:1,before:1,between:1,across:1,without:1,during:1,both:1,each:1,also:1,only:1,these:1,those:1,however:1,although:1,whereas:1,while:1 };
        var REFUTE_CUES = ['failed to','no significant difference','did not differ','vanished','absent','contradict','contrary to','challenges','refutes','mirage','artifact','collapsed','independent of','no decline','failed to replicate','not mediated','no advantage','violates','weak instrument','unlikely','insufficient','overturned'];
        var SUPPORT_CUES = ['confirmed','replicated','convergent','corroborated','demonstrated','outperformed','consistent with','validated','drove','increased','predicted by','sustained','selective sweep','significantly higher','persisted','buffering'];
        function stemLite(w) {
          if (!w || w.length <= 5) return w;
          var sufs = ['ations','ation','ities','ingly','ments','ment','ness','ings','ing','ied','ies','ed','es','ly'];
          for (var i = 0; i < sufs.length; i++) {
            var s = sufs[i];
            if (w.length - s.length >= 4 && w.slice(-s.length) === s) return w.slice(0, -s.length);
          }
          if (w.slice(-1) === 's' && w.slice(-2) !== 'ss' && w.length > 5) return w.slice(0, -1);
          return w;
        }
        var diagFieldCache = null;
        function buildDiagFieldCache() {
          if (diagFieldCache) return diagFieldCache;
          var dcfg = cfg.diag_config || {};
          var idfMap = dcfg.idf || {};
          var domStealth = dcfg.domain_stealth || {};
          diagFieldCache = [];
          (cfg.sections || []).forEach(function (sec, sIdx) {
            var dTerms = domStealth[String(sIdx + 1)] || [];
            (sec.episodes || []).forEach(function (ep) {
              if (!ep || !ep.theory) return;
              var th = ep.theory;
              var mkSet = function (txt) {
                var set = {};
                (String(txt || '').toLowerCase().match(/[a-z0-9][a-z0-9_+-]{2,}/g) || []).forEach(function (t) { set[stemLite(t)] = true; });
                return set;
              };
              diagFieldCache.push({
                ep: ep,
                th: th,
                domTerms: dTerms,
                fFals: mkSet(th.falsification_criteria || ''),
                fBlind: mkSet((th.common_paper_blindspot || '') + ' ' + (th.rivals || []).join(' ')),
                fCore: mkSet((ep.label || '') + ' ' + (th.core_claim || '') + ' ' + (th.verdict_2026 || '')),
                fSrc: mkSet((ep.sources || []).map(function (s) { return s && s.title ? s.title : ''; }).join(' '))
              });
            });
          });
          diagFieldCache._idf = idfMap;
          diagFieldCache._syn = dcfg.synonyms || {};
          return diagFieldCache;
        }
        function runReverseDiagnosis() {
          if (!diagInput || !diagRes) return;
          var raw = (diagInput.value || '').trim();
          if (raw.length < 10) {
            diagRes.innerHTML = '<div style="margin-top:8px;font-size:11.8px;color:#FDE68A;">Paste at least a sentence describing the study, assays, or findings to diagnose matching theories.</div>';
            return;
          }
          var cache = buildDiagFieldCache();
          var idfMap = cache._idf || {};
          var synMap = cache._syn || {};
          var low = raw.toLowerCase();
          var rawToks = (low.match(/[a-z0-9][a-z0-9_+-]{2,}/g) || []).filter(function (w) { return !DIAG_STOP[w]; });
          var expPhrases = [];
          var seenRaw = {};
          rawToks.forEach(function (w) {
            if (!seenRaw[w]) {
              seenRaw[w] = true;
              if (synMap[w]) expPhrases = expPhrases.concat(synMap[w]);
            }
          });
          Object.keys(synMap).forEach(function (sk) {
            var vals = synMap[sk] || [];
            for (var i = 0; i < vals.length; i++) {
              if (vals[i].length >= 4 && low.indexOf(vals[i]) !== -1) { expPhrases.push(sk); break; }
            }
          });
          var enrichedLow = low + ' ' + expPhrases.join(' ');
          var allToks = (enrichedLow.match(/[a-z0-9][a-z0-9_+-]{2,}/g) || []).filter(function (w) { return !DIAG_STOP[w]; });
          var uniqToks = [];
          var tSeen = {};
          allToks.forEach(function (w) { if (!tSeen[w]) { tSeen[w] = true; uniqToks.push(w); } });
          var negHits = REFUTE_CUES.filter(function (c) { return low.indexOf(c) !== -1; });
          var posHits = SUPPORT_CUES.filter(function (c) { return low.indexOf(c) !== -1; });
          var scored = [];
          cache.forEach(function (entry) {
            var ep = entry.ep;
            var th = entry.th;
            var score = 0;
            var matchedClues = [];
            var clueSeen = {};
            var addClue = function (c, pts) {
              score += pts;
              var cl = String(c).toLowerCase();
              if (!clueSeen[cl]) { clueSeen[cl] = true; matchedClues.push(c); }
            };
            (th.stealth_terms || []).forEach(function (phrase) {
              var pl = String(phrase).toLowerCase();
              if (pl.length >= 3 && enrichedLow.indexOf(pl) !== -1) {
                var mult = (low.indexOf(pl) !== -1) ? 1.0 : 0.65;
                var pToks = pl.match(/[a-z0-9][a-z0-9_+-]{2,}/g) || [];
                var maxIdf = 3.2;
                pToks.forEach(function (pt) { if (idfMap[pt] && idfMap[pt] > maxIdf) maxIdf = idfMap[pt]; });
                addClue(phrase, (pl.indexOf(' ') !== -1 ? 5.2 : 3.4) * (0.7 + 0.35 * maxIdf) * mult);
              }
            });
            (th.keywords || []).forEach(function (kw) {
              var kl = String(kw).toLowerCase();
              if (kl.length >= 3 && enrichedLow.indexOf(kl) !== -1) {
                var mult = (low.indexOf(kl) !== -1) ? 1.0 : 0.6;
                addClue(kw, (kl.indexOf(' ') !== -1 ? 4.2 : 2.6) * mult);
              }
            });
            uniqToks.forEach(function (tok) {
              var idf = idfMap[tok] !== undefined ? idfMap[tok] : 2.5;
              if (idf < 1.1) return;
              var st = stemLite(tok);
              var wt = entry.fFals[st] ? 2.1 : (entry.fBlind[st] ? 1.8 : (entry.fCore[st] ? 1.4 : (entry.fSrc[st] ? 1.2 : 0)));
              if (wt > 0) {
                score += 0.55 * idf * wt;
                if (matchedClues.length < 9 && tok.length >= 4 && !clueSeen[tok]) { clueSeen[tok] = true; matchedClues.push(tok); }
              }
            });
            if (score >= 6.0 && entry.domTerms.length) {
              var dBoost = 0;
              entry.domTerms.forEach(function (dt) { if (low.indexOf(dt) !== -1) dBoost += 1.6; });
              score += Math.min(4.5, dBoost);
            }
            if (score >= 10.0) {
              var suppM = (th.support_markers || []).filter(function (m) { return low.indexOf(m) !== -1; });
              var refM = (th.refute_markers || []).filter(function (m) { return low.indexOf(m) !== -1; });
              var sSc = 2.0 * suppM.length + 0.6 * posHits.length;
              var rSc = 2.2 * refM.length + 0.8 * negHits.length;
              var dirLbl = 'Adjudicates Competing Predictions (Inspect Directional Result)';
              var dirCol = '#FDE68A';
              if (rSc > sSc + 0.8) { dirLbl = 'Provisional Direction: Likely Challenges / Refutes Theory A (Favors Rival)'; dirCol = '#FDA4AF'; }
              else if (sSc > rSc + 0.8) { dirLbl = 'Provisional Direction: Likely Supports Primary Theory'; dirCol = '#6EE7B7'; }
              scored.push({ score: score, ep: ep, th: th, clues: matchedClues.slice(0, 8), dirLbl: dirLbl, dirCol: dirCol });
            }
          });
          scored.sort(function (a, b) { return b.score - a.score; });
          if (!scored.length) {
            diagRes.innerHTML = '<div style="margin-top:9px;padding:10px 12px;border-radius:10px;background:rgba(15,23,42,0.85);color:#CBD5E1;font-size:12px;">No high-confidence signature match yet — try including specific experimental assays, biomarkers, interventions, or statistical outcomes from the paper.</div>';
            return;
          }
          var top = scored.slice(0, 4);
          var maxSc = Math.max(top[0].score, 25);
          var out = '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:10px;">' +
            '<span style="font-size:10.5px;font-weight:800;color:#7DD3FC;text-transform:uppercase;letter-spacing:0.06em;">BM25 + Assay-Signature Diagnosis: Top ' + top.length + ' Theories Silently Tested</span>' +
            '<button type="button" id="crp-diag-export-all" class="crp-theory-open-btn" style="border-color:rgba(251,191,36,0.55);color:#FDE68A;background:rgba(120,53,15,0.40);">&#9876;&#65039; Copy Head-to-Head Study Spec (JSON + AI Prompt)</button>' +
          '</div>';
          top.forEach(function (m, idx) {
            var st = getStanceInfo(m.th.stance);
            var titleH = m.th.canonical_title || splitEpLabel(m.ep.label).head;
            var confPct = Math.min(99, Math.round((m.score / maxSc) * 100));
            var h2 = m.th.head_to_head || {};
            out += '<div class="crp-diag-res-card" style="border-left:3px solid ' + st.color + ';">' +
              '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:5px;">' +
                '<div style="font-size:13.2px;font-weight:800;color:#FFFFFF;flex:1;">#' + (idx + 1) + ' ' + esc(titleH) + ' <span style="font-size:10.5px;font-weight:700;color:#7DD3FC;">(' + confPct + '% fit &middot; BM25 ' + m.score.toFixed(1) + ')</span></div>' +
                '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                  stanceBadgeHTML(m.th.stance, false) +
                  '<button type="button" class="crp-theory-open-btn" data-diag-open="' + esc(m.ep.id) + '">&#128214; Full Dossier &amp; Papers</button>' +
                '</div>' +
              '</div>' +
              '<div style="font-size:11px;font-weight:800;color:' + m.dirCol + ';margin-bottom:5px;">&#129517; ' + esc(m.dirLbl) + '</div>' +
              '<div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;margin-bottom:6px;">' +
                '<span style="font-size:10px;font-weight:800;color:#94A3B8;">Matched signals:</span>' +
                m.clues.map(function (c) { return '<span class="crp-stealth-pill" style="border-color:#38BDF866;color:#BAE6FD;">' + esc(c) + '</span>'; }).join('') +
              '</div>' +
              (m.th.stealth_support ? '<div style="font-size:11.3px;color:#A7F3D0;line-height:1.42;margin-bottom:3px;"><strong>&#10003; Supports if:</strong> ' + esc(m.th.stealth_support) + '</div>' : '') +
              (m.th.stealth_refute ? '<div style="font-size:11.3px;color:#FECDD3;line-height:1.42;margin-bottom:4px;"><strong>&#10007; Challenges / Refutes if:</strong> ' + esc(m.th.stealth_refute) + '</div>' : '') +
              (h2.minimum_decisive_protocol ? '<div style="font-size:11.2px;color:#FDE68A;line-height:1.42;padding-top:4px;border-top:1px solid rgba(255,255,255,0.08);"><strong>&#9876;&#65039; Next Head-to-Head Test:</strong> ' + esc(h2.minimum_decisive_protocol) + '</div>' : '') +
            '</div>';
          });
          diagRes.innerHTML = out;
          diagRes.querySelectorAll('[data-diag-open]').forEach(function (b) {
            b.addEventListener('click', function () { openTheoryModal(b.getAttribute('data-diag-open')); });
          });
          var expAll = document.getElementById('crp-diag-export-all');
          if (expAll) {
            expAll.addEventListener('click', function () {
              var payload = {
                input_study_excerpt: raw,
                matched_theories: top.map(function (m) {
                  return {
                    code: m.th.code,
                    title: splitEpLabel(m.ep.label).head,
                    stance_2026: m.th.stance_label,
                    bm25_score: Number(m.score.toFixed(2)),
                    provisional_direction: m.dirLbl,
                    matched_clues: m.clues,
                    rivals: m.th.rivals || [],
                    head_to_head_design: m.th.head_to_head || {},
                    verified_papers: (m.ep.sources || []).map(function (s) { return { role: s.role, link_type: s.link_type || 'direct', test_proximity: normalizeTestProximity(s), title: s.title, url: s.url || s.doiUrl || '' }; })
                  };
                })
              };
              var brief = 'ADVERSARIAL HEAD-TO-HEAD EXPERIMENTAL DESIGN PROMPT\n' +
                'Using the pasted study and the BM25-matched competing scientific theories below, propose a concrete, pre-registered head-to-head study protocol that resolves the conflict between Theory A and Rival B while neutralizing the listed confounder traps.\n\n' +
                JSON.stringify(payload, null, 2);
              if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(brief).catch(function () {});
              expAll.textContent = '✓ Head-to-Head Brief Copied!';
              setTimeout(function () { expAll.innerHTML = '&#9876;&#65039; Copy Head-to-Head Study Spec (JSON + AI Prompt)'; }, 2200);
            });
          }
          track('theory_reverse_diagnose', { top_code: top[0].th.code || '', match_count: scored.length });
        }
        if (diagToggle && diagPanel) {
          diagToggle.addEventListener('click', function () {
            var vis = diagPanel.style.display === 'block';
            diagPanel.style.display = vis ? 'none' : 'block';
            diagToggle.classList.toggle('active', !vis);
          });
        }
        if (diagClose && diagPanel) {
          diagClose.addEventListener('click', function () {
            diagPanel.style.display = 'none';
            if (diagToggle) diagToggle.classList.remove('active');
          });
        }
        if (diagRun) diagRun.addEventListener('click', runReverseDiagnosis);
        if (diagClear && diagInput && diagRes) {
          diagClear.addEventListener('click', function () { diagInput.value = ''; diagRes.innerHTML = ''; });
        }
        hubEl.querySelectorAll('.crp-diag-sample').forEach(function (sb) {
          sb.addEventListener('click', function () {
            var idx = parseInt(sb.getAttribute('data-sample') || '0', 10);
            if (diagInput && DIAG_SAMPLES[idx]) {
              diagInput.value = DIAG_SAMPLES[idx];
              runReverseDiagnosis();
            }
          });
        });
        var sIn = document.getElementById('crp-ep-search');
        theorySearchJumpRef = function (rq) {
          if (!rq) return;
          activeSec = 'all';
          activeStance = 'all';
          hubEl.querySelectorAll('.crp-sec-pill[data-sec-idx]').forEach(function (x) {
            x.classList.toggle('active', x.getAttribute('data-sec-idx') === 'all');
          });
          hubEl.querySelectorAll('.crp-stance-pill').forEach(function (x) {
            x.classList.toggle('active', x.getAttribute('data-stance-filter') === 'all');
          });
          if (sIn) {
            sIn.value = rq;
            query = rq;
            applyFilter();
            try { sIn.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
          }
        };
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
              var urlLens = (sp.get('lens') || sp.get('fmt') || sp.get('format') || '').trim().toLowerCase();
              if (urlLens === 'enh' || urlLens === 'no-free-lunch') urlLens = 'enhancement';
              if (urlLens) {
                var targetPill = hubEl.querySelector('.crp-fmt-pill[data-fmt-filter="' + urlLens.replace(/[^a-z0-9-]/g, '') + '"]');
                if (targetPill) {
                  activeFmt = targetPill.getAttribute('data-fmt-filter') || 'all';
                  hubEl.querySelectorAll('.crp-fmt-pill').forEach(function (x) {
                    if (x === targetPill) x.classList.add('active');
                    else x.classList.remove('active');
                  });
                }
              }
              if (urlQ) {
                sIn.value = urlQ;
                query = urlQ;
              }
              var urlStance = (sp.get('stance') || '').trim().toLowerCase();
              if (urlStance && IS_THEORY_ATLAS) {
                var stPill = hubEl.querySelector('.crp-stance-pill[data-stance-filter="' + urlStance.replace(/[^a-z0-9-]/g, '') + '"]');
                if (stPill) {
                  activeStance = stPill.getAttribute('data-stance-filter') || 'all';
                  hubEl.querySelectorAll('.crp-stance-pill').forEach(function (x) { x.classList.toggle('active', x === stPill); });
                }
              }
              if (urlQ || urlLens || urlStance) {
                applyFilter();
              }
              var urlTheory = (sp.get('theory') || '').trim();
              if (urlTheory && IS_THEORY_ATLAS) {
                setTimeout(function () { openTheoryModal(urlTheory); }, 180);
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
      if (u.indexOf('yorek-cancer-ai-primer') !== -1) return 'Seizure Transcriptomics Workbench';
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
            if (e.target && e.target.closest && e.target.closest('.crp-ep-cnt')) {
              recordEpisodeCompletedPlay(match[1]);
              return;
            }
            if (IS_THEORY_ATLAS && e.target && e.target.closest && e.target.closest('.crp-theory-open-btn')) {
              openTheoryModal(match[1]);
              return;
            }
            if (IS_THEORY_ATLAS && (link.getAttribute('data-atlas-only') === '1' || match[1].indexOf('atlas-') === 0)) {
              openTheoryModal(match[1]);
              return;
            }
            if (e.target && e.target.closest && e.target.closest('.crp-ep-chk')) {
              toggleEpisodeDone(match[1], undefined, !!(e && e.shiftKey));
              return;
            }
            var fullAttr = link.getAttribute('data-ep-label');
            var lblEl = link.querySelector('.crp-ep-lbl');
            var text = fullAttr ? fullAttr.trim() : (lblEl ? lblEl.textContent.trim() : (link.innerText || link.textContent || '').trim());
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
    window.__crpOpenTheoryModal = openTheoryModal;
    window.CRP_HUB_INFO = { hub: HUB, version: PLAYER_VERSION, episodes: (cfg.sections || []).reduce(function (n, s) { return n + (s.episodes || []).length; }, 0) };
  }
})();
