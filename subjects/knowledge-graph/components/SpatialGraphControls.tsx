"use client";

import { clsx } from "clsx";
import type { GraphNode } from "../data/types";
import { ALL_DOMAINS, DOMAIN_COLORS } from "../lib/constants";
import { normalizeSpatialRotation } from "../lib/spatial-layout";
import { DOMAIN_META } from "./detail-panel/constants";

type SpatialGraphControlsProps = {
  rotation: number;
  frontDomainId: GraphNode["domain"];
  activeDomains: ReadonlySet<string>;
  onRotationChange: (rotation: number) => void;
  onFocusDomain: (domainId: GraphNode["domain"]) => void;
  isMobile: boolean;
};

function RotationIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={clsx("h-4 w-4", direction === "right" && "-scale-x-100")}
      aria-hidden="true"
    >
      <path d="M14.6 6.2A6.2 6.2 0 104.1 13" strokeLinecap="round" />
      <path d="M14.7 2.9v3.6h-3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SpatialGraphControls({
  rotation,
  frontDomainId,
  activeDomains,
  onRotationChange,
  onFocusDomain,
  isMobile,
}: SpatialGraphControlsProps) {
  const normalized = normalizeSpatialRotation(rotation);

  return (
    <div
      data-testid="spatial-graph-controls"
      data-rotation={normalized}
      className={clsx(
        "border-border-faint bg-bg-overlay absolute top-2 left-2 z-50 flex max-w-[calc(100%-1rem)] items-center border shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        isMobile ? "h-9" : "h-10"
      )}
    >
      <span
        className="h-full w-1 shrink-0"
        style={{ backgroundColor: DOMAIN_COLORS[frontDomainId] }}
        aria-hidden="true"
      />
      <label className="border-border-faint flex h-full min-w-0 items-center gap-2 border-r px-2.5">
        <span className="text-fg-muted hidden text-[10px] sm:inline">正面</span>
        <select
          aria-label="空间图谱正面学科"
          value={frontDomainId}
          onChange={(event) => onFocusDomain(event.target.value as GraphNode["domain"])}
          className="text-fg-secondary max-w-28 bg-transparent text-[11px] outline-none sm:max-w-36"
        >
          {ALL_DOMAINS.map((domainId) => (
            <option
              key={domainId}
              value={domainId}
              disabled={!activeDomains.has(domainId) && domainId !== frontDomainId}
              className="bg-bg-floating text-fg-primary"
            >
              {DOMAIN_META[domainId].label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={() => onRotationChange(normalized - 24)}
        className="text-fg-muted hover:text-fg-primary flex h-full w-9 shrink-0 items-center justify-center transition-colors hover:bg-[var(--input-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
        aria-label="向左旋转空间图谱"
      >
        <RotationIcon direction="left" />
      </button>
      <input
        type="range"
        min="-180"
        max="180"
        step="2"
        value={normalized}
        onChange={(event) => onRotationChange(Number(event.target.value))}
        className="hidden w-24 accent-indigo-400 sm:block md:w-32"
        aria-label="空间图谱旋转角度"
      />
      <button
        type="button"
        onClick={() => onRotationChange(normalized + 24)}
        className="text-fg-muted hover:text-fg-primary flex h-full w-9 shrink-0 items-center justify-center transition-colors hover:bg-[var(--input-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
        aria-label="向右旋转空间图谱"
      >
        <RotationIcon direction="right" />
      </button>
    </div>
  );
}
