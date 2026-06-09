"use client";

import { BackSide } from "three";

type Props = {
  color: string;
  opacity: number;
  glow: number;
};

export function MarkerDiamond({ color, opacity, glow }: Props) {
  const diamondSize = 1.2;
  const thickness = 0.12;

  return (
    <>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[diamondSize - thickness, diamondSize, 4]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={(0.7 + glow * 0.3) * opacity}
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
          color={color}
          transparent
          opacity={0.12 * opacity * (0.3 + glow * 0.7)}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
