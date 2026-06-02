"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type WobbleCircleProps = {
  cx: number;
  cy: number;
  r: number;
  /** Hue for the wash layers (e.g. var(--hw-gold) or a hex). Defaults to ink. */
  hue?: string;
  /** Outline stroke color. */
  stroke?: string;
  strokeWidth?: number;
  /** Wash strength: "none" disables fill, "soft" = 2 layers, "strong" = 3. */
  wash?: "none" | "soft" | "strong";
  /** Wobble filter strength. */
  filterLevel?: "wobble" | "wobble-soft" | "wobble-tiny" | "none";
  delay?: number;
  animate?: boolean;
  /** Optional click handler (gives the circle pointer affordance). */
  onClick?: () => void;
};

/**
 * Three-layer watercolor circle that looks hand-painted on parchment.
 * Outer wash is widest + most transparent, middle wash is offset ±2px
 * to mimic re-brushed paint, the inner stroke uses a wobble filter so
 * the line itself isn't perfectly round.
 */
export function WobbleCircle({
  cx,
  cy,
  r,
  hue = "var(--hw-ink)",
  stroke = "var(--hw-ink)",
  strokeWidth = 1.4,
  wash = "strong",
  filterLevel = "wobble-tiny",
  delay = 0,
  animate = true,
  onClick,
}: WobbleCircleProps) {
  const reduce = usePrefersReducedMotion();
  const filterUrl = filterLevel === "none" ? undefined : `url(#hw-${filterLevel})`;

  const initialOpacity = reduce || !animate ? 1 : 0;
  const transitionBase = {
    duration: reduce ? 0 : 0.7,
    delay,
    ease: [0.22, 0.61, 0.36, 1] as const,
  };

  return (
    <motion.g
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
      initial={{ opacity: initialOpacity }}
      animate={{ opacity: 1 }}
      transition={transitionBase}
    >
      {wash !== "none" && (
        <>
          <circle cx={cx} cy={cy} r={r * 1.7} fill={hue} fillOpacity={0.08} />
          {wash === "strong" && (
            <circle cx={cx - 2} cy={cy + 2} r={r * 1.3} fill={hue} fillOpacity={0.14} />
          )}
          <circle cx={cx} cy={cy} r={r} fill={hue} fillOpacity={wash === "strong" ? 0.2 : 0.12} />
        </>
      )}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        filter={filterUrl}
      />
    </motion.g>
  );
}
