import { expect, test, type Page } from "@playwright/test";

const errors = new WeakMap<Page, string[]>();
test.beforeEach(({ page }) => {
  const messages: string[] = [];
  errors.set(page, messages);
  page.on("pageerror", (error) => messages.push(error.message));
});
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

async function expectChineseDefinitions(page: Page) {
  await page.goto("/mathematics/concepts/fractal");
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  for (const [name, label] of [
    [/^M = \\{/, "序列"],
    [/^K_c = \\{/, "迭代"],
  ] as const) {
    const formula = page.getByRole("math", { name });
    await expect(formula.locator(".katex-html")).toContainText(label);
    await expect(formula.locator(".katex-error")).toHaveCount(0);
    expect(
      await formula.evaluate((element) => element.getBoundingClientRect().right)
    ).toBeLessThanOrEqual(320);
  }
}

async function expectChineseCasesScroll(page: Page) {
  await page.goto("/mathematics/concepts/number-theory");
  const formula = page.getByRole("math", { name: /\\begin\{cases\}.*二次非剩余/ });
  await expect(formula.locator(".katex-html")).toContainText("二次非剩余");
  await expect(formula.locator(".katex-error")).toHaveCount(0);
  await expect(formula).toHaveAttribute("tabindex", "0");
  await formula.scrollIntoViewIfNeeded();
  await formula.focus();
  await expect(formula).toBeFocused();
  await page.keyboard.press("ArrowRight", { delay: 120 });
  await expect.poll(() => formula.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
}

for (const theme of ["dark", "light"]) {
  test(`${theme}: renders Chinese definitions and scrolls wide cases on a narrow screen`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
    await expectChineseDefinitions(page);
    const formula = page.getByRole("math", { name: /^K_c = \\{/ });
    await formula.evaluate((element) => {
      element.scrollLeft = 0;
    });
    await formula
      .locator("..")
      .screenshot({ path: testInfo.outputPath(`chinese-formula-${theme}.png`) });
    await expectChineseCasesScroll(page);
  });
}

test("keeps real dollar prices literal", async ({ page }) => {
  await page.goto("/economics/knowledge-base/market-microstructure");
  const quote = page.locator(".md-p").filter({ hasText: "一只股票的当前报价" });
  await expect(quote).toContainText("$99.98/$100.02（买价$99.98，卖价$100.02）");
  await expect(quote.locator('[role="math"]')).toHaveCount(0);
});

test("renders published Chinese subscripts as mathematics", async ({ page }) => {
  await page.goto("/mathematics/mathematicians/archimedes");
  for (const tex of [String.raw`\rho_{流体}`, "V_{排开}"]) {
    const formula = page.getByRole("math", { name: tex, exact: true });
    await expect(formula.locator(".katex-html")).toBeAttached();
    await expect(formula.locator(".katex-error")).toHaveCount(0);
  }
});

test("serves readable Chinese formula snippets from the generated search corpus", async ({
  page,
  request,
}) => {
  const response = await request.get("/api/search", { params: { q: "央行政策利率" } });
  expect(response.status()).toBe(200);
  const { hits } = await response.json();
  const hit = hits.find(
    (item: { url: string }) =>
      item.url === "/economics/knowledge-base/central-banking-monetary-transmission"
  );
  expect(hit?.snippet).toContain("央行政策利率 → 银行间拆借利率");
  expect(hit?.snippet).not.toMatch(/[\\$]/);
  await page.goto(`/search?q=${encodeURIComponent("央行政策利率")}`);
  const result = page.getByTestId("body-results").getByRole("link", { name: /央行与货币政策传导/ });
  await expect(result.locator("..").locator("p")).toContainText("央行政策利率 → 银行间拆借利率");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("keeps Chinese definitions rendered and keyboard-scrollable", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await expectChineseDefinitions(page);
    await expectChineseCasesScroll(page);
  });
});
