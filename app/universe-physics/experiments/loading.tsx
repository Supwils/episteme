export default function Loading() {
  return (
    <div
      className="w-full animate-pulse px-6 py-12 sm:px-10 lg:px-16"
      role="status"
      aria-live="polite"
    >
      <div className="bg-fg-disabled/20 mb-8 h-8 w-64 rounded" />
      <div className="bg-fg-disabled/20 mb-4 h-4 w-96 rounded" />
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-fg-disabled/20 h-48 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
