import { expect, test } from "@playwright/test";

test("double-slit events accumulate in both modes and reset with the population", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/universe-physics/experiments");
  await page.getByRole("button", { name: /双缝实验/ }).click();
  const count = page.getByText(/已检测 \d+ 个粒子/);
  await expect(count).toHaveText("已检测 0 个粒子");
  await page.getByRole("button", { name: "发射粒子", exact: true }).click();
  await expect(count).toHaveText("已检测 1 个粒子");
  await page.getByRole("button", { name: "标记路径", exact: true }).click();
  await expect(count).toHaveText("已检测 0 个粒子");
  await page.getByRole("button", { name: "发射粒子", exact: true }).click();
  await expect(count).toHaveText("已检测 1 个粒子");
  await page.getByRole("button", { name: "重置", exact: true }).click();
  await expect(count).toHaveText("已检测 0 个粒子");
});

test("double-slit continuous emission stops when paused", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/universe-physics/experiments");
  await page.getByRole("button", { name: /双缝实验/ }).click();
  const count = page.getByText(/已检测 \d+ 个粒子/);
  await page.clock.install();
  await page.getByRole("button", { name: "发射粒子", exact: true }).click();
  await page.clock.runFor(800);
  const received = Number((await count.innerText()).match(/\d+/)![0]);
  expect(received).toBeGreaterThanOrEqual(5);
  await page.getByRole("button", { name: "暂停", exact: true }).click();
  const pausedCount = await count.innerText();
  await page.clock.runFor(800);
  await expect(count).toHaveText(pausedCount);
});

test("ramp clock advances, pauses, and preserves recorded angles", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/universe-physics/experiments");
  await page.getByRole("button", { name: /伽利略斜面实验/ }).click();
  await page.getByRole("button", { name: "释放小球", exact: true }).waitFor();
  await page.clock.install();
  await page.getByRole("button", { name: "释放小球", exact: true }).click();
  await page.clock.runFor(600);
  await page.getByRole("button", { name: "暂停", exact: true }).click();
  const readout = page.getByText(/^时间 [0-9]/);
  const paused = await readout.innerText();
  expect(Number(paused.match(/时间 ([\d.]+)/)![1])).toBeGreaterThan(0.4);
  await page.clock.runFor(500);
  await expect(readout).toHaveText(paused);
  await page.getByRole("button", { name: "记录数据", exact: true }).click();
  await page.getByRole("slider", { name: "斜面角度" }).fill("15");
  await expect(page.locator("tbody").getByText("10°", { exact: true })).toBeVisible();
  await expect(readout).toHaveText("时间 0.000 s · 距离 0.000 m");
  await page.getByRole("button", { name: "释放小球", exact: true }).click();
  await page.clock.runFor(4000);
  await expect(readout).toContainText("距离 4.000 m · 已到达底端");
});

test("Miller sequence completes after pause and resets to the first stage", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/universe-physics/experiments");
  await page.getByRole("button", { name: /米勒-尤里实验/ }).click();
  await page.getByRole("button", { name: "播放", exact: true }).waitFor();
  await page.clock.install();
  await page.getByRole("button", { name: "播放", exact: true }).click();
  await page.clock.runFor(2500);
  await expect(page.getByText("2. 放电供能", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "暂停", exact: true }).click();
  await page.clock.runFor(5000);
  await expect(page.getByText("2. 放电供能", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "继续", exact: true }).click();
  await page.clock.runFor(12000);
  await expect(page.getByRole("button", { name: "重新播放", exact: true })).toBeVisible();
  await expect(page.getByText("5. 分析产物", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "重置", exact: true }).click();
  await expect(page.getByText("1. 准备气体", { exact: true })).toBeVisible();
});

test("reduced motion supports manual ramp and chemistry steps", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/universe-physics/experiments");
  await page.getByRole("button", { name: /伽利略斜面实验/ }).click();
  await page.getByRole("button", { name: "推进0.25秒", exact: true }).click();
  await expect(page.getByText(/^时间 [0-9]/)).toContainText("时间 0.250 s");
  await page.getByRole("button", { name: "返回实验列表", exact: true }).click();
  await page.getByRole("button", { name: /米勒-尤里实验/ }).click();
  for (let i = 0; i < 5; i++) {
    await page.getByRole("button", { name: "下一阶段", exact: true }).click();
  }
  await expect(page.getByRole("button", { name: "重新播放", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "重新播放", exact: true }).click();
  await expect(page.getByText("1. 准备气体", { exact: true })).toBeVisible();
});

test("live reduced-motion changes stop running demonstrations", async ({ page }) => {
  for (const [card, start] of [
    ["双缝实验", "发射粒子"],
    ["伽利略斜面实验", "释放小球"],
    ["米勒-尤里实验", "播放"],
    ["黑洞吸积盘", "开始演示"],
  ]) {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/universe-physics/experiments");
    await page.getByRole("button", { name: new RegExp(card!) }).click();
    await page.getByRole("button", { name: start, exact: true }).click();
    await expect(page.getByRole("button", { name: "暂停", exact: true })).toBeVisible();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.getByRole("button", { name: "暂停", exact: true })).toBeHidden();
    const canvas = page.locator("canvas");
    const readout = page.locator("p").filter({ hasText: /^(时间 |已检测 )/ });
    const stopped = await readout.allTextContents();
    const image = (await canvas.count())
      ? await canvas.evaluate((node: HTMLCanvasElement) => node.toDataURL())
      : null;
    await page.waitForTimeout(200);
    await expect(readout).toHaveText(stopped);
    if (image)
      expect(await canvas.evaluate((node: HTMLCanvasElement) => node.toDataURL())).toBe(image);
  }
});
