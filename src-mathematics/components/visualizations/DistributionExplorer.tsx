"use client";

import { useState, useMemo, useCallback } from "react";

type DistributionType = "normal" | "uniform" | "exponential" | "binomial";

type DistributionConfig = {
  type: DistributionType;
  label: string;
  labelEn: string;
  color: string;
  colorDim: string;
};

const DISTRIBUTIONS: DistributionConfig[] = [
  { type: "normal", label: "正态分布", labelEn: "Gaussian", color: "#6366f1", colorDim: "#4f46e5" },
  { type: "uniform", label: "均匀分布", labelEn: "Uniform", color: "#22d3ee", colorDim: "#06b6d4" },
  { type: "exponential", label: "指数分布", labelEn: "Exponential", color: "#f472b6", colorDim: "#ec4899" },
  { type: "binomial", label: "二项分布", labelEn: "Binomial", color: "#f59e0b", colorDim: "#d97706" },
];

const REAL_WORLD_EXAMPLES: Record<DistributionType, { title: string; description: string; icon: string }[]> = {
  normal: [
    { title: "身高分布", description: "成年人身高近似服从正态分布，均值约170cm，标准差约7cm", icon: "📏" },
    { title: "考试成绩", description: "大规模标准化考试分数通常呈钟形曲线分布", icon: "📝" },
    { title: "测量误差", description: "重复测量的随机误差服从正态分布（高斯误差定律）", icon: "🔬" },
  ],
  uniform: [
    { title: "掷骰子", description: "每个面出现的概率相等，均为1/6", icon: "🎲" },
    { title: "随机数生成", description: "计算机伪随机数生成器产生[0,1]均匀分布", icon: "💻" },
    { title: "公交到站", description: "若班车严格按时刻表运行，乘客到达时间间隔均匀", icon: "🚌" },
  ],
  exponential: [
    { title: "放射性衰变", description: "原子核衰变等待时间服从指数分布，参数为衰变常数λ", icon: "☢️" },
    { title: "客服等待时间", description: "电话呼叫中心两次来电之间的时间间隔", icon: "📞" },
    { title: "灯泡寿命", description: "电子元件在正常使用期间的故障间隔时间", icon: "💡" },
  ],
  binomial: [
    { title: "抛硬币", description: "抛n次硬币，正面朝上的次数服从B(n, 0.5)", icon: "🪙" },
    { title: "质量检测", description: "抽检n件产品，次品数服从二项分布", icon: "✅" },
    { title: "临床试验", description: "n名患者中有效人数服从B(n, p)，p为有效率", icon: "🏥" },
  ],
};

const SVG_WIDTH = 800;
const SVG_HEIGHT = 360;
const PADDING = { top: 20, right: 30, bottom: 45, left: 55 };
const PLOT_W = SVG_WIDTH - PADDING.left - PADDING.right;
const PLOT_H = SVG_HEIGHT - PADDING.top - PADDING.bottom;

function normalPDF(x: number, mu: number, sigma: number): number {
  const z = (x - mu) / sigma;
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
}

function uniformPDF(x: number, a: number, b: number): number {
  if (x < a || x > b) return 0;
  return 1 / (b - a);
}

function exponentialPDF(x: number, lambda: number): number {
  if (x < 0) return 0;
  return lambda * Math.exp(-lambda * x);
}

function binomialPMF(k: number, n: number, p: number): number {
  if (k < 0 || k > n) return 0;
  const logComb = logFactorial(n) - logFactorial(k) - logFactorial(n - k);
  const result = Math.exp(logComb + k * Math.log(p) + (n - k) * Math.log(1 - p));
  return isFinite(result) ? result : 0;
}

function logFactorial(n: number): number {
  let result = 0;
  for (let i = 2; i <= n; i++) result += Math.log(i);
  return result;
}

function normalCDF(x: number, mu: number, sigma: number): number {
  const z = (x - mu) / sigma;
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function erf(x: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const t = 1 / (1 + p * Math.abs(x));
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

type Range = { min: number; max: number };

function getDistributionRange(type: DistributionType, params: DistributionParams): Range {
  switch (type) {
    case "normal": return { min: params.mu - 4 * params.sigma, max: params.mu + 4 * params.sigma };
    case "uniform": return { min: params.a - 0.5, max: params.b + 0.5 };
    case "exponential": return { min: 0, max: 5 / params.lambda };
    case "binomial": return { min: 0, max: params.n };
  }
}

function getDistributionPoints(type: DistributionType, params: DistributionParams, range: Range, count: number): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const step = (range.max - range.min) / count;

  if (type === "binomial") {
    for (let k = 0; k <= params.n; k++) {
      points.push({ x: k, y: binomialPMF(k, params.n, params.p) });
    }
    return points;
  }

  for (let i = 0; i <= count; i++) {
    const x = range.min + i * step;
    let y: number;
    switch (type) {
      case "normal": y = normalPDF(x, params.mu, params.sigma); break;
      case "uniform": y = uniformPDF(x, params.a, params.b); break;
      case "exponential": y = exponentialPDF(x, params.lambda); break;
      default: y = 0;
    }
    points.push({ x, y });
  }
  return points;
}

type DistributionParams = {
  mu: number;
  sigma: number;
  a: number;
  b: number;
  lambda: number;
  n: number;
  p: number;
};

const INITIAL_PARAMS: DistributionParams = { mu: 0, sigma: 1, a: 0, b: 1, lambda: 1, n: 20, p: 0.5 };

function Slider({
  label, value, min, max, step, onChange, color, unit,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; color: string; unit?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-fg-muted w-16 text-right font-mono text-[11px] tracking-wider">
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, #1a1a30 ${((value - min) / (max - min)) * 100}%, #1a1a30 100%)`,
          accentColor: color,
        }}
      />
      <span className="text-fg-primary w-14 text-right font-mono text-[12px] tabular-nums">
        {step < 1 ? value.toFixed(step < 0.1 ? 2 : 1) : value}
        {unit}
      </span>
    </div>
  );
}

export default function DistributionExplorer() {
  const [activeType, setActiveType] = useState<DistributionType>("normal");
  const [params, setParams] = useState<DistributionParams>(INITIAL_PARAMS);
  const [showComparison, setShowComparison] = useState(false);
  const [sigmaRegion, setSigmaRegion] = useState<1 | 2 | 3>(1);

  const updateParam = useCallback(<K extends keyof DistributionParams>(key: K, value: DistributionParams[K]) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const activeConfig = DISTRIBUTIONS.find((d) => d.type === activeType)!;
  const color = activeConfig.color;

  const range = useMemo(() => getDistributionRange(activeType, params), [activeType, params]);
  const points = useMemo(() => getDistributionPoints(activeType, params, range, 200), [activeType, params, range]);

  const maxY = useMemo(() => {
    const peak = Math.max(...points.map((p) => p.y));
    return peak * 1.15 || 1;
  }, [points]);

  const toSvgX = useCallback((x: number) => PADDING.left + ((x - range.min) / (range.max - range.min)) * PLOT_W, [range]);
  const toSvgY = useCallback((y: number) => PADDING.top + PLOT_H - (y / maxY) * PLOT_H, [maxY]);

  const pathD = useMemo(() => {
    if (activeType === "binomial") {
      return points.map((p, i) => {
        const cx = toSvgX(p.x);
        const cy = toSvgY(p.y);
        const barW = Math.max(2, (PLOT_W / (points.length + 1)) * 0.7);
        return `M${cx - barW / 2},${toSvgY(0)} L${cx - barW / 2},${cy} L${cx + barW / 2},${cy} L${cx + barW / 2},${toSvgY(0)}Z`;
      }).join(" ");
    }
    return points.map((p, i) => `${i === 0 ? "M" : "L"}${toSvgX(p.x)},${toSvgY(p.y)}`).join(" ");
  }, [points, toSvgX, toSvgY, activeType]);

  const areaD = useMemo(() => {
    if (activeType === "binomial") return "";
    const baseY = toSvgY(0);
    return `${pathD} L${toSvgX(range.max)},${baseY} L${toSvgX(range.min)},${baseY}Z`;
  }, [pathD, range, toSvgX, toSvgY, activeType]);

  const sigmaShading = useMemo(() => {
    if (activeType !== "normal") return null;
    const { mu, sigma } = params;
    const regions: { from: number; to: number; label: string; probability: number; opacity: number }[] = [];

    if (sigmaRegion >= 1) {
      const p1 = normalCDF(mu + sigma, mu, sigma) - normalCDF(mu - sigma, mu, sigma);
      regions.push({ from: mu - sigma, to: mu + sigma, label: "1σ", probability: p1, opacity: 0.25 });
    }
    if (sigmaRegion >= 2) {
      const p2 = normalCDF(mu + 2 * sigma, mu, sigma) - normalCDF(mu - 2 * sigma, mu, sigma);
      regions.push({ from: mu - 2 * sigma, to: mu + 2 * sigma, label: "2σ", probability: p2, opacity: 0.15 });
    }
    if (sigmaRegion >= 3) {
      const p3 = normalCDF(mu + 3 * sigma, mu, sigma) - normalCDF(mu - 3 * sigma, mu, sigma);
      regions.push({ from: mu - 3 * sigma, to: mu + 3 * sigma, label: "3σ", probability: p3, opacity: 0.08 });
    }
    return regions;
  }, [activeType, params, sigmaRegion]);

  const probabilityCalc = useMemo(() => {
    switch (activeType) {
      case "normal": {
        const { mu, sigma } = params;
        const p1 = normalCDF(mu + sigma, mu, sigma) - normalCDF(mu - sigma, mu, sigma);
        const p2 = normalCDF(mu + 2 * sigma, mu, sigma) - normalCDF(mu - 2 * sigma, mu, sigma);
        const p3 = normalCDF(mu + 3 * sigma, mu, sigma) - normalCDF(mu - 3 * sigma, mu, sigma);
        return [
          { label: `P(${(mu - sigma).toFixed(1)} < X < ${(mu + sigma).toFixed(1)})`, value: (p1 * 100).toFixed(2) + "%" },
          { label: `P(${(mu - 2 * sigma).toFixed(1)} < X < ${(mu + 2 * sigma).toFixed(1)})`, value: (p2 * 100).toFixed(2) + "%" },
          { label: `P(${(mu - 3 * sigma).toFixed(1)} < X < ${(mu + 3 * sigma).toFixed(1)})`, value: (p3 * 100).toFixed(2) + "%" },
        ];
      }
      case "uniform": {
        const { a, b } = params;
        const mean = (a + b) / 2;
        const variance = ((b - a) ** 2) / 12;
        return [
          { label: "均值 E[X]", value: mean.toFixed(3) },
          { label: "方差 Var(X)", value: variance.toFixed(3) },
          { label: "P(a < X < (a+b)/2)", value: "50.00%" },
        ];
      }
      case "exponential": {
        const { lambda } = params;
        return [
          { label: "均值 E[X]", value: (1 / lambda).toFixed(3) },
          { label: "方差 Var(X)", value: (1 / (lambda * lambda)).toFixed(3) },
          { label: `P(X > ${(2 / lambda).toFixed(1)})`, value: (Math.exp(-2) * 100).toFixed(2) + "%" },
        ];
      }
      case "binomial": {
        const { n, p } = params;
        return [
          { label: "均值 E[X]", value: (n * p).toFixed(2) },
          { label: "方差 Var(X)", value: (n * p * (1 - p)).toFixed(2) },
          { label: "标准差 σ", value: Math.sqrt(n * p * (1 - p)).toFixed(3) },
        ];
      }
    }
  }, [activeType, params]);

  const handleDistributionSwitch = useCallback((type: DistributionType) => {
    setActiveType(type);
    setParams(INITIAL_PARAMS);
  }, []);

  const currentDistConfig = DISTRIBUTIONS.find((d) => d.type === activeType)!;

  return (
    <div className="border-border-faint bg-bg-panel overflow-hidden border backdrop-blur-md">
      {/* Header */}
      <div className="border-border-faint flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="font-display text-fg-primary text-xl font-semibold tracking-tight">
            概率分布探索器
          </h2>
          <p className="text-fg-muted mt-0.5 font-mono text-[10px] tracking-[0.22em] uppercase">
            Distribution Explorer
          </p>
        </div>
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="border-border-faint bg-bg-elevated hover:border-fg-disabled/30 text-fg-secondary cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-colors"
        >
          {showComparison ? "隐藏对比" : "叠加对比"}
        </button>
      </div>

      {/* Distribution selector tabs */}
      <div className="border-border-faint flex gap-1 border-b px-4 py-2">
        {DISTRIBUTIONS.map((dist) => (
          <button
            key={dist.type}
            onClick={() => handleDistributionSwitch(dist.type)}
            className={`cursor-pointer px-4 py-2 font-mono text-[11px] tracking-wider uppercase transition-all ${
              activeType === dist.type
                ? "border-b-2 text-fg-primary"
                : "text-fg-muted hover:text-fg-secondary"
            }`}
            style={activeType === dist.type ? { borderBottomColor: dist.color, color: dist.color } : undefined}
          >
            {dist.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 p-6 lg:flex-row">
        {/* Chart area */}
        <div className="flex-1 min-w-0">
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full"
            style={{ maxHeight: 400 }}
          >
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0.02" />
              </linearGradient>
              {sigmaShading?.map((r, i) => (
                <linearGradient key={i} id={`sigmaGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={r.opacity} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={r.opacity * 0.3} />
                </linearGradient>
              ))}
            </defs>

            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
              const y = PADDING.top + PLOT_H * (1 - frac);
              return (
                <g key={frac}>
                  <line
                    x1={PADDING.left}
                    y1={y}
                    x2={PADDING.left + PLOT_W}
                    y2={y}
                    stroke="rgba(99,102,241,0.06)"
                    strokeWidth="1"
                  />
                  <text
                    x={PADDING.left - 8}
                    y={y + 4}
                    fill="#9490a8"
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                    textAnchor="end"
                  >
                    {(maxY * frac).toFixed(2)}
                  </text>
                </g>
              );
            })}

            {/* X-axis labels */}
            {Array.from({ length: 7 }, (_, i) => {
              const x = range.min + (i / 6) * (range.max - range.min);
              const svgX = toSvgX(x);
              return (
                <g key={i}>
                  <line
                    x1={svgX}
                    y1={PADDING.top}
                    x2={svgX}
                    y2={PADDING.top + PLOT_H}
                    stroke="rgba(99,102,241,0.04)"
                    strokeWidth="1"
                  />
                  <text
                    x={svgX}
                    y={PADDING.top + PLOT_H + 20}
                    fill="#9490a8"
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                    textAnchor="middle"
                  >
                    {activeType === "binomial" ? Math.round(x) : x.toFixed(1)}
                  </text>
                </g>
              );
            })}

            {/* Axis labels */}
            <text
              x={PADDING.left + PLOT_W / 2}
              y={SVG_HEIGHT - 4}
              fill="#9490a8"
              fontSize="11"
              fontFamily="var(--font-mono)"
              textAnchor="middle"
              letterSpacing="0.1em"
            >
              x
            </text>
            <text
              x={12}
              y={PADDING.top + PLOT_H / 2}
              fill="#9490a8"
              fontSize="11"
              fontFamily="var(--font-mono)"
              textAnchor="middle"
              letterSpacing="0.1em"
              transform={`rotate(-90,12,${PADDING.top + PLOT_H / 2})`}
            >
              f(x)
            </text>

            {/* Sigma shading for normal distribution */}
            {sigmaShading && (
              <>
                {[...sigmaShading].reverse().map((region, i) => {
                  const fromX = Math.max(region.from, range.min);
                  const toX = Math.min(region.to, range.max);
                  const fromSx = toSvgX(fromX);
                  const toSx = toSvgX(toX);
                  const baseY = toSvgY(0);

                  const sigmaPoints = points.filter((p) => p.x >= fromX && p.x <= toX);
                  if (sigmaPoints.length === 0) return null;

                  const fillPath = sigmaPoints
                    .map((p, j) => `${j === 0 ? "M" : "L"}${toSvgX(p.x)},${toSvgY(p.y)}`)
                    .join(" ") + ` L${toSx},${baseY} L${fromSx},${baseY}Z`;

                  return (
                    <g key={i}>
                      <path d={fillPath} fill={`url(#sigmaGrad${sigmaShading.length - 1 - i})`} />
                      <line x1={fromSx} y1={PADDING.top} x2={fromSx} y2={baseY} stroke="#6366f1" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                      <line x1={toSx} y1={PADDING.top} x2={toSx} y2={baseY} stroke="#6366f1" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                      <text
                        x={(fromSx + toSx) / 2}
                        y={PADDING.top + 16 + i * 16}
                        fill="#818cf8"
                        fontSize="10"
                        fontFamily="var(--font-mono)"
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        {region.label}: {(region.probability * 100).toFixed(1)}%
                      </text>
                    </g>
                  );
                })}
              </>
            )}

            {/* Area fill */}
            {areaD && <path d={areaD} fill="url(#areaGrad)" />}

            {/* Comparison overlays */}
            {showComparison &&
              DISTRIBUTIONS.filter((d) => d.type !== activeType).map((dist) => {
                const compRange = getDistributionRange(dist.type, params);
                const compPoints = getDistributionPoints(dist.type, params, compRange, 200);
                const compMaxY = Math.max(...compPoints.map((p) => p.y)) * 1.15 || 1;
                const scaleX = (x: number) => PADDING.left + ((x - range.min) / (range.max - range.min)) * PLOT_W;
                const scaleY = (y: number) => PADDING.top + PLOT_H - (y / maxY) * PLOT_H;

                if (dist.type === "binomial") {
                  return compPoints.map((p, i) => {
                    const cx = scaleX(p.x * (range.max - range.min) / (compRange.max - compRange.min) + range.min);
                    const cy = scaleY(p.y * maxY / compMaxY);
                    const barW = Math.max(2, (PLOT_W / (compPoints.length + 1)) * 0.5);
                    return (
                      <rect
                        key={dist.type + i}
                        x={cx - barW / 2}
                        y={cy}
                        width={barW}
                        height={toSvgY(0) - cy}
                        fill={dist.color}
                        opacity="0.2"
                      />
                    );
                  });
                }

                const dPath = compPoints
                  .map((p, i) => {
                    const sx = scaleX(p.x * (range.max - range.min) / (compRange.max - compRange.min) + range.min);
                    const sy = scaleY(p.y * maxY / compMaxY);
                    return `${i === 0 ? "M" : "L"}${sx},${sy}`;
                  })
                  .join(" ");

                return (
                  <path
                    key={dist.type}
                    d={dPath}
                    fill="none"
                    stroke={dist.color}
                    strokeWidth="1.5"
                    strokeDasharray="6,4"
                    opacity="0.5"
                  />
                );
              })}

            {/* Main curve */}
            <path d={pathD} fill={activeType === "binomial" ? `${color}cc` : "none"} stroke={activeType === "binomial" ? "none" : color} strokeWidth="2.5" strokeLinejoin="round" />

            {/* Axes */}
            <line x1={PADDING.left} y1={PADDING.top} x2={PADDING.left} y2={PADDING.top + PLOT_H} stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
            <line x1={PADDING.left} y1={PADDING.top + PLOT_H} x2={PADDING.left + PLOT_W} y2={PADDING.top + PLOT_H} stroke="rgba(99,102,241,0.2)" strokeWidth="1" />

            {/* Legend for comparison */}
            {showComparison && (
              <g transform={`translate(${PADDING.left + PLOT_W - 160}, ${PADDING.top + 10})`}>
                <rect x="-8" y="-8" width="165" height="85" rx="4" fill="rgba(6,6,15,0.85)" stroke="rgba(99,102,241,0.15)" />
                {DISTRIBUTIONS.map((d, i) => (
                  <g key={d.type} transform={`translate(4, ${i * 18 + 4})`}>
                    <line x1="0" y1="6" x2="20" y2="6" stroke={d.color} strokeWidth={d.type === activeType ? 2.5 : 1.5} strokeDasharray={d.type === activeType ? "none" : "6,4"} />
                    <text x="26" y="10" fill="#a8a4c0" fontSize="10" fontFamily="var(--font-mono)">{d.label}</text>
                  </g>
                ))}
              </g>
            )}
          </svg>

          {/* Sigma rule buttons for normal distribution */}
          {activeType === "normal" && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
                68-95-99.7 法则
              </span>
              {([1, 2, 3] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSigmaRegion(s)}
                  className={`cursor-pointer border px-2.5 py-1 font-mono text-[10px] tracking-wider transition-all ${
                    sigmaRegion === s
                      ? "border-accent-indigo/40 bg-accent-indigo/10 text-accent-indigo"
                      : "border-border-faint text-fg-muted hover:text-fg-secondary"
                  }`}
                >
                  {s}σ
                </button>
              ))}
              <span className="text-fg-muted font-mono text-[10px]">
                {sigmaRegion === 1 ? "≈ 68.27%" : sigmaRegion === 2 ? "≈ 95.45%" : "≈ 99.73%"}
              </span>
            </div>
          )}
        </div>

        {/* Controls panel */}
        <div className="w-full shrink-0 space-y-5 lg:w-72">
          {/* Parameters */}
          <div>
            <p className="text-fg-disabled mb-3 font-mono text-[9px] tracking-[0.22em] uppercase">
              分布参数
            </p>
            <div className="space-y-3">
              {activeType === "normal" && (
                <>
                  <Slider label="μ" value={params.mu} min={-5} max={5} step={0.1} onChange={(v) => updateParam("mu", v)} color={color} />
                  <Slider label="σ" value={params.sigma} min={0.1} max={3} step={0.1} onChange={(v) => updateParam("sigma", v)} color={color} />
                </>
              )}
              {activeType === "uniform" && (
                <>
                  <Slider label="a" value={params.a} min={-5} max={4} step={0.1} onChange={(v) => updateParam("a", v)} color={color} />
                  <Slider label="b" value={params.b} min={params.a + 0.1} max={5} step={0.1} onChange={(v) => updateParam("b", v)} color={color} />
                </>
              )}
              {activeType === "exponential" && (
                <Slider label="λ" value={params.lambda} min={0.1} max={5} step={0.1} onChange={(v) => updateParam("lambda", v)} color={color} />
              )}
              {activeType === "binomial" && (
                <>
                  <Slider label="n" value={params.n} min={1} max={50} step={1} onChange={(v) => updateParam("n", v)} color={color} />
                  <Slider label="p" value={params.p} min={0.01} max={0.99} step={0.01} onChange={(v) => updateParam("p", v)} color={color} />
                </>
              )}
            </div>
          </div>

          {/* Probability calculations */}
          <div>
            <p className="text-fg-disabled mb-3 font-mono text-[9px] tracking-[0.22em] uppercase">
              概率计算
            </p>
            <div className="space-y-2">
              {probabilityCalc.map((calc, i) => (
                <div
                  key={i}
                  className="border-border-faint bg-bg-elevated flex items-center justify-between border px-3 py-2"
                >
                  <span className="text-fg-muted font-mono text-[10px]">{calc.label}</span>
                  <span className="font-mono text-[11px] font-semibold" style={{ color }}>
                    {calc.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Formula */}
          <div>
            <p className="text-fg-disabled mb-3 font-mono text-[9px] tracking-[0.22em] uppercase">
              概率密度/质量函数
            </p>
            <div className="border-border-faint bg-bg-elevated border px-4 py-3">
              {activeType === "normal" && (
                <code className="text-accent-cyan text-[11px] leading-relaxed">
                  f(x) = (1/(σ√2π)) · e<sup>-(x-μ)²/(2σ²)</sup>
                </code>
              )}
              {activeType === "uniform" && (
                <code className="text-accent-cyan text-[11px] leading-relaxed">
                  f(x) = 1/(b-a), a ≤ x ≤ b
                </code>
              )}
              {activeType === "exponential" && (
                <code className="text-accent-cyan text-[11px] leading-relaxed">
                  f(x) = λ·e<sup>-λx</sup>, x ≥ 0
                </code>
              )}
              {activeType === "binomial" && (
                <code className="text-accent-cyan text-[11px] leading-relaxed">
                  P(X=k) = C(n,k)·p<sup>k</sup>·(1-p)<sup>n-k</sup>
                </code>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Real-world examples */}
      <div className="border-border-faint border-t px-6 py-5">
        <p className="text-fg-disabled mb-4 font-mono text-[9px] tracking-[0.22em] uppercase">
          现实案例 — {currentDistConfig.label}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {REAL_WORLD_EXAMPLES[activeType].map((example, i) => (
            <div
              key={i}
              className="border-border-faint bg-bg-elevated group hover:border-fg-disabled/30 border p-4 transition-all duration-300"
            >
              <div className="mb-2 text-2xl">{example.icon}</div>
              <h4 className="font-display text-fg-primary text-sm font-semibold">{example.title}</h4>
              <p className="text-fg-muted mt-1 text-[12px] leading-relaxed">{example.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
