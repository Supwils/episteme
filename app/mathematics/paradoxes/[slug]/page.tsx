import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getMathParadoxBySlug,
  getMathParadoxSlugs,
  getAllMathParadoxes,
} from "@/subjects/mathematics/lib/paradoxes";
import { MATH_FIELD_COLORS } from "@/subjects/mathematics/lib/constants";
import { MathMarkdownRenderer } from "@/subjects/mathematics/components/MathMarkdownRenderer";
import { SITE_URL } from "@/lib/constants";
import { createArticleJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";

export function generateStaticParams() {
  return getMathParadoxSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paradox = getMathParadoxBySlug(slug);
  if (!paradox) notFound();
  const description = `${paradox.title_en}：${paradox.field}。${paradox.tags.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(paradox.title)}&section=mathematics&description=${encodeURIComponent(description)}`;
  return {
    title: `${paradox.title} — 数学悖论`,
    description,
    openGraph: {
      title: `${paradox.title} — 数学悖论`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
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
  const wordCount = paradox.content.length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 400));

  const jsonLd = createArticleJsonLd({
    title: `${paradox.title}（${paradox.title_en}）`,
    description: `${paradox.title_en}：${paradox.field}。${paradox.tags.join("、")}`,
    url: `${SITE_URL}/mathematics/paradoxes/${slug}`,
    author: paradox.key_figures[0] ?? "Universe Knowledge",
    keywords: [
      paradox.title,
      paradox.title_en,
      paradox.field,
      ...paradox.key_figures,
      ...paradox.tags,
    ],
  });

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/mathematics/paradoxes"
        className="text-fg-muted hover:text-accent-indigo mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回悖论
      </Link>

      <header className="border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: fieldColor }}
        />

        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase"
              style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
            >
              {paradox.field}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              约 {readMinutes} 分钟阅读
            </span>
          </div>

          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">
            {paradox.title}
          </h1>
          <p className="text-fg-muted font-display text-lg tracking-wide italic opacity-70">
            {paradox.title_en}
          </p>

          {paradox.key_figures.length > 0 && (
            <div className="mt-4">
              <p className="text-fg-disabled mb-2 font-mono text-[9px] tracking-[0.18em] uppercase">
                相关人物
              </p>
              <div className="flex flex-wrap gap-2">
                {paradox.key_figures.map((fig) => (
                  <span
                    key={fig}
                    className="border-fg-disabled/20 text-fg-secondary rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.12em]"
                  >
                    {fig}
                  </span>
                ))}
              </div>
            </div>
          )}

          {paradox.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {paradox.tags.map((tag) => (
                <span
                  key={tag}
                  className="hover:border-accent-indigo/30 hover:text-accent-indigo border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] transition-colors"
                  style={{
                    borderColor: `${fieldColor}20`,
                    color: `${fieldColor}cc`,
                    backgroundColor: `${fieldColor}08`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <article className="max-w-[1200px] min-w-0">
        {paradox.content ? (
          <MathMarkdownRenderer content={paradox.content} accentColor={fieldColor} />
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
        {prevParadox ? (
          <Link
            href={`/mathematics/paradoxes/${prevParadox.slug}`}
            className="group border-border-faint hover:border-fg-disabled/30 hover:bg-bg-panel flex flex-1 flex-col gap-1 border p-4 transition-all duration-300"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              ← 上一个
            </span>
            <span className="font-display text-fg-secondary group-hover:text-accent-indigo text-sm font-medium transition-colors">
              {prevParadox.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextParadox ? (
          <Link
            href={`/mathematics/paradoxes/${nextParadox.slug}`}
            className="group border-border-faint hover:border-fg-disabled/30 hover:bg-bg-panel flex flex-1 flex-col items-end gap-1 border p-4 text-right transition-all duration-300"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              下一个 →
            </span>
            <span className="font-display text-fg-secondary group-hover:text-accent-indigo text-sm font-medium transition-colors">
              {nextParadox.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </div>
  );
}
