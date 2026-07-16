import { notFound } from "next/navigation";
import Link from "next/link";
import { getDisorderBySlug, getAllDisorders } from "@/subjects/psychology/lib/mdx";
import { DISORDER_CATEGORY_COLORS } from "@/subjects/psychology/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const disorder = getDisorderBySlug(slug);
  if (!disorder) notFound();
  const description = `${disorder.category}：${disorder.title_en}`;
  return {
    title: `${disorder.title} — 心理障碍`,
    description,
    openGraph: { title: `${disorder.title} — 心理障碍`, description },
  };
}

export default async function DisorderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const disorder = getDisorderBySlug(slug);
  if (!disorder) notFound();

  const catColor = DISORDER_CATEGORY_COLORS[disorder.category] || "#d4789c";
  const allDisorders = getAllDisorders();
  const related = allDisorders
    .filter((d) => d.slug !== slug && d.category === disorder.category)
    .slice(0, 4);

  return (
    <ArticleLayout
      backHref="/psychology/disorders"
      backLabel="← 返回心理障碍"
      accent={catColor}
      eyebrow={disorder.category}
      eyebrowMeta={[disorder.dsm_code]}
      title={disorder.title}
      titleEn={disorder.title_en}
      content={disorder.content}
      meta={
        disorder.key_symptoms.length > 0 ? (
          <>核心症状：{disorder.key_symptoms.join("、")}</>
        ) : undefined
      }
      tags={disorder.tags}
      sidebar={
        <>
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              障碍信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  分类
                </dt>
                <dd className="text-fg-primary mt-0.5">{disorder.category}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  DSM编码
                </dt>
                <dd className="text-fg-primary mt-0.5">{disorder.dsm_code}</dd>
              </div>
              {disorder.key_symptoms.length > 0 && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    核心症状
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{disorder.key_symptoms.join("、")}</dd>
                </div>
              )}
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关障碍
              </h3>
              <div className="space-y-2">
                {related.map((d) => {
                  const color = DISORDER_CATEGORY_COLORS[d.category] || "#d4789c";
                  return (
                    <Link
                      key={d.slug}
                      href={`/psychology/disorders/${d.slug}`}
                      className="group flex items-center gap-2 transition-colors"
                    >
                      <div
                        className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">
                        {d.title}
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
      <MarkdownRenderer domain="psychology" content={disorder.content} accentColor={catColor} />
    </ArticleLayout>
  );
}
