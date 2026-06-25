"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const ACCENT = "#4f9cf0";

type Node = { id: number; label: string; x: number; y: number };

const NODES: Node[] = [
  { id: 0, label: "A", x: 15, y: 18 },
  { id: 1, label: "B", x: 50, y: 12 },
  { id: 2, label: "C", x: 85, y: 18 },
  { id: 3, label: "D", x: 15, y: 50 },
  { id: 4, label: "E", x: 50, y: 50 },
  { id: 5, label: "F", x: 85, y: 50 },
  { id: 6, label: "G", x: 15, y: 84 },
  { id: 7, label: "H", x: 50, y: 90 },
  { id: 8, label: "I", x: 85, y: 84 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [2, 5],
  [3, 4],
  [4, 5],
  [3, 6],
  [4, 7],
  [5, 8],
  [6, 7],
  [7, 8],
  [0, 4],
  [2, 4],
  [4, 8],
];

// Adjacency with sorted neighbours → deterministic traversal order.
const ADJ: number[][] = NODES.map((n) => {
  const nbrs: number[] = [];
  for (const [a, b] of EDGES) {
    if (a === n.id) nbrs.push(b);
    if (b === n.id) nbrs.push(a);
  }
  return [...new Set(nbrs)].sort((x, y) => x - y);
});

type Frame = { current: number; visited: number[]; frontier: number[] };

function bfs(start: number): Frame[] {
  const visited = new Set<number>([start]);
  const queue: number[] = [start];
  const frames: Frame[] = [];
  while (queue.length) {
    const cur = queue.shift()!;
    for (const nb of ADJ[cur]!) {
      if (!visited.has(nb)) {
        visited.add(nb);
        queue.push(nb);
      }
    }
    frames.push({ current: cur, visited: [...visited], frontier: [...queue] });
  }
  frames.push({ current: -1, visited: [...visited], frontier: [] });
  return frames;
}

function dfs(start: number): Frame[] {
  const visited = new Set<number>();
  const stack: number[] = [];
  const frames: Frame[] = [];
  const walk = (node: number) => {
    visited.add(node);
    stack.push(node);
    frames.push({ current: node, visited: [...visited], frontier: [...stack] });
    for (const nb of ADJ[node]!) if (!visited.has(nb)) walk(nb);
    stack.pop();
  };
  walk(start);
  frames.push({ current: -1, visited: [...visited], frontier: [] });
  return frames;
}

const ALGOS = [
  { key: "bfs", label: "广度优先 BFS", run: bfs, frontierName: "队列 (FIFO)" },
  { key: "dfs", label: "深度优先 DFS", run: dfs, frontierName: "栈 (LIFO)" },
] as const;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function GraphTraversal() {
  const reduced = usePrefersReducedMotion();
  const [algoKey, setAlgoKey] = useState<string>("bfs");
  const [start, setStart] = useState(0);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  const algo = ALGOS.find((a) => a.key === algoKey) ?? ALGOS[0];
  const frames = useMemo(() => algo.run(start), [algo, start]);
  const cur = frames[Math.min(frame, frames.length - 1)]!;
  const done = frame >= frames.length - 1;

  useEffect(() => {
    setFrame(0);
    setPlaying(false);
  }, [algoKey, start]);

  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (!playing) return;
    if (done) {
      setPlaying(false);
      return;
    }
    timer.current = window.setTimeout(
      () => setFrame((f) => Math.min(f + 1, frames.length - 1)),
      650
    );
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [playing, frame, done, frames.length]);

  const visitedSet = new Set(cur.visited);
  const frontierSet = new Set(cur.frontier);

  const nodeColor = (id: number) => {
    if (id === cur.current) return ACCENT;
    if (frontierSet.has(id)) return "#e0a458";
    if (visitedSet.has(id)) return "#98c379";
    return "var(--color-fg-disabled)";
  };

  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint flex items-center justify-between gap-2 border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: ACCENT }}
        >
          图遍历 · 可视化
        </span>
        <span className="text-fg-muted font-mono text-[10px]">{NODES.length} 个节点</span>
      </figcaption>

      {/* algorithm tabs */}
      <div
        className="border-border-faint flex flex-wrap gap-1.5 border-b px-4 py-3"
        role="tablist"
        aria-label="遍历算法"
      >
        {ALGOS.map((a) => {
          const on = a.key === algoKey;
          return (
            <button
              key={a.key}
              role="tab"
              aria-selected={on}
              onClick={() => setAlgoKey(a.key)}
              className="border px-2.5 py-1 font-mono text-[11px] transition-colors"
              style={{
                borderColor: on ? ACCENT : "var(--color-border-subtle)",
                color: on ? ACCENT : "var(--color-fg-muted)",
                backgroundColor: on ? `${ACCENT}14` : "transparent",
              }}
            >
              {a.label}
            </button>
          );
        })}
      </div>

      {/* graph */}
      <div className="px-4 pt-5 sm:px-6">
        <svg
          viewBox="0 0 100 100"
          className="mx-auto h-64 w-full max-w-md"
          role="img"
          aria-label={`${algo.label}遍历，当前访问节点 ${cur.current >= 0 ? NODES[cur.current]!.label : "完成"}`}
        >
          {EDGES.map(([a, b], idx) => {
            const na = NODES[a]!;
            const nb = NODES[b]!;
            const litEdge =
              (cur.current === a && visitedSet.has(b)) || (cur.current === b && visitedSet.has(a));
            return (
              <line
                key={idx}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke={litEdge ? ACCENT : "var(--color-border-subtle)"}
                strokeWidth={litEdge ? 0.9 : 0.5}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
          {NODES.map((n) => {
            const color = nodeColor(n.id);
            const isStart = n.id === start;
            return (
              <g
                key={n.id}
                onClick={() => setStart(n.id)}
                className="cursor-pointer"
                style={reduced ? undefined : { transition: "all 0.3s" }}
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="6.5"
                  fill={color}
                  fillOpacity={0.22}
                  stroke={color}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={n.x}
                  y={n.y + 2.6}
                  textAnchor="middle"
                  className="fill-fg-primary text-[7px] font-medium select-none"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {n.label}
                </text>
                {isStart && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="9"
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="0.5"
                    strokeDasharray="2 1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* frontier state */}
      <div className="px-4 py-3 font-mono text-[11px] sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-fg-disabled tracking-[0.18em] uppercase">{algo.frontierName}</span>
          <div className="flex flex-wrap gap-1">
            {cur.frontier.length === 0 ? (
              <span className="text-fg-disabled">∅</span>
            ) : (
              cur.frontier.map((id, k) => (
                <span
                  key={k}
                  className="border-border-subtle text-fg-secondary border px-1.5 py-0.5"
                  style={{ color: "#e0a458", borderColor: "#e0a45855" }}
                >
                  {NODES[id]!.label}
                </span>
              ))
            )}
          </div>
        </div>
        <div className="text-fg-muted mt-2">
          访问顺序{" "}
          <span className="text-fg-secondary">
            {cur.visited.map((id) => NODES[id]!.label).join(" → ") || "—"}
          </span>
        </div>
      </div>

      {/* controls */}
      <div className="flex flex-wrap items-center gap-1.5 px-4 py-3 sm:px-6">
        <button
          onClick={() => (done ? (setFrame(0), setPlaying(true)) : setPlaying((p) => !p))}
          className="border px-3 py-1 font-mono text-[11px] transition-colors"
          style={{ borderColor: ACCENT, color: ACCENT, backgroundColor: `${ACCENT}14` }}
        >
          {playing ? "暂停" : "播放"}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setFrame((f) => Math.min(f + 1, frames.length - 1));
          }}
          disabled={done}
          className="border-border-subtle text-fg-secondary border px-3 py-1 font-mono text-[11px] transition-colors disabled:opacity-35"
        >
          单步
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setFrame(0);
          }}
          className="border-border-subtle text-fg-secondary border px-3 py-1 font-mono text-[11px] transition-colors"
        >
          重置
        </button>
        <span className="text-fg-disabled ml-auto font-mono text-[10px]">点击节点设为起点</span>
      </div>

      <p className="text-fg-muted border-border-faint border-t px-4 py-3 text-xs leading-relaxed sm:px-6">
        <span style={{ color: ACCENT }}>BFS</span> 用<span className="text-fg-secondary">队列</span>
        逐层向外扩展，先访问近邻；
        <span style={{ color: ACCENT }}>DFS</span> 用<span className="text-fg-secondary">栈</span>
        一路走到底再回溯。 切换算法、点击任意节点设为起点，观察访问顺序如何不同。
        <span className="text-fg-disabled"> 橙色为待访问的边界，绿色为已访问。</span>
      </p>
    </figure>
  );
}
