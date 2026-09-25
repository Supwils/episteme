import { notFound } from "next/navigation";
import { withCanonicalPath } from "@/lib/article-canonical";
import { getMathDialogueBySlug, getAllMathDialogues } from "@/subjects/mathematics/lib/dialogues";
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
  const dialogue = getMathDialogueBySlug(slug);
  if (!dialogue) notFound();
  const description = `${dialogue.participants.join("、")}的对话：${dialogue.title_en}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(dialogue.title)}&section=mathematics&description=${encodeURIComponent(description)}`;
  return withCanonicalPath(`/mathematics/dialogues/${slug}`, {
    title: `${dialogue.title} — 数学对话`,
    description,
    openGraph: {
      title: `${dialogue.title} — 数学对话`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
}

export default async function MathDialogueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dialogue = getMathDialogueBySlug(slug);
  if (!dialogue) notFound();

  const allDialogues = getAllMathDialogues();
  const currentIndex = allDialogues.findIndex((d) => d.slug === slug);
  const prevDialogue = (currentIndex > 0 ? allDialogues[currentIndex - 1] : null) ?? null;
  const nextDialogue =
    (currentIndex < allDialogues.length - 1 ? allDialogues[currentIndex + 1] : null) ?? null;

  const fieldColor = MATH_FIELD_COLORS[dialogue.field] || "#6366f1";

  const jsonLd = createArticleJsonLd({
    title: `${dialogue.title}（${dialogue.title_en}）`,
    description: `${dialogue.participants.join("、")}的对话：${dialogue.title_en}`,
    url: `${SITE_URL}/mathematics/dialogues/${slug}`,
    author: dialogue.participants[0] ?? "Episteme · 格致",
    keywords: [
      dialogue.title,
      dialogue.title_en,
      dialogue.field,
      ...dialogue.participants,
      ...dialogue.tags,
    ],
  });

  return (
    <ArticleLayout
      backHref="/mathematics/dialogues"
      url={`/mathematics/dialogues/${slug}`}
      backLabel="← 返回数学对话"
      accent={fieldColor}
      eyebrow={dialogue.field}
      eyebrowMeta={[dialogue.era]}
      title={dialogue.title}
      titleEn={dialogue.title_en}
      content={dialogue.content}
      meta={<>对话者：{dialogue.participants.join("、")}</>}
      tags={dialogue.tags}
      sidebar={
        <>
          <TableOfContents accentColor={fieldColor} />
        </>
      }
      prev={
        prevDialogue && {
          href: `/mathematics/dialogues/${prevDialogue.slug}`,
          title: prevDialogue.title,
        }
      }
      next={
        nextDialogue && {
          href: `/mathematics/dialogues/${nextDialogue.slug}`,
          title: nextDialogue.title,
        }
      }
      prevLabel="上一篇"
      nextLabel="下一篇"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      {dialogue.content ? (
        <MarkdownRenderer
          content={dialogue.content}
          accentColor={fieldColor}
          domain="mathematics"
        />
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
