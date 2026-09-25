"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { COVERAGE_DOMAIN_COUNT } from "@/lib/knowledge-continuum-coverage-meta";
import { useDeferredActivation } from "./knowledge-continuum/useDeferredKnowledgeData";

const loadKnowledgeContinuum = () => import("./KnowledgeContinuumSection");

const CONFLUENCE_LINKS = [
  { href: "/knowledge-confluence/ai-governance", label: "AI 治理" },
  { href: "/knowledge-confluence/urban-climate-adaptation", label: "城市气候适应" },
  { href: "/knowledge-confluence/population-ageing", label: "人口老龄化" },
  { href: "/knowledge-confluence/macro-fiscal-governance", label: "宏观财政" },
  { href: "/knowledge-confluence/public-health-priority", label: "公共卫生优先排序" },
] as const;

const DeferredContinuum = dynamic(
  () => loadKnowledgeContinuum().then((module) => module.KnowledgeContinuumSection),
  { ssr: false, loading: () => <ContinuumFallback /> }
);

export function DeferredHomeKnowledgeContinuum() {
  const deferred = useDeferredActivation(loadKnowledgeContinuum);
  return (
    <div ref={deferred.containerRef} data-testid="home-knowledge-continuum">
      {deferred.active ? <DeferredContinuum /> : <ContinuumFallback onLoad={deferred.activate} />}
    </div>
  );
}

function ContinuumFallback({ onLoad }: { onLoad?: () => void }) {
  return (
    <section className="home-continuum" aria-labelledby="continuum-title">
      <div className="home-continuum__intro">
        <div>
          <p className="home-continuum__eyebrow">knowledge continuum</p>
          <h2 id="continuum-title" className="home-continuum__title">
            从儿童好奇到研究前沿
          </h2>
        </div>
        <p className="home-continuum__lede">
          六个贯穿一生的问题把 {COVERAGE_DOMAIN_COUNT}
          个学科组织为连续的认知结构：先观察，再掌握概念，继而解释系统、检验证据，最终进入需要多学科共同回答的开放问题。
        </p>
      </div>

      <div className="home-continuum__panel">
        <div>
          <p className="home-continuum__kicker">{COVERAGE_DOMAIN_COUNT} subjects · 5 stages</p>
          <h3 className="home-continuum__panel-title">从观察、概念与系统，走向方法和前沿</h3>
          <ol className="home-continuum__stages">
            {["直觉启蒙", "核心概念", "系统解释", "方法建模", "综合前沿"].map((label, index) => (
              <li key={label} className="home-continuum__stage">
                <span className="home-continuum__stage-index">0{index + 1}</span>
                {label}
              </li>
            ))}
          </ol>
        </div>
        <div className="home-continuum__actions">
          {onLoad ? (
            <button type="button" onClick={onLoad} className="home-continuum__button">
              展开交互图谱
            </button>
          ) : null}
          <Link
            href="/knowledge-graph?layout=cognitive&source=continuum-fallback"
            className="home-continuum__link"
          >
            查看完整认知图谱 →
          </Link>
        </div>
      </div>

      <ContinuumSkeleton />
      <noscript>
        <nav
          className="home-continuum__confluence"
          aria-label="多学科知识汇流正文入口"
          data-testid="knowledge-confluence-explorer"
        >
          {CONFLUENCE_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="home-continuum__confluence-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </noscript>
    </section>
  );
}

const TAB_LABELS = ["主干地图", "地形与路线", "可达前沿", "多学科汇流", "策展覆盖"];

/**
 * Drawn in the shape of what replaces it — the tab row and a spine matrix of
 * five stages — so the swap does not jump and the wait reads as a chart.
 */
function ContinuumSkeleton() {
  return (
    <div className="continuum-skeleton" aria-hidden="true">
      <div className="continuum-tabs__list">
        {TAB_LABELS.map((label, i) => (
          <span key={label} className="continuum-tabs__tab" data-selected={i === 0 || undefined}>
            <span className="continuum-tabs__index">0{i + 1}</span>
            {label}
          </span>
        ))}
      </div>
      <div className="continuum-skeleton__matrix">
        {Array.from({ length: 30 }, (_, i) => (
          <span key={i} style={{ ["--row" as string]: Math.floor(i / 5) }} />
        ))}
      </div>
    </div>
  );
}
