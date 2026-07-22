import { expect, test, type Page } from "@playwright/test";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { PHYSICS_RUNTIME_BUDGETS } from "../scripts/performance/physics-runtime-budget";

type PixelComparison = {
  nonBlackRatio: number;
  meanFrameDifference: number;
};

type RendererMetrics = {
  fps: number;
  pixelRatio: number;
  geometries: number;
  textures: number;
};

function projectKind(projectName: string): "desktop" | "mobile" {
  return projectName.includes("mobile") ? "mobile" : "desktop";
}

async function readWebglEntryChunkNames(): Promise<string[]> {
  const chunkDirectory = ".next/static/chunks";
  const files = (await readdir(chunkDirectory)).filter((file) => file.endsWith(".js"));
  const entryChunks: string[] = [];
  for (const file of files) {
    const source = await readFile(`${chunkDirectory}/${file}`, "utf8");
    if (source.includes("data-universe-webgl")) {
      entryChunks.push(file);
    }
  }
  if (entryChunks.length === 0) throw new Error("UniverseWebGL entry chunk is missing");
  return entryChunks;
}

function trackRequestedChunks(page: Page): string[] {
  const chunks: string[] = [];
  page.on("request", (request) => {
    const file = request.url().split("/").at(-1);
    if (file?.endsWith(".js")) chunks.push(file);
  });
  return chunks;
}

async function compareCanvasFrames(page: Page): Promise<PixelComparison> {
  const canvas = page.locator("[data-universe-webgl] canvas");
  const first = (await canvas.screenshot()).toString("base64");
  await page.waitForTimeout(600);
  const second = (await canvas.screenshot()).toString("base64");

  return page.evaluate(
    async ({ firstFrame, secondFrame }) => {
      const loadImage = async (base64: string) => {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) {
          bytes[index] = binary.charCodeAt(index);
        }
        return createImageBitmap(new Blob([bytes], { type: "image/png" }));
      };
      const [firstImage, secondImage] = await Promise.all([
        loadImage(firstFrame),
        loadImage(secondFrame),
      ]);
      const width = firstImage.width;
      const height = firstImage.height;
      const firstCanvas = new OffscreenCanvas(width, height);
      const secondCanvas = new OffscreenCanvas(width, height);
      const firstContext = firstCanvas.getContext("2d");
      const secondContext = secondCanvas.getContext("2d");
      if (!firstContext || !secondContext) {
        throw new Error("2D canvas context is unavailable");
      }

      firstContext.drawImage(firstImage, 0, 0);
      secondContext.drawImage(secondImage, 0, 0);
      const firstPixels = firstContext.getImageData(0, 0, width, height).data;
      const secondPixels = secondContext.getImageData(0, 0, width, height).data;
      let sampled = 0;
      let nonBlack = 0;
      let totalDifference = 0;
      const stride = 8 * 4;

      for (let offset = 0; offset < firstPixels.length; offset += stride) {
        const red = firstPixels[offset] ?? 0;
        const green = firstPixels[offset + 1] ?? 0;
        const blue = firstPixels[offset + 2] ?? 0;
        if (Math.max(red, green, blue) > 8) nonBlack += 1;
        totalDifference +=
          (Math.abs(red - (secondPixels[offset] ?? 0)) +
            Math.abs(green - (secondPixels[offset + 1] ?? 0)) +
            Math.abs(blue - (secondPixels[offset + 2] ?? 0))) /
          3;
        sampled += 1;
      }

      firstImage.close();
      secondImage.close();
      return {
        nonBlackRatio: nonBlack / sampled,
        meanFrameDifference: totalDifference / sampled,
      };
    },
    { firstFrame: first, secondFrame: second },
  );
}

async function readRendererMetrics(page: Page): Promise<RendererMetrics> {
  const shell = page.locator("[data-universe-webgl]");
  const readNumber = async (attribute: string) =>
    Number((await shell.getAttribute(attribute)) ?? Number.NaN);

  return {
    fps: await readNumber("data-renderer-fps"),
    pixelRatio: await readNumber("data-renderer-pixel-ratio"),
    geometries: await readNumber("data-renderer-geometries"),
    textures: await readNumber("data-renderer-textures"),
  };
}

test("handwritten universe bypasses the WebGL runtime", async ({ page }) => {
  const requestedChunks = trackRequestedChunks(page);
  const webglChunks = await readWebglEntryChunkNames();
  await page.goto("/universe-physics/universe/handwritten/earth", {
    waitUntil: "domcontentloaded",
  });

  await expect(page.locator("svg#main-content")).toBeVisible();
  await expect(page.locator("[data-universe-webgl] canvas")).toHaveCount(0);
  await expect(page.locator("[data-universe-webgl]")).toHaveCount(0);
  expect(requestedChunks.filter((chunk) => webglChunks.includes(chunk))).toEqual([]);
});

test("unsupported WebGL keeps the heavy runtime off the network", async ({ page }) => {
  await page.addInitScript(() => {
    type GenericGetContext = (
      contextId: string,
      ...args: unknown[]
    ) => RenderingContext | null;
    const canvasPrototype = HTMLCanvasElement.prototype as Omit<
      HTMLCanvasElement,
      "getContext"
    > & {
      getContext: GenericGetContext;
    };
    const originalGetContext = canvasPrototype.getContext;
    canvasPrototype.getContext = function (
      this: HTMLCanvasElement,
      contextId: string,
      ...args: unknown[]
    ) {
      if (contextId === "webgl" || contextId === "webgl2") return null;
      return originalGetContext.call(this, contextId, ...args);
    };
  });
  const requestedChunks = trackRequestedChunks(page);
  const webglChunks = await readWebglEntryChunkNames();

  await page.goto("/universe-physics/universe/earth", { waitUntil: "domcontentloaded" });

  await expect(page.locator("[data-section=universe]")).toHaveAttribute(
    "data-webgl-status",
    "unsupported",
  );
  await expect(page.getByRole("heading", { name: "3D 宇宙暂时无法显示" })).toBeVisible();
  await expect(page.locator("[data-universe-webgl]")).toHaveCount(0);
  expect(requestedChunks.filter((chunk) => webglChunks.includes(chunk))).toEqual([]);
});

test("direct Earth route meets the 3D runtime budget", async ({ page, browserName }, testInfo) => {
  test.skip(browserName !== "chromium", "Heap and renderer budgets require Chromium CDP");
  const kind = projectKind(testInfo.project.name);
  const budget = PHYSICS_RUNTIME_BUDGETS[kind];
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/universe-physics/universe/earth", { waitUntil: "domcontentloaded" });

  const shell = page.locator("[data-universe-webgl]");
  await expect(shell).toHaveAttribute("data-route-tier", "T7");
  await expect(shell).toHaveAttribute("data-scene-ready", "true");
  await expect(shell).toHaveAttribute("data-postfx-ready", "true");
  await expect(shell).toHaveAttribute("data-renderer-geometries", /\d+/);

  const marks = await page.evaluate(() =>
    performance
      .getEntriesByType("mark")
      .map((entry) => ({ name: entry.name, startTime: entry.startTime })),
  );
  const markNames = marks.map((entry) => entry.name);
  const sceneReadyAt =
    marks.find((entry) => entry.name === "universe:scene-ready")?.startTime ?? Number.POSITIVE_INFINITY;

  expect(markNames).toContain("universe:scene-load:T7");
  expect(markNames).not.toContain("universe:scene-load:T0");
  if (kind === "mobile") {
    expect(markNames.some((name) => name.startsWith("universe:scene-preload:"))).toBe(false);
  } else {
    expect(markNames).toContain("universe:scene-preload:T6");
  }

  const renderer = await readRendererMetrics(page);
  const pixels = await compareCanvasFrames(page);
  const resources = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .filter((entry) => entry.name.includes("/_next/static/") && entry.name.endsWith(".js"))
      .reduce((total, entry) => total + (entry as PerformanceResourceTiming).encodedBodySize, 0),
  );
  const session = await page.context().newCDPSession(page);
  await session.send("Performance.enable");
  const performanceMetrics = await session.send("Performance.getMetrics");
  const browserHeapBytes = await page.evaluate(
    () =>
      (
        performance as Performance & {
          memory?: { usedJSHeapSize?: number };
        }
      ).memory?.usedJSHeapSize,
  );
  const jsHeapBytes =
    performanceMetrics.metrics.find((metric) => metric.name === "JSHeapUsedSize")?.value ??
    browserHeapBytes ??
    Number.POSITIVE_INFINITY;

  const report = {
    project: testInfo.project.name,
    loadedJsBytes: resources,
    jsHeapBytes,
    sceneReadyMs: sceneReadyAt,
    renderer,
    pixels,
    marks: markNames,
  };
  const reportPath = testInfo.outputPath("physics-runtime.json");
  await writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");
  await testInfo.attach("physics-runtime.json", {
    path: reportPath,
    contentType: "application/json",
  });

  expect.soft(pageErrors).toEqual([]);
  expect.soft(resources).toBeLessThanOrEqual(budget.maxLoadedJsBytes);
  expect.soft(jsHeapBytes).toBeLessThanOrEqual(budget.maxJsHeapBytes);
  expect.soft(sceneReadyAt).toBeLessThanOrEqual(budget.maxFirstSceneMs);
  expect.soft(renderer.pixelRatio).toBeLessThanOrEqual(budget.maxPixelRatio);
  expect.soft(renderer.geometries).toBeLessThanOrEqual(budget.maxGeometries);
  expect.soft(renderer.textures).toBeLessThanOrEqual(budget.maxTextures);
  expect.soft(renderer.fps).toBeGreaterThanOrEqual(budget.minMeasuredFps);
  expect.soft(pixels.nonBlackRatio).toBeGreaterThanOrEqual(budget.minNonBlackRatio);
  expect.soft(pixels.meanFrameDifference).toBeGreaterThanOrEqual(budget.minFrameDifference);
});
