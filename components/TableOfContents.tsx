"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

const HEADING_SCROLL_OFFSET = 96;

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headings = document.querySelectorAll<HTMLElement>("h2[id], h3[id]");
    const tocItems: TocItem[] = Array.from(headings).map((h) => ({
      id: h.id,
      // Headings may carry a hover `#` permalink (MarkdownRenderer); it is
      // markup, not title text, so exclude it from the TOC label.
      text: Array.from(h.childNodes)
        .filter((n) => !(n instanceof HTMLElement && n.hasAttribute("data-heading-anchor")))
        .map((n) => n.textContent)
        .join(""),
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
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
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

  useEffect(() => {
    if (!sheetOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    sheetRef.current?.querySelector("a")?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [sheetOpen]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    setSheetOpen(false);
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - HEADING_SCROLL_OFFSET,
      behavior: "auto",
    });
    window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });
    setActiveId(id);
  }, []);

  if (items.length === 0) return null;

  return (
    <>
      {/* TOC jumps are instant so a programmatic smooth scroll cannot fight the
          reader's next wheel input. */}
      <nav
        aria-label="目录"
        className="border-border-faint mb-4 hidden self-start border-l pl-4 lg:block"
      >
        <div className="bg-border-faint mb-3 h-0.5 rounded-full">
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

      {/* Mobile: the sidebar sits below the article in DOM order, so an inline
          TOC would be unreachable until after the whole body. A floating
          button + bottom sheet keeps navigation one tap away instead. */}
      {createPortal(
        <div className="print-hidden lg:hidden">
          <button
            type="button"
            aria-expanded={sheetOpen}
            aria-controls="mobile-toc-sheet"
            onClick={() => setSheetOpen(true)}
            className="border-border-faint bg-bg-panel/90 text-fg-secondary fixed bottom-6 left-4 z-40 flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[10px] tracking-[0.24em] uppercase shadow-lg backdrop-blur-md transition-colors"
            style={sheetOpen ? { opacity: 0, pointerEvents: "none" } : undefined}
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            目录
          </button>
          {sheetOpen && (
            <div
              className="fixed inset-0 z-50 flex items-end"
              role="presentation"
              onClick={() => setSheetOpen(false)}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
              <div
                ref={sheetRef}
                id="mobile-toc-sheet"
                role="dialog"
                aria-modal="true"
                aria-label="目录"
                className="border-border-subtle bg-bg-panel relative max-h-[70vh] w-full overflow-y-auto rounded-t-2xl border-t p-5 pb-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-fg-muted font-mono text-[9px] tracking-[0.32em] uppercase">
                    目录 · contents
                  </p>
                  <button
                    type="button"
                    onClick={() => setSheetOpen(false)}
                    className="text-fg-muted hover:text-fg-primary font-mono text-[10px] tracking-[0.2em] uppercase transition-colors"
                  >
                    关闭
                  </button>
                </div>
                <nav className="space-y-1.5">
                  {items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 font-mono text-[12px] leading-relaxed transition-colors duration-200 ${
                        item.level === 3 ? "pl-3" : ""
                      } ${activeId === item.id ? "font-medium" : "text-fg-muted hover:opacity-80"}`}
                      style={activeId === item.id ? { color: accentColor } : undefined}
                      onClick={(e) => handleClick(e, item.id)}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
