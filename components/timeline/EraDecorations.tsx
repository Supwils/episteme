"use client";

import { motion } from "framer-motion";

export function EraHeader({
  label,
  range,
  count,
  delay,
  reduce,
}: {
  label: string;
  range: string;
  count: number;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className="sticky top-14 z-20 mb-10 mt-4 first:mt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.5, delay }}
    >
      <div className="border-border-faint bg-bg-deep/90 flex items-center gap-4 border-b py-3 backdrop-blur-md">
        <span className="text-accent-gold font-mono text-[10px] tracking-[0.32em] uppercase">
          {range}
        </span>
        <span className="font-display text-fg-primary text-lg tracking-wide">{label}</span>
        <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em]">
          {count} events
        </span>
        <div className="border-fg-disabled/15 flex-1 border-b" />
      </div>
    </motion.div>
  );
}

export function EraDivider({ delay }: { delay: number }) {
  return (
    <motion.div
      className="my-12 flex items-center justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="bg-accent-gold/10 h-px w-16" />
      <div className="h-1.5 w-1.5 rotate-45 bg-accent-gold/25" />
      <div className="bg-accent-gold/10 h-px w-16" />
    </motion.div>
  );
}
