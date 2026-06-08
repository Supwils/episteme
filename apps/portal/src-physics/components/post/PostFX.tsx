"use client";

import { useMemo } from "react";
import { Vector2 } from "three";
import {
  EffectComposer,
  Bloom,
  Vignette,
  SMAA,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { useUiStore } from "@/src-physics/store/useUiStore";

/**
 * Post-processing pipeline for the 3D universe section.
 *
 * Quality tiers:
 *   high   — SMAA + Bloom + Vignette + Chromatic Aberration + Film Grain
 *   medium — SMAA + Bloom + Vignette
 *   low    — SMAA + Vignette only (mobile / low-end devices)
 */
export function PostFX() {
  const quality = useUiStore((s) => s.qualityTier);
  const chromaticOffset = useMemo(() => new Vector2(0.0005, 0.0005), []);

  if (quality === "low") {
    return (
      <EffectComposer multisampling={0}>
        <SMAA />
        <Vignette offset={0.5} darkness={0.4} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    );
  }

  if (quality === "medium") {
    return (
      <EffectComposer multisampling={0}>
        <SMAA />
        <Bloom
          intensity={0.5}
          luminanceThreshold={1.0}
          luminanceSmoothing={0.2}
          kernelSize={KernelSize.MEDIUM}
          mipmapBlur
        />
        <Vignette offset={0.5} darkness={0.45} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0}>
      <SMAA />
      <Bloom
        intensity={0.6}
        luminanceThreshold={1.0}
        luminanceSmoothing={0.2}
        kernelSize={KernelSize.LARGE}
        mipmapBlur
      />
      <Vignette offset={0.5} darkness={0.45} blendFunction={BlendFunction.NORMAL} />
      <ChromaticAberration offset={chromaticOffset} radialModulation={false} modulationOffset={0} />
      <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}
