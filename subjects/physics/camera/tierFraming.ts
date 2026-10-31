import type { TierId } from "@/subjects/physics/lib/tier";

/**
 * Per-tier comfort framing distance in scene units. Each scene authors
 * its subject at origin with radius ~1, so the same numbers work across
 * tiers except for the very deep ones (T5–T7), which scale themselves
 * before being rendered.
 */
export const TIER_DEFAULT_DISTANCE: Record<TierId, number> = {
  T0: 1.3,
  T1: 2.0,
  T2: 1.6,
  T3: 2.4,
  T4: 3.0,
  T5: 2.6,
  T6: 2.6,
  T7: 2.4,
};

const DISK_FRAMING = {
  // Includes the authored 1.42-unit globular halo around the ~1.02-unit disk.
  T4: { radius: 1.46, elevation: (55 * Math.PI) / 180 },
  // Includes the 0.95-unit Kuiper belt and the outer dwarf/marker geometry.
  T6: { radius: 1.04, elevation: (45 * Math.PI) / 180 },
} as const;

export function diskFraming(tier: TierId, aspect: number, verticalFov: number) {
  const disk = tier === "T4" || tier === "T6" ? DISK_FRAMING[tier] : null;
  if (!disk) return null;
  const halfVertical = (verticalFov * Math.PI) / 360;
  const halfHorizontal = Math.atan(Math.tan(halfVertical) * aspect);
  const halfLimitingAngle = Math.min(halfVertical, halfHorizontal);
  // A sphere of radius r subtends asin(r/d). Reserve 10% for point sprites
  // and viewport edges, using the narrower FOV rather than a fixed distance.
  const distance = Math.max(
    TIER_DEFAULT_DISTANCE[tier],
    disk.radius / (Math.sin(halfLimitingAngle) * 0.9)
  );
  return { distance, elevation: disk.elevation, maxDistance: Math.max(6, distance * 1.8) };
}
