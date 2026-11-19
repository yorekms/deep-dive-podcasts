/*! Deep Dive iPhone Standalone Bridge: Seamless Player <-> Estudia! 7,612 Q&A Switcher + 2-Tap Home Screen Coachmark */
(function () {
  'use strict';
  if (window.__ddEstudiaBridgeLoaded) return;
  window.__ddEstudiaBridgeLoaded = true;

  try {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().catch(function () {});
    }
  } catch (e) {}

  function getActiveEpisodeParams() {
    try {
      var sp = new URLSearchParams(window.location.search);
      var driveId = sp.get('driveId') || sp.get('ep') || '';
      var hub = sp.get('hub') || '';
      var qs = [];
      if (hub) qs.push('hub=' + encodeURIComponent(hub));
      if (driveId) qs.push('ep=' + encodeURIComponent(driveId));
      return qs.length ? ('?' + qs.join('&')) : '';
    } catch (e) {
      return '';
    }
  }

  function mountBridge() {
    // Effortless 2-Tap iPhone Safari "Add to Home Screen" Coachmark (only if on iOS Safari & NOT yet standalone)
    var ua = navigator.userAgent || '';
    var isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var isStandalone = window.navigator.standalone === true ||
      (window.matchMedia && (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        window.matchMedia('(display-mode: minimal-ui)').matches
      ));
    var dismissed = false;
    try { dismissed = sessionStorage.getItem('dd_ios_hint_dismissed') === '1'; } catch (e) {}

    if (isIOS && !isStandalone && !dismissed && !document.getElementById('dd-ios-a2hs-coach')) {
      var bar = document.createElement('div');
      bar.id = 'dd-ios-a2hs-coach';
      bar.style.cssText = [
        'position:fixed',
        'left:10px',
        'right:10px',
        'bottom:calc(env(safe-area-inset-bottom, 0px) + 74px)',
        'max-width:480px',
        'margin:0 auto',
        'z-index:9999',
        'background:rgba(8,14,28,0.96)',
        'border:1.5px solid #38BDF8',
        'border-radius:16px',
        'padding:10px 12px',
        'color:#F8FAFC',
        'font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif',
        'font-size:12px',
        'line-height:1.4',
        'box-shadow:0 16px 40px rgba(0,0,0,0.85)',
        'display:flex',
        'align-items:center',
        'justify-content:space-between',
        'gap:10px'
      ].join(';');
      bar.innerHTML =
        '<div><strong style="color:#38BDF8;">&#128242; Pin as Full-Screen iPhone App:</strong> Tap Safari&rsquo;s <strong>Share &#11014;&#65039;</strong> button &rarr; scroll down to <strong>&#10133; Add to Home Screen</strong>.</div>' +
        '<button type="button" aria-label="Dismiss" style="background:#1E293B;border:1px solid #334155;color:#CBD5E1;border-radius:8px;padding:4px 8px;font-size:13px;font-weight:800;cursor:pointer;flex-shrink:0;">&times;</button>';
      var closeBtn = bar.querySelector('button');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          try { sessionStorage.setItem('dd_ios_hint_dismissed', '1'); } catch (e) {}
          bar.remove();
        });
      }
      document.body.appendChild(bar);
    }
  }

  if (document.body) mountBridge();
  else document.addEventListener('DOMContentLoaded', mountBridge);
})();
