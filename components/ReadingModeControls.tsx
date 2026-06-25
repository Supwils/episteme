"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isReadingMode(saved)) {
      setMode(saved);
      document.documentElement.dataset.readingMode = saved;
    } else {
      document.documentElement.dataset.readingMode = "standard";
    }
  }, []);

  function selectMode(nextMode: ReadingMode) {
    setMode(nextMode);
    document.documentElement.dataset.readingMode = nextMode;
    window.localStorage.setItem(STORAGE_KEY, nextMode);
  }

  return (
    <div
      className="border-border-faint bg-bg-panel/80 inline-flex rounded-full border p-1 backdrop-blur"
      aria-label="文章阅读模式"
    >
      {MODES.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-label={item.description}
          aria-pressed={mode === item.id}
          onClick={() => selectMode(item.id)}
          className={`rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors ${
            mode === item.id
              ? "bg-accent-cool/15 text-accent-cool"
              : "text-fg-muted hover:text-fg-primary hover:bg-white/[0.04]"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
