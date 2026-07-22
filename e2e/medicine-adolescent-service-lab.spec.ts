import { expect, test } from "@playwright/test";

test("builds a constrained adolescent service package and exposes its evidence route", async ({
  page,
}) => {
  await page.goto("/medicine/adolescent-service-lab");

  await expect(
    page.getByRole("heading", { name: "青少年学校与社区服务方案实验室" })
  ).toBeVisible();
  await expect(page.getByText(/所有预算与效果数字都是虚构教学输入/)).toBeVisible();
  await expect(
    page.getByRole("img", { name: /青少年学校与社区服务六层立体结构/ })
  ).toBeVisible();
  await expect(page.getByText("路径状态").locator("..")).toContainText("完整");

  await page.getByLabel("检验哪一层").selectOption("matched-clinical-care");
  await page.getByRole("slider", { name: "成本假设" }).fill("1.5");
  await expect(page.getByTestId("adolescent-service-infeasible")).toContainText("无法同时满足");

  await page.getByRole("button", { name: "公平网络" }).click();
  await expect(page.getByTestId("adolescent-service-infeasible")).toHaveCount(0);
  await expect(
    page.getByRole("row", { name: /校外青年、偏远社区与少数语言外展/ })
  ).toContainText("纳入服务包");

  await expect(page.getByRole("link", { name: "阅读学校、社区与连续服务 →" })).toHaveAttribute(
    "href",
    "/medicine/public-health/adolescent-mental-health-school-community-services"
  );
  await expect(page.getByRole("link", { name: "在知识图谱定位服务步骤 →" })).toHaveAttribute(
    "href",
    "/knowledge-graph?layout=spatial&tourId=from-adolescent-development-to-continuous-support&step=7&focus=medicine%3Aadolescent-mental-health-school-community-services&source=adolescent-service-lab"
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(
    0
  );
});
