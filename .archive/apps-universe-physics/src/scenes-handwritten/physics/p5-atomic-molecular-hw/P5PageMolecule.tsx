"use client";

import { HandwrittenLabel } from "@/scenes-handwritten/shared/HandwrittenLabel";
import { InkPath } from "@/scenes-handwritten/shared/InkPath";

export function P5PageMolecule() {
  return (
    <g>
      <g transform="translate(0 -240)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          LCAO · ψ_mol = c₁ ψ_A + c₂ ψ_B
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          化学键 = 原子轨道线性组合
        </text>
      </g>

      {/* LEFT — H2 σ_g / σ_u (bonding + antibonding) */}
      <g transform="translate(-220 60)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="H₂ · σ 成键 / 反键"
          variant="subtitle"
          italic
          delay={0.3}
        />
        {/* bonding sigma_g */}
        <g transform="translate(0 -50)">
          <circle
            cx={-30}
            cy={0}
            r={22}
            fill="var(--hw-wash-warm)"
            stroke="var(--hw-gold)"
            strokeWidth={1.2}
          />
          <circle
            cx={30}
            cy={0}
            r={22}
            fill="var(--hw-wash-warm)"
            stroke="var(--hw-gold)"
            strokeWidth={1.2}
          />
          <path
            d="M -30 0 q 30 -20 60 0"
            fill="none"
            stroke="var(--hw-gold)"
            strokeWidth={1.4}
            filter="url(#hw-wobble-tiny)"
          />
          <HandwrittenLabel
            x={90}
            y={4}
            text="σ_g"
            variant="label-major"
            italic
            color="var(--hw-gold)"
          />
        </g>
        {/* antibonding sigma_u with node */}
        <g transform="translate(0 60)">
          <circle
            cx={-30}
            cy={0}
            r={22}
            fill="var(--hw-wash-cool)"
            stroke="var(--hw-blue)"
            strokeWidth={1.2}
          />
          <circle
            cx={30}
            cy={0}
            r={22}
            fill="var(--hw-wash-warm)"
            stroke="var(--hw-red)"
            strokeWidth={1.2}
          />
          <line
            x1={0}
            y1={-32}
            x2={0}
            y2={32}
            stroke="var(--hw-ink-soft)"
            strokeWidth={0.8}
            strokeDasharray="3 4"
          />
          <HandwrittenLabel
            x={90}
            y={4}
            text="σ_u*"
            variant="label-major"
            italic
            color="var(--hw-blue)"
          />
        </g>
        <HandwrittenLabel
          x={0}
          y={140}
          text="同号叠加 → 成键 · 异号 → 反键"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      {/* RIGHT — hybridization grid */}
      <g transform="translate(220 60)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="杂化 · sp / sp² / sp³"
          variant="subtitle"
          italic
          delay={0.3}
        />
        {[
          { x: -90, label: "sp", desc: "线性 · 180°", angles: [0, Math.PI] },
          {
            x: 0,
            label: "sp²",
            desc: "三角 · 120°",
            angles: [Math.PI / 2, (Math.PI * 7) / 6, (Math.PI * 11) / 6],
          },
          {
            x: 90,
            label: "sp³",
            desc: "四面体 · 109.5°",
            angles: [Math.PI / 4, (Math.PI * 3) / 4, (Math.PI * 5) / 4, (Math.PI * 7) / 4],
          },
        ].map((h) => (
          <g key={h.label} transform={`translate(${h.x} 0)`}>
            <circle cx={0} cy={0} r={5} fill="var(--hw-ink)" />
            {h.angles.map((a, i) => (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={Math.cos(a) * 32}
                y2={Math.sin(a) * 32}
                stroke="var(--hw-gold)"
                strokeWidth={1.3}
              />
            ))}
            <text
              x={0}
              y={56}
              textAnchor="middle"
              className="hw-label-major"
              fill="var(--hw-gold)"
              style={{ fontStyle: "italic" }}
            >
              {h.label}
            </text>
            <text
              x={0}
              y={76}
              textAnchor="middle"
              className="hw-label-caption"
              fill="var(--hw-ink-soft)"
            >
              {h.desc}
            </text>
          </g>
        ))}
        <HandwrittenLabel
          x={0}
          y={130}
          text="CH₄ · C₂H₄ · C₂H₂ 的几何根源"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      {/* Bottom — periodic-table strip with sub-shell capacity */}
      <g transform="translate(0 270)">
        <HandwrittenLabel
          x={0}
          y={-22}
          text="元素周期表 · 列宽 = 子壳容量"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
        />
        <InkPath
          d="M -260 0 L -180 0 M -170 0 L -50 0 M -40 0 L 50 0 M 60 0 L 200 0 M 210 0 L 260 0"
          stroke="var(--hw-gold)"
          strokeWidth={1.6}
        />
        {[
          { x: -220, label: "s · 2" },
          { x: -110, label: "p · 6" },
          { x: 5, label: "d · 10" },
          { x: 130, label: "f · 14" },
          { x: 235, label: "..." },
        ].map((seg) => (
          <text
            key={seg.label}
            x={seg.x}
            y={26}
            textAnchor="middle"
            className="hw-label-caption"
            fill="var(--hw-ink-soft)"
          >
            {seg.label}
          </text>
        ))}
      </g>
    </g>
  );
}
