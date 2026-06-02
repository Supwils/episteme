import { notFound } from "next/navigation";
import { getThinkerBySlug, getThinkerSlugs, getAllThinkers } from "@/lib/mdx";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import RelatedDomains from "@/components/RelatedDomains";
import SafeRender from "@/components/SafeRender";
import { ERA_ACCENT } from "@/lib/constants";
import { parseContent, extractH2Headings } from "@/components/thinker-detail/content-parser";
import RenderBlocks from "@/components/thinker-detail/RenderBlocks";
import ThinkerSidebar from "@/components/thinker-detail/ThinkerSidebar";
import ThinkerNav from "@/components/thinker-detail/ThinkerNav";

export function generateStaticParams() {
  return getThinkerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thinker = getThinkerBySlug(slug);
  if (!thinker) return {};
  return {
    title: `${thinker.title} — 哲学`,
    description: `${thinker.philosopher}：${thinker.school}。${thinker.tags.join("、")}`,
  };
}

export default async function ThinkerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
        (t.era === thinker.era ||
          t.school === thinker.school ||
          thinker.related.includes(t.slug))
    )
    .slice(0, 4);

  const blocks = parseContent(thinker.content);
  const headings = extractH2Headings(blocks);
  const accent = ERA_ACCENT[thinker.era] ?? "#c8a45a";

  const wordCount = thinker.content.length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 500));

  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-8 pb-20 sm:px-6">
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

          <p className="text-fg-muted font-mono text-sm italic tracking-wider">
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
        <div className="min-w-0 flex-1">
          <RenderBlocks blocks={blocks} />

          <SafeRender>
            <RelatedContent slug={slug} />
          </SafeRender>

          <div className="mt-10">
            <SafeRender>
              <RelatedDomains thinkerSlug={slug} />
            </SafeRender>
          </div>
        </div>

        <ThinkerSidebar
          headings={headings}
          accent={accent}
          era={thinker.era}
          school={thinker.school}
          readMinutes={readMinutes}
          wordCount={wordCount}
          relatedThinkers={relatedThinkers}
        />
      </div>

      <ThinkerNav prevThinker={prevThinker} nextThinker={nextThinker} />
    </div>
  );
}
