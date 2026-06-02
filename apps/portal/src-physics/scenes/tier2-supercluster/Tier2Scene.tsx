"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ComponentProps } from "react";
import { CatmullRomCurve3, type Group, Vector3 } from "three";
import { StarPoints } from "@/src-physics/components/three/StarPoints";
import { getTierContent } from "@/content/universe-physics/cosmos";
import { hash01, mixRgb } from "@/src-physics/lib/noise";
import { SceneMarkers } from "../SceneMarkers";
import { useUiStore } from "@/src-physics/store/useUiStore";

type Props = ComponentProps<"group"> & {
  opacity?: number;
};

const STREAMLINE_COUNT = 110;
const SAMPLES_PER_STREAMLINE = 56;
const GALAXY_FIELD = 2400;

// Great Attractor — placed at a slight offset so streamlines have a clear
// convergence target on screen. Local Group sits near origin.
const GREAT_ATTRACTOR = new Vector3(1.05, -0.18, 0.35);

// Flow palette: cool blue at the outer boundary, warming through neutral
// white as galaxies fall inward, ending at hot amber at the attractor.
const FLOW_COOL: [number, number, number] = [0.42, 0.66, 1.05];
const FLOW_NEUTRAL: [number, number, number] = [0.85, 0.86, 0.95];
const FLOW_HOT: [number, number, number] = [1.0, 0.7, 0.4];

/**
 * Tier 2 — Laniakea Supercluster.
 *
 * Visualizes the gravitational watershed:
 *   • 110 Catmull-Rom streamlines starting near the boundary and curling
 *     inward to the Great Attractor; spacing is eased so points cluster
 *     where the flow accelerates near GA
 *   • per-vertex color along each streamline — cool at the source, warm
 *     at the sink — to make the gradient legible without animation
 *   • a background galaxy field with per-vertex brightness jitter
 *   • a three-layer GA bloom (core + inner ring + outer halo), so the
 *     attractor reads as a glowing well, not just a brighter dot
 *   • interactive markers for Local Group / Virgo / Norma / Centaurus /
 *     Hydra / Great Attractor (positions match the content layer)
 */
export function Tier2Scene({ opacity = 1, ...groupProps }: Props) {
  const group = useRef<Group>(null);
  const reducedMotion = useUiStore((s) => s.reducedMotion);

  const { flow, galaxies } = useMemo(() => buildLaniakea(), []);
  const ga = useMemo(() => {
    const a = new Float32Array(3);
    a[0] = GREAT_ATTRACTOR.x;
    a[1] = GREAT_ATTRACTOR.y;
    a[2] = GREAT_ATTRACTOR.z;
    return a;
  }, []);
  const markers = useMemo(() => getTierContent("T2")?.markers ?? [], []);

  useFrame((_, dt) => {
    if (!reducedMotion && group.current) group.current.rotation.y += dt * 0.018;
  });

  return (
    <group ref={group} {...groupProps}>
      <StarPoints
        positions={galaxies.positions}
        colors={galaxies.colors}
        baseSize={4.8}
        opacity={0.42 * opacity}
      />
      <StarPoints
        positions={flow.positions}
        colors={flow.colors}
        baseSize={7}
        opacity={0.92 * opacity}
      />
      <StarPoints
        positions={ga}
        baseSize={220}
        baseTemp={0.85}
        baseBrightness={0.7}
        opacity={0.35 * opacity}
      />
      <StarPoints
        positions={ga}
        baseSize={110}
        baseTemp={0.78}
        baseBrightness={0.65}
        opacity={0.7 * opacity}
      />
      <StarPoints
        positions={ga}
        baseSize={55}
        baseTemp={0.58}
        baseBrightness={0.72}
        opacity={1.0 * opacity}
      />
      {markers.length > 0 ? <SceneMarkers markers={markers} opacity={opacity} tierId="T2" /> : null}
    </group>
  );
}

type Layer = { positions: Float32Array; colors: Float32Array };

function buildLaniakea(): { flow: Layer; galaxies: Layer } {
  const flowPos = new Float32Array(STREAMLINE_COUNT * SAMPLES_PER_STREAMLINE * 3);
  const flowCol = new Float32Array(STREAMLINE_COUNT * SAMPLES_PER_STREAMLINE * 3);
  let fp = 0;

  for (let s = 0; s < STREAMLINE_COUNT; s++) {
    const seed = s * 9 + 1;
    const theta = hash01(seed) * Math.PI * 2;
    const phi = Math.acos(2 * hash01(seed * 3 + 7) - 1);
    const r = 0.92 + hash01(seed * 5 + 11) * 0.42;
    const start = new Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta) * 0.72,
      r * Math.cos(phi),
    );

    // Catmull-Rom from start to GA with a few intermediate lateral
    // controls; the lateral magnitude decays so streamlines straighten
    // as they approach the attractor.
    const control: Vector3[] = [];
    const steps = 5;
    const cur = start.clone();
    control.push(cur.clone());
    for (let k = 1; k <= steps; k++) {
      const t = k / steps;
      const target = GREAT_ATTRACTOR.clone().lerp(cur, 1 - t);
      const lateral = new Vector3(
        Math.cos(theta + t * 1.7) * 0.085 * (1 - t),
        Math.sin(theta * 2 + t * 1.3) * 0.085 * (1 - t),
        Math.cos(theta * 1.5 - t * 1.9) * 0.07 * (1 - t),
      );
      target.add(lateral);
      control.push(target);
    }
    control.push(GREAT_ATTRACTOR.clone());

    const curve = new CatmullRomCurve3(control, false, "catmullrom", 0.3);
    // sample with non-uniform t so points pile up near the attractor
    for (let i = 0; i < SAMPLES_PER_STREAMLINE; i++) {
      const t = i / (SAMPLES_PER_STREAMLINE - 1);
      // ease-out: more samples in t∈[0.6, 1.0]
      const eased = 1 - Math.pow(1 - t, 1.7);
      const p = curve.getPoint(eased);
      flowPos[fp * 3] = p.x;
      flowPos[fp * 3 + 1] = p.y;
      flowPos[fp * 3 + 2] = p.z;

      // color: cool→neutral→hot along the flow; brightness ramps up
      // toward GA so the convergence reads as energy gathering
      let c: [number, number, number];
      if (eased < 0.55) {
        c = mixRgb(FLOW_COOL, FLOW_NEUTRAL, eased / 0.55);
      } else {
        c = mixRgb(FLOW_NEUTRAL, FLOW_HOT, (eased - 0.55) / 0.45);
      }
      const bright = 0.5 + 0.7 * eased;
      flowCol[fp * 3] = c[0] * bright;
      flowCol[fp * 3 + 1] = c[1] * bright;
      flowCol[fp * 3 + 2] = c[2] * bright;
      fp++;
    }
  }

  // background galaxy scatter — per-vertex dim variation
  const galPos = new Float32Array(GALAXY_FIELD * 3);
  const galCol = new Float32Array(GALAXY_FIELD * 3);
  const galTone: [number, number, number] = [0.6, 0.66, 0.85];
  for (let i = 0; i < GALAXY_FIELD; i++) {
    const u = hash01(i * 13 + 1);
    const v = hash01(i * 23 + 5);
    const th = 2 * Math.PI * u;
    const ph = Math.acos(2 * v - 1);
    const rad = Math.pow(hash01(i * 37 + 11), 0.5) * 1.2;
    galPos[i * 3] = rad * Math.sin(ph) * Math.cos(th);
    galPos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th) * 0.72;
    galPos[i * 3 + 2] = rad * Math.cos(ph);
    const bright = 0.4 + hash01(i * 53 + 17) * 0.65;
    galCol[i * 3] = galTone[0] * bright;
    galCol[i * 3 + 1] = galTone[1] * bright;
    galCol[i * 3 + 2] = galTone[2] * bright;
  }

  return {
    flow: { positions: flowPos, colors: flowCol },
    galaxies: { positions: galPos, colors: galCol },
  };
}

export const LANIAKEA_GREAT_ATTRACTOR = GREAT_ATTRACTOR;
