"use client";

import { useState, useCallback } from "react";
import katex from "katex";

function renderKatex(latex: string, displayMode: boolean): string {
  return katex.renderToString(latex, { displayMode, throwOnError: false });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-|-$/g, '');
}

interface MathMarkdownRendererProps {
  content: string;
  accentColor?: string;
  className?: string;
}

export function MathMarkdownRenderer({
  content,
  accentColor = "#6366f1",
  className,
}: MathMarkdownRendererProps) {
  const blocks = splitBlocks(content);
  const footnotes = extractFootnotes(content);

  return (
    <div className={className ?? "prose max-w-none"}>
      {blocks.map((block, i) => renderBlock(block, i, accentColor, footnotes))}
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

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "blockquote"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "hr" }
  | { type: "code"; lang: string; code: string }
  | { type: "paragraph"; text: string };

function splitBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!;
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1]!.length,
        text: headingMatch[2]!,
      });
      i++;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.trim().startsWith("```")) {
        codeLines.push(lines[i]!);
        i++;
      }
      i++;
      blocks.push({ type: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && (lines[i]!.trim().startsWith("> ") || lines[i]!.trim() === ">")) {
        quoteLines.push(lines[i]!.trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join("\n") });
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || /^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      const ordered = /^\d+\.\s/.test(trimmed);
      while (
        i < lines.length &&
        (lines[i]!.trim().startsWith("- ") ||
          lines[i]!.trim().startsWith("* ") ||
          /^\d+\.\s/.test(lines[i]!.trim()))
      ) {
        items.push(lines[i]!.trim().replace(/^[-*]\s|^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    if (trimmed.startsWith("| ")) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i]!.trim().startsWith("| ")) {
        const row = lines[i]!.trim();
        if (/^\|[\s\-:|]+\|$/.test(row)) {
          i++;
          continue;
        }
        const cells = row
          .split("|")
          .filter((c) => c.trim() !== "")
          .map((c) => c.trim());
        tableRows.push(cells);
        i++;
      }
      if (tableRows.length > 0) {
        blocks.push({ type: "table", rows: tableRows });
      }
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length && lines[i]!.trim() !== "") {
      paraLines.push(lines[i]!.trim());
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", text: paraLines.join("\n") });
    }
  }

  return blocks;
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

function renderBlock(block: Block, key: number, accentColor: string, footnotes: Map<string, string>): React.ReactNode {
  switch (block.type) {
    case "heading": {
      const id = slugify(block.text);
      const text = renderInline(block.text, footnotes);
      if (block.level === 1) {
        return (
          <h1
            key={key}
            id={id}
            className="font-display text-fg-primary mb-4 mt-10 text-[1.6rem] font-semibold leading-tight first:mt-0"
          >
            {text}
          </h1>
        );
      }
      if (block.level === 2) {
        return (
          <h2
            key={key}
            id={id}
            className="font-display mt-8 mb-3 text-[1.25rem] font-semibold leading-snug scroll-mt-24"
            style={{ color: accentColor }}
          >
            {text}
          </h2>
        );
      }
      if (block.level === 3) {
        return (
          <h3
            key={key}
            id={id}
            className="font-display text-fg-primary mt-6 mb-2 text-lg font-semibold scroll-mt-24"
          >
            {text}
          </h3>
        );
      }
      return (
        <h4
          key={key}
          id={id}
          className="font-display text-fg-primary mt-4 mb-2 text-base font-semibold scroll-mt-24"
        >
          {text}
        </h4>
      );
    }

    case "blockquote":
      return (
        <blockquote
          key={key}
          className="my-6 border-l-3 rounded-r-lg py-4 pl-5 pr-4"
          style={{
            borderColor: accentColor,
            background: `linear-gradient(135deg, ${accentColor}0a, ${accentColor}04)`,
          }}
        >
          <p className="font-display text-fg-primary text-lg italic leading-relaxed">
            {renderInline(block.text, footnotes)}
          </p>
        </blockquote>
      );

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          key={key}
          className="text-fg-secondary my-4 ml-5 space-y-1.5 text-[15px] leading-relaxed"
          style={{ listStyleType: block.ordered ? "decimal" : "disc" }}
        >
          {block.items.map((item, li) => (
            <li key={li} className="leading-relaxed">
              {renderInline(item, footnotes)}
            </li>
          ))}
        </Tag>
      );
    }

    case "table":
      return (
        <div key={key} className="my-6 overflow-x-auto rounded-lg border border-border-faint">
          <table className="w-full text-sm">
            <thead>
              {block.rows.length > 0 && (
                <tr className="border-b border-border-subtle bg-bg-elevated/50">
                  {block.rows[0]!.map((cell, ci) => (
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
              {block.rows.slice(1).map((row, ri) => (
                <tr
                  key={ri}
                  className={`border-b border-border-faint ${ri % 2 === 1 ? "bg-bg-elevated/20" : ""}`}
                >
                  {row.map((cell, ci) => (
                    <td key={ci} className="text-fg-secondary px-4 py-2.5">
                      {renderInline(cell, footnotes)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "code":
      return (
        <CodeBlock key={key} code={block.code} language={block.lang} accentColor={accentColor} />
      );

    case "hr":
      return (
        <div key={key} className="my-10 flex items-center gap-3" aria-hidden>
          <span
            className="h-px flex-1"
            style={{ background: `linear-gradient(to right, transparent, ${accentColor}40)` }}
          />
          <span className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: accentColor }} />
          <span
            className="h-px flex-1"
            style={{ background: `linear-gradient(to left, transparent, ${accentColor}40)` }}
          />
        </div>
      );

    case "paragraph":
      return (
        <p key={key} className="text-fg-secondary my-4 text-[15px] leading-[1.85]">
          {renderInline(block.text, footnotes)}
        </p>
      );
  }
}

function renderInline(text: string, footnotes: Map<string, string>): React.ReactNode {
  const segments: React.ReactNode[] = [];
  let remaining = text;
  let segIndex = 0;

  while (remaining.length > 0) {
    const latexBlockMatch = remaining.match(/^\$\$([\s\S]*?)\$\$/);
    if (latexBlockMatch) {
      const inner = latexBlockMatch[1]!.trim();
      if (/[一-鿿]/.test(inner) && !/\\(text|mathrm|mbox|operatorname)/.test(inner)) {
        segments.push(
          <span key={segIndex++} className="my-2 block">
            {inner}
          </span>,
        );
      } else {
        segments.push(
          <span
            key={segIndex++}
            className="my-2 block overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: renderKatex(inner, true) }}
          />,
        );
      }
      remaining = remaining.slice(latexBlockMatch[0].length);
      continue;
    }

    const latexInlineMatch = remaining.match(/^\$([^$\n]+?)\$/);
    if (latexInlineMatch) {
      const inner = latexInlineMatch[1]!;
      // Bare CJK inside $...$ is an authoring slip (usually a stray $ mis-pairing
      // with a later one) — render it as plain text instead of garbled math.
      if (/[一-鿿]/.test(inner) && !/\\(text|mathrm|mbox|operatorname)/.test(inner)) {
        segments.push(<span key={segIndex++}>{inner}</span>);
      } else {
        segments.push(
          <span
            key={segIndex++}
            dangerouslySetInnerHTML={{ __html: renderKatex(inner, false) }}
          />,
        );
      }
      remaining = remaining.slice(latexInlineMatch[0].length);
      continue;
    }

    const codeMatch = remaining.match(/^`[^`]+`/);
    if (codeMatch) {
      segments.push(
        <code
          key={segIndex++}
          className="bg-bg-elevated text-accent-cyan rounded px-1.5 py-0.5 font-mono text-[13px]"
        >
          {codeMatch[0].slice(1, -1)}
        </code>,
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    const boldMatch = remaining.match(/^\*\*[^*]+?\*\*/);
    if (boldMatch) {
      segments.push(
        <strong key={segIndex++} className="text-fg-primary font-semibold">
          {boldMatch[0].slice(2, -2)}
        </strong>,
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    const italicMatch = remaining.match(/^(?<!\*)\*(?!\*)([^*]+?)\*(?!\*)/);
    if (italicMatch) {
      segments.push(
        <em key={segIndex++} className="italic">
          {italicMatch[1]}
        </em>,
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      segments.push(
        <a key={segIndex++} href={linkMatch[2]} className="text-accent-indigo underline">
          {linkMatch[1]}
        </a>,
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    const footnoteRefMatch = remaining.match(/^\[\^(\w+)\]/);
    if (footnoteRefMatch && footnotes.has(footnoteRefMatch[1]!)) {
      segments.push(
        <a
          key={segIndex++}
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

    const nextSpecial = remaining.search(/[*`\$[]/);
    if (nextSpecial === -1) {
      segments.push(remaining);
      break;
    }
    if (nextSpecial === 0) {
      segments.push(remaining[0]);
      remaining = remaining.slice(1);
      continue;
    }
    segments.push(remaining.slice(0, nextSpecial));
    remaining = remaining.slice(nextSpecial);
  }

  return segments.length === 1 ? segments[0]! : <>{segments}</>;
}
