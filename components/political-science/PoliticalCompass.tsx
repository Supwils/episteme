"use client";

import { useState } from "react";

const ACCENT = "#c25b5b";

// Schematic, widely-used two-axis model. Placements are illustrative and
// contested — the point is the *structure* (two independent axes), not a precise
// verdict on any movement. econ: -10 (国家/平等) … +10 (市场/自由放任).
// social: -10 (个人自由) … +10 (集体威权).
type Ref = { label: string; econ: number; social: number };
const REFS: Ref[] = [
  { label: "古典自由主义", econ: 4, social: -4 },
  { label: "自由意志主义", econ: 8, social: -7 },
  { label: "保守主义", econ: 3, social: 4 },
  { label: "社会民主主义", econ: -4, social: -2 },
  { label: "社会主义", econ: -6, social: 0 },
  { label: "国家共产主义", econ: -8, social: 7 },
  { label: "法西斯主义", econ: 2, social: 9 },
  { label: "无政府主义", econ: -5, social: -8 },
];

function quadrant(econ: number, social: number): string {
  const e = econ >= 0 ? "右翼" : "左翼";
  const s = social >= 0 ? "威权" : "自由";
  return `${e}${s}`;
}

// SVG plane is 200×200 with a 0,0 origin at the centre (100,100).
const toX = (econ: number) => 100 + econ * 8;
const toY = (social: number) => 100 - social * 8;

export function PoliticalCompass() {
  const [econ, setEcon] = useState(0);
  const [social, setSocial] = useState(0);

  const nearest = REFS.reduce(
    (best, r) => {
      const d = (r.econ - econ) ** 2 + (r.social - social) ** 2;
      return d < best.d ? { d, label: r.label } : best;
    },
    { d: Infinity, label: "" }
  );

  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint flex items-center justify-between gap-2 border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: ACCENT }}
        >
          政治光谱 · 交互
        </span>
        <span className="text-fg-muted font-mono text-[10px]">两轴模型</span>
      </figcaption>

      <div className="grid gap-6 p-4 sm:grid-cols-[1fr_220px] sm:p-6">
        <svg
          viewBox="0 0 200 200"
          className="h-auto w-full max-w-[360px]"
          role="img"
          aria-label="政治光谱双轴图"
        >
          {/* quadrant tints */}
          <rect x="100" y="0" width="100" height="100" fill={ACCENT} opacity="0.05" />
          <rect x="0" y="0" width="100" height="100" fill="#5a6fd0" opacity="0.05" />
          {/* axes */}
          <line
            x1="100"
            y1="4"
            x2="100"
            y2="196"
            stroke="var(--color-border-subtle)"
            strokeWidth="1"
          />
          <line
            x1="4"
            y1="100"
            x2="196"
            y2="100"
            stroke="var(--color-border-subtle)"
            strokeWidth="1"
          />
          {/* axis labels */}
          <text
            x="100"
            y="12"
            fontSize="7"
            fontFamily="monospace"
            textAnchor="middle"
            fill="var(--color-fg-muted)"
          >
            威权 ▲
          </text>
          <text
            x="100"
            y="197"
            fontSize="7"
            fontFamily="monospace"
            textAnchor="middle"
            fill="var(--color-fg-muted)"
          >
            ▼ 自由
          </text>
          <text x="6" y="103" fontSize="7" fontFamily="monospace" fill="var(--color-fg-muted)">
            ◀ 左
          </text>
          <text
            x="194"
            y="103"
            fontSize="7"
            fontFamily="monospace"
            textAnchor="end"
            fill="var(--color-fg-muted)"
          >
            右 ▶
          </text>

          {/* reference ideologies */}
          {REFS.map((r) => (
            <g key={r.label}>
              <circle cx={toX(r.econ)} cy={toY(r.social)} r="2.4" fill="var(--color-fg-disabled)" />
              <text
                x={toX(r.econ)}
                y={toY(r.social) - 4}
                fontSize="6.2"
                fontFamily="monospace"
                textAnchor="middle"
                fill="var(--color-fg-muted)"
              >
                {r.label}
              </text>
            </g>
          ))}

          {/* user marker */}
          <circle cx={toX(econ)} cy={toY(social)} r="5" fill={ACCENT} />
          <circle
            cx={toX(econ)}
            cy={toY(social)}
            r="9"
            fill="none"
            stroke={ACCENT}
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>

        <div className="flex flex-col justify-center gap-5">
          <Slider
            label="经济轴"
            left="平等/国家"
            right="市场/自由放任"
            value={econ}
            onChange={setEcon}
          />
          <Slider
            label="社会轴"
            left="个人自由"
            right="集体威权"
            value={social}
            onChange={setSocial}
          />
          <div className="border-border-faint border-t pt-4">
            <p className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
              你所在象限
            </p>
            <p className="mt-1 text-lg font-semibold" style={{ color: ACCENT }}>
              {quadrant(econ, social)}
            </p>
            <p className="text-fg-muted mt-1 text-xs">
              最接近：<span className="text-fg-secondary">{nearest.label}</span>
            </p>
          </div>
        </div>
      </div>

      <p className="text-fg-muted border-border-faint border-t px-4 py-3 text-xs leading-relaxed sm:px-6">
        注：这是一个<strong className="text-fg-secondary">示意性</strong>
        模型。把「左—右」经济轴与「自由—威权」社会轴分开，正是为了说明：一维的「左右」不足以描述真实的政治立场。各意识形态的定位为通行近似、学界存在争议，不代表对其优劣的判断。
      </p>
    </figure>
  );
}

function Slider({
  label,
  left,
  right,
  value,
  onChange,
}: {
  label: string;
  left: string;
  right: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
        {label}
      </label>
      <input
        type="range"
        min={-10}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full accent-[#c25b5b]"
        aria-label={`${label}：${left} 到 ${right}`}
      />
      <div className="text-fg-muted mt-0.5 flex justify-between text-[10px]">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}
