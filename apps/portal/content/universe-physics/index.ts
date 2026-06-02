/**
 * Cross-section content lookup. Returns whatever TierContent exists for
 * a given tier id regardless of section. HUD components that don't
 * already know which section they're in should call this; section-
 * specific code can still import the per-section registries directly.
 */

import type { TierContent } from "@/src-physics/lib/content";
import type { AnyTierId } from "@/src-physics/lib/tier";
import { isUniverseTierId } from "@/src-physics/lib/tier";
import {
  getTierContent as getUniverseContentInternal,
  hasTierContent as hasUniverseContentInternal,
} from "./cosmos";
import { getPhysicsContent, hasPhysicsContent } from "./physics";

export function getContentForTier(tier: AnyTierId): TierContent | null {
  if (isUniverseTierId(tier)) return getUniverseContentInternal(tier);
  return getPhysicsContent(tier);
}

export function hasContentForTier(tier: AnyTierId): boolean {
  if (isUniverseTierId(tier)) return hasUniverseContentInternal(tier);
  return hasPhysicsContent(tier);
}
