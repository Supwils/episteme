"use client";

import { useMemo, useState } from "react";

const ACCENT = "#4f9cf0";
const N_MAX = 40;

// Each Big-O class: f(n) gives the operation count used for both the (log-scale)
// curve and the numeric readout. n ≤ 40, so even n! (≈8×10⁴⁷) is representable
// as a JS double — no special big-number handling needed.
type Cls = {
  key: string;
  label: string;
  color: string;
  f: (n: number) => number;
  defaultOn: boolean;
};

const CLASSES: Cls[] = [
  { key: "c", label: "O(1)", color: "#98c379", f: () => 1, defaultOn: true },
  { key: "log", label: "O(log n)", color: "#56b6c2", f: (n) => Math.log2(n) + 1, defaultOn: true },
  { key: "n", label: "O(n)", color: ACCENT, f: (n) => n, defaultOn: true },
  {
    key: "nlog",
    label: "O(n log n)",
    color: "#c678dd",
    f: (n) => n * (Math.log2(n) + 1),
    defaultOn: true,
  },
  { key: "n2", label: "O(n²)", color: "#e0a458", f: (n) => n * n, defaultOn: true },
  { key: "exp", label: "O(2ⁿ)", color: "#e06c75", f: (n) => 2 ** n, defaultOn: false },
  { key: "fact", label: "O(n!)", color: "#be8b5a", f: factorial, defaultOn: false },
];

function factorial(n: number): number {
  let r = 1;
  for (let k = 2; k <= n; k++) r *= k;
  return r;
}

const SUP: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

function formatOps(v: number): string {
  if (v < 1000) return String(Math.round(v));
  if (v < 1e6) return Math.round(v).toLocaleString("en-US");
  const exp = v.toExponential(1); // e.g. "8.2e+47"
  const [mant, e] = exp.split("e");
  const power = String(Number(e))
    .split("")
    .map((d) => SUP[d] ?? d)
    .join("");
  return `${mant}×10${power}`;
}

export function ComplexityChart() {
  const [on, setOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CLASSES.map((c) => [c.key, c.defaultOn]))
  );
  const [marker, setMarker] = useState(16);

  const visible = CLASSES.filter((c) => on[c.key]);

  // Log-scale y so classes spanning many orders of magnitude stay distinguishable.
  // The axis is normalised to the tallest visible curve at n = N_MAX.
  const yMax = useMemo(() => {
    const top = Math.max(1, ...visible.map((c) => Math.log10(c.f(N_MAX) + 1)));
    return top;
  }, [visible]);

  const toY = (val: number) => 100 - (Math.log10(val + 1) / yMax) * 96 - 2;
  const toX = (n: number) => ((n - 1) / (N_MAX - 1)) * 100;

  const paths = useMemo(
    () =>
      visible.map((c) => {
        let d = "";
        for (let n = 1; n <= N_MAX; n++) {
          d += `${n === 1 ? "M" : "L"}${toX(n).toFixed(2)},${toY(c.f(n)).toFixed(2)} `;
        }
        return { key: c.key, color: c.color, d };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visible, yMax]
  );

  const markerX = toX(marker);

  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint flex items-center justify-between gap-2 border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: ACCENT }}
        >
          复杂度增长 · 可视化
        </span>
        <span className="text-fg-muted font-mono text-[10px]">对数刻度</span>
      </figcaption>

      {/* class toggles */}
      <div className="border-border-faint flex flex-wrap gap-1.5 border-b px-4 py-3">
        {CLASSES.map((c) => {
          const active = on[c.key];
          return (
            <button
              key={c.key}
              aria-pressed={active}
              onClick={() => setOn((s) => ({ ...s, [c.key]: !s[c.key] }))}
              className="flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[11px] transition-colors"
              style={{
                borderColor: active ? c.color : "var(--color-border-subtle)",
                color: active ? c.color : "var(--color-fg-disabled)",
                backgroundColor: active ? `${c.color}14` : "transparent",
              }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: active ? c.color : "var(--color-fg-disabled)" }}
              />
              {c.label}
            </button>
          );
        })}
      </div>

      {/* chart */}
      <div className="px-4 pt-5 sm:px-6">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-52 w-full"
          role="img"
          aria-label={`复杂度增长曲线，输入规模 n = ${marker} 时各复杂度类的运算次数对比`}
        >
          {/* horizontal gridlines */}
          {[20, 40, 60, 80].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="var(--color-border-subtle)"
              strokeWidth="0.3"
            />
          ))}
          {/* marker line */}
          <line
            x1={markerX}
            y1="0"
            x2={markerX}
            y2="100"
            stroke="var(--color-fg-disabled)"
            strokeWidth="0.4"
            strokeDasharray="2 2"
          />
          {paths.map((p) => (
            <path
              key={p.key}
              d={p.d}
              fill="none"
              stroke={p.color}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* marker dots on each visible curve */}
          {visible.map((c) => (
            <circle
              key={c.key}
              cx={markerX}
              cy={toY(c.f(marker))}
              r="1.4"
              fill={c.color}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <div className="text-fg-disabled mt-1 flex justify-between font-mono text-[9px]">
          <span>n = 1</span>
          <span>输入规模 n →</span>
          <span>n = {N_MAX}</span>
        </div>
      </div>

      {/* marker slider */}
      <div className="px-4 py-4 sm:px-6">
        <label className="text-fg-muted flex items-center gap-3 font-mono text-[11px]">
          <span className="text-fg-disabled tracking-[0.18em] uppercase">规模 n</span>
          <input
            type="range"
            min={1}
            max={N_MAX}
            value={marker}
            onChange={(e) => setMarker(Number(e.target.value))}
            className="w-full accent-[#4f9cf0]"
            aria-label="输入规模 n"
          />
          <span className="text-fg-secondary w-8 text-right">{marker}</span>
        </label>
      </div>

      {/* readout */}
      <div className="border-border-faint grid grid-cols-2 gap-x-4 gap-y-1.5 border-t px-4 py-3 font-mono text-[11px] sm:grid-cols-3 sm:px-6">
        {visible.map((c) => (
          <span key={c.key} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: c.color }}
            />
            <span className="text-fg-muted">{c.label}</span>
            <span className="text-fg-secondary ml-auto">{formatOps(c.f(marker))}</span>
          </span>
        ))}
      </div>

      <p className="text-fg-muted border-border-faint border-t px-4 py-3 text-xs leading-relaxed sm:px-6">
        纵轴是<span className="text-fg-secondary">对数刻度</span>下的运算次数——读数面板给出 n =
        {marker} 时各类的真实数量级。注意 O(2ⁿ) 与 O(n!)
        如何迅速冲破图顶：这正是为什么指数与阶乘级算法只能用于极小输入。
        <span className="text-fg-disabled"> 数值为示意性的渐近估计，忽略常数因子。</span>
      </p>
    </figure>
  );
}
