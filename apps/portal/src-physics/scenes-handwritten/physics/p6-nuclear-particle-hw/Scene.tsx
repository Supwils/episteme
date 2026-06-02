"use client";

import { getPhysicsContent } from "@/content/universe-physics/physics";
import { Cartouche } from "@/src-physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/src-physics/scenes-handwritten/shared/HandwrittenLabel";
import { HandwrittenMarker } from "@/src-physics/scenes-handwritten/shared/HandwrittenMarker";
import { InkPath } from "@/src-physics/scenes-handwritten/shared/InkPath";
import { PaperGrid } from "@/src-physics/scenes-handwritten/shared/PaperGrid";

/**
 * P6 · Nuclear & Particle. Two pages:
 *   page 0 — Nucleus (binding curve + α/β/γ decay + fusion/fission)
 *   page 1 — Particle (proton quark portrait + color confinement +
 *            collider energy ladder)
 */
export function P6HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P6");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P6PageNucleus /> : null}
      {page === 1 ? <P6PageParticle /> : null}

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
            variant="diamond"
            delay={1.2 + i * 0.08}
          />
        );
      })}

      <Cartouche
        cx={0}
        cy={-460}
        title="Nuclear & Particle"
        subtitle={page === 0 ? "核与粒子 · I · 核结构 / 衰变" : "核与粒子 · II · 夸克 / 色禁闭"}
      />
    </g>
  );
}

function P6PageNucleus() {
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

function P6PageParticle() {
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

function buildBindingCurve(): string {
  const raw: Array<[number, number]> = [
    [1, 0.0],
    [2, 1.112],
    [3, 2.827],
    [4, 7.074],
    [6, 5.332],
    [8, 7.062],
    [9, 6.462],
    [10, 6.475],
    [11, 6.928],
    [12, 7.68],
    [14, 7.476],
    [16, 7.976],
    [20, 8.032],
    [24, 8.261],
    [28, 8.448],
    [32, 8.493],
    [40, 8.551],
    [48, 8.667],
    [56, 8.79],
    [62, 8.795],
    [70, 8.764],
    [80, 8.73],
    [90, 8.71],
    [100, 8.68],
    [120, 8.59],
    [150, 8.49],
    [180, 8.32],
    [200, 8.07],
    [208, 7.867],
    [232, 7.615],
    [238, 7.57],
  ];
  const data = raw as [number, number][];
  const xLeft = -140;
  const xRight = 140;
  const yBase = 80;
  const aMin = 1;
  const aMax = 238;
  const beMax = 9;
  const samples = 80;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const A = aMin + t * (aMax - aMin);
    let be = 0;
    if (A <= data[0]![0]) {
      be = data[0]![1];
    } else if (A >= data[data.length - 1]![0]) {
      be = data[data.length - 1]![1];
    } else {
      let lo = 0;
      for (let j = 0; j < data.length - 1; j++) {
        if (data[j]![0] <= A && data[j + 1]![0] >= A) {
          lo = j;
          break;
        }
      }
      const [a0, be0] = data[lo]!;
      const [a1, be1] = data[lo + 1]!;
      const s = (A - a0) / (a1 - a0);
      const s2 = s * s;
      const s3 = s2 * s;
      const h00 = 2 * s3 - 3 * s2 + 1;
      const h10 = s3 - 2 * s2 + s;
      const h01 = -2 * s3 + 3 * s2;
      const h11 = s3 - s2;
      const tangentScale = 0.5;
      let m0: number, m1: number;
      if (lo === 0) {
        m0 = (be1 - be0) / (a1 - a0);
      } else {
        m0 = (tangentScale * (be1 - data[lo - 1]![1])) / (a1 - data[lo - 1]![0]);
      }
      if (lo === data.length - 2) {
        m1 = (be1 - be0) / (a1 - a0);
      } else {
        m1 = (tangentScale * (data[lo + 2]![1] - be0)) / (data[lo + 2]![0] - a0);
      }
      be = h00 * be0 + h10 * m0 * (a1 - a0) + h01 * be1 + h11 * m1 * (a1 - a0);
    }
    const x = xLeft + (xRight - xLeft) * t;
    const y = yBase - (be / beMax) * 130;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

function buildAlphaSCurve(): string {
  const mZ = 91.1876;
  const alphaSMZ = 0.1179;
  const thresholds = [
    { qMax: 1.5, nf: 3 },
    { qMax: 4.5, nf: 4 },
    { qMax: 160, nf: 5 },
    { qMax: Infinity, nf: 6 },
  ];
  function beta0(nf: number): number {
    return 11 - (2 * nf) / 3;
  }
  function alphaS(Q: number): number {
    if (Q <= 0) return 1;
    if (Math.abs(Q - mZ) < 1e-6) return alphaSMZ;
    const nf = thresholds.find((t) => Q <= t.qMax)!.nf;
    const b0 = beta0(nf);
    const denom = 1 + ((alphaSMZ * b0) / (2 * Math.PI)) * Math.log(Q / mZ);
    if (denom <= 0) return 1;
    return alphaSMZ / denom;
  }
  const QMin = 0.5;
  const QMax = 200;
  const samples = 80;
  const xLeft = -130;
  const xRight = 130;
  const yBase = 80;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const Q = QMin * Math.exp(t * Math.log(QMax / QMin));
    const alpha = alphaS(Q);
    const x = xLeft + (xRight - xLeft) * t;
    const y = yBase - alpha * 110;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
