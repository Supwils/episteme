"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const AMINO_ACID_COLORS: Record<string, string> = {
  nonpolar: "#f97316",
  polar: "#3b82f6",
  positive: "#ef4444",
  negative: "#22c55e",
  special: "#a855f7",
};

const AMINO_ACID_GROUPS: Record<string, string[]> = {
  nonpolar: ["A", "V", "L", "I", "M", "F", "W", "P"],
  polar: ["S", "T", "C", "Y", "N", "Q"],
  positive: ["K", "R", "H"],
  negative: ["D", "E"],
  special: ["G"],
};

function getAminoAcidGroup(aa: string): string {
  for (const [group, aas] of Object.entries(AMINO_ACID_GROUPS)) {
    if (aas.includes(aa)) return group;
  }
  return "nonpolar";
}

const SAMPLE_SEQUENCE = "MKTIIALSYIFCLVFADYKDDDDKHMMAMAGTSENLYFQ";

type FoldStage = "primary" | "secondary" | "tertiary";

const STAGE_INFO: Record<FoldStage, { label: string; labelEn: string; description: string }> = {
  primary: {
    label: "一级结构",
    labelEn: "Primary Structure",
    description: "氨基酸的线性序列，通过肽键连接。序列决定了蛋白质的所有高级结构。",
  },
  secondary: {
    label: "二级结构",
    labelEn: "Secondary Structure",
    description: "α-螺旋和β-折叠由主链上的氢键形成。局部折叠模式赋予蛋白质初步形状。",
  },
  tertiary: {
    label: "三级结构",
    labelEn: "Tertiary Structure",
    description: "整个多肽链的三维折叠，由侧链间的相互作用（疏水作用、氢键、二硫键等）驱动。",
  },
};

function buildPrimaryPath(seqLen: number, width: number, height: number): { x: number; y: number }[] {
  const margin = 40;
  const usable = width - margin * 2;
  return Array.from({ length: seqLen }, (_, i) => ({
    x: margin + (i / (seqLen - 1)) * usable,
    y: height / 2,
  }));
}

function buildSecondaryPath(seqLen: number, width: number, height: number): { x: number; y: number; type: "helix" | "sheet" | "coil" }[] {
  const margin = 40;
  const usable = width - margin * 2;
  const points: { x: number; y: number; type: "helix" | "sheet" | "coil" }[] = [];

  for (let i = 0; i < seqLen; i++) {
    const x = margin + (i / (seqLen - 1)) * usable;
    let y = height / 2;
    let type: "helix" | "sheet" | "coil" = "coil";

    if (i >= 4 && i <= 15) {
      const phase = ((i - 4) / 11) * Math.PI * 3;
      y = height / 2 + Math.sin(phase) * 50;
      type = "helix";
    } else if (i >= 20 && i <= 28) {
      const zigzag = i % 2 === 0 ? -30 : 30;
      y = height / 2 + zigzag;
      type = "sheet";
    } else {
      y = height / 2 + Math.sin(i * 0.5) * 15;
      type = "coil";
    }

    points.push({ x, y, type });
  }
  return points;
}

function buildTertiaryPath(seqLen: number, width: number, height: number): { x: number; y: number }[] {
  const cx = width / 2;
  const cy = height / 2;
  const points: { x: number; y: number }[] = [];

  for (let i = 0; i < seqLen; i++) {
    const t = i / seqLen;
    const angle = t * Math.PI * 4;
    const r = 60 + t * 40 + Math.sin(t * 8) * 20;
    points.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r * 0.7,
    });
  }
  return points;
}

function buildPathString(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  const first = points[0]!;
  let d = `M ${first.x},${first.y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]!;
    const curr = points[i]!;
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
    const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
    d += ` C ${cpx1},${prev.y} ${cpx2},${curr.y} ${curr.x},${curr.y}`;
  }
  return d;
}

interface ProteinFoldingProps {
  className?: string;
}

export function ProteinFolding({ className }: ProteinFoldingProps) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<FoldStage>("primary");
  const [animProgress, setAnimProgress] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedAa, setSelectedAa] = useState<number | null>(null);
  const rafRef = useRef<number>(0);

  const svgWidth = 800;
  const svgHeight = 320;
  const seqLen = SAMPLE_SEQUENCE.length;

  const primaryPoints = useMemo(() => buildPrimaryPath(seqLen, svgWidth, svgHeight), [seqLen]);
  const secondaryPoints = useMemo(() => buildSecondaryPath(seqLen, svgWidth, svgHeight), [seqLen]);
  const tertiaryPoints = useMemo(() => buildTertiaryPath(seqLen, svgWidth, svgHeight), [seqLen]);

  const getCurrentPoints = useCallback((): { x: number; y: number }[] => {
    if (stage === "primary") return primaryPoints;
    if (stage === "secondary") return secondaryPoints.map((p) => ({ x: p.x, y: p.y }));
    return tertiaryPoints;
  }, [stage, primaryPoints, secondaryPoints, tertiaryPoints]);

  const interpolatedPoints = useMemo(() => {
    if (animProgress >= 1) return getCurrentPoints();
    const from = primaryPoints;
    const to = getCurrentPoints();
    return from.map((fp, i) => {
      const tp = to[i]!;
      return {
        x: fp.x + (tp.x - fp.x) * animProgress,
        y: fp.y + (tp.y - fp.y) * animProgress,
      };
    });
  }, [animProgress, getCurrentPoints, primaryPoints]);

  const backbonePath = useMemo(() => buildPathString(interpolatedPoints), [interpolatedPoints]);

  const animateToFoldStage = useCallback(
    (targetStage: FoldStage) => {
      if (isAnimating) return;
      setStage(targetStage);
      if (reduce) {
        setAnimProgress(1);
        return;
      }
      setIsAnimating(true);
      setAnimProgress(0);
      let progress = 0;
      const step = () => {
        progress += 0.02;
        if (progress >= 1) {
          setAnimProgress(1);
          setIsAnimating(false);
          return;
        }
        setAnimProgress(progress);
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [isAnimating, reduce],
  );

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const stageInfo = STAGE_INFO[stage];

  return (
    <div className={className}>
      <div className="border-border-faint bg-bg-near relative overflow-hidden border">
        <div className="flex items-center justify-between border-b border-border-faint px-4 py-2">
          <span className="font-mono text-[10px] tracking-[0.28em] text-fg-muted uppercase">
            蛋白质折叠 · protein folding
          </span>
          <div className="flex items-center gap-2">
            {(["primary", "secondary", "tertiary"] as FoldStage[]).map((s) => (
              <button
                key={s}
                onClick={() => animateToFoldStage(s)}
                disabled={isAnimating}
                className={`border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                  stage === s
                    ? "border-accent-cool/40 bg-accent-cool/10 text-accent-cool"
                    : "border-border-subtle bg-bg-near hover:bg-bg-elevated text-fg-secondary"
                }`}
              >
                {STAGE_INFO[s].label}
              </button>
            ))}
          </div>
        </div>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="h-auto w-full"
          role="img"
          aria-label="蛋白质折叠过程交互式可视化"
        >
          <defs>
            <filter id="aa-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="backbone-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {stage === "secondary" && secondaryPoints.map((pt, i) => {
            if (pt.type === "helix" && i > 0 && secondaryPoints[i - 1]?.type === "helix") {
              const prev = secondaryPoints[i - 1]!;
              return (
                <line
                  key={`helix-bond-${i}`}
                  x1={prev.x}
                  y1={prev.y}
                  x2={pt.x}
                  y2={pt.y}
                  stroke="#f97316"
                  strokeWidth={1}
                  opacity={0.3}
                  strokeDasharray="3 2"
                />
              );
            }
            return null;
          })}

          {stage === "secondary" && secondaryPoints.map((pt, i) => {
            if (pt.type === "sheet" && i > 0 && secondaryPoints[i - 1]?.type === "sheet") {
              const prev = secondaryPoints[i - 1]!;
              return (
                <line
                  key={`sheet-bond-${i}`}
                  x1={prev.x}
                  y1={prev.y - 5}
                  x2={pt.x}
                  y2={pt.y - 5}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  opacity={0.4}
                />
              );
            }
            return null;
          })}

          <path
            d={backbonePath}
            fill="none"
            stroke="url(#backbone-grad)"
            strokeWidth={3}
            strokeLinecap="round"
          />

          {interpolatedPoints.map((pt, i) => {
            const aa = SAMPLE_SEQUENCE[i]!;
            const group = getAminoAcidGroup(aa);
            const color = AMINO_ACID_COLORS[group] ?? "#888";
            const isSelected = selectedAa === i;

            return (
              <g
                key={i}
                onClick={() => setSelectedAa(isSelected ? null : i)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`氨基酸 ${aa}，位置 ${i + 1}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedAa(isSelected ? null : i);
                  }
                }}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isSelected ? 8 : 5}
                  fill={color}
                  fillOpacity={isSelected ? 0.4 : 0.2}
                  stroke={color}
                  strokeWidth={isSelected ? 2 : 1}
                  filter={isSelected ? "url(#aa-glow)" : undefined}
                />
                <text
                  x={pt.x}
                  y={pt.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={color}
                  fontSize={isSelected ? 8 : 6}
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  {aa}
                </text>
              </g>
            );
          })}

          {selectedAa !== null && interpolatedPoints[selectedAa] && (() => {
            const pt = interpolatedPoints[selectedAa]!;
            const aa = SAMPLE_SEQUENCE[selectedAa]!;
            const group = getAminoAcidGroup(aa);
            const color = AMINO_ACID_COLORS[group] ?? "#888";
            const groupLabels: Record<string, string> = {
              nonpolar: "非极性",
              polar: "极性",
              positive: "正电荷",
              negative: "负电荷",
              special: "特殊",
            };
            const boxX = Math.min(pt.x - 70, svgWidth - 160);
            const boxY = pt.y + 20;

            return (
              <g>
                <rect
                  x={boxX}
                  y={boxY}
                  width={140}
                  height={60}
                  rx={0}
                  fill="#1a1a2e"
                  fillOpacity={0.95}
                  stroke={color}
                  strokeWidth={1}
                />
                <text x={boxX + 10} y={boxY + 18} fill={color} fontSize="12" fontFamily="monospace" fontWeight="700">
                  {aa} — 位置 {selectedAa + 1}
                </text>
                <text x={boxX + 10} y={boxY + 34} fill="#aaa" fontSize="9" fontFamily="monospace">
                  类型: {groupLabels[group] ?? group}
                </text>
                <text x={boxX + 10} y={boxY + 50} fill="#888" fontSize="8" fontFamily="monospace">
                  {selectedAa + 1} / {seqLen} 氨基酸
                </text>
              </g>
            );
          })()}
        </svg>

        <div className="flex items-center justify-between border-t border-border-faint px-4 py-2">
          <div className="flex items-center gap-4">
            {Object.entries(AMINO_ACID_COLORS).map(([group, color]) => {
              const labels: Record<string, string> = {
                nonpolar: "非极性",
                polar: "极性",
                positive: "正电荷",
                negative: "负电荷",
                special: "特殊",
              };
              return (
                <div key={group} className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-none" style={{ backgroundColor: color }} />
                  <span className="font-mono text-[9px] text-fg-muted">{labels[group] ?? group}</span>
                </div>
              );
            })}
          </div>
          <span className="font-mono text-[9px] text-fg-disabled">
            序列长度: {seqLen} aa
          </span>
        </div>
      </div>

      <motion.div
        className="border-border-faint bg-bg-near mt-3 border p-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        key={stage}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent-cool/30 bg-accent-cool/10">
            <span className="font-mono text-xs text-accent-cool">{stage === "primary" ? "1°" : stage === "secondary" ? "2°" : "3°"}</span>
          </div>
          <div>
            <h4 className="font-display text-fg-primary text-sm font-semibold">
              {stageInfo.label}
              <span className="text-fg-muted ml-2 font-mono text-[10px]">{stageInfo.labelEn}</span>
            </h4>
            <p className="text-fg-secondary mt-1 text-sm leading-relaxed">{stageInfo.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
