"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ScaleObject = {
  id: string;
  exponent: number;
  nameCn: string;
  nameEn: string;
  size: string;
  description: string;
  icon: string;
  color: string;
};

const SCALE_OBJECTS: ScaleObject[] = [
  {
    id: "planck",
    exponent: -35,
    nameCn: "普朗克长度",
    nameEn: "Planck Length",
    size: "1.6 × 10⁻³⁵ m",
    description: "物理学中可测量的最小长度，量子引力的特征尺度。在此尺度下，时空本身的量子涨落变得显著。",
    icon: "✦",
    color: "#a78bfa",
  },
  {
    id: "proton",
    exponent: -15,
    nameCn: "质子",
    nameEn: "Proton",
    size: "1.7 × 10⁻¹⁵ m",
    description: "原子核的组成部分，由三个夸克通过强相互作用束缚而成。质子的大小决定了原子核的尺度。",
    icon: "●",
    color: "#818cf8",
  },
  {
    id: "atom",
    exponent: -10,
    nameCn: "原子",
    nameEn: "Atom",
    size: "1 × 10⁻¹⁰ m",
    description: "物质的基本单位，由原子核和电子云组成。原子的大小约为一亿分之一厘米。",
    icon: "◎",
    color: "#60a5fa",
  },
  {
    id: "dna",
    exponent: -8,
    nameCn: "DNA 分子",
    nameEn: "DNA Molecule",
    size: "2 × 10⁻⁸ m",
    description: "脱氧核糖核酸双螺旋结构的直径，承载着所有已知生物的遗传信息。",
    icon: "🧬",
    color: "#34d399",
  },
  {
    id: "cell",
    exponent: -5,
    nameCn: "细胞",
    nameEn: "Cell",
    size: "1 × 10⁻⁵ m",
    description: "生命的基本单位。典型的人类细胞直径约为 10 微米，包含复杂的分子机器。",
    icon: "⬡",
    color: "#2dd4bf",
  },
  {
    id: "sand",
    exponent: -3,
    nameCn: "沙粒",
    nameEn: "Grain of Sand",
    size: "1 × 10⁻³ m",
    description: "一粒典型的细沙直径约 1 毫米，由矿物碎片组成，是岩石风化的产物。",
    icon: "·",
    color: "#fbbf24",
  },
  {
    id: "human",
    exponent: 0,
    nameCn: "人体",
    nameEn: "Human",
    size: "1.7 m",
    description: "成年人的身高约 1.7 米，是日常生活中最熟悉的尺度参考。",
    icon: "☉",
    color: "#f97316",
  },
  {
    id: "mountain",
    exponent: 4,
    nameCn: "山脉",
    nameEn: "Mountain",
    size: "1 × 10⁴ m",
    description: "地球上的大型山脉高度可达万米级别。珠穆朗玛峰高 8848 米。",
    icon: "▲",
    color: "#ef4444",
  },
  {
    id: "earth",
    exponent: 7,
    nameCn: "地球",
    nameEn: "Earth",
    size: "1.3 × 10⁷ m",
    description: "地球的直径约 12742 公里，是太阳系中第三颗行星，已知唯一孕育生命的天体。",
    icon: "⊕",
    color: "#3b82f6",
  },
  {
    id: "solar-system",
    exponent: 13,
    nameCn: "太阳系",
    nameEn: "Solar System",
    size: "9 × 10¹² m",
    description: "从太阳到海王星的距离约 30 AU（天文单位），包含八大行星和无数小天体。",
    icon: "◉",
    color: "#f59e0b",
  },
  {
    id: "milky-way",
    exponent: 21,
    nameCn: "银河系",
    nameEn: "Milky Way",
    size: "1 × 10²¹ m",
    description: "我们的银河系直径约 10 万光年，包含约 2000 亿颗恒星，是一个棒旋星系。",
    icon: "✧",
    color: "#8b5cf6",
  },
  {
    id: "observable-universe",
    exponent: 26,
    nameCn: "可观测宇宙",
    nameEn: "Observable Universe",
    size: "8.8 × 10²⁶ m",
    description: "从地球出发，光在 138 亿年内能到达的最远距离。可观测宇宙直径约 930 亿光年。",
    icon: "◯",
    color: "#ec4899",
  },
];

const MIN_EXPONENT = -35;
const MAX_EXPONENT = 26;
const EXPONENT_RANGE = MAX_EXPONENT - MIN_EXPONENT;

function exponentToPercent(exp: number): number {
  return ((exp - MIN_EXPONENT) / EXPONENT_RANGE) * 100;
}

function percentToExponent(pct: number): number {
  return MIN_EXPONENT + (pct / 100) * EXPONENT_RANGE;
}

function formatExponent(exp: number): string {
  const superscripts: Record<string, string> = {
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
    "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  };
  const absExp = Math.abs(exp);
  const digits = String(absExp).split("").map((d) => superscripts[d] ?? d).join("");
  const sign = exp < 0 ? "⁻" : "";
  return `10${sign}${digits} m`;
}

function findClosestObject(exp: number): ScaleObject {
  let closest = SCALE_OBJECTS[0]!;
  let minDist = Infinity;
  for (const obj of SCALE_OBJECTS) {
    const dist = Math.abs(obj.exponent - exp);
    if (dist < minDist) {
      minDist = dist;
      closest = obj;
    }
  }
  return closest;
}

function getVisualSize(exponent: number): number {
  const normalized = (exponent - MIN_EXPONENT) / EXPONENT_RANGE;
  return 8 + normalized * 92;
}

type SliderTrackProps = {
  value: number;
  onChange: (value: number) => void;
};

function SliderTrack({ value, onChange }: SliderTrackProps) {
  const trackRef = useMemo(() => ({ current: null as SVGSVGElement | null }), []);

  const handlePointer = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      onChange(percentToExponent(pct));
    },
    [onChange, trackRef]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      handlePointer(e.clientX);
      const onMove = (ev: MouseEvent) => handlePointer(ev.clientX);
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [handlePointer]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<SVGSVGElement>) => {
      const touch = e.touches[0];
      if (touch) handlePointer(touch.clientX);
      const onMove = (ev: TouchEvent) => {
        const t = ev.touches[0];
        if (t) handlePointer(t.clientX);
      };
      const onEnd = () => {
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
      };
      window.addEventListener("touchmove", onMove);
      window.addEventListener("touchend", onEnd);
    },
    [handlePointer]
  );

  const currentPct = exponentToPercent(value);
  const closest = findClosestObject(value);

  return (
    <div className="relative w-full">
      <svg
        ref={(el) => { trackRef.current = el; }}
        className="w-full cursor-pointer select-none"
        height="100"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="slider"
        aria-label="宇宙尺度滑块"
        aria-valuemin={MIN_EXPONENT}
        aria-valuemax={MAX_EXPONENT}
        aria-valuenow={Math.round(value)}
        tabIndex={0}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 5 : 1;
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            onChange(Math.min(MAX_EXPONENT, value + step));
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            onChange(Math.max(MIN_EXPONENT, value - step));
          }
        }}
      >
        <defs>
          <linearGradient id="track-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="track-fill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <rect x="40" y="44" width="920" height="12" rx="6" fill="url(#track-gradient)" />

        {/* Filled portion */}
        <rect
          x="40"
          y="44"
          width={Math.max(0, (currentPct / 100) * 920)}
          height="12"
          rx="6"
          fill="url(#track-fill)"
        />

        {/* Scale object markers */}
        {SCALE_OBJECTS.map((obj) => {
          const px = 40 + (exponentToPercent(obj.exponent) / 100) * 920;
          const isActive = obj.id === closest.id;
          return (
            <g key={obj.id}>
              <circle
                cx={px}
                cy="50"
                r={isActive ? 6 : 4}
                fill={obj.color}
                opacity={isActive ? 1 : 0.5}
              />
              <text
                x={px}
                y="82"
                textAnchor="middle"
                fill={isActive ? "#f5f6fa" : "#868da0"}
                fontSize="9"
                fontFamily="var(--font-sans)"
              >
                {obj.nameCn}
              </text>
            </g>
          );
        })}

        {/* Thumb */}
        <circle
          cx={40 + (currentPct / 100) * 920}
          cy="50"
          r="10"
          fill={closest.color}
          stroke="#f5f6fa"
          strokeWidth="2"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.3))" }}
        />

        {/* Scale label */}
        <text
          x={40 + (currentPct / 100) * 920}
          y="28"
          textAnchor="middle"
          fill="#f5f6fa"
          fontSize="11"
          fontFamily="var(--font-mono)"
        >
          {formatExponent(Math.round(value))}
        </text>
      </svg>
    </div>
  );
}

type DetailCardProps = {
  obj: ScaleObject;
  onClose: () => void;
};

function DetailCard({ obj, onClose }: DetailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.25 }}
      className="relative p-6 rounded-xl border border-white/[0.08] bg-[#0f1320]/90 backdrop-blur-xl max-w-md mx-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/[0.06] text-[#868da0] hover:text-white hover:bg-white/[0.12] transition-colors text-sm"
        aria-label="关闭"
      >
        ✕
      </button>
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ backgroundColor: `${obj.color}20`, color: obj.color }}
        >
          {obj.icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-[#f5f6fa] mb-0.5">{obj.nameCn}</h3>
          <p className="text-xs text-[#868da0] mb-2">{obj.nameEn}</p>
          <p
            className="text-sm font-mono font-medium mb-3"
            style={{ color: obj.color }}
          >
            {obj.size}
          </p>
          <p className="text-sm text-[#a8adbd] leading-relaxed">{obj.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ScaleOfUniverse() {
  const [exponent, setExponent] = useState(0);
  const [selectedObject, setSelectedObject] = useState<ScaleObject | null>(null);

  const closest = useMemo(() => findClosestObject(exponent), [exponent]);
  const visualSize = useMemo(() => getVisualSize(exponent), [exponent]);

  const nearbyObjects = useMemo(() => {
    const range = 6;
    return SCALE_OBJECTS.filter(
      (obj) => Math.abs(obj.exponent - exponent) <= range
    ).sort((a, b) => Math.abs(a.exponent - exponent) - Math.abs(b.exponent - exponent));
  }, [exponent]);

  return (
    <section className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#f5f6fa] mb-2">
          宇宙尺度
        </h2>
        <p className="text-sm text-[#868da0]">
          拖动滑块，从普朗克长度漫游到可观测宇宙
        </p>
      </div>

      {/* Visual representation */}
      <div className="relative flex items-center justify-center h-64 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={closest.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center gap-3 cursor-pointer"
            onClick={() => setSelectedObject(closest)}
          >
            <div
              className="rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                width: `${visualSize}%`,
                aspectRatio: "1",
                maxWidth: "220px",
                minWidth: "32px",
                backgroundColor: `${closest.color}15`,
                border: `2px solid ${closest.color}40`,
                color: closest.color,
                fontSize: `${Math.max(14, visualSize * 0.4)}px`,
              }}
            >
              {closest.icon}
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-[#f5f6fa]">{closest.nameCn}</p>
              <p className="text-sm font-mono" style={{ color: closest.color }}>
                {closest.size}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider */}
      <div className="mb-8 px-4">
        <SliderTrack value={exponent} onChange={setExponent} />
      </div>

      {/* Nearby objects */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {nearbyObjects.map((obj) => (
          <button
            key={obj.id}
            onClick={() => {
              setSelectedObject(obj);
              setExponent(obj.exponent);
            }}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all border"
            style={{
              borderColor: obj.id === closest.id ? `${obj.color}60` : "rgba(255,255,255,0.06)",
              backgroundColor: obj.id === closest.id ? `${obj.color}15` : "rgba(255,255,255,0.02)",
              color: obj.id === closest.id ? obj.color : "#868da0",
            }}
          >
            {obj.icon} {obj.nameCn}
          </button>
        ))}
      </div>

      {/* Size comparison */}
      <div className="max-w-lg mx-auto mb-8 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
        <p className="text-xs text-[#868da0] uppercase tracking-wider mb-3">尺寸对比</p>
        <div className="space-y-2">
          {SCALE_OBJECTS.filter((obj) => {
            const diff = exponent - obj.exponent;
            return diff >= 0 && diff <= 12;
          })
            .slice(0, 4)
            .map((obj) => {
              const ratio = exponent - obj.exponent;
              if (ratio === 0) return null;
              return (
                <div key={obj.id} className="flex items-center gap-3 text-sm">
                  <span className="text-[#868da0] w-20 shrink-0 text-right">{obj.nameCn}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: obj.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(2, 100 - ratio * 8)}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <span className="text-xs font-mono text-[#868da0] w-24">
                    10{ratio}× 更小
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Detail card */}
      <AnimatePresence>
        {selectedObject && (
          <DetailCard
            obj={selectedObject}
            onClose={() => setSelectedObject(null)}
          />
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {SCALE_OBJECTS.map((obj) => (
          <button
            key={obj.id}
            onClick={() => {
              setExponent(obj.exponent);
              setSelectedObject(obj);
            }}
            className="p-2 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all text-left"
          >
            <div className="flex items-center gap-2">
              <span style={{ color: obj.color }}>{obj.icon}</span>
              <span className="text-xs text-[#a8adbd] truncate">{obj.nameCn}</span>
            </div>
            <p className="text-[10px] font-mono text-[#4b5563] mt-1">{obj.size}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
