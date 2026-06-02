"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getPlanetTexture } from "@/src-physics/lib/planetTextures";

type Props = {
  inner: number;
  outer: number;
  position?: [number, number, number];
  /** Tilt in radians. Saturn's real obliquity is 26.7° → 0.466 rad. */
  tilt?: number;
  opacity?: number;
};

/**
 * Saturn's rings. The texture is a 2048×125 horizontal strip with alpha;
 * we wrap it across a thin annulus by remapping UVs so the U axis maps
 * to the radial direction (inner → outer), and V is constant.
 */
export function SaturnRings({
  inner,
  outer,
  position = [0, 0, 0],
  tilt = 0.466,
  opacity = 1,
}: Props) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useMemo(() => getPlanetTexture("saturnRing"), []);
  const geometry = useMemo(() => buildRingGeometry(inner, outer, 96), [inner, outer]);

  useFrame(() => {
    if (matRef.current) matRef.current.opacity = opacity;
  });

  return (
    <mesh position={position} rotation={[tilt, 0, 0]} geometry={geometry}>
      <meshBasicMaterial
        ref={matRef}
        map={texture}
        side={THREE.DoubleSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function buildRingGeometry(inner: number, outer: number, segs: number): THREE.RingGeometry {
  const geo = new THREE.RingGeometry(inner, outer, segs, 1);
  const pos = geo.getAttribute("position");
  const uv = geo.getAttribute("uv");
  // Remap UVs: U follows radial distance, V centered. Default RingGeometry UV
  // is unsuitable for a 1-D strip texture, so override.
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const r = Math.sqrt(x * x + y * y);
    const u = (r - inner) / (outer - inner);
    uv.setXY(i, u, 0.5);
  }
  uv.needsUpdate = true;
  return geo;
}
