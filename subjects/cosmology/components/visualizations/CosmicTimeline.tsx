"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CosmicEvent = {
  id: string;
  timeYearsAgo: number;
  label: string;
  labelEn: string;
  description: string;
  icon: string;
  color: string;
  category: "origin" | "structure" | "light" | "matter" | "life" | "present";
};

const COSMIC_EVENTS: CosmicEvent[] = [
  {
    id: "big-bang",
    timeYearsAgo: 13.8e9,
    label: "大爆炸",
    labelEn: "Big Bang",
    description:
      "宇宙从一个无限致密、高温的奇点膨胀而来。时间和空间本身在此诞生。大爆炸后的最初瞬间，四种基本力统一为一种超力。",
    icon: "✦",
    color: "#f43f5e",
    category: "origin",
  },
  {
    id: "nucleosynthesis",
    timeYearsAgo: 13.8e9 - 3 / (365.25 * 24 * 60),
    label: "核合成",
    labelEn: "Nucleosynthesis",
    description:
      "大爆炸后约 3 分钟，宇宙冷却到约 10 亿度，质子和中子开始结合形成氢、氦和微量的锂。这些轻元素构成了后来所有恒星的原料。",
    icon: "⚛",
    color: "#f97316",
    category: "matter",
  },
  {
    id: "recombination",
    timeYearsAgo: 13.8e9 - 380000,
    label: "复合（CMB 释放）",
    labelEn: "Recombination",
    description:
      "宇宙膨胀冷却到约 3000K，电子首次被原子核捕获形成中性原子。光子得以自由传播，形成了今天观测到的宇宙微波背景辐射（CMB）。",
    icon: "◎",
    color: "#eab308",
    category: "light",
  },
  {
    id: "first-stars",
    timeYearsAgo: 13.6e9,
    label: "第一批恒星",
    labelEn: "First Stars",
    description:
      "宇宙的「黑暗时代」结束。第一批大质量恒星（Population III）点燃，照亮了周围的气体。这些恒星极其巨大、炽热，寿命短暂，以超新星爆发结束生命。",
    icon: "✧",
    color: "#a78bfa",
    category: "light",
  },
  {
    id: "first-galaxies",
    timeYearsAgo: 12.8e9,
    label: "第一批星系",
    labelEn: "First Galaxies",
    description:
      "引力将气体和暗物质聚集在一起，形成了最早的原星系。这些小星系不断合并、成长，逐渐演化为我们今天看到的大型星系。",
    icon: "◉",
    color: "#3b82f6",
    category: "structure",
  },
  {
    id: "solar-system",
    timeYearsAgo: 4.6e9,
    label: "太阳系形成",
    labelEn: "Solar System Forms",
    description:
      "一片巨大的分子云在引力作用下坍缩，中心形成了太阳。残余物质形成了原行星盘，最终凝聚为八大行星、矮行星和无数小天体。",
    icon: "☉",
    color: "#22d3ee",
    category: "structure",
  },
  {
    id: "present",
    timeYearsAgo: 0,
    label: "现在",
    labelEn: "Present",
    description:
      "宇宙已经膨胀了 138 亿年。我们生活在一个拥有约 2 万亿个星系的可观测宇宙中。暗能量正在加速宇宙的膨胀。",
    icon: "⊕",
    color: "#10b981",
    category: "present",
  },
];

const AGE_UNIVERSE = 13.8e9;

function logScale(yearsAgo: number): number {
  if (yearsAgo <= 0) return 1;
  const logMax = Math.log10(AGE_UNIVERSE);
  const logVal = Math.log10(yearsAgo);
  return logVal / logMax;
}

function formatTimeAgo(yearsAgo: number): string {
  if (yearsAgo === 0) return "现在";
  if (yearsAgo < 1) {
    const minutes = Math.round(yearsAgo * 365.25 * 24 * 60);
    if (minutes < 60) return `${minutes} 分钟`;
    const hours = Math.round(minutes / 60);
    return `${hours} 小时`;
  }
  if (yearsAgo < 1000) return `${Math.round(yearsAgo)} 年`;
  if (yearsAgo < 1e6) return `${(yearsAgo / 1e3).toFixed(0)} 千年`;
  if (yearsAgo < 1e9) return `${(yearsAgo / 1e6).toFixed(0)} 百万年`;
  return `${(yearsAgo / 1e9).toFixed(1)} 亿年`;
}

function formatTimeAgoFull(yearsAgo: number): string {
  if (yearsAgo === 0) return "现在（0 年前）";
  return `${formatTimeAgo(yearsAgo)}前`;
}

type DetailCardProps = {
  event: CosmicEvent;
  onClose: () => void;
};

function DetailCard({ event, onClose }: DetailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative p-6 rounded-xl border border-white/[0.08] bg-[#0f1320]/90 backdrop-blur-xl max-w-lg mx-auto"
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
          style={{
            backgroundColor: `${event.color}20`,
            color: event.color,
          }}
        >
          {event.icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-[#f5f6fa] mb-0.5">
            {event.label}
          </h3>
          <p className="text-xs text-[#868da0] mb-2">{event.labelEn}</p>
          <p
            className="text-sm font-mono font-medium mb-3"
            style={{ color: event.color }}
          >
            {formatTimeAgoFull(event.timeYearsAgo)}
          </p>
          <p className="text-sm text-[#a8adbd] leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

type TimelineMarkerProps = {
  event: CosmicEvent;
  x: number;
  isAlternate: boolean;
  isSelected: boolean;
  onClick: () => void;
};

function TimelineMarker({
  event,
  x,
  isAlternate,
  isSelected,
  onClick,
}: TimelineMarkerProps) {
  const lineY1 = 60;
  const lineY2 = isAlternate ? 140 : 200;
  const labelY = isAlternate ? 155 : 215;
  const timeY = isAlternate ? 170 : 230;

  return (
    <g
      className="cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${event.label} — ${formatTimeAgoFull(event.timeYearsAgo)}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Vertical connector */}
      <line
        x1={x}
        y1={lineY1 + 8}
        x2={x}
        y2={lineY2}
        stroke={event.color}
        strokeWidth={1}
        opacity={0.4}
        strokeDasharray="3 3"
      />

      {/* Pulse ring on selected */}
      {isSelected && (
        <>
          <circle
            cx={x}
            cy={60}
            r={18}
            fill="none"
            stroke={event.color}
            strokeWidth={1}
            opacity={0.2}
          >
            <animate
              attributeName="r"
              from="12"
              to="24"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.3"
              to="0"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </>
      )}

      {/* Event marker */}
      <circle
        cx={x}
        cy={60}
        r={isSelected ? 10 : 7}
        fill={isSelected ? event.color : `${event.color}40`}
        stroke={event.color}
        strokeWidth={isSelected ? 2 : 1.5}
        style={{
          filter: isSelected
            ? `drop-shadow(0 0 8px ${event.color}80)`
            : "none",
          transition: "all 0.3s ease",
        }}
      />

      {/* Icon */}
      <text
        x={x}
        y={64}
        textAnchor="middle"
        fill={isSelected ? "#fff" : event.color}
        fontSize={isSelected ? 10 : 8}
        style={{ pointerEvents: "none" }}
      >
        {event.icon}
      </text>

      {/* Label */}
      <text
        x={x}
        y={labelY}
        textAnchor="middle"
        fill={isSelected ? "#f5f6fa" : "#a8adbd"}
        fontSize={12}
        fontWeight={isSelected ? 600 : 400}
        fontFamily="var(--font-sans)"
      >
        {event.label}
      </text>

      {/* Time label */}
      <text
        x={x}
        y={timeY}
        textAnchor="middle"
        fill={isSelected ? event.color : "#4b5563"}
        fontSize={9}
        fontFamily="var(--font-mono)"
      >
        {formatTimeAgo(event.timeYearsAgo)}
      </text>
    </g>
  );
}

export function CosmicTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<CosmicEvent | null>(null);

  const sortedEvents = useMemo(
    () =>
      [...COSMIC_EVENTS].sort((a, b) => b.timeYearsAgo - a.timeYearsAgo),
    []
  );

  const viewBox = { width: 1000, height: 260 };
  const padding = { left: 60, right: 60 };
  const usableWidth = viewBox.width - padding.left - padding.right;

  const markerPositions = useMemo(
    () =>
      sortedEvents.map((event) => {
        const norm = logScale(event.timeYearsAgo);
        return padding.left + (1 - norm) * usableWidth;
      }),
    [sortedEvents, usableWidth, padding.left]
  );

  const handleSelect = useCallback(
    (event: CosmicEvent) => {
      setSelectedEvent((prev) => (prev?.id === event.id ? null : event));
    },
    []
  );

  const categoryColors: Record<CosmicEvent["category"], string> = {
    origin: "#f43f5e",
    structure: "#3b82f6",
    light: "#eab308",
    matter: "#f97316",
    life: "#10b981",
    present: "#10b981",
  };

  return (
    <section className="w-full">
      <div className="mb-6 text-center">
        <p className="text-xs tracking-[0.32em] uppercase mb-3 text-[#3b82f6]">
          Interactive Timeline
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#f5f6fa] mb-2">
          宇宙演化时间线
        </h2>
        <p className="text-sm text-[#868da0]">
          点击事件标记查看详细信息 · 对数刻度使近期事件更清晰
        </p>
      </div>

      {/* Timeline SVG */}
      <div className="w-full overflow-x-auto">
        <svg
          className="w-full min-w-[700px] select-none"
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="宇宙演化时间线，从大爆炸到现在"
        >
          <defs>
            {/* Gradient for the timeline track */}
            <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="20%" stopColor="#f97316" />
              <stop offset="40%" stopColor="#eab308" />
              <stop offset="60%" stopColor="#a78bfa" />
              <stop offset="80%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background track */}
          <rect
            x={padding.left}
            y={56}
            width={usableWidth}
            height={8}
            rx={4}
            fill="rgba(255,255,255,0.04)"
          />

          {/* Colored gradient track */}
          <rect
            x={padding.left}
            y={56}
            width={usableWidth}
            height={8}
            rx={4}
            fill="url(#timeline-gradient)"
            opacity={0.3}
          />

          {/* Tick marks for reference */}
          {[0, 2, 4, 6, 8, 10, 12, 13.8].map((billionYears) => {
            const yearsAgo = billionYears * 1e9;
            const norm = logScale(yearsAgo === 0 ? 1 : yearsAgo);
            const x = padding.left + (1 - norm) * usableWidth;
            return (
              <g key={billionYears}>
                <line
                  x1={x}
                  y1={52}
                  x2={x}
                  y2={68}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={46}
                  textAnchor="middle"
                  fill="#4b5563"
                  fontSize={8}
                  fontFamily="var(--font-mono)"
                >
                  {billionYears === 0
                    ? "现在"
                    : `${billionYears} Byr`}
                </text>
              </g>
            );
          })}

          {/* Event markers */}
          {sortedEvents.map((event, i) => (
            <TimelineMarker
              key={event.id}
              event={event}
              x={markerPositions[i] ?? padding.left}
              isAlternate={i % 2 === 0}
              isSelected={selectedEvent?.id === event.id}
              onClick={() => handleSelect(event)}
            />
          ))}

          {/* Now indicator at right edge */}
          <g>
            <line
              x1={padding.left + usableWidth}
              y1={40}
              x2={padding.left + usableWidth}
              y2={80}
              stroke="#10b981"
              strokeWidth={2}
              opacity={0.6}
            />
            <polygon
              points={`${padding.left + usableWidth},36 ${padding.left + usableWidth - 4},42 ${padding.left + usableWidth + 4},42`}
              fill="#10b981"
              opacity={0.6}
            />
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {Object.entries(categoryColors).map(([cat, color]) => {
          const labels: Record<string, string> = {
            origin: "起源",
            structure: "结构",
            light: "光与辐射",
            matter: "物质",
            life: "生命",
            present: "现在",
          };
          return (
            <div key={cat} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-[#868da0]">{labels[cat] ?? cat}</span>
            </div>
          );
        })}
      </div>

      {/* Event list for small screens */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {sortedEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => handleSelect(event)}
            className="p-3 rounded-xl border transition-all text-left"
            style={{
              borderColor:
                selectedEvent?.id === event.id
                  ? `${event.color}40`
                  : "rgba(255,255,255,0.06)",
              backgroundColor:
                selectedEvent?.id === event.id
                  ? `${event.color}10`
                  : "rgba(255,255,255,0.02)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span style={{ color: event.color }}>{event.icon}</span>
              <span className="text-xs font-medium text-[#a8adbd] truncate">
                {event.label}
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#4b5563]">
              {formatTimeAgo(event.timeYearsAgo)}
            </p>
          </button>
        ))}
      </div>

      {/* Detail card */}
      <div className="mt-8">
        <AnimatePresence>
          {selectedEvent && (
            <DetailCard
              key={selectedEvent.id}
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
