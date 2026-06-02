import type { TierId } from "@/lib/tier";
import type { TierContent } from "@/lib/content";

// PERF: All tier modules are statically imported. If bundle size becomes a
// concern, convert to dynamic imports with a caching layer. This requires
// changing getTierContent to return Promise<TierContent | null> and updating
// all ~30 call sites across scenes and handwritten views.
import T0 from "./T0";
import T1 from "./T1";
import T2 from "./T2";
import T3 from "./T3";
import T4 from "./T4";
import T5 from "./T5";
import T6 from "./T6";
import T7 from "./T7";

const REGISTRY: Partial<Record<TierId, TierContent>> = {
  T0,
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
};

export function getTierContent(tier: TierId): TierContent | null {
  return REGISTRY[tier] ?? null;
}

export function hasTierContent(tier: TierId): boolean {
  return tier in REGISTRY;
}
