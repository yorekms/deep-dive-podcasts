/* StatWeave Pyodide (Python 3.12 WebAssembly) Dedicated Worker */
'use strict';

const PYODIDE_INDEX_URL = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/';
importScripts(PYODIDE_INDEX_URL + 'pyodide.js');

let pyodideReadyPromise = null;
let dispatchFn = null;

function postBootStatus(stage, detail) {
  self.postMessage({ type: 'boot_status', stage: stage, detail: detail });
}

async function initEngine() {
  if (pyodideReadyPromise) return pyodideReadyPromise;
  pyodideReadyPromise = (async () => {
    try {
      postBootStatus('runtime', '1/3 Loading Python 3.12 WebAssembly runtime…');
      const pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX_URL });

      postBootStatus('packages', '2/3 Loading NumPy, Pandas, SciPy, Statsmodels & Matplotlib…');
      await pyodide.loadPackage([
        'numpy',
        'pandas',
        'scipy',
        'statsmodels',
        'matplotlib',
        'sqlite3',
        'lzma'
      ]);

      postBootStatus('bundle', '3/3 Mounting StatWeave, OpenPyXL & 32 R benchmark datasets…');
      const bundleResp = await fetch('./statweave_py_bundle.zip?v=097', { cache: 'no-cache' });
      if (!bundleResp.ok) {
        throw new Error('Failed to fetch statweave_py_bundle.zip (' + bundleResp.status + ')');
      }
      const bundleBuf = await bundleResp.arrayBuffer();
      pyodide.FS.mkdirTree('/opt/statweave_pkg');
      pyodide.unpackArchive(bundleBuf, 'zip', { extractDir: '/opt/statweave_pkg' });

      await pyodide.runPythonAsync(`
import sys
if '/opt/statweave_pkg' not in sys.path:
    sys.path.insert(0, '/opt/statweave_pkg')
from statweave.web.browser_runtime import dispatch_browser_json, get_browser_runtime
get_browser_runtime()
`);
      dispatchFn = pyodide.globals.get('dispatch_browser_json');
      postBootStatus('ready', 'Python 3.12 Scientific Engine Ready (100% Client-Side)');
      return pyodide;
    } catch (err) {
      pyodideReadyPromise = null;
      throw err;
    }
  })();
  return pyodideReadyPromise;
}

self.addEventListener('message', async (ev) => {
  const msg = ev.data || {};
  if (msg.type === 'warmup') {
    try {
      await initEngine();
    } catch (err) {
      postBootStatus('error', String(err && err.message ? err.message : err));
    }
    return;
  }
  if (msg.type === 'api_request') {
    const reqId = msg.id;
    try {
      await initEngine();
      const rawJson = dispatchFn(JSON.stringify(msg.payload || {}));
      const parsed = JSON.parse(rawJson);
      self.postMessage({ type: 'api_response', id: reqId, ok: true, result: parsed });
    } catch (err) {
      self.postMessage({
        type: 'api_response',
        id: reqId,
        ok: false,
        error: String(err && err.message ? err.message : err)
      });
    }
  }
});

initEngine().catch((err) => {
  postBootStatus('error', String(err && err.message ? err.message : err));
});
