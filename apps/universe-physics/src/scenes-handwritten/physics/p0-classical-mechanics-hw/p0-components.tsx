import { HandwrittenLabel } from "@/scenes-handwritten/shared/HandwrittenLabel";
import { InkPath } from "@/scenes-handwritten/shared/InkPath";

export const SUBTITLE_BY_PAGE = [
  "经典力学 · I · F = ma",
  "经典力学 · II · L = T − V",
  "经典力学 · III · 守恒律 / Noether",
];

export function P0PageNewton() {
  return (
    <g>
      {/* Central headline — F = ma */}
      <g transform="translate(0 -50)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          F = m · a
        </text>
        <text
          x={0}
          y={36}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          Newton II · 牛顿第二定律
        </text>
      </g>

      {/* Pendulum — left */}
      <g transform="translate(-260 120)">
        <InkPath d="M 0 -120 L 0 60" stroke="var(--hw-ink)" strokeWidth={0.9} delay={0.2} />
        <InkPath
          d="M -90 -120 L 90 -120"
          stroke="var(--hw-ink-soft)"
          strokeWidth={0.7}
          delay={0.1}
        />
        <InkPath
          d="M 0 -120 q 40 90 60 110"
          stroke="var(--hw-gold)"
          strokeWidth={1.4}
          delay={0.4}
          filterLevel="wobble-tiny"
        />
        <circle
          cx={60}
          cy={-10}
          r={14}
          fill="var(--hw-gold)"
          stroke="var(--hw-ink)"
          strokeWidth={0.8}
        />
        <InkPath
          d="M 0 0 a 70 70 0 0 1 35 -60"
          stroke="var(--hw-ink-soft)"
          strokeWidth={0.6}
          dasharray="2 4"
          delay={0.8}
        />
        <HandwrittenLabel x={28} y={-50} text="θ" variant="label-major" italic delay={1.0} />
        <HandwrittenLabel
          x={0}
          y={90}
          text="Pendulum · 单摆 · T = 2π√(L/g)"
          variant="caption"
          color="var(--hw-ink-soft)"
          delay={1.1}
        />
      </g>

      {/* Spring + mass — right */}
      <g transform="translate(260 120)">
        <InkPath d="M -120 0 L -100 0" stroke="var(--hw-ink-soft)" strokeWidth={0.9} delay={0.2} />
        <InkPath
          d="M -100 0 L -88 -14 L -68 14 L -48 -14 L -28 14 L -8 -14 L 12 14 L 28 0"
          stroke="var(--hw-gold)"
          strokeWidth={1.5}
          delay={0.5}
          filterLevel="wobble-tiny"
        />
        <rect
          x={28}
          y={-22}
          width={44}
          height={44}
          fill="var(--hw-gold)"
          fillOpacity={0.85}
          stroke="var(--hw-ink)"
          strokeWidth={0.8}
        />
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1={-126}
            y1={-36 + i * 12}
            x2={-114}
            y2={-26 + i * 12}
            stroke="var(--hw-ink-soft)"
            strokeWidth={0.7}
          />
        ))}
        <HandwrittenLabel x={50} y={-38} text="m" variant="label-major" italic delay={1.2} />
        <HandwrittenLabel
          x={0}
          y={60}
          text="Spring · 简谐 · ω = √(k/m)"
          variant="caption"
          color="var(--hw-ink-soft)"
          delay={1.1}
        />
      </g>

      {/* Projectile parabola — bottom-left */}
      <g transform="translate(-220 300)">
        <InkPath
          d="M -110 50 q 55 -120 110 -90 q 55 30 70 100"
          stroke="var(--hw-gold)"
          strokeWidth={1.3}
          delay={0.6}
          filterLevel="wobble-tiny"
        />
        <line x1={-120} y1={60} x2={120} y2={60} stroke="var(--hw-ink-soft)" strokeWidth={0.8} />
        <circle cx={-110} cy={50} r={6} fill="var(--hw-gold)" />
        <line x1={-110} y1={50} x2={-65} y2={-10} stroke="var(--hw-blue)" strokeWidth={1.2} />
        <path
          d="M -65 -10 L -75 -4 M -65 -10 L -60 -2"
          stroke="var(--hw-blue)"
          strokeWidth={1.2}
          fill="none"
          strokeLinecap="round"
        />
        <HandwrittenLabel
          x={-85}
          y={-16}
          text="v₀"
          variant="label-minor"
          color="var(--hw-blue)"
          delay={1.2}
        />
        <HandwrittenLabel
          x={0}
          y={80}
          text="Projectile · 抛体 · y = v₀ sin θ · t − ½g·t²"
          variant="caption"
          color="var(--hw-ink-soft)"
          delay={1.1}
        />
      </g>

      {/* Free-body — bottom-right */}
      <g transform="translate(240 300)">
        <line x1={-90} y1={60} x2={90} y2={60} stroke="var(--hw-ink-soft)" strokeWidth={0.8} />
        <rect
          x={-30}
          y={20}
          width={60}
          height={40}
          fill="var(--hw-bg-edge)"
          stroke="var(--hw-ink)"
          strokeWidth={0.9}
          opacity={0.65}
        />
        {/* gravity */}
        <line x1={0} y1={40} x2={0} y2={110} stroke="var(--hw-red)" strokeWidth={1.4} />
        <path
          d="M 0 110 L -6 102 M 0 110 L 6 102"
          stroke="var(--hw-red)"
          strokeWidth={1.4}
          fill="none"
        />
        <HandwrittenLabel
          x={14}
          y={92}
          text="mg"
          variant="label-minor"
          color="var(--hw-red)"
          italic
          delay={1.2}
        />
        {/* normal */}
        <line x1={0} y1={40} x2={0} y2={-40} stroke="var(--hw-blue)" strokeWidth={1.4} />
        <path
          d="M 0 -40 L -6 -32 M 0 -40 L 6 -32"
          stroke="var(--hw-blue)"
          strokeWidth={1.4}
          fill="none"
        />
        <HandwrittenLabel
          x={14}
          y={-22}
          text="N"
          variant="label-minor"
          color="var(--hw-blue)"
          italic
          delay={1.2}
        />
        {/* friction */}
        <line x1={0} y1={40} x2={70} y2={40} stroke="var(--hw-gold)" strokeWidth={1.3} />
        <path
          d="M 70 40 L 62 34 M 70 40 L 62 46"
          stroke="var(--hw-gold)"
          strokeWidth={1.3}
          fill="none"
        />
        <HandwrittenLabel
          x={48}
          y={28}
          text="f"
          variant="label-minor"
          color="var(--hw-gold)"
          italic
          delay={1.2}
        />
        <HandwrittenLabel
          x={0}
          y={130}
          text="Free body · 受力分析"
          variant="caption"
          color="var(--hw-ink-soft)"
          delay={1.1}
        />
      </g>
    </g>
  );
}

export function P0PageLagrange() {
  return (
    <g>
      {/* Big central cartouche L = T − V */}
      <g transform="translate(0 -100)">
        <rect
          x={-220}
          y={-50}
          width={440}
          height={100}
          fill="var(--hw-bg-edge)"
          opacity={0.55}
          stroke="var(--hw-ink)"
          strokeWidth={0.9}
          filter="url(#hw-wobble-tiny)"
        />
        <text
          x={0}
          y={6}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          ℒ = T − V
        </text>
        <text
          x={0}
          y={36}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          Lagrangian · 动能 − 势能
        </text>
      </g>

      {/* Hamilton's principle — left column */}
      <g transform="translate(-260 80)">
        <HandwrittenLabel
          x={0}
          y={-40}
          text="Hamilton 原理"
          variant="subtitle"
          italic
          color="var(--hw-ink)"
          delay={0.3}
        />
        <text
          x={0}
          y={10}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-gold)"
          style={{ fontStyle: "italic" }}
        >
          δS = δ∫ ℒ dt = 0
        </text>
        <text
          x={0}
          y={48}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          作用量取极值的路径
        </text>
        {/* path bundle illustration */}
        <g transform="translate(0 100)">
          <InkPath
            d="M -110 30 q 40 -60 110 -30"
            stroke="var(--hw-gold)"
            strokeWidth={1.6}
            delay={0.5}
          />
          <InkPath
            d="M -110 30 q 50 -30 110 -30"
            stroke="var(--hw-ink-soft)"
            strokeWidth={0.7}
            delay={0.6}
            dasharray="3 5"
          />
          <InkPath
            d="M -110 30 q 60 -90 110 -30"
            stroke="var(--hw-ink-soft)"
            strokeWidth={0.7}
            delay={0.7}
            dasharray="3 5"
          />
          <circle cx={-110} cy={30} r={5} fill="var(--hw-ink)" />
          <circle cx={0} cy={0} r={4} fill="var(--hw-ink-soft)" />
          <circle cx={0} cy={-30} r={4} fill="var(--hw-ink-soft)" />
          <circle cx={110} cy={0} r={5} fill="var(--hw-ink)" />
          <HandwrittenLabel
            x={-110}
            y={50}
            text="q(t₁)"
            variant="caption"
            color="var(--hw-ink-soft)"
          />
          <HandwrittenLabel
            x={110}
            y={20}
            text="q(t₂)"
            variant="caption"
            color="var(--hw-ink-soft)"
          />
        </g>
      </g>

      {/* Phase-space portrait — right column */}
      <g transform="translate(260 80)">
        <HandwrittenLabel
          x={0}
          y={-40}
          text="Hamilton 方程"
          variant="subtitle"
          italic
          color="var(--hw-ink)"
          delay={0.3}
        />
        <text
          x={0}
          y={0}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-blue)"
          style={{ fontStyle: "italic" }}
        >
          q̇ = ∂H/∂p
        </text>
        <text
          x={0}
          y={28}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-blue)"
          style={{ fontStyle: "italic" }}
        >
          ṗ = −∂H/∂q
        </text>
        {/* Phase space concentric loops */}
        <g transform="translate(0 130)">
          <ellipse
            cx={0}
            cy={0}
            rx={100}
            ry={45}
            fill="none"
            stroke="var(--hw-blue)"
            strokeWidth={1.0}
            opacity={0.7}
          />
          <ellipse
            cx={0}
            cy={0}
            rx={70}
            ry={32}
            fill="none"
            stroke="var(--hw-blue)"
            strokeWidth={0.9}
            opacity={0.55}
          />
          <ellipse
            cx={0}
            cy={0}
            rx={40}
            ry={18}
            fill="none"
            stroke="var(--hw-blue)"
            strokeWidth={0.8}
            opacity={0.4}
          />
          <path
            d="M 100 0 L 92 -6 M 100 0 L 92 6"
            stroke="var(--hw-blue)"
            strokeWidth={1.0}
            fill="none"
          />
          <path
            d="M -100 0 L -92 6 M -100 0 L -92 -6"
            stroke="var(--hw-blue)"
            strokeWidth={1.0}
            fill="none"
          />
          <HandwrittenLabel
            x={114}
            y={4}
            text="q"
            variant="label-major"
            italic
            color="var(--hw-ink-soft)"
          />
          <HandwrittenLabel
            x={-6}
            y={-58}
            text="p"
            variant="label-major"
            italic
            color="var(--hw-ink-soft)"
          />
        </g>
      </g>
    </g>
  );
}

export function P0PageKepler() {
  return (
    <g>
      {/* Big Kepler ellipse */}
      <g transform="translate(0 30)">
        <ellipse
          cx={0}
          cy={0}
          rx={260}
          ry={130}
          fill="none"
          stroke="var(--hw-gold)"
          strokeWidth={1.6}
          filter="url(#hw-wobble-tiny)"
        />
        {/* Sun at left focus */}
        <circle
          cx={-140}
          cy={0}
          r={20}
          fill="var(--hw-gold)"
          stroke="var(--hw-ink)"
          strokeWidth={0.9}
        />
        <HandwrittenLabel
          x={-140}
          y={-32}
          text="☉"
          variant="title"
          color="var(--hw-ink)"
          delay={0.4}
        />
        {/* Planet */}
        <circle cx={200} cy={70} r={8} fill="var(--hw-blue)" />
        <HandwrittenLabel
          x={220}
          y={64}
          text="planet"
          variant="caption"
          color="var(--hw-blue)"
          delay={0.5}
        />
        {/* Equal area sweeps */}
        <path
          d="M -140 0 L 246 50 A 260 130 0 0 1 206 90 Z"
          fill="var(--hw-wash-warm)"
          stroke="var(--hw-gold)"
          strokeWidth={0.6}
          opacity={0.6}
        />
        <path
          d="M -140 0 L -390 -30 A 260 130 0 0 1 -370 25 Z"
          transform="translate(290 0)"
          fill="var(--hw-wash-warm)"
          stroke="var(--hw-gold)"
          strokeWidth={0.6}
          opacity={0.6}
        />
        <HandwrittenLabel
          x={0}
          y={170}
          text="Kepler II · 等面积速率 · dA/dt = L/2m"
          variant="caption"
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
        {/* Foci ticks */}
        <line x1={-140} y1={-4} x2={-140} y2={4} stroke="var(--hw-ink)" strokeWidth={1.2} />
        <line x1={140} y1={-4} x2={140} y2={4} stroke="var(--hw-ink-soft)" strokeWidth={0.8} />
      </g>

      {/* Headline equation */}
      <g transform="translate(0 -210)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          T² ∝ a³
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          Kepler III · 周期-半长轴定律
        </text>
      </g>

      {/* Noether stamp + conservation list */}
      <g transform="translate(0 280)">
        <rect
          x={-280}
          y={-30}
          width={560}
          height={70}
          fill="var(--hw-bg-edge)"
          opacity={0.5}
          stroke="var(--hw-ink-soft)"
          strokeWidth={0.7}
          filter="url(#hw-wobble-tiny)"
        />
        <HandwrittenLabel
          x={-200}
          y={4}
          text="时间平移 → 能量守恒"
          variant="label-minor"
          color="var(--hw-ink)"
          delay={0.6}
        />
        <HandwrittenLabel
          x={0}
          y={4}
          text="空间平移 → 动量守恒"
          variant="label-minor"
          color="var(--hw-ink)"
          delay={0.7}
        />
        <HandwrittenLabel
          x={200}
          y={4}
          text="旋转对称 → 角动量"
          variant="label-minor"
          color="var(--hw-ink)"
          delay={0.8}
        />
        <HandwrittenLabel
          x={0}
          y={28}
          text="Noether 1918 · 每一个连续对称性都对应一个守恒律"
          variant="caption"
          color="var(--hw-ink-soft)"
          delay={0.9}
        />
      </g>
    </g>
  );
}
