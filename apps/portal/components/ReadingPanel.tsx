"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useBookmarks, removeBookmark } from "@/lib/bookmarks";
import { useReadingHistory, clearReadingHistory } from "@/lib/reading-progress";
import { useFocusTrap } from "@/lib/use-focus-trap";

type Tab = "bookmarks" | "history";

export function ReadingPanel() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("bookmarks");
  const bookmarks = useBookmarks();
  const history = useReadingHistory();
  const panelRef = useFocusTrap<HTMLDivElement>(open);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="打开阅读面板"
        className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] text-[#9ca3af] transition-colors hover:border-white/[0.15] hover:text-[#e8e8f0]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
        {bookmarks.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[8px] font-bold text-white">
            {bookmarks.length > 9 ? "9+" : bookmarks.length}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="阅读面板"
            className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/[0.06] bg-[#0a0a0f] shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <div className="flex gap-1" role="tablist" aria-label="阅读面板标签">
                  <TabButton active={tab === "bookmarks"} onClick={() => setTab("bookmarks")} ariaControls="panel-bookmarks">
                    书签 ({bookmarks.length})
                  </TabButton>
                  <TabButton active={tab === "history"} onClick={() => setTab("history")} ariaControls="panel-history">
                    阅读历史 ({history.length})
                  </TabButton>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="关闭"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#9ca3af] transition-colors hover:text-[#e8e8f0]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {tab === "bookmarks" ? (
                  <div role="tabpanel" id="panel-bookmarks">
                    <BookmarksList bookmarks={bookmarks} onRemove={removeBookmark} onClose={() => setOpen(false)} />
                  </div>
                ) : (
                  <div role="tabpanel" id="panel-history">
                    <HistoryList history={history} onClear={clearReadingHistory} onClose={() => setOpen(false)} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TabButton({
  active,
  onClick,
  ariaControls,
  children,
}: {
  active: boolean;
  onClick: () => void;
  ariaControls: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={ariaControls}
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] transition-all duration-200 ${
        active
          ? "bg-indigo-500/15 text-indigo-400"
          : "text-[#9ca3af] hover:text-[#e8e8f0]"
      }`}
    >
      {children}
    </button>
  );
}

function BookmarksList({
  bookmarks,
  onRemove,
  onClose,
}: {
  bookmarks: Array<{ slug: string; section: string; title: string; url: string; createdAt: number }>;
  onRemove: (slug: string) => void;
  onClose: () => void;
}) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 text-[#9ca3af]">
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
        <p className="text-fg-muted text-sm">暂无书签</p>
        <p className="text-fg-disabled mt-1 text-xs">在内容页点击「收藏」按钮添加</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2" role="list">
      {bookmarks.map((b) => (
        <li key={b.slug} className="group flex items-start gap-3 rounded-lg border border-white/[0.04] p-3 transition-all hover:border-white/[0.1] hover:bg-white/[0.02]">
          <Link href={b.url} onClick={onClose} className="min-w-0 flex-1">
            <span className="text-fg-disabled mb-1 block font-mono text-[9px] tracking-[0.22em] uppercase">
              {b.section}
            </span>
            <span className="text-fg-secondary text-sm font-medium line-clamp-2">
              {b.title}
            </span>
            <span className="text-fg-disabled mt-1 block font-mono text-[10px]">
              {new Date(b.createdAt).toLocaleDateString("zh-CN")}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => onRemove(b.slug)}
            aria-label={`移除 ${b.title}`}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[#9ca3af] opacity-0 transition-all group-hover:opacity-100 group-focus-within:opacity-100 hover:text-red-400"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}

function HistoryList({
  history,
  onClear,
  onClose,
}: {
  history: Array<{ slug: string; section: string; title: string; url: string; scrollPct: number; lastVisit: number }>;
  onClear: () => void;
  onClose: () => void;
}) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 text-[#9ca3af]">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        <p className="text-fg-muted text-sm">暂无阅读记录</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={onClear}
          className="text-fg-muted hover:text-fg-secondary font-mono text-[10px] tracking-[0.16em] uppercase transition-colors"
        >
          清除全部
        </button>
      </div>
      <ul className="space-y-2" role="list">
        {history.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.url}
              onClick={onClose}
              className="group block rounded-lg border border-white/[0.04] p-3 transition-all hover:border-white/[0.1] hover:bg-white/[0.02]"
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
