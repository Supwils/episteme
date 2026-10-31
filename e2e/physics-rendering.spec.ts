import { expect, test, type Locator } from "@playwright/test";

async function canvasPixelCoverage(canvas: Locator) {
  const png = (await canvas.screenshot()).toString("base64");
  return canvas.page().evaluate(async (base64) => {
    const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
    const image = await createImageBitmap(new Blob([bytes], { type: "image/png" }));
    const surface = new OffscreenCanvas(image.width, image.height);
    const context = surface.getContext("2d")!;
    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, image.width, image.height).data;
    let samples = 0;
    let lit = 0;
    let white = 0;
    for (let i = 0; i < pixels.length; i += 32) {
      const channels = [pixels[i]!, pixels[i + 1]!, pixels[i + 2]!];
      if (Math.max(...channels) > 12) lit++;
      if (Math.min(...channels) > 245) white++;
      samples++;
    }
    image.close();
    return { litRatio: lit / samples, whiteRatio: white / samples };
  }, png);
}

for (const [slug, tier] of [
  ["observable", "T0"],
  ["cosmic-web", "T1"],
]) {
  test(`${slug} renders structure without a white canvas or WebGL errors`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const graphicsErrors: string[] = [];
    page.on("console", (message) => {
      if (/GL_INVALID|WebGLProgram: Shader Error|too many errors/.test(message.text())) {
        graphicsErrors.push(message.text());
      }
    });
    await page.goto(`/universe-physics/universe/${slug}`);
    const shell = page.locator("[data-universe-webgl]");
    await expect(shell).toHaveAttribute("data-route-tier", tier!);
    await expect(shell).toHaveAttribute("data-postfx-ready", "true");
    await expect(shell).toHaveAttribute("data-renderer-geometries", /\d+/);
    const pixels = await canvasPixelCoverage(shell.locator("canvas"));
    expect(pixels.litRatio).toBeGreaterThan(0.005);
    expect(pixels.whiteRatio).toBeLessThan(0.25);
    expect(graphicsErrors).toEqual([]);
    await page.getByRole("button", { name: "open atlas", exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
}

test("handwritten markers open their own details and return keyboard focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/universe-physics/universe/handwritten/solar-system");
  const sun = page.getByRole("button", { name: "太阳 (Sol)", exact: true });
  await sun.press("Enter");
  const detail = page.getByRole("dialog", { name: "太阳详情", exact: true });
  await expect(detail.getByRole("heading", { name: "太阳", exact: true })).toBeVisible();
  await page.waitForTimeout(400);
  await page.keyboard.press("Escape");
  await expect(detail).toBeHidden();
  await expect(sun).toBeFocused();
  await page.getByRole("button", { name: "地球 (Earth)", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "地球详情", exact: true })).toBeVisible();
});

test("changing tiers closes marker details and leaves the next atlas usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/universe-physics/universe/handwritten/solar-system");
  await page.getByRole("button", { name: "太阳 (Sol)", exact: true }).press("Enter");
  await expect(page.getByRole("dialog", { name: "太阳详情", exact: true })).toBeVisible();
  await page.keyboard.press("6");
  await expect(page).not.toHaveURL(/solar-system$/);
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByRole("status")).toContainText("T5");
  await expect(page.getByRole("button", { name: "open atlas", exact: true })).toBeFocused();
  await page.keyboard.press("o");
  await expect(
    page.getByRole("dialog", { name: "Stellar Neighborhood knowledge atlas", exact: true })
  ).toBeVisible();
});

test("3D scene markers open the same verified details", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/universe-physics/universe/solar-system");
  const shell = page.locator("[data-universe-webgl]");
  await expect(shell).toHaveAttribute("data-postfx-ready", "true");
  const canvas = shell.locator("canvas");
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error("3D canvas has no bounds");
  await canvas.click({ position: { x: bounds.width / 2, y: bounds.height / 2 } });
  await expect(page.getByRole("dialog", { name: "太阳详情", exact: true })).toBeVisible();
});

test("atlas scenes and tier controls fit below the subject navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of [
    "/universe-physics/universe/solar-system",
    "/universe-physics/universe/handwritten/solar-system",
    "/universe-physics/physics/classical-mechanics",
  ]) {
    await page.goto(route);
    const shell = page.locator('[data-section="universe"], [data-section="physics"]').first();
    await expect(shell).toBeVisible();
    const bounds = await shell.boundingBox();
    const height = page.viewportSize()!.height;
    expect(bounds!.y).toBeGreaterThan(0);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(height + 1);
    expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThanOrEqual(
      height + 1
    );
    if (page.viewportSize()!.width < 768) {
      const picker = await page
        .getByRole("navigation", { name: "Tier picker", exact: true })
        .boundingBox();
      expect(picker).not.toBeNull();
      expect(picker!.y + picker!.height).toBeLessThanOrEqual(height);
    }
  }
});
