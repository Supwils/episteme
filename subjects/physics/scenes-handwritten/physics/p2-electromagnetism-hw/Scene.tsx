"use client";

import { getPhysicsContent } from "@/subjects/physics/lib/tier-content";
import { Cartouche } from "@/subjects/physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenLabel";
import { HandwrittenMarker } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenMarker";
import { InkPath } from "@/subjects/physics/scenes-handwritten/shared/InkPath";
import { PaperGrid } from "@/subjects/physics/scenes-handwritten/shared/PaperGrid";

/**
 * P2 · Electromagnetism. Two pages:
 *   page 0 — Field portrait (E from a point charge + B around a wire +
 *            Maxwell equations cartouche)
 *   page 1 — Light as wave (same-phase transverse plane wave + c = 1/√(μ₀ε₀))
 */
export function P2HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P2");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P2PageMaxwell /> : null}
      {page === 1 ? <P2PageWave /> : null}

      {markers.slice(0, 6).map((m, i) => {
        const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
        const ringR = 420;
        const variantByIndex: Array<
          "vector" | "wave" | "orbit" | "diamond" | "halo" | "starpoint"
        > = ["vector", "wave", "diamond", "halo", "orbit", "starpoint"];
        return (
          <HandwrittenMarker
            key={m.id}
            marker={m}
            x={Math.cos(angle) * ringR}
            y={Math.sin(angle) * ringR}
            radius={9 + (m.size ?? 0.03) * 100}
            variant={variantByIndex[i] ?? "halo"}
            delay={1.2 + i * 0.08}
          />
        );
      })}

      <Cartouche
        cx={0}
        cy={-460}
        title="Electromagnetism"
        subtitle={page === 0 ? "电磁 · I · Maxwell 方程组" : "电磁 · II · 光与规范"}
      />
    </g>
  );
}

function P2PageMaxwell() {
  return (
    <g>
      {/* Maxwell equations cartouche — top */}
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
          x={-160}
          y={-4}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-ink)"
          style={{ fontFamily: "KaTeX_Main, serif", fontStyle: "normal" }}
        >
          ∇·E = ρ/ε₀
        </text>
        <text
          x={160}
          y={-4}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-ink)"
          style={{ fontFamily: "KaTeX_Main, serif", fontStyle: "normal" }}
        >
          ∇·B = 0
        </text>
        <text
          x={-160}
          y={32}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-ink)"
          style={{ fontFamily: "KaTeX_Main, serif", fontStyle: "normal" }}
        >
          ∇×E = −∂B/∂t
        </text>
        <text
          x={160}
          y={32}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-ink)"
          style={{ fontFamily: "KaTeX_Main, serif", fontStyle: "normal" }}
        >
          ∇×B = μ₀J + μ₀ε₀ ∂E/∂t
        </text>
      </g>

      <HandwrittenLabel
        x={0}
        y={-167}
        text="E、B形式：ρ 与 J 为总电荷、电流密度"
        variant="caption"
        color="var(--hw-ink-soft)"
      />

      {/* Left — point charge with radial E field */}
      <g transform="translate(-220 110)">
        <HandwrittenLabel
          x={0}
          y={-130}
          text="Coulomb · 电场"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <circle
          cx={0}
          cy={0}
          r={14}
          fill="var(--hw-red)"
          stroke="var(--hw-ink)"
          strokeWidth={0.9}
        />
        <text
          x={0}
          y={7}
          textAnchor="middle"
          fontFamily="KaTeX_Main, serif"
          fontSize={24}
          fill="var(--hw-bg)"
        >
          +
        </text>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const r0 = 22;
          const r1 = 100;
          const x1 = Math.cos(a) * r0;
          const y1 = Math.sin(a) * r0;
          const x2 = Math.cos(a) * r1;
          const y2 = Math.sin(a) * r1;
          const ax = Math.cos(a + Math.PI - 0.4) * 8;
          const ay = Math.sin(a + Math.PI - 0.4) * 8;
          const bx = Math.cos(a + Math.PI + 0.4) * 8;
          const by = Math.sin(a + Math.PI + 0.4) * 8;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--hw-gold)"
                strokeWidth={1.1}
                opacity={0.85}
              />
              <path
                d={`M ${x2} ${y2} L ${x2 + ax} ${y2 + ay} M ${x2} ${y2} L ${x2 + bx} ${y2 + by}`}
                stroke="var(--hw-gold)"
                strokeWidth={1.0}
                fill="none"
              />
            </g>
          );
        })}
        <HandwrittenLabel
          x={0}
          y={130}
          text="真空静止点电荷 · E ∝ 1/r²"
          variant="label-minor"
          color="var(--hw-ink-soft)"
          italic
          delay={1.0}
        />
      </g>

      {/* Right — current-carrying wire with B field loops (Ampère) */}
      <g transform="translate(220 110)">
        <HandwrittenLabel
          x={0}
          y={-130}
          text="Ampère · 磁场"
          variant="subtitle"
          italic
          delay={0.3}
        />
        {/* wire (out of page) */}
        <circle
          cx={0}
          cy={0}
          r={18}
          fill="var(--hw-bg-edge)"
          stroke="var(--hw-ink)"
          strokeWidth={1.0}
        />
        <circle cx={0} cy={0} r={4} fill="var(--hw-ink)" />
        {/* concentric B-field loops with arrows */}
        {[40, 65, 92].map((r, i) => (
          <g key={r}>
            <circle
              cx={0}
              cy={0}
              r={r}
              fill="none"
              stroke="var(--hw-blue)"
              strokeWidth={1.0}
              filter="url(#hw-wobble-tiny)"
              opacity={0.9 - i * 0.18}
            />
            <path
              d={`M ${r} 0 L ${r - 5} 8 M ${r} 0 L ${r + 5} 8`}
              stroke="var(--hw-blue)"
              strokeWidth={1.0}
              fill="none"
            />
            <path
              d={`M ${-r} 0 L ${-r - 5} -8 M ${-r} 0 L ${-r + 5} -8`}
              stroke="var(--hw-blue)"
              strokeWidth={1.0}
              fill="none"
            />
          </g>
        ))}
        <HandwrittenLabel
          x={36}
          y={-26}
          text="I"
          variant="label-major"
          italic
          color="var(--hw-ink)"
          delay={0.8}
        />
        <HandwrittenLabel
          x={0}
          y={130}
          text="长直稳恒电流 · B ∝ I/r"
          variant="label-minor"
          color="var(--hw-ink-soft)"
          italic
          delay={1.0}
        />
      </g>
    </g>
  );
}

function P2PageWave() {
  return (
    <g>
      {/* Top headline */}
      <g transform="translate(0 -230)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-ink)"
          style={{ fontFamily: "KaTeX_Main, serif", fontStyle: "normal" }}
        >
          c = 1 / √(μ₀ · ε₀)
        </text>
        <text
          x={0}
          y={34}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          真空无源区 · 平面行波 · E = cB
        </text>
      </g>

      {/* Plot transverse components on separate axes, using cB so their amplitudes can be compared. */}
      {[
        { label: "Eᵧ", y: -25, color: "var(--hw-red)" },
        { label: "cB𝓏", y: 130, color: "var(--hw-blue)" },
      ].map(({ label, y, color }, index) => (
        <g key={label} transform={`translate(0 ${y})`}>
          <line x1={-300} y1={0} x2={320} y2={0} stroke="var(--hw-ink-soft)" strokeWidth={0.7} />
          <path d="M 320 0 L 310 -5 M 320 0 L 310 5" stroke="var(--hw-ink-soft)" fill="none" />
          <HandwrittenLabel
            x={-340}
            y={5}
            text={label}
            variant="label-major"
            color={color}
            italic
          />
          <HandwrittenLabel
            x={338}
            y={5}
            text="x"
            variant="label-minor"
            color="var(--hw-ink-soft)"
            italic
          />
          <InkPath
            d={buildSineD(-300, 300, 60, 45)}
            stroke={color}
            strokeWidth={1.6}
            delay={0.4 + index * 0.2}
            filterLevel="wobble-tiny"
          />
        </g>
      ))}
      <HandwrittenLabel
        x={0}
        y={207}
        text="同一时刻的分量 · Eᵧ 与 cB𝓏 同相"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel
        x={0}
        y={230}
        text="真空平面行波 · E ⊥ B · E × B 沿 +x"
        variant="label-minor"
        color="var(--hw-ink-soft)"
      />

      {/* Gauge invariance footnote */}
      <g transform="translate(0 280)">
        <rect
          x={-280}
          y={-30}
          width={560}
          height={64}
          fill="var(--hw-bg-edge)"
          opacity={0.5}
          stroke="var(--hw-ink-soft)"
          strokeWidth={0.7}
          filter="url(#hw-wobble-tiny)"
        />
        <HandwrittenLabel
          x={-160}
          y={-2}
          text="A → A + ∇χ"
          variant="label-major"
          italic
          color="var(--hw-ink)"
        />
        <HandwrittenLabel
          x={160}
          y={-2}
          text="φ → φ − ∂χ/∂t"
          variant="label-major"
          italic
          color="var(--hw-ink)"
        />
        <HandwrittenLabel
          x={0}
          y={24}
          text="规范不变 · 物理可观测量保持一致"
          variant="caption"
          color="var(--hw-ink-soft)"
        />
      </g>
    </g>
  );
}

function buildSineD(x0: number, x1: number, period: number, amp: number): string {
  const samples = 80;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = x0 + (x1 - x0) * t;
    const phase = ((x / period) * Math.PI) % (Math.PI * 2);
    const v = Math.sin(phase) * amp;
    const y = -v;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
