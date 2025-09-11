// sw.js
const CACHE_NAME = 'bokra-hr-cache-v1';

const URLS_TO_CACHE = [
  '/',
  '/index.html'
];

// Install the service worker and cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Activate event to clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// Fetch event to serve content from cache or network
self.addEventListener('fetch', (event) => {
    // We only want to cache GET requests.
    if (event.request.method !== 'GET') {
        return;
    }
    event.respondWith(
        caches.match(event.request).then((response) => {
            // If we have a response in the cache, return it.
            if (response) {
                return response;
            }

            // If not, fetch from the network.
            return fetch(event.request).then((networkResponse) => {
                // We check for 'basic' and 'cors' type responses to avoid caching opaque responses.
                if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            });
        }).catch(error => {
            console.error('Fetch failed:', error);
            // In a real app, you might want to return a custom offline fallback page here.
            // e.g., return caches.match('/offline.html');
        })
    );
});
