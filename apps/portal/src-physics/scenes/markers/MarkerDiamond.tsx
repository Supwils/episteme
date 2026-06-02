"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BackSide, type MeshBasicMaterial } from "three";

type Props = {
  color: string;
  opacity: number;
  glowRef: React.RefObject<number>;
};

export function MarkerDiamond({ color, opacity, glowRef }: Props) {
  const diamondSize = 1.2;
  const thickness = 0.12;
  const ringMatRef = useRef<MeshBasicMaterial>(null);
  const haloMatRef = useRef<MeshBasicMaterial>(null);

  useFrame(() => {
    const glow = glowRef.current;
    if (ringMatRef.current) {
      ringMatRef.current.opacity = (0.7 + glow * 0.3) * opacity;
    }
    if (haloMatRef.current) {
      haloMatRef.current.opacity = 0.12 * opacity * (0.3 + glow * 0.7);
    }
  });

  return (
    <>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[diamondSize - thickness, diamondSize, 4]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color={color}
          transparent
          opacity={0.7 * opacity}
          depthWrite={false}
          side={BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 10, 10]} />
        <meshBasicMaterial color={color} transparent opacity={0.95 * opacity} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.7, 10, 10]} />
        <meshBasicMaterial
          ref={haloMatRef}
          color={color}
          transparent
          opacity={0.12 * opacity * 0.3}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
