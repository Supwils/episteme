/** DetailSkeleton — an article detail page: title + hero block + prose lines. */
export default function DetailSkeleton() {
  return (
    <div
      className="w-full animate-pulse px-6 py-12 sm:px-10 lg:px-16"
      role="status"
      aria-live="polite"
    >
      <div className="mb-8 h-8 w-64 rounded bg-white/5" />
      <div className="mb-4 h-4 w-96 rounded bg-white/5" />
      <div className="mt-8 h-64 rounded-2xl bg-white/5" />
      <div className="mt-6 h-4 w-full rounded bg-white/5" />
      <div className="mt-3 h-4 w-3/4 rounded bg-white/5" />
    </div>
  );
}
