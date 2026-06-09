"use client";

import { useState, useMemo, useCallback } from "react";

interface Triangle {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  depth: number;
}

function generateSierpinski(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  depth: number,
  maxDepth: number,
): Triangle[] {
  if (depth >= maxDepth) {
    return [{ x1, y1, x2, y2, x3, y3, depth }];
  }

  const mx12 = (x1 + x2) / 2;
  const my12 = (y1 + y2) / 2;
  const mx23 = (x2 + x3) / 2;
  const my23 = (y2 + y3) / 2;
  const mx13 = (x1 + x3) / 2;
  const my13 = (y1 + y3) / 2;

  return [
    ...generateSierpinski(x1, y1, mx12, my12, mx13, my13, depth + 1, maxDepth),
    ...generateSierpinski(mx12, my12, x2, y2, mx23, my23, depth + 1, maxDepth),
    ...generateSierpinski(mx13, my13, mx23, my23, x3, y3, depth + 1, maxDepth),
  ];
}

const DEPTH_COLORS = [
  "#6366f1",
  "#818cf8",
  "#a5b4fc",
  "#22d3ee",
  "#67e8f9",
  "#a5f3fc",
  "#f472b6",
  "#f9a8d4",
  "#fde68a",
];

function getTriangleColor(depth: number, maxDepth: number): string {
  if (maxDepth === 0) return DEPTH_COLORS[0]!;
  const idx = Math.min(depth, DEPTH_COLORS.length - 1);
  return DEPTH_COLORS[idx]!;
}

const SVG_SIZE = 500;
const PADDING = 20;
const TRIANGLE_POINTS = [
  [SVG_SIZE / 2, PADDING],
  [PADDING, SVG_SIZE - PADDING],
  [SVG_SIZE - PADDING, SVG_SIZE - PADDING],
] as const;

export function FractalExplorer() {
  const [maxDepth, setMaxDepth] = useState(4);
  const [showSelfSimilarity, setShowSelfSimilarity] = useState(false);
  const [highlightDepth, setHighlightDepth] = useState<number | null>(null);

  const triangles = useMemo(
    () =>
      generateSierpinski(
        TRIANGLE_POINTS[0][0],
        TRIANGLE_POINTS[0][1],
        TRIANGLE_POINTS[1][0],
        TRIANGLE_POINTS[1][1],
        TRIANGLE_POINTS[2][0],
        TRIANGLE_POINTS[2][1],
        0,
        maxDepth,
      ),
    [maxDepth],
  );

  const triangleCount = triangles.length;
  const fractalDimension = Math.log(3) / Math.log(2);

  const selfSimilarTriangles = useMemo(() => {
    if (!showSelfSimilarity || maxDepth < 2) return [];
    const topTriangle = triangles.filter((t) => {
      const cy = (t.y1 + t.y2 + t.y3) / 3;
      return cy < SVG_SIZE / 2;
    });
    return topTriangle.slice(0, Math.min(topTriangle.length, 50));
  }, [showSelfSimilarity, triangles, maxDepth]);

  const handleDepthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDepth(Number(e.target.value));
    setShowSelfSimilarity(false);
    setHighlightDepth(null);
  }, []);

  return (
    <div className="border border-border-faint bg-bg-panel p-6 backdrop-blur-md">
      <h3 className="font-display text-fg-primary mb-1 text-lg font-semibold tracking-tight">
        谢尔宾斯基三角形
      </h3>
      <p className="text-fg-muted mb-4 font-mono text-[11px] tracking-[0.12em]">
        Sierpinski Triangle — 迭代构造
      </p>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <div className="border border-border-faint bg-bg-elevated">
            <svg
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              className="h-auto w-full"
              role="img"
              aria-label={`谢尔宾斯基三角形，第 ${maxDepth} 次迭代，共 ${triangleCount} 个三角形`}
            >
              {triangles.map((tri, i) => {
                const isHighlighted =
                  highlightDepth !== null && tri.depth === highlightDepth;
                const isSelfSimilar = showSelfSimilarity && selfSimilarTriangles.includes(tri);
                const points = `${tri.x1},${tri.y1} ${tri.x2},${tri.y2} ${tri.x3},${tri.y3}`;
                const fillColor = getTriangleColor(tri.depth, maxDepth);

                return (
                  <polygon
                    key={i}
                    points={points}
                    fill={isSelfSimilar ? "#f59e0b" : fillColor}
                    fillOpacity={
                      highlightDepth !== null
                        ? isHighlighted
                          ? 0.9
                          : 0.15
                        : isSelfSimilar
                          ? 0.85
                          : 0.7
                    }
                    stroke={
                      isSelfSimilar
                        ? "#f59e0b"
                        : highlightDepth !== null && isHighlighted
                          ? "#ffffff"
                          : "rgba(255,255,255,0.08)"
                    }
                    strokeWidth={isSelfSimilar || isHighlighted ? 1.5 : 0.5}
                    className="transition-all duration-200"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-72">
          <div>
            <label className="text-fg-secondary mb-2 flex items-center justify-between font-mono text-[11px] tracking-[0.12em]">
              <span>迭代深度</span>
              <span className="text-accent-indigo font-semibold">{maxDepth}</span>
            </label>
            <input
              type="range"
              min={0}
              max={8}
              value={maxDepth}
              onChange={handleDepthChange}
              className="accent-accent-indigo w-full"
              aria-label="迭代深度滑块"
            />
            <div className="text-fg-disabled mt-1 flex justify-between font-mono text-[9px]">
              <span>0</span>
              <span>2</span>
              <span>4</span>
              <span>6</span>
              <span>8</span>
            </div>
          </div>

          <div className="border border-border-faint bg-bg-elevated space-y-3 p-4">
            <h4 className="text-fg-primary font-mono text-[10px] tracking-[0.22em] uppercase">
              统计数据
            </h4>
            <div className="space-y-2">
              <StatRow label="三角形数量" value={triangleCount.toLocaleString()} />
              <StatRow label="迭代深度" value={String(maxDepth)} />
              <StatRow
                label="分形维数"
                value={`log3/log2 ≈ ${fractalDimension.toFixed(3)}`}
                accent
              />
              <StatRow label="相似比" value="1/2" />
              <StatRow label="副本数 N" value="3" />
            </div>
          </div>

          <div className="border border-border-faint bg-bg-elevated p-4">
            <h4 className="text-fg-primary mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
              维数公式
            </h4>
            <p className="text-accent-cyan font-mono text-sm">
              dim = log(N) / log(1/r)
            </p>
            <p className="text-fg-muted mt-1 font-mono text-[11px]">
              = log(3) / log(2) ≈ 1.585
            </p>
            <p className="text-fg-disabled mt-2 text-[12px] leading-relaxed">
              介于一维（线）和二维（面）之间，描述分形填充空间的程度。
            </p>
          </div>

          <button
            onClick={() => setShowSelfSimilarity((prev) => !prev)}
            className={`border px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] transition-all duration-200 ${
              showSelfSimilarity
                ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                : "border-border-faint text-fg-secondary hover:border-fg-disabled/30 hover:bg-bg-elevated"
            }`}
          >
            {showSelfSimilarity ? "隐藏自相似性" : "显示自相似性"}
          </button>

          {maxDepth >= 2 && (
            <div>
              <p className="text-fg-disabled mb-2 font-mono text-[10px] tracking-[0.12em]">
                高亮深度层
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: maxDepth + 1 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setHighlightDepth(highlightDepth === i ? null : i)
                    }
                    className={`h-7 w-7 border font-mono text-[10px] transition-all ${
                      highlightDepth === i
                        ? "border-white/50 bg-white/10 text-white"
                        : "border-border-faint text-fg-muted hover:border-fg-disabled/30"
                    }`}
                    style={
                      highlightDepth !== i
                        ? { backgroundColor: `${getTriangleColor(i, maxDepth)}20` }
                        : undefined
                    }
                    aria-label={`高亮第 ${i} 层`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showSelfSimilarity && (
            <div className="border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-amber-400 font-mono text-[10px] tracking-[0.12em] uppercase">
                自相似性
              </p>
              <p className="text-fg-secondary mt-1 text-[12px] leading-relaxed">
                高亮部分（左上角子三角形）与整体完全相似——放大 2
                倍后与原图一致。这是分形的核心特征。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-fg-disabled font-mono text-[10px] tracking-[0.08em]">
        {label}
      </span>
      <span
        className={`font-mono text-[12px] ${accent ? "text-accent-indigo font-semibold" : "text-fg-secondary"}`}
      >
        {value}
      </span>
    </div>
  );
}
