import type gsap from "gsap";
import type { Vector3 } from "three";
import type { TierId } from "@/subjects/physics/lib/tier";

/**
 * Imperative camera control surface exposed by the persistent CameraRig
 * that lives inside the universe-level `<Canvas>`. The rig registers
 * itself here at mount so non-R3F code (transition hooks, HUD actions)
 * can move the camera without crossing the React/Three boundary.
 */
export type CameraRigApi = {
  /**
   * Smoothly move the camera so it sits `distance` units away from
   * `target`, looking at it. Returns the GSAP timeline for chaining.
   */
  flyTo: (
    target: Vector3,
    distance: number,
    opts?: { fov?: number; duration?: number }
  ) => gsap.core.Timeline;
  /** Snap immediately without animation; used for reduced-motion. */
  jumpTo: (target: Vector3, distance: number, opts?: { fov?: number }) => void;
  /** Enable or disable user orbit input during transitions. */
  setUserControl: (enabled: boolean) => void;
  /**
   * Push the camera toward (positive amount) or away from (negative
   * amount) the current orbit target while preserving the look-direction.
   * Used during dissolve transitions for a subtle dolly.
   */
  dollyBy: (amount: number, duration: number) => void;
  /**
   * Sweep the camera around the orbit target on the horizontal plane by
   * `angle` radians. Used during tunnel transitions to inject motion
   * while the overlay covers the scene.
   */
  spinAroundTarget: (angle: number, duration: number) => void;
  /**
   * Settle to the tier's framing after a transition. T4/T6 use an
   * aspect-aware distance and a readable disk elevation; other tiers
   * preserve the direction from the orbit target.
   */
  settleForTier: (tier: TierId, duration: number) => void;
};

let current: CameraRigApi | null = null;

export function registerCameraRig(api: CameraRigApi): () => void {
  current = api;
  return () => {
    if (current === api) current = null;
  };
}

export function getCameraRig(): CameraRigApi | null {
  return current;
}
