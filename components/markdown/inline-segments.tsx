import type { ReactNode } from "react";
import katex from "katex";
import { resolveWikiLink } from "@/lib/wiki-link-index";
import { isInlineMath } from "@/lib/search/plain-math";
import { isSafeHref } from "@/lib/urls";
import { WikiLinkPreview } from "@/components/markdown/MarkdownInteractions";
import { FOOTNOTE_ID } from "@/components/markdown/sections";
import { MarkdownImage, matchMarkdownImage } from "./image";
import { KATEX_OPTIONS } from "./katex-options";
import { registerFootnoteReference, type Footnotes } from "./footnotes";
import { FootnoteCitation } from "./FootnoteCitation";

const FOOTNOTE_REF = new RegExp(String.raw`^\[\^(${FOOTNOTE_ID})\]`);
// One level of balanced parentheses: DOIs such as 10.1016/S0140-6736(25)01375-3.
const LINK_TARGET = String.raw`\(((?:[^()]|\([^()]*\))+)\)`;
const LINK = new RegExp(String.raw`^\[([^\]]+)\]` + LINK_TARGET);
// CommonMark flanking: `π* 轨道` and `A* 搜索` are not emphasis, and a `**`
// never closes a single `*`.
const ITALIC = /^\*(?=[^\s*])(.+?)(?<=[^\s*])\*(?!\*)/;
const PLAIN = /^(?:(?![Dd][Oo][Ii]:\s*10\.\d{4,9}\/|\{\{term:|!\[)[^*`_\[$])+/;

export type InlineRender = (text: string, footnotes: Footnotes, domain: string) => ReactNode[];

type SegmentInput = {
  text: string;
  remaining: string;
  footnotes: Footnotes;
  domain: string;
  takeKey: () => number;
  renderInline: InlineRender;
};

type Segment = { nodes: ReactNode[]; consumed: number };

function displayMath(input: SegmentInput): Segment | null {
  const match = input.remaining.match(/^\$\$[\s\S]*?\$\$/);
  if (!match) return null;
  const tex = match[0].slice(2, -2).trim();
  const html = katex.renderToString(tex, { ...KATEX_OPTIONS, displayMode: true });
  return {
    consumed: match[0].length,
    nodes: [
      <span
        key={input.takeKey()}
        tabIndex={0}
        role="math"
        aria-label={tex}
        className="my-2 block overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />,
    ],
  };
}

function inlineMath(input: SegmentInput): Segment | null {
  // Compact variables/fractions and relations also use paired dollars. Currency separated
  // by prose ("$100 万" / "$75,000") is not a compact token or a TeX formula.
  const match = input.remaining.match(/^\$([^$\n]+?)\$/);
  if (!match || !isInlineMath(match[1]!)) return null;
  const latex = match[1]!;
  const html = katex.renderToString(latex, { ...KATEX_OPTIONS, displayMode: false });
  return {
    consumed: match[0].length,
    nodes: [
      <span
        key={input.takeKey()}
        role="math"
        tabIndex={0}
        className="md-math-inline"
        aria-label={latex}
        dangerouslySetInnerHTML={{ __html: html }}
      />,
    ],
  };
}

function wrapped(
  input: SegmentInput,
  pattern: RegExp,
  wrap: (children: ReactNode, key: number) => ReactNode
): Segment | null {
  const match = input.remaining.match(pattern);
  if (!match) return null;
  return {
    consumed: match[0].length,
    nodes: [wrap(input.renderInline(match[1]!, input.footnotes, input.domain), input.takeKey())],
  };
}

function emphasis(input: SegmentInput): Segment | null {
  const boldItalic = wrapped(input, /^\*\*\*(.+?)\*\*\*/, (children, key) => (
    <strong key={key} className="md-strong">
      <em>{children}</em>
    </strong>
  ));
  if (boldItalic) return boldItalic;
  const bold = wrapped(input, /^\*\*(.+?)\*\*/, (children, key) => (
    <strong key={key} className="md-strong">
      {children}
    </strong>
  ));
  if (bold) return bold;

  const italicMatch = input.remaining.match(ITALIC);
  const underscoreMatch = input.remaining.match(/^_(.+?)_/);
  // Identifiers such as isec_a_00383 contain underscores. Emphasis only opens
  // when the mark is not glued to an ASCII letter or digit on either side.
  const prevChar = input.text[input.text.length - input.remaining.length - 1];
  const underscoreInIdentifier =
    underscoreMatch != null &&
    (/[A-Za-z0-9]/.test(prevChar ?? "") ||
      /[A-Za-z0-9]/.test(input.remaining.charAt(underscoreMatch[0].length)));
  const italic =
    italicMatch || (underscoreMatch && !underscoreInIdentifier ? underscoreMatch : undefined);
  if (!italic) return null;
  return {
    consumed: italic[0].length,
    nodes: [
      <em key={input.takeKey()}>
        {input.renderInline(italic[1]!, input.footnotes, input.domain)}
      </em>,
    ],
  };
}

function term(input: SegmentInput): Segment | null {
  // `{{term:术语|释义}}` — an author-kit gloss (docs/作者组件指南.md). The gloss
  // stays in the DOM so screen readers read it inline; CSS lifts it into a
  // card on hover/focus.
  const match = input.remaining.match(/^\{\{term:([^|}]+)\|([^}]+)\}\}/);
  if (!match) return null;
  return {
    consumed: match[0].length,
    nodes: [
      <dfn key={input.takeKey()} className="md-term" tabIndex={0}>
        {match[1]!.trim()}
        <span className="md-term__gloss">（{match[2]!.trim()}）</span>
      </dfn>,
    ],
  };
}

function code(input: SegmentInput): Segment | null {
  const match = input.remaining.match(/^`([^`]+)`/);
  if (!match) return null;
  return {
    consumed: match[0].length,
    nodes: [
      <code
        key={input.takeKey()}
        className="bg-bg-elevated text-accent-gold rounded px-1 font-mono text-sm"
      >
        {match[1]}
      </code>,
    ],
  };
}

function wiki(input: SegmentInput): Segment | null {
  // `[[slug]]` / `[[slug|label]]` wiki-links annotate the concept graph. When
  // the slug resolves to a routable article (lib/wiki-link-index) we make it a
  // real internal link, preferring the reader's current domain for slugs that
  // exist in several. Unresolved targets stay an emphasized non-link chip so a
  // dead reference never becomes a broken link. Checked before `[label](url)`.
  const match = input.remaining.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
  if (!match) return null;
  const target = match[1]!.trim();
  const label = (match[2] ?? match[1])!.trim();
  const href = resolveWikiLink(target, input.domain);
  const key = input.takeKey();
  return {
    consumed: match[0].length,
    nodes: [
      href ? (
        <WikiLinkPreview key={key} href={href} label={label} />
      ) : (
        <span key={key} className="text-fg-primary font-medium">
          {label}
        </span>
      ),
    ],
  };
}

function link(input: SegmentInput): Segment | null {
  const match = input.remaining.match(LINK);
  if (!match) return null;
  const href = match[2]!.trim();
  const key = input.takeKey();
  return {
    consumed: match[0].length,
    nodes: [
      isSafeHref(href) ? (
        <a
          key={key}
          href={href}
          className="text-accent-gold underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          {match[1]}
        </a>
      ) : (
        <span key={key}>{match[1]}</span>
      ),
    ],
  };
}

function footnote(input: SegmentInput): Segment | null {
  const match = input.remaining.match(FOOTNOTE_REF);
  if (!match || !input.footnotes.has(match[1]!)) return null;
  const id = match[1]!;
  const body = input.footnotes.get(id)!;
  return {
    consumed: match[0].length,
    nodes: [
      <FootnoteCitation
        key={input.takeKey()}
        reference={registerFootnoteReference(input.footnotes, id)}
        label={id}
        title={body}
      />,
      // A margin copy of the note, shown only where the article has a margin
      // (prose.css). The end-of-article list stays the accessible, clickable
      // original, so this copy is inert (not read, not focusable — it may hold
      // DOI links); nested refs are dropped.
      <span key={input.takeKey()} className="md-sidenote" inert>
        <span className="md-sidenote__id">[{id}]</span>
        {input.renderInline(body, new Map(), input.domain)}
      </span>,
    ],
  };
}

function image(input: SegmentInput): Segment | null {
  const match = matchMarkdownImage(input.remaining);
  if (!match) return null;
  return {
    consumed: match[0].length,
    nodes: [
      <MarkdownImage key={input.takeKey()} src={match[2]!.trim()} alt={match[1] || ""} inline />,
    ],
  };
}

function doi(input: SegmentInput): Segment | null {
  // Bibliographies cite papers as plain `DOI: 10.xxxx/…` text; link the DOI
  // to doi.org. Authors also write `doi:` in lowercase. Trailing punctuation
  // (CJK 。，； or ASCII .,;) is sentence punctuation, never part of the
  // identifier, so it stays outside the link. The prefix is kept as written.
  const match = input.remaining.match(/^([Dd][Oo][Ii]:\s*)(10\.\d{4,9}\/\S+)/);
  if (!match) return null;
  const doiText = match[2]!.replace(/[.,;:!?。，；、！？）)】」』》"'”’]+$/, "");
  const trailing = match[2]!.slice(doiText.length);
  const nodes: ReactNode[] = [
    <a
      key={input.takeKey()}
      href={`https://doi.org/${doiText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-gold underline underline-offset-2 transition-opacity hover:opacity-80"
    >
      {match[1]}
      {doiText}
    </a>,
  ];
  if (trailing) nodes.push(trailing);
  return { consumed: match[0].length, nodes };
}

function plain(input: SegmentInput): Segment | null {
  // Plain text stops before `DOI: 10.…` (any capitalization) and `{{term:`
  // so the rules above see them.
  const match = input.remaining.match(PLAIN);
  if (!match) return null;
  return { consumed: match[0].length, nodes: [match[0]] };
}

/** First matching inline segment, in the same order the prose renderer always used. */
export function takeInlineSegment(input: SegmentInput): Segment | null {
  return (
    displayMath(input) ??
    inlineMath(input) ??
    emphasis(input) ??
    term(input) ??
    code(input) ??
    wiki(input) ??
    link(input) ??
    footnote(input) ??
    image(input) ??
    doi(input) ??
    plain(input)
  );
}
