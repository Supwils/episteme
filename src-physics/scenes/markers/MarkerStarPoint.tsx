"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, BackSide, type Mesh, type MeshBasicMaterial } from "three";

type Props = {
  color: string;
  opacity: number;
  glowRef: React.RefObject<number>;
};

export function MarkerStarPoint({ color, opacity, glowRef }: Props) {
  const ringRef = useRef<Mesh>(null);
  const haloMatRef = useRef<MeshBasicMaterial>(null);
  const haloMeshRef = useRef<Mesh>(null);

  useFrame(() => {
    const glow = glowRef.current;
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005;
      const mat = ringRef.current.material as MeshBasicMaterial;
      mat.opacity = 0.3 * opacity * glow;
    }
    if (haloMatRef.current && haloMeshRef.current) {
      haloMatRef.current.opacity = 0.15 * opacity * (0.3 + glow * 0.7);
      const r = 1.2 + glow * 0.8;
      haloMeshRef.current.scale.setScalar(r / 1.2);
    }
  });

  return (
    <>
      <mesh>
        <sphereGeometry args={[0.8, 14, 14]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8 * opacity}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh ref={haloMeshRef}>
        <sphereGeometry args={[1.2, 12, 12]} />
        <meshBasicMaterial
          ref={haloMatRef}
          color={color}
          transparent
          opacity={0.15 * opacity * 0.3}
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
