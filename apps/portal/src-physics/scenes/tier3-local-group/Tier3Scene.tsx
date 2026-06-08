"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ComponentProps } from "react";
import { type Group, Vector3 } from "three";
import { StarPoints } from "@/src-physics/components/three/StarPoints";
import { getTierContent } from "@/src-physics/lib/tier-content";
import { hash01, mixRgb } from "@/src-physics/lib/noise";
import { SceneMarkers } from "../SceneMarkers";
import { useUiStore } from "@/src-physics/store/useUiStore";

type Props = ComponentProps<"group"> & {
  opacity?: number;
};

/**
 * Tier 3 — Local Group.
 *
 * Members are placed using real galactic coordinates (l, b, d in kpc),
 * converted with z-axis = galactic north. Scene unit ≈ 1 Mpc so the
 * full Local Group fits inside ~1.2 units. The three primary spirals
 * (MW, M31, M33) get exponential-profile disks with log-spiral arm
 * modulation (2 arms, pitch ≈ 16°) and per-vertex color cool→warm by
 * radius — so disc reads as a spiral, not a gaussian fog. LMC / SMC get
 * compact blobs; dwarfs become single warm points. A two-layer bulge
 * bloom highlights each primary's centre. Distances and orientations
 * come from de Grijs & Bono 2014 (M31), Karachentsev et al. 2013, and
 * McConnachie 2012.
 */

type PrimaryDef = {
  id: string;
  l: number;
  b: number;
  d: number;
  radius: number;
  thickness: number;
  count: number;
  normal: readonly [number, number, number];
  bulgeBrightness: number;
};

type SatelliteDef = {
  id: string;
  l: number;
  b: number;
  d: number;
  count: number;
  radius: number;
};

type DwarfDef = {
  id: string;
  l: number;
  b: number;
  d: number;
};

const PRIMARIES: PrimaryDef[] = [
  {
    id: "milky-way",
    l: 0,
    b: 0,
    d: 0,
    radius: 0.032,
    thickness: 0.0022,
    count: 900,
    normal: [0, 1, 0],
    bulgeBrightness: 1.0,
  },
  {
    id: "andromeda",
    l: 121.17,
    b: -21.57,
    d: 780,
    radius: 0.038,
    thickness: 0.0025,
    count: 1100,
    // M31 disk normal — inclination ~77° to line-of-sight, PA ~38°.
    normal: [0.55, 0.62, -0.56],
    bulgeBrightness: 1.0,
  },
  {
    id: "triangulum",
    l: 133.6,
    b: -31.3,
    d: 840,
    radius: 0.018,
    thickness: 0.0018,
    count: 380,
    normal: [0.4, 0.7, 0.59],
    bulgeBrightness: 0.6,
  },
];

const SATELLITES: SatelliteDef[] = [
  { id: "lmc", l: 280.5, b: -32.9, d: 50, count: 120, radius: 0.0065 },
  { id: "smc", l: 302.8, b: -44.3, d: 64, count: 80, radius: 0.0052 },
];

const DWARFS: DwarfDef[] = [
  { id: "sagittarius-dwarf", l: 5.6, b: -14.1, d: 26 },
  { id: "ursa-minor", l: 105.0, b: 44.8, d: 65 },
  { id: "draco", l: 86.4, b: 34.7, d: 80 },
  { id: "sculptor", l: 287.5, b: -83.2, d: 86 },
  { id: "sextans", l: 243.5, b: 42.3, d: 86 },
  { id: "carina", l: 260.1, b: -22.2, d: 107 },
  { id: "fornax", l: 237.1, b: -65.7, d: 140 },
  { id: "leo-ii", l: 220.2, b: 67.2, d: 205 },
  { id: "leo-i", l: 226.0, b: 49.1, d: 250 },
  { id: "ngc-6822", l: 25.3, b: -18.4, d: 500 },
  { id: "ic-1613", l: 129.7, b: -60.6, d: 755 },
  { id: "wlm", l: 75.9, b: -73.6, d: 933 },
  { id: "aquarius", l: 34.0, b: -31.3, d: 1066 },
];

const FIELD_COUNT = 1900;
// Disc color palette: amber bulge → neutral mid → cool blue outer arms
const DISC_BULGE: [number, number, number] = [1.0, 0.78, 0.5];
const DISC_NEUTRAL: [number, number, number] = [0.88, 0.9, 0.95];
const DISC_OUTER: [number, number, number] = [0.6, 0.78, 1.1];
// Arm pitch — 2-arm log spiral, b = tan(pitch).
const ARM_PITCH = 0.287; // tan(16°)
const ARM_SIGMA = 0.55; // angular sigma around the arm phase, radians

function galacticToScene(l: number, b: number, dKpc: number): Vector3 {
  const lr = (l * Math.PI) / 180;
  const br = (b * Math.PI) / 180;
  const d = dKpc / 1000;
  return new Vector3(
    d * Math.cos(br) * Math.cos(lr),
    d * Math.sin(br),
    d * Math.cos(br) * Math.sin(lr),
  );
}

export function Tier3Scene({ opacity = 1, ...groupProps }: Props) {
  const group = useRef<Group>(null);
  const reducedMotion = useUiStore((s) => s.reducedMotion);

  const built = useMemo(() => buildLocalGroup(), []);
  const markers = useMemo(() => getTierContent("T3")?.markers ?? [], []);

  useFrame((_, dt) => {
    if (!reducedMotion && group.current) group.current.rotation.y += dt * 0.02;
  });

  return (
    <group ref={group} {...groupProps}>
      <StarPoints
        positions={built.field.positions}
        colors={built.field.colors}
        baseSize={4.2}
        opacity={0.32 * opacity}
      />
      <StarPoints
        positions={built.disc.positions}
        colors={built.disc.colors}
        baseSize={4.2}
        opacity={0.92 * opacity}
      />
      <StarPoints
        positions={built.sats}
        baseSize={5.5}
        baseTemp={0.78}
        baseBrightness={0.65}
        opacity={0.82 * opacity}
      />
      <StarPoints
        positions={built.dwarfs}
        baseSize={9}
        baseTemp={0.72}
        baseBrightness={0.65}
        opacity={0.95 * opacity}
      />
      <StarPoints
        positions={built.bulgePos}
        baseSize={72}
        baseTemp={0.75}
        baseBrightness={0.62}
        opacity={0.55 * opacity}
      />
      <StarPoints
        positions={built.bulgePos}
        baseSize={28}
        baseTemp={0.58}
        baseBrightness={0.72}
        opacity={1.0 * opacity}
      />
      {markers.length > 0 ? <SceneMarkers markers={markers} opacity={opacity} tierId="T3" /> : null}
    </group>
  );
}

type Layer = { positions: Float32Array; colors: Float32Array };

function buildLocalGroup() {
  let seed = 1000;
  const next = () => hash01(seed++);

  // Disc points: 2-arm log-spiral modulation + exponential radial
  // profile + per-vertex color cool↔warm along r.
  const totalDisc = PRIMARIES.reduce((sum, p) => sum + p.count, 0);
  const discPos = new Float32Array(totalDisc * 3);
  const discCol = new Float32Array(totalDisc * 3);
  let dp = 0;

  for (const def of PRIMARIES) {
    const center = galacticToScene(def.l, def.b, def.d);
    const normal = new Vector3(def.normal[0], def.normal[1], def.normal[2]).normalize();
    const tmp = Math.abs(normal.x) < 0.9 ? new Vector3(1, 0, 0) : new Vector3(0, 1, 0);
    const u = new Vector3().crossVectors(normal, tmp).normalize();
    const v = new Vector3().crossVectors(normal, u);

    for (let i = 0; i < def.count; i++) {
      // exponential radial profile
      const tt = next();
      const r = -Math.log(Math.max(1e-6, 1 - 0.94 * tt)) * (def.radius / 2.4);
      const rClamped = Math.min(r, def.radius * 1.4);

      // log-spiral arm angle (mod 2π), pick arm 0 or π
      const arm = next() < 0.5 ? 0 : Math.PI;
      const innerR = def.radius * 0.18;
      const armPhase = (1 / ARM_PITCH) * Math.log(Math.max(rClamped / innerR, 1e-3)) + arm;
      // gaussian jitter around armPhase, widens at small r where bulge is dominant
      const widen = 1 + Math.max(0, 1 - rClamped / (def.radius * 0.4)) * 2.5;
      const gauss = gaussianSample(next, next) * ARM_SIGMA * widen;
      const theta = armPhase + gauss;

      const h = (next() * 2 - 1) * def.thickness;
      const px = Math.cos(theta) * rClamped;
      const py = Math.sin(theta) * rClamped;
      discPos[dp * 3] = center.x + u.x * px + v.x * py + normal.x * h;
      discPos[dp * 3 + 1] = center.y + u.y * px + v.y * py + normal.y * h;
      discPos[dp * 3 + 2] = center.z + u.z * px + v.z * py + normal.z * h;

      // color: bulge amber → neutral mid → cool outer
      const tRad = Math.min(1, rClamped / def.radius);
      let c: [number, number, number];
      if (tRad < 0.4) c = mixRgb(DISC_BULGE, DISC_NEUTRAL, tRad / 0.4);
      else c = mixRgb(DISC_NEUTRAL, DISC_OUTER, (tRad - 0.4) / 0.6);
      // brightness peaks slightly inward of mid-radius
      const bright = 0.55 + 0.55 * (1 - Math.abs(tRad - 0.35) / 0.65);
      discCol[dp * 3] = c[0] * bright;
      discCol[dp * 3 + 1] = c[1] * bright;
      discCol[dp * 3 + 2] = c[2] * bright;
      dp++;
    }
  }

  // Satellites
  const satTotal = SATELLITES.reduce((sum, s) => sum + s.count, 0);
  const sats = new Float32Array(satTotal * 3);
  let sp = 0;
  for (const def of SATELLITES) {
    const center = galacticToScene(def.l, def.b, def.d);
    for (let i = 0; i < def.count; i++) {
      const theta = next() * Math.PI * 2;
      const phi = Math.acos(2 * next() - 1);
      const r = Math.pow(next(), 0.6) * def.radius;
      sats[sp++] = center.x + r * Math.sin(phi) * Math.cos(theta);
      sats[sp++] = center.y + r * Math.cos(phi) * 0.85;
      sats[sp++] = center.z + r * Math.sin(phi) * Math.sin(theta);
    }
  }

  // Dwarfs — one warm point each
  const dwarfs = new Float32Array(DWARFS.length * 3);
  DWARFS.forEach((def, i) => {
    const p = galacticToScene(def.l, def.b, def.d);
    dwarfs[i * 3] = p.x;
    dwarfs[i * 3 + 1] = p.y;
    dwarfs[i * 3 + 2] = p.z;
  });

  // Primary bulge bloom positions (centres of MW / M31 / M33)
  const bulgePos = new Float32Array(PRIMARIES.length * 3);
  PRIMARIES.forEach((def, i) => {
    const p = galacticToScene(def.l, def.b, def.d);
    bulgePos[i * 3] = p.x;
    bulgePos[i * 3 + 1] = p.y;
    bulgePos[i * 3 + 2] = p.z;
  });

  // Background extragalactic field — outer shell with brightness jitter
  const fieldPos = new Float32Array(FIELD_COUNT * 3);
  const fieldCol = new Float32Array(FIELD_COUNT * 3);
  const fieldTone: [number, number, number] = [0.45, 0.52, 0.78];
  for (let i = 0; i < FIELD_COUNT; i++) {
    const theta = next() * Math.PI * 2;
    const phi = Math.acos(2 * next() - 1);
    const r = 1.35 + next() * 0.6;
    fieldPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    fieldPos[i * 3 + 1] = r * Math.cos(phi);
    fieldPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    const bright = 0.45 + next() * 0.6;
    fieldCol[i * 3] = fieldTone[0] * bright;
    fieldCol[i * 3 + 1] = fieldTone[1] * bright;
    fieldCol[i * 3 + 2] = fieldTone[2] * bright;
  }

  const disc: Layer = { positions: discPos, colors: discCol };
  const field: Layer = { positions: fieldPos, colors: fieldCol };

  return { disc, field, sats, dwarfs, bulgePos };
}

/** Box–Muller-ish gaussian sample using two uniform [0,1) values. */
function gaussianSample(u1: () => number, u2: () => number): number {
  const a = Math.max(1e-6, u1());
  const b = u2();
  return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b);
}

export const LOCAL_GROUP_PRIMARIES = PRIMARIES;
export const LOCAL_GROUP_DWARFS = DWARFS;
