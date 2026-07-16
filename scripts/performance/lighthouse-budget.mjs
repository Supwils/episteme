export const LIGHTHOUSE_ROUTE_BUDGETS = [
  { route: "/", minPerformance: 85, maxLcpMs: 3800, maxTbtMs: 250, maxCls: 0.1 },
  {
    route: "/earth-science/concepts/plate-boundaries",
    minPerformance: 80,
    maxLcpMs: 4500,
    maxTbtMs: 300,
    maxCls: 0.1,
  },
  {
    route: "/philosophy/thinkers/socrates",
    minPerformance: 85,
    maxLcpMs: 4000,
    maxTbtMs: 250,
    maxCls: 0.1,
  },
  {
    route: "/life-science/species/octopus",
    minPerformance: 75,
    maxLcpMs: 5000,
    maxTbtMs: 400,
    maxCls: 0.1,
  },
  {
    route: "/knowledge-graph",
    minPerformance: 80,
    maxLcpMs: 4500,
    maxTbtMs: 400,
    maxCls: 0.1,
  },
];

export function readLighthouseMetrics(lhr) {
  return {
    performance: Math.round((lhr.categories.performance?.score ?? 0) * 100),
    accessibility: Math.round((lhr.categories.accessibility?.score ?? 0) * 100),
    bestPractices: Math.round((lhr.categories["best-practices"]?.score ?? 0) * 100),
    seo: Math.round((lhr.categories.seo?.score ?? 0) * 100),
    lcpMs: lhr.audits["largest-contentful-paint"]?.numericValue ?? Infinity,
    tbtMs: lhr.audits["total-blocking-time"]?.numericValue ?? Infinity,
    cls: lhr.audits["cumulative-layout-shift"]?.numericValue ?? Infinity,
  };
}

export function evaluateLighthouseBudget(metrics, budget, globalMinPerformance) {
  const violations = [];
  const minPerformance = globalMinPerformance ?? budget.minPerformance;

  if (metrics.performance < minPerformance) {
    violations.push(`performance ${metrics.performance} < ${minPerformance}`);
  }
  if (metrics.lcpMs > budget.maxLcpMs) {
    violations.push(`LCP ${Math.round(metrics.lcpMs)}ms > ${budget.maxLcpMs}ms`);
  }
  if (metrics.tbtMs > budget.maxTbtMs) {
    violations.push(`TBT ${Math.round(metrics.tbtMs)}ms > ${budget.maxTbtMs}ms`);
  }
  if (metrics.cls > budget.maxCls) {
    violations.push(`CLS ${metrics.cls.toFixed(3)} > ${budget.maxCls}`);
  }

  return violations;
}

export function hasValidLighthouseMetrics(metrics) {
  return (
    metrics.performance > 0 &&
    Number.isFinite(metrics.lcpMs) &&
    Number.isFinite(metrics.tbtMs) &&
    Number.isFinite(metrics.cls)
  );
}
