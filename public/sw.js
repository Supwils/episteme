const CACHE_NAME = "universe-knowledge-v1";
const STATIC_CACHE = "static-v1";
const PAGES_CACHE = "pages-v1";
const CONTENT_CACHE = "content-v1";

const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(
            (key) =>
              key !== STATIC_CACHE &&
              key !== PAGES_CACHE &&
              key !== CONTENT_CACHE
          )
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

function isNavigationRequest(request) {
  return request.mode === "navigate";
}

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/textures/") ||
    url.pathname.match(/\.(css|js|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp|avif)$/)
  );
}

function isContentPage(url) {
  return (
    url.pathname.startsWith("/universe-physics") ||
    url.pathname.startsWith("/human-history") ||
    url.pathname.startsWith("/philosophy") ||
    url.pathname.startsWith("/life-science") ||
    url.pathname.startsWith("/cosmology") ||
    url.pathname.startsWith("/mathematics") ||
    url.pathname.startsWith("/knowledge-graph")
  );
}

function isApiRequest(url) {
  return (
    url.pathname.startsWith("/api/") ||
    url.hostname.includes("vercel-insights") ||
    url.hostname.includes("api.iconify") ||
    url.hostname.includes("api.unisvg") ||
    url.hostname.includes("api.simpleicons")
  );
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;
  if (!request.url.startsWith("http")) return;

  const url = new URL(request.url);

  if (isApiRequest(url)) {
    return;
  }

  if (isNavigationRequest(request) || isContentPage(url)) {
    event.respondWith(networkFirst(request, PAGES_CACHE));
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  event.respondWith(networkFirst(request, PAGES_CACHE));
});
