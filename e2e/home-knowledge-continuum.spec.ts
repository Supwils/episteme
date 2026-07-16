import { expect, test, type Page } from "@playwright/test";

async function revealLearningPlanner(page: Page) {
  const continuum = page.getByTestId("home-knowledge-continuum");
  await continuum.scrollIntoViewIfNeeded();
  await continuum.evaluate((element) => {
    const expand = Array.from(element.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "展开交互图谱"
    );
    expand?.click();
  });
  await expect(continuum.getByRole("button", { name: "05 综合前沿", exact: true })).toBeVisible({
    timeout: 15_000,
  });

  const planner = continuum.getByTestId("knowledge-learning-planner");
  await planner.evaluate((element) => element.scrollIntoView({ block: "center" }));
  const load = planner.getByRole("button", { name: "立即载入" });
  if (await load.isVisible()) {
    await load.evaluate((element) => (element as HTMLButtonElement).click());
  }
  await expect(planner.getByRole("heading", { name: "全图知识地形" })).toBeVisible({
    timeout: 15_000,
  });
  return planner;
}

test("loads each deep continuum dataset only when its module approaches the viewport", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/api/knowledge-continuum/")) requests.push(request.url());
  });

  await page.goto("/");
  await page.waitForTimeout(400);
  expect(requests).toHaveLength(0);

  const spine = page.getByTestId("knowledge-spine-atlas");
  await spine.scrollIntoViewIfNeeded();
  await expect(
    spine.getByRole("heading", { name: "15 门学科，从第一问走到研究边界" })
  ).toBeVisible();
  expect(requests.filter((url) => url.endsWith("/api/knowledge-continuum/spine"))).toHaveLength(1);
  expect(requests.some((url) => url.endsWith("/api/knowledge-continuum/planner"))).toBe(false);
  expect(requests.some((url) => url.endsWith("/api/knowledge-continuum/confluences"))).toBe(false);
  expect(requests.some((url) => url.endsWith("/api/knowledge-continuum/coverage"))).toBe(false);

  const coverage = page.getByTestId("knowledge-coverage-panel");
  await coverage.scrollIntoViewIfNeeded();
  await expect(coverage.getByRole("heading", { name: /个核心节点如何覆盖全学科/ })).toBeVisible();
  expect(requests.filter((url) => url.endsWith("/api/knowledge-continuum/coverage"))).toHaveLength(
    1
  );
});

test("compares all fifteen subject spines from first questions to frontiers", async ({ page }) => {
  await page.goto("/");
  const atlas = page.getByTestId("knowledge-spine-atlas");
  await atlas.scrollIntoViewIfNeeded();

  await expect(
    atlas.getByRole("heading", { name: "15 门学科，从第一问走到研究边界" })
  ).toBeVisible();
  await expect(atlas).toContainText("75 个主干节点");
  await expect(atlas.locator('[data-testid^="spine-step-"]')).toHaveCount(75);

  const viewport = page.viewportSize();
  if (viewport && viewport.width >= 1024) {
    await atlas.getByTestId("spine-step-mathematics-5").click();
  } else {
    await atlas.getByLabel("选择学科主干").selectOption("mathematics");
    await atlas.getByRole("button", { name: /L5 .*黎曼猜想/ }).click();
  }

  await expect(atlas.getByRole("heading", { name: "黎曼猜想" })).toBeVisible();
  await expect(atlas.getByText(/计算验证不能替代一般证明/)).toBeVisible();
  await expect(atlas.getByRole("link", { name: "查看完整前置链 →" })).toHaveAttribute(
    "href",
    "/knowledge-graph?path=mathematics-prime-frontier-spine&focus=mathematics%3Ariemann-hypothesis&source=spine-atlas"
  );

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("traces a selected subject bridge across stages and domains", async ({ page }) => {
  await page.goto("/");
  const atlas = page.getByTestId("knowledge-spine-atlas");
  await atlas.scrollIntoViewIfNeeded();

  await expect(atlas.getByRole("heading", { name: "物理学的跨域桥" })).toBeVisible();
  await expect(atlas.getByTestId("spine-bridge-explorer")).toContainText("14 条有向转接");
  const bridgeList = atlas.getByTestId("spine-bridge-list");
  const bridgeListSize = await bridgeList.evaluate((element) => ({
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
  }));
  expect(bridgeListSize.clientHeight).toBeLessThanOrEqual(384);
  expect(bridgeListSize.scrollHeight).toBeGreaterThan(bridgeListSize.clientHeight);

  await atlas.getByRole("button", { name: "从天空到物理边界：太阳系到原子结构" }).click();
  await expect(atlas.getByRole("heading", { name: "太阳系 → 原子结构" })).toBeVisible();
  await expect(atlas.getByText("再用原子描述可见物质的共同构件。")).toBeVisible();
  await expect(atlas.getByRole("link", { name: "在知识图谱核对转接 →" })).toHaveAttribute(
    "href",
    "/knowledge-graph?path=universe-matter&focus=chemistry%3Aatomic-structure&source=spine-bridge"
  );

  const viewport = page.viewportSize();
  if (viewport && viewport.width >= 1024) {
    await expect(atlas.getByTestId("spine-bridge-line")).toBeVisible();
  }

  await atlas.getByRole("button", { name: "切换到化学主干 →" }).click();
  await expect(atlas.getByRole("heading", { name: "化学的跨域桥" })).toBeVisible();
  await expect(atlas.getByLabel("选择学科主干")).toHaveValue("chemistry");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("filters the aggregate knowledge terrain and switches an equal-distance anchor", async ({
  page,
}) => {
  await page.goto("/");
  const planner = await revealLearningPlanner(page);
  const terrain = planner.getByTestId("knowledge-terrain");
  await expect(terrain.getByRole("heading", { name: "全图知识地形" })).toBeVisible();
  await expect(terrain.getByText("1362 个节点 · 230 个骨架")).toBeVisible();
  await expect(terrain.getByText("674 个节点存在多条等距来路")).toBeVisible();
  await expect(terrain.locator('button[aria-label$="节点"]')).toHaveCount(75);

  const grid = terrain.getByTestId("knowledge-terrain-grid").locator(":scope > div");
  await expect
    .poll(() =>
      grid.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length)
    )
    .toBe(6);
  await terrain.getByRole("button", { name: "学科内结构" }).click();
  await expect(
    terrain.getByRole("button", {
      name: "人类历史，直觉启蒙，303个知识节点，占该学科当前接入层97%",
    })
  ).toHaveText("97%");
  const diagnostics = terrain.getByTestId("knowledge-terrain-diagnostics");
  await expect(diagnostics.getByRole("heading", { name: "知识库存诊断" })).toBeVisible();
  await expect(diagnostics).toContainText("11 条可复核信号");
  await expect(diagnostics).toContainText("不能解读为学科重要性");

  await terrain.getByRole("button", { name: "两跳" }).click();
  await terrain.getByRole("button", { name: /社会学，方法建模，\d+个两跳旁支节点/ }).click();

  await expect(planner.getByRole("button", { name: "全部节点" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expect(
    planner.getByText(/搜索全部知识节点 · 社会学 \/ L4 方法建模 \/ 两跳旁支/)
  ).toBeVisible();
  expect(new URL(page.url()).searchParams.get("learnDomain")).toBe("sociology");
  expect(new URL(page.url()).searchParams.get("learnLevel")).toBe("4");
  expect(new URL(page.url()).searchParams.get("learnConfidence")).toBe("contextual");
  await planner.getByRole("button", { name: "清除", exact: true }).click();

  const search = planner.getByRole("combobox", { name: "搜索全部知识节点" });
  await search.fill("身体、疾病与证据");
  await planner
    .getByRole("option", { name: /从身体、疾病与证据开始/ })
    .filter({ hasText: "18条等距来路" })
    .click();
  await expect(planner.getByRole("heading", { name: "同距锚点比较" })).toBeVisible();
  await expect(planner.getByText(/共有 18 条同样短的接入来路/)).toBeVisible();
  const alternative = planner.getByRole("button", { name: "选择锚点“公共卫生”" });
  await alternative.click();
  await expect(alternative).toHaveAttribute("aria-pressed", "true");
  await expect(planner.getByText(/当前锚点：公共卫生/)).toBeVisible();
  expect(new URL(page.url()).searchParams.get("learnTarget")).toBe(
    "medicine:body-disease-evidence"
  );
  expect(new URL(page.url()).searchParams.get("learnAnchor")).toBe("medicine:public-health");

  await planner.getByRole("button", { name: "复制当前路线链接" }).click();
  await expect(planner.getByRole("button", { name: "路线链接已复制" })).toBeVisible();

  await page.evaluate(() => window.localStorage.removeItem("uk-learning-target-selection"));
  await page.reload();
  const restoredPlanner = await revealLearningPlanner(page);
  await expect(restoredPlanner.getByRole("button", { name: "选择锚点“公共卫生”" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
});

test("opens an inventory diagnosis as a domain-level knowledge graph", async ({ page }) => {
  await page.goto("/");
  const planner = await revealLearningPlanner(page);
  const diagnostics = planner.getByTestId("knowledge-terrain-diagnostics");
  const graphLink = diagnostics.getByRole("link", { name: "在图谱中检查" }).first();
  await expect(graphLink).toHaveAttribute(
    "href",
    "/knowledge-graph?domain=history&source=terrain-diagnostic&level=1"
  );
  await graphLink.click();
  await expect(page).toHaveURL(/domain=history/);
  await expect(page).toHaveURL(/level=1/);
  await page.waitForFunction(
    () =>
      !window.matchMedia("(max-width: 768px)").matches ||
      Boolean(document.querySelector('button[aria-label="筛选"]'))
  );
  const mobileFilterToggle = page.getByRole("button", { name: "筛选", exact: true });
  if ((await mobileFilterToggle.count()) > 0) await mobileFilterToggle.click();
  const domainFilters = page.getByTestId("domain-filters");
  await expect(domainFilters.getByRole("button", { name: "隐藏历史领域" })).toBeVisible();
  await expect(domainFilters.getByRole("button", { name: "显示物理领域" })).toBeVisible();
});

test("explores knowledge from first questions to interdisciplinary frontiers", async ({ page }) => {
  await page.goto("/");

  const sectionTitle = page.getByRole("heading", { name: "从儿童好奇到研究前沿" });
  await sectionTitle.scrollIntoViewIfNeeded();
  await expect(sectionTitle).toBeVisible();
  await expect(page.getByText("15 学科 · 5 阶段 · 6 条问题主线")).toBeVisible();

  const frontierStage = page.getByRole("button", { name: "05 综合前沿", exact: true });
  await frontierStage.click();
  await expect(frontierStage).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("link", { name: /展开“综合前沿”全部图谱节点/ })).toHaveAttribute(
    "href",
    "/knowledge-graph?level=5&source=continuum"
  );

  await page.getByRole("button", { name: "平台治理与数字劳动" }).click();
  await expect(
    page.getByRole("heading", { name: "算法平台正在形成什么样的新制度？" })
  ).toBeVisible();
  const relatedSubjects = page.getByLabel("相关学科");
  await expect(relatedSubjects.getByRole("link", { name: "社会学", exact: true })).toBeVisible();
  await expect(
    relatedSubjects.getByRole("link", { name: "计算机科学", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /打开“平台治理与数字劳动”知识节点/ })
  ).toHaveAttribute("href", "/sociology/frontier/platform-governance");

  await page.getByRole("button", { name: "↗ 可解释人工智能", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "能预测的机器是否也能给出可信理由？" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /下一阶段：无/ })).toBeDisabled();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);

  const coveragePanel = page.getByTestId("knowledge-coverage-panel");

  const learningPlanner = await revealLearningPlanner(page);
  await expect(
    learningPlanner.getByRole("heading", { name: "把一个问题编排成可学习的路线" })
  ).toBeVisible();
  await learningPlanner.getByLabel("学习起点").selectOption("3");
  await learningPlanner.getByLabel("目标问题").selectOption("people-institutions");
  await learningPlanner.getByRole("button", { name: "20 分钟" }).click();
  await expect(
    learningPlanner.getByText(/从 L3 到 L5 · 3 步 · 3 门学科 · 共 20 分钟/)
  ).toBeVisible();
  await expect(learningPlanner.getByRole("heading", { name: "市场失灵理论" })).toBeVisible();
  await expect(learningPlanner.getByRole("heading", { name: "平台治理前沿" })).toBeVisible();
  await learningPlanner.getByRole("checkbox", { name: "标记“市场失灵理论”为已完成" }).check();
  await expect(learningPlanner.getByText("1/3")).toBeVisible();
  await expect(learningPlanner.getByRole("link", { name: "看图谱" }).nth(1)).toHaveAttribute(
    "href",
    "/knowledge-graph?path=people-institutions&focus=political-science%3Acomparative-method&source=learning-plan"
  );

  await page.reload();
  const restoredPlanner = await revealLearningPlanner(page);
  await expect(restoredPlanner.getByLabel("学习起点")).toHaveValue("3");
  await expect(restoredPlanner.getByLabel("目标问题")).toHaveValue("people-institutions");
  await expect(restoredPlanner.getByRole("button", { name: "20 分钟" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expect(
    restoredPlanner.getByRole("checkbox", { name: "标记“市场失灵理论”为已完成" })
  ).toBeChecked();

  await restoredPlanner.getByRole("button", { name: "全部节点" }).click();
  const allNodeSearch = restoredPlanner.getByRole("combobox", { name: "搜索全部知识节点" });
  await allNodeSearch.fill("AI 伦理");
  await restoredPlanner.getByRole("option", { name: /AI 伦理/ }).click();
  await expect(restoredPlanner.getByText("直接旁支", { exact: true })).toBeVisible();
  await expect(restoredPlanner.getByText(/以下步骤沿图谱关系进入推断旁支/)).toBeVisible();
  await expect(restoredPlanner.getByText("推断旁支", { exact: true })).toBeVisible();
  await expect(restoredPlanner.getByRole("link", { name: "看图谱" }).last()).toHaveAttribute(
    "href",
    "/knowledge-graph?level=2&focus=philosophy%3Aai-ethics&source=branch-plan"
  );

  await page.reload();
  const restoredBranchPlanner = await revealLearningPlanner(page);
  await expect(restoredBranchPlanner.getByRole("button", { name: "全部节点" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expect(
    restoredBranchPlanner.getByRole("combobox", { name: "搜索全部知识节点" })
  ).toHaveValue("AI 伦理");
  await expect(restoredBranchPlanner.getByText("直接旁支", { exact: true })).toBeVisible();

  await coveragePanel.scrollIntoViewIfNeeded();
  await expect(
    coveragePanel.getByRole("heading", { name: "230 个核心节点如何覆盖全学科" })
  ).toBeVisible();
  const coverageGrid = coveragePanel.getByTestId("coverage-matrix").locator(":scope > div");
  await expect
    .poll(() =>
      coverageGrid.evaluate(
        (element) => getComputedStyle(element).gridTemplateColumns.split(" ").length
      )
    )
    .toBe(6);
  await expect(coveragePanel.getByText("73")).toBeVisible();
  await coveragePanel.getByRole("button", { name: "语言学，直觉启蒙，2个核心节点" }).click();
  await expect(coveragePanel.getByText("建设中", { exact: true })).toHaveCount(0);
  await expect(
    coveragePanel.getByRole("link", { name: /从词句结构到多语人工智能/ })
  ).toHaveAttribute(
    "href",
    "/knowledge-graph?path=linguistics-multilingual-ai-spine&focus=linguistics%3Awords-and-sentences&source=coverage"
  );

  await coveragePanel.getByRole("button", { name: "查看方法建模覆盖" }).click();
  await coveragePanel.getByRole("button", { name: "证据方式" }).click();
  await coveragePanel.getByRole("button", { name: "形式推演，方法建模，6个核心节点" }).click();
  await expect(
    coveragePanel.getByText("用定义、逻辑、数学结构和算法推出可检查结论。")
  ).toBeVisible();

  await coveragePanel.getByRole("button", { name: "跨学科桥" }).click();
  await expect(coveragePanel.getByText("73 次转接 · 50 个有向学科对")).toBeVisible();
  await coveragePanel.getByRole("button", { name: "经济学到政治学，3次转接" }).click();
  await expect(coveragePanel.getByRole("heading", { name: "经济 → 政治" })).toBeVisible();
  await expect(coveragePanel.getByRole("link", { name: /从共同生活到平台制度/ })).toHaveAttribute(
    "href",
    "/knowledge-graph?path=people-institutions&focus=political-science%3Acomparative-method&source=bridge-flow"
  );
  await coveragePanel.getByRole("button", { name: "L5" }).click();
  await expect(coveragePanel.getByText("12 次转接 · 10 个有向学科对")).toBeVisible();
  await coveragePanel.getByLabel("桥证据方式").selectOption("synthesis");
  await expect(coveragePanel.getByText("12 次转接 · 10 个有向学科对")).toBeVisible();

  const coverageOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(coverageOverflow).toBeLessThanOrEqual(1);

  await page.getByRole("button", { name: "05 综合前沿", exact: true }).click();
  const continuumRegion = page.getByRole("region", { name: "从儿童好奇到研究前沿" });
  await continuumRegion.getByRole("button").filter({ hasText: "可解释人工智能" }).first().click();
  const prerequisiteGraphLink = page.getByRole("link", { name: "在图谱中查看前置来路 →" });
  await prerequisiteGraphLink.scrollIntoViewIfNeeded();
  await expect(prerequisiteGraphLink).toBeVisible();
  await expect(prerequisiteGraphLink).toHaveAttribute(
    "href",
    "/knowledge-graph?level=5&focus=computer-science%3Aai-interpretability&source=continuum-node"
  );
  await prerequisiteGraphLink.click();
  await expect(page).toHaveURL(/level=5/);
  await expect(page).toHaveURL(/focus=computer-science%3Aai-interpretability/);
  await expect(page.getByRole("heading", { name: "机制可解释性" })).toBeVisible();
  await expect(page.getByText("知识来路 · 5 步")).toBeVisible();
});
