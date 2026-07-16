import { expect, test } from "@playwright/test";

test("explores the health priority-setting teaching case", async ({ page }) => {
  await page.goto("/medicine/priority-setting");

  await expect(page.getByRole("heading", { name: "卫生预算优先排序实验室" })).toBeVisible();
  await expect(page.getByText("所有金额与健康收益均为虚构教学输入")).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "教学成本" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "效果与成本敏感性分析" })).toBeVisible();
  await expect(page.getByRole("table", { name: /效果与成本双向敏感性矩阵/ })).toBeVisible();

  const effectAssumption = page.getByLabel("效果假设");
  const costAssumption = page.getByLabel("成本假设");
  await effectAssumption.fill("1.5");
  await costAssumption.fill("0.5");
  await expect(effectAssumption).toHaveValue("1.5");
  await expect(costAssumption).toHaveValue("0.5");
  await expect(page.getByText(/新增 白内障转诊/)).toBeVisible();

  const budget = page.getByLabel("年度可用预算");
  await expect(budget).toHaveValue("24");
  await budget.fill("30");
  await expect(budget).toHaveValue("30");

  const severityProtection = page.getByRole("button", {
    name: "保障至少一项极高严重度干预",
  });
  await severityProtection.click();
  await expect(severityProtection).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.locator("tbody tr").filter({ hasText: "极高严重度" }).filter({ hasText: "纳入组合" })
  ).not.toHaveCount(0);
});
