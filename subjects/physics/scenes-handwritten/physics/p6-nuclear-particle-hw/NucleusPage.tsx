import { HandwrittenLabel } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenLabel";
import { bindingNuclides, bindingPath, bindingPoint } from "./curves";

export function P6PageNucleus() {
  return (
    <g>
      <text
        x={0}
        y={-250}
        textAnchor="middle"
        className="hw-label-title"
        fill="var(--hw-ink)"
        style={{ fontFamily: "KaTeX_Main, serif" }}
      >
        E
        <tspan baselineShift="sub" fontSize="70%">
          b
        </tspan>
        /A
      </text>
      <HandwrittenLabel
        x={0}
        y={-218}
        text="每核子结合能 · 铁镍峰区 · 指定反应仍须计算Q值"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <BindingCurve />
      <DecayRows />
      <HandwrittenLabel
        x={180}
        y={160}
        text="D–T：Q ≈17.6 MeV · 地面聚变示例"
        variant="caption"
        color="var(--hw-gold)"
      />
      <HandwrittenLabel
        x={180}
        y={183}
        text="²³⁵U 裂变：约200 MeV/次"
        variant="caption"
        color="var(--hw-blue)"
      />
      <HandwrittenLabel
        x={180}
        y={206}
        text="太阳主要靠质子–质子链"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}

function BindingCurve() {
  const ni = bindingPoint(62, 8.7945555);
  return (
    <g transform="translate(-220 -20)">
      <HandwrittenLabel x={0} y={-150} text="部分核素 · AME2020" variant="subtitle" italic />
      <line x1={-140} x2={140} y1={70} y2={70} stroke="var(--hw-ink)" />
      <line x1={-140} x2={-140} y1={-80} y2={70} stroke="var(--hw-ink)" />
      {[0, 4, 8].map((be) => (
        <g key={be}>
          <line
            x1={-144}
            x2={-140}
            y1={bindingPoint(1, be).y}
            y2={bindingPoint(1, be).y}
            stroke="var(--hw-ink-soft)"
          />
          <HandwrittenLabel
            x={-150}
            y={bindingPoint(1, be).y + 4}
            text={String(be)}
            anchor="end"
            variant="caption"
            color="var(--hw-ink-soft)"
          />
        </g>
      ))}
      {[1, 60, 120, 238].map((a) => (
        <g key={a}>
          <line
            x1={bindingPoint(a, 0).x}
            x2={bindingPoint(a, 0).x}
            y1={70}
            y2={75}
            stroke="var(--hw-ink-soft)"
          />
          <HandwrittenLabel
            x={bindingPoint(a, 0).x}
            y={94}
            text={String(a)}
            variant="caption"
            color="var(--hw-ink-soft)"
          />
        </g>
      ))}
      <HandwrittenLabel
        x={-140}
        y={-100}
        text="MeV/核子"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel x={155} y={74} text="A" variant="label-minor" color="var(--hw-ink-soft)" />
      <path d={bindingPath} fill="none" stroke="var(--hw-gold)" strokeWidth={1.6} />
      {bindingNuclides.map((n) => {
        const p = bindingPoint(n.a, n.be);
        return <circle key={n.isotope} cx={p.x} cy={p.y} r={1.6} fill="var(--hw-gold)" />;
      })}
      <circle cx={ni.x} cy={ni.y} r={4} fill="var(--hw-red)" />
      <HandwrittenLabel
        x={ni.x + 70}
        y={ni.y - 19}
        text="⁶²Ni ≈8.7946"
        variant="caption"
        color="var(--hw-red)"
      />
      <path
        d="M -110 35 L -80 -10 L -90 -6 M -80 -10 L -80 0 M 110 35 L 65 10 L 70 19 M 65 10 L 75 9"
        fill="none"
        stroke="var(--hw-blue)"
      />
      <HandwrittenLabel x={-72} y={40} text="轻核合并" variant="caption" color="var(--hw-blue)" />
      <HandwrittenLabel x={77} y={58} text="重核分裂" variant="caption" color="var(--hw-blue)" />
      <HandwrittenLabel
        x={0}
        y={120}
        text="连线为引导；不代表同A所有核素"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel
        x={0}
        y={143}
        text="箭头只示部分放能反应的总体方向"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}

function DecayRows() {
  const rows = [
    {
      symbol: "α",
      color: "var(--hw-gold)",
      equation: "(A,Z) → (A−4,Z−2) + ⁴He",
      note: "带走2个质子与2个中子",
    },
    {
      symbol: "β⁻",
      color: "var(--hw-blue)",
      equation: "n → p + 电子 + 反电子中微子",
      note: "核内转化：A不变，Z加1",
    },
    {
      symbol: "γ",
      color: "var(--hw-red)",
      equation: "(A,Z)* → (A,Z) + γ",
      note: "A和Z不变，激发能降低",
    },
  ];
  return (
    <g transform="translate(220 -20)">
      <HandwrittenLabel x={0} y={-150} text="几类核衰变" variant="subtitle" italic />
      {rows.map((r, i) => (
        <g key={r.symbol} transform={`translate(0 ${-80 + i * 80})`}>
          <HandwrittenLabel x={-160} y={4} text={r.symbol} variant="subtitle" color={r.color} />
          <HandwrittenLabel x={15} y={0} text={r.equation} variant="caption" />
          <HandwrittenLabel
            x={15}
            y={23}
            text={r.note}
            variant="caption"
            color="var(--hw-ink-soft)"
          />
        </g>
      ))}
      <HandwrittenLabel
        x={0}
        y={126}
        text="β⁺与电子俘获另有不同反应"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}
