"use client";

import { useEffect, useState } from "react";
import { getProgress, type ReadingProgress } from "../lib/reading-progress";

type ReadingStatsProps = {
  totalThinkers: number;
  totalConcepts: number;
};

export function ReadingStats({ totalThinkers, totalConcepts }: ReadingStatsProps) {
  const [progress, setProgress] = useState<ReadingProgress>({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const entries = Object.entries(progress);
  const thinkerEntries = entries.filter(([slug]) => slug.startsWith("thinker:"));
  const conceptEntries = entries.filter(([slug]) => slug.startsWith("concept:"));

  const visitedThinkers = thinkerEntries.filter(([, v]) => v.visited).length;
  const completedThinkers = thinkerEntries.filter(([, v]) => v.completed).length;
  const visitedConcepts = conceptEntries.filter(([, v]) => v.visited).length;
  const completedConcepts = conceptEntries.filter(([, v]) => v.completed).length;

  const totalVisited = visitedThinkers + visitedConcepts;
  const totalItems = totalThinkers + totalConcepts;
  const overallPercent = totalItems > 0 ? Math.round((totalVisited / totalItems) * 100) : 0;

  return (
    <div className="border-border-faint border p-5">
      <h3 className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.22em] uppercase">
        阅读统计
      </h3>

      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-fg-secondary text-sm">已阅读思想家</span>
            <span className="text-fg-muted font-mono text-xs">
              {visitedThinkers}/{totalThinkers}
            </span>
          </div>
          <div className="bg-border-faint h-1.5 w-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${totalThinkers > 0 ? (visitedThinkers / totalThinkers) * 100 : 0}%`,
                backgroundColor: "#c8a45a",
              }}
            />
          </div>
          {completedThinkers > 0 && (
            <p className="text-fg-disabled mt-1 font-mono text-[9px] tracking-wider">
              已完成 {completedThinkers} 位
            </p>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-fg-secondary text-sm">已阅读概念</span>
            <span className="text-fg-muted font-mono text-xs">
              {visitedConcepts}/{totalConcepts}
            </span>
          </div>
          <div className="bg-border-faint h-1.5 w-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${totalConcepts > 0 ? (visitedConcepts / totalConcepts) * 100 : 0}%`,
                backgroundColor: "#c8a45a",
              }}
            />
          </div>
          {completedConcepts > 0 && (
            <p className="text-fg-disabled mt-1 font-mono text-[9px] tracking-wider">
              已完成 {completedConcepts} 个
            </p>
          )}
        </div>

        <div className="border-border-faint border-t pt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-fg-primary text-sm font-medium">总进度</span>
            <span className="text-accent-gold font-mono text-sm font-medium">
              {overallPercent}%
            </span>
          </div>
          <div className="bg-border-faint mt-2 h-2 w-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${overallPercent}%`,
                background: "linear-gradient(90deg, #c8a45a 0%, #e8d5a3 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
