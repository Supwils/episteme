"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getReadingPath,
  readingPathChaptersFor,
  normalizeArticleHref,
  type ReadingPath,
  type ReadingPathChapter,
  type ReadingStep,
} from "../lib/reading-paths";

/**
 * Global, query-param-driven prev/next bar that turns any article into a chapter
 * of a reading path. Activated by `?path=<slug>&step=<n>`. If those params are
 * missing but the current article already sits on a path, a quieter invite
 * appears so wiki-link landings can still enter the sequence.
 */
export function ReadingPathBar() {
  const params = useSearchParams();
  const pathname = usePathname();
  const pathSlug = params.get("path");
  const path = pathSlug ? getReadingPath(pathSlug) : undefined;
  const articleHref = normalizeArticleHref(pathname);
  const onPathIndex =
    path && path.steps.length > 0 ? path.steps.findIndex((step) => step.href === articleHref) : -1;
  if (path && onPathIndex >= 0) {
    return <ActiveReadingPathBar path={path} pathname={pathname} step={onPathIndex + 1} />;
  }
  const chapters = readingPathChaptersFor(pathname);
  if (chapters.length === 0) return null;
  return <ReadingPathInvite chapters={chapters} pathname={pathname} />;
}

function ActiveReadingPathBar({
  path,
  pathname,
  step,
}: {
  path: ReadingPath;
  pathname: string;
  step: number;
}) {
  const total = path.steps.length;
  if (total === 0) return null;
  const idx = step - 1;
  const prev = idx > 0 ? path.steps[idx - 1] : null;
  const next = idx < total - 1 ? path.steps[idx + 1] : null;
  const stepLink = (s: ReadingStep, n: number) => `${s.href}?path=${path.slug}&step=${n}`;

  return (
    <div className="print-hidden fixed bottom-4 left-1/2 z-50 w-[min(680px,calc(100vw-1.5rem))] -translate-x-1/2 transition-[bottom] [[data-narration-active]_&]:bottom-24">
      <nav
        aria-label="阅读路线"
        className="flex items-stretch gap-1 rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg)] p-1.5 backdrop-blur-md"
        style={{ boxShadow: "var(--card-shadow)" }}
      >
        <Link
          href={pathname}
          aria-label="退出阅读路线"
          className="flex w-11 shrink-0 items-center justify-center rounded-xl text-[var(--muted)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--foreground)]"
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
        {prev ? (
          <Link
            href={stepLink(prev, step - 1)}
            aria-label={`上一篇：${prev.title}`}
            className="group flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-[var(--hover-bg)]"
          >
            <span
              className="shrink-0 opacity-80 transition-opacity group-hover:opacity-100"
              style={{ color: path.accent }}
            >
              <Chevron dir="prev" />
            </span>
            <span className="hidden min-w-0 flex-col sm:flex">
              <span className="text-[10px] tracking-wider text-[var(--muted)] uppercase">
                上一篇
              </span>
              <span className="truncate text-[13px] text-[var(--muted)] group-hover:text-[var(--foreground)]">
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <div className="hidden flex-1 sm:block" />
        )}
        <Link
          href={`/read/${path.slug}`}
          className="flex shrink-0 flex-col items-center justify-center gap-1 px-3 py-1 text-center"
          aria-label={`${path.title} 目录`}
        >
          <span className="max-w-[10rem] truncate text-[12px] font-medium text-[var(--foreground)]">
            {path.title}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)] tabular-nums">
            <span>{step}</span>
            <span className="h-1 w-16 overflow-hidden rounded-full bg-[var(--hover-bg)]">
              <span
                className="block h-full rounded-full"
                style={{ width: `${(step / total) * 100}%`, background: path.accent }}
              />
            </span>
            <span>{total}</span>
          </span>
        </Link>
        {next ? (
          <Link
            href={stepLink(next, step + 1)}
            aria-label={`下一篇：${next.title}`}
            className="group flex min-w-0 flex-1 items-center justify-end gap-2 rounded-xl px-3 py-2 text-right transition-colors hover:bg-[var(--hover-bg)]"
          >
            <span className="hidden min-w-0 flex-col items-end sm:flex">
              <span className="text-[10px] tracking-wider text-[var(--muted)] uppercase">
                下一篇
              </span>
              <span className="truncate text-[13px] text-[var(--muted)] group-hover:text-[var(--foreground)]">
                {next.title}
              </span>
            </span>
            <span className="shrink-0" style={{ color: path.accent }}>
              <Chevron dir="next" />
            </span>
          </Link>
        ) : (
          <Link
            href={`/read/${path.slug}`}
            className="flex flex-1 items-center justify-end gap-2 rounded-xl px-3 py-2 text-right transition-colors hover:bg-[var(--hover-bg)]"
          >
            <span className="flex min-w-0 flex-col items-end">
              <span className="text-[11px] tracking-wide text-[var(--muted)]">本路线读完</span>
              <span className="text-[13px] font-medium" style={{ color: path.accent }}>
                回到目录
              </span>
            </span>
          </Link>
        )}
      </nav>
    </div>
  );
}

function ReadingPathInvite({
  chapters,
  pathname,
}: {
  chapters: readonly ReadingPathChapter[];
  pathname: string;
}) {
  return (
    <div className="print-hidden fixed bottom-4 left-1/2 z-50 w-[min(680px,calc(100vw-1.5rem))] -translate-x-1/2 transition-[bottom] [[data-narration-active]_&]:bottom-24">
      <nav
        aria-label="阅读路线"
        className="flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg)] px-3 py-2 backdrop-blur-md"
        style={{ boxShadow: "var(--card-shadow)" }}
      >
        <p className="text-[11px] tracking-wide text-[var(--muted)]">这篇也在阅读路线里</p>
        {chapters.map((chapter) => (
          <Link
            key={chapter.path.slug}
            href={`${pathname}?path=${chapter.path.slug}&step=${chapter.step}`}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-xl px-2.5 text-[13px] transition-colors hover:bg-[var(--hover-bg)]"
            style={{ color: chapter.path.accent }}
          >
            {chapter.path.title}
            <span className="text-[var(--muted)] tabular-nums">
              {chapter.step}/{chapter.path.steps.length}
            </span>
          </Link>
        ))}
        <Link
          href="/read"
          className="ml-auto text-[11px] tracking-wide text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          全部路线
        </Link>
      </nav>
    </div>
  );
}

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
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
      {dir === "prev" ? <path d="M10 3L5 8l5 5" /> : <path d="M6 3l5 5-5 5" />}
    </svg>
  );
}
