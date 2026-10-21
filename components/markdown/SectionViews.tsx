import { Fragment, type ReactNode } from "react";
import { renderMarkdownBlock, renderSectionHeading, type BlockContext } from "./blocks";
import { renderInline } from "./inline";
import { MythStack } from "./MythStack";
import { NeighborhoodChart } from "./NeighborhoodChart";
import {
  parseFactCards,
  parseKeywords,
  parseMisconceptions,
  parseNeighbors,
  parseQuote,
  type Section,
} from "./sections";

type ViewProps = { section: Section; ctx: BlockContext; title?: string; heading?: ReactNode };

function renderBlocks(blocks: string[], ctx: BlockContext) {
  return (
    <>
      {blocks.map((block, index) => (
        <Fragment key={index}>{renderMarkdownBlock({ text: block, ctx })}</Fragment>
      ))}
    </>
  );
}

function Frame({
  section,
  heading,
  children,
}: {
  section: Section;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="md-section" data-section={section.kind}>
      {heading}
      {children}
    </section>
  );
}

/** 破除误解 → 误解 / 实情卡：误解那句划去，实情接在后面；多张时叠成一叠。 */
function renderMisconception({ section, ctx, heading }: ViewProps) {
  const { intro, myths, after, notes } = parseMisconceptions(section.blocks);
  const before = renderBlocks(intro, ctx);
  const cards = myths.map((myth, index) => (
    <div key={index} className="myth-card__body">
      {myth.claim && (
        <p className="myth-card__claim">
          <span className="myth-card__tag">误解</span>
          <s>{renderInline(myth.claim, ctx.footnotes, ctx.domain)}</s>
        </p>
      )}
      {myth.rest && (
        <p className="myth-card__fact">
          {myth.claim && (
            <span className="myth-card__tag" data-kind="fact">
              实情
            </span>
          )}
          {renderInline(myth.rest, ctx.footnotes, ctx.domain)}
        </p>
      )}
      {renderBlocks(myth.more, ctx)}
    </div>
  ));
  return (
    <Frame section={section} heading={heading}>
      {before}
      {cards.length > 0 && <MythStack cards={cards} />}
      {renderBlocks(after, ctx)}
      {notes.map((note, index) => (
        <p key={index} className="md-note">
          {renderInline(note, ctx.footnotes, ctx.domain)}
        </p>
      ))}
    </Frame>
  );
}

/** 事实卡 → 带横格的索引卡。 */
function renderFacts({ section, ctx, heading }: ViewProps) {
  return (
    <Frame section={section} heading={heading}>
      {section.blocks.map((block, index) => {
        const cards = parseFactCards(block);
        if (!cards)
          return <Fragment key={index}>{renderMarkdownBlock({ text: block, ctx })}</Fragment>;
        return (
          <ol key={index} className="fact-cards">
            {cards.map((card, ci) => (
              <li key={ci} className="fact-card">
                {card.label && <span className="fact-card__label">{card.label}</span>}
                <p>{renderInline(card.text, ctx.footnotes, ctx.domain)}</p>
              </li>
            ))}
          </ol>
        );
      })}
    </Frame>
  );
}

/** 关键洞察 → 全文唯一一块铜线版：正文里最醒目的元素。 */
function renderInsight({ section, ctx, heading }: ViewProps) {
  return (
    <section className="insight-plate" data-section="insight">
      {heading}
      {renderBlocks(section.blocks, ctx)}
    </section>
  );
}

/** 经典名言 / 引用 → 题词：大字引文，出处刻成小字。 */
function renderQuotes({ section, ctx, heading }: ViewProps) {
  return (
    <Frame section={section} heading={heading}>
      {section.blocks.flatMap((block, index) => {
        if (!block.startsWith(">"))
          return [<Fragment key={index}>{renderMarkdownBlock({ text: block, ctx })}</Fragment>];
        // One blockquote block may carry several quotes separated by a bare `>`.
        return block.split(/\n>\s*\n/).map((part, pi) => {
          const quote = parseQuote(part.trim());
          if (!quote)
            return (
              <Fragment key={`${index}-${pi}`}>{renderMarkdownBlock({ text: part, ctx })}</Fragment>
            );
          return (
            <figure key={`${index}-${pi}`} className="epigraph">
              <blockquote>{renderInline(quote.text, ctx.footnotes, ctx.domain)}</blockquote>
              {quote.source && (
                <figcaption>{renderInline(quote.source, ctx.footnotes, ctx.domain)}</figcaption>
              )}
            </figure>
          );
        });
      })}
    </Frame>
  );
}

/** 跨域连接 → 邻域星图 + 原有列表（列表里的加粗换成轻着重，见 prose.css）。 */
function renderCrossDomain({ section, ctx, title, heading }: ViewProps) {
  return (
    <Frame section={section} heading={heading}>
      <NeighborhoodChart
        neighbors={parseNeighbors(section.blocks)}
        domain={ctx.domain}
        title={title}
      />
      {renderBlocks(section.blocks, { ...ctx, variant: "cross-domain" })}
    </Frame>
  );
}

function renderReferences({ section, ctx, heading }: ViewProps) {
  return (
    <Frame section={section} heading={heading}>
      {renderBlocks(section.blocks, { ...ctx, variant: "references" })}
    </Frame>
  );
}

function renderKeywords({ section, ctx, heading }: ViewProps) {
  const terms = parseKeywords(section.blocks);
  return (
    <Frame section={section} heading={heading}>
      {terms ? (
        <ul className="keyword-list">
          {terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      ) : (
        renderBlocks(section.blocks, ctx)
      )}
    </Frame>
  );
}

function renderNarrative({ section, ctx, heading }: ViewProps) {
  if (!section.heading) return renderBlocks(section.blocks, ctx);
  return (
    <Frame section={section} heading={heading}>
      {renderBlocks(section.blocks, ctx)}
    </Frame>
  );
}

const VIEWS: Record<Section["kind"], (props: ViewProps) => ReactNode> = {
  narrative: renderNarrative,
  misconception: renderMisconception,
  facts: renderFacts,
  insight: renderInsight,
  quotes: renderQuotes,
  "cross-domain": renderCrossDomain,
  references: renderReferences,
  keywords: renderKeywords,
};

/** Prepare every inline citation before RSC can serialize deferred client children. */
export function renderSection(props: ViewProps) {
  const { section, ctx } = props;
  const heading = section.heading
    ? renderSectionHeading({ ...section.heading, accentColor: ctx.accentColor, ctx })
    : null;
  return VIEWS[section.kind]({ ...props, heading });
}
