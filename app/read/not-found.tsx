import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-6">
      <div className="text-center">
        <p className="mb-4 text-8xl font-bold" style={{ color: "var(--color-fg-disabled)" }}>
          404
        </p>
        <h2 className="mb-4 text-2xl" style={{ color: "var(--color-fg-primary)" }}>
          找不到这条阅读路线
        </h2>
        <p className="mb-8" style={{ color: "var(--color-fg-muted)" }}>
          它可能已被移动或重命名。
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/read"
            className="rounded-full border px-6 py-2 transition-colors"
            style={{
              background: "rgba(99,102,241,0.12)",
              borderColor: "rgba(99,102,241,0.3)",
              color: "#818cf8",
            }}
          >
            全部阅读路线
          </Link>
          <Link
            href="/"
            className="text-fg-secondary hover:text-fg-primary rounded-full border border-[var(--color-border-subtle)] px-6 py-2 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
