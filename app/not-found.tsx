import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-6">
      <div className="text-center">
        <p className="text-fg-disabled mb-4 text-8xl font-bold">404</p>
        <h2 className="text-fg-primary mb-4 text-2xl">页面未找到</h2>
        <p className="text-fg-muted mb-8">您访问的页面不存在或已被移动。</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="border-border-subtle text-fg-secondary hover:border-fg-disabled hover:text-fg-primary rounded-full border px-6 py-2 transition-colors"
          >
            返回首页
          </Link>
          <Link
            href="/read"
            className="border-border-subtle text-fg-secondary hover:border-fg-disabled hover:text-fg-primary rounded-full border px-6 py-2 transition-colors"
          >
            阅读路线
          </Link>
          <Link
            href="/random"
            className="border-border-subtle text-fg-secondary hover:border-fg-disabled hover:text-fg-primary rounded-full border px-6 py-2 transition-colors"
          >
            随机一篇
          </Link>
        </div>
      </div>
    </div>
  );
}
