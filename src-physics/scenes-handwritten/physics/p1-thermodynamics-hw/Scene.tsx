"use client";

import { getPhysicsContent } from "@/src-physics/lib/tier-content";
import { Cartouche } from "@/src-physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/src-physics/scenes-handwritten/shared/HandwrittenLabel";
import { HandwrittenMarker } from "@/src-physics/scenes-handwritten/shared/HandwrittenMarker";
import { InkPath } from "@/src-physics/scenes-handwritten/shared/InkPath";
import { PaperGrid } from "@/src-physics/scenes-handwritten/shared/PaperGrid";

/**
 * P1 · Thermodynamics / Stat-Mech. Two pages:
 *   page 0 — Maxwell-Boltzmann distribution + partition function Z
 *   page 1 — 4 laws + Carnot cycle + entropy arrow
 */
export function P1HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P1");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P1PageDistribution /> : null}
      {page === 1 ? <P1PageLaws /> : null}

      {markers.slice(0, 6).map((m, i) => {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const ringR = 420;
        const variantByIndex: Array<
          "vector" | "orbit" | "diamond" | "halo" | "starpoint" | "wave"
        > = ["halo", "diamond", "orbit", "starpoint", "vector", "wave"];
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
        title="Thermodynamics & Stat-Mech"
        subtitle={page === 0 ? "热力学 · I · 分布 / 配分函数" : "热力学 · II · 四定律 / 卡诺"}
      />
    </g>
  );
}

function P1PageDistribution() {
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
          S = k_B · ln W
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          Boltzmann · 熵即微观态数对数
        </text>
      </g>

      <g transform="translate(-220 80)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="Maxwell-Boltzmann · 速率分布"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <line x1={-130} y1={80} x2={130} y2={80} stroke="var(--hw-ink)" strokeWidth={0.9} />
        <line x1={-130} y1={-80} x2={-130} y2={80} stroke="var(--hw-ink)" strokeWidth={0.9} />
        <InkPath d={buildMBCurve(40, 60)} stroke="var(--hw-blue)" strokeWidth={1.4} delay={0.4} />
        <InkPath d={buildMBCurve(60, 95)} stroke="var(--hw-gold)" strokeWidth={1.6} delay={0.5} />
        <InkPath d={buildMBCurve(85, 130)} stroke="var(--hw-red)" strokeWidth={1.4} delay={0.6} />
        <HandwrittenLabel
          x={-50}
          y={-50}
          text="T 低"
          variant="label-minor"
          italic
          color="var(--hw-blue)"
          delay={0.9}
        />
        <HandwrittenLabel
          x={0}
          y={-30}
          text="T 中"
          variant="label-minor"
          italic
          color="var(--hw-gold)"
          delay={1.0}
        />
        <HandwrittenLabel
          x={60}
          y={-10}
          text="T 高"
          variant="label-minor"
          italic
          color="var(--hw-red)"
          delay={1.1}
        />
        <text
          x={140}
          y={86}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          v
        </text>
        <text
          x={-150}
          y={-78}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          f(v)
        </text>
        <HandwrittenLabel
          x={0}
          y={120}
          text="f(v) ∝ v² · e^(−mv²/2k_BT)"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.2}
        />
      </g>

      <g transform="translate(220 80)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="Partition · 配分函数"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <rect
          x={-150}
          y={-70}
          width={300}
          height={140}
          fill="var(--hw-bg-edge)"
          opacity={0.55}
          stroke="var(--hw-ink)"
          strokeWidth={0.8}
          filter="url(#hw-wobble-tiny)"
        />
        <text
          x={0}
          y={-30}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-gold)"
          style={{ fontStyle: "italic" }}
        >
          Z = Σ e^(−βE_i)
        </text>
        <text
          x={0}
          y={6}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic" }}
        >
          F = −k_B T · ln Z
        </text>
        <text
          x={0}
          y={42}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          所有热力学量从 ln Z 的导数读出
        </text>
        <HandwrittenLabel
          x={0}
          y={120}
          text="β = 1 / (k_B · T)"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>
    </g>
  );
}

function P1PageLaws() {
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

function buildMBCurve(vmode: number, vmax: number): string {
  const samples = 60;
  const xLeft = -130;
  const xRight = 130;
  const yBase = 80;
  const peakHeight = 130;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const v = t * vmax;
    const f = ((v * v) / (vmode * vmode)) * Math.exp(-(v * v) / (vmode * vmode));
    const x = xLeft + (xRight - xLeft) * t;
    const y = yBase - f * peakHeight;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
