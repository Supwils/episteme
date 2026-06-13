import Link from "next/link";
import { ERA_ACCENT } from "@/lib/constants";
import { TableOfContents } from "@/components/TableOfContents";

interface ThinkerSidebarProps {
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
  accent,
  era,
  school,
  readMinutes,
  wordCount,
  relatedThinkers,
}: ThinkerSidebarProps) {
  // No <aside> or sticky wrapper here: the page hosts this inside the shared
  // <ArticleSidebar>, which owns the sticky-follow behavior. A nested aside
  // collapses to content height and starves `sticky` of travel room.
  return (
    <div>
      <TableOfContents accentColor="#a88adf" />

      <div className="border-border-faint mb-8 border p-4">
        <p className="text-fg-muted mb-3 font-mono text-[9px] tracking-[0.32em] uppercase">
          速览 · quick facts
        </p>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.12em]">时代</span>
            <span className="font-mono text-[11px]" style={{ color: accent }}>
              {era}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.12em]">流派</span>
            <span className="text-fg-secondary font-mono text-[11px]">{school}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.12em]">
              阅读时长
            </span>
            <span className="text-fg-secondary font-mono text-[11px]">≈{readMinutes} 分钟</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.12em]">字数</span>
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
                  href={`/philosophy/thinkers/${rt.slug}`}
                  className="hover:border-border-faint hover:bg-bg-elevated group flex items-center gap-3 border border-transparent p-2 transition-all duration-300"
                >
                  <div
                    className="font-display flex h-8 w-8 shrink-0 items-center justify-center border text-sm italic"
                    style={{
                      borderColor: `${rtAccent}30`,
                      color: rtAccent,
                    }}
                  >
                    {rt.title[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-fg-primary group-hover:text-accent-gold truncate text-sm font-medium transition-colors">
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
    </div>
  );
}
