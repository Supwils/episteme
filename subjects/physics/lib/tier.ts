/**
 * Tier metadata for the universe scale ladder.
 * Each tier has its own local coordinate system to avoid float-precision
 * collapse across 28 orders of magnitude. Camera "comfort distance" is
 * expressed in the tier's local units, not meters.
 *
 * Design: docs/design/04-universe-experience.md
 *
 * Note on naming (Phase 2): the Universe-specific aliases keep the
 * historical names (TierId, TIERS, TIER_ORDER, TIER_ROUTES, ...) so the
 * existing 100+ call sites stay untouched during the Section abstraction
 * refactor. Physics tiers live in lib/physics-tier.ts and share TierMeta /
 * TransitionKind. See docs/develop/10-section-refactor.md.
 */

import type { PhysicsTierId } from "./physics-tier";

export type UniverseTierId = "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7";

/**
 * @deprecated Use UniverseTierId where you specifically mean universe;
 * use AnyTierId for cross-section code. TierId is kept as an alias of
 * UniverseTierId so existing call sites compile.
 */
export type TierId = UniverseTierId;

export type AnyTierId = UniverseTierId | PhysicsTierId;

export type TransitionKind = "zoom" | "dissolve" | "tunnel";

export type TierMeta = {
  /** Loose typed so the same shape can host UniverseTierId and PhysicsTierId. */
  id: string;
  label: string;
  shortLabel: string;
  /** Typical extent of the tier's primary subject, in meters. */
  scaleMeters: number;
  /** Display unit used inside this tier. */
  unit: string;
  /** Camera "comfort" distance range, in tier-local units. */
  cameraComfort: { min: number; max: number };
};

export const TIER_ORDER: readonly TierId[] = [
  "T0",
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
] as const;

export const TIERS: Record<TierId, TierMeta> = {
  T0: {
    id: "T0",
    label: "Observable Universe",
    shortLabel: "可见宇宙",
    scaleMeters: 8.8e26,
    unit: "Gpc",
    cameraComfort: { min: 1.0, max: 1.5 },
  },
  T1: {
    id: "T1",
    label: "Cosmic Web",
    shortLabel: "宇宙纤维",
    scaleMeters: 3e24,
    unit: "Gpc",
    cameraComfort: { min: 1.5, max: 2.5 },
  },
  T2: {
    id: "T2",
    label: "Supercluster",
    shortLabel: "超星系团",
    scaleMeters: 1.5e24,
    unit: "Mpc",
    cameraComfort: { min: 1.2, max: 2.0 },
  },
  T3: {
    id: "T3",
    label: "Galaxy Group / Cluster",
    shortLabel: "星系群/团",
    scaleMeters: 3e22,
    unit: "Mpc",
    cameraComfort: { min: 1.5, max: 3.0 },
  },
  T4: {
    id: "T4",
    label: "Galaxy",
    shortLabel: "星系",
    scaleMeters: 1e21,
    unit: "kpc",
    cameraComfort: { min: 2.0, max: 4.0 },
  },
  T5: {
    id: "T5",
    label: "Stellar Neighborhood",
    shortLabel: "恒星邻域",
    scaleMeters: 5e17,
    unit: "pc",
    cameraComfort: { min: 10, max: 30 },
  },
  T6: {
    id: "T6",
    label: "Solar System",
    shortLabel: "太阳系",
    scaleMeters: 9e12,
    unit: "AU",
    cameraComfort: { min: 40, max: 60 },
  },
  T7: {
    id: "T7",
    label: "Planet",
    shortLabel: "行星",
    scaleMeters: 1.3e7,
    unit: "R⊕",
    cameraComfort: { min: 1.5, max: 3.0 },
  },
};

export const TIER_ROUTES: Record<TierId, string> = {
  T0: "observable",
  T1: "cosmic-web",
  T2: "laniakea",
  T3: "local-group",
  T4: "milky-way",
  T5: "stellar-neighborhood",
  T6: "solar-system",
  T7: "earth",
};

const ROUTE_TO_TIER: Map<string, TierId> = new Map(
  (Object.entries(TIER_ROUTES) as Array<[TierId, string]>).map(([tier, slug]) => [slug, tier])
);

export function tierFromSlug(slug: string): TierId | null {
  return ROUTE_TO_TIER.get(slug) ?? null;
}

export function tierFromPathname(pathname: string): TierId | null {
  const normalizedPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const slug = normalizedPath.slice(normalizedPath.lastIndexOf("/") + 1);
  return tierFromSlug(slug);
}

export function tierIndex(id: TierId): number {
  return TIER_ORDER.indexOf(id);
}

export function nextTier(id: TierId): TierId | null {
  const i = tierIndex(id);
  return i < 0 || i === TIER_ORDER.length - 1 ? null : (TIER_ORDER[i + 1] as TierId);
}

export function prevTier(id: TierId): TierId | null {
  const i = tierIndex(id);
  return i <= 0 ? null : (TIER_ORDER[i - 1] as TierId);
}

/**
 * Design-driven transition kind per adjacent tier pair. See
 * docs/design/04-universe-experience.md §2. Non-adjacent jumps default
 * to tunnel; we revisit during Stage 2 once long-jump UX is needed.
 */
const ADJACENT_TRANSITION: Record<TierId, TransitionKind> = {
  T0: "tunnel", // T0 ↔ T1
  T1: "dissolve", // T1 ↔ T2
  T2: "dissolve", // T2 ↔ T3
  T3: "zoom", // T3 ↔ T4
  T4: "dissolve", // T4 ↔ T5
  T5: "tunnel", // T5 ↔ T6
  T6: "zoom", // T6 ↔ T7
  T7: "zoom", // no neighbour beyond T7
};

export function transitionKind(from: TierId, to: TierId): TransitionKind {
  const a = tierIndex(from);
  const b = tierIndex(to);
  if (Math.abs(a - b) === 1) {
    const lower = a < b ? from : to;
    return ADJACENT_TRANSITION[lower];
  }
  return "tunnel";
}

/**
 * Slug map for the handwritten SVG variant of the universe under
 * /universe/handwritten/*. Slugs intentionally mirror TIER_ROUTES so that
 * a user can swap the path prefix and stay on the same tier.
 */
export const TIER_ROUTES_HANDWRITTEN: Record<TierId, string> = {
  T0: "observable",
  T1: "cosmic-web",
  T2: "laniakea",
  T3: "local-group",
  T4: "milky-way",
  T5: "stellar-neighborhood",
  T6: "solar-system",
  T7: "earth",
};

export const HANDWRITTEN_PATH_PREFIX = "/universe-physics/universe/handwritten" as const;

export function isHandwrittenPath(pathname: string): boolean {
  return pathname.startsWith(HANDWRITTEN_PATH_PREFIX);
}

export function tierRouteFor(tier: TierId, mode: "3d" | "handwritten"): string {
  return mode === "handwritten"
    ? `${HANDWRITTEN_PATH_PREFIX}/${TIER_ROUTES_HANDWRITTEN[tier]}`
    : `/universe-physics/universe/${TIER_ROUTES[tier]}`;
}

/**
 * Cross-section helper: which view mode the current path is rendering.
 * Universe defaults to "3d" unless under /universe/handwritten/*.
 * Physics is always "handwritten".
 */
export function getViewMode(pathname: string): "3d" | "handwritten" {
  if (pathname.startsWith("/universe-physics/physics")) return "handwritten";
  return isHandwrittenPath(pathname) ? "handwritten" : "3d";
}

/** Treat T0..T7 prefix as universe, P0..P8 as physics. */
export function isUniverseTierId(value: string): value is UniverseTierId {
  return (TIER_ORDER as readonly string[]).includes(value);
}

/**
 * Marker visual variant per tier. Each tier maps to one of four
 * marker styles so the 3D scene's interactive points carry distinct
 * visual language at each scale.
 *
 *   haloDisk  — T0/T1/T2: soft glow sphere + dashed ring (engineering diagram)
 *   diamond   — T3/T4: rotated diamond outline + leader line
 *   starPoint — T5: the star itself glows on hover + orbital ring
 *   pinNeedle — T6/T7: tiny pin with persistent label
 */
export type MarkerKind = "haloDisk" | "diamond" | "starPoint" | "pinNeedle";

export const TIER_MARKER_KIND: Record<UniverseTierId, MarkerKind> = {
  T0: "haloDisk",
  T1: "haloDisk",
  T2: "haloDisk",
  T3: "diamond",
  T4: "diamond",
  T5: "starPoint",
  T6: "pinNeedle",
  T7: "pinNeedle",
};
