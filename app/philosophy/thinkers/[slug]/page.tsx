import { notFound } from "next/navigation";
import { withCanonicalPath } from "@/lib/article-canonical";
import { getThinkerBySlug, getAllThinkers } from "@/lib/mdx";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import SafeRender from "@/components/SafeRender";
import { ERA_ACCENT, SITE_URL } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import ThinkerSidebar from "@/components/thinker-detail/ThinkerSidebar";
import { readingMinutes } from "@/lib/reading-time";
import { serializeJsonLd, createPersonJsonLd } from "@/lib/jsonld";
import { ArticleLayout } from "@/components/ArticleLayout";

export function generateStaticParams() {
  return []; // On-demand SSG: build on first request, then cache until the next deployment
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thinker = getThinkerBySlug(slug);
  if (!thinker) notFound();
  const description = `${thinker.philosopher}：${thinker.school}。${thinker.tags.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(thinker.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return withCanonicalPath(`/philosophy/thinkers/${slug}`, {
    title: `${thinker.title} — 哲学`,
    description,
    openGraph: {
      title: `${thinker.title} — 哲学`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
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

  const accent = ERA_ACCENT[thinker.era] ?? "#c8a45a";

  const readMinutes = readingMinutes(thinker.content);
  // .length counts characters; for Chinese text this is closer to word count.
  const wordCount = thinker.content.length;

  const personJsonLd = createPersonJsonLd({
    name: thinker.philosopher,
    description: `${thinker.school} philosopher. ${thinker.tags.join(", ")}`,
    url: `${SITE_URL}/philosophy/thinkers/${slug}`,
    jobTitle: "Philosopher",
    knowsAbout: thinker.tags,
    memberOf: thinker.school,
  });

  return (
    <ArticleLayout
      backHref="/philosophy/thinkers"
      url={`/philosophy/thinkers/${slug}`}
      backLabel="← 返回思想家列表"
      breadcrumb={<Breadcrumb category="thinkers" currentTitle={thinker.title} />}
      accent={accent}
      eyebrow={thinker.era}
      eyebrowMeta={[thinker.school]}
      title={thinker.title}
      titleEn={thinker.philosopher}
      content={thinker.content}
      tags={thinker.tags}
      sidebar={
        <ThinkerSidebar
          accent={accent}
          era={thinker.era}
          school={thinker.school}
          readMinutes={readMinutes}
          wordCount={wordCount}
          relatedThinkers={relatedThinkers}
        />
      }
      prev={
        prevThinker && {
          href: `/philosophy/thinkers/${prevThinker.slug}`,
          title: prevThinker.title,
        }
      }
      next={
        nextThinker && {
          href: `/philosophy/thinkers/${nextThinker.slug}`,
          title: nextThinker.title,
        }
      }
      prevLabel="上一位"
      nextLabel="下一位"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
      />
      <MarkdownRenderer content={thinker.content} accentColor={accent} domain="philosophy" />
      <SafeRender>
        <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
      </SafeRender>
    </ArticleLayout>
  );
}
