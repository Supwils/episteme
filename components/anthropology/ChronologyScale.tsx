"use client";

import { useState } from "react";
import { SVG_LAB_BUTTON_CLASS, SvgFocusCircle } from "@/components/domain/SvgLabFocusRing";
import {
  CHRONOLOGY_BANDS,
  CHRONOLOGY_MODES,
  type ChronologyMode,
} from "@/lib/anthropology/chronology-scales";
import { LabChip } from "@/components/religion/LabChip";

const ACCENT = "var(--color-accent-gold)";

export function ChronologyScale() {
  const [mode, setMode] = useState<ChronologyMode>("relative");
  const [bandId, setBandId] = useState<(typeof CHRONOLOGY_BANDS)[number]["id"]>("mid");
  const currentMode = CHRONOLOGY_MODES.find((item) => item.id === mode)!;
  const band = CHRONOLOGY_BANDS.find((item) => item.id === bandId)!;
  const reading = mode === "relative" ? band.relative : band.absolute;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {CHRONOLOGY_MODES.map((item) => (
          <LabChip key={item.id} pressed={item.id === mode} onClick={() => setMode(item.id)}>
            {item.label}
          </LabChip>
        ))}
      </div>
      <svg
        viewBox="0 0 320 90"
        className="mb-4 h-auto w-full"
        role="group"
        aria-label="史前年代标尺"
      >
        {CHRONOLOGY_BANDS.map((item, index) => {
          const y = 18 + index * 24;
          const on = item.id === bandId;
          return (
            <g
              key={item.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${item.label}层`}
              className={SVG_LAB_BUTTON_CLASS}
              onClick={() => setBandId(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setBandId(item.id);
                }
              }}
            >
              <rect x="24" y={y - 10} width="272" height="20" fill="transparent" />
              <SvgFocusCircle cx={36} cy={y} r={9} />
              <rect
                x="48"
                y={y - 8}
                width="232"
                height="16"
                rx="4"
                fill="var(--color-bg-elevated)"
                stroke={ACCENT}
                strokeWidth={on ? 2 : 1}
                opacity={on ? 1 : 0.7}
              />
              <text x="56" y={y + 4} fill="var(--color-fg-secondary)" fontSize="10">
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">
        {currentMode.tease} 当前层：{band.label}。{reading}。
      </p>
    </div>
  );
}
