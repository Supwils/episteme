import { notFound } from "next/navigation";
import Link from "next/link";
import { getDebateBySlug, getDebateSlugs, getAllDebates } from "@/subjects/economics/lib/mdx";
import { ERA_COLORS } from "@/subjects/economics/lib/constants";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Breadcrumb from "@/components/Breadcrumb";

export function generateStaticParams() {
  return getDebateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const debate = getDebateBySlug(slug);
  if (!debate) notFound();
  return { title: `${debate.title} — 经济学辩论`, description: `${debate.sides.join(" vs ")}` };
}

export default async function DebateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const debate = getDebateBySlug(slug);
  if (!debate) notFound();

  const accent = ERA_COLORS[debate.era] ?? "#c8a45a";
  const allDebates = getAllDebates();
  const currentIndex = allDebates.findIndex((d) => d.slug === slug);
  const prev = currentIndex > 0 ? allDebates[currentIndex - 1] : null;
  const next = currentIndex < allDebates.length - 1 ? allDebates[currentIndex + 1] : null;
  const related = allDebates.filter((d) => d.slug !== slug && (d.era === debate.era || debate.related.includes(d.slug))).slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(debate.content.replace(/\s/g, "").length / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link href="/economics/debates" className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors">← 返回辩论列表</Link>
      <Breadcrumb
        items={[
          { label: "经济学", href: "/economics" },
          { label: "辩论", href: "/economics/debates" },
          { label: debate.title },
        ]}
      />
      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: accent }} />
        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] uppercase" style={{ borderColor: `${accent}40`, color: accent }}>{debate.era}</span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>
          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">{debate.title}</h1>
          {debate.title_en && <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">{debate.title_en}</p>}
          {debate.sides.length >= 2 && (
            <div className="mt-4 flex items-center gap-4">
              <span className="text-accent-copper font-display text-base font-semibold">{debate.sides[0]}</span>
              <span className="text-fg-disabled font-mono text-sm">vs</span>
              <span className="text-accent-green font-display text-base font-semibold">{debate.sides[1]}</span>
            </div>
          )}
          {debate.key_figures.length > 0 && <p className="text-fg-secondary mt-3">关键人物：{debate.key_figures.join("、")}</p>}
        </div>
      </header>
      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 flex-1 max-w-[900px]">
          <MarkdownRenderer content={debate.content} accentColor="#c8a45a" />
        </article>
        <aside className="w-full flex-shrink-0 lg:w-80">
          <TableOfContents accentColor="#e8b84a" />
          {related.length > 0 && (
            <div className="border-border-faint border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">相关辩论</h3>
              <div className="space-y-2">
                {related.map((d) => <Link key={d.slug} href={`/economics/debates/${d.slug}`} className="group flex items-center gap-2 transition-colors"><div className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70" style={{ backgroundColor: ERA_COLORS[d.era] ?? "#c8a45a" }} /><span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">{d.title}</span></Link>)}
              </div>
            </div>
          )}
        </aside>
      </div>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prev ? (
          <Link
            href={`/economics/debates/${prev.slug}`}
            className="group flex flex-1 flex-col gap-1 border border-border-faint p-4 transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">← 上一场</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {prev.title}
            </span>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link
            href={`/economics/debates/${next.slug}`}
            className="group flex flex-1 flex-col items-end gap-1 border border-border-faint p-4 text-right transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">下一场 →</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {next.title}
            </span>
          </Link>
        ) : <div className="flex-1" />}
      </nav>
    </div>
  );
}
