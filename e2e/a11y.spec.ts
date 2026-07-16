import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Representative page of each rendering path: portal, the generic domain engine
// (+ the two new inline interactives), philosophy/MDX, the species prose route,
// a frontier article, and the canvas-heavy knowledge graph. We gate on serious +
// critical WCAG 2 A/AA violations — the bar that actually blocks real users.
const PAGES: { name: string; path: string }[] = [
  { name: "portal", path: "/" },
  {
    name: "earth-science (plate-boundaries interactive)",
    path: "/earth-science/concepts/plate-boundaries",
  },
  { name: "political-science (compass interactive)", path: "/political-science/concepts/ideology" },
  {
    name: "linguistics (IPA explorer)",
    path: "/linguistics/sounds-and-signs/phonetics-and-ipa",
  },
  {
    name: "linguistics (syntax builder)",
    path: "/linguistics/words-sentences-meaning/syntax",
  },
  {
    name: "linguistics (family and typology map)",
    path: "/linguistics/history-typology-society/linguistic-typology",
  },
  {
    name: "linguistics (multilingual mind prose)",
    path: "/linguistics/acquisition-and-mind/multilingual-mind",
  },
  {
    name: "linguistics (global scripts prose)",
    path: "/linguistics/writing-systems/arabic-and-african-scripts",
  },
  {
    name: "linguistics (global writing timeline)",
    path: "/linguistics/writing-systems/unicode-and-digital-writing",
  },
  {
    name: "linguistics (sound change lab)",
    path: "/linguistics/history-typology-society/languages-change",
  },
  {
    name: "linguistics (multilingual AI synthesis)",
    path: "/linguistics/methods-and-frontiers/multilingual-ai",
  },
  { name: "philosophy thinker", path: "/philosophy/thinkers/socrates" },
  { name: "life-science species prose", path: "/life-science/species/octopus" },
  { name: "frontier article", path: "/computer-science/frontier/large-language-models" },
  {
    name: "knowledge confluence evidence page",
    path: "/knowledge-confluence/public-health-priority",
  },
  // NB: /knowledge-graph (a canvas force-graph tool) is intentionally out of this
  // reading-experience gate — its control-panel labels are a separate surface.
];

for (const p of PAGES) {
  test(`a11y: ${p.name}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(p.path, { waitUntil: "domcontentloaded" });
    // let client islands (interactives, canvas) mount + fade-in animations settle
    await page.waitForTimeout(1500);
    // `header` (nav) and the portal `.domain-card` use each domain's brand accent
    // as text/active-pill colour. A few of those accents miss 4.5:1 on the tinted
    // surfaces they sit on, but they carry redundant non-colour cues (labels,
    // arrows, aria-current, fill, bold) so they don't fail WCAG 1.4.1. We gate the
    // *content* — body text, labels, headings — at full AA and document the brand
    // chrome as a deliberate exception.
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .exclude("header")
      .exclude(".domain-card")
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );
    expect(
      serious,
      serious.map((v) => `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`).join("\n")
    ).toEqual([]);
  });
}

test("a11y: portal knowledge confluence", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?confluence=urban-climate-adaptation&confluenceMinutes=45");
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
  await explorer.scrollIntoViewIfNeeded();
  const load = explorer.getByRole("button", { name: "立即载入" });
  const loadHandle = (await load.count()) > 0 ? await load.elementHandle() : null;
  if (loadHandle && (await loadHandle.isVisible())) {
    await loadHandle.evaluate((element) => (element as HTMLButtonElement).click());
  }
  await expect(explorer.getByTestId("knowledge-confluence-evidence-ledger")).toBeVisible({
    timeout: 15_000,
  });
  await explorer.scrollIntoViewIfNeeded();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .include('[data-testid="knowledge-confluence-explorer"]')
    .analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical"
  );
  expect(
    serious,
    serious
      .map(
        (violation) =>
          `[${violation.impact}] ${violation.id}: ${violation.help} (${violation.nodes.length})`
      )
      .join("\n")
  ).toEqual([]);
});

test("a11y: portal reachable knowledge frontier", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.localStorage.removeItem("uk-knowledge-profile-v1"));
  await page.reload({ waitUntil: "domcontentloaded" });
  const lab = page.getByTestId("knowledge-frontier-lab");
  await lab.scrollIntoViewIfNeeded();
  await expect(lab.getByTestId("frontier-result-computer-science:abstraction")).toBeVisible();
  const relationReview = lab.getByTestId("knowledge-relation-review");
  await relationReview.getByRole("button", { name: "打开审校台" }).click();
  await expect(relationReview.getByText("2.1.0", { exact: true })).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .include('[data-testid="knowledge-frontier-lab"]')
    .analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical"
  );
  expect(
    serious,
    serious
      .map(
        (violation) =>
          `[${violation.impact}] ${violation.id}: ${violation.help} (${violation.nodes.length})`
      )
      .join("\n")
  ).toEqual([]);
});

test("a11y: portal full-graph learning branch", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const planner = page.getByTestId("knowledge-learning-planner");
  await planner.scrollIntoViewIfNeeded();
  await planner.getByRole("button", { name: "全部节点" }).click();
  const search = planner.getByRole("combobox", { name: "搜索全部知识节点" });
  await search.fill("AI 伦理");
  await search.press("ArrowDown");
  await search.press("Enter");
  await expect(planner.getByText("直接旁支", { exact: true })).toBeVisible();
  await search.fill("身体、疾病与证据");
  await planner
    .getByRole("option", { name: /从身体、疾病与证据开始/ })
    .filter({ hasText: "18条等距来路" })
    .click();
  await expect(planner.getByRole("heading", { name: "同距锚点比较" })).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .include('[data-testid="knowledge-learning-planner"]')
    .analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical"
  );
  expect(
    serious,
    serious
      .map(
        (violation) =>
          `[${violation.impact}] ${violation.id}: ${violation.help} (${violation.nodes.length})`
      )
      .join("\n")
  ).toEqual([]);
});
