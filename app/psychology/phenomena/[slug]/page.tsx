import { notFound } from "next/navigation";
import Link from "next/link";
import { getPhenomenonBySlug, getAllPhenomena } from "@/subjects/psychology/lib/mdx";
import { CATEGORY_COLORS } from "@/subjects/psychology/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import AttachmentStyles from "@/subjects/psychology/components/visualizations/AttachmentStyles";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const phenomenon = getPhenomenonBySlug(slug);
  if (!phenomenon) notFound();
  const description = `${phenomenon.category}：${phenomenon.key_figures.join("、")}`;
  return {
    title: `${phenomenon.title} — 心理现象`,
    description,
    openGraph: { title: `${phenomenon.title} — 心理现象`, description },
  };
}

export default async function PhenomenonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const phenomenon = getPhenomenonBySlug(slug);
  if (!phenomenon) notFound();

  const catColor = CATEGORY_COLORS[phenomenon.category] || "#d4789c";
  const allPhenomena = getAllPhenomena();
  const related = allPhenomena
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.category === phenomenon.category ||
          p.key_figures.some((f) => phenomenon.key_figures.includes(f)))
    )
    .slice(0, 4);

  return (
    <ArticleLayout
      backHref="/psychology/phenomena"
      backLabel="← 返回心理现象"
      accent={catColor}
      eyebrow={phenomenon.category}
      title={phenomenon.title}
      titleEn={phenomenon.title_en}
      content={phenomenon.content}
      meta={
        phenomenon.key_figures.length > 0 ? (
          <>关键人物：{phenomenon.key_figures.join("、")}</>
        ) : undefined
      }
      tags={phenomenon.tags}
      sidebar={
        <>
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              现象信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  类别
                </dt>
                <dd className="text-fg-primary mt-0.5">{phenomenon.category}</dd>
              </div>
              {phenomenon.key_figures.length > 0 && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    关键人物
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{phenomenon.key_figures.join("、")}</dd>
                </div>
              )}
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关现象
              </h3>
              <div className="space-y-2">
                {related.map((p) => {
                  const color = CATEGORY_COLORS[p.category] || "#d4789c";
                  return (
                    <Link
                      key={p.slug}
                      href={`/psychology/phenomena/${p.slug}`}
                      className="group flex items-center gap-2 transition-colors"
                    >
                      <div
                        className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">
                        {p.title}
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
      {slug === "attachment-styles" && <AttachmentStyles />}
      <MarkdownRenderer domain="psychology" content={phenomenon.content} accentColor={catColor} />
    </ArticleLayout>
  );
}
