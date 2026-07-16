import { expect, test, type Page } from "@playwright/test";

async function revealConfluenceExplorer(page: Page) {
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

  const explorer = continuum.getByTestId("knowledge-confluence-explorer");
  await explorer.evaluate((element) => element.scrollIntoView({ block: "center" }));
  const load = explorer.getByRole("button", { name: "立即载入" });
  if (await load.isVisible()) {
    await load.evaluate((element) => (element as HTMLButtonElement).click());
  }
  await expect(explorer.getByRole("link", { name: /AI 治理/ })).toBeVisible({ timeout: 15_000 });
  return explorer;
}

test("compares curated confluence roles and builds a parallel study plan", async ({ page }) => {
  await page.goto("/?confluence=macro-fiscal-governance&confluenceMinutes=20");
  const explorer = await revealConfluenceExplorer(page);

  await expect(explorer.getByRole("heading", { name: "多学科知识汇流" })).toBeVisible();
  await expect(explorer.getByRole("link", { name: /宏观财政/ })).toHaveAttribute(
    "aria-current",
    "true"
  );
  await expect(explorer.getByRole("heading", { name: /一国财政路径何时可持续/ })).toBeVisible();
  await expect(explorer.getByText("5 个研究问题 · 4 条并行路线")).toBeVisible();

  await explorer.getByRole("button", { name: "争议检验", exact: true }).click();
  const map = explorer.getByTestId("knowledge-confluence-map");
  await expect(
    map.getByRole("button", { name: "争议检验 预期、风险感知与证据可靠性", exact: true })
  ).toBeVisible();
  await expect(
    map.getByRole("button", { name: "必要主线 宏观体征与债务算术", exact: true })
  ).toHaveCount(0);

  await explorer.getByRole("button", { name: "全部路线" }).click();
  await explorer.getByRole("link", { name: /城市气候适应/ }).click();
  await expect(page).toHaveURL(/confluence=urban-climate-adaptation/);
  await expect(
    explorer.getByRole("heading", { name: /城市应怎样在不确定气候风险下选择/ })
  ).toBeVisible();
  const ledger = explorer.getByTestId("knowledge-confluence-evidence-ledger");
  await expect(ledger.getByRole("heading", { name: "路线证据台账" })).toBeVisible();
  await expect(ledger.getByText("IPCC · AR6 WGII Chapter 6", { exact: false })).toBeVisible();

  const plan = explorer.getByTestId("knowledge-confluence-plan");
  await plan.getByRole("button", { name: "90 分钟" }).click();
  await expect(page).toHaveURL(/confluenceMinutes=90/);
  await expect(
    plan.getByText(/L1、L2、L3、L4 路线检查点 \+ L5 汇流综合 · 17 个检查点 · 共 90 分钟/)
  ).toBeVisible();
  const firstCheckpoint = plan.getByRole("checkbox").first();
  await firstCheckpoint.check();
  const firstCheckpointLabel = await firstCheckpoint.getAttribute("aria-label");
  await page.reload();
  const restoredExplorer = await revealConfluenceExplorer(page);
  const restoredPlan = restoredExplorer.getByTestId("knowledge-confluence-plan");
  await expect(restoredPlan.getByRole("button", { name: "90 分钟" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expect(restoredPlan.getByRole("checkbox", { name: firstCheckpointLabel! })).toBeChecked();

  await expect(
    page.getByTestId("knowledge-confluence-map").getByRole("link", { name: "在图谱中查看完整汇流" })
  ).toHaveAttribute(
    "href",
    /\/knowledge-graph\?confluence=urban-climate-adaptation&level=5&source=knowledge-confluence/
  );

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("loads no complete confluence until a research question is opened", async ({ page }) => {
  const detailRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/api/knowledge-confluences/")) detailRequests.push(request.url());
  });

  await page.goto("/");
  const explorer = await revealConfluenceExplorer(page);
  await expect(explorer.getByTestId("knowledge-confluence-summary-state")).toBeVisible();
  await expect(explorer.getByTestId("knowledge-confluence-map")).toHaveCount(0);
  await expect(explorer.getByTestId("knowledge-confluence-evidence-ledger")).toHaveCount(0);
  expect(detailRequests).toHaveLength(0);

  await explorer.getByRole("link", { name: /AI 治理/ }).click();
  await expect(page).toHaveURL(/confluence=ai-governance/);
  await expect(explorer.getByTestId("knowledge-confluence-map")).toBeVisible();
  await expect(explorer.getByTestId("knowledge-confluence-evidence-ledger")).toBeVisible();
  expect(
    detailRequests.some((url) => url.endsWith("/api/knowledge-confluences/ai-governance"))
  ).toBe(true);

  await page.goBack();
  await expect(page).not.toHaveURL(/confluence=/);
  await expect(explorer.getByTestId("knowledge-confluence-summary-state")).toBeVisible();
});

test("keeps confluence links meaningful without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  const explorer = page.getByTestId("knowledge-confluence-explorer");
  const topicLink = explorer.getByRole("link", { name: /公共卫生优先排序/ });
  await expect(topicLink).toHaveAttribute("href", "/knowledge-confluence/public-health-priority");

  await topicLink.click();
  await expect(page).toHaveURL(/knowledge-confluence\/public-health-priority/);
  await expect(page.getByText(/有限卫生预算应怎样组合项目/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "四条前置路线" })).toBeVisible();
  await expect(page.getByTestId("knowledge-confluence-evidence-ledger")).toContainText(
    "WHO · Principles of Health Benefit Packages"
  );
  await context.close();
});

test("opens and exits a complete confluence subgraph", async ({ page }) => {
  await page.goto(
    "/knowledge-graph?confluence=ai-governance&level=5&source=knowledge-confluence&focus=computer-science%3Aformal-methods-and-verification"
  );

  const notice = page.getByTestId("confluence-graph-notice");
  await expect(notice).toBeVisible();
  await expect(notice).toContainText("知识汇流 · AI 治理");
  await expect(notice).toContainText("4 条人工路线 · 17 个高亮节点");
  await expect(page).toHaveURL(/level=5/);
  await expect(page).toHaveURL(/focus=computer-science%3Aformal-methods-and-verification/);
  await expect(page.getByRole("img", { name: /知识图谱，包含/ })).toBeVisible();

  await notice.getByRole("button", { name: "退出汇流视图" }).click();
  await expect(page).not.toHaveURL(/confluence=/);
  await expect(notice).toHaveCount(0);
});
