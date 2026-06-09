"use client";

import gsap from "gsap";
import { useCallback } from "react";
import { Vector3 } from "three";
import { prefersReducedMotion } from "@/lib/a11y";
import {
  isUniverseTierId,
  tierIndex,
  transitionKind,
  type AnyTierId,
  type TransitionKind,
  type UniverseTierId,
} from "@/subjects/physics/lib/tier";
import { useUniverseStore } from "@/subjects/physics/store/useUniverseStore";
import { getCameraRig } from "./cameraRegistry";
import { TIER_DEFAULT_DISTANCE } from "./tierFraming";

const DURATION_SEC: Record<TransitionKind, number> = {
  zoom: 1.2,
  dissolve: 1.5,
  tunnel: 1.8,
};

const REDUCED_DURATION_SEC = 0.2;

/** How much to dolly inward (positive) or outward (negative) during dissolve. */
const DISSOLVE_DOLLY = 0.18;

/** How much to spin around the orbit target during tunnel. */
const TUNNEL_SPIN_RAD = 0.55;

/**
 * Hook returning a `goTo(tier)` function that orchestrates the three
 * transition kinds via a GSAP timeline. The timeline drives the store's
 * transition progress (the scene swap, knowledge-panel pulses, HUD
 * overlays all key off it) while a parallel camera animation runs on
 * the persistent rig so the user feels motion across the cut.
 *
 *   • zoom: camera flies between current and the new tier's comfort
 *     distance over the full duration (scenes are similar-scale, the
 *     ramp is the entire effect).
 *   • dissolve: camera dollies slightly toward the orbit target — going
 *     deeper feels like pressing in, going up feels like pulling back.
 *   • tunnel: camera spins around the target so the TunnelOverlay
 *     covers a visible camera move; at the end, settleForTier snaps to
 *     the new tier's comfort framing (hidden under the overlay).
 *
 * `prefers-reduced-motion` short-circuits to a 200 ms fade and only the
 * settle step runs on the camera (no spin / dolly).
 */
export function useTierTransition() {
  return useCallback((to: AnyTierId) => {
    // This hook only orchestrates universe 3D camera moves. Cross-section
    // navigation goes through useHandwrittenTransition + section router.
    if (!isUniverseTierId(to)) return;
    const targetUniv = to as UniverseTierId;
    const store = useUniverseStore.getState();
    if (store.transition.active) return;
    const from = store.currentTier;
    if (from === targetUniv) return;
    if (!isUniverseTierId(from)) return;
    const fromUniv = from as UniverseTierId;

    const kind = transitionKind(fromUniv, targetUniv);
    useUniverseStore.getState().startTransition(fromUniv, targetUniv, kind);

    const reduced = prefersReducedMotion();
    const duration = reduced ? REDUCED_DURATION_SEC : DURATION_SEC[kind];

    const rig = getCameraRig();
    if (rig && !reduced) {
      const goingDeeper = tierIndex(targetUniv) > tierIndex(fromUniv);
      if (kind === "dissolve") {
        rig.dollyBy(goingDeeper ? DISSOLVE_DOLLY : -DISSOLVE_DOLLY, duration);
      } else if (kind === "tunnel") {
        rig.spinAroundTarget(TUNNEL_SPIN_RAD, duration);
      } else if (kind === "zoom") {
        rig.flyTo(new Vector3(0, 0, 0), TIER_DEFAULT_DISTANCE[targetUniv], { duration });
      }
    }

    gsap
      .timeline({
        onUpdate(this: gsap.core.Timeline) {
          useUniverseStore.getState().setTransitionProgress(this.progress());
        },
        onComplete: () => {
          useUniverseStore.getState().finishTransition();
          if (rig) {
            // Tunnel was hidden under the overlay → snap. The others get a
            // short blend so user-driven orbit doesn't pop.
            const settleDuration = kind === "tunnel" ? 0 : 0.35;
            rig.settleForTier(targetUniv, reduced ? 0 : settleDuration);
          }
        },
      })
      .to({}, { duration, ease: "linear" });
  }, []);
}
