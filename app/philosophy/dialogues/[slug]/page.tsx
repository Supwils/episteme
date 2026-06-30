import { notFound } from "next/navigation";
import Link from "next/link";
import { getDialogueBySlug, getAllDialogues } from "@/lib/dialogues";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import SafeRender from "@/components/SafeRender";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { FIELD_COLORS, SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createArticleJsonLd } from "@/lib/jsonld";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) notFound();
  const description = `${dialogue.participants.join("、")}的对话：${dialogue.title_en}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(dialogue.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return {
    title: `${dialogue.title} — 哲学对话`,
    description,
    openGraph: {
      title: `${dialogue.title} — 哲学对话`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function DialogueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) notFound();

  const allDialogues = getAllDialogues();
  const currentIndex = allDialogues.findIndex((d) => d.slug === slug);
  const prevDialogue = (currentIndex > 0 ? allDialogues[currentIndex - 1] : null) ?? null;
  const nextDialogue =
    (currentIndex < allDialogues.length - 1 ? allDialogues[currentIndex + 1] : null) ?? null;

  const fieldColor = FIELD_COLORS[dialogue.field] || "#c8a45a";

  const relatedDialogues = allDialogues
    .filter(
      (other) =>
        other.slug !== slug &&
        (other.field === dialogue.field ||
          other.participants.some((p) => dialogue.participants.includes(p)))
    )
    .slice(0, 4);

  const jsonLd = createArticleJsonLd({
    title: `${dialogue.title}（${dialogue.title_en}）`,
    description: `${dialogue.participants.join("、")}的对话：${dialogue.title_en}`,
    url: `${SITE_URL}/philosophy/dialogues/${slug}`,
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ArticleLayout
        backHref="/philosophy/dialogues"
        backLabel="← 返回哲学对话"
        breadcrumb={<Breadcrumb category="dialogues" currentTitle={dialogue.title} />}
        accent={fieldColor}
        eyebrow={dialogue.field}
        eyebrowMeta={[dialogue.era]}
        title={dialogue.title}
        titleEn={dialogue.title_en}
        content={dialogue.content}
        meta={
          <>
            <div>
              <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                对话者
              </p>
              <div className="flex flex-wrap gap-2">
                {dialogue.participants.map((p) => (
                  <span
                    key={p}
                    className="border-fg-disabled/20 text-fg-secondary rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.12em]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={`/philosophy/dialogues/${slug}/interactive`}
              className="mt-5 inline-flex items-center gap-2 border px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors"
              style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
            >
              交互式阅读
            </Link>
          </>
        }
        tags={dialogue.tags}
        prev={
          prevDialogue
            ? { href: `/philosophy/dialogues/${prevDialogue.slug}`, title: prevDialogue.title }
            : null
        }
        next={
          nextDialogue
            ? { href: `/philosophy/dialogues/${nextDialogue.slug}`, title: nextDialogue.title }
            : null
        }
        sidebar={
          <>
            <TableOfContents accentColor="#a88adf" />
            <div className="border-border-faint border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                对话信息
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    领域
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{dialogue.field}</dd>
                </div>
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    时代
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{dialogue.era}</dd>
                </div>
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    对话者
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{dialogue.participants.join("、")}</dd>
                </div>
              </dl>
            </div>
            {relatedDialogues.length > 0 && (
              <div className="border-border-faint mt-4 border p-4">
                <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                  相关对话
                </h3>
                <div className="space-y-2">
                  {relatedDialogues.map((other) => {
                    const otherColor = FIELD_COLORS[other.field] || "#c8a45a";
                    return (
                      <Link
                        key={other.slug}
                        href={`/philosophy/dialogues/${other.slug}`}
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
        <MarkdownRenderer content={dialogue.content} accentColor={fieldColor} />
        <SafeRender>
          <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
        </SafeRender>
      </ArticleLayout>
    </>
  );
}
