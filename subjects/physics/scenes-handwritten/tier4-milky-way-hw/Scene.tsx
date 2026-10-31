"use client";

import { getTierContent } from "@/subjects/physics/lib/tier-content";
import { hash01, projectForTier } from "@/subjects/physics/lib/handwritten-coords";
import { Cartouche } from "../shared/Cartouche";
import { HandwrittenLabel } from "../shared/HandwrittenLabel";
import { HandwrittenMarker } from "../shared/HandwrittenMarker";
import { InkPath } from "../shared/InkPath";
import { StarSpeck } from "../shared/StarSpeck";

const ARMS = [
  { name: "Perseus · 英仙臂", offset: 0, tint: "var(--hw-blue)" },
  { name: "Scutum-Centaurus · 盾牌-半人马", offset: Math.PI / 2, tint: "var(--hw-gold)" },
  { name: "Sagittarius-Carina · 人马-船底", offset: Math.PI, tint: "var(--hw-blue)" },
  { name: "Outer · 外旋臂", offset: (3 * Math.PI) / 2, tint: "var(--hw-gold)" },
];

const SAMPLES = 36;

function armPath(offset: number, radius = 360): string {
  const pts: string[] = [];
  for (let i = 0; i < SAMPLES; i++) {
    const t = i / (SAMPLES - 1);
    const theta = offset + t * 4.8;
    const r = 28 + t * (radius - 28);
    const x = Math.cos(theta) * r;
    const y = Math.sin(theta) * r;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export function Tier4HwScene() {
  const content = getTierContent("T4");
  const markers = content?.markers ?? [];
  const sun = markers.find((marker) => marker.id === "sun");
  const sunPoint = sun ? projectForTier("T4", sun.position) : null;

  // Star field hugging the arms
  const fieldStars = Array.from({ length: 360 }).map((_, i) => {
    const a = hash01(i * 0.7) * Math.PI * 2;
    const r = 60 + hash01(i * 1.3 + 9) * 320;
    const arm = ARMS[i % ARMS.length]!;
    const armOff = arm.offset + ((r - 28) / 360) * 4.8;
    const aDelta = a - armOff;
    const closeness = Math.exp(-((aDelta % (Math.PI * 2)) ** 2) * 4);
    return {
      x: Math.cos(a) * r,
      y: Math.sin(a) * r,
      opacity: 0.2 + closeness * 0.5,
      r: 0.4 + closeness * 0.6,
    };
  });

  return (
    <g>
      {/* Halo wash */}
      <circle cx={0} cy={0} r={420} fill="var(--hw-wash-cool)" opacity={0.06} />
      <circle cx={0} cy={0} r={300} fill="var(--hw-wash-warm)" opacity={0.05} />

      <StarSpeck
        seed={501}
        count={200}
        bounds={{ x: -420, y: -420, w: 840, h: 840 }}
        maxRadius={0.45}
        excludeInnerRadius={50}
      />

      {/* arm starfield */}
      <g aria-hidden>
        {fieldStars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="var(--hw-ink)"
            opacity={s.opacity * 0.6}
          />
        ))}
      </g>

      {/* Arms */}
      {ARMS.map((arm, i) => (
        <g key={arm.name}>
          <InkPath
            d={armPath(arm.offset)}
            stroke={arm.tint}
            strokeWidth={1.4}
            opacity={0.85}
            delay={0.3 + i * 0.15}
            duration={1.4}
            filterLevel="wobble-soft"
          />
          {/* shadow stroke (slight offset for depth) */}
          <path
            d={armPath(arm.offset + 0.04)}
            fill="none"
            stroke={arm.tint}
            strokeWidth={0.5}
            opacity={0.4}
          />
        </g>
      ))}

      {/* 5-kpc bar half-length at 360 SVG units / 15 kpc; orientation is schematic. */}
      <ellipse
        cx={0}
        cy={0}
        rx={120}
        ry={28}
        transform="rotate(30)"
        fill="var(--hw-gold)"
        fillOpacity={0.14}
        stroke="var(--hw-gold)"
        strokeWidth={1.2}
      />

      {/* Central icon is enlarged and is not a view of a luminous event horizon. */}
      <g>
        {/* outer dust halo */}
        <circle cx={0} cy={0} r={110} fill="var(--hw-gold)" fillOpacity={0.05} />
        <circle cx={-4} cy={2} r={84} fill="var(--hw-gold)" fillOpacity={0.08} />
        <circle cx={0} cy={0} r={60} fill="var(--hw-gold)" fillOpacity={0.14} />
        <circle cx={2} cy={-1} r={40} fill="var(--hw-gold)" fillOpacity={0.26} />
        <circle
          cx={0}
          cy={0}
          r={24}
          fill="var(--hw-gold)"
          fillOpacity={0.5}
          filter="url(#hw-wobble-tiny)"
        />
        {/* accretion ring around BH */}
        <ellipse
          cx={0}
          cy={0}
          rx={18}
          ry={6}
          fill="none"
          stroke="var(--hw-gold)"
          strokeWidth={1.1}
          filter="url(#hw-wobble-tiny)"
        />
        {/* Doppler beaming — left side brighter */}
        <ellipse cx={-10} cy={0} rx={9} ry={4} fill="var(--hw-gold)" fillOpacity={0.45} />
        <ellipse cx={10} cy={0} rx={9} ry={4} fill="var(--hw-ink)" fillOpacity={0.35} />
        {/* event horizon */}
        <circle cx={0} cy={0} r={9} fill="var(--hw-ink)" />
        <circle cx={0} cy={0} r={5} fill="var(--hw-gold)" />
        {/* corona rays */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 22}
              y1={Math.sin(a) * 22}
              x2={Math.cos(a) * (42 + (i % 2) * 10)}
              y2={Math.sin(a) * (42 + (i % 2) * 10)}
              stroke="var(--hw-gold)"
              strokeWidth={0.55}
              opacity={0.6}
            />
          );
        })}
        <HandwrittenLabel
          x={48}
          y={-46}
          text="Sgr A*"
          variant="label-major"
          anchor="start"
          italic
          delay={1.2}
        />
      </g>

      {/* One Sun marker below supplies the authoritative position. */}
      {sunPoint && (
        <HandwrittenLabel
          x={sunPoint.x + 18}
          y={sunPoint.y + 24}
          text="☉ Sol · 太阳"
          variant="label-minor"
          anchor="start"
          italic
          color="var(--hw-gold)"
          delay={1.5}
        />
      )}

      {/* Reference boundary of the displayed stellar disk, not the dark halo. */}
      <circle
        cx={0}
        cy={0}
        r={360}
        fill="none"
        stroke="var(--hw-ink-faint-solid)"
        strokeWidth={0.5}
        strokeDasharray="2 8"
      />
      <HandwrittenLabel
        x={0}
        y={-390}
        text="暗晕远超此图，未按比例画出"
        variant="hairline"
        delay={1.6}
        color="var(--hw-ink-faint-solid)"
      />

      {/* Markers */}
      {markers.map((m, i) => {
        const p = projectForTier("T4", m.position);
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={p.x}
            y={p.y}
            radius={4 + (m.size ?? 0.02) * 200}
            variant="diamond"
            delay={1.7 + i * 0.08}
          />
        );
      })}

      <HandwrittenLabel
        x={0}
        y={405}
        text="旋臂及入口位置为示意；中心图标已放大"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel
        x={0}
        y={429}
        text="太阳采用卡片坐标；盘面参考半径15 kpc"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <Cartouche cx={0} cy={-460} title="Milky Way" subtitle="银河系 · 棒与旋臂结构示意" />
    </g>
  );
}
