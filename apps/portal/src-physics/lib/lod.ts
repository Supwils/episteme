import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useUiStore } from "@/src-physics/store/useUiStore";
import type { QualityTier } from "@/src-physics/lib/quality";

/**
 * LOD level selector based on camera distance.
 * Returns a detail level index (0 = highest detail) based on
 * the current camera distance relative to configured thresholds.
 *
 * Thresholds should be sorted ascending. The returned index maps to:
 *   0 — distance < thresholds[0]
 *   1 — thresholds[0] ≤ distance < thresholds[1]
 *   …
 *   N — distance ≥ thresholds[N-1]
 *
 * Runs inside the R3F render loop via useFrame so it never triggers
 * React re-renders; consumers read the ref directly.
 */
export function useLOD(thresholds: number[]): { readonly current: number } {
  const level = useRef(0);

  useFrame(({ camera }) => {
    const d = camera.position.length();
    let idx = 0;
    while (idx < thresholds.length && d >= thresholds[idx]!) {
      idx++;
    }
    level.current = idx;
  });

  return level;
}

/**
 * Particle count multiplier based on quality tier.
 * Returns a fraction (0..1) that callers should use to scale down
 * particle arrays on lower-end devices.
 *
 *   high   → 1.0  (full particle count)
 *   medium → 0.5  (50% particles)
 *   low    → 0.15 (15% particles)
 */
export function getParticleScale(tier: QualityTier): number {
  switch (tier) {
    case "high":
      return 1.0;
    case "medium":
      return 0.5;
    case "low":
      return 0.15;
  }
}

/**
 * Subsample a Float32Array of positions (stride 3) by a scale factor.
 * Returns a new typed array containing only `ceil(count * scale)` points.
 * The selection is deterministic (uniform stride sampling).
 */
export function subsamplePositions(positions: Float32Array, scale: number): Float32Array {
  if (scale >= 1) return positions;
  const totalPoints = positions.length / 3;
  const keep = Math.max(1, Math.ceil(totalPoints * scale));
  if (keep >= totalPoints) return positions;
  const out = new Float32Array(keep * 3);
  const stride = totalPoints / keep;
  for (let i = 0; i < keep; i++) {
    const srcIdx = Math.floor(i * stride);
    out[i * 3] = positions[srcIdx * 3]!;
    out[i * 3 + 1] = positions[srcIdx * 3 + 1]!;
    out[i * 3 + 2] = positions[srcIdx * 3 + 2]!;
  }
  return out;
}

/**
 * Subsample a paired colors Float32Array using the same stride as
 * `subsamplePositions`. Returns the original if scale >= 1.
 */
export function subsampleColors(colors: Float32Array, scale: number): Float32Array {
  if (scale >= 1) return colors;
  const totalPoints = colors.length / 3;
  const keep = Math.max(1, Math.ceil(totalPoints * scale));
  if (keep >= totalPoints) return colors;
  const out = new Float32Array(keep * 3);
  const stride = totalPoints / keep;
  for (let i = 0; i < keep; i++) {
    const srcIdx = Math.floor(i * stride);
    out[i * 3] = colors[srcIdx * 3]!;
    out[i * 3 + 1] = colors[srcIdx * 3 + 1]!;
    out[i * 3 + 2] = colors[srcIdx * 3 + 2]!;
  }
  return out;
}

/**
 * Hook that returns the current particle scale factor based on quality tier.
 * Uses a ref internally so it never triggers React re-renders.
 */
export function useParticleScale(): { readonly current: number } {
  const scale = useRef(1);
  const qualityTier = useUiStore((s) => s.qualityTier);
  scale.current = getParticleScale(qualityTier);
  return scale;
}
