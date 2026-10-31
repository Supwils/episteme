import { HandwrittenLabel } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenLabel";

const levelY = (n: number) => -80 + 145 / n ** 2;

export function P5PageAtom() {
  return (
    <g>
      <text
        x={0}
        y={-240}
        textAnchor="middle"
        className="hw-label-title"
        fill="var(--hw-ink)"
        style={{ fontFamily: "KaTeX_Main, serif" }}
      >
        E
        <tspan baselineShift="sub" fontSize="70%">
          n
        </tspan>{" "}
        ≈ −13.6 eV / n²
      </text>
      <HandwrittenLabel
        x={0}
        y={-208}
        text="氢的非相对论能级 · 忽略精细修正"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <EnergyLevels />
      <Orbitals />
      <HandwrittenLabel
        x={180}
        y={180}
        text="Pauli：同一完整单电子态不能重复占据"
        variant="caption"
      />
      <HandwrittenLabel
        x={180}
        y={203}
        text="同一空间轨道可有两种自旋投影"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}

function EnergyLevels() {
  return (
    <g transform="translate(-220 -10)">
      <HandwrittenLabel x={0} y={-145} text="能级与谱线" variant="subtitle" italic />
      <HandwrittenLabel
        x={0}
        y={-121}
        text="纵轴按能量比例 · 仅画前三层"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <line
        x1={-115}
        x2={115}
        y1={-80}
        y2={-80}
        stroke="var(--hw-ink-soft)"
        strokeDasharray="3 4"
      />
      <HandwrittenLabel
        x={130}
        y={-75}
        text="0 · 电离"
        anchor="start"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      {[1, 2, 3].map((n) => (
        <g key={n}>
          <line
            x1={-115}
            x2={115}
            y1={levelY(n)}
            y2={levelY(n)}
            stroke="var(--hw-gold)"
            strokeWidth={1.2}
          />
          <HandwrittenLabel
            x={130}
            y={levelY(n) + 5}
            text={`n = ${n}`}
            anchor="start"
            variant="caption"
            color="var(--hw-gold)"
          />
        </g>
      ))}
      <Transition x={-70} from={2} to={1} color="var(--hw-blue)" />
      <Transition x={-30} from={3} to={1} color="var(--hw-blue)" />
      <Transition x={60} from={3} to={2} color="var(--hw-red)" />
      <HandwrittenLabel
        x={0}
        y={90}
        text="蓝：Lyman → n=1 · 紫外"
        variant="caption"
        color="var(--hw-blue)"
      />
      <HandwrittenLabel
        x={0}
        y={113}
        text="红：Balmer 首线 · 3→2 · 可见"
        variant="caption"
        color="var(--hw-red)"
      />
    </g>
  );
}

function Transition({
  x,
  from,
  to,
  color,
}: {
  x: number;
  from: number;
  to: number;
  color: string;
}) {
  const y = levelY(to);
  return (
    <g stroke={color} fill="none">
      <line x1={x} x2={x} y1={levelY(from)} y2={y} />
      <path d={`M ${x - 5} ${y - 7} L ${x} ${y} L ${x + 5} ${y - 7}`} />
    </g>
  );
}

function Orbitals() {
  return (
    <g transform="translate(220 -10)">
      <HandwrittenLabel x={0} y={-145} text="代表性实轨道" variant="subtitle" italic />
      <HandwrittenLabel
        x={0}
        y={-121}
        text="等值面剖面示意 · 不是电子路径"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <circle cx={-90} cy={0} r={30} fill="var(--hw-wash-warm)" stroke="var(--hw-gold)" />
      {[-1, 1].map((sign) => (
        <ellipse
          key={sign}
          cx={0}
          cy={sign * 23}
          rx={18}
          ry={21}
          fill={sign === -1 ? "var(--hw-wash-warm)" : "var(--hw-wash-cool)"}
          stroke={sign === -1 ? "var(--hw-gold)" : "var(--hw-blue)"}
        />
      ))}
      {[45, 135, 225, 315].map((angle, i) => {
        const a = (angle * Math.PI) / 180;
        const x = 90 + Math.cos(a) * 24,
          y = Math.sin(a) * 24;
        return (
          <ellipse
            key={angle}
            cx={x}
            cy={y}
            rx={21}
            ry={11}
            transform={`rotate(${angle} ${x} ${y})`}
            fill={i % 2 ? "var(--hw-wash-cool)" : "var(--hw-wash-warm)"}
            stroke={i % 2 ? "var(--hw-blue)" : "var(--hw-gold)"}
          />
        );
      })}
      {[-90, 0, 90].map((x) => (
        <circle key={x} cx={x} cy={0} r={2} fill="var(--hw-ink)" />
      ))}
      <HandwrittenLabel x={-90} y={76} text="1s" variant="label-major" />
      <text x={0} y={76} textAnchor="middle" className="hw-label-major" fill="var(--hw-ink)">
        2p
        <tspan baselineShift="sub" fontSize="70%">
          z
        </tspan>
      </text>
      <text x={90} y={76} textAnchor="middle" className="hw-label-major" fill="var(--hw-ink)">
        3d
        <tspan baselineShift="sub" fontSize="70%">
          xy
        </tspan>
      </text>
      <HandwrittenLabel
        x={0}
        y={120}
        text="暖/冷色表示波函数正/负号"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel
        x={0}
        y={144}
        text="其余 d 轨道形状不同；z² 型带环带"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}
