import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/components/ui/utils/cn";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { readingMinutes } from "@/lib/reading-time";

interface PrevNextLink {
  href: string;
  title: string;
}

interface ArticleLayoutProps {
  /** Full back-link text including any arrow, e.g. "← 返回概念列表". */
  backLabel: string;
  backHref: string;
  /** A <Breadcrumb> element — passed as a slot so each domain keeps its API. */
  breadcrumb?: ReactNode;
  /** Accent hex used for the header glow, eyebrow border and tag pills. */
  accent: string;
  /** Small uppercase label shown before the reading time (category/field). */
  eyebrow: string;
  /** Secondary mono labels shown after the eyebrow badge (period, region…). */
  eyebrowMeta?: readonly string[];
  title: string;
  titleEn?: string;
  /** Raw article text — reading time is derived from it. */
  content: string;
  /** Page-specific header content under the title (kept verbatim per type). */
  meta?: ReactNode;
  tags?: readonly string[];
  /** The article body, rendered inside <article>. */
  children: ReactNode;
  /** Contents of the sticky sidebar (TOC + info cards). */
  sidebar: ReactNode;
  prev?: PrevNextLink | null;
  next?: PrevNextLink | null;
  prevLabel?: string;
  nextLabel?: string;
  /** Overrides the article column max width. Defaults to a wide measure. */
  articleClassName?: string;
  /** Extra spacing class for the sidebar's inner wrapper. */
  sidebarClassName?: string;
}

/**
 * The shared shell for every knowledge detail page: back link, breadcrumb,
 * header card, the two-column article + sticky sidebar row, and prev/next nav.
 * Extracted from ~29 detail pages that had copy-pasted (and slowly drifted)
 * this same skeleton. Page-specific markup lives in the `children` (article
 * body) and `sidebar` slots; the header is data-driven via props.
 */
export function ArticleLayout({
  backLabel,
  backHref,
  breadcrumb,
  accent,
  eyebrow,
  eyebrowMeta,
  title,
  titleEn,
  content,
  meta,
  tags,
  children,
  sidebar,
  prev,
  next,
  prevLabel = "上一篇",
  nextLabel = "下一篇",
  articleClassName = "max-w-[1200px]",
  sidebarClassName,
}: ArticleLayoutProps) {
  const readMinutes = readingMinutes(content);

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link
        href={backHref}
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        {backLabel}
      </Link>

      {breadcrumb}

      <header className="border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: accent }}
        />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase"
              style={{ borderColor: `${accent}50`, color: accent }}
            >
              {eyebrow}
            </span>
            {eyebrowMeta?.map((m) => (
              <span key={m} className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                {m}
              </span>
            ))}
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              约 {readMinutes} 分钟阅读
            </span>
          </div>
          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">
            {title}
          </h1>
          {titleEn && (
            <p className="text-fg-muted font-display text-lg tracking-wide italic opacity-70">
              {titleEn}
            </p>
          )}
          {meta && <div className="text-fg-secondary mt-3">{meta}</div>}
          {tags && tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.12em]"
                  style={{
                    borderColor: `${accent}20`,
                    color: `${accent}cc`,
                    backgroundColor: `${accent}08`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className={cn("min-w-0 flex-1", articleClassName)}>{children}</article>
        <ArticleSidebar contentClassName={sidebarClassName}>{sidebar}</ArticleSidebar>
      </div>

      {(prev || next) && (
        <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
          {prev ? (
            <Link
              href={prev.href}
              className="group border-border-faint hover:border-fg-disabled/30 hover:bg-bg-panel flex flex-1 flex-col gap-1 border p-4 transition-all duration-300"
            >
              <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
                ← {prevLabel}
              </span>
              <span className="font-display text-fg-secondary group-hover:text-accent-gold text-sm font-medium transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={next.href}
              className="group border-border-faint hover:border-fg-disabled/30 hover:bg-bg-panel flex flex-1 flex-col items-end gap-1 border p-4 text-right transition-all duration-300"
            >
              <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
                {nextLabel} →
              </span>
              <span className="font-display text-fg-secondary group-hover:text-accent-gold text-sm font-medium transition-colors">
                {next.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      )}
    </div>
  );
}
