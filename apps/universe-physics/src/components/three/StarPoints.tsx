"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { starPointVert } from "@/shaders/starPoint.vert.glsl";
import {
  starPointFrag,
  starPointVertColor,
  starPointFragColor,
} from "@/shaders/starPoint.frag.glsl";
import { useUiStore } from "@/store/useUiStore";

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
  const degradationLevel = useUiStore((s) => s.degradationLevel);
  const halvePoints = degradationLevel >= 3;

  const { reducedPositions, reducedSizes, reducedTemps, reducedBrightnesses, reducedColors } =
    useMemo(() => {
      if (!halvePoints) {
        return {
          reducedPositions: positions,
          reducedSizes: sizes,
          reducedTemps: temps,
          reducedBrightnesses: brightnesses,
          reducedColors: colors,
        };
      }
      const halfCount = Math.floor(positions.length / 6);
      const rPos = new Float32Array(halfCount * 3);
      const rSz = sizes ? new Float32Array(halfCount) : undefined;
      const rTp = temps ? new Float32Array(halfCount) : undefined;
      const rBr = brightnesses ? new Float32Array(halfCount) : undefined;
      const rCl = colors ? new Float32Array(halfCount * 3) : undefined;
      for (let i = 0; i < halfCount; i++) {
        rPos[i * 3] = positions[i * 6]!;
        rPos[i * 3 + 1] = positions[i * 6 + 1]!;
        rPos[i * 3 + 2] = positions[i * 6 + 2]!;
        if (rSz) rSz[i] = sizes![i * 2]!;
        if (rTp) rTp[i] = temps![i * 2]!;
        if (rBr) rBr[i] = brightnesses![i * 2]!;
        if (rCl) {
          rCl[i * 3] = colors![i * 6]!;
          rCl[i * 3 + 1] = colors![i * 6 + 1]!;
          rCl[i * 3 + 2] = colors![i * 6 + 2]!;
        }
      }
      return {
        reducedPositions: rPos,
        reducedSizes: rSz,
        reducedTemps: rTp,
        reducedBrightnesses: rBr,
        reducedColors: rCl,
      };
    }, [positions, sizes, temps, brightnesses, colors, halvePoints]);

  const count = reducedPositions.length / 3;
  const useVertexColors = reducedColors !== undefined;

  const { aSize, aTemp, aBright } = useMemo(() => {
    const sz = reducedSizes ?? new Float32Array(count).fill(baseSize);
    const tp = reducedTemps ?? new Float32Array(count).fill(baseTemp);
    const br = reducedBrightnesses ?? new Float32Array(count).fill(baseBrightness);
    return { aSize: sz, aTemp: tp, aBright: br };
  }, [reducedSizes, reducedTemps, reducedBrightnesses, count, baseSize, baseTemp, baseBrightness]);

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
        <bufferAttribute attach="attributes-position" args={[reducedPositions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[aSize, 1]} />
        <bufferAttribute attach="attributes-aTemp" args={[aTemp, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[aBright, 1]} />
        {useVertexColors && reducedColors ? (
          <bufferAttribute attach="attributes-color" args={[reducedColors, 3]} />
        ) : null}
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
