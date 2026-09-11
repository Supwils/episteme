"use client";

import { useState } from "react";
import { RITUAL_STAGES, type RitualStageId } from "@/lib/religion/ritual-stages";

const ACCENT = "var(--color-accent-gold)";

export function RitualLab() {
  const [stage, setStage] = useState<RitualStageId>("separation");
  const active = RITUAL_STAGES.find((item) => item.id === stage)!;
  const index = RITUAL_STAGES.findIndex((item) => item.id === stage);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <svg viewBox="0 0 320 72" className="mb-4 h-auto w-full" role="img" aria-label={active.label}>
        {RITUAL_STAGES.map((item, i) => {
          const x = 40 + i * 110;
          const on = item.id === stage;
          return (
            <g key={item.id}>
              {i < 2 ? (
                <line
                  x1={x + 22}
                  y1="28"
                  x2={x + 88}
                  y2="28"
                  stroke={ACCENT}
                  strokeWidth="1.4"
                  opacity={0.5}
                />
              ) : null}
              <circle
                cx={x}
                cy="28"
                r={on ? 16 : 13}
                fill="var(--color-bg-elevated)"
                stroke={ACCENT}
                strokeWidth={on ? 2 : 1.2}
              />
              <text x={x} y="32" textAnchor="middle" fontSize="11" fill="var(--color-fg-primary)">
                {i + 1}
              </text>
              <text x={x} y="58" textAnchor="middle" fontSize="11" fill="var(--color-fg-secondary)">
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mb-4 flex flex-wrap gap-2">
        {RITUAL_STAGES.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === stage}
            onClick={() => setStage(item.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              item.id === stage
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">{active.note}</p>
      <p className="text-fg-muted mt-2 text-[12.5px]">
        当前步骤 {index + 1} / 3。箭头是分析次序，不是配方。
      </p>
    </div>
  );
}
