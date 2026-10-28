"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { DOMAIN_SEALS } from "@/lib/design/seals";
import { KNOWLEDGE_LEVELS } from "@/lib/knowledge-levels";
import type { SummitPanelLink, SummitPanelNode } from "@/lib/summit-cards";
import { lockDocumentScroll } from "@/components/interaction/scroll-lock";

export function SummitPanel({
  node,
  onOpen,
  onClose,
}: {
  node: SummitPanelNode;
  onOpen: (link: SummitPanelLink) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const seal = node.domainId ? DOMAIN_SEALS[node.domainId as keyof typeof DOMAIN_SEALS] : undefined;
  const levelMeta = KNOWLEDGE_LEVELS.find((item) => item.id === node.level);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const release = lockDocumentScroll(document);
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = [...panel.querySelectorAll<HTMLElement>("a, button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      release();
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose]);

  return (
    <div className="summit-scrim" onMouseDown={onClose}>
      <div
        ref={panelRef}
        className="summit-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="summit-panel-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="summit-button" onClick={onClose}>
          关闭
        </button>
        <p className="summit-panel__meta">
          {seal ? `${seal.char} ${seal.name}` : "格致山"}
          {levelMeta ? ` · L${levelMeta.id} ${levelMeta.label}` : ""}
        </p>
        <h2 id="summit-panel-title">{node.label}</h2>
        {node.dek ? <p>{node.dek}</p> : null}
        <Relation title="前置" links={node.prereq} onOpen={onOpen} />
        <Relation title="相邻学科" links={node.neighbors} onOpen={onOpen} />
        {node.href ? (
          <Link className="summit-button summit-panel__read" href={node.href}>
            开始阅读
          </Link>
        ) : (
          <p>这篇还没有单独的文章页。</p>
        )}
      </div>
    </div>
  );
}

function Relation({
  title,
  links,
  onOpen,
}: {
  title: string;
  links: readonly SummitPanelLink[];
  onOpen: (link: SummitPanelLink) => void;
}) {
  if (links.length === 0) return null;
  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {links.map((link) => (
          <li key={link.index}>
            {link.href ? <Link href={link.href}>{link.label}</Link> : <span>{link.label}</span>}
            <button type="button" onClick={() => onOpen(link)}>
              在山上查看
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
