import Link from "next/link";
import { isUniverseTierId, type AnyTierId } from "@/subjects/physics/lib/tier";

type Props = {
  tier: AnyTierId;
  /** Curated tier→article links; falls back to the section KB index when empty. */
  articles?: { href: string; title: string }[];
};

/**
 * Bridges the 3D scene to the prose knowledge base. Universe tiers point at
 * cosmology's KB (cosmic structure), physics tiers at the physics KB. When a
 * tier curates specific articles they take precedence; otherwise we surface a
 * single "browse the KB" link so every scene still offers a way to read deeper.
 */
export function RelatedReading({ tier, articles }: Props) {
  const kb = isUniverseTierId(tier)
    ? { href: "/cosmology/knowledge-base", label: "宇宙学知识库" }
    : { href: "/universe-physics/knowledge-base", label: "物理知识库" };
  const items =
    articles && articles.length > 0
      ? articles
      : [{ href: kb.href, title: `浏览${kb.label}全部文章` }];

  return (
    <section className="border-fg-disabled/25 flex flex-col gap-3 border-t pt-6">
      <h3 className="text-fg-muted font-mono text-[10px] tracking-[0.32em] uppercase">
        read more · 深入阅读
      </h3>
      <ul className="flex flex-col">
        {items.map((a) => (
          <li
            key={a.href}
            className="border-fg-disabled/15 hover:border-fg-secondary/50 ease-product border-b transition-colors duration-200 last:border-b-0"
          >
            <Link href={a.href} className="group flex items-center justify-between gap-4 py-2.5">
              <span className="text-fg-secondary group-hover:text-fg-primary ease-product truncate text-[13px] transition-colors">
                {a.title}
              </span>
              <span className="text-fg-disabled group-hover:text-fg-secondary ease-product shrink-0 font-mono text-[11px] transition-colors">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
