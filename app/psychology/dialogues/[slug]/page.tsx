import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getDialogueBySlug,
  getDialogueSlugs,
  getAllDialogues,
} from "@/subjects/psychology/lib/mdx";
import { ERA_COLORS } from "@/subjects/psychology/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";

export function generateStaticParams() {
  return getDialogueSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) notFound();
  const description = `${dialogue.participants.join("、")}的对话：${dialogue.question}`;
  return {
    title: `${dialogue.title} — 思想对话`,
    description,
    openGraph: { title: `${dialogue.title} — 思想对话`, description },
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

  const eraColor = ERA_COLORS[dialogue.era] || "#d4789c";
  const allDialogues = getAllDialogues();
  const currentIndex = allDialogues.findIndex((d) => d.slug === slug);
  const prevDialogue = (currentIndex > 0 ? allDialogues[currentIndex - 1] : null) ?? null;
  const nextDialogue =
    (currentIndex < allDialogues.length - 1 ? allDialogues[currentIndex + 1] : null) ?? null;
  const related = allDialogues
    .filter(
      (d) =>
        d.slug !== slug &&
        (d.era === dialogue.era || d.participants.some((p) => dialogue.participants.includes(p)))
    )
    .slice(0, 4);

  return (
    <ArticleLayout
      backHref="/psychology/dialogues"
      backLabel="← 返回思想对话"
      accent={eraColor}
      eyebrow={dialogue.era}
      title={dialogue.title}
      titleEn={dialogue.title_en}
      content={dialogue.content}
      meta={
        <>
          <div>
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
          {dialogue.question && <p className="mt-4 text-sm leading-relaxed">{dialogue.question}</p>}
        </>
      }
      tags={dialogue.tags}
      prev={
        prevDialogue
          ? { href: `/psychology/dialogues/${prevDialogue.slug}`, title: prevDialogue.title }
          : null
      }
      next={
        nextDialogue
          ? { href: `/psychology/dialogues/${nextDialogue.slug}`, title: nextDialogue.title }
          : null
      }
      sidebar={
        <>
          <TableOfContents accentColor="#d4789c" />
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
                {related.map((d) => {
                  const color = ERA_COLORS[d.era] || "#d4789c";
                  return (
                    <Link
                      key={d.slug}
                      href={`/psychology/dialogues/${d.slug}`}
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
      <MarkdownRenderer content={dialogue.content} accentColor={eraColor} />
    </ArticleLayout>
  );
}
