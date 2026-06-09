"use client";

import { useEffect, useRef } from "react";
import { getPhysicsPageCount, isPhysicsTierId } from "@/lib/physics-tier";
import { useUniverseStore } from "@/store/useUniverseStore";

const SWIPE_THRESHOLD = 50; // px
const VERTICAL_TOLERANCE = 0.7; // |dx| > VERTICAL_TOLERANCE × |dy|

/**
 * Invisible full-canvas swipe surface for Physics. Captures horizontal
 * touch / pointer gestures and translates them into page navigation.
 * Pointer events pass through (CSS pointer-events: none on the wrapper);
 * we attach listeners on window so they fire even when the user starts
 * outside our element.
 */
export function SwipePager() {
  const tier = useUniverseStore((s) => s.currentTier);
  const page = useUniverseStore((s) => s.physicsPage);
  const setPage = useUniverseStore((s) => s.setPhysicsPage);
  const transitionActive = useUniverseStore((s) => s.transition.active);

  const startRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!isPhysicsTierId(tier)) return;
    const total = getPhysicsPageCount(tier);
    if (total <= 1) return;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      startRef.current = { x: t.clientX, y: t.clientY };
    };
    const onEnd = (e: TouchEvent) => {
      const s = startRef.current;
      startRef.current = null;
      if (!s || transitionActive) return;
      const t = e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (Math.abs(dx) * VERTICAL_TOLERANCE < Math.abs(dy)) return; // mostly vertical
      const next = dx < 0 ? page + 1 : page - 1;
      if (next < 0 || next >= total) return;
      setPage(next);
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [tier, page, setPage, transitionActive]);

  return null;
}
