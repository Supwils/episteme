"use client";

import { useEffect, useState } from "react";
import { useFocusParagraph } from "@/components/article/useFocusParagraph";

type ReadingMode = "standard" | "focus" | "spacious";

const MODES: { id: ReadingMode; label: string; description: string }[] = [
  { id: "standard", label: "标准", description: "标准阅读模式" },
  { id: "focus", label: "专注", description: "专注阅读模式" },
  { id: "spacious", label: "宽松", description: "宽松阅读模式" },
];

const STORAGE_KEY = "episteme-reading-mode";

function isReadingMode(value: string | null): value is ReadingMode {
  return value === "standard" || value === "focus" || value === "spacious";
}

export function ReadingModeControls() {
  const [mode, setMode] = useState<ReadingMode>("standard");
  useFocusParagraph(mode === "focus");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage may be disabled; reading controls still work for this page.
    }
    const initialMode = isReadingMode(saved) ? saved : "standard";
    setMode(initialMode);
    document.documentElement.dataset.readingMode = initialMode;
  }, []);

  function selectMode(nextMode: ReadingMode) {
    setMode(nextMode);
    document.documentElement.dataset.readingMode = nextMode;
    try {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    } catch {
      // Persistence is optional, not a prerequisite for changing the layout.
    }
  }

  return (
    <div
      className="print-hidden border-border-faint bg-bg-panel/80 inline-flex rounded-full border p-1 backdrop-blur"
      aria-label="文章阅读模式"
    >
      {MODES.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-label={item.description}
          aria-pressed={mode === item.id}
          onClick={() => selectMode(item.id)}
          className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
            mode === item.id
              ? "bg-accent-gold/15 text-fg-primary border-accent-gold/40 border"
              : "text-fg-muted hover:text-fg-primary hover:bg-bg-elevated border border-transparent"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
