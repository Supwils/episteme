// Tier content registries + lookups. The per-tier TierContent *data* lives in
// content/ (pure data); the lookup *logic* lives here in src so that content/
// stays free of runtime code and never depends on src at runtime (工程原则.md §三).
import type { TierId, AnyTierId } from "./tier";
import { isUniverseTierId } from "./tier";
import type { PhysicsTierId } from "./physics-tier";
import type { TierContent } from "./content";

import T0 from "@/content/universe-physics/cosmos/T0";
import T1 from "@/content/universe-physics/cosmos/T1";
import T2 from "@/content/universe-physics/cosmos/T2";
import T3 from "@/content/universe-physics/cosmos/T3";
import T4 from "@/content/universe-physics/cosmos/T4";
import T5 from "@/content/universe-physics/cosmos/T5";
import T6 from "@/content/universe-physics/cosmos/T6";
import T7 from "@/content/universe-physics/cosmos/T7";

import P0 from "@/content/universe-physics/physics/P0-classical-mechanics";
import P1 from "@/content/universe-physics/physics/P1-thermodynamics";
import P2 from "@/content/universe-physics/physics/P2-electromagnetism";
import P3 from "@/content/universe-physics/physics/P3-relativity";
import P4 from "@/content/universe-physics/physics/P4-quantum-mechanics";
import P5 from "@/content/universe-physics/physics/P5-atomic-molecular";
import P6 from "@/content/universe-physics/physics/P6-nuclear-particle";
import P7 from "@/content/universe-physics/physics/P7-standard-model";
import P8 from "@/content/universe-physics/physics/P8-frontier";

const UNIVERSE_REGISTRY: Partial<Record<TierId, TierContent>> = {
  T0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
};

const PHYSICS_REGISTRY: Partial<Record<PhysicsTierId, TierContent>> = {
  P0,
  P1,
  P2,
  P3,
  P4,
  P5,
  P6,
  P7,
  P8,
};

export function getTierContent(tier: TierId): TierContent | null {
  return UNIVERSE_REGISTRY[tier] ?? null;
}

export function hasTierContent(tier: TierId): boolean {
  return tier in UNIVERSE_REGISTRY;
}

export function getPhysicsContent(tier: string): TierContent | null {
  return PHYSICS_REGISTRY[tier as PhysicsTierId] ?? null;
}

export function hasPhysicsContent(tier: string): boolean {
  return tier in PHYSICS_REGISTRY;
}

export function getContentForTier(tier: AnyTierId): TierContent | null {
  if (isUniverseTierId(tier)) return getTierContent(tier);
  return getPhysicsContent(tier);
}

export function hasContentForTier(tier: AnyTierId): boolean {
  if (isUniverseTierId(tier)) return hasTierContent(tier);
  return hasPhysicsContent(tier);
}
