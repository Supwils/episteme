import { expect, test } from "@playwright/test";

test("lists all public-health articles and renders an article", async ({ page }) => {
  await page.goto("/medicine/public-health");

  await expect(page.getByRole("heading", { name: "公共卫生与卫生系统" })).toBeVisible();
  await expect(
    page.getByTestId("domain-section-list").locator('a[href^="/medicine/public-health/"]')
  ).toHaveCount(10);
  await expect(page.getByRole("link", { name: "进入卫生预算优先排序实验室" })).toHaveAttribute(
    "href",
    "/medicine/priority-setting"
  );
  await expect(page.getByRole("link", { name: "进入心理健康服务可及性实验室" })).toHaveAttribute(
    "href",
    "/medicine/mental-health-access"
  );
  await expect(
    page.getByRole("link", { name: "进入青少年学校与社区服务方案实验室" })
  ).toHaveAttribute("href", "/medicine/adolescent-service-lab");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(
    0
  );

  await page.goto("/medicine/public-health/health-systems-universal-health-coverage");
  await expect(page.getByRole("heading", { name: "卫生系统与全民健康覆盖" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "支付方式塑造行为" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "参考文献" })).toBeVisible();
});
