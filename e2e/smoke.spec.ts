import { expect, test } from "@playwright/test";
import { COVERAGE_DOMAIN_COUNT } from "@/lib/knowledge-continuum-coverage-meta";

test.describe("production smoke", () => {
  test("accepts repeated search parameters without a server error", async ({ page }) => {
    const params = new URLSearchParams([
      ["q", "苏格拉底"],
      ["q", "柏拉图"],
      ["domain", "philosophy"],
      ["domain", "economics"],
    ]);
    const response = await page.goto(`/search?${params}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("searchbox", { name: "搜索关键词" })).toHaveValue("苏格拉底");
    await expect(page.locator('a[href="/philosophy/thinkers/socrates"]').first()).toBeVisible();
  });

  test("random article lands on an article-depth path", async ({ page }) => {
    const response = await page.goto("/random");
    expect(response?.status()).toBe(200);
    const path = new URL(page.url()).pathname;
    expect(path.split("/").filter(Boolean).length).toBeGreaterThanOrEqual(3);
    expect(path).not.toBe("/daily");
    expect(path).not.toBe("/random");
  });

  test("opens the portal and reaches a server-rendered article through search", async ({
    page,
    isMobile,
  }) => {
    const pageErrors: Error[] = [];
    page.on("pageerror", (error) => pageErrors.push(error));

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 1, name: "从问题出发", exact: true })
    ).toBeVisible();

    await page.getByRole("button", { name: /打开搜索/ }).click();
    const search = page.getByRole("dialog", { name: "全站搜索" });
    await search.getByRole("textbox", { name: "搜索" }).fill("苏格拉底");

    const thinkerResult = search.locator('a[href="/philosophy/thinkers/socrates"]');
    await expect(thinkerResult).toBeVisible();
    for (const composition of [{ isComposing: true }, { keyCode: 229 }]) {
      await search.getByRole("textbox", { name: "搜索" }).dispatchEvent("keydown", {
        key: "Enter",
        bubbles: true,
        ...composition,
      });
      await expect(search).toBeVisible();
      await expect(page).toHaveURL(/\/$/);
    }
    if (!isMobile) {
      const popupPromise = page.context().waitForEvent("page");
      await thinkerResult.click({ modifiers: ["ControlOrMeta"] });
      const popup = await popupPromise;
      await expect(popup).toHaveURL(/\/philosophy\/thinkers\/socrates$/);
      await expect(page).toHaveURL(/\/$/);
      await expect(search).toBeVisible();
      await popup.close();
    }
    await thinkerResult.click();

    await expect(page).toHaveURL(/\/philosophy\/thinkers\/socrates$/);
    await expect(page.getByRole("heading", { name: "苏格拉底", exact: true })).toBeVisible();
    expect(pageErrors).toEqual([]);
  });

  test("keeps search keyboard focus out of the background and restores its trigger", async ({
    page,
  }) => {
    for (const state of ["empty", "history", "results"]) {
      await page.goto("/");
      await page.evaluate((mode) => {
        if (mode === "history")
          localStorage.setItem("uk-search-history", JSON.stringify(["苏格拉底"]));
        else localStorage.removeItem("uk-search-history");
      }, state);
      const trigger = page.getByRole("button", { name: /打开搜索/ });
      await trigger.focus();
      await trigger.press("Enter");
      const dialog = page.getByRole("dialog", { name: "全站搜索" });
      const input = dialog.getByRole("textbox", { name: "搜索" });
      await expect(input).toBeFocused();
      if (state === "empty") {
        await page.screenshot({ path: test.info().outputPath("search-focus.png") });
      }
      if (state === "results") {
        await input.fill("苏格拉底");
        await expect(dialog.locator('a[href="/philosophy/thinkers/socrates"]')).toBeVisible();
      }
      await page.keyboard.press("Shift+Tab");
      expect(
        await dialog.evaluate(
          (el) => el.contains(document.activeElement) || document.activeElement === document.body
        )
      ).toBe(true);
      await dialog.locator("a[href], button, input").last().focus();
      await page.keyboard.press("Tab");
      expect(
        await dialog.evaluate(
          (el) => el.contains(document.activeElement) || document.activeElement === document.body
        )
      ).toBe(true);
      expect(await dialog.evaluate((el) => el.matches(":modal"))).toBe(true);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
    }
  });

  test("religion article invites the ritual lab", async ({ page }) => {
    const home = await page.goto("/religion");
    expect(home?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "宗教学" })).toBeVisible();

    const article = await page.goto("/religion/religion-foundations/ritual-and-practice");
    expect(article?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "仪式与实践" })).toBeVisible();
    await page.getByRole("link", { name: /打开实验室/ }).click();
    await expect(page).toHaveURL(/\/religion\/ritual-lab$/);
    await page.getByRole("button", { name: "阈限", exact: true }).click();
    await expect(page.getByText(/中间状态/)).toBeVisible();
  });

  test("literature article invites the narrative lab", async ({ page }) => {
    const home = await page.goto("/literature");
    expect(home?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "文学与叙事" })).toBeVisible();

    const article = await page.goto("/literature/narrative-basics/what-is-a-story");
    expect(article?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "故事是什么" })).toBeVisible();
    await page.getByRole("link", { name: /打开实验室/ }).click();
    await expect(page).toHaveURL(/\/literature\/narrative-graph$/);
  });

  test("arts article invites the perspective lab", async ({ page }) => {
    const home = await page.goto("/arts");
    expect(home?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "艺术、建筑与美学" })).toBeVisible();

    const article = await page.goto("/arts/foundations/perspective-and-space");
    expect(article?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "透视与空间：一场视觉革命" })).toBeVisible();
    await page.getByRole("link", { name: /打开实验室/ }).click();
    await expect(page).toHaveURL(/\/arts\/perspective-lab$/);
  });

  test("engineering article invites the grid-flow lab", async ({ page }) => {
    const home = await page.goto("/engineering");
    expect(home?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "工程与技术" })).toBeVisible();

    const article = await page.goto("/engineering/energy/power-grid");
    expect(article?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "电网：最大的实时平衡系统" })).toBeVisible();
    await page.getByRole("link", { name: /打开实验室/ }).click();
    await expect(page).toHaveURL(/\/engineering\/grid-flow$/);
  });

  test("restores and advances a knowledge graph thought tour", async ({ page, isMobile }) => {
    const pageErrors: Error[] = [];
    page.on("pageerror", (error) => pageErrors.push(error));

    const initialStep = isMobile ? 2 : 3;
    const tourId = isMobile ? "modern-macro-diagnosis" : "macro-politics-psychology";
    const response = await page.goto(`/knowledge-graph?tourId=${tourId}&step=${initialStep}`);
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("button", { name: "连接引擎" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    if (isMobile) {
      const detailPanel = page.getByRole("dialog", { name: /详情$/ });
      await expect(detailPanel).toHaveCount(0);
      await expect(page.getByRole("link", { name: "阅读当前文章 →" })).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "下一步" })).toBeEnabled();
    await page.getByRole("button", { name: "下一步" }).click();

    await expect(page).toHaveURL(new RegExp(`tourId=${tourId}&step=${initialStep + 1}`));
    await expect(
      page.locator('button[aria-current="step"][aria-label^="聚焦路线步骤："]')
    ).toHaveCount(1);
    expect(pageErrors).toEqual([]);
  });
});

test.describe("progressive enhancement without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("keeps portal content, metadata and article links readable", async ({ page }) => {
    expect((await page.goto("/?utm_source=smoke"))?.status()).toBe(200);
    const homeCanonical = page.locator('link[rel="canonical"]');
    await expect(homeCanonical).toHaveAttribute("href", /^https?:\/\/[^/?#]+\/?$/);
    await expect(page).toHaveTitle("Episteme · 格致 — 从问题出发");
    await expect(page.getByRole("heading", { level: 1, name: "从问题出发" })).toBeVisible();
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "Episteme · 格致 — 从问题出发"
    );
    expect(
      await page.locator('script[type="application/ld+json"]').allTextContents()
    ).toContainEqual(expect.stringContaining('"@type":"WebSite"'));
    await expect(page.locator(".domain-card")).toHaveCount(COVERAGE_DOMAIN_COUNT);
    await expect(page.locator('.domain-card[href="/anthropology"]')).toHaveCount(1);
    const card = page.locator('.domain-card[href="/philosophy"]');
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveCSS("opacity", "1");
    await card.click();
    await expect(page).toHaveURL(/\/philosophy$/);

    expect((await page.goto("/philosophy/thinkers/socrates?utm_source=smoke"))?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "苏格拉底", exact: true })).toBeVisible();
    await expect(page).toHaveTitle("苏格拉底 — 哲学");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/philosophy\/thinkers\/socrates$/
    );
    await page.locator('main a[href="/philosophy/thinkers/plato"]').first().click();
    await expect(page).toHaveURL(/\/philosophy\/thinkers\/plato$/);
    await expect(page.getByRole("heading", { name: "柏拉图", exact: true })).toBeVisible();
  });
});

test.describe("reduced-motion portal", () => {
  test("keeps hydrated content visible without scroll transforms", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: /打开搜索/ }).click();
    await expect(page.getByRole("textbox", { name: "搜索" })).toBeFocused();
    await page.keyboard.press("Escape");
    const lastCard = page.locator(".domain-card").last();
    await lastCard.scrollIntoViewIfNeeded();
    await expect(lastCard).toHaveCSS("opacity", "1");
    await expect(lastCard).toHaveCSS("transform", "none");
    await expect(page.locator("[data-home-hero-copy]")).toHaveCSS("transform", "none");
    expect(
      await page
        .locator("[data-home-reveal]")
        .evaluateAll((nodes) => nodes.every((node) => getComputedStyle(node).opacity === "1"))
    ).toBe(true);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
    ).toBe(true);
  });
});
