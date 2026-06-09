"use client";

import { useState, useEffect, useCallback } from "react";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

interface TableOfContentsProps {
  accentColor?: string;
}

export function TableOfContents({ accentColor = "#c8a45a" }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [collapsed, setCollapsed] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

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
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlighting the active item is purely visual — we deliberately do NOT
  // auto-scroll it into view, because doing so fought the reader's own scroll.

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      document.getElementById(id)?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [],
  );

  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop: a floating sticky list. No inner scroll container, so it never
          traps the wheel; it simply rides along with the page scroll. */}
      <nav
        aria-label="目录"
        className="sticky top-24 hidden self-start border-border-faint border-l pl-4 lg:block"
      >
        <div className="h-0.5 rounded-full bg-border-faint mb-3">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress}%`, backgroundColor: accentColor }}
          />
        </div>
        <p className="text-fg-muted mb-3 font-mono text-[9px] tracking-[0.32em] uppercase">
          目录 · contents
        </p>
        <div className="space-y-1.5">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block py-0.5 font-mono text-[11px] leading-relaxed tracking-[0.04em] transition-colors duration-200 ${
                  item.level === 3 ? "pl-3" : ""
                } ${isActive ? "font-medium" : "text-fg-muted hover:opacity-80"}`}
                style={isActive ? { color: accentColor } : undefined}
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.text}
              </a>
            );
          })}
        </div>
      </nav>

      <details
        className="border-border-faint border lg:hidden"
        open={!collapsed}
        onToggle={(e) => setCollapsed(!(e.target as HTMLDetailsElement).open)}
      >
        <summary className="text-fg-muted cursor-pointer px-4 py-3 font-mono text-[10px] tracking-[0.28em] uppercase">
          目录 · contents
        </summary>
        <nav className="border-border-faint space-y-1.5 border-t px-4 pt-3 pb-4">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block py-0.5 font-mono text-[11px] leading-relaxed transition-colors duration-200 ${
                item.level === 3 ? "pl-3" : ""
              } ${
                activeId === item.id
                  ? "font-medium"
                  : "text-fg-muted hover:opacity-80"
              }`}
              style={activeId === item.id ? { color: accentColor } : undefined}
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
