import Link from "next/link";

export function ArtsDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      示意图用于建立看图与材料的直觉，不是文物检测报告，也不能代替原作。
    </p>
  );
}

export function ArtsLinks({ items }: { items: readonly { href: string; label: string }[] }) {
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
