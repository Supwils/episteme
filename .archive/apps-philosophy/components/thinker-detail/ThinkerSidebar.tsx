import Link from "next/link";
import { ERA_ACCENT } from "@/lib/constants";

interface ThinkerSidebarProps {
  headings: { id: string; text: string }[];
  accent: string;
  era: string;
  school: string;
  readMinutes: number;
  wordCount: number;
  relatedThinkers: {
    slug: string;
    title: string;
    philosopher: string;
    era: string;
  }[];
}

export default function ThinkerSidebar({
  headings,
  accent,
  era,
  school,
  readMinutes,
  wordCount,
  relatedThinkers,
}: ThinkerSidebarProps) {
  return (
    <aside className="w-full shrink-0 lg:w-72">
      <div className="lg:sticky lg:top-24">
        {headings.length > 0 && (
          <div className="border-border-faint mb-8 hidden border-l pl-4 lg:block">
            <p className="text-fg-muted mb-3 font-mono text-[9px] tracking-[0.32em] uppercase">
              目录 · contents
            </p>
            <nav className="space-y-1.5">
              {headings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className="text-fg-muted hover:text-accent-gold block py-0.5 font-mono text-[11px] leading-relaxed tracking-[0.04em] transition-colors"
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </div>
        )}

        <div className="border-border-faint mb-8 border p-4">
          <p className="text-fg-muted mb-3 font-mono text-[9px] tracking-[0.32em] uppercase">
            速览 · quick facts
          </p>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-fg-disabled font-mono text-[10px] tracking-[0.12em]">
                时代
              </span>
              <span
                className="font-mono text-[11px]"
                style={{ color: accent }}
              >
                {era}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-fg-disabled font-mono text-[10px] tracking-[0.12em]">
                流派
              </span>
              <span className="text-fg-secondary font-mono text-[11px]">
                {school}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-fg-disabled font-mono text-[10px] tracking-[0.12em]">
                阅读时长
              </span>
              <span className="text-fg-secondary font-mono text-[11px]">
                ≈{readMinutes} 分钟
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-fg-disabled font-mono text-[10px] tracking-[0.12em]">
                字数
              </span>
              <span className="text-fg-secondary font-mono text-[11px]">
                {wordCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {relatedThinkers.length > 0 && (
          <div className="border-border-faint mb-8 border p-4">
            <p className="text-fg-muted mb-3 font-mono text-[9px] tracking-[0.32em] uppercase">
              相关哲学家 · related
            </p>
            <div className="space-y-2">
              {relatedThinkers.map((rt) => {
                const rtAccent = ERA_ACCENT[rt.era] ?? "#c8a45a";
                return (
                  <Link
                    key={rt.slug}
                    href={`/thinkers/${rt.slug}`}
                    className="group flex items-center gap-3 border border-transparent p-2 transition-all duration-300 hover:border-border-faint hover:bg-bg-elevated"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center border font-display text-sm italic"
                      style={{
                        borderColor: `${rtAccent}30`,
                        color: rtAccent,
                      }}
                    >
                      {rt.title[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-fg-primary truncate text-sm font-medium transition-colors group-hover:text-accent-gold">
                        {rt.title}
                      </p>
                      <p className="text-fg-disabled font-mono text-[9px] tracking-[0.12em]">
                        {rt.philosopher} · {rt.era}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {headings.length > 0 && (
          <details className="border-border-faint border lg:hidden">
            <summary className="text-fg-muted cursor-pointer px-4 py-3 font-mono text-[10px] tracking-[0.28em] uppercase">
              目录 · contents
            </summary>
            <nav className="border-border-faint space-y-1.5 border-t px-4 pt-3 pb-4">
              {headings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className="text-fg-muted hover:text-accent-gold block py-0.5 font-mono text-[11px] leading-relaxed transition-colors"
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </details>
        )}
      </div>
    </aside>
  );
}
