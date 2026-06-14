import { notFound } from "next/navigation";
import { getThinkerBySlug, getThinkerSlugs, getAllThinkers } from "@/lib/mdx";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import SafeRender from "@/components/SafeRender";
import { ERA_ACCENT, SITE_URL } from "@/lib/constants";
import { parseContent } from "@/components/thinker-detail/content-parser";
import RenderBlocks from "@/components/thinker-detail/RenderBlocks";
import ThinkerSidebar from "@/components/thinker-detail/ThinkerSidebar";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import ThinkerNav from "@/components/thinker-detail/ThinkerNav";
import { createPersonJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getThinkerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thinker = getThinkerBySlug(slug);
  if (!thinker) notFound();
  const description = `${thinker.philosopher}：${thinker.school}。${thinker.tags.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(thinker.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return {
    title: `${thinker.title} — 哲学`,
    description,
    openGraph: {
      title: `${thinker.title} — 哲学`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function ThinkerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thinker = getThinkerBySlug(slug);
  if (!thinker) notFound();

  const allThinkers = getAllThinkers();
  const currentIndex = allThinkers.findIndex((t) => t.slug === slug);
  const prevThinker = (currentIndex > 0 ? allThinkers[currentIndex - 1] : null) ?? null;
  const nextThinker =
    (currentIndex < allThinkers.length - 1 ? allThinkers[currentIndex + 1] : null) ?? null;

  const relatedThinkers = allThinkers
    .filter(
      (t) =>
        t.slug !== slug &&
        (t.era === thinker.era || t.school === thinker.school || thinker.related.includes(t.slug))
    )
    .slice(0, 4);

  const blocks = parseContent(thinker.content);
  const accent = ERA_ACCENT[thinker.era] ?? "#c8a45a";

  // .length counts characters; for Chinese text this is closer to word count.
  // Assumes ~500 chars/min reading speed.
  const wordCount = thinker.content.length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 400));

  const personJsonLd = createPersonJsonLd({
    name: thinker.philosopher,
    description: `${thinker.school} philosopher. ${thinker.tags.join(", ")}`,
    url: `${SITE_URL}/philosophy/thinkers/${slug}`,
    jobTitle: "Philosopher",
    knowsAbout: thinker.tags,
    memberOf: thinker.school,
  });

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <header className="mb-12">
        <Breadcrumb category="thinkers" currentTitle={thinker.title} />

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{
                borderColor: `${accent}30`,
                color: accent,
                backgroundColor: `${accent}10`,
              }}
            >
              {thinker.era}
            </span>
            <span className="border-fg-disabled/20 text-fg-muted rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.16em]">
              {thinker.school}
            </span>
          </div>

          <h1 className="font-display text-fg-primary text-[2.4rem] leading-[1.08] tracking-tight md:text-[3.4rem]">
            {thinker.title}
          </h1>

          <p className="text-fg-muted font-mono text-sm tracking-wider italic">
            {thinker.philosopher}
          </p>

          {thinker.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {thinker.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.12em]"
                  style={{
                    borderColor: `${accent}20`,
                    color: `${accent}cc`,
                    backgroundColor: `${accent}08`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 flex-1">
          <RenderBlocks blocks={blocks} />

          <SafeRender>
            <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
          </SafeRender>
        </article>

        <ArticleSidebar>
          <ThinkerSidebar
            accent={accent}
            era={thinker.era}
            school={thinker.school}
            readMinutes={readMinutes}
            wordCount={wordCount}
            relatedThinkers={relatedThinkers}
          />
        </ArticleSidebar>
      </div>

      <ThinkerNav prevThinker={prevThinker} nextThinker={nextThinker} />
    </div>
  );
}
