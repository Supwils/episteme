import { expect, test } from "@playwright/test";

test("explores mental-health effective coverage and returns to its evidence route", async ({
  page,
}) => {
  await page.goto("/medicine/mental-health-access");

  await expect(page.getByRole("heading", { name: "心理健康服务可及性实验室" })).toBeVisible();
  await expect(page.getByText(/每个比例都是虚构教学假设/)).toBeVisible();
  await expect(page.getByRole("img", { name: /心理健康服务有效覆盖级联/ })).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();

  const initialCoverage = await page.getByText("总体有效覆盖").locator("..").textContent();
  await page.getByRole("button", { name: "社区网络" }).click();
  await expect(page.getByRole("button", { name: "社区网络" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expect
    .poll(() => page.getByText("总体有效覆盖").locator("..").textContent())
    .not.toBe(initialCoverage);

  const continuity = page.getByRole("slider", { name: "持续照护" });
  await continuity.fill("0.9");
  await expect(continuity).toHaveValue("0.9");

  await expect(page.getByRole("link", { name: "阅读社区精神卫生与连续照护 →" })).toHaveAttribute(
    "href",
    "/medicine/public-health/community-mental-health-access-continuity"
  );
  await expect(page.getByRole("link", { name: "在知识图谱查看完整路线 →" })).toHaveAttribute(
    "href",
    /tourId=from-distress-to-rights-based-mental-health-care/
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(
    0
  );
});
