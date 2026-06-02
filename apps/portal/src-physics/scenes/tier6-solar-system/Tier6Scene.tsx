"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ComponentProps } from "react";
import { AdditiveBlending, BackSide, type Group, type Mesh } from "three";
import { getTierContent } from "@/content/universe-physics/cosmos";
import { hash01 } from "@/src-physics/lib/noise";
import { StarPoints } from "@/src-physics/components/three/StarPoints";
import { VolumeBillboard } from "@/src-physics/components/volumetric/VolumeBillboard";
import { Planet } from "@/src-physics/components/three/Planet";
import { SaturnRings } from "@/src-physics/components/three/SaturnRings";
import { preloadPlanetTextures, type PlanetTextureKey } from "@/src-physics/lib/planetTextures";
import { SceneMarkers } from "../SceneMarkers";
import { useUiStore } from "@/src-physics/store/useUiStore";

type Props = ComponentProps<"group"> & {
  opacity?: number;
};

/**
 * Tier 6 — Solar System.
 *
 * Scene unit ≈ 50 AU. Radial distances are warped log-style so the
 * inner planets (Mercury–Mars, all under 1.5 AU) are still visible
 * alongside Neptune at 30 AU and Pluto at 39 AU:
 *
 *     r_scene = 0.10 + 0.85 · log(1 + r_AU) / log(1 + 50)
 *
 * Sun gets a four-layer glow (corona / chromosphere / photosphere /
 * core). Each planet is a sphereGeometry with characteristic color +
 * a thin ring orbit. Saturn has its iconic rings. The asteroid belt
 * (2.2–3.2 AU) and Kuiper belt (30–50 AU) are procedural point clouds.
 *
 * Note that this is a schematic representation — sizes and orbit
 * eccentricities are picked for legibility, not physical realism. The
 * intent is to read the structure at a glance, not to be a planetarium.
 */

type PlanetSpec = {
  id: string;
  /** Texture cache key. */
  texture: PlanetTextureKey;
  /** Semi-major axis in AU. */
  a: number;
  /** Render radius in scene units (chosen for legibility, not real R). */
  size: number;
  /** Orbital inclination in degrees (for outer bodies). */
  incl: number;
  /** Phase angle along orbit (radians), seeded for visual spread. */
  phase: number;
  /** Axial obliquity in degrees. */
  tilt: number;
  /** Self-rotation speed (rad/s). */
  spin: number;
  /** Has visible rings (Saturn only in default scheme). */
  rings?: { inner: number; outer: number };
};

const SCENE_AU = 50; // 1 scene unit ≈ 50 AU

const PLANETS: PlanetSpec[] = [
  {
    id: "mercury",
    texture: "mercury",
    a: 0.39,
    size: 0.013,
    incl: 7,
    phase: 0.4,
    tilt: 0.03,
    spin: 0.04,
  },
  {
    id: "venus",
    texture: "venus",
    a: 0.72,
    size: 0.02,
    incl: 3.4,
    phase: 1.9,
    tilt: 177.4,
    spin: -0.02,
  },
  {
    id: "earth",
    texture: "earthDay",
    a: 1.0,
    size: 0.022,
    incl: 0,
    phase: 3.5,
    tilt: 23.4,
    spin: 0.25,
  },
  {
    id: "mars",
    texture: "mars",
    a: 1.52,
    size: 0.016,
    incl: 1.85,
    phase: 5.1,
    tilt: 25.2,
    spin: 0.24,
  },
  {
    id: "jupiter",
    texture: "jupiter",
    a: 5.2,
    size: 0.055,
    incl: 1.3,
    phase: 0.85,
    tilt: 3.1,
    spin: 0.55,
  },
  {
    id: "saturn",
    texture: "saturn",
    a: 9.58,
    size: 0.046,
    incl: 2.5,
    phase: 2.6,
    tilt: 26.7,
    spin: 0.5,
    rings: { inner: 0.06, outer: 0.094 },
  },
  {
    id: "uranus",
    texture: "uranus",
    a: 19.22,
    size: 0.034,
    incl: 0.77,
    phase: 4.3,
    tilt: 97.8,
    spin: 0.3,
  },
  {
    id: "neptune",
    texture: "neptune",
    a: 30.05,
    size: 0.034,
    incl: 1.77,
    phase: 5.6,
    tilt: 28.3,
    spin: 0.32,
  },
];

const PLANET_TEXTURE_KEYS: PlanetTextureKey[] = [
  "mercury",
  "venus",
  "earthDay",
  "mars",
  "jupiter",
  "saturn",
  "saturnRing",
  "uranus",
  "neptune",
];

type Dwarf = { id: string; a: number; size: number; color: string; incl: number; phase: number };

const DWARFS: Dwarf[] = [
  { id: "ceres", a: 2.77, size: 0.006, color: "#c4b598", incl: 10.6, phase: 0.6 },
  { id: "pluto", a: 39.48, size: 0.008, color: "#d2b58a", incl: 17, phase: 1.4 },
  { id: "haumea", a: 43.34, size: 0.006, color: "#e6e9f0", incl: 28, phase: 4.0 },
  { id: "makemake", a: 45.79, size: 0.006, color: "#d8c89a", incl: 29, phase: 5.2 },
];

const ASTEROID_COUNT = 1400;
const KUIPER_COUNT = 1800;

function rScene(rAU: number): number {
  return 0.1 + 0.85 * (Math.log(1 + rAU) / Math.log(1 + SCENE_AU));
}

function orbitPos(rAU: number, phase: number, incl: number): [number, number, number] {
  const r = rScene(rAU);
  const inclR = (incl * Math.PI) / 180;
  return [r * Math.cos(phase), r * Math.sin(inclR) * Math.sin(phase) * 0.4, r * Math.sin(phase)];
}

export function Tier6Scene({ opacity = 1, ...groupProps }: Props) {
  const group = useRef<Group>(null);
  const flareRef = useRef<Mesh>(null);
  const reducedMotion = useUiStore((s) => s.reducedMotion);

  const built = useMemo(() => buildSolarSystem(), []);
  const markers = useMemo(() => getTierContent("T6")?.markers ?? [], []);

  useEffect(() => {
    preloadPlanetTextures(PLANET_TEXTURE_KEYS);
  }, []);

  useFrame((state, dt) => {
    if (!reducedMotion && group.current) group.current.rotation.y += dt * 0.03;

    // Solar flare easter egg: slow ~22s breathing + occasional spike.
    // Brightness traces real sunspot modulation timescales (cycle stretched
    // to seconds). Reduced motion = constant baseline.
    if (flareRef.current) {
      const mat = flareRef.current.material as { opacity?: number };
      if (typeof mat.opacity === "number") {
        if (reducedMotion) {
          mat.opacity = 0.18 * opacity;
        } else {
          const t = state.clock.elapsedTime;
          const breathing = 0.18 + 0.06 * Math.sin(t * 0.28);
          // Sparse Gaussian flare spike every ~12-25 s.
          const flarePhase = (t % 18) / 18;
          const spike = flarePhase < 0.08 ? Math.exp(-Math.pow((flarePhase - 0.04) * 28, 2)) : 0;
          mat.opacity = (breathing + spike * 0.45) * opacity;
        }
      }
    }
  });

  return (
    <group ref={group} {...groupProps}>
      {/* Sun: volumetric corona + core */}
      <VolumeBillboard
        coreColor={[1.4, 0.9, 0.35]}
        haloColor={[0.8, 0.35, 0.1]}
        density={1.0}
        radius={0.16}
        steps={6}
        opacity={0.6 * opacity}
      />
      {/* Pulsing flare layer — drives the easter-egg brightness modulation. */}
      <mesh ref={flareRef}>
        <sphereGeometry args={[0.032, 24, 24]} />
        <meshBasicMaterial
          color="#ffd680"
          transparent
          opacity={0.18 * opacity}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.022, 24, 24]} />
        <meshBasicMaterial
          color="#fff3c4"
          transparent
          opacity={opacity}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* Sun light — drives MeshStandardMaterial shading on each planet. */}
      <pointLight position={[0, 0, 0]} intensity={2.4} distance={0} decay={0} color="#ffe9b0" />
      <ambientLight intensity={0.18} color="#b8c7ff" />

      {/* planetary orbits (thin rings) + planet spheres */}
      {PLANETS.map((p) => {
        const r = rScene(p.a);
        const pos = orbitPos(p.a, p.phase, p.incl);
        return (
          <group key={p.id}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[r - 0.0008, r + 0.0008, 96]} />
              <meshBasicMaterial
                color="#6ad0ff"
                transparent
                opacity={0.18 * opacity}
                depthWrite={false}
                side={BackSide}
              />
            </mesh>
            <Planet
              textureKey={p.texture}
              radius={p.size}
              position={pos}
              axialTilt={p.tilt}
              spin={p.spin}
              opacity={opacity}
              segments={p.id === "earth" ? 40 : 28}
            />
            {p.rings ? (
              <SaturnRings
                inner={p.rings.inner}
                outer={p.rings.outer}
                position={pos}
                tilt={(p.tilt * Math.PI) / 180 + Math.PI / 2.1}
                opacity={opacity}
              />
            ) : null}
          </group>
        );
      })}

      {/* dwarfs — kept as procedural points for now (no textures shipped). */}
      {DWARFS.map((d) => {
        const pos = orbitPos(d.a, d.phase, d.incl);
        const r = rScene(d.a);
        return (
          <group key={d.id}>
            <mesh rotation={[(Math.PI / 2) * (1 - d.incl / 90), 0, 0]}>
              <ringGeometry args={[r - 0.0006, r + 0.0006, 96]} />
              <meshBasicMaterial
                color="#6ad0ff"
                transparent
                opacity={0.08 * opacity}
                depthWrite={false}
                side={BackSide}
              />
            </mesh>
            <mesh position={pos}>
              <sphereGeometry args={[d.size, 14, 14]} />
              <meshStandardMaterial
                color={d.color}
                roughness={0.95}
                metalness={0}
                transparent
                opacity={0.95 * opacity}
              />
            </mesh>
          </group>
        );
      })}

      {/* asteroid belt */}
      <StarPoints positions={built.belt} baseTemp={0.7} baseSize={4} opacity={0.55 * opacity} />

      {/* Kuiper belt */}
      <StarPoints positions={built.kuiper} baseTemp={0.3} baseSize={5} opacity={0.4 * opacity} />

      {/* interactive markers (Sun / Earth / asteroid belt / Jupiter / Saturn / Pluto) */}
      {markers.length > 0 ? <SceneMarkers markers={markers} opacity={opacity} tierId="T6" /> : null}
    </group>
  );
}

function buildSolarSystem() {
  // Asteroid belt — thin annulus 2.2–3.2 AU in log-warped space.
  const belt = new Float32Array(ASTEROID_COUNT * 3);
  for (let i = 0; i < ASTEROID_COUNT; i++) {
    const aAU = 2.2 + hash01(i * 7 + 1) * 1.0;
    const r = rScene(aAU);
    const theta = hash01(i * 13 + 5) * Math.PI * 2;
    const z = (hash01(i * 19 + 11) - 0.5) * 0.012;
    belt[i * 3] = r * Math.cos(theta);
    belt[i * 3 + 1] = z;
    belt[i * 3 + 2] = r * Math.sin(theta);
  }

  // Kuiper belt — 30–50 AU, modestly thicker.
  const kuiper = new Float32Array(KUIPER_COUNT * 3);
  for (let i = 0; i < KUIPER_COUNT; i++) {
    const aAU = 30 + hash01(i * 11 + 1) * 20;
    const r = rScene(aAU);
    const theta = hash01(i * 23 + 5) * Math.PI * 2;
    const z = (hash01(i * 37 + 11) - 0.5) * 0.04;
    kuiper[i * 3] = r * Math.cos(theta);
    kuiper[i * 3 + 1] = z;
    kuiper[i * 3 + 2] = r * Math.sin(theta);
  }

  return { belt, kuiper };
}

export { PLANETS as SOLAR_PLANETS, orbitPos as solarOrbitPos };
