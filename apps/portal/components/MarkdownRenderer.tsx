"use client";

import { useState, useCallback } from "react";
import katex from "katex";

function renderKatex(latex: string, displayMode: boolean): string {
  return katex.renderToString(latex, { displayMode, throwOnError: false });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-|-$/g, "");
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

  return (
    <div className={className ?? "prose prose-invert max-w-none"}>
      {content.split("\n\n").map((para, i) => {
        const text = para.trim();
        if (!text) return null;

        if (text.startsWith("# ")) {
          return (
            <h1
              key={i}
              id={slugify(text.slice(2))}
              className="font-display text-fg-primary mb-4 mt-10 text-[1.6rem] font-semibold leading-tight first:mt-0"
            >
              {text.slice(2)}
            </h1>
          );
        }
        if (text.startsWith("## ")) {
          const headingText = text.slice(3);
          const id = slugify(headingText);
          return (
            <h2
              key={i}
              id={id}
              className="font-display mb-3 mt-8 scroll-mt-24 text-[1.25rem] font-semibold leading-snug"
              style={{ color: accentColor }}
            >
              {headingText}
            </h2>
          );
        }
        if (text.startsWith("### ")) {
          const headingText = text.slice(4);
          const id = slugify(headingText);
          return (
            <h3
              key={i}
              id={id}
              className="font-display text-fg-primary mb-2 mt-6 scroll-mt-24 text-lg font-semibold"
            >
              {headingText}
            </h3>
          );
        }
        if (text.startsWith("#### ")) {
          const headingText = text.slice(5);
          const id = slugify(headingText);
          return (
            <h4
              key={i}
              id={id}
              className="font-display text-fg-primary mb-2 mt-5 scroll-mt-24 text-base font-semibold"
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
            <CodeBlock key={i} code={code} language={lang} accentColor={accentColor} />
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
              className="border-l-3 my-6 rounded-r-lg py-4 pl-5 pr-4"
              style={{
                borderColor: accentColor,
                background: `linear-gradient(135deg, ${accentColor}0a, ${accentColor}04)`,
              }}
            >
              <p className="font-display text-fg-primary text-lg italic leading-relaxed">
                {renderInline(quoteText, footnotes)}
              </p>
            </blockquote>
          );
        }
        if (text.startsWith("| ")) {
          const rows = text.split("\n").filter((r) => !r.match(/^\|[\s-:|]+\|$/));
          return (
            <div key={i} className="my-6 overflow-x-auto rounded-lg border border-border-faint">
              <table className="w-full text-sm">
                <thead>
                  {rows.length > 0 && (
                    <tr className="border-b border-border-subtle bg-bg-elevated/50">
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
                        className={`border-b border-border-faint ${ri % 2 === 1 ? "bg-bg-elevated/20" : ""}`}
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
      <h4 className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.22em] uppercase">
        脚注
      </h4>
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
    <div className="group/code relative my-6 overflow-hidden rounded-lg border border-border-faint">
      {language && (
        <div className="border-b border-border-faint bg-bg-elevated/50 px-4 py-1.5">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: accentColor }}>
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
        className="absolute right-2 top-2 rounded-md border border-border-faint bg-bg-panel/80 px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase opacity-0 backdrop-blur-sm transition-opacity hover:bg-bg-elevated group-hover/code:opacity-100"
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
          className="group/img relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border-faint transition-all hover:border-border-subtle"
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full transition-transform duration-300 group-hover/img:scale-[1.02]"
          />
          <span className="absolute bottom-2 right-2 rounded-md bg-bg-panel/80 px-2 py-1 font-mono text-[10px] tracking-wider uppercase opacity-0 backdrop-blur-sm transition-opacity group-hover/img:opacity-100" style={{ color: accentColor }}>
            点击放大
          </span>
        </button>
        {alt && (
          <figcaption className="text-fg-muted mt-2 text-center text-sm">{alt}</figcaption>
        )}
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

function renderInline(
  text: string,
  footnotes: Map<string, string>,
): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const latexBlockMatch = remaining.match(/^\$\$[\s\S]*?\$\$/);
    if (latexBlockMatch) {
      parts.push(
        <span
          key={key++}
          className="my-2 block overflow-x-auto"
          dangerouslySetInnerHTML={{
            __html: renderKatex(latexBlockMatch[0].slice(2, -2).trim(), true),
          }}
        />,
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
      parts.push(
        <span
          key={key++}
          dangerouslySetInnerHTML={{
            __html: renderKatex(latexInlineMatch[1]!, false),
          }}
        />,
      );
      remaining = remaining.slice(latexInlineMatch[0].length);
      continue;
    }

    const boldItalicMatch = remaining.match(/^\*\*\*(.+?)\*\*\*/);
    if (boldItalicMatch) {
      parts.push(
        <strong key={key++} className="text-fg-primary font-semibold">
          <em>{boldItalicMatch[1]}</em>
        </strong>,
      );
      remaining = remaining.slice(boldItalicMatch[0].length);
      continue;
    }

    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={key++} className="text-fg-primary font-semibold">
          {boldMatch[1]}
        </strong>,
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
          className="text-[#e8b84a] bg-[#1a1a2e] px-1 rounded font-mono text-sm"
        >
          {codeMatch[1]}
        </code>,
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={key++}
          href={linkMatch[2]}
          className="text-[#6366f1] underline hover:text-[#818cf8]"
        >
          {linkMatch[1]}
        </a>,
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
          className="font-mono text-xs align-super"
          style={{ color: "#6366f1" }}
          title={footnotes.get(footnoteRefMatch[1]!)!}
        >
          [{footnoteRefMatch[1]}]
        </a>,
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
        />,
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
