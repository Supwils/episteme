"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ComponentProps } from "react";
import { BackSide, type Group, type Mesh } from "three";
import { getTierContent } from "@/src-physics/content/cosmos";
import { fbm3D, hash01, mixRgb, smoothstep } from "@/src-physics/lib/noise";
import { StarPoints } from "@/src-physics/components/three/StarPoints";
import { VolumeBillboard } from "@/src-physics/components/volumetric/VolumeBillboard";
import { SceneMarkers } from "../SceneMarkers";
import { useUiStore } from "@/src-physics/store/useUiStore";

type Props = ComponentProps<"group"> & {
  opacity?: number;
};

export function Tier0Scene({ opacity = 1, ...groupProps }: Props) {
  const group = useRef<Group>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const ring3Ref = useRef<Mesh>(null);
  const reducedMotion = useUiStore((s) => s.reducedMotion);

  const web = useMemo(() => buildCosmicWebHint(1700, 0.72, 0.06), []);
  const galaxies = useMemo(() => buildGalaxyField(4400, 0.92, 0.055), []);
  const heroGalaxies = useMemo(() => buildHeroGalaxies(280, 0.92, 0.06), []);
  const reion = useMemo(() => buildReionShell(900, 0.985, 0.01), []);
  const cmb = useMemo(() => buildCmbShell(6800, 1.02, 0.006), []);
  const markers = useMemo(() => getTierContent("T0")?.markers ?? [], []);

  useFrame((_, dt) => {
    if (!reducedMotion && group.current) group.current.rotation.y += dt * 0.011;

    const ringFade = (m: Mesh | null, base: number) => {
      if (!m) return;
      const mat = m.material as { opacity?: number };
      mat.opacity = base * opacity;
    };
    ringFade(ring1Ref.current, 0.09);
    ringFade(ring2Ref.current, 0.06);
    ringFade(ring3Ref.current, 0.06);
  });

  return (
    <group ref={group} {...groupProps}>
      {/* inner volumetric haze — raymarched glow */}
      <VolumeBillboard
        coreColor={[0.25, 0.2, 0.5]}
        haloColor={[0.08, 0.06, 0.18]}
        density={0.6}
        radius={0.55}
        steps={4}
        opacity={0.15 * opacity}
      />

      {/* inner cosmic-web hint */}
      <StarPoints
        positions={web.positions}
        colors={web.colors}
        baseSize={5}
        baseBrightness={0.6}
        sizeMultiplier={1}
        opacity={0.55 * opacity}
      />

      {/* main galaxy field */}
      <StarPoints
        positions={galaxies.positions}
        colors={galaxies.colors}
        baseSize={4.8}
        baseBrightness={0.7}
        sizeMultiplier={1}
        opacity={0.85 * opacity}
      />

      {/* hero galaxies */}
      <StarPoints
        positions={heroGalaxies.positions}
        colors={heroGalaxies.colors}
        baseSize={13}
        baseBrightness={0.9}
        sizeMultiplier={1}
        opacity={0.95 * opacity}
      />

      {/* reionization halo */}
      <StarPoints
        positions={reion.positions}
        baseSize={4.2}
        baseTemp={0.8}
        baseBrightness={0.4}
        sizeMultiplier={1}
        opacity={0.4 * opacity}
      />

      {/* CMB anisotropy */}
      <StarPoints
        positions={cmb.positions}
        colors={cmb.colors}
        baseSize={3.5}
        baseBrightness={0.5}
        sizeMultiplier={1}
        opacity={0.5 * opacity}
      />

      {/* three orthogonal hairline rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9992, 1.0008, 360]} />
        <meshBasicMaterial color="#6ad0ff" transparent depthWrite={false} side={BackSide} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.9994, 1.0006, 360]} />
        <meshBasicMaterial color="#6ad0ff" transparent depthWrite={false} side={BackSide} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.9994, 1.0006, 360]} />
        <meshBasicMaterial color="#6ad0ff" transparent depthWrite={false} side={BackSide} />
      </mesh>

      {markers.length > 0 ? <SceneMarkers markers={markers} opacity={opacity} tierId="T0" /> : null}
    </group>
  );
}

type Layer = { positions: Float32Array; colors: Float32Array };

function sampleShell(seedOffset: number, i: number, radius: number, jitter: number) {
  const u = hash01(seedOffset + i * 7 + 1);
  const v = hash01(seedOffset + i * 13 + 5);
  const j = hash01(seedOffset + i * 23 + 11);
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = radius * (1 - jitter + j * jitter * 2);
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ] as const;
}

function buildCosmicWebHint(count: number, radius: number, jitter: number): Layer {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const cool: [number, number, number] = [0.34, 0.4, 0.7];
  const warm: [number, number, number] = [0.85, 0.7, 0.55];
  let i = 0;
  let attempts = 0;
  while (i < count && attempts < count * 18) {
    attempts++;
    const p = sampleShell(0, attempts, radius, jitter);
    const n = (fbm3D(p[0] * 2.4, p[1] * 2.4, p[2] * 2.4, 4) + 1) * 0.5;
    if (n < 0.55 && hash01(attempts * 91 + 3) > 0.18) continue;
    positions[i * 3] = p[0];
    positions[i * 3 + 1] = p[1];
    positions[i * 3 + 2] = p[2];
    const t = smoothstep(0.55, 0.95, n);
    const c = mixRgb(cool, warm, t * t);
    const brightness = 0.35 + 0.65 * t;
    colors[i * 3] = c[0] * brightness;
    colors[i * 3 + 1] = c[1] * brightness;
    colors[i * 3 + 2] = c[2] * brightness;
    i++;
  }
  return { positions, colors };
}

function buildGalaxyField(count: number, radius: number, jitter: number): Layer {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const blue: [number, number, number] = [0.6, 0.72, 1.0];
  const white: [number, number, number] = [0.9, 0.92, 0.96];
  const amber: [number, number, number] = [1.0, 0.78, 0.5];
  let i = 0;
  let attempts = 0;
  while (i < count && attempts < count * 14) {
    attempts++;
    const p = sampleShell(2000, attempts, radius, jitter);
    const density = (fbm3D(p[0] * 1.7, p[1] * 1.7, p[2] * 1.7, 4) + 1) * 0.5;
    if (density < 0.42 && hash01(attempts * 53 + 7) > 0.22) continue;
    positions[i * 3] = p[0];
    positions[i * 3 + 1] = p[1];
    positions[i * 3 + 2] = p[2];

    const tempBias = (fbm3D(p[0] * 4.3 + 11, p[1] * 4.3 - 7, p[2] * 4.3 + 3, 3) + 1) * 0.5;
    let c: [number, number, number];
    if (tempBias < 0.45) c = mixRgb(blue, white, tempBias / 0.45);
    else c = mixRgb(white, amber, (tempBias - 0.45) / 0.55);

    const stoch = hash01(attempts * 191 + 17);
    const brightness = (0.45 + density * 0.55) * (0.65 + stoch * 0.55);
    colors[i * 3] = c[0] * brightness;
    colors[i * 3 + 1] = c[1] * brightness;
    colors[i * 3 + 2] = c[2] * brightness;
    i++;
  }
  return { positions, colors };
}

function buildHeroGalaxies(count: number, radius: number, jitter: number): Layer {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette: [number, number, number][] = [
    [1.0, 0.85, 0.6],
    [1.0, 0.72, 0.45],
    [0.95, 0.95, 1.0],
    [0.85, 0.9, 1.0],
  ];
  let i = 0;
  let attempts = 0;
  while (i < count && attempts < count * 30) {
    attempts++;
    const p = sampleShell(5000, attempts, radius, jitter);
    const density = (fbm3D(p[0] * 1.7, p[1] * 1.7, p[2] * 1.7, 4) + 1) * 0.5;
    if (density < 0.62) continue;
    positions[i * 3] = p[0];
    positions[i * 3 + 1] = p[1];
    positions[i * 3 + 2] = p[2];
    const pickIdx = Math.floor(hash01(attempts * 31 + 9) * palette.length);
    const c = palette[pickIdx] ?? palette[0]!;
    const brightness = 0.85 + 0.55 * density;
    colors[i * 3] = c[0] * brightness;
    colors[i * 3 + 1] = c[1] * brightness;
    colors[i * 3 + 2] = c[2] * brightness;
    i++;
  }
  return { positions, colors };
}

function buildReionShell(count: number, radius: number, jitter: number): Layer {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const p = sampleShell(8000, i, radius, jitter);
    positions[i * 3] = p[0];
    positions[i * 3 + 1] = p[1];
    positions[i * 3 + 2] = p[2];
  }
  return { positions, colors };
}

function buildCmbShell(count: number, radius: number, jitter: number): Layer {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const red: [number, number, number] = [0.95, 0.45, 0.35];
  const neutral: [number, number, number] = [0.55, 0.58, 0.68];
  const blue: [number, number, number] = [0.4, 0.55, 0.95];
  for (let i = 0; i < count; i++) {
    const p = sampleShell(12000, i, radius, jitter);
    positions[i * 3] = p[0];
    positions[i * 3 + 1] = p[1];
    positions[i * 3 + 2] = p[2];
    const lo = fbm3D(p[0] * 3.1, p[1] * 3.1, p[2] * 3.1, 4);
    const hi = fbm3D(p[0] * 9.3 + 13, p[1] * 9.3 - 7, p[2] * 9.3 + 5, 2);
    const n = lo * 0.7 + hi * 0.3;
    let c: [number, number, number];
    if (n >= 0) c = mixRgb(neutral, red, Math.min(1, n * 1.4));
    else c = mixRgb(neutral, blue, Math.min(1, -n * 1.4));
    const dim = 0.55;
    colors[i * 3] = c[0] * dim;
    colors[i * 3 + 1] = c[1] * dim;
    colors[i * 3 + 2] = c[2] * dim;
  }
  return { positions, colors };
}
