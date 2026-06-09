export default function MathParadoxDetailLoading() {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-12">
      <div className="mb-6 h-4 w-24 animate-pulse bg-bg-elevated" />
      <div className="border-border-faint border p-8 animate-pulse">
        <div className="mb-3 h-3 w-24 bg-bg-elevated" />
        <div className="h-10 w-96 bg-bg-elevated" />
        <div className="mt-2 h-5 w-64 bg-bg-elevated" />
      </div>
      <div className="mt-12 space-y-4 animate-pulse">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-bg-elevated" />
        ))}
      </div>
    </div>
  );
}
