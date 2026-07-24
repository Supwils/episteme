"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="mb-4 font-mono text-xs tracking-widest text-white/55 uppercase">出错了</p>
        <h2 className="mb-4 text-2xl text-white">每日知识加载失败</h2>
        <p className="mb-8 text-sm text-white/50">{error.message || "未知错误"}</p>
        <button
          onClick={reset}
          className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-white transition-colors hover:bg-white/20"
        >
          重试
        </button>
      </div>
    </div>
  );
}
