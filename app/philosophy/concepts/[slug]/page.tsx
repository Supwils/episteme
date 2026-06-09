import { notFound } from "next/navigation";
import Link from "next/link";
import { getConceptBySlug, getConceptSlugs, getAllConcepts } from "@/lib/concepts";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { FIELD_ACCENTS, SITE_URL } from "@/lib/constants";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { createDefinedTermJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getConceptSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();
  const description = `${concept.field}：${concept.key_figures.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(concept.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return {
    title: `${concept.title}（${concept.title_en}）— 哲学概念`,
    description,
    openGraph: {
      title: `${concept.title}（${concept.title_en}）— 哲学概念`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function ConceptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();

  const fieldColor = FIELD_ACCENTS[concept.field] ?? "#c8a45a";

  const allConcepts = getAllConcepts();
  const relatedConcepts = allConcepts
    .filter(
      (other) =>
        other.slug !== concept.slug &&
        (other.field === concept.field ||
          other.key_figures.some((fig) => concept.key_figures.includes(fig)))
    )
    .slice(0, 4);

  const jsonLd = createDefinedTermJsonLd({
    name: `${concept.title}（${concept.title_en}）`,
    description: `${concept.field}：${concept.key_figures.join("、")}`,
    url: `${SITE_URL}/philosophy/concepts/${slug}`,
    inDefinedTermSet: "Philosophy Concepts",
    keywords: [
      concept.title,
      concept.title_en,
      concept.field,
      ...concept.key_figures,
      ...concept.tags,
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout
        backHref="/philosophy/concepts"
        backLabel="← 返回概念列表"
        breadcrumb={<Breadcrumb category="concepts" currentTitle={concept.title} />}
        accent={fieldColor}
        eyebrow={concept.field}
        title={concept.title}
        titleEn={concept.title_en}
        content={concept.content}
        meta={
          concept.key_figures.length > 0 ? (
            <>关键人物：{concept.key_figures.join("、")}</>
          ) : undefined
        }
        tags={concept.tags}
        sidebar={
          <>
            <TableOfContents accentColor="#a88adf" />
            <div className="border-border-faint border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                概念信息
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    领域
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{concept.field}</dd>
                </div>
                {concept.key_figures.length > 0 && (
                  <div>
                    <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                      关键人物
                    </dt>
                    <dd className="text-fg-primary mt-0.5">{concept.key_figures.join("、")}</dd>
                  </div>
                )}
              </dl>
            </div>
            {relatedConcepts.length > 0 && (
              <div className="border-border-faint mt-4 border p-4">
                <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                  相关概念
                </h3>
                <div className="space-y-2">
                  {relatedConcepts.map((other) => {
                    const otherColor = FIELD_ACCENTS[other.field] ?? "#c8a45a";
                    return (
                      <Link
                        key={other.slug}
                        href={`/philosophy/concepts/${other.slug}`}
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
        <MarkdownRenderer content={concept.content} accentColor={fieldColor} />
        <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
      </ArticleLayout>
    </>
  );
}
