'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

type VirtuePair = {
  name: string;
  nameEn: string;
  excess: string;
  deficiency: string;
  mean: number;
};

const VIRTUE_PAIRS: VirtuePair[] = [
  { name: '勇气', nameEn: 'Courage', excess: '鲁莽', deficiency: '怯懦', mean: 0.65 },
  { name: '节制', nameEn: 'Temperance', excess: '放纵', deficiency: '麻木', mean: 0.55 },
  { name: '正义', nameEn: 'Justice', excess: '苛刻', deficiency: '纵容', mean: 0.6 },
  { name: '慷慨', nameEn: 'Generosity', excess: '挥霍', deficiency: '吝啬', mean: 0.55 },
  { name: '诚实', nameEn: 'Truthfulness', excess: '自夸', deficiency: '自贬', mean: 0.5 },
  { name: '机智', nameEn: 'Wit', excess: '粗俗', deficiency: '呆板', mean: 0.5 },
  { name: '友善', nameEn: 'Friendliness', excess: '谄媚', deficiency: '乖戾', mean: 0.55 },
  { name: '羞耻', nameEn: 'Shame', excess: '羞怯', deficiency: '无耻', mean: 0.5 },
  { name: '温和', nameEn: 'Gentleness', excess: '暴躁', deficiency: '萎靡', mean: 0.55 },
  { name: '大度', nameEn: 'Magnanimity', excess: '虚荣', deficiency: '小气', mean: 0.6 },
];

const SVG_SIZE = 400;
const CX = SVG_SIZE / 2;
const CY = SVG_SIZE / 2;
const RADIUS = 150;

function polarToCart(angle: number, r: number): [number, number] {
  const rad = ((angle - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

function getPolygonPoints(values: number[]): string {
  const n = values.length;
  const angleStep = 360 / n;
  return values
    .map((v, i) => {
      const [x, y] = polarToCart(i * angleStep, v * RADIUS);
      return `${x},${y}`;
    })
    .join(' ');
}

export default function VirtueRadar() {
  const [userValues, setUserValues] = useState<number[]>(VIRTUE_PAIRS.map(() => 0.5));
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showExcess, setShowExcess] = useState(false);

  const meanPoints = useMemo(
    () => getPolygonPoints(VIRTUE_PAIRS.map((v) => v.mean)),
    [],
  );
  const userPoints = useMemo(() => getPolygonPoints(userValues), [userValues]);

  const n = VIRTUE_PAIRS.length;
  const angleStep = 360 / n;

  const handleSliderChange = (idx: number, value: number) => {
    setUserValues((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const overallScore = userValues.reduce((sum, v) => sum + v, 0) / n;
  const goldenMeanScore = VIRTUE_PAIRS.reduce((sum, v) => sum + v.mean, 0) / n;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="border-border-faint bg-bg-panel relative overflow-hidden rounded-lg border p-4">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="h-auto w-full" style={{ maxHeight: 380 }}>
              <defs>
                <radialGradient id="virtue-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width={SVG_SIZE} height={SVG_SIZE} fill="url(#virtue-glow)" />

              {[0.25, 0.5, 0.75, 1].map((scale) => (
                <polygon
                  key={scale}
                  points={Array.from({ length: n }, (_, i) => {
                    const [x, y] = polarToCart(i * angleStep, scale * RADIUS);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="var(--color-border-faint)"
                  strokeWidth={scale === 1 ? 1 : 0.5}
                  strokeDasharray={scale === 1 ? undefined : '2 3'}
                />
              ))}

              {VIRTUE_PAIRS.map((_, i) => {
                const [x, y] = polarToCart(i * angleStep, RADIUS);
                return (
                  <line
                    key={i}
                    x1={CX}
                    y1={CY}
                    x2={x}
                    y2={y}
                    stroke="var(--color-border-faint)"
                    strokeWidth="0.5"
                  />
                );
              })}

              <motion.polygon
                points={meanPoints}
                fill="#c8a45a"
                fillOpacity="0.08"
                stroke="#c8a45a"
                strokeWidth="1.5"
                strokeOpacity="0.5"
                strokeDasharray="4 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />

              <motion.polygon
                points={userPoints}
                fill="#6366f1"
                fillOpacity="0.12"
                stroke="#6366f1"
                strokeWidth="2"
                strokeOpacity="0.7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              {VIRTUE_PAIRS.map((virtue, i) => {
                const [lx, ly] = polarToCart(i * angleStep, RADIUS + 24);
                const isHovered = hoveredIdx === i;
                return (
                  <g key={i}>
                    <text
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isHovered ? 'var(--color-accent-gold)' : 'var(--color-fg-muted)'}
                      fontSize="10"
                      fontWeight={isHovered ? '600' : '400'}
                      fontFamily="var(--font-sans)"
                      className="pointer-events-none select-none transition-colors"
                    >
                      {virtue.name}
                    </text>
                    <text
                      x={lx}
                      y={ly + 12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="var(--color-fg-disabled)"
                      fontSize="7"
                      fontFamily="var(--font-mono)"
                      className="pointer-events-none select-none"
                    >
                      {virtue.nameEn}
                    </text>
                  </g>
                );
              })}

              {VIRTUE_PAIRS.map((virtue, i) => {
                const [ux, uy] = polarToCart(i * angleStep, userValues[i]! * RADIUS);
                return (
                  <motion.circle
                    key={`user-${i}`}
                    cx={ux}
                    cy={uy}
                    r={hoveredIdx === i ? 5 : 3.5}
                    fill="#6366f1"
                    stroke="#fff"
                    strokeWidth={1}
                    animate={{ cx: ux, cy: uy }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                );
              })}

              {showExcess &&
                VIRTUE_PAIRS.map((virtue, i) => {
                  const [ex, ey] = polarToCart(i * angleStep, RADIUS + 38);
                  const [dx, dy] = polarToCart(i * angleStep, -(RADIUS + 38));
                  return (
                    <g key={`extreme-${i}`} className="pointer-events-none select-none">
                      <text x={ex} y={ey + 10} textAnchor="middle" fill="#e06c75" fontSize="7" fontFamily="var(--font-mono)" opacity="0.6">
                        {virtue.excess}
                      </text>
                      <text x={dx} y={dy} textAnchor="middle" fill="#61afef" fontSize="7" fontFamily="var(--font-mono)" opacity="0.6">
                        {virtue.deficiency}
                      </text>
                    </g>
                  );
                })}

              <text x={CX} y={SVG_SIZE - 8} textAnchor="middle" fill="var(--color-fg-disabled)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.12em">
                Aristotle&apos;s Virtue Ethics · 亚里士多德美德伦理
              </text>
            </svg>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-72">
            <div className="border-border-faint bg-bg-elevated space-y-2 p-4">
              <div className="flex items-center justify-between">
                <span className="text-fg-primary font-mono text-[10px] tracking-[0.18em]">你的美德</span>
                <span className="font-mono text-[11px] font-semibold text-indigo-400">
                  {(overallScore * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-primary font-mono text-[10px] tracking-[0.18em]">中道标准</span>
                <span className="font-mono text-[11px] font-semibold text-amber-400">
                  {(goldenMeanScore * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-primary font-mono text-[10px] tracking-[0.18em]">偏差</span>
                <span className="font-mono text-[11px] text-fg-secondary">
                  {Math.abs(overallScore - goldenMeanScore) < 0.05 ? '接近中道' : overallScore > goldenMeanScore ? '偏过度' : '偏不足'}
                </span>
              </div>
            </div>

            <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
              {VIRTUE_PAIRS.map((virtue, i) => (
                <div
                  key={i}
                  className="border-border-faint bg-bg-elevated rounded border p-2.5 transition-colors hover:border-fg-disabled/30"
                  onPointerEnter={() => setHoveredIdx(i)}
                  onPointerLeave={() => setHoveredIdx(null)}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-fg-primary font-mono text-[10px] tracking-[0.08em]">
                      {virtue.name}
                      <span className="text-fg-disabled ml-1">{virtue.nameEn}</span>
                    </span>
                    <span className="font-mono text-[10px] text-indigo-400">
                      {(userValues[i]! * 100).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-fg-disabled w-8 text-right font-mono text-[8px]">{virtue.deficiency}</span>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={userValues[i]}
                      onChange={(e) => handleSliderChange(i, Number(e.target.value))}
                      className="accent-accent-indigo flex-1"
                      aria-label={`${virtue.name}滑块`}
                    />
                    <span className="text-fg-disabled w-8 font-mono text-[8px]">{virtue.excess}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowExcess((v) => !v)}
              className={`border cursor-pointer px-3 py-2 font-mono text-[10px] tracking-[0.12em] transition-all ${
                showExcess
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                  : 'border-border-faint text-fg-secondary hover:border-fg-disabled/30'
              }`}
            >
              {showExcess ? '隐藏极端' : '显示过度与不足'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
