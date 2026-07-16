"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
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
    <section className="w-full px-6 py-16 sm:px-10 lg:px-16" aria-labelledby="continuum-title">
      <div className="mb-9 grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
        <div>
          <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.34em] uppercase">
            knowledge continuum
          </p>
          <h2 id="continuum-title" className="font-display text-fg-primary text-2xl font-semibold">
            从儿童好奇到研究前沿
          </h2>
        </div>
        <p className="text-fg-secondary max-w-3xl text-sm leading-relaxed">
          六个贯穿一生的问题把 15
          个学科组织为连续的认知结构：先观察，再掌握概念，继而解释系统、检验证据，最终进入需要多学科共同回答的开放问题。
        </p>
      </div>

      <div
        className="border-border-faint bg-bg-near flex flex-col justify-between border px-4 py-5 sm:px-6"
        style={{ minHeight: "100vh" }}
      >
        <div>
          <p className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
            15 subjects · 5 stages
          </p>
          <h3 className="font-display text-fg-primary mt-1 text-xl font-semibold">
            从观察、概念与系统，走向方法和前沿
          </h3>
          <ol className="border-border-faint mt-5 grid border-t border-l sm:grid-cols-5">
            {["直觉启蒙", "核心概念", "系统解释", "方法建模", "综合前沿"].map((label, index) => (
              <li
                key={label}
                className="border-border-faint text-fg-secondary border-r border-b px-3 py-3 text-xs"
              >
                <span className="text-fg-disabled block font-mono text-[9px]">0{index + 1}</span>
                {label}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          {onLoad ? (
            <button
              type="button"
              onClick={onLoad}
              className="border-border-faint text-fg-primary min-h-10 border px-4 text-xs"
            >
              展开交互图谱
            </button>
          ) : null}
          <Link
            href="/knowledge-graph?layout=cognitive&source=continuum-fallback"
            className="text-fg-secondary hover:text-fg-primary inline-flex min-h-10 items-center border-b border-current text-xs"
          >
            查看完整认知图谱 →
          </Link>
        </div>
      </div>

      <FallbackModule testId="knowledge-spine-atlas" title="15 门学科的五级主干地图" />
      <FallbackModule
        testId="knowledge-learning-planner"
        title="知识地形与路线编排"
        triggerTestIds={["knowledge-terrain", "knowledge-terrain-diagnostics"]}
      />
      <FallbackModule testId="knowledge-frontier-lab" title="可达知识前沿" />
      <FallbackModule testId="knowledge-confluence-explorer" title="多学科知识汇流">
        <noscript>
          <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2" aria-label="多学科知识汇流正文入口">
            {CONFLUENCE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-fg-secondary border-b border-current text-xs"
              >
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
    <div
      data-testid={testId}
      className="border-border-faint bg-bg-near mt-8 flex flex-col justify-between border px-4 py-5 sm:px-6"
      style={{ minHeight: "100vh" }}
    >
      {triggerTestIds.map((id) => (
        <span key={id} data-testid={id} aria-hidden="true" />
      ))}
      <div>
        <p className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">
          knowledge continuum
        </p>
        <h3 className="font-display text-fg-primary mt-1 text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-fg-muted mt-8 text-xs leading-5">
        交互数据在这一部分进入视口后载入；完整正文入口始终保留。
      </p>
      {children}
    </div>
  );
}
