import { expect, test, type Page } from "@playwright/test";

const errors = new WeakMap<Page, string[]>();
test.beforeEach(({ page }) => {
  const messages: string[] = [];
  errors.set(page, messages);
  page.on("pageerror", (error) => messages.push(`${page.url()}: ${error.message}`));
});
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

test("keeps registered article images responsive, loaded and attributed", async ({
  page,
}, testInfo) => {
  await page.goto("/arts/foundations/seeing-and-perception");
  const image = page.locator('img[src*="arts-descartes-ocular-refraction"]').first();
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("srcset", /640w/);
  await expect(image).toHaveAttribute("width", /^\d+$/);
  await expect(image).toHaveAttribute("height", /^\d+$/);
  await expect
    .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
    .toBeGreaterThan(0);
  await expect(image.locator("..").locator("figcaption")).toContainText("CC BY 4.0");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true
  );
  await page.screenshot({ path: testInfo.outputPath("registered-image.png") });
});

test("keeps repeated footnote citations unique and returns to the chosen citation", async ({
  page,
}) => {
  await page.goto("/cosmology/frontier/desi-dark-energy");
  const references = page.locator('a[href="#fn-desi_dr2"]');
  expect(await references.count()).toBeGreaterThan(1);
  const note = page.locator('[id="fn-desi_dr2"]');
  const referenceIds = await references.evaluateAll((links) => links.map((link) => link.id));
  expect(
    await note
      .locator(".md-footnotes__back")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")))
  ).toEqual(referenceIds.map((id) => `#${id}`));
  const reference = references.nth(1);
  const anchor = await reference.getAttribute("id");
  expect(anchor).toBeTruthy();
  await reference.click();
  await expect(page).toHaveURL(/#fn-desi_dr2$/);
  await expect(note).toBeVisible();
  await note.locator(`a[href="#${anchor}"]`).click();
  await expect(page).toHaveURL(new RegExp(`#${anchor}$`));
  const ids = await page
    .locator(".md-prose [id]")
    .evaluateAll((elements) => elements.map((element) => element.id));
  expect(new Set(ids).size).toBe(ids.length);
});

test("keeps code literal, formulas rendered and Wiki previews usable", async ({
  page,
  isMobile,
}) => {
  await page.goto("/computer-science/theory/logic-and-computation");
  const article = page.locator(".article-reading-surface");
  await expect(article.locator("pre code").filter({ hasText: "sort :" })).toBeVisible();
  await expect(article.locator('[role="math"]').first()).toBeAttached();
  const link = article
    .locator('a[href="/computer-science/theory/lambda-calculus-type-theory"]')
    .first();
  await link.scrollIntoViewIfNeeded();
  if (isMobile) await link.click();
  else await link.focus();
  await expect(page.getByRole("tooltip")).toBeVisible();
  await expect(page).toHaveURL(/\/computer-science\/theory\/logic-and-computation$/);
  if (isMobile) await expect(page.getByRole("link", { name: "前往阅读 →" })).toBeVisible();
});

test("keeps generated reading fragments attached to exactly one target", async ({ page }) => {
  await page.addInitScript(() => {
    const state = window as Window & { initialServerArticle?: Element };
    const observer = new MutationObserver(() => {
      const article = document.querySelector(".article-reading-surface");
      if (article) {
        state.initialServerArticle = article;
        observer.disconnect();
      }
    });
    observer.observe(document, { childList: true, subtree: true });
  });
  for (const route of [
    "/arts/foundations/seeing-and-perception",
    "/computer-science/theory/logic-and-computation",
    "/cosmology/frontier/desi-dark-energy",
  ]) {
    await page.goto(route);
    await expect(page.locator(".toc-rail")).toBeAttached();
    expect(
      await page.evaluate(() => {
        const state = window as Window & { initialServerArticle?: Element };
        return state.initialServerArticle === document.querySelector(".article-reading-surface");
      }),
      `${route}: hydration must reuse the server article`
    ).toBe(true);
    const issues = await page.locator(".article-reading-surface").evaluate((article) => {
      const ids = Array.from(article.querySelectorAll("[id]"), (element) => element.id);
      const documentIds = Array.from(document.querySelectorAll("[id]"), (element) => element.id);
      const problems = new Set(ids).size === ids.length ? [] : ["duplicate id"];
      for (const link of article.querySelectorAll(
        'a[data-heading-anchor], a.md-footnotes__back, a[id^="fnref-"]'
      )) {
        const href = link.getAttribute("href") ?? "";
        const target = decodeURIComponent(href.slice(1));
        if (!href.startsWith("#") || documentIds.filter((id) => id === target).length !== 1)
          problems.push(href);
      }
      return problems;
    });
    expect(issues, route).toEqual([]);
  }
});

test.describe("article without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("keeps image attribution and the following prose in the server document", async ({
    page,
  }) => {
    const response = await page.goto("/arts/foundations/seeing-and-perception");
    expect(response?.status()).toBe(200);
    await expect(page.locator("figure figcaption").filter({ hasText: "CC BY 4.0" })).toBeAttached();
    await expect(
      page.getByRole("heading", { level: 2, name: /^眼睛真正交给大脑的是什么/ })
    ).toBeAttached();
  });
});
