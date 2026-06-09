"use client";

import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { registerCameraRig, type CameraRigApi } from "./cameraRegistry";
import { TIER_DEFAULT_DISTANCE } from "./tierFraming";

type OrbitHandle = {
  enabled: boolean;
  target: Vector3;
  update: () => void;
};

export function CameraRig() {
  const camera = useThree((state) => state.camera);
  const controlsRef = useRef<OrbitHandle | null>(null);
  const [userControl, setUserControl] = useState(true);

  useEffect(() => {
    const getTarget = () => controlsRef.current?.target ?? new Vector3();

    const api: CameraRigApi = {
      flyTo(target, distance, opts = {}) {
        const { fov, duration = 1.2 } = opts;
        const tl = gsap.timeline();

        const offset = new Vector3().subVectors(camera.position, target);
        if (offset.lengthSq() === 0) offset.set(0, 0, 1);
        offset.normalize().multiplyScalar(distance);
        const endPos = new Vector3().addVectors(target, offset);

        tl.to(camera.position, {
          x: endPos.x,
          y: endPos.y,
          z: endPos.z,
          duration,
          ease: "power2.inOut",
          onUpdate: () => {
            const controls = controlsRef.current;
            if (controls) controls.target.copy(target);
          },
        });

        if (fov !== undefined && camera instanceof PerspectiveCamera) {
          tl.to(
            camera,
            {
              fov,
              duration,
              ease: "power2.inOut",
              onUpdate: () => camera.updateProjectionMatrix(),
            },
            0,
          );
        }

        return tl;
      },
      jumpTo(target, distance, opts = {}) {
        const offset = new Vector3().subVectors(camera.position, target);
        if (offset.lengthSq() === 0) offset.set(0, 0, 1);
        offset.normalize().multiplyScalar(distance);
        camera.position.copy(target).add(offset);
        camera.lookAt(target);
        if (opts.fov !== undefined && camera instanceof PerspectiveCamera) {
          camera.fov = opts.fov;
          camera.updateProjectionMatrix();
        }
        const controls = controlsRef.current;
        if (controls) {
          controls.target.copy(target);
          controls.update();
        }
      },
      setUserControl(enabled) {
        setUserControl(enabled);
      },
      dollyBy(amount, duration) {
        const target = getTarget();
        const offset = new Vector3().subVectors(camera.position, target);
        const currentLen = offset.length();
        if (currentLen === 0) return;
        const newLen = Math.max(0.12, currentLen - amount);
        const dir = offset.divideScalar(currentLen);
        const endPos = new Vector3().addVectors(target, dir.multiplyScalar(newLen));
        gsap.to(camera.position, {
          x: endPos.x,
          y: endPos.y,
          z: endPos.z,
          duration,
          ease: "power2.inOut",
        });
      },
      spinAroundTarget(angle, duration) {
        const target = getTarget();
        const offset = new Vector3().subVectors(camera.position, target);
        const radius = Math.hypot(offset.x, offset.z);
        if (radius === 0) return;
        const startAzimuth = Math.atan2(offset.z, offset.x);
        const elevation = offset.y;
        const tween = { t: 0 };
        gsap.to(tween, {
          t: 1,
          duration,
          ease: "power2.inOut",
          onUpdate: () => {
            const az = startAzimuth + angle * tween.t;
            camera.position.set(
              target.x + Math.cos(az) * radius,
              target.y + elevation,
              target.z + Math.sin(az) * radius,
            );
            camera.lookAt(target);
          },
        });
      },
      settleForTier(tier, duration) {
        const target = getTarget();
        const wantedDistance = TIER_DEFAULT_DISTANCE[tier];
        const offset = new Vector3().subVectors(camera.position, target);
        if (offset.lengthSq() === 0) offset.set(0, 0, 1);
        offset.normalize().multiplyScalar(wantedDistance);
        const endPos = new Vector3().addVectors(target, offset);
        if (duration <= 0) {
          camera.position.copy(endPos);
          camera.lookAt(target);
          controlsRef.current?.update();
          return;
        }
        gsap.to(camera.position, {
          x: endPos.x,
          y: endPos.y,
          z: endPos.z,
          duration,
          ease: "power2.inOut",
          onComplete: () => controlsRef.current?.update(),
        });
      },
    };
    return registerCameraRig(api);
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef as never}
      enabled={userControl}
      enableDamping
      dampingFactor={0.12}
      minDistance={1.2}
      maxDistance={6}
      enablePan={false}
      rotateSpeed={0.6}
    />
  );
}
