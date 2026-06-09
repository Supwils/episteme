import { ExternalLink } from "@/src-physics/components/hud/icons";
import type { SourceRef } from "@/src-physics/lib/content";

type Props = {
  sources: SourceRef[];
};

const KIND_LABEL: Record<SourceRef["kind"], string> = {
  paper: "paper",
  agency: "agency",
  encyclopedia: "wiki",
};

export function SourcesList({ sources }: Props) {
  return (
    <section className="border-fg-disabled/25 flex flex-col gap-3 border-t pt-6">
      <h3 className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
        sources · 引用
      </h3>
      <ul className="flex flex-col">
        {sources.map((src) => (
          <li
            key={src.url}
            className="border-fg-disabled/15 hover:border-fg-secondary/50 ease-product border-b transition-colors duration-200 last:border-b-0"
          >
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-2.5"
            >
              <div className="flex min-w-0 items-baseline gap-3">
                <span className="text-accent-cool/80 shrink-0 font-mono text-[10px] tracking-[0.18em] uppercase">
                  [{KIND_LABEL[src.kind]}]
                </span>
                <span className="text-fg-secondary group-hover:text-fg-primary ease-product truncate text-[13px] transition-colors">
                  {src.label}
                </span>
              </div>
              <ExternalLink className="text-fg-disabled group-hover:text-fg-secondary ease-product h-3 w-3 shrink-0 transition-colors" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
