import { notFound } from "next/navigation";
import Link from "next/link";
import { getSchoolBySlug, getAllSchools } from "@/subjects/psychology/lib/mdx";
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
  const school = getSchoolBySlug(slug);
  if (!school) notFound();
  const description = school.founder ? `${school.founder}：${school.title}` : school.title;
  return {
    title: `${school.title} — 心理学流派`,
    description,
    openGraph: { title: `${school.title} — 心理学流派`, description },
  };
}

export default async function SchoolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();

  const eraColor = ERA_COLORS[school.era] || "#9b7dc4";
  const allSchools = getAllSchools();
  const related = allSchools.filter((s) => s.slug !== slug && s.era === school.era).slice(0, 4);

  return (
    <ArticleLayout
      backHref="/psychology/schools"
      backLabel="← 返回流派列表"
      accent={eraColor}
      eyebrow={school.era}
      eyebrowMeta={school.period ? [school.period] : undefined}
      title={school.title}
      content={school.content}
      meta={
        <>
          {school.founder && (
            <p className="text-base">
              创始人：<span className="text-fg-primary font-medium">{school.founder}</span>
            </p>
          )}
          {school.key_figures.length > 0 && (
            <p className="mt-3">代表人物：{school.key_figures.join("、")}</p>
          )}
        </>
      }
      tags={school.tags}
      sidebar={
        <>
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              流派信息
            </h3>
            <dl className="space-y-3 text-sm">
              {school.founder && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    创始人
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{school.founder}</dd>
                </div>
              )}
              {school.period && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    时期
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{school.period}</dd>
                </div>
              )}
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  时代
                </dt>
                <dd className="text-fg-primary mt-0.5">{school.era}</dd>
              </div>
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关流派
              </h3>
              <div className="space-y-2">
                {related.map((s) => {
                  const color = ERA_COLORS[s.era] || "#9b7dc4";
                  return (
                    <Link
                      key={s.slug}
                      href={`/psychology/schools/${s.slug}`}
                      className="group flex items-center gap-2 transition-colors"
                    >
                      <div
                        className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">
                        {s.title}
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
      <MarkdownRenderer domain="psychology" content={school.content} />
    </ArticleLayout>
  );
}
