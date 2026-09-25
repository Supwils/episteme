import type { Metadata } from "next";
import Link from "next/link";
import SEARCH_STATS from "@/generated/search-stats.json";
import { searchEverything } from "@/lib/search/server";
import { DOMAINS } from "@/lib/data";
import {
  SEARCH_NO_RESULTS_EXITS,
  SECTION_META,
  TYPE_LABELS,
  type Section,
} from "@/components/search/types";
import { isSafeInternalPath } from "@/lib/urls";

// Reads ?q. The homepage's SearchAction schema has always pointed here.
export const dynamic = "force-dynamic";

const MAX_QUERY_LENGTH = 120;

export const metadata: Metadata = {
  title: "搜索 — Episteme · 格致",
  description: `在 ${DOMAINS.length} 个学科的全部文章中检索标题、小标题与正文。`,
  robots: { index: false, follow: true },
};

function sectionLabel(section: string): string {
  return SECTION_META[section as Section]?.label ?? section;
}

function sectionColor(section: string): string | undefined {
  return SECTION_META[section as Section]?.color;
}

function SearchExits() {
  return (
    <>
      <p className="text-fg-secondary mt-6 text-sm">也可以从这些入口继续探索：</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {SEARCH_NO_RESULTS_EXITS.map((exit) => (
          <li key={exit.href}>
            <Link
              href={exit.href}
              className="border-border-subtle text-fg-secondary hover:border-fg-primary hover:text-fg-primary inline-block rounded-full border px-3 py-1 text-sm"
            >
              {exit.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[]; domain?: string | string[] }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  // Match URLSearchParams.get(): repeated keys use their first value.
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = (rawQuery ?? "").slice(0, MAX_QUERY_LENGTH);
  const domain = Array.isArray(params.domain) ? params.domain[0] : params.domain;
  const {
    titleResults: rawTitleResults,
    bodyResults: rawBodyResults,
    facets,
    total,
  } = await searchEverything(query, domain);
  const titleResults = rawTitleResults.filter((result) => isSafeInternalPath(result.url));
  const bodyResults = rawBodyResults.filter((result) => isSafeInternalPath(result.url));

  const href = (nextDomain?: string) =>
    `/search?q=${encodeURIComponent(query)}${nextDomain ? `&domain=${nextDomain}` : ""}`;

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-display text-fg-primary text-3xl font-semibold">搜索</h1>

      <form action="/search" className="mt-6 flex gap-3">
        <label className="sr-only" htmlFor="search-q">
          搜索关键词
        </label>
        <input
          id="search-q"
          name="q"
          type="search"
          defaultValue={query}
          maxLength={MAX_QUERY_LENGTH}
          placeholder="输入标题关键词，或你记得的一句话"
          className="border-border-subtle bg-bg-elevated text-fg-primary placeholder:text-fg-muted focus:border-accent flex-1 rounded-lg border px-4 py-3 outline-none"
        />
        <button
          type="submit"
          className="border-border-subtle text-fg-primary hover:bg-bg-elevated rounded-lg border px-5 py-3"
        >
          搜索
        </button>
      </form>

      {!query && (
        <div className="mt-8" data-testid="search-idle">
          <p className="text-fg-muted">
            标题与小标题即时匹配；正文检索会扫描全部 {SEARCH_STATS.articles} 篇文章的原文。
          </p>
          <SearchExits />
        </div>
      )}

      {query && (
        <>
          <p className="text-fg-muted mt-8" data-testid="search-summary">
            「{query}」共 {total} 条结果
            {domain ? `（已筛选：${sectionLabel(domain)}）` : ""}
          </p>

          {facets.length > 0 && (
            <nav className="mt-4 flex flex-wrap gap-2" aria-label="按学科筛选">
              <Link
                href={href()}
                data-active={!domain}
                className="border-border-subtle text-fg-secondary data-[active=true]:text-fg-primary data-[active=true]:border-fg-primary rounded-full border px-3 py-1 text-sm"
              >
                全部 {facets.reduce((n, f) => n + f.count, 0)}
              </Link>
              {facets.map((facet) => (
                <Link
                  key={facet.section}
                  href={href(facet.section)}
                  data-active={domain === facet.section}
                  style={{
                    color: `color-mix(in oklab, ${sectionColor(facet.section)} 42%, var(--color-fg-primary))`,
                  }}
                  className="border-border-subtle data-[active=true]:border-fg-primary rounded-full border px-3 py-1 text-sm"
                >
                  {sectionLabel(facet.section)} {facet.count}
                </Link>
              ))}
            </nav>
          )}

          {total === 0 && (
            <div className="mt-10" data-testid="search-empty">
              <p className="text-fg-muted">
                没有找到结果。试试更短的关键词，或直接输入你记得的一句原文。
              </p>
              <SearchExits />
            </div>
          )}

          {titleResults.length > 0 && (
            <section className="mt-10" data-testid="title-results">
              <h2 className="text-fg-secondary text-sm font-semibold tracking-wide uppercase">
                标题匹配
              </h2>
              <ul className="mt-4 space-y-4">
                {titleResults.map((result) => (
                  <li key={`${result.kind}:${result.url}`}>
                    <Link href={result.url} className="group block">
                      <span className="text-fg-primary group-hover:text-accent font-medium">
                        {result.title}
                      </span>
                      {result.subtitle && (
                        <span className="text-fg-muted ml-2 text-sm">{result.subtitle}</span>
                      )}
                      <span className="text-fg-muted ml-2 text-xs">
                        {sectionLabel(result.section)}
                        {TYPE_LABELS[result.kind] ? ` · ${TYPE_LABELS[result.kind]}` : ""}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {bodyResults.length > 0 && (
            <section className="mt-12" data-testid="body-results">
              <h2 className="text-fg-secondary text-sm font-semibold tracking-wide uppercase">
                正文中提到
              </h2>
              <ul className="mt-4 space-y-5">
                {bodyResults.map((result) => (
                  <li key={result.url}>
                    <Link href={result.url} className="group block">
                      <span className="text-fg-primary group-hover:text-accent font-medium">
                        {result.title}
                      </span>
                      <span className="text-fg-muted ml-2 text-xs">
                        {sectionLabel(result.section)}
                      </span>
                    </Link>
                    {result.snippet && (
                      <p className="text-fg-secondary mt-1 text-sm leading-relaxed">
                        …
                        {result.matchStart !== undefined &&
                        result.matchStart >= 0 &&
                        result.matchStart < result.snippet.length ? (
                          <>
                            {result.snippet.slice(0, result.matchStart)}
                            <mark className="rounded-sm bg-[var(--highlight-bg)] px-0.5 text-[var(--highlight-text)]">
                              {result.snippet.slice(
                                result.matchStart,
                                result.matchStart + query.length
                              )}
                            </mark>
                            {result.snippet.slice(result.matchStart + query.length)}
                          </>
                        ) : (
                          result.snippet
                        )}
                        …
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </main>
  );
}
