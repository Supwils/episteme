import { notFound } from "next/navigation";
import Link from "next/link";
import { getSchoolBySlug, getSchoolSlugs, getAllSchools } from "@/subjects/economics/lib/mdx";
import { ERA_COLORS } from "@/subjects/economics/lib/constants";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Breadcrumb from "@/components/Breadcrumb";

export function generateStaticParams() {
  return getSchoolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();
  return { title: `${school.title} — 经济学派`, description: `${school.title}（${school.title_en}）· ${school.period}` };
}

export default async function SchoolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();

  const accent = ERA_COLORS[school.era] ?? "#c8a45a";
  const allSchools = getAllSchools();
  const currentIndex = allSchools.findIndex((s) => s.slug === slug);
  const prev = currentIndex > 0 ? allSchools[currentIndex - 1] : null;
  const next = currentIndex < allSchools.length - 1 ? allSchools[currentIndex + 1] : null;
  const related = allSchools.filter((s) => s.slug !== slug && (s.era === school.era || s.key_figures?.some((f) => school.key_figures.includes(f)))).slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(school.content.replace(/\s/g, "").length / 400));

  return (
    <div className="mx-auto w-full max-w-[1800px] px-6 py-12 sm:px-10 lg:px-16">
      <Link href="/economics/schools" className="text-fg-muted hover:text-accent-gold mb-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors">← 返回学派列表</Link>
      <Breadcrumb
        items={[
          { label: "经济学", href: "/economics" },
          { label: "学派", href: "/economics/schools" },
          { label: school.title },
        ]}
      />
      <header className="relative mb-10 py-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: accent }}>{school.era}</span>
          <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">{school.period}</span>
          <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
        </div>
        <h1 className="font-display text-fg-primary text-[2.2rem] leading-tight tracking-tight md:text-[2.8rem]">{school.title}</h1>
        {school.title_en && <p className="text-fg-muted mt-2 font-display text-lg italic tracking-wide opacity-70">{school.title_en}</p>}
        {school.founder && <p className="text-fg-secondary mt-3 text-base">创始人：<span className="text-fg-primary font-medium">{school.founder}</span></p>}
        {school.key_figures.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {school.key_figures.map((name) => <span key={name} className="border-fg-disabled/30 text-fg-muted rounded-none border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]">{name}</span>)}
          </div>
        )}
      </header>
      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 max-w-[900px] flex-1">
          <MarkdownRenderer content={school.content} accentColor="#61afef" />
        </article>
        <aside className="w-full flex-shrink-0 lg:w-80">
          <TableOfContents accentColor="#e8b84a" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">学派信息</h3>
            <dl className="space-y-3 text-sm">
              <div><dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">时代</dt><dd className="text-fg-primary mt-0.5">{school.era}</dd></div>
              <div><dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">时期</dt><dd className="text-fg-primary mt-0.5">{school.period}</dd></div>
              {school.founder && <div><dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">创始人</dt><dd className="text-fg-primary mt-0.5">{school.founder}</dd></div>}
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">相关学派</h3>
              <div className="space-y-2">
                {related.map((s) => <Link key={s.slug} href={`/economics/schools/${s.slug}`} className="group flex items-center gap-2 transition-colors"><div className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70" style={{ backgroundColor: ERA_COLORS[s.era] ?? "#c8a45a" }} /><span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">{s.title}</span></Link>)}
              </div>
            </div>
          )}
        </aside>
      </div>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prev ? (
          <Link
            href={`/economics/schools/${prev.slug}`}
            className="group flex flex-1 flex-col gap-1 border border-border-faint p-4 transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">← 上一派</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {prev.title}
            </span>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link
            href={`/economics/schools/${next.slug}`}
            className="group flex flex-1 flex-col items-end gap-1 border border-border-faint p-4 text-right transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">下一派 →</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {next.title}
            </span>
          </Link>
        ) : <div className="flex-1" />}
      </nav>
    </div>
  );
}
