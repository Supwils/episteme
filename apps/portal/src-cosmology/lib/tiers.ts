import type { CosmologyTierId, TierMeta } from "./types";
import type { TierContent } from "@/content/cosmology/types";
import T0 from "@/content/cosmology/T0";
import T1 from "@/content/cosmology/T1";
import T2 from "@/content/cosmology/T2";
import T3 from "@/content/cosmology/T3";
import T4 from "@/content/cosmology/T4";
import T5 from "@/content/cosmology/T5";
import T6 from "@/content/cosmology/T6";
import T7 from "@/content/cosmology/T7";

const CONTENT_REGISTRY: Record<CosmologyTierId, TierContent> = {
  T0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
};

export type { CosmologyTierId };

export const COSMOLOGY_TIER_ORDER: readonly CosmologyTierId[] = [
  "T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7",
] as const;

export const COSMOLOGY_TIERS: Record<CosmologyTierId, TierMeta> = {
  T0: { id: "T0", label: "Observable Universe", shortLabel: "可见宇宙", scaleMeters: 8.8e26, unit: "Gpc" },
  T1: { id: "T1", label: "Cosmic Web", shortLabel: "宇宙纤维", scaleMeters: 3e24, unit: "Gpc" },
  T2: { id: "T2", label: "Supercluster", shortLabel: "超星系团", scaleMeters: 1.5e24, unit: "Mpc" },
  T3: { id: "T3", label: "Galaxy Group / Cluster", shortLabel: "星系群/团", scaleMeters: 3e22, unit: "Mpc" },
  T4: { id: "T4", label: "Galaxy", shortLabel: "星系", scaleMeters: 1e21, unit: "kpc" },
  T5: { id: "T5", label: "Stellar Neighborhood", shortLabel: "恒星邻域", scaleMeters: 5e17, unit: "pc" },
  T6: { id: "T6", label: "Solar System", shortLabel: "太阳系", scaleMeters: 9e12, unit: "AU" },
  T7: { id: "T7", label: "Planet", shortLabel: "行星", scaleMeters: 1.3e7, unit: "R⊕" },
};

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

const ROUTE_TO_TIER = new Map(
  (Object.entries(COSMOLOGY_TIER_ROUTES) as Array<[CosmologyTierId, string]>).map(
    ([tier, slug]) => [slug, tier]
  )
);

export function tierFromSlug(slug: string): CosmologyTierId | null {
  return ROUTE_TO_TIER.get(slug) ?? null;
}

export function getTierContent(tier: CosmologyTierId): TierContent {
  return CONTENT_REGISTRY[tier];
}

export function hasTierContent(tier: string): tier is CosmologyTierId {
  return tier in CONTENT_REGISTRY;
}
