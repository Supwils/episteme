import Link from "next/link";
import { CURATED_LEARNING_PATHS } from "@/subjects/knowledge-graph/data/curated-learning-paths";
import { ALL_NODES } from "@/subjects/knowledge-graph/data/graph-data";

const NODE_BY_ID = new Map(ALL_NODES.map((node) => [node.id, node]));

function findSpine(domain: string) {
  return CURATED_LEARNING_PATHS.find(
    (path) => path.scope === "domain-spine" && path.steps[0]?.nodeId.startsWith(`${domain}:`)
  );
}

/**
 * Learning-spine preview for engine-driven domain homepages: the curated
 * L1→L5 path as five linked steps. Gives first-time visitors a concrete
 * "start here" route instead of a bare grid of sections. Server component —
 * the graph data never ships to the client.
 */
export function DomainSpinePreview({ domain, accent }: { domain: string; accent: string }) {
  const spine = findSpine(domain);
  if (!spine) return null;

  const steps = spine.steps.flatMap((step) => {
    const node = NODE_BY_ID.get(step.nodeId);
    if (!node?.url) return [];
    return [
      {
        id: node.id,
        level: step.level,
        transition: step.transition,
        label: node.label,
        url: node.url,
      },
    ];
  });
  if (steps.length === 0) return null;

  return (
    <section className="relative z-[2] w-full px-6 pb-20 sm:px-10 lg:px-16">
      <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.38em] uppercase">
        学习主线 · learning spine
      </p>
      <p className="text-fg-secondary mb-8 max-w-3xl text-sm leading-relaxed">{spine.question}</p>
      <ol className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {steps.map((step, i) => (
          <li key={step.id} className="relative">
            <Link
              href={step.url}
              className="group border-border-faint bg-bg-near hover:bg-bg-elevated flex h-full flex-col gap-2 border p-4 transition-colors duration-300"
            >
              <span className="flex items-center gap-2">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] font-semibold"
                  style={{
                    backgroundColor: `${accent}22`,
                    color: `color-mix(in oklab, ${accent} 55%, var(--color-fg-primary))`,
                  }}
                >
                  {step.level}
                </span>
                <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
                  L{step.level} · 第 {i + 1} 步
                </span>
              </span>
              <span className="font-display text-fg-primary group-hover:text-accent-gold text-[15px] leading-snug font-semibold transition-colors">
                {step.label}
              </span>
              <span className="text-fg-muted text-[11.5px] leading-relaxed">{step.transition}</span>
            </Link>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="text-fg-disabled absolute top-1/2 -right-2.5 hidden -translate-y-1/2 font-mono text-xs xl:block"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
