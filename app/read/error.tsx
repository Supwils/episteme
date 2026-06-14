"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="text-center">
        <p
          className="mb-4 font-mono text-[11px] tracking-[0.32em] uppercase"
          style={{ color: "#6366f1" }}
        >
          出错了
        </p>
        <h2 className="mb-4 text-2xl" style={{ color: "var(--color-fg-primary)" }}>
          阅读路线加载失败
        </h2>
        <p className="mb-8 text-sm" style={{ color: "var(--color-fg-muted)" }}>
          {error.message}
        </p>
        <button
          onClick={reset}
          className="rounded-full border px-6 py-2 transition-colors"
          style={{
            background: "rgba(99, 102, 241, 0.1)",
            borderColor: "rgba(99, 102, 241, 0.3)",
            color: "#6366f1",
          }}
        >
          重试
        </button>
      </div>
    </div>
  );
}
