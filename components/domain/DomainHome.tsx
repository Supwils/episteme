import Link from "next/link";
import { getDomainConfig } from "@/lib/new-domains";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { createFrontier } from "@/lib/frontier";
import { notFound } from "next/navigation";

interface HomeCard {
  href: string;
  icon: string;
  title: string;
  description: string;
  accent: string;
  count: number;
}

export function DomainHome({ domain }: { domain: string }) {
  const config = getDomainConfig(domain);
  if (!config) notFound();

  const cards: HomeCard[] = config.sections.map((section) => ({
    href: `/${domain}/${section.key}`,
    icon: section.icon,
    title: section.label,
    description: section.description,
    accent: section.accent,
    count: createKnowledgeSection(domain, section.key).getAll().length,
  }));

  const frontierCount = createFrontier(domain).getAllArticles().length;
  if (frontierCount > 0) {
    cards.push({
      href: `/${domain}/frontier`,
      icon: "🛰",
      title: "研究前沿",
      description: "该领域当下正在推进的 2020s 前沿——开放问题、攻关团队、近年突破",
      accent: "#e06c75",
      count: frontierCount,
    });
  }

  const total = cards.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      <section className="relative flex w-full flex-col items-start gap-6 px-6 pt-28 pb-16 sm:px-10 md:pt-32 lg:px-16">
        <p className="text-fg-muted font-mono text-[10px] tracking-[0.42em] uppercase">
          universe · knowledge / {domain}
        </p>
        <h1 className="font-display text-[3rem] leading-[1.04] tracking-tight md:text-[4.5rem]">
          <span className="text-fg-primary">{config.label}</span>
        </h1>
        <p className="text-fg-secondary max-w-2xl text-sm leading-relaxed md:text-base">
          {config.tagline}
        </p>
        {total > 0 && (
          <p className="text-fg-disabled font-mono text-[11px] tracking-[0.28em] uppercase">
            {total} 个知识条目
          </p>
        )}
      </section>

      <section className="relative z-[2] w-full px-6 pb-24 sm:px-10 lg:px-16">
        <p className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase">
          探索 · explore
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group border-border-faint bg-bg-near hover:bg-bg-elevated relative flex h-full flex-col gap-4 overflow-hidden border p-6 transition-all duration-500"
              aria-label={`${card.title} — ${card.description}`}
            >
              <div
                className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                style={{ backgroundColor: card.accent }}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="text-2xl leading-none transition-transform duration-300 group-hover:scale-110"
                  aria-hidden
                >
                  {card.icon}
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.28em] uppercase"
                  style={{ color: card.accent }}
                >
                  {card.count > 0 ? card.count : "—"}
                </span>
              </div>
              <h2 className="font-display text-fg-primary group-hover:text-accent-gold relative text-xl leading-tight font-semibold transition-colors duration-300">
                {card.title}
              </h2>
              <p className="text-fg-secondary relative flex-1 text-sm leading-relaxed">
                {card.description}
              </p>
              <span
                aria-hidden
                className="text-fg-disabled group-hover:text-accent-gold relative mt-auto font-mono text-xs transition-all duration-300 group-hover:translate-x-1"
              >
                →
              </span>
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: card.accent }}
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
