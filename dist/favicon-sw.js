// Service Worker to maintain favicon during navigation
self.addEventListener('install', function(event) {
  console.log('Favicon Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Favicon Service Worker activating...');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Intercept favicon requests to ensure consistent icon
  if (event.request.url.includes('favicon')) {
    event.respondWith(
      fetch('/favicon.svg').catch(() => {
        // Fallback to inline favicon if SVG fails
        return new Response(
          '<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="15" fill="#14b8a6"/><text x="16" y="21" font-family="Arial, sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="white">24</text></svg>',
          {
            headers: {
              'Content-Type': 'image/svg+xml',
              'Cache-Control': 'public, max-age=31536000'
            }
          }
        );
      })
    );
  }
});
