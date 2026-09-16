"use client";

import { useState } from "react";
import { SVG_LAB_BUTTON_CLASS, SvgFocusRect } from "@/components/domain/SvgLabFocusRing";
import {
  SCORE_CASES,
  SCORE_PARTS,
  scorePartValue,
  type ScoreCaseId,
  type ScorePartId,
} from "@/lib/education/score-parts";
import { LabChip } from "@/components/religion/LabChip";

const ACCENT = "var(--color-accent-gold)";

export function ScoreDecomposer() {
  const [caseId, setCaseId] = useState<ScoreCaseId>("alpha");
  const [partId, setPartId] = useState<ScorePartId>("construct");
  const currentCase = SCORE_CASES.find((item) => item.id === caseId)!;
  const currentPart = SCORE_PARTS.find((item) => item.id === partId)!;
  let cursor = 16;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {SCORE_CASES.map((item) => (
          <LabChip key={item.id} pressed={item.id === caseId} onClick={() => setCaseId(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      <svg
        viewBox="0 0 320 72"
        className="mb-4 h-auto w-full"
        role="group"
        aria-label="示意分数零件"
      >
        {SCORE_PARTS.map((part, index) => {
          const value = scorePartValue(part, caseId);
          const width = Math.max(8, Math.round((value / currentCase.total) * 288));
          const x = cursor;
          cursor += width;
          const on = part.id === partId;
          return (
            <g
              key={part.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${part.label}，约 ${value}`}
              className={SVG_LAB_BUTTON_CLASS}
              onClick={() => setPartId(part.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setPartId(part.id);
                }
              }}
            >
              <SvgFocusRect x={x} y={18} width={width} height={28} />
              <rect
                x={x}
                y={22}
                width={width - 2}
                height={20}
                rx="3"
                fill="var(--color-bg-elevated)"
                stroke={ACCENT}
                strokeWidth={on ? 2 : 1}
                opacity={0.55 + index * 0.12}
              />
            </g>
          );
        })}
        <text x="16" y="62" fill="var(--color-fg-secondary)" fontSize="10">
          示意总分 {currentCase.total}。点一块看它声称在测什么。
        </text>
      </svg>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">
        {currentCase.tease} {currentPart.label}：{currentPart.tease}
      </p>
    </div>
  );
}
