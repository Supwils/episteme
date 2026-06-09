export default function Loading() {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 animate-pulse" role="status" aria-live="polite">
      <div className="h-8 w-64 bg-white/5 rounded mb-8" />
      <div className="h-4 w-96 bg-white/5 rounded mb-4" />
      <div className="h-64 bg-white/5 rounded-2xl mt-8" />
      <div className="h-4 w-full bg-white/5 rounded mt-6" />
      <div className="h-4 w-3/4 bg-white/5 rounded mt-3" />
    </div>
  );
}
