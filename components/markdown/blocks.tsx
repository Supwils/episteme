import { isSafeHref } from "@/lib/urls";
import { parseHeadingLine } from "@/lib/markdown-heading";
import { RegisteredImage } from "@/components/RegisteredImage";
import {
  MarkdownCodeBlock,
  MarkdownZoomableImage,
} from "@/components/markdown/MarkdownInteractions";
import { renderInline, type Footnotes } from "./inline";
import { AuthorBlock, isAuthorBlock } from "./AuthorBlocks";

export type BlockContext = {
  footnotes: Footnotes;
  domain: string;
  accentColor: string;
  /** Apparatus sections render lists denser (references) or ruled (cross-domain). */
  variant?: "narrative" | "references" | "cross-domain";
};

/** Hover-revealed `#` permalink on section headings (pure CSS, zero client JS). */
export function HeadingAnchor({ id, text }: { id: string; text: string }) {
  return (
    <a href={`#${id}`} aria-label={`链接到本节：${text}`} data-heading-anchor className="md-anchor">
      <span aria-hidden="true">#</span>
    </a>
  );
}

export function SectionHeading({
  id,
  text,
  accentColor,
}: {
  id: string;
  text: string;
  accentColor: string;
}) {
  return (
    <h2
      id={id}
      className="md-h2 group"
      style={{ color: `color-mix(in oklab, ${accentColor} 42%, var(--color-fg-primary))` }}
    >
      {text}
      <HeadingAnchor id={id} text={text} />
    </h2>
  );
}

function Table({ text, ctx }: { text: string; ctx: BlockContext }) {
  const rows = text.split("\n").filter((row) => !row.match(/^\|[\s-:|]+\|$/));
  const cells = (row: string) =>
    row
      .split("|")
      .filter(Boolean)
      .map((cell) => cell.trim());
  return (
    <div tabIndex={0} role="region" aria-label="可横向滚动的数据表" className="md-table">
      <table>
        <thead>
          {rows.length > 0 && (
            <tr>
              {cells(rows[0]!).map((cell, ci) => (
                <th key={ci}>{renderInline(cell, ctx.footnotes, ctx.domain)}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {rows.slice(1).map((row, ri) => (
            <tr key={ri}>
              {cells(row).map((cell, ci) => (
                <td key={ci}>{renderInline(cell, ctx.footnotes, ctx.domain)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function List({ text, ctx }: { text: string; ctx: BlockContext }) {
  const items = text.split("\n");
  const ordered = /^\d+\.\s/.test(items[0] ?? "");
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className="md-list"
      data-variant={ctx.variant ?? "narrative"}
      data-ordered={ordered || undefined}
    >
      {items.map((item, li) => (
        <li key={li}>{renderInline(item.replace(/^[-\d.]+\s*/, ""), ctx.footnotes, ctx.domain)}</li>
      ))}
    </Tag>
  );
}

/** One blank-line-separated markdown block. Headings at h2 level are handled by the section layer. */
export function MarkdownBlock({ text, ctx }: { text: string; ctx: BlockContext }) {
  if (/^#{1,2} /.test(text)) {
    const { text: headingText, id } = parseHeadingLine(text.replace(/^#{1,2} /, ""));
    return <SectionHeading id={id} text={headingText} accentColor={ctx.accentColor} />;
  }
  if (text.startsWith("### ")) {
    const { text: headingText, id } = parseHeadingLine(text.slice(4));
    return (
      <h3 id={id} className="md-h3 group">
        {headingText}
        <HeadingAnchor id={id} text={headingText} />
      </h3>
    );
  }
  if (text.startsWith("#### ")) {
    const { text: headingText, id } = parseHeadingLine(text.slice(5));
    return (
      <h4 id={id} className="md-h4">
        {headingText}
      </h4>
    );
  }
  if (text.startsWith("```")) {
    const lines = text.split("\n");
    const language = lines[0]!.slice(3).trim();
    const body = lines.slice(1, lines.at(-1)?.trim() === "```" ? -1 : undefined);
    if (isAuthorBlock(language)) return <AuthorBlock kind={language} lines={body} ctx={ctx} />;
    return (
      <MarkdownCodeBlock code={body.join("\n")} language={language} accentColor={ctx.accentColor} />
    );
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
  if (text.startsWith("| ")) return <Table text={text} ctx={ctx} />;
  if (text.startsWith("![") && text.includes("](")) {
    const image = text.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (image) {
      const src = image[2]!.trim();
      if (!isSafeHref(src)) return null;
      // 登记图像（/images/<id>，图像权利管线）走响应式 <figure>；其余路径维持原缩放图组件。
      const registered = src.match(/^\/images\/([a-z0-9-]+)$/);
      if (registered) return <RegisteredImage id={registered[1]!} alt={image[1]!} />;
      return <MarkdownZoomableImage src={src} alt={image[1]!} accentColor={ctx.accentColor} />;
    }
  }
  if (text.startsWith("---")) {
    return (
      <div className="md-rule" aria-hidden>
        <span />
      </div>
    );
  }
  if (text.startsWith("- ") || /^\d+\.\s/.test(text)) return <List text={text} ctx={ctx} />;
  return (
    <p className="md-p" data-variant={ctx.variant === "references" ? "references" : undefined}>
      {renderInline(text, ctx.footnotes, ctx.domain)}
    </p>
  );
}
