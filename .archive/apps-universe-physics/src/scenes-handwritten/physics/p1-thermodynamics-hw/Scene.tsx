"use client";

import { getPhysicsContent } from "@/content/physics";
import { Cartouche } from "@/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/scenes-handwritten/shared/HandwrittenLabel";
import { HandwrittenMarker } from "@/scenes-handwritten/shared/HandwrittenMarker";
import { InkPath } from "@/scenes-handwritten/shared/InkPath";
import { PaperGrid } from "@/scenes-handwritten/shared/PaperGrid";
import { P1PageLaws } from "./P1PageLaws";

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
