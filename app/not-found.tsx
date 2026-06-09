import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-white/20 text-8xl font-bold mb-4">404</p>
        <h2 className="text-2xl text-white mb-4">页面未找到</h2>
        <p className="text-white/50 mb-8">您访问的页面不存在或已被移动。</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-2 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
