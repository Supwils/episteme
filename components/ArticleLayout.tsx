import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/components/ui/utils/cn";
import { ArticleExits } from "@/components/article/ArticleExits";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { AskThisArticle } from "@/components/AskThisArticle";
import { ArticleTakeaway } from "@/components/ArticleTakeaway";
import { Backlinks } from "@/components/Backlinks";
import { ReadingModeControls } from "@/components/ReadingModeControls";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { DomainHeroMotif } from "@/components/domain/DomainHeroMotif";
import { deriveAskPrompts, deriveTakeaway } from "@/lib/article-discovery";
import { readingMinutes } from "@/lib/reading-time";

/** Article + sticky sidebar. Wide screens center the pair so every subject
 *  shares one reading column instead of hugging the left edge. Title lives
 *  inside the same column as the body (not a full-bleed header). */
export const ARTICLE_BODY_ROW_CLASS =
  "flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-center";

export const ARTICLE_SURFACE_BASE_CLASS =
  "article-reading-surface min-w-0 flex-1 transition-[max-width] duration-300";

/** Default reading column: ~38 CJK chars/line at the 17px prose size. */
export const ARTICLE_SURFACE_CLASS = `${ARTICLE_SURFACE_BASE_CLASS} max-w-[40rem]`;

/** Title card inside the reading column. Custom shells should reuse this so
 *  h1 inset matches DomainArticle / FrontierArticleView. */
export const ARTICLE_HEADER_CLASS =
  "border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8";

interface PrevNextLink {
  href: string;
  title: string;
}

interface ArticleLayoutProps {
  /** Full back-link text including any arrow, e.g. "← 返回概念列表". */
  backLabel: string;
  backHref: string;
  /**
   * This article's own path, e.g. `/economics/concepts/scarcity`. Required (not
   * derived from the pathname) so the ~275 KB backlink index is read on the
   * server instead of being shipped to the browser — and so a page that forgets
   * it fails to compile rather than silently losing its backlinks.
   */
  url: string;
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
  /** Short plain-text summary rendered under the title (frontier excerpt). */
  lede?: string;
  /**
   * Optional one-sentence takeaway. When omitted, derived from a 破除误解
   * section when present (T-READ-08).
   */
  takeaway?: string;
  tags?: readonly string[];
  /** The article body, rendered inside <article>. */
  children: ReactNode;
  /** Contents of the sticky sidebar (TOC + info cards). */
  sidebar: ReactNode;
  prev?: PrevNextLink | null;
  next?: PrevNextLink | null;
  prevLabel?: string;
  nextLabel?: string;
  /**
   * Overrides the article column max width. Defaults to `max-w-[40rem]`
   * (~38 CJK chars/line at the 17px prose size); the
   * focus/spacious reading modes narrow/widen it further via globals.css.
   */
  articleClassName?: string;
  /** Extra spacing class for the sidebar's inner wrapper. */
  sidebarClassName?: string;
  /** Engine domain id — paints a static watermark motif when the domain has one. */
  domain?: string;
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
  url,
  breadcrumb,
  accent,
  eyebrow,
  eyebrowMeta,
  title,
  titleEn,
  content,
  meta,
  lede,
  takeaway: takeawayProp,
  tags,
  children,
  sidebar,
  prev,
  next,
  prevLabel = "上一篇",
  nextLabel = "下一篇",
  articleClassName = "max-w-[40rem]",
  sidebarClassName,
  domain,
}: ArticleLayoutProps) {
  const readMinutes = readingMinutes(content);
  const takeaway = deriveTakeaway(content, takeawayProp);
  const askPrompts = deriveAskPrompts(content);

  return (
    <div className="mx-auto w-full max-w-[1800px] px-6 py-12 sm:px-10 lg:px-16">
      <ReadingProgressBar />
      <Link
        href={backHref}
        className="text-fg-secondary hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        {backLabel}
      </Link>

      {breadcrumb}

      <div className={ARTICLE_BODY_ROW_CLASS}>
        <article className={cn(ARTICLE_SURFACE_BASE_CLASS, articleClassName)}>
          <header className={cn(ARTICLE_HEADER_CLASS, "article-header")}>
            {domain ? (
              <DomainHeroMotif domain={domain} accent={accent} variant="watermark" draw />
            ) : null}
            <span
              aria-hidden="true"
              className="article-header__rule"
              style={{ background: accent }}
            />
            <div className="relative">
              <div className="article-header__enter mb-3 flex flex-wrap items-center gap-3">
                <span
                  className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase"
                  style={{
                    borderColor: `${accent}50`,
                    color: `color-mix(in oklab, ${accent} 42%, var(--color-fg-primary))`,
                  }}
                >
                  {eyebrow}
                </span>
                {eyebrowMeta?.map((m) => (
                  <span key={m} className="text-fg-muted font-mono text-[10px] tracking-[0.22em]">
                    {m}
                  </span>
                ))}
                <span className="text-fg-muted font-mono text-[10px] tracking-[0.22em]">
                  约 {readMinutes} 分钟阅读
                </span>
                <span className="ml-auto">
                  <ReadingModeControls />
                </span>
              </div>
              <h1 className="article-header__enter font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">
                {title}
              </h1>
              {titleEn && (
                <p className="article-header__enter text-fg-muted font-display text-lg tracking-wide italic">
                  {titleEn}
                </p>
              )}
              {meta && <div className="text-fg-secondary mt-3">{meta}</div>}
              {lede && (
                <p className="text-fg-secondary mt-3 line-clamp-3 text-[1.0625rem] leading-relaxed">
                  {lede}
                </p>
              )}
              {tags && tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.12em]"
                      style={{
                        borderColor: `${accent}20`,
                        color: `color-mix(in oklab, ${accent} 42%, var(--color-fg-primary))`,
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
          <AskThisArticle prompts={askPrompts} accent={accent} />
          {children}
          {takeaway ? <ArticleTakeaway text={takeaway} accent={accent} /> : null}
        </article>
        <ArticleSidebar contentClassName={sidebarClassName}>{sidebar}</ArticleSidebar>
      </div>

      <Backlinks url={url} />

      <ArticleExits
        url={url}
        content={content}
        next={next}
        prev={prev}
        nextLabel={nextLabel}
        prevLabel={prevLabel}
      />
    </div>
  );
}
