import Link from "next/link";
import { COVERAGE_DOMAIN_META } from "@/lib/knowledge-continuum-coverage-meta";
import { FEATURED_KNOWLEDGE_TOURS } from "@/lib/featured-knowledge-tours";

export function FeaturedKnowledgeTours() {
  return (
    <section
      className="border-border-faint grid gap-4 border-t px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center"
      aria-labelledby="featured-spatial-tours-title"
    >
      <div>
        <p className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
          cross-domain route
        </p>
        <h4
          id="featured-spatial-tours-title"
          className="text-fg-primary mt-1 text-sm font-semibold"
        >
          跨域专题游览
        </h4>
        <p className="text-fg-muted mt-2 max-w-xl text-xs leading-5">
          从单科主干转入一条可逐步核对关系、证据与正文的空间路线。
        </p>
      </div>
      <div className="border-border-faint border-l pl-4 sm:pl-5">
        {FEATURED_KNOWLEDGE_TOURS.map((tour) => (
          <div
            key={tour.id}
            data-testid={`featured-tour-${tour.id}`}
            className="border-border-faint border-b py-4 first:pt-0 last:border-b-0 last:pb-0"
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1" aria-label="途经学科">
              {tour.domains.map((domain, index) => (
                <span key={domain.id} className="inline-flex items-center gap-1.5 text-[10px]">
                  <span
                    className="h-1.5 w-1.5"
                    style={{ backgroundColor: COVERAGE_DOMAIN_META[domain.id].color }}
                    aria-hidden="true"
                  />
                  <span className="text-fg-muted">{domain.label}</span>
                  {index < tour.domains.length - 1 ? (
                    <span className="text-fg-disabled ml-0.5" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
            <h5 className="text-fg-primary mt-2 text-base font-medium">{tour.title}</h5>
            <p className="text-fg-muted mt-1 max-w-2xl text-xs leading-5">{tour.summary}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              <Link
                href={tour.href}
                className="text-fg-primary inline-flex min-h-9 items-center border-b border-current text-xs"
              >
                进入空间路线 →
              </Link>
              {tour.labHref && tour.labLabel ? (
                <Link
                  href={tour.labHref}
                  className="text-fg-secondary hover:text-fg-primary inline-flex min-h-9 items-center border-b border-current text-xs transition-colors"
                >
                  {tour.labLabel} →
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
