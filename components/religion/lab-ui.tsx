import Link from "next/link";

export function ReligionDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      示意图用于分开分类、仪式阶段、文本开篇与测量口径，不是信仰强度排行，也不能代替原典。
    </p>
  );
}

export function ReligionLinks({ items }: { items: readonly { href: string; label: string }[] }) {
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
