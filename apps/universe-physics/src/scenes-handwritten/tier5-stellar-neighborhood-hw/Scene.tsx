"use client";

import { getTierContent } from "@/content/cosmos";
import { Cartouche } from "../shared/Cartouche";
import { HandwrittenLabel } from "../shared/HandwrittenLabel";
import { HandwrittenMarker } from "../shared/HandwrittenMarker";
import { InkPath } from "../shared/InkPath";
import { StarSpeck } from "../shared/StarSpeck";

const DISC_RADIUS = 420;

const RANGE_RINGS = [
  { ly: 10, label: "10 ly" },
  { ly: 25, label: "25 ly" },
  { ly: 50, label: "50 ly" },
];

function buildAsterism(pts: Array<{ x: number; y: number }>): Array<{ d: string }> {
  if (pts.length < 2) return [];
  const edges: Array<{ d: string }> = [];
  const visited = new Set<number>([0]);
  let current = 0;
  while (visited.size < pts.length && visited.size < 12) {
    let bestJ = -1;
    let bestD = Infinity;
    const curr = pts[current];
    if (!curr) break;
    for (let j = 0; j < pts.length; j++) {
      if (visited.has(j)) continue;
      const candidate = pts[j];
      if (!candidate) continue;
      const d = Math.hypot(candidate.x - curr.x, candidate.y - curr.y);
      if (d < bestD) {
        bestD = d;
        bestJ = j;
      }
    }
    if (bestJ < 0) break;
    const next = pts[bestJ];
    if (!next) break;
    edges.push({ d: `M${curr.x} ${curr.y} L${next.x} ${next.y}` });
    visited.add(bestJ);
    current = bestJ;
  }
  return edges;
}

const SPECTRAL_LEGEND = [
  { type: "O/B", color: "#a6c8ff", note: "蓝白热星" },
  { type: "A", color: "#cfd9ff", note: "白星" },
  { type: "G", color: "#fff4d8", note: "太阳类" },
  { type: "K", color: "#ffd089", note: "橙矮" },
  { type: "M", color: "#ff8a5a", note: "红矮" },
];

export function Tier5HwScene() {
  const content = getTierContent("T5");
  const markers = content?.markers ?? [];

  // Map marker positions (unit sphere within ~0.5 of origin) to the disc
  const projectStar = (pos: readonly [number, number, number]) => {
    // T5 uses true Cartesian positions in pc; scale to disc.
    const SCALE = 460;
    return { x: pos[0] * SCALE, y: pos[2] * SCALE };
  };

  // Build asterism connections among the nearest few stars
  const asterism = buildAsterism(markers.map((m) => projectStar(m.position)));

  return (
    <g>
      <StarSpeck
        seed={511}
        count={260}
        bounds={{ x: -460, y: -460, w: 920, h: 920 }}
        maxRadius={0.6}
      />

      {/* Range rings — concentric fades that lend depth to the disc */}
      <circle cx={0} cy={0} r={DISC_RADIUS} fill="var(--hw-wash-cool)" opacity={0.04} />
      <circle cx={0} cy={0} r={DISC_RADIUS * 0.5} fill="var(--hw-wash-warm)" opacity={0.06} />
      <circle cx={0} cy={0} r={DISC_RADIUS * 0.2} fill="var(--hw-gold)" fillOpacity={0.1} />
      {RANGE_RINGS.map((ring, i) => {
        const r = (ring.ly / 50) * DISC_RADIUS;
        return (
          <g key={ring.label}>
            <circle
              cx={0}
              cy={0}
              r={r}
              fill="none"
              stroke="var(--hw-ink-soft)"
              strokeWidth={0.6}
              strokeDasharray="1 6"
              opacity={0.7}
            />
            <HandwrittenLabel
              x={r * 0.7071}
              y={-r * 0.7071}
              text={ring.label}
              variant="hairline"
              anchor="start"
              color="var(--hw-ink-soft)"
              delay={0.4 + i * 0.1}
            />
          </g>
        );
      })}

      {/* Compass cross */}
      <line
        x1={-DISC_RADIUS}
        y1={0}
        x2={DISC_RADIUS}
        y2={0}
        stroke="var(--hw-ink-faint-solid)"
        strokeWidth={0.4}
        strokeDasharray="2 8"
        opacity={0.5}
      />
      <line
        x1={0}
        y1={-DISC_RADIUS}
        x2={0}
        y2={DISC_RADIUS}
        stroke="var(--hw-ink-faint-solid)"
        strokeWidth={0.4}
        strokeDasharray="2 8"
        opacity={0.5}
      />

      {/* Asterism connecting the brightest neighbours */}
      {asterism.map((edge, i) => (
        <InkPath
          key={i}
          d={edge.d}
          stroke="var(--hw-gold)"
          strokeWidth={0.5}
          dasharray="2 4"
          opacity={0.5}
          delay={0.8 + i * 0.06}
          duration={0.7}
        />
      ))}

      {/* Sun at centre */}
      <g>
        <circle cx={0} cy={0} r={16} fill="var(--hw-gold)" fillOpacity={0.18} />
        <circle cx={0} cy={0} r={8} fill="var(--hw-gold)" />
        <HandwrittenLabel
          x={0}
          y={-26}
          text="☉ Sol"
          variant="label-major"
          italic
          color="var(--hw-gold)"
          delay={0.5}
        />
      </g>

      {/* Markers — each is a star with spectral colour */}
      {markers.map((m, i) => {
        const p = projectStar(m.position);
        // clamp inside disc
        const px = Math.max(-440, Math.min(440, p.x));
        const py = Math.max(-440, Math.min(440, p.y));
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={px}
            y={py}
            radius={3 + (m.size ?? 0.05) * 70}
            variant="starpoint"
            delay={1.1 + i * 0.05}
          />
        );
      })}
      {markers.map((m, i) => {
        const p = projectStar(m.position);
        const px = Math.max(-440, Math.min(440, p.x));
        const py = Math.max(-440, Math.min(440, p.y));
        const dx = px === 0 ? 1 : Math.sign(px);
        return (
          <HandwrittenLabel
            key={`${m.id}-label`}
            x={px + dx * 16}
            y={py + 14}
            text={m.name.primary}
            variant="label-minor"
            anchor={dx > 0 ? "start" : "end"}
            color="var(--hw-ink)"
            delay={1.6 + i * 0.05}
          />
        );
      })}

      {/* Spectral legend (bottom-left) */}
      <g transform="translate(-440 380)">
        <text className="hw-label-hairline" fill="var(--hw-ink-soft)">
          SPECTRAL TYPE
        </text>
        {SPECTRAL_LEGEND.map((s, i) => (
          <g key={s.type} transform={`translate(0 ${14 + i * 16})`}>
            <circle cx={6} cy={0} r={5} fill={s.color} stroke="var(--hw-ink)" strokeWidth={0.5} />
            <text x={18} y={3} className="hw-label-caption" fill="var(--hw-ink)">
              {s.type} · {s.note}
            </text>
          </g>
        ))}
      </g>

      {/* Distance scale bar (bottom-right) */}
      <g transform="translate(220 420)">
        <line x1={0} y1={0} x2={50} y2={0} stroke="var(--hw-ink)" strokeWidth={1.0} />
        <line x1={0} y1={-3} x2={0} y2={3} stroke="var(--hw-ink)" strokeWidth={1.0} />
        <line x1={50} y1={-3} x2={50} y2={3} stroke="var(--hw-ink)" strokeWidth={1.0} />
        <text x={25} y={-6} textAnchor="middle" className="hw-label-caption" fill="var(--hw-ink)">
          5 ly
        </text>
      </g>

      <Cartouche cx={0} cy={-460} title="Stellar Neighborhood" subtitle="恒星邻域 · 50 ly" />
    </g>
  );
}
