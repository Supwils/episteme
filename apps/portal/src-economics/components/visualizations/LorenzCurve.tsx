"use client";

import { useState, useMemo, type ReactNode } from "react";

interface CountryData {
  name: string;
  nameEn: string;
  gini: number;
  color: string;
}

const COUNTRIES: CountryData[] = [
  { name: "瑞典", nameEn: "Sweden", gini: 0.25, color: "#6bae8a" },
  { name: "德国", nameEn: "Germany", gini: 0.31, color: "#5a9ad8" },
  { name: "美国", nameEn: "US", gini: 0.39, color: "#c8a45a" },
  { name: "巴西", nameEn: "Brazil", gini: 0.53, color: "#d47850" },
  { name: "南非", nameEn: "South Africa", gini: 0.63, color: "#d85a5a" },
];

const SVG_SIZE = 500;
const PAD = 60;
const PLOT = SVG_SIZE - PAD * 2;

function toSvgX(v: number): number {
  return PAD + v * PLOT;
}

function toSvgY(v: number): number {
  return PAD + PLOT - v * PLOT;
}

function lorenzPoints(gini: number): [number, number][] {
  const alpha = 1 / (1 - gini * 0.8);
  const pts: [number, number][] = [];
  for (let i = 0; i <= 100; i++) {
    const x = i / 100;
    pts.push([x, Math.pow(x, alpha)]);
  }
  return pts;
}

function buildPath(points: [number, number][]): string {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${toSvgX(p[0]).toFixed(1)},${toSvgY(p[1]).toFixed(1)}`)
    .join(" ");
}

function buildAreaPath(gini: number): string {
  const pts = lorenzPoints(gini);
  const lorenzPath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${toSvgX(p[0]).toFixed(1)},${toSvgY(p[1]).toFixed(1)}`)
    .join(" ");
  return `${lorenzPath} L${toSvgX(1).toFixed(1)},${toSvgY(1).toFixed(1)} Z`;
}

function inequalityLabel(gini: number): string {
  if (gini < 0.2) return "绝对平等";
  if (gini < 0.3) return "比较平等";
  if (gini < 0.4) return "相对合理";
  if (gini < 0.5) return "差距较大";
  return "差距悬殊";
}

function lerpColor(gini: number): string {
  const t = Math.min(1, Math.max(0, (gini - 0.1) / 0.7));
  const r = Math.round(59 + t * (239 - 59));
  const g = Math.round(130 + t * (68 - 130));
  const b = Math.round(246 + t * (68 - 246));
  return `rgb(${r},${g},${b})`;
}

export function LorenzCurve() {
  const [gini, setGini] = useState(0.39);
  const [selectedCountry, setSelectedCountry] = useState<string | null>("美国");

  const curveColor = useMemo(() => lerpColor(gini), [gini]);
  const points = useMemo(() => lorenzPoints(gini), [gini]);
  const curvePath = useMemo(() => buildPath(points), [points]);
  const areaPath = useMemo(() => buildAreaPath(gini), [gini]);

  const selectCountry = (c: CountryData) => {
    setSelectedCountry(c.name);
    setGini(c.gini);
  };

  const gridLines = useMemo(() => {
    const lines: ReactNode[] = [];
    for (let i = 1; i <= 4; i++) {
      const v = i / 4;
      lines.push(
        <line
          key={`h-${i}`}
          x1={PAD}
          y1={toSvgY(v)}
          x2={PAD + PLOT}
          y2={toSvgY(v)}
          stroke="rgba(200,164,90,0.06)"
          strokeWidth={1}
        />,
        <line
          key={`v-${i}`}
          x1={toSvgX(v)}
          y1={PAD}
          x2={toSvgX(v)}
          y2={PAD + PLOT}
          stroke="rgba(200,164,90,0.06)"
          strokeWidth={1}
        />
      );
    }
    return lines;
  }, []);

  const countryPoints = useMemo(() =>
    COUNTRIES.map((c) => {
      const pts = lorenzPoints(c.gini);
      const mid = pts[50] ?? [0.5, 0.5];
      return { ...c, midX: toSvgX(mid[0]), midY: toSvgY(mid[1]) };
    }),
  []);

  return (
    <div className="chart-container">
      <div className="relative z-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="font-display text-fg-primary text-lg font-semibold">
            洛伦兹曲线与基尼系数
          </h3>
          <div className="flex items-baseline gap-2">
            <span
              className="font-display text-[2.4rem] font-bold leading-none"
              style={{ color: curveColor }}
            >
              {gini.toFixed(2)}
            </span>
            <span className="text-fg-muted font-mono text-[10px] uppercase tracking-wider">
              {inequalityLabel(gini)}
            </span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          className="w-full"
          style={{ maxWidth: 500 }}
          role="img"
          aria-label={`洛伦兹曲线图，基尼系数 ${gini.toFixed(2)}，${inequalityLabel(gini)}`}
        >
          <defs>
            <linearGradient id="lorenz-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={curveColor} stopOpacity={0.15} />
              <stop offset="100%" stopColor={curveColor} stopOpacity={0.03} />
            </linearGradient>
          </defs>

          {gridLines}

          <line
            x1={PAD}
            y1={PAD}
            x2={PAD + PLOT}
            y2={PAD + PLOT}
            stroke="rgba(200,164,90,0.2)"
            strokeWidth={1}
            strokeDasharray="6 4"
          />

          <path d={areaPath} fill="url(#area-fill)" />

          <path
            d={curvePath}
            fill="none"
            stroke={curveColor}
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {countryPoints.map((c) => (
            <g key={c.name}>
              <circle
                cx={c.midX}
                cy={c.midY}
                r={selectedCountry === c.name ? 6 : 4}
                fill={c.color}
                stroke={selectedCountry === c.name ? "#f0ece4" : "transparent"}
                strokeWidth={2}
                className="cursor-pointer transition-all"
                onClick={() => selectCountry(c)}
              />
              <text
                x={c.midX + 8}
                y={c.midY - 8}
                fill={c.color}
                fontSize={11}
                fontFamily="var(--font-mono)"
                className="pointer-events-none"
              >
                {c.name}
              </text>
            </g>
          ))}

          <line
            x1={PAD}
            y1={PAD + PLOT}
            x2={PAD + PLOT}
            y2={PAD + PLOT}
            stroke="rgba(200,164,90,0.3)"
            strokeWidth={1.5}
          />
          <line
            x1={PAD}
            y1={PAD}
            x2={PAD}
            y2={PAD + PLOT}
            stroke="rgba(200,164,90,0.3)"
            strokeWidth={1.5}
          />

          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <text
              key={`xl-${v}`}
              x={toSvgX(v)}
              y={PAD + PLOT + 20}
              textAnchor="middle"
              fill="rgba(200,164,90,0.4)"
              fontSize={10}
              fontFamily="var(--font-mono)"
            >
              {(v * 100).toFixed(0)}%
            </text>
          ))}
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <text
              key={`yl-${v}`}
              x={PAD - 10}
              y={toSvgY(v) + 4}
              textAnchor="end"
              fill="rgba(200,164,90,0.4)"
              fontSize={10}
              fontFamily="var(--font-mono)"
            >
              {(v * 100).toFixed(0)}%
            </text>
          ))}

          <text
            x={PAD + PLOT / 2}
            y={PAD + PLOT + 44}
            textAnchor="middle"
            fill="rgba(200,164,90,0.5)"
            fontSize={12}
            fontFamily="var(--font-sans)"
          >
            累计人口百分比
          </text>
          <text
            x={16}
            y={PAD + PLOT / 2}
            textAnchor="middle"
            fill="rgba(200,164,90,0.5)"
            fontSize={12}
            fontFamily="var(--font-sans)"
            transform={`rotate(-90,16,${PAD + PLOT / 2})`}
          >
            累计收入百分比
          </text>

          <text
            x={toSvgX(0.72)}
            y={toSvgY(0.72) - 10}
            fill="rgba(200,164,90,0.3)"
            fontSize={10}
            fontFamily="var(--font-mono)"
            transform={`rotate(-45,${toSvgX(0.72)},${toSvgY(0.72) - 10})`}
          >
            完全平等线
          </text>
          <text
            x={toSvgX(0.55)}
            y={toSvgY(Math.pow(0.55, 1 / (1 - gini * 0.8))) + 18}
            fill={curveColor}
            fontSize={10}
            fontFamily="var(--font-mono)"
            opacity={0.8}
          >
            洛伦兹曲线
          </text>
        </svg>

        <div className="mt-4">
          <label htmlFor="gini-slider" className="data-label block">
            基尼系数: {gini.toFixed(2)}
          </label>
          <input
            id="gini-slider"
            type="range"
            min={0.05}
            max={0.85}
            step={0.01}
            value={gini}
            onChange={(e) => {
              setGini(Number(e.target.value));
              setSelectedCountry(null);
            }}
            className="sim-slider"
          />
          <div className="text-fg-disabled mt-1 flex justify-between font-mono text-[9px]">
            <span>0 (完全平等)</span>
            <span>1 (完全不平等)</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <button
              key={c.name}
              onClick={() => selectCountry(c)}
              className={`sim-button ${selectedCountry === c.name ? "!border-opacity-60" : ""}`}
              style={
                selectedCountry === c.name
                  ? { borderColor: c.color, color: c.color, backgroundColor: `${c.color}15` }
                  : undefined
              }
            >
              {c.name}
              <span className="ml-1 opacity-50">{c.gini.toFixed(2)}</span>
            </button>
          ))}
        </div>

        <div className="border-border-faint mt-4 border-t pt-3">
          <p className="text-fg-muted text-xs leading-relaxed">
            A 区域（洛伦兹曲线与完全平等线之间）越大，不平等程度越高。
            基尼系数 = A / (A + B)。
          </p>
        </div>
      </div>
    </div>
  );
}
