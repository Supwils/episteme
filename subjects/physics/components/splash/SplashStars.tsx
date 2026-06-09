"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { hash01 } from "@/subjects/physics/lib/noise";

const STAR_COUNT = 170;

type StarSeed = {
  id: number;
  /** target offset from origin in vmin units */
  dx: number;
  dy: number;
  /** pixel size */
  size: number;
  /** seconds before this star starts moving */
  delay: number;
  /** seconds the radial sprint takes */
  duration: number;
  warm: boolean;
  /** final opacity after settle */
  rest: number;
};

function generateStars(): StarSeed[] {
  const arr: StarSeed[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    const theta = hash01(i * 7 + 1) * Math.PI * 2;
    const r = 22 + hash01(i * 13 + 5) * 70;
    const warm = hash01(i * 29 + 19) < 0.12;
    arr.push({
      id: i,
      dx: Math.cos(theta) * r,
      dy: Math.sin(theta) * r,
      size: 0.9 + hash01(i * 23 + 11) * 1.4,
      delay: 0.35 + hash01(i * 17 + 3) * 1.55,
      duration: 1.4 + hash01(i * 31 + 7) * 0.8,
      rest: warm ? 0.55 : 0.32 + hash01(i * 41 + 13) * 0.2,
      warm,
    });
  }
  return arr;
}

/**
 * Background star burst for the splash. A single bright point pulses at
 * the centre while ~170 dots accelerate outward on staggered easings.
 * Rendered as DOM divs (no canvas), the whole layer is wrapped in a
 * slow rotation so the field never reads as static.
 */
export function SplashStars() {
  const stars = useMemo(() => generateStars(), []);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      initial={{ rotate: 0 }}
      animate={{ rotate: 8 }}
      transition={{ duration: 6.4, ease: "linear" }}
      aria-hidden
    >
      <div className="relative h-px w-px">
        <motion.span
          className="bg-fg-primary absolute top-1/2 left-1/2 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_18px_rgba(220,232,255,0.55)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.6, 1], opacity: [0, 1, 0.5] }}
          transition={{ duration: 1.4, ease: [0.2, 0.7, 0.3, 1] }}
        />
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className={`absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full ${
              s.warm ? "bg-accent-warm" : "bg-fg-secondary"
            }`}
            style={{ width: s.size, height: s.size }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: `${s.dx}vmin`,
              y: `${s.dy}vmin`,
              opacity: [0, s.warm ? 0.95 : 0.75, s.rest],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              ease: [0.16, 0.8, 0.24, 1],
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
