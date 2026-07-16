import { expect, test, type Page } from "@playwright/test";

async function openGraphFilters(page: Page) {
  const pathSelect = page.getByLabel("规范知识路径");
  if (!(await pathSelect.isVisible())) {
    const closeDetail = page.getByRole("button", { name: "关闭详情面板" });
    if (await closeDetail.isVisible()) await closeDetail.click();
    await page.getByRole("button", { name: "筛选" }).click();
  }
}

async function readNodeCount(canvas: ReturnType<Page["getByRole"]>): Promise<number> {
  const label = await canvas.getAttribute("aria-label");
  const count = label?.match(/包含 (\d+) 个节点/)?.[1];
  if (!count) throw new Error(`Cannot read graph node count from: ${label}`);
  return Number(count);
}

test("opens and filters the graph by cognitive level", async ({ page }) => {
  await page.goto("/knowledge-graph?level=5&source=continuum");

  const canvas = page.getByRole("img", { name: /知识图谱，包含/ });
  await expect(canvas).toHaveAttribute("aria-label", /包含 \d+ 个节点/);
  const levelFiveCount = await readNodeCount(canvas);

  const filter = page.getByLabel("认知阶段筛选");
  if (!(await filter.isVisible())) {
    await page.getByRole("button", { name: "筛选" }).click();
  }
  await expect(filter).toHaveValue("5");

  const stageLayout = page.getByRole("button", { name: "阶段" });
  const forceLayout = page.getByRole("button", { name: "关系" });
  await expect(stageLayout).toHaveAttribute("aria-pressed", "true");

  await expect
    .poll(() =>
      canvas.evaluate((element) => {
        const target = element as HTMLCanvasElement;
        const context = target.getContext("2d");
        if (!context) return 0;
        const pixels = context.getImageData(0, 0, target.width, target.height).data;
        let count = 0;
        for (let index = 3; index < pixels.length; index += 4) {
          if (pixels[index]! > 0) count++;
        }
        return count;
      })
    )
    .toBeGreaterThan(10);

  await forceLayout.click();
  await expect(forceLayout).toHaveAttribute("aria-pressed", "true");
  await stageLayout.click();
  await expect(stageLayout).toHaveAttribute("aria-pressed", "true");

  const curatedPathSelect = page.getByLabel("规范知识路径");
  await curatedPathSelect.selectOption("proof-computation");
  await expect(page).toHaveURL(/path=proof-computation/);
  await expect(page).toHaveURL(/source=curated-path/);
  await expect(page.getByRole("heading", { name: "从公理到机器辅助证明" })).toBeVisible();
  await expect(page.getByText("知识来路 · 5 步")).toBeVisible();
  await expect(page.getByRole("button", { name: "L1 公理" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "从公理到机器辅助证明" })).toBeVisible();
  await openGraphFilters(page);
  await expect(curatedPathSelect).toHaveValue("proof-computation");
  const closeReloadedDetail = page.getByRole("button", { name: "关闭详情面板" });
  if (await closeReloadedDetail.isVisible()) await closeReloadedDetail.click();
  await curatedPathSelect.selectOption("");
  await expect(page).not.toHaveURL(/path=/);

  await page.getByLabel("搜索知识图谱节点").fill("机制可解释性");
  await page.getByRole("option", { name: /机制可解释性/ }).click();
  await expect(page.getByRole("heading", { name: "从抽象模式到可信人工智能" })).toBeVisible();
  await expect(page.getByText("知识来路 · 5 步")).toBeVisible();
  await expect(page.getByRole("button", { name: "L1 抽象与分层" })).toBeVisible();
  await expect(page.getByRole("button", { name: "L5 机制可解释性" })).toHaveAttribute(
    "aria-current",
    "step"
  );

  await page.getByRole("button", { name: "L3 图遍历：BFS 与 DFS" }).click();
  await expect(page.getByRole("heading", { name: "图遍历：BFS 与 DFS" })).toBeVisible();
  await expect(page.getByText("知识来路 · 3 步")).toBeVisible();
  await page.getByRole("button", { name: "关闭详情面板" }).click();

  await filter.selectOption("4");
  await expect(page).toHaveURL(/level=4/);
  await expect.poll(() => readNodeCount(canvas)).not.toBe(levelFiveCount);
  const levelFourCount = await readNodeCount(canvas);

  await page.getByRole("button", { name: "类型" }).click();
  await page.getByRole("option", { name: "实验", exact: true }).click();
  await expect(page.getByRole("button", { name: "实验", exact: true })).toBeVisible();
  await expect.poll(() => readNodeCount(canvas)).toBeLessThan(levelFourCount);
  await expect.poll(() => readNodeCount(canvas)).toBeGreaterThan(0);
});

test("respects a focused step inside a curated domain spine", async ({ page }) => {
  await page.goto(
    "/knowledge-graph?path=life-science-evidence-spine&focus=lifescience%3Aphylogenetic-inference&source=coverage"
  );
  await expect(page.getByRole("heading", { name: "系统发育推断" })).toBeVisible();
  await expect(page.getByRole("button", { name: "L4 系统发育推断" })).toHaveAttribute(
    "aria-current",
    "step"
  );
  await openGraphFilters(page);
  await expect(page.getByLabel("规范知识路径")).toHaveValue("life-science-evidence-spine");
  await expect(page.getByLabel("认知阶段筛选")).toHaveValue("4");
  await expect(page).toHaveURL(/level=4/);

  await page.goto(
    "/knowledge-graph?path=economics-macro-diagnostics-spine&focus=economics%3Aeconomic-vitals-growth-prices-jobs&source=coverage"
  );
  await expect(
    page.getByRole("heading", { name: "经济的三个体征：增长、物价与工作" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "L1 经济的三个体征：增长、物价与工作" })
  ).toHaveAttribute("aria-current", "step");
  await openGraphFilters(page);
  await expect(page.getByLabel("规范知识路径")).toHaveValue("economics-macro-diagnostics-spine");
  await expect(page.getByLabel("认知阶段筛选")).toHaveValue("1");

  await page.goto(
    "/knowledge-graph?path=history-global-evidence-spine&focus=history%3Aatlantic-slave-trade&source=coverage"
  );
  await expect(page.getByRole("heading", { name: "大西洋奴隶贸易" })).toBeVisible();
  await expect(page.getByRole("button", { name: "L4 大西洋奴隶贸易" })).toHaveAttribute(
    "aria-current",
    "step"
  );
  await openGraphFilters(page);
  await expect(page.getByLabel("规范知识路径")).toHaveValue("history-global-evidence-spine");
  await expect(page.getByLabel("认知阶段筛选")).toHaveValue("4");
});
