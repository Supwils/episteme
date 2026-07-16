// Run against a production server: `pnpm build && pnpm start`, then `pnpm lighthouse`.
// Route-specific baselines intentionally leave a small variance margin while
// still failing material regressions in score, LCP, TBT, or CLS.
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import {
  LIGHTHOUSE_ROUTE_BUDGETS,
  evaluateLighthouseBudget,
  readLighthouseMetrics,
} from "./performance/lighthouse-budget.mjs";

const BASE = process.env.LH_BASE || "http://localhost:3000";
const globalMinPerformance = process.env.LH_PERF_MIN ? Number(process.env.LH_PERF_MIN) : undefined;

if (globalMinPerformance !== undefined && !Number.isFinite(globalMinPerformance)) {
  throw new Error("LH_PERF_MIN must be a finite number");
}

const formatScore = (score) => String(score).padStart(3);
const formatMs = (value) => `${Math.round(value)}ms`.padStart(7);
const violations = [];
const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });

try {
  const options = { port: chrome.port, output: "json", logLevel: "error" };
  console.log(`Lighthouse @ ${BASE}`);
  console.log(`${"route".padEnd(46)} perf  a11y  best  seo      LCP      TBT    CLS  budget`);

  for (const budget of LIGHTHOUSE_ROUTE_BUDGETS) {
    const result = await lighthouse(BASE + budget.route, options);
    if (!result) throw new Error(`Lighthouse returned no result for ${budget.route}`);

    const metrics = readLighthouseMetrics(result.lhr);
    const routeViolations = evaluateLighthouseBudget(metrics, budget, globalMinPerformance);
    violations.push(...routeViolations.map((message) => `${budget.route}: ${message}`));

    console.log(
      `${budget.route.padEnd(46)} ${formatScore(metrics.performance)}  ${formatScore(metrics.accessibility)}  ${formatScore(metrics.bestPractices)}  ${formatScore(metrics.seo)}  ${formatMs(metrics.lcpMs)}  ${formatMs(metrics.tbtMs)}  ${metrics.cls.toFixed(3).padStart(5)}  ${routeViolations.length === 0 ? "PASS" : "FAIL"}`
    );
  }
} finally {
  await chrome.kill();
}

if (violations.length > 0) {
  console.error(`\nFAIL: ${violations.length} Lighthouse budget violation(s):`);
  for (const violation of violations) console.error(`  - ${violation}`);
  process.exit(1);
}

console.log("\nPASS: all representative routes are within their performance budgets.");
