const CACHE_NAME = 'multiplication-practice-v1';
const urlsToCache = [
    '/public',
    '/public/index.html',
    '/public/styles.css',
    '../src/app.js',
    '/public/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});