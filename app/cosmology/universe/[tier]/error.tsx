"use client";

import Link from "next/link";

export default function TierError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-[11px] tracking-[0.32em] uppercase" style={{ color: "#3b82f6" }}>
        出错了
      </p>
      <h1 className="mt-4 text-2xl font-bold text-white">尺度页面加载失败</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#a8adbd]">
        这一页没能加载出来。重试一次通常就好。
      </p>
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="border px-5 py-2 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors"
          style={{
            borderColor: "rgba(59, 130, 246, 0.3)",
            color: "#3b82f6",
          }}
        >
          重试
        </button>
        <Link
          href="/cosmology/universe"
          className="border border-white/[0.1] px-5 py-2 font-mono text-[11px] tracking-[0.12em] text-[#a8adbd] uppercase transition-colors hover:text-white"
        >
          返回宇宙尺度
        </Link>
      </div>
    </div>
  );
}
