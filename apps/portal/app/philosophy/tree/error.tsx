"use client";

export default function TreeError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 px-6">
      <p className="text-fg-muted font-mono text-[10px] uppercase tracking-[0.32em]">
        出错了
      </p>
      <p className="text-fg-secondary text-sm">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg border border-white/10 px-4 py-2 text-xs text-white/60 transition-colors hover:text-white"
      >
        重试
      </button>
    </div>
  );
}
