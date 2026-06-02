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
import { Vector2 } from "three";
import { useUiStore } from "@/src-physics/store/useUiStore";

const CHROMATIC_OFFSET = new Vector2(0.0005, 0.0005);

/**
 * Post-processing pipeline for the 3D universe section.
 *
 * Quality tiers (base):
 *   high   — SMAA + Bloom + Vignette + Chromatic Aberration + Noise
 *   medium — SMAA + Bloom + Vignette
 *   low    — SMAA + Vignette only
 *
 * Runtime degradation (cumulative, overrides tiers):
 *   >= 1 — Bloom disabled
 *   >= 4 — Vignette + SMAA only (remove CA, Noise)
 */
export function PostFX() {
  const quality = useUiStore((s) => s.qualityTier);
  const degLevel = useUiStore((s) => s.degradationLevel);

  if (quality === "low" || degLevel >= 4) {
    return (
      <EffectComposer multisampling={0}>
        <SMAA />
        <Vignette offset={0.5} darkness={0.4} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    );
  }

  if (quality === "medium" || degLevel >= 1) {
    if (quality === "high" && degLevel < 4) {
      return (
        <EffectComposer multisampling={0}>
          <SMAA />
          <Vignette offset={0.5} darkness={0.45} blendFunction={BlendFunction.NORMAL} />
          <ChromaticAberration
            offset={CHROMATIC_OFFSET}
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
        </EffectComposer>
      );
    }

    return (
      <EffectComposer multisampling={0}>
        <SMAA />
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
      <ChromaticAberration
        offset={CHROMATIC_OFFSET}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}
