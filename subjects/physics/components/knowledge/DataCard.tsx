import { cn } from "@/subjects/physics/lib/cn";
import type { DataCard as DataCardType } from "@/subjects/physics/lib/content";

type Props = {
  card: DataCardType;
  className?: string;
};

export function DataCard({ card, className }: Props) {
  return (
    <article
      className={cn(
        "border-fg-disabled/30 hover:border-fg-secondary/60 group ease-product relative flex flex-col gap-1 border p-3.5 transition-colors duration-300",
        className,
      )}
    >
      <div className="text-fg-muted flex items-baseline justify-between gap-2 font-mono text-[12px] tracking-[0.22em] uppercase">
        <span>{card.label}</span>
        {card.latinLabel ? (
          <span className="text-fg-disabled normal-case italic">{card.latinLabel}</span>
        ) : null}
      </div>
      <div
        data-num
        className="text-fg-primary font-mono text-lg tracking-tight tabular-nums md:text-xl"
      >
        {card.value}
      </div>
      {card.hint ? (
        <div className="text-fg-muted font-mono text-[13px] tracking-tight">{card.hint}</div>
      ) : null}

      {/* hairline accent that lights up on hover */}
      <span
        aria-hidden
        className="bg-accent-cool/70 ease-product absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
      />
    </article>
  );
}
