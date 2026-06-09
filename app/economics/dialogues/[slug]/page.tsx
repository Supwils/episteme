import { notFound } from "next/navigation";
import Link from "next/link";
import { getDialogueBySlug, getDialogueSlugs, getAllDialogues } from "@/subjects/economics/lib/mdx";
import { ERA_COLORS } from "@/subjects/economics/lib/constants";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Breadcrumb from "@/components/Breadcrumb";

export function generateStaticParams() {
  return getDialogueSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) notFound();
  return {
    title: `${dialogue.title} — 经济学对话`,
    description: `${dialogue.participants.join("、")}的对话`,
  };
}

export default async function DialogueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) notFound();

  const accent = ERA_COLORS[dialogue.era] ?? "#c8a45a";
  const allDialogues = getAllDialogues();
  const currentIndex = allDialogues.findIndex((d) => d.slug === slug);
  const prev = currentIndex > 0 ? allDialogues[currentIndex - 1] : null;
  const next = currentIndex < allDialogues.length - 1 ? allDialogues[currentIndex + 1] : null;
  const related = allDialogues
    .filter((d) => d.slug !== slug && (d.era === dialogue.era || dialogue.related.includes(d.slug)))
    .slice(0, 4);

  return (
    <ArticleLayout
      backHref="/economics/dialogues"
      backLabel="← 返回对话列表"
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "经济学", href: "/economics" },
            { label: "对话", href: "/economics/dialogues" },
            { label: dialogue.title },
          ]}
        />
      }
      accent={accent}
      eyebrow={dialogue.era}
      title={dialogue.title}
      titleEn={dialogue.title_en}
      content={dialogue.content}
      meta={
        <>
          {dialogue.question && <p className="text-base italic">{dialogue.question}</p>}
          <div className="mt-4">
            <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
              对话者
            </p>
            <div className="flex flex-wrap gap-2">
              {dialogue.participants.map((p) => (
                <span
                  key={p}
                  className="border-fg-disabled/20 text-fg-secondary rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.12em]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </>
      }
      tags={dialogue.tags}
      prev={prev ? { href: `/economics/dialogues/${prev.slug}`, title: prev.title } : null}
      next={next ? { href: `/economics/dialogues/${next.slug}`, title: next.title } : null}
      sidebar={
        <>
          <TableOfContents accentColor="#e8b84a" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              对话信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  时代
                </dt>
                <dd className="text-fg-primary mt-0.5">{dialogue.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                  对话者
                </dt>
                <dd className="text-fg-primary mt-0.5">{dialogue.participants.join("、")}</dd>
              </div>
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                相关对话
              </h3>
              <div className="space-y-2">
                {related.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/economics/dialogues/${d.slug}`}
                    className="group flex items-center gap-2 transition-colors"
                  >
                    <div
                      className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                      style={{ backgroundColor: ERA_COLORS[d.era] ?? "#c8a45a" }}
                    />
                    <span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">
                      {d.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      }
    >
      <MarkdownRenderer content={dialogue.content} accentColor="#61afef" />
    </ArticleLayout>
  );
}
