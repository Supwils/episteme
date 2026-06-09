import { notFound } from "next/navigation";
import Link from "next/link";
import { getSchoolBySlug, getSchoolSlugs, getAllSchools } from "@/lib/schools";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { CornerMarks, OrnamentalDivider } from "@/components/school-detail/Decorations";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { KeyFiguresSection, RelatedSchoolsSection } from "@/components/school-detail/Sections";
import { ERA_ACCENT, SITE_URL } from "@/lib/constants";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { TableOfContents } from "@/components/TableOfContents";
import { createArticleJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getSchoolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();
  const description = school.founder ?? school.school ?? school.title;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(school.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return {
    title: `${school.title} — 哲学流派`,
    description,
    openGraph: {
      title: `${school.title} — 哲学流派`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function SchoolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();

  const founder = school.founder ?? school.philosopher ?? "";
  const period = school.period ?? "";
  const keyFigures = school.key_figures ?? [];
  const accent = ERA_ACCENT[school.era] ?? "#c8a45a";

  const allSchools = getAllSchools();
  const relatedSchools = allSchools
    .filter(
      (other) =>
        other.slug !== slug &&
        (other.era === school.era || other.key_figures?.some((fig) => keyFigures.includes(fig)))
    )
    .slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(school.content.replace(/\s/g, "").length / 400));

  const jsonLd = createArticleJsonLd({
    title: school.title,
    description: founder || school.school || school.title,
    url: `${SITE_URL}/philosophy/schools/${slug}`,
    author: founder || "Universe Knowledge",
    keywords: [school.title, school.school ?? "", ...keyFigures, ...school.tags],
  });

  return (
    <div className="mx-auto w-full max-w-[1800px] px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/philosophy/schools"
        className="text-fg-muted hover:text-fg-secondary mb-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回流派列表
      </Link>

      <Breadcrumb category="schools" currentTitle={school.title} />

      <header className="relative mb-10 py-8">
        <CornerMarks />

        <div className="mb-3 flex items-center gap-3">
          <span
            className="font-mono text-[10px] tracking-[0.32em] uppercase"
            style={{ color: accent }}
          >
            {school.era}
          </span>
          {period && (
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              {period}
            </span>
          )}
          <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
            约 {readMinutes} 分钟阅读
          </span>
        </div>

        <h1 className="font-display text-fg-primary text-[2.2rem] leading-tight tracking-tight md:text-[2.8rem]">
          {school.title}
        </h1>

        {founder && (
          <p className="text-fg-secondary mt-3 text-base">
            创始人：<span className="text-fg-primary font-medium">{founder}</span>
          </p>
        )}

        {keyFigures.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {keyFigures.map((name) => (
              <span
                key={name}
                className="border-fg-disabled/30 text-fg-muted rounded-none border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em]"
              >
                {name}
              </span>
            ))}
          </div>
        )}

        {school.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {school.tags.map((tag) => (
              <span
                key={tag}
                className="border-fg-disabled/20 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="max-w-[1200px] min-w-0 flex-1">
          <MarkdownRenderer content={school.content} />

          {keyFigures.length > 0 && (
            <>
              <OrnamentalDivider color={accent} />
              <KeyFiguresSection figures={keyFigures} accent={accent} />
            </>
          )}

          <OrnamentalDivider color={accent} />

          <RelatedSchoolsSection currentSlug={slug} era={school.era} />

          <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
        </article>

        <ArticleSidebar>
          <TableOfContents accentColor="#a88adf" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              流派信息
            </h3>
            <dl className="space-y-3 text-sm">
              {founder && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    创始人
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{founder}</dd>
                </div>
              )}
              {period && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    时期
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{period}</dd>
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

          {relatedSchools.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关流派
              </h3>
              <div className="space-y-2">
                {relatedSchools.map((other) => {
                  const otherAccent = ERA_ACCENT[other.era] ?? "#c8a45a";
                  return (
                    <Link
                      key={other.slug}
                      href={`/philosophy/schools/${other.slug}`}
                      className="group flex items-center gap-2 transition-colors"
                    >
                      <div
                        className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                        style={{ backgroundColor: otherAccent }}
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
        </ArticleSidebar>
      </div>
    </div>
  );
}
