"use client";

import { useState } from "react";
import { SVG_LAB_BUTTON_CLASS, SvgFocusCircle } from "@/components/domain/SvgLabFocusRing";
import {
  RITUAL_CASES,
  RITUAL_STAGES,
  type RitualCaseId,
  type RitualStageId,
} from "@/lib/religion/ritual-stages";
import { LabChip } from "./LabChip";

const ACCENT = "var(--color-accent-gold)";

export function RitualLab() {
  const [caseId, setCaseId] = useState<RitualCaseId>("graduation");
  const [stage, setStage] = useState<RitualStageId>("separation");
  const currentCase = RITUAL_CASES.find((item) => item.id === caseId)!;
  const currentStage = RITUAL_STAGES.find((item) => item.id === stage)!;
  const index = RITUAL_STAGES.findIndex((item) => item.id === stage);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {RITUAL_CASES.map((item) => (
          <LabChip key={item.id} pressed={item.id === caseId} onClick={() => setCaseId(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      <svg viewBox="0 0 320 72" className="mb-4 h-auto w-full" role="group" aria-label="仪式三阶段">
        {RITUAL_STAGES.slice(0, -1).map((_, i) => {
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
        {RITUAL_STAGES.map((item, i) => {
          const x = 40 + i * 110;
          const on = item.id === stage;
          return (
            <g
              key={item.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`第${i + 1}步：${item.label}`}
              className={SVG_LAB_BUTTON_CLASS}
              onClick={() => setStage(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setStage(item.id);
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
          <LabChip key={item.id} pressed={item.id === stage} onClick={() => setStage(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      <p className="text-fg-muted text-[12.5px] leading-relaxed">{currentCase.why}</p>
      <p className="text-fg-secondary mt-3 text-[14.5px] leading-relaxed">{currentStage.note}</p>
      <p className="text-fg-secondary mt-2 text-[14.5px] leading-relaxed">
        {currentCase.stages[stage]}
      </p>
      <p className="text-fg-muted mt-2 text-[12.5px]">
        当前步骤 {index + 1} / 3。箭头是分析次序，不是配方。
      </p>
    </div>
  );
}
