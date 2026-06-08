"use client";

import Link from "next/link";
import { useReadingHistory, clearReadingHistory } from "@/lib/reading-progress";

interface ReadingHistoryProps {
  maxItems?: number;
}

export function ReadingHistory({ maxItems = 10 }: ReadingHistoryProps) {
  const history = useReadingHistory();

  if (history.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-fg-muted text-sm">暂无阅读记录</p>
      </div>
    );
  }

  const items = history.slice(0, maxItems);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-fg-primary text-sm font-semibold tracking-wide">
          阅读历史
        </h3>
        <button
          type="button"
          onClick={clearReadingHistory}
          className="text-fg-muted hover:text-fg-secondary font-mono text-[10px] tracking-[0.16em] uppercase transition-colors"
        >
          清除
        </button>
      </div>
      <ul className="space-y-3" role="list">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.url}
              className="group block rounded-lg border border-white/[0.04] p-3 transition-all duration-200 hover:border-white/[0.1] hover:bg-white/[0.02]"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
                  {item.section}
                </span>
                {item.scrollPct >= 95 ? (
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
                    已读完
                  </span>
                ) : (
                  <span className="text-fg-disabled font-mono text-[9px]">
                    {item.scrollPct}%
                  </span>
                )}
              </div>
              <p className="text-fg-secondary group-hover:text-fg-primary text-sm font-medium transition-colors line-clamp-1">
                {item.title}
              </p>
              {item.scrollPct < 95 && (
                <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-indigo-500/60 transition-all duration-300"
                    style={{ width: `${item.scrollPct}%` }}
                  />
                </div>
              )}
              <p className="text-fg-disabled mt-1.5 font-mono text-[10px]">
                {formatRelativeTime(item.lastVisit)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "刚刚";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} 天前`;
  return new Date(timestamp).toLocaleDateString("zh-CN");
}
