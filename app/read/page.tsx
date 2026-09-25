import Link from "next/link";
import { SpotlightGrid } from "@/components/motion/SpotlightGrid";
import { READING_PATHS, totalReadingSteps } from "@/lib/reading-paths";

export const dynamic = "force-static";

export default function ReadIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-12 max-w-2xl">
        <span className="text-fg-muted font-mono text-[11px] tracking-[0.32em] uppercase">
          阅读路线
        </span>
        <h1 className="font-display text-fg-primary mt-3 text-4xl font-semibold sm:text-5xl">
          像读一本书
        </h1>
        <p className="text-fg-secondary mt-4 text-[15px] leading-relaxed">
          百科适合查阅，却不适合通读。这里把散落的文章重新编排成一条条有起点、有顺序、有终点的路线——
          选一条开始，跟着「下一篇」一路读下去，像读完一本书那样读完一个主题。
        </p>
        <p className="text-fg-muted mt-3 font-mono text-[12px]">
          {READING_PATHS.length} 条路线 · {totalReadingSteps()} 章
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/random"
            className="border-border-subtle text-fg-secondary hover:border-fg-disabled hover:text-fg-primary inline-flex items-center gap-2 border px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors"
          >
            随机一篇文章
          </Link>
        </div>
      </header>

      <SpotlightGrid className="grid gap-4 sm:grid-cols-2">
        {READING_PATHS.map((path) => (
          <Link
            key={path.slug}
            href={`/read/${path.slug}`}
            data-spotlight
            style={{ "--spot": path.accent } as React.CSSProperties}
            className="group border-border-subtle bg-bg-elevated hover:border-border-strong relative overflow-hidden rounded-2xl border p-6 transition-colors"
          >
            <span
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: path.accent }}
              aria-hidden
            />
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: path.accent }}
                aria-hidden
              />
              <span className="text-fg-muted font-mono text-[10px] tracking-[0.2em] uppercase">
                {path.domainLabel}
              </span>
            </div>
            <h2 className="font-display text-fg-primary mt-3 text-xl font-semibold">
              {path.title}
            </h2>
            <p className="text-fg-muted mt-1 text-[13px]">{path.subtitle}</p>
            <p className="text-fg-secondary mt-3 line-clamp-3 text-[13px] leading-relaxed">
              {path.description}
            </p>
            {/* Mini storyboard strip — Shape-of-World style chapter beats */}
            <div className="mt-4 flex items-center gap-1.5" aria-hidden>
              {path.steps.slice(0, 7).map((step, i) => (
                <span
                  key={step.href}
                  className="bg-bg-near border-border-faint flex h-7 min-w-0 flex-1 items-center justify-center border font-mono text-[9px]"
                  style={{ color: path.accent, borderColor: `${path.accent}40` }}
                  title={step.title}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
              {path.steps.length > 7 ? (
                <span className="text-fg-muted font-mono text-[9px]">+{path.steps.length - 7}</span>
              ) : null}
            </div>
            <div className="text-fg-muted mt-4 flex items-center justify-between font-mono text-[11px]">
              <span>{path.steps.length} 章</span>
              <span
                className="inline-flex items-center gap-1 opacity-90 transition-opacity group-hover:opacity-100"
                style={{ color: path.accent }}
              >
                开始阅读
                <svg
                  width="14"
                  height="14"
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
            </div>
          </Link>
        ))}
      </SpotlightGrid>
    </div>
  );
}
