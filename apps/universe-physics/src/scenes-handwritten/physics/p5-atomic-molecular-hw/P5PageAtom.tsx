"use client";

import { HandwrittenLabel } from "@/scenes-handwritten/shared/HandwrittenLabel";

export function P5PageAtom() {
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
          E_n = − 13.6 / n² eV
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          氢原子离散能级 · Bohr 1913
        </text>
      </g>

      {/* LEFT — Bohr level diagram + Lyman/Balmer */}
      <g transform="translate(-220 60)">
        <HandwrittenLabel x={0} y={-150} text="能级与谱线" variant="subtitle" italic delay={0.3} />
        {[
          { y: 90, n: 1 },
          { y: 30, n: 2 },
          { y: -10, n: 3 },
          { y: -40, n: 4 },
          { y: -65, n: 5 },
        ].map((lvl) => (
          <g key={lvl.n}>
            <line
              x1={-120}
              y1={lvl.y}
              x2={120}
              y2={lvl.y}
              stroke="var(--hw-gold)"
              strokeWidth={1.2}
            />
            <text x={130} y={lvl.y + 5} className="hw-label-caption" fill="var(--hw-gold)">
              n = {lvl.n}
            </text>
          </g>
        ))}
        {[30, -10, -40].map((y, i) => (
          <g key={`ly${i}`}>
            <line
              x1={-80 + i * 25}
              y1={y}
              x2={-80 + i * 25}
              y2={90}
              stroke="var(--hw-blue)"
              strokeWidth={1.0}
            />
            <path
              d={`M ${-80 + i * 25} 90 L ${-86 + i * 25} 82 M ${-80 + i * 25} 90 L ${-74 + i * 25} 82`}
              stroke="var(--hw-blue)"
              strokeWidth={1.0}
              fill="none"
            />
          </g>
        ))}
        {[-10, -40].map((y, i) => (
          <g key={`ba${i}`}>
            <line
              x1={30 + i * 20}
              y1={y}
              x2={30 + i * 20}
              y2={30}
              stroke="var(--hw-red)"
              strokeWidth={1.0}
            />
            <path
              d={`M ${30 + i * 20} 30 L ${24 + i * 20} 22 M ${30 + i * 20} 30 L ${36 + i * 20} 22`}
              stroke="var(--hw-red)"
              strokeWidth={1.0}
              fill="none"
            />
          </g>
        ))}
        <HandwrittenLabel
          x={-50}
          y={120}
          text="Lyman · UV"
          variant="label-minor"
          italic
          color="var(--hw-blue)"
        />
        <HandwrittenLabel
          x={50}
          y={120}
          text="Balmer · 可见"
          variant="label-minor"
          italic
          color="var(--hw-red)"
        />
      </g>

      {/* RIGHT — orbital shapes (s / p / d) */}
      <g transform="translate(220 60)">
        <HandwrittenLabel x={0} y={-150} text="轨道形状" variant="subtitle" italic delay={0.3} />
        <circle
          cx={-90}
          cy={0}
          r={30}
          fill="var(--hw-wash-cool)"
          stroke="var(--hw-blue)"
          strokeWidth={1.4}
        />
        <HandwrittenLabel x={-90} y={50} text="s" variant="title" italic color="var(--hw-blue)" />
        <ellipse
          cx={0}
          cy={-22}
          rx={18}
          ry={26}
          fill="var(--hw-wash-warm)"
          stroke="var(--hw-gold)"
          strokeWidth={1.3}
        />
        <ellipse
          cx={0}
          cy={22}
          rx={18}
          ry={26}
          fill="var(--hw-wash-warm)"
          stroke="var(--hw-gold)"
          strokeWidth={1.3}
        />
        <HandwrittenLabel x={0} y={70} text="p" variant="title" italic color="var(--hw-gold)" />
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((a, i) => (
          <ellipse
            key={i}
            cx={90 + Math.cos(a) * 18}
            cy={Math.sin(a) * 18}
            rx={10}
            ry={20}
            transform={`rotate(${(a * 180) / Math.PI + 45} ${90 + Math.cos(a) * 18} ${Math.sin(a) * 18})`}
            fill="var(--hw-wash-warm)"
            opacity={0.6}
            stroke="var(--hw-red)"
            strokeWidth={1.2}
          />
        ))}
        <HandwrittenLabel x={90} y={70} text="d" variant="title" italic color="var(--hw-red)" />
        <HandwrittenLabel
          x={0}
          y={130}
          text="Y_lm 球谐 · Schrödinger 精确解"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      {/* Bottom — Pauli + Hund chip strip */}
      <g transform="translate(0 270)">
        <rect
          x={-280}
          y={-22}
          width={560}
          height={56}
          fill="var(--hw-bg-edge)"
          opacity={0.55}
          stroke="var(--hw-ink-soft)"
          strokeWidth={0.7}
          filter="url(#hw-wobble-tiny)"
        />
        <HandwrittenLabel
          x={-150}
          y={4}
          text="Pauli · 不相容"
          variant="label-major"
          italic
          color="var(--hw-ink)"
        />
        <HandwrittenLabel
          x={50}
          y={4}
          text="Hund · 最大自旋多重度"
          variant="label-major"
          italic
          color="var(--hw-ink)"
        />
        <HandwrittenLabel
          x={0}
          y={26}
          text="量子数 (n, ℓ, m, s) · 决定周期表的列宽"
          variant="caption"
          color="var(--hw-ink-soft)"
        />
      </g>
    </g>
  );
}
