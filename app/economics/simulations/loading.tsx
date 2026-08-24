export default function Loading() {
  return (
    <div
      className="w-full animate-pulse px-6 py-12 sm:px-10 lg:px-16"
      role="status"
      aria-live="polite"
    >
      <div className="bg-fg-disabled/20 mb-8 h-8 w-64 rounded" />
      <div className="bg-fg-disabled/20 mb-4 h-4 w-96 rounded" />
      <div className="bg-fg-disabled/20 mt-8 h-96 rounded-2xl" />
    </div>
  );
}
