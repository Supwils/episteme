import { hash01 } from "@/lib/noise";
import type { PlanetTextureKey } from "@/lib/planetTextures";

export type PlanetSpec = {
  id: string;
  texture: PlanetTextureKey;
  a: number;
  size: number;
  incl: number;
  phase: number;
  tilt: number;
  spin: number;
  rings?: { inner: number; outer: number };
};

export type Dwarf = {
  id: string;
  a: number;
  size: number;
  color: string;
  incl: number;
  phase: number;
};

export const SCENE_AU = 50;

export const PLANETS: PlanetSpec[] = [
  { id: "mercury", texture: "mercury", a: 0.39, size: 0.013, incl: 7, phase: 0.4, tilt: 0.03, spin: 0.04 },
  { id: "venus", texture: "venus", a: 0.72, size: 0.02, incl: 3.4, phase: 1.9, tilt: 177.4, spin: -0.02 },
  { id: "earth", texture: "earthDay", a: 1.0, size: 0.022, incl: 0, phase: 3.5, tilt: 23.4, spin: 0.25 },
  { id: "mars", texture: "mars", a: 1.52, size: 0.016, incl: 1.85, phase: 5.1, tilt: 25.2, spin: 0.24 },
  { id: "jupiter", texture: "jupiter", a: 5.2, size: 0.055, incl: 1.3, phase: 0.85, tilt: 3.1, spin: 0.55 },
  { id: "saturn", texture: "saturn", a: 9.58, size: 0.046, incl: 2.5, phase: 2.6, tilt: 26.7, spin: 0.5, rings: { inner: 0.06, outer: 0.094 } },
  { id: "uranus", texture: "uranus", a: 19.22, size: 0.034, incl: 0.77, phase: 4.3, tilt: 97.8, spin: 0.3 },
  { id: "neptune", texture: "neptune", a: 30.05, size: 0.034, incl: 1.77, phase: 5.6, tilt: 28.3, spin: 0.32 },
];

export const PLANET_TEXTURE_KEYS: PlanetTextureKey[] = [
  "mercury", "venus", "earthDay", "mars", "jupiter",
  "saturn", "saturnRing", "uranus", "neptune",
];

export const DWARFS: Dwarf[] = [
  { id: "ceres", a: 2.77, size: 0.006, color: "#c4b598", incl: 10.6, phase: 0.6 },
  { id: "pluto", a: 39.48, size: 0.008, color: "#d2b58a", incl: 17, phase: 1.4 },
  { id: "haumea", a: 43.34, size: 0.006, color: "#e6e9f0", incl: 28, phase: 4.0 },
  { id: "makemake", a: 45.79, size: 0.006, color: "#d8c89a", incl: 29, phase: 5.2 },
];

const ASTEROID_COUNT = 1400;
const KUIPER_COUNT = 1800;

export function rScene(rAU: number): number {
  return 0.1 + 0.85 * (Math.log(1 + rAU) / Math.log(1 + SCENE_AU));
}

export function orbitPos(rAU: number, phase: number, incl: number): [number, number, number] {
  const r = rScene(rAU);
  const inclR = (incl * Math.PI) / 180;
  return [r * Math.cos(phase), r * Math.sin(inclR) * Math.sin(phase) * 0.4, r * Math.sin(phase)];
}

export function buildSolarSystem() {
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
