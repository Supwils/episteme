import { expect, test, type Page } from "@playwright/test";
import { ATLAS } from "../lib/atlas";
import { nativeSwipe, tabToDialogStart } from "./fixtures/modal-input";

const errors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const messages: string[] = [];
  errors.set(page, messages);
  page.on("pageerror", (error) => messages.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
});
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));
const search = (page: Page) => page.getByRole("dialog", { name: "全站搜索", exact: true });
const navigation = (page: Page) => page.locator('dialog[aria-label="导航"]');
async function openSearch(page: Page) {
  const trigger = page.getByRole("button", { name: /打开搜索/ }).first();
  await expect(async () => {
    await trigger.click();
    await expect(search(page)).toBeVisible({ timeout: 1000 });
  }).toPass();
  await expect(search(page).getByRole("textbox", { name: "搜索", exact: true })).toBeFocused();
  return trigger;
}
async function openNavigation(page: Page) {
  const trigger = page.getByRole("button", { name: "打开菜单", exact: true });
  await expect(async () => {
    await trigger.click();
    await expect(page.getByRole("dialog", { name: "导航", exact: true })).toBeVisible({
      timeout: 1000,
    });
  }).toPass();
  await expect(navigation(page).locator(".atlas-sheet")).toBeVisible();
  await expect(navigation(page).locator(".atlas-sheet__toggle")).toHaveCount(ATLAS.length);
  return trigger;
}
async function expectUnlocked(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.style.overflowY)).toBe("");
  await expect.poll(() => page.evaluate(() => document.body.style.overflowY)).toBe("");
}

test("search blocks background wheel scrolling and restores its opener without a page jump", async ({
  page,
  browserName,
  isMobile,
}) => {
  test.skip(
    browserName === "webkit" && isMobile,
    "Playwright does not support wheel input in mobile WebKit; native touch is checked separately in Chromium."
  );
  await page.goto("/");
  const width = await page.evaluate(() => document.body.getBoundingClientRect().width);
  const trigger = await openSearch(page),
    before = await page.evaluate(() => scrollY);
  expect(await page.evaluate(() => document.body.getBoundingClientRect().width)).toBe(width);
  await page.mouse.move(8, 500);
  await page.mouse.wheel(0, 250);
  await page.waitForTimeout(250);
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await page.keyboard.press("Escape");
  await expect(search(page)).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await expectUnlocked(page);
  await page.mouse.wheel(0, 250);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 50);
});

test("search list relationships follow idle, results and cleared states", async ({ page }) => {
  await page.goto("/");
  await openSearch(page);
  const input = search(page).getByRole("textbox", { name: "搜索", exact: true });
  expect(await input.getAttribute("aria-controls")).toBeNull();
  await input.fill("苏格拉底");
  await expect(search(page).getByRole("listbox")).toBeVisible();
  await expect(input).toHaveAttribute("aria-controls", "gs-result-list");
  await expect(search(page).getByRole("option").first()).toBeVisible();
  const activeId = await input.getAttribute("aria-activedescendant");
  expect(activeId).toBeTruthy();
  expect(
    await input.evaluate((element) =>
      document.getElementById(element.getAttribute("aria-activedescendant")!)?.getAttribute("role")
    )
  ).toBe("option");
  await input.fill("");
  await expect.poll(() => input.getAttribute("aria-controls")).toBeNull();
  await expect(search(page).getByRole("listbox")).toHaveCount(0);
});

test("search blocks native touch scrolling and releases the page after its close button", async ({
  page,
  browserName,
  isMobile,
}) => {
  test.skip(
    browserName !== "chromium" || !isMobile,
    "Native touch input uses Chromium CDP and does not claim Safari device coverage."
  );
  await page.goto("/");
  const trigger = await openSearch(page);
  const before = await page.evaluate(() => scrollY);
  await nativeSwipe(page);
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await search(page).getByRole("button", { name: "关闭搜索", exact: true }).tap();
  await expect(search(page)).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await expectUnlocked(page);
  await nativeSwipe(page);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 25);
});

test("navigation is inert to background focus and only the top dialog consumes Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = await openNavigation(page),
    menu = navigation(page);
  expect(await menu.evaluate((element) => element.matches(":modal"))).toBe(true);
  const prior = await page.evaluate(() => document.activeElement?.outerHTML);
  await page.locator('[aria-label="Episteme · 格致 首页"]').focus();
  expect(await page.evaluate(() => document.activeElement?.outerHTML)).toBe(prior);
  await menu.getByRole("link").last().focus();
  await tabToDialogStart(page, menu);
  await menu.getByRole("button", { name: "关闭导航" }).focus();
  const focused = await page.evaluateHandle(() => document.activeElement);
  await page.keyboard.press("Control+k");
  await expect(search(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(search(page)).toHaveCount(0);
  await expect(menu).toBeVisible();
  expect(await page.evaluate((element) => document.activeElement === element, focused)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.style.overflowY)).toBe("hidden");
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expectUnlocked(page);
});

test("closing navigation on desktop resize keeps an overlaid search locked", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await openNavigation(page);
  await page.keyboard.press("Control+k");
  await expect(search(page)).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(navigation(page)).toHaveCount(0);
  await expect(search(page)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.style.overflowY)).toBe("hidden");
  await search(page).getByRole("button", { name: "关闭搜索" }).click();
  await expectUnlocked(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await openNavigation(page);
  await navigation(page).getByRole("button", { name: "关闭导航" }).click();
  await expectUnlocked(page);
});

test("navigation exits, history traversal and backdrop dismissal release their ownership", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = await openNavigation(page);
  await page.mouse.click(5, 15);
  await expect(navigation(page)).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await openNavigation(page);
  await navigation(page).getByRole("link", { name: "阅读路线", exact: true }).click();
  await expect(page).toHaveURL(/\/read$/);
  await expect(navigation(page)).toHaveCount(0);
  await expectUnlocked(page);
  await page.getByRole("link", { name: "首页", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await openNavigation(page);
  await page.goBack();
  await expect(page).toHaveURL(/\/read$/);
  await expect(navigation(page)).toHaveCount(0);
  await expectUnlocked(page);
});

for (const kind of ["atlas", "explore", "toc"] as const) {
  test(`${kind} yields Escape to the overlaid search and preserves the parent's focus`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: kind === "toc" ? 390 : 1280, height: 844 });
    await page.goto(kind === "toc" ? "/mathematics/concepts/derivative" : "/");
    await page
      .getByRole("button", { name: /打开搜索/ })
      .first()
      .focus();
    const trigger =
      kind === "atlas"
        ? page.getByRole("button", { name: "宇宙与自然", exact: true })
        : kind === "explore"
          ? page.getByRole("button", { name: "探索", exact: true })
          : page.getByRole("button", { name: "目录", exact: true });
    await trigger.focus();
    await page.keyboard.press(kind === "toc" ? "Enter" : "ArrowDown");
    const parent =
      kind === "atlas"
        ? page.getByRole("region", { name: "全部领域", exact: true })
        : kind === "explore"
          ? page.getByRole("menu", { name: "探索", exact: true })
          : page.getByRole("dialog", { name: "目录", exact: true });
    await expect(parent).toBeVisible();
    await expect
      .poll(() => parent.evaluate((element) => element.contains(document.activeElement)))
      .toBe(true);
    const focused = await page.evaluateHandle(() => document.activeElement);
    await page.keyboard.press("Control+k");
    await expect(search(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(search(page)).toHaveCount(0);
    await expect(parent).toBeVisible();
    expect(await page.evaluate((element) => document.activeElement === element, focused)).toBe(
      true
    );
    await page.keyboard.press("Escape");
    await expect(parent).toBeHidden();
    await expect(trigger).toBeFocused();
    await expectUnlocked(page);
  });
}

test("navigation retains every domain and reaches a domain through its cluster", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/life-science");
  await openNavigation(page);
  const menu = navigation(page);
  await expect(menu.locator(".atlas-cell")).toHaveCount(
    ATLAS.flatMap((cluster) => cluster.domains).length
  );
  await expect(menu.locator('.atlas-cell[href="/life-science"]')).toHaveAttribute(
    "aria-current",
    "page"
  );
  await menu.getByRole("button", { name: /社会与制度/ }).click();
  await menu.locator('.atlas-cell[href="/economics"]').click();
  await expect(page).toHaveURL(/\/economics$/);
  await expect(navigation(page)).toHaveCount(0);
  await expectUnlocked(page);
});

test("native navigation pull cancellation resets the panel and the next pull can dismiss it", async ({
  page,
  browserName,
  isMobile,
}) => {
  test.skip(browserName !== "chromium" || !isMobile, "Native touch uses Chromium CDP.");
  await page.goto("/");
  await openNavigation(page);
  const menu = navigation(page),
    panel = menu.locator(".mobile-nav-panel");
  await menu.getByRole("button", { name: /宇宙与自然/ }).click();
  const before = await page.evaluate(() => scrollY);
  await nativeSwipe(page, { x: 180, y: 400, dy: -120 });
  await expect.poll(() => panel.evaluate((element) => element.scrollTop)).toBeGreaterThan(25);
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await panel.evaluate((element) => {
    element.scrollTop = 0;
  });
  await nativeSwipe(page, { x: 180, y: 75, dy: 100, cancel: true });
  await expect(menu).toBeVisible();
  await expect(panel).toHaveCSS("transform", "none");
  expect(await page.evaluate(() => document.documentElement.style.overflowY)).toBe("hidden");
  await nativeSwipe(page, { x: 180, y: 75, dy: 100 });
  await expect(menu).toHaveCount(0);
  await expectUnlocked(page);
});

for (const route of ["/", "/life-science", "/mathematics/concepts/derivative"]) {
  for (const theme of ["dark", "light"]) {
    test(`${route} ${theme}: narrow dialogs retain visible 44px close controls`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 320, height: 700 });
      await page.addInitScript((theme) => localStorage.setItem("theme", theme), theme);
      await page.goto(route);
      await openNavigation(page);
      const menu = navigation(page),
        close = menu.getByRole("button", { name: "关闭导航" });
      await expect(close).toBeVisible();
      expect((await close.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      expect(await menu.evaluate((element) => getComputedStyle(element).position)).toBe("fixed");
      expect(
        await menu.evaluate((element) => element.getBoundingClientRect().width)
      ).toBeLessThanOrEqual(320);
      await close.click();
      await openSearch(page);
      const searchClose = search(page).getByRole("button", { name: "关闭搜索" });
      await expect(searchClose).toBeVisible();
      const box = (await searchClose.boundingBox())!;
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.x + box.width).toBeLessThanOrEqual(320);
      expect(await search(page).evaluate((element) => element.scrollWidth)).toBeLessThanOrEqual(
        320
      );
      await searchClose.click();
      await expectUnlocked(page);
    });
  }
}
