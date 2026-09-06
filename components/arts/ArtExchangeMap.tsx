"use client";

import { useState } from "react";
import { EXCHANGE_ROUTES } from "@/lib/arts/exchange-routes";

export function ArtExchangeMap() {
  const [activeId, setActiveId] = useState(EXCHANGE_ROUTES[0]!.id);
  const active = EXCHANGE_ROUTES.find((route) => route.id === activeId)!;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <svg
        viewBox="0 0 240 160"
        className="mb-4 h-auto w-full"
        role="img"
        aria-label="全球艺术交流示意，不是精确底图"
      >
        <ellipse
          cx="120"
          cy="80"
          rx="96"
          ry="52"
          fill="var(--color-bg-elevated)"
          stroke="var(--color-border-faint)"
        />
        {EXCHANGE_ROUTES.map((route) => (
          <line
            key={route.id}
            x1={route.from.x}
            y1={route.from.y}
            x2={route.to.x}
            y2={route.to.y}
            stroke={route.id === activeId ? "#b0785a" : "var(--color-fg-muted)"}
            strokeWidth={route.id === activeId ? 2.4 : 1.2}
          />
        ))}
      </svg>
      <div className="mb-4 flex flex-wrap gap-2">
        {EXCHANGE_ROUTES.map((route) => (
          <button
            key={route.id}
            type="button"
            aria-pressed={route.id === activeId}
            onClick={() => setActiveId(route.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              route.id === activeId
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {route.name}
          </button>
        ))}
      </div>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">{active.what}</p>
    </div>
  );
}
