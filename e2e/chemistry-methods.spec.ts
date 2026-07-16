import { expect, test } from "@playwright/test";

test("lists all chemistry methods and renders an article", async ({ page }) => {
  await page.goto("/chemistry/methods");

  await expect(page.getByRole("heading", { name: "证据与实验方法" })).toBeVisible();
  await expect(page.locator('a[href^="/chemistry/methods/"]')).toHaveCount(6);

  await page.goto("/chemistry/methods/nmr-spectroscopy-structure-elucidation");
  await expect(page.getByRole("heading", { name: "NMR：从核自旋到分子结构推断" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "二维谱把局部线索织成网络" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "参考文献" })).toBeVisible();
});
