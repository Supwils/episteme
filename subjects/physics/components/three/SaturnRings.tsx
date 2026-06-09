"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, type MeshBasicMaterial, RingGeometry } from "three";
import { getPlanetTexture } from "@/subjects/physics/lib/planetTextures";

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
  const matRef = useRef<MeshBasicMaterial>(null);
  const texture = useMemo(() => getPlanetTexture("saturnRing"), []);
  const geometry = useMemo(() => buildRingGeometry(inner, outer, 96), [inner, outer]);

  const lastOpacity = useRef(opacity);
  useFrame(() => {
    if (matRef.current && lastOpacity.current !== opacity) {
      matRef.current.opacity = opacity;
      lastOpacity.current = opacity;
    }
  });

  useEffect(() => {
    const mat = matRef.current;
    return () => {
      geometry.dispose();
      mat?.dispose();
    };
  }, [geometry]);

  return (
    <mesh position={position} rotation={[tilt, 0, 0]} geometry={geometry}>
      <meshBasicMaterial
        ref={matRef}
        map={texture}
        side={DoubleSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function buildRingGeometry(inner: number, outer: number, segs: number): RingGeometry {
  const geo = new RingGeometry(inner, outer, segs, 1);
  const pos = geo.getAttribute("position");
  const uv = geo.getAttribute("uv");
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
