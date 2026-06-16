/* Atlas service worker — offline app shell + runtime caching.
   Bump CACHE when the asset list changes (e.g. after adding per-topic data files). */
const CACHE = "atlas-v4";
const ASSETS = [
  "./", "./index.html", "./css/styles.css",
  "./js/app.js", "./js/store.js", "./js/viz.js", "./js/playground.js",
  "./data/linear-algebra.js", "./data/calculus.js", "./data/algorithms.js",
  "./data/deep-learning.js", "./data/reinforcement-learning.js", "./data/llm.js",
  "./data/prereqs.js", "./data/references.js", "./data/glossary.js",
  "./manifest.webmanifest", "./icon.svg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()).catch(() => {}));
});

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
