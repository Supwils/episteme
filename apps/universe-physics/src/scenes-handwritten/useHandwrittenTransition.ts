"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { getSectionRoute, inferSectionFromTier } from "@/lib/section";
import type { AnyTierId } from "@/lib/tier";
import { SECTIONS } from "@/lib/section";
import { useUniverseStore } from "@/store/useUniverseStore";

const TRANSITION_DURATION_MS = 1500;

/**
 * Handwritten counterpart to 3D camera transitions: rAF-driven opacity
 * cross-fade that drives useUniverseStore.transition.progress, lets the
 * shared HUD subscribe to the same transition state, and keeps the URL
 * authoritative via Next router.push.
 *
 * Section-aware: figures out which section owns the target tier and
 * routes via getSectionRoute so the hook can be reused for universe
 * handwritten and physics scenes interchangeably.
 */
export function useHandwrittenTransition() {
  const router = useRouter();
  const currentTier = useUniverseStore((s) => s.currentTier);
  const transitionActive = useUniverseStore((s) => s.transition.active);
  const rafRef = useRef<number | null>(null);

  return useCallback(
    (target: AnyTierId) => {
      if (transitionActive) return;
      if (target === currentTier) return;
      const store = useUniverseStore.getState();
      const targetSection = inferSectionFromTier(target);
      const kind = SECTIONS[targetSection].transitionKind(currentTier, target);

      store.startTransition(currentTier, target, kind);
      router.push(getSectionRoute(targetSection, target, "handwritten"));

      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / TRANSITION_DURATION_MS);
        useUniverseStore.getState().setTransitionProgress(p);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          useUniverseStore.getState().finishTransition();
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [router, currentTier, transitionActive],
  );
}
