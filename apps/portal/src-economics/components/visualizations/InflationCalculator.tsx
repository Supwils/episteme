"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const CPI_DATA: Record<number, number> = {
  1913: 9.9, 1914: 10.0, 1915: 10.1, 1916: 10.9, 1917: 12.8, 1918: 15.1, 1919: 17.3, 1920: 20.0,
  1921: 17.9, 1922: 16.8, 1923: 17.1, 1924: 17.1, 1925: 17.5, 1926: 17.7, 1927: 17.4, 1928: 17.1,
  1929: 17.1, 1930: 16.7, 1931: 15.2, 1932: 13.7, 1933: 13.0, 1934: 13.4, 1935: 13.7, 1936: 13.9,
  1937: 14.4, 1938: 14.1, 1939: 13.9, 1940: 14.0, 1941: 14.7, 1942: 16.3, 1943: 17.3, 1944: 17.6,
  1945: 18.0, 1946: 19.5, 1947: 22.3, 1948: 24.1, 1949: 23.8, 1950: 24.1, 1951: 26.0, 1952: 26.5,
  1953: 26.7, 1954: 26.9, 1955: 26.8, 1956: 27.2, 1957: 28.1, 1958: 28.9, 1959: 29.1, 1960: 29.6,
  1961: 29.9, 1962: 30.2, 1963: 30.6, 1964: 31.0, 1965: 31.5, 1966: 32.4, 1967: 33.4, 1968: 34.8,
  1969: 36.7, 1970: 38.8, 1971: 40.5, 1972: 41.8, 1973: 44.4, 1974: 49.3, 1975: 53.8, 1976: 56.9,
  1977: 60.6, 1978: 65.2, 1979: 72.6, 1980: 82.4, 1981: 90.9, 1982: 96.5, 1983: 99.6, 1984: 103.9,
  1985: 107.6, 1986: 109.6, 1987: 113.6, 1988: 118.3, 1989: 124.0, 1990: 130.7, 1991: 136.2, 1992: 140.3,
  1993: 144.5, 1994: 148.2, 1995: 152.4, 1996: 156.9, 1997: 160.5, 1998: 163.0, 1999: 166.6, 2000: 172.2,
  2001: 177.1, 2002: 179.9, 2003: 184.0, 2004: 188.9, 2005: 195.3, 2006: 201.6, 2007: 207.3, 2008: 215.3,
  2009: 214.5, 2010: 218.1, 2011: 224.9, 2012: 229.6, 2013: 233.0, 2014: 236.7, 2015: 237.0, 2016: 240.0,
  2017: 245.1, 2018: 251.1, 2019: 255.7, 2020: 258.8, 2021: 271.0, 2022: 292.7, 2023: 304.7, 2024: 314.2,
  2025: 319.5,
};

function getCPI(year: number): number {
  if (CPI_DATA[year] !== undefined) return CPI_DATA[year]!;
  const years = Object.keys(CPI_DATA).map(Number).sort((a, b) => a - b);
  if (year < years[0]!) return CPI_DATA[years[0]!]!;
  if (year > years[years.length - 1]!) return CPI_DATA[years[years.length - 1]!]!;
  let lo = 0;
  let hi = years.length - 1;
  while (lo < hi - 1) {
    const mid = Math.floor((lo + hi) / 2);
    if (years[mid]! <= year) lo = mid;
    else hi = mid;
  }
  const y0 = years[lo]!;
  const y1 = years[hi]!;
  const c0 = CPI_DATA[y0]!;
  const c1 = CPI_DATA[y1]!;
  const t = (year - y0) / (y1 - y0);
  return c0 + t * (c1 - c0);
}

function calcEquivalent(amount: number, fromYear: number, toYear: number): number {
  const cpiFrom = getCPI(fromYear);
  const cpiTo = getCPI(toYear);
  return amount * (cpiTo / cpiFrom);
}

function calcInflationRate(fromYear: number, toYear: number): number {
  const cpiFrom = getCPI(fromYear);
  const cpiTo = getCPI(toYear);
  return ((cpiTo - cpiFrom) / cpiFrom) * 100;
}

function calcAnnualizedRate(fromYear: number, toYear: number): number {
  const years = toYear - fromYear;
  if (years <= 0) return 0;
  const totalRate = calcInflationRate(fromYear, toYear) / 100;
  return (Math.pow(1 + totalRate, 1 / years) - 1) * 100;
}

function useAnimatedValue(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const currentValueRef = useRef(0);

  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const start = currentValueRef.current;
    const diff = target - start;
    if (reduce || Math.abs(diff) < 0.01) {
      setValue(target);
      currentValueRef.current = target;
      return;
    }
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = start + diff * eased;
      setValue(next);
      currentValueRef.current = next;
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, reduce]);

  return value;
}

const SVG_W = 700;
const SVG_H = 220;
const PAD = { top: 20, right: 30, bottom: 35, left: 55 };
const PLOT_W = SVG_W - PAD.left - PAD.right;
const PLOT_H = SVG_H - PAD.top - PAD.bottom;

function buildInflationChart(): { year: number; rate: number }[] {
  const years = Object.keys(CPI_DATA).map(Number).sort((a, b) => a - b);
  return years.slice(1).map((year, i) => {
    const prevCPI = CPI_DATA[years[i]!]!;
    const currCPI = CPI_DATA[year]!;
    return { year, rate: ((currCPI - prevCPI) / prevCPI) * 100 };
  });
}

export function InflationCalculator() {
  const [amount, setAmount] = useState(100);
  const [fromYear, setFromYear] = useState(1970);
  const [toYear, setToYear] = useState(2025);

  const equivalent = useMemo(() => calcEquivalent(amount, fromYear, toYear), [amount, fromYear, toYear]);
  const inflationRate = useMemo(() => calcInflationRate(fromYear, toYear), [fromYear, toYear]);
  const annualizedRate = useMemo(() => calcAnnualizedRate(fromYear, toYear), [fromYear, toYear]);
  const lossPercent = useMemo(() => ((equivalent - amount) / equivalent) * 100, [amount, equivalent]);

  const animatedEquiv = useAnimatedValue(equivalent);
  const chartData = useMemo(() => buildInflationChart(), []);

  const years = Object.keys(CPI_DATA).map(Number).sort((a, b) => a - b);
  const minYear = years[0]!;
  const maxYear = years[years.length - 1]!;

  const chartMaxRate = Math.max(...chartData.map((d) => Math.abs(d.rate)), 5);

  const yearToX = useCallback(
    (year: number) => PAD.left + ((year - minYear) / (maxYear - minYear)) * PLOT_W,
    [minYear, maxYear],
  );
  const rateToY = useCallback(
    (rate: number) => PAD.top + PLOT_H / 2 - (rate / chartMaxRate) * (PLOT_H / 2 - 5),
    [chartMaxRate],
  );

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    if (!isNaN(v) && v >= 0) setAmount(v);
  }, []);

  const presets = [
    { label: "$100", amount: 100 },
    { label: "$1,000", amount: 1000 },
    { label: "$10,000", amount: 10000 },
  ];

  const yearPresets = [
    { from: 1970, to: 2025, label: "1970 → 2025" },
    { from: 1980, to: 2025, label: "1980 → 2025" },
    { from: 2000, to: 2025, label: "2000 → 2025" },
  ];

  return (
    <div className="w-full">
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="text-fg-muted mb-1.5 block font-mono text-[10px] tracking-[0.14em] uppercase">
            金额（美元）
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              min={0}
              step={100}
              className="bg-bg-elevated border-border-faint text-fg-primary focus:border-accent-gold w-full rounded-lg border px-3 py-2 font-mono text-sm outline-none transition-colors"
              aria-label="输入金额"
            />
          </div>
          <div className="mt-2 flex gap-1.5">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => setAmount(p.amount)}
                className={`sim-button text-[9px] ${amount === p.amount ? "!bg-accent-gold/20 !border-accent-gold/50" : ""}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-fg-muted mb-1.5 block font-mono text-[10px] tracking-[0.14em] uppercase">
            起始年份
          </label>
          <input
            type="range"
            min={minYear}
            max={maxYear - 1}
            value={fromYear}
            onChange={(e) => setFromYear(Number(e.target.value))}
            className="sim-slider w-full"
            aria-label="起始年份"
          />
          <div className="text-fg-primary mt-1 text-center font-mono text-sm tabular-nums">
            {fromYear}
          </div>
        </div>
        <div>
          <label className="text-fg-muted mb-1.5 block font-mono text-[10px] tracking-[0.14em] uppercase">
            目标年份
          </label>
          <input
            type="range"
            min={minYear + 1}
            max={maxYear}
            value={toYear}
            onChange={(e) => setToYear(Number(e.target.value))}
            className="sim-slider w-full"
            aria-label="目标年份"
          />
          <div className="text-fg-primary mt-1 text-center font-mono text-sm tabular-nums">
            {toYear}
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {yearPresets.map((p) => (
          <button
            key={p.label}
            onClick={() => {
              setFromYear(p.from);
              setToYear(p.to);
            }}
            className={`sim-button text-[9px] ${fromYear === p.from && toYear === p.to ? "!bg-accent-gold/20 !border-accent-gold/50" : ""}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="data-panel mb-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <span className="data-label">原始金额</span>
            <div className="data-value">
              ${amount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <span className="text-fg-muted font-mono text-[10px]">{fromYear}年</span>
          </div>
          <div>
            <span className="data-label">等值金额</span>
            <div className="data-value stat-negative">
              ${animatedEquiv.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-fg-muted font-mono text-[10px]">{toYear}年</span>
          </div>
          <div>
            <span className="data-label">累计通胀率</span>
            <div className="data-value" style={{ color: "#d47850" }}>
              +{inflationRate.toFixed(1)}%
            </div>
            <span className="text-fg-muted font-mono text-[10px]">总涨幅</span>
          </div>
          <div>
            <span className="data-label">年化通胀率</span>
            <div className="data-value" style={{ color: "#e8a840" }}>
              {annualizedRate.toFixed(2)}%
            </div>
            <span className="text-fg-muted font-mono text-[10px]">年均</span>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-lg border p-3" style={{ borderColor: "rgba(212,120,80,0.2)", background: "linear-gradient(90deg, rgba(212,120,80,0.05) 0%, transparent 60%)" }}>
        <p className="text-fg-secondary text-sm leading-relaxed">
          <span className="font-display text-fg-primary font-semibold">${amount.toLocaleString()}</span>
          <span className="text-fg-muted"> 于 </span>
          <span className="font-mono text-accent-gold">{fromYear}</span>
          <span className="text-fg-muted"> 的购买力相当于 </span>
          <span className="font-display text-fg-primary font-semibold">
            ${animatedEquiv.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-fg-muted"> 于 </span>
          <span className="font-mono text-accent-gold">{toYear}</span>
          <span className="text-fg-muted">。这意味着美元购买力下降了约 </span>
          <span className="font-mono" style={{ color: "#d47850" }}>
            {lossPercent.toFixed(1)}%
          </span>
          <span className="text-fg-muted">。</span>
        </p>
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full"
        role="img"
        aria-label="美国历史年通胀率图表"
      >
        <defs>
          <linearGradient id="ic-pos-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d47850" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d47850" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ic-neg-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#6bae8a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6bae8a" stopOpacity="0" />
          </linearGradient>
        </defs>

        <text x={PAD.left + PLOT_W / 2} y={12} textAnchor="middle" fill="rgba(200,164,90,0.5)" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.1em">
          美国历史年通胀率 (CPI Year-over-Year %)
        </text>

        {[-4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16].filter(v => Math.abs(v) <= chartMaxRate + 1).map((v) => {
          const y = rateToY(v);
          return (
            <g key={v}>
              <line
                x1={PAD.left}
                y1={y}
                x2={PAD.left + PLOT_W}
                y2={y}
                stroke={v === 0 ? "rgba(200,164,90,0.25)" : "rgba(200,164,90,0.06)"}
                strokeWidth={v === 0 ? 1 : 0.5}
              />
              <text
                x={PAD.left - 6}
                y={y + 3}
                textAnchor="end"
                fill="rgba(200,164,90,0.4)"
                fontSize={9}
                fontFamily="var(--font-mono)"
              >
                {v > 0 ? "+" : ""}{v}%
              </text>
            </g>
          );
        })}

        {[1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020].map((year) => {
          const x = yearToX(year);
          return (
            <g key={year}>
              <line x1={x} y1={PAD.top} x2={x} y2={PAD.top + PLOT_H} stroke="rgba(200,164,90,0.04)" />
              <text x={x} y={PAD.top + PLOT_H + 16} textAnchor="middle" fill="rgba(200,164,90,0.4)" fontSize={9} fontFamily="var(--font-mono)">
                {year}
              </text>
            </g>
          );
        })}

        {chartData.map((d) => {
          const x = yearToX(d.year);
          const barW = Math.max(1.5, PLOT_W / chartData.length - 0.5);
          const zeroY = rateToY(0);
          const valY = rateToY(d.rate);
          const barY = d.rate >= 0 ? valY : zeroY;
          const barH = Math.abs(valY - zeroY);
          const isInRange = d.year >= fromYear && d.year <= toYear;
          return (
            <rect
              key={d.year}
              x={x - barW / 2}
              y={barY}
              width={barW}
              height={barH}
              fill={d.rate >= 0 ? "#d47850" : "#6bae8a"}
              opacity={isInRange ? 0.7 : 0.2}
            />
          );
        })}

        {fromYear >= minYear && (
          <line
            x1={yearToX(fromYear)}
            y1={PAD.top}
            x2={yearToX(fromYear)}
            y2={PAD.top + PLOT_H}
            stroke="#c8a45a"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
        )}
        {toYear <= maxYear && (
          <line
            x1={yearToX(toYear)}
            y1={PAD.top}
            x2={yearToX(toYear)}
            y2={PAD.top + PLOT_H}
            stroke="#c8a45a"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
        )}
      </svg>
    </div>
  );
}
