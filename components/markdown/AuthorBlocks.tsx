import type { ReactNode } from "react";
import type { BlockContext } from "./blocks";
import { renderInline } from "./inline";
import "./author-kit.css";

/**
 * 作者组件（T-DESIGN-06e）：正文不是 MDX 管线，所以组件写成带语言名的围栏块，
 * 每行用 ` | ` 分列。语法与示例见 docs/作者组件指南.md。
 */
const KINDS = ["levels", "compare", "steps", "timeline", "aside"] as const;
type AuthorKind = (typeof KINDS)[number];

export function isAuthorBlock(language: string): language is AuthorKind {
  return (KINDS as readonly string[]).includes(language);
}

function cells(line: string) {
  return line.split(/\s+\|\s+/).map((cell) => cell.trim());
}

function rows(lines: string[]) {
  return lines.filter((line) => line.trim()).map(cells);
}

type KindProps = { lines: string[]; ctx: BlockContext };

/** 层级阶梯：作者自下而上书写，屏幕上最高一级在顶端；读屏仍按书写顺序。 */
function Levels({ lines, ctx }: KindProps) {
  const inline = (text: string) => renderInline(text, ctx.footnotes, ctx.domain);
  return (
    <ol className="kit-levels" style={{ ["--kit-accent" as string]: ctx.accentColor }}>
      {rows(lines).map(([mark = "", title = "", body], index) => (
        <li key={index} className="kit-levels__step">
          <span className="kit-levels__mark">{inline(mark)}</span>
          <span className="kit-levels__title">{inline(title)}</span>
          {body ? <span className="kit-levels__body">{inline(body)}</span> : null}
        </li>
      ))}
    </ol>
  );
}

/** 对照：首行是两栏的名字，其后每行一组对照。 */
function Compare({ lines, ctx }: KindProps) {
  const [head = [], ...body] = rows(lines);
  const inline = (text: string) => renderInline(text, ctx.footnotes, ctx.domain);
  return (
    <div className="kit-compare md-table" role="region" aria-label="对照" tabIndex={0}>
      <table>
        <thead>
          <tr>
            {head.map((cell, index) => (
              <th key={index} scope="col">
                {inline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>{inline(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Steps({ lines, ctx }: KindProps) {
  const inline = (text: string) => renderInline(text, ctx.footnotes, ctx.domain);
  return (
    <ol className="kit-steps">
      {rows(lines).map(([title = "", body], index) => (
        <li key={index} className="kit-steps__step">
          <span className="kit-steps__title">{inline(title)}</span>
          {body ? <span className="kit-steps__body">{inline(body)}</span> : null}
        </li>
      ))}
    </ol>
  );
}

function Timeline({ lines, ctx }: KindProps) {
  const inline = (text: string) => renderInline(text, ctx.footnotes, ctx.domain);
  return (
    <ol className="kit-timeline">
      {rows(lines).map(([when = "", what = ""], index) => (
        <li key={index} className="kit-timeline__event">
          <span className="kit-timeline__when">{inline(when)}</span>
          <span className="kit-timeline__what">{inline(what)}</span>
        </li>
      ))}
    </ol>
  );
}

/** 旁注：正文之外的补充，一段或几段，用空行分段。 */
function Aside({ lines, ctx }: KindProps) {
  const paragraphs = lines
    .join("\n")
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
  return (
    <aside className="kit-aside" aria-label="旁注">
      <span className="kit-aside__label" aria-hidden>
        旁注
      </span>
      {paragraphs.map((text, index) => (
        <p key={index}>{renderInline(text, ctx.footnotes, ctx.domain)}</p>
      ))}
    </aside>
  );
}

const RENDERERS: Record<AuthorKind, (props: KindProps) => ReactNode> = {
  levels: Levels,
  compare: Compare,
  steps: Steps,
  timeline: Timeline,
  aside: Aside,
};

export function AuthorBlock({
  kind,
  lines,
  ctx,
}: {
  kind: AuthorKind;
  lines: string[];
  ctx: BlockContext;
}) {
  const Renderer = RENDERERS[kind];
  return <Renderer lines={lines} ctx={ctx} />;
}
