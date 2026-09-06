"use client";

import { useState } from "react";
import { PIGMENT_LAYERS } from "@/lib/arts/pigment-layers";

const COLORS = ["#d8c48c", "#8b3a2a", "#c47848", "#d4c4a8", "#c4a484"];

export function PigmentProfile() {
  const [activeId, setActiveId] = useState(PIGMENT_LAYERS[2]!.id);
  const active = PIGMENT_LAYERS.find((layer) => layer.id === activeId)!;
  const activeIndex = PIGMENT_LAYERS.findIndex((layer) => layer.id === activeId);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <svg
        viewBox="0 0 220 160"
        className="mb-4 h-auto w-full"
        role="img"
        aria-label="油画层位剖面"
      >
        {PIGMENT_LAYERS.map((layer, index) => (
          <rect
            key={layer.id}
            x="40"
            y={16 + index * 26}
            width="140"
            height="24"
            fill={COLORS[index]}
            stroke={index === activeIndex ? "var(--color-fg-primary)" : "var(--color-border-faint)"}
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className="mb-4 flex flex-wrap gap-2">
        {PIGMENT_LAYERS.map((layer) => (
          <button
            key={layer.id}
            type="button"
            aria-pressed={layer.id === activeId}
            onClick={() => setActiveId(layer.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              layer.id === activeId
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {layer.name}
          </button>
        ))}
      </div>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">{active.what}</p>
    </div>
  );
}
