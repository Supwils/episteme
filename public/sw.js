// Episteme · 格致 — offline service worker.
//
// Goals: let a reader keep browsing what they've already seen when the network
// drops, without ever serving stale HTML while online and without growing
// unbounded on a 2200-page site.
//
// Bump VERSION to retire every old cache on the next activation.
const VERSION = "v3";
const STATIC_CACHE = `static-${VERSION}`; // content-hashed build assets, immutable
const PAGES_CACHE = `pages-${VERSION}`; // navigations, network-first
const ASSET_CACHE = `assets-${VERSION}`; // unhashed static assets, revalidating
const CURRENT_CACHES = [STATIC_CACHE, PAGES_CACHE, ASSET_CACHE];

// Cap the pages cache so extended browsing can't fill a phone's storage.
const PAGES_LIMIT = 60;

const ASSET_PATTERN = /\.(css|js|mjs|woff2?|ttf|otf|eot|svg|png|jpe?g|gif|webp|avif|json|ico)$/;

// --- pure decisions (exercised directly by lib/__tests__/service-worker.test.ts) ---

function classify(url, isNavigate, origin) {
  if (url.origin !== origin) return "passthrough"; // never touch cross-origin
  if (url.pathname.startsWith("/api/")) return "passthrough"; // APIs own their caching
  // Unhashed search artifacts must match the current deployment. SWR would keep
  // a previous worker/index after a protocol or corpus change.
  if (url.pathname === "/search.worker.js" || url.pathname === "/search-index.json") {
    return "passthrough";
  }
  if (isNavigate) return "navigation";
  if (url.pathname.startsWith("/_next/static/")) return "immutable"; // hashed → safe forever
  if (ASSET_PATTERN.test(url.pathname)) return "asset";
  return "passthrough";
}

// Cache.keys() returns entries oldest-first; keep the newest `limit`.
function trimCacheKeys(keys, limit) {
  return keys.length > limit ? keys.slice(0, keys.length - limit) : [];
}

// --- cache strategies ---

// CacheStorage is best-effort: private browsing, eviction and quota failures
// must not turn a successful network request into stale content or an error.
async function readCached(request, cacheName) {
  try {
    const cache = cacheName ? await caches.open(cacheName) : caches;
    return await cache.match(request);
  } catch {
    return undefined;
  }
}

async function storeResponse(request, response, cacheName, limit) {
  if (!response.ok) return;
  try {
    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
    if (limit) await trimCache(cache, limit);
  } catch {
    // The online response remains usable even if offline storage is unavailable.
  }
}

async function networkFirst(request, cacheName, limit) {
  try {
    const response = await fetch(request);
    await storeResponse(request, response, cacheName, limit);
    return response;
  } catch {
    return (await readCached(request)) || (await readCached("/")) || offline();
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await readCached(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    await storeResponse(request, response, cacheName);
    return response;
  } catch {
    return offline();
  }
}

function staleWhileRevalidate(request, cacheName) {
  const cached = readCached(request, cacheName);
  const network = fetch(request);
  const revalidation = network
    .then((response) => storeResponse(request, response, cacheName))
    .catch(() => {});
  return {
    response: cached.then((response) => response || network.catch(() => offline())),
    revalidation,
  };
}

async function trimCache(cache, limit) {
  const keys = await cache.keys();
  await Promise.all(trimCacheKeys(keys, limit).map((key) => cache.delete(key)));
}

function offline() {
  return new Response("离线", { status: 503, statusText: "Offline" });
}

// --- lifecycle ---

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => !CURRENT_CACHES.includes(key)).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || !request.url.startsWith("http")) return;

  const url = new URL(request.url);
  const strategy = classify(url, request.mode === "navigate", self.location.origin);

  if (strategy === "navigation") {
    event.respondWith(networkFirst(request, PAGES_CACHE, PAGES_LIMIT));
  } else if (strategy === "immutable") {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (strategy === "asset") {
    const { response, revalidation } = staleWhileRevalidate(request, ASSET_CACHE);
    event.respondWith(response);
    // Register in the event callback, not after an await. A cached response can
    // finish before revalidation; keep the worker alive through the cache write.
    event.waitUntil(revalidation);
  }
  // "passthrough" → let the browser handle it untouched.
});
