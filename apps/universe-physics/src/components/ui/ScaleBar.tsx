import { cn } from "@/lib/cn";
import { formatScaleMeters } from "@/lib/format";
import { TIERS, type TierId } from "@/lib/tier";

type Props = {
  tier: TierId;
  className?: string;
};

export function ScaleBar({ tier, className }: Props) {
  const meta = TIERS[tier];
  return (
    <div
      data-num
      aria-label={`Scale: ${meta.label}, ${formatScaleMeters(meta.scaleMeters)}`}
      className={cn(
        "text-fg-secondary inline-flex items-baseline gap-2 font-mono text-[11px] tracking-[0.25em] uppercase",
        className,
      )}
    >
      <span className="text-fg-muted">{meta.id}</span>
      <span aria-hidden className="text-fg-disabled">
        ·
      </span>
      <span>{meta.shortLabel}</span>
      <span aria-hidden className="text-fg-disabled">
        ·
      </span>
      <span className="text-fg-primary normal-case">{formatScaleMeters(meta.scaleMeters)}</span>
    </div>
  );
}
