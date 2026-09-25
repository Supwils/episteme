import { notFound } from "next/navigation";
import { withCanonicalPath } from "@/lib/article-canonical";
import Link from "next/link";
import { getMathConceptBySlug, getAllMathConcepts } from "@/subjects/mathematics/lib/concepts";
import { MATH_FIELD_COLORS, mathBadgeColor } from "@/subjects/mathematics/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { FunctionPlotter } from "@/subjects/mathematics/components/visualizations";
import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createDefinedTermJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";
import GeometryExplorer from "@/subjects/mathematics/components/visualizations/GeometryExplorer";
import { FractalExplorer } from "@/subjects/mathematics/components/visualizations/FractalExplorer";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleLayout } from "@/components/ArticleLayout";

const INTERACTIVE_CONCEPTS = new Set(["derivative", "integral", "limit"]);

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getMathConceptBySlug(slug);
  if (!concept) notFound();
  const description = `${concept.title_en}：${concept.field}。${concept.tags.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(concept.title)}&section=mathematics&description=${encodeURIComponent(description)}`;
  return withCanonicalPath(`/mathematics/concepts/${slug}`, {
    title: `${concept.title} — 数学概念`,
    description,
    openGraph: {
      title: `${concept.title} — 数学概念`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
}

export default async function MathConceptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getMathConceptBySlug(slug);
  if (!concept) notFound();

  const allConcepts = getAllMathConcepts();
  const currentIndex = allConcepts.findIndex((c) => c.slug === slug);
  const prevConcept = (currentIndex > 0 ? allConcepts[currentIndex - 1] : null) ?? null;
  const nextConcept =
    (currentIndex < allConcepts.length - 1 ? allConcepts[currentIndex + 1] : null) ?? null;

  const fieldColor = MATH_FIELD_COLORS[concept.field] || "#6366f1";

  const jsonLd = createDefinedTermJsonLd({
    name: `${concept.title}（${concept.title_en}）`,
    description: `${concept.title_en}：${concept.field}。${concept.tags.join("、")}`,
    url: `${SITE_URL}/mathematics/concepts/${slug}`,
    inDefinedTermSet: "Mathematical Concepts",
    keywords: [
      concept.title,
      concept.title_en,
      concept.field,
      ...concept.key_figures,
      ...concept.tags,
    ],
  });

  return (
    <ArticleLayout
      backHref="/mathematics/concepts"
      url={`/mathematics/concepts/${slug}`}
      backLabel="← 返回概念"
      accent={fieldColor}
      eyebrow={concept.field}
      title={concept.title}
      titleEn={concept.title_en}
      content={concept.content}
      meta={
        concept.key_figures.length > 0 ? <>关键人物：{concept.key_figures.join("、")}</> : undefined
      }
      tags={concept.tags}
      sidebar={<TableOfContents accentColor={fieldColor} />}
      prev={
        prevConcept && {
          href: `/mathematics/concepts/${prevConcept.slug}`,
          title: prevConcept.title,
        }
      }
      next={
        nextConcept && {
          href: `/mathematics/concepts/${nextConcept.slug}`,
          title: nextConcept.title,
        }
      }
      prevLabel="上一个"
      nextLabel="下一个"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      {slug === "fractal" && (
        <div className="mb-12">
          <FractalExplorer />
        </div>
      )}

      {concept.content ? (
        <MarkdownRenderer content={concept.content} accentColor={fieldColor} domain="mathematics" />
      ) : (
        <div className="border-border-faint bg-bg-panel border p-8 text-center">
          <p className="text-fg-muted text-sm">详细内容正在编写中。</p>
        </div>
      )}

      {(slug === "probability" || slug === "statistics") && (
        <div className="border-border-faint bg-bg-panel mt-8 border p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-fg-disabled mb-1 font-mono text-[9px] tracking-[0.22em] uppercase">
                交互式可视化
              </p>
              <p className="text-fg-primary font-display text-base font-semibold">概率分布探索器</p>
              <p className="text-fg-muted mt-1 text-sm">
                交互式探索正态、均匀、指数和二项分布，拖动参数观察形态变化
              </p>
            </div>
            <Link
              href="/mathematics/distributions"
              className="shrink-0 border px-4 py-2 font-mono text-[11px] tracking-wider uppercase transition-all hover:-translate-y-0.5"
              style={{ borderColor: `${fieldColor}50`, color: mathBadgeColor(fieldColor) }}
            >
              打开探索器 →
            </Link>
          </div>
        </div>
      )}

      {INTERACTIVE_CONCEPTS.has(slug) && (
        <section className="my-10">
          <h2
            className="font-display mb-4 text-[1.25rem] leading-snug font-semibold"
            style={{ color: mathBadgeColor(fieldColor) }}
          >
            交互式函数绘图
          </h2>
          <p className="text-fg-secondary mb-4 text-[15px] leading-relaxed">
            选择函数、查看导数与积分、拖拽平移、滚轮缩放，点击曲线追踪坐标。
          </p>
          <FunctionPlotter />
        </section>
      )}

      <SafeRender>
        <RelatedContent slug={slug} domain="mathematics" entityId={slug} />
      </SafeRender>
    </ArticleLayout>
  );
}
