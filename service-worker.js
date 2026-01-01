const CACHE_NAME = "pospro-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/app.css",
  "/js/core/firebase.js",
  "/js/core/security.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r =>
      r || fetch(e.request)
    )
  );
});
