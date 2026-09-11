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

      <FallbackModule
        testId="knowledge-spine-atlas"
        title={`${COVERAGE_DOMAIN_COUNT} 门学科的五级主干地图`}
      />
      <FallbackModule
        testId="knowledge-learning-planner"
        title="知识地形与路线编排"
        triggerTestIds={["knowledge-terrain", "knowledge-terrain-diagnostics"]}
      />
      <FallbackModule testId="knowledge-frontier-lab" title="可达知识前沿" />
      <FallbackModule testId="knowledge-confluence-explorer" title="多学科知识汇流">
        <noscript>
          <nav className="home-continuum__confluence" aria-label="多学科知识汇流正文入口">
            {CONFLUENCE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="home-continuum__confluence-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </noscript>
      </FallbackModule>
      <FallbackModule testId="knowledge-coverage-panel" title="全学科策展覆盖" />
    </section>
  );
}

function FallbackModule({
  children,
  testId,
  title,
  triggerTestIds = [],
}: {
  children?: React.ReactNode;
  testId: string;
  title: string;
  triggerTestIds?: readonly string[];
}) {
  return (
    <div data-testid={testId} className="home-continuum__module">
      {triggerTestIds.map((id) => (
        <span key={id} data-testid={id} aria-hidden="true" />
      ))}
      <div>
        <p className="home-continuum__kicker">knowledge continuum</p>
        <h3 className="home-continuum__panel-title">{title}</h3>
      </div>
      <p className="home-continuum__hint">
        交互数据在这一部分进入视口后载入；完整正文入口始终保留。
      </p>
      {children}
    </div>
  );
}
