"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ComponentProps } from "react";
import type { Group } from "three";
import { getTierContent } from "@/src-physics/lib/tier-content";
import { hash01, mixRgb } from "@/src-physics/lib/noise";
import { StarPoints } from "@/src-physics/components/three/StarPoints";
import { VolumeBillboard } from "@/src-physics/components/volumetric/VolumeBillboard";
import { SceneMarkers } from "../SceneMarkers";
import { useUiStore } from "@/src-physics/store/useUiStore";

type Props = ComponentProps<"group"> & {
  opacity?: number;
};

/**
 * Tier 4 — Milky Way.
 *
 * Scene unit ≈ 15 kpc (optical disk radius). Rendering:
 *   • four logarithmic-spiral arms (pitch 12°, Vallée 2017). Each arm
 *     carries a per-vertex color: even-index arms (Perseus, Sagittarius)
 *     bias blue (star-forming HII regions), odd arms (Scutum-Centaurus,
 *     Outer) bias amber (older red-shifted populations)
 *   • a diffuse thin-disk field filling the inter-arm space
 *   • a flattened central bulge + stellar bar
 *   • a dim halo of globular clusters
 *   • a three-layer Sgr A* glow (core / ring / halo) — reads as an
 *     accretion well, not just a bright point
 *   • a two-layer Sun glow at R⊙ ≈ 0.545
 *   • interactive markers for the 4 named arms, Sun, and Sgr A*
 */

const ARM_COUNT = 4;
const ARM_PITCH_DEG = 12;
const DISK_FIELD = 2400;
const ARM_TOTAL = 2000;
const BULGE_COUNT = 700;
const BAR_COUNT = 160;
const HALO_COUNT = 130;
const SUN_R = 0.545; // 8.18 kpc / 15 kpc

// Per-arm tints. Indexed by arm id.
const ARM_TINTS: [number, number, number][] = [
  [0.65, 0.78, 1.1], // Perseus — blue (active SF)
  [1.05, 0.78, 0.55], // Scutum-Centaurus — amber (massive, evolved)
  [0.7, 0.85, 1.05], // Sagittarius-Carina — blue (Carina nebula etc.)
  [1.0, 0.75, 0.5], // Outer / Norma — amber
];

export function Tier4Scene({ opacity = 1, ...groupProps }: Props) {
  const group = useRef<Group>(null);
  const reducedMotion = useUiStore((s) => s.reducedMotion);

  const data = useMemo(() => buildMilkyWay(), []);
  const markers = useMemo(() => getTierContent("T4")?.markers ?? [], []);

  useFrame((_, dt) => {
    if (!reducedMotion && group.current) group.current.rotation.y -= dt * 0.022;
  });

  return (
    <group ref={group} {...groupProps}>
      {/* globular cluster halo */}
      <StarPoints positions={data.halo} baseTemp={0.75} baseSize={13} opacity={0.4 * opacity} />

      {/* diffuse thin-disk field */}
      <StarPoints
        positions={data.field.positions}
        colors={data.field.colors}
        baseSize={5}
        opacity={0.55 * opacity}
      />

      {/* spiral arms — per-vertex color by arm id */}
      <StarPoints
        positions={data.arms.positions}
        colors={data.arms.colors}
        baseSize={7.5}
        opacity={0.95 * opacity}
      />

      {/* flattened central bulge */}
      <StarPoints positions={data.bulge} baseTemp={0.65} baseSize={11} opacity={0.85 * opacity} />

      {/* stellar bar */}
      <StarPoints positions={data.bar} baseTemp={0.7} baseSize={13} opacity={0.88 * opacity} />

      {/* Sgr A* — volumetric accretion glow */}
      <VolumeBillboard
        coreColor={[1.3, 0.85, 0.35]}
        haloColor={[0.7, 0.3, 0.1]}
        density={1.2}
        radius={0.18}
        steps={6}
        opacity={0.7 * opacity}
      />

      {/* Sun — two-layer glow */}
      <StarPoints positions={data.sun} baseTemp={0.55} baseSize={80} opacity={0.55 * opacity} />
      <StarPoints positions={data.sun} baseTemp={0.45} baseSize={34} opacity={1.0 * opacity} />

      {/* interactive arm / sun / Sgr A* markers */}
      {markers.length > 0 ? <SceneMarkers markers={markers} opacity={opacity} tierId="T4" /> : null}
    </group>
  );
}

type Layer = { positions: Float32Array; colors: Float32Array };

function buildMilkyWay() {
  const b = Math.tan((ARM_PITCH_DEG * Math.PI) / 180);
  const innerR = 0.2;
  const outerR = 1.02;
  const armWidth = 0.045;
  const diskThick = 0.025;

  // Spiral arms — per-vertex tinted by arm id with brightness jitter.
  const perArm = Math.floor(ARM_TOTAL / ARM_COUNT);
  const armPos = new Float32Array(perArm * ARM_COUNT * 3);
  const armCol = new Float32Array(perArm * ARM_COUNT * 3);
  let ap = 0;
  for (let a = 0; a < ARM_COUNT; a++) {
    const thetaOffset = (a * Math.PI * 2) / ARM_COUNT;
    const tint = ARM_TINTS[a] ?? ARM_TINTS[0]!;
    for (let i = 0; i < perArm; i++) {
      const t = hash01(a * 9001 + i * 7 + 1);
      const r = innerR + (outerR - innerR) * Math.pow(t, 0.6);
      const theta = (1 / b) * Math.log(r / innerR) + thetaOffset;
      const w = armWidth * (1 - (0.5 * r) / outerR);
      const jx = (hash01(a * 9001 + i * 13 + 5) - 0.5) * w;
      const jy = (hash01(a * 9001 + i * 17 + 11) - 0.5) * w;
      const x = r * Math.cos(theta) + jx;
      const y = r * Math.sin(theta) + jy;
      armPos[ap * 3] = x;
      armPos[ap * 3 + 1] = (hash01(a * 9001 + i * 23 + 17) - 0.5) * diskThick;
      armPos[ap * 3 + 2] = y;

      // brightness peaks mid-radius (where the arm is densest)
      const tt = (r - innerR) / (outerR - innerR);
      const radial = 1 - Math.abs(tt - 0.45) / 0.55;
      const stoch = hash01(a * 9001 + i * 31 + 19);
      const bright = (0.55 + radial * 0.55) * (0.65 + stoch * 0.55);
      armCol[ap * 3] = tint[0] * bright;
      armCol[ap * 3 + 1] = tint[1] * bright;
      armCol[ap * 3 + 2] = tint[2] * bright;
      ap++;
    }
  }

  // Diffuse disk field — cool with brightness jitter
  const fieldPos = new Float32Array(DISK_FIELD * 3);
  const fieldCol = new Float32Array(DISK_FIELD * 3);
  const fieldTone: [number, number, number] = [0.62, 0.7, 0.92];
  for (let i = 0; i < DISK_FIELD; i++) {
    const r = Math.sqrt(hash01(i * 19 + 1)) * 1.0;
    const theta = hash01(i * 29 + 5) * Math.PI * 2;
    fieldPos[i * 3] = r * Math.cos(theta);
    fieldPos[i * 3 + 1] = (hash01(i * 37 + 9) - 0.5) * diskThick * (1 - 0.6 * r);
    fieldPos[i * 3 + 2] = r * Math.sin(theta);
    // closer-in disk gets warmer
    const c = mixRgb(fieldTone, [0.9, 0.78, 0.62], Math.max(0, 1 - r * 1.5));
    const bright = 0.4 + hash01(i * 53 + 17) * 0.6;
    fieldCol[i * 3] = c[0] * bright;
    fieldCol[i * 3 + 1] = c[1] * bright;
    fieldCol[i * 3 + 2] = c[2] * bright;
  }

  // Flattened central bulge
  const bulge = new Float32Array(BULGE_COUNT * 3);
  for (let i = 0; i < BULGE_COUNT; i++) {
    const r = Math.pow(hash01(i * 11 + 1), 1.6) * 0.14;
    const theta = hash01(i * 23 + 5) * Math.PI * 2;
    const phi = Math.acos(2 * hash01(i * 31 + 11) - 1);
    bulge[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    bulge[i * 3 + 1] = r * Math.cos(phi) * 0.5;
    bulge[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }

  // Stellar bar — elongated, rotated ~25° from Sun–GC line
  const bar = new Float32Array(BAR_COUNT * 3);
  const barAngle = (25 * Math.PI) / 180;
  for (let i = 0; i < BAR_COUNT; i++) {
    const t = hash01(i * 11 + 1) * 2 - 1;
    const w = (hash01(i * 19 + 5) - 0.5) * 0.045;
    const x0 = t * 0.22;
    bar[i * 3] = x0 * Math.cos(barAngle) - w * Math.sin(barAngle);
    bar[i * 3 + 1] = (hash01(i * 23 + 11) - 0.5) * 0.018;
    bar[i * 3 + 2] = x0 * Math.sin(barAngle) + w * Math.cos(barAngle);
  }

  // Globular cluster halo
  const halo = new Float32Array(HALO_COUNT * 3);
  for (let i = 0; i < HALO_COUNT; i++) {
    const theta = hash01(i * 17 + 1) * Math.PI * 2;
    const phi = Math.acos(2 * hash01(i * 29 + 5) - 1);
    const r = Math.pow(hash01(i * 41 + 11), 0.4) * 1.42;
    halo[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    halo[i * 3 + 1] = r * Math.cos(phi);
    halo[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }

  // Sun at (R⊙, ~0, 0); Sgr A* core at origin
  const sun = new Float32Array([SUN_R, 0.001, 0]);
  const core = new Float32Array([0, 0, 0]);

  return {
    arms: { positions: armPos, colors: armCol } as Layer,
    field: { positions: fieldPos, colors: fieldCol } as Layer,
    bulge,
    bar,
    halo,
    sun,
    core,
  };
}

export const MILKY_WAY_SUN_R = SUN_R;
