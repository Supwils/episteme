// Episteme · 格致 — offline service worker.
//
// Goals: let a reader keep browsing what they've already seen when the network
// drops, without ever serving stale HTML while online and without growing
// unbounded as the content collection grows.
//
// Bump VERSION to retire every old cache on the next activation.
const VERSION = "v5";
const STATIC_CACHE = `episteme-static-${VERSION}`; // content-hashed build assets, immutable
const PAGES_CACHE = `episteme-pages-${VERSION}`; // navigations, network-first
const ASSET_CACHE = `episteme-assets-${VERSION}`; // unhashed static assets, revalidating
const CURRENT_CACHES = [STATIC_CACHE, PAGES_CACHE, ASSET_CACHE];

// Cap the pages cache so extended browsing can't fill a phone's storage.
const PAGES_LIMIT = 60;
// Chunk names change on every deploy, so without a cap each release's chunks
// pile up for returning readers until VERSION is bumped. One visit touches a
// few dozen chunks; this keeps several sessions' worth and evicts the oldest.
const STATIC_LIMIT = 400;
// Room for two images per retained page, plus icons and domain preview shards.
// This bounds entries; browser storage quotas remain the byte limit.
const ASSET_LIMIT = 200;

importScripts("/sw-reading.js");

const ASSET_PATTERN = /\.(css|js|mjs|woff2?|ttf|otf|eot|svg|png|jpe?g|gif|webp|avif|json|ico)$/;

// --- pure decisions (exercised directly by lib/__tests__/service-worker.test.ts) ---

function classify(url, isNavigate, origin) {
  if (url.origin !== origin) return "passthrough"; // never touch cross-origin
  if (url.pathname.startsWith("/api/")) return "passthrough"; // APIs own their caching
  // Unhashed search artifacts must match the current deployment. SWR would keep
  // a previous worker/index after a protocol or corpus change.
  if (
    ["/search.worker.js", "/search-index.json", "/sw.js", "/sw-reading.js"].includes(url.pathname)
  ) {
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

function hasDirective(headers, names) {
  return (headers.get("cache-control") || "")
    .split(",")
    .some((part) => names.includes(part.split("=")[0].trim().toLowerCase()));
}

function permitsStorage(request) {
  return (
    request.cache !== "no-store" &&
    !request.headers.has("authorization") &&
    !hasDirective(request.headers, ["no-store"])
  );
}

function permitsResponse(request, response) {
  return (
    response.ok &&
    !(response.redirected && request.mode === "navigate") &&
    !hasDirective(response.headers, ["private", "no-store", "no-cache"])
  );
}

function requiresNetwork(request) {
  return (
    request.cache === "reload" ||
    request.cache === "no-cache" ||
    hasDirective(request.headers, ["no-cache"])
  );
}

function obsoleteCache(name) {
  const owned = /^episteme-(static|pages|assets)-v\d+$/.test(name);
  const legacy = /^(static|pages|assets)-v[1-3]$/.test(name);
  return (owned || legacy) && !CURRENT_CACHES.includes(name);
}

// --- cache strategies ---

// CacheStorage is best-effort: private browsing, eviction and quota failures
// must not turn a successful network request into stale content or an error.
async function readCached(request, cacheName) {
  if (!permitsStorage(request)) return undefined;
  try {
    const cache = await caches.open(cacheName);
    const response = await cache.match(request);
    if (!response || permitsResponse(request, response)) return response;
    await cache.delete(request);
    return undefined;
  } catch {
    return undefined;
  }
}

async function storeResponse(request, response, cacheName, limit) {
  if (!permitsStorage(request) || !response.ok) return;
  // Chrome refuses a cached `redirected` response for navigations; serving it
  // offline would surface a network error instead of the fallback page.
  if (!permitsResponse(request, response)) {
    try {
      await (await caches.open(cacheName)).delete(request);
    } catch {
      /* CacheStorage is best-effort, including permission revocation. */
    }
    return;
  }
  // Clone BEFORE the first await: once the page starts reading the body,
  // clone() throws and the asset silently never reaches the cache.
  let copy;
  try {
    copy = response.clone();
  } catch {
    return;
  }
  try {
    const cache = await caches.open(cacheName);
    await cache.put(request, copy);
    if (limit) await trimCache(cache, limit);
  } catch {
    // The online response remains usable even if offline storage is unavailable.
  }
}

// `waitUntil` (the fetch event's) lets the response stream to the page while
// the cache write finishes in the background; without it navigations would
// wait for the whole body to download before the first byte reaches the tab.
async function networkFirst(request, cacheName, limit, waitUntil) {
  try {
    const response = await fetch(request);
    const store = storeResponse(request, response, cacheName, limit);
    if (waitUntil) waitUntil(store);
    else await store;
    return response;
  } catch {
    return (await readCached(request, cacheName)) || offlinePage();
  }
}

async function cacheFirst(request, cacheName, limit, waitUntil) {
  const cached = requiresNetwork(request) ? undefined : await readCached(request, cacheName);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    const store = storeResponse(request, response, cacheName, limit);
    if (waitUntil) waitUntil(store);
    else await store;
    return response;
  } catch {
    return (await readCached(request, cacheName)) || offline();
  }
}

function staleWhileRevalidate(request, cacheName, limit) {
  const cached = requiresNetwork(request)
    ? Promise.resolve(undefined)
    : readCached(request, cacheName);
  const network = fetch(request);
  const revalidation = network
    .then((response) => storeResponse(request, response, cacheName, limit))
    .catch(() => {});
  return {
    response: cached.then(
      (response) =>
        response || network.catch(async () => (await readCached(request, cacheName)) || offline())
    ),
    revalidation,
  };
}

async function trimCache(cache, limit) {
  const keys = await cache.keys();
  await Promise.all(trimCacheKeys(keys, limit).map((key) => cache.delete(key)));
}

function offline() {
  return new Response("离线", {
    status: 503,
    statusText: "Offline",
    headers: { "Cache-Control": "no-store" },
  });
}

function offlinePage() {
  return new Response(
    `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>当前离线 · 格致</title>
<script>try{const t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"||(t==="system"&&matchMedia("(prefers-color-scheme: light)").matches)?"light":"dark"}catch{}</script>
<style>
:root{color-scheme:dark;--bg:#0f1622;--fg:#e8dfc9;--muted:#b3ab98;--accent:#c39a45}
:root[data-theme=light]{color-scheme:light;--bg:#faf6ef;--fg:#1e2638;--muted:#454b58;--accent:#795719}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font-family:system-ui,sans-serif;line-height:1.8}
main{max-width:36rem;margin:clamp(4rem,18vh,10rem) auto;padding:0 1.5rem}
.brand{font-size:.875rem;letter-spacing:.16em;color:var(--accent);border-top:2px solid var(--accent);padding-top:1.5rem}
h1{font-size:clamp(1.75rem,5vw,2.25rem);font-weight:600;letter-spacing:.04em;margin:1.5rem 0 .75rem}
p{color:var(--muted);margin:0;max-width:29rem}nav{display:flex;flex-wrap:wrap;gap:1rem;margin-top:2rem}
a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:.5rem 1rem;color:var(--fg);text-underline-offset:.3em}
.retry{border:1px solid var(--accent);text-decoration:none}a:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
</style></head><body><main><div class="brand">格致 · 阅读</div><h1>当前离线</h1>
<p>此页面暂时没有可用的离线副本。连接网络后，可重新加载继续阅读。</p>
<nav aria-label="离线页面操作"><a class="retry" href="">重新加载</a><a href="/">返回首页</a></nav>
</main></body></html>`,
    {
      status: 503,
      statusText: "Offline",
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    }
  );
}

// --- lifecycle ---

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter(obsoleteCache).map((key) => caches.delete(key))))
      .catch(() => {})
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || !request.url.startsWith("http")) return;
  if (!permitsStorage(request)) return;

  const url = new URL(request.url);
  const strategy = classify(url, request.mode === "navigate", self.location.origin);

  const keepAlive = (work) => event.waitUntil(work);
  if (strategy === "navigation") {
    event.respondWith(networkFirst(request, PAGES_CACHE, PAGES_LIMIT, keepAlive));
  } else if (strategy === "immutable") {
    event.respondWith(cacheFirst(request, STATIC_CACHE, STATIC_LIMIT, keepAlive));
  } else if (strategy === "asset") {
    const { response, revalidation } = staleWhileRevalidate(request, ASSET_CACHE, ASSET_LIMIT);
    event.respondWith(response);
    // Register in the event callback, not after an await. A cached response can
    // finish before revalidation; keep the worker alive through the cache write.
    event.waitUntil(revalidation);
  }
  // "passthrough" → let the browser handle it untouched.
});
