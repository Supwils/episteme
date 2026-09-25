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
    // Re-baselined 2026-09-24 on the CI runner (decision record #17 ⑤): with
    // real 4x throttling and compressed payloads the graph now mounts inside
    // the trace, and its whole-graph memos cost 1.3–1.6 s TBT there (49 ms on
    // a fast laptop). Tighten back to 80 / 4500 / 400 once mounting is split.
    minPerformance: 40,
    maxLcpMs: 6500,
    maxTbtMs: 2000,
    maxCls: 0.1,
    // First paint here waits on a fetch issued by the page, which simulated
    // throttling (Lantern) models poorly: four changes that cut observed LCP
    // from 5.7 s to 4.2 s left its estimate within ±5 ms of 5.73 s. Measure
    // with real (devtools) throttling instead. Decision record #15.
    throttlingMethod: "devtools",
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
    inpMs:
      lhr.audits["interaction-to-next-paint"]?.numericValue ??
      lhr.audits["experimental-interaction-to-next-paint"]?.numericValue ??
      null,
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

export function shouldConfirmLighthouseBudget(metrics, budget, globalMinPerformance) {
  return (
    !hasValidLighthouseMetrics(metrics) ||
    evaluateLighthouseBudget(metrics, budget, globalMinPerformance).length > 0
  );
}

/** Extra traces after a failed or invalid first sample. CI Chrome on `/` often
 *  needs a second warm confirmation (decision record 2: keep the 250ms TBT
 *  budget; absorb runner variance in the script, not by raising the line). */
export const LIGHTHOUSE_CONFIRMATION_TRACES = 2;
