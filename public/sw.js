const CACHE_VERSION = 'freetools-static-v5.0.6';
const APP_SHELL = [
  '/',
  '/favicon.svg',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/manifest.webmanifest'
];

const CACHEABLE_ASSET_RE = /\.(?:css|js|svg|ico|png|jpg|jpeg|webp|woff2?)$/i;
const BYPASS_HOST_RE = /(?:^|\.)((googlesyndication|doubleclick|googletagmanager|google-analytics|analytics\.google|googletagservices|adservice\.google|adtrafficquality\.google|googleadservices|gstatic)\.(?:com|net)|googleads\.g\.doubleclick\.net)$/i;
const BYPASS_PATH_RE = /(?:adsbygoogle|googlesyndication|doubleclick|pagead|googleads|adservice|\/g\/collect|\/collect|\/gtag\/js)/i;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function shouldHandle(request) {
  if (request.method !== 'GET') return false;
  const url = new URL(request.url);
  if (isGoogleAdOrAnalyticsRequest(url)) return false;
  if (url.origin !== self.location.origin) return false;
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/data/support-products')) return false;
  return true;
}

function isGoogleAdOrAnalyticsRequest(url) {
  return BYPASS_HOST_RE.test(url.hostname) || BYPASS_PATH_RE.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  if (!shouldHandle(event.request)) return;

  const request = event.request;
  const url = new URL(request.url);
  const isDocument = request.mode === 'navigate' || request.destination === 'document';
  const isCacheableAsset = CACHEABLE_ASSET_RE.test(url.pathname);

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response && response.ok && isCacheableAsset) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        }
        return response;
      });

      if (isDocument) {
        // Keep navigations network-first so AdSense and GA4 initialize from the live page.
        return network.catch(() => cached || caches.match('/'));
      }

      return cached || network;
    })
  );
});
