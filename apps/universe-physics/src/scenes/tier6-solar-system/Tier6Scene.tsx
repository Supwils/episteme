"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ComponentProps } from "react";
import { AdditiveBlending, BackSide, type Group, type Mesh } from "three";
import { getTierContent } from "@/content/cosmos";
import { StarPoints } from "@/components/three/StarPoints";
import { VolumeBillboard } from "@/components/volumetric/VolumeBillboard";
import { Planet } from "@/components/three/Planet";
import { SaturnRings } from "@/components/three/SaturnRings";
import { preloadPlanetTextures } from "@/lib/planetTextures";
import { SceneMarkers } from "../SceneMarkers";
import { useUiStore } from "@/store/useUiStore";
import {
  PLANETS,
  DWARFS,
  PLANET_TEXTURE_KEYS,
  rScene,
  orbitPos,
  buildSolarSystem,
} from "./planet-data";

type Props = ComponentProps<"group"> & {
  opacity?: number;
};

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

    if (flareRef.current) {
      const mat = flareRef.current.material as { opacity?: number };
      if (typeof mat.opacity === "number") {
        if (reducedMotion) {
          mat.opacity = 0.18 * opacity;
        } else {
          const t = state.clock.elapsedTime;
          const breathing = 0.18 + 0.06 * Math.sin(t * 0.28);
          const flarePhase = (t % 18) / 18;
          const spike = flarePhase < 0.08 ? Math.exp(-Math.pow((flarePhase - 0.04) * 28, 2)) : 0;
          mat.opacity = (breathing + spike * 0.45) * opacity;
        }
      }
    }
  });

  return (
    <group ref={group} {...groupProps}>
      <VolumeBillboard
        coreColor={[1.4, 0.9, 0.35]}
        haloColor={[0.8, 0.35, 0.1]}
        density={1.0}
        radius={0.16}
        steps={6}
        opacity={0.6 * opacity}
      />
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

      <pointLight position={[0, 0, 0]} intensity={2.4} distance={0} decay={0} color="#ffe9b0" />
      <ambientLight intensity={0.18} color="#b8c7ff" />

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

      <StarPoints positions={built.belt} baseTemp={0.7} baseSize={4} opacity={0.55 * opacity} />
      <StarPoints positions={built.kuiper} baseTemp={0.3} baseSize={5} opacity={0.4 * opacity} />

      {markers.length > 0 ? <SceneMarkers markers={markers} opacity={opacity} tierId="T6" /> : null}
    </group>
  );
}
