import { test, expect } from "@playwright/test";

/**
 * Anchors are chosen so each one exercises exactly one tier:
 *   定律与理    — sits mid-title in 《气体定律与理想气体》 and nowhere else. This is
 *                the query shape that returned nothing before the index was
 *                rebuilt with bigram tokenization.
 *   双缝干涉实验 — appears in one article's prose and in no title or heading, so a
 *                hit can only come from the body tier.
 */
const MID_TITLE = { query: "定律与理", url: "/chemistry/concepts/gas-laws" };
const BODY_ONLY = {
  query: "双缝干涉实验",
  title: "光的干涉与衍射",
};

type Page = import("@playwright/test").Page;

// The launcher wires its listeners on hydration, so an early press or tap can
// land on a page that is not listening yet; retry until the dialog opens.
async function openDialog(page: Page, open: (page: Page) => Promise<void>) {
  await page.goto("/");
  const input = page.locator('[placeholder*="搜索"]');
  await expect(async () => {
    await open(page);
    await expect(input).toBeVisible({ timeout: 2_000 });
  }).toPass({ timeout: 15_000 });
  return input;
}

const byTrigger = (page: Page) =>
  page
    .getByRole("button", { name: /打开搜索/ })
    .first()
    .click();

test("global search opens with Ctrl+K", async ({ page, isMobile }) => {
  test.skip(isMobile, "Keyboard shortcut is a desktop path");
  await openDialog(page, (target) => target.keyboard.press("Control+k"));
});

test("global search opens from the header trigger", async ({ page }) => {
  await openDialog(page, byTrigger);
});

test("preserves the same 120-code-point query through the dialog, API and results form", async ({
  page,
  request,
}) => {
  const input = await openDialog(page, byTrigger);
  const query = "𠀀".repeat(119) + "热";
  const bodyResponse = page.waitForResponse(
    (response) =>
      new URL(response.url()).pathname === "/api/search" &&
      new URL(response.url()).searchParams.get("q") === query
  );
  await input.fill(query);
  await expect(input).toHaveValue(query);
  expect((await (await bodyResponse).json()).query).toBe(query);
  await expect(page.locator(".gs-empty")).toContainText("未找到");
  expect(page.workers().map((worker) => new URL(worker.url()).pathname)).toContain(
    "/search.worker.js"
  );
  await input.press("Enter");
  await expect(page.getByRole("searchbox", { name: "搜索关键词" })).toHaveValue(query);
  expect(new URL(page.url()).searchParams.get("q")).toBe(query);

  const resultInput = page.getByRole("searchbox", { name: "搜索关键词" });
  await expect(async () => {
    await resultInput.fill(query + "超出");
    await expect(resultInput).toHaveValue(query);
  }).toPass();
  const response = await request.get("/api/search", { params: { q: query + "超出" } });
  expect(response.status()).toBe(200);
  expect((await response.json()).query).toBe(query);
});

test("commits an IME query at the code-point boundary", async ({ page }) => {
  const input = await openDialog(page, byTrigger);
  const prefix = "知".repeat(119);
  await input.dispatchEvent("compositionstart");
  await input.fill(prefix + "ziran");
  await expect(input).toHaveValue(prefix + "ziran");
  await input.fill(prefix + "自然");
  const bodyResponse = page.waitForResponse(
    (response) =>
      new URL(response.url()).pathname === "/api/search" &&
      new URL(response.url()).searchParams.get("q") === prefix + "自"
  );
  await input.dispatchEvent("compositionend", { data: "自然" });
  await expect(input).toHaveValue(prefix + "自");
  expect((await (await bodyResponse).json()).query).toBe(prefix + "自");
});

test.describe("search without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("submits all 120 supplementary characters through the native form", async ({ page }) => {
    const query = "𠀀".repeat(120);
    await page.goto("/search");
    await page.getByRole("searchbox", { name: "搜索关键词" }).fill(query);
    await page.getByRole("button", { name: "搜索", exact: true }).click();
    expect(new URL(page.url()).searchParams.get("q")).toBe(query);
    await expect(page.getByRole("searchbox", { name: "搜索关键词" })).toHaveValue(query);
    await expect(page.getByTestId("search-summary")).toContainText(query);
  });
});

test("finds an article from a query that starts mid-title", async ({ page }) => {
  const input = await openDialog(page, byTrigger);
  await input.fill(MID_TITLE.query);

  const hit = page.locator(`.gs-item[href="${MID_TITLE.url}"]`);
  await expect(hit).toBeVisible();

  await hit.click();
  await expect(page).toHaveURL(new RegExp(`${MID_TITLE.url}$`));
});

// The body tier can answer these too, so a bare "result visible" assertion
// would pass even with a dead title tier. A domain group label only renders
// for title-tier hits — this is the regression guard for the silent-worker
// failure where the whole title tier returned nothing in real browsers.
test("the title tier renders domain-grouped hits", async ({ page }) => {
  const input = await openDialog(page, byTrigger);
  await input.fill("苏格拉底");

  // A domain group label only renders for title-tier hits — this is the
  // regression guard for the silent-worker failure (the body tier can cover
  // a bare "result visible" assertion even with the title tier dead).
  await expect(page.locator(".gs-group-label", { hasText: "哲学思想" })).toBeVisible();
  await expect(
    page.locator('.gs-item[data-kind="thinker"][href="/philosophy/thinkers/socrates"]')
  ).toBeVisible();
});

test("finds an article by a phrase that only exists in its prose", async ({ page }) => {
  const input = await openDialog(page, byTrigger);
  await input.fill(BODY_ONLY.query);

  const bodyGroup = page.getByTestId("gs-body-group");
  // The body tier is a network round trip; mobile emulation can exceed the
  // 5s default when the dev server is busy compiling.
  await expect(bodyGroup).toBeVisible({ timeout: 15_000 });
  await expect(bodyGroup.getByText(BODY_ONLY.title, { exact: false })).toBeVisible();
});

test("the results page answers a shared query URL", async ({ page }) => {
  await page.goto(`/search?q=${encodeURIComponent(MID_TITLE.query)}`);

  await expect(page.getByTestId("search-summary")).toContainText(MID_TITLE.query);
  await expect(page.locator(`a[href="${MID_TITLE.url}"]`).first()).toBeVisible();
});

test("the results page reaches prose that title search cannot", async ({ page }) => {
  await page.goto(`/search?q=${encodeURIComponent(BODY_ONLY.query)}`);

  const bodyResults = page.getByTestId("body-results");
  await expect(bodyResults).toBeVisible();
  await expect(bodyResults.getByText(BODY_ONLY.title, { exact: false }).first()).toBeVisible();
});

test("an empty query still offers curated exits", async ({ page }) => {
  await page.goto("/search");

  const idle = page.getByTestId("search-idle");
  await expect(idle).toBeVisible();
  await expect(idle.getByRole("link", { name: "阅读路线" })).toHaveAttribute("href", "/read");
  await expect(idle.getByRole("link", { name: "随机一篇" })).toHaveAttribute("href", "/random");
});

test("empty results offer curated exits instead of a dead end", async ({ page }) => {
  await page.goto("/search?q=zzzznotanarticlezzzz");

  const empty = page.getByTestId("search-empty");
  await expect(empty).toBeVisible();
  await expect(empty.getByRole("link", { name: "阅读路线" })).toHaveAttribute("href", "/read");
  await expect(empty.getByRole("link", { name: "每日知识" })).toHaveAttribute("href", "/daily");
  await expect(empty.getByRole("link", { name: "奇趣知识" })).toHaveAttribute(
    "href",
    "/curiosities"
  );
  await expect(empty.getByRole("link", { name: "跨学科巧合" })).toHaveAttribute(
    "href",
    "/curiosities?filter=cross-domain"
  );
  await expect(empty.getByRole("link", { name: "随机一篇" })).toHaveAttribute("href", "/random");
});

test("a domain facet narrows the results without losing the other counts", async ({ page }) => {
  await page.goto(`/search?q=${encodeURIComponent("演化")}`);

  const facets = page.getByRole("navigation", { name: "按学科筛选" });
  await expect(facets).toBeVisible();

  const firstFacet = facets.getByRole("link").nth(1);
  const label = (await firstFacet.textContent())?.trim() ?? "";
  await firstFacet.click();

  await expect(page.getByTestId("search-summary")).toContainText("已筛选");
  // Every other domain is still offered, so narrowing is reversible.
  await expect(facets.getByRole("link").first()).toContainText("全部");
  expect(label.length).toBeGreaterThan(0);
});

test("the search dialog has no horizontal overflow on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const input = await openDialog(page, byTrigger);
  await input.fill(BODY_ONLY.query);
  await expect(page.getByTestId("gs-body-group")).toBeVisible({ timeout: 15_000 });

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
