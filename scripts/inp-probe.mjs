// Interaction probe against a production server: `pnpm build && pnpm start`, then `pnpm inp-probe`.
// Reports Event Timing durations (INP candidates) after real clicks in Chromium and WebKit.
// Lab navigation traces are a proxy for field INP; they do not replace a phone CrUX panel.
import { chromium, webkit } from "@playwright/test";

const BASE_URL = process.env.SCAN_BASE ?? "http://localhost:3000";

const ROUTES = [
  {
    name: "门户搜索",
    path: "/",
    action: async (page) => {
      await page.getByRole("button", { name: /打开搜索/ }).click();
      await page.getByRole("dialog", { name: "全站搜索" }).getByRole("textbox", { name: "搜索" }).fill("苏格拉底");
    },
  },
  {
    name: "哲学人物",
    path: "/philosophy/thinkers/socrates",
    action: async (page) => {
      const related = page.locator('a[href^="/philosophy/thinkers/"]').nth(1);
      if (await related.count()) await related.click();
    },
  },
  {
    name: "物理学对话",
    path: "/universe-physics/dialogues/bohr-heisenberg",
    action: async (page) => {
      await page.getByRole("link", { name: "返回对话" }).click();
    },
  },
  {
    name: "仪式实验室",
    path: "/religion/ritual-lab",
    action: async (page) => {
      const liminal = page.getByRole("button", { name: "阈限", exact: true });
      await liminal.waitFor({ state: "visible", timeout: 5000 });
      await liminal.click();
    },
  },
];

const EVENT_TIMING_INIT = `(() => {
  window.__inpMax = 0;
  window.__inpEvents = [];
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!("interactionId" in entry) || !entry.interactionId) continue;
        window.__inpEvents.push({ name: entry.name, duration: entry.duration });
        window.__inpMax = Math.max(window.__inpMax, entry.duration);
      }
    });
    observer.observe({ type: "event", buffered: true, durationThreshold: 16 });
  } catch {
    window.__inpUnsupported = true;
  }
})()`;

async function waitForServer() {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) return;
    } catch {
      // Production server may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }
  throw new Error(`Local server did not become ready: ${BASE_URL}`);
}

async function probeBrowser(browserType, label) {
  const browser = await browserType.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const rows = [];
  for (const route of ROUTES) {
    await page.addInitScript(EVENT_TIMING_INIT);
    const response = await page.goto(`${BASE_URL}${route.path}`, { waitUntil: "load" });
    if (!response?.ok()) {
      rows.push({ name: route.name, path: route.path, status: response?.status() ?? "no response", inpMs: null });
      continue;
    }
    await page.waitForTimeout(800);
    try {
      await route.action(page);
    } catch {
      const fallback = page.locator("button:visible, a:visible").first();
      if (await fallback.count()) await fallback.click({ timeout: 2000 }).catch(() => {});
    }
    await page.waitForTimeout(400);
    const metrics = await page.evaluate(() => ({
      unsupported: Boolean(window.__inpUnsupported),
      inpMax: window.__inpMax ?? 0,
      count: Array.isArray(window.__inpEvents) ? window.__inpEvents.length : 0,
    }));
    rows.push({
      name: route.name,
      path: route.path,
      status: 200,
      inpMs: metrics.unsupported ? null : metrics.inpMax,
      events: metrics.count,
      unsupported: metrics.unsupported,
    });
  }
  await browser.close();
  console.log(`\n${label} @ ${BASE_URL}`);
  console.log(`${"route".padEnd(16)} ${"path".padEnd(48)} events     INP`);
  for (const row of rows) {
    const inp =
      row.status !== 200
        ? `HTTP ${row.status}`
        : row.unsupported
          ? "unsupported"
          : row.events === 0
            ? "no event"
            : `${Math.round(row.inpMs)}ms`;
    console.log(`${row.name.padEnd(16)} ${row.path.padEnd(48)} ${String(row.events ?? 0).padStart(6)}  ${inp}`);
  }
  return rows;
}

await waitForServer();
const chromiumRows = await probeBrowser(chromium, "Chromium");
const webkitRows = await probeBrowser(webkit, "WebKit / Safari");
const failed = [...chromiumRows, ...webkitRows].filter((row) => row.status !== 200);
if (failed.length > 0) {
  console.error(`\nINP probe failed: ${failed.length} navigation error(s).`);
  process.exitCode = 1;
} else {
  console.log("\nINP probe finished. Event Timing on desktop engines is a lab proxy, not phone CrUX.");
}
