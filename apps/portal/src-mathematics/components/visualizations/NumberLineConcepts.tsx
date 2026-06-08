'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Layer = {
  id: string;
  label: string;
  labelEn: string;
  color: string;
  points: { value: number; label: string; detail: string }[];
};

const LAYERS: Layer[] = [
  {
    id: 'integers',
    label: '整数',
    labelEn: 'Integers (ℤ)',
    color: '#61afef',
    points: [
      { value: -10, label: '-10', detail: '负整数' },
      { value: -5, label: '-5', detail: '负整数' },
      { value: -1, label: '-1', detail: '负一，乘法单位元的逆元' },
      { value: 0, label: '0', detail: '加法单位元，既非正也非负' },
      { value: 1, label: '1', detail: '乘法单位元，最小的正整数' },
      { value: 2, label: '2', detail: '最小的质数，唯一的偶质数' },
      { value: 3, label: '3', detail: '最小的奇质数' },
      { value: 5, label: '5', detail: '费马质数 (2²+1)' },
      { value: 7, label: '7', detail: '梅森质数 (2³-1)' },
      { value: 10, label: '10', detail: '十进制基数' },
    ],
  },
  {
    id: 'rationals',
    label: '有理数',
    labelEn: 'Rationals (ℚ)',
    color: '#98c379',
    points: [
      { value: -3.5, label: '-7/2', detail: '负有理数' },
      { value: -2.5, label: '-5/2', detail: '负有理数' },
      { value: -0.5, label: '-1/2', detail: '负半分数' },
      { value: 0.25, label: '1/4', detail: '四分之一' },
      { value: 0.333, label: '1/3', detail: '无限循环小数 0.333...' },
      { value: 0.5, label: '1/2', detail: '二分之一' },
      { value: 0.75, label: '3/4', detail: '四分之三' },
      { value: 1.5, label: '3/2', detail: '一个半' },
      { value: 2.25, label: '9/4', detail: '有理数' },
      { value: 3.14, label: '22/7', detail: 'π 的有理近似' },
    ],
  },
  {
    id: 'irrationals',
    label: '无理数',
    labelEn: 'Irrationals (ℝ\\ℚ)',
    color: '#c678dd',
    points: [
      { value: -Math.PI, label: '-π', detail: '负圆周率 ≈ -3.14159' },
      { value: -Math.E, label: '-e', detail: '负自然常数 ≈ -2.71828' },
      { value: -Math.SQRT2, label: '-√2', detail: '负根号2 ≈ -1.41421' },
      { value: Math.SQRT2, label: '√2', detail: '根号2，第一个被发现的无理数' },
      { value: Math.E, label: 'e', detail: '自然常数 ≈ 2.71828，连续复利的极限' },
      { value: Math.PI, label: 'π', detail: '圆周率 ≈ 3.14159，圆的周长与直径之比' },
      { value: Math.PI + 1, label: 'π+1', detail: '无理数加有理数仍为无理数' },
      { value: Math.E * 2, label: '2e', detail: '无理数乘非零有理数仍为无理数' },
    ],
  },
  {
    id: 'special',
    label: '特殊常数',
    labelEn: 'Constants',
    color: '#e5c07b',
    points: [
      { value: -1.618, label: '-φ', detail: '负黄金比例 ≈ -1.61803' },
      { value: 0, label: '0', detail: '加法单位元' },
      { value: 0.577, label: 'γ', detail: '欧拉-马歇罗尼常数 ≈ 0.57721' },
      { value: 1, label: '1', detail: '乘法单位元' },
      { value: 1.618, label: 'φ', detail: '黄金比例 ≈ 1.61803，满足 φ² = φ+1' },
      { value: 2.718, label: 'e', detail: '自然常数，lim(1+1/n)^n' },
      { value: 3.14159, label: 'π', detail: '圆周率，超越数' },
      { value: 6.283, label: '2π (τ)', detail: '全圆弧度，也称为 tau' },
    ],
  },
];

const SVG_W = 700;
const SVG_H = 180;
const PADDING = 40;
const RANGE_MIN = -10;
const RANGE_MAX = 10;

function valueToX(value: number): number {
  return PADDING + ((value - RANGE_MIN) / (RANGE_MAX - RANGE_MIN)) * (SVG_W - 2 * PADDING);
}

type NumberDetail = {
  value: number;
  label: string;
  detail: string;
  layerId: string;
  color: string;
};

export default function NumberLineConcepts() {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(['integers']));
  const [selectedNumber, setSelectedNumber] = useState<NumberDetail | null>(null);
  const [hoveredNumber, setHoveredNumber] = useState<NumberDetail | null>(null);
  const [showInequality, setShowInequality] = useState(false);
  const [ineqMin, setIneqMin] = useState(-3);
  const [ineqMax, setIneqMax] = useState(5);

  const toggleLayer = useCallback((id: string) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const activePoints: NumberDetail[] = [];
  for (const layer of LAYERS) {
    if (activeLayers.has(layer.id)) {
      for (const p of layer.points) {
        activePoints.push({ ...p, layerId: layer.id, color: layer.color });
      }
    }
  }

  const handlePointClick = useCallback((detail: NumberDetail) => {
    setSelectedNumber((prev) => (prev?.value === detail.value && prev.layerId === detail.layerId ? null : detail));
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="border-border-faint bg-bg-panel rounded-lg border p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {LAYERS.map((layer) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => toggleLayer(layer.id)}
              className="cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] transition-all"
              style={{
                borderColor: activeLayers.has(layer.id) ? `${layer.color}60` : 'var(--color-border-faint)',
                backgroundColor: activeLayers.has(layer.id) ? `${layer.color}15` : 'transparent',
                color: activeLayers.has(layer.id) ? layer.color : 'var(--color-fg-muted)',
              }}
            >
              {layer.label}
              <span className="text-fg-disabled ml-1 text-[8px]">{layer.labelEn}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowInequality((v) => !v)}
            className={`cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] transition-all ${
              showInequality
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                : 'border-border-faint text-fg-secondary hover:border-fg-disabled/30'
            }`}
          >
            区间
          </button>
        </div>

        <div className="border-border-faint bg-bg-elevated overflow-x-auto rounded border">
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="h-auto w-full" style={{ minWidth: 400 }}>
            <line
              x1={PADDING}
              y1={SVG_H / 2}
              x2={SVG_W - PADDING}
              y2={SVG_H / 2}
              stroke="var(--color-fg-disabled)"
              strokeWidth="1.5"
            />

            {Array.from({ length: 21 }, (_, i) => {
              const val = RANGE_MIN + i;
              const x = valueToX(val);
              const isMajor = val % 5 === 0;
              return (
                <g key={val}>
                  <line
                    x1={x}
                    y1={SVG_H / 2 - (isMajor ? 8 : 4)}
                    x2={x}
                    y2={SVG_H / 2 + (isMajor ? 8 : 4)}
                    stroke="var(--color-fg-disabled)"
                    strokeWidth={isMajor ? 1 : 0.5}
                    opacity={isMajor ? 0.6 : 0.3}
                  />
                  {isMajor && (
                    <text
                      x={x}
                      y={SVG_H / 2 + 22}
                      textAnchor="middle"
                      fill="var(--color-fg-muted)"
                      fontSize="10"
                      fontFamily="var(--font-mono)"
                      className="pointer-events-none select-none"
                    >
                      {val}
                    </text>
                  )}
                </g>
              );
            })}

            {showInequality && (
              <g>
                <rect
                  x={valueToX(ineqMin)}
                  y={SVG_H / 2 - 20}
                  width={valueToX(ineqMax) - valueToX(ineqMin)}
                  height={40}
                  fill="#e5c07b"
                  fillOpacity="0.08"
                  stroke="#e5c07b"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                  rx="4"
                />
                <circle cx={valueToX(ineqMin)} cy={SVG_H / 2} r="4" fill="none" stroke="#e5c07b" strokeWidth="2" />
                <circle cx={valueToX(ineqMax)} cy={SVG_H / 2} r="4" fill="#e5c07b" />
                <text
                  x={(valueToX(ineqMin) + valueToX(ineqMax)) / 2}
                  y={SVG_H / 2 - 26}
                  textAnchor="middle"
                  fill="#e5c07b"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  className="pointer-events-none select-none"
                >
                  {ineqMin} &lt; x &lt; {ineqMax}
                </text>
              </g>
            )}

            {activePoints.map((p, i) => {
              const x = valueToX(p.value);
              const isSelected = selectedNumber?.value === p.value && selectedNumber?.layerId === p.layerId;
              const isHovered = hoveredNumber?.value === p.value && hoveredNumber?.layerId === p.layerId;
              const layerIdx = LAYERS.findIndex((l) => l.id === p.layerId);
              const yOffset = 30 + layerIdx * 16;

              return (
                <g
                  key={`${p.layerId}-${i}`}
                  style={{ cursor: 'pointer' }}
                  onPointerEnter={() => setHoveredNumber(p)}
                  onPointerLeave={() => setHoveredNumber(null)}
                  onClick={() => handlePointClick(p)}
                >
                  <motion.circle
                    cx={x}
                    cy={SVG_H / 2 - yOffset}
                    fill={p.color}
                    stroke={isSelected ? '#fff' : p.color}
                    strokeWidth={isSelected ? 2 : 1}
                    initial={{ r: 0 }}
                    animate={{ r: isSelected ? 6 : isHovered ? 5 : 3.5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                  <line
                    x1={x}
                    y1={SVG_H / 2 - yOffset + 6}
                    x2={x}
                    y2={SVG_H / 2}
                    stroke={p.color}
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                    opacity="0.3"
                  />
                  {(isSelected || isHovered) && (
                    <text
                      x={x}
                      y={SVG_H / 2 - yOffset - 8}
                      textAnchor="middle"
                      fill={p.color}
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="var(--font-mono)"
                      className="pointer-events-none select-none"
                    >
                      {p.label}
                    </text>
                  )}
                </g>
              );
            })}

            <text
              x={SVG_W / 2}
              y={SVG_H - 4}
              textAnchor="middle"
              fill="var(--color-fg-disabled)"
              fontSize="9"
              fontFamily="var(--font-mono)"
              letterSpacing="0.12em"
              className="pointer-events-none select-none"
            >
              Number Line · 数轴
            </text>
          </svg>
        </div>

        {showInequality && (
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2">
              <span className="text-fg-disabled font-mono text-[9px]">下界</span>
              <input
                type="range"
                min={-10}
                max={10}
                step={0.5}
                value={ineqMin}
                onChange={(e) => setIneqMin(Number(e.target.value))}
                className="accent-amber-400 w-24"
              />
              <span className="w-8 font-mono text-[10px] text-amber-400">{ineqMin}</span>
            </label>
            <label className="flex items-center gap-2">
              <span className="text-fg-disabled font-mono text-[9px]">上界</span>
              <input
                type="range"
                min={-10}
                max={10}
                step={0.5}
                value={ineqMax}
                onChange={(e) => setIneqMax(Number(e.target.value))}
                className="accent-amber-400 w-24"
              />
              <span className="w-8 font-mono text-[10px] text-amber-400">{ineqMax}</span>
            </label>
          </div>
        )}

        <AnimatePresence>
          {selectedNumber && (
            <motion.div
              key={`${selectedNumber.layerId}-${selectedNumber.value}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="border-border-faint bg-bg-elevated mt-4 rounded-lg border p-4"
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-0.5 rounded-full" style={{ backgroundColor: selectedNumber.color }} />
                <span className="font-mono text-[10px] font-semibold" style={{ color: selectedNumber.color }}>
                  {selectedNumber.label}
                </span>
                <span className="text-fg-disabled font-mono text-[9px]">
                  {LAYERS.find((l) => l.id === selectedNumber.layerId)?.labelEn}
                </span>
              </div>
              <p className="text-fg-secondary mt-2 text-sm leading-relaxed">{selectedNumber.detail}</p>
              <div className="border-border-faint mt-2 grid grid-cols-2 gap-2 border-t pt-2">
                <div>
                  <span className="text-fg-disabled font-mono text-[8px]">数值</span>
                  <p className="text-fg-primary font-mono text-sm">{selectedNumber.value}</p>
                </div>
                <div>
                  <span className="text-fg-disabled font-mono text-[8px]">类别</span>
                  <p className="text-fg-primary font-mono text-sm">
                    {selectedNumber.layerId === 'integers' ? '整数' : selectedNumber.layerId === 'rationals' ? '有理数' : selectedNumber.layerId === 'irrationals' ? '无理数' : '常数'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hoveredNumber && !selectedNumber && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.1 }}
              className="border-border-faint bg-bg-elevated pointer-events-none mt-3 rounded border p-2"
            >
              <span className="font-mono text-[10px] font-semibold" style={{ color: hoveredNumber.color }}>
                {hoveredNumber.label}
              </span>
              <span className="text-fg-secondary ml-2 text-[11px]">{hoveredNumber.detail}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
