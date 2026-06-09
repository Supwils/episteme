"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, type Mesh, type MeshBasicMaterial } from "three";

type Props = {
  color: string;
  opacity: number;
  glowRef: React.RefObject<number>;
};

export function MarkerPinNeedle({ color, opacity, glowRef }: Props) {
  const coreMatRef = useRef<MeshBasicMaterial>(null);
  const haloMatRef = useRef<MeshBasicMaterial>(null);
  const haloMeshRef = useRef<Mesh>(null);

  useFrame(() => {
    const glow = glowRef.current;
    if (coreMatRef.current) {
      coreMatRef.current.opacity = (0.85 + glow * 0.15) * opacity;
    }
    if (haloMatRef.current) {
      haloMatRef.current.opacity = 0.08 * opacity * (0.2 + glow * 0.8);
    }
    if (haloMeshRef.current) {
      const r = 0.9 + glow * 0.3;
      haloMeshRef.current.scale.setScalar(r / 0.9);
    }
  });

  return (
    <>
      <mesh>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial
          ref={coreMatRef}
          color={color}
          transparent
          opacity={0.85 * opacity}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh ref={haloMeshRef}>
        <sphereGeometry args={[0.9, 8, 8]} />
        <meshBasicMaterial
          ref={haloMatRef}
          color={color}
          transparent
          opacity={0.08 * opacity * 0.2}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </>
  );
}
