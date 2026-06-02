"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type InkPathProps = {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  dasharray?: string;
  opacity?: number;
  delay?: number;
  duration?: number;
  /** Apply hand-wobble filter. */
  filterLevel?: "wobble" | "wobble-soft" | "wobble-tiny" | "none";
  /** When false, no pathLength animation (still respects reduced-motion). */
  animate?: boolean;
  fill?: string;
};

/**
 * A single hand-drawn ink stroke. On mount the path "writes itself in"
 * via pathLength 0 → 1 unless the user prefers reduced motion. All
 * paths default to round caps / joins to keep the feel friendly.
 */
export function InkPath({
  d,
  stroke = "var(--hw-ink)",
  strokeWidth = 1.2,
  dasharray,
  opacity = 1,
  delay = 0,
  duration = 0.9,
  filterLevel = "none",
  animate = true,
  fill = "none",
}: InkPathProps) {
  const reduce = usePrefersReducedMotion();
  const noAnim = reduce || !animate;
  const filterUrl = filterLevel === "none" ? undefined : `url(#hw-${filterLevel})`;

  return (
    <motion.path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dasharray}
      filter={filterUrl}
      initial={noAnim ? { opacity, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
      animate={{ opacity, pathLength: 1 }}
      transition={{ duration: noAnim ? 0 : duration, delay, ease: "easeOut" }}
    />
  );
}
