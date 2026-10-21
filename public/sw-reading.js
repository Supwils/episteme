// Loaded by sw.js; only committed article views request an HTML companion.
const readingJobs = new Map();
const READING_HTML_LIMIT = 1024 * 1024;
const READING_ASSET_LIMIT = 8 * 1024 * 1024;
const READING_TIMEOUT = 20_000;

function readingPath(value) {
  return typeof value === "string" &&
    /^\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/.test(value) &&
    !value.startsWith("/api/")
    ? value
    : undefined;
}

async function boundedBody(response, budget) {
  if (!response.body || Number(response.headers.get("content-length")) > budget.remaining) {
    await response.body?.cancel();
    throw new Error("Offline copy exceeds budget");
  }
  const reader = response.body.getReader();
  const parts = [];
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      budget.remaining -= value.byteLength;
      if (budget.remaining < 0) throw new Error("Offline copy exceeds budget");
      parts.push(value);
    }
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error;
  } finally {
    reader.releaseLock();
  }
  return new Blob(parts);
}

function copyHeaders(response) {
  const headers = new Headers(response.headers);
  // Fetch exposes decoded bytes; these transport headers describe the old body.
  headers.delete("content-encoding");
  headers.delete("content-length");
  return headers;
}

function readingAssets(html) {
  const assets = new Set();
  for (const [tag] of html.matchAll(/<(?:script|link)\b[^>]*>/gi)) {
    if (!/^<script\b/i.test(tag) && !/\brel=["']stylesheet["']/i.test(tag)) continue;
    const path = tag.match(/\b(?:src|href)=["'](\/_next\/static\/[^"'?#]+\.(?:js|css))["']/i)?.[1];
    if (path && new URL(path, self.location.origin).pathname === path) assets.add(path);
  }
  if (assets.size > 48) throw new Error("Offline bootstrap exceeds budget");
  return [...assets];
}

function readingRequest(path, signal, html = false) {
  return new Request(new URL(path, self.location.origin), {
    credentials: "omit",
    redirect: "error",
    cache: html ? "no-cache" : "force-cache",
    priority: "low",
    signal,
    headers: html ? { Accept: "text/html" } : {},
  });
}

async function retainReadingAsset(path, signal, budget) {
  const request = readingRequest(path, signal);
  if (await readCached(request, STATIC_CACHE)) return;
  const response = await fetch(request);
  const type = response.headers.get("content-type") || "";
  const expected = path.endsWith(".css")
    ? /^text\/css(?:;|$)/i
    : /^(?:text|application)\/javascript(?:;|$)/i;
  if (!permitsResponse(request, response) || response.redirected || !expected.test(type)) {
    await response.body?.cancel();
    throw new Error("Offline asset is not public");
  }
  const body = await boundedBody(response, budget);
  await storeResponse(
    request,
    new Response(body, { headers: copyHeaders(response) }),
    STATIC_CACHE,
    STATIC_LIMIT
  );
  if (!(await readCached(request, STATIC_CACHE))) throw new Error("Offline storage unavailable");
}

async function retainReadingPage(path, signal) {
  const request = readingRequest(path, signal, true);
  const response = await fetch(request);
  if (!permitsResponse(request, response)) {
    await storeResponse(request, response, PAGES_CACHE, PAGES_LIMIT);
    await response.body?.cancel();
    return;
  }
  if (
    response.redirected ||
    !/^text\/html(?:;|$)/i.test(response.headers.get("content-type") || "")
  ) {
    await response.body?.cancel();
    return;
  }
  const body = await boundedBody(response, { remaining: READING_HTML_LIMIT });
  const assets = readingAssets(await body.text());
  const budget = { remaining: READING_ASSET_LIMIT };
  // Commit HTML last, so a first soft navigation also has its document bootstrap.
  for (const asset of assets) await retainReadingAsset(asset, signal, budget);
  if (signal.aborted) return;
  await storeResponse(
    request,
    new Response(body, { headers: copyHeaders(response) }),
    PAGES_CACHE,
    PAGES_LIMIT
  );
}

function retainReading(event) {
  const client = event.source;
  if (!client || client.type !== "window" || new URL(client.url).origin !== self.location.origin)
    return;
  const path = readingPath(event.data?.path);
  if (event.data?.type !== "episteme:retain-article" || !path) return;
  const previous = readingJobs.get(client.id);
  if (previous?.path === path) return previous.work;
  previous?.controller.abort();
  if (!previous && readingJobs.size >= 2) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), READING_TIMEOUT);
  const job = { path, controller };
  job.work = retainReadingPage(path, controller.signal)
    .catch(() => {})
    .finally(() => {
      clearTimeout(timer);
      if (readingJobs.get(client.id) === job) readingJobs.delete(client.id);
    });
  readingJobs.set(client.id, job);
  return job.work;
}

self.addEventListener("message", (event) => {
  const work = retainReading(event);
  if (work) event.waitUntil(work);
});
