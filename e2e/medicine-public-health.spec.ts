import { expect, test } from "@playwright/test";

test("lists all public-health articles and renders an article", async ({ page }) => {
  await page.goto("/medicine/public-health");

  await expect(page.getByRole("heading", { name: "公共卫生与卫生系统" })).toBeVisible();
  await expect(page.locator('a[href^="/medicine/public-health/"]')).toHaveCount(9);
  await expect(page.getByRole("link", { name: "进入实验室" })).toHaveAttribute(
    "href",
    "/medicine/priority-setting"
  );

  await page.goto("/medicine/public-health/health-systems-universal-health-coverage");
  await expect(page.getByRole("heading", { name: "卫生系统与全民健康覆盖" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "支付方式塑造行为" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "参考文献" })).toBeVisible();
});
