"use client";

import { useEffect } from "react";
import { inferSectionFromTier, type SectionId } from "@/src-physics/lib/section";
import type { AnyTierId } from "@/src-physics/lib/tier";
import { useUniverseStore } from "@/src-physics/store/useUniverseStore";

/**
 * Tier-route pages call this with their tier id to keep the store
 * synced with the URL. Cross-section aware: if the tier belongs to a
 * different section than the store currently sits in, both section and
 * tier are updated atomically.
 *
 * We intentionally only fire on mount + when the route's tier changes,
 * not on every store update — that would fight any in-flight transition
 * the user just kicked off.
 */
export function useSyncTier(tier: AnyTierId, section?: SectionId) {
  useEffect(() => {
    const store = useUniverseStore.getState();
    if (store.transition.active) return;
    const targetSection = section ?? inferSectionFromTier(tier);
    if (store.section !== targetSection) {
      store.setSection(targetSection, tier);
    } else if (store.currentTier !== tier) {
      store.setTier(tier);
    }
  }, [tier, section]);
}
