"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type Tradition = "western" | "eastern" | "african" | "islamic";
type Era = "ancient" | "medieval" | "modern" | "contemporary";

type PhilosopherNode = {
  id: string;
  name: string;
  nameEn: string;
  years: string;
  birthYear: number;
  tradition: Tradition;
  era: Era;
  summary: string;
  slug?: string;
};

type InfluenceEdge = {
  from: string;
  to: string;
  label?: string;
};

const TRADITION_COLORS: Record<Tradition, string> = {
  western: "#3b82f6",
  eastern: "#ef4444",
  african: "#10b981",
  islamic: "#f59e0b",
};

const TRADITION_LABELS: Record<Tradition, string> = {
  western: "西方",
  eastern: "东方",
  african: "非洲",
  islamic: "伊斯兰",
};

const ERA_LABELS: Record<Era, string> = {
  ancient: "古代",
  medieval: "中世纪",
  modern: "近代",
  contemporary: "当代",
};

const ERA_RANGES: Record<Era, { start: number; end: number }> = {
  ancient: { start: -600, end: 500 },
  medieval: { start: 500, end: 1500 },
  modern: { start: 1500, end: 1850 },
  contemporary: { start: 1850, end: 2000 },
};

const PHILOSOPHERS: PhilosopherNode[] = [
  { id: "confucius", name: "孔子", nameEn: "Confucius", years: "前551–前479", birthYear: -551, tradition: "eastern", era: "ancient", summary: "儒家创始人，提出仁、礼、中庸等核心概念", slug: "confucius" },
  { id: "laozi", name: "老子", nameEn: "Laozi", years: "约前6世纪", birthYear: -600, tradition: "eastern", era: "ancient", summary: "道家创始人，《道德经》作者，主张无为而治" },
  { id: "buddha", name: "释迦牟尼", nameEn: "Buddha", years: "前563–前483", birthYear: -563, tradition: "eastern", era: "ancient", summary: "佛教创始人，四圣谛与八正道" },
  { id: "socrates", name: "苏格拉底", nameEn: "Socrates", years: "前470–前399", birthYear: -470, tradition: "western", era: "ancient", summary: "西方哲学奠基人，苏格拉底问答法", slug: "socrates" },
  { id: "plato", name: "柏拉图", nameEn: "Plato", years: "前428–前348", birthYear: -428, tradition: "western", era: "ancient", summary: "理念论创始人，学园建立者", slug: "plato" },
  { id: "aristotle", name: "亚里士多德", nameEn: "Aristotle", years: "前384–前322", birthYear: -384, tradition: "western", era: "ancient", summary: "百科全书式哲学家，逻辑学之父", slug: "aristotle" },
  { id: "mencius", name: "孟子", nameEn: "Mencius", years: "前372–前289", birthYear: -372, tradition: "eastern", era: "ancient", summary: "儒家代表，性善论", slug: "mencius" },
  { id: "zhuangzi", name: "庄子", nameEn: "Zhuangzi", years: "前369–前286", birthYear: -369, tradition: "eastern", era: "ancient", summary: "道家代表，逍遥游，齐物论" },
  { id: "nagarjuna", name: "龙树", nameEn: "Nagarjuna", years: "约150–250", birthYear: 150, tradition: "eastern", era: "ancient", summary: "中观派创始人，空性哲学" },
  { id: "augustine", name: "奥古斯丁", nameEn: "Augustine", years: "354–430", birthYear: 354, tradition: "western", era: "medieval", summary: "教父哲学集大成者，忏悔录", slug: "augustine" },
  { id: "avicenna", name: "阿维森纳", nameEn: "Avicenna", years: "980–1037", birthYear: 980, tradition: "islamic", era: "medieval", summary: "伊斯兰黄金时代哲学家，存在与本质区分" },
  { id: "aquinas", name: "阿奎那", nameEn: "Thomas Aquinas", years: "1225–1274", birthYear: 1225, tradition: "western", era: "medieval", summary: "经院哲学集大成者，五路论证", slug: "thomas-aquinas" },
  { id: "averroes", name: "阿威罗伊", nameEn: "Averroes", years: "1126–1198", birthYear: 1126, tradition: "islamic", era: "medieval", summary: "伊斯兰哲学家，亚里士多德注释者" },
  { id: "zhu-xi", name: "朱熹", nameEn: "Zhu Xi", years: "1130–1200", birthYear: 1130, tradition: "eastern", era: "medieval", summary: "理学集大成者，格物致知", slug: "zhu-xi" },
  { id: "descartes", name: "笛卡尔", nameEn: "Descartes", years: "1596–1650", birthYear: 1596, tradition: "western", era: "modern", summary: "近代哲学之父，我思故我在", slug: "descartes" },
  { id: "spinoza", name: "斯宾诺莎", nameEn: "Spinoza", years: "1632–1677", birthYear: 1632, tradition: "western", era: "modern", summary: "泛神论，伦理学几何方法", slug: "spinoza" },
  { id: "leibniz", name: "莱布尼茨", nameEn: "Leibniz", years: "1646–1716", birthYear: 1646, tradition: "western", era: "modern", summary: "单子论，预定和谐", slug: "leibniz" },
  { id: "locke", name: "洛克", nameEn: "Locke", years: "1632–1704", birthYear: 1632, tradition: "western", era: "modern", summary: "经验主义，社会契约论", slug: "locke" },
  { id: "hume", name: "休谟", nameEn: "Hume", years: "1711–1776", birthYear: 1711, tradition: "western", era: "modern", summary: "经验主义极致，因果怀疑论", slug: "hume" },
  { id: "kant", name: "康德", nameEn: "Kant", years: "1724–1804", birthYear: 1724, tradition: "western", era: "modern", summary: "批判哲学，三大批判", slug: "kant" },
  { id: "hegel", name: "黑格尔", nameEn: "Hegel", years: "1770–1831", birthYear: 1770, tradition: "western", era: "modern", summary: "辩证法，绝对精神", slug: "hegel" },
  { id: "marx", name: "马克思", nameEn: "Marx", years: "1818–1883", birthYear: 1818, tradition: "western", era: "modern", summary: "历史唯物主义，资本论", slug: "marx" },
  { id: "kierkegaard", name: "克尔凯郭尔", nameEn: "Kierkegaard", years: "1813–1855", birthYear: 1813, tradition: "western", era: "contemporary", summary: "存在主义先驱，信仰的飞跃" },
  { id: "nietzsche", name: "尼采", nameEn: "Nietzsche", years: "1844–1900", birthYear: 1844, tradition: "western", era: "contemporary", summary: "上帝已死，权力意志，超人", slug: "nietzsche" },
  { id: "husserl", name: "胡塞尔", nameEn: "Husserl", years: "1859–1938", birthYear: 1859, tradition: "western", era: "contemporary", summary: "现象学创始人" },
  { id: "russell", name: "罗素", nameEn: "Russell", years: "1872–1970", birthYear: 1872, tradition: "western", era: "contemporary", summary: "分析哲学先驱，逻辑原子论" },
  { id: "wittgenstein", name: "维特根斯坦", nameEn: "Wittgenstein", years: "1889–1951", birthYear: 1889, tradition: "western", era: "contemporary", summary: "语言哲学革命，逻辑哲学论", slug: "wittgenstein" },
  { id: "heidegger", name: "海德格尔", nameEn: "Heidegger", years: "1889–1976", birthYear: 1889, tradition: "western", era: "contemporary", summary: "存在与时间，此在分析" },
  { id: "sartre", name: "萨特", nameEn: "Sartre", years: "1905–1980", birthYear: 1905, tradition: "western", era: "contemporary", summary: "存在先于本质，存在主义", slug: "sartre" },
  { id: "beauvoir", name: "波伏娃", nameEn: "Beauvoir", years: "1908–1986", birthYear: 1908, tradition: "western", era: "contemporary", summary: "女性主义哲学，第二性", slug: "simone-de-beauvoir" },
  { id: "fanon", name: "法农", nameEn: "Fanon", years: "1925–1961", birthYear: 1925, tradition: "african", era: "contemporary", summary: "后殖民主义，黑皮肤白面具" },
  { id: "wang-yangming", name: "王阳明", nameEn: "Wang Yangming", years: "1472–1529", birthYear: 1472, tradition: "eastern", era: "medieval", summary: "心学集大成者，知行合一" },
];

const INFLUENCES: InfluenceEdge[] = [
  { from: "socrates", to: "plato", label: "师生" },
  { from: "plato", to: "aristotle", label: "师生" },
  { from: "confucius", to: "mencius", label: "继承发展" },
  { from: "mencius", to: "zhu-xi", label: "理学继承" },
  { from: "confucius", to: "zhu-xi", label: "儒学传承" },
  { from: "laozi", to: "zhuangzi", label: "道家传承" },
  { from: "buddha", to: "nagarjuna", label: "中观发展" },
  { from: "descartes", to: "spinoza", label: "理性主义" },
  { from: "spinoza", to: "leibniz", label: "大陆理性" },
  { from: "descartes", to: "leibniz", label: "理性主义" },
  { from: "hume", to: "kant", label: "唤醒独断" },
  { from: "kant", to: "hegel", label: "德国观念论" },
  { from: "hegel", to: "marx", label: "辩证法翻转" },
  { from: "hegel", to: "kierkegaard", label: "存在主义反叛" },
  { from: "hegel", to: "nietzsche", label: "价值重估" },
  { from: "kierkegaard", to: "sartre", label: "存在主义" },
  { from: "nietzsche", to: "sartre", label: "存在主义" },
  { from: "nietzsche", to: "heidegger", label: "存在追问" },
  { from: "husserl", to: "heidegger", label: "现象学" },
  { from: "husserl", to: "sartre", label: "现象学方法" },
  { from: "sartre", to: "beauvoir", label: "存在主义伴侣" },
  { from: "aristotle", to: "aquinas", label: "经院吸收" },
  { from: "aristotle", to: "avicenna", label: "伊斯兰注释" },
  { from: "aristotle", to: "averroes", label: "伊斯兰注释" },
  { from: "augustine", to: "aquinas", label: "教父传统" },
  { from: "locke", to: "hume", label: "经验主义" },
  { from: "russell", to: "wittgenstein", label: "逻辑分析" },
  { from: "fanon", to: "sartre", label: "存在主义影响" },
  { from: "confucius", to: "wang-yangming", label: "儒学心学" },
];

const TIMELINE_START = -650;
const TIMELINE_END = 2000;
const TIMELINE_WIDTH = 5000;
const NODE_RADIUS = 30;
const CANVAS_HEIGHT = 900;

function yearToX(year: number): number {
  return ((year - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * TIMELINE_WIDTH;
}

function traditionToLane(tradition: Tradition, index: number): number {
  const lanes: Record<Tradition, number[]> = {
    western: [0, 1, 2, 3],
    eastern: [4, 5],
    african: [6],
    islamic: [7],
  };
  const laneArr = lanes[tradition];
  const lane = laneArr[index % laneArr.length] ?? 0;
  return 80 + lane * 95;
}

function getPhilosopherY(philosopher: PhilosopherNode, allNodes: PhilosopherNode[]): number {
  const sameTradition = allNodes.filter((n) => n.tradition === philosopher.tradition);
  const idx = sameTradition.findIndex((n) => n.id === philosopher.id);
  return traditionToLane(philosopher.tradition, idx);
}

function buildEdgePath(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
): string {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const cx1 = fromX + dx * 0.3;
  const cy1 = fromY + dy * 0.1;
  const cx2 = fromX + dx * 0.7;
  const cy2 = toY - dy * 0.1;
  return `M ${fromX} ${fromY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${toX} ${toY}`;
}

export function PhilosophyTree() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTraditions, setActiveTraditions] = useState<Set<Tradition>>(
    () => new Set(["western", "eastern", "african", "islamic"]),
  );
  const [activeEras, setActiveEras] = useState<Set<Era>>(
    () => new Set(["ancient", "medieval", "modern", "contemporary"]),
  );

  const nodePositions = useMemo(() => {
    const positions = new Map<string, { x: number; y: number }>();
    for (const p of PHILOSOPHERS) {
      positions.set(p.id, {
        x: yearToX(p.birthYear),
        y: getPhilosopherY(p, PHILOSOPHERS),
      });
    }
    return positions;
  }, []);

  const filteredNodes = useMemo(
    () =>
      PHILOSOPHERS.filter(
        (p) => activeTraditions.has(p.tradition) && activeEras.has(p.era),
      ),
    [activeTraditions, activeEras],
  );

  const filteredNodeIds = useMemo(
    () => new Set(filteredNodes.map((n) => n.id)),
    [filteredNodes],
  );

  const filteredEdges = useMemo(
    () =>
      INFLUENCES.filter(
        (e) => filteredNodeIds.has(e.from) && filteredNodeIds.has(e.to),
      ),
    [filteredNodeIds],
  );

  const connectedIds = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const ids = new Set<string>();
    for (const e of INFLUENCES) {
      if (e.from === selectedId) ids.add(e.to);
      if (e.to === selectedId) ids.add(e.from);
    }
    ids.add(selectedId);
    return ids;
  }, [selectedId]);

  const selectedPhilosopher = useMemo(
    () => PHILOSOPHERS.find((p) => p.id === selectedId),
    [selectedId],
  );

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    setZoom((prev) => Math.min(4, Math.max(0.3, prev * delta)));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as SVGElement).closest("[data-node]")) return;
      setIsPanning(true);
      panStartRef.current = { x: e.clientX, y: e.clientY, panX, panY };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [panX, panY],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPanning) return;
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPanX(panStartRef.current.panX + dx);
      setPanY(panStartRef.current.panY + dy);
    },
    [isPanning],
  );

  const handlePointerUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleFitToScreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const scale = Math.min(w / (TIMELINE_WIDTH + 200), h / (CANVAS_HEIGHT + 100), 1.5);
    setZoom(scale);
    setPanX(w / 2 - (TIMELINE_WIDTH / 2) * scale);
    setPanY(h / 2 - (CANVAS_HEIGHT / 2) * scale);
  }, []);

  useEffect(() => {
    handleFitToScreen();
  }, [handleFitToScreen]);

  const toggleTradition = useCallback((t: Tradition) => {
    setActiveTraditions((prev) => {
      const next = new Set(prev);
      if (next.has(t)) {
        if (next.size > 1) next.delete(t);
      } else {
        next.add(t);
      }
      return next;
    });
  }, []);

  const toggleEra = useCallback((e: Era) => {
    setActiveEras((prev) => {
      const next = new Set(prev);
      if (next.has(e)) {
        if (next.size > 1) next.delete(e);
      } else {
        next.add(e);
      }
      return next;
    });
  }, []);

  const eraBands = useMemo(() => {
    return (Object.entries(ERA_RANGES) as [Era, { start: number; end: number }][]).map(
      ([era, range]) => ({
        era,
        x: yearToX(range.start),
        width: yearToX(range.end) - yearToX(range.start),
      }),
    );
  }, []);

  const eraBandColors: Record<Era, string> = {
    ancient: "rgba(106,208,255,0.06)",
    medieval: "rgba(200,164,90,0.06)",
    modern: "rgba(122,170,138,0.06)",
    contemporary: "rgba(168,138,223,0.06)",
  };

  const timelineMarkers = useMemo(() => {
    const markers: { year: number; x: number }[] = [];
    for (let y = -600; y <= 2000; y += 100) {
      markers.push({ year: y, x: yearToX(y) });
    }
    return markers;
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(TRADITION_LABELS) as [Tradition, string][]).map(
            ([t, label]) => {
              const color = TRADITION_COLORS[t];
              const active = activeTraditions.has(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTradition(t)}
                  className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider transition-all"
                  style={{
                    borderColor: active ? color : "rgba(255,255,255,0.1)",
                    backgroundColor: active ? `${color}20` : "transparent",
                    color: active ? color : "rgba(255,255,255,0.4)",
                  }}
                >
                  {label}
                </button>
              );
            },
          )}
          <span className="mx-1 h-4 w-px self-center bg-white/10" />
          {(Object.entries(ERA_LABELS) as [Era, string][]).map(([e, label]) => {
            const active = activeEras.has(e);
            return (
              <button
                key={e}
                type="button"
                onClick={() => toggleEra(e)}
                className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider transition-all"
                style={{
                  borderColor: active
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(255,255,255,0.08)",
                  backgroundColor: active
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",
                  color: active
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(255,255,255,0.3)",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleFitToScreen}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-colors hover:text-white/80 md:h-8 md:w-8"
            aria-label="适应屏幕"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-3.5 w-3.5"
            >
              <rect x="3" y="3" width="10" height="10" rx="1.5" />
              <path
                d="M3 6V4a1 1 0 011-1h2M10 3h2a1 1 0 011 1v2M13 10v2a1 1 0 01-1 1h-2M6 13H4a1 1 0 01-1-1v-2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(4, z * 1.2))}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-colors hover:text-white/80 md:h-8 md:w-8"
              aria-label="放大"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-3.5 w-3.5"
              >
                <path d="M8 4v8M4 8h8" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.3, z * 0.8))}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-colors hover:text-white/80 md:h-8 md:w-8"
              aria-label="缩小"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-3.5 w-3.5"
              >
                <path d="M4 8h8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden"
        style={{
          height: "calc(100vh - 260px)",
          minHeight: 500,
          touchAction: "none",
        }}
        onWheel={handleWheel}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${containerRef.current?.clientWidth ?? 1200} ${containerRef.current?.clientHeight ?? 800}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <defs>
            <marker
              id="arrow-influence"
              viewBox="0 0 8 8"
              refX="8"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0L8 4L0 8z" fill="rgba(255,255,255,0.35)" />
            </marker>
            <marker
              id="arrow-influence-highlight"
              viewBox="0 0 8 8"
              refX="8"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0L8 4L0 8z" fill="rgba(255,255,255,0.7)" />
            </marker>
            <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g transform={`translate(${panX}, ${panY}) scale(${zoom})`}>
            {eraBands.map((band) => (
              <rect
                key={band.era}
                x={band.x}
                y={0}
                width={band.width}
                height={CANVAS_HEIGHT}
                fill={eraBandColors[band.era]}
              />
            ))}

            {eraBands.map((band) => (
              <text
                key={`label-${band.era}`}
                x={band.x + band.width / 2}
                y={30}
                textAnchor="middle"
                fill="rgba(255,255,255,0.15)"
                fontSize="14"
                fontFamily="monospace"
                letterSpacing="0.15em"
              >
                {ERA_LABELS[band.era]}
              </text>
            ))}

            {timelineMarkers.map((marker) => (
              <g key={marker.year}>
                <line
                  x1={marker.x}
                  y1={50}
                  x2={marker.x}
                  y2={CANVAS_HEIGHT - 20}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
                <text
                  x={marker.x}
                  y={CANVAS_HEIGHT - 5}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.2)"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {marker.year < 0
                    ? `前${Math.abs(marker.year)}`
                    : marker.year.toString()}
                </text>
              </g>
            ))}

            {filteredEdges.map((edge) => {
              const fromPos = nodePositions.get(edge.from);
              const toPos = nodePositions.get(edge.to);
              if (!fromPos || !toPos) return null;

              const isHighlighted =
                selectedId &&
                (edge.from === selectedId || edge.to === selectedId);
              const dimmed =
                selectedId &&
                !isHighlighted &&
                !(
                  connectedIds.has(edge.from) && connectedIds.has(edge.to)
                );

              const fromNode = PHILOSOPHERS.find((p) => p.id === edge.from);
              const toNode = PHILOSOPHERS.find((p) => p.id === edge.to);
              if (!fromNode || !toNode) return null;

              const fromColor = TRADITION_COLORS[fromNode.tradition];
              const toColor = TRADITION_COLORS[toNode.tradition];

              const dx = toPos.x - fromPos.x;
              const dy = toPos.y - fromPos.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              const offsetX = (dx / dist) * (NODE_RADIUS + 4);
              const offsetY = (dy / dist) * (NODE_RADIUS + 4);

              const path = buildEdgePath(
                fromPos.x + offsetX,
                fromPos.y + offsetY,
                toPos.x - offsetX,
                toPos.y - offsetY,
              );

              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <path
                    d={path}
                    fill="none"
                    stroke={
                      isHighlighted
                        ? "rgba(255,255,255,0.5)"
                        : dimmed
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(255,255,255,0.12)"
                    }
                    strokeWidth={isHighlighted ? 2 : 1.2}
                    markerEnd={
                      isHighlighted
                        ? "url(#arrow-influence-highlight)"
                        : "url(#arrow-influence)"
                    }
                    strokeDasharray={dimmed ? "4,4" : undefined}
                  />
                  {isHighlighted && edge.label && (
                    <text
                      x={(fromPos.x + toPos.x) / 2}
                      y={(fromPos.y + toPos.y) / 2 - 8}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.45)"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {filteredNodes.map((node) => {
              const pos = nodePositions.get(node.id);
              if (!pos) return null;
              const color = TRADITION_COLORS[node.tradition];
              const isHovered = hoveredId === node.id;
              const isSelected = selectedId === node.id;
              const dimmed =
                selectedId && !isSelected && !connectedIds.has(node.id);
              const r = isSelected
                ? NODE_RADIUS + 4
                : isHovered
                  ? NODE_RADIUS + 2
                  : NODE_RADIUS;

              return (
                <g
                  key={node.id}
                  data-node
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onPointerEnter={() => setHoveredId(node.id)}
                  onPointerLeave={() => setHoveredId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId((prev) => (prev === node.id ? null : node.id));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    r={r + 8}
                    fill={color}
                    opacity={isSelected ? 0.2 : isHovered ? 0.1 : 0}
                    className="transition-opacity duration-200"
                  />
                  <circle
                    r={r}
                    fill={`${color}18`}
                    stroke={color}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                    strokeOpacity={dimmed ? 0.15 : isSelected ? 1 : 0.5}
                    className="transition-all duration-200"
                  />
                  <text
                    textAnchor="middle"
                    dy="-2"
                    fill={
                      dimmed
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.9)"
                    }
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    className="pointer-events-none select-none"
                  >
                    {node.name}
                  </text>
                  <text
                    textAnchor="middle"
                    dy="11"
                    fill={
                      dimmed
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.35)"
                    }
                    fontSize="8"
                    fontFamily="monospace"
                    className="pointer-events-none select-none"
                  >
                    {node.years}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {selectedPhilosopher && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 z-10 max-w-sm rounded-xl border border-white/10 bg-[#111118]/90 p-4 backdrop-blur-xl"
          >
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-3 w-0.5 rounded-full"
                style={{
                  backgroundColor:
                    TRADITION_COLORS[selectedPhilosopher.tradition],
                }}
              />
              <span
                className="font-mono text-[9px] tracking-[0.2em] uppercase"
                style={{
                  color: TRADITION_COLORS[selectedPhilosopher.tradition],
                }}
              >
                {TRADITION_LABELS[selectedPhilosopher.tradition]} ·{" "}
                {ERA_LABELS[selectedPhilosopher.era]}
              </span>
            </div>
            <h3 className="font-display text-base font-semibold text-white">
              {selectedPhilosopher.name}
              <span className="ml-2 text-xs font-normal text-white/40">
                {selectedPhilosopher.nameEn}
              </span>
            </h3>
            <p className="mt-0.5 font-mono text-[10px] text-white/30">
              {selectedPhilosopher.years}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              {selectedPhilosopher.summary}
            </p>
            <div className="mt-3 flex gap-2">
              {selectedPhilosopher.slug && (
                <Link
                  href={`/philosophy/thinkers/${selectedPhilosopher.slug}`}
                  className="rounded-lg bg-blue-500/20 px-3 py-1.5 text-xs text-blue-300 transition-colors hover:bg-blue-500/30"
                >
                  查看详情
                </Link>
              )}
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
              >
                取消选择
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 px-4 py-3">
        {(Object.entries(TRADITION_COLORS) as [Tradition, string][]).map(
          ([t, color]) => (
            <div key={t} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="font-mono text-[9px] text-white/40">
                {TRADITION_LABELS[t]}
              </span>
            </div>
          ),
        )}
        <span className="mx-1 h-3 w-px bg-white/10" />
        <div className="flex items-center gap-1.5">
          <svg width="20" height="8">
            <line
              x1="0"
              y1="4"
              x2="20"
              y2="4"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.2"
              markerEnd="url(#arrow-influence)"
            />
          </svg>
          <span className="font-mono text-[9px] text-white/40">影响</span>
        </div>
      </div>
    </div>
  );
}
