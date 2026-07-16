import { notFound } from "next/navigation";
import Link from "next/link";
import { getConceptBySlug, getAllConcepts } from "@/subjects/economics/lib/mdx";
import { CATEGORY_COLORS } from "@/subjects/economics/lib/constants";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import RelatedContent from "@/components/RelatedContent";
import Breadcrumb from "@/components/Breadcrumb";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SupplyDemandChart } from "@/subjects/economics/components/visualizations/SupplyDemandChart";
import { GDPChartSection } from "./GDPChartSection";
import { LorenzCurveSection } from "./LorenzCurveSection";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();
  return {
    title: `${concept.title} — 经济学概念`,
    description: `${concept.title}（${concept.title_en}）`,
  };
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
  const related = allConcepts
    .filter(
      (c) =>
        c.slug !== slug && (c.category === concept.category || concept.related.includes(c.slug))
    )
    .slice(0, 4);

  return (
    <ArticleLayout
      backHref="/economics/concepts"
      backLabel="← 返回概念列表"
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "经济学", href: "/economics" },
            { label: "概念", href: "/economics/concepts" },
            { label: concept.title },
          ]}
        />
      }
      accent={accent}
      eyebrow={concept.category}
      title={concept.title}
      titleEn={concept.title_en}
      content={concept.content}
      meta={
        concept.key_figures.length > 0 ? `相关人物：${concept.key_figures.join("、")}` : undefined
      }
      tags={concept.tags}
      articleClassName="max-w-[900px]"
      prev={prev ? { href: `/economics/concepts/${prev.slug}`, title: prev.title } : null}
      next={next ? { href: `/economics/concepts/${next.slug}`, title: next.title } : null}
      sidebar={
        <>
          <TableOfContents accentColor="#e8b84a" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              概念信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  分类
                </dt>
                <dd className="text-fg-primary mt-0.5">{concept.category}</dd>
              </div>
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关概念
              </h3>
              <div className="space-y-2">
                {related.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/economics/concepts/${c.slug}`}
                    className="group flex items-center gap-2 transition-colors"
                  >
                    <div
                      className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                      style={{ backgroundColor: CATEGORY_COLORS[c.category] ?? "#c8a45a" }}
                    />
                    <span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">
                      {c.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      }
    >
      {slug === "gdp" && <GDPChartSection />}
      {slug === "gini-coefficient" && <LorenzCurveSection />}
      {slug === "elasticity" && (
        <section className="border-border-faint bg-bg-panel mb-12 border p-6">
          <h2 className="text-fg-primary font-display mb-1 text-lg font-semibold tracking-tight">
            交互式供需模型
          </h2>
          <p className="text-fg-muted mb-6 font-mono text-[11px] tracking-[0.12em]">
            拖动滑块模拟需求/供给冲击，观察均衡变化
          </p>
          <SupplyDemandChart />
        </section>
      )}
      <MarkdownRenderer domain="economics" content={concept.content} accentColor="#c8a45a" />
      <RelatedContent slug={slug} domain="economics" entityId={slug} />
    </ArticleLayout>
  );
}
