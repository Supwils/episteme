import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getDialogueBySlug, getAllDialogues } from "@/subjects/life-science/lib/dialogues";
import { getScientistById } from "@/subjects/life-science/lib/scientists";
import Breadcrumb from "@/components/Breadcrumb";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ArticleLayout } from "@/components/ArticleLayout";
import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createArticleJsonLd } from "@/lib/jsonld";

const ACCENT = "#4a9e6f";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

function participantName(id: string): string {
  return getScientistById(id)?.name ?? id;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) notFound();
  const names = dialogue.participants.map(participantName).join("、");
  const description = dialogue.question || `${names}的对话`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(dialogue.title)}&section=life-science&description=${encodeURIComponent(description)}`;
  return {
    title: `${dialogue.title} — 生命科学对话`,
    description,
    openGraph: {
      title: `${dialogue.title} — 生命科学对话`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function LifeScienceDialoguePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) notFound();

  const all = getAllDialogues();
  const i = all.findIndex((d) => d.slug === slug);
  const prev = (i > 0 ? all[i - 1] : null) ?? null;
  const next = (i >= 0 && i < all.length - 1 ? all[i + 1] : null) ?? null;

  const related = all
    .filter(
      (o) =>
        o.slug !== slug &&
        (o.field === dialogue.field ||
          o.participants.some((p) => dialogue.participants.includes(p)))
    )
    .slice(0, 4);

  const names = dialogue.participants.map(participantName);

  const jsonLd = createArticleJsonLd({
    title: dialogue.title,
    description: dialogue.question || `${names.join("、")}的对话`,
    url: `${SITE_URL}/life-science/dialogues/${slug}`,
    author: names[0] ?? "Episteme · 格致",
    keywords: [dialogue.title, dialogue.field, ...names, ...dialogue.tags],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ArticleLayout
        backHref="/life-science/dialogues"
        backLabel="← 返回生命科学对话"
        breadcrumb={
          <Breadcrumb category="dialogues" domain="life-science" currentTitle={dialogue.title} />
        }
        accent={ACCENT}
        eyebrow={dialogue.field}
        title={dialogue.title}
        content={dialogue.body}
        meta={
          <>
            {dialogue.question && (
              <p className="text-fg-secondary mt-3 max-w-2xl text-[15px] leading-relaxed italic">
                {dialogue.question}
              </p>
            )}
            <div className="mt-5">
              <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                对话者
              </p>
              <div className="flex flex-wrap gap-2">
                {dialogue.participants.map((p) => {
                  const sc = getScientistById(p);
                  const label = sc?.name ?? p;
                  return sc ? (
                    <Link
                      key={p}
                      href={`/life-science/scientists/${p}`}
                      className="border-fg-disabled/20 text-fg-secondary hover:border-accent-green/40 hover:text-accent-green rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.12em] transition-colors"
                    >
                      {label}
                    </Link>
                  ) : (
                    <span
                      key={p}
                      className="border-fg-disabled/20 text-fg-secondary rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.12em]"
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </>
        }
        tags={dialogue.tags}
        prev={prev ? { href: `/life-science/dialogues/${prev.slug}`, title: prev.title } : null}
        next={next ? { href: `/life-science/dialogues/${next.slug}`, title: next.title } : null}
        sidebar={
          <>
            <div className="border-border-faint border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                对话信息
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    领域
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{dialogue.field}</dd>
                </div>
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    对话者
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{names.join("、")}</dd>
                </div>
              </dl>
            </div>
            {related.length > 0 && (
              <div className="border-border-faint mt-4 border p-4">
                <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                  相关对话
                </h3>
                <div className="space-y-2">
                  {related.map((o) => (
                    <Link
                      key={o.slug}
                      href={`/life-science/dialogues/${o.slug}`}
                      className="group flex items-center gap-2 transition-colors"
                    >
                      <div
                        className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                        style={{ backgroundColor: ACCENT }}
                      />
                      <span className="text-fg-secondary group-hover:text-accent-green text-sm transition-colors">
                        {o.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        }
      >
        <MarkdownRenderer content={dialogue.body} accentColor={ACCENT} />
      </ArticleLayout>
    </>
  );
}
