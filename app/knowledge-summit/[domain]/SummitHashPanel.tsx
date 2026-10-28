"use client";

import { useCallback, useEffect, useState } from "react";
import { SummitPanel } from "../SummitPanel";
import { panelNodeFromElement, revealSummitNode, summitNodeElement } from "../summit-dom";
import type { SummitPanelLink } from "@/lib/summit-cards";

/** 学科页不载三维。哈希能打开侧栏，因为条目已经在这页的目录里。 */
export function SummitHashPanel({ domain }: { domain: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const apply = () => {
      const match = /^#summit-node-(\d+)$/.exec(window.location.hash);
      if (!match) return;
      const index = Number(match[1]);
      if (!summitNodeElement(index)) return;
      revealSummitNode(index);
      setSelected(index);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  if (selected === null) return null;
  const node = panelNodeFromElement(selected);
  if (!node) return null;
  return (
    <SummitPanel
      node={node}
      onClose={close}
      onOpen={(link) => openLink(domain, link, setSelected)}
    />
  );
}

function openLink(domain: string, link: SummitPanelLink, select: (index: number) => void) {
  if (link.domain === domain && summitNodeElement(link.index)) {
    revealSummitNode(link.index);
    select(link.index);
    window.history.replaceState(null, "", `#summit-node-${link.index}`);
    return;
  }
  window.location.assign(`/knowledge-summit/${link.domain}#summit-node-${link.index}`);
}
