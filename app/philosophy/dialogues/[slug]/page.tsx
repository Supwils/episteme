import { notFound } from "next/navigation";
import Link from "next/link";
import { getDialogueBySlug, getDialogueSlugs, getAllDialogues } from "@/lib/dialogues";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import SafeRender from "@/components/SafeRender";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { FIELD_COLORS, ERA_ACCENT, SITE_URL } from "@/lib/constants";
import { createArticleJsonLd } from "@/lib/jsonld";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  return getDialogueSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) notFound();
  const description = `${dialogue.participants.join("、")}的对话：${dialogue.title_en}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(dialogue.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return {
    title: `${dialogue.title} — 哲学对话`,
    description,
    openGraph: { title: `${dialogue.title} — 哲学对话`, description, images: [{ url: ogImage, width: 1200, height: 630 }] },
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
  const prevDialogue =
    (currentIndex > 0 ? allDialogues[currentIndex - 1] : null) ?? null;
  const nextDialogue =
    (currentIndex < allDialogues.length - 1
      ? allDialogues[currentIndex + 1]
      : null) ?? null;

  const fieldColor = FIELD_COLORS[dialogue.field] || "#c8a45a";
  const eraColor = ERA_ACCENT[dialogue.era] || "#c8a45a";

  const wordCount = dialogue.content.length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 400));

  const relatedDialogues = allDialogues
    .filter(
      (other) =>
        other.slug !== slug &&
        (other.field === dialogue.field ||
          other.participants.some((p) => dialogue.participants.includes(p))),
    )
    .slice(0, 4);

  const jsonLd = createArticleJsonLd({
    title: `${dialogue.title}（${dialogue.title_en}）`,
    description: `${dialogue.participants.join("、")}的对话：${dialogue.title_en}`,
    url: `${SITE_URL}/philosophy/dialogues/${slug}`,
    author: dialogue.participants[0] ?? 'Universe Knowledge',
    keywords: [dialogue.title, dialogue.title_en, dialogue.field, ...dialogue.participants, ...dialogue.tags],
  });

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/philosophy/dialogues"
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回哲学对话
      </Link>

      <Breadcrumb category="dialogues" currentTitle={dialogue.title} />

      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: fieldColor }}
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full opacity-5 blur-2xl"
          style={{ backgroundColor: eraColor }}
        />

        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase"
              style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
            >
              {dialogue.field}
            </span>
            <span
              className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.2em]"
              style={{ borderColor: `${eraColor}30`, color: eraColor }}
            >
              {dialogue.era}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              约 {readMinutes} 分钟阅读
            </span>
          </div>

          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">
            {dialogue.title}
          </h1>
          <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">
            {dialogue.title_en}
          </p>

          <div className="mt-4">
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

          <div className="mt-5 flex flex-wrap gap-2">
            {dialogue.tags.map((tag) => (
              <span
                key={tag}
                className="border-fg-disabled/30 text-fg-secondary border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] transition-colors hover:border-accent-gold/30 hover:text-accent-gold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 flex-1 max-w-[1200px]">
          <MarkdownRenderer content={dialogue.content} accentColor={fieldColor} />

          <SafeRender>
            <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
          </SafeRender>
        </article>

        <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents accentColor="#a88adf" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              对话信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">领域</dt>
                <dd className="text-fg-primary mt-0.5">{dialogue.field}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">时代</dt>
                <dd className="text-fg-primary mt-0.5">{dialogue.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">阅读时间</dt>
                <dd className="text-fg-primary mt-0.5">约 {readMinutes} 分钟</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">对话者</dt>
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
        </aside>
      </div>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prevDialogue ? (
          <Link
            href={`/philosophy/dialogues/${prevDialogue.slug}`}
            className="group flex flex-1 flex-col gap-1 border border-border-faint p-4 transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              ← 上一篇
            </span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {prevDialogue.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextDialogue ? (
          <Link
            href={`/philosophy/dialogues/${nextDialogue.slug}`}
            className="group flex flex-1 flex-col items-end gap-1 border border-border-faint p-4 text-right transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              下一篇 →
            </span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {nextDialogue.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </div>
  );
}
