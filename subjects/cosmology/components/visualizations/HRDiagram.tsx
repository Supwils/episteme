"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { STARS, type SpectralClass, type Star, type StarRegion } from "./hr-data";

const TEMPERATURE_MIN = 2000;
const TEMPERATURE_MAX = 40000;
const LUMINOSITY_MIN = 0.0001;
const LUMINOSITY_MAX = 1000000;

const PADDING = { top: 40, right: 60, bottom: 60, left: 70 };
const WIDTH = 800;
const HEIGHT = 500;
const PLOT_W = WIDTH - PADDING.left - PADDING.right;
const PLOT_H = HEIGHT - PADDING.top - PADDING.bottom;

// Round SVG coordinates because Math.log10 can differ in its last bits across runtimes.
function tempToX(temp: number): number {
  const logT = Math.log10(temp);
  const logMin = Math.log10(TEMPERATURE_MAX);
  const logMax = Math.log10(TEMPERATURE_MIN);
  return Number((PADDING.left + ((logT - logMin) / (logMax - logMin)) * PLOT_W).toFixed(3));
}

function lumToY(lum: number): number {
  const logL = Math.log10(lum);
  const logMin = Math.log10(LUMINOSITY_MIN);
  const logMax = Math.log10(LUMINOSITY_MAX);
  return Number((PADDING.top + (1 - (logL - logMin) / (logMax - logMin)) * PLOT_H).toFixed(3));
}

function tempToColor(temp: number): string {
  if (temp >= 30000) return "#9bb0ff";
  if (temp >= 10000) return "#aabfff";
  if (temp >= 7500) return "#cad7ff";
  if (temp >= 6000) return "#fff4e8";
  if (temp >= 5200) return "#ffd2a1";
  if (temp >= 3700) return "#ffbd6f";
  return "#ff7b40";
}

function spectralLabel(cls: Star["spectralClass"]): string {
  if (cls === "DA" || cls === "DQZ") return cls;
  const labels: Record<SpectralClass, string> = {
    O: "O (>30000K)",
    B: "B (10000-30000K)",
    A: "A (7500-10000K)",
    F: "F (6000-7500K)",
    G: "G (5200-6000K)",
    K: "K (3700-5200K)",
    M: "M (<3700K)",
  };
  return labels[cls];
}

function regionLabel(region: StarRegion): string {
  const labels: Record<StarRegion, string> = {
    "main-sequence": "主序星",
    "red-giant": "红巨星",
    supergiant: "超巨星",
    "white-dwarf": "白矮星",
  };
  return labels[region];
}

function regionColor(region: StarRegion): string {
  const colors: Record<StarRegion, string> = {
    "main-sequence": "#3b82f6",
    "red-giant": "#ef4444",
    supergiant: "#a855f7",
    "white-dwarf": "#6b7280",
  };
  return colors[region];
}

function formatNumber(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} × 10⁶`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)} × 10³`;
  if (n >= 1) return n.toFixed(n < 10 ? 2 : 0);
  if (n >= 0.01) return n.toFixed(3);
  return n.toExponential(2);
}

type MainSequenceBandPoint = { temp: number; lum: number };

function generateMainSequenceBand(): MainSequenceBandPoint[] {
  // Illustrative control points locate the broad band, not a universal L(T) law.
  return [
    { temp: 40000, lum: 300000 },
    { temp: 30000, lum: 20000 },
    { temp: 20000, lum: 3000 },
    { temp: 10000, lum: 25 },
    { temp: 7000, lum: 4 },
    { temp: 5772, lum: 1 },
    { temp: 4000, lum: 0.08 },
    { temp: 3000, lum: 0.003 },
    { temp: 2500, lum: 0.0005 },
  ];
}

function generateRedGiantRegion(): string {
  const points = [
    { temp: 5000, lum: 100 },
    { temp: 4500, lum: 500 },
    { temp: 4000, lum: 2000 },
    { temp: 3500, lum: 10000 },
    { temp: 3000, lum: 50000 },
    { temp: 3000, lum: 500 },
    { temp: 3500, lum: 200 },
    { temp: 4000, lum: 100 },
    { temp: 5000, lum: 50 },
    { temp: 5000, lum: 100 },
  ];
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${tempToX(p.temp)} ${lumToY(p.lum)}`)
    .join(" ");
}

function generateMainSequencePath(): string {
  const band = generateMainSequenceBand();
  const width = 0.6;
  const upper = band.map((p) => ({ x: tempToX(p.temp), y: lumToY(p.lum * Math.pow(10, width)) }));
  const lower = band.map((p) => ({ x: tempToX(p.temp), y: lumToY(p.lum / Math.pow(10, width)) }));
  const path = [...upper, ...lower.reverse()];
  return path.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
}

type AxisTick = { value: number; label: string };

function tempTicks(): AxisTick[] {
  return [
    { value: 40000, label: "40000" },
    { value: 10000, label: "10000" },
    { value: 6000, label: "6000" },
    { value: 4000, label: "4000" },
    { value: 3000, label: "3000" },
  ];
}

function lumTicks(): AxisTick[] {
  return [
    { value: 1000000, label: "10⁶" },
    { value: 10000, label: "10⁴" },
    { value: 100, label: "10²" },
    { value: 1, label: "1" },
    { value: 0.01, label: "10⁻²" },
    { value: 0.0001, label: "10⁻⁴" },
  ];
}

type StarDetailProps = {
  star: Star;
  onClose: () => void;
};

function StarDetail({ star, onClose }: StarDetailProps) {
  const color = tempToColor(star.temperature);
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
      className="border-border-faint bg-bg-elevated/90 relative max-w-md rounded-xl border p-6 backdrop-blur-xl"
    >
      <button
        onClick={onClose}
        className="hover:text-fg-primary absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--input-bg)] text-sm text-[#868da0] transition-colors hover:bg-[var(--hover-bg)]"
        aria-label="关闭"
      >
        ✕
      </button>
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{
            backgroundColor: `${color}30`,
            boxShadow: `0 0 20px ${color}40`,
          }}
        >
          <div className="h-5 w-5 rounded-full" style={{ backgroundColor: color }} />
        </div>
        <div className="min-w-0">
          <h3 className="text-fg-primary mb-0.5 text-lg font-semibold">
            {star.nameCn}
            {star.id === "sun" && (
              <span className="ml-2 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-400">
                我们的恒星
              </span>
            )}
          </h3>
          <p className="mb-3 text-xs text-[#868da0]">{star.nameEn}</p>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-fg-muted text-[10px] tracking-wider uppercase">温度</p>
              <p className="font-mono text-sm" style={{ color }}>
                {star.temperature.toLocaleString("en-US")} K
              </p>
            </div>
            <div>
              <p className="text-fg-muted text-[10px] tracking-wider uppercase">光度</p>
              <p className="font-mono text-sm text-[#a8adbd]">{formatNumber(star.luminosity)} L☉</p>
            </div>
            <div>
              <p className="text-fg-muted text-[10px] tracking-wider uppercase">质量</p>
              <p className="font-mono text-sm text-[#a8adbd]">{formatNumber(star.mass)} M☉</p>
            </div>
            <div>
              <p className="text-fg-muted text-[10px] tracking-wider uppercase">
                {star.radiusLabel ?? "半径"}
              </p>
              <p className="font-mono text-sm text-[#a8adbd]">{formatNumber(star.radius)} R☉</p>
            </div>
          </div>
          <div className="mb-3 flex gap-2">
            <span
              className="rounded-full px-2 py-0.5 text-xs"
              style={{
                backgroundColor: `${regionColor(star.region)}20`,
                color: regionColor(star.region),
              }}
            >
              {regionLabel(star.region)}
            </span>
            <span className="rounded-full bg-[var(--input-bg)] px-2 py-0.5 text-xs text-[#868da0]">
              {spectralLabel(star.spectralClass)}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#a8adbd]">{star.description}</p>
          {star.parameterNote && (
            <p className="text-fg-muted mt-3 text-xs leading-relaxed">{star.parameterNote}</p>
          )}
          <a
            className="text-accent-blue mt-3 inline-block text-xs underline"
            href={star.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            数据来源与参数定义
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function HRDiagram() {
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);
  const [hoveredStar, setHoveredStar] = useState<Star | null>(null);
  const [activeRegion, setActiveRegion] = useState<StarRegion | null>(null);

  const mainSequencePath = useMemo(() => generateMainSequencePath(), []);
  const redGiantPath = useMemo(() => generateRedGiantRegion(), []);

  const filteredStars = useMemo(() => {
    if (!activeRegion) return STARS;
    return STARS.filter((s) => s.region === activeRegion);
  }, [activeRegion]);

  const handleClick = useCallback((star: Star) => {
    setSelectedStar((prev) => (prev?.id === star.id ? null : star));
  }, []);

  return (
    <section className="w-full">
      <div className="mb-8 text-center">
        <h2
          className="text-fg-primary mb-2 text-2xl font-bold md:text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          赫罗图
        </h2>
        <p className="text-sm text-[#868da0]">
          Hertzsprung-Russell Diagram — 恒星光度与有效温度的关系图
        </p>
      </div>

      <p className="text-fg-muted mb-4 text-center text-xs leading-relaxed">
        阴影为分布区域示意，恒星参数取所列文献的近似值，点的大小不代表真实半径。
        横轴向右降温；同一位置可对应不同质量、组成与演化历史，并非单颗恒星的一条轨迹。
      </p>
      {/* Region filter buttons */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveRegion(null)}
          aria-pressed={activeRegion === null}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
            activeRegion === null
              ? "border-border-subtle text-fg-primary bg-[var(--hover-bg)]"
              : "border-white/[0.06] bg-white/[0.02] text-[#868da0] hover:bg-white/[0.04]"
          }`}
        >
          全部恒星
        </button>
        {(["main-sequence", "red-giant", "supergiant", "white-dwarf"] as const).map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion((prev) => (prev === region ? null : region))}
            aria-pressed={activeRegion === region}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              activeRegion === region
                ? "border-border-subtle text-fg-primary bg-[var(--hover-bg)]"
                : "border-white/[0.06] bg-white/[0.02] text-[#868da0] hover:bg-white/[0.04]"
            }`}
          >
            <span
              className="mr-1.5 inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: regionColor(region) }}
            />
            {regionLabel(region)}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-start gap-6 lg:flex-row">
        {/* SVG Diagram */}
        <div
          className="w-full min-w-0 flex-1 overflow-x-auto"
          role="region"
          aria-label="赫罗图，可横向滚动查看完整温度与光度坐标"
          tabIndex={0}
        >
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="mx-auto w-full max-w-[800px] select-none"
            style={{ minWidth: WIDTH }}
            role="group"
            aria-label="选择恒星查看参数"
          >
            <defs>
              <linearGradient id="ms-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="rg-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.04" />
              </linearGradient>
              <filter id="star-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines */}
            {tempTicks().map((tick) => {
              const x = tempToX(tick.value);
              return (
                <line
                  key={`tg-${tick.value}`}
                  x1={x}
                  y1={PADDING.top}
                  x2={x}
                  y2={HEIGHT - PADDING.bottom}
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              );
            })}
            {lumTicks().map((tick) => {
              const y = lumToY(tick.value);
              return (
                <line
                  key={`lg-${tick.value}`}
                  x1={PADDING.left}
                  y1={y}
                  x2={WIDTH - PADDING.right}
                  y2={y}
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Main sequence band */}
            <path
              d={mainSequencePath}
              fill="url(#ms-gradient)"
              stroke="#fbbf24"
              strokeOpacity="0.2"
              strokeWidth="1"
            />

            {/* Red giant region */}
            <path
              d={redGiantPath}
              fill="url(#rg-gradient)"
              stroke="#ef4444"
              strokeOpacity="0.15"
              strokeWidth="1"
            />

            {/* Region labels */}
            <text
              x={tempToX(3500) + 10}
              y={lumToY(30000) + 15}
              fill="#ef4444"
              fillOpacity="0.4"
              fontSize="12"
              fontFamily="var(--font-sans)"
            >
              红巨星
            </text>
            <text
              x={tempToX(30000) + 10}
              y={lumToY(100000) + 5}
              fill="#a855f7"
              fillOpacity="0.4"
              fontSize="12"
              fontFamily="var(--font-sans)"
            >
              超巨星
            </text>
            <text
              x={tempToX(20000) + 5}
              y={lumToY(0.01) + 15}
              fill="#6b7280"
              fillOpacity="0.4"
              fontSize="12"
              fontFamily="var(--font-sans)"
            >
              白矮星
            </text>
            <text
              x={tempToX(8000)}
              y={lumToY(10) + 20}
              fill="#fbbf24"
              fillOpacity="0.35"
              fontSize="12"
              fontFamily="var(--font-sans)"
              textAnchor="middle"
              transform={`rotate(-35, ${tempToX(8000)}, ${lumToY(10) + 20})`}
            >
              主序带
            </text>

            {/* Stars */}
            {STARS.map((star) => {
              const x = tempToX(star.temperature);
              const y = lumToY(star.luminosity);
              const color = tempToColor(star.temperature);
              const isSelected = selectedStar?.id === star.id;
              const isHovered = hoveredStar?.id === star.id;
              const isFiltered = !activeRegion || star.region === activeRegion;
              const isSun = star.id === "sun";
              const baseR = isSun ? 7 : 5;
              const r = isSelected || isHovered ? baseR + 3 : baseR;
              const opacity = isFiltered ? 1 : 0.15;

              return (
                <g
                  key={star.id}
                  style={{ cursor: "pointer", opacity }}
                  role="button"
                  tabIndex={isFiltered ? 0 : -1}
                  aria-label={star.nameCn}
                  aria-pressed={isSelected}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleClick(star);
                    }
                  }}
                  onClick={() => handleClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                >
                  {/* Sun special marker */}
                  {isSun && (
                    <>
                      <circle
                        cx={x}
                        cy={y}
                        r={r + 6}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                        strokeOpacity={0.6}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={r + 10}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="0.5"
                        strokeOpacity={0.3}
                      />
                    </>
                  )}
                  {/* Glow */}
                  <circle
                    cx={x}
                    cy={y}
                    r={r + 4}
                    fill={color}
                    fillOpacity={isSelected || isHovered ? 0.25 : 0.1}
                    filter="url(#star-glow)"
                  />
                  {/* Star dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={r}
                    fill={color}
                    stroke={isSelected ? "#ffffff" : "transparent"}
                    strokeWidth={isSelected ? 2 : 0}
                  />
                  {/* Label */}
                  {(isSelected || isHovered || isSun) && (
                    <text
                      x={x}
                      y={y - r - 8}
                      textAnchor="middle"
                      fill="#f5f6fa"
                      fontSize="12"
                      fontFamily="var(--font-sans)"
                      fontWeight={isSun ? 600 : 400}
                    >
                      {star.nameCn}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Axes */}
            <line
              x1={PADDING.left}
              y1={PADDING.top}
              x2={PADDING.left}
              y2={HEIGHT - PADDING.bottom}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            <line
              x1={PADDING.left}
              y1={HEIGHT - PADDING.bottom}
              x2={WIDTH - PADDING.right}
              y2={HEIGHT - PADDING.bottom}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />

            {/* X-axis ticks and labels (temperature, inverted) */}
            {tempTicks().map((tick) => {
              const x = tempToX(tick.value);
              return (
                <g key={`xt-${tick.value}`}>
                  <line
                    x1={x}
                    y1={HEIGHT - PADDING.bottom}
                    x2={x}
                    y2={HEIGHT - PADDING.bottom + 5}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={HEIGHT - PADDING.bottom + 20}
                    textAnchor="middle"
                    fill="#868da0"
                    fontSize="12"
                    fontFamily="var(--font-mono)"
                  >
                    {tick.label}
                  </text>
                </g>
              );
            })}
            <text
              x={PADDING.left + PLOT_W / 2}
              y={HEIGHT - 8}
              textAnchor="middle"
              fill="#868da0"
              fontSize="12"
              fontFamily="var(--font-sans)"
            >
              表面温度 (K) ←
            </text>

            {/* Y-axis ticks and labels (luminosity) */}
            {lumTicks().map((tick) => {
              const y = lumToY(tick.value);
              return (
                <g key={`yl-${tick.value}`}>
                  <line
                    x1={PADDING.left - 5}
                    y1={y}
                    x2={PADDING.left}
                    y2={y}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                  />
                  <text
                    x={PADDING.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    fill="#868da0"
                    fontSize="12"
                    fontFamily="var(--font-mono)"
                  >
                    {tick.label}
                  </text>
                </g>
              );
            })}
            <text
              x={14}
              y={PADDING.top + PLOT_H / 2}
              textAnchor="middle"
              fill="#868da0"
              fontSize="12"
              fontFamily="var(--font-sans)"
              transform={`rotate(-90, 14, ${PADDING.top + PLOT_H / 2})`}
            >
              光度 (L☉) ↑
            </text>

            {/* Spectral class bar on top */}
            {(["O", "B", "A", "F", "G", "K", "M"] as SpectralClass[]).map((cls, i) => {
              const temps: Record<SpectralClass, number> = {
                O: 35000,
                B: 15000,
                A: 8500,
                F: 6750,
                G: 5600,
                K: 4450,
                M: 3200,
              };
              const nextTemps: Record<SpectralClass, number> = {
                O: 40000,
                B: 30000,
                A: 10000,
                F: 7500,
                G: 6000,
                K: 5200,
                M: 3700,
              };
              const x1 = tempToX(nextTemps[cls]);
              const x2 =
                i < 6
                  ? tempToX(nextTemps[(["O", "B", "A", "F", "G", "K", "M"] as const)[i + 1]!])
                  : PADDING.left + PLOT_W;
              const midX = (x1 + x2) / 2;
              return (
                <g key={`sp-${cls}`}>
                  <rect
                    x={x1}
                    y={PADDING.top - 20}
                    width={x2 - x1}
                    height="16"
                    fill={tempToColor(temps[cls])}
                    fillOpacity="0.15"
                    rx="2"
                  />
                  <text
                    x={midX}
                    y={PADDING.top - 9}
                    textAnchor="middle"
                    fill={tempToColor(temps[cls])}
                    fontSize="12"
                    fontFamily="var(--font-mono)"
                    fontWeight="600"
                  >
                    {cls}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="w-full shrink-0 lg:w-80">
          <AnimatePresence mode="wait">
            {selectedStar ? (
              <StarDetail
                key={selectedStar.id}
                star={selectedStar}
                onClose={() => setSelectedStar(null)}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <p className="mb-4 text-sm text-[#868da0]">点击图表中的恒星查看详细信息</p>
                <div className="space-y-2">
                  {filteredStars.map((star) => (
                    <button
                      key={star.id}
                      onClick={() => setSelectedStar(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                      className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-white/[0.04]"
                    >
                      <div
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: tempToColor(star.temperature) }}
                      />
                      <span className="text-sm text-[#a8adbd]">{star.nameCn}</span>
                      <span className="text-fg-muted ml-auto font-mono text-xs">
                        {star.temperature.toLocaleString("en-US")}K
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {(["main-sequence", "red-giant", "supergiant", "white-dwarf"] as const).map((region) => (
          <div key={region} className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: regionColor(region) }}
            />
            <span className="text-xs text-[#868da0]">{regionLabel(region)}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="text-xs text-[#868da0]">太阳</span>
        </div>
      </div>
    </section>
  );
}
