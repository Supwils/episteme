/**
 * Project 3D scene positions from content/cosmos/T*.ts into the 2D SVG
 * viewBox used by /universe/handwritten/*. Three projection modes serve
 * the different tier compositions:
 *
 *   - orthographic: [x, z] → [px, py], y kept as depth. Default.
 *   - polar:        radial projection onto a disc; for tier 0 sky-chart.
 *   - ecliptic:     same axes as orthographic but with y discarded — used
 *                   for the tier 6 orrery where everything sits on a disc.
 *
 * See docs/develop/08-handwritten-implementation.md § 3.
 */

import type { TierId } from "./tier";

export const HW_VIEWBOX = { x: -500, y: -500, w: 1000, h: 1000 } as const;
export const HW_VIEWBOX_STRING =
  `${HW_VIEWBOX.x} ${HW_VIEWBOX.y} ${HW_VIEWBOX.w} ${HW_VIEWBOX.h}` as const;

export type Vec3 = readonly [number, number, number];
export type Projection = "orthographic" | "polar" | "ecliptic";
export type Projected = { x: number; y: number; depth: number };

const DEFAULT_SCALE = 380;

export function projectToSvg(
  position: Vec3,
  options: { projection?: Projection; scale?: number } = {},
): Projected {
  const projection = options.projection ?? "orthographic";
  const scale = options.scale ?? DEFAULT_SCALE;
  const [px, py, pz] = position;

  if (projection === "polar") {
    const r = Math.sqrt(px * px + py * py + pz * pz);
    const theta = Math.atan2(pz, px);
    return {
      x: Math.cos(theta) * r * scale,
      y: Math.sin(theta) * r * scale,
      depth: py,
    };
  }

  if (projection === "ecliptic") {
    return { x: px * scale, y: pz * scale, depth: py };
  }

  return { x: px * scale, y: pz * scale, depth: py };
}

/**
 * Depth-to-opacity ramp: objects closer to camera (y > 0) get full
 * opacity, those behind fade. Used to give the otherwise flat 2D
 * projection a faint sense of fore-/background.
 */
export function depthToOpacity(depth: number, range = 1): number {
  return 0.55 + 0.45 * Math.tanh(depth / range);
}

/** Per-tier default projection — most tiers use orthographic but T0/T5 use polar. */
const TIER_PROJECTION: Record<TierId, Projection> = {
  T0: "polar",
  T1: "orthographic",
  T2: "orthographic",
  T3: "orthographic",
  T4: "orthographic",
  T5: "polar",
  T6: "ecliptic",
  T7: "orthographic",
};

const TIER_SCALE: Record<TierId, number> = {
  T0: 360,
  T1: 360,
  T2: 360,
  T3: 360,
  T4: 360,
  T5: 360,
  T6: 360,
  T7: 360,
};

export function projectForTier(tier: TierId, position: Vec3): Projected {
  return projectToSvg(position, {
    projection: TIER_PROJECTION[tier],
    scale: TIER_SCALE[tier],
  });
}

/** Deterministic 1D hash used for jitter on decorative elements. */
export function hash01(seed: number): number {
  const s = Math.sin(seed * 9301.0 + 49297.0) * 233280.0;
  return s - Math.floor(s);
}

/** Wrap an angle to [-π, π] for sorting on a disc. */
export function wrapAngle(a: number): number {
  let x = a;
  while (x > Math.PI) x -= 2 * Math.PI;
  while (x < -Math.PI) x += 2 * Math.PI;
  return x;
}
