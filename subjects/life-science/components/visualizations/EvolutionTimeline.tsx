"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { PRODUCT_EASE } from "../../lib/constants";
import { getAllEras } from "../../lib/eras";
import type { TimelineEvent } from "../../lib/timeline-events/types";

interface EvolutionTimelineProps {
  events: TimelineEvent[];
}

const ERA_COLORS: Record<string, string> = {
  hadean: "#ff6b6b",
  archean: "#e07a5f",
  proterozoic: "#f2cc8f",
  paleozoic: "#81b29a",
  mesozoic: "#3d8b6e",
  cenozoic: "#f4a261",
  quaternary: "#e9c46a",
  holocene: "#2a9d8f",
};

const CATEGORY_COLORS: Record<string, string> = {
  microorganisms: "#61afef",
  animals: "#e07a5f",
  plants: "#81b29a",
  earth: "#d85a5a",
};

const CATEGORY_LABELS: Record<string, string> = {
  animals: "动物",
  plants: "植物",
  microorganisms: "微生物",
  earth: "地球",
};

const TOTAL_YEARS = 4600;
const BASE_WIDTH = 2400;
const PADDING = 80;

function parseEraToMa(era: string): number {
  const match = era.match(/([\d.]+)\s*(亿|万)/);
  if (!match || !match[1]) return 0;
  const value = parseFloat(match[1]);
  if (match[2] === "亿") return value * 100;
  if (match[2] === "万") return value * 0.01;
  return value;
}

function getEraForYear(mya: number): string {
  const eras = getAllEras();
  for (const era of eras) {
    if (mya >= era.endMYA && mya <= era.startMYA) {
      return era.id;
    }
  }
  return "holocene";
}

function logScale(mya: number, width: number): number {
  if (mya <= 0) return width - PADDING;
  const logMax = Math.log10(TOTAL_YEARS);
  const logVal = Math.log10(Math.max(mya, 0.001));
  const ratio = 1 - logVal / logMax;
  return PADDING + ratio * (width - 2 * PADDING);
}

function formatMYA(mya: number): string {
  if (mya >= 1000) return `${(mya / 1000).toFixed(1)} Ga`;
  if (mya >= 1) return `${Math.round(mya)} Ma`;
  if (mya >= 0.001) return `${Math.round(mya * 1000)} Ka`;
  return "现代";
}

interface ParsedEvent {
  event: TimelineEvent;
  dateMa: number;
}

export function EvolutionTimeline({ events }: EvolutionTimelineProps) {
  const reduce = useReducedMotion();
  const [zoom, setZoom] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    null
  );
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const width = BASE_WIDTH * zoom;
  const height = 420;
  const timelineY = 260;

  const eras = useMemo(() => getAllEras(), []);

  const parsed: ParsedEvent[] = useMemo(
    () => events.map((e) => ({ event: e, dateMa: parseEraToMa(e.era) })),
    [events]
  );

  const filtered = useMemo(() => {
    if (!activeCategory) return parsed;
    return parsed.filter((p) => p.event.category === activeCategory);
  }, [parsed, activeCategory]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => b.dateMa - a.dateMa),
    [filtered]
  );

  const categories = Object.keys(CATEGORY_LABELS);

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z * 1.4, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z / 1.4, 0.5));
  }, []);

  const handleEventClick = useCallback(
    (event: TimelineEvent, e: MouseEvent) => {
      e.stopPropagation();
      setSelectedEvent((prev) => (prev?.id === event.id ? null : event));
    },
    []
  );

  const handleBackgroundClick = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setScrollProgress(
        scrollWidth > clientWidth
          ? scrollLeft / (scrollWidth - clientWidth)
          : 0
      );
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 px-4">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-300"
          style={{
            borderColor:
              activeCategory === null ? "#2a9d8f" : "rgba(255,255,255,0.1)",
            backgroundColor:
              activeCategory === null
                ? "rgba(42,157,143,0.15)"
                : "transparent",
            color: activeCategory === null ? "#2a9d8f" : "#888",
          }}
        >
          全部
        </button>
        {categories.map((cat) => {
          const accent = CATEGORY_COLORS[cat] ?? "#2a9d8f";
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(isActive ? null : cat)}
              className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-300"
              style={{
                borderColor: isActive ? accent : "rgba(255,255,255,0.1)",
                backgroundColor: isActive ? `${accent}18` : "transparent",
                color: isActive ? accent : "#888",
              }}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          );
        })}

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleZoomOut}
            className="flex h-7 w-7 items-center justify-center rounded border font-mono text-xs text-[#9ca3af] transition-colors hover:text-[#e8e8f0]"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
            aria-label="缩小"
          >
            −
          </button>
          <input
            type="range"
            min={50}
            max={500}
            value={Math.round(zoom * 100)}
            onChange={(e) => setZoom(Number(e.target.value) / 100)}
            className="h-1 w-20 accent-[#2a9d8f]"
            aria-label="缩放"
          />
          <span className="font-mono text-[10px] text-[#666]">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="flex h-7 w-7 items-center justify-center rounded border font-mono text-xs text-[#9ca3af] transition-colors hover:text-[#e8e8f0]"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
            aria-label="放大"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 px-4">
        {eras.map((era) => (
          <div key={era.id} className="flex items-center gap-1.5">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: ERA_COLORS[era.id] ?? "#666" }}
            />
            <span className="font-mono text-[9px] text-[#888]">
              {era.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-4 h-[2px] overflow-hidden rounded-full bg-[rgba(255,255,255,0.04)]">
        <motion.div
          className="h-full rounded-full bg-[#2a9d8f]"
          style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="select-none"
          onClick={handleBackgroundClick}
        >
          <defs>
            {eras.map((era) => {
              const color = ERA_COLORS[era.id] ?? "#666";
              return (
                <linearGradient
                  key={`grad-${era.id}`}
                  id={`era-grad-${era.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={0.06} />
                  <stop offset="50%" stopColor={color} stopOpacity={0.03} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.01} />
                </linearGradient>
              );
            })}
            <filter id="event-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {eras.map((era) => {
            const x1 = logScale(era.startMYA, width);
            const x2 = logScale(era.endMYA, width);
            return (
              <g key={`band-${era.id}`}>
                <rect
                  x={Math.min(x1, x2)}
                  y={0}
                  width={Math.abs(x2 - x1)}
                  height={height}
                  fill={`url(#era-grad-${era.id})`}
                />
                <rect
                  x={Math.min(x1, x2)}
                  y={0}
                  width={Math.abs(x2 - x1)}
                  height={height}
                  fill="none"
                  stroke={ERA_COLORS[era.id] ?? "#666"}
                  strokeWidth={0.5}
                  strokeOpacity={0.12}
                />
                <text
                  x={(x1 + x2) / 2}
                  y={20}
                  textAnchor="middle"
                  fill={ERA_COLORS[era.id] ?? "#666"}
                  fillOpacity={0.5}
                  fontSize={10}
                  fontFamily="monospace"
                  letterSpacing="0.08em"
                >
                  {era.nameEn}
                </text>
              </g>
            );
          })}

          {[4500, 4000, 3000, 2000, 1000, 500, 200, 100, 50, 10, 1].map(
            (tick) => {
              const x = logScale(tick, width);
              return (
                <g key={`tick-${tick}`}>
                  <line
                    x1={x}
                    y1={timelineY - 8}
                    x2={x}
                    y2={timelineY + 8}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={1}
                  />
                  <text
                    x={x}
                    y={timelineY + 24}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.2)"
                    fontSize={9}
                    fontFamily="monospace"
                  >
                    {formatMYA(tick)}
                  </text>
                </g>
              );
            }
          )}

          <line
            x1={PADDING}
            y1={timelineY}
            x2={width - PADDING}
            y2={timelineY}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={2}
          />

          <polygon
            points={`${width - PADDING},${timelineY} ${width - PADDING - 8},${timelineY - 4} ${width - PADDING - 8},${timelineY + 4}`}
            fill="rgba(255,255,255,0.15)"
          />

          {sorted.map(({ event, dateMa }, i) => {
            const x = logScale(dateMa, width);
            const eraId = getEraForYear(dateMa);
            const eraColor = ERA_COLORS[eraId] ?? "#666";
            const catColor = CATEGORY_COLORS[event.category] ?? "#2a9d8f";
            const isSelected = selectedEvent?.id === event.id;
            const isHovered = hoveredEvent?.id === event.id;
            const dotRadius = 6;
            const isAbove = i % 2 === 0;
            const labelY = isAbove
              ? timelineY - 40 - (i % 3) * 20
              : timelineY + 40 + (i % 3) * 20;

            return (
              <g
                key={event.id}
                className="cursor-pointer"
                onClick={(e) => handleEventClick(event, e)}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <line
                  x1={x}
                  y1={timelineY}
                  x2={x}
                  y2={labelY}
                  stroke={catColor}
                  strokeWidth={isSelected || isHovered ? 1.5 : 0.8}
                  strokeOpacity={isSelected || isHovered ? 0.6 : 0.2}
                  strokeDasharray={isSelected ? "none" : "2,2"}
                />

                {(isSelected || isHovered) && (
                  <circle
                    cx={x}
                    cy={timelineY}
                    r={dotRadius + 6}
                    fill="none"
                    stroke={catColor}
                    strokeWidth={1}
                    strokeOpacity={0.3}
                    filter="url(#event-glow)"
                  />
                )}

                <circle
                  cx={x}
                  cy={timelineY}
                  r={isSelected ? dotRadius + 2 : dotRadius}
                  fill={catColor}
                  fillOpacity={isSelected ? 1 : 0.8}
                  stroke={eraColor}
                  strokeWidth={isSelected ? 2 : 1}
                  strokeOpacity={0.5}
                  style={{
                    transition: "r 0.2s ease, fill-opacity 0.2s ease",
                  }}
                />

                <text
                  x={x}
                  y={labelY + (isAbove ? -6 : 14)}
                  textAnchor="middle"
                  fill={isSelected ? "#e8e8f0" : "#b0b0c0"}
                  fontSize={isSelected ? 11 : 10}
                  fontWeight={isSelected ? 600 : 400}
                  fontFamily="system-ui, sans-serif"
                  style={{ transition: "fill 0.2s ease" }}
                >
                  {event.event}
                </text>
                <text
                  x={x}
                  y={labelY + (isAbove ? -20 : 0)}
                  textAnchor="middle"
                  fill={catColor}
                  fillOpacity={0.7}
                  fontSize={8}
                  fontFamily="monospace"
                  letterSpacing="0.04em"
                >
                  {event.era}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            key={selectedEvent.id}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: PRODUCT_EASE }}
            className="mx-4 rounded-xl border p-5 backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        CATEGORY_COLORS[selectedEvent.category] ?? "#2a9d8f",
                    }}
                  />
                  <span
                    className="font-mono text-[10px] tracking-wider"
                    style={{
                      color:
                        CATEGORY_COLORS[selectedEvent.category] ?? "#2a9d8f",
                    }}
                  >
                    {CATEGORY_LABELS[selectedEvent.category] ??
                      selectedEvent.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#666]">
                    {selectedEvent.era}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#e8e8f0]">
                  {selectedEvent.event}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#b0b0c0]">
                  {selectedEvent.detail}
                </p>

                {selectedEvent.keyFigures.length > 0 && (
                  <div className="mt-3">
                    <span className="font-mono text-[9px] tracking-wider text-[#666]">
                      关键人物
                    </span>
                    <p className="mt-1 text-[12px] text-[#9ca3af]">
                      {selectedEvent.keyFigures.join(" · ")}
                    </p>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedEvent.connections.map((conn) => (
                    <span
                      key={conn}
                      className="rounded-full border px-2 py-0.5 font-mono text-[9px] text-[#888]"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      {conn}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[#666] transition-colors hover:text-[#e8e8f0]"
                aria-label="关闭"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
