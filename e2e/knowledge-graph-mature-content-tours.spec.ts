import { expect, test } from "@playwright/test";

test("restores the trustworthy-software route", async ({ page }) => {
  await page.goto("/knowledge-graph?tourId=proof-to-trustworthy-software&step=5", {
    waitUntil: "domcontentloaded",
  });

  await expect(page.getByText("从证明到可信软件 · 5/8")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：把需求写成机器可检验性质" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("heading", { name: "形式化方法与程序验证" })).toBeVisible();
});

test("restores the interpretable-AI route", async ({ page }) => {
  await page.goto("/knowledge-graph?tourId=equations-to-interpretable-ai&step=6", {
    waitUntil: "domcontentloaded",
  });

  await expect(page.getByText("从方程到可解释 AI · 6/7")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：规模化预训练产生通用能力" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("heading", { name: "大语言模型与基础模型" })).toBeVisible();
});

test("restores the molecule-to-treatment route", async ({ page }) => {
  await page.goto("/knowledge-graph?tourId=molecule-to-clinical-evidence&step=6", {
    waitUntil: "domcontentloaded",
  });

  await expect(page.getByText("从分子证据到临床治疗 · 6/9")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：候选分子必须同时优化多项目标" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("heading", { name: "药物化学" })).toBeVisible();
});
