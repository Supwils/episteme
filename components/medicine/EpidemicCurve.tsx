"use client";

import { useMemo, useState } from "react";

const ACCENT = "#d9544d";
const DAYS = 180;
const DT = 0.5;
const I0 = 0.001; // initial infected fraction

type Series = {
  s: number[];
  i: number[];
  r: number[];
  peakI: number;
  peakDay: number;
  attack: number;
};

// Deterministic SIR compartmental model integrated with forward Euler.
// β = R0·γ, γ = 1/infectiousPeriod. Population normalised to 1.
function simulate(r0: number, period: number, vaccinated: number): Series {
  const gamma = 1 / period;
  const beta = r0 * gamma;
  let s = 1 - I0 - vaccinated;
  let i = I0;
  let r = vaccinated;
  const S: number[] = [];
  const I: number[] = [];
  const R: number[] = [];
  let peakI = 0;
  let peakStep = 0;
  const steps = Math.round(DAYS / DT);
  for (let t = 0; t <= steps; t++) {
    if (t % Math.round(1 / DT) === 0) {
      S.push(s);
      I.push(i);
      R.push(r);
    }
    if (i > peakI) {
      peakI = i;
      peakStep = t;
    }
    const newInf = beta * s * i;
    const newRec = gamma * i;
    s += -newInf * DT;
    i += (newInf - newRec) * DT;
    r += newRec * DT;
    s = Math.max(0, s);
    i = Math.max(0, i);
  }
  return { s: S, i: I, r: R, peakI, peakDay: Math.round(peakStep * DT), attack: r };
}

function pct(x: number): string {
  return `${(x * 100).toFixed(x < 0.1 ? 1 : 0)}%`;
}

const LINES = [
  { key: "s", label: "易感 S", color: "#61afef" },
  { key: "i", label: "感染 I", color: ACCENT },
  { key: "r", label: "康复/免疫 R", color: "#98c379" },
] as const;

export function EpidemicCurve() {
  const [r0, setR0] = useState(2.5);
  const [period, setPeriod] = useState(7);
  const [vax, setVax] = useState(0);

  const sim = useMemo(() => simulate(r0, period, vax), [r0, period, vax]);

  const herd = Math.max(0, 1 - 1 / r0); // herd immunity threshold
  const effR = r0 * (1 - vax - I0); // effective R at outbreak start
  const n = sim.i.length;
  const toX = (day: number) => (day / (n - 1)) * 100;
  const toY = (v: number) => 100 - v * 96 - 2;

  const path = (arr: number[]) =>
    arr
      .map((v, idx) => `${idx === 0 ? "M" : "L"}${toX(idx).toFixed(2)},${toY(v).toFixed(2)}`)
      .join(" ");

  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint flex items-center justify-between gap-2 border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: ACCENT }}
        >
          传染病传播 · SIR 模型
        </span>
        <span className="text-fg-muted font-mono text-[10px]">{DAYS} 天</span>
      </figcaption>

      {/* chart */}
      <div className="px-4 pt-5 sm:px-6">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-52 w-full"
          role="img"
          aria-label={`SIR 流行曲线，R0 = ${r0.toFixed(1)}，感染高峰约在第 ${sim.peakDay} 天，峰值感染比例 ${pct(sim.peakI)}`}
        >
          {[20, 40, 60, 80].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="var(--color-border-subtle)"
              strokeWidth="0.3"
            />
          ))}
          {/* herd immunity threshold line */}
          <line
            x1="0"
            y1={toY(herd)}
            x2="100"
            y2={toY(herd)}
            stroke="var(--color-fg-disabled)"
            strokeWidth="0.4"
            strokeDasharray="2 2"
          />
          {/* peak day marker */}
          <line
            x1={toX(sim.peakDay)}
            y1="0"
            x2={toX(sim.peakDay)}
            y2="100"
            stroke={ACCENT}
            strokeWidth="0.4"
            strokeDasharray="1.5 2"
            opacity="0.6"
          />
          <path
            d={path(sim.s)}
            fill="none"
            stroke={LINES[0].color}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={path(sim.r)}
            fill="none"
            stroke={LINES[2].color}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={path(sim.i)}
            fill="none"
            stroke={LINES[1].color}
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="text-fg-disabled mt-1 flex justify-between font-mono text-[9px]">
          <span>第 0 天</span>
          <span>虚线 = 群体免疫阈值 {pct(herd)}</span>
          <span>第 {DAYS} 天</span>
        </div>
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 px-4 pt-3 font-mono text-[10px] sm:px-6">
        {LINES.map((l) => (
          <span key={l.key} className="text-fg-muted flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: l.color }}
            />
            {l.label}
          </span>
        ))}
      </div>

      {/* sliders */}
      <div className="grid gap-3 px-4 py-4 sm:px-6">
        <Slider
          label="基本传染数 R₀"
          value={r0}
          min={0.5}
          max={6}
          step={0.1}
          onChange={setR0}
          display={r0.toFixed(1)}
        />
        <Slider
          label="传染期（天）"
          value={period}
          min={2}
          max={21}
          step={1}
          onChange={setPeriod}
          display={`${period} 天`}
        />
        <Slider
          label="初始免疫比例（疫苗）"
          value={vax}
          min={0}
          max={0.95}
          step={0.01}
          onChange={setVax}
          display={pct(vax)}
        />
      </div>

      {/* readout */}
      <div className="border-border-faint text-fg-muted grid grid-cols-2 gap-x-4 gap-y-1.5 border-t px-4 py-3 font-mono text-[11px] sm:grid-cols-4 sm:px-6">
        <span>
          有效传染数 <span style={{ color: effR > 1 ? ACCENT : "#98c379" }}>{effR.toFixed(2)}</span>
        </span>
        <span>
          感染高峰 <span className="text-fg-secondary">第 {sim.peakDay} 天</span>
        </span>
        <span>
          峰值感染 <span className="text-fg-secondary">{pct(sim.peakI)}</span>
        </span>
        <span>
          累计感染 <span className="text-fg-secondary">{pct(sim.attack)}</span>
        </span>
      </div>

      <p className="text-fg-muted border-border-faint border-t px-4 py-3 text-xs leading-relaxed sm:px-6">
        拖动滑块感受传染病动力学：当<span className="text-fg-secondary">有效传染数</span>降到 1
        以下（提高免疫比例或缩短传染期），疫情便无法持续扩散——这正是
        <span style={{ color: ACCENT }}>群体免疫</span>的原理。
        <span className="text-fg-disabled">
          {" "}
          这是简化的确定性 SIR 房室模型，忽略了潜伏期、年龄结构与人群异质性。
        </span>
      </p>
    </figure>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <label className="flex items-center gap-3 font-mono text-[11px]">
      <span className="text-fg-muted w-40 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#d9544d]"
        aria-label={label}
      />
      <span className="text-fg-secondary w-14 shrink-0 text-right">{display}</span>
    </label>
  );
}
