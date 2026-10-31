"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PRODUCT_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

interface DistanceRung {
  id: string;
  name: string;
  nameEn: string;
  method: string;
  range: string;
  rangeKm: number;
  color: string;
  icon: string;
  description: string;
  example: string;
}

const DISTANCE_RUNGS: DistanceRung[] = [
  {
    id: "radar",
    name: "雷达测距",
    nameEn: "Radar Ranging",
    method: "发射雷达信号，测量反射时间",
    range: "太阳系内（示例约 10 AU）",
    rangeKm: 1.5e9,
    color: "#22c55e",
    icon: "📡",
    description: "向行星或小行星发射雷达脉冲，测量信号往返时间。已知光速 c，距离 d = ct/2。",
    example: "金星最近距离: ~0.28 AU",
  },
  {
    id: "parallax",
    name: "视差法",
    nameEn: "Stellar Parallax",
    method: "地球公转产生的基线三角测量",
    range: "银河系内（示例 1 万光年）",
    rangeKm: 9.46e16,
    color: "#3b82f6",
    icon: "🔭",
    description:
      "比较地球轨道两端、相隔约 2 AU 的观测。年周视差 p 是总摆动的一半，对应 1 AU；距离 d（pc）= 1/p（角秒），1 pc 约合 3.26 光年。",
    example: '比邻星: 1.3 pc (视差 0.77")',
  },
  {
    id: "cepheid",
    name: "造父变星",
    nameEn: "Cepheid Variables",
    method: "周光关系——脉动周期→绝对星等",
    range: "近邻星系（示例 1 亿光年）",
    rangeKm: 9.46e20,
    color: "#f97316",
    icon: "💫",
    description:
      "造父变星具有可校准的周光关系。测量周期，并处理金属丰度、尘埃和拥挤效应后，可由本征与表观亮度估计距离。",
    example: "仙女座星系中的造父变星",
  },
  {
    id: "trgb",
    name: "TRGB 法",
    nameEn: "Tip of RGB",
    method: "红巨星支顶端——标准烛光",
    range: "近邻星系（示例 1 亿光年）",
    rangeKm: 9.46e20,
    color: "#a855f7",
    icon: "🔴",
    description:
      "选定波段和恒星族群后，红巨星支顶端的光度函数截断边缘可作标准烛光；仍需校准零点、颜色与金属丰度，不能假设所有星系完全相同。",
    example: "用于校准哈勃常数",
  },
  {
    id: "tully-fisher",
    name: "塔利-费舍尔",
    nameEn: "Tully-Fisher",
    method: "星系旋转速度→光度",
    range: "星系团等（示例 3 亿光年）",
    rangeKm: 2.84e21,
    color: "#ec4899",
    icon: "🌀",
    description: "螺旋星系的旋转速度与其本征光度存在相关性。测量旋转速度可推算距离。",
    example: "适用于螺旋星系",
  },
  {
    id: "ia-supernova",
    name: "Ia 型超新星",
    nameEn: "Type Ia Supernovae",
    method: "光变形状与颜色等校正后的标准烛光",
    range: "远方星系（示例光度距离 100 亿光年）",
    rangeKm: 9.46e22,
    color: "#ef4444",
    icon: "💥",
    description:
      "Ia 型超新星来自白矮星的热核爆炸，前身通道不唯一，也非全部达到同一质量。峰值亮度经过光变形状、颜色等标准化后，才适合统计测距。",
    example: "1998年发现宇宙加速膨胀",
  },
  {
    id: "redshift",
    name: "红移",
    nameEn: "Cosmological Redshift",
    method: "结合宇宙学模型，由 z 计算距离",
    range: "宇宙学尺度（示例光度距离约 465 亿光年）",
    rangeKm: 4.4e23,
    color: "#fbbf24",
    icon: "🌈",
    description:
      "低红移下可近似用 cz ≈ H₀d，但要考虑本动速度。高红移距离需要宇宙膨胀史 H(z) 及距离定义，不能直接套用 d = cz/H₀。",
    example: "同一 z 的光度距离与共动距离不同",
  },
];

function formatDistance(km: number): string {
  if (km < 1e10) return `${(km / 1e6).toFixed(0)} 百万公里`;
  if (km < 1e13) return `${(km / 1e9).toFixed(0)} 十亿公里`;
  if (km < 1e16) return `${(km / 1e12).toFixed(0)} 万亿公里`;
  const ly = km / 9.461e12;
  if (ly < 1e3) return `${ly.toFixed(1)} 光年`;
  if (ly < 1e6) return `${(ly / 1e3).toFixed(0)} 千光年`;
  if (ly < 1e9) return `${(ly / 1e6).toFixed(0)} 百万光年`;
  return `${(ly / 1e9).toFixed(1)} 十亿光年`;
}

interface CosmicDistanceLadderProps {
  className?: string;
}

export function CosmicDistanceLadder({ className }: CosmicDistanceLadderProps) {
  const reduce = useReducedMotion();
  const [selectedRung, setSelectedRung] = useState<string | null>(null);

  const selected = useMemo(
    () => DISTANCE_RUNGS.find((r) => r.id === selectedRung) ?? null,
    [selectedRung]
  );

  const logScale = (km: number): number => {
    const logMax = Math.log10(DISTANCE_RUNGS[DISTANCE_RUNGS.length - 1]!.rangeKm);
    const logMin = Math.log10(DISTANCE_RUNGS[0]!.rangeKm);
    return (Math.log10(km) - logMin) / (logMax - logMin);
  };

  return (
    <div className={className}>
      <p className="text-fg-muted mb-3 text-xs leading-relaxed">
        各方法的有效范围随目标、仪器与精度要求变化，以下仅选示例尺度。造父变星与 TRGB
        可并行校准超新星；高红移处标注光度距离，不能把它当作光行时间乘光速。
      </p>
      <div className="border-border-faint bg-bg-near relative overflow-hidden border">
        <div className="border-border-faint flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2">
          <span className="text-fg-muted font-mono text-[10px] tracking-[0.28em] uppercase">
            宇宙距离阶梯 · cosmic distance ladder
          </span>
          <span className="text-fg-disabled font-mono text-[9px]">点击各层级查看方法详情</span>
        </div>

        <div
          className="overflow-x-auto p-4"
          role="region"
          aria-label="宇宙距离阶梯，可横向滚动查看方法与示例尺度"
          tabIndex={0}
        >
          <svg
            viewBox="0 0 800 350"
            className="h-auto w-full min-w-[800px]"
            role="group"
            aria-label="宇宙距离阶梯可视化"
          >
            <defs>
              <linearGradient id="ladder-bg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0a0a1a" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            <rect x={60} y={20} width={700} height={280} fill="url(#ladder-bg)" rx={4} />

            <line x1={60} y1={300} x2={760} y2={300} stroke="#333" strokeWidth={1} />
            <text
              x={410}
              y={320}
              textAnchor="middle"
              fill="#a8adbd"
              fontSize="12"
              fontFamily="monospace"
            >
              示例距离（对数刻度，并非覆盖上限）
            </text>

            {DISTANCE_RUNGS.map((rung, i) => {
              const x = 80 + logScale(rung.rangeKm) * 660;
              const y = 40 + i * 38;
              const isSelected = selectedRung === rung.id;

              return (
                <g
                  key={rung.id}
                  onClick={() => setSelectedRung(isSelected ? null : rung.id)}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`${rung.name} — ${rung.range}`}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedRung(isSelected ? null : rung.id);
                    }
                  }}
                >
                  <rect
                    x={60}
                    y={y - 12}
                    width={700}
                    height={34}
                    fill={isSelected ? `${rung.color}10` : "transparent"}
                    rx={2}
                  />

                  <line
                    x1={80}
                    y1={y + 5}
                    x2={x}
                    y2={y + 5}
                    stroke={rung.color}
                    strokeWidth={isSelected ? 3 : 2}
                    opacity={isSelected ? 0.8 : 0.4}
                  />

                  <circle
                    cx={x}
                    cy={y + 5}
                    r={isSelected ? 8 : 5}
                    fill={rung.color}
                    fillOpacity={isSelected ? 0.4 : 0.2}
                    stroke={rung.color}
                    strokeWidth={isSelected ? 2 : 1}
                  />

                  <text
                    x={80}
                    y={y - 2}
                    fill={isSelected ? rung.color : "#a8adbd"}
                    fontSize="12"
                    fontFamily="sans-serif"
                    fontWeight={isSelected ? 600 : 400}
                  >
                    {rung.icon} {rung.name}
                  </text>

                  <text
                    x={760}
                    y={y + 8}
                    textAnchor="end"
                    fill={isSelected ? rung.color : "#555"}
                    fontSize="12"
                    fontFamily="monospace"
                  >
                    {rung.range}
                  </text>

                  <text
                    x={x}
                    y={y + 23}
                    textAnchor="middle"
                    fill="#a8adbd"
                    fontSize="12"
                    fontFamily="monospace"
                  >
                    {formatDistance(rung.rangeKm)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="border-border-faint flex items-center justify-between border-t px-4 py-2">
          <div className="flex flex-wrap items-center gap-4">
            {DISTANCE_RUNGS.map((rung) => (
              <div key={rung.id} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: rung.color }}
                />
                <span className="text-fg-muted font-mono text-[8px]">{rung.nameEn}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected ? (
        <motion.div
          key={selected.id}
          initial={reduce ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: PRODUCT_EASE }}
          className="mt-3 border p-5"
          style={{
            borderColor: `${selected.color}30`,
            background: `${selected.color}08`,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center text-2xl"
              style={{ backgroundColor: `${selected.color}20`, color: selected.color }}
            >
              {selected.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-display text-fg-primary text-base font-semibold">
                {selected.name}
                <span className="text-fg-muted ml-2 font-mono text-[10px]">{selected.nameEn}</span>
              </h4>
              <p className="text-fg-secondary mt-1 text-sm leading-relaxed">
                {selected.description}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="border-border-faint border p-2">
                  <p className="text-fg-muted font-mono text-[9px]">方法</p>
                  <p className="text-fg-primary font-mono text-xs">{selected.method}</p>
                </div>
                <div className="border-border-faint border p-2">
                  <p className="text-fg-muted font-mono text-[9px]">示例</p>
                  <p className="text-fg-primary font-mono text-xs">{selected.example}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={false}
          animate={{ opacity: 1 }}
          className="border-border-faint bg-bg-near mt-3 border p-5 text-center"
        >
          <p className="text-fg-disabled font-mono text-xs">
            点击上方阶梯的各层级，查看该距离测量方法的详细说明
          </p>
        </motion.div>
      )}

      <p className="text-fg-muted mt-3 text-xs leading-relaxed">
        来源：
        <a
          className="underline"
          href="https://arxiv.org/abs/2112.04510"
          target="_blank"
          rel="noopener noreferrer"
        >
          Riess 等（2022）
        </a>
        、
        <a
          className="underline"
          href="https://arxiv.org/abs/1907.05922"
          target="_blank"
          rel="noopener noreferrer"
        >
          Freedman 等（2019）
        </a>
        、
        <a
          className="underline"
          href="https://arxiv.org/abs/astro-ph/9905116"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hogg（距离定义）
        </a>
        。
      </p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="border-border-faint bg-bg-near border p-3">
          <p className="text-fg-muted font-mono text-[9px]">近距</p>
          <p className="text-fg-primary font-mono text-sm">视差法</p>
          <p className="text-fg-disabled mt-1 text-[10px]">几何锚点之一</p>
        </div>
        <div className="border-border-faint bg-bg-near border p-3">
          <p className="text-fg-muted font-mono text-[9px]">中距</p>
          <p className="text-fg-primary font-mono text-sm">标准烛光</p>
          <p className="text-fg-disabled mt-1 text-[10px]">造父变星、Ia 超新星</p>
        </div>
        <div className="border-border-faint bg-bg-near border p-3">
          <p className="text-fg-muted font-mono text-[9px]">远距</p>
          <p className="text-fg-primary font-mono text-sm">红移</p>
          <p className="text-fg-disabled mt-1 text-[10px]">红移与膨胀模型</p>
        </div>
      </div>
    </div>
  );
}
