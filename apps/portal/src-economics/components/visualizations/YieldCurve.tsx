"use client";

import { useState, useMemo } from "react";

type CurveShape = "normal" | "inverted" | "flat";

interface YieldPoint {
  label: string;
  months: number;
  normal: number;
  inverted: number;
  flat: number;
}

const YIELD_DATA: YieldPoint[] = [
  { label: "3M", months: 3, normal: 4.5, inverted: 5.3, flat: 4.0 },
  { label: "6M", months: 6, normal: 4.45, inverted: 5.1, flat: 4.0 },
  { label: "1Y", months: 12, normal: 4.35, inverted: 4.9, flat: 4.0 },
  { label: "2Y", months: 24, normal: 4.2, inverted: 4.8, flat: 4.0 },
  { label: "5Y", months: 60, normal: 4.15, inverted: 4.2, flat: 4.0 },
  { label: "10Y", months: 120, normal: 4.0, inverted: 3.8, flat: 4.0 },
  { label: "30Y", months: 360, normal: 4.1, inverted: 3.9, flat: 4.0 },
];

const SHAPE_CONFIG: Record<CurveShape, { color: string; label: string; description: string; historical: string }> = {
  normal: {
    color: "#6bae8a",
    label: "正常曲线",
    description:
      "长期利率高于短期利率，反映投资者对持有更长期限债券要求更高的风险溢价。这是最常见、最健康的收益率曲线形态，表明经济处于扩张期，市场预期温和通胀。",
    historical:
      "典型经济扩张期常态。2004-2005年美国经济稳步增长期间，收益率曲线呈现正常向上倾斜。",
  },
  inverted: {
    color: "#d85a5a",
    label: "倒挂曲线",
    description:
      "短期利率高于长期利率，这是经济衰退的强烈预警信号。倒挂意味着市场预期央行将在未来降息（因经济放缓），投资者争相锁定长期收益，推高长期债券价格、压低其收益率。",
    historical:
      "2006年7月，美国2年期与10年期收益率曲线倒挂，随后2007-2008年全球金融危机爆发。历史上每次衰退前都出现过倒挂。",
  },
  flat: {
    color: "#e8a840",
    label: "平坦曲线",
    description:
      "各期限利率基本相同，反映市场对经济前景不确定。通常是曲线从正常转向倒挂（或反之）的过渡阶段，也可能出现在央行大量购买长期债券（量化宽松）时期。",
    historical:
      "2015-2016年，美联储加息但全球央行大规模QE压低长端利率，曲线趋于平坦。",
  },
};

const SVG_W = 600;
const SVG_H = 400;
const PAD_L = 55;
const PAD_R = 30;
const PAD_T = 30;
const PAD_B = 50;
const PLOT_W = SVG_W - PAD_L - PAD_R;
const PLOT_H = SVG_H - PAD_T - PAD_B;
const Y_MIN = 3.2;
const Y_MAX = 5.8;
const Y_STEP = 0.4;

function toX(months: number): number {
  const logMin = Math.log(3);
  const logMax = Math.log(360);
  const logVal = Math.log(Math.max(months, 3));
  return PAD_L + ((logVal - logMin) / (logMax - logMin)) * PLOT_W;
}

function toY(yieldPct: number): number {
  return PAD_T + PLOT_H - ((yieldPct - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;
}

function buildPathD(shape: CurveShape): string {
  const points = YIELD_DATA.map((d) => ({
    x: toX(d.months),
    y: toY(d[shape]),
  }));
  const first = points[0]!;
  let path = `M ${first.x} ${first.y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]!;
    const curr = points[i]!;
    const cpx1 = prev.x + (curr.x - prev.x) * 0.45;
    const cpx2 = prev.x + (curr.x - prev.x) * 0.55;
    path += ` C ${cpx1} ${prev.y} ${cpx2} ${curr.y} ${curr.x} ${curr.y}`;
  }
  return path;
}

function buildAreaD(shape: CurveShape): string {
  const pathD = buildPathD(shape);
  const lastPoint = YIELD_DATA[YIELD_DATA.length - 1]!;
  const firstPoint = YIELD_DATA[0]!;
  const lastX = toX(lastPoint.months);
  const firstX = toX(firstPoint.months);
  const baseY = PAD_T + PLOT_H;
  return `${pathD} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;
}

function yTicks(): number[] {
  const ticks: number[] = [];
  for (let v = Y_MIN; v <= Y_MAX + 0.01; v += Y_STEP) {
    ticks.push(Math.round(v * 10) / 10);
  }
  return ticks;
}

export function YieldCurve() {
  const [shape, setShape] = useState<CurveShape>("normal");
  const config = SHAPE_CONFIG[shape];
  const pathD = useMemo(() => buildPathD(shape), [shape]);
  const areaD = useMemo(() => buildAreaD(shape), [shape]);
  const ticks = useMemo(() => yTicks(), []);

  return (
    <div className="chart-container">
      <h3 className="font-display text-fg-primary mb-4 text-lg font-semibold">
        收益率曲线（Yield Curve）
      </h3>

      <div className="mb-4 flex flex-wrap gap-2">
        {(["normal", "inverted", "flat"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={`sim-button ${shape === s ? "!border-accent-gold/60 !bg-accent-gold/20" : ""}`}
          >
            {SHAPE_CONFIG[s].label}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full"
        style={{ maxWidth: 600 }}
        role="img"
        aria-label={`收益率曲线图：当前为${config.label}`}
      >
        <defs>
          <linearGradient id="yc-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={config.color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={config.color} stopOpacity="0.01" />
          </linearGradient>
          <filter id="yc-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {ticks.map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
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
                {v.toFixed(1)}%
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

        {YIELD_DATA.map((d) => {
          const x = toX(d.months);
          return (
            <g key={d.label}>
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
                {d.label}
              </text>
            </g>
          );
        })}

        <text
          x={PAD_L + PLOT_W / 2}
          y={SVG_H - 5}
          textAnchor="middle"
          fill="rgba(200,164,90,0.4)"
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.08em"
        >
          MATURITY
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
          YIELD %
        </text>

        <path d={areaD} fill="url(#yc-area-grad)" />
        <path
          d={pathD}
          fill="none"
          stroke={config.color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#yc-glow)"
        >
          <animate
            attributeName="d"
            dur="0.5s"
            fill="freeze"
            begin="0s"
          />
        </path>

        {YIELD_DATA.map((d) => {
          const x = toX(d.months);
          const y = toY(d[shape]);
          return (
            <g key={`dot-${d.label}`}>
              <circle cx={x} cy={y} r={4} fill={config.color} opacity={0.9} />
              <circle
                cx={x}
                cy={y}
                r={7}
                fill={config.color}
                opacity={0.15}
              />
              <text
                x={x}
                y={y - 12}
                textAnchor="middle"
                fill={config.color}
                fontSize={10}
                fontFamily="var(--font-mono)"
                fontWeight={600}
              >
                {d[shape].toFixed(1)}
              </text>
            </g>
          );
        })}
      </svg>

      <div
        className="mt-4 rounded-lg border p-4"
        style={{
          borderColor: `${config.color}30`,
          background: `linear-gradient(90deg, ${config.color}08 0%, transparent 60%)`,
        }}
      >
        <div className="mb-2 flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: config.color }}
          />
          <span
            className="font-mono text-xs tracking-wider uppercase"
            style={{ color: config.color }}
          >
            {config.label}
          </span>
        </div>
        <p className="text-fg-secondary mb-3 text-sm leading-relaxed">
          {config.description}
        </p>
        <div className="border-border-faint border-t pt-3">
          <p className="text-fg-muted text-xs leading-relaxed">
            <span className="font-mono text-[10px] tracking-wider text-accent-gold uppercase">
              历史案例：
            </span>
            {config.historical}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        {YIELD_DATA.slice(0, 3).map((d) => (
          <div
            key={`spread-${d.label}`}
            className="bg-bg-elevated border-border-faint rounded border p-2"
          >
            <div className="text-fg-muted font-mono text-[9px] tracking-wider uppercase">
              {d.label}
            </div>
            <div
              className="font-display text-lg font-semibold"
              style={{ color: config.color }}
            >
              {d[shape].toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
