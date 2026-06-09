"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { TimelineEvent } from "@/src-philosophy/lib/timeline-data";
import { CATEGORY_ICONS, formatYear } from "@/src-philosophy/lib/timeline-data";
import { PRODUCT_EASE } from "@/src-philosophy/lib/constants";

const SIGNIFICANCE_STYLES: Record<1 | 2 | 3, { dot: string; glow: string }> = {
  1: { dot: "bg-accent-gold", glow: "shadow-[0_0_8px_rgba(200,164,90,0.5)]" },
  2: { dot: "bg-accent-sage", glow: "shadow-[0_0_6px_rgba(122,170,138,0.35)]" },
  3: { dot: "bg-fg-disabled", glow: "shadow-none" },
};

const SIGNIFICANCE_LABELS: Record<1 | 2 | 3, string> = {
  1: "里程碑",
  2: "重要",
  3: "相关",
};

export function TimelineCard({
  event,
  index,
  delay,
  reduce,
  onFigureClick,
  activeFigure,
}: {
  event: TimelineEvent;
  index: number;
  delay: number;
  reduce: boolean;
  onFigureClick: (name: string) => void;
  activeFigure: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  const sigStyles = SIGNIFICANCE_STYLES[event.significance];

  return (
    <div
      ref={ref}
      className={`relative mb-8 flex items-start pl-10 md:mb-10 md:pl-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <span
        className={`absolute left-4 top-2 z-10 h-[11px] w-[11px] -translate-x-1/2 rounded-full border-2 border-bg-deep ${sigStyles.dot} ${sigStyles.glow} md:left-1/2`}
        aria-hidden
      />

      <motion.div
        className={`w-full md:w-[calc(50%-2rem)] ${
          isLeft ? "md:pr-0 md:mr-auto" : "md:pl-0 md:ml-auto"
        }`}
        initial={{ opacity: 0, x: isLeft ? -24 : 24, y: 8 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{
          duration: reduce ? 0 : 0.55,
          delay: reduce ? 0 : 0.05,
          ease: PRODUCT_EASE,
        }}
      >
        <div className="border-border-faint bg-bg-near hover:bg-bg-elevated group border p-5 transition-colors duration-300">
          <div className="mb-2 flex items-center gap-3">
            <span
              data-num
              className="text-accent-gold font-mono text-xl font-semibold leading-none tracking-tight"
            >
              {formatYear(event.year)}
            </span>

            <span className="bg-bg-elevated text-fg-muted flex items-center gap-1 px-2 py-0.5 font-mono text-[9px] tracking-[0.2em]">
              <span className="text-xs">{CATEGORY_ICONS[event.category]}</span>
              {event.category}
            </span>

            {event.significance === 1 && (
              <span className="text-accent-gold/60 font-mono text-[8px] tracking-[0.2em] uppercase">
                ★ landmark
              </span>
            )}

            {event.significance === 3 && (
              <span className="text-fg-disabled font-mono text-[8px] tracking-[0.2em] uppercase">
                {SIGNIFICANCE_LABELS[3]}
              </span>
            )}
          </div>

          <h3 className="font-display text-fg-primary mb-2 text-base font-semibold leading-snug">
            {event.title}
          </h3>

          <p className="text-fg-secondary mb-3 text-sm leading-relaxed">{event.description}</p>

          {event.figures.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {event.figures.map((name) => {
                const isActive = activeFigure === name;
                return (
                  <button
                    key={name}
                    onClick={() => onFigureClick(name)}
                    className={`border px-2 py-0.5 font-mono text-[9px] tracking-[0.18em] transition-all duration-200 ${
                      isActive
                        ? "border-accent-sage/50 bg-accent-sage/10 text-accent-sage"
                        : "border-fg-disabled/20 text-fg-muted hover:border-fg-disabled/40 hover:text-fg-secondary"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      <div
        className={`absolute top-[14px] hidden h-px w-8 bg-accent-gold/15 md:block ${
          isLeft ? "right-1/2 mr-[6px]" : "left-1/2 ml-[6px]"
        }`}
        aria-hidden
      />
    </div>
  );
}
