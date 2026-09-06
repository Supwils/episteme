"use client";

import { useMemo, useState } from "react";
import {
  DISCOURSE_MODES,
  discourseSequence,
  type DiscourseMode,
} from "@/lib/literature/narrative-order";

const ACCENT = "var(--color-accent-gold)";

export function NarrativeGraph() {
  const [mode, setMode] = useState<DiscourseMode>("chronological");
  const events = useMemo(() => discourseSequence(mode), [mode]);
  const active = DISCOURSE_MODES.find((item) => item.id === mode)!;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <svg
        viewBox="0 0 320 88"
        className="mb-4 h-auto w-full"
        role="img"
        aria-label={`守株待兔的${active.label}`}
      >
        {events.map((event, index) => {
          const x = 28 + index * 84;
          return (
            <g key={event.id}>
              {index < events.length - 1 ? (
                <line
                  x1={x + 22}
                  y1="34"
                  x2={x + 62}
                  y2="34"
                  stroke={ACCENT}
                  strokeWidth="1.6"
                  markerEnd="url(#arrow)"
                />
              ) : null}
              <circle cx={x} cy="34" r="16" fill="var(--color-bg-elevated)" stroke={ACCENT} />
              <text x={x} y="38" textAnchor="middle" fontSize="11" fill="var(--color-fg-primary)">
                {event.storyIndex}
              </text>
              <text x={x} y="72" textAnchor="middle" fontSize="11" fill="var(--color-fg-secondary)">
                {event.shortLabel}
              </text>
            </g>
          );
        })}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill={ACCENT} />
          </marker>
        </defs>
      </svg>
      <div className="mb-4 flex flex-wrap gap-2">
        {DISCOURSE_MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === mode}
            onClick={() => setMode(item.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              item.id === mode
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
        圆圈里的数字是情节事件的先后，箭头是讲述顺序。两套次序可以错开。
      </p>
    </div>
  );
}
