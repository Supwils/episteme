"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/subjects/physics/lib/cn";
import { usePrefersReducedMotion } from "@/subjects/physics/scenes-handwritten/shared/usePrefersReducedMotion";

export type DataCardItem = {
  title: string;
  value: string;
  unit?: string;
  description: string;
};

type Props = {
  cards: DataCardItem[];
  className?: string;
};

type ColorScheme = { border: string; glow: string; badge: string };

const DEFAULT_COLORS: ColorScheme = { border: "border-fg-disabled/30", glow: "bg-bg-elevated/30", badge: "bg-fg-disabled/15 text-fg-muted" };

const CATEGORY_COLORS: Record<string, ColorScheme> = {
  scale: { border: "border-accent-cool/40", glow: "bg-accent-cool/8", badge: "bg-accent-cool/20 text-accent-cool" },
  mass: { border: "border-accent-warm/40", glow: "bg-accent-warm/8", badge: "bg-accent-warm/20 text-accent-warm" },
  distance: { border: "border-accent-cool/40", glow: "bg-accent-cool/8", badge: "bg-accent-cool/20 text-accent-cool" },
  time: { border: "border-fg-secondary/40", glow: "bg-fg-secondary/5", badge: "bg-fg-secondary/15 text-fg-secondary" },
  temperature: { border: "border-accent-warm/40", glow: "bg-accent-warm/8", badge: "bg-accent-warm/20 text-accent-warm" },
  energy: { border: "border-accent-warm/40", glow: "bg-accent-warm/8", badge: "bg-accent-warm/20 text-accent-warm" },
  density: { border: "border-accent-cool/40", glow: "bg-accent-cool/8", badge: "bg-accent-cool/20 text-accent-cool" },
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  scale: ["scale", "size", "length", "diameter", "radius", "跨度", "尺度", "直径", "半径"],
  mass: ["mass", "weight", "质量", "重量"],
  distance: ["distance", "range", "distance", "距离", "间距"],
  time: ["time", "age", "period", "duration", "时间", "年龄", "周期"],
  temperature: ["temp", "temperature", "温度"],
  energy: ["energy", "luminosity", "power", "能量", "光度", "亮度"],
  density: ["density", "density", "密度"],
};

function categorize(title: string): string {
  const lower = title.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) return cat;
  }
  return "default";
}

function getColors(title: string): ColorScheme {
  const cat = categorize(title);
  return CATEGORY_COLORS[cat] ?? DEFAULT_COLORS;
}

export function DataCardGrid({ cards, className }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: reducedMotion ? {} : { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 10, scale: reducedMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reducedMotion ? 0 : 0.35, ease: [0.22, 0.61, 0.36, 1] as const },
    },
  };

  return (
    <motion.div
      className={cn("grid grid-cols-1 gap-2 sm:grid-cols-2", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {cards.map((card, idx) => {
        const colors = getColors(card.title);
        const isExpanded = expandedIdx === idx;

        return (
          <motion.article
            key={card.title}
            variants={itemVariants}
            className={cn(
              "group relative flex flex-col border p-3.5 transition-colors duration-300",
              colors.border,
              "hover:border-fg-secondary/60 cursor-pointer",
            )}
            onClick={() => toggle(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(idx);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-fg-muted font-mono text-[11px] tracking-[0.2em] uppercase">
                  {card.title}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span data-num className="text-fg-primary font-mono text-lg tracking-tight tabular-nums md:text-xl">
                    {card.value}
                  </span>
                  {card.unit ? (
                    <span className="text-fg-muted font-mono text-[12px] tracking-tight">
                      {card.unit}
                    </span>
                  ) : null}
                </div>
              </div>
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 inline-block font-mono text-[10px] tracking-wider transition-transform duration-200",
                  "text-fg-disabled",
                  isExpanded ? "rotate-90" : "rotate-0",
                )}
              >
                ▸
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{
                height: { duration: reducedMotion ? 0 : 0.25, ease: [0.22, 0.61, 0.36, 1] },
                opacity: { duration: reducedMotion ? 0 : 0.2 },
              }}
              className="overflow-hidden"
            >
              <p className="text-fg-secondary mt-2 text-[13px] leading-relaxed">
                {card.description}
              </p>
            </motion.div>

            <span
              aria-hidden
              className={cn(
                "absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full",
                categorize(card.title) === "default"
                  ? "bg-fg-secondary/60"
                  : "bg-accent-cool/70",
              )}
            />
          </motion.article>
        );
      })}
    </motion.div>
  );
}
