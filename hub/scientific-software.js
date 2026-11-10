/*! Standalone Carrd App Bundle (scientific-software) */
(function () {
  'use strict';
  if (window.__crpStandaloneAppLoaded_scientific_software) return;
  window.__crpStandaloneAppLoaded_scientific_software = true;
  function mountShell() {
    if (!document.getElementById('carrd-resonance-player')) {
      var wrap = document.createElement('div');
      wrap.id = 'crp-standalone-shell-scientific-software';
      wrap.innerHTML = "<style> html{font-size:16px !important} .site-main>.inner,#main>.inner{width:min(94vw,1100px) !important;max-width:1100px !important;padding:32px 28px 145px 28px !important} #crp-standalone-estudia-wrapper,#crp-standalone-phys-wrapper{width:100% !important;max-width:1044px !important} #text02, #text08, #divider04, #divider01, #text04, #buttons03, #divider02, #text06, #buttons04, #divider05 { display: none !important; } .crp-hub-pill { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); } .crp-hub-pill:hover { transform: translateY(-1px); border-color: #38BDF8 !important; background: rgba(30, 41, 59, 0.9) !important; box-shadow: 0 4px 14px rgba(0,0,0,0.35); } .phys-cat-pill { display: inline-flex; align-items: center; gap: 5px; padding: 7px 15px; border-radius: 999px; font-size: 12px; font-weight: 700; cursor: pointer; color: #CBD5E1; background: rgba(15,23,42,0.85); border: 1px solid rgba(255,255,255,0.16); transition: all 0.18s ease; font-family: inherit; } .phys-cat-pill:hover { border-color: #C084FC; color: #FFFFFF; } .phys-cat-pill.active { background: rgba(192,132,252,0.25); color: #F5D0FE; border-color: #C084FC; box-shadow: 0 0 16px rgba(192,132,252,0.4); } .phys-proto-card { background: rgba(15,23,42,0.92); border: 1px solid rgba(255,255,255,0.14); border-radius: 16px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; } .phys-proto-card:hover { transform: translateY(-2px); border-color: rgba(192,132,252,0.7); box-shadow: 0 14px 32px rgba(0,0,0,0.5), 0 0 22px rgba(192,132,252,0.16); } .phys-btn-dl { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; text-decoration: none !important; color: #090E1A !important; background: linear-gradient(135deg, #38BDF8 0%, #C084FC 100%); border: none; cursor: pointer; transition: opacity 0.18s ease, transform 0.18s ease; } .phys-btn-dl:hover { opacity: 0.94; transform: scale(1.02); } .phys-btn-info { display: inline-flex; align-items: center; justify-content: center; gap: 5px; padding: 8px 12px; border-radius: 10px; font-size: 12px; font-weight: 600; color: #E2E8F0; background: rgba(30,41,59,0.85); border: 1px solid #475569; cursor: pointer; transition: border-color 0.18s ease, color 0.18s ease; } .phys-btn-info:hover { border-color: #38BDF8; color: #38BDF8; } .crp-hub-pill { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); } .crp-hub-pill:hover { transform: translateY(-1px); border-color: #C084FC !important; background: rgba(30, 41, 59, 0.92) !important; box-shadow: 0 4px 14px rgba(0,0,0,0.35); } .crp-spd-btn { appearance: none; border: 1px solid #334155; background: #131C31; color: #CBD5E1; font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 7px; cursor: pointer; line-height: 1.1; font-family: inherit; transition: all 0.15s ease; } .crp-spd-btn:hover { border-color: #C084FC; color: #FFFFFF; } .crp-spd-btn.active { background: #C084FC; color: #090E1A; border-color: #C084FC; box-shadow: 0 0 12px #C084FC66; } .crp-ctrl-btn { appearance: none; border: 1px solid #334155; background: #131C31; color: #E2E8F0; font-size: 11.5px; font-weight: 700; padding: 6px 10px; border-radius: 9px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-family: inherit; transition: all 0.15s ease; } .crp-ctrl-btn:hover { border-color: #C084FC; color: #FFFFFF; background: #1E293B; } #crp-seek { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 999px; background: #1E293B; outline: none; cursor: pointer; margin: 0; } #crp-seek::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #C084FC; border: 2px solid #FFFFFF; box-shadow: 0 0 10px #C084FC; cursor: pointer; } #crp-seek::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: #C084FC; border: 2px solid #FFFFFF; box-shadow: 0 0 10px #C084FC; cursor: pointer; } .crp-playing-card { border-color: #C084FC !important; box-shadow: 0 0 0 2px #C084FC66, 0 12px 28px rgba(0,0,0,0.5) !important; background: rgba(30, 41, 59, 0.95) !important; } </style><div id=\"carrd-resonance-player\" style=\"display:none;position:fixed;bottom:16px;left:50%;transform:translateX(-50%);width:95%;max-width:680px;background:rgba(9,14,26,0.97);border:1px solid #C084FC99;box-shadow:0 24px 60px rgba(0,0,0,0.92),0 0 38px #C084FC40;border-radius:20px;padding:13px 16px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F1F5F9;backdrop-filter:blur(22px);box-sizing:border-box;-webkit-font-smoothing:antialiased;\"> <div style=\"display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:9px;\"> <div style=\"display:flex;align-items:center;gap:9px;overflow:hidden;flex:1;\"> <div id=\"crp-pulse\" style=\"width:9px;height:9px;border-radius:50%;background:#10B981;box-shadow:0 0 10px #10B981;flex-shrink:0;\"></div> <div style=\"overflow:hidden;flex:1;\"> <div id=\"crp-title\" style=\"font-size:13.5px;font-weight:800;color:#FFFFFF;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;\">Select an episode</div> <div style=\"display:flex;align-items:center;gap:8px;font-size:10.5px;color:#94A3B8;font-weight:600;\"> <span id=\"crp-status-text\">Variable-Speed Stream</span> <button id=\"crp-restart-chip\" type=\"button\" style=\"display:none;background:rgba(16,185,129,0.16);border:1px solid rgba(16,185,129,0.45);color:#34D399;border-radius:999px;padding:1px 7px;font-size:10px;font-weight:700;cursor:pointer;\">&#8634; Start Over</button> </div> </div> </div> <div style=\"display:flex;align-items:center;gap:5px;flex-shrink:0;\"> <button id=\"crp-mode-btn\" type=\"button\" title=\"Switch between variable-speed player and Google Drive iframe backup player\" style=\"font-size:10px;font-weight:600;color:#94A3B8;background:#131C31;border:1px solid #334155;padding:4px 7px;border-radius:6px;cursor:pointer;\">Backup Player</button> <a id=\"crp-dl-link\" href=\"#\" target=\"_blank\" rel=\"noreferrer\" data-no-player=\"true\" title=\"Download original .m4a file\" style=\"font-size:10px;font-weight:600;color:#CBD5E1;text-decoration:none;background:#131C31;border:1px solid #334155;padding:4px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:3px;\">&#10515; Save</a> <a id=\"crp-studio-link\" href=\"https://ais-dev-v3n3vsl4pvdlmev4vcfv5b-514995804668.us-west1.run.app\" target=\"_blank\" rel=\"noreferrer\" title=\"Open interactive synchronized transcript studio\" style=\"font-size:10px;font-weight:800;color:#090E1A;background:#C084FC;text-decoration:none;padding:4px 9px;border-radius:6px;display:inline-flex;align-items:center;gap:3px;box-shadow:0 0 12px #C084FC55;\">Transcript &#8599;</a> <button id=\"crp-close-btn\" type=\"button\" aria-label=\"Close Player\" title=\"Close\" style=\"background:transparent;border:none;color:#94A3B8;cursor:pointer;font-size:20px;line-height:1;padding:2px 5px;margin-left:1px;\">&times;</button> </div> </div> <div id=\"crp-native-wrap\" style=\"background:#050914;border:1px solid #1E293B;border-radius:14px;padding:11px 13px;\"> <audio id=\"crp-audio-el\" crossorigin=\"anonymous\" preload=\"metadata\" style=\"display:none;\"></audio> <div style=\"display:flex;align-items:center;gap:10px;margin-bottom:10px;\"> <span id=\"crp-time-cur\" style=\"font-size:11.5px;font-variant-numeric:tabular-nums;color:#E2E8F0;font-weight:700;min-width:42px;\">0:00</span> <input id=\"crp-seek\" type=\"range\" min=\"0\" max=\"1000\" value=\"0\" step=\"1\" aria-label=\"Seek timeline\" /> <span id=\"crp-time-tot\" style=\"font-size:11.5px;font-variant-numeric:tabular-nums;color:#94A3B8;font-weight:600;min-width:42px;text-align:right;\">--:--</span> </div> <div style=\"display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;\"> <div style=\"display:flex;align-items:center;gap:7px;\"> <button id=\"crp-rew-btn\" type=\"button\" class=\"crp-ctrl-btn\" title=\"Rewind 15 seconds\">&#8630; 15s</button> <button id=\"crp-play-btn\" type=\"button\" aria-label=\"Play or Pause\" style=\"width:38px;height:38px;border-radius:50%;border:none;background:#C084FC;color:#090E1A;font-size:15px;font-weight:900;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 0 16px #C084FC70;\">&#9654;</button> <button id=\"crp-fwd-btn\" type=\"button\" class=\"crp-ctrl-btn\" title=\"Skip forward 30 seconds\">30s &#8631;</button> <span id=\"crp-rem-badge\" style=\"font-size:10.5px;color:#64748B;font-weight:600;font-variant-numeric:tabular-nums;margin-left:2px;\"></span> </div> <div style=\"display:flex;align-items:center;gap:4px;flex-wrap:wrap;\"> <span style=\"font-size:10px;font-weight:800;color:#64748B;text-transform:uppercase;letter-spacing:0.05em;margin-right:2px;\">Speed</span> <button type=\"button\" class=\"crp-spd-btn\" data-spd-step=\"-0.1\" title=\"Slower (-0.1x)\">&minus;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1\">1&times;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.25\">1.25&times;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.5\">1.5&times;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd=\"1.75\">1.75&times;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd=\"2\">2&times;</button> <button type=\"button\" class=\"crp-spd-btn\" data-spd-step=\"0.1\" title=\"Faster (+0.1x)\">+</button> <span id=\"crp-spd-readout\" style=\"font-size:11px;font-weight:800;color:#C084FC;min-width:34px;text-align:center;font-variant-numeric:tabular-nums;\">1.0&times;</span> </div> </div> </div> <div id=\"crp-fallback-wrap\" style=\"display:none;width:100%;height:132px;border-radius:12px;overflow:hidden;background:#030712;border:1px solid #1E293B;position:relative;\"> <iframe id=\"crp-stream-frame\" src=\"about:blank\" style=\"width:100%;height:132px;border:none;display:block;\" allow=\"autoplay\" loading=\"lazy\"></iframe> </div></div><div id=\"phys-protocol-modal\" style=\"display:none;position:fixed;inset:0;background:rgba(3,7,18,0.85);backdrop-filter:blur(10px);z-index:1000000;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;\"> <div style=\"width:100%;max-width:680px;background:#090E1A;border:1px solid #C084FC88;border-radius:20px;padding:24px;box-shadow:0 25px 70px rgba(0,0,0,0.9),0 0 40px rgba(192,132,252,0.25);color:#F8FAFC;max-height:88vh;overflow-y:auto;\"> <div style=\"display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;\"> <div> <div id=\"phys-modal-badge\" style=\"font-size:10.5px;font-weight:800;color:#C084FC;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;\">Software Suite Details</div> <h3 id=\"phys-modal-title\" style=\"margin:0;font-size:20px;font-weight:800;color:#FFFFFF;\">Protocol Name</h3> </div> <button id=\"phys-modal-close\" type=\"button\" style=\"background:#1E293B;border:1px solid #334155;color:#CBD5E1;border-radius:8px;padding:4px 10px;font-size:16px;cursor:pointer;\">&times;</button> </div> <p id=\"phys-modal-desc\" style=\"font-size:13.5px;line-height:1.6;color:#CBD5E1;margin:0 0 14px 0;\"></p> <div style=\"background:rgba(15,23,42,0.95);border:1px solid #334155;border-radius:12px;padding:12px 14px;margin-bottom:12px;\"> <div style=\"font-size:11px;font-weight:800;color:#38BDF8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;\">Included Scripts &amp; Artifacts</div> <div id=\"phys-modal-files\" style=\"font-family:monospace;font-size:12px;color:#E2E8F0;line-height:1.65;\"></div> </div> <div style=\"background:rgba(15,23,42,0.95);border:1px solid rgba(16,185,129,0.4);border-radius:12px;padding:12px 14px;margin-bottom:16px;\"> <div style=\"font-size:11px;font-weight:800;color:#34D399;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;\">Scientific &amp; Code Parity Details</div> <div id=\"phys-modal-python\" style=\"font-size:12.5px;color:#CBD5E1;line-height:1.55;\"></div> </div> <div style=\"display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end;\"> <a id=\"phys-modal-dl\" href=\"#\" target=\"_blank\" rel=\"noopener\" data-no-player=\"true\" class=\"phys-btn-dl\" download>&#11015; Download Archive (.zip)</a> <a href=\"https://aistudio.google.com/apps/fa16bbda-602f-48d3-b388-aba63404b252?showPreview=true&showAssistant=true\" target=\"_blank\" rel=\"noopener\" class=\"phys-btn-info\" style=\"text-decoration:none;\">&#128640; Open AI Studio Workbench &#8599;</a> </div> </div></div>\n<div id=\"crp-rss-modal\" style=\"display:none;position:fixed;inset:0;background:rgba(3,7,18,0.84);backdrop-filter:blur(9px);z-index:1000001;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-align:left;\">\n <div style=\"width:100%;max-width:560px;background:#090E1A;border:1px solid #C084FC88;border-radius:20px;padding:22px;box-shadow:0 25px 70px rgba(0,0,0,0.92);color:#F8FAFC;\">\n <div style=\"display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px;\">\n <div>\n <div style=\"font-size:10.5px;font-weight:800;color:#C084FC;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;\">Subscribe in Any Podcast App</div>\n <h3 style=\"margin:0;font-size:19px;font-weight:800;color:#FFFFFF;\">Deep Dive Podcast RSS Feeds</h3>\n </div>\n <button id=\"crp-rss-modal-close\" type=\"button\" style=\"background:#1E293B;border:1px solid #334155;color:#CBD5E1;border-radius:8px;padding:3px 9px;font-size:16px;cursor:pointer;\">&times;</button>\n </div>\n <p style=\"font-size:12.5px;color:#CBD5E1;line-height:1.5;margin:0 0 14px 0;\">\n Listen offline with variable-speed playback in <strong>Apple Podcasts</strong>, <strong>Overcast</strong>, <strong>Pocket Casts</strong>, or any RSS podcast player.\n </p>\n <div style=\"background:rgba(15,23,42,0.95);border:1px solid #C084FC55;border-radius:12px;padding:12px;margin-bottom:10px;\">\n <div style=\"font-size:11px;font-weight:800;color:#C084FC;margin-bottom:6px;\">This Hub's Feed (Deep Dive Network)</div>\n <div style=\"display:flex;flex-wrap:wrap;gap:6px;margin-bottom:7px;\">\n <a href=\"podcast://yorekms.github.io/deep-dive-podcasts/feed.xml\" class=\"crp-ctrl-btn\" style=\"background:#C084FC;color:#090E1A;border-color:#C084FC;text-decoration:none;font-weight:800;\">Apple Podcasts</a>\n <a href=\"overcast://x-callback-url/add?url=https://yorekms.github.io/deep-dive-podcasts/feed.xml\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">Overcast</a>\n <a href=\"pktc://subscribe/yorekms.github.io/deep-dive-podcasts/feed.xml\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">Pocket Casts</a>\n <button type=\"button\" class=\"crp-ctrl-btn crp-copy-rss\" data-rss=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\">Copy Feed URL</button>\n </div>\n <input type=\"text\" readonly value=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\" onclick=\"this.select()\" style=\"width:100%;padding:5px 8px;border-radius:6px;border:1px solid #334155;background:#050914;color:#94A3B8;font-family:monospace;font-size:11px;box-sizing:border-box;\" />\n </div>\n <div style=\"background:rgba(15,23,42,0.95);border:1px solid rgba(255,255,255,0.14);border-radius:12px;padding:12px;margin-bottom:12px;\">\n <div style=\"font-size:11px;font-weight:800;color:#38BDF8;margin-bottom:6px;\">Master Network Feed (All 280 Deep Dive Episodes)</div>\n <div style=\"display:flex;flex-wrap:wrap;gap:6px;margin-bottom:7px;\">\n <a href=\"podcast://yorekms.github.io/deep-dive-podcasts/feed.xml\" class=\"crp-ctrl-btn\" style=\"background:#38BDF8;color:#090E1A;border-color:#38BDF8;text-decoration:none;font-weight:800;\">Apple Podcasts (All 280)</a>\n <button type=\"button\" class=\"crp-ctrl-btn crp-copy-rss\" data-rss=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\">Copy Master RSS URL</button>\n <a href=\"https://yorekms.github.io/deep-dive-podcasts/\" target=\"_blank\" rel=\"noopener\" class=\"crp-ctrl-btn\" style=\"text-decoration:none;\">All 8 Feeds Directory &#8599;</a>\n </div>\n <input type=\"text\" readonly value=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\" onclick=\"this.select()\" style=\"width:100%;padding:5px 8px;border-radius:6px;border:1px solid #334155;background:#050914;color:#94A3B8;font-family:monospace;font-size:11px;box-sizing:border-box;\" />\n </div>\n </div>\n</div>";
      document.body.appendChild(wrap);
    }
  }
  if (document.body) mountShell();
  else document.addEventListener('DOMContentLoaded', mountShell);
})();
(function() {
 var studioBase = "https://ais-dev-v3n3vsl4pvdlmev4vcfv5b-514995804668.us-west1.run.app";
 var aiStudioPhysUrl = "https://aistudio.google.com/apps/fa16bbda-602f-48d3-b388-aba63404b252?showPreview=true&showAssistant=true";
 
 var PHYS_ARCHIVE_LINKS = {
 "master_matlab": "1PrqGQ7LUXobjuf-S6yUsU4p6b6jk29Ci",
 "python_v14": "1q2o-L6aE1iIkDapzT-HWDlH1vXK__UDQ",
 "suite_01": "1qjaMF07F3jJAT-7fP-8FitkfM_K8pYWs",
 "suite_02": "1BM0AefWrVh5KSJVepY9xxY2KeF0wtf-T",
 "suite_03": "1sz2_h4mbH5medzgmsX5AbKIheQwAsGuq",
 "suite_04": "1qEB5zfoN8g2L9pMaZjtTdBbMWBpIJs-_",
 "suite_05": "1-QAPCQh10kvPHocb6T8lVSgrxHne4n8X",
 "suite_06": "1botGiw-Qpujje2yzLtYFhHfK2YcggIb5",
 "suite_07": "1VLuYbmml3-wszlRzj8GJcRl6bMIX8uCI",
 "suite_08": "12LTLGHib7h0u7RqSXgwMyA7owhTO_tj5",
 "suite_09": "1m0PLNsiNJ4xerjk_VRfgOBrFu-T7Wcpl",
 "suite_microscope": "1MBRL0CU2YwawDev0RMG3GtXwgGMXmdtz",
 "suite_transcriptomics": "1ppb0PmvpQr1_jkP9_R7TM4q-9OEh1Jel",
 "suite_seizure_manuscript": "1tjoOVatIW09pSgyDYWGAnPHAUf2SbsX1"
 };
 
 var PHYS_ARCHIVE_FILENAMES = {
 "master_matlab": "MATLAB_Physiology_Protocols_Latest_v2026_10.zip",
 "python_v14": "Physiology_Toolbox_Python_Suite_v14_0.zip",
 "suite_01": "01_HEK16_BindingUnbinding_v1_7.zip",
 "suite_02": "02_NaV16_NNI_VoltageClamp_Gating_Suite.zip",
 "suite_03": "03_DrugPulse_Workflow_v3_FreelyEditable.zip",
 "suite_04": "04_iPSC_Persistent_Sodium_TTX_Subtraction.zip",
 "suite_05": "05_CurrentClamp_CCIV_PhasePlot_ISI_Kinetics.zip",
 "suite_06": "06_ABF_Visualizations_Replay_SweepComparator.zip",
 "suite_07": "07_Plethysmography_Spike2ROI_v8_2_and_HCVR_v2_2.zip",
 "suite_08": "08_EEG_SeizureViewer_v1_0_and_SnippetPicker_v2_3_1.zip",
 "suite_09": "09_Publication_FigureFinisher_v1_9_and_PrismStats_v2.zip",
 "suite_microscope": "microscope_gui_v25_wip.zip",
 "suite_transcriptomics": "transcriptomics_workbench_wip.zip",
 "suite_seizure_manuscript": "Seizure_Transcriptomics_Workbench_v0.7.4.3_Manuscript_Source_2026-10-26.zip"
 };
 
 function resolveZipHref(key) {
 var val = (PHYS_ARCHIVE_LINKS[key] || "").trim();
 if (!val) return "#";
 if (/^[a-zA-Z0-9_-]{20,}$/.test(val)) {
 return "https://drive.google.com/uc?export=download&id=" + val;
 }
 return val;
 }
 
 var PROTOCOLS = [
 {
 id: "suite_01",
 cat: "patch",
 badge: "Suite 01 • Updated Oct 25, 2026",
 badgeColor: "#34D399",
 title: "HEK16 Binding / Unbinding Kinetics & QC Review v1.7",
 size: "102 KB",
 summary: "Automated drug wash-in (binding) & wash-out (unbinding) mono-exponential tau fitting with point-influence sensitivity and 3-tier QC.",
 files: [
 "run_HEK16_BindingUnbinding_Workflow_v1_3.m",
 "HEK16_QC_Review_v1_7.m (Latest Oct 25, 2026)",
 "bu_analyze_pair.m • bu_fit_monoexp.m • bu_qc_sensitivity.m • bu_group_tau.m"
 ],
 pythonParity: "Mirrored in binding_unbinding_engine.py & tab_binding_unbinding.py: flexible test-pulse step detection (-20 mV to +20 mV), FitConfig.MinR2 = 0.50, Reviewed / Descriptive / Strict fit policies, leave-one-out sensitivity (bu_qc_sensitivity), and SHA-256 + biological CellID repeat averaging."
 },
 {
 id: "suite_02",
 cat: "patch",
 badge: "Suite 02 • NaV1.6 Voltage-Clamp",
 badgeColor: "#38BDF8",
 title: "NaV1.6 NNI Voltage-Clamp & Boltzmann Gating Suite",
 size: "201 KB",
 summary: "Complete voltage-clamp activation (G-V), steady-state fast/slow inactivation (h-infinity), and two-pulse recovery from inactivation.",
 files: [
 "NNI_Complete_Analysis.m",
 "NaV_Activation_Boltzmann_Fit.m",
 "NaV_Inactivation_And_Recovery_Suite.m"
 ],
 pythonParity: "Mirrored in voltage_clamp_engine.py & tab_voltage_clamp.py with automatic capacitance artifact blanking, reversal potential estimation, and multi-sweep Boltzmann V1/2 & slope factor exports."
 },
 {
 id: "suite_03",
 cat: "patch",
 badge: "Suite 03 • Pharmacology",
 badgeColor: "#38BDF8",
 title: "DrugPulse Diary & Dose-Response Workflow v3",
 size: "66 KB",
 summary: "Freely editable pulse-by-pulse peak inward current diary tracker with state-dependent block and Hill / IC50 curve fitting.",
 files: [
 "DrugPulse_Workflow_v3_FreelyEditable.m",
 "DrugPulse_Timecourse_Normalized_Export.m"
 ],
 pythonParity: "Integrated into the Pharmacology & Binding/Unbinding workbench with interactive region selection, baseline drift correction, and Prism-ready CSV table generation."
 },
 {
 id: "suite_04",
 cat: "patch",
 badge: "Suite 04 • iPSC Cardiomyocytes / Neurons",
 badgeColor: "#C084FC",
 title: "iPSC Persistent Sodium Current (INaP) & TTX Subtraction",
 size: "104 KB",
 summary: "Pre-TTX vs. Post-TTX ramp and late-step digital subtraction pipeline for isolating TTX-sensitive persistent Na+ current.",
 files: [
 "iPSC_Persistent_Sodium_TTX_Subtraction.m",
 "Ramp_INaP_LateWindow_Quantifier.m"
 ],
 pythonParity: "Mirrored in persistent_sodium_engine.py & tab_persistent_sodium.py with paired ABF trace alignment, late-window AUC/mean current integration, and net TTX-sensitive overlay plots."
 },
 {
 id: "suite_05",
 cat: "ap",
 badge: "Suite 05 • Current-Clamp",
 badgeColor: "#FBBF24",
 title: "Current-Clamp CCIV, Phase-Plane (dV/dt) & ISI Kinetics",
 size: "74 KB",
 summary: "Action potential threshold, rheobase, F-I input-output curves, dV/dt vs. Vm phase plots, AHP depth, and spike-frequency adaptation.",
 files: [
 "CurrentClamp_CCIV_PhasePlot_Master.m",
 "AP_Kinetics_HalfWidth_MaxRiseDecay.m"
 ],
 pythonParity: "Mirrored in current_clamp_engine.py & tab_current_clamp.py with per-spike feature tables, automated threshold detection (dV/dt criterion), and phase-loop overlays."
 },
 {
 id: "suite_06",
 cat: "ap",
 badge: "Suite 06 • ABF Trace Utilities",
 badgeColor: "#FBBF24",
 title: "ABF Visualizations, Animated Sweep Replay & Comparator",
 size: "74 KB",
 summary: "High-speed Axon .abf trace browser, multi-file sweep comparator, scale-bar generator, and animated sweep replay exporter.",
 files: [
 "ABF_SweepComparator_And_Replay.m",
 "abfload.m"
 ],
 pythonParity: "Mirrored in pyabf-backed trace browser and multi-trace overlay tools with interactive scale bars and vector PDF/SVG export."
 },
 {
 id: "suite_07",
 cat: "invivo",
 badge: "Suite 07 • In Vivo Respiration",
 badgeColor: "#2DD4BF",
 title: "Whole-Body Plethysmography: Spike2 ROI v8.2 & HCVR v2.2",
 size: "160 KB",
 summary: "Breath-by-breath inspiratory/expiratory flow integration, tidal volume, minute ventilation, apnea/sigh detection, and hypercapnic CO2 challenge (HCVR).",
 files: [
 "Spike2_Master_Pipeline_ROI_v8_2.m",
 "HCVR_Test_Analysis_v2_2.m"
 ],
 pythonParity: "Mirrored in plethysmography_engine_v2.py & tab_plethysmography_v2.py with dual scipy.io.loadmat + HDF5 (h5py MATLAB v7.3) loader, ROI baseline/CO2 challenge windows, and HCVR slope regression."
 },
 {
 id: "suite_08",
 cat: "invivo",
 badge: "Suite 08 • In Vivo Neuro-Telemetry",
 badgeColor: "#2DD4BF",
 title: "EEG Seizure Viewer v1.0 & Snippet Picker v2.3.1",
 size: "42 KB",
 summary: "Multi-channel EEG/EMG spectrogram viewer, automated line-length & wavelet seizure detector, and publication snippet extractor.",
 files: [
 "EEG_SeizureViewer_v1_0.m",
 "EEG_SnippetPicker_v2_3_1.m"
 ],
 pythonParity: "Mirrored in eeg_seizure_engine_v2.py & tab_eeg_seizure_v2.py with MATLAB v7.3 HDF5 support, Morlet/STFT spectrograms, and interactive seizure event curation."
 },
 {
 id: "suite_09",
 cat: "pub",
 badge: "Suite 09 • Updated Oct 25, 2026",
 badgeColor: "#F472B6",
 title: "Publication FigureFinisher v1.9 & Prism Stats Suite v2",
 size: "33 KB",
 summary: "Interactive 5-tab journal figure standardizer (axes matching, smart split-range panel labels A-C / D-F, significance brackets) & ANOVA/post-hoc suite.",
 files: [
 "FigureFinisher_v1_9.m (Latest Oct 25, 2026)",
 "PrismStats_Suite_v2.m"
 ],
 pythonParity: "100% UI & engine parity in figure_finisher_engine_v2.py & tab_figure_finisher_v2.py: top toolbar (Open, Refresh Axes, Undo Last, Clear Coordinates, smart Panel Labels Front supporting split ranges like D-F, Show All Text, Text List) + all 5 tabs (Axis Scale, Size & Pos, Asterisk/Bracket, Move & Text, Size & Save at 300-1200 DPI)."
 },
 {
 id: "suite_microscope",
 cat: "imaging",
 badge: "Imaging Suite • v25.0 WIP",
 badgeColor: "#10B981",
 title: "Microscope Image Analysis GUI v25.0 (WIP)",
 size: "2.4 KB",
 summary: "Multi-channel fluorescence microscopy viewer (GFP/mCherry/Merge), dynamic adaptive segmentation thresholding, cell contour tracking, calcium time-lapse kinetics (dF/F0), and colocalization (Pearson R & Manders M1/M2).",
 files: [
 "microscope_gui_v25.py",
 "launch_microscope_gui.py",
 "launch_microscope.bat",
 "requirements.txt"
 ],
 pythonParity: "Extracted from the Microscope Image Analysis notebook. Complete standalone Python GUI with batch launcher, adaptive segmentation thresholding slider, and time-lapse kinetic tracking."
 },
 {
 id: "suite_transcriptomics",
 cat: "genomics",
 badge: "Transcriptomics • Multi-Modal WIP",
 badgeColor: "#8B5CF6",
 title: "Transcriptomics Workbench Suite (WIP)",
 size: "2.7 KB",
 summary: "Unified General & Seizure Transcriptomics workstation with interactive Volcano plot filtering, epileptogenesis cascade kinetics, and post-ictal immediate-early vs. delayed neuroinflammation profiling.",
 files: [
 "transcriptomics_workbench.py",
 "launch_transcriptomics.py",
 "launch_transcriptomics.bat",
 "requirements.txt"
 ],
 pythonParity: "Extracted from the Transcriptomics View-Matlab to Python notebook. Synchronized with the Seizure Transcriptomics Workbench suite with interactive volcano plots and post-ictal temporal cascade curves."
 },
 {
 id: "suite_seizure_manuscript",
 cat: "genomics",
 badge: "Manuscript Source • v0.7.4.3",
 badgeColor: "#EC4899",
 title: "Seizure Transcriptomics Workbench (v0.7.4.3 Manuscript Source)",
 size: "887 KB",
 summary: "Full manuscript-grade MATLAB & Python companion research suite for seizure transcriptomics, conditional Bayesian forecasting, 43 cohorts/119 contrasts, and validated unit test pipelines.",
 files: [
 "262 validated source files (100% SHA-256 match)",
 "Python companion unit tests (5/5 passed, 2.72s)",
 "Bounded MATLAB R2026a test suite (8/8 passed)",
 "R model adapters & PACKAGE_VALIDATION.json"
 ],
 pythonParity: "Complete cryptographic reproducibility package with SHA-256 validation manifest and standalone Python Bayesian forecasting companion. Bounded tests cover conditional-posterior agreement, adaptive integration, and frozen forecasts."
 }
 ];
 
 function injectStandaloneScientificSoftware() {
 var target = document.querySelector('#main') || document.querySelector('.inner') || document.body;
 if (!target) return;
 
 var wrap = document.createElement('div');
 wrap.id = 'crp-standalone-phys-wrapper';
 wrap.style.cssText = 'width:100%;max-width:1120px;margin:0 auto;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#F1F5F9;';
 
 var html = '';
 
 /* 1. TOP HUB NAVIGATION BAR */
 html += "<div id=\"crp-top-hub-nav\" style=\"width:100%;max-width:1140px;margin:0 auto 16px auto;padding:9px 12px;background:rgba(9,14,26,0.84);border:1px solid #C084FC44;border-radius:15px;box-shadow:0 10px 28px rgba(0,0,0,0.38);backdrop-filter:blur(14px);box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;\"><div style=\"display:flex;flex-wrap:wrap;gap:5px;justify-content:center;align-items:center;\"><a href=\"https://my-consciousness.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83e\udde0 Consciousness</a><a href=\"https://my-cell-death.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\u26a1 Cell Death &amp; Biophysics</a><a href=\"https://my-nutrition-metabolism.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83e\udd57 Nutrition &amp; Metabolism</a><a href=\"https://my-pharmacology.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83d\udc8a Pharmacology &amp; Oncology</a><a href=\"https://my-forensic-medicine.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83e\ude7a Forensic Medicine &amp; Testing</a><a href=\"https://my-ancient-medicine.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\u2695\ufe0f Ancient Medicine</a><a href=\"https://my-philosophy-science.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83d\udd2c Philosophy &amp; Statistics</a><a href=\"https://my-human-origins.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83c\udfdb\ufe0f Human Origins, Language &amp; Religion</a><a href=\"https://my-study-apps.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;text-decoration:none;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);white-space:nowrap;\">\ud83c\udf93 Estudia! &amp; Web Apps</a><a href=\"https://my-scientific-software.carrd.co\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:800;text-decoration:none;color:#090E1A;background:#C084FC;box-shadow:0 0 14px #C084FC66;border:1px solid #C084FC;white-space:nowrap;\">\ud83d\udcbb Scientific Software</a></div><div style=\"margin-top:8px;padding-top:7px;border-top:1px solid rgba(255,255,255,0.10);display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center;\"><span style=\"font-size:10px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-right:2px;\">Research Portals &amp; Feeds:</span><a href=\"https://yorek-cancer-ai-primer.tasty-siren-3221.chatgpt.site\" target=\"_blank\" rel=\"noopener\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:800;text-decoration:none;color:#FFE4E6;background:rgba(159,18,57,0.45);border:1px solid rgba(251,113,133,0.65);white-space:nowrap;\">\ud83e\uddec VCU Cancer AI Primer \u2197</a><a href=\"https://public-evidence-library-yorek.yorekms.chatgpt.site\" target=\"_blank\" rel=\"noopener\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:700;text-decoration:none;color:#DBEAFE;background:rgba(30,58,138,0.42);border:1px solid rgba(96,165,250,0.55);white-space:nowrap;\">\ud83d\udcca Public Evidence Library \u2197</a><a href=\"https://historical-documents-atlas.yorekms.chatgpt.site\" target=\"_blank\" rel=\"noopener\" class=\"crp-hub-pill\" style=\"display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:700;text-decoration:none;color:#FEF3C7;background:rgba(120,53,15,0.42);border:1px solid rgba(251,191,36,0.55);white-space:nowrap;\">\ud83d\uddfa\ufe0f Historical Documents Atlas \u2197</a><button type=\"button\" id=\"crp-open-rss-modal-btn\" data-series-rss=\"https://yorekms.github.io/deep-dive-podcasts/feed.xml\" style=\"display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:10.8px;font-weight:800;color:#090E1A;background:#C084FC;border:1px solid #C084FC;cursor:pointer;font-family:inherit;white-space:nowrap;\">\ud83d\udce1 Podcast App RSS</button></div></div><div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:10px;margin:0 auto 14px auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-align:left;\"><a href=\"https://yorek-cancer-ai-primer.tasty-siren-3221.chatgpt.site\" target=\"_blank\" rel=\"noopener\" style=\"background:linear-gradient(135deg, rgba(136,19,55,0.40) 0%, rgba(15,23,42,0.94) 100%);border:1px solid #F43F5E66;border-radius:13px;padding:11px 14px;text-decoration:none;color:inherit;display:flex;flex-direction:column;justify-content:space-between;gap:6px;transition:transform 0.16s ease,border-color 0.16s ease;\"><div><div style=\"font-size:9.5px;font-weight:800;color:#F43F5E;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;\">Featured Application Showcase \u2022 VCU Massey Comprehensive Cancer Center</div><div style=\"font-size:13.5px;font-weight:800;color:#FFFFFF;line-height:1.25;margin-bottom:3px;\">Matthew S. Yorek \u2014 Cancer Biology, Computation &amp; Scientific Communication</div><div style=\"font-size:11.5px;color:#CBD5E1;line-height:1.4;\">Cancer biology. Computational tools. Clearer science. Interactive translational oncology &amp; AI primer built to turn complex source data into inspectable evidence.</div></div><div style=\"font-size:11px;font-weight:800;color:#F43F5E;\">Explore VCU Cancer AI Primer \u2197</div></a><a href=\"https://public-evidence-library-yorek.yorekms.chatgpt.site\" target=\"_blank\" rel=\"noopener\" style=\"background:linear-gradient(135deg, rgba(30,58,138,0.40) 0%, rgba(15,23,42,0.94) 100%);border:1px solid #60A5FA66;border-radius:13px;padding:11px 14px;text-decoration:none;color:inherit;display:flex;flex-direction:column;justify-content:space-between;gap:6px;transition:transform 0.16s ease,border-color 0.16s ease;\"><div><div style=\"font-size:9.5px;font-weight:800;color:#60A5FA;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;\">Interactive Open Data &amp; Epistemology Portal</div><div style=\"font-size:13.5px;font-weight:800;color:#FFFFFF;line-height:1.25;margin-bottom:3px;\">Public Evidence Library \u2014 Learn, Explore, Reconsider</div><div style=\"font-size:11.5px;color:#CBD5E1;line-height:1.4;\">Explore public data, inspect primary sources, follow global commodities and purchasing power across places and years, and test assumptions interactively.</div></div><div style=\"font-size:11px;font-weight:800;color:#60A5FA;\">Open Public Evidence Library \u2197</div></a><a href=\"https://historical-documents-atlas.yorekms.chatgpt.site\" target=\"_blank\" rel=\"noopener\" style=\"background:linear-gradient(135deg, rgba(120,53,15,0.40) 0%, rgba(15,23,42,0.94) 100%);border:1px solid #FBBF2466;border-radius:13px;padding:11px 14px;text-decoration:none;color:inherit;display:flex;flex-direction:column;justify-content:space-between;gap:6px;transition:transform 0.16s ease,border-color 0.16s ease;\"><div><div style=\"font-size:9.5px;font-weight:800;color:#FBBF24;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;\">Interactive Primary Source &amp; Archival Cartography</div><div style=\"font-size:13.5px;font-weight:800;color:#FFFFFF;line-height:1.25;margin-bottom:3px;\">Historical Documents &amp; State Killing Atlas</div><div style=\"font-size:11.5px;color:#CBD5E1;line-height:1.4;\">Interactive archival atlas mapping primary historical documents, state violence, institutional records, and comparative historical evidence.</div></div><div style=\"font-size:11px;font-weight:800;color:#FBBF24;\">Launch Historical Documents Atlas \u2197</div></a></div>";
 
 /* 2. HERO HEADER & QUICK DOWNLOADS */
 html += '<div style="background:linear-gradient(135deg, rgba(30,27,75,0.7) 0%, rgba(15,23,42,0.92) 100%);border:1px solid rgba(192,132,252,0.4);border-radius:22px;padding:26px;margin-bottom:24px;box-shadow:0 18px 45px rgba(0,0,0,0.55);">' +
 '<div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:18px;">' +
 '<div style="flex:1;min-width:280px;">' +
 '<div style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;background:rgba(192,132,252,0.18);border:1px solid rgba(192,132,252,0.45);border-radius:999px;font-size:11px;font-weight:800;color:#E9D5FF;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">' +
 '&#9889; Primary Research Toolbox \u2022 Python v14 &amp; MATLAB Suites' +
 '</div>' +
 '<h1 style="margin:0 0 10px 0;font-size:30px;font-weight:900;color:#FFFFFF;letter-spacing:-0.02em;line-height:1.2;">' +
 'Bioinformatics, Imaging &amp; Scientific Software Portfolio' +
 '</h1>' +
 '<p style="margin:0;font-size:14px;color:#CBD5E1;line-height:1.6;max-width:760px;">' +
 'Comprehensive software suites for patch-clamp electrophysiology (HEK NaV1.6, Boltzmann gating, TTX digital subtraction), current-clamp action potentials, whole-body plethysmography, EEG seizure telemetry, confocal/epifluorescence microscopy, and transcriptomics.' +
 '</p>' +
 '</div>' +
 '<div style="display:flex;flex-direction:column;gap:8px;flex-shrink:0;">' +
 '<a href="https://aistudio.google.com/apps/fa16bbda-602f-48d3-b388-aba63404b252?showPreview=true&showAssistant=true" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 18px;border-radius:12px;font-size:13px;font-weight:800;color:#090E1A;text-decoration:none;background:linear-gradient(135deg, #38BDF8 0%, #C084FC 100%);box-shadow:0 0 20px rgba(56,189,248,0.45);">' +
 '&#128640; Launch Google AI Studio Workbench &#8599;' +
 '</a>' +
 '<button id="phys-toggle-ais-preview" type="button" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:9px 16px;border-radius:12px;font-size:12px;font-weight:700;color:#E2E8F0;background:rgba(15,23,42,0.85);border:1px solid #475569;cursor:pointer;">' +
 '&#128187; Toggle Live AI Studio Drawer' +
 '</button>' +
 '</div>' +
 '</div>' +
 
 /* Top Primary 1-Click Download Bar */
 '<div style="margin-top:20px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.12);display:flex;flex-wrap:wrap;gap:10px;align-items:center;">' +
 '<span style="font-size:11px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-right:4px;">Master Downloads:</span>' +
 '<a href="' + resolveZipHref('python_v14') + '" target="_blank" rel="noopener" download="' + PHYS_ARCHIVE_FILENAMES['python_v14'] + '" data-no-player="true" class="phys-btn-dl">' +
 '&#11015; Python Suite v14.0 (169 KB)' +
 '</a>' +
 '<a href="' + resolveZipHref('master_matlab') + '" target="_blank" rel="noopener" download="' + PHYS_ARCHIVE_FILENAMES['master_matlab'] + '" data-no-player="true" class="phys-btn-dl">' +
 '&#11015; Master MATLAB Protocols (870 KB)' +
 '</a>' +
 '<a href="' + resolveZipHref('suite_seizure_manuscript') + '" target="_blank" rel="noopener" download="' + PHYS_ARCHIVE_FILENAMES['suite_seizure_manuscript'] + '" data-no-player="true" class="phys-btn-dl">' +
 '&#11015; Seizure Manuscript Source (887 KB)' +
 '</a>' +
 '</div>' +
 '</div>';
 
 /* 3. COLLAPSIBLE AI STUDIO WORKBENCH DRAWER */
 html += '<div id="phys-aistudio-drawer" style="display:none;background:#090E1A;border:1px solid #C084FC66;border-radius:20px;overflow:hidden;margin-bottom:24px;box-shadow:0 18px 45px rgba(0,0,0,0.6);">' +
 '<div style="padding:10px 16px;background:rgba(30,27,75,0.6);border-bottom:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:space-between;">' +
 '<span style="font-size:12px;color:#E9D5FF;font-weight:700;">Google AI Studio \u2014 Bioinformatics &amp; Physiology Workbench</span>' +
 '<a href="' + aiStudioPhysUrl + '" target="_blank" rel="noopener" style="font-size:11px;color:#38BDF8;text-decoration:none;font-weight:700;">Open in New Tab &#8599;</a>' +
 '</div>' +
 '<iframe id="phys-aistudio-iframe" data-lazy-src="' + aiStudioPhysUrl + '" src="about:blank" title="Bioinformatics & Physiology Analysis Toolbox" style="width:100%;height:620px;border:none;display:block;background:#090E1A;" allow="clipboard-write; fullscreen"></iframe>' +
 '</div>';
 
 /* 4. CATEGORY FILTER BAR */
 html += '<div style="margin-bottom:18px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;">' +
 '<button type="button" class="phys-cat-pill active" data-phys-cat="all">&#10024; All 12 Suites</button>' +
 '<button type="button" class="phys-cat-pill" data-phys-cat="patch">&#9889; Patch-Clamp &amp; NaV1.6</button>' +
 '<button type="button" class="phys-cat-pill" data-phys-cat="ap">&#128200; Action Potentials &amp; ABF</button>' +
 '<button type="button" class="phys-cat-pill" data-phys-cat="invivo">&#128421; In Vivo Pleth &amp; EEG</button>' +
 '<button type="button" class="phys-cat-pill" data-phys-cat="pub">&#128394; FigureFinisher &amp; Stats</button>' +
 '<button type="button" class="phys-cat-pill" data-phys-cat="imaging">&#128300; Microscopy &amp; Imaging</button>' +
 '<button type="button" class="phys-cat-pill" data-phys-cat="genomics">&#129516; Transcriptomics Suites</button>' +
 '</div>';
 
 /* 5. PROTOCOL CARDS GRID */
 html += '<div id="phys-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:18px;margin-bottom:30px;">';
 for (var i = 0; i < PROTOCOLS.length; i++) {
 var p = PROTOCOLS[i];
 var dlUrl = resolveZipHref(p.id);
 var fn = PHYS_ARCHIVE_FILENAMES[p.id] || (p.id + ".zip");
 html += '<div class="phys-proto-card" data-card-cat="' + p.cat + '" data-proto-idx="' + i + '">' +
 '<div>' +
 '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">' +
 '<span style="font-size:10.5px;font-weight:800;color:' + p.badgeColor + ';text-transform:uppercase;letter-spacing:0.06em;">' + p.badge + '</span>' +
 '<span style="font-size:11px;font-weight:700;color:#94A3B8;background:rgba(255,255,255,0.06);padding:2px 7px;border-radius:6px;">' + p.size + '</span>' +
 '</div>' +
 '<h3 style="margin:0 0 8px 0;font-size:16px;font-weight:800;color:#FFFFFF;line-height:1.35;">' + p.title + '</h3>' +
 '<p style="margin:0 0 14px 0;font-size:12.5px;color:#94A3B8;line-height:1.55;">' + p.summary + '</p>' +
 '</div>' +
 '<div style="display:flex;gap:8px;align-items:center;padding-top:12px;border-top:1px solid rgba(255,255,255,0.08);">' +
 '<a href="' + dlUrl + '" target="_blank" rel="noopener" download="' + fn + '" data-no-player="true" class="phys-btn-dl" style="flex:1;">' +
 '&#11015; Download .zip' +
 '</a>' +
 '<button type="button" class="phys-btn-info btn-open-modal" data-proto-idx="' + i + '">' +
 'Details &amp; Parity &#8594;' +
 '</button>' +
 '</div>' +
 '</div>';
 }
 html += '</div>';
 
 wrap.innerHTML = html;
 target.insertBefore(wrap, target.firstChild);
 
 /* 7. WIRE UP EVENT LISTENERS */
 // Category filters
 var catBtns = wrap.querySelectorAll('.phys-cat-pill');
 var cards = wrap.querySelectorAll('.phys-proto-card');
 catBtns.forEach(function(btn) {
 btn.addEventListener('click', function() {
 catBtns.forEach(function(b) { b.classList.remove('active'); });
 btn.classList.add('active');
 var cat = btn.getAttribute('data-phys-cat');
 cards.forEach(function(c) {
 if (cat === 'all' || c.getAttribute('data-card-cat') === cat) {
 c.style.display = 'flex';
 } else {
 c.style.display = 'none';
 }
 });
 });
 });
 
 // Toggle AI Studio Drawer
 var drawer = document.getElementById('phys-aistudio-drawer');
 var toggleBtn = document.getElementById('phys-toggle-ais-preview');
 var aisFrame = document.getElementById('phys-aistudio-iframe');
 if (toggleBtn && drawer && aisFrame) {
 toggleBtn.addEventListener('click', function() {
 var isClosed = (drawer.style.display === 'none' || !drawer.style.display);
 if (isClosed) {
 if (aisFrame.getAttribute('src') === 'about:blank') {
 aisFrame.src = aisFrame.getAttribute('data-lazy-src');
 }
 drawer.style.display = 'block';
 toggleBtn.innerHTML = '&#9650; Hide AI Studio Drawer';
 } else {
 drawer.style.display = 'none';
 toggleBtn.innerHTML = '&#128187; Toggle Live AI Studio Drawer';
 }
 });
 }
 
 // Modal Details
 var modal = document.getElementById('phys-protocol-modal');
 var mClose = document.getElementById('phys-modal-close');
 var mBadge = document.getElementById('phys-modal-badge');
 var mTitle = document.getElementById('phys-modal-title');
 var mDesc = document.getElementById('phys-modal-desc');
 var mFiles = document.getElementById('phys-modal-files');
 var mPy = document.getElementById('phys-modal-python');
 var mDl = document.getElementById('phys-modal-dl');
 
 wrap.querySelectorAll('.btn-open-modal').forEach(function(btn) {
 btn.addEventListener('click', function() {
 var idx = parseInt(btn.getAttribute('data-proto-idx'), 10);
 var p = PROTOCOLS[idx];
 if (!p) return;
 mBadge.textContent = p.badge + ' \u2022 ' + p.size;
 mBadge.style.color = p.badgeColor;
 mTitle.textContent = p.title;
 mDesc.textContent = p.summary;
 mFiles.innerHTML = p.files.map(function(f) { return '<div>&#8226; ' + f + '</div>'; }).join('');
 mPy.textContent = p.pythonParity;
 mDl.href = resolveZipHref(p.id);
 mDl.download = PHYS_ARCHIVE_FILENAMES[p.id] || (p.id + '.zip');
 modal.style.display = 'flex';
 });
 });
 
 if (mClose && modal) {
 mClose.addEventListener('click', function() { modal.style.display = 'none'; });
 modal.addEventListener('click', function(e) { if (e.target === modal) modal.style.display = 'none'; });
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
 seekEl.style.background = 'linear-gradient(to right, #C084FC 0%, #C084FC ' + pct.toFixed(1) + '%, #1E293B ' + pct.toFixed(1) + '%, #1E293B 100%)';
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
 artist: "Scientific Software & Deep Dive Audio",
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
 if (a.getAttribute('data-no-player') === 'true') return;
 var href = a.getAttribute('href') || '';
 var m = href.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || href.match(/[?&]id=([a-zA-Z0-9_-]+)/);
 if (m && m[1]) {
 var driveId = m[1];
 if (PHYS_ARCHIVE_LINKS[driveId] || Object.values(PHYS_ARCHIVE_LINKS).indexOf(driveId) !== -1) {
 return;
 }
 a.addEventListener('click', function(e) {
 e.preventDefault();
 var t = a.innerText || a.getAttribute('title') || 'Podcast Audio';
 playEpisode(driveId, t);
 });
 }
 });
 }
 
 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', function() {
 injectStandaloneScientificSoftware();
 attachInterceptors();
 });
 } else {
 injectStandaloneScientificSoftware();
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
              : 'font-weight:600;color:#E2E8F0;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.14);';
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
