"use client";

const SKIP_TARGET_ID = "main-content";

/**
 * Section layouts render their own header inside the root <main>, so landing on
 * #main-content would put the reader right back in front of that nav. Those
 * layouts mark where their content starts with `data-skip-target` (plus
 * tabIndex={-1}); the link prefers that marker and otherwise keeps the native
 * #main-content jump, which is also what readers without JS get.
 */
function focusSectionContent(event: React.MouseEvent<HTMLAnchorElement>) {
  const sectionTarget = document.querySelector<HTMLElement>("[data-skip-target]");
  if (!sectionTarget) return;
  event.preventDefault();
  sectionTarget.focus();
}

// A plain anchor, not next/link: Link cancels the native jump, so focus never
// moved past the navigation.
export function SkipNav() {
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-2 focus-within:left-2 focus-within:z-[9999] focus-within:flex focus-within:gap-2">
      <a
        href={`#${SKIP_TARGET_ID}`}
        onClick={focusSectionContent}
        className="bg-bg-floating text-fg-primary focus:outline-accent-gold rounded px-4 py-2 text-sm focus:outline-2 focus:outline-offset-2"
      >
        跳转到内容
      </a>
    </div>
  );
}
