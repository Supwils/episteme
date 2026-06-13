import type { ReactNode } from "react";
import { cn } from "@/components/ui/utils/cn";

interface ArticleSidebarProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Article sidebar that follows the reader down the page.
 *
 * Pattern: `self-start sticky top-24` on the <aside> itself — `self-start`
 * shrinks the aside to its content height so `sticky` has room to travel inside
 * the (taller) article row, and it pins below the nav once its top reaches
 * `top-24`. The aside stays in normal flow, so no horizontal-offset math is
 * needed and it reserves its own column width (`lg:w-80`).
 *
 * Deliberately NOT `position: fixed`: several domain layouts wrap pages in a
 * transformed <div> (PageTransition), which would make a fixed child resolve
 * against that div instead of the viewport. Sticky is unaffected by an ancestor
 * transform.
 *
 * Sidebars taller than the viewport (long TOCs) get `max-height` + internal
 * scroll, otherwise everything below the fold would be unreachable while
 * pinned. `overscroll-behavior` stays at its default (`auto`) on purpose:
 * once the inner scroll hits its end, the wheel chains back to the page, so
 * hovering the sidebar can never trap the reader's scroll.
 */
export function ArticleSidebar({ children, className, contentClassName }: ArticleSidebarProps) {
  return (
    <aside
      className={cn(
        "w-full flex-shrink-0 lg:sticky lg:top-24 lg:w-80 lg:self-start",
        "lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto",
        className
      )}
    >
      <div className={cn(contentClassName)}>{children}</div>
    </aside>
  );
}
