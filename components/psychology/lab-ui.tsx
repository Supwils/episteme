import Link from "next/link";

export function PsychologyLabDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      这是等方差正态的是否判断示意。它不是某一名被试的击中率，也不安排隔离、暗室或真实检测步骤。
    </p>
  );
}

export function PsychologyLabLinks({
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
