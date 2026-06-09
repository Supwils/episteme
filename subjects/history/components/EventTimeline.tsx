'use client';

import { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { EVENTS } from '@/content/human-history/data/events';
import { ERAS } from '@/content/human-history/data/eras';
import {
  getEventRelationships,
  getFigureLinksByEvent,
  getEventRelationsByTitle,
} from '@/subjects/history/lib/event-relationships';
import type { EventRelation, EventRelationType } from '@/subjects/history/lib/event-relationships';

const CAT_COLORS: Record<string, string> = {
  politics: '#C8A951', military: '#8B1A1A', economy: '#2D6A4F',
  culture: '#1E3A5F', science: '#4A148C', technology: '#8B4513',
};

function formatYear(year: number): string {
  if (year <= -10000) return `约${Math.abs(year).toLocaleString()}年前`;
  if (year < 0) return `公元前${Math.abs(year)}年`;
  if (year === 0) return '公元元年';
  return `公元${year}年`;
}

const RELATION_COLORS: Record<EventRelationType, string> = {
  caused: '#C8A951',
  influenced: '#2D6A4F',
  contemporary: '#1E3A5F',
  'reacted-to': '#8B1A1A',
};

const RELATION_LABELS: Record<EventRelationType, string> = {
  caused: '因果',
  influenced: '影响',
  contemporary: '同时代',
  'reacted-to': '回应',
};

interface TimelineEvent {
  title: string;
  year: number;
  era: string;
  cat: string;
  region: string;
  desc: string;
}

interface EventNode {
  event: TimelineEvent;
  x: number;
  y: number;
}

interface ConnectionLine {
  source: EventNode;
  target: EventNode;
  relation: EventRelation;
}

export interface EventTimelineProps {
  activeEra?: string | null;
  highlightEvent?: string | null;
  onEventClick?: (title: string) => void;
  className?: string;
}

const NODE_RADIUS = 6;
const LANE_HEIGHT = 40;
const ERA_GAP = 16;
const PADDING_X = 60;
const PADDING_TOP = 40;

function useTimelineLayout(
  timelineEvents: TimelineEvent[],
  activeEra: string | null,
  containerWidth: number,
) {
  return useMemo(() => {
    if (containerWidth === 0 || timelineEvents.length === 0) {
      return { nodes: [], lines: [], totalHeight: 0, yearRange: { min: 0, max: 0 } };
    }

    const filtered = activeEra
      ? timelineEvents.filter((e) => e.era === activeEra)
      : timelineEvents;

    if (filtered.length === 0) {
      return { nodes: [], lines: [], totalHeight: 0, yearRange: { min: 0, max: 0 } };
    }

    const minYear = Math.min(...filtered.map((e) => e.year));
    const maxYear = Math.max(...filtered.map((e) => e.year));
    const yearSpan = maxYear - minYear || 1;
    const drawableWidth = containerWidth - PADDING_X * 2;

    const eraGroups = new Map<string, TimelineEvent[]>();
    for (const ev of filtered) {
      const group = eraGroups.get(ev.era) ?? [];
      group.push(ev);
      eraGroups.set(ev.era, group);
    }

    const eraOrder = ERAS.map((e) => e.id).filter((id) => eraGroups.has(id));
    const nodes: EventNode[] = [];
    let currentY = PADDING_TOP;

    for (const eraId of eraOrder) {
      const eraEvents = eraGroups.get(eraId) ?? [];
      const regionLanes = new Map<string, number>();
      let laneIndex = 0;

      const sorted = [...eraEvents].sort((a, b) => a.year - b.year);

      for (const ev of sorted) {
        if (!regionLanes.has(ev.region)) {
          regionLanes.set(ev.region, laneIndex++);
        }
        const lane = regionLanes.get(ev.region)!;
        const x = PADDING_X + ((ev.year - minYear) / yearSpan) * drawableWidth;
        const y = currentY + lane * LANE_HEIGHT;
        nodes.push({ event: ev, x, y });
      }

      currentY += laneIndex * LANE_HEIGHT + ERA_GAP;
    }

    const relationships = getEventRelationships();
    const titleToNode = new Map<string, EventNode>();
    for (const node of nodes) {
      titleToNode.set(node.event.title, node);
    }

    const lines: ConnectionLine[] = [];
    for (const rel of relationships) {
      const sourceNode = titleToNode.get(rel.source);
      const targetNode = titleToNode.get(rel.target);
      if (sourceNode && targetNode) {
        lines.push({ source: sourceNode, target: targetNode, relation: rel });
      }
    }

    return {
      nodes,
      lines,
      totalHeight: currentY + PADDING_TOP,
      yearRange: { min: minYear, max: maxYear },
    };
  }, [timelineEvents, activeEra, containerWidth]);
}

function buildCurvedPath(source: EventNode, target: EventNode): string {
  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2;

  const curvature = Math.min(Math.abs(target.y - source.y) * 0.5, 80);
  const cp1x = midX;
  const cp1y = midY - curvature;

  return `M ${source.x} ${source.y} Q ${cp1x} ${cp1y} ${target.x} ${target.y}`;
}

export default function EventTimeline({
  activeEra = null,
  highlightEvent: _highlightEvent = null,
  onEventClick,
  className,
}: EventTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [hoveredRelation, setHoveredRelation] = useState<number | null>(null);

  const allEvents = useMemo(() => EVENTS as unknown as TimelineEvent[], []);

  const { nodes, lines, totalHeight } = useTimelineLayout(
    allEvents,
    activeEra,
    containerWidth,
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(container);
    setContainerWidth(container.clientWidth);

    return () => observer.disconnect();
  }, []);

  const handleEventHover = useCallback((title: string | null) => {
    setHoveredEvent(title);
  }, []);

  const handleRelationHover = useCallback((index: number | null) => {
    setHoveredRelation(index);
  }, []);

  const relatedEventTitles = useMemo(() => {
    if (!hoveredEvent) return new Set<string>();
    const rels = getEventRelationsByTitle(hoveredEvent);
    const titles = new Set<string>();
    titles.add(hoveredEvent);
    for (const rel of rels) {
      titles.add(rel.source);
      titles.add(rel.target);
    }
    return titles;
  }, [hoveredEvent]);

  const figureLinksForEvent = useMemo(() => {
    if (!hoveredEvent) return [];
    return getFigureLinksByEvent(hoveredEvent);
  }, [hoveredEvent]);

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', overflow: 'auto' }}>
      <svg
        width={containerWidth}
        height={totalHeight}
        viewBox={`0 0 ${containerWidth} ${totalHeight}`}
        style={{ display: 'block', fontFamily: 'system-ui, sans-serif' }}
      >
        <defs>
          <marker
            id="arrow-caused"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={RELATION_COLORS.caused} />
          </marker>
          <marker
            id="arrow-influenced"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={RELATION_COLORS.influenced} />
          </marker>
          <marker
            id="arrow-reacted"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 2 L 8 5 L 0 8" fill="none" stroke={RELATION_COLORS['reacted-to']} strokeWidth="1.5" />
          </marker>
        </defs>

        {ERAS.filter((era) => !activeEra || era.id === activeEra).map((era) => {
          const eraNodes = nodes.filter((n) => n.event.era === era.id);
          if (eraNodes.length === 0) return null;
          const minY = Math.min(...eraNodes.map((n) => n.y)) - 20;
          const maxY = Math.max(...eraNodes.map((n) => n.y)) + 20;
          return (
            <g key={era.id}>
              <rect
                x={0}
                y={minY}
                width={containerWidth}
                height={maxY - minY}
                fill={era.color}
                opacity={0.04}
                rx={4}
              />
              <text
                x={8}
                y={minY + 14}
                fontSize={11}
                fontWeight={600}
                fill={era.color}
                opacity={0.7}
              >
                {era.name}
              </text>
            </g>
          );
        })}

        {lines.map((line, i) => {
          const isHighlighted =
            hoveredRelation === i ||
            (hoveredEvent !== null &&
              (line.relation.source === hoveredEvent || line.relation.target === hoveredEvent));
          const isDimmed =
            hoveredEvent !== null &&
            !relatedEventTitles.has(line.relation.source) &&
            !relatedEventTitles.has(line.relation.target);
          const color = RELATION_COLORS[line.relation.type];
          const opacity = isDimmed ? 0.08 : isHighlighted ? 0.9 : 0.25;
          const strokeWidth = isHighlighted ? 2.5 : 1;

          return (
            <path
              key={`line-${i}`}
              d={buildCurvedPath(line.source, line.target)}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              opacity={opacity}
              strokeDasharray={line.relation.type === 'contemporary' ? '4 3' : undefined}
              markerEnd={
                line.relation.type === 'caused'
                  ? 'url(#arrow-caused)'
                  : line.relation.type === 'influenced'
                    ? 'url(#arrow-influenced)'
                    : line.relation.type === 'reacted-to'
                      ? 'url(#arrow-reacted)'
                      : undefined
              }
              onMouseEnter={() => handleRelationHover(i)}
              onMouseLeave={() => handleRelationHover(null)}
              style={{ cursor: 'pointer', transition: 'opacity 0.2s, stroke-width 0.2s' }}
            >
              <title>{`${line.relation.source} → ${line.relation.target}：${line.relation.description}`}</title>
            </path>
          );
        })}

        {nodes.map((node) => {
          const isHovered = hoveredEvent === node.event.title;
          const isInRelatedSet = relatedEventTitles.has(node.event.title);
          const isDimmed = hoveredEvent !== null && !isInRelatedSet;
          const catColor = CAT_COLORS[node.event.cat] ?? '#c8a951';
          const r = isHovered ? NODE_RADIUS * 1.8 : NODE_RADIUS;
          const opacity = isDimmed ? 0.15 : 1;

          return (
            <g
              key={node.event.title}
              transform={`translate(${node.x}, ${node.y})`}
              opacity={opacity}
              style={{ transition: 'opacity 0.2s' }}
              onMouseEnter={() => handleEventHover(node.event.title)}
              onMouseLeave={() => handleEventHover(null)}
              onClick={() => onEventClick?.(node.event.title)}
              cursor="pointer"
            >
              <circle r={r + 4} fill={catColor} opacity={isHovered ? 0.15 : 0} />
              <circle
                r={r}
                fill={catColor}
                stroke={isHovered ? '#fff' : 'none'}
                strokeWidth={isHovered ? 2 : 0}
                style={{ transition: 'r 0.2s' }}
              />
              {isHovered && (
                <g>
                  <rect
                    x={-90}
                    y={-56}
                    width={180}
                    height={44}
                    rx={6}
                    fill="rgba(0,0,0,0.85)"
                    stroke={catColor}
                    strokeWidth={1}
                  />
                  <text
                    x={0}
                    y={-40}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill="#fff"
                  >
                    {node.event.title}
                  </text>
                  <text
                    x={0}
                    y={-24}
                    textAnchor="middle"
                    fontSize={10}
                    fill="rgba(255,255,255,0.7)"
                  >
                    {formatYear(node.event.year)}
                  </text>
                </g>
              )}
              {!isHovered && (
                <text
                  y={-10}
                  textAnchor="middle"
                  fontSize={9}
                  fill="rgba(255,255,255,0.5)"
                  style={{ pointerEvents: 'none' }}
                >
                  {node.event.title.length > 8
                    ? node.event.title.slice(0, 8) + '…'
                    : node.event.title}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {hoveredEvent && figureLinksForEvent.length > 0 && (
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(0,0,0,0.9)',
            borderTop: '1px solid rgba(200,169,81,0.3)',
            padding: '8px 16px',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>相关人物：</span>
          {figureLinksForEvent.map((link) => (
            <span key={link.figureId}>
              {link.figureId}
              <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: 4 }}>
                ({link.role === 'initiated' ? '发起' : link.role === 'participated' ? '参与' : link.role === 'influenced' ? '影响' : '反对'})
              </span>
            </span>
          ))}
        </div>
      )}

      {hoveredRelation !== null && lines[hoveredRelation] && (
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(0,0,0,0.9)',
            borderTop: '1px solid rgba(200,169,81,0.3)',
            padding: '8px 16px',
            fontSize: 12,
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          <span style={{ color: RELATION_COLORS[lines[hoveredRelation]!.relation.type] }}>
            [{RELATION_LABELS[lines[hoveredRelation]!.relation.type]}]
          </span>{' '}
          {lines[hoveredRelation]!.relation.description}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          gap: 16,
          padding: '8px 16px',
          fontSize: 11,
          color: 'rgba(255,255,255,0.5)',
          flexWrap: 'wrap',
        }}
      >
        {Object.entries(RELATION_LABELS).map(([type, label]) => (
          <span key={type} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                display: 'inline-block',
                width: 16,
                height: 2,
                background: RELATION_COLORS[type as EventRelationType],
                borderRadius: 1,
              }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
