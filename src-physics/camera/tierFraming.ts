import type { TierId } from "@/src-physics/lib/tier";

/**
 * Per-tier comfort framing distance in scene units. Each scene authors
 * its subject at origin with radius ~1, so the same numbers work across
 * tiers except for the very deep ones (T5–T7), which scale themselves
 * before being rendered.
 */
export const TIER_DEFAULT_DISTANCE: Record<TierId, number> = {
  T0: 1.3,
  T1: 2.0,
  T2: 1.6,
  T3: 2.4,
  T4: 3.0,
  T5: 2.6,
  T6: 2.6,
  T7: 2.4,
};
