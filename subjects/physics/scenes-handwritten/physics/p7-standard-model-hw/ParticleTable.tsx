import { HandwrittenLabel } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenLabel";

const rows = [
  { name: "上型夸克", symbols: ["u", "c", "t"], carrier: "g", color: "var(--hw-gold)" },
  { name: "下型夸克", symbols: ["d", "s", "b"], carrier: "γ", color: "var(--hw-gold)" },
  { name: "带电轻子", symbols: ["e", "μ", "τ"], carrier: "W±", color: "var(--hw-blue)" },
  { name: "中微子味", symbols: ["e", "μ", "τ"], carrier: "Z", color: "var(--hw-blue)" },
];

export function P7PageZoo() {
  return (
    <g>
      <HandwrittenLabel x={0} y={-245} text="标准模型 · 常用17类" variant="title" italic />
      <HandwrittenLabel x={0} y={-214} text="六夸克 + 六轻子 + g、γ、W、Z、H" variant="caption" />
      <g transform="translate(-20 -10)">
        {["第一代", "第二代", "第三代", "规范载体"].map((name, i) => (
          <HandwrittenLabel key={name} x={-144 + 92 * i} y={-152} text={name} variant="caption" />
        ))}
        {rows.map((row, i) => (
          <ParticleRow key={row.name} row={row} index={i} />
        ))}
        <ParticleCell x={210} y={-31} symbol="H" color="var(--hw-gold)" />
        <HandwrittenLabel x={256} y={55} text="≈125 GeV/c²" variant="caption" />
      </g>
      <HandwrittenLabel
        x={0}
        y={145}
        text="g含八种胶子；W栏合并W±；未逐计色自由度与反粒子"
        variant="caption"
      />
      <HandwrittenLabel x={180} y={177} text="三代对应场的规范表示相同" variant="caption" />
      <HandwrittenLabel
        x={180}
        y={200}
        text="质量与混合参数为何如此，仍待解释"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}

function ParticleRow({ row, index }: { row: (typeof rows)[number]; index: number }) {
  const y = -130 + index * 65;
  return (
    <g>
      <HandwrittenLabel x={-244} y={y + 36} text={row.name} variant="caption" />
      {row.symbols.map((symbol, i) => (
        <ParticleCell
          key={symbol}
          x={-190 + i * 92}
          y={y}
          symbol={index === 3 ? "ν" : symbol}
          sub={index === 3 ? symbol : undefined}
          color={row.color}
        />
      ))}
      <ParticleCell x={86} y={y} symbol={row.carrier} color="var(--hw-red)" />
    </g>
  );
}

function ParticleCell({
  x,
  y,
  symbol,
  sub,
  color,
}: {
  x: number;
  y: number;
  symbol: string;
  sub?: string;
  color: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={4}
        y={4}
        width={84}
        height={57}
        fill="var(--hw-bg-edge)"
        opacity={0.55}
        stroke={color}
      />
      <text
        x={46}
        y={44}
        textAnchor="middle"
        className="hw-label-title"
        fill={color}
        style={{
          fontFamily: "KaTeX_Main, serif",
          fontStyle: "italic",
          fontSize: symbol === "W±" ? 36 : undefined,
        }}
      >
        {symbol === "W±" ? "W" : symbol}
        {symbol === "W±" ? (
          <tspan baselineShift="super" fontSize="60%">
            ±
          </tspan>
        ) : null}
        {sub ? (
          <tspan baselineShift="sub" fontSize="65%">
            {sub}
          </tspan>
        ) : null}
      </text>
    </g>
  );
}
