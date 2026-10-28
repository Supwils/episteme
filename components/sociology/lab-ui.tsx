import Link from "next/link";

export function SociologyLabDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      三格人数是示意队列，用来看同一出身的去向份额怎样一起变。它不是调查年份，不是转移概率的估计，也不给任何人打分、授信或预测。
    </p>
  );
}

export function SociologyLabLinks({
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
