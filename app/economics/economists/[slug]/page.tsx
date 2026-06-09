import { notFound } from "next/navigation";
import Link from "next/link";
import { getEconomistBySlug, getEconomistSlugs, getAllEconomists } from "@/subjects/economics/lib/mdx";
import { ERA_COLORS } from "@/subjects/economics/lib/constants";
import { TableOfContents } from "@/components/TableOfContents";
import RelatedContent from "@/components/RelatedContent";
import Breadcrumb from "@/components/Breadcrumb";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export function generateStaticParams() {
  return getEconomistSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const economist = getEconomistBySlug(slug);
  if (!economist) notFound();
  return {
    title: `${economist.title} — 经济学家`,
    description: `${economist.title}（${economist.name_en}）：${economist.school}。${economist.tags.join("、")}`,
  };
}

export default async function EconomistDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const economist = getEconomistBySlug(slug);
  if (!economist) notFound();

  const allEconomists = getAllEconomists();
  const currentIndex = allEconomists.findIndex((e) => e.slug === slug);
  const prev = currentIndex > 0 ? allEconomists[currentIndex - 1] : null;
  const next = currentIndex < allEconomists.length - 1 ? allEconomists[currentIndex + 1] : null;

  const related = allEconomists
    .filter(
      (e) =>
        e.slug !== slug &&
        (e.era === economist.era || e.school === economist.school || economist.related.includes(e.slug))
    )
    .slice(0, 4);

  const accent = ERA_COLORS[economist.era] ?? "#c8a45a";
  const wordCount = economist.content.length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link
        href="/economics/economists"
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回经济学家
      </Link>

      <Breadcrumb
        items={[
          { label: "经济学", href: "/economics" },
          { label: "经济学家", href: "/economics/economists" },
          { label: economist.title },
        ]}
      />

      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: accent }}
        />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            <span
              className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ borderColor: `${accent}30`, color: accent, backgroundColor: `${accent}10` }}
            >
              {economist.era}
            </span>
            {economist.nobel && (
              <span className="badge-nobel">诺贝尔奖</span>
            )}
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              {economist.years} · 约 {readMinutes} 分钟阅读
            </span>
          </div>

          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">
            {economist.title}
          </h1>
          <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">
            {economist.name_en}
          </p>

          <p className="text-fg-secondary mt-3">{economist.school}</p>

          {economist.key_contributions.length > 0 && (
            <div className="mt-4">
              <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                主要贡献
              </p>
              <ul className="list-disc list-inside text-fg-secondary text-sm space-y-1">
                {economist.key_contributions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {economist.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {economist.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.12em]"
                  style={{ borderColor: `${accent}20`, color: `${accent}cc`, backgroundColor: `${accent}08` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 flex-1 max-w-[900px]">
          <MarkdownRenderer content={economist.content} accentColor="#e8b84a" />
          <RelatedContent slug={slug} domain="economics" entityId={slug} />
        </article>

        <aside className="w-full flex-shrink-0 lg:w-80 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents accentColor="#e8b84a" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              经济学家信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">时代</dt>
                <dd className="text-fg-primary mt-0.5">{economist.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">学派</dt>
                <dd className="text-fg-primary mt-0.5">{economist.school}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">生卒年</dt>
                <dd className="text-fg-primary mt-0.5">{economist.years}</dd>
              </div>
            </dl>
          </div>

          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关经济学家
              </h3>
              <div className="space-y-2">
                {related.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/economics/economists/${e.slug}`}
                    className="group flex items-center gap-2 transition-colors"
                  >
                    <div
                      className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                      style={{ backgroundColor: ERA_COLORS[e.era] ?? "#c8a45a" }}
                    />
                    <span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">
                      {e.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prev ? (
          <Link
            href={`/economics/economists/${prev.slug}`}
            className="group flex flex-1 flex-col gap-1 border border-border-faint p-4 transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">← 上一位</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {prev.title}
            </span>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link
            href={`/economics/economists/${next.slug}`}
            className="group flex flex-1 flex-col items-end gap-1 border border-border-faint p-4 text-right transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">下一位 →</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {next.title}
            </span>
          </Link>
        ) : <div className="flex-1" />}
      </nav>
    </div>
  );
}
