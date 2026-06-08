export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="animate-pulse-glow h-1 w-16 rounded-full bg-accent-indigo/30" />
    </div>
  );
}
