/**
 * Cross-section reference parsing. Marker data items frequently encode
 * pointers to other tiers as free-form strings like:
 *
 *   "互文 · T0 大爆炸 · 低熵开端"
 *   "T6 太阳系 · Kepler"
 *   "互文 · P4 量子 · 路径积分"
 *
 * This module pulls the leading tier id out so the HUD can render
 * navigable chips instead of dead text.
 */

import { isPhysicsTierId, type PhysicsTierId } from "./physics-tier";
import { isUniverseTierId, type AnyTierId, type UniverseTierId } from "./tier";

const TIER_PATTERN = /\b([TP]\d)\b/;

export type CrossLink = {
  tier: AnyTierId;
  /** The remaining label text after the tier id (whitespace + separators stripped). */
  rest: string;
};

/**
 * Parse a free-form string for the first embedded tier id. Returns null
 * when nothing matches; the caller can then render the string as plain
 * text.
 */
export function parseCrossLink(value: string): CrossLink | null {
  const m = value.match(TIER_PATTERN);
  if (!m) return null;
  const tier = m[1] as string;
  if (!isUniverseTierId(tier) && !isPhysicsTierId(tier)) return null;
  // Strip the tier id + a leading "·" or whitespace from the trailing label.
  const rest = value
    .slice((m.index ?? 0) + tier.length)
    .replace(/^[\s·:|—-]+/, "")
    .trim();
  return { tier: tier as AnyTierId, rest };
}

/** Convenience predicate: does the value contain a tier id? */
export function hasCrossLink(value: string): boolean {
  return parseCrossLink(value) !== null;
}

/** Section the tier belongs to — universe or physics. */
export function tierSection(tier: AnyTierId): "universe" | "physics" {
  return isPhysicsTierId(tier) ? "physics" : "universe";
}

export type { UniverseTierId, PhysicsTierId };
