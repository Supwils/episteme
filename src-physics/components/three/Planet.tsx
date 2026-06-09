"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { type BufferGeometry, type Mesh, type MeshStandardMaterial } from "three";
import { getPlanetTexture, type PlanetTextureKey } from "@/src-physics/lib/planetTextures";
import { useUiStore } from "@/src-physics/store/useUiStore";

type PlanetProps = {
  textureKey: PlanetTextureKey;
  radius: number;
  position?: [number, number, number];
  /** Axial tilt in degrees (rotated around X before render). */
  axialTilt?: number;
  /** Self-rotation speed (rad/s). Skipped under reduced-motion. */
  spin?: number;
  /** Per-frame opacity (for cross-fade with parent scene). */
  opacity?: number;
  /** Sphere segments — defaults to 32 for performance. */
  segments?: number;
  /** Optional emissive boost; useful for dark side of distant planets. */
  emissiveIntensity?: number;
};

/**
 * Textured planet sphere. Uses `meshStandardMaterial` so it picks up
 * the scene's pointLight (typically positioned at the Sun). Reads from
 * the planet-texture cache; if the texture is still loading the
 * placeholder colour is shown for that single frame.
 */
export function Planet({
  textureKey,
  radius,
  position = [0, 0, 0],
  axialTilt = 0,
  spin = 0.05,
  opacity = 1,
  segments = 32,
  emissiveIntensity = 0.05,
}: PlanetProps) {
  const meshRef = useRef<Mesh>(null);
  const matRef = useRef<MeshStandardMaterial>(null);
  const geomRef = useRef<BufferGeometry>(null);
  const reducedMotion = useUiStore((s) => s.reducedMotion);
  const map = useMemo(() => getPlanetTexture(textureKey), [textureKey]);
  const tiltRad = (axialTilt * Math.PI) / 180;
  const textureSwapped = useRef(false);

  useEffect(() => {
    textureSwapped.current = false;
  }, [textureKey]);

  useFrame((_, dt) => {
    if (meshRef.current && !reducedMotion) {
      meshRef.current.rotation.y += dt * spin;
    }
    if (matRef.current) {
      matRef.current.opacity = opacity;
      if (!textureSwapped.current) {
        const fresh = getPlanetTexture(textureKey);
        if (fresh !== map) {
          matRef.current.map = fresh;
          matRef.current.needsUpdate = true;
          textureSwapped.current = true;
        }
      }
    }
  });

  useEffect(() => {
    const mat = matRef.current;
    const geom = geomRef.current;
    return () => {
      mat?.dispose();
      geom?.dispose();
    };
  }, []);

  return (
    <mesh ref={meshRef} position={position} rotation={[tiltRad, 0, 0]}>
      <sphereGeometry ref={geomRef} args={[radius, segments, segments]} />
      <meshStandardMaterial
        ref={matRef}
        map={map}
        transparent
        depthWrite
        roughness={0.95}
        metalness={0}
        emissive="#101418"
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}
