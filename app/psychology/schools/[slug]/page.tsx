import { notFound } from "next/navigation";
import Link from "next/link";
import { getSchoolBySlug, getSchoolSlugs, getAllSchools } from "@/subjects/psychology/lib/mdx";
import { ERA_COLORS } from "@/subjects/psychology/lib/constants";
import { SITE_URL } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  return getSchoolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();
  const description = school.founder ? `${school.founder}：${school.title}` : school.title;
  return {
    title: `${school.title} — 心理学流派`,
    description,
    openGraph: { title: `${school.title} — 心理学流派`, description },
  };
}

export default async function SchoolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();

  const eraColor = ERA_COLORS[school.era] || "#9b7dc4";
  const allSchools = getAllSchools();
  const related = allSchools
    .filter((s) => s.slug !== slug && s.era === school.era)
    .slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(school.content.replace(/\s/g, "").length / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link href="/psychology/schools" className="text-fg-muted hover:text-accent-purple mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors">
        ← 返回流派列表
      </Link>

      <header className="relative mb-10 py-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: eraColor }}>
            {school.era}
          </span>
          {school.period && (
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">{school.period}</span>
          )}
          <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
        </div>
        <h1 className="font-display text-fg-primary text-[2.2rem] leading-tight tracking-tight md:text-[2.8rem]">
          {school.title}
        </h1>
        {school.founder && (
          <p className="text-fg-secondary mt-3 text-base">
            创始人：<span className="text-fg-primary font-medium">{school.founder}</span>
          </p>
        )}
        {school.key_figures.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {school.key_figures.map((name) => (
              <span key={name} className="border-fg-disabled/30 text-fg-muted rounded-none border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]">{name}</span>
            ))}
          </div>
        )}
        {school.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {school.tags.map((tag) => (
              <span key={tag} className="border-fg-disabled/20 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em]">{tag}</span>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 max-w-[1200px] flex-1">
          <MarkdownRenderer content={school.content} />
        </article>
        <aside className="w-full flex-shrink-0 lg:w-80">
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">流派信息</h3>
            <dl className="space-y-3 text-sm">
              {school.founder && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">创始人</dt>
                  <dd className="text-fg-primary mt-0.5">{school.founder}</dd>
                </div>
              )}
              {school.period && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">时期</dt>
                  <dd className="text-fg-primary mt-0.5">{school.period}</dd>
                </div>
              )}
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">时代</dt>
                <dd className="text-fg-primary mt-0.5">{school.era}</dd>
              </div>
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">相关流派</h3>
              <div className="space-y-2">
                {related.map((s) => {
                  const color = ERA_COLORS[s.era] || "#9b7dc4";
                  return (
                    <Link key={s.slug} href={`/psychology/schools/${s.slug}`} className="group flex items-center gap-2 transition-colors">
                      <div className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70" style={{ backgroundColor: color }} />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">{s.title}</span>
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
