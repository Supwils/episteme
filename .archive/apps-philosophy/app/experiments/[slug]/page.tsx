import { notFound } from "next/navigation";
import Link from "next/link";
import { getExperimentBySlug, getExperimentSlugs } from "@/lib/experiments";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { FIELD_COLORS } from "@/lib/constants";

export function generateStaticParams() {
  return getExperimentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);
  if (!experiment) return {};
  return {
    title: `${experiment.title} — 思想实验`,
    description: `${experiment.philosopher} 的思想实验：${experiment.title_en}`,
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

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/experiments"
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回思想实验
      </Link>

      <Breadcrumb category="experiments" currentTitle={experiment.title} />

      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: fieldColor }}
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full opacity-5 blur-2xl"
          style={{ backgroundColor: fieldColor }}
        />

        <div className="relative">
          <div className="mb-3 flex items-center gap-4">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase"
              style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
            >
              {experiment.field}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              {formatYear(experiment.year)}
            </span>
          </div>

          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">
            {experiment.title}
          </h1>
          <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">
            {experiment.title_en}
          </p>
          <p className="text-fg-secondary mt-3 text-sm">
            {experiment.philosopher}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {experiment.tags.map((tag) => (
              <span
                key={tag}
                className="border-fg-disabled/30 text-fg-secondary border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] transition-colors hover:border-accent-gold/30 hover:text-accent-gold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <MarkdownRenderer content={experiment.content} accentColor={fieldColor} />

      <RelatedContent slug={slug} />
    </article>
  );
}
