import { expect, test } from "@playwright/test";

test("lists all political-science methods and renders an article", async ({ page }) => {
  await page.goto("/political-science/methods");

  await expect(page.getByRole("heading", { name: "研究方法" })).toBeVisible();
  await expect(page.locator('a[href^="/political-science/methods/"]')).toHaveCount(7);

  await page.goto("/political-science/methods/process-tracing");
  await expect(page.getByRole("heading", { name: "过程追踪与因果机制" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "四类经验检验" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "参考文献" })).toBeVisible();
});
