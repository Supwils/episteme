import { HandwrittenLabel } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenLabel";
import { InkPath } from "@/subjects/physics/scenes-handwritten/shared/InkPath";
import { potentialMinima, potentialPath } from "./curves";

export function P7PageGauge() {
  return (
    <g>
      <HandwrittenLabel x={0} y={-245} text="SU(3)c × SU(2)L × U(1)Y" variant="title" italic />
      <HandwrittenLabel x={0} y={-212} text="电弱破缺：SU(2)L × U(1)Y → U(1)em" variant="caption" />
      <HiggsPotential />
      <VertexTable />
      <HandwrittenLabel x={180} y={170} text="W³与B混合成Z和光子γ" variant="caption" />
      <HandwrittenLabel
        x={180}
        y={193}
        text="图中外线示意场与电荷流"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel
        x={180}
        y={216}
        text="单个顶点不是一次完整反应"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}

function HiggsPotential() {
  return (
    <g transform="translate(-200 0)">
      <HandwrittenLabel x={0} y={-150} text="Higgs势的实方向截面" variant="subtitle" />
      <text
        x={0}
        y={-119}
        textAnchor="middle"
        className="hw-label-caption"
        fill="var(--hw-gold)"
        style={{ fontFamily: "KaTeX_Main, serif" }}
      >
        V ∝ (ϕ²−v²)²
      </text>
      <line x1={-133} y1={60} x2={137} y2={60} stroke="var(--hw-ink)" />
      <line x1={0} y1={-98} x2={0} y2={60} stroke="var(--hw-ink)" />
      <InkPath d={potentialPath()} stroke="var(--hw-gold)" strokeWidth={1.8} filterLevel="none" />
      {potentialMinima.map((p, i) => (
        <g key={p.x}>
          <circle cx={p.x} cy={p.y} r={4.5} fill="var(--hw-red)" />
          <HandwrittenLabel x={p.x} y={87} text={i === 0 ? "−1" : "+1"} variant="label-minor" />
        </g>
      ))}
      <text
        x={150}
        y={66}
        className="hw-label-caption"
        fill="var(--hw-ink)"
        style={{ fontFamily: "KaTeX_Main, serif" }}
      >
        ϕ/v
      </text>
      <HandwrittenLabel x={-20} y={-93} text="V" variant="label-minor" />
      <HandwrittenLabel x={0} y={132} text="ϕ为选定规范下的实中性分量" variant="caption" />
      <HandwrittenLabel
        x={0}
        y={155}
        text="±v规范相关 · 零温v≈246 GeV"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}

function VertexTable() {
  return (
    <g transform="translate(210 0)">
      <HandwrittenLabel x={0} y={-150} text="三类相互作用顶点" variant="subtitle" />
      <Vertex y={-90} left="e⁻" right="e⁻" boson="γ" type="photon" color="var(--hw-blue)" />
      <Vertex y={0} left="q" right="q" boson="g" type="gluon" color="var(--hw-red)" />
      <Vertex y={90} left="νₑ" right="e⁻" boson="W⁻" type="weak" color="var(--hw-ink)" />
    </g>
  );
}

function Vertex({
  y,
  left,
  right,
  boson,
  type,
  color,
}: {
  y: number;
  left: string;
  right: string;
  boson: string;
  type: string;
  color: string;
}) {
  const wave =
    type === "gluon"
      ? "M0 0 C-12 0 -12 12 0 12 S12 24 0 24 S-12 36 0 36"
      : "M0 0 q8 6 0 12 q-8 6 0 12 q8 6 0 12";
  return (
    <g transform={`translate(0 ${y})`}>
      <path d="M-60 -20 L0 0 L60 -20" fill="none" stroke={color} strokeWidth={1.5} />
      <path d="M-29 -10 l-8 -6 -2 7 Z M33 -11 l-9 -1 2 7 Z" fill={color} />
      <path d={wave} stroke="var(--hw-gold)" strokeWidth={1.3} fill="none" />
      {type === "weak" ? <path d="M0 18 l-4 8 8 0 Z" fill="var(--hw-gold)" /> : null}
      <circle r={2.8} fill="var(--hw-ink)" />
      <HandwrittenLabel x={-83} y={-17} text={left} variant="label-minor" />
      <HandwrittenLabel x={83} y={-17} text={right} variant="label-minor" />
      <HandwrittenLabel x={25} y={35} text={boson} variant="label-minor" color="var(--hw-gold)" />
    </g>
  );
}
