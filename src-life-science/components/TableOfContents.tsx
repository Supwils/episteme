"use client";

import { useState, useEffect, useCallback } from "react";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const headings = document.querySelectorAll<HTMLElement>("h2[id], h3[id]");
    const tocItems: TocItem[] = Array.from(headings).map((h) => ({
      id: h.id,
      text: h.textContent || "",
      level: h.tagName === "H2" ? 2 : 3,
    }));
    setItems(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0 && visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      document.getElementById(id)?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [],
  );

  if (items.length === 0) return null;

  return (
    <>
      <div className="border-border-faint mb-8 hidden border-l pl-4 lg:block">
        <p className="text-fg-muted mb-3 font-mono text-[9px] tracking-[0.32em] uppercase">
          目录 · contents
        </p>
        <nav className="sticky top-24 max-h-[calc(100vh-8rem)] space-y-1.5 overflow-y-auto">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block py-0.5 font-mono text-[11px] leading-relaxed tracking-[0.04em] transition-colors ${
                item.level === 3 ? "pl-3" : ""
              } ${
                activeId === item.id
                  ? "text-accent-green"
                  : "text-fg-muted hover:text-accent-green"
              }`}
              onClick={(e) => handleClick(e, item.id)}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>

      <details
        className="border-border-faint border lg:hidden"
        open={!collapsed}
        onToggle={(e) =>
          setCollapsed(!(e.target as HTMLDetailsElement).open)
        }
      >
        <summary className="text-fg-muted cursor-pointer px-4 py-3 font-mono text-[10px] tracking-[0.28em] uppercase">
          目录 · contents
        </summary>
        <nav className="border-border-faint space-y-1.5 border-t px-4 pt-3 pb-4">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block py-0.5 font-mono text-[11px] leading-relaxed transition-colors ${
                item.level === 3 ? "pl-3" : ""
              } ${
                activeId === item.id
                  ? "text-accent-green"
                  : "text-fg-muted hover:text-accent-green"
              }`}
              onClick={(e) => handleClick(e, item.id)}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </details>
    </>
  );
}
