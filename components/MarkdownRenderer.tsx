import {
  extractFootnotes,
  footnoteReturnAnchors,
  renderInline,
  type Footnotes,
} from "@/components/markdown/inline";
import { splitSections } from "@/components/markdown/sections";
import { renderSection } from "@/components/markdown/SectionViews";
import { Fragment } from "react";
import {
  finalizeFootnoteAnchors,
  footnoteDefinitionAnchor,
  footnoteFragment,
} from "@/components/markdown/footnotes";
import "@/components/markdown/prose.css";
import { InlineMathScroll } from "@/components/markdown/InlineMathScroll";

interface MarkdownRendererProps {
  content: string;
  accentColor?: string;
  className?: string;
  domain?: string;
}

/**
 * The shared article body renderer (server component). Prose is split into
 * sections by h2; sections whose titles match a recurring corpus structure —
 * 破除误解, 事实卡, 关键洞察, 跨域连接, 参考文献… — render through dedicated
 * components (components/markdown/SectionViews.tsx). Nothing is rewritten:
 * unknown sections render as ordinary narrative.
 *
 * Page shells own the document h1, so a leading `# 标题` block is dropped and
 * any later `# ` heading is demoted to h2.
 */
export function MarkdownRenderer({
  content,
  accentColor = "#c8a45a",
  className,
  domain = "",
}: MarkdownRendererProps) {
  const footnotes = extractFootnotes(content);
  const usedHeadingIds = new Set<string>();
  const sections = splitSections(content, usedHeadingIds);
  const ctx = { footnotes, domain, accentColor, usedHeadingIds };
  const body = sections.map((section, index) => (
    <Fragment key={section.heading?.id ?? `lead-${index}`}>
      {renderSection({ section, ctx })}
    </Fragment>
  ));
  const notes = Array.from(footnotes, ([id, text]) => ({
    id,
    content: renderInline(text, footnotes, domain),
  }));
  finalizeFootnoteAnchors(footnotes, usedHeadingIds);
  return (
    <div className={className ?? "md-prose"}>
      {body}
      {footnotes.size > 0 && <FootnotesSection footnotes={footnotes} notes={notes} />}
      <InlineMathScroll />
    </div>
  );
}

function FootnotesSection({
  footnotes,
  notes,
}: {
  footnotes: Footnotes;
  notes: { id: string; content: React.ReactNode }[];
}) {
  return (
    <footer className="md-footnotes">
      <h2 className="md-footnotes__title">脚注</h2>
      <ol>
        {notes.map(({ id, content }) => (
          <li key={id} id={footnoteDefinitionAnchor(footnotes, id)}>
            <span className="md-footnotes__id">[{id}]</span>
            {content}
            {footnoteReturnAnchors(footnotes, id).map((anchor, index, anchors) => (
              <a
                key={anchor}
                href={footnoteFragment(anchor)}
                aria-label={
                  anchors.length === 1
                    ? `返回脚注 ${id} 的引用处`
                    : `返回脚注 ${id} 的第 ${index + 1} 处引用`
                }
                className="md-footnotes__back"
              >
                ↩
              </a>
            ))}
          </li>
        ))}
      </ol>
    </footer>
  );
}
