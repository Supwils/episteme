import type { ReactNode } from "react";
import { MarkdownBlock, SectionHeading, type BlockContext } from "./blocks";
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

type ViewProps = { section: Section; ctx: BlockContext; title?: string };

function Blocks({ blocks, ctx }: { blocks: string[]; ctx: BlockContext }) {
  return (
    <>
      {blocks.map((block, index) => (
        <MarkdownBlock key={index} text={block} ctx={ctx} />
      ))}
    </>
  );
}

function Frame({
  section,
  ctx,
  children,
}: {
  section: Section;
  ctx: BlockContext;
  children: ReactNode;
}) {
  return (
    <section className="md-section" data-section={section.kind}>
      {section.heading && (
        <SectionHeading
          id={section.heading.id}
          text={section.heading.text}
          accentColor={ctx.accentColor}
        />
      )}
      {children}
    </section>
  );
}

/** 破除误解 → 误解 / 实情卡：误解那句划去，实情接在后面；多张时叠成一叠。 */
function MisconceptionView({ section, ctx }: ViewProps) {
  const { intro, myths, after, notes } = parseMisconceptions(section.blocks);
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
    </div>
  ));
  return (
    <Frame section={section} ctx={ctx}>
      <Blocks blocks={intro} ctx={ctx} />
      {cards.length > 0 && <MythStack cards={cards} />}
      <Blocks blocks={after} ctx={ctx} />
      {notes.map((note, index) => (
        <p key={index} className="md-note">
          {renderInline(note, ctx.footnotes, ctx.domain)}
        </p>
      ))}
    </Frame>
  );
}

/** 事实卡 → 带横格的索引卡。 */
function FactsView({ section, ctx }: ViewProps) {
  return (
    <Frame section={section} ctx={ctx}>
      {section.blocks.map((block, index) => {
        const cards = parseFactCards(block);
        if (!cards) return <MarkdownBlock key={index} text={block} ctx={ctx} />;
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
function InsightView({ section, ctx }: ViewProps) {
  return (
    <section className="insight-plate" data-section="insight">
      {section.heading && (
        <SectionHeading
          id={section.heading.id}
          text={section.heading.text}
          accentColor={ctx.accentColor}
        />
      )}
      <Blocks blocks={section.blocks} ctx={ctx} />
    </section>
  );
}

/** 经典名言 / 引用 → 题词：大字引文，出处刻成小字。 */
function QuotesView({ section, ctx }: ViewProps) {
  return (
    <Frame section={section} ctx={ctx}>
      {section.blocks.flatMap((block, index) => {
        if (!block.startsWith(">")) return [<MarkdownBlock key={index} text={block} ctx={ctx} />];
        // One blockquote block may carry several quotes separated by a bare `>`.
        return block.split(/\n>\s*\n/).map((part, pi) => {
          const quote = parseQuote(part.trim());
          if (!quote) return <MarkdownBlock key={`${index}-${pi}`} text={part} ctx={ctx} />;
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
function CrossDomainView({ section, ctx, title }: ViewProps) {
  return (
    <Frame section={section} ctx={ctx}>
      <NeighborhoodChart
        neighbors={parseNeighbors(section.blocks)}
        domain={ctx.domain}
        title={title}
      />
      <Blocks blocks={section.blocks} ctx={{ ...ctx, variant: "cross-domain" }} />
    </Frame>
  );
}

function ReferencesView({ section, ctx }: ViewProps) {
  return (
    <Frame section={section} ctx={ctx}>
      <Blocks blocks={section.blocks} ctx={{ ...ctx, variant: "references" }} />
    </Frame>
  );
}

function KeywordsView({ section, ctx }: ViewProps) {
  const terms = parseKeywords(section.blocks);
  return (
    <Frame section={section} ctx={ctx}>
      {terms ? (
        <ul className="keyword-list">
          {terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      ) : (
        <Blocks blocks={section.blocks} ctx={ctx} />
      )}
    </Frame>
  );
}

function NarrativeView({ section, ctx }: ViewProps) {
  if (!section.heading) return <Blocks blocks={section.blocks} ctx={ctx} />;
  return (
    <Frame section={section} ctx={ctx}>
      <Blocks blocks={section.blocks} ctx={ctx} />
    </Frame>
  );
}

const VIEWS: Record<Section["kind"], (props: ViewProps) => ReactNode> = {
  narrative: NarrativeView,
  misconception: MisconceptionView,
  facts: FactsView,
  insight: InsightView,
  quotes: QuotesView,
  "cross-domain": CrossDomainView,
  references: ReferencesView,
  keywords: KeywordsView,
};

export function SectionView(props: ViewProps) {
  const View = VIEWS[props.section.kind];
  return <View {...props} />;
}
