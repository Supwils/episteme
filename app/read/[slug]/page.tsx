import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { READING_PATHS, getReadingPath } from "@/lib/reading-paths";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return READING_PATHS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = getReadingPath(slug);
  if (!path) return { title: "阅读路线 — Episteme · 格致" };
  return {
    title: `${path.title} — 阅读路线`,
    description: path.subtitle,
    openGraph: { title: `${path.title} — 阅读路线`, description: path.subtitle, type: "article" },
  };
}

export default async function ReadingPathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = getReadingPath(slug);
  if (!path) notFound();

  const first = path.steps[0]!;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/read"
        className="text-fg-muted hover:text-fg-secondary inline-flex items-center gap-1 font-mono text-[11px] transition-colors"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 12L6 8l4-4" />
        </svg>
        全部路线
      </Link>

      <header className="border-border-subtle mt-6 border-b pb-8">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: path.accent }}
            aria-hidden
          />
          <span className="text-fg-muted font-mono text-[11px] tracking-[0.2em] uppercase">
            {path.domainLabel} · {path.steps.length} 章
          </span>
        </div>
        <h1 className="font-display text-fg-primary mt-4 text-4xl font-semibold sm:text-5xl">
          {path.title}
        </h1>
        <p className="text-fg-secondary mt-2 text-lg">{path.subtitle}</p>
        <p className="text-fg-secondary mt-5 text-[15px] leading-relaxed">{path.description}</p>

        <Link
          href={`${first.href}?path=${path.slug}&step=1`}
          className="mt-7 inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-[14px] font-medium transition-opacity hover:opacity-90"
          style={{
            color: `color-mix(in oklab, ${path.accent} 42%, var(--color-fg-primary))`,
            background: `color-mix(in srgb, ${path.accent} 16%, var(--color-bg-near))`,
            borderColor: `color-mix(in srgb, ${path.accent} 40%, var(--color-border-subtle))`,
          }}
        >
          从第 1 章开始
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
        </Link>
      </header>

      {/* Vertical storyboard with connector spine */}
      <ol className="relative mt-10 space-y-0">
        <span
          aria-hidden
          className="absolute top-4 bottom-4 left-[1.35rem] w-px"
          style={{ background: `${path.accent}35` }}
        />
        {path.steps.map((s, i) => (
          <li key={s.href} className="relative">
            <Link
              href={`${s.href}?path=${path.slug}&step=${i + 1}`}
              className="group hover:bg-bg-elevated flex items-start gap-4 rounded-xl px-3 py-4 transition-colors"
            >
              <span
                className="relative z-1 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-[var(--color-bg-base)] font-mono text-[11px] font-medium"
                style={{ borderColor: path.accent, color: path.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-fg-muted mb-1 block font-mono text-[10px] tracking-[0.18em] uppercase">
                  第 {i + 1} 章
                </span>
                <span className="text-fg-primary group-hover:text-fg-primary block text-[15px] font-medium">
                  {s.title}
                </span>
                {s.blurb && (
                  <span className="text-fg-muted mt-1 block text-[13px] leading-relaxed">
                    {s.blurb}
                  </span>
                )}
              </span>
              <span className="text-fg-disabled group-hover:text-fg-secondary mt-2 shrink-0 transition-colors">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
