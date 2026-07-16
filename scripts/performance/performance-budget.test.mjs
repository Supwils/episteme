import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { analyzeRouteAssets, getRouteCssBudget, isGenericArticleRoute } from "./bundle-budget.mjs";
import {
  evaluateLighthouseBudget,
  hasValidLighthouseMetrics,
  shouldConfirmLighthouseBudget,
} from "./lighthouse-budget.mjs";

const temporaryDirectories = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

function createBuildFixture() {
  const root = mkdtempSync(join(tmpdir(), "episteme-bundle-budget-"));
  temporaryDirectories.push(root);
  const chunks = join(root, "static", "chunks");
  const manifestDirectory = join(root, "server", "app", "example", "page");
  mkdirSync(chunks, { recursive: true });
  mkdirSync(manifestDirectory, { recursive: true });
  writeFileSync(join(chunks, "shared.css"), "a".repeat(2000));
  writeFileSync(join(chunks, "route.css"), "b".repeat(3000));
  writeFileSync(join(chunks, "route.js"), "const route = true;".repeat(200));
  writeFileSync(
    join(manifestDirectory, "app-build-manifest.json"),
    JSON.stringify({
      pages: {
        "/example/page": [
          "static/chunks/shared.css",
          "static/chunks/shared.css",
          "static/chunks/route.css",
          "static/chunks/route.js",
        ],
      },
    })
  );
  return root;
}

describe("performance budgets", () => {
  it("sums and deduplicates the assets referenced by each route manifest", () => {
    const [route] = analyzeRouteAssets(createBuildFixture());

    expect(route.route).toBe("/example/page");
    expect(route.css).toEqual(["static/chunks/shared.css", "static/chunks/route.css"]);
    expect(route.js).toEqual(["static/chunks/route.js"]);
    expect(route.cssGzip).toBeGreaterThan(0);
    expect(route.jsGzip).toBeGreaterThan(0);
  });

  it("reports every failed Lighthouse metric instead of relying on a zero score floor", () => {
    const violations = evaluateLighthouseBudget(
      { performance: 79, lcpMs: 4100, tbtMs: 350, cls: 0.12 },
      { minPerformance: 85, maxLcpMs: 3800, maxTbtMs: 250, maxCls: 0.1 }
    );

    expect(violations).toHaveLength(4);
    expect(violations[0]).toContain("performance 79 < 85");
  });

  it("distinguishes an invalid trace from a finite budget regression", () => {
    expect(
      hasValidLighthouseMetrics({ performance: 0, lcpMs: Infinity, tbtMs: Infinity, cls: Infinity })
    ).toBe(false);
    expect(hasValidLighthouseMetrics({ performance: 79, lcpMs: 4100, tbtMs: 350, cls: 0.12 })).toBe(
      true
    );
  });

  it("confirms only invalid or over-budget Lighthouse samples", () => {
    const budget = { minPerformance: 85, maxLcpMs: 3800, maxTbtMs: 250, maxCls: 0.1 };

    expect(
      shouldConfirmLighthouseBudget({ performance: 98, lcpMs: 2400, tbtMs: 12, cls: 0 }, budget)
    ).toBe(false);
    expect(
      shouldConfirmLighthouseBudget({ performance: 64, lcpMs: 3325, tbtMs: 1954, cls: 0 }, budget)
    ).toBe(true);
  });

  it("keeps the portal CSS budget tighter than the explicit legacy domain baseline", () => {
    const budgets = { portal: 40 * 1024, domain: 68 * 1024 };

    expect(getRouteCssBudget("/page", budgets)).toBe(40 * 1024);
    expect(getRouteCssBudget("/mathematics/page", budgets)).toBe(68 * 1024);
  });

  it("identifies shared domain articles without classifying bespoke or index routes", () => {
    expect(isGenericArticleRoute("/medicine/concepts/[slug]/page")).toBe(true);
    expect(isGenericArticleRoute("/sociology/frontier/[slug]/page")).toBe(false);
    expect(isGenericArticleRoute("/psychology/methods/[slug]/page")).toBe(true);
    expect(isGenericArticleRoute("/medicine/concepts/page")).toBe(false);
    expect(isGenericArticleRoute("/economics/concepts/[slug]/page")).toBe(false);
  });
});
