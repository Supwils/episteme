"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PRODUCT_EASE } from "@/src-psychology/lib/constants";

interface ReviewPoint {
  hour: number;
  retention: number;
}

const SVG_W = 700;
const SVG_H = 380;
const PAD = { top: 30, right: 30, bottom: 50, left: 60 };
const PLOT_W = SVG_W - PAD.left - PAD.right;
const PLOT_H = SVG_H - PAD.top - PAD.bottom;

const X_MAX = 720;
const Y_MAX = 100;

const TIME_LABELS = [
  { h: 0, label: "0" },
  { h: 24, label: "1天" },
  { h: 72, label: "3天" },
  { h: 168, label: "1周" },
  { h: 336, label: "2周" },
  { h: 720, label: "1月" },
];

const OPTIMAL_INTERVALS = [
  { label: "第1次复习", hour: 1, color: "#22c55e" },
  { label: "第2次复习", hour: 24, color: "#3b82f6" },
  { label: "第3次复习", hour: 168, color: "#8b5cf6" },
  { label: "第4次复习", hour: 720, color: "#f59e0b" },
];

function ebbinghausRetention(t: number, stability: number): number {
  return 100 * Math.exp(-t / stability);
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function scaleX(hour: number): number {
  return PAD.left + (hour / X_MAX) * PLOT_W;
}

function scaleY(retention: number): number {
  return PAD.top + ((Y_MAX - retention) / Y_MAX) * PLOT_H;
}

function generateCurvePath(
  stability: number,
  reviewPoints: ReviewPoint[],
): string {
  const points: { x: number; y: number }[] = [];
  const steps = 200;

  let segments: { start: number; end: number; stab: number }[] = [];

  if (reviewPoints.length === 0) {
    segments.push({ start: 0, end: X_MAX, stab: stability });
  } else {
    const sorted = [...reviewPoints].sort((a, b) => a.hour - b.hour);
    let cursor = 0;
    let currentStab = stability;

    for (const rp of sorted) {
      if (rp.hour > cursor) {
        segments.push({ start: cursor, end: rp.hour, stab: currentStab });
      }
      currentStab *= 2.5;
      cursor = rp.hour;
    }
    if (cursor < X_MAX) {
      segments.push({ start: cursor, end: X_MAX, stab: currentStab });
    }
  }

  for (const seg of segments) {
    const segSteps = Math.max(
      10,
      Math.round((steps * (seg.end - seg.start)) / X_MAX),
    );
    for (let i = 0; i <= segSteps; i++) {
      const t = seg.start + ((seg.end - seg.start) * i) / segSteps;
      const retention = ebbinghausRetention(t - seg.start, seg.stab);
      points.push({ x: scaleX(t), y: scaleY(retention) });
    }
  }

  if (points.length === 0) return "";

  let d = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i]!.x} ${points[i]!.y}`;
  }
  return d;
}

function generateNoReviewPath(): string {
  const stability = 10;
  const points: string[] = [];
  for (let i = 0; i <= 200; i++) {
    const t = (i / 200) * X_MAX;
    const r = ebbinghausRetention(t, stability);
    const x = scaleX(t);
    const y = scaleY(r);
    points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
  }
  return points.join(" ");
}

const DEFAULT_STABILITY = 10;

export default function MemoryCurve() {
  const reduce = useReducedMotion();
  const [reviewCount, setReviewCount] = useState(0);
  const [stability] = useState(DEFAULT_STABILITY);

  const reviewPoints = useMemo((): ReviewPoint[] => {
    const intervals = OPTIMAL_INTERVALS.slice(0, reviewCount);
    return intervals.map((iv) => ({
      hour: iv.hour,
      retention: ebbinghausRetention(iv.hour, stability),
    }));
  }, [reviewCount, stability]);

  const curvePath = useMemo(
    () => generateCurvePath(stability, reviewPoints),
    [stability, reviewPoints],
  );

  const noReviewPath = useMemo(() => generateNoReviewPath(), []);

  const retentionAt30Days = useMemo(() => {
    if (reviewPoints.length === 0) {
      return Math.round(ebbinghausRetention(720, stability));
    }
    const sorted = [...reviewPoints].sort((a, b) => a.hour - b.hour);
    let currentStab = stability;
    let lastReviewHour = 0;
    for (const rp of sorted) {
      if (rp.hour <= 720) {
        currentStab *= 2.5;
        lastReviewHour = rp.hour;
      }
    }
    return Math.round(ebbinghausRetention(720 - lastReviewHour, currentStab));
  }, [reviewPoints, stability]);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReviewCount(Number(e.target.value));
    },
    [],
  );

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-fg-muted font-mono text-[10px] tracking-[0.42em] uppercase">
          ebbinghaus forgetting curve
        </p>
        <h2 className="font-display text-fg-primary mt-1 text-lg font-semibold">
          记忆曲线与间隔重复
        </h2>
      </div>

      <div className="border-border-faint bg-bg-panel border p-6 backdrop-blur-md">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="h-auto w-full"
          role="img"
          aria-label="艾宾浩斯遗忘曲线与间隔重复效果"
        >
          <defs>
            <linearGradient id="mc-area-no-review" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(239,68,68,0.15)" />
              <stop offset="100%" stopColor="rgba(239,68,68,0)" />
            </linearGradient>
            <linearGradient id="mc-area-review" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(139,92,246,0.2)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>
          </defs>

          {[0, 20, 40, 60, 80, 100].map((v) => (
            <g key={`grid-${v}`}>
              <line
                x1={PAD.left}
                y1={scaleY(v)}
                x2={PAD.left + PLOT_W}
                y2={scaleY(v)}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth={0.5}
              />
              <text
                x={PAD.left - 8}
                y={scaleY(v)}
                textAnchor="end"
                dominantBaseline="central"
                fill="rgba(255,255,255,0.3)"
                fontSize={10}
                fontFamily="var(--font-mono)"
              >
                {v}%
              </text>
            </g>
          ))}

          {TIME_LABELS.map((tl) => (
            <g key={`time-${tl.h}`}>
              <line
                x1={scaleX(tl.h)}
                y1={PAD.top}
                x2={scaleX(tl.h)}
                y2={PAD.top + PLOT_H}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth={0.5}
              />
              <text
                x={scaleX(tl.h)}
                y={PAD.top + PLOT_H + 20}
                textAnchor="middle"
                fill="rgba(255,255,255,0.3)"
                fontSize={10}
                fontFamily="var(--font-mono)"
              >
                {tl.label}
              </text>
            </g>
          ))}

          <text
            x={PAD.left + PLOT_W / 2}
            y={SVG_H - 6}
            textAnchor="middle"
            fill="rgba(255,255,255,0.25)"
            fontSize={10}
            fontFamily="var(--font-mono)"
            letterSpacing="0.1em"
          >
            学习后时间
          </text>

          <text
            x={14}
            y={PAD.top + PLOT_H / 2}
            textAnchor="middle"
            fill="rgba(255,255,255,0.25)"
            fontSize={10}
            fontFamily="var(--font-mono)"
            letterSpacing="0.1em"
            transform={`rotate(-90, 14, ${PAD.top + PLOT_H / 2})`}
          >
            记忆保留率
          </text>

          <path
            d={`${noReviewPath} L ${scaleX(X_MAX)} ${scaleY(0)} L ${scaleX(0)} ${scaleY(0)} Z`}
            fill="url(#mc-area-no-review)"
          />
          <motion.path
            d={noReviewPath}
            fill="none"
            stroke="rgba(239,68,68,0.5)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 1.5, ease: PRODUCT_EASE }}
          />

          {reviewCount > 0 && (
            <>
              <path
                d={`${curvePath} L ${scaleX(X_MAX)} ${scaleY(0)} L ${scaleX(0)} ${scaleY(0)} Z`}
                fill="url(#mc-area-review)"
              />
              <motion.path
                d={curvePath}
                fill="none"
                stroke="#9b7dc4"
                strokeWidth={2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduce ? 0 : 1, ease: PRODUCT_EASE }}
              />
            </>
          )}

          {OPTIMAL_INTERVALS.slice(0, reviewCount).map((iv, i) => (
            <motion.g
              key={iv.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.3, delay: i * 0.1 }}
            >
              <line
                x1={scaleX(iv.hour)}
                y1={PAD.top}
                x2={scaleX(iv.hour)}
                y2={PAD.top + PLOT_H}
                stroke={hexToRgba(iv.color, 0.4)}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <circle
                cx={scaleX(iv.hour)}
                cy={scaleY(
                  reviewPoints[i]?.retention ??
                    ebbinghausRetention(iv.hour, stability),
                )}
                r={4}
                fill={iv.color}
              />
              <text
                x={scaleX(iv.hour)}
                y={PAD.top - 8}
                textAnchor="middle"
                fill={iv.color}
                fontSize={9}
                fontFamily="var(--font-mono)"
              >
                {iv.label}
              </text>
            </motion.g>
          ))}

          <text
            x={PAD.left + 10}
            y={PAD.top + 16}
            fill="rgba(239,68,68,0.6)"
            fontSize={10}
            fontFamily="var(--font-mono)"
          >
            不复习
          </text>
          {reviewCount > 0 && (
            <text
              x={PAD.left + 10}
              y={PAD.top + 32}
              fill="rgba(155,125,196,0.8)"
              fontSize={10}
              fontFamily="var(--font-mono)"
            >
              间隔重复
            </text>
          )}
        </svg>

        <div className="border-border-faint mt-4 border-t pt-4">
          <div className="flex items-center gap-4">
            <span className="text-fg-muted font-mono text-[10px] tracking-[0.22em] uppercase whitespace-nowrap">
              复习次数
            </span>
            <input
              type="range"
              min={0}
              max={4}
              step={1}
              value={reviewCount}
              onChange={handleSliderChange}
              className="accent-accent-purple h-1.5 flex-1 cursor-pointer"
              aria-label="复习次数"
            />
            <span className="text-accent-purple w-8 text-right font-mono text-sm font-bold tabular-nums">
              {reviewCount}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {OPTIMAL_INTERVALS.map((iv, i) => (
              <span
                key={iv.label}
                className={`rounded-sm px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] transition-colors ${
                  i < reviewCount
                    ? "border bg-white/5"
                    : "border border-transparent opacity-30"
                }`}
                style={{
                  borderColor: i < reviewCount ? hexToRgba(iv.color, 0.3) : "transparent",
                  color: i < reviewCount ? iv.color : "rgba(255,255,255,0.3)",
                }}
              >
                {iv.label}：{iv.hour < 24 ? `${iv.hour}小时` : iv.hour < 168 ? `${iv.hour / 24}天` : `${iv.hour / 168}周`}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="border-border-faint bg-bg-near border p-3">
            <p className="text-fg-muted font-mono text-[10px] tracking-[0.18em] uppercase">
              30天后记忆保留率
            </p>
            <p className="font-display text-fg-primary mt-1 text-2xl font-semibold">
              {retentionAt30Days}%
              <span className="text-fg-muted ml-2 text-xs font-normal">
                {reviewCount === 0 ? "不复习" : `${reviewCount}次复习`}
              </span>
            </p>
          </div>
          <div className="border-border-faint bg-bg-near border p-3">
            <p className="text-fg-muted font-mono text-[10px] tracking-[0.18em] uppercase">
              记忆稳定度提升
            </p>
            <p className="font-display text-fg-primary mt-1 text-2xl font-semibold">
              {reviewCount === 0 ? "1×" : `${Math.pow(2.5, reviewCount).toFixed(1)}×`}
              <span className="text-fg-muted ml-2 text-xs font-normal">
                每次复习 ×2.5
              </span>
            </p>
          </div>
        </div>

        <div className="border-border-faint mt-4 border-t pt-4">
          <h4 className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
            科学背景
          </h4>
          <p className="text-fg-secondary text-sm leading-relaxed">
            <strong className="text-fg-primary">艾宾浩斯遗忘曲线</strong>
            （Ebbinghaus, 1885）揭示了记忆随时间呈指数衰减的规律。
            <strong className="text-fg-primary">间隔重复</strong>
            （Spaced Repetition）利用每次复习后遗忘曲线变缓的特性——每次成功回忆会将记忆稳定度
            提升约 2.5 倍。这就是 Anki 等记忆软件背后的科学原理。
          </p>
        </div>
      </div>
    </div>
  );
}
