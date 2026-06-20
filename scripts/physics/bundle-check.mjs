#!/usr/bin/env node
/**
 * Bundle size checker.
 *
 * Runs `next build`, then inspects `.next/static/chunks/` to measure
 * gzipped JS and CSS sizes. Exits 1 if any budget threshold from
 * `docs/develop/05-performance-budget.md` is exceeded.
 *
 * Usage:  node scripts/bundle-check.mjs
 *         pnpm bundle-check
 */
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const NEXT_DIR = join(ROOT, ".next");
const CHUNKS_DIR = join(NEXT_DIR, "static", "chunks");

// ---------------------------------------------------------------------------
// Thresholds (gzipped bytes) — from docs/develop/05-performance-budget.md
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
  largestRouteCss: 40 * 1024, // 40 KB — largest single section stylesheet (per-route)
  singleChunkMax: 285 * 1024, // 285 KB — accommodates the Three.js / R3F vendor chunk
  // Sum of ALL route chunks — scales with the number of domains, so it is an
  // informational warn, not a hard gate. The page-load budgets that actually
  // matter (sharedInitialJs + singleChunkMax) stay well within limits. Raised
  // from 3000 KB (9-domain era) to 3400 KB now the app spans 12 domains plus
  // the molecule viewer (CDN, zero bundle) and SIR simulator.
  totalChunksWarn: 3400 * 1024, // 3400 KB — full 12-domain app surface (warn only)
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

// ---------------------------------------------------------------------------
// 1. Run next build (skipped when --skip-build is passed and .next exists,
//    typically because CI just ran the standalone build step)
// ---------------------------------------------------------------------------
const skipBuild =
  process.argv.includes("--skip-build") &&
  statSync(join(NEXT_DIR, "build-manifest.json"), { throwIfNoEntry: false });

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
  const build = spawnSync("pnpm", ["exec", "next", "build"], {
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
const cssDir = join(NEXT_DIR, "static", "css");
const cssFiles = collectFiles(cssDir, (ext) => ext === ".css");

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
// Each route loads its own section stylesheet, not the sum of all of them, so
// the per-route metric is the largest single CSS file, not the total.
const largestCssGzip = cssEntries.reduce((m, e) => Math.max(m, e.gzip), 0);

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

// ---------------------------------------------------------------------------
// 3. Report
// ---------------------------------------------------------------------------
console.log("-".repeat(70));
console.log("  JS CHUNKS (top 15 by gzipped size):");
console.log("-".repeat(70));
const topJs = [...jsEntries].sort((a, b) => b.gzip - a.gzip).slice(0, 15);
for (const e of topJs) {
  console.log(
    `    ${fmt(e.gzip).padStart(10)}  gzip  |  ${fmt(e.raw).padStart(10)}  raw  ${e.path}`,
  );
}
console.log("");
console.log(`    Total JS gzip: ${fmt(totalJsGzip)}`);
console.log("");

if (cssEntries.length > 0) {
  console.log("-".repeat(70));
  console.log("  CSS FILES:");
  console.log("-".repeat(70));
  for (const e of cssEntries) {
    console.log(
      `    ${fmt(e.gzip).padStart(10)}  gzip  |  ${fmt(e.raw).padStart(10)}  raw  ${e.path}`,
    );
  }
  console.log("");
  console.log(`    Total CSS gzip: ${fmt(totalCssGzip)}`);
  console.log("");
}

// ---------------------------------------------------------------------------
// 4. Check thresholds
// ---------------------------------------------------------------------------
console.log("-".repeat(70));
console.log("  BUDGETS:");
console.log("-".repeat(70));
console.log(
  `    Shared initial JS  : ${
    sharedJsGzip === null ? "n/a" : fmt(sharedJsGzip)
  }   (budget ${fmt(BUDGET.sharedInitialJs)})`,
);
console.log(
  `    Largest route CSS  : ${fmt(largestCssGzip)}   (budget ${fmt(BUDGET.largestRouteCss)})`,
);
console.log(`    Total CSS (all)    : ${fmt(totalCssGzip)}   (informational)`);
console.log(
  `    Largest single chunk: ${fmt(topJs[0]?.gzip ?? 0)}   (budget ${fmt(BUDGET.singleChunkMax)})`,
);
console.log(
  `    Total chunks (all)  : ${fmt(totalJsGzip)}   (warn at ${fmt(BUDGET.totalChunksWarn)})`,
);
console.log("");

/** @type {string[]} */
const violations = [];
/** @type {string[]} */
const warnings = [];

if (sharedJsGzip !== null && sharedJsGzip > BUDGET.sharedInitialJs) {
  violations.push(
    `Shared initial JS (${fmt(sharedJsGzip)}) exceeds budget (${fmt(BUDGET.sharedInitialJs)})`,
  );
}

if (largestCssGzip > BUDGET.largestRouteCss) {
  violations.push(
    `Largest route CSS (${fmt(largestCssGzip)}) exceeds budget (${fmt(BUDGET.largestRouteCss)})`,
  );
}

const largeChunks = jsEntries.filter((e) => e.gzip > BUDGET.singleChunkMax);
for (const chunk of largeChunks) {
  violations.push(
    `Single chunk ${chunk.path} = ${fmt(chunk.gzip)} > ${fmt(BUDGET.singleChunkMax)}`,
  );
}

if (totalJsGzip > BUDGET.totalChunksWarn) {
  warnings.push(
    `Total chunks (${fmt(totalJsGzip)}) above warn threshold (${fmt(BUDGET.totalChunksWarn)}) — review tree-shaking / lazy boundaries`,
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
