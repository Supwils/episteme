"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { subscribeToScrollFrame } from "@/lib/scroll-frame";
import "./toc-rail.css";

const HEADING_SCROLL_OFFSET = 96;

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
  /** Share of the article this section occupies (0–1), for its length tick. */
  share: number;
};

interface TableOfContentsProps {
  accentColor?: string;
}

export function TableOfContents({ accentColor = "#c8a45a" }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const headingsRef = useRef<HTMLElement[]>([]);
  const sheetRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const headings = document.querySelectorAll<HTMLElement>("h2[id], h3[id]");
    const tops = Array.from(headings).map((h) => h.getBoundingClientRect().top + window.scrollY);
    const end = document.documentElement.scrollHeight;
    const span = Math.max(1, end - (tops[0] ?? 0));
    const tocItems: TocItem[] = Array.from(headings).map((h, index) => ({
      id: h.id,
      // Headings may carry a hover `#` permalink (MarkdownRenderer); it is
      // markup, not title text, so exclude it from the TOC label.
      text: Array.from(h.childNodes)
        .filter((n) => !(n instanceof HTMLElement && n.hasAttribute("data-heading-anchor")))
        .map((n) => n.textContent)
        .join(""),
      level: h.tagName === "H2" ? 2 : 3,
      share: ((tops[index + 1] ?? end) - tops[index]!) / span,
    }));
    setItems(tocItems);
    headingsRef.current = Array.from(headings);

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

  // The brass line fills the rail row by row: inside section i it advances by
  // how far the reader is through that section, so the fill tracks the text.
  useEffect(() => {
    return subscribeToScrollFrame(({ scrollY }) => {
      const fill = progressRef.current;
      const rows = railRef.current?.children;
      const headings = headingsRef.current;
      if (!fill || !rows || headings.length === 0) return;
      const probe = scrollY + HEADING_SCROLL_OFFSET;
      const tops = headings.map((h) => h.getBoundingClientRect().top + scrollY);
      const end =
        document.documentElement.scrollHeight - window.innerHeight + HEADING_SCROLL_OFFSET;
      const index = tops.findLastIndex((top) => top <= probe);
      let height = 0;
      if (index >= 0) {
        const start = tops[index]!;
        const stop = Math.min(tops[index + 1] ?? end, end);
        const within = Math.min(1, Math.max(0, (probe - start) / Math.max(1, stop - start)));
        const row = rows[index] as HTMLElement | undefined;
        height = (row?.offsetTop ?? 0) + (row?.offsetHeight ?? 0) * within;
      }
      fill.style.transform = `scaleY(${height / Math.max(1, railRef.current!.offsetHeight)})`;
    });
  }, [items]);

  // Highlighting the active item is purely visual — we deliberately do NOT
  // auto-scroll it into view, because doing so fought the reader's own scroll.

  useEffect(() => {
    if (!sheetOpen) return;
    const sheet = sheetRef.current;
    const trigger = buttonRef.current;
    if (!sheet) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = sheet.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setSheetOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
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
      <nav aria-label="目录" className="toc-rail mb-4 hidden self-start lg:block">
        <p className="toc-rail__title">目录</p>
        <div className="toc-rail__body">
          <div aria-hidden className="toc-rail__track">
            <div ref={progressRef} className="toc-rail__fill" style={{ background: accentColor }} />
          </div>
          <ol ref={railRef} className="toc-rail__list">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} data-level={item.level} data-active={isActive || undefined}>
                  <span
                    aria-hidden
                    className="toc-rail__tick"
                    // Tick length shows how long the section is: 4–18px.
                    style={{ width: `${Math.round(4 + Math.min(1, item.share * 4) * 14)}px` }}
                  />
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    style={
                      isActive
                        ? {
                            color: `color-mix(in oklab, ${accentColor} 42%, var(--color-fg-primary))`,
                          }
                        : undefined
                    }
                    onClick={(e) => handleClick(e, item.id)}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>

      {/* Mobile: the sidebar sits below the article in DOM order, so an inline
          TOC would be unreachable until after the whole body. A floating
          button + bottom sheet keeps navigation one tap away instead. */}
      {createPortal(
        <div className="print-hidden lg:hidden">
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={sheetOpen}
            aria-controls="mobile-toc-sheet"
            onClick={() => setSheetOpen(true)}
            className="border-border-subtle bg-bg-panel text-fg-primary fixed bottom-6 left-4 z-40 flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] shadow-lg transition-colors [[data-narration-active]_&]:bottom-24"
            style={sheetOpen ? { opacity: 0, pointerEvents: "none" } : undefined}
          >
            <span
              aria-hidden="true"
              className="bg-fg-primary inline-block h-1.5 w-1.5 rounded-full"
            />
            目录
          </button>
          {sheetOpen && (
            <div
              className="fixed inset-0 z-50 flex items-end"
              role="presentation"
              onClick={() => setSheetOpen(false)}
            >
              <div className="bg-scrim absolute inset-0 backdrop-blur-[2px]" />
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
                  <p className="font-display text-fg-primary text-sm">目录</p>
                  <button
                    type="button"
                    onClick={() => setSheetOpen(false)}
                    className="text-fg-muted hover:text-fg-primary text-[13px] transition-colors"
                  >
                    关闭
                  </button>
                </div>
                <nav className="space-y-1.5">
                  {items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 text-[14px] leading-relaxed transition-colors duration-200 ${
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
