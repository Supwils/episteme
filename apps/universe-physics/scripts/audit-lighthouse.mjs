#!/usr/bin/env node
/**
 * Lighthouse CI audit.
 *
 * Starts `next start` on an ephemeral port, runs a Lighthouse performance
 * audit, then checks scores against the thresholds defined in
 * `docs/develop/05-performance-budget.md`.
 *
 * Gracefully skips if `lighthouse` / `chrome-launcher` are not installed
 * (exits 0 so CI is not blocked by missing optional deps).
 *
 * Usage:  node scripts/audit-lighthouse.mjs
 *         pnpm audit:lighthouse
 */
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ---------------------------------------------------------------------------
// Thresholds
// ---------------------------------------------------------------------------
const THRESHOLDS = {
  performance: 80,
  accessibility: 90,
  bestPractices: 80,
  seo: 80,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Wait for a URL to respond with a 2xx/3xx status.
 * @param {string} url
 * @param {number} [timeoutMs=30000]
 * @returns {Promise<boolean>}
 */
async function waitForServer(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.status < 500) return true;
    } catch {
      // server not ready yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

/**
 * Format a score as a percentage string.
 * @param {number} score  0–1 float
 * @returns {string}
 */
function scoreStr(score) {
  return Math.round(score * 100).toString();
}

/**
 * Return a pass/fail marker.
 * @param {boolean} pass
 * @returns {string}
 */
function marker(pass) {
  return pass ? "✓" : "✗";
}

// ---------------------------------------------------------------------------
// 1. Try importing optional deps
// ---------------------------------------------------------------------------
let lighthouse;
let chromeLauncher;

try {
  lighthouse = (await import("lighthouse")).default;
  chromeLauncher = await import("chrome-launcher");
} catch {
  console.log("");
  console.log("=".repeat(70));
  console.log("  LIGHTHOUSE AUDIT — SKIPPED");
  console.log("=".repeat(70));
  console.log("");
  console.log("  Optional dependencies not installed.");
  console.log("  To enable this script, run:");
  console.log("");
  console.log("    pnpm add -D lighthouse chrome-launcher");
  console.log("");
  console.log("=".repeat(70));
  console.log("");
  process.exit(0);
}

// ---------------------------------------------------------------------------
// 2. Start Next.js server
// ---------------------------------------------------------------------------
const PORT = 4020 + Math.floor(Math.random() * 100);
const URL = `http://localhost:${PORT}`;

console.log("");
console.log("=".repeat(70));
console.log("  LIGHTHOUSE AUDIT");
console.log("=".repeat(70));
console.log("");
console.log(`  Starting Next.js server on port ${PORT} …`);

const server = spawn("pnpm", ["exec", "next", "start", "-p", String(PORT)], {
  cwd: ROOT,
  stdio: "ignore",
  env: { ...process.env, NODE_ENV: "production" },
});

let chrome;
let exitCode = 0;

try {
  const ready = await waitForServer(URL);
  if (!ready) {
    throw new Error(`Server did not respond at ${URL} within 30 s`);
  }
  console.log("  Server ready.\n");

  // ---------------------------------------------------------------------------
  // 3. Launch Chrome & run Lighthouse
  // ---------------------------------------------------------------------------
  console.log("  Launching Chrome …");
  chrome = await chromeLauncher.launch({ chromeFlags: ["--headless", "--no-sandbox"] });

  console.log(`  Running Lighthouse against ${URL} …\n`);
  const result = await lighthouse(URL, {
    port: chrome.port,
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });

  const categories = result.lhr.categories;

  // ---------------------------------------------------------------------------
  // 4. Report scores
  // ---------------------------------------------------------------------------
  console.log("-".repeat(70));
  console.log("  SCORES:");
  console.log("-".repeat(70));

  const checks = [
    { key: "performance", label: "Performance", threshold: THRESHOLDS.performance },
    { key: "accessibility", label: "Accessibility", threshold: THRESHOLDS.accessibility },
    { key: "best-practices", label: "Best Practices", threshold: THRESHOLDS.bestPractices },
    { key: "seo", label: "SEO", threshold: THRESHOLDS.seo },
  ];

  for (const check of checks) {
    const cat = categories[check.key];
    if (!cat) continue;
    const score = cat.score ?? 0;
    const pass = score * 100 >= check.threshold;
    console.log(
      `    ${marker(pass)} ${check.label.padEnd(18)} ${scoreStr(score).padStart(3)} / 100  (min: ${check.threshold})`,
    );
    if (!pass) exitCode = 1;
  }

  console.log("");

  // ---------------------------------------------------------------------------
  // 5. Key metrics
  // ---------------------------------------------------------------------------
  const audits = result.lhr.audits;
  const metricKeys = [
    "first-contentful-paint",
    "largest-contentful-paint",
    "total-blocking-time",
    "cumulative-layout-shift",
    "speed-index",
  ];

  console.log("-".repeat(70));
  console.log("  KEY METRICS:");
  console.log("-".repeat(70));

  for (const key of metricKeys) {
    const audit = audits[key];
    if (!audit) continue;
    const display = audit.displayValue ?? "—";
    console.log(`    ${audit.title.padEnd(30)} ${display}`);
  }
  console.log("");

  console.log("=".repeat(70));
  if (exitCode === 0) {
    console.log("  ✓ All scores meet thresholds.");
  } else {
    console.log("  ✗ One or more scores below threshold.");
  }
  console.log("=".repeat(70));
  console.log("");
} catch (err) {
  console.error("");
  console.error("  ✗ Lighthouse audit failed:");
  console.error(`    ${err.message}`);
  console.error("");
  exitCode = 1;
} finally {
  // ---------------------------------------------------------------------------
  // 6. Cleanup
  // ---------------------------------------------------------------------------
  if (chrome) {
    await chrome.kill();
  }
  server.kill("SIGTERM");
}

process.exit(exitCode);
