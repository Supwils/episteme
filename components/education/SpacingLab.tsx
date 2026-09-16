"use client";

import { useState } from "react";
import { SPACING_SCHEDULES, type SpacingId } from "@/lib/education/spacing-schedules";
import { LabChip } from "@/components/religion/LabChip";

const ACCENT = "var(--color-accent-gold)";

export function SpacingLab() {
  const [id, setId] = useState<SpacingId>("massed");
  const current = SPACING_SCHEDULES.find((item) => item.id === id)!;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {SPACING_SCHEDULES.map((item) => (
          <LabChip key={item.id} pressed={item.id === id} onClick={() => setId(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      <svg
        viewBox="0 0 320 120"
        className="mb-4 h-auto w-full"
        role="img"
        aria-label={`当前为${current.label}。即时表现约 ${current.immediate}，延迟保持约 ${current.delayed}。`}
      >
        {(
          [
            ["即时表现", current.immediate, 36, 0.55],
            ["延迟保持", current.delayed, 84, 1],
          ] as const
        ).map(([label, value, y, opacity]) => (
          <g key={label}>
            <text x="16" y={y - 8} fill="var(--color-fg-secondary)" fontSize="10">
              {label}
            </text>
            <rect x="16" y={y} width="288" height="10" rx="3" fill="var(--color-bg-elevated)" />
            <rect
              x="16"
              y={y}
              width={Math.round((value / 100) * 288)}
              height="10"
              rx="3"
              fill={ACCENT}
              opacity={opacity}
            />
          </g>
        ))}
      </svg>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">{current.tease}</p>
    </div>
  );
}
