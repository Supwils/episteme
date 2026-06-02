import { HandwrittenLabel } from "@/src-physics/scenes-handwritten/shared/HandwrittenLabel";
import { InkPath } from "@/src-physics/scenes-handwritten/shared/InkPath";
import { buildAlphaSCurve, buildBindingCurve } from "./p6-data";

export function P6PageNucleus() {
  return (
    <g>
      <g transform="translate(0 -250)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          E_b / A
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          结合能曲线 · 峰在 ⁵⁶Fe
        </text>
      </g>

      {/* LEFT — binding-energy curve */}
      <g transform="translate(-220 60)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="聚变 ← Fe → 裂变"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <line x1={-140} y1={80} x2={140} y2={80} stroke="var(--hw-ink)" strokeWidth={0.9} />
        <line x1={-140} y1={-80} x2={-140} y2={80} stroke="var(--hw-ink)" strokeWidth={0.9} />
        <InkPath
          d={buildBindingCurve()}
          stroke="var(--hw-gold)"
          strokeWidth={1.6}
          delay={0.4}
          filterLevel="wobble-tiny"
        />
        <circle cx={-30} cy={-60} r={5} fill="var(--hw-red)" />
        <HandwrittenLabel
          x={-30}
          y={-78}
          text="⁵⁶Fe"
          variant="label-minor"
          italic
          color="var(--hw-red)"
        />
        <path
          d="M -120 30 L -90 0 L -94 -2 M -90 0 L -94 4"
          stroke="var(--hw-blue)"
          strokeWidth={1.1}
          fill="none"
        />
        <HandwrittenLabel
          x={-110}
          y={45}
          text="聚变"
          variant="label-minor"
          italic
          color="var(--hw-blue)"
        />
        <path
          d="M 120 30 L 90 0 L 94 -2 M 90 0 L 94 4"
          stroke="var(--hw-blue)"
          strokeWidth={1.1}
          fill="none"
        />
        <HandwrittenLabel
          x={110}
          y={45}
          text="裂变"
          variant="label-minor"
          italic
          color="var(--hw-blue)"
        />
        <text
          x={146}
          y={86}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          A
        </text>
        <text
          x={-160}
          y={-78}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          E_b/A
        </text>
      </g>

      {/* RIGHT — α / β / γ decay schematics */}
      <g transform="translate(220 60)">
        <HandwrittenLabel x={0} y={-150} text="衰变三类" variant="subtitle" italic delay={0.3} />
        {/* alpha: parent nucleus → daughter + ⁴He */}
        <g transform="translate(0 -80)">
          <circle
            cx={-50}
            cy={0}
            r={20}
            fill="var(--hw-wash-warm)"
            stroke="var(--hw-ink)"
            strokeWidth={1.0}
          />
          <path
            d="M -25 0 L 10 0 L 4 -3 M 10 0 L 4 3"
            stroke="var(--hw-gold)"
            strokeWidth={1.2}
            fill="none"
          />
          <circle
            cx={30}
            cy={0}
            r={14}
            fill="var(--hw-wash-warm)"
            stroke="var(--hw-ink)"
            strokeWidth={1.0}
          />
          <circle
            cx={62}
            cy={0}
            r={8}
            fill="var(--hw-gold)"
            stroke="var(--hw-ink)"
            strokeWidth={0.9}
          />
          <HandwrittenLabel
            x={62}
            y={-18}
            text="⁴He"
            variant="caption"
            color="var(--hw-gold)"
            italic
          />
          <HandwrittenLabel x={-110} y={4} text="α" variant="title" italic color="var(--hw-gold)" />
        </g>
        {/* beta: n → p + e⁻ + ν̄ */}
        <g transform="translate(0 0)">
          <circle
            cx={-50}
            cy={0}
            r={14}
            fill="var(--hw-wash-cool)"
            stroke="var(--hw-ink)"
            strokeWidth={1.0}
          />
          <path
            d="M -30 0 L 6 0 L 0 -3 M 6 0 L 0 3"
            stroke="var(--hw-blue)"
            strokeWidth={1.2}
            fill="none"
          />
          <circle
            cx={26}
            cy={0}
            r={14}
            fill="var(--hw-wash-warm)"
            stroke="var(--hw-ink)"
            strokeWidth={1.0}
          />
          <circle cx={54} cy={-12} r={5} fill="var(--hw-blue)" />
          <HandwrittenLabel
            x={62}
            y={-18}
            text="e⁻"
            variant="caption"
            color="var(--hw-blue)"
            italic
          />
          <circle cx={54} cy={14} r={4} fill="var(--hw-ink-soft)" />
          <HandwrittenLabel
            x={64}
            y={22}
            text="ν̄"
            variant="caption"
            color="var(--hw-ink-soft)"
            italic
          />
          <HandwrittenLabel x={-110} y={4} text="β" variant="title" italic color="var(--hw-blue)" />
        </g>
        {/* gamma: excited nucleus → ground + γ */}
        <g transform="translate(0 80)">
          <circle
            cx={-50}
            cy={0}
            r={16}
            fill="var(--hw-wash-cool)"
            stroke="var(--hw-red)"
            strokeWidth={1.4}
          />
          <path
            d="M -25 -10 q 10 0 10 8 q 0 8 10 8 q 10 0 10 -8 q 0 -8 10 -8 q 10 0 10 8 q 0 8 10 8"
            fill="none"
            stroke="var(--hw-red)"
            strokeWidth={1.3}
          />
          <circle
            cx={50}
            cy={0}
            r={16}
            fill="var(--hw-wash-cool)"
            stroke="var(--hw-ink)"
            strokeWidth={1.0}
          />
          <HandwrittenLabel x={-110} y={4} text="γ" variant="title" italic color="var(--hw-red)" />
        </g>
        <HandwrittenLabel
          x={0}
          y={150}
          text="半衰期跨越 26 量级"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      {/* Bottom — fusion vs fission chip strip */}
      <g transform="translate(0 280)">
        <rect
          x={-280}
          y={-30}
          width={560}
          height={64}
          fill="var(--hw-bg-edge)"
          opacity={0.55}
          stroke="var(--hw-ink-soft)"
          strokeWidth={0.7}
          filter="url(#hw-wobble-tiny)"
        />
        <HandwrittenLabel
          x={-150}
          y={-2}
          text="DT 聚变 · Q = 17.6 MeV"
          variant="label-major"
          italic
          color="var(--hw-gold)"
        />
        <HandwrittenLabel
          x={150}
          y={-2}
          text="²³⁵U 裂变 · Q ≈ 200 MeV"
          variant="label-major"
          italic
          color="var(--hw-blue)"
        />
        <HandwrittenLabel
          x={0}
          y={26}
          text="太阳 · 反应堆 · 都从结合能曲线两端读出能量"
          variant="caption"
          color="var(--hw-ink-soft)"
        />
      </g>
    </g>
  );
}

export function P6PageParticle() {
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
          p = u u d
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          色禁闭 · 永远的「白色」组合
        </text>
      </g>

      {/* LEFT — proton with three quarks + gluon links */}
      <g transform="translate(-220 60)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="质子 · 三夸克"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <circle
          cx={0}
          cy={0}
          r={110}
          fill="var(--hw-wash-warm)"
          opacity={0.45}
          stroke="var(--hw-ink)"
          strokeWidth={1.2}
          filter="url(#hw-wobble-tiny)"
        />
        {[
          { x: -50, y: -35, label: "u", color: "var(--hw-gold)" },
          { x: 50, y: -35, label: "u", color: "var(--hw-gold)" },
          { x: 0, y: 60, label: "d", color: "var(--hw-blue)" },
        ].map((q, i) => (
          <g key={i}>
            <circle
              cx={q.x}
              cy={q.y}
              r={22}
              fill={q.color}
              stroke="var(--hw-ink)"
              strokeWidth={1.0}
            />
            <text
              x={q.x}
              y={q.y + 8}
              textAnchor="middle"
              className="hw-label-major"
              fill="var(--hw-bg)"
              style={{ fontStyle: "italic" }}
            >
              {q.label}
            </text>
          </g>
        ))}
        {/* gluon springs */}
        <InkPath
          d="M -30 -32 q 30 12 60 0"
          stroke="var(--hw-red)"
          strokeWidth={1.1}
          dasharray="3 3"
        />
        <InkPath
          d="M -30 -12 q 15 35 25 50"
          stroke="var(--hw-red)"
          strokeWidth={1.1}
          dasharray="3 3"
        />
        <InkPath
          d="M 30 -12 q -15 35 -25 50"
          stroke="var(--hw-red)"
          strokeWidth={1.1}
          dasharray="3 3"
        />
        <HandwrittenLabel
          x={0}
          y={140}
          text="胶子交换 · 强相互作用"
          variant="label-minor"
          italic
          color="var(--hw-red)"
          delay={1.0}
        />
      </g>

      {/* RIGHT — running coupling α_s(Q) */}
      <g transform="translate(220 60)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="α_s(Q) · 渐进自由"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <line x1={-130} y1={80} x2={130} y2={80} stroke="var(--hw-ink)" strokeWidth={0.9} />
        <line x1={-130} y1={-80} x2={-130} y2={80} stroke="var(--hw-ink)" strokeWidth={0.9} />
        {/* monotonically decreasing curve */}
        <InkPath
          d={buildAlphaSCurve()}
          stroke="var(--hw-blue)"
          strokeWidth={1.5}
          delay={0.5}
          filterLevel="wobble-tiny"
        />
        <text
          x={140}
          y={86}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          Q
        </text>
        <text
          x={-150}
          y={-78}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          α_s
        </text>
        {/* m_Z marker */}
        <line x1={20} y1={75} x2={20} y2={85} stroke="var(--hw-gold)" strokeWidth={1.2} />
        <HandwrittenLabel
          x={20}
          y={102}
          text="m_Z"
          variant="caption"
          italic
          color="var(--hw-gold)"
        />
        <HandwrittenLabel
          x={0}
          y={130}
          text="α_s(m_Z) ≈ 0.118 · Nobel 2004"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      {/* Bottom — energy ladder */}
      <g transform="translate(0 280)">
        <rect
          x={-280}
          y={-30}
          width={560}
          height={64}
          fill="var(--hw-bg-edge)"
          opacity={0.55}
          stroke="var(--hw-ink-soft)"
          strokeWidth={0.7}
          filter="url(#hw-wobble-tiny)"
        />
        {[
          { x: -200, label: "atom · eV", color: "var(--hw-blue)" },
          { x: -60, label: "nucleus · MeV", color: "var(--hw-gold)" },
          { x: 80, label: "Higgs · 125 GeV", color: "var(--hw-red)" },
          { x: 220, label: "LHC · 13 TeV", color: "var(--hw-gold)" },
        ].map((c) => (
          <g key={c.label} transform={`translate(${c.x} 0)`}>
            <HandwrittenLabel
              x={0}
              y={4}
              text={c.label}
              variant="label-minor"
              italic
              color={c.color}
            />
          </g>
        ))}
        <HandwrittenLabel
          x={0}
          y={26}
          text="能量阶梯 · 每升 1000 倍就有新结构"
          variant="caption"
          color="var(--hw-ink-soft)"
        />
      </g>
    </g>
  );
}
