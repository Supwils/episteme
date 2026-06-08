"use client";

export default function MathParadoxDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12">
      <div className="border-border-faint bg-bg-panel border p-12 text-center">
        <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
          加载出错
        </p>
        <p className="text-fg-secondary mt-2 text-sm">{error.message}</p>
        <button
          onClick={reset}
          className="text-accent-indigo hover:text-accent-indigo-bright mt-4 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors"
        >
          重试
        </button>
      </div>
    </div>
  );
}
