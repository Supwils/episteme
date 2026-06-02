"use client";

import { HandwrittenLabel } from "@/scenes-handwritten/shared/HandwrittenLabel";
import { InkPath } from "@/scenes-handwritten/shared/InkPath";

export function P1PageLaws() {
  return (
    <g>
      <g transform="translate(0 -240)">
        <rect
          x={-340}
          y={-46}
          width={680}
          height={92}
          fill="var(--hw-bg-edge)"
          opacity={0.55}
          stroke="var(--hw-ink)"
          strokeWidth={0.8}
          filter="url(#hw-wobble-tiny)"
        />
        <text
          x={-240}
          y={-4}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          0 · 温度存在
        </text>
        <text
          x={-80}
          y={-4}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          I · ΔU = Q − W
        </text>
        <text
          x={80}
          y={-4}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-gold)"
          style={{ fontStyle: "italic" }}
        >
          II · dS ≥ 0
        </text>
        <text
          x={240}
          y={-4}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          III · S → 0
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          热力学四大定律
        </text>
      </g>

      <g transform="translate(-220 80)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="Carnot · p-V 循环"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <line x1={-130} y1={90} x2={130} y2={90} stroke="var(--hw-ink)" strokeWidth={0.9} />
        <line x1={-130} y1={-90} x2={-130} y2={90} stroke="var(--hw-ink)" strokeWidth={0.9} />
        <InkPath
          d="M -110 -60 q 60 40 110 50"
          stroke="var(--hw-red)"
          strokeWidth={1.4}
          delay={0.4}
        />
        <InkPath d="M 0 -10 q 30 30 60 60" stroke="var(--hw-ink)" strokeWidth={1.0} delay={0.5} />
        <InkPath
          d="M 60 50 q -60 20 -110 30"
          stroke="var(--hw-blue)"
          strokeWidth={1.4}
          delay={0.6}
        />
        <InkPath
          d="M -50 80 q -30 -50 -60 -140"
          stroke="var(--hw-ink)"
          strokeWidth={1.0}
          delay={0.7}
        />
        <HandwrittenLabel
          x={-55}
          y={-65}
          text="T_h"
          variant="label-minor"
          italic
          color="var(--hw-red)"
        />
        <HandwrittenLabel
          x={0}
          y={75}
          text="T_c"
          variant="label-minor"
          italic
          color="var(--hw-blue)"
        />
        <text
          x={140}
          y={96}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          V
        </text>
        <text
          x={-150}
          y={-88}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          p
        </text>
        <HandwrittenLabel
          x={0}
          y={130}
          text="η_C = 1 − T_c / T_h"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      <g transform="translate(220 80)">
        <HandwrittenLabel x={0} y={-150} text="时间之矢" variant="subtitle" italic delay={0.3} />
        <rect
          x={-150}
          y={-60}
          width={120}
          height={120}
          fill="none"
          stroke="var(--hw-ink)"
          strokeWidth={1.0}
        />
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const r = 12 + (i % 3) * 6;
          return (
            <circle
              key={i}
              cx={-90 + Math.cos(a) * r * 0.4}
              cy={Math.sin(a) * r * 0.4}
              r={2}
              fill="var(--hw-gold)"
            />
          );
        })}
        <path
          d="M -8 0 L 28 0 M 22 -5 L 28 0 L 22 5"
          stroke="var(--hw-ink)"
          strokeWidth={1.2}
          fill="none"
        />
        <rect
          x={40}
          y={-60}
          width={120}
          height={120}
          fill="none"
          stroke="var(--hw-ink)"
          strokeWidth={1.0}
        />
        {Array.from({ length: 30 }).map((_, i) => {
          const x = 44 + ((i * 31) % 112);
          const y = -56 + ((i * 47) % 112);
          return <circle key={i} cx={x} cy={y} r={1.6} fill="var(--hw-gold)" opacity={0.85} />;
        })}
        <HandwrittenLabel
          x={-90}
          y={80}
          text="低熵"
          variant="label-minor"
          color="var(--hw-ink-soft)"
          italic
        />
        <HandwrittenLabel
          x={100}
          y={80}
          text="高熵"
          variant="label-minor"
          color="var(--hw-ink-soft)"
          italic
        />
        <HandwrittenLabel
          x={0}
          y={120}
          text="dS > 0 · 不可逆方向"
          variant="label-minor"
          italic
          color="var(--hw-gold)"
          delay={1.0}
        />
      </g>
    </g>
  );
}
