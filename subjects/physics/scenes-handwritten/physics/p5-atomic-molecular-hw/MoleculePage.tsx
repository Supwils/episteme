import { HandwrittenLabel } from "@/subjects/physics/scenes-handwritten/shared/HandwrittenLabel";

export function P5PageMolecule() {
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
        φ
        <tspan baselineShift="sub" fontSize="70%">
          MO
        </tspan>{" "}
        = c
        <tspan baselineShift="sub" fontSize="70%">
          A
        </tspan>
        φ
        <tspan baselineShift="sub" fontSize="70%">
          A
        </tspan>{" "}
        + c
        <tspan baselineShift="sub" fontSize="70%">
          B
        </tspan>
        φ
        <tspan baselineShift="sub" fontSize="70%">
          B
        </tspan>
      </text>
      <HandwrittenLabel
        x={0}
        y={-198}
        text="LCAO 分子轨道展开 · 两个 1s 基函数示意"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <MolecularOrbitals />
      <HybridDirections />
      <HandwrittenLabel
        x={180}
        y={205}
        text="亚层容量：2(2ℓ + 1) 个电子"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel
        x={180}
        y={227}
        text="填充顺序还需比较能量"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      {["s · 2", "p · 6", "d · 10", "f · 14"].map((label, i) => (
        <g key={label} transform={`translate(${-150 + i * 100} 250)`}>
          <rect
            x={-44}
            y={-20}
            width={88}
            height={36}
            rx={4}
            fill="var(--hw-wash-warm)"
            stroke="var(--hw-gold)"
          />
          <HandwrittenLabel x={0} y={4} text={label} variant="label-minor" />
        </g>
      ))}
    </g>
  );
}

function MolecularOrbitals() {
  return (
    <g transform="translate(-220 -10)">
      <HandwrittenLabel x={0} y={-145} text="H₂ · 成键 / 反键轨道" variant="subtitle" italic />
      <ellipse cx={0} cy={-55} rx={65} ry={30} fill="var(--hw-wash-warm)" stroke="var(--hw-gold)" />
      <HandwrittenLabel x={0} y={-49} text="+" variant="label-major" color="var(--hw-gold)" />
      {[-30, 30].map((x) => (
        <circle key={x} cx={x} cy={-55} r={3} fill="var(--hw-ink)" />
      ))}
      <text x={90} y={-50} className="hw-label-major" fill="var(--hw-gold)">
        σ
        <tspan baselineShift="sub" fontSize="70%">
          g
        </tspan>
      </text>
      {[-1, 1].map((sign) => (
        <g key={sign}>
          <ellipse
            cx={sign * 34}
            cy={31}
            rx={26}
            ry={30}
            fill={sign === -1 ? "var(--hw-wash-warm)" : "var(--hw-wash-cool)"}
            stroke={sign === -1 ? "var(--hw-gold)" : "var(--hw-blue)"}
          />
          <circle cx={sign * 30} cy={31} r={3} fill="var(--hw-ink)" />
          <HandwrittenLabel
            x={sign * 35}
            y={31}
            text={sign === -1 ? "+" : "−"}
            variant="label-minor"
          />
        </g>
      ))}
      <line x1={0} x2={0} y1={6} y2={80} stroke="var(--hw-ink-soft)" strokeDasharray="3 4" />
      <text x={90} y={48} className="hw-label-major" fill="var(--hw-blue)">
        σ
        <tspan baselineShift="sub" fontSize="70%">
          u
        </tspan>
        <tspan baselineShift="super" fontSize="70%">
          *
        </tspan>
      </text>
      <HandwrittenLabel
        x={0}
        y={96}
        text="反相组合有核间节点 · ± 不是电荷"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel
        x={0}
        y={120}
        text="轨道占据与总能量共同决定是否成键"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}

function HybridDirections() {
  return (
    <g transform="translate(220 -10)">
      <HandwrittenLabel x={0} y={-145} text="杂化基组与键方向" variant="subtitle" italic />
      {[
        { x: -100, label: "sp", desc: "180°", angles: [0, 180] },
        { x: 0, label: "sp²", desc: "120°", angles: [-90, 30, 150] },
      ].map((h) => (
        <g key={h.label} transform={`translate(${h.x} 0)`}>
          <circle r={3} fill="var(--hw-ink)" />
          {h.angles.map((a) => (
            <line
              key={a}
              x2={Math.cos((a * Math.PI) / 180) * 30}
              y2={Math.sin((a * Math.PI) / 180) * 30}
              stroke="var(--hw-gold)"
            />
          ))}
          <HandwrittenLabel x={0} y={57} text={h.label} variant="label-major" />
          <HandwrittenLabel
            x={0}
            y={80}
            text={h.desc}
            variant="caption"
            color="var(--hw-ink-soft)"
          />
        </g>
      ))}
      <g transform="translate(100 0)">
        <line x2={-26} y2={-23} stroke="var(--hw-gold)" />
        <line x2={26} y2={-23} stroke="var(--hw-gold)" />
        <path d="M 0 0 L -25 24 L -15 29 Z" fill="var(--hw-gold)" />
        <line x2={24} y2={29} stroke="var(--hw-gold)" strokeWidth={3} strokeDasharray="2 4" />
        <circle r={3} fill="var(--hw-ink)" />
        <HandwrittenLabel x={0} y={57} text="sp³" variant="label-major" />
        <HandwrittenLabel
          x={0}
          y={80}
          text="四面体投影"
          variant="caption"
          color="var(--hw-ink-soft)"
        />
      </g>
      <HandwrittenLabel
        x={0}
        y={130}
        text="sp³ 空间键角约109.5°；图上角度为投影"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
      <HandwrittenLabel
        x={0}
        y={154}
        text="实楔/虚线分别朝前/朝后 · 杂化是局域描述"
        variant="caption"
        color="var(--hw-ink-soft)"
      />
    </g>
  );
}
