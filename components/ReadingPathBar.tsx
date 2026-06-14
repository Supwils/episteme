"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getReadingPath, type ReadingStep } from "../lib/reading-paths";

/**
 * Global, query-param-driven prev/next bar that turns any article into a chapter
 * of a reading path. Activated by `?path=<slug>&step=<n>` on the URL, so it works
 * on every article route without per-page wiring. Renders nothing otherwise.
 */
export function ReadingPathBar() {
  const params = useSearchParams();
  const pathname = usePathname();

  const pathSlug = params.get("path");
  const path = pathSlug ? getReadingPath(pathSlug) : undefined;
  if (!path) return null;

  const total = path.steps.length;
  const step = Math.min(Math.max(parseInt(params.get("step") ?? "1", 10) || 1, 1), total);
  const idx = step - 1;

  const prev = idx > 0 ? path.steps[idx - 1] : null;
  const next = idx < total - 1 ? path.steps[idx + 1] : null;
  const stepLink = (s: ReadingStep, n: number) => `${s.href}?path=${path.slug}&step=${n}`;

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 w-[min(680px,calc(100vw-1.5rem))] -translate-x-1/2"
      style={{ accentColor: path.accent }}
    >
      <div
        className="flex items-stretch gap-1 rounded-2xl border border-[#2a2a3a] bg-[rgba(17,17,24,0.94)] p-1.5 backdrop-blur-md"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.45)" }}
      >
        {/* Exit the path: drop the query params */}
        <Link
          href={pathname}
          aria-label="退出阅读路线"
          className="flex w-9 shrink-0 items-center justify-center rounded-xl text-[#6b7280] transition-colors hover:bg-white/5 hover:text-[#e8e8f0]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M3 3l8 8M11 3l-8 8" />
          </svg>
        </Link>

        {/* Prev */}
        {prev ? (
          <Link
            href={stepLink(prev, step - 1)}
            className="group flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-white/5"
          >
            <span
              className="shrink-0 opacity-80 transition-opacity group-hover:opacity-100"
              style={{ color: path.accent }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 3L5 8l5 5" />
              </svg>
            </span>
            <span className="hidden min-w-0 flex-col sm:flex">
              <span className="text-[10px] tracking-wider text-[#6b7280] uppercase">上一篇</span>
              <span className="truncate text-[13px] text-[#9ca3af] group-hover:text-[#e8e8f0]">
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <div className="hidden flex-1 sm:block" />
        )}

        {/* Center: path title + progress, links to the path's contents page */}
        <Link
          href={`/read/${path.slug}`}
          className="flex shrink-0 flex-col items-center justify-center gap-1 px-3 py-1 text-center"
          aria-label={`${path.title} 目录`}
        >
          <span className="max-w-[10rem] truncate text-[12px] font-medium text-[#e8e8f0]">
            {path.title}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[#9ca3af] tabular-nums">
            <span>{step}</span>
            <span className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
              <span
                className="block h-full rounded-full"
                style={{ width: `${(step / total) * 100}%`, background: path.accent }}
              />
            </span>
            <span>{total}</span>
          </span>
        </Link>

        {/* Next, or finish */}
        {next ? (
          <Link
            href={stepLink(next, step + 1)}
            className="group flex min-w-0 flex-1 items-center justify-end gap-2 rounded-xl px-3 py-2 text-right transition-colors hover:bg-white/5"
          >
            <span className="hidden min-w-0 flex-col items-end sm:flex">
              <span className="text-[10px] tracking-wider text-[#6b7280] uppercase">下一篇</span>
              <span className="truncate text-[13px] text-[#9ca3af] group-hover:text-[#e8e8f0]">
                {next.title}
              </span>
            </span>
            <span className="shrink-0 text-[#9ca3af]" style={{ color: path.accent }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 3l5 5-5 5" />
              </svg>
            </span>
          </Link>
        ) : (
          <Link
            href={`/read/${path.slug}`}
            className="flex flex-1 items-center justify-end gap-2 rounded-xl px-3 py-2 text-right transition-colors hover:bg-white/5"
          >
            <span className="text-[13px] font-medium" style={{ color: path.accent }}>
              读完 ✓
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
