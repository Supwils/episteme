"use client";

import { useState } from "react";
import { SVG_LAB_BUTTON_CLASS, SvgFocusCircle } from "@/components/domain/SvgLabFocusRing";
import { TALK_MODES, TALK_TURNS, type TalkId } from "@/lib/education/classroom-turns";
import { LabChip } from "@/components/religion/LabChip";

const ACCENT = "var(--color-accent-gold)";

export function ClassroomTalkLab() {
  const [mode, setMode] = useState<TalkId>("ire");
  const [turnId, setTurnId] = useState("i");
  const turns = TALK_TURNS[mode];
  const currentMode = TALK_MODES.find((item) => item.id === mode)!;
  const current = turns.find((item) => item.id === turnId) ?? turns[0]!;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {TALK_MODES.map((item) => (
          <LabChip
            key={item.id}
            pressed={item.id === mode}
            onClick={() => {
              setMode(item.id);
              setTurnId(TALK_TURNS[item.id][0]!.id);
            }}
          >
            {item.label}
          </LabChip>
        ))}
      </div>
      <svg viewBox="0 0 320 88" className="mb-4 h-auto w-full" role="group" aria-label="课堂话轮">
        {turns.slice(0, -1).map((_, i) => {
          const x = 48 + i * 110;
          return (
            <line
              key={`link-${i}`}
              x1={x + 22}
              y1="32"
              x2={x + 88}
              y2="32"
              stroke={ACCENT}
              strokeWidth="1.4"
              opacity={0.45}
              pointerEvents="none"
            />
          );
        })}
        {turns.map((item, i) => {
          const x = 48 + i * 110;
          const on = item.id === current.id;
          return (
            <g
              key={item.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${item.speaker}：${item.label}`}
              className={SVG_LAB_BUTTON_CLASS}
              onClick={() => setTurnId(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setTurnId(item.id);
                }
              }}
            >
              <circle cx={x} cy="32" r="22" fill="transparent" />
              <SvgFocusCircle cx={x} cy={32} r={20} />
              <circle
                cx={x}
                cy="32"
                r={on ? 16 : 13}
                fill="var(--color-bg-elevated)"
                stroke={ACCENT}
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
        {currentMode.tease} 当前话轮：{current.speaker}，{current.text}
      </p>
    </div>
  );
}
