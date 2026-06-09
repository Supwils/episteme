/**
 * Physics tier metadata — the 9-tier theme ladder for /physics/*.
 * Mirrors lib/tier.ts in shape so HUD components can treat both
 * sections uniformly via the SectionConfig abstraction in lib/section.ts.
 *
 * Tier id semantics: P0 = classical mechanics → P8 = frontier research.
 * Unlike the universe tiers (which encode physical scale in meters),
 * physics tiers encode theoretical depth and historical layering.
 */

import type { TierMeta, TransitionKind } from "./tier";

export type PhysicsTierId = "P0" | "P1" | "P2" | "P3" | "P4" | "P5" | "P6" | "P7" | "P8";

export const PHYSICS_TIER_ORDER: readonly PhysicsTierId[] = [
  "P0",
  "P1",
  "P2",
  "P3",
  "P4",
  "P5",
  "P6",
  "P7",
  "P8",
] as const;

export const PHYSICS_TIERS: Record<PhysicsTierId, TierMeta> = {
  P0: {
    id: "P0",
    label: "Classical Mechanics",
    shortLabel: "经典力学",
    scaleMeters: 1,
    unit: "SI",
    cameraComfort: { min: 1, max: 1 },
  },
  P1: {
    id: "P1",
    label: "Thermo · Stat-Mech",
    shortLabel: "热力学",
    scaleMeters: 1,
    unit: "k_B",
    cameraComfort: { min: 1, max: 1 },
  },
  P2: {
    id: "P2",
    label: "Electromagnetism",
    shortLabel: "电磁与光",
    scaleMeters: 1,
    unit: "c",
    cameraComfort: { min: 1, max: 1 },
  },
  P3: {
    id: "P3",
    label: "Relativity",
    shortLabel: "相对论",
    scaleMeters: 1,
    unit: "γ",
    cameraComfort: { min: 1, max: 1 },
  },
  P4: {
    id: "P4",
    label: "Quantum Mechanics",
    shortLabel: "量子力学",
    scaleMeters: 1,
    unit: "ℏ",
    cameraComfort: { min: 1, max: 1 },
  },
  P5: {
    id: "P5",
    label: "Atomic · Molecular",
    shortLabel: "原子分子",
    scaleMeters: 1,
    unit: "a₀",
    cameraComfort: { min: 1, max: 1 },
  },
  P6: {
    id: "P6",
    label: "Nuclear · Particle",
    shortLabel: "核与粒子",
    scaleMeters: 1,
    unit: "GeV",
    cameraComfort: { min: 1, max: 1 },
  },
  P7: {
    id: "P7",
    label: "Standard Model · QFT",
    shortLabel: "标准模型",
    scaleMeters: 1,
    unit: "TeV",
    cameraComfort: { min: 1, max: 1 },
  },
  P8: {
    id: "P8",
    label: "Frontier",
    shortLabel: "前沿",
    scaleMeters: 1,
    unit: "?",
    cameraComfort: { min: 1, max: 1 },
  },
};

export const PHYSICS_TIER_ROUTES: Record<PhysicsTierId, string> = {
  P0: "classical-mechanics",
  P1: "thermodynamics",
  P2: "electromagnetism",
  P3: "relativity",
  P4: "quantum-mechanics",
  P5: "atomic-molecular",
  P6: "nuclear-particle",
  P7: "standard-model",
  P8: "frontier",
};

const ROUTE_TO_PHYSICS_TIER: Map<string, PhysicsTierId> = new Map(
  (Object.entries(PHYSICS_TIER_ROUTES) as Array<[PhysicsTierId, string]>).map(([tier, slug]) => [
    slug,
    tier,
  ]),
);

export function physicsTierFromSlug(slug: string): PhysicsTierId | null {
  return ROUTE_TO_PHYSICS_TIER.get(slug) ?? null;
}

export function physicsTierIndex(id: PhysicsTierId): number {
  return PHYSICS_TIER_ORDER.indexOf(id);
}

export function nextPhysicsTier(id: PhysicsTierId): PhysicsTierId | null {
  const i = physicsTierIndex(id);
  return i < 0 || i === PHYSICS_TIER_ORDER.length - 1
    ? null
    : (PHYSICS_TIER_ORDER[i + 1] as PhysicsTierId);
}

export function prevPhysicsTier(id: PhysicsTierId): PhysicsTierId | null {
  const i = physicsTierIndex(id);
  return i <= 0 ? null : (PHYSICS_TIER_ORDER[i - 1] as PhysicsTierId);
}

/**
 * Physics has no 3D camera, so every tier transition is a cross-fade
 * regardless of distance. Kept signature-compatible with the universe
 * variant so HUD code can call the same shape.
 */
export function physicsTransitionKind(_from: PhysicsTierId, _to: PhysicsTierId): TransitionKind {
  return "dissolve";
}

export function isPhysicsTierId(value: string): value is PhysicsTierId {
  return (PHYSICS_TIER_ORDER as readonly string[]).includes(value);
}

/**
 * How many pages a physics tier breaks into. Knowledge-dense topics like
 * classical mechanics, EM, and QM split across multiple horizontal pages
 * so the handwritten canvas stays legible rather than cramming every
 * concept into one quadrant. Defaults to 1 for not-yet-expanded tiers.
 */
export const PHYSICS_PAGE_COUNT: Record<PhysicsTierId, number> = {
  P0: 3,
  P1: 2,
  P2: 2,
  P3: 2,
  P4: 2,
  P5: 2,
  P6: 2,
  P7: 2,
  P8: 1,
};

export function getPhysicsPageCount(tier: PhysicsTierId): number {
  return PHYSICS_PAGE_COUNT[tier] ?? 1;
}
