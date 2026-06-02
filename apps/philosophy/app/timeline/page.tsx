"use client";

import { useState, useMemo, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { TIMELINE, ERA_ORDER, ERA_LABELS, ERA_RANGES } from "@/lib/timeline-data";
import type { TimelineEvent } from "@/lib/timeline-data";
import {
  TimelinePageHeader,
  FilterBar,
  EraHeader,
  EraDivider,
  TimelineCard,
} from "@/components/timeline/TimelineComponents";

function getStats() {
  const figures = new Set<string>();
  TIMELINE.forEach((e) => e.figures.forEach((f) => figures.add(f)));
  return { total: TIMELINE.length, eras: ERA_ORDER.length, figures: figures.size };
}

export default function TimelinePage() {
  const reduce = useReducedMotion();
  const d = (sec: number) => (reduce ? 0 : sec);

  const [activeEra, setActiveEra] = useState<string | null>(null);
  const [activeFigure, setActiveFigure] = useState<string | null>(null);
  const stats = useMemo(getStats, []);

  const handleFigureClick = useCallback(
    (name: string) => setActiveFigure((prev) => (prev === name ? null : name)),
    [],
  );
  const handleEraClick = useCallback(
    (era: string) => setActiveEra((prev) => (prev === era ? null : era)),
    [],
  );
  const handleClearFilters = useCallback(() => {
    setActiveEra(null);
    setActiveFigure(null);
  }, []);

  const filteredTimeline = useMemo(
    () =>
      TIMELINE.filter((e) => {
        if (activeEra && e.era !== activeEra) return false;
        if (activeFigure && !e.figures.includes(activeFigure)) return false;
        return true;
      }),
    [activeEra, activeFigure],
  );

  const grouped = useMemo(() => {
    const eras = activeEra ? [activeEra] : [...ERA_ORDER];
    return eras
      .map((era) => ({
        era,
        label: ERA_LABELS[era] ?? era,
        range: ERA_RANGES[era] ?? "",
        events: filteredTimeline
          .filter((e) => e.era === era)
          .sort((a, b) => a.year - b.year),
      }))
      .filter((g) => g.events.length > 0);
  }, [activeEra, filteredTimeline]);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(200,164,90,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="border-fg-disabled/30 pointer-events-none absolute top-16 left-6 h-3 w-3 border-t border-l" />
      <div className="border-fg-disabled/30 pointer-events-none absolute top-16 right-6 h-3 w-3 border-t border-r" />
      <div className="border-fg-disabled/30 pointer-events-none absolute bottom-6 left-6 h-3 w-3 border-b border-l" />
      <div className="border-fg-disabled/30 pointer-events-none absolute right-6 bottom-6 h-3 w-3 border-r border-b" />

      <TimelinePageHeader stats={stats} d={d} />

      <FilterBar
        activeEra={activeEra}
        activeFigure={activeFigure}
        eraOrder={ERA_ORDER}
        onEraClick={handleEraClick}
        onClearFilters={handleClearFilters}
        d={d}
      />

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-32">
        {grouped.length === 0 && (
          <p className="text-fg-muted py-20 text-center font-mono text-sm">
            没有匹配的事件
          </p>
        )}

        {grouped.map(({ era, label, range, events }, groupIdx) => (
          <div key={era} className="relative">
            <EraHeader
              label={label}
              range={range}
              count={events.length}
              delay={d(0.8 + groupIdx * 0.15)}
              reduce={!!reduce}
            />

            {groupIdx > 0 && <EraDivider delay={d(0.8 + groupIdx * 0.15)} />}

            <div className="relative mx-auto max-w-4xl">
              <div className="absolute top-0 bottom-0 left-4 w-[2px] bg-gradient-to-b from-accent-gold/60 via-accent-gold/30 to-transparent md:left-1/2 md:-translate-x-1/2">
                <div className="absolute inset-0 blur-[3px] bg-accent-gold/15" />
              </div>

              <div className="relative">
                {events.map((event, eventIdx) => (
                  <TimelineCard
                    key={`${event.year}-${event.title}`}
                    event={event}
                    index={eventIdx}
                    delay={d(0.85 + groupIdx * 0.15 + eventIdx * 0.04)}
                    reduce={!!reduce}
                    onFigureClick={handleFigureClick}
                    activeFigure={activeFigure}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
