export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="h-1 w-16 rounded-full animate-pulse" style={{ background: 'rgba(59, 130, 246, 0.3)' }} />
    </div>
  );
}
