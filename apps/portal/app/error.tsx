"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6">
      <h2 className="text-xl font-semibold text-[#e8e8f0]">出了点问题</h2>
      <p className="text-sm text-[#9ca3af]">页面加载时遇到错误。</p>
      <button
        onClick={reset}
        className="rounded border border-[#818cf8]/30 px-4 py-2 text-sm text-[#818cf8] hover:bg-[#818cf8]/10 transition-colors"
      >
        重试
      </button>
    </div>
  );
}
