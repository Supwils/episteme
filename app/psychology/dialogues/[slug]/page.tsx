import { notFound } from "next/navigation";
import Link from "next/link";
import { getDialogueBySlug, getDialogueSlugs, getAllDialogues } from "@/subjects/psychology/lib/mdx";
import { ERA_COLORS } from "@/subjects/psychology/lib/constants";
import { SITE_URL } from "@/lib/constants";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
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

export default async function DialogueDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) notFound();

  const eraColor = ERA_COLORS[dialogue.era] || "#d4789c";
  const allDialogues = getAllDialogues();
  const currentIndex = allDialogues.findIndex((d) => d.slug === slug);
  const prevDialogue = (currentIndex > 0 ? allDialogues[currentIndex - 1] : null) ?? null;
  const nextDialogue = (currentIndex < allDialogues.length - 1 ? allDialogues[currentIndex + 1] : null) ?? null;
  const related = allDialogues
    .filter((d) => d.slug !== slug && (d.era === dialogue.era || d.participants.some((p) => dialogue.participants.includes(p))))
    .slice(0, 4);
  const readMinutes = Math.max(1, Math.ceil(dialogue.content.replace(/\s/g, "").length / 400));

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12">
      <Link href="/psychology/dialogues" className="text-fg-muted hover:text-accent-purple mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors">
        ← 返回思想对话
      </Link>

      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: eraColor }} />
        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.2em]" style={{ borderColor: `${eraColor}30`, color: eraColor }}>
              {dialogue.era}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">约 {readMinutes} 分钟阅读</span>
          </div>
          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">
            {dialogue.title}
          </h1>
          <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">
            {dialogue.title_en}
          </p>
          <div className="mt-4">
            <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">对话者</p>
            <div className="flex flex-wrap gap-2">
              {dialogue.participants.map((p) => (
                <span key={p} className="border-fg-disabled/20 text-fg-secondary rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.12em]">{p}</span>
              ))}
            </div>
          </div>
          {dialogue.question && (
            <p className="text-fg-secondary mt-4 text-sm leading-relaxed">{dialogue.question}</p>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {dialogue.tags.map((tag) => (
              <span key={tag} className="border-fg-disabled/30 text-fg-secondary border px-2.5 py-1 font-mono text-[10px] tracking-[0.22em]">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 flex-1 max-w-[1200px]">
          <MarkdownRenderer content={dialogue.content} accentColor={eraColor} />
        </article>
        <aside className="w-full lg:w-80 flex-shrink-0">
          <TableOfContents accentColor="#d4789c" />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">对话信息</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">时代</dt>
                <dd className="text-fg-primary mt-0.5">{dialogue.era}</dd>
              </div>
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">对话者</dt>
                <dd className="text-fg-primary mt-0.5">{dialogue.participants.join("、")}</dd>
              </div>
            </dl>
          </div>
          {related.length > 0 && (
            <div className="border-border-faint mt-4 border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">相关对话</h3>
              <div className="space-y-2">
                {related.map((d) => {
                  const color = ERA_COLORS[d.era] || "#d4789c";
                  return (
                    <Link key={d.slug} href={`/psychology/dialogues/${d.slug}`} className="group flex items-center gap-2 transition-colors">
                      <div className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70" style={{ backgroundColor: color }} />
                      <span className="text-fg-secondary group-hover:text-accent-purple text-sm transition-colors">{d.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prevDialogue ? (
          <Link href={`/psychology/dialogues/${prevDialogue.slug}`} className="group flex flex-1 flex-col gap-1 border border-border-faint p-4 transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel">
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">← 上一篇</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-purple">{prevDialogue.title}</span>
          </Link>
        ) : <div className="flex-1" />}
        {nextDialogue ? (
          <Link href={`/psychology/dialogues/${nextDialogue.slug}`} className="group flex flex-1 flex-col items-end gap-1 border border-border-faint p-4 text-right transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel">
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">下一篇 →</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-purple">{nextDialogue.title}</span>
          </Link>
        ) : <div className="flex-1" />}
      </nav>
    </div>
  );
}
