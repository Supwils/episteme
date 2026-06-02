"use client";

import { lazy, Suspense } from "react";
import { isUniverseTierId, type UniverseTierId } from "@/src-physics/lib/tier";
import { useUniverseStore } from "@/src-physics/store/useUniverseStore";

const SCENES: Record<UniverseTierId, ReturnType<typeof lazy>> = {
  T0: lazy(() => import("./tier0-observable-hw/Scene").then((m) => ({ default: m.Tier0HwScene }))),
  T1: lazy(() => import("./tier1-cosmic-web-hw/Scene").then((m) => ({ default: m.Tier1HwScene }))),
  T2: lazy(() => import("./tier2-laniakea-hw/Scene").then((m) => ({ default: m.Tier2HwScene }))),
  T3: lazy(() => import("./tier3-local-group-hw/Scene").then((m) => ({ default: m.Tier3HwScene }))),
  T4: lazy(() => import("./tier4-milky-way-hw/Scene").then((m) => ({ default: m.Tier4HwScene }))),
  T5: lazy(() =>
    import("./tier5-stellar-neighborhood-hw/Scene").then((m) => ({ default: m.Tier5HwScene })),
  ),
  T6: lazy(() =>
    import("./tier6-solar-system-hw/Scene").then((m) => ({ default: m.Tier6HwScene })),
  ),
  T7: lazy(() => import("./tier7-earth-hw/Scene").then((m) => ({ default: m.Tier7HwScene }))),
};

/**
 * Cross-fade scene router for the handwritten variant. When a transition
 * is in flight we render both the outgoing and incoming scenes, with
 * opacities driven by useUniverseStore.transition.progress. Otherwise we
 * render only the active tier.
 */
export function ActiveHandwrittenScene() {
  const currentTier = useUniverseStore((s) => s.currentTier);
  const transition = useUniverseStore((s) => s.transition);

  if (
    transition.active &&
    transition.from &&
    transition.to &&
    isUniverseTierId(transition.from) &&
    isUniverseTierId(transition.to)
  ) {
    const Outgoing = SCENES[transition.from];
    const Incoming = SCENES[transition.to];
    return (
      <Suspense fallback={null}>
        <g style={{ opacity: 1 - transition.progress }}>
          <Outgoing />
        </g>
        <g style={{ opacity: transition.progress }}>
          <Incoming />
        </g>
      </Suspense>
    );
  }

  if (!isUniverseTierId(currentTier)) return null;
  const Current = SCENES[currentTier];
  return (
    <Suspense fallback={null}>
      <Current />
    </Suspense>
  );
}
