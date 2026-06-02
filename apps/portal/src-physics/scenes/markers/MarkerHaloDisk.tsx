"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, BackSide, type Group, type MeshBasicMaterial } from "three";

type Props = {
  color: string;
  opacity: number;
  glowRef: React.RefObject<number>;
};

export function MarkerHaloDisk({ color, opacity, glowRef }: Props) {
  const ringRef = useRef<Group>(null);
  const outerMatRef = useRef<MeshBasicMaterial>(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.003;
    }
    if (outerMatRef.current) {
      outerMatRef.current.opacity = 0.18 * opacity * (0.5 + glowRef.current * 0.5);
    }
  });

  return (
    <>
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.9 * opacity}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.6, 12, 12]} />
        <meshBasicMaterial
          ref={outerMatRef}
          color={color}
          transparent
          opacity={0.18 * opacity * 0.5}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.0, 2.15, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.25 * opacity * 0.4}
            depthWrite={false}
            side={BackSide}
          />
        </mesh>
      </group>
    </>
  );
}
