/*!
 * Shared GA4 / Google Tag + .chatgpt.site portal click tracker + Forensic nav pill injector
 * for non-podcast Carrd portfolio sites and external research portals.
 */
(function () {
  'use strict';
  if (window.__crpPortalAnalyticsLoaded) return;
  window.__crpPortalAnalyticsLoaded = true;
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
        var accent = '#38BDF8';
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
