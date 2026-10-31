import { expect, test } from "@playwright/test";

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  test(`distance ladder shows the latest keyboard selection with ${reducedMotion} motion`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.emulateMedia({ reducedMotion });
    await page.goto("/cosmology");
    await page.getByRole("tab", { name: "宇宙距离阶梯", exact: true }).click();

    const panel = page.getByRole("tabpanel");
    await expect(panel.getByRole("group", { name: "宇宙距离阶梯可视化" })).toBeVisible();
    const steps = panel.locator('svg g[role="button"]');
    const count = await steps.count();
    expect(count).toBeGreaterThan(1);
    for (let index = 0; index < count; index++) {
      await steps.nth(index).focus();
      await page.keyboard.press("Enter");
    }

    await expect(steps.last()).toHaveAttribute("aria-pressed", "true");
    await expect(panel.getByRole("heading", { level: 4 })).toContainText("红移");
    await expect(panel.getByText(/低红移下可近似/)).toBeVisible();

    await steps.first().focus();
    await page.keyboard.press("Enter");
    await expect(panel.getByRole("heading", { level: 4 })).toContainText("雷达测距");
    await page.keyboard.press("Enter");
    await expect(panel.getByRole("heading", { level: 4 })).toHaveCount(0);
    await expect(panel.getByText(/点击上方阶梯的各层级/)).toBeVisible();
    expect(errors).toEqual([]);
  });
}
