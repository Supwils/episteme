"use client";

import { useState, useMemo, useCallback } from "react";

const SVG_W = 600;
const SVG_H = 400;
const PAD_L = 55;
const PAD_R = 30;
const PAD_T = 30;
const PAD_B = 50;
const PLOT_W = SVG_W - PAD_L - PAD_R;
const PLOT_H = SVG_H - PAD_T - PAD_B;

const U_MIN = 2;
const U_MAX = 12;
const I_MIN = -1;
const I_MAX = 15;

const NAIRU = 5.5;

interface HistoricalPoint {
  label: string;
  year: string;
  unemployment: number;
  inflation: number;
  color: string;
  description: string;
}

const HISTORICAL: HistoricalPoint[] = [
  {
    label: "1960s",
    year: "1960-69",
    unemployment: 4.5,
    inflation: 2.5,
    color: "#6bae8a",
    description: "经济繁荣期，低失业率伴随温和通胀，符合原始菲利普斯曲线预测。",
  },
  {
    label: "1970s",
    year: "1973-75",
    unemployment: 8.5,
    inflation: 12,
    color: "#d85a5a",
    description: "石油危机引发滞胀：高失业与高通胀并存，菲利普斯曲线失效，推动了理性预期革命。",
  },
  {
    label: "2000s",
    year: "2000-07",
    unemployment: 4.6,
    inflation: 2.8,
    color: "#e8a840",
    description: "大缓和时期：全球化与央行信誉压低通胀预期，失业与通胀双低。",
  },
  {
    label: "2020s",
    year: "2020-23",
    unemployment: 6.2,
    inflation: 8,
    color: "#a855f7",
    description: "新冠疫情冲击：供应链中断与大规模财政刺激推高通胀，失业率先升后降。",
  },
];

function toX(u: number): number {
  return PAD_L + ((u - U_MIN) / (U_MAX - U_MIN)) * PLOT_W;
}

function toY(i: number): number {
  return PAD_T + PLOT_H - ((i - I_MIN) / (I_MAX - I_MIN)) * PLOT_H;
}

function shortRunInflation(u: number, shift: number): number {
  const natural = 3;
  const steepness = 18;
  return natural + steepness / (u - 1.5) + shift;
}

function buildShortRunPath(shift: number): string {
  const points: { x: number; y: number }[] = [];
  for (let u = U_MIN + 0.5; u <= U_MAX; u += 0.25) {
    const inf = shortRunInflation(u, shift);
    if (inf >= I_MIN && inf <= I_MAX) {
      points.push({ x: toX(u), y: toY(inf) });
    }
  }
  if (points.length < 2) return "";
  const first = points[0]!;
  let path = `M ${first.x} ${first.y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]!;
    const curr = points[i]!;
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
    const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
    path += ` C ${cpx1} ${prev.y} ${cpx2} ${curr.y} ${curr.x} ${curr.y}`;
  }
  return path;
}

function xTicks(): number[] {
  const ticks: number[] = [];
  for (let v = U_MIN; v <= U_MAX + 0.01; v += 2) {
    ticks.push(v);
  }
  return ticks;
}

function yTicks(): number[] {
  const ticks: number[] = [];
  for (let v = 0; v <= I_MAX + 0.01; v += 3) {
    ticks.push(v);
  }
  return ticks;
}

export function PhillipsCurve() {
  const [policy, setPolicy] = useState(0);
  const [showLongRun, setShowLongRun] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<HistoricalPoint | null>(null);

  const pathD = useMemo(() => buildShortRunPath(policy), [policy]);
  const nairuX = toX(NAIRU);
  const xTicksArr = useMemo(() => xTicks(), []);
  const yTicksArr = useMemo(() => yTicks(), []);

  const currentU = NAIRU;

  const currentInflation = useMemo(
    () => shortRunInflation(currentU, policy),
    [currentU, policy],
  );

  const policyLabel = useMemo(() => {
    if (policy < -2) return "宽松政策";
    if (policy < 0) return "偏宽松";
    if (policy === 0) return "中性";
    if (policy < 2) return "偏紧缩";
    return "紧缩政策";
  }, [policy]);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPolicy(parseFloat(e.target.value));
    },
    [],
  );

  return (
    <div className="chart-container">
      <h3 className="font-display text-fg-primary mb-4 text-lg font-semibold">
        菲利普斯曲线（Phillips Curve）
      </h3>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showLongRun}
            onChange={() => setShowLongRun(!showLongRun)}
            className="accent-accent-gold"
          />
          <span className="text-fg-secondary font-mono text-xs">
            显示长期菲利普斯曲线
          </span>
        </label>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <span className="text-fg-muted font-mono text-[10px] tracking-wider uppercase">
          紧缩
        </span>
        <input
          type="range"
          min={-5}
          max={5}
          step={0.1}
          value={policy}
          onChange={handleSliderChange}
          className="slider-accent flex-1"
          aria-label="货币政策调节"
        />
        <span className="text-fg-muted font-mono text-[10px] tracking-wider uppercase">
          宽松
        </span>
      </div>
      <div className="mb-4 text-center">
        <span className="text-fg-secondary font-mono text-xs">
          货币政策：
        </span>
        <span className="text-accent-gold font-mono text-xs font-semibold">
          {policyLabel}
        </span>
        <span className="text-fg-muted ml-2 font-mono text-[10px]">
          (偏移 {policy > 0 ? "+" : ""}
          {policy.toFixed(1)})
        </span>
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full"
        style={{ maxWidth: 600 }}
        role="img"
        aria-label="菲利普斯曲线图"
      >
        <defs>
          <linearGradient id="pc-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
          </linearGradient>
          <filter id="pc-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pc-dot-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {yTicksArr.map((v) => {
          const y = toY(v);
          return (
            <g key={`yt-${v}`}>
              <line
                x1={PAD_L}
                y1={y}
                x2={PAD_L + PLOT_W}
                y2={y}
                stroke="rgba(200,164,90,0.07)"
                strokeWidth={1}
              />
              <text
                x={PAD_L - 8}
                y={y + 3.5}
                textAnchor="end"
                fill="rgba(200,164,90,0.45)"
                fontSize={10}
                fontFamily="var(--font-mono)"
              >
                {v}%
              </text>
            </g>
          );
        })}

        {xTicksArr.map((v) => {
          const x = toX(v);
          return (
            <g key={`xt-${v}`}>
              <line
                x1={x}
                y1={PAD_T}
                x2={x}
                y2={PAD_T + PLOT_H}
                stroke="rgba(200,164,90,0.04)"
                strokeWidth={1}
              />
              <text
                x={x}
                y={PAD_T + PLOT_H + 18}
                textAnchor="middle"
                fill="rgba(200,164,90,0.55)"
                fontSize={10}
                fontFamily="var(--font-mono)"
              >
                {v}%
              </text>
            </g>
          );
        })}

        <line
          x1={PAD_L}
          y1={PAD_T + PLOT_H}
          x2={PAD_L + PLOT_W}
          y2={PAD_T + PLOT_H}
          stroke="rgba(200,164,90,0.2)"
          strokeWidth={1}
        />
        <line
          x1={PAD_L}
          y1={PAD_T}
          x2={PAD_L}
          y2={PAD_T + PLOT_H}
          stroke="rgba(200,164,90,0.2)"
          strokeWidth={1}
        />

        <text
          x={PAD_L + PLOT_W / 2}
          y={SVG_H - 5}
          textAnchor="middle"
          fill="rgba(200,164,90,0.4)"
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.08em"
        >
          失业率 UNEMPLOYMENT %
        </text>
        <text
          x={12}
          y={PAD_T + PLOT_H / 2}
          textAnchor="middle"
          fill="rgba(200,164,90,0.4)"
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.08em"
          transform={`rotate(-90, 12, ${PAD_T + PLOT_H / 2})`}
        >
          通胀率 INFLATION %
        </text>

        {showLongRun && (
          <line
            x1={nairuX}
            y1={PAD_T}
            x2={nairuX}
            y2={PAD_T + PLOT_H}
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray="8 4"
            opacity={0.7}
          />
        )}

        {showLongRun && (
          <g>
            <rect
              x={nairuX - 28}
              y={PAD_T + 4}
              width={56}
              height={18}
              rx={3}
              fill="rgba(239,68,68,0.15)"
              stroke="rgba(239,68,68,0.3)"
              strokeWidth={0.5}
            />
            <text
              x={nairuX}
              y={PAD_T + 16}
              textAnchor="middle"
              fill="#ef4444"
              fontSize={9}
              fontFamily="var(--font-mono)"
              fontWeight={600}
            >
              NAIRU {NAIRU}%
            </text>
          </g>
        )}

        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#pc-glow)"
          />
        )}

        {HISTORICAL.map((pt) => {
          const cx = toX(pt.unemployment);
          const cy = toY(pt.inflation);
          const isHovered = hoveredPoint?.label === pt.label;
          return (
            <g
              key={pt.label}
              onMouseEnter={() => setHoveredPoint(pt)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={cx}
                cy={cy}
                r={isHovered ? 10 : 7}
                fill={pt.color}
                opacity={0.15}
              />
              <circle
                cx={cx}
                cy={cy}
                r={isHovered ? 6 : 4.5}
                fill={pt.color}
                opacity={0.9}
              />
              <text
                x={cx}
                y={cy - (isHovered ? 16 : 12)}
                textAnchor="middle"
                fill={pt.color}
                fontSize={isHovered ? 11 : 10}
                fontFamily="var(--font-mono)"
                fontWeight={600}
              >
                {pt.label}
              </text>
            </g>
          );
        })}

        <circle
          cx={toX(currentU)}
          cy={toY(currentInflation)}
          r={8}
          fill="#3b82f6"
          opacity={0.2}
          filter="url(#pc-dot-glow)"
        >
          <animate
            attributeName="r"
            values="8;12;8"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.2;0.1;0.2"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx={toX(currentU)}
          cy={toY(currentInflation)}
          r={5}
          fill="#3b82f6"
        >
          <animate
            attributeName="cx"
            dur="0.3s"
            fill="freeze"
          />
          <animate
            attributeName="cy"
            dur="0.3s"
            fill="freeze"
          />
        </circle>
        <text
          x={toX(currentU) + 12}
          y={toY(currentInflation) - 8}
          fill="#3b82f6"
          fontSize={10}
          fontFamily="var(--font-mono)"
          fontWeight={600}
        >
          当前 ({currentU.toFixed(1)}%, {currentInflation.toFixed(1)}%)
        </text>
      </svg>

      {hoveredPoint && (
        <div
          className="mt-4 rounded-lg border p-4 transition-all duration-200"
          style={{
            borderColor: `${hoveredPoint.color}30`,
            background: `linear-gradient(90deg, ${hoveredPoint.color}08 0%, transparent 60%)`,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: hoveredPoint.color }}
            />
            <span
              className="font-mono text-xs tracking-wider uppercase"
              style={{ color: hoveredPoint.color }}
            >
              {hoveredPoint.label}（{hoveredPoint.year}）
            </span>
          </div>
          <div className="text-fg-secondary mb-1 flex gap-4 font-mono text-xs">
            <span>
              失业率：{hoveredPoint.unemployment}%
            </span>
            <span>
              通胀率：{hoveredPoint.inflation}%
            </span>
          </div>
          <p className="text-fg-secondary mt-2 text-sm leading-relaxed">
            {hoveredPoint.description}
          </p>
        </div>
      )}

      {!hoveredPoint && (
        <div className="mt-4 rounded-lg border border-border-faint bg-bg-panel p-4">
          <p className="text-fg-muted text-xs leading-relaxed">
            <span className="font-mono text-[10px] tracking-wider text-accent-gold uppercase">
              提示：
            </span>
            拖动上方滑块观察货币政策如何使经济沿短期菲利普斯曲线移动。
            鼠标悬停在历史数据点上查看详细信息。
            长期菲利普斯曲线为垂直线，表明长期内失业率回归自然失业率（NAIRU），
            货币政策无法永久降低失业率。
          </p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {HISTORICAL.map((pt) => (
          <div
            key={`stat-${pt.label}`}
            className="border-border-faint bg-bg-elevated rounded border p-2 text-center"
            onMouseEnter={() => setHoveredPoint(pt)}
            onMouseLeave={() => setHoveredPoint(null)}
            style={{ cursor: "pointer" }}
          >
            <div
              className="font-mono text-[9px] tracking-wider uppercase"
              style={{ color: pt.color }}
            >
              {pt.label}
            </div>
            <div className="text-fg-secondary font-mono text-[10px]">
              U: {pt.unemployment}% / I: {pt.inflation}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
