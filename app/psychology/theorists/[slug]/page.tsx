import { notFound } from "next/navigation";
import Link from "next/link";
import { getTheoristBySlug, getTheoristSlugs, getAllTheorists } from "@/subjects/psychology/lib/mdx";
import { ERA_COLORS } from "@/subjects/psychology/lib/constants";
import { SITE_URL } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { MaslowHierarchy } from "@/subjects/psychology/components/visualizations/MaslowHierarchy";

export function generateStaticParams() {
  return getTheoristSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theorist = getTheoristBySlug(slug);
  if (!theorist) notFound();
  const description = `${theorist.school}。${theorist.tags.join("、")}`;
  return {
    title: `${theorist.title} — 心理学`,
    description,
    openGraph: { title: `${theorist.title} — 心理学`, description },
  };
}

export default async function TheoristDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theorist = getTheoristBySlug(slug);
  if (!theorist) notFound();

  const eraColor = ERA_COLORS[theorist.era] || "#9b7dc4";
  const allTheorists = getAllTheorists();
  const related = allTheorists
    .filter((t) => t.slug !== slug && (t.era === theorist.era || t.school === theorist.school))
    .slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(theorist.content.replace(/\s/g, "").length / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link
        href="/psychology/theorists"
        className="text-fg-muted hover:text-accent-purple mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors"
      >
        ← 返回理论家
      </Link>

      <header className="border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: eraColor }}
        />
        <div className="relative">
          <div className="mb-3 flex items-center gap-4">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ borderColor: `${eraColor}50`, color: eraColor }}
            >
              {theorist.era}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              {theorist.years}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>
          <h1 className="font-display text-fg-primary mb-2 text-[2rem] font-semibold leading-tight tracking-tight md:text-[2.8rem]">
            {theorist.title}
          </h1>
          <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">
            {theorist.name_en}
          </p>
          <p className="text-fg-secondary mt-3 text-sm">{theorist.school}</p>
          {theorist.key_contributions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {theorist.key_contributions.map((c) => (
                <span
                  key={c}
                  className="border-fg-disabled/30 text-fg-secondary border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {theorist.tags.map((tag) => (
              <span
                key={tag}
                className="border-fg-disabled/30 text-fg-secondary border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 max-w-[1200px] flex-1">
          {slug === "abraham-maslow" && <MaslowHierarchy />}
          <MarkdownRenderer content={theorist.content} accentColor={eraColor} />
        </article>
        <aside className="w-full flex-shrink-0 lg:w-80">
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">
              理论家信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">时代</dt>
                <dd className="text-fg-primary mt-0.5">{theorist.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">学派</dt>
                <dd className="text-fg-primary mt-0.5">{theorist.school}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">生卒年</dt>
                <dd className="text-fg-primary mt-0.5">{theorist.years}</dd>
              </div>
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                相关理论家
              </h3>
              <div className="space-y-2">
                {related.map((t) => {
                  const color = ERA_COLORS[t.era] || "#9b7dc4";
                  return (
                    <Link
                      key={t.slug}
                      href={`/psychology/theorists/${t.slug}`}
                      className="group flex items-center gap-2 transition-colors"
                    >
                      <div className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70" style={{ backgroundColor: color }} />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">
                        {t.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
