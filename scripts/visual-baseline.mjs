// Before/after screenshot baseline for the design overhaul (not part of CI).
// Usage: node scripts/visual-baseline.mjs <label> [--only=/path,/path]
// Output: visual-baseline/<label>/<surface>.<theme>.<viewport>.png (gitignored)
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const BASE_URL = process.env.BASELINE_BASE ?? "http://localhost:3067";
const LABEL = process.argv[2] ?? "baseline";
const ONLY = process.argv
  .find((arg) => arg.startsWith("--only="))
  ?.slice("--only=".length)
  .split(",");

const SURFACES = [
  ["home", "/"],
  ["philosophy", "/philosophy"],
  ["plato", "/philosophy/thinkers/plato"],
  ["law", "/law"],
  ["religion", "/religion"],
  ["computer-science", "/computer-science"],
  ["law-article", "/law/foundations/why-law-exists"],
  ["cosmology", "/cosmology"],
  ["human-history", "/human-history"],
  ["read", "/read"],
  ["read-route", "/read/western-philosophy"],
  ["knowledge-graph", "/knowledge-graph"],
  ["search", "/search"],
  ["daily", "/daily"],
  ["not-found", "/this-page-does-not-exist"],
];
const THEMES = ["dark", "light"];
const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "390", width: 390, height: 844, isMobile: true, hasTouch: true },
];
// Long pages are clipped so a single PNG stays reviewable.
const MAX_CAPTURE_HEIGHT = 9000;
const SETTLE_MS = 1800;

// Scroll-triggered reveals ([data-reveal]) stay hidden in a full-page capture
// unless every section has actually entered the viewport once.
async function scrollThrough(page, step) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < Math.min(total, MAX_CAPTURE_HEIGHT); y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
}

const outDir = path.join(process.cwd(), "visual-baseline", LABEL);
await mkdir(outDir, { recursive: true });

const surfaces = ONLY ? SURFACES.filter(([, route]) => ONLY.includes(route)) : SURFACES;
const browser = await chromium.launch();
const failures = [];

for (const theme of THEMES) {
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile ?? false,
      hasTouch: viewport.hasTouch ?? false,
      deviceScaleFactor: 1,
      colorScheme: theme,
    });
    await context.addInitScript((selected) => {
      window.localStorage.setItem("theme", selected);
    }, theme);
    const page = await context.newPage();

    for (const [name, route] of surfaces) {
      const file = path.join(outDir, `${name}.${theme}.${viewport.name}.png`);
      try {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: "load", timeout: 180_000 });
        await page.waitForTimeout(SETTLE_MS);
        await page.screenshot({ path: file.replace(/\.png$/, ".fold.png") });
        await scrollThrough(page, viewport.height);
        const height = await page.evaluate(() => document.documentElement.scrollHeight);
        await page.screenshot({
          path: file,
          fullPage: true,
          clip: { x: 0, y: 0, width: viewport.width, height: Math.min(height, MAX_CAPTURE_HEIGHT) },
        });
        console.log(`✓ ${name}.${theme}.${viewport.name}`);
      } catch (error) {
        failures.push(`${name}.${theme}.${viewport.name}: ${error.message.split("\n")[0]}`);
        console.log(`✗ ${name}.${theme}.${viewport.name}`);
      }
    }
    await context.close();
  }
}

await browser.close();
console.log(`\n${outDir}`);
if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
}
