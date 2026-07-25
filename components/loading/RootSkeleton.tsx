/**
 * Route-transition skeletons shared by the engine-driven domains
 * (computer-science, political-science). The parchment/viz domains keep their
 * own bespoke `loading.tsx`; these three archetypes mirror the neutral shape
 * the text domains (economics, psychology) already use, so every domain shows
 * an instant skeleton on navigation instead of a blank/stuck transition.
 *
 * RootSkeleton — the domain landing page: a single centered pulse bar.
 */
export default function RootSkeleton() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="bg-accent-gold/30 h-1 w-16 animate-pulse rounded-full" />
    </div>
  );
}
