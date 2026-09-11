"use client";

import { useState } from "react";
import { SVG_LAB_BUTTON_CLASS, SvgFocusCircle } from "@/components/domain/SvgLabFocusRing";
import {
  KIN_PEOPLE,
  KINSHIP_SYSTEMS,
  type KinshipSystemId,
} from "@/lib/anthropology/kinship-systems";
import { LabChip } from "@/components/religion/LabChip";

const ACCENT = "var(--color-accent-gold)";

export function KinshipDiagram() {
  const [system, setSystem] = useState<KinshipSystemId>("eskimo");
  const [activeId, setActiveId] = useState<(typeof KIN_PEOPLE)[number]["id"]>("father");
  const current = KINSHIP_SYSTEMS.find((item) => item.id === system)!;
  const person = KIN_PEOPLE.find((item) => item.id === activeId)!;
  const term = system === "eskimo" ? person.eskimo : person.iroquois;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {KINSHIP_SYSTEMS.map((item) => (
          <LabChip key={item.id} pressed={item.id === system} onClick={() => setSystem(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      <svg
        viewBox="0 0 240 120"
        className="mb-4 h-auto w-full"
        role="group"
        aria-label="亲属称谓示意"
      >
        {KIN_PEOPLE.map((item) => {
          const on = item.id === activeId;
          const label = system === "eskimo" ? item.eskimo : item.iroquois;
          return (
            <g
              key={item.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${item.aria}称谓位置`}
              className={SVG_LAB_BUTTON_CLASS}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveId(item.id);
                }
              }}
            >
              <circle cx={item.x} cy={item.y} r="18" fill="transparent" />
              <SvgFocusCircle cx={item.x} cy={item.y} r={14} />
              <circle
                cx={item.x}
                cy={item.y}
                r={on ? 12 : 10}
                fill="var(--color-bg-elevated)"
                stroke={ACCENT}
                strokeWidth={on ? 2 : 1.2}
              />
              <text
                x={item.x}
                y={item.y + 28}
                textAnchor="middle"
                fill="var(--color-fg-secondary)"
                fontSize="9"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">
        当前系统：{current.label}。选中位置在此系统里叫「{term}」。{current.tease}
      </p>
    </div>
  );
}
