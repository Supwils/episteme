"use client";

export function TouchPanButton({
  armed,
  controls,
  onToggle,
  onCancel,
}: {
  armed: boolean;
  controls: string;
  onToggle: () => void;
  onCancel: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={armed}
      aria-controls={controls}
      title={armed ? "取消触屏平移" : "拖动一次后自动恢复页面滚动"}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Escape") onCancel();
      }}
      className={`min-h-11 shrink-0 rounded border px-3 font-mono text-[11px] tracking-wide whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 ${
        armed
          ? "border-border-subtle bg-bg-elevated text-fg-primary"
          : "border-border-faint text-fg-muted hover:text-fg-primary"
      }`}
    >
      触屏平移
    </button>
  );
}
