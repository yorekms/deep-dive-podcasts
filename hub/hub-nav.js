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
