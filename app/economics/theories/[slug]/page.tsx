import { notFound } from "next/navigation";
import Link from "next/link";
import { getTheoryBySlug, getAllTheories } from "@/subjects/economics/lib/mdx";
import { CATEGORY_COLORS } from "@/subjects/economics/lib/constants";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Breadcrumb from "@/components/Breadcrumb";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theory = getTheoryBySlug(slug);
  if (!theory) notFound();
  return {
    title: `${theory.title} — 经济理论`,
    description: `${theory.title}（${theory.title_en}）：${theory.key_figures.join("、")}`,
  };
}

export default async function TheoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theory = getTheoryBySlug(slug);
  if (!theory) notFound();

  const allTheories = getAllTheories();
  const currentIndex = allTheories.findIndex((t) => t.slug === slug);
  const prev = currentIndex > 0 ? allTheories[currentIndex - 1] : null;
  const next = currentIndex < allTheories.length - 1 ? allTheories[currentIndex + 1] : null;

  const accent = CATEGORY_COLORS[theory.category] ?? "#c8a45a";

  const related = allTheories
    .filter(
      (t) => t.slug !== slug && (t.category === theory.category || theory.related.includes(t.slug))
    )
    .slice(0, 4);

  return (
    <ArticleLayout
      backHref="/economics/theories"
      backLabel="← 返回理论列表"
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "经济学", href: "/economics" },
            { label: "经济理论", href: "/economics/theories" },
            { label: theory.title },
          ]}
        />
      }
      accent={accent}
      eyebrow={theory.category}
      eyebrowMeta={[theory.period]}
      title={theory.title}
      titleEn={theory.title_en}
      content={theory.content}
      meta={
        theory.key_figures.length > 0 ? <>代表人物：{theory.key_figures.join("、")}</> : undefined
      }
      tags={theory.tags}
      articleClassName="max-w-[900px]"
      prev={prev ? { href: `/economics/theories/${prev.slug}`, title: prev.title } : null}
      next={next ? { href: `/economics/theories/${next.slug}`, title: next.title } : null}
      sidebar={
        <>
          <TableOfContents accentColor="#e8b84a" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              理论信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  分类
                </dt>
                <dd className="text-fg-primary mt-0.5">{theory.category}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  时期
                </dt>
                <dd className="text-fg-primary mt-0.5">{theory.period}</dd>
              </div>
              {theory.key_figures.length > 0 && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    代表人物
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{theory.key_figures.join("、")}</dd>
                </div>
              )}
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关理论
              </h3>
              <div className="space-y-2">
                {related.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/economics/theories/${t.slug}`}
                    className="group flex items-center gap-2 transition-colors"
                  >
                    <div
                      className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                      style={{ backgroundColor: CATEGORY_COLORS[t.category] ?? "#c8a45a" }}
                    />
                    <span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">
                      {t.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      }
    >
      <MarkdownRenderer domain="economics" content={theory.content} accentColor="#61afef" />
    </ArticleLayout>
  );
}
