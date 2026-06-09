export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="animate-pulse-glow bg-accent-purple/30 h-1 w-16 rounded-full" />
    </div>
  );
}
