"use client";

import { HandwrittenLabel } from "@/src-physics/scenes-handwritten/shared/HandwrittenLabel";
import { InkPath } from "@/src-physics/scenes-handwritten/shared/InkPath";

export function P7PageGauge() {
  return (
    <g>
      <g transform="translate(0 -260)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          SU(3) × SU(2) × U(1)
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          强 × 弱 × 电磁 · 规范群
        </text>
      </g>

      {/* LEFT — Higgs Mexican-hat potential */}
      <g transform="translate(-220 60)">
        <HandwrittenLabel
          x={0}
          y={-160}
          text="Higgs 势 · 自发破缺"
          variant="subtitle"
          italic
          delay={0.3}
        />
        {/* axes */}
        <line x1={-140} y1={80} x2={140} y2={80} stroke="var(--hw-ink)" strokeWidth={0.9} />
        <line x1={0} y1={-100} x2={0} y2={80} stroke="var(--hw-ink)" strokeWidth={0.9} />
        {/* Mexican hat V(φ) = -μ²|φ|² + λ|φ|⁴ profile */}
        <InkPath
          d={buildMexicanHat()}
          stroke="var(--hw-gold)"
          strokeWidth={1.6}
          delay={0.4}
          filterLevel="wobble-tiny"
        />
        {/* minimum dots at ±v */}
        <circle cx={-65} cy={32} r={5} fill="var(--hw-red)" />
        <circle cx={65} cy={32} r={5} fill="var(--hw-red)" />
        <HandwrittenLabel
          x={-65}
          y={52}
          text="−v"
          variant="label-minor"
          italic
          color="var(--hw-red)"
        />
        <HandwrittenLabel
          x={65}
          y={52}
          text="+v"
          variant="label-minor"
          italic
          color="var(--hw-red)"
        />
        <text
          x={144}
          y={86}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          |φ|
        </text>
        <text
          x={-22}
          y={-94}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          V
        </text>
        <HandwrittenLabel
          x={0}
          y={120}
          text="⟨φ⟩ = v / √2 ≈ 174 GeV"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      {/* RIGHT — three Feynman vertices */}
      <g transform="translate(220 60)">
        <HandwrittenLabel
          x={0}
          y={-160}
          text="Feynman 顶点"
          variant="subtitle"
          italic
          delay={0.3}
        />
        {/* QED vertex e–γ–e */}
        <g transform="translate(0 -70)">
          <InkPath
            d="M -60 -30 L 0 0 L 60 -30"
            stroke="var(--hw-blue)"
            strokeWidth={1.4}
            delay={0.4}
          />
          <path
            d="M 0 0 q 8 8 16 0 q 8 -8 16 0 q 8 8 16 0"
            fill="none"
            stroke="var(--hw-gold)"
            strokeWidth={1.2}
            transform="translate(0 8)"
          />
          <HandwrittenLabel
            x={-80}
            y={-26}
            text="e⁻"
            variant="caption"
            italic
            color="var(--hw-blue)"
          />
          <HandwrittenLabel
            x={80}
            y={-26}
            text="e⁻"
            variant="caption"
            italic
            color="var(--hw-blue)"
          />
          <HandwrittenLabel
            x={70}
            y={18}
            text="γ"
            variant="caption"
            italic
            color="var(--hw-gold)"
          />
        </g>
        {/* QCD vertex q–g–q */}
        <g transform="translate(0 30)">
          <InkPath
            d="M -60 -20 L 0 0 L 60 -20"
            stroke="var(--hw-red)"
            strokeWidth={1.4}
            delay={0.5}
          />
          <path
            d="M 0 0 q -6 12 6 16 q 12 4 6 16 q -6 12 6 16"
            fill="none"
            stroke="var(--hw-gold)"
            strokeWidth={1.2}
          />
          <HandwrittenLabel
            x={-80}
            y={-16}
            text="q"
            variant="caption"
            italic
            color="var(--hw-red)"
          />
          <HandwrittenLabel
            x={80}
            y={-16}
            text="q"
            variant="caption"
            italic
            color="var(--hw-red)"
          />
          <HandwrittenLabel
            x={28}
            y={56}
            text="g"
            variant="caption"
            italic
            color="var(--hw-gold)"
          />
        </g>
        {/* Weak vertex ν–W–e */}
        <g transform="translate(0 130)">
          <InkPath
            d="M -60 -20 L 0 0 L 60 -20"
            stroke="var(--hw-ink)"
            strokeWidth={1.4}
            delay={0.6}
          />
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={42}
            stroke="var(--hw-blue)"
            strokeWidth={1.4}
            strokeDasharray="3 3"
          />
          <HandwrittenLabel
            x={-80}
            y={-16}
            text="νₑ"
            variant="caption"
            italic
            color="var(--hw-ink)"
          />
          <HandwrittenLabel
            x={80}
            y={-16}
            text="e⁻"
            variant="caption"
            italic
            color="var(--hw-ink)"
          />
          <HandwrittenLabel
            x={20}
            y={36}
            text="W"
            variant="caption"
            italic
            color="var(--hw-blue)"
          />
        </g>
      </g>

      {/* Bottom — gauge group cartouche */}
      <g transform="translate(0 280)">
        <rect
          x={-300}
          y={-32}
          width={600}
          height={66}
          fill="var(--hw-bg-edge)"
          opacity={0.55}
          stroke="var(--hw-ink)"
          strokeWidth={0.8}
          filter="url(#hw-wobble-tiny)"
        />
        <HandwrittenLabel
          x={-200}
          y={0}
          text="SU(3) · 8 胶子"
          variant="label-major"
          italic
          color="var(--hw-red)"
        />
        <HandwrittenLabel
          x={-30}
          y={0}
          text="SU(2)_L · W±, W₀"
          variant="label-major"
          italic
          color="var(--hw-blue)"
        />
        <HandwrittenLabel
          x={170}
          y={0}
          text="U(1)_Y · B"
          variant="label-major"
          italic
          color="var(--hw-gold)"
        />
        <HandwrittenLabel
          x={0}
          y={26}
          text="Higgs 机制 · SU(2)×U(1) → U(1)_em · W₀ B → Z γ"
          variant="caption"
          color="var(--hw-ink-soft)"
        />
      </g>
    </g>
  );
}

function buildMexicanHat(): string {
  const samples = 80;
  const xLeft = -140;
  const xRight = 140;
  const yBase = 80;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = xLeft + (xRight - xLeft) * t;
    const u = (x / 80) * 1.0;
    const v = 0.6 * (u * u * u * u - u * u);
    const y = yBase - v * 140;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
