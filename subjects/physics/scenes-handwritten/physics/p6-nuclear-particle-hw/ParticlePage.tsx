import { HandwrittenLabel } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenLabel";
import { couplingPath, couplingPoint, mzPoint } from "./curves";

export function P6PageParticle() {
  return (
    <g>
      <HandwrittenLabel x={0} y={-240} text="质子价夸克记账：uud" variant="title" italic />
      <HandwrittenLabel
        x={0}
        y={-208}
        text="真实强子还含胶子与海夸克；图示不表示静止的小球"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <Proton />
      <RunningCoupling />
      <HandwrittenLabel x={180} y={170} text="αₛ(MZ) =0.1180 ±0.0009 · PDG平均" variant="caption" />
      <HandwrittenLabel
        x={180}
        y={193}
        text="Run 3：pp质心能量13.6 TeV"
        variant="caption"
        color="var(--hw-gold)"
      />
      <HandwrittenLabel
        x={180}
        y={216}
        text="碰撞能量与过程的动量转移Q须区分"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}

function Proton() {
  return (
    <g transform="translate(-220 -30)">
      <HandwrittenLabel x={0} y={-150} text="价夸克与强相互作用" variant="subtitle" italic />
      <circle r={95} fill="var(--hw-wash-warm)" stroke="var(--hw-ink-soft)" strokeDasharray="2 5" />
      <path
        d="M -35 -25 Q 0 -5 35 -25 M -35 -25 Q -25 30 0 45 M 35 -25 Q 25 30 0 45"
        stroke="var(--hw-red)"
        fill="none"
        strokeWidth={1.4}
        strokeDasharray="3 3"
      />
      {[
        { x: -40, y: -30, q: "u" },
        { x: 40, y: -30, q: "u" },
        { x: 0, y: 45, q: "d" },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={20} fill="var(--hw-wash-cool)" stroke="var(--hw-blue)" />
          <HandwrittenLabel x={p.x} y={p.y + 5} text={p.q} variant="label-major" />
        </g>
      ))}
      <HandwrittenLabel
        x={0}
        y={123}
        text="位置仅示意；颜色不代表固定色荷"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel
        x={0}
        y={146}
        text="孤立强子为色单态 · 不能只加价夸克质量"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}

function RunningCoupling() {
  return (
    <g transform="translate(220 -30)">
      <text
        x={0}
        y={-150}
        textAnchor="middle"
        className="hw-label-subtitle"
        fill="var(--hw-ink)"
        style={{ fontFamily: "KaTeX_Main, serif" }}
      >
        α
        <tspan baselineShift="sub" fontSize="70%">
          s
        </tspan>
        (Q) · 渐近自由
      </text>
      <HandwrittenLabel
        x={0}
        y={-124}
        text="五味一圈示意 · 10≤Q≤150 GeV"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <line x1={-130} x2={130} y1={70} y2={70} stroke="var(--hw-ink)" />
      <line x1={-130} x2={-130} y1={-80} y2={70} stroke="var(--hw-ink)" />
      {[0, 0.1, 0.2].map((a) => (
        <g key={a}>
          <line
            x1={-134}
            x2={-130}
            y1={couplingPoint(10, a).y}
            y2={couplingPoint(10, a).y}
            stroke="var(--hw-ink-soft)"
          />
          <HandwrittenLabel
            x={-142}
            y={couplingPoint(10, a).y + 4}
            text={String(a)}
            anchor="end"
            variant="caption"
            color="var(--hw-ink-soft)"
          />
        </g>
      ))}
      {[10, 150].map((q) => (
        <HandwrittenLabel
          key={q}
          x={couplingPoint(q).x}
          y={94}
          text={String(q)}
          variant="caption"
          color="var(--hw-ink-soft)"
        />
      ))}
      <HandwrittenLabel
        x={0}
        y={94}
        text="Q / GeV · 对数轴"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <path d={couplingPath} fill="none" stroke="var(--hw-blue)" strokeWidth={1.6} />
      <line
        x1={mzPoint.x}
        x2={mzPoint.x}
        y1={mzPoint.y}
        y2={70}
        stroke="var(--hw-gold)"
        strokeDasharray="2 4"
      />
      <circle cx={mzPoint.x} cy={mzPoint.y} r={4} fill="var(--hw-gold)" />
      <HandwrittenLabel
        x={mzPoint.x}
        y={mzPoint.y - 18}
        text="MZ ≈91.2 GeV"
        variant="caption"
        color="var(--hw-gold)"
      />
      <HandwrittenLabel
        x={0}
        y={123}
        text="更低能区不能外推这条微扰曲线"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}
