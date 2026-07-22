"use client";

import { useMemo, useState } from "react";
import {
  buildMentalHealthAccessCascade,
  DEFAULT_MENTAL_HEALTH_ACCESS_ASSUMPTIONS,
  MENTAL_HEALTH_ACCESS_SCENARIOS,
  type MentalHealthAccessAssumptions,
} from "@/subjects/medicine/lib/mental-health-access";
import { MentalHealthAccessDiagram } from "./MentalHealthAccessDiagram";

const ACCENT = "#62b7a2";
const UNDERSERVED = "#d9a85a";
const numberFormatter = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 });

type RateKey =
  | "recognitionRate"
  | "firstContactRate"
  | "continuityRate"
  | "responseRate"
  | "underservedAccessGap";

const CONTROLS: readonly {
  key: RateKey;
  label: string;
  hint: string;
  min: number;
  max: number;
}[] = [
  {
    key: "recognitionRate",
    label: "识别与表达",
    hint: "本人、家庭、学校或基层服务能识别并表达需要。",
    min: 0.2,
    max: 0.95,
  },
  {
    key: "firstContactRate",
    label: "首次接触",
    hint: "被识别者能到达、负担并信任一个服务入口。",
    min: 0.2,
    max: 0.95,
  },
  {
    key: "continuityRate",
    label: "持续照护",
    hint: "首次接触后完成评估、转诊并保持必要随访。",
    min: 0.2,
    max: 0.95,
  },
  {
    key: "responseRate",
    label: "有效反应",
    hint: "持续照护者在症状、功能或个人目标上获得有意义改善。",
    min: 0.2,
    max: 0.85,
  },
  {
    key: "underservedAccessGap",
    label: "服务不足群体的入口差距",
    hint: "相对降低识别、首次接触与持续照护，不改变治疗本身的反应假设。",
    min: 0,
    max: 0.4,
  },
];

function formatPercent(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

export function MentalHealthAccessLab() {
  const [assumptions, setAssumptions] = useState<MentalHealthAccessAssumptions>(
    DEFAULT_MENTAL_HEALTH_ACCESS_ASSUMPTIONS
  );
  const [activeScenarioId, setActiveScenarioId] = useState<string>("fragmented");
  const cascade = useMemo(() => buildMentalHealthAccessCascade(assumptions), [assumptions]);

  const updateRate = (key: RateKey, value: number) => {
    setActiveScenarioId("custom");
    setAssumptions((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="border-border-faint bg-bg-near border" aria-label="心理健康服务可及性模型">
      <header className="border-border-faint grid gap-4 border-b px-5 py-5 sm:px-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="font-mono text-[10px] tracking-[0.24em] text-[#62b7a2] uppercase">
            teaching model · effective coverage
          </p>
          <h2 className="text-fg-primary mt-2 text-xl font-semibold">从需要到有效覆盖</h2>
          <p className="text-fg-muted mt-2 max-w-3xl text-xs leading-5">
            固定观察一万名需要支持的人。每个比例都是虚构教学假设，用来观察逐级流失和群体差距，不代表任何地区、疾病或个人的真实估计。
          </p>
        </div>
        <div
          className="border-border-faint flex flex-wrap border"
          role="group"
          aria-label="服务情景"
        >
          {MENTAL_HEALTH_ACCESS_SCENARIOS.map((scenario) => {
            const active = activeScenarioId === scenario.id;
            return (
              <button
                key={scenario.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setActiveScenarioId(scenario.id);
                  setAssumptions(scenario.assumptions);
                }}
                className={`min-h-10 border-r border-[var(--color-border-faint)] px-3 text-[11px] last:border-r-0 ${
                  active
                    ? "bg-[#62b7a2] text-[#07110f]"
                    : "text-fg-muted hover:bg-bg-panel hover:text-fg-primary"
                }`}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid lg:grid-cols-[minmax(250px,0.72fr)_minmax(0,1.28fr)]">
        <div className="border-border-faint space-y-6 border-b px-5 py-6 sm:px-7 lg:border-r lg:border-b-0">
          {CONTROLS.map((control) => (
            <RateControl
              key={control.key}
              inputId={`mental-health-access-${control.key}`}
              label={control.label}
              hint={control.hint}
              value={assumptions[control.key]}
              min={control.min}
              max={control.max}
              onChange={(value) => updateRate(control.key, value)}
            />
          ))}
        </div>

        <div className="min-w-0">
          <dl className="border-border-faint grid grid-cols-2 border-b md:grid-cols-4">
            <Metric label="总体有效覆盖" value={formatPercent(cascade.effectiveCoverageRate)} />
            <Metric
              label="服务不足群体"
              value={formatPercent(cascade.underservedEffectiveCoverageRate)}
            />
            <Metric
              label="有效覆盖差距"
              value={`${cascade.equityGapPercentagePoints.toFixed(1)} 点`}
            />
            <Metric label="最大流失" value={cascade.largestLossStage.label} compact />
          </dl>
          <MentalHealthAccessDiagram cascade={cascade} population={assumptions.population} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">
            心理健康服务照护级联中总体与服务不足群体的虚构教学人数
          </caption>
          <thead>
            <tr className="border-border-faint border-y">
              {[
                "服务阶段",
                "总体人数",
                "初始需要占比",
                "一般群体",
                "服务不足群体",
                "本阶段流失",
              ].map((label) => (
                <th
                  key={label}
                  className="text-fg-muted px-4 py-3 font-mono text-[10px] tracking-[0.12em]"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cascade.stages.map((stage) => (
              <tr key={stage.id} className="border-border-faint border-b last:border-b-0">
                <th className="text-fg-primary px-4 py-3 text-sm font-medium">{stage.label}</th>
                <td className="text-fg-secondary px-4 py-3 text-sm">
                  {numberFormatter.format(stage.overallCount)}
                </td>
                <td className="text-fg-secondary px-4 py-3 text-sm">
                  {formatPercent(stage.overallRate)}
                </td>
                <td className="text-fg-secondary px-4 py-3 text-sm">
                  {numberFormatter.format(stage.generalCount)}
                </td>
                <td className="px-4 py-3 text-sm" style={{ color: UNDERSERVED }}>
                  {numberFormatter.format(stage.underservedCount)}
                </td>
                <td className="text-fg-muted px-4 py-3 text-sm">
                  {stage.id === "need" ? "—" : numberFormatter.format(stage.lossFromPrevious)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="border-border-faint grid gap-4 border-t px-5 py-5 text-xs leading-5 sm:px-7 lg:grid-cols-2">
        <p className="text-fg-secondary">
          <span className="text-fg-primary font-medium">模型能说明：</span>
          多个看似中等的流失率相乘后，有效覆盖可能迅速缩小；改善入口与改善连续性会产生不同路径。
        </p>
        <p className="text-fg-muted">
          <span className="text-fg-secondary font-medium">模型不能说明：</span>
          谁应接受何种治疗、真实服务效果、权利是否得到尊重，或某项政策在具体地区是否值得实施。
        </p>
      </footer>
    </section>
  );
}

function RateControl({
  inputId,
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  inputId: string;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={inputId} className="text-fg-primary text-sm font-medium">
          {label}
        </label>
        <output htmlFor={inputId} className="font-mono text-xs" style={{ color: ACCENT }}>
          {formatPercent(value)}
        </output>
      </div>
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step="0.01"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-[#62b7a2]"
      />
      <p className="text-fg-muted mt-2 text-xs leading-5">{hint}</p>
    </div>
  );
}

function Metric({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div className="border-border-faint border-r px-4 py-4 last:border-r-0">
      <dt className="text-fg-muted font-mono text-[9px] tracking-[0.12em] uppercase">{label}</dt>
      <dd className={`text-fg-primary mt-1 font-semibold ${compact ? "text-sm" : "text-xl"}`}>
        {value}
      </dd>
    </div>
  );
}
