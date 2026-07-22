import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  analyzeJsAssetOwnership,
  analyzeRouteAssets,
  findTailwindEntrypoints,
  getRouteCssBudget,
  isGenericArticleRoute,
} from "./bundle-budget.mjs";
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
  writeFileSync(join(chunks, "deferred.js"), "const deferred = true;".repeat(300));
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
    const root = createBuildFixture();
    const [route] = analyzeRouteAssets(root);

    expect(route.route).toBe("/example/page");
    expect(route.css).toEqual(["static/chunks/shared.css", "static/chunks/route.css"]);
    expect(route.js).toEqual(["static/chunks/route.js"]);
    expect(route.cssGzip).toBeGreaterThan(0);
    expect(route.jsGzip).toBeGreaterThan(0);

    const ownership = analyzeJsAssetOwnership(root, [route]);
    expect(ownership.routeReferenced.assets).toEqual(["static/chunks/route.js"]);
    expect(ownership.deferredOnly.assets).toEqual(["static/chunks/deferred.js"]);
    expect(ownership.routeReferenced.gzip).toBeGreaterThan(0);
    expect(ownership.deferredOnly.gzip).toBeGreaterThan(0);
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

  it("applies the 40 KB CSS budget to portal and domain routes", () => {
    const budgets = { portal: 40 * 1024, domain: 40 * 1024 };

    expect(getRouteCssBudget("/page", budgets)).toBe(40 * 1024);
    expect(getRouteCssBudget("/mathematics/page", budgets)).toBe(40 * 1024);
  });

  it("finds duplicate Tailwind compilation entrypoints", () => {
    const root = mkdtempSync(join(tmpdir(), "episteme-css-entrypoints-"));
    temporaryDirectories.push(root);
    mkdirSync(join(root, "mathematics"), { recursive: true });
    writeFileSync(join(root, "globals.css"), '@import "tailwindcss";\n');
    writeFileSync(join(root, "mathematics", "globals.css"), '@import "tailwindcss";\n');
    writeFileSync(join(root, "domain-shared.css"), "@theme { --color-accent: red; }\n");

    expect(findTailwindEntrypoints(root)).toEqual([
      "globals.css",
      join("mathematics", "globals.css"),
    ]);
  });

  it("identifies shared domain articles without classifying bespoke or index routes", () => {
    expect(isGenericArticleRoute("/medicine/concepts/[slug]/page")).toBe(true);
    expect(isGenericArticleRoute("/sociology/frontier/[slug]/page")).toBe(false);
    expect(isGenericArticleRoute("/psychology/methods/[slug]/page")).toBe(true);
    expect(isGenericArticleRoute("/medicine/concepts/page")).toBe(false);
    expect(isGenericArticleRoute("/economics/concepts/[slug]/page")).toBe(false);
  });

  it("keeps KaTeX and retired math styles out of the mathematics layout", () => {
    const mathLayout = readFileSync(join(process.cwd(), "app/mathematics/layout.tsx"), "utf8");
    const mathRenderer = readFileSync(
      join(process.cwd(), "subjects/mathematics/components/MathMarkdownRenderer.tsx"),
      "utf8"
    );
    const mathStyles = readFileSync(join(process.cwd(), "app/mathematics/globals.css"), "utf8");

    expect(mathLayout).not.toContain("katex/dist/katex.min.css");
    expect(mathRenderer).toContain("katex/dist/katex.min.css");
    for (const retiredSelector of [
      ".glass-strong",
      ".surface-raised",
      ".badge-violet",
      ".touch-target",
      ".animate-slide-up",
      ".content-width",
    ]) {
      expect(mathStyles).not.toContain(retiredSelector);
    }
  });

  it("keeps full history datasets and the optional timeline out of the history home startup path", () => {
    const historyClient = readFileSync(
      join(process.cwd(), "app/human-history/HumanHistoryClient.tsx"),
      "utf8"
    );
    const historyHome = readFileSync(
      join(process.cwd(), "subjects/history/page-renderers/home.js"),
      "utf8"
    );
    const historyHomeStyles = readFileSync(
      join(process.cwd(), "app/human-history/styles/pages/home.css"),
      "utf8"
    );

    expect(historyClient).toContain("const EventTimeline = lazy(");
    expect(historyClient).toContain("timelineVisible &&");
    expect(historyClient).not.toContain('from "next/dynamic"');
    expect(historyHome).toContain("data/home-summary.js");
    expect(historyHome).not.toMatch(/data\/(?:index|events|figures)\.js/);
    expect(historyHomeStyles).toContain(".human-history-root .figures-grid");
    for (const retiredSelector of [".home-hero", ".hero-content", ".stats-row", ".stat-val"]) {
      expect(historyHomeStyles).not.toContain(retiredSelector);
    }
  });
});
