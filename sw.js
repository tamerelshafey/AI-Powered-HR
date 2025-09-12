// sw.js
const CACHE_NAME = 'bokra-hr-cache-v2';

const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/manifest.json',
  '/types.ts',
  '/constants.tsx',
  '/permissions.ts',
  '/users.ts',
  '/locales/ar.json',
  '/locales/en.json',
  // Core UI components
  '/components/Layout.tsx',
  '/components/Sidebar.tsx',
  '/components/Header.tsx',
  '/components/LoadingSpinner.tsx',
  '/components/ProtectedRoute.tsx',
  // Contexts
  '/context/UserContext.tsx',
  '/context/I18nContext.tsx',
  // Hooks
  '/hooks/useOnScreen.ts',
  '/hooks/useFocusTrap.ts',
  // Services
  '/services/api.ts',
  '/services/supabaseClient.ts',
  // External assets
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Tajawal:wght@400;500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install the service worker and cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Use addAll for atomic caching of essential assets
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(error => {
        console.error('Failed to cache app shell:', error);
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