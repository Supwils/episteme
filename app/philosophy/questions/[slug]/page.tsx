import { notFound } from "next/navigation";
import Link from "next/link";
import { getQuestionBySlug, getAllQuestions, getThinkerBySlug } from "@/lib/mdx";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { FIELD_ACCENTS, SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createArticleJsonLd } from "@/lib/jsonld";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

/**
 * key_figures mixes thinker slugs ("parfit"), full romanized names
 * ("Daniel Dennett") and already-Chinese names ("洛克"). Resolve each to a
 * Chinese display name: the thinker page's frontmatter title first (trying the
 * id, its slugified form, then its last word), then a small fallback table for
 * figures without a thinker page — those names are taken from the question
 * bodies themselves (verified 2026-08); anything left shows the raw id.
 */
const KEY_FIGURE_FALLBACK: Record<string, string> = {
  bell: "贝尔",
  benacerraf: "贝纳塞拉夫",
  benatar: "贝纳塔尔",
  bergson: "柏格森",
  blackburn: "布莱克本",
  feyerabend: "费耶阿本德",
  field: "菲尔德",
  james: "詹姆斯",
  kane: "凯恩",
  korsgaard: "科斯嘉德",
  kuhn: "库恩",
  lakatos: "拉卡托斯",
  mackie: "麦基",
  mcmahan: "麦克马汉",
  moore: "摩尔",
  narveson: "纳尔维森",
  pereboom: "佩雷布姆",
  regan: "里根",
  singer: "辛格",
  stevenson: "史蒂文森",
  tarski: "塔尔斯基",
  turing: "图灵",
  williams: "威廉姆斯",
  "Viktor Frankl": "弗兰克尔",
  "Martin Seligman": "塞利格曼",
};

function resolveKeyFigure(id: string): string {
  if (/[一-鿿]/.test(id)) return id;
  const candidates = [id, id.toLowerCase().replace(/\s+/g, "-")];
  const lastWord = id.split(/\s+/).pop();
  if (lastWord) candidates.push(lastWord.toLowerCase());
  for (const slug of candidates) {
    const thinker = getThinkerBySlug(slug);
    if (thinker) return thinker.title;
  }
  return KEY_FIGURE_FALLBACK[id] ?? id;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);
  if (!question) notFound();
  const description = `${question.field}：${question.key_figures.map(resolveKeyFigure).join("、")}`;
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
  const keyFigureNames = question.key_figures.map(resolveKeyFigure);

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
    description: `${question.field}：${keyFigureNames.join("、")}`,
    url: `${SITE_URL}/philosophy/questions/${slug}`,
    author: keyFigureNames[0] ?? "Episteme · 格致",
    keywords: [question.title, question.field, ...keyFigureNames],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ArticleLayout
        backHref="/philosophy/questions"
        url={`/philosophy/questions/${slug}`}
        backLabel="← 返回哲学大问题"
        breadcrumb={<Breadcrumb category="questions" currentTitle={question.title} />}
        accent={fieldColor}
        eyebrow={question.field}
        title={question.title}
        content={question.content}
        meta={keyFigureNames.length > 0 ? <>关键人物：{keyFigureNames.join("、")}</> : undefined}
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
                    <dd className="text-fg-primary mt-0.5">{keyFigureNames.join("、")}</dd>
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
        <MarkdownRenderer domain="philosophy" content={question.content} accentColor={fieldColor} />
        <RelatedContent slug={slug} domain="philosophy" entityId={slug} />
      </ArticleLayout>
    </>
  );
}
