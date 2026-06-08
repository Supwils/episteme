import Link from "next/link";

const CATEGORY_LABELS: Record<string, string> = {
  thinkers: "哲学家",
  schools: "流派",
  isms: "主义",
  concepts: "概念",
  experiments: "思想实验",
  questions: "哲学大问题",
};

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbLegacyProps = {
  category: string;
  currentTitle: string;
  items?: never;
};

type BreadcrumbItemsProps = {
  items: BreadcrumbItem[];
  category?: never;
  currentTitle?: never;
};

type BreadcrumbProps = BreadcrumbLegacyProps | BreadcrumbItemsProps;

function Chevron() {
  return (
    <span aria-hidden className="text-fg-disabled shrink-0">
      <svg viewBox="0 0 8 8" className="h-2 w-2 fill-current">
        <path d="M2 0l4 4-4 4z" />
      </svg>
    </span>
  );
}

export default function Breadcrumb(props: BreadcrumbProps) {
  if ("items" in props && props.items) {
    return (
      <nav
        aria-label="breadcrumb"
        className="text-fg-muted mb-8 flex items-center gap-1.5 overflow-hidden font-mono text-[10px] uppercase tracking-[0.18em]"
      >
        <Link
          href="/"
          className="hover:text-fg-secondary hover:decoration-accent-gold/30 shrink-0 transition-colors duration-200 hover:underline hover:underline-offset-4"
        >
          首页
        </Link>
        {props.items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <Chevron />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-fg-secondary hover:decoration-accent-gold/30 shrink-0 transition-colors duration-200 hover:underline hover:underline-offset-4"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-fg-secondary min-w-0 truncate">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    );
  }

  const { category, currentTitle } = props as BreadcrumbLegacyProps;
  const label = CATEGORY_LABELS[category] ?? category;

  return (
    <nav
      aria-label="breadcrumb"
      className="text-fg-muted mb-8 flex items-center gap-1.5 overflow-hidden font-mono text-[10px] uppercase tracking-[0.18em]"
    >
      <Link
        href="/"
        className="hover:text-fg-secondary hover:decoration-accent-gold/30 shrink-0 transition-colors duration-200 hover:underline hover:underline-offset-4"
      >
        首页
      </Link>
      <Chevron />
      {category && (
        <>
          <Link
            href={`/${category}`}
            className="hover:text-fg-secondary hover:decoration-accent-gold/30 shrink-0 transition-colors duration-200 hover:underline hover:underline-offset-4"
          >
            {label}
          </Link>
          <Chevron />
        </>
      )}
      <span className="text-fg-secondary min-w-0 truncate">{currentTitle}</span>
    </nav>
  );
}
