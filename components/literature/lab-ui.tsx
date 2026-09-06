import Link from "next/link";

export function LiteratureDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      示意图用于分开情节、格律、流通与译文，不是作品排行，也不能代替原书。
    </p>
  );
}

export function LiteratureLinks({ items }: { items: readonly { href: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-4 pt-2 text-[13.5px]">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="text-accent-gold hover:underline">
          {item.label} →
        </Link>
      ))}
    </div>
  );
}
