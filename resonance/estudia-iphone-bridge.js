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
    if (document.getElementById('dd-estudia-switch-pill')) return;

    // 1. Sleek floating Estudia! Study Cards switcher pill (stays inside standalone scope /deep-dive-podcasts/)
    var pill = document.createElement('a');
    pill.id = 'dd-estudia-switch-pill';
    pill.href = '/deep-dive-podcasts/estudia/' + getActiveEpisodeParams();
    pill.innerHTML = '&#127891; <span>Estudia! Q&amp;A</span>';
    pill.title = 'Switch to Estudia! 3D Flashcards & 7,612 Podcast Transcript Q&As';
    pill.style.cssText = [
      'position:fixed',
      'top:calc(env(safe-area-inset-top, 0px) + 10px)',
      'right:12px',
      'z-index:9999',
      'display:inline-flex',
      'align-items:center',
      'gap:6px',
      'padding:7px 12px',
      'border-radius:999px',
      'background:linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      'color:#060B16',
      'font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,sans-serif',
      'font-size:12px',
      'font-weight:800',
      'text-decoration:none',
      'box-shadow:0 6px 20px rgba(245,158,11,0.42), 0 0 0 1px rgba(255,255,255,0.22)',
      '-webkit-tap-highlight-color:transparent'
    ].join(';');
    pill.addEventListener('click', function () {
      pill.href = '/deep-dive-podcasts/estudia/' + getActiveEpisodeParams();
    });
    document.body.appendChild(pill);

    // 2. Effortless 2-Tap iPhone Safari "Add to Home Screen" Coachmark (only if on iOS Safari & NOT yet standalone)
    var ua = navigator.userAgent || '';
    var isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var isStandalone = window.navigator.standalone === true ||
      (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
    var dismissed = false;
    try { dismissed = sessionStorage.getItem('dd_ios_hint_dismissed') === '1'; } catch (e) {}

    if (isIOS && !isStandalone && !dismissed) {
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
