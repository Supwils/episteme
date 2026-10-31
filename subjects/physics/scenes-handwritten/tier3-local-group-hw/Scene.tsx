"use client";

import { getTierContent } from "@/subjects/physics/lib/tier-content";
import { hash01, projectForTier } from "@/subjects/physics/lib/handwritten-coords";
import { Cartouche } from "../shared/Cartouche";
import { HandwrittenLabel } from "../shared/HandwrittenLabel";
import { HandwrittenMarker } from "../shared/HandwrittenMarker";
import { InkPath } from "../shared/InkPath";
import { StarSpeck } from "../shared/StarSpeck";

type Galaxy = { cx: number; cy: number; r: number; armCount: number; tilt: number; tint: string };

function spiralPath(g: Galaxy, armIndex: number, samples = 24): string {
  const offset = (armIndex / g.armCount) * Math.PI * 2;
  const pts: string[] = [];
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    const r = t * g.r;
    const theta = offset + t * 3.4 + g.tilt;
    const x = g.cx + Math.cos(theta) * r;
    const y = g.cy + Math.sin(theta) * r * 0.6; // squash for tilt
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export function Tier3HwScene() {
  const content = getTierContent("T3");
  const markers = content?.markers ?? [];

  const galaxyStyles: Record<string, Omit<Galaxy, "cx" | "cy">> = {
    "milky-way": { r: 90, armCount: 4, tilt: 0.2, tint: "var(--hw-gold)" },
    andromeda: { r: 36, armCount: 4, tilt: 1.1, tint: "var(--hw-wash-warm)" },
    triangulum: { r: 14, armCount: 3, tilt: 0.6, tint: "var(--hw-blue)" },
  };
  // Separate illustration radii keep the nearby M31/M33 glyphs distinct.
  const galaxies: Galaxy[] = markers.flatMap((marker) => {
    const style = galaxyStyles[marker.id];
    if (!style) return [];
    const center = projectForTier("T3", marker.position);
    return [{ ...style, cx: center.x, cy: center.y }];
  });

  const dwarfDots = Array.from({ length: 22 }, (_, i) => {
    const a = hash01(i * 4.7 + 1) * Math.PI * 2;
    const r = 200 + hash01(i * 9.1 + 2) * 200;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r, sym: ["α", "β", "γ", "δ", "ε", "ζ"][i % 6] };
  });

  return (
    <g>
      <StarSpeck
        seed={401}
        count={120}
        bounds={{ x: -460, y: -460, w: 920, h: 920 }}
        maxRadius={0.4}
      />

      {/* Halo washes for each galaxy — five layers each */}
      {galaxies.map((g, i) => (
        <g key={i}>
          <circle cx={g.cx} cy={g.cy} r={g.r * 2.2} fill={g.tint} fillOpacity={0.04} />
          <circle cx={g.cx - 2} cy={g.cy + 1} r={g.r * 1.7} fill={g.tint} fillOpacity={0.08} />
          <circle cx={g.cx} cy={g.cy} r={g.r * 1.3} fill={g.tint} fillOpacity={0.14} />
          <circle cx={g.cx + 1} cy={g.cy - 1} r={g.r * 0.95} fill={g.tint} fillOpacity={0.18} />
          <circle cx={g.cx} cy={g.cy} r={g.r * 0.6} fill={g.tint} fillOpacity={0.24} />
        </g>
      ))}

      {/* Spiral arms */}
      {galaxies.map((g, gi) =>
        Array.from({ length: g.armCount }).map((_, ai) => (
          <InkPath
            key={`${gi}-${ai}`}
            d={spiralPath(g, ai)}
            stroke="var(--hw-ink)"
            strokeWidth={1.1}
            delay={0.3 + gi * 0.25 + ai * 0.08}
            duration={1.0}
            filterLevel="wobble-soft"
          />
        ))
      )}

      {/* Galaxy nuclei */}
      {galaxies.map((g, i) => (
        <g key={`n-${i}`}>
          <circle cx={g.cx} cy={g.cy} r={g.r * 0.18} fill="var(--hw-gold)" fillOpacity={0.4} />
          <circle cx={g.cx} cy={g.cy} r={g.r * 0.08} fill="var(--hw-gold)" />
        </g>
      ))}

      {/* Dwarf galaxy specks */}
      {dwarfDots.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r={1.6} fill="var(--hw-ink-soft)" />
          <text
            x={d.x + 4}
            y={d.y - 4}
            className="hw-label-caption"
            fill="var(--hw-ink-faint-solid)"
          >
            {d.sym}
          </text>
        </g>
      ))}

      {/* Markers */}
      {markers.map((m, i) => {
        const p = projectForTier("T3", m.position);
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={p.x}
            y={p.y}
            radius={4 + (m.size ?? 0.015) * 220}
            variant="diamond"
            delay={1.4 + i * 0.1}
          />
        );
      })}
      {markers.slice(0, 6).map((m, i) => {
        const p = projectForTier("T3", m.position);
        const dx = p.x === 0 ? 1 : Math.sign(p.x);
        return (
          <HandwrittenLabel
            key={`${m.id}-label`}
            x={p.x + dx * 40}
            y={p.y - 10}
            text={m.name.primary}
            variant="label-minor"
            anchor={dx > 0 ? "start" : "end"}
            leader={{ fromX: p.x, fromY: p.y }}
            delay={1.8 + i * 0.1}
          />
        );
      })}

      <HandwrittenLabel
        x={0}
        y={398}
        text="位置与大小示意 · 非轨道预报"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <Cartouche cx={0} cy={-460} title="Local Group" subtitle="本星系群 · 数Mpc尺度" />
    </g>
  );
}
