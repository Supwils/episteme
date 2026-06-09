"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface DataPoint {
  year: number;
  value: number;
}

interface CountryConfig {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  data: DataPoint[];
}

const SVG_W = 800;
const SVG_H = 400;
const PAD = { top: 20, right: 30, bottom: 40, left: 65 };
const PLOT_W = SVG_W - PAD.left - PAD.right;
const PLOT_H = SVG_H - PAD.top - PAD.bottom;

const YEAR_MIN = 1960;
const YEAR_MAX = 2025;

function interpolateGDP(keypoints: [number, number][]): DataPoint[] {
  const points: DataPoint[] = [];
  for (let i = 0; i < keypoints.length - 1; i++) {
    const [y0, v0] = keypoints[i]!;
    const [y1, v1] = keypoints[i + 1]!;
    const span = y1 - y0;
    for (let y = y0; y < y1; y++) {
      const t = (y - y0) / span;
      const logV0 = Math.log(Math.max(v0, 0.001));
      const logV1 = Math.log(Math.max(v1, 0.001));
      points.push({ year: y, value: Math.exp(logV0 + t * (logV1 - logV0)) });
    }
  }
  const last = keypoints[keypoints.length - 1]!;
  points.push({ year: last[0], value: last[1] });
  return points;
}

const COUNTRIES: CountryConfig[] = [
  {
    id: "us",
    name: "美国",
    nameEn: "United States",
    color: "#3b82f6",
    data: interpolateGDP([
      [1960, 0.54], [1970, 1.07], [1980, 2.86], [1990, 5.96],
      [2000, 10.25], [2005, 13.04], [2010, 14.99], [2015, 18.24],
      [2020, 21.06], [2025, 25.46],
    ]),
  },
  {
    id: "cn",
    name: "中国",
    nameEn: "China",
    color: "#ef4444",
    data: interpolateGDP([
      [1960, 0.06], [1970, 0.09], [1980, 0.19], [1990, 0.36],
      [2000, 1.21], [2005, 2.29], [2010, 6.09], [2015, 11.06],
      [2020, 14.69], [2025, 18.53],
    ]),
  },
  {
    id: "jp",
    name: "日本",
    nameEn: "Japan",
    color: "#10b981",
    data: interpolateGDP([
      [1960, 0.04], [1970, 0.21], [1980, 1.09], [1990, 3.13],
      [2000, 4.89], [2005, 4.76], [2010, 5.70], [2015, 4.39],
      [2020, 5.04], [2025, 4.19],
    ]),
  },
  {
    id: "de",
    name: "德国",
    nameEn: "Germany",
    color: "#f59e0b",
    data: interpolateGDP([
      [1960, 0.07], [1970, 0.22], [1980, 0.95], [1990, 1.77],
      [2000, 1.95], [2005, 2.86], [2010, 3.42], [2015, 3.38],
      [2020, 3.89], [2025, 4.52],
    ]),
  },
  {
    id: "in",
    name: "印度",
    nameEn: "India",
    color: "#8b5cf6",
    data: interpolateGDP([
      [1960, 0.04], [1970, 0.06], [1980, 0.19], [1990, 0.32],
      [2000, 0.47], [2005, 0.83], [2010, 1.68], [2015, 2.10],
      [2020, 2.67], [2025, 3.94],
    ]),
  },
];

const RECESSIONS: [number, number][] = [
  [1973, 1975],
  [1980, 1982],
  [1990, 1991],
  [2001, 2002],
  [2007, 2009],
  [2020, 2020],
];

function formatGDP(v: number): string {
  if (v >= 1) return `$${v.toFixed(1)}T`;
  if (v >= 0.01) return `$${(v * 1000).toFixed(0)}B`;
  return `$${(v * 1000).toFixed(1)}B`;
}

function yearToX(year: number): number {
  return PAD.left + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * PLOT_W;
}

function valueToY(value: number, maxVal: number, logScale: boolean): number {
  if (logScale) {
    const logMin = Math.log(0.03);
    const logMax = Math.log(maxVal * 1.15);
    const logVal = Math.log(Math.max(value, 0.03));
    return PAD.top + PLOT_H - ((logVal - logMin) / (logMax - logMin)) * PLOT_H;
  }
  return PAD.top + PLOT_H - (value / (maxVal * 1.15)) * PLOT_H;
}

function buildPath(data: DataPoint[], maxVal: number, logScale: boolean): string {
  const step = data.length > 130 ? 2 : 1;
  let d = "";
  for (let i = 0; i < data.length; i += step) {
    const pt = data[i]!;
    const x = yearToX(pt.year);
    const y = valueToY(pt.value, maxVal, logScale);
    d += i === 0 ? `M${x},${y}` : `L${x},${y}`;
  }
  const last = data[data.length - 1]!;
  if (step > 1 && data.length % 2 === 0) {
    d += `L${yearToX(last.year)},${valueToY(last.value, maxVal, logScale)}`;
  }
  return d;
}

export function GDPChart() {
  const [activeCountries, setActiveCountries] = useState<Set<string>>(
    () => new Set(["us", "cn", "jp"])
  );
  const [logScale, setLogScale] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleCountry = useCallback((id: string) => {
    setActiveCountries((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const maxVal = Math.max(
    ...COUNTRIES.filter((c) => activeCountries.has(c.id)).flatMap((c) =>
      c.data.map((d) => d.value)
    ),
    1
  );

  const getHoveredData = useCallback(() => {
    if (hoveredYear === null) return null;
    return COUNTRIES.filter((c) => activeCountries.has(c.id)).map((c) => {
      const pt = c.data.find((d) => d.year === hoveredYear);
      return { ...c, value: pt?.value ?? 0 };
    });
  }, [hoveredYear, activeCountries]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const scaleX = SVG_W / rect.width;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const year = Math.round(
        YEAR_MIN + ((mouseX - PAD.left) / PLOT_W) * (YEAR_MAX - YEAR_MIN)
      );
      if (year >= YEAR_MIN && year <= YEAR_MAX) {
        setHoveredYear(year);
      } else {
        setHoveredYear(null);
      }
    },
    []
  );

  const yTicks = logScale
    ? [0.05, 0.1, 0.5, 1, 5, 10, 25]
    : [0, 5, 10, 15, 20, 25];

  const xTicks = [1960, 1970, 1980, 1990, 2000, 2010, 2020];

  const hoveredData = getHoveredData();

  return (
    <div ref={containerRef} className="chart-container">
      <h3 className="font-display text-fg-primary mb-4 text-lg font-semibold">
        主要经济体 GDP 对比（1960-2025）
      </h3>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        {COUNTRIES.map((c) => (
          <button
            key={c.id}
            onClick={() => toggleCountry(c.id)}
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-wide transition-all duration-150"
            style={{
              borderColor: activeCountries.has(c.id)
                ? `${c.color}80`
                : "var(--color-border-faint)",
              backgroundColor: activeCountries.has(c.id)
                ? `${c.color}18`
                : "transparent",
              color: activeCountries.has(c.id) ? c.color : "var(--color-fg-muted)",
              opacity: activeCountries.has(c.id) ? 1 : 0.5,
            }}
            aria-pressed={activeCountries.has(c.id)}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: activeCountries.has(c.id) ? c.color : "var(--color-fg-disabled)",
              }}
            />
            {c.name}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-fg-disabled font-mono text-[10px] tracking-wider uppercase">
            线性
          </span>
          <button
            onClick={() => setLogScale((v) => !v)}
            className="relative h-5 w-9 rounded-full transition-colors duration-200"
            style={{
              backgroundColor: logScale
                ? "var(--color-accent-gold)"
                : "var(--color-bg-elevated)",
              border: "1px solid var(--color-border-subtle)",
            }}
            aria-label={logScale ? "切换为线性刻度" : "切换为对数刻度"}
          >
            <span
              className="absolute top-0.5 h-3.5 w-3.5 rounded-full transition-transform duration-200"
              style={{
                backgroundColor: "var(--color-fg-primary)",
                left: "2px",
                transform: logScale ? "translateX(16px)" : "translateX(0)",
              }}
            />
          </button>
          <span className="text-fg-disabled font-mono text-[10px] tracking-wider uppercase">
            对数
          </span>
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full"
        style={{ maxHeight: 480 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredYear(null)}
        role="img"
        aria-label="主要经济体GDP对比折线图"
      >
        <defs>
          {COUNTRIES.map((c) => (
            <linearGradient
              key={`grad-${c.id}`}
              id={`grad-${c.id}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={c.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={c.color} stopOpacity="0" />
            </linearGradient>
          ))}
          <clipPath id="plot-area">
            <rect x={PAD.left} y={PAD.top} width={PLOT_W} height={PLOT_H} />
          </clipPath>
        </defs>

        <rect
          x={PAD.left}
          y={PAD.top}
          width={PLOT_W}
          height={PLOT_H}
          fill="rgba(200,164,90,0.015)"
          rx={2}
        />

        {RECESSIONS.map(([start, end], i) => (
          <rect
            key={i}
            x={yearToX(start)}
            y={PAD.top}
            width={yearToX(end) - yearToX(start)}
            height={PLOT_H}
            fill="rgba(148,163,184,0.08)"
          />
        ))}

        {yTicks.map((tick) => {
          const y = valueToY(tick, maxVal, logScale);
          if (y < PAD.top || y > PAD.top + PLOT_H) return null;
          return (
            <g key={tick}>
              <line
                x1={PAD.left}
                y1={y}
                x2={PAD.left + PLOT_W}
                y2={y}
                stroke="rgba(200,164,90,0.07)"
                strokeDasharray="2,3"
              />
              <text
                x={PAD.left - 8}
                y={y + 3.5}
                textAnchor="end"
                fill="var(--color-fg-disabled)"
                fontSize={10}
                fontFamily="var(--font-mono)"
              >
                {formatGDP(tick)}
              </text>
            </g>
          );
        })}

        {xTicks.map((year) => {
          const x = yearToX(year);
          return (
            <g key={year}>
              <line
                x1={x}
                y1={PAD.top}
                x2={x}
                y2={PAD.top + PLOT_H}
                stroke="rgba(200,164,90,0.05)"
              />
              <text
                x={x}
                y={PAD.top + PLOT_H + 20}
                textAnchor="middle"
                fill="var(--color-fg-disabled)"
                fontSize={10}
                fontFamily="var(--font-mono)"
              >
                {year}
              </text>
            </g>
          );
        })}

        <text
          x={PAD.left + PLOT_W / 2}
          y={SVG_H - 5}
          textAnchor="middle"
          fill="var(--color-fg-muted)"
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.12em"
        >
          YEAR
        </text>
        <text
          x={14}
          y={PAD.top + PLOT_H / 2}
          textAnchor="middle"
          fill="var(--color-fg-muted)"
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.12em"
          transform={`rotate(-90, 14, ${PAD.top + PLOT_H / 2})`}
        >
          GDP (USD)
        </text>

        <g clipPath="url(#plot-area)">
          {COUNTRIES.filter((c) => activeCountries.has(c.id)).map((c) => (
            <path
              key={`area-${c.id}`}
              d={buildPath(c.data, maxVal, logScale) + `L${yearToX(YEAR_MAX)},${PAD.top + PLOT_H}L${yearToX(YEAR_MIN)},${PAD.top + PLOT_H}Z`}
              fill={`url(#grad-${c.id})`}
              className={animated ? "gdp-area-animate" : ""}
              style={{ opacity: animated ? 1 : 0 }}
            />
          ))}
          {COUNTRIES.filter((c) => activeCountries.has(c.id)).map((c) => (
            <path
              key={`line-${c.id}`}
              d={buildPath(c.data, maxVal, logScale)}
              fill="none"
              stroke={c.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={animated ? "gdp-line-animate" : ""}
              style={{ opacity: animated ? 1 : 0 }}
            />
          ))}
        </g>

        {hoveredYear !== null && (
          <g>
            <line
              x1={yearToX(hoveredYear)}
              y1={PAD.top}
              x2={yearToX(hoveredYear)}
              y2={PAD.top + PLOT_H}
              stroke="rgba(200,164,90,0.3)"
              strokeDasharray="4,3"
            />
            {hoveredData?.map((d) => {
              const pt = d.data.find((p) => p.year === hoveredYear);
              if (!pt) return null;
              const cx = yearToX(hoveredYear);
              const cy = valueToY(pt.value, maxVal, logScale);
              return (
                <g key={d.id}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill="var(--color-bg-deep)"
                    stroke={d.color}
                    strokeWidth={2}
                  />
                </g>
              );
            })}
          </g>
        )}

        {hoveredYear !== null && hoveredData && (
          (() => {
            const tooltipX = yearToX(hoveredYear);
            const tooltipOnRight = tooltipX < SVG_W / 2;
            const tx = tooltipOnRight ? tooltipX + 14 : tooltipX - 14;
            const boxW = 155;
            const boxH = 22 + hoveredData.length * 18;
            const boxX = tooltipOnRight ? tx : tx - boxW;
            const boxY = PAD.top + 8;

            return (
              <g>
                <rect
                  x={boxX}
                  y={boxY}
                  width={boxW}
                  height={boxH}
                  rx={6}
                  fill="var(--color-bg-overlay)"
                  stroke="var(--color-border-subtle)"
                  strokeWidth={1}
                />
                <text
                  x={boxX + 10}
                  y={boxY + 15}
                  fill="var(--color-accent-gold)"
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  fontWeight="600"
                >
                  {hoveredYear}
                </text>
                {hoveredData.map((d, i) => (
                  <g key={d.id}>
                    <circle
                      cx={boxX + 14}
                      cy={boxY + 30 + i * 18}
                      r={3}
                      fill={d.color}
                    />
                    <text
                      x={boxX + 24}
                      y={boxY + 34 + i * 18}
                      fill="var(--color-fg-secondary)"
                      fontSize={10}
                      fontFamily="var(--font-mono)"
                    >
                      {d.name}
                    </text>
                    <text
                      x={boxX + boxW - 10}
                      y={boxY + 34 + i * 18}
                      textAnchor="end"
                      fill="var(--color-fg-primary)"
                      fontSize={10}
                      fontFamily="var(--font-mono)"
                      fontWeight="500"
                    >
                      {formatGDP(d.value)}
                    </text>
                  </g>
                ))}
              </g>
            );
          })()
        )}

        {RECESSIONS.map(([start, end], i) => {
          const midX = (yearToX(start) + yearToX(end)) / 2;
          if (i > 0 && RECESSIONS[i - 1] && midX - yearToX(RECESSIONS[i - 1]![1]) < 30) return null;
          return (
            <text
              key={`rec-label-${i}`}
              x={midX}
              y={PAD.top + PLOT_H - 6}
              textAnchor="middle"
              fill="var(--color-fg-disabled)"
              fontSize={8}
              fontFamily="var(--font-mono)"
              opacity={0.6}
            >
              衰退
            </text>
          );
        })}
      </svg>

      <style jsx>{`
        .gdp-line-animate {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: gdp-draw 2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .gdp-area-animate {
          animation: gdp-fade-in 2.5s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        @keyframes gdp-draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes gdp-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
