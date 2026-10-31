"use client";

import { getPhysicsContent } from "@/subjects/physics/lib/tier-content";
import { Cartouche } from "@/subjects/physics/scenes-handwritten/shared/Cartouche";
import { HandwrittenLabel } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenLabel";
import { HandwrittenMarker } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenMarker";
import { InkPath } from "@/subjects/physics/scenes-handwritten/shared/InkPath";
import { PaperGrid } from "@/subjects/physics/scenes-handwritten/shared/PaperGrid";
import { buildChirp } from "./curves";

/**
 * P3 · Relativity. Two pages:
 *   page 0 — Special / Minkowski diagram + Lorentz boost
 *   page 1 — General / light cone curvature + Einstein field
 */
export function P3HwScene({ page = 0 }: { page?: number }) {
  const content = getPhysicsContent("P3");
  const markers = content?.markers ?? [];

  return (
    <g>
      <PaperGrid excludeInnerRadius={320} />

      {page === 0 ? <P3PageSpecial /> : null}
      {page === 1 ? <P3PageGeneral /> : null}

      {markers.slice(0, 6).map((m, i) => {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const ringR = 420;
        const variantByIndex: Array<
          "vector" | "orbit" | "diamond" | "halo" | "starpoint" | "wave"
        > = ["vector", "orbit", "wave", "diamond", "halo", "starpoint"];
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
        title="Relativity"
        subtitle={page === 0 ? "相对论 · I · 狭义 / Minkowski" : "相对论 · II · 广义 / 时空曲率"}
      />
    </g>
  );
}

function P3PageSpecial() {
  return (
    <g>
      <g transform="translate(0 -240)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic", fontFamily: '"KaTeX_Main", serif' }}
        >
          ds² = −c²dt² + dx²
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          一个空间维度的截面 · 时空间隔不变
        </text>
      </g>

      {/* LEFT — Minkowski diagram with light cone and worldlines */}
      <g transform="translate(-220 60)">
        <HandwrittenLabel
          x={0}
          y={-160}
          text="Minkowski 时空图"
          variant="subtitle"
          italic
          delay={0.3}
        />
        {/* axes */}
        <line x1={0} y1={-140} x2={0} y2={140} stroke="var(--hw-ink)" strokeWidth={1.0} />
        <line x1={-140} y1={0} x2={140} y2={0} stroke="var(--hw-ink)" strokeWidth={1.0} />
        {/* light cone (45°) */}
        <line x1={-130} y1={130} x2={130} y2={-130} stroke="var(--hw-gold)" strokeWidth={1.4} />
        <line x1={-130} y1={-130} x2={130} y2={130} stroke="var(--hw-gold)" strokeWidth={1.4} />
        {/* The observer moves at v = 0.5c; this is not a Euclidean rotation. */}
        <line
          x1={-70}
          y1={140}
          x2={70}
          y2={-140}
          stroke="var(--hw-blue)"
          strokeWidth={1.4}
          strokeDasharray="4 6"
        />
        {/* light cone fill (hint) */}
        <path d="M 0 0 L -130 -130 L 130 -130 Z" fill="var(--hw-wash-warm)" opacity={0.35} />
        <path d="M 0 0 L -130 130 L 130 130 Z" fill="var(--hw-wash-warm)" opacity={0.2} />
        <text
          x={8}
          y={-142}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          ct
        </text>
        <text
          x={146}
          y={4}
          className="hw-label-major"
          fill="var(--hw-ink-soft)"
          style={{ fontStyle: "italic" }}
        >
          x
        </text>
        <HandwrittenLabel
          x={75}
          y={-80}
          text="光锥"
          variant="label-minor"
          italic
          color="var(--hw-gold)"
          delay={0.9}
        />
        <HandwrittenLabel
          x={-60}
          y={90}
          text="世界线 · v = 0.5c"
          variant="label-minor"
          italic
          color="var(--hw-blue)"
          delay={1.0}
        />
      </g>

      {/* RIGHT — Lorentz boost block */}
      <g transform="translate(220 60)">
        <HandwrittenLabel
          x={0}
          y={-160}
          text="Lorentz boost"
          variant="subtitle"
          italic
          delay={0.3}
        />
        <rect
          x={-160}
          y={-100}
          width={320}
          height={200}
          fill="var(--hw-bg-edge)"
          opacity={0.55}
          stroke="var(--hw-ink)"
          strokeWidth={0.8}
          filter="url(#hw-wobble-tiny)"
        />
        <text
          x={0}
          y={-60}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic", fontFamily: '"KaTeX_Main", serif' }}
        >
          {"t' = γ(t − vx/c²)"}
        </text>
        <text
          x={0}
          y={-20}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic", fontFamily: '"KaTeX_Main", serif' }}
        >
          {"x' = γ(x − vt)"}
        </text>
        <text
          x={0}
          y={20}
          textAnchor="middle"
          className="hw-label-major"
          fill="var(--hw-gold)"
          style={{ fontStyle: "italic", fontFamily: '"KaTeX_Main", serif' }}
        >
          E² = (pc)² + (mc²)²
        </text>
        <text
          x={0}
          y={60}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          γ = 1 / √(1 − v²/c²)
        </text>
        <HandwrittenLabel
          x={0}
          y={130}
          text="时间膨胀 · 长度收缩 · 静止能量 mc²"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>
    </g>
  );
}

function P3PageGeneral() {
  return (
    <g>
      <g transform="translate(0 -240)">
        <text
          x={0}
          y={0}
          textAnchor="middle"
          className="hw-label-title"
          fill="var(--hw-ink)"
          style={{ fontStyle: "italic", fontFamily: '"KaTeX_Main", serif' }}
        >
          G
          <tspan baselineShift="sub" fontSize="65%">
            μν
          </tspan>
          {" = 8πG/c⁴ · T"}
          <tspan baselineShift="sub" fontSize="65%">
            μν
          </tspan>
        </text>
        <text
          x={0}
          y={32}
          textAnchor="middle"
          className="hw-label-caption"
          fill="var(--hw-ink-soft)"
        >
          Einstein 场方程 · 此处省略宇宙学常数项
        </text>
      </g>

      {/* LEFT — curved spacetime well */}
      <g transform="translate(-220 80)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="弯曲时空 · 测地线"
          variant="subtitle"
          italic
          delay={0.3}
        />
        {/* rubber-sheet grid (curved at the centre) */}
        {Array.from({ length: 7 }).map((_, i) => {
          const y = -80 + i * 26;
          // sag near centre, none at edges
          const sag = (x: number) => Math.exp(-(x * x) / 4200) * 40;
          const pts: string[] = [];
          for (let j = 0; j <= 12; j++) {
            const x = -150 + j * 25;
            const yy = y + sag(x);
            pts.push(`${j === 0 ? "M" : "L"} ${x} ${yy.toFixed(1)}`);
          }
          return (
            <path
              key={i}
              d={pts.join(" ")}
              fill="none"
              stroke="var(--hw-ink-soft)"
              strokeWidth={0.7}
              opacity={0.6}
            />
          );
        })}
        {/* central mass */}
        <circle
          cx={0}
          cy={60}
          r={16}
          fill="var(--hw-gold)"
          stroke="var(--hw-ink)"
          strokeWidth={0.9}
        />
        {/* orbiting satellite */}
        <ellipse
          cx={0}
          cy={20}
          rx={110}
          ry={26}
          fill="none"
          stroke="var(--hw-blue)"
          strokeWidth={1.0}
          filter="url(#hw-wobble-tiny)"
        />
        <circle cx={108} cy={20} r={5} fill="var(--hw-blue)" />
        <HandwrittenLabel
          x={0}
          y={-110}
          text="曲率的类比图 · 完整时空为四维"
          variant="label-minor"
          italic
          color="var(--hw-ink-soft)"
          delay={1.0}
        />
      </g>

      {/* RIGHT — Schwarzschild + gravitational waves */}
      <g transform="translate(220 80)">
        <HandwrittenLabel
          x={0}
          y={-150}
          text="黑洞 · 引力波"
          variant="subtitle"
          italic
          delay={0.3}
        />
        {/* Coordinate schematic; the circle is not an EHT emission ring. */}
        <circle
          cx={0}
          cy={-40}
          r={48}
          fill="var(--hw-bg-edge)"
          stroke="var(--hw-ink)"
          strokeWidth={1.0}
        />
        <line x1={0} y1={-40} x2={48} y2={-40} stroke="var(--hw-gold)" strokeWidth={1.4} />
        <text
          x={0}
          y={-115}
          textAnchor="middle"
          className="hw-label-minor"
          fill="var(--hw-gold)"
          style={{ fontStyle: "italic", fontFamily: '"KaTeX_Main", serif' }}
        >
          r
          <tspan baselineShift="sub" fontSize="65%">
            s
          </tspan>
          {" = 2GM / c²"}
        </text>
        <HandwrittenLabel
          x={0}
          y={24}
          text="无自旋、无电荷 · 视界坐标示意"
          variant="label-minor"
          color="var(--hw-ink-soft)"
          delay={0.7}
        />
        {/* GW chirp */}
        <InkPath
          d={buildChirp(-130, 130, 80)}
          stroke="var(--hw-blue)"
          strokeWidth={1.4}
          delay={0.6}
          filterLevel="wobble-tiny"
        />
        <HandwrittenLabel
          x={0}
          y={152}
          text="波形示意 · 非观测数据"
          variant="label-minor"
          italic
          color="var(--hw-blue)"
          delay={1.0}
        />
      </g>
    </g>
  );
}
