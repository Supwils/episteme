import { notFound } from "next/navigation";
import Link from "next/link";
import { getTheoryBySlug, getTheorySlugs, getAllTheories } from "@/subjects/economics/lib/mdx";
import { CATEGORY_COLORS } from "@/subjects/economics/lib/constants";
import { TableOfContents } from "@/components/TableOfContents";
import RelatedContent from "@/components/RelatedContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Breadcrumb from "@/components/Breadcrumb";

export function generateStaticParams() {
  return getTheorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theory = getTheoryBySlug(slug);
  if (!theory) notFound();
  return {
    title: `${theory.title} — 经济理论`,
    description: `${theory.title}（${theory.title_en}）：${theory.key_figures.join("、")}`,
  };
}

export default async function TheoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theory = getTheoryBySlug(slug);
  if (!theory) notFound();

  const allTheories = getAllTheories();
  const currentIndex = allTheories.findIndex((t) => t.slug === slug);
  const prev = currentIndex > 0 ? allTheories[currentIndex - 1] : null;
  const next = currentIndex < allTheories.length - 1 ? allTheories[currentIndex + 1] : null;

  const accent = CATEGORY_COLORS[theory.category] ?? "#c8a45a";

  const related = allTheories
    .filter((t) => t.slug !== slug && (t.category === theory.category || theory.related.includes(t.slug)))
    .slice(0, 4);

  const readMinutes = Math.max(1, Math.ceil(theory.content.replace(/\s/g, "").length / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link href="/economics/theories" className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors">
        ← 返回理论列表
      </Link>

      <Breadcrumb
        items={[
          { label: "经济学", href: "/economics" },
          { label: "经济理论", href: "/economics/theories" },
          { label: theory.title },
        ]}
      />

      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: accent }} />
        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase" style={{ borderColor: `${accent}50`, color: accent }}>
              {theory.category}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">{theory.period}</span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>
          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">{theory.title}</h1>
          <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">{theory.title_en}</p>
          {theory.key_figures.length > 0 && (
            <p className="text-fg-secondary mt-3">代表人物：{theory.key_figures.join("、")}</p>
          )}
          {theory.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {theory.tags.map((tag) => (
                <span key={tag} className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.12em]" style={{ borderColor: `${accent}20`, color: `${accent}cc`, backgroundColor: `${accent}08` }}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 flex-1 max-w-[900px]">
          <MarkdownRenderer content={theory.content} accentColor="#61afef" />
        </article>
        <aside className="w-full flex-shrink-0 lg:w-80">
          <TableOfContents accentColor="#e8b84a" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">理论信息</h3>
            <dl className="space-y-3 text-sm">
              <div><dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">分类</dt><dd className="text-fg-primary mt-0.5">{theory.category}</dd></div>
              <div><dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">时期</dt><dd className="text-fg-primary mt-0.5">{theory.period}</dd></div>
              {theory.key_figures.length > 0 && <div><dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">代表人物</dt><dd className="text-fg-primary mt-0.5">{theory.key_figures.join("、")}</dd></div>}
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">相关理论</h3>
              <div className="space-y-2">
                {related.map((t) => (
                  <Link key={t.slug} href={`/economics/theories/${t.slug}`} className="group flex items-center gap-2 transition-colors">
                    <div className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70" style={{ backgroundColor: CATEGORY_COLORS[t.category] ?? "#c8a45a" }} />
                    <span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">{t.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prev ? <Link href={`/economics/theories/${prev.slug}`} className="group flex flex-1 flex-col gap-1 border border-border-faint p-4 transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"><span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">← 上一篇</span><span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">{prev.title}</span></Link> : <div className="flex-1" />}
        {next ? <Link href={`/economics/theories/${next.slug}`} className="group flex flex-1 flex-col items-end gap-1 border border-border-faint p-4 text-right transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"><span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">下一篇 →</span><span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">{next.title}</span></Link> : <div className="flex-1" />}
      </nav>
    </div>
  );
}
