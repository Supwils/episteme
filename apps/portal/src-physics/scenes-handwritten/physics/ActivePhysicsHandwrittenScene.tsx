"use client";

import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useState, type ComponentType } from "react";
import { isPhysicsTierId, type PhysicsTierId } from "@/src-physics/lib/physics-tier";
import { useUniverseStore } from "@/src-physics/store/useUniverseStore";

type PhysicsSceneComponent = ComponentType<{ page?: number }>;

const SCENES: Record<PhysicsTierId, PhysicsSceneComponent> = {
  P0: lazy(() =>
    import("./p0-classical-mechanics-hw/Scene").then((m) => ({ default: m.P0HwScene })),
  ) as PhysicsSceneComponent,
  P1: lazy(() =>
    import("./p1-thermodynamics-hw/Scene").then((m) => ({ default: m.P1HwScene })),
  ) as PhysicsSceneComponent,
  P2: lazy(() =>
    import("./p2-electromagnetism-hw/Scene").then((m) => ({ default: m.P2HwScene })),
  ) as PhysicsSceneComponent,
  P3: lazy(() =>
    import("./p3-relativity-hw/Scene").then((m) => ({ default: m.P3HwScene })),
  ) as PhysicsSceneComponent,
  P4: lazy(() =>
    import("./p4-quantum-mechanics-hw/Scene").then((m) => ({ default: m.P4HwScene })),
  ) as PhysicsSceneComponent,
  P5: lazy(() =>
    import("./p5-atomic-molecular-hw/Scene").then((m) => ({ default: m.P5HwScene })),
  ) as PhysicsSceneComponent,
  P6: lazy(() =>
    import("./p6-nuclear-particle-hw/Scene").then((m) => ({ default: m.P6HwScene })),
  ) as PhysicsSceneComponent,
  P7: lazy(() =>
    import("./p7-standard-model-hw/Scene").then((m) => ({ default: m.P7HwScene })),
  ) as PhysicsSceneComponent,
  P8: lazy(() =>
    import("./p8-frontier-hw/Scene").then((m) => ({ default: m.P8HwScene })),
  ) as PhysicsSceneComponent,
};

/**
 * Cross-fade scene router for the physics handwritten variant. Mirrors
 * the universe ActiveHandwrittenScene but only mounts physics tiers.
 * Forwards `page` to scenes that opt into multi-page layouts.
 */
export function ActivePhysicsHandwrittenScene() {
  const currentTier = useUniverseStore((s) => s.currentTier);
  const transition = useUniverseStore((s) => s.transition);
  const page = useUniverseStore((s) => s.physicsPage);

  if (
    transition.active &&
    transition.from &&
    transition.to &&
    isPhysicsTierId(transition.from) &&
    isPhysicsTierId(transition.to)
  ) {
    const Outgoing = SCENES[transition.from];
    const Incoming = SCENES[transition.to];
    return (
      <Suspense fallback={null}>
        <g style={{ opacity: 1 - transition.progress }}>
          <Outgoing page={0} />
        </g>
        <g style={{ opacity: transition.progress }}>
          <Incoming page={0} />
        </g>
      </Suspense>
    );
  }

  if (!isPhysicsTierId(currentTier)) return null;
  return (
    <Suspense fallback={null}>
      <PagedScene tier={currentTier} page={page} />
    </Suspense>
  );
}

/**
 * Wraps the active scene in an AnimatePresence so page changes (within
 * a single tier) cross-fade with a horizontal slide. Direction is
 * inferred from the page delta so forward-paging slides leftwards and
 * back-paging slides rightwards.
 */
function PagedScene({ tier, page }: { tier: PhysicsTierId; page: number }) {
  const Current = SCENES[tier];
  // Track previous page in state so render stays pure; on a page change
  // we derive direction and schedule an immediate state update — React
  // re-renders synchronously with the new prev pointer.
  const [prev, setPrev] = useState({ tier, page });
  let direction = 1;
  if (prev.tier === tier && prev.page !== page) {
    direction = page > prev.page ? 1 : -1;
  }
  if (prev.tier !== tier || prev.page !== page) {
    setPrev({ tier, page });
  }
  const key = `${tier}-${page}`;

  return (
    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
      <motion.g
        key={key}
        custom={direction}
        initial={{ opacity: 0, x: direction * 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -direction * 80 }}
        transition={{ duration: 0.42, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <Current page={page} />
      </motion.g>
    </AnimatePresence>
  );
}
