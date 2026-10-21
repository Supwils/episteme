import { expect, test, type Locator, type Page } from "@playwright/test";

const errors = new WeakMap<Page, string[]>();
test.beforeEach(({ page }) => {
  const messages: string[] = [];
  errors.set(page, messages);
  page.on("pageerror", (error) => messages.push(error.message));
});
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

async function expectContained(page: Page, route: string) {
  await expect
    .poll(
      () =>
        page.locator(".article-reading-surface").evaluate((element) => {
          const viewport = document.documentElement;
          return Math.max(
            element.getBoundingClientRect().left + element.scrollWidth - viewport.clientWidth,
            viewport.scrollWidth - viewport.clientWidth
          );
        }),
      { message: route }
    )
    .toBeLessThanOrEqual(1);
}

async function scrollWithKeyboard(page: Page, target: Locator) {
  await target.scrollIntoViewIfNeeded();
  await target.focus();
  await expect(target).toBeFocused();
  // WebKit starts native scrolling on an animation frame while the key is held.
  await page.keyboard.press("ArrowRight", { delay: 120 });
  await expect.poll(() => target.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
}

for (const width of [320, 390]) {
  for (const theme of ["dark", "light"]) {
    test(`${width}px ${theme}: keeps long formulas and references visible in the viewport`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.addInitScript((theme) => localStorage.setItem("theme", theme), theme);
      for (const route of [
        "/mathematics/concepts/fractal",
        "/mathematics/concepts/pde",
        "/computer-science/concepts/recursion",
        "/cosmology/frontier/desi-dark-energy",
      ]) {
        await page.goto(route);
        await expect(page.locator(".toc-rail")).toBeAttached();
        await page.evaluate(() => document.fonts.ready.then(() => undefined));
        await expectContained(page, route);
      }
    });
  }
}

test("lets the keyboard scroll a long formula and adapts after a width change", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/mathematics/concepts/fractal");
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  const formula = page.getByRole("math", { name: /^\\mathcal\{H\}\^s/ });
  await expect(formula).toHaveAttribute("tabindex", "0");
  await expect(formula).toHaveAttribute("data-overflow", "");
  await scrollWithKeyboard(page, formula);
  const followingTextGap = await formula.evaluate((element) => {
    let next = element.nextSibling;
    while (next?.nodeType === Node.COMMENT_NODE) next = next.nextSibling;
    if (next?.nodeType !== Node.TEXT_NODE) throw new Error("Missing following prose");
    // CJK punctuation can hang beside the formula; measure the following prose itself.
    const offset = (next.textContent ?? "").search(/[\p{L}\p{N}]/u);
    if (offset < 0) throw new Error("Missing following prose character");
    const range = document.createRange();
    range.setStart(next, offset);
    range.setEnd(next, offset + 1);
    return range.getBoundingClientRect().top - element.getBoundingClientRect().bottom;
  });
  expect(followingTextGap).toBeGreaterThanOrEqual(0);
  await formula.locator("..").screenshot({ path: testInfo.outputPath("inline-math-320.png") });
  await page.setViewportSize({ width: 900, height: 900 });
  await expect(formula).not.toHaveAttribute("tabindex");
  await page.setViewportSize({ width: 320, height: 800 });
  await expect(formula).toHaveAttribute("tabindex", "0");
  const short = page.getByRole("math", { name: "J_c", exact: true }).first();
  await expect(short).not.toHaveAttribute("tabindex");
});

test("keeps existing display equations and wide tables keyboard-scrollable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/mathematics/concepts/information-geometry");
  const formula = page.locator('[role="math"].overflow-x-auto').first();
  await scrollWithKeyboard(page, formula);
  await expectContained(page, "display equation");
  await page.goto("/chemistry/frontier/pfas-destruction");
  const table = page.locator(".md-table").first();
  await scrollWithKeyboard(page, table);
  await expectContained(page, "wide table");
});

test("preserves ordinary inline math after a real client navigation", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/mathematics/concepts");
  const documents: string[] = [];
  page.on("request", (request) => {
    if (request.isNavigationRequest()) documents.push(request.url());
  });
  await page.locator('a[href="/mathematics/concepts/fractal"]').first().click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("分形");
  expect(documents).toEqual([]);
  const short = page.getByRole("math", { name: "J_c", exact: true }).first();
  await expect(short).not.toHaveAttribute("tabindex");
  expect(await short.evaluate((element) => getComputedStyle(element).display)).toBe("inline");
  await expectContained(page, "client navigation");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("keeps a long formula readable with native keyboard scrolling", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/mathematics/concepts/fractal");
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    const formula = page.getByRole("math", { name: /^\\mathcal\{H\}\^s/ });
    await scrollWithKeyboard(page, formula);
    await expectContained(page, "server-rendered formula");
  });
});
