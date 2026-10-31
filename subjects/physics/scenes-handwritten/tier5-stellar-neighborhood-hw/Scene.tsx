"use client";

import { getTierContent } from "@/subjects/physics/lib/tier-content";
import { Cartouche } from "../shared/Cartouche";
import { HandwrittenLabel } from "../shared/HandwrittenLabel";
import { HandwrittenMarker } from "../shared/HandwrittenMarker";
import { StarSpeck } from "../shared/StarSpeck";

const DISC_RADIUS = 420;

const RANGE_RINGS = [
  { ly: 10, label: "10 ly" },
  { ly: 25, label: "25 ly" },
  { ly: 50, label: "50 ly" },
];

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

  // Positions are dimensionless: one unit = 50 ly. Orthographic x-z projection.
  const projectStar = (pos: readonly [number, number, number]) => ({
    x: pos[0] * DISC_RADIUS,
    y: pos[2] * DISC_RADIUS,
  });

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

      {/* The Sun is rendered once by its data marker; this is only a diffuse halo. */}
      <circle cx={0} cy={0} r={16} fill="var(--hw-gold)" fillOpacity={0.18} />

      {/* Markers — each is a star with spectral colour */}
      {markers.map((m, i) => {
        const p = projectStar(m.position);
        const px = p.x;
        const py = p.y;
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
        const px = p.x;
        const py = p.y;
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
        <line x1={0} y1={0} x2={DISC_RADIUS / 10} y2={0} stroke="var(--hw-ink)" strokeWidth={1.0} />
        <line x1={0} y1={-3} x2={0} y2={3} stroke="var(--hw-ink)" strokeWidth={1.0} />
        <line
          x1={DISC_RADIUS / 10}
          y1={-3}
          x2={DISC_RADIUS / 10}
          y2={3}
          stroke="var(--hw-ink)"
          strokeWidth={1.0}
        />
        <text
          x={DISC_RADIUS / 20}
          y={-6}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink)"
        >
          5 ly
        </text>
      </g>

      <HandwrittenLabel
        x={0}
        y={-395}
        text="精选近邻 · 赤道平面正投影"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel
        x={0}
        y={-372}
        text="投影距离不大于真实距离；点大小为示意"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <Cartouche cx={0} cy={-460} title="Stellar Neighborhood" subtitle="恒星邻域 · 半径50 ly" />
    </g>
  );
}
