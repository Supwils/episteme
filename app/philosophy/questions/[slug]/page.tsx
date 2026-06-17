import { notFound } from "next/navigation";
import Link from "next/link";
import { getQuestionBySlug, getQuestionSlugs, getAllQuestions } from "@/lib/mdx";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { FIELD_ACCENTS, SITE_URL } from "@/lib/constants";
import { createArticleJsonLd } from "@/lib/jsonld";
import { ArticleLayout } from "@/components/ArticleLayout";
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
    openGraph: {
      title: `${question.title} — 哲学大问题`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
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

  const jsonLd = createArticleJsonLd({
    title: question.title,
    description: `${question.field}：${question.key_figures.join("、")}`,
    url: `${SITE_URL}/philosophy/questions/${slug}`,
    author: question.key_figures[0] ?? "Episteme · 格致",
    keywords: [question.title, question.field, ...question.key_figures],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout
        backHref="/philosophy/questions"
        backLabel="← 返回哲学大问题"
        breadcrumb={<Breadcrumb category="questions" currentTitle={question.title} />}
        accent={fieldColor}
        eyebrow={question.field}
        title={question.title}
        content={question.content}
        meta={
          question.key_figures.length > 0 ? (
            <>关键人物：{question.key_figures.join("、")}</>
          ) : undefined
        }
        sidebar={
          <>
            <TableOfContents accentColor="#a88adf" />
            <div className="border-border-faint border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                问题信息
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    领域
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{question.field}</dd>
                </div>
                {question.key_figures.length > 0 && (
                  <div>
                    <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                      关键人物
                    </dt>
                    <dd className="text-fg-primary mt-0.5">{question.key_figures.join("、")}</dd>
                  </div>
                )}
              </dl>
            </div>
            {relatedQuestions.length > 0 && (
              <div className="border-border-faint mt-4 border p-4">
                <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
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
          </>
        }
      >
        <MarkdownRenderer content={question.content} accentColor={fieldColor} />
        <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
      </ArticleLayout>
    </>
  );
}
