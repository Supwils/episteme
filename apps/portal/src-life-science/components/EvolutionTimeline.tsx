"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CATEGORY_ACCENTS, PRODUCT_EASE } from "../lib/constants";
import type { EvolutionEvent } from "../lib/types";

interface EvolutionTimelineProps {
  events: EvolutionEvent[];
}

const CATEGORY_LABELS: Record<string, string> = {
  animals: "动物",
  plants: "植物",
  microorganisms: "微生物",
};

export function EvolutionTimeline({ events }: EvolutionTimelineProps) {
  const reduce = useReducedMotion();
  const [zoom, setZoom] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return events;
    return events.filter((e) => e.category === activeCategory);
  }, [events, activeCategory]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => b.dateMYA - a.dateMYA),
    [filtered]
  );

  const maxDate = useMemo(
    () => Math.max(...events.map((e) => e.dateMYA), 1),
    [events]
  );

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z * 1.3, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z / 1.3, 0.5));
  }, []);

  const categories = Object.keys(CATEGORY_LABELS) as Array<
    keyof typeof CATEGORY_LABELS
  >;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 px-4">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-300"
          style={{
            borderColor: activeCategory === null ? "#2a9d8f" : "rgba(255,255,255,0.1)",
            backgroundColor: activeCategory === null ? "rgba(42,157,143,0.15)" : "transparent",
            color: activeCategory === null ? "#2a9d8f" : "#888",
          }}
        >
          全部
        </button>
        {categories.map((cat) => {
          const accent = CATEGORY_ACCENTS[cat] ?? "#2a9d8f";
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(isActive ? null : cat)}
              className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-300"
              style={{
                borderColor: isActive ? accent : "rgba(255,255,255,0.1)",
                backgroundColor: isActive ? `${accent}18` : "transparent",
                color: isActive ? accent : "#888",
              }}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          );
        })}

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleZoomOut}
            className="flex h-7 w-7 items-center justify-center rounded border font-mono text-xs text-[#9ca3af] transition-colors hover:text-[#e8e8f0]"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
            aria-label="缩小"
          >
            −
          </button>
          <span className="font-mono text-[10px] text-[#666]">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="flex h-7 w-7 items-center justify-center rounded border font-mono text-xs text-[#9ca3af] transition-colors hover:text-[#e8e8f0]"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
            aria-label="放大"
          >
            +
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        <div
          className="relative flex items-end gap-0 px-4 py-8"
          style={{
            width: `${Math.max(100, sorted.length * 80 * zoom)}px`,
            minWidth: "100%",
            height: "300px",
          }}
        >
          <div
            className="absolute bottom-8 left-4 right-4 h-[2px]"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />

          {sorted.map((event, i) => {
            const accent = CATEGORY_ACCENTS[event.category] ?? "#2a9d8f";
            const leftPercent = (event.dateMYA / maxDate) * 100;
            const dotSize = 6 + event.significance * 2;

            return (
              <div
                key={event.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${leftPercent}%`,
                  bottom: "32px",
                  transform: "translateX(-50%)",
                }}
              >
                <motion.div
                  initial={reduce ? {} : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: reduce ? 0 : 0.4,
                    delay: reduce ? 0 : i * 0.05,
                    ease: PRODUCT_EASE,
                  }}
                  className="group relative flex cursor-pointer flex-col items-center"
                >
                  <div
                    className="mb-2 hidden max-w-[120px] text-center group-hover:block"
                  >
                    <p className="text-[0.75rem] font-medium text-[#e8e8f0]">
                      {event.name}
                    </p>
                    <p className="font-mono text-[9px] text-[#888]">
                      {event.dateDisplay}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-tight text-[#9ca3af]">
                      {event.description}
                    </p>
                  </div>

                  <div
                    className="rounded-full border"
                    style={{
                      width: `${dotSize}px`,
                      height: `${dotSize}px`,
                      backgroundColor: accent,
                      borderColor: `${accent}40`,
                      boxShadow: `0 0 8px ${accent}40`,
                    }}
                  />

                  <div
                    className="mt-1 h-8 w-[1px]"
                    style={{ backgroundColor: `${accent}30` }}
                  />

                  <span className="mt-0.5 font-mono text-[8px] text-[#666]">
                    {event.dateDisplay}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
