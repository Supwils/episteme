import { expect, test, type Page } from "@playwright/test";

async function expectFocusedTourArticle(page: Page, isMobile: boolean, heading: string) {
  if (isMobile) {
    await expect(page.getByRole("link", { name: "阅读当前文章 →" })).toBeVisible();
    return;
  }
  await expect(page.getByRole("heading", { name: heading })).toBeVisible();
}

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
  await expect(page.getByRole("link", { name: "阅读当前文章 →" })).toHaveAttribute(
    "href",
    "/economics/concepts/expectations-credibility-policy-transmission"
  );
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("plays an explained route without filling browser history", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop playback timing");

  await page.goto("/knowledge-graph?tourId=from-early-signal-to-net-benefit&step=1");
  const playButton = page.getByRole("button", { name: "播放路线" });
  await expect(playButton).toBeVisible();
  await playButton.click();
  await expect(page.getByRole("button", { name: "暂停路线" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expect(page).toHaveURL(/step=2/, { timeout: 7_000 });
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：早期信号不等于已经获益" })
  ).toHaveAttribute("aria-current", "step");

  await page.getByRole("button", { name: "暂停路线" }).click();
  const pausedUrl = page.url();
  await page.waitForTimeout(4_800);
  expect(page.url()).toBe(pausedUrl);
});

test("restores the political-science methods tour", async ({ page, isMobile }) => {
  await page.goto("/knowledge-graph?tourId=how-to-study-politics&step=4");

  await expect(page.getByText("如何研究政治 · 4/8")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：进入案例内部寻找机制" })
  ).toHaveAttribute("aria-current", "step");
  await expectFocusedTourArticle(page, isMobile, "过程追踪与因果机制");
});

test("restores the population-health systems tour", async ({ page, isMobile }) => {
  await page.goto("/knowledge-graph?tourId=population-health-systems&step=6");

  await expect(page.getByText("如何改善人群健康 · 6/9")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：把预防推到暴露源头" })
  ).toHaveAttribute("aria-current", "step");
  await expectFocusedTourArticle(page, isMobile, "环境与职业健康");
});

test("restores the psychology evidence methods tour", async ({ page, isMobile }) => {
  await page.goto("/knowledge-graph?tourId=how-psychology-builds-evidence&step=6");

  await expect(page.getByText("心理学如何建立证据 · 6/9")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：让多项研究真正累积" })
  ).toHaveAttribute("aria-current", "step");
  await expectFocusedTourArticle(page, isMobile, "元分析与证据综合");
});

test("restores the earth-science climate risk tour", async ({ page, isMobile }) => {
  await page.goto("/knowledge-graph?tourId=from-climate-signal-to-fair-adaptation&step=5");

  await expect(page.getByText("从气候信号到公平适应 · 5/8")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：热风险通过住房和照护分配" })
  ).toHaveAttribute("aria-current", "step");
  await expectFocusedTourArticle(page, isMobile, "城市热风险与适应");
});

test("restores the chemistry evidence methods tour", async ({ page, isMobile }) => {
  await page.goto("/knowledge-graph?tourId=from-molecular-evidence-to-safe-process&step=7");

  await expect(page.getByText("从分子证据到安全工艺 · 7/8")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：体积改变后，热和混合不再相似" })
  ).toHaveAttribute("aria-current", "step");
  await expectFocusedTourArticle(page, isMobile, "工艺放大");
});

test("restores the kinetics-to-green-process route with an article entry", async ({
  page,
  isMobile,
}) => {
  await page.goto(
    "/knowledge-graph?tourId=from-rate-data-to-defensible-green-process&step=5"
  );

  await expect(page.getByText("从速率数据到可辩护绿色工艺 · 5/9")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：同时比较活性、选择性与寿命" })
  ).toHaveAttribute("aria-current", "step");
  await expectFocusedTourArticle(page, isMobile, "催化作用");
  const articleLink = page.getByRole("link", {
    name: isMobile ? "阅读当前文章 →" : "查看详情",
  });
  await expect(articleLink).toHaveAttribute(
    "href",
    "/chemistry/reactions/catalysis-reaction"
  );
});

test("keeps the circular energy-storage route connected to articles in spatial mode", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop spatial route integration");

  await page.goto(
    "/knowledge-graph?layout=spatial&tourId=from-electron-to-circular-energy-storage&step=3"
  );

  await expect(page.getByTestId("spatial-graph-controls")).toBeVisible();
  await expect(page.getByText("从电子到循环储能系统 · 3/9")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：先统一材料、电芯与系统的比较尺度" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("heading", { name: "电池评价：性能、安全与循环" })).toBeVisible();
  await expect(page.getByRole("link", { name: "查看详情" })).toHaveAttribute(
    "href",
    "/chemistry/concepts/battery-performance-safety-and-circularity"
  );

  await page.getByRole("button", { name: "向右旋转空间图谱" }).click();
  await expect(page).toHaveURL(/tourId=from-electron-to-circular-energy-storage/);
  await expect(page).toHaveURL(/step=3/);
  await expect(page.getByRole("heading", { name: "电池评价：性能、安全与循环" })).toBeVisible();
});

test("moves from social support to community mental-health care in spatial mode", async ({
  page,
}) => {
  await page.goto(
    "/knowledge-graph?layout=spatial&tourId=from-distress-to-rights-based-mental-health-care&step=3&source=spine-atlas"
  );

  await expect(page.getByTestId("spatial-graph-controls")).toBeVisible();
  await expect(page.getByText("从心理困扰到可持续照护 · 3/9")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：关系既提供支持，也可能制造压力" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("link", { name: "阅读当前文章 →" })).toHaveAttribute(
    "href",
    "/sociology/concepts/social-support-mental-health"
  );

  await page.getByRole("button", { name: "下一步" }).click();
  await expect(page).toHaveURL(/tourId=from-distress-to-rights-based-mental-health-care&step=4/);
  await expect(page.getByRole("link", { name: "阅读当前文章 →" })).toHaveAttribute(
    "href",
    "/medicine/diseases/depression"
  );

  await page.getByRole("button", { name: "下一步" }).click();
  await expect(page).toHaveURL(/tourId=from-distress-to-rights-based-mental-health-care&step=5/);
  await expect(page.getByRole("link", { name: "阅读当前文章 →" })).toHaveAttribute(
    "href",
    "/medicine/public-health/community-mental-health-access-continuity"
  );
});

test("moves from digital exposure evidence to adolescent service design", async ({ page }) => {
  await page.goto(
    "/knowledge-graph?layout=spatial&tourId=from-adolescent-development-to-continuous-support&step=5&source=spine-atlas"
  );

  await expect(page.getByText("从青春期发展到连续支持 · 5/10")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "聚焦路线步骤：把屏幕时间拆成具体机制" })
  ).toHaveAttribute("aria-current", "step");
  await expect(page.getByRole("link", { name: "阅读当前文章 →" })).toHaveAttribute(
    "href",
    "/psychology/frontier/social-media-teen-mental-health"
  );

  await page.getByRole("button", { name: "下一步" }).click();
  await expect(page).toHaveURL(
    /tourId=from-adolescent-development-to-continuous-support&step=6/
  );
  await expect(page.getByRole("link", { name: "阅读当前文章 →" })).toHaveAttribute(
    "href",
    "/psychology\/methods\/causal-inference-experiments-observational-studies"
  );

  await page.getByRole("button", { name: "下一步" }).click();
  await page.getByRole("button", { name: "下一步" }).click();
  await expect(page).toHaveURL(
    /tourId=from-adolescent-development-to-continuous-support&step=8/
  );
  await expect(page.getByRole("link", { name: "阅读当前文章 →" })).toHaveAttribute(
    "href",
    "/medicine/public-health/adolescent-mental-health-school-community-services"
  );
});

test("keeps a desktop thought tour beside the selected-node inspector", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop panel placement");

  await page.goto(
    "/knowledge-graph?tourId=from-data-entry-to-auditable-trust&step=3&source=security-tour"
  );

  const routePanel = page.getByRole("region", { name: "连接引擎面板" });
  const detailPanel = page.getByRole("complementary", { name: "加密协议基础 详情" });
  await expect(routePanel).toBeVisible();
  await expect(detailPanel).toBeVisible();
  await expect(detailPanel).not.toHaveAttribute("aria-modal");
  await expect(page.getByRole("link", { name: "查看详情" })).toHaveAttribute(
    "href",
    "/computer-science/concepts/encryption-basics"
  );

  const [routeBox, detailBox] = await Promise.all([
    routePanel.boundingBox(),
    detailPanel.boundingBox(),
  ]);
  expect(routeBox).not.toBeNull();
  expect(detailBox).not.toBeNull();
  expect(routeBox!.x + routeBox!.width).toBeLessThanOrEqual(detailBox!.x);
});

test("rotates the spatial graph without losing the active learning route or article", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop spatial graph flow");

  await page.goto(
    "/knowledge-graph?tourId=from-data-entry-to-auditable-trust&step=3&source=security-tour"
  );
  await expect(page.getByRole("heading", { name: "加密协议基础" })).toBeVisible();

  const cognitiveMode = page.getByRole("button", { name: "阶段", exact: true });
  await cognitiveMode.click();
  await expect(cognitiveMode).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/layout=cognitive/);

  const spatialMode = page.getByRole("button", { name: "空间", exact: true });
  await spatialMode.click();
  await expect(spatialMode).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/layout=spatial/);
  await expect(page).not.toHaveURL(/[?&]level=/);

  const controls = page.getByTestId("spatial-graph-controls");
  const domainSelect = page.getByRole("combobox", { name: "空间图谱正面学科" });
  await expect(controls).toBeVisible();
  await domainSelect.selectOption("computer-science");
  await expect(domainSelect).toHaveValue("computer-science");
  await expect(controls).toHaveAttribute("data-rotation", "-54");
  await expect(page).toHaveURL(/spatialAngle=-54/);
  await expect(page).toHaveURL(/spatialFront=computer-science/);

  const clusterSummary = page.getByTestId("spatial-cluster-summary");
  await expect(clusterSummary).toHaveAttribute("data-domain", "computer-science");
  await clusterSummary.getByRole("button", { name: /聚焦 L4 方法建模/ }).click();
  await expect(page).toHaveURL(/spatialLevel=4/);
  await expect(clusterSummary.getByText("L4 · 方法建模")).toBeVisible();
  const articleEntry = clusterSummary.getByRole("link").first();
  await expect(articleEntry).toHaveAttribute("href", /\/computer-science\//);

  await page.getByRole("button", { name: "向右旋转空间图谱" }).click();
  await expect(controls).toHaveAttribute("data-rotation", "-30");
  await expect(page).toHaveURL(/spatialAngle=-30/);
  await expect(page).toHaveURL(/spatialFront=psychology/);
  await expect(clusterSummary).toHaveAttribute("data-domain", "psychology");
  await expect(page).toHaveURL(/spatialLevel=4/);

  await expect(page.getByText("从数据进入系统到可审计信任 · 3/7")).toBeVisible();
  await expect(page.getByRole("heading", { name: "加密协议基础" })).toBeVisible();
  await expect(page.getByRole("link", { name: "查看详情" })).toHaveAttribute(
    "href",
    "/computer-science/concepts/encryption-basics"
  );

  const canvasHasSpatialInk = await page.locator("canvas").evaluate((canvas) => {
    const graphCanvas = canvas as HTMLCanvasElement;
    const context = graphCanvas.getContext("2d");
    if (!context || graphCanvas.width === 0 || graphCanvas.height === 0) return false;
    const pixels = context.getImageData(0, 0, graphCanvas.width, graphCanvas.height).data;
    const baseline = [pixels[0], pixels[1], pixels[2]];
    let distinctSamples = 0;
    const pixelStride = Math.max(
      4,
      Math.floor((graphCanvas.width * graphCanvas.height) / 12_000) * 4
    );
    for (let index = 0; index < pixels.length; index += pixelStride) {
      if (
        Math.abs(pixels[index]! - baseline[0]!) > 8 ||
        Math.abs(pixels[index + 1]! - baseline[1]!) > 8 ||
        Math.abs(pixels[index + 2]! - baseline[2]!) > 8
      ) {
        distinctSamples += 1;
      }
      if (distinctSamples > 80) return true;
    }
    return false;
  });
  expect(canvasHasSpatialInk).toBe(true);

  await page.reload();
  await expect(page).not.toHaveURL(/[?&]level=/);
  await expect(page.getByTestId("spatial-graph-controls")).toHaveAttribute("data-rotation", "-30");
  await expect(page.getByRole("combobox", { name: "空间图谱正面学科" })).toHaveValue("psychology");
  await expect(page.getByTestId("spatial-cluster-summary")).toHaveAttribute(
    "data-domain",
    "psychology"
  );
  await expect(page.getByRole("heading", { name: "加密协议基础" })).toBeVisible();

  await page.goBack();
  await expect(cognitiveMode).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("spatial-graph-controls")).toHaveCount(0);

  await page.goForward();
  await expect(page.getByTestId("spatial-graph-controls")).toHaveAttribute("data-rotation", "-30");
});

test("keeps spatial graph controls within the mobile viewport", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile spatial graph flow");

  await page.goto("/knowledge-graph");
  await page.getByRole("button", { name: "筛选" }).click();
  await page.getByRole("button", { name: "空间", exact: true }).click();

  await expect(page.getByTestId("spatial-graph-controls")).toBeVisible();
  await page.getByRole("button", { name: "收起筛选栏" }).click();
  await page.getByRole("button", { name: "向右旋转空间图谱" }).click();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.getByRole("combobox", { name: "空间图谱正面学科" })).toBeVisible();
});
