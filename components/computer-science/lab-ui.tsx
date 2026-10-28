import Link from "next/link";

export function ComputerScienceLabDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      这不是性能测量，不是攻击演示。步长只改这一小块示意内存里哪些字算命中，不报时间，也不描述任何可部署的系统。
    </p>
  );
}

export function ComputerScienceLabLinks({
  items,
}: {
  items: readonly { href: string; label: string }[];
}) {
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
