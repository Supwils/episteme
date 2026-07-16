"use client";

import { useMemo, useState } from "react";
import { HealthPrioritySensitivity } from "./HealthPrioritySensitivity";
import {
  PRIORITY_INTERVENTIONS,
  assumedCostMillions,
  assumedQalys,
  equityAdjustedQalys,
  selectPriorityPortfolio,
  type PriorityIntervention,
} from "@/subjects/medicine/lib/health-priority-setting";

const ACCENT = "#4f9d76";

const severityLabels: Record<PriorityIntervention["severity"], string> = {
  moderate: "中等严重度",
  high: "高严重度",
  "very-high": "极高严重度",
};

function formatMillions(value: number): string {
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)} 百万`;
}

export function HealthPrioritySimulator() {
  const [budgetMillions, setBudgetMillions] = useState(24);
  const [equityWeight, setEquityWeight] = useState(1);
  const [protectVerySevereConditions, setProtectVerySevereConditions] = useState(false);
  const [sensitivityInterventionId, setSensitivityInterventionId] = useState("cataract-access");
  const [costMultiplier, setCostMultiplier] = useState(1);
  const [effectMultiplier, setEffectMultiplier] = useState(1);

  const assumptions = useMemo(
    () => ({
      [sensitivityInterventionId]: { costMultiplier, effectMultiplier },
    }),
    [costMultiplier, effectMultiplier, sensitivityInterventionId]
  );
  const baselinePortfolio = useMemo(
    () => selectPriorityPortfolio(budgetMillions, equityWeight, protectVerySevereConditions),
    [budgetMillions, equityWeight, protectVerySevereConditions]
  );

  const portfolio = useMemo(
    () =>
      selectPriorityPortfolio(
        budgetMillions,
        equityWeight,
        protectVerySevereConditions,
        assumptions
      ),
    [assumptions, budgetMillions, equityWeight, protectVerySevereConditions]
  );
  const selectedIds = new Set(portfolio.interventions.map((intervention) => intervention.id));

  return (
    <section className="border-border-faint bg-bg-near border" aria-labelledby="priority-lab-title">
      <header className="border-border-faint border-b px-5 py-6 sm:px-7">
        <p
          className="mb-3 font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: ACCENT }}
        >
          priority setting lab · fictional teaching case
        </p>
        <h2
          id="priority-lab-title"
          className="font-display text-fg-primary text-2xl leading-tight font-semibold"
        >
          在约束下选择组合
        </h2>
        <p className="text-fg-secondary mt-3 max-w-3xl text-sm leading-relaxed">
          调整预算与公平权重，观察同一组干预如何形成不同组合。所有金额与健康收益均为虚构教学输入，用来解释成本效果、预算影响与公平约束，不能用于现实支付决策。
        </p>
      </header>

      <div className="border-border-faint grid gap-6 border-b p-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:p-7">
        <div className="space-y-6">
          <RangeControl
            inputId="priority-setting-budget"
            label="年度可用预算"
            value={budgetMillions}
            min={9}
            max={40}
            step={1}
            display={formatMillions(budgetMillions)}
            hint="单位为虚构教学预算；组合只会选择总成本不超过此数的项目。"
            onChange={setBudgetMillions}
          />
          <RangeControl
            inputId="priority-setting-equity-weight"
            label="偏远与长期未覆盖人群的公平权重"
            value={equityWeight}
            min={1}
            max={3}
            step={0.1}
            display={`${equityWeight.toFixed(1)} 倍`}
            hint="权重只改变模型的比较方式，不改变任何人的生命价值。"
            onChange={setEquityWeight}
          />
          <button
            type="button"
            aria-pressed={protectVerySevereConditions}
            onClick={() => setProtectVerySevereConditions((current) => !current)}
            className={`border px-4 py-3 text-left text-sm transition-colors ${
              protectVerySevereConditions
                ? "text-fg-primary border-[#4f9d76]/65 bg-[#4f9d76]/15"
                : "border-border-faint text-fg-secondary hover:border-[#4f9d76]/45"
            }`}
          >
            <span className="block font-medium">保障至少一项极高严重度干预</span>
            <span className="mt-1 block text-xs leading-relaxed opacity-75">
              这是一项价值约束：它可能降低模型可计量的总收益，但使严重疾病的保障被明确纳入讨论。
            </span>
          </button>
        </div>

        <dl className="border-border-faint grid grid-cols-2 content-start border">
          <Metric label="入选项目" value={`${portfolio.interventions.length} 项`} />
          <Metric label="已分配预算" value={formatMillions(portfolio.totalCostMillions)} />
          <Metric label="未分配预算" value={formatMillions(portfolio.remainingBudgetMillions)} />
          <Metric label="原始健康收益" value={`${Math.round(portfolio.totalQalys)} QALY`} />
          <Metric
            label="公平调整后收益"
            value={`${Math.round(portfolio.equityAdjustedQalys)} 单位`}
            wide
          />
        </dl>
      </div>

      <HealthPrioritySensitivity
        budgetMillions={budgetMillions}
        equityWeight={equityWeight}
        protectVerySevereConditions={protectVerySevereConditions}
        interventionId={sensitivityInterventionId}
        costMultiplier={costMultiplier}
        effectMultiplier={effectMultiplier}
        baselinePortfolio={baselinePortfolio}
        currentPortfolio={portfolio}
        onInterventionChange={(id) => {
          setSensitivityInterventionId(id);
          setCostMultiplier(1);
          setEffectMultiplier(1);
        }}
        onCostMultiplierChange={setCostMultiplier}
        onEffectMultiplierChange={setEffectMultiplier}
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <caption className="sr-only">教学情景中的卫生干预、预算、健康收益与实施约束。</caption>
          <thead>
            <tr className="border-border-faint border-b">
              {[
                "干预",
                "教学成本",
                "预期 QALY",
                "未覆盖人群占比",
                "严重度",
                "实施约束",
                "状态",
              ].map((label) => (
                <th
                  key={label}
                  className="text-fg-muted px-4 py-3 font-mono text-[10px] tracking-[0.18em] uppercase"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRIORITY_INTERVENTIONS.map((intervention) => {
              const selected = selectedIds.has(intervention.id);
              const currentCost = assumedCostMillions(intervention, assumptions);
              const currentQalys = assumedQalys(intervention, assumptions);
              const adjusted = equityAdjustedQalys(intervention, equityWeight, assumptions);
              return (
                <tr
                  key={intervention.id}
                  className={`border-border-faint border-b last:border-b-0 ${
                    selected ? "bg-[#4f9d76]/10" : ""
                  }`}
                >
                  <th className="text-fg-primary max-w-52 px-4 py-4 text-sm font-medium">
                    {intervention.title}
                  </th>
                  <td className="text-fg-secondary px-4 py-4 text-sm">
                    {formatMillions(currentCost)}
                    {currentCost !== intervention.costMillions && (
                      <span className="text-fg-muted ml-1 text-xs">
                        基准 {formatMillions(intervention.costMillions)}
                      </span>
                    )}
                  </td>
                  <td className="text-fg-secondary px-4 py-4 text-sm">
                    {Math.round(currentQalys)}
                    {equityWeight > 1 && (
                      <span className="text-fg-muted ml-1 text-xs">→ {Math.round(adjusted)}</span>
                    )}
                  </td>
                  <td className="text-fg-secondary px-4 py-4 text-sm">
                    {Math.round(intervention.underservedShare * 100)}%
                  </td>
                  <td className="text-fg-secondary px-4 py-4 text-sm">
                    {severityLabels[intervention.severity]}
                  </td>
                  <td className="text-fg-secondary max-w-60 px-4 py-4 text-sm leading-relaxed">
                    {intervention.implementationConstraint}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex border px-2 py-1 font-mono text-[10px] tracking-[0.14em] ${
                        selected
                          ? "border-[#4f9d76]/55 text-[#8ed0aa]"
                          : "border-border-faint text-fg-muted"
                      }`}
                    >
                      {selected ? "纳入组合" : "未纳入"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="border-border-faint grid gap-4 border-t px-5 py-5 text-sm leading-relaxed sm:px-7 lg:grid-cols-2">
        <p className="text-fg-secondary">
          <span className="text-fg-primary font-medium">模型如何选择：</span>
          在预算内枚举可行组合，最大化 QALY
          的公平调整值；开启严重度保障时，组合必须包含至少一项极高严重度干预。
        </p>
        <p className="text-fg-muted">
          <span className="text-fg-secondary font-medium">模型没有回答：</span>
          证据是否可靠、服务能否交付、谁参与决策、权利如何保障，以及被排除项目的机会成本是否可接受。
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
    <div className="block">
      <span className="mb-2 flex items-baseline justify-between gap-4 text-sm">
        <label htmlFor={inputId} className="text-fg-primary font-medium">
          {label}
        </label>
        <output className="font-mono text-xs" style={{ color: ACCENT }}>
          {display}
        </output>
      </span>
      <input
        id={inputId}
        className="h-2 w-full cursor-pointer accent-[#4f9d76]"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="text-fg-muted mt-2 block text-xs leading-relaxed">{hint}</span>
    </div>
  );
}

function Metric({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`border-border-faint px-4 py-4 ${wide ? "col-span-2 border-t" : ""}`}>
      <dt className="text-fg-muted font-mono text-[10px] tracking-[0.16em] uppercase">{label}</dt>
      <dd className="text-fg-primary mt-1 text-lg font-semibold">{value}</dd>
    </div>
  );
}
