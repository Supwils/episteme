"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ComponentProps } from "react";
import type { Group } from "three";
import { StarPoints } from "@/src-physics/components/three/StarPoints";
import { getTierContent } from "@/src-physics/content/cosmos";
import { useUiStore } from "@/src-physics/store/useUiStore";
import { buildNetwork } from "@/src-physics/lib/cosmic-web-geometry";
import { SceneMarkers } from "../SceneMarkers";

type Props = ComponentProps<"group"> & {
  opacity?: number;
};

/**
 * Tier 1 — Cosmic Web.
 *
 * Hierarchical node network with curved filaments and 2-D wall sheets:
 *   • 18 major nodes + 52 minor nodes, distributed by hash01 with a
 *     soft minimum-distance reject so they don't pile up
 *   • each node hooks to its K nearest neighbors (K=3 for major, 2 for
 *     minor); edges get a "tier" tag from the connected node ranks
 *   • each edge is a quadratic Bezier with a perpendicular mid offset,
 *     so filaments arc through space instead of running as straight
 *     wires (real filaments are curved, not chords)
 *   • spine points carry per-vertex color: warm near the nodes, cool
 *     in the middle, brightness shaped by a cosine so peaks sit at the
 *     endpoints
 *   • a gas halo lays anisotropic points along each filament,
 *     stretched along the edge tangent (cigar shape)
 *   • wall sheets: for triplets of nearby major nodes we sample the
 *     triangle interior with very dim points — the 2-D structure that
 *     N-body simulations show in addition to 1-D filaments
 *   • a sparse void field fills the rest with dim background galaxies
 *
 * All layers share an `opacity` prop so the parent ActiveScene can
 * cross-dissolve us with neighboring tiers.
 */
export function Tier1Scene({ opacity = 1, ...groupProps }: Props) {
  const group = useRef<Group>(null);
  const reducedMotion = useUiStore((s) => s.reducedMotion);

  const net = useMemo(() => buildNetwork(), []);
  const markers = useMemo(() => getTierContent("T1")?.markers ?? [], []);

  useFrame((_, dt) => {
    if (group.current) {
      if (!reducedMotion) {
        group.current.rotation.y += dt * 0.022;
        group.current.rotation.x = Math.sin(performance.now() * 0.00006) * 0.05;
      }
    }
  });

  return (
    <group ref={group} {...groupProps}>
      <StarPoints
        positions={net.voidField.positions}
        colors={net.voidField.colors}
        baseSize={4.2}
        opacity={0.32 * opacity}
      />
      <StarPoints
        positions={net.walls.positions}
        baseSize={4.8}
        baseTemp={0.12}
        baseBrightness={0.55}
        opacity={0.16 * opacity}
      />
      <StarPoints
        positions={net.gas}
        baseSize={8.5}
        baseTemp={0.08}
        baseBrightness={0.5}
        opacity={0.32 * opacity}
      />
      <StarPoints
        positions={net.spine.positions}
        colors={net.spine.colors}
        baseSize={6.8}
        opacity={0.95 * opacity}
      />
      <StarPoints
        positions={net.majorHalo}
        baseSize={55}
        baseTemp={0.82}
        baseBrightness={0.6}
        opacity={0.55 * opacity}
      />
      <StarPoints
        positions={net.minorNodes}
        baseSize={18}
        baseTemp={0.55}
        baseBrightness={0.6}
        opacity={0.85 * opacity}
      />
      <StarPoints
        positions={net.majorNodes}
        baseSize={34}
        baseTemp={0.82}
        baseBrightness={0.7}
        opacity={1.0 * opacity}
      />
      {markers.length > 0 ? <SceneMarkers markers={markers} opacity={opacity} tierId="T1" /> : null}
    </group>
  );
}
