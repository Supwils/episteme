import Link from "next/link";

export function EarthScienceLabDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      三个数字是示意毫米，用来看储蓄项怎样跟着降水、蒸散发和径流一起变。它不是气候预测，不是洪水预警，也不判断临界点。
    </p>
  );
}

export function EarthScienceLabLinks({
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
