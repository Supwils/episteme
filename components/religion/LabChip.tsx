"use client";

import type { ReactNode } from "react";

export function LabChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[12px] ${
        pressed
          ? "border-fg-secondary text-fg-primary bg-bg-elevated"
          : "border-border-faint text-fg-muted"
      }`}
    >
      {children}
    </button>
  );
}
