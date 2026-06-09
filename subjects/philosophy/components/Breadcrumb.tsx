import Link from "next/link";

const CATEGORY_LABELS: Record<string, string> = {
  thinkers: "哲学家",
  schools: "流派",
  isms: "主义",
  experiments: "思想实验",
  questions: "哲学大问题",
};

type BreadcrumbProps = {
  category: string;
  currentTitle: string;
};

export default function Breadcrumb({ category, currentTitle }: BreadcrumbProps) {
  const label = CATEGORY_LABELS[category] ?? category;

  return (
    <nav
      aria-label="breadcrumb"
      className="mb-8 flex items-center gap-1.5 overflow-hidden font-mono text-[10px] tracking-[0.18em] uppercase text-fg-muted"
    >
      <Link
        href="/"
        className="shrink-0 transition-colors duration-200 hover:text-fg-secondary hover:underline hover:underline-offset-4 hover:decoration-accent-gold/30"
      >
        首页
      </Link>
      <span aria-hidden className="shrink-0 text-fg-disabled">
        <svg viewBox="0 0 8 8" className="h-2 w-2 fill-current">
          <path d="M2 0l4 4-4 4z" />
        </svg>
      </span>
      {category && (
        <>
          <Link
            href={`/${category}`}
            className="shrink-0 transition-colors duration-200 hover:text-fg-secondary hover:underline hover:underline-offset-4 hover:decoration-accent-gold/30"
          >
            {label}
          </Link>
          <span aria-hidden className="shrink-0 text-fg-disabled">
            <svg viewBox="0 0 8 8" className="h-2 w-2 fill-current">
              <path d="M2 0l4 4-4 4z" />
            </svg>
          </span>
        </>
      )}
      <span className="min-w-0 truncate text-fg-secondary">{currentTitle}</span>
    </nav>
  );
}
