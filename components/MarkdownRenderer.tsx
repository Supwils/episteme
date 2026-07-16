import katex from "katex";
import { resolveWikiLink } from "@/lib/wiki-link-index";
import {
  MarkdownCodeBlock,
  MarkdownZoomableImage,
  WikiLinkPreview,
} from "@/components/markdown/MarkdownInteractions";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Authors mark explicit anchors as `## \u6807\u9898 {#anchor}`; the suffix is
 * metadata, never display text.
 */
function parseHeading(raw: string): { text: string; id: string } {
  const match = raw.match(/^(.*?)\s*\{#([A-Za-z0-9_-]+)\}\s*$/);
  if (match) return { text: match[1]!.trim(), id: match[2]! };
  return { text: raw, id: slugify(raw) };
}

interface MarkdownRendererProps {
  content: string;
  accentColor?: string;
  className?: string;
  domain?: string;
}

export function MarkdownRenderer({
  content,
  accentColor = "#c8a45a",
  className,
  domain = "",
}: MarkdownRendererProps) {
  const footnotes = extractFootnotes(content);

  return (
    <div
      className={className ?? "prose prose-invert max-w-none"}
      style={{ fontFamily: "var(--font-body, inherit)" }}
    >
      {content.split("\n\n").map((para, i) => {
        const text = para.trim();
        if (!text) return null;

        if (text.startsWith("# ")) {
          const h1 = parseHeading(text.slice(2));
          return (
            <h1
              key={i}
              id={h1.id}
              className="font-display text-fg-primary mt-10 mb-4 text-[1.6rem] leading-tight font-semibold first:mt-0"
            >
              {h1.text}
            </h1>
          );
        }
        if (text.startsWith("## ")) {
          const { text: headingText, id } = parseHeading(text.slice(3));
          return (
            <h2
              key={i}
              id={id}
              className="font-display mt-8 mb-3 scroll-mt-24 text-[1.25rem] leading-snug font-semibold"
              style={{ color: accentColor }}
            >
              {headingText}
            </h2>
          );
        }
        if (text.startsWith("### ")) {
          const { text: headingText, id } = parseHeading(text.slice(4));
          return (
            <h3
              key={i}
              id={id}
              className="font-display text-fg-primary mt-6 mb-2 scroll-mt-24 text-lg font-semibold"
            >
              {headingText}
            </h3>
          );
        }
        if (text.startsWith("#### ")) {
          const { text: headingText, id } = parseHeading(text.slice(5));
          return (
            <h4
              key={i}
              id={id}
              className="font-display text-fg-primary mt-5 mb-2 scroll-mt-24 text-base font-semibold"
            >
              {headingText}
            </h4>
          );
        }
        if (text.startsWith("```")) {
          const lines = text.split("\n");
          const lang = lines[0]!.slice(3).trim();
          const code = lines.slice(1).join("\n");
          return (
            <MarkdownCodeBlock key={i} code={code} language={lang} accentColor={accentColor} />
          );
        }
        if (text.startsWith("> ")) {
          const quoteText = text
            .split("\n")
            .map((l) => l.replace(/^>\s?/, ""))
            .join("\n");
          return (
            <blockquote
              key={i}
              className="my-6 border-l-2 py-1 pl-5"
              style={{ borderColor: accentColor }}
            >
              <p className="font-display text-fg-primary text-lg leading-relaxed italic">
                {renderInline(quoteText, footnotes, domain)}
              </p>
            </blockquote>
          );
        }
        if (text.startsWith("| ")) {
          const rows = text.split("\n").filter((r) => !r.match(/^\|[\s-:|]+\|$/));
          return (
            <div
              key={i}
              tabIndex={0}
              role="region"
              aria-label="表格"
              className="border-border-faint my-6 overflow-x-auto rounded-lg border"
            >
              <table className="w-full text-sm">
                <thead>
                  {rows.length > 0 && (
                    <tr className="border-border-subtle bg-bg-elevated/50 border-b">
                      {rows[0]!
                        .split("|")
                        .filter(Boolean)
                        .map((c) => c.trim())
                        .map((cell, ci) => (
                          <th
                            key={ci}
                            className="text-fg-primary px-4 py-3 text-left font-semibold"
                          >
                            {renderInline(cell, footnotes, domain)}
                          </th>
                        ))}
                    </tr>
                  )}
                </thead>
                <tbody>
                  {rows.slice(1).map((row, ri) => {
                    const cells = row
                      .split("|")
                      .filter(Boolean)
                      .map((c) => c.trim());
                    return (
                      <tr
                        key={ri}
                        className={`border-border-faint border-b ${ri % 2 === 1 ? "bg-bg-elevated/20" : ""}`}
                      >
                        {cells.map((cell, ci) => (
                          <td key={ci} className="text-fg-secondary px-4 py-2.5">
                            {renderInline(cell, footnotes, domain)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
        if (text.startsWith("![") && text.includes("](")) {
          const imgMatch = text.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
          if (imgMatch) {
            return (
              <MarkdownZoomableImage
                key={i}
                src={imgMatch[2]!}
                alt={imgMatch[1]!}
                accentColor={accentColor}
              />
            );
          }
        }
        if (text.startsWith("---")) {
          return (
            <div key={i} className="my-10 flex items-center gap-3" aria-hidden>
              <span
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to right, transparent, ${accentColor}40)`,
                }}
              />
              <span className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: accentColor }} />
              <span
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to left, transparent, ${accentColor}40)`,
                }}
              />
            </div>
          );
        }
        if (text.startsWith("- ") || /^\d+\.\s/.test(text)) {
          const items = text.split("\n");
          const isOrdered = /^\d+\.\s/.test(items[0] ?? "");
          const Tag = isOrdered ? "ol" : "ul";
          return (
            <Tag
              key={i}
              className="text-fg-secondary my-4 ml-5 space-y-1.5 text-[15px] leading-relaxed"
              style={{ listStyleType: isOrdered ? "decimal" : "disc" }}
            >
              {items.map((item, li) => (
                <li key={li} className="leading-relaxed">
                  {renderInline(item.replace(/^[-\d.]+\s*/, ""), footnotes, domain)}
                </li>
              ))}
            </Tag>
          );
        }
        return (
          <p key={i} className="text-fg-secondary my-4 text-[15px] leading-[1.85]">
            {renderInline(text, footnotes, domain)}
          </p>
        );
      })}
      {footnotes.size > 0 && (
        <FootnotesSection footnotes={footnotes} accentColor={accentColor} domain={domain} />
      )}
    </div>
  );
}

function extractFootnotes(content: string): Map<string, string> {
  const footnotes = new Map<string, string>();
  const regex = /^\[\^(\w+)\]:\s*(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    footnotes.set(match[1]!, match[2]!);
  }
  return footnotes;
}

function FootnotesSection({
  footnotes,
  accentColor,
  domain,
}: {
  footnotes: Map<string, string>;
  accentColor: string;
  domain: string;
}) {
  return (
    <footer className="border-border-subtle mt-12 border-t pt-6">
      <h4 className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.22em] uppercase">脚注</h4>
      <ol className="space-y-2 text-sm">
        {Array.from(footnotes.entries()).map(([id, text]) => (
          <li key={id} id={`fn-${id}`} className="text-fg-secondary leading-relaxed">
            <span className="text-fg-disabled mr-1 font-mono text-xs">[{id}]</span>
            {renderInline(text, footnotes, domain)}
          </li>
        ))}
      </ol>
    </footer>
  );
}

function renderInline(
  text: string,
  footnotes: Map<string, string>,
  domain: string
): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const latexBlockMatch = remaining.match(/^\$\$[\s\S]*?\$\$/);
    if (latexBlockMatch) {
      const tex = latexBlockMatch[0].slice(2, -2).trim();
      const html = katex.renderToString(tex, { displayMode: true, throwOnError: false });
      parts.push(
        <span
          key={key++}
          tabIndex={0}
          role="math"
          aria-label={tex}
          className="my-2 block overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
      remaining = remaining.slice(latexBlockMatch[0].length);
      continue;
    }

    // Only treat $...$ as math when it carries a LaTeX signal (\ ^ _ {) and no
    // CJK — otherwise currency like "$100 万" / "$75,000" would render as garbled math.
    const latexInlineMatch = remaining.match(/^\$([^$\n]+?)\$/);
    if (
      latexInlineMatch &&
      /[\\^_{]/.test(latexInlineMatch[1]!) &&
      !/[一-鿿]/.test(latexInlineMatch[1]!)
    ) {
      const latex = latexInlineMatch[1]!;
      const html = katex.renderToString(latex, { displayMode: false, throwOnError: false });
      parts.push(
        <span
          key={key++}
          role="math"
          aria-label={latex}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
      remaining = remaining.slice(latexInlineMatch[0].length);
      continue;
    }

    const boldItalicMatch = remaining.match(/^\*\*\*(.+?)\*\*\*/);
    if (boldItalicMatch) {
      parts.push(
        <strong key={key++} className="text-fg-primary font-semibold">
          <em>{renderInline(boldItalicMatch[1]!, footnotes, domain)}</em>
        </strong>
      );
      remaining = remaining.slice(boldItalicMatch[0].length);
      continue;
    }

    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={key++} className="text-fg-primary font-semibold">
          {renderInline(boldMatch[1]!, footnotes, domain)}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    const italicMatch = remaining.match(/^\*(.+?)\*/);
    const italicMatch2 = remaining.match(/^_(.+?)_/);
    const italic = italicMatch || italicMatch2;
    if (italic) {
      parts.push(<em key={key++}>{renderInline(italic[1]!, footnotes, domain)}</em>);
      remaining = remaining.slice(italic[0].length);
      continue;
    }

    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code
          key={key++}
          className="bg-bg-elevated text-accent-gold rounded px-1 font-mono text-sm"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // `[[slug]]` / `[[slug|label]]` wiki-links annotate the concept graph. When
    // the slug resolves to a routable article (lib/wiki-link-index) we make it a
    // real internal link, preferring the reader's current domain for slugs that
    // exist in several. Unresolved targets stay an emphasized non-link chip so a
    // dead reference never becomes a broken link. Checked before `[label](url)`.
    const wikiMatch = remaining.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
    if (wikiMatch) {
      const target = wikiMatch[1]!.trim();
      const label = (wikiMatch[2] ?? wikiMatch[1])!.trim();
      const href = resolveWikiLink(target, domain);
      parts.push(
        href ? (
          <WikiLinkPreview key={key++} href={href} label={label} />
        ) : (
          <span key={key++} className="text-fg-primary font-medium">
            {label}
          </span>
        )
      );
      remaining = remaining.slice(wikiMatch[0].length);
      continue;
    }

    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={key++}
          href={linkMatch[2]}
          className="text-accent-gold underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    const footnoteRefMatch = remaining.match(/^\[\^(\w+)\]/);
    if (footnoteRefMatch && footnotes.has(footnoteRefMatch[1]!)) {
      parts.push(
        <a
          key={key++}
          href={`#fn-${footnoteRefMatch[1]}`}
          className="text-accent-gold align-super font-mono text-xs"
          title={footnotes.get(footnoteRefMatch[1]!)!}
        >
          [{footnoteRefMatch[1]}]
        </a>
      );
      remaining = remaining.slice(footnoteRefMatch[0].length);
      continue;
    }

    const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      parts.push(
        <img
          key={key++}
          src={imgMatch[2]}
          alt={imgMatch[1] || ""}
          loading="lazy"
          decoding="async"
          className="inline max-w-full rounded"
        />
      );
      remaining = remaining.slice(imgMatch[0].length);
      continue;
    }

    const plainMatch = remaining.match(/^[^*`_\[$]+/);
    if (plainMatch) {
      parts.push(plainMatch[0]);
      remaining = remaining.slice(plainMatch[0].length);
      continue;
    }

    parts.push(remaining[0]);
    remaining = remaining.slice(1);
  }

  return parts;
}
