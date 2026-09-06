"use client";

type ZoomControlsProps = {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToScreen: () => void;
};

export function ZoomControls({ zoom, onZoomIn, onZoomOut, onFitToScreen }: ZoomControlsProps) {
  return (
    <div className="hidden items-center gap-1 md:flex">
      <button
        type="button"
        onClick={onZoomOut}
        className="border-border-faint text-fg-muted hover:border-border-subtle hover:text-fg-primary/70 flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-200 hover:bg-[var(--input-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]"
        aria-label="缩小"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-3.5 w-3.5"
        >
          <path d="M4 8h8" strokeLinecap="round" />
        </svg>
      </button>

      <span
        className="text-fg-muted w-12 text-center text-[0.65rem] tabular-nums"
        aria-label={`缩放 ${Math.round(zoom * 100)}%`}
      >
        {Math.round(zoom * 100)}%
      </span>

      <button
        type="button"
        onClick={onZoomIn}
        className="border-border-faint text-fg-muted hover:border-border-subtle hover:text-fg-primary/70 flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-200 hover:bg-[var(--input-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]"
        aria-label="放大"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-3.5 w-3.5"
        >
          <path d="M8 4v8M4 8h8" strokeLinecap="round" />
        </svg>
      </button>

      <div className="mx-0.5 h-5 w-px bg-[var(--hover-bg)]" aria-hidden="true" />

      <button
        type="button"
        onClick={onFitToScreen}
        className="border-border-faint text-fg-muted hover:border-border-subtle hover:text-fg-primary/70 flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-200 hover:bg-[var(--input-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]"
        aria-label="适应屏幕"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-3.5 w-3.5"
        >
          <rect x="3" y="3" width="10" height="10" rx="1.5" />
          <path
            d="M3 6V4a1 1 0 011-1h2M10 3h2a1 1 0 011 1v2M13 10v2a1 1 0 01-1 1h-2M6 13H4a1 1 0 01-1-1v-2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
