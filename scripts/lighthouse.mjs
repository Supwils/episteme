// Lighthouse audit over a few representative routes. Run against a *production*
// server for meaningful numbers:  pnpm build && pnpm start &  then  node scripts/lighthouse.mjs
// Prints perf / a11y / best-practices / SEO scores per page; exits non-zero if
// any performance score falls below THRESHOLD.
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const BASE = process.env.LH_BASE || "http://localhost:3000";
const THRESHOLD = Number(process.env.LH_PERF_MIN || 0); // informational by default
const ROUTES = [
  "/",
  "/earth-science/concepts/plate-boundaries",
  "/philosophy/thinkers/socrates",
  "/life-science/species/octopus",
  "/knowledge-graph",
];

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });
const opts = { port: chrome.port, output: "json", logLevel: "error" };

const pct = (s) => (s == null ? "—" : String(Math.round(s * 100)).padStart(3));
let worst = 100;
console.log(`Lighthouse @ ${BASE}\n${"route".padEnd(46)} perf  a11y  best  seo`);
for (const route of ROUTES) {
  const res = await lighthouse(BASE + route, opts);
  const c = res.lhr.categories;
  const perf = c.performance?.score ?? null;
  if (perf != null) worst = Math.min(worst, perf * 100);
  console.log(
    `${route.padEnd(46)} ${pct(perf)}  ${pct(c.accessibility?.score)}  ${pct(
      c["best-practices"]?.score
    )}  ${pct(c.seo?.score)}`
  );
}
await chrome.kill();
console.log(`\nlowest performance: ${Math.round(worst)} (threshold ${THRESHOLD})`);
if (worst < THRESHOLD) {
  console.error("FAIL: a route is below the performance threshold");
  process.exit(1);
}
