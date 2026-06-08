'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <p className="font-mono text-[11px] tracking-[0.32em] uppercase mb-4" style={{ color: '#6ad0ff' }}>
          出错了
        </p>
        <h2 className="text-2xl mb-4" style={{ color: 'var(--color-fg-primary)' }}>
          页面加载失败
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--color-fg-muted)' }}>
          {error.message}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 border rounded-full transition-colors"
          style={{
            background: 'rgba(106, 208, 255, 0.1)',
            borderColor: 'rgba(106, 208, 255, 0.3)',
            color: '#6ad0ff',
          }}
        >
          重试
        </button>
      </div>
    </div>
  );
}
