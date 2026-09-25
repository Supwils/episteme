import type { AskPrompt } from "@/lib/article-discovery";
import "./article/article-chrome.css";

/**
 * Static Socratic prompts that scroll to in-article h2 anchors, set as the
 * index tabs of a notebook: each question is a tab standing on the page edge.
 */
export function AskThisArticle({ prompts, accent }: { prompts: AskPrompt[]; accent: string }) {
  if (prompts.length < 2) return null;

  return (
    <nav aria-label="问问这篇" className="ask-tabs print-hidden">
      <p className="ask-tabs__title">问问这篇</p>
      <ul className="ask-tabs__list" style={{ ["--tab-accent" as string]: accent }}>
        {prompts.map((p) => (
          <li key={p.href}>
            <a href={p.href} className="ask-tab">
              {p.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
