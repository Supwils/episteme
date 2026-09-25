import { notFound } from "next/navigation";
import { withCanonicalPath } from "@/lib/article-canonical";
import { getTheoremBySlug, getAllTheorems } from "@/subjects/mathematics/lib/theorems";
import { MATH_FIELD_COLORS } from "@/subjects/mathematics/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createDefinedTermJsonLd } from "@/lib/jsonld";
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
  const theorem = getTheoremBySlug(slug);
  if (!theorem) notFound();
  const description = `${theorem.title_en}：${theorem.field}。${theorem.tags.join("、")}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(theorem.title)}&section=mathematics&description=${encodeURIComponent(description)}`;
  return withCanonicalPath(`/mathematics/theorems/${slug}`, {
    title: `${theorem.title} — 数学定理`,
    description,
    openGraph: {
      title: `${theorem.title} — 数学定理`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
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
    <ArticleLayout
      backHref="/mathematics/theorems"
      url={`/mathematics/theorems/${slug}`}
      backLabel="← 返回定理"
      accent={fieldColor}
      eyebrow={theorem.field}
      eyebrowMeta={[theorem.difficulty]}
      title={theorem.title}
      titleEn={theorem.title_en}
      content={theorem.content}
      meta={
        <>
          {theorem.mathematician}
          {theorem.year ? ` · ${theorem.year}` : ""}
        </>
      }
      tags={theorem.tags}
      sidebar={
        <>
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
        </>
      }
      prev={
        prevTheorem && {
          href: `/mathematics/theorems/${prevTheorem.slug}`,
          title: prevTheorem.title,
        }
      }
      next={
        nextTheorem && {
          href: `/mathematics/theorems/${nextTheorem.slug}`,
          title: nextTheorem.title,
        }
      }
      prevLabel="上一个"
      nextLabel="下一个"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      {theorem.content ? (
        <MarkdownRenderer content={theorem.content} accentColor={fieldColor} domain="mathematics" />
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
