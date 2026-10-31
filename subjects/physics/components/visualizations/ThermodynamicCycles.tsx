"use client";

import { useState, useMemo, useId } from "react";
import { cn } from "@/subjects/physics/lib/cn";
import { ZoomableExperimentDiagram } from "./ZoomableExperimentDiagram";

import {
  carnotCyclePoints,
  isothermalPath,
  adiabaticPath,
  carnotEnergy,
  type CarnotParams,
} from "./experiment-models";

const SVG_W = 700;
const SVG_H = 400;
const PAD = { left: 60, right: 40, top: 40, bottom: 60 };
const PLOT_W = SVG_W - PAD.left - PAD.right;
const PLOT_H = SVG_H - PAD.top - PAD.bottom;

interface ThermodynamicCyclesProps {
  className?: string;
}

export function ThermodynamicCycles({ className }: ThermodynamicCyclesProps) {
  const [T_h, setT_h] = useState(600);
  const [T_c, setT_c] = useState(300);
  const [V_max, setV_max] = useState(4);
  const gradientId = useId();
  const fieldId = useId();

  const params: CarnotParams = useMemo(
    () => ({
      T_h,
      T_c,
      V_a: 0.001,
      V_b: 0.001 * V_max,
      n: 1,
    }),
    [T_h, T_c, V_max]
  );

  const points = useMemo(() => carnotCyclePoints(params), [params]);

  const allVols = points.map((p) => p.x);
  const vMin = Math.min(...allVols) * 0.8;
  const vMax = Math.max(...allVols) * 1.2;

  const ab = useMemo(
    () => isothermalPath(params.V_a, params.V_b, points[0]!.y, 100),
    [params, points]
  );
  const bc = useMemo(() => adiabaticPath(points[1]!.x, points[2]!.x, points[1]!.y, 100), [points]);
  const cd = useMemo(() => isothermalPath(points[2]!.x, points[3]!.x, points[2]!.y, 100), [points]);
  const da = useMemo(() => adiabaticPath(points[3]!.x, points[0]!.x, points[3]!.y, 100), [points]);

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
    return pts
      .map(
        (pt, i) => `${i === 0 ? "M" : "L"} ${toSvgX(pt.v).toFixed(1)} ${toSvgY(pt.p).toFixed(1)}`
      )
      .join(" ");
  }

  const cyclePathD = buildPathD([...ab, ...bc.slice(1), ...cd.slice(1), ...da.slice(1)]) + " Z";

  const energy = carnotEnergy(params);
  const efficiency = energy.efficiency;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <ZoomableExperimentDiagram
        title="卡诺循环 PV 图"
        viewBoxWidth={SVG_W}
        viewBoxHeight={SVG_H}
        minimumFontSize={9}
      >
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          role="img"
          aria-label="理想气体可逆卡诺循环压强体积图，A到B到C到D顺时针"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect width={SVG_W} height={SVG_H} fill="#0a0a14" />

          {Array.from({ length: 6 }).map((_, i) => {
            const x = PAD.left + (i / 5) * PLOT_W;
            return (
              <g key={`gx-${i}`}>
                <line
                  x1={x}
                  y1={PAD.top}
                  x2={x}
                  y2={PAD.top + PLOT_H}
                  stroke="#1a1a2e"
                  strokeWidth={0.5}
                />
                <text
                  x={x}
                  y={SVG_H - 20}
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {(1000 * (vMin + (i / 5) * (vMax - vMin))).toFixed(1)}
                </text>
              </g>
            );
          })}
          {Array.from({ length: 5 }).map((_, i) => {
            const y = PAD.top + (i / 4) * PLOT_H;
            return (
              <g key={`gy-${i}`}>
                <line
                  x1={PAD.left}
                  y1={y}
                  x2={PAD.left + PLOT_W}
                  y2={y}
                  stroke="#1a1a2e"
                  strokeWidth={0.5}
                />
                <text
                  x={PAD.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#9ca3af"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {((pMax - (i / 4) * (pMax - pMin)) / 1e5).toFixed(1)}
                </text>
              </g>
            );
          })}

          <path d={cyclePathD} fill={`url(#${gradientId})`} stroke="none" />

          <path d={buildPathD(ab)} fill="none" stroke="#ef4444" strokeWidth={2} />
          <path d={buildPathD(bc)} fill="none" stroke="#3b82f6" strokeWidth={2} />
          <path d={buildPathD(cd)} fill="none" stroke="#f97316" strokeWidth={2} />
          <path d={buildPathD(da)} fill="none" stroke="#a855f7" strokeWidth={2} />

          {points.map((pt) => (
            <g key={pt.label}>
              <circle
                cx={toSvgX(pt.x)}
                cy={toSvgY(pt.y)}
                r={5}
                fill="#fff"
                fillOpacity={0.2}
                stroke="#fff"
                strokeWidth={1}
              />
              <text
                x={toSvgX(pt.x) + 10}
                y={toSvgY(pt.y) - 8}
                fill="#f5f6fa"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="700"
              >
                {pt.label}
              </text>
            </g>
          ))}

          <text
            x={PAD.left + PLOT_W / 2}
            y={SVG_H - 4}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="10"
            fontFamily="monospace"
          >
            体积 V (L)
          </text>
          <text
            x={14}
            y={PAD.top + PLOT_H / 2}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="10"
            fontFamily="monospace"
            transform={`rotate(-90, 14, ${PAD.top + PLOT_H / 2})`}
          >
            压强 P (bar)
          </text>
        </svg>
      </ZoomableExperimentDiagram>

      <div className="flex flex-wrap items-center gap-4">
        {[
          { color: "#ef4444", label: "等温膨胀 (A→B)" },
          { color: "#3b82f6", label: "绝热膨胀 (B→C)" },
          { color: "#f97316", label: "等温压缩 (C→D)" },
          { color: "#a855f7", label: "绝热压缩 (D→A)" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="inline-block h-0.5 w-4 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-fg-muted text-xs">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="border-accent-cool/20 bg-accent-cool/5 rounded-lg border px-4 py-2">
        <p className="text-accent-cool font-mono text-xs">
          η = 1 − T_c/T_h = 1 − {T_c}/{T_h} = {(efficiency * 100).toFixed(1)}%
        </p>
        <p className="text-accent-cool mt-1 font-mono text-xs">
          Q_h = {energy.heatIn.toFixed(1)} J · |Q_c| = {energy.heatOut.toFixed(1)} J · W ={" "}
          {energy.work.toFixed(1)} J
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border-fg-disabled/30 bg-bg-panel/50 space-y-3 rounded-xl border p-4">
          <h3 className="text-fg-secondary text-sm font-semibold">参数调节</h3>
          <div className="flex items-center gap-3">
            <label htmlFor={`${fieldId}-hot`} className="text-fg-muted w-20 shrink-0 text-xs">
              T_h (热源)
            </label>
            <input
              type="range"
              id={`${fieldId}-hot`}
              min={400}
              max={1000}
              step={10}
              value={T_h}
              onChange={(e) => {
                const next = Number(e.target.value);
                setT_h(next);
                setT_c((current) => Math.min(current, next - 50));
              }}
              className="min-w-0 flex-1 accent-red-500"
            />
            <span className="text-fg-muted w-16 text-right font-mono text-xs">{T_h} K</span>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor={`${fieldId}-cold`} className="text-fg-muted w-20 shrink-0 text-xs">
              T_c (冷源)
            </label>
            <input
              type="range"
              id={`${fieldId}-cold`}
              min={200}
              max={T_h - 50}
              step={10}
              value={T_c}
              onChange={(e) => setT_c(Number(e.target.value))}
              className="min-w-0 flex-1 accent-blue-500"
            />
            <span className="text-fg-muted w-16 text-right font-mono text-xs">{T_c} K</span>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor={`${fieldId}-volume`} className="text-fg-muted w-20 shrink-0 text-xs">
              V_B / V_A
            </label>
            <input
              type="range"
              id={`${fieldId}-volume`}
              min={2}
              max={8}
              step={0.5}
              value={V_max}
              onChange={(e) => setV_max(Number(e.target.value))}
              className="min-w-0 flex-1 accent-purple-500"
            />
            <span className="text-fg-muted w-16 text-right font-mono text-xs">
              ×{V_max.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="border-fg-disabled/30 bg-bg-panel/50 space-y-3 rounded-xl border p-4">
          <h3 className="text-fg-secondary text-sm font-semibold">卡诺循环参数</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-fg-muted">热效率 η</span>
              <span className="text-accent-cool font-mono">{(efficiency * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">热源温度 T_h</span>
              <span className="text-fg-primary font-mono">{T_h} K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">冷源温度 T_c</span>
              <span className="text-fg-primary font-mono">{T_c} K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">高温等温体积比</span>
              <span className="text-fg-primary font-mono">1 : {V_max.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-accent-cool/20 bg-accent-cool/5 rounded-lg border p-3">
        <p className="text-fg-secondary text-xs leading-relaxed">
          <span className="text-accent-cool font-medium">卡诺循环：</span>
          源自卡诺 1824 年对热机的研究。本图采用 1 mol 理想气体、固定 γ=1.4 的可逆模型。
          由两个等温过程和两个绝热过程组成，其效率仅取决于热源和冷源的温度，
          是工作在同一对恒温热库之间热机的效率上限。温度使用 K；PV 图的顺时针面积等于循环对外净功。
        </p>
      </div>
    </div>
  );
}
