"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type EcosystemType = "forest" | "ocean";

interface TrophicLevel {
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  energyPercent: number;
  biomassForest: string;
  biomassOcean: string;
  examples: string;
}

const TROPHIC_LEVELS: TrophicLevel[] = [
  {
    name: "生产者",
    nameEn: "Producers",
    icon: "🌿",
    color: "#22c55e",
    energyPercent: 100,
    biomassForest: "植物、藻类",
    biomassOcean: "浮游植物",
    examples: "草、树、藻类",
  },
  {
    name: "初级消费者",
    nameEn: "Primary Consumers",
    icon: "🐛",
    color: "#3b82f6",
    energyPercent: 10,
    biomassForest: "食草动物",
    biomassOcean: "浮游动物",
    examples: "兔、鹿、蝗虫",
  },
  {
    name: "次级消费者",
    nameEn: "Secondary Consumers",
    icon: "🦊",
    color: "#f97316",
    energyPercent: 1,
    biomassForest: "小型食肉动物",
    biomassOcean: "小鱼",
    examples: "狐、蛇、蛙",
  },
  {
    name: "三级消费者",
    nameEn: "Tertiary Consumers",
    icon: "🦅",
    color: "#ef4444",
    energyPercent: 0.1,
    biomassForest: "大型食肉动物",
    biomassOcean: "大型鱼类",
    examples: "鹰、狼、鲨鱼",
  },
  {
    name: "分解者",
    nameEn: "Decomposers",
    icon: "🍄",
    color: "#a855f7",
    energyPercent: 0,
    biomassForest: "真菌、细菌",
    biomassOcean: "深海细菌",
    examples: "蘑菇、霉菌",
  },
];

const ECOSYSTEM_DATA: Record<EcosystemType, { label: string; description: string; sunColor: string }> = {
  forest: {
    label: "森林生态系统",
    description: "陆地生态系统中生产力最高，层次结构明显，从林冠到地被层。",
    sunColor: "#fbbf24",
  },
  ocean: {
    label: "海洋生态系统",
    description: "覆盖地球 71% 表面，浮游植物贡献全球 50% 以上的氧气产量。",
    sunColor: "#60a5fa",
  },
};

function AnimatedEnergyArrow({
  fromY,
  toY,
  x,
  progress,
  color,
}: {
  fromY: number;
  toY: number;
  x: number;
  progress: number;
  color: string;
}) {
  const height = toY - fromY;
  const currentH = height * Math.min(progress, 1);

  return (
    <g>
      <rect
        x={x - 3}
        y={fromY}
        width={6}
        height={currentH}
        fill={color}
        fillOpacity={0.3}
        rx={3}
      />
      {progress > 0.1 && (
        <polygon
          points={`${x - 6},${fromY + currentH - 8} ${x + 6},${fromY + currentH - 8} ${x},${fromY + currentH}`}
          fill={color}
          fillOpacity={0.6}
        />
      )}
    </g>
  );
}

function EnergyPyramid({
  ecosystem,
  animProgress,
}: {
  ecosystem: EcosystemType;
  animProgress: number;
}) {
  const svgWidth = 700;
  const svgHeight = 400;
  const pyramidTop = 60;
  const pyramidBottom = 360;
  const pyramidLeft = 150;
  const pyramidRight = 550;
  const centerX = svgWidth / 2;

  const levelHeight = (pyramidBottom - pyramidTop) / TROPHIC_LEVELS.length;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="h-auto w-full"
      role="img"
      aria-label={`${ECOSYSTEM_DATA[ecosystem].label}能量金字塔`}
    >
      <defs>
        <filter id="pyramid-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <text
        x={centerX}
        y={30}
        textAnchor="middle"
        fill="#fbbf24"
        fontSize="14"
        fontFamily="monospace"
      >
        ☀ 太阳能
      </text>

      {TROPHIC_LEVELS.map((level, i) => {
        const y1 = pyramidTop + i * levelHeight;
        const y2 = y1 + levelHeight;
        const widthAtTop = ((pyramidBottom - y1) / (pyramidBottom - pyramidTop)) * (pyramidRight - pyramidLeft);
        const widthAtBottom = ((pyramidBottom - y2) / (pyramidBottom - pyramidTop)) * (pyramidRight - pyramidLeft);
        const x1 = centerX - widthAtTop / 2;
        const x2 = centerX + widthAtTop / 2;
        const x3 = centerX + widthAtBottom / 2;
        const x4 = centerX - widthAtBottom / 2;

        const isVisible = animProgress > i / TROPHIC_LEVELS.length;
        const opacity = isVisible ? Math.min((animProgress - i / TROPHIC_LEVELS.length) * TROPHIC_LEVELS.length, 1) : 0;

        return (
          <g key={level.name} opacity={opacity}>
            <polygon
              points={`${x1},${y1} ${x2},${y1} ${x3},${y2} ${x4},${y2}`}
              fill={level.color}
              fillOpacity={0.15}
              stroke={level.color}
              strokeWidth={1.5}
              strokeOpacity={0.6}
            />

            <text
              x={centerX}
              y={y1 + levelHeight / 2 - 8}
              textAnchor="middle"
              fill={level.color}
              fontSize="13"
              fontFamily="sans-serif"
              fontWeight="600"
            >
              {level.icon} {level.name}
            </text>
            <text
              x={centerX}
              y={y1 + levelHeight / 2 + 8}
              textAnchor="middle"
              fill="#888"
              fontSize="10"
              fontFamily="monospace"
            >
              {level.energyPercent > 0 ? `${level.energyPercent}% 能量` : "分解有机物"}
            </text>

            <text
              x={x2 + 12}
              y={y1 + levelHeight / 2}
              dominantBaseline="middle"
              fill="#666"
              fontSize="9"
              fontFamily="monospace"
            >
              {ecosystem === "forest" ? level.biomassForest : level.biomassOcean}
            </text>
          </g>
        );
      })}

      {TROPHIC_LEVELS.slice(0, -1).map((level, i) => {
        const y1 = pyramidTop + i * levelHeight + levelHeight;
        return (
          <AnimatedEnergyArrow
            key={`arrow-${i}`}
            fromY={y1 - 10}
            toY={y1 + 10}
            x={centerX + 80}
            progress={animProgress * TROPHIC_LEVELS.length - i - 0.5}
            color={level.color}
          />
        );
      })}

      <text
        x={centerX + 80}
        y={pyramidBottom + 20}
        textAnchor="middle"
        fill="#555"
        fontSize="9"
        fontFamily="monospace"
      >
        能量流动 →
      </text>

      <text
        x={centerX}
        y={pyramidBottom + 20}
        textAnchor="middle"
        fill="#444"
        fontSize="8"
        fontFamily="monospace"
      >
        10% 定律：每个营养级仅传递约 10% 的能量
      </text>
    </svg>
  );
}

interface EcosystemEnergyFlowProps {
  className?: string;
}

export function EcosystemEnergyFlow({ className }: EcosystemEnergyFlowProps) {
  const reduce = useReducedMotion();
  const [ecosystem, setEcosystem] = useState<EcosystemType>("forest");
  const [animProgress, setAnimProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setAnimProgress(0);
    setIsPlaying(true);
    lastTimeRef.current = performance.now();
  };

  useEffect(() => {
    if (!isPlaying) return;

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      setAnimProgress((prev) => {
        const next = prev + (delta / 1000) * 0.5;
        if (next >= 1.2) {
          setIsPlaying(false);
          return 1.2;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying]);

  useEffect(() => {
    if (reduce) {
      setAnimProgress(1.2);
    }
  }, [reduce]);

  const ecoData = ECOSYSTEM_DATA[ecosystem];

  return (
    <div className={className}>
      <div className="border-border-faint bg-bg-near relative overflow-hidden border">
        <div className="flex items-center justify-between border-b border-border-faint px-4 py-2">
          <span className="font-mono text-[10px] tracking-[0.28em] text-fg-muted uppercase">
            生态系统能量流动 · energy flow
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEcosystem("forest");
                setAnimProgress(0);
                setIsPlaying(false);
              }}
              className={`border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                ecosystem === "forest"
                  ? "border-accent-cool/40 bg-accent-cool/10 text-accent-cool"
                  : "border-border-subtle bg-bg-near hover:bg-bg-elevated text-fg-secondary"
              }`}
            >
              森林
            </button>
            <button
              onClick={() => {
                setEcosystem("ocean");
                setAnimProgress(0);
                setIsPlaying(false);
              }}
              className={`border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                ecosystem === "ocean"
                  ? "border-accent-cool/40 bg-accent-cool/10 text-accent-cool"
                  : "border-border-subtle bg-bg-near hover:bg-bg-elevated text-fg-secondary"
              }`}
            >
              海洋
            </button>
            <button
              onClick={handlePlay}
              className="border border-accent-cool/30 bg-accent-cool/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-accent-cool uppercase transition-colors duration-200 hover:bg-accent-cool/20"
            >
              {isPlaying ? "暂停" : "播放"}
            </button>
          </div>
        </div>

        <EnergyPyramid ecosystem={ecosystem} animProgress={animProgress} />

        <div className="flex items-center justify-between border-t border-border-faint px-4 py-2">
          <p className="text-fg-muted text-xs">{ecoData.description}</p>
          <span className="font-mono text-[9px] text-fg-disabled">
            10% 能量传递定律
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="border-border-faint bg-bg-near border p-4">
          <h4 className="font-display text-fg-primary mb-2 text-sm font-semibold">能量传递</h4>
          <div className="space-y-2">
            {TROPHIC_LEVELS.slice(0, -1).map((level, i) => {
              const next = TROPHIC_LEVELS[i + 1]!;
              return (
                <div key={level.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-none" style={{ backgroundColor: level.color }} />
                  <span className="font-mono text-[9px] text-fg-muted">
                    {level.name} → {next.name}: ~10%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-border-faint bg-bg-near border p-4">
          <h4 className="font-display text-fg-primary mb-2 text-sm font-semibold">
            {ecosystem === "forest" ? "森林" : "海洋"}特点
          </h4>
          <div className="space-y-1">
            {TROPHIC_LEVELS.map((level) => (
              <div key={level.name} className="flex items-center gap-2">
                <span>{level.icon}</span>
                <span className="font-mono text-[9px] text-fg-muted">
                  {level.name}: {ecosystem === "forest" ? level.biomassForest : level.biomassOcean}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
