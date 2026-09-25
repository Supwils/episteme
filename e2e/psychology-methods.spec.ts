import { expect, test } from "@playwright/test";
import { contentArticleCount } from "./content-count";

test("lists all psychology methods and renders an article", async ({ page }) => {
  await page.goto("/psychology/methods");

  await expect(page.getByRole("heading", { name: "现代研究方法" })).toBeVisible();
  await expect(page.locator('a[href^="/psychology/methods/"]')).toHaveCount(
    contentArticleCount("psychology/methods")
  );

  await page.goto("/psychology/methods/measurement-invariance-fair-comparison");
  await expect(page.getByRole("heading", { name: "测量等值与公平比较" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "四个递进层级" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "参考文献" })).toBeVisible();
});
