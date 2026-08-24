export default function Loading() {
  return (
    <div className="min-h-screen w-full">
      <section className="w-full px-6 py-16 sm:px-10 lg:px-16">
        <div className="bg-fg-disabled/20 mb-4 h-3 w-20 animate-pulse rounded" />
        <div className="bg-fg-disabled/20 mb-4 h-10 w-64 animate-pulse rounded" />
        <div className="bg-fg-disabled/15 h-5 w-80 animate-pulse rounded" />
      </section>

      <section className="w-full px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border-border-faint bg-bg-near rounded-xl border p-5">
                <div className="bg-fg-disabled/20 mb-3 h-3 w-12 animate-pulse rounded" />
                <div className="bg-fg-disabled/20 mb-2 h-4 w-32 animate-pulse rounded" />
                <div className="bg-fg-disabled/15 mb-1 h-3 w-full animate-pulse rounded" />
                <div className="bg-fg-disabled/15 h-3 w-3/4 animate-pulse rounded" />
              </div>
            ))}
          </div>
          <div className="border-border-faint bg-bg-near rounded-lg border p-4">
            <div className="bg-fg-disabled/20 mb-2 h-3 w-16 animate-pulse rounded" />
            <div className="bg-fg-disabled/15 h-3 w-64 animate-pulse rounded" />
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-8 sm:px-10 lg:px-16">
        <div className="bg-fg-disabled/20 mb-8 h-7 w-40 animate-pulse rounded" />
        <div className="mx-auto w-full max-w-4xl space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="border-border-faint bg-bg-near flex items-start gap-4 rounded-xl border p-4"
            >
              <div className="bg-fg-disabled/20 mt-0.5 h-4 w-10 shrink-0 animate-pulse rounded" />
              <div className="flex-1">
                <div className="bg-fg-disabled/20 mb-2 h-3 w-16 animate-pulse rounded" />
                <div className="bg-fg-disabled/20 h-4 w-48 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
