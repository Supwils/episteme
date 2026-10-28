import Link from "next/link";

export function ChemistryLabDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      这不是测定实验。Q 和 K 是示意刻度，不是测得的常数，也不给出合成或反应操作步骤。
    </p>
  );
}

export function ChemistryLabLinks({
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
