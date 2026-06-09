import { notFound } from "next/navigation";
import Link from "next/link";
import { getConceptBySlug, getConceptSlugs, getAllConcepts } from "@/lib/concepts";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { FIELD_ACCENTS, SITE_URL } from "@/lib/constants";
import { TableOfContents } from "@/components/TableOfContents";
import { createDefinedTermJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getConceptSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();
  const description = `${concept.field}：${concept.key_figures.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(concept.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return {
    title: `${concept.title}（${concept.title_en}）— 哲学概念`,
    description,
    openGraph: { title: `${concept.title}（${concept.title_en}）— 哲学概念`, description, images: [{ url: ogImage, width: 1200, height: 630 }] },
  };
}

export default async function ConceptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
          other.key_figures.some((fig) => concept.key_figures.includes(fig))),
    )
    .slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(concept.content.replace(/\s/g, "").length / 400));

  const jsonLd = createDefinedTermJsonLd({
    name: `${concept.title}（${concept.title_en}）`,
    description: `${concept.field}：${concept.key_figures.join("、")}`,
    url: `${SITE_URL}/philosophy/concepts/${slug}`,
    inDefinedTermSet: 'Philosophy Concepts',
    keywords: [concept.title, concept.title_en, concept.field, ...concept.key_figures, ...concept.tags],
  });

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/philosophy/concepts"
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回概念列表
      </Link>

      <Breadcrumb category="concepts" currentTitle={concept.title} />

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
          <div className="mb-4 flex items-center gap-3">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase"
              style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
            >
              {concept.field}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>

          <h1 className="font-display text-fg-primary text-[2.2rem] leading-tight tracking-tight md:text-[3rem]">
            {concept.title}
          </h1>
          <p className="text-fg-muted mt-2 font-display text-lg italic tracking-wide opacity-70">
            {concept.title_en}
          </p>

          {concept.key_figures.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {concept.key_figures.map((fig) => (
                <span
                  key={fig}
                  className="border-fg-disabled/30 text-fg-secondary border px-3 py-1 font-mono text-[10px] tracking-[0.18em] transition-colors hover:border-accent-gold/30 hover:text-accent-gold"
                >
                  {fig}
                </span>
              ))}
            </div>
          )}

          {concept.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {concept.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-fg-disabled/20 text-fg-muted rounded-none border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 flex-1 max-w-[1200px]">
          <MarkdownRenderer content={concept.content} accentColor={fieldColor} />

          <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
        </article>

        <aside className="w-full lg:w-80 flex-shrink-0">
          <TableOfContents accentColor="#a88adf" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              概念信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">领域</dt>
                <dd className="text-fg-primary mt-0.5">{concept.field}</dd>
              </div>
              {concept.key_figures.length > 0 && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">关键人物</dt>
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
        </aside>
      </div>
    </div>
  );
}
