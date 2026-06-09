"use client";

import {
  EffectComposer,
  Bloom,
  Vignette,
  SMAA,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { useUiStore } from "@/store/useUiStore";

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

  if (quality === "low") {
    return (
      <EffectComposer key="low" multisampling={0}>
        <SMAA />
        <Vignette offset={0.5} darkness={0.4} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    );
  }

  if (quality === "medium") {
    return (
      <EffectComposer key="medium" multisampling={0}>
        <SMAA />
        <Bloom
          intensity={0.6}
          luminanceThreshold={1.0}
          luminanceSmoothing={0.2}
          kernelSize={KernelSize.LARGE}
          mipmapBlur
        />
        <Vignette offset={0.5} darkness={0.45} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer key="high" multisampling={0}>
      <SMAA />
      <Bloom
        intensity={0.6}
        luminanceThreshold={1.0}
        luminanceSmoothing={0.2}
        kernelSize={KernelSize.LARGE}
        mipmapBlur
      />
      <Vignette offset={0.5} darkness={0.45} blendFunction={BlendFunction.NORMAL} />
      <ChromaticAberration
        offset={[0.0005, 0.0005] as unknown as import("three").Vector2}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}
