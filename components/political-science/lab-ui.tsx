import Link from "next/link";

export function PoliticalScienceLabDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      这不是选举预测器，不跟踪选民，不保存进度。席位和否决者都是示意计数，不是民调，也不是某次选举的结果。
    </p>
  );
}

export function PoliticalScienceLabLinks({
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
