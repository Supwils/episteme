"use client";

import { useState } from "react";
import { SPACE_VIEWS, type SpaceView } from "@/lib/arts/space-views";

export function SpaceExplorer() {
  const [view, setView] = useState<SpaceView>("plan");
  const current = SPACE_VIEWS.find((item) => item.id === view)!;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <svg
        viewBox="0 0 240 150"
        className="mb-4 h-auto w-full"
        role="img"
        aria-label={`三开间厅堂的${current.name}`}
      >
        {view === "plan" ? <Plan /> : view === "section" ? <Section /> : <Axon />}
      </svg>
      <div className="mb-4 flex flex-wrap gap-2">
        {SPACE_VIEWS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === view}
            onClick={() => setView(item.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              item.id === view
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">{current.what}</p>
    </div>
  );
}

function Plan() {
  return (
    <g stroke="#b0785a" fill="none" strokeWidth="1.6">
      <rect x="30" y="30" width="180" height="90" />
      <line x1="90" y1="30" x2="90" y2="120" />
      <line x1="150" y1="30" x2="150" y2="120" />
      <circle cx="120" cy="120" r="3" fill="#c25b5b" stroke="none" />
    </g>
  );
}

function Section() {
  return (
    <g stroke="#b0785a" fill="none" strokeWidth="1.6">
      <polyline points="30,120 30,50 120,18 210,50 210,120" />
      <line x1="30" y1="120" x2="210" y2="120" />
      <rect x="108" y="70" width="24" height="50" />
    </g>
  );
}

function Axon() {
  return (
    <g stroke="#b0785a" fill="none" strokeWidth="1.4">
      <polygon points="50,110 120,90 200,110 130,130" />
      <polyline points="50,110 50,55 120,35 200,55 200,110" />
      <line x1="120" y1="35" x2="120" y2="90" />
    </g>
  );
}
