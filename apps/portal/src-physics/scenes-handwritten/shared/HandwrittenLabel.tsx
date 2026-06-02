"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Variant = "title" | "subtitle" | "label-major" | "label-minor" | "caption" | "hairline";

type HandwrittenLabelProps = {
  x: number;
  y: number;
  text: string;
  variant?: Variant;
  /** Anchor / alignment in SVG terms. */
  anchor?: "start" | "middle" | "end";
  italic?: boolean;
  color?: string;
  /** Optional leader line from another point. */
  leader?: { fromX: number; fromY: number };
  delay?: number;
  rotate?: number;
};

const CLASS_BY_VARIANT: Record<Variant, string> = {
  title: "hw-label-title",
  subtitle: "hw-label-subtitle",
  "label-major": "hw-label-major",
  "label-minor": "hw-label-minor",
  caption: "hw-label-caption",
  hairline: "hw-label-hairline",
};

/**
 * A text label, optionally with a thin leader line from a related point.
 * Font sizing comes from CSS classes in globals.css so SVG doesn't need
 * inline font-family/size declarations.
 */
export function HandwrittenLabel({
  x,
  y,
  text,
  variant = "label-minor",
  anchor = "middle",
  italic = false,
  color = "var(--hw-ink)",
  leader,
  delay = 0,
  rotate,
}: HandwrittenLabelProps) {
  const reduce = usePrefersReducedMotion();
  const cls = CLASS_BY_VARIANT[variant];
  const transform = rotate ? `rotate(${rotate} ${x} ${y})` : undefined;

  return (
    <motion.g
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.5, delay }}
    >
      {leader && (
        <line
          x1={leader.fromX}
          y1={leader.fromY}
          x2={x}
          y2={y}
          stroke="var(--hw-ink-soft)"
          strokeWidth={0.5}
          strokeDasharray="1 4"
          opacity={0.7}
        />
      )}
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fill={color}
        className={cls}
        style={italic ? { fontStyle: "italic" } : undefined}
        transform={transform}
      >
        {text}
      </text>
    </motion.g>
  );
}
