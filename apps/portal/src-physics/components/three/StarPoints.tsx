"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { starPointVert } from "@/src-physics/shaders/starPoint.vert.glsl";
import {
  starPointFrag,
  starPointVertColor,
  starPointFragColor,
} from "@/src-physics/shaders/starPoint.frag.glsl";
import { getParticleScale } from "@/src-physics/lib/lod";
import { useUiStore } from "@/src-physics/store/useUiStore";

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

function subsample3(arr: Float32Array, scale: number): Float32Array {
  if (scale >= 1) return arr;
  const total = arr.length / 3;
  const keep = Math.max(1, Math.ceil(total * scale));
  if (keep >= total) return arr;
  const out = new Float32Array(keep * 3);
  const stride = total / keep;
  for (let i = 0; i < keep; i++) {
    const s = Math.floor(i * stride) * 3;
    out[i * 3] = arr[s]!;
    out[i * 3 + 1] = arr[s + 1]!;
    out[i * 3 + 2] = arr[s + 2]!;
  }
  return out;
}

function subsample1(arr: Float32Array, scale: number): Float32Array {
  if (scale >= 1) return arr;
  const keep = Math.max(1, Math.ceil(arr.length * scale));
  if (keep >= arr.length) return arr;
  const out = new Float32Array(keep);
  const stride = arr.length / keep;
  for (let i = 0; i < keep; i++) {
    out[i] = arr[Math.floor(i * stride)]!;
  }
  return out;
}

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
 *
 * Automatically subsamples particles on medium/low quality tiers to
 * maintain frame rate on lower-end devices.
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
  const qualityTier = useUiStore((s) => s.qualityTier);
  const useVertexColors = colors !== undefined;

  const particleScale = getParticleScale(qualityTier);

  const { scaledPositions, scaledColors, scaledSizes, scaledTemps, scaledBrights, count } =
    useMemo(() => {
      const sp = subsample3(positions, particleScale);
      const sc = colors ? subsample3(colors, particleScale) : undefined;
      const totalPoints = sp.length / 3;
      return {
        scaledPositions: sp,
        scaledColors: sc,
        scaledSizes: sizes ? subsample1(sizes, particleScale) : undefined,
        scaledTemps: temps ? subsample1(temps, particleScale) : undefined,
        scaledBrights: brightnesses ? subsample1(brightnesses, particleScale) : undefined,
        count: totalPoints,
      };
    }, [positions, colors, sizes, temps, brightnesses, particleScale]);

  const { aSize, aTemp, aBright } = useMemo(() => {
    const sz = scaledSizes ?? new Float32Array(count).fill(baseSize);
    const tp = scaledTemps ?? new Float32Array(count).fill(baseTemp);
    const br = scaledBrights ?? new Float32Array(count).fill(baseBrightness);
    return { aSize: sz, aTemp: tp, aBright: br };
  }, [scaledSizes, scaledTemps, scaledBrights, count, baseSize, baseTemp, baseBrightness]);

  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSizeMultiplier: { value: sizeMultiplier },
    }),
    [sizeMultiplier],
  );

  const lastOpacity = useRef(opacity);
  useFrame(() => {
    if (matRef.current && lastOpacity.current !== opacity) {
      matRef.current.opacity = opacity;
      lastOpacity.current = opacity;
    }
  });

  useEffect(() => {
    return () => {
      matRef.current?.dispose();
    };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[scaledPositions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[aSize, 1]} />
        <bufferAttribute attach="attributes-aTemp" args={[aTemp, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[aBright, 1]} />
        {useVertexColors && scaledColors && (
          <bufferAttribute attach="attributes-color" args={[scaledColors, 3]} />
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
