export default function Loading() {
  return (
    <div className="w-full min-h-screen">
      <section className="w-full px-6 sm:px-10 lg:px-16 py-16">
        <div className="h-3 w-20 bg-white/[0.06] rounded animate-pulse mb-4" />
        <div className="h-10 w-64 bg-white/[0.06] rounded animate-pulse mb-4" />
        <div className="h-5 w-80 bg-white/[0.04] rounded animate-pulse" />
      </section>

      <section className="w-full px-6 sm:px-10 lg:px-16 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="h-3 w-12 bg-white/[0.06] rounded animate-pulse mb-3" />
                <div className="h-4 w-32 bg-white/[0.06] rounded animate-pulse mb-2" />
                <div className="h-3 w-full bg-white/[0.04] rounded animate-pulse mb-1" />
                <div className="h-3 w-3/4 bg-white/[0.04] rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="p-4 rounded-lg bg-white/[0.015] border border-white/[0.04]">
            <div className="h-3 w-16 bg-white/[0.06] rounded animate-pulse mb-2" />
            <div className="h-3 w-64 bg-white/[0.04] rounded animate-pulse" />
          </div>
        </div>
      </section>

      <section className="w-full px-6 sm:px-10 lg:px-16 py-8">
        <div className="h-7 w-40 bg-white/[0.06] rounded animate-pulse mb-8" />
        <div className="w-full max-w-4xl mx-auto space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
            >
              <div className="h-4 w-10 bg-white/[0.06] rounded animate-pulse shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="h-3 w-16 bg-white/[0.06] rounded animate-pulse mb-2" />
                <div className="h-4 w-48 bg-white/[0.06] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
