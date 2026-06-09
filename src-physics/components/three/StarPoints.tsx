"use client";

import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, type BufferGeometry, type ShaderMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import { starPointVert } from "@/src-physics/shaders/starPoint.vert.glsl";
import {
  starPointFrag,
  starPointVertColor,
  starPointFragColor,
} from "@/src-physics/shaders/starPoint.frag.glsl";
import { getParticleScale, subsamplePositions, subsample1 } from "@/src-physics/lib/lod";
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
  const matRef = useRef<ShaderMaterial>(null);
  const geomRef = useRef<BufferGeometry>(null);
  const qualityTier = useUiStore((s) => s.qualityTier);
  const useVertexColors = colors !== undefined;

  const particleScale = getParticleScale(qualityTier);

  const { scaledPositions, scaledColors, scaledSizes, scaledTemps, scaledBrights, count } =
    useMemo(() => {
      const sp = subsamplePositions(positions, particleScale);
      const sc = colors ? subsamplePositions(colors, particleScale) : undefined;
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
      uSizeMultiplier: { value: 1 },
    }),
    []
  );

  useEffect(() => {
    if (matRef.current) {
      matRef.current.uniforms.uPixelRatio!.value = Math.min(window.devicePixelRatio, 2);
    }
  }, []);

  useEffect(() => {
    if (matRef.current) {
      matRef.current.uniforms.uSizeMultiplier!.value = sizeMultiplier;
    }
  }, [sizeMultiplier]);

  const lastOpacity = useRef(opacity);
  useFrame(() => {
    if (matRef.current && lastOpacity.current !== opacity) {
      matRef.current.opacity = opacity;
      lastOpacity.current = opacity;
    }
  });

  useEffect(() => {
    const mat = matRef.current;
    return () => {
      mat?.dispose();
    };
  }, []);

  useEffect(() => {
    const geom = geomRef.current;
    if (!geom) return;

    function patchAttr(
      attr: import("three").BufferAttribute | undefined,
      array: Float32Array,
      itemSize: number
    ) {
      if (!attr) return;
      const ba = attr as BufferAttribute;
      ba.array = array;
      // Three.js types mark count as readonly but it's writable at runtime
      // @ts-expect-error — count is writable on WebGLBufferAttribute
      ba.count = array.length / itemSize;
      ba.needsUpdate = true;
    }

    patchAttr(geom.attributes.position as BufferAttribute | undefined, scaledPositions, 3);
    patchAttr(geom.attributes.aSize as BufferAttribute | undefined, aSize, 1);
    patchAttr(geom.attributes.aTemp as BufferAttribute | undefined, aTemp, 1);
    patchAttr(geom.attributes.aBrightness as BufferAttribute | undefined, aBright, 1);
    if (useVertexColors && scaledColors) {
      patchAttr(geom.attributes.color as BufferAttribute | undefined, scaledColors, 3);
    }
    geom.setDrawRange(0, count);
  }, [scaledPositions, scaledColors, aSize, aTemp, aBright, useVertexColors, count]);

  useEffect(() => {
    const geom = geomRef.current;
    return () => {
      geom?.dispose();
    };
  }, []);

  return (
    <points>
      <bufferGeometry ref={geomRef}>
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
        blending={AdditiveBlending}
        vertexColors={useVertexColors}
      />
    </points>
  );
}
