'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

type Preset = {
  name: string;
  nameEn: string;
  matrix: [number, number, number, number];
  description: string;
};

const PRESETS: Preset[] = [
  { name: '旋转', nameEn: 'Rotation', matrix: [0.866, -0.5, 0.5, 0.866], description: '绕原点旋转 30°' },
  { name: '缩放', nameEn: 'Scale', matrix: [1.5, 0, 0, 1.5], description: '均匀放大 1.5 倍' },
  { name: '剪切', nameEn: 'Shear', matrix: [1, 0.5, 0, 1], description: '水平剪切' },
  { name: '反射', nameEn: 'Reflect', matrix: [-1, 0, 0, 1], description: '关于 y 轴反射' },
  { name: '投影', nameEn: 'Project', matrix: [1, 0, 0, 0], description: '投影到 x 轴' },
  { name: '翻转', nameEn: 'Flip', matrix: [0, 1, 1, 0], description: '交换 x 和 y 坐标' },
];

const SVG_SIZE = 400;
const GRID_RANGE = 4;
const UNIT = SVG_SIZE / (GRID_RANGE * 2);

function toSvg(x: number, y: number): [number, number] {
  return [SVG_SIZE / 2 + x * UNIT, SVG_SIZE / 2 - y * UNIT];
}

function applyMatrix(m: [number, number, number, number], x: number, y: number): [number, number] {
  return [m[0] * x + m[1] * y, m[2] * x + m[3] * y];
}

export default function MatrixTransformer() {
  const [matrix, setMatrix] = useState<[number, number, number, number]>([1, 0, 0, 1]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showOriginal, setShowOriginal] = useState(true);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handlePreset = useCallback((preset: Preset) => {
    setMatrix(preset.matrix);
    setActivePreset(preset.name);
    setRotationAngle(0);
  }, []);

  const handleRotationSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const angle = Number(e.target.value);
    setRotationAngle(angle);
    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    setMatrix([cos, -sin, sin, cos]);
    setActivePreset(null);
  }, []);

  const handleMatrixChange = useCallback((idx: number, value: string) => {
    const num = parseFloat(value) || 0;
    setMatrix((prev) => {
      const next = [...prev] as [number, number, number, number];
      next[idx] = num;
      return next;
    });
    setActivePreset(null);
    setRotationAngle(0);
  }, []);

  const handleReset = useCallback(() => {
    setMatrix([1, 0, 0, 1]);
    setRotationAngle(0);
    setActivePreset(null);
  }, []);

  const determinant = matrix[0] * matrix[3] - matrix[1] * matrix[2];

  const gridLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = -GRID_RANGE; i <= GRID_RANGE; i++) {
      const [sx1, sy1] = toSvg(-GRID_RANGE, i);
      const [sx2, sy2] = toSvg(GRID_RANGE, i);
      lines.push({ x1: sx1, y1: sy1, x2: sx2, y2: sy2 });
      const [sx3, sy3] = toSvg(i, -GRID_RANGE);
      const [sx4, sy4] = toSvg(i, GRID_RANGE);
      lines.push({ x1: sx3, y1: sy3, x2: sx4, y2: sy4 });
    }
    return lines;
  }, []);

  const unitSquarePoints = useMemo(() => {
    const corners: [number, number][] = [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ];
    return corners.map(([x, y]) => {
      const [tx, ty] = applyMatrix(matrix, x, y);
      return toSvg(tx, ty);
    });
  }, [matrix]);

  const transformedGridLines = useMemo(() => {
    const lines: { points: string }[] = [];
    for (let i = -GRID_RANGE; i <= GRID_RANGE; i++) {
      const pts: string[] = [];
      for (let j = -GRID_RANGE; j <= GRID_RANGE; j += 0.25) {
        const [tx, ty] = applyMatrix(matrix, j, i);
        const [sx, sy] = toSvg(tx, ty);
        pts.push(`${sx},${sy}`);
      }
      lines.push({ points: pts.join(' ') });
      const pts2: string[] = [];
      for (let j = -GRID_RANGE; j <= GRID_RANGE; j += 0.25) {
        const [tx, ty] = applyMatrix(matrix, i, j);
        const [sx, sy] = toSvg(tx, ty);
        pts2.push(`${sx},${sy}`);
      }
      lines.push({ points: pts2.join(' ') });
    }
    return lines;
  }, [matrix]);

  const basisE1 = applyMatrix(matrix, 1, 0);
  const basisE2 = applyMatrix(matrix, 0, 1);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="border-border-faint bg-bg-panel rounded-lg border p-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <div className="border-border-faint bg-bg-elevated overflow-hidden rounded border">
              <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="h-auto w-full" style={{ maxHeight: 380 }}>
                <defs>
                  <radialGradient id="matrix-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--color-accent-indigo)" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width={SVG_SIZE} height={SVG_SIZE} fill="url(#matrix-glow)" />

                {showOriginal && gridLines.map((line, i) => (
                  <line
                    key={`orig-${i}`}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="var(--color-border-faint)"
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                ))}

                {transformedGridLines.map((line, i) => (
                  <polyline
                    key={`trans-${i}`}
                    points={line.points}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="0.8"
                    strokeOpacity="0.3"
                  />
                ))}

                <line x1={SVG_SIZE / 2} y1={0} x2={SVG_SIZE / 2} y2={SVG_SIZE} stroke="var(--color-fg-disabled)" strokeWidth="1" opacity="0.3" />
                <line x1={0} y1={SVG_SIZE / 2} x2={SVG_SIZE} y2={SVG_SIZE / 2} stroke="var(--color-fg-disabled)" strokeWidth="1" opacity="0.3" />

                {showOriginal && (
                  <polygon
                    points={`${toSvg(0, 0).join(',')} ${toSvg(1, 0).join(',')} ${toSvg(1, 1).join(',')} ${toSvg(0, 1).join(',')}`}
                    fill="var(--color-fg-disabled)"
                    fillOpacity="0.08"
                    stroke="var(--color-fg-disabled)"
                    strokeWidth="1"
                    strokeDasharray="3 2"
                  />
                )}

                <motion.polygon
                  points={unitSquarePoints.map((p) => p.join(',')).join(' ')}
                  fill="#6366f1"
                  fillOpacity="0.15"
                  stroke="#6366f1"
                  strokeWidth="2"
                  animate={{ points: unitSquarePoints.map((p) => p.join(',')).join(' ') }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />

                {(() => {
                  const [ox, oy] = toSvg(0, 0);
                  const [ex1x, ex1y] = toSvg(basisE1[0], basisE1[1]);
                  const [ex2x, ex2y] = toSvg(basisE2[0], basisE2[1]);
                  return (
                    <>
                      <line x1={ox} y1={oy} x2={ex1x} y2={ex1y} stroke="#e06c75" strokeWidth="2" markerEnd="url(#arrowE1)" />
                      <line x1={ox} y1={oy} x2={ex2x} y2={ex2y} stroke="#98c379" strokeWidth="2" markerEnd="url(#arrowE2)" />
                    </>
                  );
                })()}

                <defs>
                  <marker id="arrowE1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#e06c75" />
                  </marker>
                  <marker id="arrowE2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#98c379" />
                  </marker>
                </defs>

                <text x={SVG_SIZE / 2} y={SVG_SIZE - 8} textAnchor="middle" fill="var(--color-fg-disabled)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.12em">
                  Linear Transformation · 线性变换
                </text>
              </svg>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-64">
            <div className="border-border-faint bg-bg-elevated rounded border p-3">
              <p className="text-fg-disabled mb-2 font-mono text-[9px] tracking-[0.18em] uppercase">
                矩阵 Matrix
              </p>
              <div className="grid grid-cols-2 gap-2">
                {matrix.map((val, i) => (
                  <input
                    key={i}
                    type="number"
                    step="0.1"
                    value={val}
                    onChange={(e) => handleMatrixChange(i, e.target.value)}
                    className="border-border-faint bg-bg-panel text-fg-primary w-full border px-2 py-1.5 font-mono text-sm focus:border-indigo-500/50 focus:outline-none"
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-fg-disabled font-mono text-[9px]">行列式 det</span>
                <span
                  className="font-mono text-[11px] font-semibold"
                  style={{ color: Math.abs(determinant) < 0.01 ? '#e06c75' : '#98c379' }}
                >
                  {determinant.toFixed(3)}
                </span>
              </div>
              {Math.abs(determinant) < 0.01 && (
                <p className="text-fg-disabled mt-1 font-mono text-[8px] text-red-400/70">
                  奇异矩阵 — 变换不可逆
                </p>
              )}
            </div>

            <div>
              <p className="text-fg-disabled mb-1.5 font-mono text-[9px] tracking-[0.18em] uppercase">
                旋转角度
              </p>
              <input
                type="range"
                min={-180}
                max={180}
                value={rotationAngle}
                onChange={handleRotationSlider}
                className="accent-accent-indigo w-full"
                aria-label="旋转角度"
              />
              <div className="text-fg-disabled flex justify-between font-mono text-[8px]">
                <span>-180°</span>
                <span className="text-indigo-400">{rotationAngle}°</span>
                <span>180°</span>
              </div>
            </div>

            <div>
              <p className="text-fg-disabled mb-1.5 font-mono text-[9px] tracking-[0.18em] uppercase">
                预设变换
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handlePreset(preset)}
                    className={`cursor-pointer border px-2 py-1.5 font-mono text-[9px] tracking-[0.08em] transition-all ${
                      activePreset === preset.name
                        ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400'
                        : 'border-border-faint text-fg-secondary hover:border-fg-disabled/30'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {activePreset && (
              <div className="border-accent-indigo/20 bg-accent-indigo/5 rounded border p-3">
                <p className="text-accent-indigo font-mono text-[9px] tracking-[0.12em]">
                  {activePreset} · {PRESETS.find((p) => p.name === activePreset)?.nameEn}
                </p>
                <p className="text-fg-secondary mt-1 text-[11px] leading-snug">
                  {PRESETS.find((p) => p.name === activePreset)?.description}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowOriginal((v) => !v)}
                className={`flex-1 cursor-pointer border px-2 py-1.5 font-mono text-[9px] tracking-[0.08em] transition-all ${
                  showOriginal
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                    : 'border-border-faint text-fg-secondary hover:border-fg-disabled/30'
                }`}
              >
                {showOriginal ? '隐藏原网格' : '显示原网格'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer border border-border-faint px-2 py-1.5 font-mono text-[9px] tracking-[0.08em] text-fg-secondary transition-all hover:border-fg-disabled/30"
              >
                重置
              </button>
            </div>

            <div className="border-border-faint bg-bg-elevated flex items-center gap-3 rounded border p-2">
              <span className="text-fg-disabled font-mono text-[8px]">e₁</span>
              <span className="font-mono text-[10px] text-red-400">({basisE1[0].toFixed(2)}, {basisE1[1].toFixed(2)})</span>
              <span className="text-fg-disabled font-mono text-[8px]">e₂</span>
              <span className="font-mono text-[10px] text-green-400">({basisE2[0].toFixed(2)}, {basisE2[1].toFixed(2)})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
