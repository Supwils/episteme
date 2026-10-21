import { expect, test, type Page } from "@playwright/test";
import { getDailySelected, type DailySelected } from "../lib/daily-selector";
import { getHomeToday, type HomeToday } from "../lib/home-today";

const errors = new WeakMap<Page, string[]>();
test.beforeEach(({ page }) => {
  const messages: string[] = [];
  errors.set(page, messages);
  page.on("pageerror", (error) => messages.push(`${page.url()}: ${error.message}`));
});
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

test("refreshes the page date, all picks and historical events together at Beijing midnight", async ({
  page,
  request,
}) => {
  const current = (await (await request.get("/api/daily")).json()) as DailySelected;
  const before = new Date(`${current.date}T23:59:59+08:00`);
  const next = getDailySelected(new Date(before.getTime() + 2000));
  // Let hydration finish with running timers before pausing at the boundary.
  await page.clock.install({ time: new Date(`${current.date}T12:00:00+08:00`) });
  await page.route("**/api/daily/shuffle?offset=1", (route) =>
    route.fulfill({
      json: current,
      headers: { "X-Daily-Refresh-After": "1000", "Cache-Control": "no-store" },
    })
  );
  let refreshes = 0;
  await page.route("**/api/daily", (route) => {
    refreshes += 1;
    return route.fulfill({
      json: next,
      headers: { "X-Daily-Refresh-After": "86400000", "Cache-Control": "no-store" },
    });
  });
  await page.goto("/daily");
  await expect(page.getByRole("button", { name: "换一批知识" })).toBeEnabled();
  await page.clock.pauseAt(before);
  await page.getByRole("button", { name: "换一批知识" }).click();
  await expect(page.getByText("随机一组", { exact: true })).toBeVisible();
  expect(refreshes).toBe(0);
  await page.clock.fastForward(2000);
  await expect(page.locator(`time[datetime="${next.date}"]`)).toBeVisible();
  await expect(page.locator(".home-daily__date")).toHaveText(next.date);
  await expect(page.getByText("今日精选", { exact: true })).toBeVisible();
  await expect(page.getByText(next.question, { exact: true })).toBeAttached();
  const noteHeading = page.getByRole("heading", { name: "历史上的今天", exact: true });
  if (await noteHeading.count()) {
    const [, month, day] = next.date.split("-").map(Number);
    await expect(noteHeading.locator("..")).toContainText(`${month}月${day}日`);
  }
  expect(refreshes).toBe(1);
});

test("repairs a cached home snapshot and rolls its shelf and coincidence forward together", async ({
  page,
  request,
}) => {
  const server = (await (await request.get("/api/daily/home")).json()) as HomeToday;
  const tomorrow = new Date(new Date(`${server.date}T23:59:59+08:00`).getTime() + 86400000);
  const first = getHomeToday(tomorrow);
  const second = getHomeToday(new Date(tomorrow.getTime() + 2000));
  await page.clock.install({ time: tomorrow });
  await page.clock.pauseAt(tomorrow);
  let refreshes = 0;
  await page.route("**/api/daily/home", (route) => {
    const value = refreshes++ === 0 ? first : second;
    return route.fulfill({
      json: value,
      headers: {
        "X-Daily-Refresh-After": refreshes === 1 ? "1000" : "86400000",
        "Cache-Control": "no-store",
      },
    });
  });
  await page.goto("/");
  const today = page.locator(".home-today");
  await expect(today.locator(".home-section__meta")).toHaveText(first.date);
  await page.clock.fastForward(2000);
  await expect(today.locator(".home-section__meta")).toHaveText(second.date);
  expect(
    await today
      .locator(".home-today__shelf a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")))
  ).toEqual(second.shelf.map((pick) => pick.url));
  await expect(today.locator(".home-today__coincidence .home-today__pick-title")).toHaveText(
    second.coincidence.title
  );
  await expect(today.getByRole("heading", { name: "近期文章" })).toBeVisible();
  expect(refreshes).toBe(2);
});

test.describe("daily page without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("serves the current site date and its complete selection in the HTML", async ({
    page,
    request,
  }) => {
    const current = (await (await request.get("/api/daily")).json()) as DailySelected;
    const response = await page.goto("/daily");
    expect(response?.headers()["cache-control"]).toContain("no-store");
    await expect(page.getByRole("button", { name: "换一批知识" })).toBeDisabled();
    await expect(page.locator(`time[datetime="${current.date}"]`)).toBeVisible();
    await expect(page.locator(".home-daily__date")).toHaveText(current.date);
    for (const content of [
      page.getByText(current.question, { exact: true }),
      page.getByRole("heading", { name: current.mathematics.title, exact: true }),
    ]) {
      await expect(content).toBeVisible();
      expect(
        await content.evaluate((element) => {
          for (let node: Element | null = element; node; node = node.parentElement) {
            if (Number(getComputedStyle(node).opacity) === 0) return false;
          }
          return true;
        })
      ).toBe(true);
    }
    const transparentContent = await page
      .locator("main h1, main h2, main h3, main h4, main p, main a")
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            for (let node: Element | null = element; node; node = node.parentElement) {
              if (Number(getComputedStyle(node).opacity) === 0) return true;
            }
            return false;
          })
          .map((element) => element.textContent?.trim().slice(0, 80))
      );
    expect(transparentContent).toEqual([]);
  });
});
