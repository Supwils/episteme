"use client";

import { useState } from "react";
import { SVG_LAB_BUTTON_CLASS, SvgFocusCircle } from "@/components/domain/SvgLabFocusRing";
import {
  PATH_LENSES,
  PATH_NODES,
  type PathLensId,
  type PathNodeId,
} from "@/lib/education/adaptive-paths";
import { LabChip } from "@/components/religion/LabChip";

const ACCENT = "var(--color-accent-gold)";

export function AdaptivePathLab() {
  const [lens, setLens] = useState<PathLensId>("tutor");
  const [nodeId, setNodeId] = useState<PathNodeId>("green");
  const currentLens = PATH_LENSES.find((item) => item.id === lens)!;
  const current = PATH_NODES.find((item) => item.id === nodeId)!;
  const reading = lens === "tutor" ? current.tutor : current.system;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {PATH_LENSES.map((item) => (
          <LabChip key={item.id} pressed={item.id === lens} onClick={() => setLens(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      <svg
        viewBox="0 0 320 88"
        className="mb-4 h-auto w-full"
        role="group"
        aria-label="自适应路径示意"
      >
        {PATH_NODES.slice(0, -1).map((_, i) => {
          const x = 36 + i * 82;
          return (
            <line
              key={`link-${i}`}
              x1={x + 18}
              y1="32"
              x2={x + 64}
              y2="32"
              stroke={ACCENT}
              strokeWidth="1.4"
              opacity={0.45}
              pointerEvents="none"
            />
          );
        })}
        {PATH_NODES.map((item, i) => {
          const x = 36 + i * 82;
          const on = item.id === nodeId;
          return (
            <g
              key={item.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={item.label}
              className={SVG_LAB_BUTTON_CLASS}
              onClick={() => setNodeId(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setNodeId(item.id);
                }
              }}
            >
              <circle cx={x} cy="32" r="20" fill="transparent" />
              <SvgFocusCircle cx={x} cy={32} r={18} />
              <circle
                cx={x}
                cy="32"
                r={on ? 15 : 12}
                fill="var(--color-bg-elevated)"
                stroke={item.id === "green" ? ACCENT : "var(--color-fg-secondary)"}
                strokeWidth={on ? 2 : 1.2}
              />
              <text x={x} y="64" textAnchor="middle" fill="var(--color-fg-secondary)" fontSize="10">
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">
        {currentLens.tease} 当前：{current.label}。{reading}
      </p>
    </div>
  );
}
