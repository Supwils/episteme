"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { isUniverseTierId, TIERS } from "@/subjects/physics/lib/tier";
import { useUniverseStore } from "@/subjects/physics/store/useUniverseStore";

const STREAK_COUNT = 22;

/**
 * Full-screen overlay used by `tunnel` transitions. Horizontal streaks
 * (CSS gradient bars) race across the viewport while a central ticker
 * scrubs through the scale in scientific notation. The whole overlay
 * only renders during an active tunnel transition.
 */
export function TunnelOverlay() {
  const transition = useUniverseStore((state) => state.transition);
  const isTunnel = transition.active && transition.kind === "tunnel";

  return (
    <AnimatePresence>
      {isTunnel ? (
        <motion.div
          key="tunnel"
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Streaks />
          <Frame />
          <ScaleTicker />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Streaks() {
  // memoise random properties so streaks stay stable for the duration
  const [streaks] = useState(() =>
    Array.from({ length: STREAK_COUNT }, (_, i) => ({
      top: (i / STREAK_COUNT) * 100 + (Math.random() - 0.5) * 4,
      width: 30 + Math.random() * 55,
      delay: Math.random() * 0.4,
      duration: 0.5 + Math.random() * 0.6,
      hue: Math.random() > 0.85 ? "warm" : "cool",
    })),
  );

  return (
    <>
      {streaks.map((s, i) => (
        <motion.div
          key={i}
          className="absolute h-px"
          style={{
            top: `${s.top}%`,
            width: `${s.width}%`,
            left: "-30%",
            background:
              s.hue === "warm"
                ? "linear-gradient(to right, transparent, rgba(255,180,90,0.85), transparent)"
                : "linear-gradient(to right, transparent, rgba(106,208,255,0.7), transparent)",
          }}
          initial={{ x: "-30vw" }}
          animate={{ x: "130vw" }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}

function Frame() {
  return (
    <>
      <div className="border-accent-cool/45 absolute top-6 right-6 left-6 border-t" />
      <div className="border-accent-cool/45 absolute right-6 bottom-6 left-6 border-b" />
      <div className="text-accent-cool/70 absolute top-6 left-6 font-mono text-[10px] tracking-[0.32em] uppercase">
        frame lock
      </div>
      <div className="text-accent-cool/70 absolute top-6 right-6 font-mono text-[10px] tracking-[0.32em] uppercase">
        log₁₀ m
      </div>
    </>
  );
}

function ScaleTicker() {
  const transition = useUniverseStore((state) => state.transition);
  const from = transition.from;
  const to = transition.to;

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setProgress(useUniverseStore.getState().transition.progress);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!from || !to) return null;
  // Tunnel overlay only renders for universe transitions (3D camera context).
  if (!isUniverseTierId(from) || !isUniverseTierId(to)) return null;
  const fromMeta = TIERS[from];
  const toMeta = TIERS[to];
  const fromExp = Math.log10(fromMeta.scaleMeters);
  const toExp = Math.log10(toMeta.scaleMeters);
  const exp = fromExp + (toExp - fromExp) * progress;

  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
      <div className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.4em] uppercase">
        in transit · {fromMeta.id} → {toMeta.id}
      </div>
      <div
        data-num
        className="text-fg-primary font-mono text-5xl tracking-tight tabular-nums md:text-7xl"
      >
        10
        <span className="text-fg-secondary">
          <sup className="text-3xl md:text-5xl">{exp.toFixed(2)}</sup>
        </span>
        <span className="text-fg-secondary ml-3 text-2xl md:text-4xl">m</span>
      </div>
      <div className="text-fg-secondary font-display mt-4 text-xl italic md:text-3xl">
        {progress < 0.5 ? fromMeta.shortLabel : toMeta.shortLabel}
      </div>
    </div>
  );
}
