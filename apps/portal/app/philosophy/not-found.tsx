import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-6">
      <div className="text-center">
        <p className="mb-4 text-8xl font-bold text-white/20">404</p>
        <h2 className="mb-4 text-2xl text-white">页面未找到</h2>
        <p className="mb-8 text-white/50">您访问的页面不存在或已被移动。</p>
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-white transition-colors hover:bg-white/20"
          >
            返回首页
          </Link>
          <Link
            href="/philosophy"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-white/70 transition-colors hover:bg-white/10"
          >
            返回哲学思想
          </Link>
        </div>
      </div>
    </div>
  );
}
