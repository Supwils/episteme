/**
 * Section abstraction layer. Captures everything the HUD / store / shells
 * need to know about a top-level knowledge section (universe, physics, …)
 * without those callers depending on per-section internals.
 *
 * Adding a new section: implement a SectionConfig and register it in the
 * SECTIONS map. HUD / routing / store automatically pick it up via the
 * helpers below.
 *
 * Design: docs/design/10-section-architecture.md
 * Refactor notes: docs/develop/10-section-refactor.md
 */

import {
  PHYSICS_TIERS,
  PHYSICS_TIER_ORDER,
  PHYSICS_TIER_ROUTES,
  isPhysicsTierId,
  physicsTransitionKind,
  type PhysicsTierId,
} from "./physics-tier";
import {
  HANDWRITTEN_PATH_PREFIX,
  TIERS,
  TIER_ORDER,
  TIER_ROUTES,
  isUniverseTierId,
  transitionKind as universeTransitionKind,
  type AnyTierId,
  type TierMeta,
  type TransitionKind,
  type UniverseTierId,
} from "./tier";

export type SectionId = "universe" | "physics";
export type ViewMode = "3d" | "handwritten";

export type SectionConfig = {
  id: SectionId;
  label: { primary: string; latin: string };

  /** Available view modes (insertion order = display order). */
  viewModes: ViewMode[];
  defaultViewMode: ViewMode;

  tierOrder: readonly AnyTierId[];
  tiers: Record<string, TierMeta>;
  defaultTier: AnyTierId;

  routePrefix: string;
  tierRoutes: Record<string, string>;
  /** Universe drills into /universe/handwritten/...; physics does not. */
  hasHandwrittenSubpath: boolean;

  /** What the HUD prints in TopBar's "frame · …" position. */
  frameLabel: string;

  transitionKind: (from: AnyTierId, to: AnyTierId) => TransitionKind;
  isOwnedTier: (value: string) => boolean;
};

export const SECTION_ORDER: readonly SectionId[] = ["universe", "physics"] as const;

export const SECTIONS: Record<SectionId, SectionConfig> = {
  universe: {
    id: "universe",
    label: { primary: "宇宙地图", latin: "Universe" },
    viewModes: ["3d", "handwritten"],
    defaultViewMode: "3d",
    tierOrder: TIER_ORDER,
    tiers: TIERS as Record<string, TierMeta>,
    defaultTier: "T0",
    routePrefix: "/universe-physics/universe",
    tierRoutes: TIER_ROUTES,
    hasHandwrittenSubpath: true,
    frameLabel: "geocentric",
    transitionKind: (from, to) =>
      universeTransitionKind(from as UniverseTierId, to as UniverseTierId),
    isOwnedTier: isUniverseTierId,
  },
  physics: {
    id: "physics",
    label: { primary: "物理语法", latin: "Physics" },
    viewModes: ["handwritten"],
    defaultViewMode: "handwritten",
    tierOrder: PHYSICS_TIER_ORDER,
    tiers: PHYSICS_TIERS as Record<string, TierMeta>,
    defaultTier: "P0",
    routePrefix: "/universe-physics/physics",
    tierRoutes: PHYSICS_TIER_ROUTES,
    hasHandwrittenSubpath: false,
    frameLabel: "mks · SI",
    transitionKind: (from, to) => physicsTransitionKind(from as PhysicsTierId, to as PhysicsTierId),
    isOwnedTier: isPhysicsTierId,
  },
};

export function getSectionConfig(section: SectionId): SectionConfig {
  return SECTIONS[section];
}

export function getSectionFromPath(pathname: string): SectionId {
  if (pathname.startsWith("/universe-physics/physics")) return "physics";
  return "universe";
}

/** Infer which section owns a given tier id by checking each registry. */
export function inferSectionFromTier(tier: AnyTierId): SectionId {
  if (SECTIONS.physics.isOwnedTier(tier)) return "physics";
  return "universe";
}

export function viewModesForSection(section: SectionId): ViewMode[] {
  return SECTIONS[section].viewModes;
}

export function sectionSupportsView(section: SectionId, view: ViewMode): boolean {
  return SECTIONS[section].viewModes.includes(view);
}

/**
 * Resolve a canonical route for a (section, tier, view) triple. Falls
 * back to defaultTier when the supplied tier doesn't belong to the
 * section (cross-section navigation).
 */
export function getSectionRoute(
  section: SectionId,
  tier: AnyTierId,
  view: ViewMode = SECTIONS[section].defaultViewMode
): string {
  const cfg = SECTIONS[section];
  const ownedTier = cfg.isOwnedTier(tier) ? tier : cfg.defaultTier;
  const slug = cfg.tierRoutes[ownedTier];
  if (!slug) return cfg.routePrefix;
  if (view === "handwritten" && cfg.hasHandwrittenSubpath) {
    return `${HANDWRITTEN_PATH_PREFIX}/${slug}`;
  }
  return `${cfg.routePrefix}/${slug}`;
}

/** When user clicks Section toggle, where do they land? Use the section's defaultTier. */
export function defaultRouteForSection(section: SectionId, view?: ViewMode): string {
  const cfg = SECTIONS[section];
  return getSectionRoute(section, cfg.defaultTier, view ?? cfg.defaultViewMode);
}
