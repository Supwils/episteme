"use client";

import { useState, useMemo } from "react";
import { cn } from "@/subjects/physics/lib/cn";

const SVG_W = 700;
const SVG_H = 400;
const PAD = { left: 60, right: 40, top: 40, bottom: 60 };
const PLOT_W = SVG_W - PAD.left - PAD.right;
const PLOT_H = SVG_H - PAD.top - PAD.bottom;

interface CarnotParams {
  T_h: number;
  T_c: number;
  V_a: number;
  V_b: number;
  n: number;
}

const R = 8.314;

function carnotCyclePoints(params: CarnotParams): { x: number; y: number; label: string; stage: string }[] {
  const { T_h, T_c, V_a, V_b, n } = params;

  const P_a = (n * R * T_h) / V_a;
  const P_b = (n * R * T_h) / V_b;
  const V_c = V_b * Math.exp((R * Math.log(V_b / V_a)) / (R));
  const V_d = V_a * Math.exp(-(R * Math.log(V_b / V_a)) / (R));
  const P_c = (n * R * T_c) / V_c;
  const P_d = (n * R * T_c) / V_d;

  return [
    { x: V_a, y: P_a, label: "A", stage: "等温膨胀起点" },
    { x: V_b, y: P_b, label: "B", stage: "等温膨胀终点" },
    { x: V_c, y: P_c, label: "C", stage: "绝热膨胀终点" },
    { x: V_d, y: P_d, label: "D", stage: "绝热压缩终点" },
  ];
}

function isothermalPath(V1: number, V2: number, P1: number, steps: number): { v: number; p: number }[] {
  const points: { v: number; p: number }[] = [];
  const pv = P1 * V1;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const v = V1 + (V2 - V1) * t;
    points.push({ v, p: pv / v });
  }
  return points;
}

function adiabaticPath(V1: number, V2: number, P1: number, gamma: number, steps: number): { v: number; p: number }[] {
  const points: { v: number; p: number }[] = [];
  const k = P1 * Math.pow(V1, gamma);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const v = V1 + (V2 - V1) * t;
    points.push({ v, p: k / Math.pow(v, gamma) });
  }
  return points;
}

interface ThermodynamicCyclesProps {
  className?: string;
}

export function ThermodynamicCycles({ className }: ThermodynamicCyclesProps) {
  const [T_h, setT_h] = useState(600);
  const [T_c, setT_c] = useState(300);
  const [V_max, setV_max] = useState(4);
  const gamma = 1.4;

  const params: CarnotParams = useMemo(
    () => ({
      T_h,
      T_c,
      V_a: 1,
      V_b: V_max,
      n: 1,
    }),
    [T_h, T_c, V_max],
  );

  const points = useMemo(() => carnotCyclePoints(params), [params]);

  const allVols = points.map((p) => p.x);
  const vMin = Math.min(...allVols) * 0.8;
  const vMax = Math.max(...allVols) * 1.2;

  const ab = useMemo(() => isothermalPath(params.V_a, params.V_b, points[0]!.y, 50), [params, points]);
  const bc = useMemo(() => {
    const V_c = params.V_b * Math.exp((R * Math.log(params.V_b / params.V_a)) / R);
    return adiabaticPath(params.V_b, V_c, points[1]!.y, gamma, 50);
  }, [params, points]);
  const cd = useMemo(() => {
    const V_c = params.V_b * Math.exp((R * Math.log(params.V_b / params.V_a)) / R);
    const V_d = params.V_a * Math.exp(-(R * Math.log(params.V_b / params.V_a)) / R);
    return isothermalPath(V_c, V_d, points[2]!.y, 50);
  }, [params, points]);
  const da = useMemo(() => {
    const V_d = params.V_a * Math.exp(-(R * Math.log(params.V_b / params.V_a)) / R);
    return adiabaticPath(V_d, params.V_a, points[3]!.y, gamma, 50);
  }, [params, points]);

  const allPressures = [...ab, ...bc, ...cd, ...da].map((p) => p.p);
  const pMin = Math.min(...allPressures) * 0.8;
  const pMax = Math.max(...allPressures) * 1.2;

  function toSvgX(v: number): number {
    return PAD.left + ((v - vMin) / (vMax - vMin)) * PLOT_W;
  }

  function toSvgY(p: number): number {
    return PAD.top + ((pMax - p) / (pMax - pMin)) * PLOT_H;
  }

  function buildPathD(pts: { v: number; p: number }[]): string {
    return pts.map((pt, i) => `${i === 0 ? "M" : "L"} ${toSvgX(pt.v).toFixed(1)} ${toSvgY(pt.p).toFixed(1)}`).join(" ");
  }

  const cyclePathD = buildPathD([...ab, ...bc.slice(1), ...cd.slice(1), ...da.slice(1)]) + " Z";

  const efficiency = useMemo(() => 1 - T_c / T_h, [T_h, T_c]);

  const workDone = useMemo(() => {
    return (n: number) => efficiency * n * R * T_h * Math.log(params.V_b / params.V_a);
  }, [efficiency, T_h, params.V_b, params.V_a]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="rounded-xl border border-fg-disabled/30 bg-bg-deep overflow-hidden">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full">
          <defs>
            <linearGradient id="work-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect width={SVG_W} height={SVG_H} fill="#0a0a14" />

          {Array.from({ length: 6 }).map((_, i) => {
            const x = PAD.left + (i / 5) * PLOT_W;
            return (
              <g key={`gx-${i}`}>
                <line x1={x} y1={PAD.top} x2={x} y2={PAD.top + PLOT_H} stroke="#1a1a2e" strokeWidth={0.5} />
                <text x={x} y={SVG_H - 20} textAnchor="middle" fill="#444" fontSize="9" fontFamily="monospace">
                  {((vMin + (i / 5) * (vMax - vMin))).toFixed(1)}
                </text>
              </g>
            );
          })}
          {Array.from({ length: 5 }).map((_, i) => {
            const y = PAD.top + (i / 4) * PLOT_H;
            return (
              <g key={`gy-${i}`}>
                <line x1={PAD.left} y1={y} x2={PAD.left + PLOT_W} y2={y} stroke="#1a1a2e" strokeWidth={0.5} />
                <text x={PAD.left - 8} y={y + 4} textAnchor="end" fill="#444" fontSize="9" fontFamily="monospace">
                  {((pMax - (i / 4) * (pMax - pMin)) / 1e5).toFixed(1)}
                </text>
              </g>
            );
          })}

          <path d={cyclePathD} fill="url(#work-fill)" stroke="none" />

          <path d={buildPathD(ab)} fill="none" stroke="#ef4444" strokeWidth={2} />
          <path d={buildPathD(bc)} fill="none" stroke="#3b82f6" strokeWidth={2} />
          <path d={buildPathD(cd)} fill="none" stroke="#f97316" strokeWidth={2} />
          <path d={buildPathD(da)} fill="none" stroke="#a855f7" strokeWidth={2} />

          {points.map((pt) => (
            <g key={pt.label}>
              <circle cx={toSvgX(pt.x)} cy={toSvgY(pt.y)} r={5} fill="#fff" fillOpacity={0.2} stroke="#fff" strokeWidth={1} />
              <text x={toSvgX(pt.x) + 10} y={toSvgY(pt.y) - 8} fill="#f5f6fa" fontSize="12" fontFamily="monospace" fontWeight="700">
                {pt.label}
              </text>
            </g>
          ))}

          <text x={PAD.left + PLOT_W / 2} y={SVG_H - 4} textAnchor="middle" fill="#555" fontSize="10" fontFamily="monospace">
            体积 V (m³)
          </text>
          <text x={14} y={PAD.top + PLOT_H / 2} textAnchor="middle" fill="#555" fontSize="10" fontFamily="monospace" transform={`rotate(-90, 14, ${PAD.top + PLOT_H / 2})`}>
            压强 P (bar)
          </text>
        </svg>
      </div>

      <div className="flex items-center gap-4">
        {[
          { color: "#ef4444", label: "等温膨胀 (A→B)" },
          { color: "#3b82f6", label: "绝热膨胀 (B→C)" },
          { color: "#f97316", label: "等温压缩 (C→D)" },
          { color: "#a855f7", label: "绝热压缩 (D→A)" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="inline-block h-0.5 w-4 rounded" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-fg-muted">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-accent-cool/20 bg-accent-cool/5 px-4 py-2">
        <p className="font-mono text-xs text-accent-cool">
          η = 1 − T_c/T_h = 1 − {T_c}/{T_h} = {(efficiency * 100).toFixed(1)}%
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-fg-disabled/30 bg-bg-panel/50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-fg-secondary">参数调节</h3>
          <div className="flex items-center gap-3">
            <label className="w-20 shrink-0 text-xs text-fg-muted">T_h (热源)</label>
            <input
              type="range"
              min={400}
              max={1000}
              step={10}
              value={T_h}
              onChange={(e) => setT_h(Number(e.target.value))}
              className="flex-1 accent-red-500"
            />
            <span className="w-16 text-right font-mono text-xs text-fg-muted">{T_h} K</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="w-20 shrink-0 text-xs text-fg-muted">T_c (冷源)</label>
            <input
              type="range"
              min={200}
              max={T_h - 50}
              step={10}
              value={T_c}
              onChange={(e) => setT_c(Number(e.target.value))}
              className="flex-1 accent-blue-500"
            />
            <span className="w-16 text-right font-mono text-xs text-fg-muted">{T_c} K</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="w-20 shrink-0 text-xs text-fg-muted">V_max/V_min</label>
            <input
              type="range"
              min={2}
              max={8}
              step={0.5}
              value={V_max}
              onChange={(e) => setV_max(Number(e.target.value))}
              className="flex-1 accent-purple-500"
            />
            <span className="w-16 text-right font-mono text-xs text-fg-muted">×{V_max.toFixed(1)}</span>
          </div>
        </div>

        <div className="rounded-xl border border-fg-disabled/30 bg-bg-panel/50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-fg-secondary">卡诺循环参数</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-fg-muted">热效率 η</span>
              <span className="font-mono text-accent-cool">{(efficiency * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">热源温度 T_h</span>
              <span className="font-mono text-fg-primary">{T_h} K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">冷源温度 T_c</span>
              <span className="font-mono text-fg-primary">{T_c} K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">体积比</span>
              <span className="font-mono text-fg-primary">1 : {V_max.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-accent-cool/20 bg-accent-cool/5 p-3">
        <p className="text-xs text-fg-secondary leading-relaxed">
          <span className="font-medium text-accent-cool">卡诺循环：</span>
          由法国工程师萨迪·卡诺于 1824 年提出，是最理想的热力学循环。
          由两个等温过程和两个绝热过程组成，其效率仅取决于热源和冷源的温度，
          是所有热机效率的理论上限。PV 图中闭合曲线的面积等于一个循环所做的净功。
        </p>
      </div>
    </div>
  );
}
