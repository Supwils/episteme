import { notFound } from "next/navigation";
import Link from "next/link";
import { getTheoremBySlug, getAllTheorems } from "@/subjects/mathematics/lib/theorems";
import { MATH_FIELD_COLORS, MATH_DIFFICULTY_COLORS } from "@/subjects/mathematics/lib/constants";
import { MathMarkdownRenderer } from "@/subjects/mathematics/components/MathMarkdownRenderer";
import { SITE_URL } from "@/lib/constants";
import { createDefinedTermJsonLd } from "@/lib/jsonld";
import SafeRender from "@/components/SafeRender";
import RelatedContent from "@/components/RelatedContent";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theorem = getTheoremBySlug(slug);
  if (!theorem) notFound();
  const description = `${theorem.title_en}：${theorem.field}。${theorem.tags.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(theorem.title)}&section=mathematics&description=${encodeURIComponent(description)}`;
  return {
    title: `${theorem.title} — 数学定理`,
    description,
    openGraph: {
      title: `${theorem.title} — 数学定理`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function TheoremDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theorem = getTheoremBySlug(slug);
  if (!theorem) notFound();

  const allTheorems = getAllTheorems();
  const currentIndex = allTheorems.findIndex((t) => t.slug === slug);
  const prevTheorem = (currentIndex > 0 ? allTheorems[currentIndex - 1] : null) ?? null;
  const nextTheorem =
    (currentIndex < allTheorems.length - 1 ? allTheorems[currentIndex + 1] : null) ?? null;

  const fieldColor = MATH_FIELD_COLORS[theorem.field] || "#6366f1";
  const difficultyColor = MATH_DIFFICULTY_COLORS[theorem.difficulty] || "#6366f1";
  const wordCount = theorem.content.length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 400));

  const jsonLd = createDefinedTermJsonLd({
    name: `${theorem.title}（${theorem.title_en}）`,
    description: `${theorem.title_en}：${theorem.field}。${theorem.tags.join("、")}`,
    url: `${SITE_URL}/mathematics/theorems/${slug}`,
    inDefinedTermSet: "Mathematical Theorems",
    keywords: [
      theorem.title,
      theorem.title_en,
      theorem.field,
      theorem.mathematician,
      ...theorem.tags,
    ],
  });

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/mathematics/theorems"
        className="text-fg-muted hover:text-accent-indigo mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回定理
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
              {theorem.field}
            </span>
            <span
              className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.2em]"
              style={{ borderColor: `${difficultyColor}40`, color: difficultyColor }}
            >
              {theorem.difficulty}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              约 {readMinutes} 分钟阅读
            </span>
          </div>

          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">
            {theorem.title}
          </h1>
          <p className="text-fg-muted font-display text-lg tracking-wide italic opacity-70">
            {theorem.title_en}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="text-fg-secondary">{theorem.mathematician}</span>
            {theorem.year && (
              <>
                <span className="text-fg-disabled">·</span>
                <span className="text-fg-secondary">{theorem.year}</span>
              </>
            )}
          </div>

          {theorem.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {theorem.tags.map((tag) => (
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

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="max-w-[1200px] min-w-0 flex-1">
          {theorem.content ? (
            <MathMarkdownRenderer content={theorem.content} accentColor={fieldColor} />
          ) : (
            <div className="border-border-faint bg-bg-panel border p-8 text-center">
              <p className="text-fg-muted text-sm">详细内容正在编写中。</p>
            </div>
          )}

          <SafeRender>
            <RelatedContent slug={slug} domain="mathematics" entityId={slug} />
          </SafeRender>
        </article>

        <ArticleSidebar>
          <TableOfContents accentColor={fieldColor} />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              定理信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  领域
                </dt>
                <dd className="text-fg-primary mt-0.5">{theorem.field}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  难度
                </dt>
                <dd className="text-fg-primary mt-0.5">{theorem.difficulty}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  证明者
                </dt>
                <dd className="text-fg-primary mt-0.5">{theorem.mathematician}</dd>
              </div>
              {theorem.year && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    年份
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{theorem.year}</dd>
                </div>
              )}
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  阅读时间
                </dt>
                <dd className="text-fg-primary mt-0.5">约 {readMinutes} 分钟</dd>
              </div>
            </dl>
          </div>
        </ArticleSidebar>
      </div>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prevTheorem ? (
          <Link
            href={`/mathematics/theorems/${prevTheorem.slug}`}
            className="group border-border-faint hover:border-fg-disabled/30 hover:bg-bg-panel flex flex-1 flex-col gap-1 border p-4 transition-all duration-300"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              ← 上一个
            </span>
            <span className="font-display text-fg-secondary group-hover:text-accent-indigo text-sm font-medium transition-colors">
              {prevTheorem.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextTheorem ? (
          <Link
            href={`/mathematics/theorems/${nextTheorem.slug}`}
            className="group border-border-faint hover:border-fg-disabled/30 hover:bg-bg-panel flex flex-1 flex-col items-end gap-1 border p-4 text-right transition-all duration-300"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
              下一个 →
            </span>
            <span className="font-display text-fg-secondary group-hover:text-accent-indigo text-sm font-medium transition-colors">
              {nextTheorem.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </div>
  );
}
