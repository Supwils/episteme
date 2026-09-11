"use client";

import { useState } from "react";
import { SVG_LAB_BUTTON_CLASS, SvgFocusCircle } from "@/components/domain/SvgLabFocusRing";
import { MATERIAL_REGIONS, type MaterialRegionId } from "@/lib/anthropology/material-regions";

const ACCENT = "var(--color-accent-gold)";

export function MaterialCultureMap() {
  const [activeId, setActiveId] = useState<MaterialRegionId>("andes");
  const active = MATERIAL_REGIONS.find((item) => item.id === activeId)!;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <svg
        viewBox="0 0 240 170"
        className="mb-4 h-auto w-full"
        role="group"
        aria-label="物质文化分布示意，不是遗址坐标"
      >
        <ellipse
          cx="120"
          cy="88"
          rx="102"
          ry="64"
          fill="var(--color-bg-elevated)"
          stroke="var(--color-border-faint)"
        />
        {MATERIAL_REGIONS.map((node) => {
          const on = node.id === activeId;
          return (
            <g
              key={node.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${node.label}示意位置`}
              className={SVG_LAB_BUTTON_CLASS}
              onClick={() => setActiveId(node.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveId(node.id);
                }
              }}
            >
              <circle cx={node.cx} cy={node.cy} r="16" fill="transparent" />
              <SvgFocusCircle cx={node.cx} cy={node.cy} r={12} />
              <circle
                cx={node.cx}
                cy={node.cy}
                r={on ? 9 : 7}
                fill="var(--color-bg-elevated)"
                stroke={ACCENT}
                strokeWidth={on ? 2 : 1.2}
              />
            </g>
          );
        })}
      </svg>
      <p className="text-fg-primary mb-1 text-[15px] font-medium">{active.label}</p>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">{active.note}</p>
    </div>
  );
}
