"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const BASE_COLORS: Record<string, string> = {
  A: "#ef4444",
  T: "#3b82f6",
  G: "#22c55e",
  C: "#eab308",
};

const BASE_NAMES: Record<string, string> = {
  A: "腺嘌呤 (Adenine)",
  T: "胸腺嘧啶 (Thymine)",
  G: "鸟嘌呤 (Guanine)",
  C: "胞嘧啶 (Cytosine)",
};

const BASE_PAIR_RULES: Record<string, { partner: string; bonds: string; type: string }> = {
  A: { partner: "T", bonds: "2 个氢键", type: "A-T 碱基对" },
  T: { partner: "A", bonds: "2 个氢键", type: "T-A 碱基对" },
  G: { partner: "C", bonds: "3 个氢键", type: "G-C 碱基对" },
  C: { partner: "G", bonds: "3 个氢键", type: "C-G 碱基对" },
};

const SEQUENCE_5_TO_3 = "ATGCGATCGATCGTAGCATGCTAGCATGCATCGATCGATCGTAGC";

interface BasePair {
  base5: string;
  base3: string;
  index: number;
}

function generateBasePairs(): BasePair[] {
  const pairs: BasePair[] = [];
  for (let i = 0; i < SEQUENCE_5_TO_3.length; i++) {
    const base = SEQUENCE_5_TO_3[i]!;
    const rule = BASE_PAIR_RULES[base]!;
    pairs.push({ base5: base, base3: rule.partner, index: i });
  }
  return pairs;
}

const ALL_PAIRS = generateBasePairs();

function computeGCContent(pairs: BasePair[]): number {
  const gc = pairs.filter((p) => p.base5 === "G" || p.base5 === "C").length;
  return Math.round((gc / pairs.length) * 100);
}

interface HelixPoint {
  x: number;
  y5: number;
  y3: number;
  phase: number;
}

function buildHelixPoints(
  pairs: BasePair[],
  rotation: number,
  width: number,
  height: number,
  marginX: number
): HelixPoint[] {
  const amplitude = height * 0.28;
  const centerY = height / 2;
  const usableWidth = width - marginX * 2;
  const step = usableWidth / (pairs.length - 1);

  return pairs.map((pair, i) => {
    const x = marginX + i * step;
    const phase = (i / pairs.length) * Math.PI * 4 + rotation;
    const y5 = centerY + Math.sin(phase) * amplitude;
    const y3 = centerY + Math.sin(phase + Math.PI) * amplitude;
    return { x, y5, y3, phase };
  });
}

function buildStrandPath(points: HelixPoint[], strand: "5" | "3"): string {
  if (points.length === 0) return "";
  const getKey = strand === "5" ? "y5" : "y3";
  const first = points[0]!;
  let d = `M ${first.x},${first[getKey]}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]!;
    const curr = points[i]!;
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
    const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
    d += ` C ${cpx1},${prev[getKey]} ${cpx2},${curr[getKey]} ${curr.x},${curr[getKey]}`;
  }
  return d;
}

interface DNAHelixProps {
  className?: string;
}

export default function DNAHelix({ className }: DNAHelixProps) {
  const reduce = useReducedMotion();
  const [rotation, setRotation] = useState(0);
  const [selectedPair, setSelectedPair] = useState<number | null>(null);
  const [showFork, setShowFork] = useState(false);
  const [forkProgress, setForkProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const svgWidth = 900;
  const svgHeight = 360;
  const marginX = 40;

  const points = useMemo(
    () => buildHelixPoints(ALL_PAIRS, rotation, svgWidth, svgHeight, marginX),
    [rotation]
  );

  const path5 = useMemo(() => buildStrandPath(points, "5"), [points]);
  const path3 = useMemo(() => buildStrandPath(points, "3"), [points]);
  const gcContent = useMemo(() => computeGCContent(ALL_PAIRS), []);

  useEffect(() => {
    if (reduce || paused) return;

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      setRotation((r) => r + (delta / 1000) * 0.4);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduce, paused]);

  useEffect(() => {
    if (!showFork) {
      setForkProgress(0);
      return;
    }
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.02;
      if (progress >= 1) {
        progress = 1;
        clearInterval(interval);
      }
      setForkProgress(progress);
    }, 30);
    return () => clearInterval(interval);
  }, [showFork]);

  const handleBaseClick = useCallback((index: number) => {
    setSelectedPair((prev) => (prev === index ? null : index));
    setPaused(true);
  }, []);

  const handleResetSelection = useCallback(() => {
    setSelectedPair(null);
    setPaused(false);
  }, []);

  const handleToggleFork = useCallback(() => {
    setShowFork((prev) => !prev);
  }, []);

  const selectedPairData = selectedPair !== null ? ALL_PAIRS[selectedPair] : null;
  const selectedPoint = selectedPair !== null ? points[selectedPair] : null;

  const forkIndex = Math.floor(ALL_PAIRS.length * 0.5);
  const forkX = points[forkIndex]?.x ?? svgWidth / 2;

  return (
    <div className={className}>
      <div className="border-border-faint bg-bg-near relative overflow-hidden border">
        <div className="flex items-center justify-between border-b border-border-faint px-4 py-2">
          <span className="font-mono text-[10px] tracking-[0.28em] text-fg-muted uppercase">
            DNA 双螺旋 · double helix
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleFork}
              className="border-border-subtle bg-bg-near hover:bg-bg-elevated text-fg-secondary border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
            >
              {showFork ? "重置" : "复制"}
            </button>
            {selectedPairData && (
              <button
                onClick={handleResetSelection}
                className="border-border-subtle bg-bg-near hover:bg-bg-elevated text-fg-secondary border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
              >
                继续旋转
              </button>
            )}
          </div>
        </div>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="h-auto w-full"
          role="img"
          aria-label="DNA 双螺旋结构交互式可视化"
        >
          <defs>
            <filter id="backbone-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="strand5-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="strand3-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="fork-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>

          <line
            x1={marginX}
            y1={svgHeight / 2}
            x2={svgWidth - marginX}
            y2={svgHeight / 2}
            stroke="#333"
            strokeWidth={0.5}
            strokeDasharray="4 4"
            opacity={0.3}
          />

          {showFork && (
            <g>
              <rect
                x={forkX - 4}
                y={0}
                width={(svgWidth - marginX - forkX) * forkProgress + 8}
                height={svgHeight}
                fill="url(#fork-grad)"
                opacity={0.4}
              />
              <line
                x1={forkX}
                y1={20}
                x2={forkX}
                y2={svgHeight - 20}
                stroke="#22c55e"
                strokeWidth={1.5}
                strokeDasharray="6 3"
                opacity={0.6}
              />
              <text
                x={forkX}
                y={14}
                textAnchor="middle"
                fill="#22c55e"
                fontSize="10"
                fontFamily="monospace"
              >
                复制叉 replication fork
              </text>

              {forkProgress > 0.1 &&
                points.slice(forkIndex, forkIndex + Math.floor((ALL_PAIRS.length - forkIndex) * forkProgress)).map((pt, i) => {
                  const idx = forkIndex + i;
                  const pair = ALL_PAIRS[idx]!;
                  const offset = forkProgress * 20;
                  return (
                    <g key={`fork-${idx}`}>
                      <line
                        x1={pt.x}
                        y1={pt.y5 - offset}
                        x2={pt.x}
                        y2={pt.y3 + offset}
                        stroke={BASE_COLORS[pair.base5]}
                        strokeWidth={2}
                        opacity={0.3}
                        strokeDasharray="3 2"
                      />
                      <circle cx={pt.x} cy={pt.y5 - offset} r={2.5} fill={BASE_COLORS[pair.base5]} opacity={0.5} />
                      <circle cx={pt.x} cy={pt.y3 + offset} r={2.5} fill={BASE_COLORS[pair.base3]} opacity={0.5} />
                    </g>
                  );
                })}
            </g>
          )}

          {points.map((pt, i) => {
            const pair = ALL_PAIRS[i]!;
            const show5 = Math.sin(pt.phase) > -0.3;
            const show3 = Math.sin(pt.phase + Math.PI) > -0.3;
            const baseOpacity = show5 || show3 ? 0.85 : 0.4;

            return (
              <g
                key={i}
                onClick={() => handleBaseClick(i)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`${pair.base5}-${pair.base3} 碱基对，位置 ${i + 1}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleBaseClick(i);
                  }
                }}
              >
                <rect
                  x={pt.x - 3}
                  y={Math.min(pt.y5, pt.y3)}
                  width={6}
                  height={Math.abs(pt.y5 - pt.y3)}
                  fill="transparent"
                />

                <line
                  x1={pt.x}
                  y1={pt.y5}
                  x2={pt.x}
                  y2={pt.y3}
                  stroke={BASE_COLORS[pair.base5]}
                  strokeWidth={selectedPair === i ? 3.5 : 2}
                  opacity={selectedPair === i ? 1 : baseOpacity}
                  strokeLinecap="round"
                />

                <circle
                  cx={pt.x}
                  cy={pt.y5}
                  r={selectedPair === i ? 6 : 4}
                  fill={BASE_COLORS[pair.base5]}
                  fillOpacity={0.15}
                  stroke={BASE_COLORS[pair.base5]}
                  strokeWidth={selectedPair === i ? 2 : 1}
                />
                <text
                  x={pt.x}
                  y={pt.y5 + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={BASE_COLORS[pair.base5]}
                  fontSize={selectedPair === i ? 8 : 6}
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  {pair.base5}
                </text>

                <circle
                  cx={pt.x}
                  cy={pt.y3}
                  r={selectedPair === i ? 6 : 4}
                  fill={BASE_COLORS[pair.base3]}
                  fillOpacity={0.15}
                  stroke={BASE_COLORS[pair.base3]}
                  strokeWidth={selectedPair === i ? 2 : 1}
                />
                <text
                  x={pt.x}
                  y={pt.y3 + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={BASE_COLORS[pair.base3]}
                  fontSize={selectedPair === i ? 8 : 6}
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  {pair.base3}
                </text>

                {i % 10 === 0 && (
                  <text
                    x={pt.x}
                    y={svgHeight - 6}
                    textAnchor="middle"
                    fill="#555"
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    {i + 1}bp
                  </text>
                )}
              </g>
            );
          })}

          <path
            d={path5}
            fill="none"
            stroke="url(#strand5-grad)"
            strokeWidth={2.5}
            strokeLinecap="round"
            filter="url(#backbone-glow)"
            opacity={0.7}
          />
          <path
            d={path3}
            fill="none"
            stroke="url(#strand3-grad)"
            strokeWidth={2.5}
            strokeLinecap="round"
            filter="url(#backbone-glow)"
            opacity={0.7}
          />

          <text x={marginX} y={svgHeight / 2 - svgHeight * 0.32} fill="#60a5fa" fontSize="9" fontFamily="monospace" opacity={0.7}>
            5&apos; → 3&apos;
          </text>
          <text x={svgWidth - marginX - 30} y={svgHeight / 2 + svgHeight * 0.34} fill="#f472b6" fontSize="9" fontFamily="monospace" opacity={0.7} textAnchor="end">
            3&apos; → 5&apos;
          </text>

          {selectedPairData && selectedPoint && (
            <g>
              <rect
                x={Math.min(selectedPoint.x - 90, svgWidth - 200)}
                y={Math.max(selectedPoint.y5, selectedPoint.y3) + 14}
                width={180}
                height={80}
                rx={0}
                fill="#1a1a2e"
                fillOpacity={0.95}
                stroke={BASE_COLORS[selectedPairData.base5]}
                strokeWidth={1}
              />
              {(() => {
                const boxX = Math.min(selectedPoint.x - 90, svgWidth - 200);
                const boxY = Math.max(selectedPoint.y5, selectedPoint.y3) + 14;
                const rule = BASE_PAIR_RULES[selectedPairData.base5]!;
                return (
                  <>
                    <text x={boxX + 10} y={boxY + 18} fill={BASE_COLORS[selectedPairData.base5]} fontSize="11" fontFamily="monospace" fontWeight="700">
                      {selectedPairData.base5} — {selectedPairData.base3}
                    </text>
                    <text x={boxX + 10} y={boxY + 34} fill="#aaa" fontSize="9" fontFamily="monospace">
                      {rule.type}
                    </text>
                    <text x={boxX + 10} y={boxY + 48} fill="#888" fontSize="9" fontFamily="monospace">
                      {rule.bonds}
                    </text>
                    <text x={boxX + 10} y={boxY + 64} fill="#666" fontSize="8" fontFamily="monospace">
                      {BASE_NAMES[selectedPairData.base5]} = {BASE_NAMES[selectedPairData.base3]}
                    </text>
                    <text x={boxX + 10} y={boxY + 76} fill="#555" fontSize="7" fontFamily="monospace">
                      位置: {selectedPairData.index + 1} bp
                    </text>
                  </>
                );
              })()}
            </g>
          )}
        </svg>

        <div className="flex items-center justify-between border-t border-border-faint px-4 py-2">
          <div className="flex items-center gap-4">
            {Object.entries(BASE_COLORS).map(([base, color]) => (
              <div key={base} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-none"
                  style={{ backgroundColor: color }}
                />
                <span className="font-mono text-[9px] text-fg-muted">
                  {base}={BASE_PAIR_RULES[base]?.partner}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[9px] text-fg-disabled">
              碱基对: {ALL_PAIRS.length} bp
            </span>
            <span className="font-mono text-[9px] text-fg-disabled">
              GC 含量: {gcContent}%
            </span>
          </div>
        </div>
      </div>

      {selectedPairData && (
        <motion.div
          className="border-border-faint bg-bg-near mt-3 border p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center gap-1">
              <span
                className="font-display text-3xl font-bold"
                style={{ color: BASE_COLORS[selectedPairData.base5] }}
              >
                {selectedPairData.base5}
              </span>
              <span className="font-mono text-[9px] text-fg-muted">5&apos; 链</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 pt-2">
              <span className="text-fg-disabled font-mono text-lg">—</span>
              <span className="font-mono text-[8px] text-fg-disabled">
                {BASE_PAIR_RULES[selectedPairData.base5]?.bonds}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span
                className="font-display text-3xl font-bold"
                style={{ color: BASE_COLORS[selectedPairData.base3] }}
              >
                {selectedPairData.base3}
              </span>
              <span className="font-mono text-[9px] text-fg-muted">3&apos; 链</span>
            </div>
            <div className="ml-auto flex flex-col gap-1 text-right">
              <span className="font-mono text-[10px] text-fg-secondary">
                {BASE_PAIR_RULES[selectedPairData.base5]?.type}
              </span>
              <span className="font-mono text-[10px] text-fg-muted">
                {BASE_NAMES[selectedPairData.base5]!} ↔ {BASE_NAMES[selectedPairData.base3]!}
              </span>
              <span className="font-mono text-[9px] text-fg-disabled">
                位置 {selectedPairData.index + 1} / {ALL_PAIRS.length} bp
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
