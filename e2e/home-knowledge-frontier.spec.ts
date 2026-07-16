import { expect, test, type Page } from "@playwright/test";

const PROFILE_KEY = "uk-knowledge-profile-v1";
const JOURNEY_KEY = "uk-knowledge-gap-journeys-v1";

async function revealFrontierLab(page: Page) {
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

  const lab = continuum.getByTestId("knowledge-frontier-lab");
  await lab.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await expect(lab.getByRole("heading", { name: "用你真正掌握的知识，计算下一步" })).toBeVisible();
  return lab;
}

test("defers the private frontier request until the lab approaches the viewport", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith("/api/knowledge-frontier")) requests.push(request.url());
  });
  await page.goto("/");
  await page.waitForTimeout(400);
  expect(requests).toHaveLength(0);

  const lab = await revealFrontierLab(page);
  await expect(lab.getByTestId("frontier-result-computer-science:abstraction")).toBeVisible();
  expect(requests).toHaveLength(1);
});

test("builds and restores an explicit cross-subject knowledge profile", async ({ page }) => {
  await page.goto("/");
  await page.evaluate((key) => window.localStorage.removeItem(key), PROFILE_KEY);
  await page.reload();
  const lab = await revealFrontierLab(page);

  await expect(lab.getByRole("heading", { name: "用你真正掌握的知识，计算下一步" })).toBeVisible();
  await expect(lab.getByText("1362", { exact: true })).toBeVisible();
  await expect(lab.getByRole("button", { name: /可学习 670/ })).toBeVisible();
  await expect(lab.getByText("15 学科确认分布")).toBeVisible();
  await expect(lab.getByText("AI 治理", { exact: true })).toBeVisible();
  await expect(lab.getByText("0/16", { exact: true }).first()).toBeVisible();

  const search = lab.getByRole("combobox", { name: "搜索已掌握知识节点" });
  await search.fill("词如何组成句子");
  await lab.getByRole("option", { name: /词如何组成句子/ }).click();
  await expect
    .poll(() =>
      page.evaluate((key) => {
        const value = JSON.parse(window.localStorage.getItem(key) ?? '{"entries":[]}') as {
          entries: unknown[];
        };
        return value.entries.length;
      }, PROFILE_KEY)
    )
    .toBe(1);
  await expect(lab.getByText("1 科 · L1", { exact: true })).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await lab.getByRole("button", { name: "导出档案" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("episteme-knowledge-profile.json");

  await lab.getByRole("button", { name: /已掌握 1/ }).click();
  await expect(lab.getByTestId("frontier-result-linguistics:words-and-sentences")).toContainText(
    "你已主动确认掌握"
  );

  await page.reload();
  const restoredLab = await revealFrontierLab(page);
  await restoredLab.getByRole("button", { name: /可学习/ }).click();
  await restoredLab.getByLabel("知识前沿学科筛选").selectOption("linguistics");
  await expect(restoredLab.getByTestId("frontier-result-linguistics:syntax")).toContainText(
    "1 个人工策展前置均已确认"
  );
  await expect(
    restoredLab
      .getByTestId("frontier-result-linguistics:syntax")
      .getByRole("link", { name: "在图谱中核对" })
  ).toHaveAttribute(
    "href",
    /frontier=ready&level=2&focus=linguistics%3Asyntax&source=knowledge-frontier/
  );

  await restoredLab.getByRole("button", { name: /被阻塞/ }).click();
  await restoredLab.getByLabel("知识前沿学科筛选").selectOption("");
  await restoredLab.getByPlaceholder("概念、人物、方法或关键词").fill("形式化方法与程序验证");
  const blocked = restoredLab.getByTestId(
    "frontier-result-computer-science:formal-methods-and-verification"
  );
  await expect(blocked).toContainText("最小缺口");
  await expect(blocked).toContainText("抽象与分层");

  await restoredLab.getByLabel("导入知识档案 JSON").setInputFiles({
    name: "profile.json",
    mimeType: "application/json",
    buffer: Buffer.from(
      JSON.stringify({
        entries: [{ nodeId: "mathematics:axiom", confirmedAt: "2026-07-12T00:00:00.000Z" }],
      })
    ),
  });
  await expect
    .poll(() =>
      page.evaluate((key) => {
        const value = JSON.parse(window.localStorage.getItem(key) ?? '{"entries":[]}') as {
          entries: { nodeId: string }[];
        };
        return value.entries.map((entry) => entry.nodeId);
      }, PROFILE_KEY)
    )
    .toEqual(["mathematics:axiom"]);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("builds an exact prerequisite gap route for a blocked target", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(
    ([profileKey, journeyKey]) => {
      window.localStorage.removeItem(profileKey);
      window.localStorage.removeItem(journeyKey);
    },
    [PROFILE_KEY, JOURNEY_KEY] as const
  );
  await page.reload();

  const lab = await revealFrontierLab(page);
  await lab.getByRole("button", { name: /被阻塞 692/ }).click();
  await lab.getByLabel("知识前沿学科筛选").selectOption("political-science");
  await lab.getByPlaceholder("概念、人物、方法或关键词").fill("安全困境");

  const target = lab.getByTestId("frontier-result-political-science:security-dilemma-war-peace");
  await target.getByRole("button", { name: "生成补缺路线" }).click();

  const plan = lab.getByTestId("knowledge-gap-plan");
  await expect(plan.getByRole("heading", { name: /通往“安全困境、战争与和平”/ })).toBeVisible();
  await expect(plan).toContainText("1 条硬依赖");
  await expect(plan).toContainText("从权力、规则与集体选择开始");
  await expect(plan.getByText("45m", { exact: true }).first()).toBeVisible();

  await plan.getByRole("button", { name: "90 分钟" }).click();
  await expect(plan.getByText("90m", { exact: true }).first()).toBeVisible();
  await expect(plan.getByText("42m", { exact: true })).toBeVisible();
  await expect(plan.getByText("48m", { exact: true })).toBeVisible();

  await plan.getByRole("button", { name: "保存为学习路线" }).click();
  await plan.getByRole("checkbox", { name: "安全困境、战争与和平：阅读正文" }).check();
  await expect
    .poll(() => page.evaluate((key) => window.localStorage.getItem(key), JOURNEY_KEY))
    .toContain('"reading":true');
  await expect
    .poll(() =>
      page.evaluate((key) => {
        const profile = JSON.parse(window.localStorage.getItem(key) ?? '{"entries":[]}') as {
          entries: unknown[];
        };
        return profile.entries.length;
      }, PROFILE_KEY)
    )
    .toBe(0);

  const library = lab.getByTestId("knowledge-journey-library");
  await library.getByRole("button", { name: "打开档案库" }).click();
  const archivedRoute = library.getByTestId(
    "journey-library-political-science:security-dilemma-war-peace"
  );
  await expect(archivedRoute.getByText("当前版本", { exact: true })).toBeVisible();
  await expect(archivedRoute.getByText("已有记录 · 1/8", { exact: true })).toBeVisible();
  await expect(archivedRoute).toContainText("下一待办");

  const archiveDownloadPromise = page.waitForEvent("download");
  await library.getByRole("button", { name: "导出路线档案" }).click();
  const archiveDownload = await archiveDownloadPromise;
  expect(archiveDownload.suggestedFilename()).toBe("episteme-learning-journeys.json");

  const archive = await page.evaluate((key) => {
    const store = JSON.parse(window.localStorage.getItem(key) ?? '{"journeys":{}}') as {
      journeys: Record<string, unknown>;
    };
    return {
      format: "episteme-knowledge-gap-journeys",
      version: 1,
      exportedAt: "2026-07-13T03:00:00.000Z",
      journeys: Object.values(store.journeys),
    };
  }, JOURNEY_KEY);
  await library.getByLabel("导入路线档案 JSON").setInputFiles({
    name: "journeys.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(archive)),
  });
  await expect(library.getByText("导入前预览")).toBeVisible();
  await expect(library).toContainText("新增 0 条，冲突 1 条");
  await library.getByRole("button", { name: "采用导入版本" }).click();
  await library.getByRole("button", { name: "确认导入" }).click();
  await expect(library.getByText("导入前预览")).toBeHidden();

  await plan.getByRole("button", { name: "安全困境、战争与和平：确认已掌握" }).click();
  await expect(plan.getByText("检测到新的路线版本，旧快照尚未改写")).toBeVisible();
  await expect(plan).toContainText("目标状态由“仍有前置缺口”变为“已掌握”");
  await plan.getByRole("button", { name: "继续旧版路线" }).click();
  await expect(plan.getByText("你已选择继续旧版路线")).toBeVisible();
  await plan.getByRole("button", { name: "迁移到当前路线" }).click();
  await expect(plan.getByText("这个快照没有待补步骤。")).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("replays the reviewed multi-parent relation release on demand", async ({ page }) => {
  const reviewRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith("/api/knowledge-frontier/relation-review")) {
      reviewRequests.push(request.url());
    }
  });
  await page.goto("/");
  const lab = await revealFrontierLab(page);
  const review = lab.getByTestId("knowledge-relation-review");
  await expect(review.getByRole("heading", { name: "多前置关系审校台" })).toBeVisible();
  expect(reviewRequests).toHaveLength(0);

  await review.getByRole("button", { name: "打开审校台" }).click();
  await expect(review.getByText("2.1.0", { exact: true })).toBeVisible();
  expect(reviewRequests).toHaveLength(1);
  await expect(review).toContainText("v1 可学 15 → v2 可学 0，新增阻塞 15");
  await expect(review).toContainText("+52");
  await expect(review).toContainText("循环风险");

  await review.getByRole("tab", { name: /AI、算法治理与监控的政治/ }).click();
  await review.getByRole("button", { name: "必要前置", exact: true }).click();
  const detail = review.getByTestId("knowledge-relation-review-detail");
  await expect(detail).toContainText("形式化方法与程序验证");
  await expect(detail).toContainText("数字表型、计算方法与研究伦理");
  await expect(detail).not.toContainText("政治学的比较方法");
  await expect(detail).toContainText("完整依赖闭包从5 个节点增加到 11 个");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("shares the local frontier with the knowledge graph and node detail", async ({ page }) => {
  await page.addInitScript((key) => {
    window.localStorage.setItem(
      key,
      JSON.stringify({
        version: 1,
        entries: [
          { nodeId: "computer-science:abstraction", confirmedAt: "2026-07-12T00:00:00.000Z" },
        ],
      })
    );
  }, PROFILE_KEY);
  await page.goto(
    "/knowledge-graph?frontier=mastered&level=1&focus=computer-science%3Aabstraction&source=knowledge-frontier"
  );
  await page.getByRole("img", { name: /知识图谱，包含 1 个节点/ }).waitFor();
  if (!(await page.evaluate(() => window.matchMedia("(max-width: 768px)").matches))) {
    await expect(page.getByLabel("学习前沿状态筛选")).toHaveValue("mastered");
  }
  await expect(page).toHaveURL(/frontier=mastered/);
  await expect(page.getByRole("img", { name: /知识图谱，包含 1 个节点/ })).toBeVisible();
  await expect(page.getByRole("dialog", { name: "抽象与分层 详情" })).toBeVisible({
    timeout: 20_000,
  });
  const detail = page.getByRole("dialog", { name: "抽象与分层 详情" });
  await expect(detail.getByText("我的学习前沿")).toBeVisible();
  await expect(detail.getByText("已确认掌握")).toBeVisible();
  await detail.getByRole("button", { name: "撤销确认" }).click();
  await expect
    .poll(() =>
      page.evaluate((key) => {
        const value = JSON.parse(window.localStorage.getItem(key) ?? '{"entries":[]}') as {
          entries: unknown[];
        };
        return value.entries.length;
      }, PROFILE_KEY)
    )
    .toBe(0);
});
