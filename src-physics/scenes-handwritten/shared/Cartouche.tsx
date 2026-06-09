"use client";

import { motion } from "framer-motion";
import { useHandwrittenStore } from "@/src-physics/store/useHandwrittenStore";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type CartoucheProps = {
  cx: number;
  cy: number;
  width?: number;
  height?: number;
  title: string;
  subtitle?: string;
  /** When false, hidden if flourishes are disabled. */
  honorFlourishes?: boolean;
};

/**
 * Scroll-banner title plate inspired by 17th-century star charts. Two
 * stacked decorative paths form a slight curl on the top and bottom
 * edges; title + subtitle anchor in the middle.
 */
export function Cartouche({
  cx,
  cy,
  width = 360,
  height = 78,
  title,
  subtitle,
  honorFlourishes = true,
}: CartoucheProps) {
  const reduce = usePrefersReducedMotion();
  const flourishes = useHandwrittenStore((s) => s.flourishesEnabled);
  if (honorFlourishes && !flourishes) {
    return null;
  }

  const x0 = cx - width / 2;
  const x1 = cx + width / 2;
  const yTop = cy - height / 2;
  const yBot = cy + height / 2;

  // top scroll: small curls on each end
  const topCurl = `M${x0 + 12} ${yTop} q-10 0 -12 10 q2 -10 12 -10 Z`;
  const topLine = `M${x0 + 12} ${yTop} L${x1 - 12} ${yTop}`;
  const botLine = `M${x0 + 12} ${yBot} L${x1 - 12} ${yBot}`;
  const leftEdge = `M${x0 + 12} ${yTop} q-22 ${height / 2} 0 ${height}`;
  const rightEdge = `M${x1 - 12} ${yTop} q22 ${height / 2} 0 ${height}`;

  const baseTransition = { duration: reduce ? 0 : 0.9, ease: "easeOut" as const };

  return (
    <motion.g
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={baseTransition}
    >
      {/* paper plate behind */}
      <rect
        x={x0 + 12}
        y={yTop}
        width={width - 24}
        height={height}
        fill="var(--hw-bg-edge)"
        opacity={0.6}
        filter="url(#hw-wobble-tiny)"
      />
      {/* frame */}
      <path
        d={topLine}
        fill="none"
        stroke="var(--hw-ink)"
        strokeWidth={1.1}
        strokeLinecap="round"
      />
      <path
        d={botLine}
        fill="none"
        stroke="var(--hw-ink)"
        strokeWidth={1.1}
        strokeLinecap="round"
      />
      <path
        d={leftEdge}
        fill="none"
        stroke="var(--hw-ink)"
        strokeWidth={1.1}
        strokeLinecap="round"
      />
      <path
        d={rightEdge}
        fill="none"
        stroke="var(--hw-ink)"
        strokeWidth={1.1}
        strokeLinecap="round"
      />
      <path d={topCurl} fill="var(--hw-ink)" />

      {/* hairline between top and bottom (decorative) */}
      <line
        x1={x0 + 32}
        y1={yTop + 6}
        x2={x1 - 32}
        y2={yTop + 6}
        stroke="var(--hw-ink-soft)"
        strokeWidth={0.4}
        strokeDasharray="1 6"
      />

      <text
        x={cx}
        y={cy + 3}
        textAnchor="middle"
        className="hw-label-title"
        fill="var(--hw-ink)"
        style={{ fontStyle: "italic" }}
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={cx}
          y={cy + 22}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          {subtitle}
        </text>
      )}
    </motion.g>
  );
}
