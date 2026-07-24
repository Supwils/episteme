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

async function openDialog(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const input = page.locator('[placeholder*="搜索"]');
  await expect(input).toBeVisible();
  return input;
}

test("global search opens with Ctrl+K", async ({ page }) => {
  await openDialog(page);
});

test("finds an article from a query that starts mid-title", async ({ page }) => {
  const input = await openDialog(page);
  await input.fill(MID_TITLE.query);

  const hit = page.locator(`.gs-item[href="${MID_TITLE.url}"]`);
  await expect(hit).toBeVisible();

  await hit.click();
  await expect(page).toHaveURL(new RegExp(`${MID_TITLE.url}$`));
});

test("finds an article by a phrase that only exists in its prose", async ({ page }) => {
  const input = await openDialog(page);
  await input.fill(BODY_ONLY.query);

  const bodyGroup = page.getByTestId("gs-body-group");
  await expect(bodyGroup).toBeVisible();
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
  const input = await openDialog(page);
  await input.fill(BODY_ONLY.query);
  await expect(page.getByTestId("gs-body-group")).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
