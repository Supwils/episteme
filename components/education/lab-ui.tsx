import Link from "next/link";

export function EducationDisclaimer() {
  return (
    <p className="text-fg-muted text-[13px]">
      示意图用于分开时间表、话轮、分数零件与路径记录，不是背词器、课堂管理手册、真实心理测量工具或监视设计器。
    </p>
  );
}

export function EducationLinks({ items }: { items: readonly { href: string; label: string }[] }) {
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
