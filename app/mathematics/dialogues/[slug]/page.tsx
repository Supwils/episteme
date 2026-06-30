import { notFound } from "next/navigation";
import Link from "next/link";
import { getMathDialogueBySlug, getAllMathDialogues } from "@/subjects/mathematics/lib/dialogues";
import { MATH_FIELD_COLORS, MATH_ERA_ACCENT } from "@/subjects/mathematics/lib/constants";
import { MathMarkdownRenderer } from "@/subjects/mathematics/components/MathMarkdownRenderer";
import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createArticleJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";

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
  return {
    title: `${dialogue.title} — 数学对话`,
    description,
    openGraph: {
      title: `${dialogue.title} — 数学对话`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
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
  const eraColor = MATH_ERA_ACCENT[dialogue.era] || "#6366f1";
  const wordCount = dialogue.content.length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 400));

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
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Link
        href="/mathematics/dialogues"
        className="text-fg-muted hover:text-accent-indigo mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回数学对话
      </Link>

      <header className="border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
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
          <p className="text-fg-muted font-display text-lg tracking-wide italic">
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

          <div className="mt-5 flex flex-wrap gap-2">
            {dialogue.tags.map((tag) => (
              <span
                key={tag}
                className="border-fg-disabled/30 text-fg-secondary hover:border-accent-indigo/30 hover:text-accent-indigo border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <article className="max-w-[1200px] min-w-0">
        {dialogue.content ? (
          <MathMarkdownRenderer content={dialogue.content} accentColor={fieldColor} />
        ) : (
          <div className="border-border-faint bg-bg-panel border p-8 text-center">
            <p className="text-fg-muted text-sm">详细内容正在编写中。</p>
          </div>
        )}

        <SafeRender>
          <RelatedContent slug={slug} domain="mathematics" entityId={slug} />
        </SafeRender>
      </article>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prevDialogue ? (
          <Link
            href={`/mathematics/dialogues/${prevDialogue.slug}`}
            className="group border-border-faint hover:border-fg-disabled/30 hover:bg-bg-panel flex flex-1 flex-col gap-1 border p-4 transition-all duration-300"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              ← 上一篇
            </span>
            <span className="font-display text-fg-secondary group-hover:text-accent-indigo text-sm font-medium transition-colors">
              {prevDialogue.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextDialogue ? (
          <Link
            href={`/mathematics/dialogues/${nextDialogue.slug}`}
            className="group border-border-faint hover:border-fg-disabled/30 hover:bg-bg-panel flex flex-1 flex-col items-end gap-1 border p-4 text-right transition-all duration-300"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              下一篇 →
            </span>
            <span className="font-display text-fg-secondary group-hover:text-accent-indigo text-sm font-medium transition-colors">
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
