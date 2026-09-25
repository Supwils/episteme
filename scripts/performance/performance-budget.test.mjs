import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  analyzeJsAssetOwnership,
  analyzeRouteAssets,
  findTailwindEntrypoints,
  analyzeCssDelivery,
  isGenericArticleRoute,
} from "./bundle-budget.mjs";
import {
  LIGHTHOUSE_CONFIRMATION_TRACES,
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
    expect(LIGHTHOUSE_CONFIRMATION_TRACES).toBe(2);
  });

  it("splits CSS into the site-wide sheet and each page's own additions", () => {
    const root = createBuildFixture();
    const routes = analyzeRouteAssets(root);
    const delivery = analyzeCssDelivery(root, [
      ...routes,
      { route: "/other/page", css: ["static/chunks/shared.css"], js: [] },
    ]);

    expect(delivery.shared.map((sheet) => sheet.asset)).toEqual(["static/chunks/shared.css"]);
    expect(delivery.sharedBrotli).toBeGreaterThan(0);
    const example = delivery.routes.find((route) => route.route === "/example/page");
    expect(example.incrementalBrotli).toBeGreaterThan(0);
    expect(example.totalBrotli).toBe(delivery.sharedBrotli + example.incrementalBrotli);
    const other = delivery.routes.find((route) => route.route === "/other/page");
    expect(other.incrementalBrotli).toBe(0);
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

  it("keeps retired math styles out of the mathematics layout, with KaTeX served as layout CSS", () => {
    // 2026-08-02 (T-UX-07): the math domain dropped its client-side
    // MathMarkdownRenderer (no wiki-link support — 149/169 articles rendered
    // [[links]] as literal text) for the shared server-side MarkdownRenderer.
    // KaTeX now renders at SSR time, so the stylesheet moves to the layout
    // (~2.6 KB gzip, inside the 48 KB route-CSS budget) and the ~260 KB
    // client KaTeX chunk disappears entirely — strictly better for readers.
    const mathLayout = readFileSync(join(process.cwd(), "app/mathematics/layout.tsx"), "utf8");
    const mathStyles = readFileSync(join(process.cwd(), "app/mathematics/globals.css"), "utf8");

    expect(mathLayout).toContain("katex/dist/katex.min.css");
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
    const historyHome = readFileSync(join(process.cwd(), "app/human-history/page.tsx"), "utf8");
    const timelineModule = readFileSync(
      join(process.cwd(), "app/human-history/HistoryTimelineModule.tsx"),
      "utf8"
    );

    expect(historyHome).toContain("data/home-summary.js");
    expect(historyHome).not.toMatch(/data\/(?:index|events|figures)\.js/);
    expect(timelineModule).toContain('from "next/dynamic"');
    expect(timelineModule).toContain("open ? <EventTimeline /> : null");
  });

  it("keeps repeated homepage cards on semantic classes and seals out of the page payload", () => {
    const homepageComponents = [
      "components/DomainCard.tsx",
      "components/portal/TodaySection.tsx",
      "components/portal/Astrolabe.tsx",
    ].map((file) => readFileSync(join(process.cwd(), file), "utf8"));

    expect(homepageComponents[0]).toContain('className="domain-card"');
    for (const source of homepageComponents) {
      expect(source).not.toMatch(/className="[^"]{80,}"/);
      // 22 seals and plates inline would be ~110 KB of path data in HTML and RSC.
      expect(source).not.toMatch(/from "@\/components\/design\/(?:Seal|SpecimenPlate)"/);
    }
  });
});
