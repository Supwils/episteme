"use client";

import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useCallback, useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import type { UniverseTierId } from "@/subjects/physics/lib/tier";
import { useUniverseStore } from "@/subjects/physics/store/useUniverseStore";
import { diskFraming, TIER_DEFAULT_DISTANCE } from "./tierFraming";

export type OrbitHandle = {
  enabled: boolean;
  target: Vector3;
  update: () => void;
};

type Stamp = { tier: UniverseTierId; width: number; height: number };

function useAutomaticDiskFraming(
  tier: UniverseTierId,
  stamp: RefObject<Stamp | null>,
  settle: (tier: UniverseTierId, duration: number, preserveDirection?: boolean) => void
) {
  const camera = useThree((state) => state.camera);
  const { width, height } = useThree((state) => state.size);
  const currentTier = useUniverseStore((state) => state.currentTier);
  const transitionActive = useUniverseStore((state) => state.transition.active);
  useLayoutEffect(() => {
    if (transitionActive || currentTier !== tier) return;
    if (!(camera instanceof PerspectiveCamera) || !diskFraming(tier, width / height, camera.fov)) {
      stamp.current = null;
      return;
    }
    const previous = stamp.current;
    const entering = previous?.tier !== tier;
    if (previous?.tier === tier && previous.width === width && previous.height === height) return;
    // Resizing retains a user's orbit; entering a disk starts at its readable elevation.
    settle(tier, 0, !entering);
  }, [camera, tier, width, height, currentTier, transitionActive, settle, stamp]);
}

export function useTierFraming(
  tier: UniverseTierId,
  controls: RefObject<OrbitHandle | null>,
  stopCameraMotion: () => void
) {
  const camera = useThree((state) => state.camera);
  const get = useThree((state) => state.get);
  const { width, height } = useThree((state) => state.size);
  const stamp = useRef<Stamp | null>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const settle = useCallback(
    (nextTier: UniverseTierId, duration: number, preserveDirection = false) => {
      const size = get().size;
      const fov = camera instanceof PerspectiveCamera ? camera.fov : 50;
      const frame = diskFraming(nextTier, size.width / size.height, fov);
      const target = controls.current?.target ?? new Vector3();
      const offset = new Vector3().subVectors(camera.position, target);
      if (frame && !preserveDirection)
        offset.set(0, Math.sin(frame.elevation), Math.cos(frame.elevation));
      if (offset.lengthSq() === 0) offset.set(0, 0, 1);
      offset.normalize().multiplyScalar(frame?.distance ?? TIER_DEFAULT_DISTANCE[nextTier]);
      const end = target.clone().add(offset);
      stamp.current = { tier: nextTier, ...size };
      tween.current?.kill();
      stopCameraMotion();
      const update = () => {
        camera.lookAt(target);
        controls.current?.update();
      };
      if (duration <= 0) {
        camera.position.copy(end);
        update();
        return;
      }
      tween.current = gsap.to(camera.position, {
        x: end.x,
        y: end.y,
        z: end.z,
        duration,
        ease: "power2.inOut",
        onUpdate: update,
      });
    },
    [camera, get, controls, stopCameraMotion]
  );
  useAutomaticDiskFraming(tier, stamp, settle);
  useEffect(
    () => () => {
      tween.current?.kill();
    },
    []
  );
  const fov = camera instanceof PerspectiveCamera ? camera.fov : 50;
  const frame = diskFraming(tier, width / height, fov);
  return { settleForTier: settle, maxDistance: frame?.maxDistance ?? 6 };
}
