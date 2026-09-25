import { notFound } from "next/navigation";
import { withCanonicalPath } from "@/lib/article-canonical";
import Link from "next/link";
import { getSchoolBySlug, getAllSchools } from "@/lib/schools";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { OrnamentalDivider } from "@/components/school-detail/Decorations";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { KeyFiguresSection, RelatedSchoolsSection } from "@/components/school-detail/Sections";
import { ERA_ACCENT, SITE_URL } from "@/lib/constants";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleLayout } from "@/components/ArticleLayout";
import { serializeJsonLd, createArticleJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();
  const description = school.founder ?? school.school ?? school.title;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(school.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return withCanonicalPath(`/philosophy/schools/${slug}`, {
    title: `${school.title} — 哲学流派`,
    description,
    openGraph: {
      title: `${school.title} — 哲学流派`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
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

  const jsonLd = createArticleJsonLd({
    title: school.title,
    description: founder || school.school || school.title,
    url: `${SITE_URL}/philosophy/schools/${slug}`,
    author: founder || "Episteme · 格致",
    keywords: [school.title, school.school ?? "", ...keyFigures, ...school.tags],
  });

  return (
    <ArticleLayout
      backHref="/philosophy/schools"
      url={`/philosophy/schools/${slug}`}
      backLabel="← 返回流派列表"
      accent={accent}
      eyebrow={school.era}
      eyebrowMeta={period ? [period] : undefined}
      title={school.title}
      content={school.content}
      meta={
        founder || keyFigures.length > 0 ? (
          <>
            {founder ? `创始人：${founder}` : ""}
            {founder && keyFigures.length > 0 ? " · " : ""}
            {keyFigures.join("、")}
          </>
        ) : undefined
      }
      tags={school.tags}
      sidebar={
        <>
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
        </>
      }
      breadcrumb={<Breadcrumb category="schools" currentTitle={school.title} />}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <MarkdownRenderer domain="philosophy" content={school.content} />

      {keyFigures.length > 0 && (
        <>
          <OrnamentalDivider color={accent} />
          <KeyFiguresSection figures={keyFigures} accent={accent} />
        </>
      )}

      <OrnamentalDivider color={accent} />

      <RelatedSchoolsSection currentSlug={slug} era={school.era} />

      <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
    </ArticleLayout>
  );
}
