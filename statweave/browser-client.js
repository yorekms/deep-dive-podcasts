/* StatWeave In-Browser Pyodide Bridge — Intercepts /api/* locally in WebAssembly */
(function () {
  'use strict';

  var KEY_STORAGE = 'statweave_browser_api_key';
  var MODEL_STORAGE = 'statweave_browser_api_model';
  var VERIFIED_MODEL_STORAGE = 'statweave_browser_verified_model';
  var memKey = '';
  var memModel = '';
  var memVerifiedModel = '';
  var origFetch = window.fetch.bind(window);

  var worker = new Worker('./pyodide-worker.js?v=098');
  var seq = 1;
  var pending = new Map();
  var engineReady = false;
  var engineError = '';

  function getSavedKey() {
    if (memKey) return memKey;
    try { return sessionStorage.getItem(KEY_STORAGE) || localStorage.getItem(KEY_STORAGE) || ''; } catch (e) { return memKey || ''; }
  }
  function getSavedModel() {
    if (memModel) return memModel;
    try { return sessionStorage.getItem(MODEL_STORAGE) || localStorage.getItem(MODEL_STORAGE) || ''; } catch (e) { return memModel || ''; }
  }
  function getVerifiedModel() {
    if (memVerifiedModel) return memVerifiedModel;
    try { return sessionStorage.getItem(VERIFIED_MODEL_STORAGE) || localStorage.getItem(VERIFIED_MODEL_STORAGE) || ''; } catch (e) { return memVerifiedModel || ''; }
  }
  function setVerifiedModel(vm) {
    memVerifiedModel = (vm && vm.trim()) ? vm.trim() : '';
    try {
      if (memVerifiedModel) sessionStorage.setItem(VERIFIED_MODEL_STORAGE, memVerifiedModel);
      else sessionStorage.removeItem(VERIFIED_MODEL_STORAGE);
    } catch (e) {}
  }
  function setSavedKey(k, m) {
    var prevK = getSavedKey();
    var prevM = getSavedModel();
    memKey = (k && k.trim()) ? k.trim() : '';
    memModel = (m && m.trim()) ? m.trim() : '';
    if (memKey !== prevK || memModel !== prevM) {
      setVerifiedModel('');
    }
    try {
      if (memKey) sessionStorage.setItem(KEY_STORAGE, memKey);
      else sessionStorage.removeItem(KEY_STORAGE);
      if (memModel) sessionStorage.setItem(MODEL_STORAGE, memModel);
      else sessionStorage.removeItem(MODEL_STORAGE);
    } catch (e) {}
  }

  function buildInstantAuthConfig() {
    var k = getSavedKey();
    var hasKey = k.length >= 16;
    var isGem = k.indexOf('AIza') === 0;
    var m = getSavedModel() || getVerifiedModel();
    if (!m) m = isGem ? 'gemini-3.8-flash' : 'gpt-4.1-mini';
    return {
      version: '0.9.5',
      browser_wasm_mode: true,
      openai_configured: hasKey,
      llm_provider: hasKey ? (isGem ? 'gemini' : 'openai') : 'offline',
      openai_model: hasKey ? m : null,
      github_oauth_enabled: false,
      orcid_oauth_enabled: false,
      invite_login_enabled: true,
      require_invite_code: false,
      carrd_portal_url: 'https://my-statweave.carrd.co',
      clampflow_portal_url: 'https://my-clampflow.carrd.co',
      daily_turn_limit: 500,
      monthly_turn_limit: 5000
    };
  }

  function ensureBootBanner() {
    var el = document.getElementById('sw-wasm-boot-banner');
    if (!el && document.body) {
      el = document.createElement('div');
      el.id = 'sw-wasm-boot-banner';
      el.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:99999;background:#0f172a;color:#f8fafc;border:1px solid #10b981;border-radius:12px;padding:10px 15px;font-size:12.5px;font-weight:600;box-shadow:0 12px 32px rgba(0,0,0,0.35);display:flex;align-items:center;gap:10px;max-width:420px;';
      el.innerHTML = '<span id="sw-wasm-spinner" style="width:10px;height:10px;border-radius:50%;background:#10b981;display:inline-block;box-shadow:0 0 10px #10b981;"></span><span id="sw-wasm-boot-text">Booting Python 3.12 Scientific Engine…</span>';
      document.body.appendChild(el);
    }
    return el;
  }

  function updateModeBadge() {
    var modeEl = document.getElementById('mode-indicator');
    if (!modeEl) return;
    if (engineError) {
      modeEl.textContent = 'WASM Engine Retry Needed';
      modeEl.title = engineError;
      modeEl.className = 'badge badge-amber';
      return;
    }
    var k = getSavedKey();
    if (!engineReady) {
      modeEl.textContent = 'Warming Python 3.12 WASM…';
      modeEl.className = 'badge badge-muted';
      return;
    }
    if (k.length >= 16) {
      var isGem = k.indexOf('AIza') === 0;
      var vm = getVerifiedModel() || getSavedModel();
      modeEl.textContent = (isGem ? 'Gemini AI' : 'OpenAI') + (vm ? ' (' + vm + ')' : '') + ' + Local Python WASM';
      modeEl.className = 'badge badge-teal';
    } else {
      modeEl.textContent = 'Python 3.12 WASM · 100% Private In-Browser';
      modeEl.className = 'badge badge-teal';
    }
  }

  worker.addEventListener('message', function (ev) {
    var msg = ev.data || {};
    if (msg.type === 'boot_status') {
      var banner = ensureBootBanner();
      var txt = document.getElementById('sw-wasm-boot-text');
      if (txt) txt.textContent = msg.detail || '';
      if (msg.stage === 'ready') {
        engineReady = true;
        engineError = '';
        updateModeBadge();
        if (banner) {
          banner.style.borderColor = '#10b981';
          setTimeout(function () { banner.style.display = 'none'; }, 1600);
        }
      } else if (msg.stage === 'error') {
        engineError = msg.detail || 'Failed to initialize WebAssembly engine';
        updateModeBadge();
        if (banner) banner.style.borderColor = '#ef4444';
      } else {
        updateModeBadge();
      }
      return;
    }
    if (msg.type === 'api_response') {
      var entry = pending.get(msg.id);
      if (!entry) return;
      pending.delete(msg.id);
      if (!msg.ok) entry.reject(new Error(msg.error || 'Worker execution failed'));
      else entry.resolve(msg.result);
    }
  });

  function callWorker(payload) {
    return new Promise(function (resolve, reject) {
      var id = seq++;
      pending.set(id, { resolve: resolve, reject: reject });
      worker.postMessage({ type: 'api_request', id: id, payload: payload });
    });
  }

  function jsonResponse(obj, status) {
    return new Response(JSON.stringify(obj), {
      status: status || 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  function arrayBufferToBase64(buf) {
    var bytes = new Uint8Array(buf);
    var chunks = [];
    var step = 0x8000;
    for (var i = 0; i < bytes.length; i += step) {
      chunks.push(String.fromCharCode.apply(null, bytes.subarray(i, i + step)));
    }
    return btoa(chunks.join(''));
  }

  function base64ToUint8Array(b64) {
    var bin = atob(b64);
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function extractLocalApiPath(input) {
    var urlStr = typeof input === 'string' ? input : (input && input.url ? input.url : String(input));
    try {
      var u = new URL(urlStr, window.location.href);
      if (u.origin !== window.location.origin) return null;
      var p = u.pathname;
      var idx = p.indexOf('/api/');
      if (idx !== -1) return p.slice(idx) + (u.search || '');
      if (p.endsWith('/healthz')) return '/healthz';
    } catch (e) {}
    return null;
  }

  window.fetch = async function (input, init) {
    var apiPath = extractLocalApiPath(input);
    if (!apiPath) {
      return origFetch(input, init);
    }
    init = init || {};
    var method = (init.method || 'GET').toUpperCase();
    var cleanPath = apiPath.split('?')[0].replace(/\/+$/, '') || '/';

    // Zero-latency instant boot paths so the Workbench UI renders in 0 ms while Pyodide warms up
    if (method === 'GET' && cleanPath === '/healthz') {
      return jsonResponse({ status: 'ok', version: '0.9.5', browser_wasm_mode: true, engine_ready: engineReady });
    }
    if (method === 'GET' && cleanPath === '/api/auth/config') {
      setTimeout(updateModeBadge, 0);
      return jsonResponse(buildInstantAuthConfig());
    }
    if (method === 'GET' && cleanPath === '/api/auth/me') {
      setTimeout(updateModeBadge, 0);
      return jsonResponse({
        user: {
          user_id: 'browser_local_researcher',
          display_name: 'Local Browser Researcher',
          auth_provider: 'browser_wasm',
          affiliation: 'In-Browser WebAssembly Engine (100% Client-Side)',
          permissions: {
            contributor_ready: true,
            allow_private_evaluation: true,
            allow_model_training: true,
            allow_public_example_library: false
          }
        },
        quota: { daily_turn_limit: 500, daily_turns_used: 0, daily_turns_remaining: 500 },
        config: buildInstantAuthConfig()
      });
    }
    if (method === 'GET' && cleanPath === '/api/projects' && !engineReady) {
      return jsonResponse({
        projects: [],
        quota: { daily_turn_limit: 500, daily_turns_used: 0, daily_turns_remaining: 500 }
      });
    }
    if (method === 'GET' && cleanPath === '/api/r_datasets' && !engineReady) {
      try {
        var idxResp = await origFetch('./r_datasets_index.json?v=098');
        if (idxResp.ok) return idxResp;
      } catch (e) {}
    }

    var bodyObj = null;
    var fileObj = null;

    if (init.body && typeof FormData !== 'undefined' && init.body instanceof FormData) {
      var f = init.body.get('file');
      var sh = init.body.get('sheet') || '';
      if (f && typeof f.arrayBuffer === 'function') {
        var ab = await f.arrayBuffer();
        fileObj = {
          filename: f.name || 'dataset.csv',
          base64: arrayBufferToBase64(ab),
          sheet: String(sh)
        };
      }
    } else if (typeof init.body === 'string' && init.body.length > 0) {
      try { bodyObj = JSON.parse(init.body); } catch (e) { bodyObj = {}; }
    }

    var banner = ensureBootBanner();
    if (!engineReady && banner) {
      banner.style.display = 'flex';
    }

    var res = await callWorker({
      method: method,
      path: apiPath,
      body: bodyObj,
      file: fileObj,
      api_key: getSavedKey(),
      api_model: getSavedModel()
    });

    if (res.kind === 'binary') {
      var bytes = base64ToUint8Array(res.base64 || '');
      return new Response(bytes, {
        status: res.status || 200,
        headers: {
          'Content-Type': res.mime || 'application/octet-stream',
          'Content-Disposition': 'attachment; filename="' + (res.filename || 'download.bin') + '"'
        }
      });
    }
    if (res.kind === 'error') {
      return jsonResponse({ detail: res.detail || 'Request failed' }, res.status || 400);
    }
    return jsonResponse(res.data !== undefined ? res.data : {}, res.status || 200);
  };

  function injectBrowserControls() {
    ensureBootBanner();
    // Reveal workbench immediately at 0ms — no auth/server gate in client-side WASM mode
    var wb = document.getElementById('workbench');
    if (wb) wb.classList.remove('hidden');
    var ag = document.getElementById('auth-gate');
    if (ag) ag.classList.add('hidden');
    var cg = document.getElementById('consent-gate');
    if (cg) cg.classList.add('hidden');

    var topRight = document.querySelector('.topbar-right');
    var brand = document.querySelector('.brand');

    // Hide server-only auth buttons in local browser mode
    var logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.style.display = 'none';
    var acctBtn = document.getElementById('account-btn');
    if (acctBtn) acctBtn.style.display = 'none';

    // Add R Atlas & Portal links if standalone
    if (brand && !document.getElementById('sw-atlas-nav-link')) {
      var atlasLink = document.createElement('a');
      atlasLink.id = 'sw-atlas-nav-link';
      atlasLink.href = './atlas.html';
      atlasLink.target = '_blank';
      atlasLink.rel = 'noopener';
      atlasLink.className = 'nav-pill';
      atlasLink.innerHTML = '&#128218; 80-Dataset Visual Atlas &#8599;';
      brand.appendChild(atlasLink);

      var isEmbedded = false;
      try { isEmbedded = (window.self !== window.top) || (window.location.search.indexOf('embedded=1') !== -1); } catch (e) { isEmbedded = true; }
      if (!isEmbedded) {
        var portalLink = document.createElement('a');
        portalLink.href = './portal.html';
        portalLink.className = 'nav-pill';
        portalLink.innerHTML = '&#127760; All 17 Research Portals';
        brand.appendChild(portalLink);
      }
    }

    if (topRight && !document.getElementById('sw-byok-btn')) {
      var keyBtn = document.createElement('button');
      keyBtn.id = 'sw-byok-btn';
      keyBtn.type = 'button';
      keyBtn.className = 'btn btn-secondary btn-sm';
      function syncKeyLabel() {
        var k = getSavedKey();
        if (k.length >= 16) {
          keyBtn.innerHTML = getVerifiedModel() ? '&#128273; AI Key Verified' : '&#128273; AI Key Active';
        } else {
          keyBtn.innerHTML = '&#128273; Optional AI Key';
        }
      }
      syncKeyLabel();
      topRight.insertBefore(keyBtn, topRight.firstChild);

      var hostedBtn = document.createElement('a');
      hostedBtn.id = 'sw-hosted-login-btn';
      hostedBtn.href = 'https://statweave-api-production.up.railway.app/app';
      hostedBtn.className = 'btn btn-primary btn-sm';
      hostedBtn.style.textDecoration = 'none';
      hostedBtn.innerHTML = '&#128272; Sign In for Hosted Lab AI (40/day) &#8594;';
      topRight.insertBefore(hostedBtn, keyBtn);

      var modal = document.createElement('div');
      modal.id = 'sw-byok-modal';
      modal.className = 'modal-backdrop hidden';
      modal.innerHTML =
        '<div class="modal-card">' +
          '<h3>Optional Browser AI Key (OpenAI or Google Gemini)</h3>' +
          '<p class="muted-small" style="line-height:1.5;margin-bottom:10px;">' +
            'All statistical tests (including Kaplan&ndash;Meier survival, Log-Rank &amp; Cox HR), working sheets, exploratory galleries, and the 80 verified benchmark datasets run <strong>100% locally in your browser without any API key</strong>. ' +
            'To enable open-ended LLM chat planning, paste an OpenAI (<code>sk-...</code>) or Google AI Studio Gemini (<code>AIza...</code>) key below. ' +
            'Your key is kept strictly in this browser tab (<code>sessionStorage</code>) and raw spreadsheet rows never enter prompts.' +
          '</p>' +
          '<label style="display:block;font-size:12px;font-weight:600;margin-bottom:8px;">API Key (OpenAI <code>sk-...</code> or Gemini <code>AIza...</code>)' +
            '<input id="sw-byok-input" type="password" placeholder="sk-... or AIza..." style="width:100%;margin-top:4px;padding:8px 10px;border:1px solid #cbd5e1;border-radius:8px;font-family:monospace;" />' +
          '</label>' +
          '<label style="display:block;font-size:12px;font-weight:600;margin-bottom:12px;">Model Override (optional — auto-resolves <code>gpt-4.1-mini</code> / <code>gpt-4o-mini</code> or <code>gemini-3.8-flash</code>)' +
            '<input id="sw-byok-model" type="text" placeholder="Leave blank for automatic model selection" style="width:100%;margin-top:4px;padding:8px 10px;border:1px solid #cbd5e1;border-radius:8px;font-family:monospace;" />' +
          '</label>' +
          '<div id="sw-byok-status" style="display:none;margin-bottom:12px;padding:9px 11px;border-radius:8px;font-size:12px;line-height:1.45;"></div>' +
          '<div class="modal-actions">' +
            '<button id="sw-byok-clear" type="button" class="btn btn-ghost">Clear Key</button>' +
            '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
              '<button id="sw-byok-cancel" type="button" class="btn btn-secondary">Close</button>' +
              '<button id="sw-byok-save-only" type="button" class="btn btn-secondary">Save Only</button>' +
              '<button id="sw-byok-save" type="button" class="btn btn-primary">&#10003; Verify &amp; Save Key</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      document.body.appendChild(modal);

      function showKeyStatus(kind, msgText) {
        var stEl = document.getElementById('sw-byok-status');
        if (!stEl) return;
        stEl.style.display = 'block';
        if (kind === 'ok') {
          stEl.style.background = '#ecfdf5';
          stEl.style.border = '1px solid #6ee7b7';
          stEl.style.color = '#065f46';
        } else if (kind === 'err') {
          stEl.style.background = '#fef2f2';
          stEl.style.border = '1px solid #fca5a5';
          stEl.style.color = '#991b1b';
        } else {
          stEl.style.background = '#f1f5f9';
          stEl.style.border = '1px solid #cbd5e1';
          stEl.style.color = '#334155';
        }
        stEl.textContent = msgText;
      }

      function openKeyModal() {
        document.getElementById('sw-byok-input').value = getSavedKey();
        document.getElementById('sw-byok-model').value = getSavedModel();
        var vm = getVerifiedModel();
        if (getSavedKey().length >= 16 && vm) {
          showKeyStatus('ok', '✓ Verified active key (' + vm + ').');
        } else {
          var stEl = document.getElementById('sw-byok-status');
          if (stEl) stEl.style.display = 'none';
        }
        modal.classList.remove('hidden');
        setTimeout(function () {
          var inp = document.getElementById('sw-byok-input');
          if (inp) inp.focus();
        }, 40);
      }

      keyBtn.addEventListener('click', openKeyModal);
      window.addEventListener('message', function (ev) {
        if (ev && ev.data && ev.data.type === 'statweave_open_byok_modal') {
          openKeyModal();
        }
      });
      if (window.location.search && window.location.search.indexOf('open_key=1') !== -1) {
        setTimeout(openKeyModal, 120);
      }

      document.getElementById('sw-byok-cancel').addEventListener('click', function () {
        modal.classList.add('hidden');
      });
      document.getElementById('sw-byok-clear').addEventListener('click', function () {
        setSavedKey('', '');
        setVerifiedModel('');
        document.getElementById('sw-byok-input').value = '';
        document.getElementById('sw-byok-model').value = '';
        syncKeyLabel();
        updateModeBadge();
        modal.classList.add('hidden');
      });
      document.getElementById('sw-byok-save-only').addEventListener('click', function () {
        var k = document.getElementById('sw-byok-input').value.trim();
        var m = document.getElementById('sw-byok-model').value.trim();
        setSavedKey(k, m);
        syncKeyLabel();
        updateModeBadge();
        modal.classList.add('hidden');
      });
      document.getElementById('sw-byok-save').addEventListener('click', async function () {
        var k = document.getElementById('sw-byok-input').value.trim();
        var m = document.getElementById('sw-byok-model').value.trim();
        if (!k) {
          setSavedKey('', '');
          setVerifiedModel('');
          syncKeyLabel();
          updateModeBadge();
          showKeyStatus('info', 'Key cleared — running 100% locally in your browser.');
          return;
        }
        setSavedKey(k, m);
        syncKeyLabel();
        updateModeBadge();
        var saveBtn = document.getElementById('sw-byok-save');
        saveBtn.disabled = true;
        saveBtn.textContent = 'Verifying…';
        showKeyStatus('info', engineReady
          ? 'Testing live connection from your browser…'
          : 'Finishing Python WASM warmup (~2–4 s), then verifying your API key…');
        try {
          var resp = await window.fetch('/api/auth/test_key', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ api_key: k, api_model: m })
          });
          var payload = await resp.json();
          if (!resp.ok || !payload.ok) {
            throw new Error((payload && payload.detail) ? payload.detail : ('Verification failed (' + resp.status + ')'));
          }
          setVerifiedModel(payload.model || '');
          syncKeyLabel();
          updateModeBadge();
          var provName = payload.provider === 'gemini' ? 'Google Gemini' : 'OpenAI';
          showKeyStatus('ok', '✓ Connected to ' + provName + ' (' + (payload.model || 'verified') + ')! Close this dialog and ask anything in chat.');
        } catch (err) {
          setVerifiedModel('');
          syncKeyLabel();
          updateModeBadge();
          showKeyStatus('err', String(err && err.message ? err.message : err));
        } finally {
          saveBtn.disabled = false;
          saveBtn.innerHTML = '&#10003; Verify &amp; Save Key';
        }
      });
    }
    updateModeBadge();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectBrowserControls);
  } else {
    injectBrowserControls();
  }
})();
