import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CONFLUENCE_IDS = [
  "ai-governance",
  "urban-climate-adaptation",
  "population-ageing",
  "macro-fiscal-governance",
  "public-health-priority",
];

const ISR_ROUTES = new Map([
  ["/", 3600],
  ["/daily", 3600],
  ["/api/daily", 3600],
  ["/api/knowledge-continuum/spine", 86400],
  ["/api/knowledge-continuum/planner", 86400],
  ["/api/knowledge-continuum/confluences", 86400],
  ["/api/knowledge-continuum/coverage", 86400],
  ...CONFLUENCE_IDS.flatMap((id) => [
    [`/knowledge-confluence/${id}`, 86400],
    [`/api/knowledge-confluences/${id}`, 86400],
  ]),
]);

const STATIC_ROUTES = ["/knowledge-graph", "/read/western-philosophy"];

const ON_DEMAND_SSG_PATTERNS = [
  "/chemistry/concepts/[slug]",
  "/computer-science/concepts/[slug]",
  "/earth-science/concepts/[slug]",
  "/linguistics/sounds-and-signs/[slug]",
  "/medicine/concepts/[slug]",
  "/political-science/concepts/[slug]",
  "/sociology/concepts/[slug]",
  "/psychology/methods/[slug]",
];

const DYNAMIC_ROUTE_HANDLERS = [
  "/api/daily/shuffle/route",
  "/api/knowledge-frontier/route",
  "/api/knowledge-frontier/journeys/route",
  "/api/knowledge-frontier/plan/route",
  "/api/knowledge-frontier/relation-review/route",
  "/api/learning-targets/route",
  "/api/og/route",
];

export function auditRenderingStrategy(nextDir) {
  const prerender = readJson(resolve(nextDir, "prerender-manifest.json"));
  const appPaths = readJson(resolve(nextDir, "server/app-paths-manifest.json"));
  const errors = [];

  for (const [route, expectedSeconds] of ISR_ROUTES) {
    const entry = prerender.routes[route];
    if (!entry) {
      errors.push(`${route}: missing from prerender manifest`);
      continue;
    }
    if (entry.initialRevalidateSeconds !== expectedSeconds) {
      errors.push(
        `${route}: expected ${expectedSeconds}s ISR, received ${String(entry.initialRevalidateSeconds)}`
      );
    }
  }

  for (const route of STATIC_ROUTES) {
    const entry = prerender.routes[route];
    if (!entry || entry.initialRevalidateSeconds !== false) {
      errors.push(`${route}: expected build-time static generation without timed revalidation`);
    }
  }

  for (const route of ON_DEMAND_SSG_PATTERNS) {
    const entry = prerender.dynamicRoutes[route];
    if (!entry || entry.fallback !== null) {
      errors.push(`${route}: expected on-demand SSG with a blocking first render`);
    }
  }

  const confluencePagePattern = prerender.dynamicRoutes["/knowledge-confluence/[id]"];
  const confluenceApiPattern = prerender.dynamicRoutes["/api/knowledge-confluences/[id]"];
  if (!confluencePagePattern || confluencePagePattern.fallback !== false) {
    errors.push("/knowledge-confluence/[id]: expected a closed, fully prebuilt parameter set");
  }
  if (!confluenceApiPattern || confluenceApiPattern.fallback !== false) {
    errors.push("/api/knowledge-confluences/[id]: expected a closed, fully prebuilt parameter set");
  }

  for (const route of DYNAMIC_ROUTE_HANDLERS) {
    if (!appPaths[route]) {
      errors.push(`${route}: missing runtime handler from app paths manifest`);
    }
    const publicRoute = route.replace(/\/route$/, "");
    if (prerender.routes[publicRoute] || prerender.dynamicRoutes[publicRoute]) {
      errors.push(`${publicRoute}: expected runtime rendering, found in prerender manifest`);
    }
  }

  return {
    errors,
    summary: {
      isrRoutes: ISR_ROUTES.size,
      staticRoutes: STATIC_ROUTES.length,
      onDemandSsgPatterns: ON_DEMAND_SSG_PATTERNS.length,
      dynamicHandlers: DYNAMIC_ROUTE_HANDLERS.length,
    },
  };
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`Cannot read Next.js build manifest at ${path}`, { cause: error });
  }
}

function main() {
  const nextDir = resolve(process.argv[2] ?? ".next");
  const result = auditRenderingStrategy(nextDir);
  console.log("Rendering Strategy Audit\n");
  console.log(`ISR routes: ${result.summary.isrRoutes}`);
  console.log(`Build-time static routes: ${result.summary.staticRoutes}`);
  console.log(`On-demand SSG patterns: ${result.summary.onDemandSsgPatterns}`);
  console.log(`Runtime handlers: ${result.summary.dynamicHandlers}`);

  if (result.errors.length > 0) {
    console.error(`\nAudit failed with ${result.errors.length} issue(s):`);
    for (const error of result.errors) console.error(`  - ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log("\nAudit passed: SSG, ISR and runtime route contracts match the production build.");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main();
