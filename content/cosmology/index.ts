import type { TierContent } from "./types";
import T0 from "./T0";
import T1 from "./T1";
import T2 from "./T2";
import T3 from "./T3";
import T4 from "./T4";
import T5 from "./T5";
import T6 from "./T6";
import T7 from "./T7";

export type CosmologyTierId = "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7";

export const COSMOLOGY_TIER_ORDER: readonly CosmologyTierId[] = [
  "T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7",
] as const;

export const COSMOLOGY_TIER_ROUTES: Record<CosmologyTierId, string> = {
  T0: "observable",
  T1: "cosmic-web",
  T2: "laniakea",
  T3: "local-group",
  T4: "milky-way",
  T5: "stellar-neighborhood",
  T6: "solar-system",
  T7: "earth",
};

const REGISTRY: Record<CosmologyTierId, TierContent> = {
  T0, T1, T2, T3, T4, T5, T6, T7,
};

export function getTierContent(tier: CosmologyTierId): TierContent {
  return REGISTRY[tier];
}

export function hasTierContent(tier: string): tier is CosmologyTierId {
  return tier in REGISTRY;
}

export function tierFromSlug(slug: string): CosmologyTierId | null {
  for (const [tier, route] of Object.entries(COSMOLOGY_TIER_ROUTES)) {
    if (route === slug) return tier as CosmologyTierId;
  }
  return null;
}
