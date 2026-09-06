"use client";

import { useState } from "react";
import {
  MATERIAL_PROFILES,
  maxMetric,
  type MaterialId,
  type MaterialProfile,
} from "@/lib/engineering/material-catalog";

const METRICS = [
  { key: "strengthMpa" as const, label: "特征强度", unit: "MPa" },
  { key: "densityKgM3" as const, label: "密度", unit: "kg/m³" },
  { key: "elasticGpa" as const, label: "弹性模量", unit: "GPa" },
  { key: "specificStrength" as const, label: "比强度", unit: "MPa / (g/cm³)" },
];

export function MaterialsProfile() {
  const [selected, setSelected] = useState<MaterialId>("steel");
  const current = MATERIAL_PROFILES.find((profile) => profile.id === selected)!;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {MATERIAL_PROFILES.map((profile) => (
          <button
            key={profile.id}
            type="button"
            aria-pressed={profile.id === selected}
            onClick={() => setSelected(profile.id)}
            className={`rounded-full border px-3 py-1.5 text-[12.5px] ${
              profile.id === selected
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {profile.name}
          </button>
        ))}
      </div>

      <p className="text-fg-secondary mb-4 text-[13.5px] leading-relaxed">
        {current.grade} · {current.strengthKind} {current.strengthMpa} MPa。{current.note}
      </p>

      <div className="space-y-3" role="img" aria-label={`${current.name}与其他教学材料的性能条`}>
        {METRICS.map((metric) => (
          <MetricBar
            key={metric.key}
            metric={metric}
            current={current}
            ceiling={maxMetric(MATERIAL_PROFILES, metric.key)}
          />
        ))}
      </div>
    </div>
  );
}

function MetricBar({
  metric,
  current,
  ceiling,
}: {
  metric: (typeof METRICS)[number];
  current: MaterialProfile;
  ceiling: number;
}) {
  const value = current[metric.key];
  const width = `${Math.max(4, (value / ceiling) * 100)}%`;
  return (
    <div>
      <div className="mb-1 flex justify-between text-[12px]">
        <span className="text-fg-secondary">{metric.label}</span>
        <span className="text-fg-primary font-mono">
          {value.toFixed(metric.key === "specificStrength" ? 0 : 0)} {metric.unit}
        </span>
      </div>
      <div className="bg-bg-elevated h-2.5 overflow-hidden rounded-full">
        <div className="h-full rounded-full bg-[#5b9da0]" style={{ width }} />
      </div>
    </div>
  );
}
