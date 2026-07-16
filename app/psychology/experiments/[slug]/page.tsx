import { notFound } from "next/navigation";
import Link from "next/link";
import { getExperimentBySlug, getAllExperiments } from "@/subjects/psychology/lib/mdx";
import { FIELD_COLORS } from "@/subjects/psychology/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { getNarration } from "@/lib/narration";
import { NarrationButton } from "@/components/narration/NarrationButton";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);
  if (!experiment) notFound();
  const description = `${experiment.researcher} 的实验：${experiment.title_en}`;
  return {
    title: `${experiment.title} — 经典实验`,
    description,
    openGraph: { title: `${experiment.title} — 经典实验`, description },
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

  const fieldColor = FIELD_COLORS[experiment.field] || "#6b8fd6";
  const narration = getNarration("psychology", "experiments", slug);
  const allExperiments = getAllExperiments();
  const related = allExperiments
    .filter(
      (e) =>
        e.slug !== slug && (e.field === experiment.field || e.researcher === experiment.researcher)
    )
    .slice(0, 4);

  return (
    <ArticleLayout
      backHref="/psychology/experiments"
      backLabel="← 返回经典实验"
      accent={fieldColor}
      eyebrow={experiment.field}
      eyebrowMeta={[formatYear(experiment.year)]}
      title={experiment.title}
      titleEn={experiment.title_en}
      content={experiment.content}
      meta={<span className="text-sm">{experiment.researcher}</span>}
      tags={experiment.tags}
      sidebar={
        <>
          <TableOfContents accentColor="#d4789c" />
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
                  研究者
                </dt>
                <dd className="text-fg-primary mt-0.5">{experiment.researcher}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  年份
                </dt>
                <dd className="text-fg-primary mt-0.5">{formatYear(experiment.year)}</dd>
              </div>
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关实验
              </h3>
              <div className="space-y-2">
                {related.map((e) => {
                  const color = FIELD_COLORS[e.field] || "#6b8fd6";
                  return (
                    <Link
                      key={e.slug}
                      href={`/psychology/experiments/${e.slug}`}
                      className="group flex items-center gap-2 transition-colors"
                    >
                      <div
                        className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">
                        {e.title}
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
      {narration && (
        <NarrationButton
          id={`psychology/experiments/${slug}`}
          title={narration.title}
          script={narration.script}
          audioUrl={narration.audioUrl}
          accent={fieldColor}
        />
      )}
      <MarkdownRenderer domain="psychology" content={experiment.content} accentColor={fieldColor} />
    </ArticleLayout>
  );
}
