"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { COSMOLOGY_ERAS, type CosmologyEra } from "@/content/cosmology/eras";

type CosmicEvent = CosmologyEra & { marker: NonNullable<CosmologyEra["marker"]> };
const COSMIC_EVENTS = COSMOLOGY_ERAS.filter((era): era is CosmicEvent => era.marker !== undefined);

type DetailCardProps = {
  event: CosmicEvent;
  onClose: () => void;
};

function DetailCard({ event, onClose }: DetailCardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id="cosmic-event-details"
      role="region"
      aria-label={`${event.name.primary}详情`}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
      transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
      className="border-border-faint bg-bg-elevated/90 relative mx-auto max-w-lg rounded-xl border p-6 backdrop-blur-xl"
    >
      <button
        onClick={onClose}
        className="hover:text-fg-primary absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--input-bg)] text-sm text-[#868da0] transition-colors hover:bg-[var(--hover-bg)]"
        aria-label="关闭"
      >
        ✕
      </button>
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl"
          style={{
            backgroundColor: `${event.marker.color}20`,
            color: event.marker.color,
          }}
        >
          {event.marker.icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-fg-primary mb-0.5 text-lg font-semibold">{event.name.primary}</h3>
          <p className="mb-2 text-xs text-[#868da0]">{event.name.english}</p>
          <p className="mb-3 font-mono text-sm font-medium" style={{ color: event.marker.color }}>
            {event.timeRange}
          </p>
          <p className="text-sm leading-relaxed text-[#a8adbd]">{event.description}</p>
          <ul aria-label="参考来源" className="mt-4 space-y-2 text-xs leading-relaxed">
            {event.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-cool underline underline-offset-2"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
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

function TimelineMarker({ event, x, isAlternate, isSelected, onClick }: TimelineMarkerProps) {
  const reduce = useReducedMotion();
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
      aria-label={`${event.name.primary} — ${event.timeRange}`}
      aria-pressed={isSelected}
      aria-controls={isSelected ? "cosmic-event-details" : undefined}
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
        stroke={event.marker.color}
        strokeWidth={1}
        opacity={0.4}
        strokeDasharray="3 3"
      />

      {/* Pulse ring on selected — animation gated by prefers-reduced-motion */}
      {isSelected && (
        <circle
          cx={x}
          cy={60}
          r={18}
          fill="none"
          stroke={event.marker.color}
          strokeWidth={1}
          opacity={0.2}
        >
          {!reduce && (
            <>
              <animate attributeName="r" from="12" to="24" dur="2s" repeatCount="indefinite" />
              <animate
                attributeName="opacity"
                from="0.3"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
      )}

      {/* Event marker */}
      <circle
        cx={x}
        cy={60}
        r={isSelected ? 10 : 7}
        fill={isSelected ? event.marker.color : `${event.marker.color}40`}
        stroke={event.marker.color}
        strokeWidth={isSelected ? 2 : 1.5}
        style={{
          filter: isSelected ? `drop-shadow(0 0 8px ${event.marker.color}80)` : "none",
          transition: "all 0.3s ease",
        }}
      />

      {/* Icon */}
      <text
        x={x}
        y={64}
        textAnchor="middle"
        fill={isSelected ? "#fff" : event.marker.color}
        fontSize={isSelected ? 10 : 8}
        style={{ pointerEvents: "none" }}
      >
        {event.marker.icon}
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
        {event.name.primary}
      </text>

      {/* Time label */}
      <text
        x={x}
        y={timeY}
        textAnchor="middle"
        fill={isSelected ? event.marker.color : "#9298aa"}
        fontSize={12}
        fontFamily="var(--font-mono)"
      >
        {event.timeRange}
      </text>
    </g>
  );
}

export function CosmicTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<CosmicEvent | null>(null);

  const sortedEvents = COSMIC_EVENTS;
  const viewBox = { width: 1000, height: 260 };
  const padding = { left: 110, right: 110 };
  const usableWidth = viewBox.width - padding.left - padding.right;
  const markerPositions = sortedEvents.map(
    (_, index) => padding.left + (index / (sortedEvents.length - 1)) * usableWidth
  );

  const handleSelect = useCallback((event: CosmicEvent) => {
    setSelectedEvent((prev) => (prev?.id === event.id ? null : event));
  }, []);

  const categoryColors: Record<CosmicEvent["marker"]["category"], string> = {
    origin: "#f43f5e",
    structure: "#3b82f6",
    light: "#eab308",
    matter: "#f97316",
    present: "#10b981",
  };

  return (
    <section className="w-full">
      <div className="mb-6 text-center">
        <p className="mb-3 text-xs tracking-[0.32em] text-[#3b82f6] uppercase">互动时间线</p>
        <h2 className="text-fg-primary mb-2 text-2xl font-bold md:text-3xl">宇宙演化时间线</h2>
        <p className="text-sm text-[#868da0]">
          点击节点查看来源 · 节点等距只示顺序，各阶段可重叠，间距不代表时长
        </p>
      </div>

      {/* Timeline SVG */}
      <div
        className="w-full overflow-x-auto"
        role="region"
        tabIndex={0}
        aria-label="可横向滚动的宇宙时间线"
      >
        <svg
          className="w-full min-w-[1000px] select-none"
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          preserveAspectRatio="xMidYMid meet"
          role="group"
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
            present: "现在",
          };
          return (
            <div key={cat} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-[#868da0]">{labels[cat] ?? cat}</span>
            </div>
          );
        })}
      </div>

      {/* Event list for small screens */}
      <div className="mt-8 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {sortedEvents.map((event) => (
          <button
            key={event.id}
            id={`cosmic-event-${event.id}`}
            aria-pressed={selectedEvent?.id === event.id}
            aria-controls={selectedEvent?.id === event.id ? "cosmic-event-details" : undefined}
            onClick={() => handleSelect(event)}
            className="rounded-xl border p-3 text-left transition-all"
            style={{
              borderColor:
                selectedEvent?.id === event.id
                  ? `${event.marker.color}40`
                  : "rgba(255,255,255,0.06)",
              backgroundColor:
                selectedEvent?.id === event.id
                  ? `${event.marker.color}10`
                  : "rgba(255,255,255,0.02)",
            }}
          >
            <div className="mb-1 flex items-center gap-2">
              <span style={{ color: event.marker.color }}>{event.marker.icon}</span>
              <span className="text-sm font-medium text-[#a8adbd]">{event.name.primary}</span>
            </div>
            <p className="font-mono text-xs text-[#9298aa]">{event.timeRange}</p>
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
              onClose={() => {
                document.getElementById(`cosmic-event-${selectedEvent.id}`)?.focus();
                setSelectedEvent(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
