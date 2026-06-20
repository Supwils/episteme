import { notFound } from "next/navigation";
import Link from "next/link";
import { getMathConceptBySlug, getAllMathConcepts } from "@/subjects/mathematics/lib/concepts";
import { MATH_FIELD_COLORS } from "@/subjects/mathematics/lib/constants";
import { MathMarkdownRenderer } from "@/subjects/mathematics/components/MathMarkdownRenderer";
import { FunctionPlotter } from "@/subjects/mathematics/components/visualizations";
import { SITE_URL } from "@/lib/constants";
import { createDefinedTermJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";
import GeometryExplorer from "@/subjects/mathematics/components/visualizations/GeometryExplorer";
import { FractalExplorer } from "@/subjects/mathematics/components/visualizations/FractalExplorer";

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
  return {
    title: `${concept.title} — 数学概念`,
    description,
    openGraph: {
      title: `${concept.title} — 数学概念`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
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
  const wordCount = concept.content.length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 400));

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
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/mathematics/concepts"
        className="text-fg-muted hover:text-accent-indigo mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回概念
      </Link>

      <header className="border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: fieldColor }}
        />

        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase"
              style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
            >
              {concept.field}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              约 {readMinutes} 分钟阅读
            </span>
          </div>

          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">
            {concept.title}
          </h1>
          <p className="text-fg-muted font-display text-lg tracking-wide italic">
            {concept.title_en}
          </p>

          {concept.key_figures.length > 0 && (
            <div className="mt-4">
              <p className="text-fg-disabled mb-2 font-mono text-[9px] tracking-[0.18em] uppercase">
                关键人物
              </p>
              <div className="flex flex-wrap gap-2">
                {concept.key_figures.map((fig) => (
                  <span
                    key={fig}
                    className="border-fg-disabled/20 text-fg-secondary rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.12em]"
                  >
                    {fig}
                  </span>
                ))}
              </div>
            </div>
          )}

          {concept.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {concept.tags.map((tag) => (
                <span
                  key={tag}
                  className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em]"
                  style={{
                    borderColor: `${fieldColor}20`,
                    color: `${fieldColor}cc`,
                    backgroundColor: `${fieldColor}08`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {slug === "fractal" && (
        <div className="mb-12">
          <FractalExplorer />
        </div>
      )}

      <article className="max-w-[1200px] min-w-0">
        {concept.content ? (
          <MathMarkdownRenderer content={concept.content} accentColor={fieldColor} />
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
                <p className="text-fg-primary font-display text-base font-semibold">
                  概率分布探索器
                </p>
                <p className="text-fg-muted mt-1 text-sm">
                  交互式探索正态、均匀、指数和二项分布，拖动参数观察形态变化
                </p>
              </div>
              <Link
                href="/mathematics/distributions"
                className="shrink-0 border px-4 py-2 font-mono text-[11px] tracking-wider uppercase transition-all hover:-translate-y-0.5"
                style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
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
              style={{ color: fieldColor }}
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
      </article>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prevConcept ? (
          <Link
            href={`/mathematics/concepts/${prevConcept.slug}`}
            className="group border-border-faint hover:border-fg-disabled/30 hover:bg-bg-panel flex flex-1 flex-col gap-1 border p-4 transition-all duration-300"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              ← 上一个
            </span>
            <span className="font-display text-fg-secondary group-hover:text-accent-indigo text-sm font-medium transition-colors">
              {prevConcept.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextConcept ? (
          <Link
            href={`/mathematics/concepts/${nextConcept.slug}`}
            className="group border-border-faint hover:border-fg-disabled/30 hover:bg-bg-panel flex flex-1 flex-col items-end gap-1 border p-4 text-right transition-all duration-300"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              下一个 →
            </span>
            <span className="font-display text-fg-secondary group-hover:text-accent-indigo text-sm font-medium transition-colors">
              {nextConcept.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </div>
  );
}
