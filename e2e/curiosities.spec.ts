import { expect, test, type Page } from "@playwright/test";
import { CURIOSITY_SUBJECTS, getAllCuriosities, isCrossDomainCuriosity } from "../lib/curiosities";
import type { WallFilter } from "../components/curiosities/CuriosityFilterSync";

const items = getAllCuriosities();
const errors = new WeakMap<Page, string[]>();
declare global {
  interface Window {
    curiosityDocumentId: number;
  }
}
const cards = (page: Page) => page.locator("[data-skip-target] h3");
const controls = (page: Page) => page.getByRole("group", { name: "学科筛选" });
const labelFor = (filter: WallFilter) =>
  filter === "all"
    ? /^全部/
    : filter === "cross-domain"
      ? /跨学科巧合/
      : new RegExp(CURIOSITY_SUBJECTS[filter].label);
const expectedTitles = (filter: WallFilter) =>
  items
    .filter(
      (item) =>
        filter === "all" ||
        (filter === "cross-domain" ? isCrossDomainCuriosity(item) : item.subject === filter)
    )
    .map((item) => item.title)
    .sort();

test.beforeEach(async ({ page }) => {
  const messages: string[] = [];
  errors.set(page, messages);
  page.on("pageerror", (error) => messages.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => (window.curiosityDocumentId = Math.random()));
});
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

async function expectFilter(page: Page, filter: WallFilter) {
  await expect(controls(page).getByRole("button", { name: labelFor(filter) })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expect(controls(page).locator('[aria-pressed="true"]')).toHaveCount(1);
  await expect
    .poll(async () => (await cards(page).allTextContents()).sort())
    .toEqual(expectedTitles(filter));
}
async function chooseFilter(page: Page, filter: WallFilter) {
  await expect(async () => {
    await controls(page)
      .getByRole("button", { name: labelFor(filter) })
      .click();
    await expectFilter(page, filter);
  }).toPass({ timeout: 15_000 });
}

for (const filter of ["cross-domain", "physics"] as const) {
  test(`${filter} direct URL and reload restore the matching selection and cards`, async ({
    page,
  }) => {
    await page.goto(`/curiosities?filter=${filter}`);
    await expectFilter(page, filter);
    await page.reload();
    await expectFilter(page, filter);
  });
}

test("every existing subject remains shareable without adding a history entry per click", async ({
  page,
}) => {
  await page.goto("/curiosities?from=daily#wall");
  await chooseFilter(page, "cross-domain");
  const historyLength = await page.evaluate(() => history.length);
  for (const subject of Object.keys(CURIOSITY_SUBJECTS) as Array<keyof typeof CURIOSITY_SUBJECTS>) {
    await chooseFilter(page, subject);
    expect(new URL(page.url()).searchParams.get("filter")).toBe(subject);
    expect(new URL(page.url()).searchParams.get("from")).toBe("daily");
    expect(new URL(page.url()).hash).toBe("#wall");
  }
  await chooseFilter(page, "all");
  expect(new URL(page.url()).searchParams.get("filter")).toBeNull();
  expect(new URL(page.url()).searchParams.get("from")).toBe("daily");
  expect(await page.evaluate(() => history.length)).toBe(historyLength);
});

test("reading a filtered card and returning restores the subject", async ({ page }) => {
  await page.goto("/curiosities");
  await chooseFilter(page, "physics");
  await expect(page).toHaveURL(/\?filter=physics$/);
  const documentId = await page.evaluate(() => window.curiosityDocumentId);
  const article = page.locator("[data-skip-target] a:has(h3)").first();
  const href = await article.getAttribute("href");
  expect(href).toBeTruthy();
  const articleURL = new URL(href!, page.url()).href;
  await article.click();
  await expect(page).toHaveURL(articleURL);
  await page.goBack();
  await expect(page).toHaveURL(/\/curiosities\?filter=physics$/);
  await expectFilter(page, "physics");
  expect(await page.evaluate(() => window.curiosityDocumentId)).toBe(documentId);
});

test("native query history updates the cards and keeps unrelated address state", async ({
  page,
}) => {
  await page.goto("/curiosities?from=daily#wall");
  await chooseFilter(page, "physics");
  const documentId = await page.evaluate(() => window.curiosityDocumentId);
  await page.evaluate(() => history.pushState(null, "", "?from=daily&filter=cross-domain#wall"));
  await expectFilter(page, "cross-domain");
  await page.goBack();
  await expectFilter(page, "physics");
  await page.goForward();
  await expectFilter(page, "cross-domain");
  await page.evaluate(() => history.replaceState(null, "", "?from=daily&filter=constructor#wall"));
  await expectFilter(page, "all");
  expect(new URL(page.url()).searchParams.get("filter")).toBe("constructor");
  await chooseFilter(page, "all");
  expect(new URL(page.url()).searchParams.get("filter")).toBeNull();
  expect(new URL(page.url()).searchParams.get("from")).toBe("daily");
  expect(new URL(page.url()).hash).toBe("#wall");
  expect(await page.evaluate(() => window.curiosityDocumentId)).toBe(documentId);
});

test("same-document filter traversal preserves the reader's shuffled order", async ({ page }) => {
  await page.goto("/curiosities");
  await chooseFilter(page, "physics");
  await chooseFilter(page, "all");
  await controls(page).getByRole("button", { name: "换个顺序", exact: true }).click();
  const order = await cards(page).allTextContents();
  await page.evaluate(() => history.pushState(null, "", "?filter=physics"));
  await expectFilter(page, "physics");
  await page.goBack();
  await expectFilter(page, "all");
  expect(await cards(page).allTextContents()).toEqual(order);
});

test.describe("static curiosity fallback", () => {
  test.use({ javaScriptEnabled: false });
  test("keeps every card and its article links readable without JavaScript", async ({ page }) => {
    const response = await page.goto("/curiosities?filter=physics");
    expect(response?.status()).toBe(200);
    await expect(cards(page)).toHaveCount(items.length);
    expect((await cards(page).allTextContents()).sort()).toEqual(expectedTitles("all"));
    await expect(page.locator("[data-skip-target] a:has(h3)").first()).toBeVisible();
  });
});
