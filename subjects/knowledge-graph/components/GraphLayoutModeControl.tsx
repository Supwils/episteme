"use client";

import { clsx } from "clsx";
import type { GraphLayoutMode } from "../lib/cognitive-layout";

const MODES: readonly { id: GraphLayoutMode; label: string }[] = [
  { id: "force", label: "关系" },
  { id: "cluster", label: "学科" },
  { id: "cognitive", label: "阶段" },
  { id: "spatial", label: "空间" },
];

export function GraphLayoutModeControl({
  value,
  onChange,
}: {
  value: GraphLayoutMode;
  onChange: (mode: GraphLayoutMode) => void;
}) {
  return (
    <div
      className="border-border-faint flex h-8 items-stretch border"
      role="group"
      aria-label="图谱布局模式"
    >
      {MODES.map((mode) => {
        const active = mode.id === value;
        return (
          <button
            key={mode.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(mode.id)}
            className={clsx(
              "border-border-faint min-w-10 border-r px-1.5 text-[11px] transition-colors last:border-r-0 sm:min-w-11 sm:px-2",
              active
                ? "text-fg-primary bg-indigo-500/15"
                : "text-fg-muted hover:text-fg-primary/65 hover:bg-[var(--input-bg)]"
            )}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
