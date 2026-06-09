import { notFound } from "next/navigation";
import Link from "next/link";
import { getConceptBySlug, getConceptSlugs, getAllConcepts } from "@/subjects/economics/lib/mdx";
import { CATEGORY_COLORS } from "@/subjects/economics/lib/constants";
import { TableOfContents } from "@/components/TableOfContents";
import RelatedContent from "@/components/RelatedContent";
import Breadcrumb from "@/components/Breadcrumb";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SupplyDemandChart } from "@/subjects/economics/components/visualizations/SupplyDemandChart";
import { GDPChartSection } from "./GDPChartSection";
import { LorenzCurveSection } from "./LorenzCurveSection";

export function generateStaticParams() {
  return getConceptSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();
  return { title: `${concept.title} — 经济学概念`, description: `${concept.title}（${concept.title_en}）` };
}

export default async function ConceptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();

  const accent = CATEGORY_COLORS[concept.category] ?? "#c8a45a";
  const allConcepts = getAllConcepts();
  const currentIndex = allConcepts.findIndex((c) => c.slug === slug);
  const prev = currentIndex > 0 ? allConcepts[currentIndex - 1] : null;
  const next = currentIndex < allConcepts.length - 1 ? allConcepts[currentIndex + 1] : null;
  const related = allConcepts.filter((c) => c.slug !== slug && (c.category === concept.category || concept.related.includes(c.slug))).slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(concept.content.replace(/\s/g, "").length / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link href="/economics/concepts" className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors">← 返回概念列表</Link>
      <Breadcrumb
        items={[
          { label: "经济学", href: "/economics" },
          { label: "概念", href: "/economics/concepts" },
          { label: concept.title },
        ]}
      />
      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: accent }} />
        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase" style={{ borderColor: `${accent}50`, color: accent }}>{concept.category}</span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>
          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">{concept.title}</h1>
          <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">{concept.title_en}</p>
          {concept.key_figures.length > 0 && <p className="text-fg-secondary mt-3">相关人物：{concept.key_figures.join("、")}</p>}
          {concept.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {concept.tags.map((tag) => <span key={tag} className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.12em]" style={{ borderColor: `${accent}20`, color: `${accent}cc`, backgroundColor: `${accent}08` }}>{tag}</span>)}
            </div>
          )}
        </div>
      </header>
      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 flex-1 max-w-[900px]">
          {slug === "gdp" && <GDPChartSection />}
          {slug === "gini-coefficient" && <LorenzCurveSection />}
          {slug === "supply-demand" && (
            <section className="mb-12 border border-border-faint bg-bg-panel p-6">
              <h2 className="text-fg-primary mb-1 font-display text-lg font-semibold tracking-tight">
                交互式供需模型
              </h2>
              <p className="text-fg-muted mb-6 font-mono text-[11px] tracking-[0.12em]">
                拖动滑块模拟需求/供给冲击，观察均衡变化
              </p>
              <SupplyDemandChart />
            </section>
          )}
          <MarkdownRenderer content={concept.content} accentColor="#c8a45a" />
          <RelatedContent slug={slug} domain="economics" entityId={slug} />
        </article>
        <aside className="w-full flex-shrink-0 lg:w-80">
          <TableOfContents accentColor="#e8b84a" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">概念信息</h3>
            <dl className="space-y-3 text-sm">
              <div><dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">分类</dt><dd className="text-fg-primary mt-0.5">{concept.category}</dd></div>
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">相关概念</h3>
              <div className="space-y-2">
                {related.map((c) => <Link key={c.slug} href={`/economics/concepts/${c.slug}`} className="group flex items-center gap-2 transition-colors"><div className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70" style={{ backgroundColor: CATEGORY_COLORS[c.category] ?? "#c8a45a" }} /><span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">{c.title}</span></Link>)}
              </div>
            </div>
          )}
        </aside>
      </div>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prev ? (
          <Link
            href={`/economics/concepts/${prev.slug}`}
            className="group flex flex-1 flex-col gap-1 border border-border-faint p-4 transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">← 上一个</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {prev.title}
            </span>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link
            href={`/economics/concepts/${next.slug}`}
            className="group flex flex-1 flex-col items-end gap-1 border border-border-faint p-4 text-right transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">下一个 →</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {next.title}
            </span>
          </Link>
        ) : <div className="flex-1" />}
      </nav>
    </div>
  );
}
