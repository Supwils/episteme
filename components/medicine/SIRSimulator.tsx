"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// A self-contained epidemiology toy: numerically integrate the classic SIR
// compartmental model and plot S/I/R over time. Pure math (Euler integration)
// drawn on a 2D canvas — no external dependencies, no bundle impact. The model
// is the real textbook SIR; the point is intuition, not forecasting.

const S_COLOR = "#5fb3a3";
const I_COLOR = "#d9544d";
const R_COLOR = "#6a6fd0";

type SeriesPoint = { s: number; i: number; r: number };

function simulate(
  r0: number,
  infectiousDays: number,
  vaccinated: number,
  days: number
): { series: SeriesPoint[]; peakI: number; peakDay: number; attackRate: number } {
  const gamma = 1 / infectiousDays; // recovery rate
  const beta = r0 * gamma; // transmission rate
  const dt = 0.25;
  const i0 = 0.001; // seed infection
  let s = Math.max(0, 1 - vaccinated - i0);
  let i = i0;
  let r = vaccinated;
  const series: SeriesPoint[] = [];
  let peakI = i;
  let peakDay = 0;
  const steps = Math.round(days / dt);
  for (let step = 0; step <= steps; step++) {
    if (step % Math.round(1 / dt) === 0) series.push({ s, i, r });
    if (i > peakI) {
      peakI = i;
      peakDay = step * dt;
    }
    const newInfections = beta * s * i;
    const newRecoveries = gamma * i;
    s = Math.max(0, s - newInfections * dt);
    i = Math.max(0, i + (newInfections - newRecoveries) * dt);
    r = Math.min(1, r + newRecoveries * dt);
  }
  const attackRate = Math.max(0, r - vaccinated); // fraction ever infected
  return { series, peakI, peakDay, attackRate };
}

export function SIRSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [r0, setR0] = useState(2.5);
  const [infectiousDays, setInfectiousDays] = useState(7);
  const [vaccinated, setVaccinated] = useState(0);
  const days = 180;

  const result = useMemo(
    () => simulate(r0, infectiousDays, vaccinated, days),
    [r0, infectiousDays, vaccinated]
  );

  const herdThreshold = Math.max(0, 1 - 1 / r0);
  const effectiveR = r0 * Math.max(0, 1 - vaccinated);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth || 720;
    const cssH = 320;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const padL = 44;
    const padB = 28;
    const padT = 12;
    const padR = 12;
    const plotW = cssW - padL - padR;
    const plotH = cssH - padT - padB;
    const x = (day: number) => padL + (day / days) * plotW;
    const y = (frac: number) => padT + (1 - frac) * plotH;

    // grid + y labels (0,25,50,75,100%)
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "10px -apple-system, system-ui, sans-serif";
    ctx.lineWidth = 1;
    for (let p = 0; p <= 1; p += 0.25) {
      const yy = y(p);
      ctx.beginPath();
      ctx.moveTo(padL, yy);
      ctx.lineTo(cssW - padR, yy);
      ctx.stroke();
      ctx.fillText(`${Math.round(p * 100)}%`, 6, yy + 3);
    }
    // x labels (days)
    for (let d = 0; d <= days; d += 30) {
      ctx.fillText(`${d}`, x(d) - 6, cssH - 8);
    }

    // herd-immunity threshold line
    if (herdThreshold > 0 && herdThreshold < 1) {
      ctx.strokeStyle = "rgba(224,138,60,0.5)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, y(herdThreshold));
      ctx.lineTo(cssW - padR, y(herdThreshold));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    const drawCurve = (key: keyof SeriesPoint, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      result.series.forEach((pt, idx) => {
        const xx = x(idx);
        const yy = y(pt[key]);
        if (idx === 0) ctx.moveTo(xx, yy);
        else ctx.lineTo(xx, yy);
      });
      ctx.stroke();
    };
    drawCurve("s", S_COLOR);
    drawCurve("r", R_COLOR);
    drawCurve("i", I_COLOR);
  }, [result, herdThreshold]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0b12] p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px]">
        <Legend color={S_COLOR} label="易感 S" />
        <Legend color={I_COLOR} label="感染 I" />
        <Legend color={R_COLOR} label="康复/免疫 R" />
        <span className="text-white/30">— — 群体免疫阈值</span>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: 320 }}
        aria-label="SIR 流行病曲线"
      />

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Slider
          label="基本传染数 R₀"
          value={r0}
          min={0.5}
          max={18}
          step={0.1}
          onChange={setR0}
          display={r0.toFixed(1)}
          hint="一个病人平均传染几个人（流感~1.3，麻疹~15）"
        />
        <Slider
          label="传染期（天）"
          value={infectiousDays}
          min={1}
          max={21}
          step={1}
          onChange={setInfectiousDays}
          display={`${infectiousDays} 天`}
          hint="一个病人具有传染性的天数"
        />
        <Slider
          label="疫苗接种率"
          value={vaccinated}
          min={0}
          max={1}
          step={0.01}
          onChange={setVaccinated}
          display={`${Math.round(vaccinated * 100)}%`}
          hint="接种后获得免疫的人口比例"
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric
          label="感染高峰"
          value={`${(result.peakI * 100).toFixed(1)}%`}
          sub={`第 ${Math.round(result.peakDay)} 天`}
        />
        <Metric
          label="累计感染"
          value={`${(result.attackRate * 100).toFixed(0)}%`}
          sub="曾被感染的人口"
        />
        <Metric
          label="有效传染数 Rₑ"
          value={effectiveR.toFixed(2)}
          sub={effectiveR < 1 ? "< 1：疫情会消退" : "> 1：疫情会扩散"}
        />
        <Metric
          label="群体免疫阈值"
          value={`${(herdThreshold * 100).toFixed(0)}%`}
          sub="需免疫的人口比例"
        />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-white/60">
      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
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
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  hint: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center justify-between text-[12.5px]">
        <span className="text-white/70">{label}</span>
        <span className="font-mono text-white/90">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-[#d9544d]"
      />
      <span className="mt-1 block text-[10.5px] leading-snug text-white/35">{hint}</span>
    </label>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5">
      <div className="text-[10.5px] tracking-wide text-white/40">{label}</div>
      <div className="text-fg-primary text-lg font-semibold">{value}</div>
      <div className="text-[10px] leading-snug text-white/40">{sub}</div>
    </div>
  );
}
