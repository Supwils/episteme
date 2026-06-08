export default function TreeLoading() {
  return (
    <div className="w-full px-4 py-12 sm:px-10 sm:py-16 lg:px-16">
      <div className="mb-8 animate-pulse">
        <div className="mb-3 h-3 w-32 rounded bg-white/5" />
        <div className="h-10 w-64 rounded bg-white/5" />
        <div className="mt-3 h-4 w-96 rounded bg-white/5" />
      </div>
      <div className="h-[600px] rounded-sm border border-white/5 bg-white/[0.02]" />
    </div>
  );
}
