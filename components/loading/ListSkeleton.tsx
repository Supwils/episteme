/** ListSkeleton — a section index page: title + subtitle + a grid of cards. */
export default function ListSkeleton() {
  return (
    <div
      className="w-full animate-pulse px-6 py-12 sm:px-10 lg:px-16"
      role="status"
      aria-live="polite"
    >
      <div className="mb-8 h-8 w-64 rounded bg-white/5" />
      <div className="mb-4 h-4 w-96 rounded bg-white/5" />
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}
