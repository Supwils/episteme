import { notFound } from "next/navigation";
import Link from "next/link";
import { getDisorderBySlug, getDisorderSlugs, getAllDisorders } from "@/src-psychology/lib/mdx";
import { DISORDER_CATEGORY_COLORS } from "@/src-psychology/lib/constants";
import { SITE_URL } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  return getDisorderSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const disorder = getDisorderBySlug(slug);
  if (!disorder) notFound();
  const description = `${disorder.category}：${disorder.title_en}`;
  return {
    title: `${disorder.title} — 心理障碍`,
    description,
    openGraph: { title: `${disorder.title} — 心理障碍`, description },
  };
}

export default async function DisorderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const disorder = getDisorderBySlug(slug);
  if (!disorder) notFound();

  const catColor = DISORDER_CATEGORY_COLORS[disorder.category] || "#d4789c";
  const allDisorders = getAllDisorders();
  const related = allDisorders
    .filter((d) => d.slug !== slug && d.category === disorder.category)
    .slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(disorder.content.replace(/\s/g, "").length / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link href="/psychology/disorders" className="text-fg-muted hover:text-accent-purple mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors">
        ← 返回心理障碍
      </Link>

      <header className="border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8 backdrop-blur-md">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: catColor }} />
        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.32em]" style={{ borderColor: `${catColor}50`, color: catColor }}>
              {disorder.category}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              {disorder.dsm_code}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>
          <h1 className="font-display text-fg-primary mb-2 text-[2rem] font-semibold leading-tight tracking-tight md:text-[2.8rem]">
            {disorder.title}
          </h1>
          <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">
            {disorder.title_en}
          </p>
          {disorder.key_symptoms.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {disorder.key_symptoms.map((s) => (
                <span key={s} className="border-fg-disabled/30 text-fg-secondary border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]">{s}</span>
              ))}
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {disorder.tags.map((tag) => (
              <span key={tag} className="border-fg-disabled/30 text-fg-secondary border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em]">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 max-w-[1200px] flex-1">
          <MarkdownRenderer content={disorder.content} accentColor={catColor} />
        </article>
        <aside className="w-full flex-shrink-0 lg:w-80">
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">障碍信息</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">分类</dt>
                <dd className="text-fg-primary mt-0.5">{disorder.category}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">DSM编码</dt>
                <dd className="text-fg-primary mt-0.5">{disorder.dsm_code}</dd>
              </div>
              {disorder.key_symptoms.length > 0 && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">核心症状</dt>
                  <dd className="text-fg-primary mt-0.5">{disorder.key_symptoms.join("、")}</dd>
                </div>
              )}
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">相关障碍</h3>
              <div className="space-y-2">
                {related.map((d) => {
                  const color = DISORDER_CATEGORY_COLORS[d.category] || "#d4789c";
                  return (
                    <Link key={d.slug} href={`/psychology/disorders/${d.slug}`} className="group flex items-center gap-2 transition-colors">
                      <div className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70" style={{ backgroundColor: color }} />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">{d.title}</span>
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
