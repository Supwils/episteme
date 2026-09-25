import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { brotliCompressSync, gzipSync } from "node:zlib";

function collectManifestFiles(dir) {
  const files = [];
  if (!statSync(dir, { throwIfNoEntry: false })) return files;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectManifestFiles(fullPath));
    } else if (entry.name === "app-build-manifest.json") {
      files.push(fullPath);
    }
  }

  return files;
}

function collectCssFiles(dir) {
  const files = [];
  if (!statSync(dir, { throwIfNoEntry: false })) return files;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectCssFiles(fullPath));
    } else if (entry.name.endsWith(".css")) {
      files.push(fullPath);
    }
  }

  return files;
}

function collectJsFiles(dir) {
  const files = [];
  if (!statSync(dir, { throwIfNoEntry: false })) return files;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectJsFiles(fullPath));
    } else if (entry.name.endsWith(".js")) {
      files.push(fullPath);
    }
  }

  return files;
}

function gzipAsset(nextDir, asset) {
  const assetPath = join(nextDir, asset);
  if (!statSync(assetPath, { throwIfNoEntry: false })) {
    throw new Error(`Route manifest references a missing asset: ${asset}`);
  }
  return gzipSync(readFileSync(assetPath)).length;
}

export function analyzeRouteAssets(nextDir) {
  const manifests = collectManifestFiles(join(nextDir, "server", "app"));
  const assetsByRoute = new Map();

  for (const manifestPath of manifests) {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    for (const [route, assets] of Object.entries(manifest.pages ?? {})) {
      const routeAssets = assetsByRoute.get(route) ?? new Set();
      for (const asset of assets) {
        if (asset.endsWith(".js") || asset.endsWith(".css")) routeAssets.add(asset);
      }
      assetsByRoute.set(route, routeAssets);
    }
  }

  return [...assetsByRoute.entries()]
    .map(([route, assets]) => {
      const js = [...assets].filter((asset) => asset.endsWith(".js"));
      const css = [...assets].filter((asset) => asset.endsWith(".css"));
      return {
        route,
        js,
        css,
        jsGzip: js.reduce((total, asset) => total + gzipAsset(nextDir, asset), 0),
        cssGzip: css.reduce((total, asset) => total + gzipAsset(nextDir, asset), 0),
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));
}

export function analyzeJsAssetOwnership(nextDir, routeEntries) {
  const routeReferencedAssets = new Set(routeEntries.flatMap((entry) => entry.js));
  const allAssets = collectJsFiles(join(nextDir, "static", "chunks")).map((file) =>
    relative(nextDir, file)
  );
  const summarize = (assets) => ({
    assets: assets.sort(),
    gzip: assets.reduce((total, asset) => total + gzipAsset(nextDir, asset), 0),
  });

  return {
    routeReferenced: summarize(allAssets.filter((asset) => routeReferencedAssets.has(asset))),
    deferredOnly: summarize(allAssets.filter((asset) => !routeReferencedAssets.has(asset))),
  };
}

function brotliAsset(nextDir, asset) {
  return brotliCompressSync(readFileSync(join(nextDir, asset))).length;
}

// A stylesheet referenced by at least this share of pages is the site-wide
// sheet: fetched on a reader's first page, then cached (immutable) for the rest.
const SHARED_CSS_PAGE_SHARE = 0.9;

/**
 * CSS as a reader pays for it: brotli (what the CDN serves), split into the
 * site-wide sheet and each page's own additions, plus the first-visit total.
 */
export function analyzeCssDelivery(nextDir, routeEntries) {
  const pages = routeEntries.filter((entry) => entry.route.endsWith("/page"));
  const pageCount = new Map();
  for (const page of pages) {
    for (const asset of page.css) pageCount.set(asset, (pageCount.get(asset) ?? 0) + 1);
  }
  const brotli = new Map(
    [...pageCount.keys()].map((asset) => [asset, brotliAsset(nextDir, asset)])
  );
  const sum = (assets) => assets.reduce((total, asset) => total + brotli.get(asset), 0);
  const shared = [...pageCount]
    .filter(([, count]) => count >= pages.length * SHARED_CSS_PAGE_SHARE)
    .map(([asset]) => asset)
    .sort();

  return {
    shared: shared.map((asset) => ({ asset, brotli: brotli.get(asset) })),
    sharedBrotli: sum(shared),
    routes: pages.map((page) => ({
      route: page.route,
      incrementalBrotli: sum(page.css.filter((asset) => !shared.includes(asset))),
      totalBrotli: sum(page.css),
    })),
  };
}

export function findTailwindEntrypoints(appDir) {
  return collectCssFiles(appDir)
    .filter((file) => /^\s*@import\s+["']tailwindcss["'];/m.test(readFileSync(file, "utf8")))
    .map((file) => relative(appDir, file))
    .sort();
}

const GENERIC_ARTICLE_DOMAINS = [
  "chemistry",
  "computer-science",
  "earth-science",
  "linguistics",
  "medicine",
  "political-science",
  "sociology",
];

export function isGenericArticleRoute(route) {
  return (
    route.endsWith("/[slug]/page") &&
    ((!route.includes("/frontier/") &&
      GENERIC_ARTICLE_DOMAINS.some((domain) => route.startsWith(`/${domain}/`))) ||
      route.startsWith("/psychology/methods/"))
  );
}
