"use client";

import { useState } from "react";
import {
  clampQuotient,
  direction,
  directionLabel,
  drivingForce,
  LN_EQUILIBRIUM,
  QUOTIENT_DEFAULT,
  QUOTIENT_MAX,
  QUOTIENT_MIN,
  QUOTIENT_STEP,
} from "@/lib/chemistry/equilibrium";

function formatTenths(value: number): string {
  return clampQuotient(value).toFixed(1);
}

function formatForce(force: number): string {
  if (Math.abs(force) < LN_EQUILIBRIUM) return "0";
  return force.toFixed(2);
}

export function EquilibriumLab() {
  const [q, setQ] = useState(QUOTIENT_DEFAULT);
  const [k, setK] = useState(QUOTIENT_DEFAULT);
  const way = direction(q, k);
  const force = drivingForce(q, k);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <p className="text-fg-muted mb-4 text-[12px] tracking-wide">A ⇌ B · 不是测定</p>
      <QuotientSlider id="equilibrium-q" label="反应商 Q" value={q} onChange={setQ} />
      <QuotientSlider id="equilibrium-k" label="平衡常数 K" value={k} onChange={setK} />
      <p className="text-fg-primary mt-4 text-[15px] leading-relaxed">
        Q = {formatTenths(q)}，K = {formatTenths(k)}。{directionLabel(way)}
      </p>
      <p className="text-fg-secondary mt-2 text-[14.5px] leading-relaxed">
        ln(K/Q) = {formatForce(force)}。正号朝产物，负号朝反应物。这不是产率。
      </p>
      <p className="sr-only" aria-live="polite">
        {`Q ${formatTenths(q)}，K ${formatTenths(k)}。${directionLabel(way)}。示意刻度，不是测定常数。`}
      </p>
    </div>
  );
}

function QuotientSlider({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const shown = formatTenths(value);
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 flex items-center justify-between text-[12.5px]">
        <span className="text-fg-secondary">{label}</span>
        <span className="text-fg-primary font-mono" aria-hidden="true">
          {shown}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={QUOTIENT_MIN}
        max={QUOTIENT_MAX}
        step={QUOTIENT_STEP}
        value={clampQuotient(value)}
        aria-label={label}
        aria-valuetext={`${label} ${shown}。示意刻度，不是测定常数`}
        aria-describedby={`${id}-hint`}
        onChange={(event) => onChange(clampQuotient(Number(event.target.value)))}
        className="w-full"
      />
      <p id={`${id}-hint`} className="text-fg-muted mt-1 text-[10.5px] leading-snug">
        0.1 到 10，步长 0.1。拖动时数字立刻变。示意刻度，不是测定常数。
      </p>
    </div>
  );
}
