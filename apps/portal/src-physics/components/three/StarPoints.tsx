"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { starPointVert } from "@/src-physics/shaders/starPoint.vert.glsl";
import {
  starPointFrag,
  starPointVertColor,
  starPointFragColor,
} from "@/src-physics/shaders/starPoint.frag.glsl";

type StarPointsProps = {
  /** Flat array of [x, y, z, x, y, z, ...] positions. */
  positions: Float32Array;
  /** Per-point size in pixels. If omitted, defaults to uniform `baseSize`. */
  sizes?: Float32Array;
  /** Per-point spectral temperature 0..1. If omitted, defaults to `baseTemp`. */
  temps?: Float32Array;
  /** Per-point brightness 0..1. If omitted, defaults to 1. */
  brightnesses?: Float32Array;
  /** Per-point RGB colors [r, g, b, r, g, b, ...]. When provided, overrides spectral ramp. */
  colors?: Float32Array;
  /** Fallback size when `sizes` is not provided. */
  baseSize?: number;
  /** Fallback temperature when `temps` is not provided. */
  baseTemp?: number;
  /** Fallback brightness when `brightnesses` is not provided. */
  baseBrightness?: number;
  /** Global size multiplier passed to the shader. */
  sizeMultiplier?: number;
  /** Parent opacity for cross-fade support (written to material each frame). */
  opacity?: number;
};

/**
 * Reusable soft-edged star/galaxy point cloud with custom shader.
 *
 * Replaces `<points>` + `<pointsMaterial>` across all 8 universe scenes.
 * The custom vertex/fragment shader provides:
 *   — circular soft-edged points (no more squares)
 *   — per-vertex size, temperature, and brightness
 *   — spectral color ramp (cool blue → neutral → warm red)
 *   — distance attenuation
 *
 * When `colors` is provided, uses vertex-color mode instead of the
 * spectral temperature ramp.
 */
export function StarPoints({
  positions,
  sizes,
  temps,
  brightnesses,
  colors,
  baseSize = 4,
  baseTemp = 0.5,
  baseBrightness = 1,
  sizeMultiplier = 1,
  opacity = 1,
}: StarPointsProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const count = positions.length / 3;
  const useVertexColors = colors !== undefined;

  const { aSize, aTemp, aBright } = useMemo(() => {
    const sz = sizes ?? new Float32Array(count).fill(baseSize);
    const tp = temps ?? new Float32Array(count).fill(baseTemp);
    const br = brightnesses ?? new Float32Array(count).fill(baseBrightness);
    return { aSize: sz, aTemp: tp, aBright: br };
  }, [sizes, temps, brightnesses, count, baseSize, baseTemp, baseBrightness]);

  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSizeMultiplier: { value: sizeMultiplier },
    }),
    [sizeMultiplier],
  );

  useFrame(() => {
    if (matRef.current) {
      matRef.current.opacity = opacity;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[aSize, 1]} />
        <bufferAttribute attach="attributes-aTemp" args={[aTemp, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[aBright, 1]} />
        {useVertexColors && colors && (
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        )}
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={useVertexColors ? starPointVertColor : starPointVert}
        fragmentShader={useVertexColors ? starPointFragColor : starPointFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={useVertexColors}
      />
    </points>
  );
}
