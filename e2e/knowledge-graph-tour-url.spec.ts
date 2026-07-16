import { expect, test } from "@playwright/test";

test("restores a thought tour step from the URL and follows browser history", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop history flow");

  await page.goto("/knowledge-graph?tourId=macro-politics-psychology&step=3");

  await expect(page.getByText("宏观、政治与心理 · 3/13")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：通胀预期需要信任锚" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("heading", { name: "通胀预期与信任" })).toBeVisible();

  await page.getByRole("button", { name: "下一步" }).click();
  await expect(page).toHaveURL(/tourId=macro-politics-psychology&step=4/);
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：通胀进入日常感受" })
  ).toHaveAttribute("aria-current", "step");

  await page.goBack();
  await expect(page).toHaveURL(/tourId=macro-politics-psychology&step=3/);
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：通胀预期需要信任锚" })
  ).toHaveAttribute("aria-current", "step");
});

test("keeps the connection engine available for a mobile deep link", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile toolbar behavior");

  await page.goto("/knowledge-graph?tourId=modern-macro-diagnosis&step=2");

  await expect(page.getByRole("button", { name: "连接引擎" })).toBeVisible();
  await expect(page.getByText("现代宏观诊断 · 2/5")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：政策要穿过预期系统" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("heading", { name: "预期、可信度与政策传导" })).toBeVisible();
});

test("restores the political-science methods tour", async ({ page }) => {
  await page.goto("/knowledge-graph?tourId=how-to-study-politics&step=4");

  await expect(page.getByText("如何研究政治 · 4/8")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：进入案例内部寻找机制" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("heading", { name: "过程追踪与因果机制" })).toBeVisible();
});

test("restores the population-health systems tour", async ({ page }) => {
  await page.goto("/knowledge-graph?tourId=population-health-systems&step=6");

  await expect(page.getByText("如何改善人群健康 · 6/9")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：把预防推到暴露源头" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("heading", { name: "环境与职业健康" })).toBeVisible();
});

test("restores the psychology evidence methods tour", async ({ page }) => {
  await page.goto("/knowledge-graph?tourId=how-psychology-builds-evidence&step=6");

  await expect(page.getByText("心理学如何建立证据 · 6/9")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：让多项研究真正累积" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("heading", { name: "元分析与证据综合" })).toBeVisible();
});

test("restores the earth-science climate risk tour", async ({ page }) => {
  await page.goto("/knowledge-graph?tourId=from-climate-signal-to-fair-adaptation&step=5");

  await expect(page.getByText("从气候信号到公平适应 · 5/8")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：热风险通过住房和照护分配" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("heading", { name: "城市热风险与适应" })).toBeVisible();
});

test("restores the chemistry evidence methods tour", async ({ page }) => {
  await page.goto("/knowledge-graph?tourId=from-molecular-evidence-to-safe-process&step=7");

  await expect(page.getByText("从分子证据到安全工艺 · 7/8")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：体积改变后，热和混合不再相似" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("heading", { name: "工艺放大" })).toBeVisible();
});
