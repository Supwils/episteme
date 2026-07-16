"use client";

import { useMemo, useState } from "react";
import {
  WRITING_RELATION_LABELS,
  WRITING_TIMELINE_ERAS,
  WRITING_TIMELINE_EVENTS,
  type WritingTimelineRelation,
} from "@/subjects/linguistics/lib/writing-timeline-data";

type RelationFilter = "all" | WritingTimelineRelation;

const RELATION_COLORS: Record<WritingTimelineRelation, string> = {
  emergence: "#d99245",
  adaptation: "#4f9c96",
  institution: "#6e83bd",
  "community-invention": "#b56f86",
  "digital-encoding": "#7c8e5a",
};

export function WritingSystemTimeline() {
  const [relation, setRelation] = useState<RelationFilter>("all");
  const [region, setRegion] = useState("all");
  const [selectedId, setSelectedId] = useState(WRITING_TIMELINE_EVENTS[0]!.id);
  const regions = useMemo(
    () => [...new Set(WRITING_TIMELINE_EVENTS.map((event) => event.region))].sort(),
    []
  );
  const visibleEvents = WRITING_TIMELINE_EVENTS.filter(
    (event) =>
      (relation === "all" || event.relation === relation) &&
      (region === "all" || event.region === region)
  );
  const selected =
    visibleEvents.find((event) => event.id === selectedId) ??
    visibleEvents[0] ??
    WRITING_TIMELINE_EVENTS[0]!;

  return (
    <section
      className="border-border-subtle bg-bg-near my-12 overflow-hidden border"
      aria-labelledby="writing-timeline-title"
      data-testid="writing-system-timeline"
    >
      <header className="border-border-faint border-b px-4 py-5 sm:px-6">
        <p className="text-fg-disabled font-mono text-[10px] tracking-[0.2em] uppercase">
          Infrastructure Lab · 4/5
        </p>
        <h2 id="writing-timeline-title" className="text-fg-primary mt-1 text-xl font-medium">
          全球文字系统时间轴
        </h2>
        <p className="text-fg-muted mt-1 max-w-3xl text-sm leading-6">
          比较多地形成、谱系改造、制度标准化、社群创制与数字编码。阶段等宽用于比较关系，不表示各时期持续时间相同。
        </p>
      </header>

      <div className="border-border-faint grid gap-4 border-b p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
        <div>
          <p className="text-fg-disabled mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
            关系类型
          </p>
          <div className="flex flex-wrap gap-px" role="group" aria-label="文字系统关系筛选">
            {(["all", ...Object.keys(WRITING_RELATION_LABELS)] as RelationFilter[]).map((value) => {
              const active = relation === value;
              const color = value === "all" ? "#3f9a91" : RELATION_COLORS[value];
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRelation(value)}
                  className="min-h-10 border px-3 font-mono text-xs transition-colors motion-reduce:transition-none"
                  style={{
                    borderColor: `${color}77`,
                    color: active ? color : "var(--color-fg-muted)",
                    background: active ? `${color}16` : "transparent",
                  }}
                >
                  {value === "all" ? "全部关系" : WRITING_RELATION_LABELS[value]}
                </button>
              );
            })}
          </div>
        </div>

        <label className="text-fg-muted text-xs">
          <span className="mb-1 block">区域聚焦</span>
          <select
            aria-label="文字系统区域筛选"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="border-border-subtle bg-bg-deep text-fg-primary min-h-10 w-full border px-3 text-sm"
          >
            <option value="all">全部区域</option>
            {regions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="border-border-faint border-b px-4 py-3 sm:px-6">
        <p className="text-fg-muted font-mono text-xs" aria-live="polite">
          当前显示 {visibleEvents.length} / {WRITING_TIMELINE_EVENTS.length} 个证据节点
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4">
        {WRITING_TIMELINE_ERAS.map((era) => {
          const events = visibleEvents.filter((event) => event.era === era.id);
          return (
            <section
              key={era.id}
              className="border-border-faint border-b p-4 md:border-r xl:border-b-0 xl:last:border-r-0"
              aria-labelledby={`writing-era-${era.id}`}
            >
              <div className="min-h-28">
                <p className="text-fg-disabled font-mono text-[10px] tracking-[0.16em] uppercase">
                  {era.span}
                </p>
                <h3
                  id={`writing-era-${era.id}`}
                  className="text-fg-primary mt-1 text-base font-medium"
                >
                  {era.label}
                </h3>
                <p className="text-fg-muted mt-2 text-xs leading-5">{era.thesis}</p>
              </div>

              <div className="border-border-faint relative mt-3 space-y-2 border-l pl-3">
                {events.length > 0 ? (
                  events.map((event) => {
                    const active = selected.id === event.id;
                    const color = RELATION_COLORS[event.relation];
                    return (
                      <button
                        key={event.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedId(event.id)}
                        className="bg-bg-deep min-h-20 w-full border px-3 py-2 text-left transition-colors motion-reduce:transition-none"
                        style={{
                          borderColor: active ? color : "var(--color-border-faint)",
                          boxShadow: active ? `inset 3px 0 0 ${color}` : undefined,
                        }}
                      >
                        <span className="font-mono text-[10px]" style={{ color }}>
                          {event.dateLabel}
                        </span>
                        <span className="text-fg-primary mt-1 block text-sm leading-5 font-medium">
                          {event.title}
                        </span>
                        <span className="text-fg-disabled mt-1 block text-[11px]">
                          {event.region} · {WRITING_RELATION_LABELS[event.relation]}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-fg-disabled min-h-20 py-4 text-xs leading-5">
                    当前条件在此阶段没有样本。
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <article className="border-border-faint border-t p-4 sm:p-6" aria-live="polite">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
          <div>
            <p
              className="font-mono text-[10px] tracking-[0.16em] uppercase"
              style={{ color: RELATION_COLORS[selected.relation] }}
            >
              {selected.dateLabel} · {selected.region}
            </p>
            <h3 className="text-fg-primary mt-1 text-lg font-medium">
              {selected.title}
              {selected.localLabel ? (
                <span className="text-fg-muted ml-2 font-normal">{selected.localLabel}</span>
              ) : null}
            </h3>
            <p className="text-fg-muted mt-3 text-sm leading-6">{selected.summary}</p>
            <a
              href={selected.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm underline underline-offset-4"
              style={{ color: RELATION_COLORS[selected.relation] }}
            >
              {selected.sourceLabel}
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="border-border-faint border-l pl-3">
              <dt className="text-fg-disabled text-xs">关系</dt>
              <dd className="text-fg-muted mt-2 text-xs leading-5">{selected.relationSummary}</dd>
            </div>
            <div className="border-border-faint border-l pl-3">
              <dt className="text-fg-disabled text-xs">证据</dt>
              <dd className="text-fg-muted mt-2 text-xs leading-5">{selected.evidence}</dd>
            </div>
            <div className="border-border-faint border-l pl-3">
              <dt className="text-fg-disabled text-xs">边界</dt>
              <dd className="text-fg-muted mt-2 text-xs leading-5">{selected.caution}</dd>
            </div>
          </dl>
        </div>
      </article>
    </section>
  );
}
