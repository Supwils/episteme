"use client";

import { getTierContent } from "@/src-physics/lib/tier-content";
import { hash01 } from "@/src-physics/lib/handwritten-coords";
import { Cartouche } from "../shared/Cartouche";
import { HandwrittenLabel } from "../shared/HandwrittenLabel";
import { HandwrittenMarker } from "../shared/HandwrittenMarker";
import { StarSpeck } from "../shared/StarSpeck";

const PLANETS = [
  { id: "mercury", symbol: "☿", name: "Mercury · 水星", au: 0.39, r: 4, color: "#8c7a6b" },
  { id: "venus", symbol: "♀", name: "Venus · 金星", au: 0.72, r: 7, color: "#d4b67a" },
  { id: "earth", symbol: "♁", name: "Earth · 地球", au: 1.0, r: 7, color: "#6ab0f7" },
  { id: "mars", symbol: "♂", name: "Mars · 火星", au: 1.52, r: 5, color: "#b25a3f" },
  { id: "jupiter", symbol: "♃", name: "Jupiter · 木星", au: 5.2, r: 22, color: "#d6a87a" },
  {
    id: "saturn",
    symbol: "♄",
    name: "Saturn · 土星",
    au: 9.58,
    r: 19,
    color: "#e3c590",
    hasRings: true,
  },
  { id: "uranus", symbol: "⛢", name: "Uranus · 天王星", au: 19.2, r: 12, color: "#88c1cc" },
  { id: "neptune", symbol: "♆", name: "Neptune · 海王星", au: 30.05, r: 12, color: "#4f6dae" },
];

const DWARFS = [
  { id: "ceres", symbol: "⚳", name: "Ceres · 谷神", au: 2.77, r: 2, color: "#a89890" },
  { id: "pluto", symbol: "♇", name: "Pluto · 冥王", au: 39.5, r: 3, color: "#d2b58a" },
  { id: "haumea", symbol: "·", name: "Haumea", au: 43.3, r: 2.5, color: "#cabfae" },
  { id: "eris", symbol: "·", name: "Eris", au: 67.7, r: 3, color: "#dad0b8" },
];

const ASTEROID_BELT = { au: 2.7, width: 0.6 };
const KUIPER_BELT = { au: 42, width: 8 };

const ORBITAL_MAX_AU = 70;

function auToRadius(au: number): number {
  // log warp keeps inner planets readable while still placing Neptune within the disc
  return 60 + 280 * (Math.log(1 + au) / Math.log(1 + ORBITAL_MAX_AU));
}

export function Tier6HwScene() {
  const content = getTierContent("T6");
  const markers = content?.markers ?? [];

  const planetPositions = PLANETS.map((p, i) => {
    const angle = hash01(i * 13.7 + 3) * Math.PI * 2;
    const r = auToRadius(p.au);
    return { ...p, x: Math.cos(angle) * r, y: Math.sin(angle) * r, orbitR: r, angle };
  });

  const dwarfPositions = DWARFS.map((d, i) => {
    const angle = hash01(i * 23.1 + 7) * Math.PI * 2;
    const r = auToRadius(d.au);
    return { ...d, x: Math.cos(angle) * r, y: Math.sin(angle) * r, orbitR: r, angle };
  });

  return (
    <g>
      <StarSpeck
        seed={601}
        count={120}
        bounds={{ x: -460, y: -460, w: 920, h: 920 }}
        maxRadius={0.4}
        excludeInnerRadius={50}
      />

      {/* Zodiac ring */}
      <circle
        cx={0}
        cy={0}
        r={440}
        fill="none"
        stroke="var(--hw-ink-soft)"
        strokeWidth={0.6}
        opacity={0.5}
      />
      <circle
        cx={0}
        cy={0}
        r={448}
        fill="none"
        stroke="var(--hw-ink-soft)"
        strokeWidth={0.3}
        opacity={0.4}
        strokeDasharray="1 8"
      />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const r0 = 440;
        const r1 = 456;
        return (
          <line
            key={i}
            x1={Math.cos(a) * r0}
            y1={Math.sin(a) * r0}
            x2={Math.cos(a) * r1}
            y2={Math.sin(a) * r1}
            stroke="var(--hw-ink-soft)"
            strokeWidth={0.6}
          />
        );
      })}

      {/* Orbits */}
      {planetPositions.map((p) => (
        <circle
          key={`orbit-${p.id}`}
          cx={0}
          cy={0}
          r={p.orbitR}
          fill="none"
          stroke="var(--hw-ink-faint-solid)"
          strokeWidth={0.5}
          strokeDasharray={p.au > 5 ? "2 6" : undefined}
          opacity={0.65}
        />
      ))}
      {dwarfPositions.map((d) => (
        <circle
          key={`orbit-${d.id}`}
          cx={0}
          cy={0}
          r={d.orbitR}
          fill="none"
          stroke="var(--hw-ink-faint-solid)"
          strokeWidth={0.35}
          strokeDasharray="1 7"
          opacity={0.45}
        />
      ))}

      {/* Asteroid belt */}
      {Array.from({ length: 130 }).map((_, i) => {
        const a = hash01(i * 0.7) * Math.PI * 2;
        const r = auToRadius(ASTEROID_BELT.au) + (hash01(i * 1.1) - 0.5) * 16;
        return (
          <circle
            key={`ab-${i}`}
            cx={Math.cos(a) * r}
            cy={Math.sin(a) * r}
            r={0.7}
            fill="var(--hw-ink-soft)"
            opacity={0.5}
          />
        );
      })}

      {/* Kuiper belt */}
      {Array.from({ length: 160 }).map((_, i) => {
        const a = hash01(i * 0.9 + 5) * Math.PI * 2;
        const r = auToRadius(KUIPER_BELT.au) + (hash01(i * 1.3 + 1) - 0.5) * 28;
        return (
          <circle
            key={`kb-${i}`}
            cx={Math.cos(a) * r}
            cy={Math.sin(a) * r}
            r={0.6}
            fill="var(--hw-ink-soft)"
            opacity={0.4}
          />
        );
      })}

      {/* Sun — 6 layer wash + prominence arcs */}
      <g>
        {/* outer corona */}
        <circle cx={0} cy={0} r={88} fill="var(--hw-gold)" fillOpacity={0.04} />
        <circle cx={-3} cy={2} r={70} fill="var(--hw-gold)" fillOpacity={0.07} />
        <circle cx={0} cy={0} r={56} fill="var(--hw-gold)" fillOpacity={0.11} />
        <circle cx={2} cy={-1} r={42} fill="var(--hw-gold)" fillOpacity={0.18} />
        <circle
          cx={0}
          cy={0}
          r={28}
          fill="var(--hw-gold)"
          fillOpacity={0.36}
          filter="url(#hw-wobble-tiny)"
        />
        <circle
          cx={0}
          cy={0}
          r={16}
          fill="var(--hw-gold)"
          stroke="var(--hw-ink)"
          strokeWidth={0.6}
          filter="url(#hw-wobble-tiny)"
        />
        {/* prominence arcs — hand-drawn solar flares */}
        <path
          d="M-18 -2 q -6 -10 -2 -22 q 8 -10 18 -4"
          fill="none"
          stroke="var(--hw-gold)"
          strokeWidth={0.7}
          opacity={0.7}
          strokeLinecap="round"
        />
        <path
          d="M14 6 q 14 -2 22 -14 q 4 -10 -2 -18"
          fill="none"
          stroke="var(--hw-gold)"
          strokeWidth={0.7}
          opacity={0.7}
          strokeLinecap="round"
        />
        <path
          d="M-4 18 q -10 12 -22 14 q -10 -2 -14 -10"
          fill="none"
          stroke="var(--hw-gold)"
          strokeWidth={0.6}
          opacity={0.6}
          strokeLinecap="round"
        />
        {/* corona rays */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI) / 8;
          const len = 26 + (i % 3) * 8;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 18}
              y1={Math.sin(a) * 18}
              x2={Math.cos(a) * (18 + len)}
              y2={Math.sin(a) * (18 + len)}
              stroke="var(--hw-gold)"
              strokeWidth={0.6}
              opacity={0.7}
            />
          );
        })}
        <HandwrittenLabel
          x={-50}
          y={-66}
          text="☉ Sol"
          variant="label-major"
          anchor="end"
          italic
          delay={0.6}
          color="var(--hw-gold)"
        />
      </g>

      {/* Planets */}
      {planetPositions.map((p, i) => (
        <g key={p.id}>
          {p.hasRings && (
            <ellipse
              cx={p.x}
              cy={p.y}
              rx={p.r * 2.2}
              ry={p.r * 0.7}
              fill="none"
              stroke="var(--hw-ink)"
              strokeWidth={0.6}
              opacity={0.8}
            />
          )}
          <circle cx={p.x} cy={p.y} r={p.r * 1.6} fill={p.color} fillOpacity={0.12} />
          <circle
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={p.color}
            fillOpacity={0.7}
            stroke="var(--hw-ink)"
            strokeWidth={0.6}
            filter="url(#hw-wobble-tiny)"
          />
          <HandwrittenLabel
            x={p.x}
            y={p.y - p.r - 10}
            text={`${p.symbol}  ${p.name}`}
            variant="label-minor"
            italic
            delay={1.0 + i * 0.08}
          />
        </g>
      ))}

      {/* Dwarf planets */}
      {dwarfPositions.map((d, i) => (
        <g key={d.id}>
          <circle
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={d.color}
            fillOpacity={0.8}
            stroke="var(--hw-ink)"
            strokeWidth={0.5}
          />
          <HandwrittenLabel
            x={d.x + 6}
            y={d.y - 4}
            text={d.name}
            variant="hairline"
            anchor="start"
            delay={1.4 + i * 0.05}
            color="var(--hw-ink-soft)"
          />
        </g>
      ))}

      {/* Markers from content (will overlay onto matching planet positions where they roughly align) */}
      {markers.map((m, i) => {
        // markers in content/cosmos/T6.ts use unit-sphere positions; we drop them onto ecliptic in a smaller scale
        const r = auToRadius(Math.max(0.2, m.position[0] * 20 + 5));
        const a = Math.atan2(m.position[2], m.position[0]);
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={Math.cos(a) * r}
            y={Math.sin(a) * r}
            radius={3 + (m.size ?? 0.02) * 100}
            variant="pin"
            delay={1.7 + i * 0.06}
          />
        );
      })}

      <Cartouche cx={0} cy={-460} title="Solar System" subtitle="太阳系 · 1 AU = 1.5 × 10¹¹ m" />
    </g>
  );
}
