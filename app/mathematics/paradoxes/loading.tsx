export default function MathParadoxesLoading() {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
      <div className="mb-12 animate-pulse">
        <div className="mb-3 h-3 w-48 bg-bg-elevated" />
        <div className="h-10 w-64 bg-bg-elevated" />
        <div className="mt-3 h-4 w-96 bg-bg-elevated" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border-border-faint border p-5 animate-pulse">
            <div className="mb-2 h-3 w-16 bg-bg-elevated" />
            <div className="h-5 w-32 bg-bg-elevated" />
            <div className="mt-1 h-4 w-48 bg-bg-elevated" />
          </div>
        ))}
      </div>
    </div>
  );
}
