import { notFound } from "next/navigation";
import Link from "next/link";
import { getQuestionBySlug, getQuestionSlugs, getAllQuestions } from "@/lib/mdx";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export function generateStaticParams() {
  return getQuestionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);
  if (!question) return {};
  return {
    title: `${question.title} — 哲学大问题`,
    description: `${question.field}：${question.key_figures.join("、")}`,
  };
}

const FIELD_ACCENTS: Record<string, string> = {
  形而上学: "#c678dd",
  认识论: "#61afef",
  伦理学: "#e06c75",
  美学: "#e5c07b",
  逻辑学: "#98c379",
  政治哲学: "#56b6c2",
  语言哲学: "#d19a66",
  科学哲学: "#be5046",
  心灵哲学: "#a88adf",
  宗教哲学: "#c8a45a",
  本体论: "#c678dd",
  "存在主义 / 语言哲学": "#e5c07b",
  "形而上学 / 伦理学": "#c678dd",
};

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
          other.key_figures.some((fig) => question.key_figures.includes(fig))),
    )
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/questions"
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回哲学大问题
      </Link>

      <Breadcrumb category="questions" currentTitle={question.title} />

      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
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
              className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase"
              style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
            >
              {question.field}
            </span>
          </div>

          <h1 className="font-display text-fg-primary text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.6rem]">
            {question.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {question.key_figures.map((fig) => (
              <span
                key={fig}
                className="border-fg-disabled/30 text-fg-secondary border px-3 py-1 font-mono text-[10px] tracking-[0.18em] transition-colors hover:border-accent-gold/30 hover:text-accent-gold"
              >
                {fig}
              </span>
            ))}
          </div>
        </div>
      </header>

      <MarkdownRenderer content={question.content} accentColor={fieldColor} />

      {relatedQuestions.length > 0 && (
        <section className="border-border-faint mt-12 border-t pt-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
              相关问题 · related questions
            </span>
            <span className="bg-border-faint h-px flex-1" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {relatedQuestions.map((other) => {
              const otherColor = FIELD_ACCENTS[other.field] || "#c8a45a";
              return (
                <Link
                  key={other.slug}
                  href={`/questions/${other.slug}`}
                  className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 flex items-start gap-3 border p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="mt-1 h-8 w-1 shrink-0 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-70"
                    style={{ backgroundColor: otherColor }}
                  />
                  <div className="flex-1">
                    <h4 className="font-display text-fg-primary text-sm font-semibold leading-snug transition-colors group-hover:text-accent-gold">
                      {other.title}
                    </h4>
                    <p className="text-fg-muted mt-1 font-mono text-[9px] tracking-wider">
                      {other.field} · {other.key_figures.slice(0, 2).join("、")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <RelatedContent slug={slug} />
    </article>
  );
}
