"use client";

import { useMemo, useState } from "react";
import {
  TRADITION_EPOCHS,
  TRADITION_NODES,
  traditionsInEpoch,
  type TraditionEpoch,
} from "@/lib/literature/world-traditions-map";

const ACCENT = "var(--color-accent-gold)";

export function WorldTraditionsMap() {
  const [epoch, setEpoch] = useState<TraditionEpoch>("ancient");
  const visible = useMemo(() => traditionsInEpoch(epoch), [epoch]);
  const visibleIds = useMemo(() => new Set(visible.map((node) => node.id)), [visible]);
  const [activeId, setActiveId] = useState(visible[0]?.id ?? "homer");
  const active = visible.find((node) => node.id === activeId) ?? visible[0] ?? TRADITION_NODES[0]!;

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <svg
        viewBox="0 0 240 170"
        className="mb-4 h-auto w-full"
        role="img"
        aria-label="世界文学传统示意，不是精确底图"
      >
        <ellipse
          cx="120"
          cy="88"
          rx="102"
          ry="64"
          fill="var(--color-bg-elevated)"
          stroke="var(--color-border-faint)"
        />
        {TRADITION_NODES.map((node) => {
          const on = visibleIds.has(node.id);
          return (
            <g key={node.id} opacity={on ? 1 : 0.22}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.id === active.id ? 6 : 4}
                fill={on ? ACCENT : "var(--color-fg-muted)"}
              />
              <text x={node.x + 8} y={node.y + 4} fontSize="9" fill="var(--color-fg-secondary)">
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mb-3 flex flex-wrap gap-2">
        {TRADITION_EPOCHS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === epoch}
            onClick={() => {
              setEpoch(item.id);
              const next = traditionsInEpoch(item.id)[0];
              if (next) setActiveId(next.id);
            }}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              item.id === epoch
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {visible.map((node) => (
          <button
            key={node.id}
            type="button"
            aria-pressed={node.id === active.id}
            onClick={() => setActiveId(node.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] ${
              node.id === active.id
                ? "border-fg-secondary text-fg-primary bg-bg-elevated"
                : "border-border-faint text-fg-muted"
            }`}
          >
            {node.label}
          </button>
        ))}
      </div>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed">{active.note}</p>
    </div>
  );
}
