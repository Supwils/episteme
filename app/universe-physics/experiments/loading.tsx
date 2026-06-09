export default function Loading() {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 animate-pulse" role="status" aria-live="polite">
      <div className="h-8 w-64 bg-blue-500/5 rounded mb-8" />
      <div className="h-4 w-96 bg-blue-500/5 rounded mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-blue-500/5 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
