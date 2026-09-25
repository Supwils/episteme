import katex from "katex";
import { resolveWikiLink } from "@/lib/wiki-link-index";
import { isSafeHref } from "@/lib/urls";
import { WikiLinkPreview } from "@/components/markdown/MarkdownInteractions";

/**
 * Inline markdown for article prose: math, emphasis, code, wiki-links, links,
 * footnote refs, images and DOI links. Server-only — KaTeX and the wiki-link
 * index never reach the browser.
 */

/** Shared KaTeX limits so a hostile `\\def` loop cannot hang article render. */
const KATEX_OPTIONS = {
  throwOnError: false,
  maxSize: 500,
  maxExpand: 1000,
} as const;

export type Footnotes = Map<string, string>;

export function extractFootnotes(content: string): Footnotes {
  const footnotes = new Map<string, string>();
  const regex = /^\[\^(\w+)\]:\s*(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    footnotes.set(match[1]!, match[2]!);
  }
  return footnotes;
}

export function renderInline(
  text: string,
  footnotes: Footnotes,
  domain: string
): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const latexBlockMatch = remaining.match(/^\$\$[\s\S]*?\$\$/);
    if (latexBlockMatch) {
      const tex = latexBlockMatch[0].slice(2, -2).trim();
      const html = katex.renderToString(tex, { ...KATEX_OPTIONS, displayMode: true });
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
      const html = katex.renderToString(latex, { ...KATEX_OPTIONS, displayMode: false });
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
        <strong key={key++} className="md-strong">
          <em>{renderInline(boldItalicMatch[1]!, footnotes, domain)}</em>
        </strong>
      );
      remaining = remaining.slice(boldItalicMatch[0].length);
      continue;
    }

    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={key++} className="md-strong">
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

    // `{{term:术语|释义}}` — an author-kit gloss (docs/作者组件指南.md). The gloss
    // stays in the DOM so screen readers read it inline; CSS lifts it into a
    // card on hover/focus.
    const termMatch = remaining.match(/^\{\{term:([^|}]+)\|([^}]+)\}\}/);
    if (termMatch) {
      parts.push(
        <dfn key={key++} className="md-term" tabIndex={0}>
          {termMatch[1]!.trim()}
          <span className="md-term__gloss">（{termMatch[2]!.trim()}）</span>
        </dfn>
      );
      remaining = remaining.slice(termMatch[0].length);
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
      const href = linkMatch[2]!.trim();
      parts.push(
        isSafeHref(href) ? (
          <a
            key={key++}
            href={href}
            className="text-accent-gold underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            {linkMatch[1]}
          </a>
        ) : (
          <span key={key++}>{linkMatch[1]}</span>
        )
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    const footnoteRefMatch = remaining.match(/^\[\^(\w+)\]/);
    if (footnoteRefMatch && footnotes.has(footnoteRefMatch[1]!)) {
      parts.push(
        <a
          key={key++}
          id={`fnref-${footnoteRefMatch[1]}`}
          href={`#fn-${footnoteRefMatch[1]}`}
          className="text-accent-gold align-super font-mono text-xs"
          title={footnotes.get(footnoteRefMatch[1]!)!}
        >
          [{footnoteRefMatch[1]}]
        </a>,
        // A margin copy of the note, shown only where the article has a margin
        // (prose.css). The end-of-article list stays the accessible, clickable
        // original, so this copy is inert (not read, not focusable — it may hold
        // DOI links); nested refs are dropped.
        <span key={key++} className="md-sidenote" inert>
          <span className="md-sidenote__id">[{footnoteRefMatch[1]}]</span>
          {renderInline(footnotes.get(footnoteRefMatch[1]!)!, new Map(), domain)}
        </span>
      );
      remaining = remaining.slice(footnoteRefMatch[0].length);
      continue;
    }

    const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      const src = imgMatch[2]!.trim();
      if (!isSafeHref(src)) {
        remaining = remaining.slice(imgMatch[0].length);
        continue;
      }
      parts.push(
        <img
          key={key++}
          src={src}
          alt={imgMatch[1] || ""}
          loading="lazy"
          decoding="async"
          className="inline max-w-full rounded"
        />
      );
      remaining = remaining.slice(imgMatch[0].length);
      continue;
    }

    // Bibliographies cite papers as plain `DOI: 10.xxxx/…` text; link the DOI
    // to doi.org. Trailing punctuation (CJK 。，； or ASCII .,;) is sentence
    // punctuation, never part of the identifier, so it stays outside the link.
    const doiMatch = remaining.match(/^DOI:\s*(10\.\d{4,9}\/\S+)/);
    if (doiMatch) {
      const doi = doiMatch[1]!.replace(/[.,;:!?。，；、！？）)】」』》"'”’]+$/, "");
      const trailing = doiMatch[1]!.slice(doi.length);
      parts.push(
        <a
          key={key++}
          href={`https://doi.org/${doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-gold underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          DOI: {doi}
        </a>
      );
      if (trailing) parts.push(trailing);
      remaining = remaining.slice(doiMatch[0].length);
      continue;
    }

    // Plain text stops before `DOI: 10.…` and `{{term:` so the rules above see them.
    const plainMatch = remaining.match(/^(?:(?!DOI:\s*10\.\d{4,9}\/|\{\{term:)[^*`_\[$])+/);
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
