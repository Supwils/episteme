import { notFound } from "next/navigation";
import Link from "next/link";
import { getPhenomenonBySlug, getPhenomenonSlugs, getAllPhenomena } from "@/subjects/psychology/lib/mdx";
import { CATEGORY_COLORS } from "@/subjects/psychology/lib/constants";
import { SITE_URL } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import AttachmentStyles from "@/subjects/psychology/components/visualizations/AttachmentStyles";

export function generateStaticParams() {
  return getPhenomenonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const phenomenon = getPhenomenonBySlug(slug);
  if (!phenomenon) notFound();
  const description = `${phenomenon.category}：${phenomenon.key_figures.join("、")}`;
  return {
    title: `${phenomenon.title} — 心理现象`,
    description,
    openGraph: { title: `${phenomenon.title} — 心理现象`, description },
  };
}

export default async function PhenomenonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const phenomenon = getPhenomenonBySlug(slug);
  if (!phenomenon) notFound();

  const catColor = CATEGORY_COLORS[phenomenon.category] || "#d4789c";
  const allPhenomena = getAllPhenomena();
  const related = allPhenomena
    .filter((p) => p.slug !== slug && (p.category === phenomenon.category || p.key_figures.some((f) => phenomenon.key_figures.includes(f))))
    .slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(phenomenon.content.replace(/\s/g, "").length / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link href="/psychology/phenomena" className="text-fg-muted hover:text-accent-purple mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors">
        ← 返回心理现象
      </Link>

      <header className="border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8 backdrop-blur-md">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: catColor }} />
        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.32em]" style={{ borderColor: `${catColor}50`, color: catColor }}>
              {phenomenon.category}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>
          <h1 className="font-display text-fg-primary mb-2 text-[2rem] font-semibold leading-tight tracking-tight md:text-[2.8rem]">
            {phenomenon.title}
          </h1>
          <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">
            {phenomenon.title_en}
          </p>
          {phenomenon.key_figures.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {phenomenon.key_figures.map((fig) => (
                <span key={fig} className="border-fg-disabled/30 text-fg-secondary border px-3 py-1 font-mono text-[10px] tracking-[0.18em]">{fig}</span>
              ))}
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {phenomenon.tags.map((tag) => (
              <span key={tag} className="border-fg-disabled/30 text-fg-secondary border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em]">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      {slug === "attachment-styles" && (
        <div className="mb-12">
          <AttachmentStyles />
        </div>
      )}

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 max-w-[1200px] flex-1">
          <MarkdownRenderer content={phenomenon.content} accentColor={catColor} />
        </article>
        <aside className="w-full flex-shrink-0 lg:w-80 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">现象信息</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">类别</dt>
                <dd className="text-fg-primary mt-0.5">{phenomenon.category}</dd>
              </div>
              {phenomenon.key_figures.length > 0 && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">关键人物</dt>
                  <dd className="text-fg-primary mt-0.5">{phenomenon.key_figures.join("、")}</dd>
                </div>
              )}
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">相关现象</h3>
              <div className="space-y-2">
                {related.map((p) => {
                  const color = CATEGORY_COLORS[p.category] || "#d4789c";
                  return (
                    <Link key={p.slug} href={`/psychology/phenomena/${p.slug}`} className="group flex items-center gap-2 transition-colors">
                      <div className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70" style={{ backgroundColor: color }} />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">{p.title}</span>
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
