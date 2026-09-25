import { extractFootnotes, renderInline, type Footnotes } from "@/components/markdown/inline";
import { splitSections } from "@/components/markdown/sections";
import { SectionView } from "@/components/markdown/SectionViews";
import "@/components/markdown/prose.css";

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
  const ctx = { footnotes, domain, accentColor };
  return (
    <div className={className ?? "md-prose"}>
      {splitSections(content).map((section, index) => (
        <SectionView key={section.heading?.id ?? `lead-${index}`} section={section} ctx={ctx} />
      ))}
      {footnotes.size > 0 && <FootnotesSection footnotes={footnotes} domain={domain} />}
    </div>
  );
}

function FootnotesSection({ footnotes, domain }: { footnotes: Footnotes; domain: string }) {
  return (
    <footer className="md-footnotes">
      <h2 className="md-footnotes__title">脚注</h2>
      <ol>
        {Array.from(footnotes.entries()).map(([id, text]) => (
          <li key={id} id={`fn-${id}`}>
            <span className="md-footnotes__id">[{id}]</span>
            {renderInline(text, footnotes, domain)}
            <a
              href={`#fnref-${id}`}
              aria-label={`返回脚注 ${id} 的引用处`}
              className="md-footnotes__back"
            >
              ↩
            </a>
          </li>
        ))}
      </ol>
    </footer>
  );
}
