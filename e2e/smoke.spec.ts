import { expect, test } from "@playwright/test";

test.describe("production smoke", () => {
  test("opens the portal and reaches a server-rendered article through search", async ({
    page,
  }) => {
    const pageErrors: Error[] = [];
    page.on("pageerror", (error) => pageErrors.push(error));

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: /探索人类/ })).toBeVisible();

    await page.getByRole("button", { name: /打开搜索/ }).click();
    const search = page.getByRole("dialog", { name: "全站搜索" });
    await search.getByRole("textbox", { name: "搜索" }).fill("苏格拉底");

    const thinkerResult = search.locator('a[href="/philosophy/thinkers/socrates"]');
    await expect(thinkerResult).toBeVisible();
    await thinkerResult.click();

    await expect(page).toHaveURL(/\/philosophy\/thinkers\/socrates$/);
    await expect(page.getByRole("heading", { name: "苏格拉底", exact: true })).toBeVisible();
    expect(pageErrors).toEqual([]);
  });

  test("restores and advances a knowledge graph thought tour", async ({ page, isMobile }) => {
    const pageErrors: Error[] = [];
    page.on("pageerror", (error) => pageErrors.push(error));

    const initialStep = isMobile ? 2 : 3;
    const tourId = isMobile ? "modern-macro-diagnosis" : "macro-politics-psychology";
    const response = await page.goto(`/knowledge-graph?tourId=${tourId}&step=${initialStep}`);
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("button", { name: "连接引擎" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    if (isMobile) {
      const detailPanel = page.getByRole("dialog", { name: /详情$/ });
      await expect(detailPanel).toHaveCount(0);
      await expect(page.getByRole("link", { name: "阅读当前文章 →" })).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "下一步" })).toBeEnabled();
    await page.getByRole("button", { name: "下一步" }).click();

    await expect(page).toHaveURL(new RegExp(`tourId=${tourId}&step=${initialStep + 1}`));
    await expect(
      page.locator('button[aria-current="step"][aria-label^="聚焦路线步骤："]')
    ).toHaveCount(1);
    expect(pageErrors).toEqual([]);
  });
});
