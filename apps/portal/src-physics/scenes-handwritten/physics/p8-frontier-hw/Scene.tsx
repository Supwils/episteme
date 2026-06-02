"use client";

import { getPhysicsContent } from "@/content/universe-physics/physics";
import { Cartouche } from "@/src-physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/src-physics/scenes-handwritten/shared/HandwrittenLabel";
import { HandwrittenMarker } from "@/src-physics/scenes-handwritten/shared/HandwrittenMarker";
import { PaperGrid } from "@/src-physics/scenes-handwritten/shared/PaperGrid";

/**
 * P8 · Frontier. Single page: pie chart of dark sector + open-question
 * cards (quantum gravity / dark matter / quantum info / Hubble tension).
 */
export function P8HwScene() {
  const content = getPhysicsContent("P8");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={340} />

      <g transform="translate(0 -250)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          ?
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          下一个百年的入口
        </text>
      </g>

      {/* LEFT — pie chart of energy density */}
      <g transform="translate(-220 50)">
        <HandwrittenLabel
          x={0}
          y={-140}
          text="宇宙能量构成"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <PieSlice
          cx={0}
          cy={0}
          r={100}
          startAngle={-Math.PI / 2}
          endAngle={-Math.PI / 2 + Math.PI * 2 * 0.683}
          fill="var(--hw-blue)"
        />
        <PieSlice
          cx={0}
          cy={0}
          r={100}
          startAngle={-Math.PI / 2 + Math.PI * 2 * 0.683}
          endAngle={-Math.PI / 2 + Math.PI * 2 * (0.683 + 0.268)}
          fill="var(--hw-red)"
        />
        <PieSlice
          cx={0}
          cy={0}
          r={100}
          startAngle={-Math.PI / 2 + Math.PI * 2 * (0.683 + 0.268)}
          endAngle={Math.PI * 1.5}
          fill="var(--hw-gold)"
        />
        <HandwrittenLabel
          x={60}
          y={-50}
          text="68% 暗能量"
          variant="label-minor"
          italic
          color="var(--hw-blue)"
          delay={0.8}
        />
        <HandwrittenLabel
          x={-60}
          y={60}
          text="27% 暗物质"
          variant="label-minor"
          italic
          color="var(--hw-red)"
          delay={0.9}
        />
        <HandwrittenLabel
          x={60}
          y={70}
          text="5% 可见"
          variant="label-minor"
          italic
          color="var(--hw-gold)"
          delay={1.0}
        />
        <HandwrittenLabel
          x={0}
          y={140}
          text="Planck 2018"
          variant="caption"
          color="var(--hw-ink-soft)"
          delay={1.1}
        />
      </g>

      {/* RIGHT — open questions list */}
      <g transform="translate(220 50)">
        <HandwrittenLabel x={0} y={-140} text="未解之谜" variant="subtitle" italic delay={0.3} />
        {[
          { y: -80, label: "量子引力 / AdS-CFT", color: "var(--hw-gold)" },
          { y: -30, label: "暗物质 + 暗能量", color: "var(--hw-red)" },
          { y: 20, label: "Hubble 张力", color: "var(--hw-blue)" },
          { y: 70, label: "容错量子计算", color: "var(--hw-gold)" },
          { y: 120, label: "AI for Science", color: "var(--hw-red)" },
        ].map((q) => (
          <g key={q.label}>
            <rect
              x={-150}
              y={q.y - 18}
              width={300}
              height={36}
              fill="var(--hw-bg-edge)"
              opacity={0.55}
              stroke={q.color}
              strokeWidth={1.1}
              filter="url(#hw-wobble-tiny)"
            />
            <text
              x={0}
              y={q.y + 6}
              textAnchor="middle"
              className="hw-label-major"
              fill={q.color}
              style={{ fontStyle: "italic" }}
            >
              {q.label}
            </text>
          </g>
        ))}
      </g>

      {markers.slice(0, 6).map((m, i) => {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const ringR = 420;
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={Math.cos(angle) * ringR}
            y={Math.sin(angle) * ringR}
            radius={9 + (m.size ?? 0.03) * 100}
            variant="starpoint"
            delay={1.2 + i * 0.08}
          />
        );
      })}

      <Cartouche cx={0} cy={-460} title="Frontier" subtitle="前沿物理 · 下一个百年" />
    </g>
  );
}

function PieSlice({
  cx,
  cy,
  r,
  startAngle,
  endAngle,
  fill,
}: {
  cx: number;
  cy: number;
  r: number;
  startAngle: number;
  endAngle: number;
  fill: string;
}) {
  const x1 = cx + Math.cos(startAngle) * r;
  const y1 = cy + Math.sin(startAngle) * r;
  const x2 = cx + Math.cos(endAngle) * r;
  const y2 = cy + Math.sin(endAngle) * r;
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  const d = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
  return (
    <path
      d={d}
      fill={fill}
      fillOpacity={0.55}
      stroke="var(--hw-ink)"
      strokeWidth={0.9}
      filter="url(#hw-wobble-tiny)"
    />
  );
}
