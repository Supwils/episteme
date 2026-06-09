import { notFound } from "next/navigation";
import Link from "next/link";
import { getIsmBySlug, getIsmSlugs, buildSlugByTitleMap, getAllIsms } from "@/lib/isms";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { CATEGORY_ACCENTS, SITE_URL } from "@/lib/constants";
import { TableOfContents } from "@/components/TableOfContents";
import { FadeInSection } from "@/components/FadeInSection";
import { createArticleJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getIsmSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ism = getIsmBySlug(slug);
  if (!ism) notFound();
  const description = `${ism.category} · ${ism.title}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(ism.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return {
    title: `${ism.title}（${ism.title_en}）— 哲学主义`,
    description,
    openGraph: { title: `${ism.title}（${ism.title_en}）— 哲学主义`, description, images: [{ url: ogImage, width: 1200, height: 630 }] },
  };
}

export default async function IsmDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ism = getIsmBySlug(slug);
  if (!ism) notFound();

  const slugMap = buildSlugByTitleMap();
  const accent = CATEGORY_ACCENTS[ism.category] || "#c8a45a";

  const allIsms = getAllIsms();
  const relatedThinkers = allIsms
    .filter(
      (other) =>
        other.slug !== ism.slug && other.key_figures.some((fig) => ism.key_figures.includes(fig))
    )
    .slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(ism.content.replace(/\s/g, "").length / 400));

  const jsonLd = createArticleJsonLd({
    title: `${ism.title}（${ism.title_en}）`,
    description: `${ism.category} · ${ism.title}`,
    url: `${SITE_URL}/philosophy/isms/${slug}`,
    author: ism.key_figures[0] ?? "Universe Knowledge",
    keywords: [ism.title, ism.title_en, ism.category, ...ism.key_figures],
  });

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/philosophy/isms"
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors"
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
        返回主义列表
      </Link>

      <Breadcrumb category="isms" currentTitle={ism.title} />

      <header className="border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: accent }}
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full opacity-5 blur-2xl"
          style={{ backgroundColor: accent }}
        />

        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ borderColor: `${accent}50`, color: accent }}
            >
              {ism.category}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              {ism.era}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>

          <h1 className="font-display text-fg-primary text-[2.2rem] leading-tight tracking-tight md:text-[3rem]">
            {ism.title}
          </h1>
          <p className="text-fg-muted font-display mt-2 text-lg italic tracking-wide opacity-70">
            {ism.title_en}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {ism.key_figures.map((fig) => (
              <span
                key={fig}
                className="border-fg-disabled/30 text-fg-secondary hover:border-accent-gold/30 hover:text-accent-gold border px-3 py-1 font-mono text-[10px] tracking-[0.18em] transition-colors"
              >
                {fig}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 max-w-[1200px] flex-1">
          <MarkdownRenderer content={ism.content} accentColor={accent} />

          {ism.opposing.length > 0 && (
            <FadeInSection className="border-border-faint mt-12 border-t pt-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-fg-muted font-mono text-[10px] uppercase tracking-[0.32em]">
                  对立立场 · opposing
                </span>
                <span className="bg-border-faint h-px flex-1" />
              </div>
              <div className="flex flex-wrap gap-3">
                {ism.opposing.map((name) => {
                  const oppSlug = slugMap.get(name);
                  return oppSlug ? (
                    <Link
                      key={name}
                      href={`/philosophy/isms/${oppSlug}`}
                      className="group/opp border-border-faint bg-bg-panel hover:border-accent-gold/30 hover:bg-accent-gold/5 border px-4 py-2 backdrop-blur-sm transition-all duration-300"
                    >
                      <span className="text-fg-secondary group-hover/opp:text-accent-gold font-mono text-[11px] tracking-[0.18em] transition-colors">
                        {name}
                      </span>
                    </Link>
                  ) : (
                    <span
                      key={name}
                      className="border-border-faint text-fg-disabled border px-4 py-2 font-mono text-[11px] tracking-[0.18em]"
                    >
                      {name}
                    </span>
                  );
                })}
              </div>
            </FadeInSection>
          )}

          <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
        </article>

        <aside className="w-full flex-shrink-0 lg:w-80 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents accentColor="#a88adf" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">
              主义信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">
                  分类
                </dt>
                <dd className="text-fg-primary mt-0.5">{ism.category}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">
                  时代
                </dt>
                <dd className="text-fg-primary mt-0.5">{ism.era}</dd>
              </div>
              {ism.key_figures.length > 0 && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">
                    关键人物
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{ism.key_figures.join("、")}</dd>
                </div>
              )}
            </dl>
          </div>

          {relatedThinkers.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                相关主义
              </h3>
              <div className="space-y-2">
                {relatedThinkers.map((other) => {
                  const otherAccent = CATEGORY_ACCENTS[other.category] || "#c8a45a";
                  return (
                    <Link
                      key={other.slug}
                      href={`/philosophy/isms/${other.slug}`}
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
        </aside>
      </div>
    </div>
  );
}
