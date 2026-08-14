import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const BASE_URL = process.env.SCAN_BASE ?? "http://localhost:3000";
const THEMES = ["dark", "light"];
const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const DOMAIN_PAGES = [
  ["物理学", "/universe-physics", "/universe-physics/dialogues/bohr-heisenberg"],
  ["宇宙学", "/cosmology", "/cosmology/dialogues/cosmology-crisis"],
  ["人类历史", "/human-history", "/human-history/frontier/ancient-dna-revolution"],
  ["哲学", "/philosophy", "/philosophy/concepts/absurd"],
  ["生命科学", "/life-science", "/life-science/dialogues/darwin-lyell"],
  ["数学", "/mathematics", "/mathematics/concepts/algebraic-geometry"],
  ["经济学", "/economics", "/economics/case-studies/bretton-woods"],
  ["心理学", "/psychology", "/psychology/debates/consciousness-hard-problem"],
  ["计算机科学", "/computer-science", "/computer-science/algorithms/a-star-search"],
  ["政治学", "/political-science", "/political-science/concepts/accountability"],
  ["地球科学", "/earth-science", "/earth-science/climate-risks/carbon-budgets-and-net-zero"],
  ["医学", "/medicine", "/medicine/concepts/antibiotic-resistance"],
  ["化学", "/chemistry", "/chemistry/concepts/acids-and-bases"],
  ["社会学", "/sociology", "/sociology/concepts/chinese-social-thought"],
  ["语言学", "/linguistics", "/linguistics/acquisition-and-mind/children-learn-language"],
  ["法学", "/law", "/law/legal-traditions/civil-vs-common-law"],
  ["艺术", "/arts", "/arts/architecture/building-as-structure"],
  ["工程与技术", "/engineering", "/engineering/frontiers/safety-engineering"],
];

const PAGES = [
  ["门户", "/"],
  ...DOMAIN_PAGES.flatMap(([domain, landing, article]) => [
    [`${domain}首页`, landing],
    [`${domain}文章`, article],
  ]),
  ["知识图谱", "/knowledge-graph"],
  ["每日知识", "/daily"],
  ["地球科学板块交互", "/earth-science/concepts/plate-boundaries"],
  ["政治学坐标交互", "/political-science/concepts/ideology"],
  ["语言学 IPA 交互", "/linguistics/sounds-and-signs/phonetics-and-ipa"],
  ["生命科学物种页", "/life-science/species/octopus"],
];
const SELECTED_PAGES = process.env.SCAN_PATH
  ? PAGES.filter(([, path]) => path === process.env.SCAN_PATH)
  : PAGES;

if (SELECTED_PAGES.length === 0) {
  throw new Error(`SCAN_PATH did not match a configured page: ${process.env.SCAN_PATH}`);
}

async function waitForServer() {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) return;
    } catch {
      // The production server may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }
  throw new Error(`Local server did not become ready: ${BASE_URL}`);
}

await waitForServer();

const browser = await chromium.launch();
const violations = [];
const navigationFailures = [];

for (const viewport of VIEWPORTS) {
  for (const theme of THEMES) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: theme,
      reducedMotion: "reduce",
    });
    await context.addInitScript((selectedTheme) => {
      window.localStorage.setItem("theme", selectedTheme);
    }, theme);
    let nextPageIndex = 0;
    async function scanWorker() {
      const page = await context.newPage();
      while (nextPageIndex < SELECTED_PAGES.length) {
        const pageIndex = nextPageIndex;
        nextPageIndex += 1;
        const [name, path] = SELECTED_PAGES[pageIndex];
        const response = await page.goto(`${BASE_URL}${path}`, { waitUntil: "load" });
        if (!response?.ok()) {
          navigationFailures.push({ name, path, status: response?.status() ?? "no response" });
          continue;
        }

        // Let reduced-motion entrance transitions and lazy client content settle;
        // scanning mid-fade produces false contrast failures from temporary opacity.
        // The legacy history home initializes a larger GSAP scene and needs
        // extra time under concurrent CI load to reach its final opacity.
        await page.waitForTimeout(path === "/human-history" ? 3_000 : 1_250);
        const appliedTheme = await page.evaluate(() =>
          document.documentElement.classList.contains("light") ? "light" : "dark"
        );
        if (appliedTheme !== theme) {
          navigationFailures.push({ name, path, status: `expected ${theme}, got ${appliedTheme}` });
          continue;
        }

        const horizontalOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        if (horizontalOverflow > 1) {
          navigationFailures.push({
            name,
            path,
            status: `${horizontalOverflow}px document-level horizontal overflow`,
          });
          continue;
        }

        const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
        const blocking = result.violations.filter(
          (violation) => violation.impact === "serious" || violation.impact === "critical"
        );
        for (const violation of blocking) {
          violations.push({
            viewport: viewport.name,
            theme,
            page: name,
            path,
            id: violation.id,
            impact: violation.impact,
            help: violation.help,
            nodes: violation.nodes.map((node) => ({
              html: node.html.slice(0, 180),
              target: node.target.join(" "),
            })),
          });
        }
      }
      await page.close();
    }

    await Promise.all(
      Array.from({ length: Math.min(4, SELECTED_PAGES.length) }, () => scanWorker())
    );

    await context.close();
  }
}

await browser.close();

console.log(
  `Scanned ${SELECTED_PAGES.length} pages × ${THEMES.length} themes × ${VIEWPORTS.length} viewports.`
);

for (const failure of navigationFailures) {
  console.error(`NAVIGATION ${failure.path}: ${failure.status}`);
}

for (const violation of violations) {
  console.error(
    `${violation.impact.toUpperCase()} ${violation.id} · ${violation.viewport}/${violation.theme} · ${violation.page} ${violation.path} · ${violation.nodes.length} node(s)`
  );
  console.error(`  ${violation.help}`);
  for (const node of violation.nodes.slice(0, 3)) {
    console.error(`  ${node.target}: ${node.html}`);
  }
}

if (navigationFailures.length > 0 || violations.length > 0) {
  console.error(
    `Accessibility scan failed: ${navigationFailures.length} navigation/theme failure(s), ${violations.length} blocking violation group(s).`
  );
  process.exitCode = 1;
} else {
  console.log("Accessibility scan passed with no serious or critical WCAG A/AA violations.");
}
