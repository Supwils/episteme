import { expect, test, type Page } from "@playwright/test";
import { serviceWorkerServer } from "./fixtures/service-worker-server";
import { startCompressingProxy } from "../scripts/performance/compressing-proxy.mjs";

test.use({ serviceWorkers: "allow" });

const pageErrors = new WeakMap<Page, string[]>();
test.beforeEach(({ page }) => {
  const errors: string[] = [];
  pageErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
});
test.afterEach(({ page }) => expect(pageErrors.get(page)).toEqual([]));

async function control(page: Page) {
  await page.evaluate(async () => {
    await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise<void>((resolve) =>
        navigator.serviceWorker.addEventListener("controllerchange", () => resolve(), {
          once: true,
        })
      );
    const worker = navigator.serviceWorker.controller!;
    if (worker.state !== "activated")
      await new Promise<void>((resolve) =>
        worker.addEventListener("statechange", () => {
          if (worker.state === "activated") resolve();
        })
      );
  });
}

async function updateControllingWorker(page: Page) {
  await page.evaluate(async () => {
    const changed = new Promise<void>((resolve) =>
      navigator.serviceWorker.addEventListener("controllerchange", () => resolve(), { once: true })
    );
    await (await navigator.serviceWorker.getRegistration())!.update();
    await changed;
    const worker = navigator.serviceWorker.controller!;
    if (worker.state !== "activated")
      await new Promise<void>((resolve) =>
        worker.addEventListener("statechange", () => {
          if (worker.state === "activated") resolve();
        })
      );
  });
}

test("production worker excludes daily no-store HTML while retaining public articles offline", async ({
  page,
  context,
}, testInfo) => {
  await page.goto("/robots.txt");
  await control(page);
  const response = await page.goto("/daily");
  expect(response?.headers()["cache-control"]).toContain("no-store");
  await page.goto("/philosophy/thinkers/socrates");
  await expect
    .poll(() =>
      page.evaluate(async () => Boolean(await caches.match("/philosophy/thinkers/socrates")))
    )
    .toBe(true);
  expect(await page.evaluate(async () => Boolean(await caches.match("/daily")))).toBe(false);
  await context.setOffline(true);
  const article = await page.reload();
  expect(article?.fromServiceWorker()).toBe(true);
  expect(article?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("苏格拉底");
  await expect(page.locator(".toc-rail")).toBeAttached();
  await page.screenshot({ path: testInfo.outputPath("offline-article.png") });
  const daily = await page.goto("/daily");
  expect(daily?.fromServiceWorker()).toBe(true);
  expect(daily?.status()).toBe(503);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("离线");
  await page.screenshot({ path: testInfo.outputPath("offline-unavailable.png") });
});

test("soft navigation retains a complete article for an offline reload", async ({
  page,
  context,
}, testInfo) => {
  await page.goto("/philosophy/thinkers");
  await control(page);
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.isNavigationRequest()) requests.push(request.url());
  });
  await page.locator('a[href="/philosophy/thinkers/socrates"]').first().click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("苏格拉底");
  expect(requests).toEqual([]);
  await expect
    .poll(
      () => page.evaluate(async () => Boolean(await caches.match("/philosophy/thinkers/socrates"))),
      { timeout: 20_000 }
    )
    .toBe(true);
  await context.setOffline(true);
  const response = await page.reload();
  expect(response?.status()).toBe(200);
  expect(response?.fromServiceWorker()).toBe(true);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("苏格拉底");
  await expect(page.locator(".toc-rail")).toBeAttached();
  await page.getByRole("button", { name: "专注阅读模式" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-reading-mode", "focus");
  await expect(page.getByRole("button", { name: "专注阅读模式" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await page.screenshot({ path: testInfo.outputPath("offline-soft-article.png") });
});

for (const theme of ["dark", "light"] as const) {
  test(`offline fallback remains readable and usable in ${theme} theme`, async ({
    page,
    context,
  }, testInfo) => {
    await page.goto("/robots.txt");
    await control(page);
    await page.evaluate((theme) => localStorage.setItem("theme", theme), theme);
    await context.setOffline(true);
    expect((await page.goto("/daily"))?.status()).toBe(503);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("当前离线");
    await expect(page.getByRole("link", { name: "重新加载" })).toHaveAttribute("href", "");
    await expect(page.getByRole("link", { name: "返回首页" })).toHaveAttribute("href", "/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "重新加载" })).toBeFocused();
    await page.screenshot({ path: testInfo.outputPath(`offline-${theme}.png`) });
    await context.setOffline(false);
    const [reloaded] = await Promise.all([
      page.waitForResponse((response) => response.request().isNavigationRequest()),
      page.getByRole("link", { name: "重新加载" }).click(),
    ]);
    expect(reloaded.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText("当前离线");
  });
}

test("compressed documents and bootstrap resources survive an offline reload", async ({
  page,
  context,
  baseURL,
}) => {
  const proxy = await startCompressingProxy(baseURL!);
  try {
    await page.goto(proxy.base + "/philosophy/thinkers");
    await control(page);
    await page.locator('a[href="/philosophy/thinkers/socrates"]').first().click();
    await expect
      .poll(
        () =>
          page.evaluate(async () => Boolean(await caches.match("/philosophy/thinkers/socrates"))),
        { timeout: 20_000 }
      )
      .toBe(true);
    await context.setOffline(true);
    expect((await page.reload())?.status()).toBe(200);
    await page.getByRole("button", { name: "专注阅读模式" }).click();
    await expect(page.getByRole("button", { name: "专注阅读模式" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  } finally {
    proxy.close();
  }
});

test("activation retires owned legacy caches and leaves unrelated data intact", async ({
  page,
}) => {
  const server = await serviceWorkerServer();
  try {
    await page.goto(server.origin);
    await page.evaluate(async () => {
      await caches.open("unrelated-cache");
      await caches.open("pages-v3");
      await caches.open("episteme-pages-v1");
    });
    await control(page);
    const names = await page.evaluate(() => caches.keys());
    expect(names).toContain("unrelated-cache");
    expect(names).not.toContain("pages-v3");
    expect(names).not.toContain("episteme-pages-v1");
  } finally {
    await server.close();
  }
});

test("upgrades a controlling worker and retires its old no-store copy", async ({
  page,
  context,
}) => {
  const oldWorker = `
    self.addEventListener('install', () => self.skipWaiting());
    self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
    self.addEventListener('fetch', event => {
      if (new URL(event.request.url).pathname === '/doc/no-store')
        event.respondWith(caches.open('pages-v3').then(cache => cache.match(event.request)));
    });`;
  const server = await serviceWorkerServer(oldWorker);
  try {
    await page.goto(server.origin);
    await control(page);
    await page.evaluate(async () => {
      await (
        await caches.open("pages-v3")
      ).put(
        "/doc/no-store",
        new Response("old no-store page", { headers: { "Cache-Control": "no-store" } })
      );
      await caches.open("unrelated-cache");
    });
    expect(await (await page.goto(server.origin + "/doc/no-store"))?.text()).toBe(
      "old no-store page"
    );
    server.updateWorker();
    await updateControllingWorker(page);
    const names = await page.evaluate(() => caches.keys());
    expect(names).toContain("unrelated-cache");
    expect(names).not.toContain("pages-v3");
    await context.setOffline(true);
    const response = await page.goto(server.origin + "/doc/no-store");
    expect(response?.status()).toBe(503);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("当前离线");
  } finally {
    await server.close();
  }
});

test("bounds unhashed asset storage and keeps the latest completed write", async ({ page }) => {
  const server = await serviceWorkerServer();
  try {
    await page.goto(server.origin);
    await control(page);
    await page.evaluate(async () => {
      for (let index = 0; index < 220; index++) await (await fetch(`/asset/${index}.json`)).text();
    });
    await expect
      .poll(() => page.evaluate(async () => Boolean(await caches.match("/asset/219.json"))))
      .toBe(true);
    await expect
      .poll(() =>
        page.evaluate(async () => {
          const name = (await caches.keys()).find((name) => name.includes("assets-"));
          return (await (await caches.open(name!)).keys()).length;
        })
      )
      .toBeLessThanOrEqual(200);
    const keys = await page.evaluate(async () => {
      const name = (await caches.keys()).find((name) => name.includes("assets-"));
      if (!name) throw new Error("Missing asset cache");
      return (await (await caches.open(name)).keys()).map((key) => new URL(key.url).pathname);
    });
    expect(keys.length).toBeLessThanOrEqual(200);
    expect(keys).toContain("/asset/219.json");
    expect(keys).not.toContain("/asset/0.json");
  } finally {
    await server.close();
  }
});
