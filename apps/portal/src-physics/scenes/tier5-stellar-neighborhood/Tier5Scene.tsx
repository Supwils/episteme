"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ComponentProps } from "react";
import type { Group } from "three";
import { getTierContent } from "@/src-physics/lib/tier-content";
import { hash01, mixRgb } from "@/src-physics/lib/noise";
import { StarPoints } from "@/src-physics/components/three/StarPoints";
import { SceneMarkers } from "../SceneMarkers";
import { useUiStore } from "@/src-physics/store/useUiStore";

type Props = ComponentProps<"group"> & {
  opacity?: number;
};

/**
 * Tier 5 — Stellar Neighborhood.
 *
 * Scene unit ≈ 50 ly. The Sun sits at origin. ~25 well-known stars
 * within 50 ly are placed using their real (RA, Dec, distance) from
 * SIMBAD; the conversion is standard equatorial→cartesian then divided
 * by 50 ly. Each star gets a color from its spectral type (Harvard
 * O/B/A/F/G/K/M sequence + white dwarfs) and a size from its visual
 * magnitude — bright stars (Sirius, Vega, Arcturus) read large; faint
 * red dwarfs (Wolf 359, Proxima) read small.
 *
 * A second pass renders a Sun-centred two-layer glow + a thin orange
 * highlight for K/M giants. The background is a procedural starfield
 * of ~3000 dim points filling the rest of the local Galactic disk.
 */

type Spectral = "O" | "B" | "A" | "F" | "G" | "K" | "M" | "D" | "GIANT";

type StarDef = {
  id: string;
  /** Right ascension in hours (e.g. 14h39.6m → 14.66). */
  raH: number;
  /** Declination in degrees (south negative). */
  decDeg: number;
  /** Distance in light years. */
  distLy: number;
  spec: Spectral;
  /** Apparent visual magnitude. */
  mag: number;
};

// Well-known stars within ~50 ly. Sun handled separately at origin.
// Sources: SIMBAD + RECONS for distances; spectral types canonical.
const STARS: StarDef[] = [
  { id: "proxima-cen", raH: 14.4953, decDeg: -62.6794, distLy: 4.246, spec: "M", mag: 11.13 },
  { id: "alpha-cen-a", raH: 14.6603, decDeg: -60.8339, distLy: 4.367, spec: "G", mag: 0.01 },
  { id: "alpha-cen-b", raH: 14.6603, decDeg: -60.8339, distLy: 4.367, spec: "K", mag: 1.34 },
  { id: "barnards-star", raH: 17.9633, decDeg: 4.6928, distLy: 5.96, spec: "M", mag: 9.51 },
  { id: "wolf-359", raH: 10.9389, decDeg: 7.0144, distLy: 7.78, spec: "M", mag: 13.51 },
  { id: "lalande-21185", raH: 11.0556, decDeg: 35.9692, distLy: 8.3, spec: "M", mag: 7.49 },
  { id: "sirius-a", raH: 6.7525, decDeg: -16.7161, distLy: 8.6, spec: "A", mag: -1.46 },
  { id: "sirius-b", raH: 6.7525, decDeg: -16.7161, distLy: 8.6, spec: "D", mag: 8.44 },
  { id: "luyten-7268-a", raH: 1.65, decDeg: -17.95, distLy: 8.73, spec: "M", mag: 12.5 },
  { id: "ross-154", raH: 18.8225, decDeg: -23.8378, distLy: 9.7, spec: "M", mag: 10.43 },
  { id: "ross-248", raH: 23.6886, decDeg: 44.1731, distLy: 10.32, spec: "M", mag: 12.29 },
  { id: "epsilon-eri", raH: 3.5483, decDeg: -9.4583, distLy: 10.5, spec: "K", mag: 3.73 },
  { id: "lacaille-9352", raH: 23.0856, decDeg: -35.8528, distLy: 10.74, spec: "M", mag: 7.34 },
  { id: "ross-128", raH: 11.7878, decDeg: 0.805, distLy: 11.03, spec: "M", mag: 11.13 },
  { id: "procyon-a", raH: 7.6553, decDeg: 5.2247, distLy: 11.46, spec: "F", mag: 0.34 },
  { id: "61-cyg-a", raH: 21.1067, decDeg: 38.7517, distLy: 11.4, spec: "K", mag: 5.2 },
  { id: "tau-ceti", raH: 1.7344, decDeg: -15.9372, distLy: 11.9, spec: "G", mag: 3.5 },
  { id: "epsilon-indi", raH: 22.0533, decDeg: -56.7894, distLy: 11.87, spec: "K", mag: 4.69 },
  { id: "gj-1061", raH: 3.5961, decDeg: -44.5092, distLy: 11.99, spec: "M", mag: 13.09 },
  { id: "altair", raH: 19.8464, decDeg: 8.8683, distLy: 16.73, spec: "A", mag: 0.77 },
  { id: "vega", raH: 18.6156, decDeg: 38.7836, distLy: 25.04, spec: "A", mag: 0.03 },
  { id: "fomalhaut", raH: 22.9608, decDeg: -29.6222, distLy: 25.13, spec: "A", mag: 1.16 },
  { id: "pollux", raH: 7.7553, decDeg: 28.0264, distLy: 33.78, spec: "GIANT", mag: 1.14 },
  { id: "arcturus", raH: 14.2611, decDeg: 19.1825, distLy: 36.7, spec: "GIANT", mag: -0.05 },
  { id: "capella", raH: 5.2783, decDeg: 45.9981, distLy: 42.92, spec: "GIANT", mag: 0.08 },
];

const SCENE_LY = 50; // 1 scene unit = 50 ly
const FIELD_COUNT = 3000;
const FIELD_RADIUS = 2.0;

// Single-star position buffer reused for the Proxima Cen flare easter egg.
// Proxima is a famous flare star — UV / V-band flares can briefly outshine
// the quiescent star by an order of magnitude (Howard 2018, Vida 2017).
const PROXIMA_POS = (() => {
  const def = STARS.find((s) => s.id === "proxima-cen");
  if (!def) return new Float32Array(0);
  const raR = (def.raH * 15 * Math.PI) / 180;
  const decR = (def.decDeg * Math.PI) / 180;
  const d = def.distLy / SCENE_LY;
  return new Float32Array([
    d * Math.cos(decR) * Math.cos(raR),
    d * Math.sin(decR),
    d * Math.cos(decR) * Math.sin(raR),
  ]);
})();

// Harvard spectral palette (approximate visual colors)
const SPECTRAL_COLOR: Record<Spectral, [number, number, number]> = {
  O: [0.6, 0.7, 1.1],
  B: [0.66, 0.78, 1.08],
  A: [0.82, 0.86, 1.05],
  F: [0.98, 0.97, 0.95],
  G: [1.0, 0.92, 0.74],
  K: [1.0, 0.78, 0.5],
  M: [1.0, 0.6, 0.42],
  D: [0.8, 0.86, 1.0],
  GIANT: [1.0, 0.7, 0.42],
};

export function Tier5Scene({ opacity = 1, ...groupProps }: Props) {
  const group = useRef<Group>(null);
  const flareRef = useRef<Group>(null);
  const reducedMotion = useUiStore((s) => s.reducedMotion);

  const built = useMemo(() => buildNeighborhood(), []);
  const markers = useMemo(() => getTierContent("T5")?.markers ?? [], []);

  useFrame((state, dt) => {
    if (!reducedMotion && group.current) group.current.rotation.y += dt * 0.01;

    if (flareRef.current) {
      // Flare schedule: most of the time the layer is invisible; every
      // ~14 s a Gaussian spike rises to peak ~1.6 over ~0.4 s and decays.
      // Reduced motion = constant faint baseline so the marker still reads.
      const t = state.clock.elapsedTime;
      const phase = (t % 14) / 14;
      const spike = phase < 0.1 ? Math.exp(-Math.pow((phase - 0.04) * 30, 2)) * 1.6 : 0;
      const intensity = reducedMotion ? 0.35 : 0.04 + spike;
      // Scale the group so the bloom puffs out with the brightness.
      const s = 0.85 + intensity * 0.7;
      flareRef.current.scale.setScalar(s);
      flareRef.current.visible = intensity > 0.02;
      // Brightness mod is communicated through children's material opacity.
      flareRef.current.children.forEach((child, i) => {
        const mesh = child as { material?: { opacity?: number } };
        const base = i === 0 ? 0.7 : 0.35;
        if (mesh.material && typeof mesh.material.opacity === "number") {
          mesh.material.opacity = base * intensity * opacity;
        }
      });
    }
  });

  return (
    <group ref={group} {...groupProps}>
      {/* deep background field — distant Galactic disk stars */}
      <StarPoints
        positions={built.field.positions}
        colors={built.field.colors}
        baseSize={12}
        opacity={0.4 * opacity}
      />

      {/* dim / faint local stars (mag > 5) */}
      <StarPoints
        positions={built.dim.positions}
        colors={built.dim.colors}
        baseSize={34}
        opacity={0.95 * opacity}
      />

      {/* bright stars (mag < 5) — Sirius, Procyon, Altair, Vega, ... */}
      <StarPoints
        positions={built.bright.positions}
        colors={built.bright.colors}
        baseSize={70}
        opacity={1.0 * opacity}
      />

      {/* K/M giants — second pass with bigger warm halo */}
      <StarPoints
        positions={built.giants.positions}
        colors={built.giants.colors}
        baseSize={140}
        opacity={0.85 * opacity}
      />

      {/* Sun — two-layer glow centred at origin */}
      <StarPoints positions={built.sun} baseTemp={0.55} baseSize={320} opacity={0.6 * opacity} />
      <StarPoints positions={built.sun} baseTemp={0.45} baseSize={140} opacity={1.0 * opacity} />

      {/* Proxima Cen flare easter egg — additive bright + dim halo. */}
      {PROXIMA_POS.length > 0 ? (
        <group ref={flareRef}>
          <StarPoints
            positions={PROXIMA_POS}
            baseTemp={0.92}
            baseSize={110}
            baseBrightness={0.9}
            opacity={0}
          />
          <StarPoints
            positions={PROXIMA_POS}
            baseTemp={0.85}
            baseSize={260}
            baseBrightness={0.7}
            opacity={0}
          />
        </group>
      ) : null}

      {/* interactive markers (Sun / Proxima / Sirius / Vega / Tau Ceti / Barnard / TRAPPIST-1) */}
      {markers.length > 0 ? <SceneMarkers markers={markers} opacity={opacity} tierId="T5" /> : null}
    </group>
  );
}

type Layer = { positions: Float32Array; colors: Float32Array };

function equatorialToScene(raH: number, decDeg: number, distLy: number): [number, number, number] {
  const raR = (raH * 15 * Math.PI) / 180;
  const decR = (decDeg * Math.PI) / 180;
  const d = distLy / SCENE_LY;
  return [
    d * Math.cos(decR) * Math.cos(raR),
    d * Math.sin(decR),
    d * Math.cos(decR) * Math.sin(raR),
  ];
}

function buildNeighborhood() {
  // Partition known stars into "dim" (mag > 5) and "bright" (mag <= 5);
  // K/M giants additionally get a halo entry so they read as orange.
  const dimPos: number[] = [];
  const dimCol: number[] = [];
  const brightPos: number[] = [];
  const brightCol: number[] = [];
  const giantPos: number[] = [];
  const giantCol: number[] = [];

  for (const star of STARS) {
    const p = equatorialToScene(star.raH, star.decDeg, star.distLy);
    const palette = SPECTRAL_COLOR[star.spec] ?? SPECTRAL_COLOR.G;
    // size encoded via brightness (no per-vertex size in pointsMaterial),
    // so dim/bright partition + brightness multiplier do the work.
    // mag -2 → bright 1.4, mag 5 → 0.6, mag 13 → 0.25
    const bright = Math.max(0.25, Math.min(1.45, 1.5 - (star.mag + 1.5) * 0.13));

    const c: [number, number, number] = [
      palette[0] * bright,
      palette[1] * bright,
      palette[2] * bright,
    ];

    if (star.mag <= 5) {
      brightPos.push(p[0], p[1], p[2]);
      brightCol.push(c[0], c[1], c[2]);
    } else {
      dimPos.push(p[0], p[1], p[2]);
      dimCol.push(c[0], c[1], c[2]);
    }

    if (star.spec === "GIANT" || (star.spec === "K" && star.mag < 5)) {
      // dimmer warm halo so giants get the larger outer ring
      const halo: [number, number, number] = [
        palette[0] * 0.55,
        palette[1] * 0.45,
        palette[2] * 0.4,
      ];
      giantPos.push(p[0], p[1], p[2]);
      giantCol.push(halo[0], halo[1], halo[2]);
    }
  }

  // Background field — ~3000 points filling the local disk; biased to
  // a flattened thick-disk distribution (sigma_z < sigma_xy).
  const fieldPos = new Float32Array(FIELD_COUNT * 3);
  const fieldCol = new Float32Array(FIELD_COUNT * 3);
  const fieldCool: [number, number, number] = [0.6, 0.72, 1.0];
  const fieldWarm: [number, number, number] = [1.0, 0.84, 0.6];
  for (let i = 0; i < FIELD_COUNT; i++) {
    const u = hash01(i * 11 + 1);
    const v = hash01(i * 23 + 5);
    const theta = 2 * Math.PI * u;
    const rho = Math.sqrt(v) * FIELD_RADIUS;
    const zSigma = 0.42; // disk thickness in scene units
    const z = (hash01(i * 37 + 11) - 0.5) * 2 * zSigma * (1 - 0.4 * (rho / FIELD_RADIUS));
    fieldPos[i * 3] = rho * Math.cos(theta);
    fieldPos[i * 3 + 1] = z;
    fieldPos[i * 3 + 2] = rho * Math.sin(theta);
    const t = hash01(i * 53 + 17);
    const tone = mixRgb(fieldCool, fieldWarm, hash01(i * 71 + 19));
    const bright = 0.3 + t * 0.7;
    fieldCol[i * 3] = tone[0] * bright;
    fieldCol[i * 3 + 1] = tone[1] * bright;
    fieldCol[i * 3 + 2] = tone[2] * bright;
  }

  return {
    field: { positions: fieldPos, colors: fieldCol } as Layer,
    dim: {
      positions: new Float32Array(dimPos),
      colors: new Float32Array(dimCol),
    } as Layer,
    bright: {
      positions: new Float32Array(brightPos),
      colors: new Float32Array(brightCol),
    } as Layer,
    giants: {
      positions: new Float32Array(giantPos),
      colors: new Float32Array(giantCol),
    } as Layer,
    sun: new Float32Array([0, 0, 0]),
  };
}

/** Exported for content/marker authoring — compute scene-space position
 *  from real equatorial coordinates without hand-running the formula. */
export function starPosition(
  raH: number,
  decDeg: number,
  distLy: number,
): [number, number, number] {
  return equatorialToScene(raH, decDeg, distLy);
}
