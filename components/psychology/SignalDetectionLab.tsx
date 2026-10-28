"use client";

import { useState } from "react";
import {
  balancedAccuracy,
  clampCriterion,
  clampSeparation,
  detectionRates,
  formatPercent,
  formatSigned,
  recoveredCriterion,
  recoveredSeparation,
} from "@/lib/psychology/signal-detection";

const ROWS = [
  { key: "hit", label: "击中" },
  { key: "falseAlarm", label: "虚报" },
  { key: "miss", label: "漏报" },
  { key: "correctRejection", label: "正确否定" },
] as const;

export function SignalDetectionLab() {
  const [separation, setSeparation] = useState(1);
  const [criterion, setCriterion] = useState(0);
  const rates = detectionRates(separation, criterion);
  const recoveredD = recoveredSeparation(rates.hit, rates.falseAlarm);
  const recoveredC = recoveredCriterion(rates.hit, rates.falseAlarm);
  const accuracy = balancedAccuracy(rates.hit, rates.falseAlarm);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <RangeControl
        id="sdt-separation"
        label="分布距离 d′"
        min={0}
        max={3}
        step={0.1}
        value={separation}
        hint="0 是两条分布重合，3 是示意里拉得最开。这不是某次实验测到的敏感度。"
        onChange={(value) => setSeparation(clampSeparation(value))}
      />
      <RangeControl
        id="sdt-criterion"
        label="判断标准 c"
        min={-1.5}
        max={1.5}
        step={0.1}
        value={criterion}
        hint="负值更倾向报「有」，正值更倾向报「无」。0 放在两分布的中点。"
        onChange={(value) => setCriterion(clampCriterion(value))}
      />
      <p className="text-fg-muted mt-4 text-[12px] tracking-wide">等方差示意 · 非被试成绩</p>
      <RateRows rates={rates} />
      <p className="text-fg-secondary mt-4 text-[14.5px] leading-relaxed">
        由击中率与虚报率算回的 d′ 是 {formatSigned(recoveredD)}，判断标准 c 是{" "}
        {formatSigned(recoveredC)}
        。信号和噪声各半时，正确率是 {formatPercent(accuracy)}。只移动标准时，d′ 停住，正确率会变。
      </p>
      <p className="sr-only" aria-live="polite">
        {`分布距离 ${formatSigned(separation)}，判断标准 ${formatSigned(criterion)}。击中 ${formatPercent(rates.hit)}，虚报 ${formatPercent(rates.falseAlarm)}。算回的 d′ ${formatSigned(recoveredD)}。示意，不是被试成绩。`}
      </p>
    </div>
  );
}

function RangeControl({
  id,
  label,
  min,
  max,
  step,
  value,
  hint,
  onChange,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  hint: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 flex items-center justify-between text-[12.5px]">
        <span className="text-fg-secondary">{label}</span>
        <span className="text-fg-primary font-mono" aria-hidden="true">
          {formatSigned(value)}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        aria-valuetext={`${label} ${formatSigned(value)}。示意刻度，不是被试成绩`}
        aria-describedby={`${id}-hint`}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
      />
      <p id={`${id}-hint`} className="text-fg-muted mt-1 text-[10.5px] leading-snug">
        {hint}
      </p>
    </div>
  );
}

function RateRows({
  rates,
}: {
  rates: { hit: number; falseAlarm: number; miss: number; correctRejection: number };
}) {
  return (
    <ul className="mt-4 space-y-3" aria-label="四种结果的比率">
      {ROWS.map((row) => {
        const rate = rates[row.key];
        return (
          <li key={row.key}>
            <div className="mb-1 flex items-baseline justify-between gap-3 text-[13px]">
              <span className="text-fg-secondary">{row.label}</span>
              <span className="text-fg-primary font-mono">{formatPercent(rate)}</span>
            </div>
            <div className="bg-bg-elevated h-2.5 overflow-hidden rounded" aria-hidden="true">
              <div
                className="bg-accent-gold h-full rounded"
                style={{ width: `${Math.min(100, Math.max(0, rate * 100))}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
