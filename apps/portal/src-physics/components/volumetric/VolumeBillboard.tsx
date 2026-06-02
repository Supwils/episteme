"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { volumeVert } from "@/src-physics/shaders/volumeRaymarch.frag.glsl";
import { volumeFrag } from "@/src-physics/shaders/volumeRaymarch.frag.glsl";

type Props = {
  /** Bright center color (linear space RGB, values can exceed 1). */
  coreColor?: [number, number, number];
  /** Dim outer color. */
  haloColor?: [number, number, number];
  /** Density multiplier — higher = more opaque. */
  density?: number;
  /** Billboard radius in scene units. */
  radius?: number;
  /** Raymarch step count (4-6 recommended). */
  steps?: number;
  /** Parent opacity for cross-fade. */
  opacity?: number;
};

/**
 * View-aligned billboard with a volumetric raymarch glow.
 *
 * Used for:
 *   — T0 CMB anisotropy glow (warm pink-white)
 *   — T4 Sgr A* accretion glow (hot orange)
 *   — T6 Solar corona (yellow-white)
 *
 * The shader performs a lightweight 4-6 step raymarch through 3D FBM
 * noise to produce a soft, organic volumetric appearance. The billboard
 * always faces the camera (Three.js handles this via the lack of
 * rotation — the quad is placed in world space and the camera-relative
 * orientation is managed by the parent scene).
 */
export function VolumeBillboard({
  coreColor = [1.2, 0.8, 0.4],
  haloColor = [0.6, 0.3, 0.15],
  density = 1.0,
  radius = 0.5,
  steps = 6,
  opacity = 1,
}: Props) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uCoreColor: { value: new THREE.Color(...coreColor) },
      uHaloColor: { value: new THREE.Color(...haloColor) },
      uDensity: { value: density },
      uTime: { value: 0 },
      uSteps: { value: steps },
    }),
    [coreColor, haloColor, density, steps],
  );

  useFrame((state) => {
    if (matRef.current?.uniforms?.uTime) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      matRef.current.opacity = opacity;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[radius * 2, radius * 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={volumeVert}
        fragmentShader={volumeFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
