"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, BackSide, type Mesh } from "three";

type Props = {
  color: string;
  opacity: number;
  glow: number;
};

export function MarkerStarPoint({ color, opacity, glow }: Props) {
  const ringRef = useRef<Mesh>(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005;
      const mat = ringRef.current.material as { opacity?: number };
      mat.opacity = 0.3 * opacity * glow;
    }
  });

  return (
    <>
      <mesh>
        <sphereGeometry args={[0.8, 14, 14]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={(0.8 + glow * 0.2) * opacity}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.2 + glow * 0.8, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15 * opacity * (0.3 + glow * 0.7)}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.35, 48]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0}
          depthWrite={false}
          side={BackSide}
        />
      </mesh>
    </>
  );
}
