"use client";

import { clsx } from "clsx";

const DOMAINS = [
  { id: "physics", label: "物理", color: "#6366f1" },
  { id: "history", label: "历史", color: "#f59e0b" },
  { id: "philosophy", label: "哲学", color: "#10b981" },
  { id: "life-science", label: "生命科学", color: "#ec4899" },
  { id: "economics", label: "经济学", color: "#e8b84a" },
  { id: "psychology", label: "心理学", color: "#d4789c" },
  { id: "computer-science", label: "计算机", color: "#4f9cf0" },
  { id: "political-science", label: "政治学", color: "#c25b5b" },
] as const;

type DomainFiltersProps = {
  activeDomains: Set<string>;
  onDomainToggle: (domain: string) => void;
  isMobile?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
};

export function DomainFilters({
  activeDomains,
  onDomainToggle,
  isMobile = false,
  showCloseButton = false,
  onClose,
}: DomainFiltersProps) {
  return (
    <div className="flex items-center gap-1.5">
      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-colors hover:text-white/70"
          aria-label="收起筛选栏"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-3.5 w-3.5"
          >
            <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {DOMAINS.map((domain) => {
        const isActive = activeDomains.has(domain.id);
        return (
          <button
            key={domain.id}
            type="button"
            onClick={() => onDomainToggle(domain.id)}
            className={clsx(
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium",
              "border transition-all duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              isActive
                ? "border-white/10 text-white"
                : "border-white/[0.04] text-white/40 hover:border-white/[0.08] hover:text-white/60"
            )}
            style={{
              background: isActive ? `${domain.color}20` : "transparent",
              outlineColor: domain.color,
            }}
            aria-pressed={isActive}
            aria-label={`${isActive ? "隐藏" : "显示"}${domain.label}领域`}
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full transition-opacity duration-200"
              style={{
                backgroundColor: domain.color,
                opacity: isActive ? 1 : 0.3,
              }}
            />
            <span className={isMobile ? "inline" : "hidden sm:inline"}>{domain.label}</span>
          </button>
        );
      })}
    </div>
  );
}
