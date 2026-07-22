import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

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

export function auditRenderingStrategy(nextDir, appDir = resolve(nextDir, "..", "app")) {
  const prerender = readJson(resolve(nextDir, "prerender-manifest.json"));
  const usesSplitTurbopackOutput =
    Object.keys(prerender.routes ?? {}).length === 0 &&
    Object.keys(prerender.dynamicRoutes ?? {}).length === 0;
  const errors = usesSplitTurbopackOutput
    ? auditSplitTurbopackOutput(nextDir, appDir)
    : auditAggregatedManifests(nextDir, prerender);

  return {
    errors,
    summary: {
      isrRoutes: ISR_ROUTES.size,
      staticRoutes: STATIC_ROUTES.length,
      onDemandSsgPatterns: ON_DEMAND_SSG_PATTERNS.length,
      dynamicHandlers: DYNAMIC_ROUTE_HANDLERS.length,
      manifestMode: usesSplitTurbopackOutput ? "split-turbopack" : "aggregated",
    },
  };
}

function auditAggregatedManifests(nextDir, prerender) {
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

  return errors;
}

function auditSplitTurbopackOutput(nextDir, appDir) {
  const serverAppDir = resolve(nextDir, "server", "app");
  const routeManifest = readJson(resolve(nextDir, "app-path-routes-manifest.json"));
  const errors = [];

  for (const [route, expectedSeconds] of ISR_ROUTES) {
    const sourceRoute = route.replace(
      /\/(?:ai-governance|urban-climate-adaptation|population-ageing|macro-fiscal-governance|public-health-priority)$/,
      "/[id]"
    );
    const kind = route.startsWith("/api/") ? "route" : "page";
    const contract = readRouteContract(appDir, sourceRoute, kind, errors);
    if (contract && contract.revalidate !== expectedSeconds) {
      errors.push(
        `${route}: expected ${expectedSeconds}s ISR, received ${String(contract.revalidate)}`
      );
    }
    if (!hasStaticArtifact(serverAppDir, route, kind)) {
      errors.push(`${route}: missing prerendered ${kind === "route" ? "body" : "HTML"} artifact`);
    }
  }

  for (const route of STATIC_ROUTES) {
    if (!hasStaticArtifact(serverAppDir, route, "page")) {
      errors.push(`${route}: expected build-time static HTML artifact`);
    }
  }

  for (const route of ON_DEMAND_SSG_PATTERNS) {
    const contract = readRouteContract(appDir, route, "page", errors);
    if (
      !contract ||
      !contract.hasGenerateStaticParams ||
      !contract.generateStaticParamsReturnsEmpty ||
      contract.dynamicParams === false
    ) {
      errors.push(`${route}: expected empty static params with blocking on-demand generation`);
    }
    if (!hasServerModule(serverAppDir, route, "page")) {
      errors.push(`${route}: missing server page module`);
    }
  }

  for (const [route, kind] of [
    ["/knowledge-confluence/[id]", "page"],
    ["/api/knowledge-confluences/[id]", "route"],
  ]) {
    const contract = readRouteContract(appDir, route, kind, errors);
    if (!contract || contract.dynamicParams !== false || !contract.hasGenerateStaticParams) {
      errors.push(`${route}: expected a closed, fully prebuilt parameter set`);
    }
  }

  for (const id of CONFLUENCE_IDS) {
    for (const [route, kind] of [
      [`/knowledge-confluence/${id}`, "page"],
      [`/api/knowledge-confluences/${id}`, "route"],
    ]) {
      if (!hasStaticArtifact(serverAppDir, route, kind)) {
        errors.push(`${route}: missing closed-set prerender artifact`);
      }
    }
  }

  for (const route of DYNAMIC_ROUTE_HANDLERS) {
    if (!routeManifest[route]) {
      errors.push(`${route}: missing runtime handler from app path routes manifest`);
    }
    const publicRoute = route.replace(/\/route$/, "");
    if (hasStaticArtifact(serverAppDir, publicRoute, "route")) {
      errors.push(`${publicRoute}: expected runtime rendering, found a static body artifact`);
    }
  }

  return errors;
}

function readRouteContract(appDir, route, kind, errors) {
  const sourcePath = findRouteSource(appDir, route, kind);
  if (!sourcePath) {
    errors.push(`${route}: cannot find ${kind} source module`);
    return null;
  }

  const source = readFileSync(sourcePath, "utf8");
  const sourceFile = ts.createSourceFile(
    sourcePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    sourcePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  const contract = {
    revalidate: undefined,
    dynamicParams: undefined,
    hasGenerateStaticParams: false,
    generateStaticParamsReturnsEmpty: false,
  };

  for (const statement of sourceFile.statements) {
    if (
      ts.isVariableStatement(statement) &&
      statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue;
        const value = literalValue(declaration.initializer);
        if (declaration.name.text === "revalidate") contract.revalidate = value;
        if (declaration.name.text === "dynamicParams") contract.dynamicParams = value;
      }
    }
    if (
      ts.isFunctionDeclaration(statement) &&
      statement.name?.text === "generateStaticParams" &&
      statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      contract.hasGenerateStaticParams = true;
      contract.generateStaticParamsReturnsEmpty = statement.body?.statements.some(
        (bodyStatement) =>
          ts.isReturnStatement(bodyStatement) &&
          bodyStatement.expression &&
          ts.isArrayLiteralExpression(bodyStatement.expression) &&
          bodyStatement.expression.elements.length === 0
      );
    }
  }

  return contract;
}

function literalValue(node) {
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isStringLiteral(node)) return node.text;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  return undefined;
}

function findRouteSource(appDir, route, kind) {
  const routePath = route === "/" ? "" : route.slice(1);
  const base = resolve(appDir, routePath, kind);
  for (const extension of [".tsx", ".ts", ".jsx", ".js"]) {
    const candidate = `${base}${extension}`;
    if (statSync(candidate, { throwIfNoEntry: false })) return candidate;
  }
  return null;
}

function hasStaticArtifact(serverAppDir, route, kind) {
  const routePath = route === "/" ? "index" : route.slice(1);
  const extension = kind === "route" ? ".body" : ".html";
  return Boolean(
    statSync(resolve(serverAppDir, `${routePath}${extension}`), { throwIfNoEntry: false })
  );
}

function hasServerModule(serverAppDir, route, kind) {
  const routePath = route === "/" ? "" : route.slice(1);
  return Boolean(
    statSync(resolve(serverAppDir, routePath, `${kind}.js`), {
      throwIfNoEntry: false,
    })
  );
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
  console.log(`Manifest mode: ${result.summary.manifestMode}`);

  if (result.errors.length > 0) {
    console.error(`\nAudit failed with ${result.errors.length} issue(s):`);
    for (const error of result.errors) console.error(`  - ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log("\nAudit passed: SSG, ISR and runtime route contracts match the production build.");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main();
