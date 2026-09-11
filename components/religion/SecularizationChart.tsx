"use client";

import { useState } from "react";
import { INDICATORS, type IndicatorId } from "@/lib/religion/secularization-indicators";

export function SecularizationChart() {
  const [id, setId] = useState<IndicatorId>("practice");
  const active = INDICATORS.find((item) => item.id === id)!;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {INDICATORS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === id}
            onClick={() => setId(item.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              item.id === id
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {active.bars.map((bar) => (
          <div key={bar.label}>
            <div className="text-fg-muted mb-1 flex justify-between text-[12px]">
              <span>{bar.label}</span>
              <span>{bar.value}</span>
            </div>
            <div className="bg-bg-elevated h-2 overflow-hidden rounded-full">
              <div className="bg-accent-gold h-full" style={{ width: `${bar.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-fg-secondary mt-4 text-[14.5px] leading-relaxed">{active.note}</p>
    </div>
  );
}
