import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

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

export function getRouteCssBudget(route, budgets) {
  return route === "/page" ? budgets.portal : budgets.domain;
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
