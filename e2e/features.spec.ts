import { test, expect } from "@playwright/test";

// Regression coverage for the features added this session: the species prose
// route (both essay-only and record+essay), the two inline interactives, and
// the cross-section related resolver in the generic domain engine.

test("species prose: essay-only species renders a prose page (was 404 before)", async ({
  page,
}) => {
  const res = await page.goto("/life-science/species/immortal-jellyfish");
  expect(res?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: "灯塔水母", level: 1 })).toBeVisible();
  await expect(page.getByText("转分化").first()).toBeVisible();
});

test("species prose: record-backed species shows taxonomy + appended essay", async ({ page }) => {
  await page.goto("/life-science/species/octopus");
  await expect(page.getByRole("heading", { name: "分类信息" })).toBeVisible();
  // the appended prose essay (distinctive phrase from octopus.mdx)
  await expect(page.getByText("分布式神经系统").first()).toBeVisible();
});

test("earth-science interactive: plate-boundaries tabs switch content", async ({ page }) => {
  await page.goto("/earth-science/concepts/plate-boundaries");
  const tablist = page.getByRole("tablist", { name: "板块边界类型" });
  await expect(tablist).toBeVisible();
  await tablist.getByRole("tab", { name: "汇聚边界" }).click();
  await expect(page.getByText("海沟 · 俯冲带 · 火山弧")).toBeVisible();
  await tablist.getByRole("tab", { name: "转换边界" }).click();
  await expect(page.getByText("走滑断层")).toBeVisible();
});

test("political-science interactive: compass slider updates quadrant", async ({ page }) => {
  await page.goto("/political-science/concepts/ideology");
  await expect(page.getByText("政治光谱 · 交互")).toBeVisible();
  const econ = page.getByRole("slider", { name: /经济轴/ });
  await econ.focus();
  // drive to the economic-right extreme
  for (let i = 0; i < 10; i++) await page.keyboard.press("ArrowRight");
  await expect(page.getByText(/右翼/)).toBeVisible();
});

test("related resolver: cross-section link to a frontier article renders", async ({ page }) => {
  await page.goto("/political-science/institutions/democracy-authoritarianism");
  // "相关条目" should link to the frontier piece democratic-backsliding (a
  // different section) — silently dropped before the resolver fix.
  const link = page.locator('a[href="/political-science/frontier/democratic-backsliding"]');
  await expect(link.first()).toBeVisible();
});
