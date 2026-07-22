#!/usr/bin/env node
/**
 * Bundle size checker.
 *
 * Runs `next build`, then inspects `.next/static/chunks/` to measure
 * gzipped JS and CSS sizes. Exits 1 if any threshold from
 * `docs/工程原则.md` is exceeded.
 *
 * Usage:  node scripts/bundle-check.mjs
 *         pnpm bundle-check
 */
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import {
  analyzeJsAssetOwnership,
  analyzeRouteAssets,
  findTailwindEntrypoints,
  getRouteCssBudget,
  isGenericArticleRoute,
} from "../performance/bundle-budget.mjs";

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const NEXT_DIR = join(ROOT, ".next");
const CHUNKS_DIR = join(NEXT_DIR, "static", "chunks");
const HOMEPAGE_HTML = join(NEXT_DIR, "server", "app", "index.html");
const HOMEPAGE_RSC = join(NEXT_DIR, "server", "app", "index.rsc");

// ---------------------------------------------------------------------------
// Thresholds (gzipped bytes) — from docs/工程原则.md
//
// `sharedInitialJs` is the bytes loaded on every route — Next.js's
// "First Load JS shared by all" minus per-route page chunk. We read it
// from .next/build-manifest.json's rootMainFiles + polyfillFiles.
//
// `singleChunkMax` is the gzip cap on any single chunk. Three.js + R3F
// inevitably ship one ~200 KB gzip chunk; cap is set above that so it
// passes while still flagging accidental new mega-chunks.
// ---------------------------------------------------------------------------
const BUDGET = {
  sharedInitialJs: 180 * 1024, // 180 KB — root+polyfill shared by every route
  homepageHtmlRaw: 500 * 1024,
  homepageHtmlGzip: 80 * 1024,
  homepageRscRaw: 100 * 1024,
  genericArticleJs: 220 * 1024,
  historyTimelineShell: 12 * 1024,
  historyTimelineCatalog: 32 * 1024,
  routeCss: {
    portal: 40 * 1024, // 40 KB — homepage regression budget
    domain: 40 * 1024, // 40 KB — root utilities + route-scoped domain styles
  },
  singleChunkMax: 285 * 1024, // 285 KB — accommodates the Three.js / R3F vendor chunk
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Recursively collect files matching an extension predicate.
 * @param {string} dir
 * @param {(ext: string) => boolean} predicate
 * @returns {string[]}
 */
function collectFiles(dir, predicate) {
  /** @type {string[]} */
  const files = [];
  if (!statSync(dir, { throwIfNoEntry: false })) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(full, predicate));
    } else if (predicate(extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Return the gzipped size of a file in bytes.
 * @param {string} filePath
 * @returns {number}
 */
function gzipSize(filePath) {
  const buf = readFileSync(filePath);
  return gzipSync(buf).length;
}

/**
 * Format bytes as a human-readable string (KB with one decimal).
 * @param {number} bytes
 * @returns {string}
 */
function fmt(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

/**
 * Find built chunks containing every marker. Marker combinations identify
 * generated history assets without relying on unstable content hashes.
 * @param {string[]} markers
 * @returns {{ path: string; raw: number; gzip: number }[]}
 */
function findJsEntriesContaining(markers) {
  return jsEntries.filter((entry) => {
    const content = readFileSync(join(ROOT, entry.path));
    return markers.every((marker) => content.includes(Buffer.from(marker)));
  });
}

// ---------------------------------------------------------------------------
// 1. Run next build (skipped when --skip-build is passed and .next exists,
//    typically because CI just ran the standalone build step)
// ---------------------------------------------------------------------------
const buildManifestPath = join(NEXT_DIR, "build-manifest.json");
const reusableProductionBuild = (() => {
  if (!statSync(join(NEXT_DIR, "BUILD_ID"), { throwIfNoEntry: false })) return false;
  if (!statSync(buildManifestPath, { throwIfNoEntry: false })) return false;
  const manifest = JSON.parse(readFileSync(buildManifestPath, "utf-8"));
  return !(manifest.lowPriorityFiles ?? []).some((file) => file.includes("/development/"));
})();
const skipBuild = process.argv.includes("--skip-build") && reusableProductionBuild;

console.log("");
console.log("=".repeat(70));
console.log("  BUNDLE SIZE CHECK");
console.log("=".repeat(70));
console.log("");

if (skipBuild) {
  console.log("  --skip-build set and .next/ is present → reusing existing build.");
  console.log("");
} else {
  console.log("  Running `next build` …");
  console.log("");
  const build = spawnSync("pnpm", ["exec", "next", "build", "--turbopack"], {
    cwd: ROOT,
    stdio: "pipe",
    encoding: "utf-8",
    env: { ...process.env, NODE_ENV: "production" },
  });

  if (build.status !== 0) {
    console.error("  ✗ Build failed. Output:\n");
    console.error(build.stderr || build.stdout);
    process.exit(1);
  }

  // Print a condensed version of the build output (last 40 lines).
  const buildLines = (build.stdout || "").split("\n").filter(Boolean);
  const tail = buildLines.slice(-40);
  for (const line of tail) {
    console.log("  " + line);
  }
  console.log("");
}

// ---------------------------------------------------------------------------
// 2. Analyse chunks
// ---------------------------------------------------------------------------
if (!statSync(CHUNKS_DIR, { throwIfNoEntry: false })) {
  console.error("  ✗ .next/static/chunks/ not found — did the build succeed?");
  process.exit(1);
}

const jsFiles = collectFiles(CHUNKS_DIR, (ext) => ext === ".js");
const cssFiles = collectFiles(CHUNKS_DIR, (ext) => ext === ".css");

/** @type {{ path: string; raw: number; gzip: number }[]} */
const jsEntries = jsFiles.map((f) => ({
  path: f.replace(ROOT, ""),
  raw: statSync(f).size,
  gzip: gzipSize(f),
}));

/** @type {{ path: string; raw: number; gzip: number }[]} */
const cssEntries = cssFiles.map((f) => ({
  path: f.replace(ROOT, ""),
  raw: statSync(f).size,
  gzip: gzipSize(f),
}));

const totalJsGzip = jsEntries.reduce((s, e) => s + e.gzip, 0);
const totalCssGzip = cssEntries.reduce((s, e) => s + e.gzip, 0);
const routeEntries = analyzeRouteAssets(NEXT_DIR);
const jsOwnership = analyzeJsAssetOwnership(NEXT_DIR, routeEntries);
const tailwindEntrypoints = findTailwindEntrypoints(join(ROOT, "app"));
const topRoutesByJs = [...routeEntries].sort((a, b) => b.jsGzip - a.jsGzip).slice(0, 10);
const topRoutesByCss = [...routeEntries].sort((a, b) => b.cssGzip - a.cssGzip).slice(0, 10);
const largestRouteJs = topRoutesByJs[0] ?? null;
const largestRouteCss = topRoutesByCss[0] ?? null;
const genericArticleRoutes = routeEntries.filter((entry) => isGenericArticleRoute(entry.route));
const largestGenericArticle =
  [...genericArticleRoutes].sort((a, b) => b.jsGzip - a.jsGzip)[0] ?? null;
const historyTimelineShellChunks = findJsEntriesContaining([
  "从三十万年前智人诞生到公元2100年",
  "正在载入",
]);
const historyTimelineCatalogChunks = findJsEntriesContaining([
  "控制用火",
  "星际文明雏形",
  "detailPageCount",
]);
const historyTimelineShell = historyTimelineShellChunks[0] ?? null;
const historyTimelineCatalog = historyTimelineCatalogChunks[0] ?? null;
const historyLongProseMarker = "摩洛哥Jebel Irhoud遗址";

/**
 * Sum the gzip size of the chunks listed under `rootMainFiles` +
 * `polyfillFiles` in build-manifest.json — these are loaded on every
 * route, so their sum is the real "shared initial JS" figure.
 */
function sharedInitialJsGzip() {
  const manifestPath = join(NEXT_DIR, "build-manifest.json");
  if (!statSync(manifestPath, { throwIfNoEntry: false })) return null;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  const sharedKeys = [...(manifest.rootMainFiles ?? []), ...(manifest.polyfillFiles ?? [])];
  let total = 0;
  for (const rel of sharedKeys) {
    const full = join(NEXT_DIR, rel);
    if (!statSync(full, { throwIfNoEntry: false })) continue;
    total += gzipSize(full);
  }
  return total;
}

const sharedJsGzip = sharedInitialJsGzip();
const homepageHtmlRaw = statSync(HOMEPAGE_HTML, { throwIfNoEntry: false })?.size ?? null;
const homepageHtmlGzip = homepageHtmlRaw === null ? null : gzipSize(HOMEPAGE_HTML);
const homepageRscRaw = statSync(HOMEPAGE_RSC, { throwIfNoEntry: false })?.size ?? null;

// ---------------------------------------------------------------------------
// 3. Report
// ---------------------------------------------------------------------------
console.log("-".repeat(70));
console.log("  JS CHUNKS (top 15 by gzipped size):");
console.log("-".repeat(70));
const topJs = [...jsEntries].sort((a, b) => b.gzip - a.gzip).slice(0, 15);
for (const e of topJs) {
  console.log(
    `    ${fmt(e.gzip).padStart(10)}  gzip  |  ${fmt(e.raw).padStart(10)}  raw  ${e.path}`
  );
}
console.log("");
console.log(`    Total JS gzip: ${fmt(totalJsGzip)}`);
console.log("");

if (cssEntries.length > 0) {
  console.log("-".repeat(70));
  console.log("  CSS FILES (top 15 by gzipped size):");
  console.log("-".repeat(70));
  const topCss = [...cssEntries].sort((a, b) => b.gzip - a.gzip).slice(0, 15);
  for (const e of topCss) {
    console.log(
      `    ${fmt(e.gzip).padStart(10)}  gzip  |  ${fmt(e.raw).padStart(10)}  raw  ${e.path}`
    );
  }
  console.log("");
  console.log(`    Total CSS gzip: ${fmt(totalCssGzip)}`);
  console.log("");
}

console.log("-".repeat(70));
console.log("  ROUTES (top 10 by gzipped JS / CSS):");
console.log("-".repeat(70));
for (const entry of topRoutesByJs) {
  console.log(`    JS  ${fmt(entry.jsGzip).padStart(10)}  ${entry.route}`);
}
console.log("");
for (const entry of topRoutesByCss) {
  console.log(`    CSS ${fmt(entry.cssGzip).padStart(10)}  ${entry.route}`);
}
console.log("");

// ---------------------------------------------------------------------------
// 4. Check thresholds
// ---------------------------------------------------------------------------
console.log("-".repeat(70));
console.log("  BUDGETS:");
console.log("-".repeat(70));
console.log(
  `    Shared initial JS  : ${
    sharedJsGzip === null ? "n/a" : fmt(sharedJsGzip)
  }   (budget ${fmt(BUDGET.sharedInitialJs)})`
);
console.log(
  `    Homepage HTML      : ${homepageHtmlRaw === null ? "n/a" : fmt(homepageHtmlRaw)} raw / ${homepageHtmlGzip === null ? "n/a" : fmt(homepageHtmlGzip)} gzip   (budgets ${fmt(BUDGET.homepageHtmlRaw)} / ${fmt(BUDGET.homepageHtmlGzip)})`
);
console.log(
  `    Homepage RSC       : ${homepageRscRaw === null ? "n/a" : fmt(homepageRscRaw)} raw   (budget ${fmt(BUDGET.homepageRscRaw)})`
);
console.log(
  `    Largest route CSS  : ${fmt(largestRouteCss?.cssGzip ?? 0)}   (budget ${fmt(largestRouteCss ? getRouteCssBudget(largestRouteCss.route, BUDGET.routeCss) : BUDGET.routeCss.domain)})${largestRouteCss ? `  ${largestRouteCss.route}` : ""}`
);
console.log(
  `    Homepage CSS       : ${fmt(routeEntries.find((entry) => entry.route === "/page")?.cssGzip ?? 0)}   (budget ${fmt(BUDGET.routeCss.portal)})`
);
console.log(
  `    Largest route JS   : ${fmt(largestRouteJs?.jsGzip ?? 0)}   (informational)${largestRouteJs ? `  ${largestRouteJs.route}` : ""}`
);
console.log(
  `    Generic article JS : ${fmt(largestGenericArticle?.jsGzip ?? 0)}   (budget ${fmt(BUDGET.genericArticleJs)})${largestGenericArticle ? `  ${largestGenericArticle.route}` : ""}`
);
console.log(
  `    History timeline shell: ${historyTimelineShell ? fmt(historyTimelineShell.gzip) : "n/a"}   (budget ${fmt(BUDGET.historyTimelineShell)})`
);
console.log(
  `    History timeline catalog: ${historyTimelineCatalog ? fmt(historyTimelineCatalog.gzip) : "n/a"}   (budget ${fmt(BUDGET.historyTimelineCatalog)})`
);
console.log(`    Total CSS (all)    : ${fmt(totalCssGzip)}   (informational)`);
console.log(
  `    Largest single chunk: ${fmt(topJs[0]?.gzip ?? 0)}   (budget ${fmt(BUDGET.singleChunkMax)})`
);
console.log(
  `    Route-referenced JS : ${fmt(jsOwnership.routeReferenced.gzip)} across ${jsOwnership.routeReferenced.assets.length} unique chunks`
);
console.log(
  `    Deferred-only JS    : ${fmt(jsOwnership.deferredOnly.gzip)} across ${jsOwnership.deferredOnly.assets.length} unique chunks`
);
console.log(`    Total chunks (all)  : ${fmt(totalJsGzip)}   (inventory only)`);
console.log(`    Tailwind entries    : ${tailwindEntrypoints.join(", ") || "none"}`);
console.log("");

/** @type {string[]} */
const violations = [];
/** @type {string[]} */
const warnings = [];

if (tailwindEntrypoints.length !== 1 || tailwindEntrypoints[0] !== "globals.css") {
  violations.push(
    `Tailwind must be compiled only by app/globals.css; found: ${tailwindEntrypoints.join(", ") || "none"}`
  );
}

if (routeEntries.length === 0) {
  violations.push("No App Router manifests found; route JS/CSS budgets cannot be verified");
}

if (genericArticleRoutes.length === 0) {
  violations.push("No generic article routes found; article JS budget cannot be verified");
}

if (historyTimelineShellChunks.length !== 1) {
  violations.push(
    `Expected one human-history timeline shell chunk; found ${historyTimelineShellChunks.length}`
  );
} else if (historyTimelineShell.gzip > BUDGET.historyTimelineShell) {
  violations.push(
    `History timeline shell (${fmt(historyTimelineShell.gzip)}) exceeds budget (${fmt(BUDGET.historyTimelineShell)})`
  );
}

if (historyTimelineCatalogChunks.length !== 1) {
  violations.push(
    `Expected one human-history timeline catalog chunk; found ${historyTimelineCatalogChunks.length}`
  );
} else if (historyTimelineCatalog.gzip > BUDGET.historyTimelineCatalog) {
  violations.push(
    `History timeline catalog (${fmt(historyTimelineCatalog.gzip)}) exceeds budget (${fmt(BUDGET.historyTimelineCatalog)})`
  );
}

if (
  historyTimelineShell &&
  historyTimelineCatalog &&
  historyTimelineShell.path === historyTimelineCatalog.path
) {
  violations.push("History timeline shell and catalog must remain separate chunks");
}

for (const entry of [historyTimelineShell, historyTimelineCatalog].filter(Boolean)) {
  const content = readFileSync(join(ROOT, entry.path), "utf8");
  if (content.includes(historyLongProseMarker)) {
    violations.push(`History long-form prose leaked into initial chunk ${entry.path}`);
  }
}

if (sharedJsGzip !== null && sharedJsGzip > BUDGET.sharedInitialJs) {
  violations.push(
    `Shared initial JS (${fmt(sharedJsGzip)}) exceeds budget (${fmt(BUDGET.sharedInitialJs)})`
  );
}

if (homepageHtmlRaw === null || homepageHtmlGzip === null || homepageRscRaw === null) {
  violations.push("Homepage build artifacts are missing; HTML/RSC budgets cannot be verified");
} else {
  if (homepageHtmlRaw > BUDGET.homepageHtmlRaw) {
    violations.push(
      `Homepage HTML raw (${fmt(homepageHtmlRaw)}) exceeds budget (${fmt(BUDGET.homepageHtmlRaw)})`
    );
  }
  if (homepageHtmlGzip > BUDGET.homepageHtmlGzip) {
    violations.push(
      `Homepage HTML gzip (${fmt(homepageHtmlGzip)}) exceeds budget (${fmt(BUDGET.homepageHtmlGzip)})`
    );
  }
  if (homepageRscRaw > BUDGET.homepageRscRaw) {
    violations.push(
      `Homepage RSC (${fmt(homepageRscRaw)}) exceeds budget (${fmt(BUDGET.homepageRscRaw)})`
    );
  }
}

const routeCssViolations = routeEntries.filter(
  (entry) => entry.cssGzip > getRouteCssBudget(entry.route, BUDGET.routeCss)
);
for (const entry of routeCssViolations.slice(0, 10)) {
  const budget = getRouteCssBudget(entry.route, BUDGET.routeCss);
  violations.push(
    `Route CSS ${entry.route} (${fmt(entry.cssGzip)}) exceeds budget (${fmt(budget)})`
  );
}
if (routeCssViolations.length > 10) {
  violations.push(`${routeCssViolations.length - 10} additional routes exceed their CSS budget`);
}

for (const entry of genericArticleRoutes.filter(
  (route) => route.jsGzip > BUDGET.genericArticleJs
)) {
  violations.push(
    `Generic article JS ${entry.route} (${fmt(entry.jsGzip)}) exceeds budget (${fmt(BUDGET.genericArticleJs)})`
  );
}

const largeChunks = jsEntries.filter((e) => e.gzip > BUDGET.singleChunkMax);
for (const chunk of largeChunks) {
  violations.push(
    `Single chunk ${chunk.path} = ${fmt(chunk.gzip)} > ${fmt(BUDGET.singleChunkMax)}`
  );
}

console.log("-".repeat(70));
if (violations.length === 0 && warnings.length === 0) {
  console.log("  ✓ All bundle sizes within budget.");
} else if (violations.length === 0) {
  console.log(`  ⚠ ${warnings.length} warning(s) (non-fatal):`);
  for (const w of warnings) console.log(`    • ${w}`);
} else {
  console.log(`  ✗ ${violations.length} violation(s):`);
  for (const v of violations) console.log(`    • ${v}`);
  if (warnings.length) {
    console.log(`  ⚠ ${warnings.length} additional warning(s):`);
    for (const w of warnings) console.log(`    • ${w}`);
  }
}
console.log("=".repeat(70));
console.log("");

process.exit(violations.length > 0 ? 1 : 0);
