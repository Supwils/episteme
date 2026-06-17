"use client";

import { useState, useCallback, useEffect } from "react";
import type Katex from "katex";

// KaTeX is ~260KB; only load it when an article actually contains math.
// Module-level cache so it loads once across all rendered articles.
let katexLib: typeof Katex | null = null;
let katexLoad: Promise<void> | null = null;
function loadKatex(): Promise<void> {
  if (katexLib) return Promise.resolve();
  if (!katexLoad) katexLoad = import("katex").then((m) => void (katexLib = m.default));
  return katexLoad;
}

// Returns rendered HTML, or null when KaTeX has not loaded yet (caller shows
// the LaTeX source as a fallback until the component re-renders post-load).
function renderKatex(latex: string, displayMode: boolean): string | null {
  if (!katexLib) return null;
  return katexLib.renderToString(latex, { displayMode, throwOnError: false });
}

const MATH_PATTERN = /\$\$[\s\S]*?\$\$|\$[^$\n]*[\\^_{][^$\n]*\$/;

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
}

export function MarkdownRenderer({
  content,
  accentColor = "#c8a45a",
  className,
}: MarkdownRendererProps) {
  const footnotes = extractFootnotes(content);

  // Lazy-load KaTeX only when this article has math; re-render once it lands.
  const [, setKatexReady] = useState(false);
  useEffect(() => {
    if (katexLib) return;
    if (MATH_PATTERN.test(content)) loadKatex().then(() => setKatexReady(true));
  }, [content]);

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
          return <CodeBlock key={i} code={code} language={lang} accentColor={accentColor} />;
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
                {renderInline(quoteText, footnotes)}
              </p>
            </blockquote>
          );
        }
        if (text.startsWith("| ")) {
          const rows = text.split("\n").filter((r) => !r.match(/^\|[\s-:|]+\|$/));
          return (
            <div key={i} className="border-border-faint my-6 overflow-x-auto rounded-lg border">
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
                            {renderInline(cell, footnotes)}
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
                            {renderInline(cell, footnotes)}
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
              <ZoomableImage
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
                  {renderInline(item.replace(/^[-\d.]+\s*/, ""), footnotes)}
                </li>
              ))}
            </Tag>
          );
        }
        return (
          <p key={i} className="text-fg-secondary my-4 text-[15px] leading-[1.85]">
            {renderInline(text, footnotes)}
          </p>
        );
      })}
      {footnotes.size > 0 && <FootnotesSection footnotes={footnotes} accentColor={accentColor} />}
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
}: {
  footnotes: Map<string, string>;
  accentColor: string;
}) {
  return (
    <footer className="border-border-subtle mt-12 border-t pt-6">
      <h4 className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.22em] uppercase">脚注</h4>
      <ol className="space-y-2 text-sm">
        {Array.from(footnotes.entries()).map(([id, text]) => (
          <li key={id} id={`fn-${id}`} className="text-fg-secondary leading-relaxed">
            <span className="text-fg-disabled mr-1 font-mono text-xs">[{id}]</span>
            {renderInline(text, footnotes)}
          </li>
        ))}
      </ol>
    </footer>
  );
}

function CodeBlock({
  code,
  language,
  accentColor,
}: {
  code: string;
  language: string;
  accentColor: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="group/code border-border-faint relative my-6 overflow-hidden rounded-lg border">
      {language && (
        <div className="border-border-faint bg-bg-elevated/50 border-b px-4 py-1.5">
          <span
            className="font-mono text-[10px] tracking-[0.15em] uppercase"
            style={{ color: accentColor }}
          >
            {language}
          </span>
        </div>
      )}
      <pre className="bg-bg-elevated overflow-x-auto p-4">
        <code className="text-fg-primary font-mono text-sm leading-relaxed">{code}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="border-border-faint bg-bg-panel/80 hover:bg-bg-elevated absolute top-2 right-2 rounded-md border px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase opacity-0 backdrop-blur-sm transition-opacity group-hover/code:opacity-100"
        style={{ color: copied ? "#6bae8a" : accentColor }}
        aria-label={copied ? "已复制" : "复制代码"}
      >
        {copied ? "已复制 ✓" : "复制"}
      </button>
    </div>
  );
}

function ZoomableImage({
  src,
  alt,
  accentColor,
}: {
  src: string;
  alt: string;
  accentColor: string;
}) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <figure className="my-8">
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="group/img border-border-faint hover:border-border-subtle relative block w-full cursor-zoom-in overflow-hidden rounded-lg border transition-all"
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full transition-transform duration-300 group-hover/img:scale-[1.02]"
          />
          <span
            className="bg-bg-panel/80 absolute right-2 bottom-2 rounded-md px-2 py-1 font-mono text-[10px] tracking-wider uppercase opacity-0 backdrop-blur-sm transition-opacity group-hover/img:opacity-100"
            style={{ color: accentColor }}
          >
            点击放大
          </span>
        </button>
        {alt && <figcaption className="text-fg-muted mt-2 text-center text-sm">{alt}</figcaption>}
      </figure>
      {zoomed && (
        <div
          className="fixed inset-0 z-[500] flex cursor-zoom-out items-center justify-center bg-black/80 p-8 backdrop-blur-sm"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-label={alt || "图片预览"}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

function renderInline(text: string, footnotes: Map<string, string>): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const latexBlockMatch = remaining.match(/^\$\$[\s\S]*?\$\$/);
    if (latexBlockMatch) {
      const tex = latexBlockMatch[0].slice(2, -2).trim();
      const html = renderKatex(tex, true);
      parts.push(
        html === null ? (
          <span
            key={key++}
            className="text-fg-muted my-2 block overflow-x-auto font-mono text-[0.85em]"
          >
            {tex}
          </span>
        ) : (
          <span
            key={key++}
            className="my-2 block overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )
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
      const html = renderKatex(latexInlineMatch[1]!, false);
      parts.push(
        html === null ? (
          <span key={key++} className="text-fg-muted font-mono text-[0.9em]">
            {latexInlineMatch[1]!}
          </span>
        ) : (
          <span key={key++} dangerouslySetInnerHTML={{ __html: html }} />
        )
      );
      remaining = remaining.slice(latexInlineMatch[0].length);
      continue;
    }

    const boldItalicMatch = remaining.match(/^\*\*\*(.+?)\*\*\*/);
    if (boldItalicMatch) {
      parts.push(
        <strong key={key++} className="text-fg-primary font-semibold">
          <em>{boldItalicMatch[1]}</em>
        </strong>
      );
      remaining = remaining.slice(boldItalicMatch[0].length);
      continue;
    }

    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={key++} className="text-fg-primary font-semibold">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    const italicMatch = remaining.match(/^\*(.+?)\*/);
    const italicMatch2 = remaining.match(/^_(.+?)_/);
    const italic = italicMatch || italicMatch2;
    if (italic) {
      parts.push(<em key={key++}>{italic[1]}</em>);
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

    // `[[概念]]` wiki-links annotate a concept graph (the "连接节点" lines in
    // physics KB). Many targets have no page, so render the name as an
    // emphasized non-link chip rather than risk dead links. Checked before the
    // `[label](url)` rule since both start with `[`.
    const wikiMatch = remaining.match(/^\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);
    if (wikiMatch) {
      parts.push(
        <span key={key++} className="text-fg-primary font-medium">
          {wikiMatch[1]!.trim()}
        </span>
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
