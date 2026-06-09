'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p style={{ color: 'var(--gold)' }} className="font-mono text-xs tracking-widest uppercase mb-4">出错了</p>
        <h2 className="text-2xl text-white mb-4">页面加载失败</h2>
        <p style={{ color: 'var(--parchment-dim)' }} className="mb-8 text-sm">{error.message || '未知错误'}</p>
        <button onClick={reset} className="px-6 py-2 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors">
          重试
        </button>
      </div>
    </div>
  );
}
