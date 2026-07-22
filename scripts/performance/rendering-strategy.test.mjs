import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { auditRenderingStrategy } from "./rendering-strategy-audit.mjs";

function fixture({ omitCoverage = false } = {}) {
  const root = mkdtempSync(join(tmpdir(), "episteme-rendering-"));
  mkdirSync(join(root, "server"), { recursive: true });
  const routes = {};
  for (const [route, seconds] of [
    ["/", 3600],
    ["/daily", 3600],
    ["/api/daily", 3600],
    ["/api/knowledge-continuum/spine", 86400],
    ["/api/knowledge-continuum/planner", 86400],
    ["/api/knowledge-continuum/confluences", 86400],
    ...(!omitCoverage ? [["/api/knowledge-continuum/coverage", 86400]] : []),
    ...[
      "ai-governance",
      "urban-climate-adaptation",
      "population-ageing",
      "macro-fiscal-governance",
      "public-health-priority",
    ].flatMap((id) => [
      [`/knowledge-confluence/${id}`, 86400],
      [`/api/knowledge-confluences/${id}`, 86400],
    ]),
  ]) {
    routes[route] = { initialRevalidateSeconds: seconds };
  }
  routes["/knowledge-graph"] = { initialRevalidateSeconds: false };
  routes["/read/western-philosophy"] = { initialRevalidateSeconds: false };

  const dynamicRoutes = Object.fromEntries(
    [
      "/chemistry/concepts/[slug]",
      "/computer-science/concepts/[slug]",
      "/earth-science/concepts/[slug]",
      "/linguistics/sounds-and-signs/[slug]",
      "/medicine/concepts/[slug]",
      "/political-science/concepts/[slug]",
      "/sociology/concepts/[slug]",
      "/psychology/methods/[slug]",
    ].map((route) => [route, { fallback: null }])
  );
  dynamicRoutes["/knowledge-confluence/[id]"] = { fallback: false };
  dynamicRoutes["/api/knowledge-confluences/[id]"] = { fallback: false };

  const appPaths = Object.fromEntries(
    [
      "/api/daily/shuffle/route",
      "/api/knowledge-frontier/route",
      "/api/knowledge-frontier/journeys/route",
      "/api/knowledge-frontier/plan/route",
      "/api/knowledge-frontier/relation-review/route",
      "/api/learning-targets/route",
      "/api/og/route",
    ].map((route) => [route, `${route}.js`])
  );

  writeFileSync(join(root, "prerender-manifest.json"), JSON.stringify({ routes, dynamicRoutes }));
  writeFileSync(join(root, "server/app-paths-manifest.json"), JSON.stringify(appPaths));
  return root;
}

describe("rendering strategy audit", () => {
  it("accepts the intended production route contracts", () => {
    expect(auditRenderingStrategy(fixture()).errors).toEqual([]);
  });

  it("fails when an ISR API disappears from the build", () => {
    expect(auditRenderingStrategy(fixture({ omitCoverage: true })).errors).toContain(
      "/api/knowledge-continuum/coverage: missing from prerender manifest"
    );
  });

  it("accepts Next Turbopack split manifests and build artifacts", () => {
    const { nextDir, appDir } = splitTurbopackFixture();
    expect(auditRenderingStrategy(nextDir, appDir).errors).toEqual([]);
  });
});

function splitTurbopackFixture() {
  const root = mkdtempSync(join(tmpdir(), "episteme-rendering-turbopack-"));
  const nextDir = join(root, ".next");
  const appDir = join(root, "app");
  mkdirSync(join(nextDir, "server", "app"), { recursive: true });
  writeFileSync(
    join(nextDir, "prerender-manifest.json"),
    JSON.stringify({ routes: {}, dynamicRoutes: {} })
  );

  const routeManifest = {};
  for (const route of [
    "/api/daily/shuffle/route",
    "/api/knowledge-frontier/route",
    "/api/knowledge-frontier/journeys/route",
    "/api/knowledge-frontier/plan/route",
    "/api/knowledge-frontier/relation-review/route",
    "/api/learning-targets/route",
    "/api/og/route",
  ]) {
    routeManifest[route] = route.replace(/\/route$/, "");
  }
  writeFileSync(join(nextDir, "app-path-routes-manifest.json"), JSON.stringify(routeManifest));

  const writeSource = (route, kind, source) => {
    const routePath = route === "/" ? "" : route.slice(1);
    const directory = join(appDir, routePath);
    mkdirSync(directory, { recursive: true });
    writeFileSync(join(directory, `${kind}.tsx`), source);
  };
  const writeArtifact = (route, kind) => {
    const routePath = route === "/" ? "index" : route.slice(1);
    const extension = kind === "route" ? ".body" : ".html";
    const file = join(nextDir, "server", "app", `${routePath}${extension}`);
    mkdirSync(join(file, ".."), { recursive: true });
    writeFileSync(file, "prerendered");
  };

  for (const [route, seconds] of [
    ["/", 3600],
    ["/daily", 3600],
    ["/api/daily", 3600],
    ["/api/knowledge-continuum/spine", 86400],
    ["/api/knowledge-continuum/planner", 86400],
    ["/api/knowledge-continuum/confluences", 86400],
    ["/api/knowledge-continuum/coverage", 86400],
  ]) {
    const kind = route.startsWith("/api/") ? "route" : "page";
    writeSource(route, kind, `export const revalidate = ${seconds};`);
    writeArtifact(route, kind);
  }

  for (const route of ["/knowledge-graph", "/read/western-philosophy"]) {
    writeArtifact(route, "page");
  }

  for (const route of [
    "/chemistry/concepts/[slug]",
    "/computer-science/concepts/[slug]",
    "/earth-science/concepts/[slug]",
    "/linguistics/sounds-and-signs/[slug]",
    "/medicine/concepts/[slug]",
    "/political-science/concepts/[slug]",
    "/sociology/concepts/[slug]",
    "/psychology/methods/[slug]",
  ]) {
    writeSource(route, "page", "export function generateStaticParams() { return []; }");
    const serverModule = join(nextDir, "server", "app", route.slice(1), "page.js");
    mkdirSync(join(serverModule, ".."), { recursive: true });
    writeFileSync(serverModule, "module");
  }

  for (const [route, kind] of [
    ["/knowledge-confluence/[id]", "page"],
    ["/api/knowledge-confluences/[id]", "route"],
  ]) {
    writeSource(
      route,
      kind,
      "export const dynamicParams = false; export const revalidate = 86400; export function generateStaticParams() { return ids.map((id) => ({ id })); }"
    );
  }

  for (const id of [
    "ai-governance",
    "urban-climate-adaptation",
    "population-ageing",
    "macro-fiscal-governance",
    "public-health-priority",
  ]) {
    writeArtifact(`/knowledge-confluence/${id}`, "page");
    writeArtifact(`/api/knowledge-confluences/${id}`, "route");
  }

  return { nextDir, appDir };
}
