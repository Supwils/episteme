"use client";

import { motion } from "framer-motion";
import { BrandMark } from "./BrandMark";
import { getSectionConfig } from "@/lib/section";
import { useUniverseStore } from "@/store/useUniverseStore";

/**
 * Two floating capsules pinned to the top corners. No full-width
 * header bar, so the 3D / handwritten canvas extends edge-to-edge
 * and is not visually clipped by an opaque strip.
 */
export function TopBar() {
  const tier = useUniverseStore((state) => state.currentTier);
  const section = useUniverseStore((state) => state.section);
  const transition = useUniverseStore((state) => state.transition);
  const cfg = getSectionConfig(section);
  const meta = cfg.tiers[tier] ?? cfg.tiers[cfg.defaultTier]!;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 0.61, 0.36, 1] }}
        className="hud-capsule pointer-events-auto absolute top-4 left-4 z-30 flex items-center gap-3 px-3.5 py-2 md:top-5 md:left-6"
      >
        <BrandMark className="text-accent-cool h-5 w-5 shrink-0" />
        <span className="hud-meta text-fg-secondary">universe · physics</span>
        <span aria-hidden className="bg-fg-disabled mx-0.5 hidden h-3 w-px sm:inline-block" />
        <span className="hud-meta text-fg-muted hidden lg:inline">scale atlas / phase 0</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
        data-num
        className="hud-capsule pointer-events-auto absolute top-4 right-4 z-30 flex items-center gap-3 px-3.5 py-2 md:top-5 md:right-6"
      >
        <span className="hud-meta text-fg-muted hidden md:inline">
          frame · {cfg.frameLabel} · {meta.unit}
        </span>
        <span aria-hidden className="bg-fg-disabled hidden h-3 w-px md:inline-block" />
        <span className="hud-meta text-fg-muted">
          tier · <span className="text-fg-primary">{tier}</span>
        </span>
        {transition.active ? (
          <span className="hud-meta text-accent-warm hidden md:inline">
            · transit · {transition.kind}
          </span>
        ) : null}
        <span aria-hidden className="bg-fg-disabled hidden h-3 w-px md:inline-block" />
        <span
          className="hud-meta text-fg-muted hidden md:inline"
          title="Keyboard: ↑↓ tier · ←→ page · O atlas · ? help · Esc close"
        >
          ? · keys
        </span>
      </motion.div>
    </>
  );
}
