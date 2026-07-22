"use client";

import { useMemo, useState } from "react";
import {
  ADOLESCENT_SERVICE_SCENARIOS,
  DEFAULT_ADOLESCENT_SERVICE_CONSTRAINTS,
  selectAdolescentServicePortfolio,
  type AdolescentServiceAssumptions,
  type AdolescentServiceConstraints,
  type AdolescentServiceOptionId,
} from "@/subjects/medicine/lib/adolescent-service-portfolio";
import { AdolescentServicePortfolioTable } from "./AdolescentServicePortfolioTable";
import { AdolescentServiceSensitivity } from "./AdolescentServiceSensitivity";
import { AdolescentServiceStackDiagram } from "./AdolescentServiceStackDiagram";

const ACCENT = "#d9a85a";

export function AdolescentServicePortfolioLab() {
  const [constraints, setConstraints] = useState<AdolescentServiceConstraints>(
    DEFAULT_ADOLESCENT_SERVICE_CONSTRAINTS
  );
  const [activeScenarioId, setActiveScenarioId] = useState("connected-district");
  const [sensitivityOptionId, setSensitivityOptionId] =
    useState<AdolescentServiceOptionId>("community-youth-outreach");
  const [costMultiplier, setCostMultiplier] = useState(1);
  const [effectMultiplier, setEffectMultiplier] = useState(1);

  const assumptions = useMemo<AdolescentServiceAssumptions>(
    () => ({
      [sensitivityOptionId]: { costMultiplier, effectMultiplier },
    }),
    [costMultiplier, effectMultiplier, sensitivityOptionId]
  );
  const baselinePortfolio = useMemo(
    () => selectAdolescentServicePortfolio(constraints),
    [constraints]
  );
  const portfolio = useMemo(
    () => selectAdolescentServicePortfolio(constraints, assumptions),
    [assumptions, constraints]
  );
  const activeScenario = ADOLESCENT_SERVICE_SCENARIOS.find(
    (scenario) => scenario.id === activeScenarioId
  );

  const updateConstraint = <Key extends keyof AdolescentServiceConstraints>(
    key: Key,
    value: AdolescentServiceConstraints[Key]
  ) => {
    setConstraints((current) => ({ ...current, [key]: value }));
    setActiveScenarioId("");
  };

  const applyScenario = (scenarioId: string) => {
    const scenario = ADOLESCENT_SERVICE_SCENARIOS.find((item) => item.id === scenarioId)!;
    setConstraints(scenario.constraints);
    setActiveScenarioId(scenario.id);
    setCostMultiplier(1);
    setEffectMultiplier(1);
  };

  return (
    <section
      className="border-border-faint bg-bg-near border"
      aria-labelledby="adolescent-service-lab-title"
      data-testid="adolescent-service-portfolio-lab"
    >
      <header className="border-border-faint border-b px-5 py-6 sm:px-7">
        <p
          className="mb-3 font-mono text-[10px] tracking-[0.28em] uppercase"
          style={{ color: ACCENT }}
        >
          school × community × care · fictional teaching case
        </p>
        <h2
          id="adolescent-service-lab-title"
          className="font-display text-fg-primary text-2xl leading-tight font-semibold"
        >
          把分散项目组合成可接住人的系统
        </h2>
        <p className="text-fg-secondary mt-3 max-w-4xl text-sm leading-relaxed">
          预算优化不能把全校促进、定向支持、社区外展、转介入口、临床能力和连续导航视为六个互不相关的项目。这里的路径折损和互补收益用于解释系统结构，所有预算与效果数字都是虚构教学输入。
        </p>
      </header>

      <div className="border-border-faint border-b px-5 py-5 sm:px-7">
        <div className="flex flex-wrap gap-2" role="group" aria-label="服务包教学情景">
          {ADOLESCENT_SERVICE_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              aria-pressed={activeScenarioId === scenario.id}
              onClick={() => applyScenario(scenario.id)}
              className={`min-h-9 border px-3 text-xs transition-colors ${
                activeScenarioId === scenario.id
                  ? "border-[#d9a85a]/70 bg-[#d9a85a]/15 text-[#edc77e]"
                  : "border-border-faint text-fg-muted hover:text-fg-primary"
              }`}
            >
              {scenario.label}
            </button>
          ))}
        </div>
        <p className="text-fg-muted mt-3 min-h-5 text-xs leading-relaxed">
          {activeScenario?.description ?? "当前参数为自定义情景；模型不会把它解释为现实政策建议。"}
        </p>
      </div>

      <div className="border-border-faint grid gap-7 border-b p-5 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)] lg:p-7">
        <div className="space-y-6">
          <RangeControl
            inputId="adolescent-service-budget"
            label="年度教学预算"
            value={constraints.budgetUnits}
            min={12}
            max={36}
            step={1}
            display={`${constraints.budgetUnits} 单位`}
            hint="总成本不得超过预算；这不是任何地区的真实价格。"
            onChange={(value) => updateConstraint("budgetUnits", value)}
          />
          <RangeControl
            inputId="adolescent-service-equity-weight"
            label="服务不足群体的公平权重"
            value={constraints.equityWeight}
            min={1}
            max={3}
            step={0.1}
            display={`${constraints.equityWeight.toFixed(1)} 倍`}
            hint="只改变组合排序，不表示不同青少年的生命价值不同。"
            onChange={(value) => updateConstraint("equityWeight", value)}
          />
          <RangeControl
            inputId="adolescent-service-equity-floor"
            label="服务不足群体最低收益占比"
            value={constraints.minimumUnderservedShare}
            min={0.2}
            max={0.65}
            step={0.01}
            display={`${Math.round(constraints.minimumUnderservedShare * 100)}%`}
            hint="这是组合必须达到的教学公平约束，不是现实覆盖率。"
            onChange={(value) => updateConstraint("minimumUnderservedShare", value)}
          />
          <label className="border-border-faint flex cursor-pointer gap-3 border px-4 py-3">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[#d9a85a]"
              checked={constraints.requireCompletePathway}
              onChange={(event) =>
                updateConstraint("requireCompletePathway", event.target.checked)
              }
            />
            <span>
              <span className="text-fg-primary block text-sm font-medium">
                要求完整转介—照护—连续路径
              </span>
              <span className="text-fg-muted mt-1 block text-xs leading-relaxed">
                组合必须同时具备至少一个触达层、适龄入口、匹配照护和连续导航。
              </span>
            </span>
          </label>
        </div>

        <div className="min-w-0">
          <AdolescentServiceStackDiagram portfolio={portfolio} />
          {!portfolio.isFeasible ? (
            <p
              className="border px-4 py-3 text-sm leading-relaxed"
              style={{
                borderColor: "rgba(217, 120, 111, 0.45)",
                backgroundColor: "rgba(217, 120, 111, 0.1)",
                color: "#e39a93",
              }}
              role="status"
              data-testid="adolescent-service-infeasible"
            >
              当前预算、最低公平占比与路径要求无法同时满足。模型不偷偷放松约束，请提高预算、降低最低占比或明确取消完整路径要求。
            </p>
          ) : (
            <dl className="border-border-faint grid grid-cols-2 border sm:grid-cols-3">
              <Metric label="纳入层数" value={`${portfolio.options.length}/6`} />
              <Metric label="已用预算" value={portfolio.totalCostUnits.toFixed(1)} />
              <Metric
                label="实现后收益"
                value={Math.round(portfolio.realizedBenefitUnits).toString()}
              />
              <Metric
                label="公平调整收益"
                value={Math.round(portfolio.equityAdjustedBenefitUnits).toString()}
              />
              <Metric
                label="服务不足群体占比"
                value={`${Math.round(portfolio.underservedBenefitShare * 100)}%`}
              />
              <Metric
                label="路径状态"
                value={portfolio.hasCompletePathway ? "完整" : "有断点"}
              />
            </dl>
          )}
        </div>
      </div>

      <AdolescentServiceSensitivity
        constraints={constraints}
        optionId={sensitivityOptionId}
        costMultiplier={costMultiplier}
        effectMultiplier={effectMultiplier}
        baselinePortfolio={baselinePortfolio}
        currentPortfolio={portfolio}
        onOptionChange={(id) => {
          setSensitivityOptionId(id);
          setCostMultiplier(1);
          setEffectMultiplier(1);
        }}
        onCostMultiplierChange={setCostMultiplier}
        onEffectMultiplierChange={setEffectMultiplier}
      />

      <AdolescentServicePortfolioTable portfolio={portfolio} assumptions={assumptions} />

      <footer className="border-border-faint grid gap-4 border-t px-5 py-5 text-sm leading-relaxed sm:px-7 lg:grid-cols-2">
        <p className="text-fg-secondary">
          <span className="text-fg-primary font-medium">模型做了什么：</span>
          枚举预算内组合，应用公开的路径互补与折损，再在最低公平占比和完整路径约束下比较公平调整后的教学收益。
        </p>
        <p className="text-fg-muted">
          <span className="text-fg-secondary font-medium">模型没有回答：</span>
          当地需要、真实效果与成本、实施伤害、文化可接受性、隐私、同意、危机安全以及青年是否真正参与治理。
        </p>
      </footer>
    </section>
  );
}

function RangeControl({
  inputId,
  label,
  value,
  min,
  max,
  step,
  display,
  hint,
  onChange,
}: {
  inputId: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  hint: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
        <label htmlFor={inputId} className="text-fg-primary font-medium">
          {label}
        </label>
        <output className="font-mono text-xs" style={{ color: ACCENT }}>
          {display}
        </output>
      </div>
      <input
        id={inputId}
        className="h-2 w-full cursor-pointer accent-[#d9a85a]"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <p className="text-fg-muted mt-2 text-xs leading-relaxed">{hint}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border-faint border-r border-b px-3 py-3 last:border-r-0">
      <dt className="text-fg-muted font-mono text-[9px] tracking-[0.12em] uppercase">{label}</dt>
      <dd className="text-fg-primary mt-1 text-base font-semibold">{value}</dd>
    </div>
  );
}
