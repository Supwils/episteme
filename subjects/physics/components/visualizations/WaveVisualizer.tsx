"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/subjects/physics/lib/cn";

type Tab = "single" | "superposition" | "standing" | "spectrum";

const TAB_LABELS: Record<Tab, string> = {
  single: "单波",
  superposition: "叠加",
  standing: "驻波",
  spectrum: "电磁谱",
};

const SVG_WIDTH = 800;
const SVG_HEIGHT = 300;
const PADDING_X = 40;
const PADDING_Y = 30;
const PLOT_W = SVG_WIDTH - 2 * PADDING_X;
const PLOT_H = SVG_HEIGHT - 2 * PADDING_Y;

const EM_BANDS = [
  { name: "无线电波", freq: 3e3, wl: 1e5, color: "#8b5cf6", range: "3 kHz – 300 GHz" },
  { name: "微波", freq: 3e9, wl: 0.1, color: "#6366f1", range: "300 MHz – 300 GHz" },
  { name: "红外线", freq: 4.3e14, wl: 7e-7, color: "#ef4444", range: "700 nm – 1 mm" },
  { name: "可见光", freq: 5.6e14, wl: 5.5e-7, color: "#22c55e", range: "380 – 700 nm" },
  { name: "紫外线", freq: 7.5e14, wl: 3e-7, color: "#3b82f6", range: "10 – 380 nm" },
  { name: "X射线", freq: 3e17, wl: 1e-9, color: "#a855f7", range: "0.01 – 10 nm" },
  { name: "伽马射线", freq: 3e20, wl: 1e-12, color: "#ec4899", range: "< 0.01 nm" },
];

function formatFreq(f: number): string {
  if (f >= 1e18) return `${(f / 1e18).toFixed(1)} EHz`;
  if (f >= 1e15) return `${(f / 1e15).toFixed(1)} PHz`;
  if (f >= 1e12) return `${(f / 1e12).toFixed(1)} THz`;
  if (f >= 1e9) return `${(f / 1e9).toFixed(1)} GHz`;
  if (f >= 1e6) return `${(f / 1e6).toFixed(1)} MHz`;
  if (f >= 1e3) return `${(f / 1e3).toFixed(1)} kHz`;
  return `${f.toFixed(0)} Hz`;
}

function formatWavelength(wl: number): string {
  if (wl >= 1e3) return `${(wl / 1e3).toFixed(0)} km`;
  if (wl >= 1) return `${wl.toFixed(0)} m`;
  if (wl >= 1e-3) return `${(wl * 1e3).toFixed(1)} mm`;
  if (wl >= 1e-6) return `${(wl * 1e9).toFixed(0)} nm`;
  if (wl >= 1e-9) return `${(wl * 1e9).toFixed(2)} nm`;
  return `${(wl * 1e12).toFixed(2)} pm`;
}

function buildSinePath(
  amplitude: number,
  frequency: number,
  phase: number,
  time: number,
  yOffset: number,
  color: string,
  opacity = 1,
): string {
  const points: string[] = [];
  const steps = 200;
  for (let i = 0; i <= steps; i++) {
    const x = PADDING_X + (i / steps) * PLOT_W;
    const t = (i / steps) * 4 * Math.PI;
    const y = yOffset - amplitude * Math.sin(frequency * t + phase + time);
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return points.join(" ");
}

function buildStandingPath(
  amplitude: number,
  harmonics: number,
  time: number,
): string {
  const points: string[] = [];
  const steps = 200;
  for (let i = 0; i <= steps; i++) {
    const x = PADDING_X + (i / steps) * PLOT_W;
    const t = (i / steps) * Math.PI;
    const y =
      SVG_HEIGHT / 2 -
      amplitude *
        Math.sin(harmonics * t) *
        Math.cos(time * 2);
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return points.join(" ");
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <label className="w-20 shrink-0 text-xs text-fg-secondary">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-accent-cool"
      />
      <span className="w-16 text-right font-mono text-xs text-fg-muted">
        {step < 1 ? value.toFixed(step < 0.1 ? 2 : 1) : value}
        {unit ?? ""}
      </span>
    </div>
  );
}

function EquationDisplay({ equation }: { equation: string }) {
  return (
    <div className="rounded-lg border border-accent-cool/20 bg-accent-cool/5 px-4 py-2">
      <p className="font-mono text-xs text-accent-cool">{equation}</p>
    </div>
  );
}

function Axes() {
  return (
    <g>
      <line
        x1={PADDING_X}
        y1={SVG_HEIGHT / 2}
        x2={SVG_WIDTH - PADDING_X}
        y2={SVG_HEIGHT / 2}
        stroke="currentColor"
        className="text-fg-disabled/40"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <line
        x1={PADDING_X}
        y1={PADDING_Y}
        x2={PADDING_X}
        y2={SVG_HEIGHT - PADDING_Y}
        stroke="currentColor"
        className="text-fg-disabled/40"
        strokeWidth={1}
      />
      <text
        x={SVG_WIDTH - PADDING_X + 8}
        y={SVG_HEIGHT / 2 + 4}
        className="fill-fg-muted text-[10px]"
      >
        x
      </text>
      <text
        x={PADDING_X + 4}
        y={PADDING_Y - 6}
        className="fill-fg-muted text-[10px]"
      >
        y
      </text>
    </g>
  );
}

function SingleWaveTab({ time }: { time: number }) {
  const [amplitude, setAmplitude] = useState(80);
  const [frequency, setFrequency] = useState(1);
  const [phase, setPhase] = useState(0);

  const wavePath = useMemo(
    () => buildSinePath(amplitude, frequency, phase, time, SVG_HEIGHT / 2, "#6ad0ff"),
    [amplitude, frequency, phase, time],
  );

  const wavelength = PLOT_W / frequency;
  const period = (2 * Math.PI) / (frequency || 1);
  const speed = wavelength * (1 / period);

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full">
        <Axes />
        <path d={wavePath} fill="none" stroke="#6ad0ff" strokeWidth={2.5} />
        <g>
          <line
            x1={PADDING_X}
            y1={SVG_HEIGHT / 2 - amplitude}
            x2={PADDING_X + 6}
            y2={SVG_HEIGHT / 2 - amplitude}
            stroke="#ffb45a"
            strokeWidth={1}
          />
          <text
            x={PADDING_X + 10}
            y={SVG_HEIGHT / 2 - amplitude + 4}
            className="fill-accent-warm text-[10px]"
          >
            A = {amplitude.toFixed(0)}
          </text>
        </g>
      </svg>

      <EquationDisplay
        equation={`y = ${amplitude.toFixed(0)} · sin(${frequency.toFixed(1)}x + ${phase.toFixed(2)})`}
      />

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-fg-disabled/30 bg-bg-panel/50 px-3 py-2">
          <p className="text-[10px] text-fg-muted">波长 λ</p>
          <p className="font-mono text-sm text-fg-primary">{wavelength.toFixed(0)} px</p>
        </div>
        <div className="rounded-lg border border-fg-disabled/30 bg-bg-panel/50 px-3 py-2">
          <p className="text-[10px] text-fg-muted">周期 T</p>
          <p className="font-mono text-sm text-fg-primary">{period.toFixed(2)} s</p>
        </div>
        <div className="rounded-lg border border-fg-disabled/30 bg-bg-panel/50 px-3 py-2">
          <p className="text-[10px] text-fg-muted">波速 v</p>
          <p className="font-mono text-sm text-fg-primary">{speed.toFixed(1)} px/s</p>
        </div>
      </div>

      <div className="space-y-3">
        <Slider label="振幅 A" value={amplitude} min={10} max={120} step={1} onChange={setAmplitude} />
        <Slider label="频率 f" value={frequency} min={0.5} max={4} step={0.1} onChange={setFrequency} />
        <Slider label="相位 φ" value={phase} min={0} max={6.28} step={0.01} unit=" rad" onChange={setPhase} />
      </div>
    </div>
  );
}

function SuperpositionTab({ time }: { time: number }) {
  const [amp1, setAmp1] = useState(70);
  const [freq1, setFreq1] = useState(1);
  const [phase1, setPhase1] = useState(0);
  const [amp2, setAmp2] = useState(50);
  const [freq2, setFreq2] = useState(2);
  const [phase2, setPhase2] = useState(0);

  const path1 = useMemo(
    () => buildSinePath(amp1, freq1, phase1, time, SVG_HEIGHT / 2, "#6ad0ff"),
    [amp1, freq1, phase1, time],
  );
  const path2 = useMemo(
    () => buildSinePath(amp2, freq2, phase2, time, SVG_HEIGHT / 2, "#ffb45a"),
    [amp2, freq2, phase2, time],
  );

  const resultantPath = useMemo(() => {
    const points: string[] = [];
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const x = PADDING_X + (i / steps) * PLOT_W;
      const t = (i / steps) * 4 * Math.PI;
      const y1 = amp1 * Math.sin(freq1 * t + phase1 + time);
      const y2 = amp2 * Math.sin(freq2 * t + phase2 + time);
      const y = SVG_HEIGHT / 2 - (y1 + y2);
      points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return points.join(" ");
  }, [amp1, freq1, phase1, amp2, freq2, phase2, time]);

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full">
        <Axes />
        <path d={path1} fill="none" stroke="#6ad0ff" strokeWidth={1.5} opacity={0.5} />
        <path d={path2} fill="none" stroke="#ffb45a" strokeWidth={1.5} opacity={0.5} />
        <path d={resultantPath} fill="none" stroke="#22c55e" strokeWidth={2.5} />
      </svg>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-4 bg-accent-cool" />
          <span className="text-xs text-fg-muted">波 1</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-4 bg-accent-warm" />
          <span className="text-xs text-fg-muted">波 2</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-4 bg-green-500" />
          <span className="text-xs text-fg-muted">合成波</span>
        </div>
      </div>

      <EquationDisplay
        equation={`y = ${amp1}·sin(${freq1}x) + ${amp2}·sin(${freq2}x)`}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-accent-cool">波 1</p>
          <Slider label="振幅 A₁" value={amp1} min={10} max={120} step={1} onChange={setAmp1} />
          <Slider label="频率 f₁" value={freq1} min={0.5} max={4} step={0.1} onChange={setFreq1} />
          <Slider label="相位 φ₁" value={phase1} min={0} max={6.28} step={0.01} unit=" rad" onChange={setPhase1} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-accent-warm">波 2</p>
          <Slider label="振幅 A₂" value={amp2} min={10} max={120} step={1} onChange={setAmp2} />
          <Slider label="频率 f₂" value={freq2} min={0.5} max={4} step={0.1} onChange={setFreq2} />
          <Slider label="相位 φ₂" value={phase2} min={0} max={6.28} step={0.01} unit=" rad" onChange={setPhase2} />
        </div>
      </div>
    </div>
  );
}

function StandingWaveTab({ time }: { time: number }) {
  const [amplitude, setAmplitude] = useState(80);
  const [harmonics, setHarmonics] = useState(3);

  const wavePath = useMemo(
    () => buildStandingPath(amplitude, harmonics, time),
    [amplitude, harmonics, time],
  );

  const envelopeTop = useMemo(() => {
    const points: string[] = [];
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const x = PADDING_X + (i / steps) * PLOT_W;
      const t = (i / steps) * Math.PI;
      const y = SVG_HEIGHT / 2 - amplitude * Math.abs(Math.sin(harmonics * t));
      points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return points.join(" ");
  }, [amplitude, harmonics]);

  const envelopeBottom = useMemo(() => {
    const points: string[] = [];
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const x = PADDING_X + (i / steps) * PLOT_W;
      const t = (i / steps) * Math.PI;
      const y = SVG_HEIGHT / 2 + amplitude * Math.abs(Math.sin(harmonics * t));
      points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return points.join(" ");
  }, [amplitude, harmonics]);

  const nodes = useMemo(() => {
    const result: number[] = [];
    for (let n = 0; n <= harmonics; n++) {
      result.push(PADDING_X + (n / harmonics) * PLOT_W);
    }
    return result;
  }, [harmonics]);

  const antinodes = useMemo(() => {
    const result: number[] = [];
    for (let n = 0; n < harmonics; n++) {
      result.push(PADDING_X + ((n + 0.5) / harmonics) * PLOT_W);
    }
    return result;
  }, [harmonics]);

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full">
        <Axes />
        <path d={envelopeTop} fill="none" stroke="#3a3e4a" strokeWidth={1} strokeDasharray="4 4" />
        <path d={envelopeBottom} fill="none" stroke="#3a3e4a" strokeWidth={1} strokeDasharray="4 4" />
        <path d={wavePath} fill="none" stroke="#6ad0ff" strokeWidth={2.5} />
        {nodes.map((nx, i) => (
          <g key={`node-${i}`}>
            <line
              x1={nx}
              y1={SVG_HEIGHT / 2 - 12}
              x2={nx}
              y2={SVG_HEIGHT / 2 + 12}
              stroke="#ef4444"
              strokeWidth={2}
            />
            <circle cx={nx} cy={SVG_HEIGHT / 2} r={4} fill="#ef4444" />
            <text
              x={nx}
              y={SVG_HEIGHT / 2 + 26}
              textAnchor="middle"
              className="fill-red-400 text-[9px]"
            >
              N
            </text>
          </g>
        ))}
        {antinodes.map((ax, i) => (
          <g key={`antinode-${i}`}>
            <circle
              cx={ax}
              cy={SVG_HEIGHT / 2}
              r={6}
              fill="none"
              stroke="#22c55e"
              strokeWidth={1.5}
              strokeDasharray="3 2"
            />
            <text
              x={ax}
              y={SVG_HEIGHT / 2 + 26}
              textAnchor="middle"
              className="fill-green-400 text-[9px]"
            >
              A
            </text>
          </g>
        ))}
      </svg>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
          <span className="text-xs text-fg-muted">节点 (Node)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full border border-green-500" />
          <span className="text-xs text-fg-muted">反节点 (Antinode)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-4 bg-fg-disabled" style={{ borderTop: "1px dashed #3a3e4a" }} />
          <span className="text-xs text-fg-muted">包络线</span>
        </div>
      </div>

      <EquationDisplay
        equation={`y(x,t) = ${amplitude}·sin(${harmonics}πx/L)·cos(2πft) — 第 ${harmonics} 谐波`}
      />

      <div className="space-y-3">
        <Slider label="振幅 A" value={amplitude} min={20} max={120} step={1} onChange={setAmplitude} />
        <Slider label="谐波 n" value={harmonics} min={1} max={8} step={1} onChange={setHarmonics} />
      </div>

      <div className="rounded-lg border border-accent-cool/20 bg-accent-cool/5 p-3">
        <p className="text-xs text-fg-secondary">
          <span className="font-medium text-accent-cool">驻波：</span>
          当两列频率相同、振幅相同的波沿相反方向传播时，叠加形成驻波。
          节点（N）处振幅始终为零，反节点（A）处振幅最大。
          第 n 谐波有 n 个节点（含两端）和 n-1 个反节点。
        </p>
      </div>
    </div>
  );
}

function EMSpectrumTab() {
  const [bandIndex, setBandIndex] = useState(3);
  const band = EM_BANDS[bandIndex]!;
  const freq = band.freq;
  const wl = band.wl;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-xl border border-fg-disabled/30 bg-bg-deep p-4">
        <div className="flex gap-1">
          {EM_BANDS.map((b, i) => (
            <button
              key={b.name}
              onClick={() => setBandIndex(i)}
              className={cn(
                "flex-1 rounded-lg py-3 text-center transition-all duration-200",
                i === bandIndex
                  ? "ring-2 ring-offset-2 ring-offset-bg-deep scale-105"
                  : "opacity-60 hover:opacity-80",
              )}
              style={{
                background: `linear-gradient(135deg, ${b.color}22, ${b.color}44)`,
                boxShadow: i === bandIndex ? `0 0 0 2px ${b.color}` : undefined,
                borderColor: b.color,
              }}
            >
              <p className="text-[10px] font-medium" style={{ color: b.color }}>
                {b.name}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center">
          <div
            className="h-24 w-full rounded-lg"
            style={{
              background: `linear-gradient(90deg, ${band.color}00, ${band.color}, ${band.color}00)`,
              boxShadow: `0 0 60px ${band.color}40`,
            }}
          />
        </div>

        <p className="mt-2 text-center text-xs text-fg-muted">{band.range}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-fg-disabled/30 bg-bg-panel/50 px-3 py-2">
          <p className="text-[10px] text-fg-muted">频率</p>
          <p className="font-mono text-sm text-fg-primary">{formatFreq(freq)}</p>
        </div>
        <div className="rounded-lg border border-fg-disabled/30 bg-bg-panel/50 px-3 py-2">
          <p className="text-[10px] text-fg-muted">波长</p>
          <p className="font-mono text-sm text-fg-primary">{formatWavelength(wl)}</p>
        </div>
      </div>

      <EquationDisplay
        equation={`c = λ · f  →  ${formatFreq(freq)} × ${formatWavelength(wl)} ≈ 3×10⁸ m/s`}
      />

      <div className="space-y-3">
        <Slider
          label="电磁波段"
          value={bandIndex}
          min={0}
          max={EM_BANDS.length - 1}
          step={1}
          onChange={(v) => setBandIndex(Math.round(v))}
        />
      </div>

      <div className="rounded-lg border border-accent-cool/20 bg-accent-cool/5 p-3">
        <p className="text-xs text-fg-secondary">
          <span className="font-medium text-accent-cool">电磁波谱：</span>
          所有电磁波以光速 c ≈ 3×10⁸ m/s 传播，满足 c = λf。
          从低频长波长的无线电波到高频短波长的伽马射线，
          本质都是振荡的电场与磁场在空间中传播。可见光只是其中极窄的一段（380–700 nm）。
        </p>
      </div>
    </div>
  );
}

export function WaveVisualizer({ className }: { className?: string }) {
  const [tab, setTab] = useState<Tab>("single");
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animRef = useRef<number>(0);
  const lastFrameRef = useRef(0);

  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const tick = useCallback(() => {
    const now = performance.now();
    const dt = (now - lastFrameRef.current) / 1000;
    lastFrameRef.current = now;
    setTime((t) => t + dt * 2);
    animRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      lastFrameRef.current = performance.now();
      animRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, tick]);

  const handlePlayToggle = () => {
    if (prefersReducedMotion.current) {
      setTime((t) => t + 0.5);
      return;
    }
    setIsPlaying((p) => !p);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-1 rounded-lg bg-bg-panel/50 p-1">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setTime(0);
              setIsPlaying(false);
            }}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors",
              tab === t
                ? "bg-accent-cool/20 text-accent-cool"
                : "text-fg-muted hover:text-fg-secondary",
            )}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {tab !== "spectrum" && (
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="rounded-lg bg-accent-cool/20 px-4 py-2 text-sm text-accent-cool transition-colors hover:bg-accent-cool/30"
          >
            {isPlaying ? "暂停" : "播放"}
          </button>
          <button
            onClick={handleReset}
            className="rounded-lg bg-fg-disabled/20 px-4 py-2 text-sm text-fg-secondary transition-colors hover:bg-fg-disabled/30"
          >
            重置
          </button>
          <span className="ml-auto font-mono text-xs text-fg-muted">
            t = {time.toFixed(1)}s
          </span>
        </div>
      )}

      {tab === "single" && <SingleWaveTab time={time} />}
      {tab === "superposition" && <SuperpositionTab time={time} />}
      {tab === "standing" && <StandingWaveTab time={time} />}
      {tab === "spectrum" && <EMSpectrumTab />}
    </div>
  );
}
