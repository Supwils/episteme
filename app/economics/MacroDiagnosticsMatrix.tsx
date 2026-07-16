"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ALL_MACRO_DIMENSIONS,
  MACRO_CASES,
  MACRO_DIMENSIONS,
  MACRO_SCENARIOS,
  type DimensionKey,
  type RiskLevel,
  type ScenarioKey,
} from "@/subjects/economics/lib/macro-diagnostics";

const RISK_META: Record<RiskLevel, { label: string; className: string }> = {
  low: {
    label: "低",
    className: "border-emerald-300/35 bg-emerald-300/10 text-emerald-100",
  },
  medium: {
    label: "中",
    className: "border-sky-300/35 bg-sky-300/10 text-sky-100",
  },
  high: {
    label: "高",
    className: "border-amber-300/40 bg-amber-300/10 text-amber-100",
  },
  acute: {
    label: "急",
    className: "border-rose-300/40 bg-rose-300/10 text-rose-100",
  },
};

const SCENARIO_CLASS_NAMES: Record<ScenarioKey, string> = {
  baseline: "border-sky-300/35 bg-sky-300/10 text-sky-100",
  upside: "border-emerald-300/35 bg-emerald-300/10 text-emerald-100",
  downside: "border-rose-300/40 bg-rose-300/10 text-rose-100",
};

function toggleDimension(selected: DimensionKey[], dimension: DimensionKey): DimensionKey[] {
  if (selected.includes(dimension)) {
    return selected.length === 1 ? selected : selected.filter((item) => item !== dimension);
  }
  return MACRO_DIMENSIONS.filter(
    (item) => selected.includes(item.key) || item.key === dimension
  ).map((item) => item.key);
}

export function MacroDiagnosticsMatrix() {
  const [selectedDimensions, setSelectedDimensions] =
    useState<DimensionKey[]>(ALL_MACRO_DIMENSIONS);
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [scenario, setScenario] = useState<ScenarioKey>("baseline");
  const [selectedCaseName, setSelectedCaseName] = useState<string | null>(null);

  const activeCase = useMemo(
    () => MACRO_CASES.find((item) => item.name === selectedCaseName) ?? null,
    [selectedCaseName]
  );
  const visibleCases = useMemo(
    () =>
      riskFilter === "all" ? MACRO_CASES : MACRO_CASES.filter((item) => item.risk === riskFilter),
    [riskFilter]
  );
  const visibleDimensions = useMemo(
    () => MACRO_DIMENSIONS.filter((dimension) => selectedDimensions.includes(dimension.key)),
    [selectedDimensions]
  );

  useEffect(() => {
    if (!activeCase) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCaseName(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeCase]);

  return (
    <section className="relative z-[2] w-full px-6 pb-20 sm:px-10 lg:px-16">
      <div className="border-border-faint bg-bg-near/70 overflow-hidden border">
        <div className="border-border-faint grid gap-6 border-b p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-7">
          <div className="max-w-3xl">
            <p className="text-accent-gold mb-3 font-mono text-[10px] tracking-[0.34em] uppercase">
              macro diagnostics · 2026
            </p>
            <h2 className="font-display text-fg-primary text-2xl leading-tight font-semibold md:text-3xl">
              现代宏观国家诊断矩阵
            </h2>
            <p className="text-fg-secondary mt-3 text-sm leading-relaxed md:text-base">
              用同一套框架比较不同经济体：增长是否有真实动能，通胀来自需求还是供给，财政和债务能否持续，外部账户与金融系统是否会放大冲击。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/economics/knowledge-base/macro-diagnostics-matrix-guide"
              className="border-accent-gold/35 text-accent-gold hover:bg-accent-gold/10 inline-flex h-10 items-center justify-center border px-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
            >
              读图手册
            </Link>
            <Link
              href="/economics/concepts/country-macro-diagnostics-forecasting"
              className="border-border-faint text-fg-secondary hover:border-accent-gold/35 hover:text-accent-gold inline-flex h-10 items-center justify-center border px-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
            >
              诊断框架
            </Link>
          </div>
        </div>

        <div className="border-border-faint grid gap-5 border-b p-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:p-7">
          <div className="space-y-5">
            <fieldset>
              <legend className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.24em] uppercase">
                维度筛选
              </legend>
              <div className="flex flex-wrap gap-2">
                {MACRO_DIMENSIONS.map((dimension) => {
                  const active = selectedDimensions.includes(dimension.key);
                  return (
                    <button
                      key={dimension.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        setSelectedDimensions((current) => toggleDimension(current, dimension.key))
                      }
                      className={`h-9 border px-3 text-sm transition-colors ${
                        active
                          ? "border-accent-gold/55 bg-accent-gold/15 text-accent-gold"
                          : "border-border-faint text-fg-secondary hover:border-accent-gold/30 hover:text-accent-gold"
                      }`}
                    >
                      {dimension.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.24em] uppercase">
                风险等级
              </legend>
              <div className="flex flex-wrap gap-2">
                {(["all", "medium", "high", "acute"] as const).map((risk) => {
                  const active = riskFilter === risk;
                  const label = risk === "all" ? "全部" : RISK_META[risk].label;
                  return (
                    <button
                      key={risk}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setRiskFilter(risk)}
                      className={`h-9 border px-3 text-sm transition-colors ${
                        active
                          ? "border-accent-gold/55 bg-accent-gold/15 text-accent-gold"
                          : "border-border-faint text-fg-secondary hover:border-accent-gold/30 hover:text-accent-gold"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div>
            <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.24em] uppercase">
              情景高亮
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(MACRO_SCENARIOS) as ScenarioKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={scenario === key}
                  onClick={() => setScenario(key)}
                  className={`min-h-10 border px-2 text-sm transition-colors ${
                    scenario === key
                      ? "border-accent-gold/55 bg-accent-gold/15 text-accent-gold"
                      : "border-border-faint text-fg-secondary hover:border-accent-gold/30 hover:text-accent-gold"
                  }`}
                >
                  {MACRO_SCENARIOS[key].label.replace("情景", "")}
                </button>
              ))}
            </div>
            <p
              className={`mt-3 border px-3 py-3 text-sm leading-relaxed ${
                SCENARIO_CLASS_NAMES[scenario]
              }`}
            >
              {MACRO_SCENARIOS[scenario].summary}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left">
            <caption className="sr-only">
              现代宏观国家诊断矩阵，比较增长、通胀、财政、债务、外部账户、金融系统和政策情景。
            </caption>
            <thead>
              <tr className="border-border-faint border-b">
                <th className="text-fg-muted w-36 px-4 py-3 font-mono text-[10px] tracking-[0.2em] uppercase">
                  经济体
                </th>
                {visibleDimensions.map((dimension) => (
                  <th
                    key={dimension.key}
                    className="text-fg-muted px-4 py-3 font-mono text-[10px] tracking-[0.2em] uppercase"
                  >
                    {dimension.label}
                  </th>
                ))}
                <th className="text-fg-muted w-24 px-4 py-3 font-mono text-[10px] tracking-[0.2em] uppercase">
                  风险
                </th>
                <th className="text-fg-muted w-28 px-4 py-3 font-mono text-[10px] tracking-[0.2em] uppercase">
                  详情
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleCases.map((item) => {
                const risk = RISK_META[item.risk];
                return (
                  <tr
                    key={item.path}
                    className="border-border-faint hover:bg-bg-elevated/55 border-b transition-colors last:border-b-0"
                  >
                    <th className="px-4 py-4 align-top">
                      <Link
                        href={item.path}
                        className="text-fg-primary hover:text-accent-gold font-semibold transition-colors"
                      >
                        {item.name}
                      </Link>
                    </th>
                    {visibleDimensions.map((dimension) => (
                      <td
                        key={dimension.key}
                        className={`text-fg-secondary max-w-48 px-4 py-4 align-top text-sm leading-relaxed ${
                          dimension.key === "policy" ? SCENARIO_CLASS_NAMES[scenario] : ""
                        }`}
                      >
                        {item.dimensions[dimension.key]}
                      </td>
                    ))}
                    <td className="px-4 py-4 align-top">
                      <span
                        className={`inline-flex min-w-10 items-center justify-center border px-2 py-1 font-mono text-[11px] ${risk.className}`}
                      >
                        {risk.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <button
                        type="button"
                        onClick={() => setSelectedCaseName(item.name)}
                        className="border-border-faint text-fg-secondary hover:border-accent-gold/35 hover:text-accent-gold h-8 border px-3 text-sm transition-colors"
                      >
                        查看
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="border-border-faint grid gap-4 border-t p-5 md:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] md:p-7">
          <div>
            <p className="text-fg-primary font-semibold">{MACRO_SCENARIOS[scenario].label}</p>
            <p className="text-fg-secondary mt-2 text-sm leading-relaxed">
              {MACRO_SCENARIOS[scenario].summary}
            </p>
          </div>
          <p className="text-fg-muted text-sm leading-relaxed">
            当前显示 {visibleCases.length} 类经济体、{visibleDimensions.length} 个诊断维度。
            选择单个经济体的“查看”可打开情景解释，继续进入完整案例页。
          </p>
        </div>
      </div>

      {activeCase ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 px-4 py-6 backdrop-blur-sm sm:items-center"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCaseName(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="macro-detail-title"
            className="border-border-faint bg-bg-near max-h-[86dvh] w-full max-w-2xl overflow-y-auto border p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-accent-gold mb-2 font-mono text-[10px] tracking-[0.24em] uppercase">
                  country detail
                </p>
                <h3
                  id="macro-detail-title"
                  className="font-display text-fg-primary text-2xl font-semibold"
                >
                  {activeCase.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCaseName(null)}
                className="border-border-faint text-fg-muted hover:border-accent-gold/35 hover:text-accent-gold h-9 w-9 border text-lg leading-none transition-colors"
                aria-label="关闭详情"
              >
                ×
              </button>
            </div>

            <p className="text-fg-primary mt-5 text-base leading-relaxed">{activeCase.signal}</p>
            <p className="text-fg-secondary mt-3 text-sm leading-relaxed">{activeCase.detail}</p>

            <div className="mt-5 grid gap-3">
              {(Object.keys(MACRO_SCENARIOS) as ScenarioKey[]).map((key) => (
                <div
                  key={key}
                  className={`border px-4 py-3 ${
                    key === scenario ? SCENARIO_CLASS_NAMES[key] : "border-border-faint"
                  }`}
                >
                  <p className="text-fg-primary text-sm font-semibold">
                    {MACRO_SCENARIOS[key].label}
                  </p>
                  <p className="text-fg-secondary mt-1 text-sm leading-relaxed">
                    {activeCase.scenarios[key]}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={activeCase.path}
                className="border-accent-gold/35 text-accent-gold hover:bg-accent-gold/10 inline-flex h-10 items-center justify-center border px-4 text-sm transition-colors"
              >
                阅读完整案例
              </Link>
              {activeCase.deepDivePath ? (
                <Link
                  href={activeCase.deepDivePath}
                  className="border-accent-gold/35 text-accent-gold hover:bg-accent-gold/10 inline-flex h-10 items-center justify-center border px-4 text-sm transition-colors"
                >
                  深挖专题
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => setSelectedCaseName(null)}
                className="border-border-faint text-fg-secondary hover:border-accent-gold/35 hover:text-accent-gold h-10 border px-4 text-sm transition-colors"
              >
                返回矩阵
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
