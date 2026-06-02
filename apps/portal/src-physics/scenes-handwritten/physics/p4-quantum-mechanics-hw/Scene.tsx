"use client";

import { getPhysicsContent } from "@/src-physics/content/physics";
import { Cartouche } from "@/src-physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/src-physics/scenes-handwritten/shared/HandwrittenLabel";
import { HandwrittenMarker } from "@/src-physics/scenes-handwritten/shared/HandwrittenMarker";
import { InkPath } from "@/src-physics/scenes-handwritten/shared/InkPath";
import { PaperGrid } from "@/src-physics/scenes-handwritten/shared/PaperGrid";

/**
 * P4 · Quantum Mechanics. Two pages:
 *   page 0 — Wave-particle (double-slit + potential well + ψ²)
 *   page 1 — Schrödinger + Bloch (state vector, qubit, uncertainty)
 */
export function P4HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P4");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P4PageWaveParticle /> : null}
      {page === 1 ? <P4PageState /> : null}

      {markers.slice(0, 6).map((m, i) => {
        const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
        const ringR = 420;
        const variantByIndex: Array<
          "wave" | "orbit" | "vector" | "diamond" | "halo" | "starpoint"
        > = ["wave", "halo", "orbit", "diamond", "wave", "starpoint"];
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
        title="Quantum Mechanics"
        subtitle={page === 0 ? "量子 · I · 波粒二象性" : "量子 · II · 状态 / 不确定"}
      />
    </g>
  );
}

function P4PageWaveParticle() {
  return (
    <g>
      {/* LEFT — double-slit, larger */}
      <g transform="translate(-220 -10)">
        <HandwrittenLabel
          x={0}
          y={-180}
          text="Double-slit · 双缝干涉"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <line x1={-100} y1={-130} x2={-100} y2={-25} stroke="var(--hw-ink)" strokeWidth={1.6} />
        <line x1={-100} y1={-12} x2={-100} y2={12} stroke="var(--hw-ink)" strokeWidth={1.6} />
        <line x1={-100} y1={25} x2={-100} y2={130} stroke="var(--hw-ink)" strokeWidth={1.6} />
        {/* incoming plane wave */}
        <InkPath
          d="M -220 -40 q 25 -12 50 0 q 25 12 50 0 q 25 -12 50 0"
          stroke="var(--hw-blue)"
          strokeWidth={1.4}
          delay={0.4}
        />
        <InkPath
          d="M -220 40 q 25 -12 50 0 q 25 12 50 0 q 25 -12 50 0"
          stroke="var(--hw-blue)"
          strokeWidth={1.4}
          delay={0.5}
        />
        {/* expanding wavefronts from each slit */}
        {[26, 48, 72, 98, 124].map((r, i) => (
          <g key={r}>
            <path
              d={`M ${-100 + r * 0.6} -7 a ${r} ${r * 0.95} 0 0 1 0 14`}
              fill="none"
              stroke="var(--hw-gold)"
              strokeWidth={0.8}
              opacity={0.65 - i * 0.1}
            />
            <path
              d={`M ${-100 + r * 0.6} -105 a ${r} ${r * 0.95} 0 0 1 0 14`}
              fill="none"
              stroke="var(--hw-gold)"
              strokeWidth={0.8}
              opacity={0.65 - i * 0.1}
            />
            <path
              d={`M ${-100 + r * 0.6} 91 a ${r} ${r * 0.95} 0 0 1 0 14`}
              fill="none"
              stroke="var(--hw-gold)"
              strokeWidth={0.8}
              opacity={0.65 - i * 0.1}
            />
          </g>
        ))}
        {/* screen + fringes */}
        <line x1={60} y1={-140} x2={60} y2={140} stroke="var(--hw-ink)" strokeWidth={1.2} />
        {Array.from({ length: 11 }).map((_, i) => {
          const t = (i - 5) / 5;
          const intensity = Math.cos(t * Math.PI * 2.4) ** 2;
          return (
            <line
              key={i}
              x1={66}
              y1={i * 26 - 130}
              x2={66 + intensity * 46}
              y2={i * 26 - 130}
              stroke="var(--hw-gold)"
              strokeWidth={1.8}
              opacity={0.3 + intensity * 0.7}
            />
          );
        })}
        <HandwrittenLabel
          x={80}
          y={170}
          text="|ψ|² 干涉条纹"
          variant="label-minor"
          italic
          color="var(--hw-gold)"
          delay={1.0}
        />
      </g>

      {/* RIGHT — potential well + bound-state ψ */}
      <g transform="translate(220 -10)">
        <HandwrittenLabel
          x={0}
          y={-180}
          text="束缚态 · Energy ladder"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <line x1={-100} y1={120} x2={100} y2={120} stroke="var(--hw-ink)" strokeWidth={1.0} />
        <line x1={-100} y1={-140} x2={-100} y2={120} stroke="var(--hw-ink)" strokeWidth={1.0} />
        <InkPath
          d="M -100 120 L -100 -130 L 100 -130 L 100 120"
          stroke="var(--hw-blue)"
          strokeWidth={1.6}
          delay={0.5}
        />
        {[
          { y: 80, label: "n=1" },
          { y: 30, label: "n=2" },
          { y: -20, label: "n=3" },
          { y: -70, label: "n=4" },
          { y: -110, label: "n=5" },
        ].map((lvl, i) => (
          <g key={lvl.label}>
            <line
              x1={-90}
              y1={lvl.y}
              x2={90}
              y2={lvl.y}
              stroke="var(--hw-gold)"
              strokeWidth={1.4}
              opacity={0.9 - i * 0.1}
            />
            <text x={108} y={lvl.y + 5} className="hw-label-caption" fill="var(--hw-gold)">
              {lvl.label}
            </text>
          </g>
        ))}
        {/* sample ψ on n=1 */}
        <InkPath
          d="M -88 80 q 44 -42 88 0"
          stroke="var(--hw-red)"
          strokeWidth={1.2}
          opacity={0.8}
          delay={0.9}
        />
        <text
          x={-120}
          y={-130}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          V(x)
        </text>
        <text
          x={104}
          y={130}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          x
        </text>
        <HandwrittenLabel
          x={0}
          y={170}
          text="离散能级 · E_n = ℏ²π²n² / (2mL²)"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      {/* Top cartouche */}
      <g transform="translate(0 -290)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          λ = h / p
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          de Broglie · 物质波
        </text>
      </g>
    </g>
  );
}

function P4PageState() {
  return (
    <g>
      {/* Top — Schrödinger cartouche */}
      <g transform="translate(0 -240)">
        <rect
          x={-260}
          y={-46}
          width={520}
          height={92}
          fill="var(--hw-bg-edge)"
          opacity={0.55}
          stroke="var(--hw-ink)"
          strokeWidth={0.8}
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
          iℏ ∂ψ/∂t = Ĥψ
        </text>
        <text
          x={0}
          y={36}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          Schrödinger · 1926
        </text>
      </g>

      {/* LEFT — uncertainty inequality */}
      <g transform="translate(-220 60)">
        <HandwrittenLabel x={0} y={-120} text="Heisenberg" variant="subtitle" italic delay={0.3} />
        <text
          x={0}
          y={-70}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-blue)"
          style={{ fontStyle: "italic" }}
        >
          Δx · Δp ≥ ℏ/2
        </text>
        {/* Gaussian width sketch */}
        <InkPath
          d="M -120 60 q 60 -90 120 0"
          stroke="var(--hw-gold)"
          strokeWidth={1.6}
          delay={0.5}
        />
        <line x1={-120} y1={60} x2={120} y2={60} stroke="var(--hw-ink-soft)" strokeWidth={0.8} />
        <line x1={-40} y1={55} x2={-40} y2={65} stroke="var(--hw-ink)" strokeWidth={1.0} />
        <line x1={40} y1={55} x2={40} y2={65} stroke="var(--hw-ink)" strokeWidth={1.0} />
        <HandwrittenLabel
          x={0}
          y={88}
          text="Δx"
          variant="label-major"
          italic
          color="var(--hw-ink)"
          delay={0.8}
        />
        <HandwrittenLabel
          x={0}
          y={114}
          text="位置确定 ↔ 动量发散"
          variant="caption"
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      {/* RIGHT — Bloch sphere larger */}
      <g transform="translate(220 60)">
        <HandwrittenLabel
          x={0}
          y={-120}
          text="Bloch · qubit"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <circle
          cx={0}
          cy={0}
          r={110}
          fill="var(--hw-wash-cool)"
          opacity={0.5}
          stroke="var(--hw-ink)"
          strokeWidth={1.2}
          filter="url(#hw-wobble-tiny)"
        />
        <ellipse
          cx={0}
          cy={0}
          rx={110}
          ry={32}
          fill="none"
          stroke="var(--hw-ink-soft)"
          strokeWidth={0.7}
          strokeDasharray="2 4"
        />
        <line x1={0} y1={-140} x2={0} y2={140} stroke="var(--hw-ink)" strokeWidth={0.9} />
        <line x1={-140} y1={0} x2={140} y2={0} stroke="var(--hw-ink-soft)" strokeWidth={0.7} />
        <line x1={0} y1={0} x2={62} y2={-68} stroke="var(--hw-gold)" strokeWidth={1.8} />
        <circle cx={62} cy={-68} r={5} fill="var(--hw-gold)" />
        <text
          x={-6}
          y={-150}
          className="hw-label-subtitle"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          |0⟩
        </text>
        <text
          x={-6}
          y={170}
          className="hw-label-subtitle"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          |1⟩
        </text>
        <text x={72} y={-72} className="hw-label-caption" fill="var(--hw-gold)">
          ψ
        </text>
        <HandwrittenLabel x={0} y={170} text="" variant="caption" color="var(--hw-ink-soft)" />
      </g>

      {/* Bottom — bra-ket footnote */}
      <g transform="translate(0 290)">
        <rect
          x={-260}
          y={-30}
          width={520}
          height={64}
          fill="var(--hw-bg-edge)"
          opacity={0.5}
          stroke="var(--hw-ink-soft)"
          strokeWidth={0.7}
          filter="url(#hw-wobble-tiny)"
        />
        <HandwrittenLabel
          x={-140}
          y={-2}
          text="|ψ⟩ ∈ ℋ"
          variant="label-major"
          italic
          color="var(--hw-ink)"
        />
        <HandwrittenLabel
          x={140}
          y={-2}
          text="⟨φ|ψ⟩ = 概率振幅"
          variant="label-major"
          italic
          color="var(--hw-ink)"
        />
        <HandwrittenLabel
          x={0}
          y={26}
          text="Dirac · 1939 · 数学结构清晰直接"
          variant="caption"
          color="var(--hw-ink-soft)"
        />
      </g>
    </g>
  );
}
