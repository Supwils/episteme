"use client";

import { motion } from "framer-motion";
import { PRODUCT_EASE } from "@/subjects/philosophy/lib/constants";

export { TimelineCard } from "./TimelineCard";
export { EraHeader, EraDivider } from "./EraDecorations";

export function TimelinePageHeader({
  stats,
  d,
}: {
  stats: { total: number; eras: number; figures: number };
  d: (sec: number) => number;
}) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pt-24 pb-8">
      <motion.p
        className="text-fg-muted font-mono text-[10px] tracking-[0.42em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: d(0.2) }}
      >
        universe · knowledge / philosophy / timeline
      </motion.p>

      <div className="mt-4 flex items-end gap-6">
        <motion.h1
          className="font-display text-fg-primary text-[2.4rem] leading-[1.05] tracking-tight md:text-[3.2rem]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: d(0.3), ease: PRODUCT_EASE }}
        >
          思想的<em className="text-accent-gold italic"> 时间线</em>
        </motion.h1>

        <motion.div
          className="bg-accent-gold/30 mb-1 hidden h-10 w-px md:block"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: d(0.5), ease: PRODUCT_EASE }}
          style={{ transformOrigin: "bottom" }}
        />
      </div>

      <motion.p
        className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: d(0.5) }}
      >
        从公元前600年泰勒斯的自然追问到2025年AI意识的哲学辩论——2600年人类思想的关键节点。
      </motion.p>

      <motion.div
        className="border-border-faint mt-6 flex items-center gap-6 border-t pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: d(0.6) }}
      >
        <StatItem value={stats.total} label="事件" />
        <StatItem value={stats.eras} label="时代" />
        <StatItem value={`${stats.figures}+`} label="哲学家" />
        <div className="border-fg-disabled/20 h-4 border-l" />
        <span className="text-fg-muted font-mono text-[10px] tracking-[0.2em]">
          600 BCE — 2025 CE
        </span>
      </motion.div>
    </section>
  );
}

export function FilterBar({
  activeEra,
  activeFigure,
  eraOrder,
  onEraClick,
  onClearFilters,
  d,
}: {
  activeEra: string | null;
  activeFigure: string | null;
  eraOrder: readonly string[];
  onEraClick: (era: string) => void;
  onClearFilters: () => void;
  d: (sec: number) => number;
}) {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-6">
      <motion.div
        className="flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: d(0.7) }}
      >
        <span className="text-fg-muted font-mono text-[9px] tracking-[0.28em] uppercase">
          时代
        </span>
        {eraOrder.map((era) => (
          <button
            key={era}
            onClick={() => onEraClick(era)}
            className={`border px-3 py-1 font-mono text-[10px] tracking-[0.18em] transition-all duration-200 ${
              activeEra === era
                ? "border-accent-gold/50 bg-accent-gold/10 text-accent-gold"
                : "border-fg-disabled/20 text-fg-muted hover:border-fg-disabled/40 hover:text-fg-secondary"
            }`}
          >
            {era}
          </button>
        ))}

        {(activeEra || activeFigure) && (
          <button
            onClick={onClearFilters}
            className="border-accent-gold/30 text-accent-gold/70 hover:text-accent-gold border px-3 py-1 font-mono text-[10px] tracking-[0.18em] transition-colors"
          >
            清除筛选 ×
          </button>
        )}

        {activeFigure && (
          <span className="text-fg-muted font-mono text-[10px] tracking-[0.14em]">
            筛选: <span className="text-accent-sage">{activeFigure}</span>
          </span>
        )}
      </motion.div>
    </section>
  );
}

export function StatItem({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-accent-gold font-mono text-lg font-semibold tracking-tight">
        {value}
      </span>
      <span className="text-fg-muted font-mono text-[9px] tracking-[0.2em] uppercase">
        {label}
      </span>
    </div>
  );
}
