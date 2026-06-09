"use client";

import { getPhysicsContent } from "@/content/physics";
import { Cartouche } from "@/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/scenes-handwritten/shared/HandwrittenLabel";
import { HandwrittenMarker } from "@/scenes-handwritten/shared/HandwrittenMarker";
import { InkPath } from "@/scenes-handwritten/shared/InkPath";
import { PaperGrid } from "@/scenes-handwritten/shared/PaperGrid";

/**
 * P7 · Standard Model. Two pages:
 *   page 0 — Particle zoo (3 fermion generations × 4 rows + bosons + H)
 *   page 1 — Gauge structure: Higgs Mexican-hat potential + Feynman
 *            vertices + SU(3) × SU(2) × U(1) cartouche
 */
export function P7HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P7");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={350} />

      {page === 0 ? <P7PageZoo /> : null}
      {page === 1 ? <P7PageGauge /> : null}

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
        title="Standard Model"
        subtitle={page === 0 ? "标准模型 · I · 粒子表" : "标准模型 · II · 规范 / Higgs"}
      />
    </g>
  );
}

function P7PageZoo() {
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
          17 粒子
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          12 费米子 + 4 规范玻色子 + 1 Higgs
        </text>
      </g>

      <g transform="translate(0 30)">
        <PartTable />
      </g>

      <g transform="translate(0 270)">
        <HandwrittenLabel
          x={0}
          y={4}
          text="为什么是 3 代？质量比为什么这么悬殊？·  SM 未答之谜"
          variant="caption"
          color="var(--hw-ink-soft)"
        />
      </g>
    </g>
  );
}

function P7PageGauge() {
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

function PartTable() {
  type Cell = { label: string; color: string };
  const grid: Cell[][] = [
    [
      { label: "u", color: "var(--hw-gold)" },
      { label: "c", color: "var(--hw-gold)" },
      { label: "t", color: "var(--hw-gold)" },
      { label: "g", color: "var(--hw-red)" },
    ],
    [
      { label: "d", color: "var(--hw-gold)" },
      { label: "s", color: "var(--hw-gold)" },
      { label: "b", color: "var(--hw-gold)" },
      { label: "γ", color: "var(--hw-blue)" },
    ],
    [
      { label: "e", color: "var(--hw-blue)" },
      { label: "μ", color: "var(--hw-blue)" },
      { label: "τ", color: "var(--hw-blue)" },
      { label: "W±", color: "var(--hw-red)" },
    ],
    [
      { label: "νₑ", color: "var(--hw-blue)" },
      { label: "νμ", color: "var(--hw-blue)" },
      { label: "ντ", color: "var(--hw-blue)" },
      { label: "Z⁰", color: "var(--hw-red)" },
    ],
  ];
  const cellW = 100;
  const cellH = 70;
  const cols = grid[0]!.length;
  const rows = grid.length;
  const totalW = cellW * cols;
  const totalH = cellH * rows;
  const x0 = -totalW / 2;
  const y0 = -totalH / 2;
  return (
    <g>
      {["I", "II", "III", "Bosons"].map((h, i) => (
        <text
          key={h}
          x={x0 + (i + 0.5) * cellW}
          y={y0 - 16}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          {h}
        </text>
      ))}
      {["u-quark", "d-quark", "lepton", "neutrino"].map((h, i) => (
        <text
          key={h}
          x={x0 - 18}
          y={y0 + (i + 0.5) * cellH + 4}
          textAnchor="end"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          {h}
        </text>
      ))}
      {grid.flatMap((row, r) =>
        row.map((cell, c) => {
          const cx = x0 + c * cellW;
          const cy = y0 + r * cellH;
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={cx + 4}
                y={cy + 4}
                width={cellW - 8}
                height={cellH - 8}
                fill="var(--hw-bg-edge)"
                opacity={0.55}
                stroke={cell.color}
                strokeWidth={1.2}
                filter="url(#hw-wobble-tiny)"
              />
              <text
                x={cx + cellW / 2}
                y={cy + cellH / 2 + 12}
                textAnchor="middle"
                className="hw-label-title"
                fill={cell.color}
                style={{ fontStyle: "italic" }}
              >
                {cell.label}
              </text>
            </g>
          );
        }),
      )}
      <g transform={`translate(${x0 + cols * cellW + 30}, ${y0 + totalH / 2 - cellH / 2})`}>
        <rect
          x={0}
          y={0}
          width={cellW - 8}
          height={cellH - 8}
          fill="var(--hw-wash-warm)"
          opacity={0.6}
          stroke="var(--hw-gold)"
          strokeWidth={1.6}
          filter="url(#hw-wobble-tiny)"
        />
        <text
          x={(cellW - 8) / 2}
          y={(cellH - 8) / 2 + 12}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-gold)"
          style={{ fontStyle: "italic" }}
        >
          H
        </text>
        <text
          x={(cellW - 8) / 2}
          y={cellH + 6}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-gold)"
        >
          125 GeV
        </text>
      </g>
    </g>
  );
}

function buildMexicanHat(): string {
  // V(x) = a(x⁴ − x²); use synthetic samples mapped to viewport
  const samples = 80;
  const xLeft = -140;
  const xRight = 140;
  const yBase = 80;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = xLeft + (xRight - xLeft) * t;
    const u = (x / 80) * 1.0; // normalize
    const v = 0.6 * (u * u * u * u - u * u);
    const y = yBase - v * 140;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
