import Link from "next/link";

export function AnthropologyDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      示意图用于分开称谓系统、文化区、地层与互惠类型，不是寻宝图，也不能代替发掘报告或民族志原文。
    </p>
  );
}

export function AnthropologyLinks({
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
