"use client";

import { getPhysicsContent } from "@/src-physics/content/physics";
import { Cartouche } from "@/src-physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/src-physics/scenes-handwritten/shared/HandwrittenLabel";
import { HandwrittenMarker } from "@/src-physics/scenes-handwritten/shared/HandwrittenMarker";
import { InkPath } from "@/src-physics/scenes-handwritten/shared/InkPath";
import { PaperGrid } from "@/src-physics/scenes-handwritten/shared/PaperGrid";

/**
 * P5 · Atomic & Molecular. Two pages:
 *   page 0 — Single atom (Bohr levels, transitions, s/p/d orbitals)
 *   page 1 — Bond + periodicity (LCAO σ_g/σ_u, sp/sp²/sp³, periodic strip)
 */
export function P5HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P5");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P5PageAtom /> : null}
      {page === 1 ? <P5PageMolecule /> : null}

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
            variant="halo"
            delay={1.2 + i * 0.08}
          />
        );
      })}

      <Cartouche
        cx={0}
        cy={-460}
        title="Atomic & Molecular"
        subtitle={page === 0 ? "原子分子 · I · 单原子 / 能级" : "原子分子 · II · 化学键 / 周期律"}
      />
    </g>
  );
}

function P5PageAtom() {
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

function P5PageMolecule() {
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
          LCAO · ψ_mol = c₁ ψ_A + c₂ ψ_B
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          化学键 = 原子轨道线性组合
        </text>
      </g>

      {/* LEFT — H2 σ_g / σ_u (bonding + antibonding) */}
      <g transform="translate(-220 60)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="H₂ · σ 成键 / 反键"
          variant="subtitle"
          italic
          delay={0.3}
        />
        {/* bonding sigma_g */}
        <g transform="translate(0 -50)">
          <circle
            cx={-30}
            cy={0}
            r={22}
            fill="var(--hw-wash-warm)"
            stroke="var(--hw-gold)"
            strokeWidth={1.2}
          />
          <circle
            cx={30}
            cy={0}
            r={22}
            fill="var(--hw-wash-warm)"
            stroke="var(--hw-gold)"
            strokeWidth={1.2}
          />
          <path
            d="M -30 0 q 30 -20 60 0"
            fill="none"
            stroke="var(--hw-gold)"
            strokeWidth={1.4}
            filter="url(#hw-wobble-tiny)"
          />
          <HandwrittenLabel
            x={90}
            y={4}
            text="σ_g"
            variant="label-major"
            italic
            color="var(--hw-gold)"
          />
        </g>
        {/* antibonding sigma_u with node */}
        <g transform="translate(0 60)">
          <circle
            cx={-30}
            cy={0}
            r={22}
            fill="var(--hw-wash-cool)"
            stroke="var(--hw-blue)"
            strokeWidth={1.2}
          />
          <circle
            cx={30}
            cy={0}
            r={22}
            fill="var(--hw-wash-warm)"
            stroke="var(--hw-red)"
            strokeWidth={1.2}
          />
          <line
            x1={0}
            y1={-32}
            x2={0}
            y2={32}
            stroke="var(--hw-ink-soft)"
            strokeWidth={0.8}
            strokeDasharray="3 4"
          />
          <HandwrittenLabel
            x={90}
            y={4}
            text="σ_u*"
            variant="label-major"
            italic
            color="var(--hw-blue)"
          />
        </g>
        <HandwrittenLabel
          x={0}
          y={140}
          text="同号叠加 → 成键 · 异号 → 反键"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      {/* RIGHT — hybridization grid */}
      <g transform="translate(220 60)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="杂化 · sp / sp² / sp³"
          variant="subtitle"
          italic
          delay={0.3}
        />
        {[
          { x: -90, label: "sp", desc: "线性 · 180°", angles: [0, Math.PI] },
          {
            x: 0,
            label: "sp²",
            desc: "三角 · 120°",
            angles: [Math.PI / 2, (Math.PI * 7) / 6, (Math.PI * 11) / 6],
          },
          {
            x: 90,
            label: "sp³",
            desc: "四面体 · 109.5°",
            angles: [Math.PI / 4, (Math.PI * 3) / 4, (Math.PI * 5) / 4, (Math.PI * 7) / 4],
          },
        ].map((h) => (
          <g key={h.label} transform={`translate(${h.x} 0)`}>
            <circle cx={0} cy={0} r={5} fill="var(--hw-ink)" />
            {h.angles.map((a, i) => (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={Math.cos(a) * 32}
                y2={Math.sin(a) * 32}
                stroke="var(--hw-gold)"
                strokeWidth={1.3}
              />
            ))}
            <text
              x={0}
              y={56}
              textAnchor="middle"
              className="hw-label-major"
              fill="var(--hw-gold)"
              style={{ fontStyle: "italic" }}
            >
              {h.label}
            </text>
            <text
              x={0}
              y={76}
              textAnchor="middle"
              className="hw-label-caption"
              fill="var(--hw-ink-soft)"
            >
              {h.desc}
            </text>
          </g>
        ))}
        <HandwrittenLabel
          x={0}
          y={130}
          text="CH₄ · C₂H₄ · C₂H₂ 的几何根源"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      {/* Bottom — periodic-table strip with sub-shell capacity */}
      <g transform="translate(0 270)">
        <HandwrittenLabel
          x={0}
          y={-22}
          text="元素周期表 · 列宽 = 子壳容量"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
        />
        <InkPath
          d="M -260 0 L -180 0 M -170 0 L -50 0 M -40 0 L 50 0 M 60 0 L 200 0 M 210 0 L 260 0"
          stroke="var(--hw-gold)"
          strokeWidth={1.6}
        />
        {[
          { x: -220, label: "s · 2" },
          { x: -110, label: "p · 6" },
          { x: 5, label: "d · 10" },
          { x: 130, label: "f · 14" },
          { x: 235, label: "..." },
        ].map((seg) => (
          <text
            key={seg.label}
            x={seg.x}
            y={26}
            textAnchor="middle"
            className="hw-label-caption"
            fill="var(--hw-ink-soft)"
          >
            {seg.label}
          </text>
        ))}
      </g>
    </g>
  );
}
