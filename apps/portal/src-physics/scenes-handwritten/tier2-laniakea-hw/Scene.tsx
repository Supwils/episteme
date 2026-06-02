"use client";

import { getTierContent } from "@/content/universe-physics/cosmos";
import { hash01, projectForTier } from "@/src-physics/lib/handwritten-coords";
import { Cartouche } from "../shared/Cartouche";
import { HandwrittenLabel } from "../shared/HandwrittenLabel";
import { HandwrittenMarker } from "../shared/HandwrittenMarker";
import { InkPath } from "../shared/InkPath";
import { StarSpeck } from "../shared/StarSpeck";

const FLOW_COUNT = 36;
const ATTRACTOR = { x: 380, y: -60 };

function flowPath(seed: number): { d: string; opacity: number } {
  // Start at radius ~ 300 from attractor at random angle, spiral inward.
  const startAngle = hash01(seed) * Math.PI * 2;
  const startR = 280 + hash01(seed + 0.1) * 140;
  const startX = ATTRACTOR.x + Math.cos(startAngle) * startR;
  const startY = ATTRACTOR.y + Math.sin(startAngle) * startR;
  const steps = 8;
  const pts: Array<[number, number]> = [[startX, startY]];
  for (let s = 1; s <= steps; s++) {
    const t = s / steps;
    const r = startR * (1 - t * 0.85);
    const a = startAngle + t * (1.0 + hash01(seed + 0.3) * 0.6);
    const jitter = (hash01(seed + s * 0.7) - 0.5) * 12;
    pts.push([ATTRACTOR.x + Math.cos(a) * r + jitter, ATTRACTOR.y + Math.sin(a) * r + jitter]);
  }
  // Catmull–Rom → cubic bezier (simple loop)
  const first = pts[0]!;
  let d = `M${first[0]} ${first[1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[Math.min(pts.length - 1, i + 2)]!;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`;
  }
  return { d, opacity: 0.5 + hash01(seed + 0.9) * 0.45 };
}

const BORDER_POINTS: Array<[number, number]> = [
  [-360, 200],
  [-280, 360],
  [-60, 380],
  [220, 350],
  [380, 220],
  [440, 0],
  [400, -200],
  [240, -340],
  [40, -360],
  [-200, -340],
  [-360, -200],
  [-420, 0],
  [-360, 200],
];

export function Tier2HwScene() {
  const content = getTierContent("T2");
  const markers = content?.markers ?? [];

  const flows = Array.from({ length: FLOW_COUNT }, (_, i) => flowPath(i + 1));
  const borderPath = BORDER_POINTS.map((p, i) =>
    i === 0 ? `M${p[0]} ${p[1]}` : `L${p[0]} ${p[1]}`,
  ).join(" ");

  return (
    <g>
      <StarSpeck
        seed={313}
        count={160}
        bounds={{ x: -460, y: -460, w: 920, h: 920 }}
        maxRadius={0.5}
      />

      {/* Laniakea boundary */}
      <path
        d={borderPath}
        fill="var(--hw-wash-warm)"
        opacity={0.08}
        stroke="var(--hw-ink-soft)"
        strokeWidth={0.8}
        strokeDasharray="3 6"
        filter="url(#hw-wobble-soft)"
      />

      {/* Flow streamlines into Great Attractor */}
      {flows.map((f, i) => (
        <InkPath
          key={i}
          d={f.d}
          stroke="var(--hw-gold)"
          strokeWidth={0.7}
          opacity={f.opacity * 0.7}
          delay={0.2 + i * 0.04}
          duration={1.2}
        />
      ))}

      {/* Great Attractor — deep watercolor pull */}
      <g transform={`translate(${ATTRACTOR.x} ${ATTRACTOR.y})`}>
        {/* outermost atmospheric drag */}
        <circle cx={0} cy={0} r={140} fill="var(--hw-gold)" fillOpacity={0.04} />
        <circle cx={-4} cy={3} r={110} fill="var(--hw-gold)" fillOpacity={0.06} />
        <circle cx={0} cy={0} r={88} fill="var(--hw-gold)" fillOpacity={0.1} />
        <circle cx={3} cy={-2} r={66} fill="var(--hw-gold)" fillOpacity={0.16} />
        <circle cx={0} cy={0} r={46} fill="var(--hw-gold)" fillOpacity={0.24} />
        <circle
          cx={-2}
          cy={1}
          r={28}
          fill="var(--hw-gold)"
          fillOpacity={0.42}
          filter="url(#hw-wobble-tiny)"
        />
        <circle
          cx={0}
          cy={0}
          r={16}
          fill="var(--hw-gold)"
          stroke="var(--hw-ink)"
          strokeWidth={0.7}
          filter="url(#hw-wobble-tiny)"
        />
        {/* radial accretion spikes */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI) / 8;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 22}
              y1={Math.sin(a) * 22}
              x2={Math.cos(a) * (42 + (i % 3) * 10)}
              y2={Math.sin(a) * (42 + (i % 3) * 10)}
              stroke="var(--hw-gold)"
              strokeWidth={0.5}
              opacity={0.55}
            />
          );
        })}
        {/* spiral inside */}
        <InkPath
          d="M0 0 q 8 -3 12 4 q 4 9 -6 12 q -14 4 -16 -10 q -2 -18 18 -18"
          stroke="var(--hw-ink)"
          strokeWidth={0.8}
          delay={0.6}
        />
      </g>

      {/* Compass rose */}
      <g aria-hidden transform="translate(-360 360)">
        {[0, 1, 2, 3].map((i) => {
          const a = (i * 90 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={0}
              y1={0}
              x2={Math.cos(a) * 22}
              y2={Math.sin(a) * 22}
              stroke="var(--hw-ink-soft)"
              strokeWidth={0.6}
            />
          );
        })}
        <text textAnchor="middle" y={-26} className="hw-label-hairline" fill="var(--hw-ink-soft)">
          N
        </text>
      </g>

      {/* Markers */}
      {markers.map((m, i) => {
        const p = projectForTier("T2", m.position);
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={p.x}
            y={p.y}
            radius={5 + (m.size ?? 0.025) * 220}
            variant="halo"
            delay={1.4 + i * 0.1}
          />
        );
      })}
      {markers.map((m, i) => {
        const p = projectForTier("T2", m.position);
        const dx = p.x === 0 ? 1 : Math.sign(p.x);
        return (
          <HandwrittenLabel
            key={`${m.id}-label`}
            x={p.x + dx * 40}
            y={p.y - 12}
            text={m.name.primary}
            variant="label-minor"
            anchor={dx > 0 ? "start" : "end"}
            leader={{ fromX: p.x, fromY: p.y }}
            delay={1.8 + i * 0.1}
          />
        );
      })}

      <Cartouche
        cx={0}
        cy={-460}
        title="Laniakea Supercluster"
        subtitle="Laniakea · 拉尼亚凯亚超星系团"
      />
    </g>
  );
}
