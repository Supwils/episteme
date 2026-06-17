import { notFound } from "next/navigation";
import Link from "next/link";
import { getDebateBySlug, getAllDebates } from "@/subjects/psychology/lib/mdx";
import { ERA_COLORS } from "@/subjects/psychology/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const debate = getDebateBySlug(slug);
  if (!debate) notFound();
  const description = `${debate.topic}。关键人物：${debate.key_figures.join("、")}`;
  return {
    title: `${debate.title} — 经典论辩`,
    description,
    openGraph: { title: `${debate.title} — 经典论辩`, description },
  };
}

export default async function DebateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const debate = getDebateBySlug(slug);
  if (!debate) notFound();

  const eraColor = ERA_COLORS[debate.era] || "#6b8fd6";
  const allDebates = getAllDebates();
  const related = allDebates.filter((d) => d.slug !== slug && d.era === debate.era).slice(0, 4);

  return (
    <ArticleLayout
      backHref="/psychology/debates"
      backLabel="← 返回经典论辩"
      accent={eraColor}
      eyebrow={debate.era}
      title={debate.title}
      content={debate.content}
      meta={
        <>
          <p className="text-sm">{debate.topic}</p>
          {debate.key_figures.length > 0 && (
            <p className="mt-3">关键人物：{debate.key_figures.join("、")}</p>
          )}
        </>
      }
      tags={debate.tags}
      sidebar={
        <>
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              论辩信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  时代
                </dt>
                <dd className="text-fg-primary mt-0.5">{debate.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  核心论题
                </dt>
                <dd className="text-fg-primary mt-0.5">{debate.topic}</dd>
              </div>
              {debate.key_figures.length > 0 && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    关键人物
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{debate.key_figures.join("、")}</dd>
                </div>
              )}
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关论辩
              </h3>
              <div className="space-y-2">
                {related.map((d) => {
                  const color = ERA_COLORS[d.era] || "#6b8fd6";
                  return (
                    <Link
                      key={d.slug}
                      href={`/psychology/debates/${d.slug}`}
                      className="group flex items-center gap-2 transition-colors"
                    >
                      <div
                        className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">
                        {d.title}
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
      <MarkdownRenderer content={debate.content} accentColor={eraColor} />
    </ArticleLayout>
  );
}
