"use client";

import { useFrame } from "@react-three/fiber";
import { useCallback, useMemo, useRef, type PointerEvent } from "react";
import { Vector3, type Group } from "three";
import type { SceneMarker } from "@/subjects/physics/lib/content";
import { TIER_MARKER_KIND, type MarkerKind, type UniverseTierId } from "@/subjects/physics/lib/tier";
import { useUiStore } from "@/subjects/physics/store/useUiStore";
import { MarkerHaloDisk } from "./markers/MarkerHaloDisk";
import { MarkerDiamond } from "./markers/MarkerDiamond";
import { MarkerStarPoint } from "./markers/MarkerStarPoint";
import { MarkerPinNeedle } from "./markers/MarkerPinNeedle";

type Props = {
  markers: SceneMarker[];
  opacity?: number;
  tierId: UniverseTierId;
};

export function SceneMarkers({ markers, opacity = 1, tierId }: Props) {
  const kind = TIER_MARKER_KIND[tierId] ?? "haloDisk";

  return (
    <group>
      {markers.map((m) => (
        <MarkerPoint key={m.id} marker={m} opacity={opacity} kind={kind} />
      ))}
    </group>
  );
}

function MarkerPoint({
  marker,
  opacity,
  kind,
}: {
  marker: SceneMarker;
  opacity: number;
  kind: MarkerKind;
}) {
  const meshRef = useRef<Group>(null);
  const glowRef = useRef(0);
  const targetGlow = useRef(0);
  const reducedMotion = useUiStore((s) => s.reducedMotion);

  const setHoveredMarker = useUiStore((s) => s.setHoveredMarker);
  const setHoverMousePos = useUiStore((s) => s.setHoverMousePos);

  const baseColor = marker.color ?? "#ffb45a";
  const size = marker.size ?? 0.02;
  const position = useMemo(() => new Vector3(...marker.position), [marker.position]);

  const onPointerOver = useCallback(
    (e: PointerEvent) => {
      e.stopPropagation();
      targetGlow.current = 1;
      setHoveredMarker(marker);
      setHoverMousePos({ x: e.clientX, y: e.clientY });
    },
    [marker, setHoveredMarker, setHoverMousePos],
  );

  const onPointerOut = useCallback(
    (e: PointerEvent) => {
      e.stopPropagation();
      targetGlow.current = 0;
      setHoveredMarker(null);
    },
    [setHoveredMarker],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      setHoverMousePos({ x: e.clientX, y: e.clientY });
    },
    [setHoverMousePos],
  );

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    const prev = glowRef.current;
    const next = prev + (targetGlow.current - prev) * Math.min(dt * 8, 1);
    glowRef.current = Math.abs(next - prev) < 0.001 ? prev : next;
    const s = size * (1 + glowRef.current * 0.25);
    meshRef.current.scale.setScalar(s);
    if (!reducedMotion) {
      const pulse = 1 + Math.sin(performance.now() * 0.003) * 0.06;
      meshRef.current.scale.multiplyScalar(pulse);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerMove={onPointerMove}
    >
      {kind === "haloDisk" && <MarkerHaloDisk color={baseColor} opacity={opacity} glowRef={glowRef} />}
      {kind === "diamond" && <MarkerDiamond color={baseColor} opacity={opacity} glowRef={glowRef} />}
      {kind === "starPoint" && <MarkerStarPoint color={baseColor} opacity={opacity} glowRef={glowRef} />}
      {kind === "pinNeedle" && <MarkerPinNeedle color={baseColor} opacity={opacity} glowRef={glowRef} />}
    </group>
  );
}
