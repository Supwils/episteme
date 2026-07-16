import { expect, test } from "@playwright/test";

test("opens the staged linguistics release without exposing empty frontier content", async ({
  page,
}) => {
  await page.goto("/linguistics");

  const subjectMain = page.locator(".domain-root > main");
  await expect(page.getByRole("heading", { name: "语言学", exact: true })).toBeVisible();
  await expect(subjectMain.getByText("36 个知识条目")).toBeVisible();
  await expect(subjectMain.locator('a[href^="/linguistics/"]')).toHaveCount(6);
  await expect(page.getByRole("link", { name: /研究前沿/ })).toHaveCount(0);

  await subjectMain.locator('a[href="/linguistics/sounds-and-signs"]').click();
  await expect(page.getByRole("heading", { name: "声音与手势" })).toBeVisible();
  await expect(
    page.locator('.domain-root > main a[href^="/linguistics/sounds-and-signs/"]')
  ).toHaveCount(6);

  await page.goto("/linguistics/sounds-and-signs/language-speech-and-sign");
  await expect(page.getByRole("heading", { name: "语言、言语与手语" })).toBeVisible();
  await expect(page.locator("header.sticky")).toHaveCount(1);
  await expect(page.getByRole("complementary").getByText("L1", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "参考书目" })).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("exposes linguistics as a connected knowledge graph domain", async ({ page }) => {
  await page.goto("/knowledge-graph");

  const mobileFilterButton = page.getByRole("button", { name: "筛选" });
  if ((page.viewportSize()?.width ?? 1024) < 768) {
    await expect(mobileFilterButton).toBeVisible();
    await mobileFilterButton.click();
  }
  const linguisticsFilter = page.getByRole("button", { name: "隐藏语言学领域" });
  await linguisticsFilter.scrollIntoViewIfNeeded();
  await expect(linguisticsFilter).toBeVisible();
  const graphOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(graphOverflow).toBeLessThanOrEqual(1);
  const graphData = await page.request.get("/knowledge-graph/graph-data");
  expect(graphData.ok()).toBe(true);
  const body = await graphData.text();
  expect(body).toContain("linguistics:language-speech-and-sign");
  expect(body).toContain("语言、言语与手语");
  expect(body).toContain("linguistics:linguistic-typology");
  expect(body).toContain("语言田野调查与社区协作");
  expect(body).toContain("linguistics:multilingual-mind");
  expect(body).toContain("阿拉伯文字与非洲文字实践");
  expect(body).toContain("linguistics:unicode-and-digital-writing");
  expect(body).toContain("计算语言学：表示、任务与评估");
  expect(body).toContain("linguistics:grammar-theories");
  expect(body).toContain("语言与思维：相对性争论");
  expect(body).toContain("linguistics:endangered-language-revitalization");
  expect(body).toContain("多语人工智能与语言公平");
});

test("filters the global writing timeline by relation and region", async ({ page }) => {
  await page.goto("/linguistics/writing-systems/unicode-and-digital-writing");

  await expect(page.getByRole("complementary").getByText("L4", { exact: true })).toBeVisible();
  const timeline = page.getByTestId("writing-system-timeline");
  await expect(timeline.getByRole("heading", { name: "全球文字系统时间轴" })).toBeVisible();
  await expect(timeline.getByText("当前显示 19 / 19 个证据节点")).toBeVisible();

  await timeline.getByRole("button", { name: "数字编码", exact: true }).click();
  await expect(timeline.getByText("当前显示 3 / 19 个证据节点")).toBeVisible();
  await timeline.getByLabel("文字系统区域筛选").selectOption("全球基础设施");
  await expect(timeline.getByText("当前显示 3 / 19 个证据节点")).toBeVisible();
  await timeline.getByRole("button", { name: /Unicode 17\.0/ }).click();
  await expect(timeline.getByText(/字体、键盘、平台与社群培训仍决定实际访问/)).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("opens the complete L3 meaning, mind, and global writing release", async ({ page }) => {
  const routes = [
    ["/linguistics/sounds-and-signs/sign-language-structure", "手语的空间语法"],
    ["/linguistics/words-sentences-meaning/pragmatics", "语用学：语境、意图与会话"],
    ["/linguistics/acquisition-and-mind/multilingual-mind", "多语心智与语言切换"],
    ["/linguistics/writing-systems/arabic-and-african-scripts", "阿拉伯文字与非洲文字实践"],
  ] as const;

  for (const [route, heading] of routes) {
    await page.goto(route);
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    await expect(page.getByRole("complementary").getByText("L3", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "参考书目" })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, route).toBeLessThanOrEqual(1);
  }
});

test("explores IPA articulation with a non-recording audio alternative", async ({ page }) => {
  await page.goto("/linguistics/sounds-and-signs/phonetics-and-ipa");

  const explorer = page.getByTestId("ipa-explorer");
  await expect(explorer.getByRole("heading", { name: "发音与 IPA 探索器" })).toBeVisible();
  await explorer.getByRole("button", { name: "元音" }).click();
  await expect(explorer.getByText("闭前不圆唇元音")).toBeVisible();
  await explorer.getByRole("button", { name: "ɯ，闭后不圆唇元音" }).click();
  await expect(explorer.getByText(/土耳其语 kız/)).toBeVisible();
  await expect(explorer.getByText(/不是 ɯ 的标准发音录音/)).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("builds and compares multilingual syntax analyses", async ({ page }) => {
  await page.goto("/linguistics/words-sentences-meaning/syntax");

  const builder = page.getByTestId("syntax-tree-builder");
  await expect(builder.getByRole("heading", { name: "多语言句法树构造器" })).toBeVisible();
  await builder.getByRole("button", { name: "日语 SOV" }).click();
  await expect(builder.getByText("John ga tegami o yonda")).toBeVisible();
  await builder.getByRole("button", { name: "下一步" }).click();
  await builder.getByRole("button", { name: "下一步" }).click();
  await expect(builder.getByText("阶段 3 / 4")).toBeVisible();

  await builder.getByRole("button", { name: "英语 SVO + PP 歧义" }).click();
  await builder.getByRole("button", { name: "名词附着" }).click();
  await expect(builder.getByText(/介词短语修饰 person/)).toBeVisible();
  await builder.getByRole("button", { name: "依存关系" }).click();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("compares language genealogy and typology without flattening the sample", async ({ page }) => {
  await page.goto("/linguistics/history-typology-society/linguistic-typology");

  const map = page.getByTestId("language-family-map");
  await expect(map.getByRole("heading", { name: "语言谱系与类型地图" })).toBeVisible();
  await expect(map.getByRole("heading", { name: "官话", exact: true })).toBeVisible();
  await map.getByRole("button", { name: "类型" }).click();
  await map.getByLabel("语言类型维度").selectOption("modality");
  await expect(map.getByText("视觉—动作通道")).toBeVisible();
  await map.getByLabel("语系筛选").selectOption("印欧语系");
  await expect(map.getByRole("group", { name: /当前显示 2 个样本/ })).toBeVisible();
  await map.getByRole("button", { name: /爱尔兰语，印欧语系/ }).click();
  await expect(map.getByText("Gaeilge")).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("opens the five expert synthesis articles with evidence boundaries", async ({ page }) => {
  const routes = [
    ["/linguistics/words-sentences-meaning/grammar-theories", "语法理论的证据与争论"],
    ["/linguistics/acquisition-and-mind/language-thought-debate", "语言是否塑造思维"],
    [
      "/linguistics/history-typology-society/endangered-language-revitalization",
      "濒危语言与语言复振",
    ],
    ["/linguistics/methods-and-frontiers/language-evolution", "语言能力如何演化"],
    ["/linguistics/methods-and-frontiers/multilingual-ai", "多语 AI、低资源语言与评测公平"],
  ] as const;

  for (const [route, heading] of routes) {
    await page.goto(route);
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    await expect(page.getByRole("complementary").getByText("L5", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "参考书目" })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, route).toBeLessThanOrEqual(1);
  }
});

test("compares sound-change explanations against exceptions and lexical history", async ({
  page,
}) => {
  await page.goto("/linguistics/history-typology-society/languages-change");

  const lab = page.getByTestId("sound-change-lab");
  await expect(lab.getByRole("heading", { name: "音变证据实验室" })).toBeVisible();
  await lab.getByRole("button", { name: /意大利语条件腭化/ }).click();
  await lab.getByRole("button", { name: "条件音变" }).click();
  await expect(lab.getByText("当前证据支持")).toBeVisible();
  await expect(lab.getByText(/保留项不是规则失败/)).toBeVisible();

  await lab.getByRole("button", { name: /英语复数类推重组/ }).click();
  await lab.getByRole("button", { name: "类推重组", exact: true }).click();
  await expect(lab.getByText("生产性 -s 复数按单数 book 重新建立 books。")).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});
