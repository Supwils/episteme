"use client";

import { getTierContent } from "@/subjects/physics/lib/tier-content";
import { hash01, projectForTier } from "@/subjects/physics/lib/handwritten-coords";
import { Cartouche } from "../shared/Cartouche";
import { HandwrittenLabel } from "../shared/HandwrittenLabel";
import { HandwrittenMarker } from "../shared/HandwrittenMarker";
import { InkPath } from "../shared/InkPath";
import { StarSpeck } from "../shared/StarSpeck";
import { WobbleCircle } from "../shared/WobbleCircle";

const RINGS = [
  { r: 460, label: "Zodiac · 黄道带", dash: "6 4" },
  { r: 400, label: "CMB · 38万年", dash: undefined },
  { r: 330, label: "Reionization · 再电离", dash: "4 6" },
  { r: 260, label: "Large-scale Structure", dash: "2 6" },
  { r: 190, label: "BAO · 150 Mpc", dash: "1 4" },
];

const COMPASS_LABELS = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ"];

export function Tier0HwScene() {
  const content = getTierContent("T0");
  const markers = content?.markers ?? [];

  return (
    <g>
      {/* sparse background sky inside the outer ring */}
      <StarSpeck
        seed={101}
        count={140}
        bounds={{ x: -440, y: -440, w: 880, h: 880 }}
        hue="var(--hw-ink-soft)"
        maxRadius={0.8}
        excludeInnerRadius={70}
      />

      {/* Outer compass + zodiac ticks */}
      <g aria-hidden>
        {Array.from({ length: 360 / 15 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          const r0 = 470;
          const r1 = 480 + (i % 2 === 0 ? 8 : 0);
          return (
            <line
              key={i}
              x1={Math.cos(a) * r0}
              y1={Math.sin(a) * r0}
              x2={Math.cos(a) * r1}
              y2={Math.sin(a) * r1}
              stroke="var(--hw-ink-soft)"
              strokeWidth={0.7}
              opacity={0.7}
            />
          );
        })}
        {COMPASS_LABELS.map((sym, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const r = 492;
          return (
            <text
              key={sym}
              x={Math.cos(a) * r}
              y={Math.sin(a) * r}
              textAnchor="middle"
              dominantBaseline="middle"
              className="hw-label-major"
              fill="var(--hw-ink-soft)"
            >
              {sym}
            </text>
          );
        })}
      </g>

      {/* Concentric rings — CMB / Reion / structure / BAO */}
      {RINGS.map((ring, i) => (
        <g key={ring.r}>
          <WobbleCircle
            cx={0}
            cy={0}
            r={ring.r}
            stroke="var(--hw-ink-soft)"
            strokeWidth={ring.r === 400 ? 1.4 : 0.9}
            wash="none"
            filterLevel={i === 1 ? "wobble-soft" : "wobble-tiny"}
            delay={0.1 + i * 0.12}
          />
          <HandwrittenLabel
            x={0}
            y={-ring.r - 6}
            text={ring.label}
            variant="hairline"
            color="var(--hw-ink-soft)"
            delay={0.4 + i * 0.1}
          />
          {ring.dash && (
            <circle
              cx={0}
              cy={0}
              r={ring.r}
              fill="none"
              stroke="var(--hw-ink-faint-solid)"
              strokeWidth={0.5}
              strokeDasharray={ring.dash}
              opacity={0.5}
            />
          )}
        </g>
      ))}

      {/* CMB watercolor wash — multilayered to read as "deep space ringing" */}
      <circle cx={0} cy={0} r={460} fill="var(--hw-wash-cool)" opacity={0.06} />
      <circle cx={-3} cy={2} r={395} fill="var(--hw-wash-cool)" opacity={0.18} />
      <circle cx={2} cy={-3} r={330} fill="var(--hw-wash-warm)" opacity={0.1} />
      <circle cx={0} cy={0} r={260} fill="var(--hw-wash-warm)" opacity={0.07} />
      <circle
        cx={0}
        cy={0}
        r={185}
        fill="var(--hw-wash-warm)"
        opacity={0.16}
        filter="url(#hw-wobble-tiny)"
      />
      <circle cx={0} cy={0} r={120} fill="var(--hw-gold)" fillOpacity={0.08} />

      {/* Filamentary suggestion — radial hatches inside large-scale ring */}
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i * 10 * Math.PI) / 180 + hash01(i + 1) * 0.1;
        const r0 = 80 + hash01(i + 10) * 30;
        const r1 = 250 + hash01(i + 30) * 40;
        return (
          <line
            key={i}
            x1={Math.cos(a) * r0}
            y1={Math.sin(a) * r0}
            x2={Math.cos(a) * r1}
            y2={Math.sin(a) * r1}
            stroke="var(--hw-ink-soft)"
            strokeWidth={0.4}
            opacity={0.25 + hash01(i + 50) * 0.2}
          />
        );
      })}

      {/* Centre — "we are here" cross */}
      <g>
        <InkPath d="M-14 0 L14 0" stroke="var(--hw-gold)" strokeWidth={1.4} delay={0.6} />
        <InkPath d="M0 -14 L0 14" stroke="var(--hw-gold)" strokeWidth={1.4} delay={0.6} />
        <circle cx={0} cy={0} r={4} fill="var(--hw-gold)" />
        <HandwrittenLabel
          x={22}
          y={18}
          text="我们在这里"
          variant="label-minor"
          anchor="start"
          italic
          color="var(--hw-gold)"
          delay={1.0}
        />
      </g>

      {/* Markers — polar projection */}
      {markers.map((m, i) => {
        const p = projectForTier("T0", m.position);
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={p.x}
            y={p.y}
            radius={6 + (m.size ?? 0.02) * 200}
            variant="halo"
            delay={1.2 + i * 0.1}
          />
        );
      })}

      {/* Marker labels with leaders */}
      {markers.map((m, i) => {
        const p = projectForTier("T0", m.position);
        const angle = Math.atan2(p.y, p.x);
        const labelR = Math.hypot(p.x, p.y) + 38;
        const lx = Math.cos(angle) * labelR;
        const ly = Math.sin(angle) * labelR;
        return (
          <HandwrittenLabel
            key={`${m.id}-label`}
            x={lx}
            y={ly}
            text={m.name.primary}
            variant="label-minor"
            anchor={lx >= 0 ? "start" : "end"}
            leader={{ fromX: p.x, fromY: p.y }}
            delay={1.6 + i * 0.1}
          />
        );
      })}

      {/* Title cartouche */}
      <Cartouche cx={0} cy={-460} title="Observable Universe" subtitle="可见宇宙 · 8.8 × 10²⁶ m" />
    </g>
  );
}
