import { notFound } from "next/navigation";
import Link from "next/link";
import { getSchoolBySlug, getSchoolSlugs, getAllSchools } from "@/subjects/economics/lib/mdx";
import { ERA_COLORS } from "@/subjects/economics/lib/constants";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Breadcrumb from "@/components/Breadcrumb";

export function generateStaticParams() {
  return getSchoolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();
  return {
    title: `${school.title} — 经济学派`,
    description: `${school.title}（${school.title_en}）· ${school.period}`,
  };
}

export default async function SchoolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();

  const accent = ERA_COLORS[school.era] ?? "#c8a45a";
  const allSchools = getAllSchools();
  const currentIndex = allSchools.findIndex((s) => s.slug === slug);
  const prev = currentIndex > 0 ? allSchools[currentIndex - 1] : null;
  const next = currentIndex < allSchools.length - 1 ? allSchools[currentIndex + 1] : null;
  const related = allSchools
    .filter(
      (s) =>
        s.slug !== slug &&
        (s.era === school.era || s.key_figures?.some((f) => school.key_figures.includes(f)))
    )
    .slice(0, 4);

  return (
    <ArticleLayout
      backHref="/economics/schools"
      backLabel="← 返回学派列表"
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "经济学", href: "/economics" },
            { label: "学派", href: "/economics/schools" },
            { label: school.title },
          ]}
        />
      }
      accent={accent}
      eyebrow={school.era}
      eyebrowMeta={[school.period]}
      title={school.title}
      titleEn={school.title_en}
      content={school.content}
      meta={
        <>
          {school.founder && (
            <p className="text-base">
              创始人：<span className="text-fg-primary font-medium">{school.founder}</span>
            </p>
          )}
          {school.key_figures.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {school.key_figures.map((name) => (
                <span
                  key={name}
                  className="border-fg-disabled/30 text-fg-muted rounded-none border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </>
      }
      articleClassName="max-w-[900px]"
      prevLabel="上一派"
      nextLabel="下一派"
      prev={prev ? { href: `/economics/schools/${prev.slug}`, title: prev.title } : null}
      next={next ? { href: `/economics/schools/${next.slug}`, title: next.title } : null}
      sidebar={
        <>
          <TableOfContents accentColor="#e8b84a" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              学派信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  时代
                </dt>
                <dd className="text-fg-primary mt-0.5">{school.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  时期
                </dt>
                <dd className="text-fg-primary mt-0.5">{school.period}</dd>
              </div>
              {school.founder && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    创始人
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{school.founder}</dd>
                </div>
              )}
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关学派
              </h3>
              <div className="space-y-2">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/economics/schools/${s.slug}`}
                    className="group flex items-center gap-2 transition-colors"
                  >
                    <div
                      className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                      style={{ backgroundColor: ERA_COLORS[s.era] ?? "#c8a45a" }}
                    />
                    <span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">
                      {s.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      }
    >
      <MarkdownRenderer content={school.content} accentColor="#61afef" />
    </ArticleLayout>
  );
}
