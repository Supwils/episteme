"use client";

import { useNarrationStore } from "./narration-store";

/**
 * The "🎧 讲解" trigger placed at the top of an article. Clicking loads this
 * article's spoken companion into the global player (the player itself lives in
 * ClientShell so it persists across the page).
 */
export function NarrationButton({
  id,
  title,
  script,
  audioUrl,
  accent = "#c8a45a",
}: {
  id: string;
  title: string;
  script: string;
  audioUrl: string | null;
  accent?: string;
}) {
  const open = useNarrationStore((s) => s.open);
  const active = useNarrationStore((s) => s.active);
  const isActive = active?.id === id;

  // ~3.3 chars/sec is a natural Mandarin narration pace; good enough for a hint.
  const minutes = Math.max(1, Math.round(script.length / 200));

  return (
    <button
      type="button"
      onClick={() => open({ id, title, script, audioUrl })}
      aria-pressed={isActive}
      className="group border-border-faint hover:border-border-subtle bg-bg-elevated/40 mb-6 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 transition-colors"
      style={isActive ? { borderColor: accent } : undefined}
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full text-sm"
        style={{ backgroundColor: `${accent}1f`, color: accent }}
        aria-hidden
      >
        {isActive ? "♪" : "🎧"}
      </span>
      <span className="text-fg-primary text-sm font-medium">
        {isActive ? "正在讲解" : "听讲解"}
      </span>
      <span className="text-fg-muted font-mono text-[11px] tracking-wide">约 {minutes} 分钟</span>
    </button>
  );
}
