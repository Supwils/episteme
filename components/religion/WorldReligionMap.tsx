"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SVG_LAB_BUTTON_CLASS, SvgFocusCircle } from "@/components/domain/SvgLabFocusRing";
import {
  EPOCH_LABELS,
  TRADITION_NODES,
  traditionsInEpoch,
  type EpochId,
} from "@/lib/religion/world-map-data";
import { LabChip } from "./LabChip";

const ACCENT = "var(--color-accent-gold)";

export function WorldReligionMap() {
  const [epoch, setEpoch] = useState<EpochId>("ancient");
  const visible = traditionsInEpoch(epoch);
  const [selectedId, setSelectedId] = useState(visible[0]!.id);
  const selected = useMemo(() => {
    const hit = visible.find((node) => node.id === selectedId);
    return hit ?? visible[0]!;
  }, [selectedId, visible]);

  return (
    <div className="border-border-faint bg-bg-near rounded-2xl border p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {EPOCH_LABELS.map((item) => (
          <LabChip
            key={item.id}
            pressed={item.id === epoch}
            onClick={() => {
              setEpoch(item.id);
              const next = traditionsInEpoch(item.id)[0];
              if (next) setSelectedId(next.id);
            }}
          >
            {item.label}
          </LabChip>
        ))}
      </div>
      <svg viewBox="0 0 360 152" className="mb-4 h-auto w-full" role="group" aria-label="示意位置">
        {visible.map((node) => {
          const on = node.id === selected.id;
          return (
            <g
              key={node.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${node.label}示意位置`}
              className={SVG_LAB_BUTTON_CLASS}
              onClick={() => setSelectedId(node.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedId(node.id);
                }
              }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={on ? 11 : 8}
                fill={on ? ACCENT : "var(--color-bg-elevated)"}
                stroke={ACCENT}
                strokeWidth={on ? 2 : 1}
                opacity={on ? 0.95 : 0.45}
              />
              <SvgFocusCircle cx={node.x} cy={node.y} r={on ? 14 : 11} />
              <text
                x={node.x}
                y={node.y + 22}
                textAnchor="middle"
                fontSize="10"
                fill="var(--color-fg-muted)"
              >
                {node.region}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="grid gap-2 sm:grid-cols-2">
        {visible.map((node) => (
          <li key={node.id}>
            <button
              type="button"
              aria-label={node.label}
              aria-pressed={node.id === selected.id}
              onClick={() => setSelectedId(node.id)}
              className="border-border-faint text-fg-primary w-full rounded-xl border px-3 py-2 text-left text-[13.5px]"
            >
              {node.label}
              <span className="text-fg-muted mt-1 block text-[12px]">{node.region}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="border-border-faint mt-4 rounded-xl border p-4" aria-live="polite">
        <p className="text-fg-primary text-[14.5px] leading-relaxed">{selected.note}</p>
        <p className="mt-3 text-[13.5px]">
          <Link href={selected.href} className="text-accent-gold hover:underline">
            {selected.hrefLabel} →
          </Link>
        </p>
      </div>
      <p className="text-fg-muted mt-4 text-[12.5px]">
        共 {TRADITION_NODES.length} 条示意传统。椭圆不是地球，数字不是普查。
      </p>
    </div>
  );
}
