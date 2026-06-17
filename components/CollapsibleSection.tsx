"use client";

import { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  accentColor?: string;
  children: React.ReactNode;
}

export function CollapsibleSection({
  title,
  defaultOpen = false,
  accentColor = "var(--color-accent-gold)",
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
      className="border-border-faint my-4 overflow-hidden rounded-lg border"
    >
      <summary
        className="hover:bg-hover-bg flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium transition-colors"
        style={{ borderLeft: `3px solid ${accentColor}` }}
      >
        <span
          className="inline-block text-xs transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▶
        </span>
        {title}
      </summary>
      <div className="border-border-faint border-t px-4 py-3">{children}</div>
    </details>
  );
}
