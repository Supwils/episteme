import { expect, test } from "@playwright/test";

test("lists all climate-risk articles and renders an article", async ({ page }) => {
  await page.goto("/earth-science/climate-risks");

  await expect(page.getByRole("heading", { name: "气候风险与归因" })).toBeVisible();
  await expect(page.locator('a[href^="/earth-science/climate-risks/"]')).toHaveCount(6);

  await page.goto("/earth-science/climate-risks/extreme-event-attribution");
  await expect(
    page.getByRole("heading", { name: "极端事件归因：气候变化在这场灾害中改变了什么" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "一项归因研究的五步" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "参考文献" })).toBeVisible();
});
