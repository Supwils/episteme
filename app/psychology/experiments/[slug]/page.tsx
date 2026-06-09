import { notFound } from "next/navigation";
import Link from "next/link";
import { getExperimentBySlug, getExperimentSlugs, getAllExperiments } from "@/src-psychology/lib/mdx";
import { FIELD_COLORS } from "@/src-psychology/lib/constants";
import { SITE_URL } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  return getExperimentSlugs().map((slug) => ({ slug }));
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

export default async function ExperimentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);
  if (!experiment) notFound();

  const fieldColor = FIELD_COLORS[experiment.field] || "#6b8fd6";
  const allExperiments = getAllExperiments();
  const related = allExperiments
    .filter((e) => e.slug !== slug && (e.field === experiment.field || e.researcher === experiment.researcher))
    .slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(experiment.content.replace(/\s/g, "").length / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link
        href="/psychology/experiments"
        className="text-fg-muted hover:text-accent-purple mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors"
      >
        ← 返回经典实验
      </Link>

      <header className="border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: fieldColor }}
        />
        <div className="relative">
          <div className="mb-3 flex items-center gap-4">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
            >
              {experiment.field}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              {formatYear(experiment.year)}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>
          <h1 className="font-display text-fg-primary mb-2 text-[2rem] font-semibold leading-tight tracking-tight md:text-[2.8rem]">
            {experiment.title}
          </h1>
          <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">
            {experiment.title_en}
          </p>
          <p className="text-fg-secondary mt-3 text-sm">{experiment.researcher}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {experiment.tags.map((tag) => (
              <span key={tag} className="border-fg-disabled/30 text-fg-secondary border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 max-w-[1200px] flex-1">
          <MarkdownRenderer content={experiment.content} accentColor={fieldColor} />
        </article>
        <aside className="w-full flex-shrink-0 lg:w-80">
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">实验信息</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">领域</dt>
                <dd className="text-fg-primary mt-0.5">{experiment.field}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">研究者</dt>
                <dd className="text-fg-primary mt-0.5">{experiment.researcher}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">年份</dt>
                <dd className="text-fg-primary mt-0.5">{formatYear(experiment.year)}</dd>
              </div>
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">相关实验</h3>
              <div className="space-y-2">
                {related.map((e) => {
                  const color = FIELD_COLORS[e.field] || "#6b8fd6";
                  return (
                    <Link key={e.slug} href={`/psychology/experiments/${e.slug}`} className="group flex items-center gap-2 transition-colors">
                      <div className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70" style={{ backgroundColor: color }} />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">{e.title}</span>
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
