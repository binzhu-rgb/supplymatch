const CACHE_NAME = "supplymatch-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Устанавливаем сервис-воркер и кэшируем файлы
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Активируем и удаляем старые кэши
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Отвечаем из кэша, если интернета нет
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});