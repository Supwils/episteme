"use client";

import { getPhysicsContent } from "@/subjects/physics/lib/tier-content";
import { Cartouche } from "@/subjects/physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenLabel";
import { HandwrittenMarker } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenMarker";
import { PaperGrid } from "@/subjects/physics/scenes-handwritten/shared/PaperGrid";
import { CompositionChart } from "./CompositionChart";

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

      <CompositionChart />

      {/* RIGHT — open questions list */}
      <g transform="translate(220 50)">
        <HandwrittenLabel
          x={0}
          y={-160}
          text="开放的研究问题"
          variant="subtitle"
          italic
          delay={0.3}
        />
        {[
          { y: -110, label: "量子引力 / AdS-CFT", color: "var(--hw-gold)" },
          { y: -60, label: "暗物质 + 暗能量", color: "var(--hw-red)" },
          { y: -10, label: "Hubble 张力", color: "var(--hw-blue)" },
          { y: 40, label: "容错量子计算", color: "var(--hw-gold)" },
          { y: 90, label: "AI for Science", color: "var(--hw-red)" },
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

      <HandwrittenLabel
        x={170}
        y={185}
        text="模型、数据和实验指标须分别比较"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel
        x={170}
        y={208}
        text="重子包含恒星与气体；不等于可见光"
        variant="caption"
        color="var(--hw-ink-soft)"
      />

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
