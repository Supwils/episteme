"use client";

import { AdditiveBlending } from "three";

type Props = {
  color: string;
  opacity: number;
  glow: number;
};

export function MarkerPinNeedle({ color, opacity, glow }: Props) {
  return (
    <>
      <mesh>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={(0.85 + glow * 0.15) * opacity}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.9 + glow * 0.3, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08 * opacity * (0.2 + glow * 0.8)}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </>
  );
}
