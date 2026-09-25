import type { DomainClusterId } from "@/lib/domain-clusters";
import { CLUSTER_PIGMENTS, pigmentVar } from "@/lib/design/palette";

/**
 * A domain's accent is its cluster pigment, as theme-aware CSS values. The
 * tint strengths match what the per-domain rgba() literals used before.
 */
export function domainAccent(cluster: DomainClusterId) {
  const mark = pigmentVar(cluster);
  return {
    glowColor: mark,
    bgAccent: `color-mix(in oklab, ${mark} 8%, transparent)`,
    borderAccent: `color-mix(in oklab, ${mark} 20%, transparent)`,
  };
}

/** Hex for contexts without CSS variables (OG images render in Satori). */
export function clusterMarkHex(cluster: DomainClusterId): string {
  return CLUSTER_PIGMENTS[cluster].mark.dark;
}
