import { expect, test } from "@playwright/test";

test.describe("WebKit / Safari smoke", () => {
  test("opens a philosophy thinker with a relative canonical", async ({ page }) => {
    const response = await page.goto("/philosophy/thinkers/socrates");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "苏格拉底", exact: true })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      hrefMatcher("/philosophy/thinkers/socrates")
    );
  });

  test("opens a physics dialogue with a relative canonical", async ({ page }) => {
    const response = await page.goto("/universe-physics/dialogues/bohr-heisenberg");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "玻尔 vs 海森堡：互补性原理" })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      hrefMatcher("/universe-physics/dialogues/bohr-heisenberg")
    );
  });

  test("anthropology kinship lab stays keyboard-reachable", async ({ page }) => {
    const response = await page.goto("/anthropology/kinship-diagram");
    expect(response?.status()).toBe(200);
    await page.getByRole("button", { name: "易洛魁型", exact: true }).click();
    await expect(page.getByText(/另成一类/)).toBeVisible();
  });

  test("education spacing lab stays keyboard-reachable", async ({ page }) => {
    const response = await page.goto("/education/spacing-lab");
    expect(response?.status()).toBe(200);
    await page.getByRole("button", { name: "间隔练习", exact: true }).click();
    await expect(page.getByText(/示意对照时间表，不是背词器/)).toBeVisible();
  });

  test("education reading-path invite enters the sequence", async ({ page }) => {
    const response = await page.goto("/education/learning-foundations/what-is-learning");
    expect(response?.status()).toBe(200);
    await page
      .getByRole("navigation", { name: "阅读路线" })
      .getByRole("link", { name: /从学会到国际比较/ })
      .click();
    await expect(page).toHaveURL(/path=from-learning-to-comparison/);
    await expect(page.getByRole("link", { name: "从学会到国际比较 目录" })).toBeVisible();
  });

  test("search reaches the thinker from the portal", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await page.getByRole("button", { name: /打开搜索/ }).click();
    const search = page.getByRole("dialog", { name: "全站搜索" });
    await search.getByRole("textbox", { name: "搜索" }).fill("苏格拉底");
    const thinkerResult = search.locator('a[href="/philosophy/thinkers/socrates"]');
    await expect(thinkerResult).toBeVisible();
    await thinkerResult.click();
    await expect(page).toHaveURL(/\/philosophy\/thinkers\/socrates$/);
  });
});

function hrefMatcher(path: string) {
  return new RegExp(`${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`);
}
