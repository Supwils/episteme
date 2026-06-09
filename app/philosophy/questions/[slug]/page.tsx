import { notFound } from "next/navigation";
import Link from "next/link";
import { getQuestionBySlug, getQuestionSlugs, getAllQuestions } from "@/lib/mdx";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { FIELD_ACCENTS, SITE_URL } from "@/lib/constants";
import { createArticleJsonLd } from "@/lib/jsonld";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  return getQuestionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);
  if (!question) notFound();
  const description = `${question.field}：${question.key_figures.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(question.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return {
    title: `${question.title} — 哲学大问题`,
    description,
    openGraph: { title: `${question.title} — 哲学大问题`, description, images: [{ url: ogImage, width: 1200, height: 630 }] },
  };
}

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);
  if (!question) notFound();

  const fieldColor = FIELD_ACCENTS[question.field] || "#c8a45a";

  const allQuestions = getAllQuestions();
  const relatedQuestions = allQuestions
    .filter(
      (other) =>
        other.slug !== question.slug &&
        (other.field === question.field ||
          other.key_figures.some((fig) => question.key_figures.includes(fig)))
    )
    .slice(0, 3);
  const readMinutes = Math.max(1, Math.ceil(question.content.replace(/\s/g, "").length / 400));

  const jsonLd = createArticleJsonLd({
    title: question.title,
    description: `${question.field}：${question.key_figures.join("、")}`,
    url: `${SITE_URL}/philosophy/questions/${slug}`,
    author: question.key_figures[0] ?? "Universe Knowledge",
    keywords: [question.title, question.field, ...question.key_figures],
  });

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/philosophy/questions"
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors"
      >
        ← 返回哲学大问题
      </Link>

      <Breadcrumb category="questions" currentTitle={question.title} />

      <header className="border-border-faint bg-bg-panel relative mb-12 overflow-hidden border p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: fieldColor }}
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full opacity-5 blur-2xl"
          style={{ backgroundColor: fieldColor }}
        />

        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
            >
              {question.field}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>

          <h1 className="font-display text-fg-primary text-[2rem] font-semibold leading-tight tracking-tight md:text-[2.6rem]">
            {question.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {question.key_figures.map((fig) => (
              <span
                key={fig}
                className="border-fg-disabled/30 text-fg-secondary hover:border-accent-gold/30 hover:text-accent-gold border px-3 py-1 font-mono text-[10px] tracking-[0.18em] transition-colors"
              >
                {fig}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 max-w-[1200px] flex-1">
          <MarkdownRenderer content={question.content} accentColor={fieldColor} />

          <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
        </article>

        <aside className="w-full flex-shrink-0 lg:w-80 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents accentColor="#a88adf" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">
              问题信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">
                  领域
                </dt>
                <dd className="text-fg-primary mt-0.5">{question.field}</dd>
              </div>
              {question.key_figures.length > 0 && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] uppercase tracking-[0.18em]">
                    关键人物
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{question.key_figures.join("、")}</dd>
                </div>
              )}
            </dl>
          </div>

          {relatedQuestions.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                相关问题
              </h3>
              <div className="space-y-2">
                {relatedQuestions.map((other) => {
                  const otherColor = FIELD_ACCENTS[other.field] || "#c8a45a";
                  return (
                    <Link
                      key={other.slug}
                      href={`/philosophy/questions/${other.slug}`}
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
    </div>
  );
}
