"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ComponentProps } from "react";
import type { Group } from "three";
import { StarPoints } from "@/src-physics/components/three/StarPoints";
import { getTierContent } from "@/content/universe-physics/cosmos";
import { fbm3D, hash01, mixRgb } from "@/src-physics/lib/noise";
import { SceneMarkers } from "../SceneMarkers";
import { useUiStore } from "@/src-physics/store/useUiStore";

type Props = ComponentProps<"group"> & {
  opacity?: number;
};

const MAJOR_NODES = 18;
const MINOR_NODES = 52;
const VOLUME_X = 1.45;
const VOLUME_Y = 1.05;
const VOLUME_Z = 1.45;

const MAJOR_LINKS = 3; // each major hubs to 3 nearest
const MINOR_LINKS = 2; // each minor hooks to 2 nearest
const SPINE_SAMPLES = 34; // per filament
const HALO_SAMPLES = 22; // gas points per filament
const VOID_FIELD = 1200; // background galaxies in voids

const COLOR_SPINE_HOT: [number, number, number] = [1.0, 0.78, 0.5]; // near nodes
const COLOR_SPINE_COOL: [number, number, number] = [0.6, 0.78, 1.05]; // mid-filament
const COLOR_VOID: [number, number, number] = [0.42, 0.5, 0.78];

/**
 * Tier 1 — Cosmic Web.
 *
 * Hierarchical node network with curved filaments and 2-D wall sheets:
 *   • 18 major nodes + 52 minor nodes, distributed by hash01 with a
 *     soft minimum-distance reject so they don't pile up
 *   • each node hooks to its K nearest neighbors (K=3 for major, 2 for
 *     minor); edges get a "tier" tag from the connected node ranks
 *   • each edge is a quadratic Bezier with a perpendicular mid offset,
 *     so filaments arc through space instead of running as straight
 *     wires (real filaments are curved, not chords)
 *   • spine points carry per-vertex color: warm near the nodes, cool
 *     in the middle, brightness shaped by a cosine so peaks sit at the
 *     endpoints
 *   • a gas halo lays anisotropic points along each filament,
 *     stretched along the edge tangent (cigar shape)
 *   • wall sheets: for triplets of nearby major nodes we sample the
 *     triangle interior with very dim points — the 2-D structure that
 *     N-body simulations show in addition to 1-D filaments
 *   • a sparse void field fills the rest with dim background galaxies
 *
 * All layers share an `opacity` prop so the parent ActiveScene can
 * cross-dissolve us with neighboring tiers.
 */
export function Tier1Scene({ opacity = 1, ...groupProps }: Props) {
  const group = useRef<Group>(null);
  const reducedMotion = useUiStore((s) => s.reducedMotion);

  const net = useMemo(() => buildNetwork(), []);
  const markers = useMemo(() => getTierContent("T1")?.markers ?? [], []);

  useFrame((_, dt) => {
    if (group.current) {
      if (!reducedMotion) {
        group.current.rotation.y += dt * 0.022;
        group.current.rotation.x = Math.sin(performance.now() * 0.00006) * 0.05;
      }
    }
  });

  return (
    <group ref={group} {...groupProps}>
      <StarPoints
        positions={net.voidField.positions}
        colors={net.voidField.colors}
        baseSize={4.2}
        opacity={0.32 * opacity}
      />
      <StarPoints
        positions={net.walls.positions}
        baseSize={4.8}
        baseTemp={0.12}
        baseBrightness={0.55}
        opacity={0.16 * opacity}
      />
      <StarPoints
        positions={net.gas}
        baseSize={8.5}
        baseTemp={0.08}
        baseBrightness={0.5}
        opacity={0.32 * opacity}
      />
      <StarPoints
        positions={net.spine.positions}
        colors={net.spine.colors}
        baseSize={6.8}
        opacity={0.95 * opacity}
      />
      <StarPoints
        positions={net.majorHalo}
        baseSize={55}
        baseTemp={0.82}
        baseBrightness={0.6}
        opacity={0.55 * opacity}
      />
      <StarPoints
        positions={net.minorNodes}
        baseSize={18}
        baseTemp={0.55}
        baseBrightness={0.6}
        opacity={0.85 * opacity}
      />
      <StarPoints
        positions={net.majorNodes}
        baseSize={34}
        baseTemp={0.82}
        baseBrightness={0.7}
        opacity={1.0 * opacity}
      />
      {markers.length > 0 ? <SceneMarkers markers={markers} opacity={opacity} tierId="T1" /> : null}
    </group>
  );
}

type Vec3 = [number, number, number];
type Layer = { positions: Float32Array; colors: Float32Array };

type Network = {
  majorNodes: Float32Array;
  minorNodes: Float32Array;
  majorHalo: Float32Array;
  spine: Layer;
  gas: Float32Array;
  walls: Layer;
  voidField: Layer;
};

function buildNetwork(): Network {
  // 1) Sample node positions with a soft minimum-distance reject. Major
  //    nodes get the broadest spacing; minor nodes fill in. The reject
  //    is just hash01-driven so the layout is deterministic.
  const majors: Vec3[] = [];
  const minors: Vec3[] = [];

  const tryPlace = (
    list: Vec3[],
    seed: number,
    minDistFromMajors: number,
    minDistFromOwn: number,
  ): Vec3 | null => {
    for (let k = 0; k < 60; k++) {
      const x = (hash01(seed + k * 17 + 1) * 2 - 1) * VOLUME_X;
      const y = (hash01(seed + k * 31 + 5) * 2 - 1) * VOLUME_Y;
      const z = (hash01(seed + k * 53 + 11) * 2 - 1) * VOLUME_Z;
      const p: Vec3 = [x, y, z];
      let ok = true;
      for (const m of majors) {
        if (dist(p, m) < minDistFromMajors) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      for (const m of list) {
        if (dist(p, m) < minDistFromOwn) {
          ok = false;
          break;
        }
      }
      if (ok) return p;
    }
    return null;
  };

  // place majors with wide spacing for clear hub feel
  for (let i = 0; i < MAJOR_NODES; i++) {
    const p = tryPlace(majors, i * 1009 + 41, 0, 0.55);
    if (p) majors.push(p);
  }
  // minors fill in but stay 0.18 from majors so the hubs read distinct
  for (let i = 0; i < MINOR_NODES; i++) {
    const p = tryPlace(minors, i * 2003 + 7, 0.18, 0.16);
    if (p) minors.push(p);
  }

  // 2) Edges: each node hooks to K nearest among the union of all nodes.
  const all: Vec3[] = [...majors, ...minors];
  type Edge = { a: number; b: number; majorCount: number };
  const seen = new Set<string>();
  const edges: Edge[] = [];
  const key = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);

  for (let i = 0; i < all.length; i++) {
    const isMajor = i < majors.length;
    const k = isMajor ? MAJOR_LINKS : MINOR_LINKS;
    const sorted = all
      .map((p, j) => ({ j, d: j === i ? Infinity : dist(all[i]!, p) }))
      .sort((a, b) => a.d - b.d);
    for (let n = 0; n < k; n++) {
      const target = sorted[n];
      if (!target) continue;
      const ek = key(i, target.j);
      if (seen.has(ek)) continue;
      seen.add(ek);
      const otherMajor = target.j < majors.length;
      edges.push({ a: i, b: target.j, majorCount: (isMajor ? 1 : 0) + (otherMajor ? 1 : 0) });
    }
  }

  // 3) Sample each filament: quadratic Bezier with a perpendicular mid
  //    offset, then radial jitter scaled by edge tier.
  const spinePos = new Float32Array(edges.length * SPINE_SAMPLES * 3);
  const spineCol = new Float32Array(edges.length * SPINE_SAMPLES * 3);
  const gas = new Float32Array(edges.length * HALO_SAMPLES * 3);

  let sp = 0;
  let gp = 0;
  edges.forEach((e, ei) => {
    const A = all[e.a]!;
    const B = all[e.b]!;
    // perpendicular offset to make the filament curve, magnitude scaled
    // by edge length so short edges don't kink wildly
    const len = dist(A, B);
    const perp = perpendicularOffset(A, B, ei);
    const bend = Math.min(0.32, len * 0.18) * (0.6 + hash01(ei * 91 + 3) * 0.8);
    const mid: Vec3 = [
      (A[0] + B[0]) * 0.5 + perp[0] * bend,
      (A[1] + B[1]) * 0.5 + perp[1] * bend,
      (A[2] + B[2]) * 0.5 + perp[2] * bend,
    ];

    // visual weighting: major-major filaments are denser/brighter
    const weight = e.majorCount === 2 ? 1.0 : e.majorCount === 1 ? 0.8 : 0.65;
    const jitterSigma = 0.014 + (1 - weight) * 0.012;

    for (let s = 0; s < SPINE_SAMPLES; s++) {
      const t = s / (SPINE_SAMPLES - 1);
      const p = quadBezier(A, mid, B, t);
      // tiny per-sample jitter to break the curve readability
      const jx = (hash01(ei * 911 + s * 7 + 1) - 0.5) * 2 * jitterSigma;
      const jy = (hash01(ei * 911 + s * 7 + 5) - 0.5) * 2 * jitterSigma;
      const jz = (hash01(ei * 911 + s * 7 + 9) - 0.5) * 2 * jitterSigma;
      spinePos[sp * 3] = p[0] + jx;
      spinePos[sp * 3 + 1] = p[1] + jy;
      spinePos[sp * 3 + 2] = p[2] + jz;

      // color: warm near endpoints, cool in the middle, attenuated by weight
      const endProx = 1 - 4 * t * (1 - t); // 0 at center, 1 at ends
      const tone = mixRgb(COLOR_SPINE_COOL, COLOR_SPINE_HOT, endProx);
      const bright = (0.55 + 0.55 * endProx) * weight;
      spineCol[sp * 3] = tone[0] * bright;
      spineCol[sp * 3 + 1] = tone[1] * bright;
      spineCol[sp * 3 + 2] = tone[2] * bright;
      sp++;
    }

    // gas halo: anisotropic — stretched along the edge tangent, dim
    for (let g = 0; g < HALO_SAMPLES; g++) {
      const t = hash01(ei * 707 + g * 11 + 17);
      const p = quadBezier(A, mid, B, t);
      // tangent at t (derivative of quadratic Bezier)
      const tng = bezierTangent(A, mid, B, t);
      const u = perpendicularBasis(tng, ei + g);
      const v = cross(tng, u);
      const rho = (hash01(ei * 313 + g * 23 + 3) - 0.5) * 2;
      const sigma = 0.038 + weight * 0.022;
      const along = (hash01(ei * 313 + g * 23 + 7) - 0.5) * sigma * 1.3;
      gas[gp * 3] = p[0] + u[0] * rho * sigma + v[0] * rho * sigma * 0.6 + tng[0] * along;
      gas[gp * 3 + 1] = p[1] + u[1] * rho * sigma + v[1] * rho * sigma * 0.6 + tng[1] * along;
      gas[gp * 3 + 2] = p[2] + u[2] * rho * sigma + v[2] * rho * sigma * 0.6 + tng[2] * along;
      gp++;
    }
  });

  // 4) Wall sheets: pick triples of nearby major nodes and sample
  //    points in the triangle interior. Caps the count to keep budget.
  const wallPoints: Vec3[] = [];
  const maxTriPairs = 14;
  let triCount = 0;
  for (let i = 0; i < majors.length && triCount < maxTriPairs; i++) {
    for (let j = i + 1; j < majors.length && triCount < maxTriPairs; j++) {
      for (let k = j + 1; k < majors.length && triCount < maxTriPairs; k++) {
        const A = majors[i]!;
        const B = majors[j]!;
        const C = majors[k]!;
        const r = Math.max(dist(A, B), dist(B, C), dist(A, C));
        if (r > 1.05) continue; // skip wide triangles
        triCount++;
        const SAMPLES = 120;
        for (let s = 0; s < SAMPLES; s++) {
          let u = hash01(i * 71 + j * 17 + k * 11 + s * 37 + 1);
          let v = hash01(i * 71 + j * 17 + k * 11 + s * 37 + 7);
          if (u + v > 1) {
            u = 1 - u;
            v = 1 - v;
          }
          const w = 1 - u - v;
          const x = A[0] * u + B[0] * v + C[0] * w;
          const y = A[1] * u + B[1] * v + C[1] * w;
          const z = A[2] * u + B[2] * v + C[2] * w;
          // only keep where FBM density is up — sheets are not uniform
          const n = (fbm3D(x * 2.0, y * 2.0, z * 2.0, 3) + 1) * 0.5;
          if (n < 0.52) continue;
          // tiny normal-direction perturbation for thickness
          const nrm = triNormal(A, B, C);
          const off = (hash01(s * 191 + i + j + k) - 0.5) * 0.04;
          wallPoints.push([x + nrm[0] * off, y + nrm[1] * off, z + nrm[2] * off]);
        }
      }
    }
  }

  const wallsPos = new Float32Array(wallPoints.length * 3);
  for (let i = 0; i < wallPoints.length; i++) {
    wallsPos[i * 3] = wallPoints[i]![0];
    wallsPos[i * 3 + 1] = wallPoints[i]![1];
    wallsPos[i * 3 + 2] = wallPoints[i]![2];
  }

  // 5) Major / minor / halo position buffers.
  const majorNodes = flatten(majors);
  const minorNodes = flatten(minors);
  // major halo just duplicates each major position; the larger
  // pointsMaterial size gives the bloom-like glow without extra geometry.
  const majorHalo = flatten(majors);

  // 6) Void field background. Per-vertex color so a few "extra dim"
  //    points read as background galaxies while most stay near void
  //    floor.
  const voidPos = new Float32Array(VOID_FIELD * 3);
  const voidCol = new Float32Array(VOID_FIELD * 3);
  for (let i = 0; i < VOID_FIELD; i++) {
    voidPos[i * 3] = (hash01(i * 11 + 1) * 2 - 1) * VOLUME_X * 1.15;
    voidPos[i * 3 + 1] = (hash01(i * 23 + 5) * 2 - 1) * VOLUME_Y * 0.95;
    voidPos[i * 3 + 2] = (hash01(i * 37 + 9) * 2 - 1) * VOLUME_Z * 1.15;
    const bright = 0.4 + hash01(i * 53 + 13) * 0.6;
    voidCol[i * 3] = COLOR_VOID[0] * bright;
    voidCol[i * 3 + 1] = COLOR_VOID[1] * bright;
    voidCol[i * 3 + 2] = COLOR_VOID[2] * bright;
  }

  return {
    majorNodes,
    minorNodes,
    majorHalo,
    spine: { positions: spinePos, colors: spineCol },
    gas,
    walls: { positions: wallsPos, colors: new Float32Array(0) },
    voidField: { positions: voidPos, colors: voidCol },
  };
}

function flatten(nodes: Vec3[]): Float32Array {
  const out = new Float32Array(nodes.length * 3);
  for (let i = 0; i < nodes.length; i++) {
    out[i * 3] = nodes[i]![0];
    out[i * 3 + 1] = nodes[i]![1];
    out[i * 3 + 2] = nodes[i]![2];
  }
  return out;
}

function dist(a: Vec3, b: Vec3): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function quadBezier(A: Vec3, M: Vec3, B: Vec3, t: number): Vec3 {
  const it = 1 - t;
  return [
    it * it * A[0] + 2 * it * t * M[0] + t * t * B[0],
    it * it * A[1] + 2 * it * t * M[1] + t * t * B[1],
    it * it * A[2] + 2 * it * t * M[2] + t * t * B[2],
  ];
}

function bezierTangent(A: Vec3, M: Vec3, B: Vec3, t: number): Vec3 {
  const it = 1 - t;
  const tx = 2 * it * (M[0] - A[0]) + 2 * t * (B[0] - M[0]);
  const ty = 2 * it * (M[1] - A[1]) + 2 * t * (B[1] - M[1]);
  const tz = 2 * it * (M[2] - A[2]) + 2 * t * (B[2] - M[2]);
  return normalize([tx, ty, tz]);
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

/**
 * Pick a vector perpendicular to AB by rotating an arbitrary up vector
 * — used to bend the quadratic Bezier mid-control out of the chord.
 */
function perpendicularOffset(A: Vec3, B: Vec3, seed: number): Vec3 {
  const d: Vec3 = normalize([B[0] - A[0], B[1] - A[1], B[2] - A[2]]);
  const ref: Vec3 = Math.abs(d[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const u = normalize(cross(d, ref));
  const v = cross(d, u);
  const theta = hash01(seed * 73 + 13) * Math.PI * 2;
  return normalize([
    u[0] * Math.cos(theta) + v[0] * Math.sin(theta),
    u[1] * Math.cos(theta) + v[1] * Math.sin(theta),
    u[2] * Math.cos(theta) + v[2] * Math.sin(theta),
  ]);
}

/**
 * Choose a unit vector perpendicular to `t` — for sampling the
 * anisotropic gas halo cross-section. The `seed` randomizes rotation
 * around t so successive samples rotate around the filament instead of
 * piling up along one axis.
 */
function perpendicularBasis(t: Vec3, seed: number): Vec3 {
  const ref: Vec3 = Math.abs(t[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const u = normalize(cross(t, ref));
  const v = cross(t, u);
  const theta = hash01(seed * 113 + 7) * Math.PI * 2;
  return normalize([
    u[0] * Math.cos(theta) + v[0] * Math.sin(theta),
    u[1] * Math.cos(theta) + v[1] * Math.sin(theta),
    u[2] * Math.cos(theta) + v[2] * Math.sin(theta),
  ]);
}

function triNormal(A: Vec3, B: Vec3, C: Vec3): Vec3 {
  const ab: Vec3 = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];
  const ac: Vec3 = [C[0] - A[0], C[1] - A[1], C[2] - A[2]];
  return normalize(cross(ab, ac));
}
