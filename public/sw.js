// RAFA Design Hub Service Worker — Offline Photography & Monograph Caching

const CACHE_NAME = "rafa-studio-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/favicon/site.webmanifest",
  "/favicon/favicon-32x32.png",
  "/favicon/favicon-16x16.png",
  "/images/projects/casa-monte-hero.jpg",
  "/images/projects/atelier-norte-hero.jpg",
  "/images/projects/villa-marim-hero.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Stale-while-revalidate for images & static assets
  if (event.request.destination === "image" || event.request.destination === "style" || event.request.destination === "script") {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
