"use client";

import { useState } from "react";
import { SVG_LAB_BUTTON_CLASS, SvgFocusCircle } from "@/components/domain/SvgLabFocusRing";
import { RECIPROCITY_MODES, type ReciprocityId } from "@/lib/anthropology/reciprocity-modes";
import { LabChip } from "@/components/religion/LabChip";

const ACCENT = "var(--color-accent-gold)";

export function ReciprocityLab() {
  const [mode, setMode] = useState<ReciprocityId>("balanced");
  const current = RECIPROCITY_MODES.find((item) => item.id === mode)!;
  const index = RECIPROCITY_MODES.findIndex((item) => item.id === mode);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {RECIPROCITY_MODES.map((item) => (
          <LabChip key={item.id} pressed={item.id === mode} onClick={() => setMode(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      <svg viewBox="0 0 320 72" className="mb-4 h-auto w-full" role="group" aria-label="互惠三型">
        {RECIPROCITY_MODES.slice(0, -1).map((_, i) => {
          const x = 40 + i * 110;
          return (
            <line
              key={`link-${i}`}
              x1={x + 22}
              y1="28"
              x2={x + 88}
              y2="28"
              stroke={ACCENT}
              strokeWidth="1.4"
              opacity={0.5}
              pointerEvents="none"
            />
          );
        })}
        {RECIPROCITY_MODES.map((item, i) => {
          const x = 40 + i * 110;
          const on = item.id === mode;
          return (
            <g
              key={item.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`第${i + 1}型：${item.label}`}
              className={SVG_LAB_BUTTON_CLASS}
              onClick={() => setMode(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setMode(item.id);
                }
              }}
            >
              <circle cx={x} cy="28" r="22" fill="transparent" />
              <SvgFocusCircle cx={x} cy={28} r={20} />
              <circle
                cx={x}
                cy="28"
                r={on ? 16 : 13}
                fill="var(--color-bg-elevated)"
                stroke={ACCENT}
                strokeWidth={on ? 2 : 1.2}
              />
              <text x={x} y="58" textAnchor="middle" fill="var(--color-fg-secondary)" fontSize="10">
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">
        当前是第{index + 1}型。{current.tease}
      </p>
    </div>
  );
}
