import { notFound } from "next/navigation";
import Link from "next/link";
import { getExperimentBySlug, getAllExperiments } from "@/lib/experiments";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { FIELD_COLORS, SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createArticleJsonLd } from "@/lib/jsonld";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);
  if (!experiment) notFound();
  const description = `${experiment.philosopher} 的思想实验：${experiment.title_en}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(experiment.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return {
    title: `${experiment.title} — 思想实验`,
    description,
    openGraph: {
      title: `${experiment.title} — 思想实验`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

function formatYear(year: number): string {
  if (year < 0) return `公元前 ${Math.abs(year)} 年`;
  return `${year} 年`;
}

export default async function ExperimentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);
  if (!experiment) notFound();

  const fieldColor = FIELD_COLORS[experiment.field] || "#6b6460";

  const allExperiments = getAllExperiments();
  const relatedExperiments = allExperiments
    .filter(
      (other) =>
        other.slug !== slug &&
        (other.field === experiment.field || other.philosopher === experiment.philosopher)
    )
    .slice(0, 4);

  const jsonLd = createArticleJsonLd({
    title: `${experiment.title}（${experiment.title_en}）`,
    description: `${experiment.philosopher} 的思想实验：${experiment.title_en}`,
    url: `${SITE_URL}/philosophy/experiments/${slug}`,
    author: experiment.philosopher,
    keywords: [
      experiment.title,
      experiment.title_en,
      experiment.field,
      experiment.philosopher,
      ...experiment.tags,
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ArticleLayout
        backHref="/philosophy/experiments"
        backLabel="← 返回思想实验"
        breadcrumb={<Breadcrumb category="experiments" currentTitle={experiment.title} />}
        accent={fieldColor}
        eyebrow={experiment.field}
        eyebrowMeta={[formatYear(experiment.year)]}
        title={experiment.title}
        titleEn={experiment.title_en}
        content={experiment.content}
        meta={<span className="text-sm">{experiment.philosopher}</span>}
        tags={experiment.tags}
        sidebar={
          <>
            <TableOfContents accentColor="#a88adf" />
            <div className="border-border-faint border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                实验信息
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    领域
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{experiment.field}</dd>
                </div>
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    提出者
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{experiment.philosopher}</dd>
                </div>
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    年份
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{formatYear(experiment.year)}</dd>
                </div>
              </dl>
            </div>
            {relatedExperiments.length > 0 && (
              <div className="border-border-faint mt-4 border p-4">
                <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                  相关实验
                </h3>
                <div className="space-y-2">
                  {relatedExperiments.map((other) => {
                    const otherColor = FIELD_COLORS[other.field] || "#6b6460";
                    return (
                      <Link
                        key={other.slug}
                        href={`/philosophy/experiments/${other.slug}`}
                        className="group flex items-center gap-2 transition-colors"
                      >
                        <div
                          className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                          style={{ backgroundColor: otherColor }}
                        />
                        <span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">
                          {other.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        }
      >
        <MarkdownRenderer
          domain="philosophy"
          content={experiment.content}
          accentColor={fieldColor}
        />
        <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
      </ArticleLayout>
    </>
  );
}
