import { notFound } from "next/navigation";
import { withCanonicalPath } from "@/lib/article-canonical";
import { getMathParadoxBySlug, getAllMathParadoxes } from "@/subjects/mathematics/lib/paradoxes";
import { MATH_FIELD_COLORS } from "@/subjects/mathematics/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createArticleJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleLayout } from "@/components/ArticleLayout";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paradox = getMathParadoxBySlug(slug);
  if (!paradox) notFound();
  const description = `${paradox.title_en}：${paradox.field}。${paradox.tags.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(paradox.title)}&section=mathematics&description=${encodeURIComponent(description)}`;
  return withCanonicalPath(`/mathematics/paradoxes/${slug}`, {
    title: `${paradox.title} — 数学悖论`,
    description,
    openGraph: {
      title: `${paradox.title} — 数学悖论`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
}

export default async function MathParadoxDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paradox = getMathParadoxBySlug(slug);
  if (!paradox) notFound();

  const allParadoxes = getAllMathParadoxes();
  const currentIndex = allParadoxes.findIndex((p) => p.slug === slug);
  const prevParadox = (currentIndex > 0 ? allParadoxes[currentIndex - 1] : null) ?? null;
  const nextParadox =
    (currentIndex < allParadoxes.length - 1 ? allParadoxes[currentIndex + 1] : null) ?? null;

  const fieldColor = MATH_FIELD_COLORS[paradox.field] || "#6366f1";

  const jsonLd = createArticleJsonLd({
    title: `${paradox.title}（${paradox.title_en}）`,
    description: `${paradox.title_en}：${paradox.field}。${paradox.tags.join("、")}`,
    url: `${SITE_URL}/mathematics/paradoxes/${slug}`,
    author: paradox.key_figures[0] ?? "Episteme · 格致",
    keywords: [
      paradox.title,
      paradox.title_en,
      paradox.field,
      ...paradox.key_figures,
      ...paradox.tags,
    ],
  });

  return (
    <ArticleLayout
      backHref="/mathematics/paradoxes"
      url={`/mathematics/paradoxes/${slug}`}
      backLabel="← 返回悖论"
      accent={fieldColor}
      eyebrow={paradox.field}
      title={paradox.title}
      titleEn={paradox.title_en}
      content={paradox.content}
      meta={
        paradox.key_figures.length > 0 ? <>关键人物：{paradox.key_figures.join("、")}</> : undefined
      }
      tags={paradox.tags}
      sidebar={
        <>
          <TableOfContents accentColor={fieldColor} />
        </>
      }
      prev={
        prevParadox && {
          href: `/mathematics/paradoxes/${prevParadox.slug}`,
          title: prevParadox.title,
        }
      }
      next={
        nextParadox && {
          href: `/mathematics/paradoxes/${nextParadox.slug}`,
          title: nextParadox.title,
        }
      }
      prevLabel="上一个"
      nextLabel="下一个"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      {paradox.content ? (
        <MarkdownRenderer content={paradox.content} accentColor={fieldColor} domain="mathematics" />
      ) : (
        <div className="border-border-faint bg-bg-panel border p-8 text-center">
          <p className="text-fg-muted text-sm">详细内容正在编写中。</p>
        </div>
      )}

      <SafeRender>
        <RelatedContent slug={slug} domain="mathematics" entityId={slug} />
      </SafeRender>
    </ArticleLayout>
  );
}
