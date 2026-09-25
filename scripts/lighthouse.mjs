// Run against a production server: `pnpm build && pnpm start`, then `pnpm lighthouse`.
// Route-specific baselines intentionally leave a small variance margin while
// still failing material regressions in score, LCP, TBT, or CLS.
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "@playwright/test";
import { startCompressingProxy } from "./performance/compressing-proxy.mjs";
import {
  LIGHTHOUSE_CONFIRMATION_TRACES,
  LIGHTHOUSE_ROUTE_BUDGETS,
  evaluateLighthouseBudget,
  hasValidLighthouseMetrics,
  readLighthouseMetrics,
  shouldConfirmLighthouseBudget,
} from "./performance/lighthouse-budget.mjs";

const UPSTREAM = process.env.LH_BASE || "http://localhost:3000";
// Measure what the CDN serves (see compressing-proxy.mjs); LH_NO_CDN=1 measures
// `next start` as-is.
const proxy = process.env.LH_NO_CDN === "1" ? null : await startCompressingProxy(UPSTREAM);
const BASE = proxy?.base ?? UPSTREAM;
const globalMinPerformance = process.env.LH_PERF_MIN ? Number(process.env.LH_PERF_MIN) : undefined;

if (globalMinPerformance !== undefined && !Number.isFinite(globalMinPerformance)) {
  throw new Error("LH_PERF_MIN must be a finite number");
}

const formatScore = (score) => String(score).padStart(3);
const formatMs = (value) => `${Math.round(value)}ms`.padStart(7);
const formatInp = (value) =>
  value == null || !Number.isFinite(value) ? "    n/a" : formatMs(value);
const violations = [];

console.log(`Lighthouse @ ${UPSTREAM}${proxy ? " (via CDN-like brotli proxy)" : ""}`);
if (proxy) await warmUpRoutes();
console.log(
  `${"route".padEnd(46)} perf  a11y  best  seo      LCP      TBT    CLS      INP  budget`
);

for (const budget of LIGHTHOUSE_ROUTE_BUDGETS) {
  let metrics = await measureRoute(budget);
  let routeViolations = evaluateLighthouseBudget(metrics, budget, globalMinPerformance);
  for (
    let confirmation = 1;
    confirmation <= LIGHTHOUSE_CONFIRMATION_TRACES &&
    shouldConfirmLighthouseBudget(metrics, budget, globalMinPerformance);
    confirmation += 1
  ) {
    console.warn(
      `${budget.route}: ${routeViolations.join(", ") || "invalid trace"}; running confirmation trace ${confirmation}`
    );
    metrics = await measureRoute(budget);
    routeViolations = evaluateLighthouseBudget(metrics, budget, globalMinPerformance);
  }
  violations.push(...routeViolations.map((message) => `${budget.route}: ${message}`));

  console.log(
    `${budget.route.padEnd(46)} ${formatScore(metrics.performance)}  ${formatScore(metrics.accessibility)}  ${formatScore(metrics.bestPractices)}  ${formatScore(metrics.seo)}  ${formatMs(metrics.lcpMs)}  ${formatMs(metrics.tbtMs)}  ${metrics.cls.toFixed(3).padStart(5)}  ${formatInp(metrics.inpMs)}  ${routeViolations.length === 0 ? "PASS" : "FAIL"}`
  );
}

proxy?.close();

if (violations.length > 0) {
  console.error(`\nFAIL: ${violations.length} Lighthouse budget violation(s):`);
  for (const violation of violations) console.error(`  - ${violation}`);
  process.exit(1);
}

console.log("\nPASS: all representative routes are within their performance budgets.");

async function measureRoute({ route, throttlingMethod }) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"],
    });
    let metrics;
    try {
      const result = await lighthouse(BASE + route, {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        ...(throttlingMethod ? { throttlingMethod } : {}),
      });
      if (!result) throw new Error(`Lighthouse returned no result for ${route}`);
      metrics = readLighthouseMetrics(result.lhr);
    } finally {
      await chrome.kill();
    }
    if (hasValidLighthouseMetrics(metrics) || attempt === 2) return metrics;
    console.warn(`${route}: invalid performance trace, retrying once`);
  }
  throw new Error(`Lighthouse exhausted attempts for ${route}`);
}

// One untimed visit per route so the proxy has CDN-quality bodies cached,
// including data fetched after hydration (the graph payload).
async function warmUpRoutes() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const { route } of LIGHTHOUSE_ROUTE_BUDGETS) {
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 120_000 });
  }
  await browser.close();
  // Background max-quality compression of multi-MB bodies takes a few seconds.
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
