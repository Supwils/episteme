export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="h-1 w-16 animate-pulse rounded-full bg-[#818cf8]/30" />
        <span className="text-xs uppercase tracking-wider text-[#9ca3af]">加载中...</span>
      </div>
    </div>
  );
}
