/* Atlas service worker — offline app shell + runtime caching.
   Bump CACHE when the asset list changes (e.g. after adding per-topic data files). */
const CACHE = "atlas-v93";
const ASSETS = [
  "./", "./index.html", "./css/styles.css",
  "./js/app.js", "./js/store.js", "./js/viz.js", "./js/playground.js",
  "./data/linear-algebra.js", "./data/calculus.js", "./data/algorithms.js",
  "./data/deep-learning.js", "./data/reinforcement-learning.js", "./data/llm.js",
  "./data/probability-statistics.js",
  "./data/prereqs.js", "./data/references.js", "./data/glossary.js",
  "./manifest.webmanifest", "./icon.svg"
];

self.addEventListener("install", e => {
  // pre-cache, but WAIT (don't skipWaiting) so the page can offer a "refresh for new version" prompt
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
});

// the page posts this when the user accepts an update
self.addEventListener("message", e => { if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting(); });

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        // opportunistically cache same-origin + CDN (KaTeX, fonts, Pyodide)
        try { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } catch (_) {}
        return res;
      }).catch(() => req.mode === "navigate" ? caches.match("./index.html") : undefined);
    })
  );
});
