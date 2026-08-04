"use client";

/**
 * Shared search box + filter chips + empty state for custom list pages
 * (economics, mathematics), following the DomainSectionListBrowser pattern.
 * Domain browser components own the card rendering; this component owns the
 * controls so the interaction stays identical across domains.
 */

export type ListFilterChip = {
  value: string;
  label: string;
  /** Raw hex accent for this chip; text is mixed toward --color-fg-primary for dual-theme safety. */
  color?: string;
};

export function ListSearchFilter({
  query,
  onQueryChange,
  chips,
  activeChip,
  onChipChange,
  matched,
  total,
  placeholder,
  searchLabel,
  chipsLabel,
  focusAccentClass = "focus:border-accent-gold/60",
}: {
  query: string;
  onQueryChange: (q: string) => void;
  chips: ListFilterChip[];
  activeChip: string | null;
  onChipChange: (chip: string | null) => void;
  matched: number;
  total: number;
  placeholder: string;
  searchLabel: string;
  chipsLabel: string;
  focusAccentClass?: string;
}) {
  const filtering = query.trim() !== "" || activeChip !== null;

  return (
    <div className="mb-10 flex flex-col gap-4">
      <div className="relative max-w-md">
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          aria-label={searchLabel}
          className={`border-border-subtle bg-bg-panel text-fg-primary placeholder:text-fg-disabled w-full border px-4 py-2.5 font-mono text-[12px] tracking-wide transition-colors outline-none ${focusAccentClass}`}
        />
        {filtering && (
          <span className="text-fg-disabled absolute top-1/2 right-3 -translate-y-1/2 font-mono text-[10px] tracking-[0.18em]">
            {matched}/{total}
          </span>
        )}
      </div>
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label={chipsLabel}>
          <button
            type="button"
            onClick={() => onChipChange(null)}
            aria-pressed={activeChip === null}
            className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] transition-colors ${
              activeChip === null
                ? "border-accent-gold/50 text-accent-gold"
                : "border-border-faint text-fg-muted hover:text-fg-primary"
            }`}
          >
            全部
          </button>
          {chips.map((chip) => {
            const isActive = activeChip === chip.value;
            return (
              <button
                key={chip.value}
                type="button"
                onClick={() => onChipChange(isActive ? null : chip.value)}
                aria-pressed={isActive}
                className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] transition-colors ${
                  isActive ? "" : "border-border-faint text-fg-muted hover:text-fg-primary"
                }`}
                style={
                  isActive && chip.color
                    ? {
                        borderColor: `${chip.color}50`,
                        color: `color-mix(in oklab, ${chip.color} 42%, var(--color-fg-primary))`,
                      }
                    : undefined
                }
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ListEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border-border-faint bg-bg-panel border p-12 text-center">
      <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
        没有匹配的条目
      </p>
      <p className="text-fg-secondary mt-2 text-sm">
        换个关键词，或
        <button
          type="button"
          onClick={onReset}
          className="text-accent-gold ml-1 underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          清除筛选
        </button>
      </p>
    </div>
  );
}
