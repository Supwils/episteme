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
 * `top-24`. This is the same recipe used by the validated reference article
 * layout. The aside stays in normal flow, so no horizontal-offset math is
 * needed and it reserves its own column width (`lg:w-80`).
 *
 * Deliberately NOT `position: fixed`: several domain layouts wrap pages in a
 * transformed <div> (PageTransition), which would make a fixed child resolve
 * against that div instead of the viewport. Sticky is unaffected by an ancestor
 * transform. Deliberately NO `overflow-y: auto` here: an internal scroll area
 * hijacks the wheel when the pointer is over the sidebar — the exact bug this
 * replaces. A sidebar taller than the viewport simply has its tail revealed as
 * the article's end scrolls into view.
 */
export function ArticleSidebar({ children, className, contentClassName }: ArticleSidebarProps) {
  return (
    <aside
      className={cn("w-full flex-shrink-0 lg:sticky lg:top-24 lg:w-80 lg:self-start", className)}
    >
      <div className={cn(contentClassName)}>{children}</div>
    </aside>
  );
}
