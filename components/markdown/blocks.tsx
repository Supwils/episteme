import { replaceSearchMath } from "@/lib/search/plain-math";
import { parseHeadingLine, takeHeadingId } from "@/lib/markdown-heading";
import { fencedCode } from "@/lib/markdown-fences";
import { MarkdownCodeBlock } from "@/components/markdown/MarkdownInteractions";
import { MarkdownImage, matchMarkdownImage } from "./image";
import { renderInline, type Footnotes } from "./inline";
import { renderAuthorBlock, isAuthorBlock } from "./AuthorBlocks";

export type BlockContext = {
  footnotes: Footnotes;
  domain: string;
  accentColor: string;
  /** Heading ids already emitted in this article, including its h2s. */
  usedHeadingIds: Set<string>;
  /** Apparatus sections render lists denser (references) or ruled (cross-domain). */
  variant?: "narrative" | "references" | "cross-domain";
};

function wikiLinkLabels(source: string): string {
  return source.replace(
    /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    (_match, target: string, label?: string) => (label ?? target).trim()
  );
}

/** Permalink name. The heading id stays derived from the source line. */
function headingAnchorText(source: string): string {
  return wikiLinkLabels(source).replace(
    /\$\$([\s\S]+?)\$\$|\$([^$]+)\$/g,
    (_match, display?: string, inline?: string) => (display ?? inline ?? "").trim()
  );
}

/** `#` permalink on section headings (pure CSS, zero client JS). Hover and keyboard focus reveal it; touch screens keep it tappable. */
export function HeadingAnchor({ id, text }: { id: string; text: string }) {
  return (
    <a href={`#${id}`} aria-label={`链接到本节：${text}`} data-heading-anchor className="md-anchor">
      <span aria-hidden="true">#</span>
    </a>
  );
}

export function renderSectionHeading({
  id,
  text,
  accentColor,
  ctx,
}: {
  id: string;
  text: string;
  accentColor: string;
  ctx: BlockContext;
}) {
  return (
    <h2
      id={id}
      data-toc-label={headingPlainText(text)}
      className="md-h2 group"
      style={{ color: `color-mix(in oklab, ${accentColor} 42%, var(--color-fg-primary))` }}
    >
      {renderInline(text, ctx.footnotes, ctx.domain)}
      <HeadingAnchor id={id} text={headingAnchorText(text)} />
    </h2>
  );
}

/**
 * The TOC reads this instead of the heading's DOM text: KaTeX emits each
 * formula twice (MathML + HTML), so `textContent` would repeat it.
 */
function headingPlainText(source: string): string {
  return replaceSearchMath(wikiLinkLabels(source))
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** A `$…$` span that holds a `|` (`$f(x) = |x|$`), judged by Pandoc's TeX-math flanking. */
function mathSpanEnd(row: string, start: number): number {
  const end = row.indexOf("$", start + 1);
  if (end <= start + 1) return -1;
  const tex = row.slice(start + 1, end);
  const flanked = !/^\s|\s$/.test(tex) && !/\d/.test(row[end + 1] ?? "");
  return flanked && !/[一-鿿]/.test(tex) ? end : -1;
}

/**
 * Splits a table row on `|`, except inside inline code or `$…$` math and for
 * an escaped `\|`. Inside math `\|` is TeX's norm bar and stays as written.
 */
export function splitTableRow(row: string): string[] {
  const cells: string[] = [];
  let cell = "";
  for (let i = 0; i < row.length; i++) {
    const char = row[i]!;
    const spanEnd =
      char === "`" ? row.indexOf("`", i + 1) : char === "$" ? mathSpanEnd(row, i) : -1;
    if (spanEnd > i) {
      cell += row.slice(i, spanEnd + 1);
      i = spanEnd;
    } else if (char === "\\" && row[i + 1] === "|") {
      cell += "|";
      i++;
    } else if (char === "|") {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell);
  // The outer pipes of `| a | b |` leave an empty edge cell on each side.
  if (/^\s*\|/.test(row)) cells.shift();
  if (cells.length > 1 && /\|\s*$/.test(row) && cells.at(-1)!.trim() === "") cells.pop();
  return cells.map((value) => value.trim());
}

function renderTable({ text, ctx }: { text: string; ctx: BlockContext }) {
  const rows = text.split("\n").filter((row) => !row.match(/^\|[\s-:|]+\|$/));
  return (
    <div tabIndex={0} role="region" aria-label="可横向滚动的数据表" className="md-table">
      <table>
        <thead>
          {rows.length > 0 && (
            <tr>
              {splitTableRow(rows[0]!).map((cell, ci) => (
                <th key={ci}>{renderInline(cell, ctx.footnotes, ctx.domain)}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {rows.slice(1).map((row, ri) => (
            <tr key={ri}>
              {splitTableRow(row).map((cell, ci) => (
                <td key={ci}>{renderInline(cell, ctx.footnotes, ctx.domain)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const LIST_MARKER = /^\s*(?:[-*]|\d+\.)\s+/;
const INDENTED = /^\s/;

type ListItem = { text: string; nested: string[] };

/**
 * Indented lines under an item (its sub-items and their continuations) nest
 * one level down; an unmarked line continues the item above it.
 */
function parseListItems(text: string): ListItem[] {
  const items: ListItem[] = [];
  for (const line of text.split("\n")) {
    const last = items.at(-1);
    const marked = LIST_MARKER.test(line);
    if (!last || (marked && !INDENTED.test(line))) {
      items.push({ text: line.replace(LIST_MARKER, ""), nested: [] });
    } else if (INDENTED.test(line) && (marked || last.nested.length > 0)) {
      last.nested.push(line);
    } else {
      last.text += `\n${line.trim()}`;
    }
  }
  return items;
}

function dedent(lines: string[]): string {
  const indent = Math.min(...lines.map((line) => line.length - line.trimStart().length));
  return lines.map((line) => line.slice(indent)).join("\n");
}

function renderList({ text, ctx }: { text: string; ctx: BlockContext }): React.ReactNode {
  const ordered = /^\d+\.\s/.test(text);
  // A list interrupted by a paragraph resumes its numbering (`3. …` after prose).
  const start = Number(text.match(/^(\d+)\./)?.[1] ?? 1);
  const items = parseListItems(text).map((item, li) => (
    <li key={li}>
      {renderInline(item.text, ctx.footnotes, ctx.domain)}
      {item.nested.length > 0 && renderList({ text: dedent(item.nested), ctx })}
    </li>
  ));
  const props = { className: "md-list", "data-variant": ctx.variant ?? "narrative" };
  return ordered ? (
    <ol {...props} data-ordered start={start === 1 ? undefined : start}>
      {items}
    </ol>
  ) : (
    <ul {...props}>{items}</ul>
  );
}

/** One blank-line-separated markdown block. Headings at h2 level are handled by the section layer. */
export function renderMarkdownBlock({ text, ctx }: { text: string; ctx: BlockContext }) {
  if (/^#{1,2} /.test(text)) {
    const parsed = parseHeadingLine(text.replace(/^#{1,2} /, ""));
    const id = takeHeadingId(parsed.id, ctx.usedHeadingIds);
    return renderSectionHeading({ id, text: parsed.text, accentColor: ctx.accentColor, ctx });
  }
  if (text.startsWith("### ")) {
    const parsed = parseHeadingLine(text.slice(4));
    const headingText = parsed.text;
    const id = takeHeadingId(parsed.id, ctx.usedHeadingIds);
    return (
      <h3 id={id} data-toc-label={headingPlainText(headingText)} className="md-h3 group">
        {renderInline(headingText, ctx.footnotes, ctx.domain)}
        <HeadingAnchor id={id} text={headingAnchorText(headingText)} />
      </h3>
    );
  }
  if (text.startsWith("#### ")) {
    const parsed = parseHeadingLine(text.slice(5));
    const headingText = parsed.text;
    const id = takeHeadingId(parsed.id, ctx.usedHeadingIds);
    return (
      <h4 id={id} className="md-h4">
        {renderInline(headingText, ctx.footnotes, ctx.domain)}
      </h4>
    );
  }
  const code = fencedCode(text);
  if (code) {
    const { language } = code;
    if (isAuthorBlock(language))
      return renderAuthorBlock({ kind: language, lines: code.code.split("\n"), ctx });
    return <MarkdownCodeBlock code={code.code} language={language} accentColor={ctx.accentColor} />;
  }
  if (text.startsWith("> ")) {
    const quote = text
      .split("\n")
      .map((line) => line.replace(/^>\s?/, ""))
      .join("\n");
    return (
      <blockquote className="md-quote">
        <p>{renderInline(quote, ctx.footnotes, ctx.domain)}</p>
      </blockquote>
    );
  }
  if (text.startsWith("| ")) return renderTable({ text, ctx });
  const image = matchMarkdownImage(text);
  if (image && image[0].length === text.length) {
    return <MarkdownImage src={image[2]!.trim()} alt={image[1]!} accentColor={ctx.accentColor} />;
  }
  if (text.startsWith("---")) {
    return (
      <div className="md-rule" aria-hidden>
        <span />
      </div>
    );
  }
  if (/^(?:[-*]|\d+\.)\s/.test(text)) return renderList({ text, ctx });
  return (
    <p className="md-p" data-variant={ctx.variant === "references" ? "references" : undefined}>
      {renderInline(text, ctx.footnotes, ctx.domain)}
    </p>
  );
}
