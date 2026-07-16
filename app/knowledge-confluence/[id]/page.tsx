import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KnowledgeConfluenceEvidenceLedger } from "@/components/knowledge-continuum/KnowledgeConfluenceEvidenceLedger";
import {
  KNOWLEDGE_CONFLUENCE_ROLE_META,
  type KnowledgeConfluence,
} from "@/lib/knowledge-confluence";
import { buildKnowledgeConfluence } from "@/lib/knowledge-confluence-catalog";
import { buildKnowledgeConfluenceGraphHref } from "@/lib/knowledge-confluence-plan";
import { buildLearningPlanCatalog } from "@/lib/knowledge-learning-plan-catalog";
import { CURATED_KNOWLEDGE_CONFLUENCES } from "@/subjects/knowledge-graph/data/curated-confluences";

export const dynamicParams = false;
export const revalidate = 86400;

const learningCatalog = buildLearningPlanCatalog();

interface KnowledgeConfluencePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return CURATED_KNOWLEDGE_CONFLUENCES.map((confluence) => ({ id: confluence.id }));
}

function getConfluence(id: string): KnowledgeConfluence {
  const confluence = buildKnowledgeConfluence(id, learningCatalog);
  if (!confluence) notFound();
  return confluence;
}

export async function generateMetadata({
  params,
}: KnowledgeConfluencePageProps): Promise<Metadata> {
  const { id } = await params;
  const confluence = getConfluence(id);
  return {
    title: `${confluence.title}知识汇流 · Episteme`,
    description: confluence.question,
  };
}

export default async function KnowledgeConfluencePage({ params }: KnowledgeConfluencePageProps) {
  const { id } = await params;
  const confluence = getConfluence(id);

  return (
    <div className="bg-bg-base text-fg-primary min-h-screen">
      <header className="border-border-faint border-b px-6 pt-12 pb-10 sm:px-10 lg:px-16 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <nav className="text-fg-muted flex flex-wrap items-center gap-2 text-[10px]">
            <Link href="/" className="hover:text-fg-primary">
              首页
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/?confluence=${encodeURIComponent(confluence.id)}&confluenceMinutes=45#knowledge-confluence`}
              className="hover:text-fg-primary"
            >
              知识汇流
            </Link>
            <span aria-hidden="true">/</span>
            <span>{confluence.title}</span>
          </nav>
          <p className="text-accent-gold mt-8 font-mono text-[10px] tracking-[0.22em] uppercase">
            interdisciplinary research route
          </p>
          <h1 className="font-display mt-3 max-w-5xl text-3xl font-semibold sm:text-4xl">
            {confluence.title}知识汇流
          </h1>
          <p className="text-fg-primary mt-5 max-w-4xl text-lg leading-8">{confluence.question}</p>
          <p className="text-fg-muted mt-4 max-w-4xl text-sm leading-7">{confluence.summary}</p>
          <dl className="border-border-faint mt-8 grid max-w-3xl grid-cols-2 border-y sm:grid-cols-4">
            <div className="border-border-faint border-r px-3 py-4">
              <dt className="text-fg-disabled text-[9px]">并行路线</dt>
              <dd className="mt-1 text-sm">{confluence.strands.length}</dd>
            </div>
            <div className="border-border-faint border-r px-3 py-4">
              <dt className="text-fg-disabled text-[9px]">涉及学科</dt>
              <dd className="mt-1 text-sm">{confluence.domainCount}</dd>
            </div>
            <div className="border-border-faint border-r px-3 py-4">
              <dt className="text-fg-disabled text-[9px]">策展节点</dt>
              <dd className="mt-1 text-sm">{confluence.nodeCount}</dd>
            </div>
            <div className="px-3 py-4">
              <dt className="text-fg-disabled text-[9px]">汇流阶段</dt>
              <dd className="mt-1 text-sm">L5</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <section aria-labelledby="route-title">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-end">
              <div>
                <p className="text-fg-disabled font-mono text-[9px] tracking-[0.2em] uppercase">
                  four evidence traditions
                </p>
                <h2 id="route-title" className="font-display mt-2 text-2xl font-semibold">
                  四条前置路线
                </h2>
              </div>
              <p className="text-fg-muted max-w-3xl text-xs leading-6">
                每条路线从直觉、概念和系统解释进入方法层，再共同抵达开放研究问题。角色表示它在综合判断中的责任，而不是学科高低排序。
              </p>
            </div>

            <div className="border-border-faint mt-8 divide-y border">
              {confluence.strands.map((strand, index) => {
                const role = KNOWLEDGE_CONFLUENCE_ROLE_META[strand.role];
                return (
                  <article
                    key={strand.id}
                    className="border-border-faint grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(190px,0.5fr)_minmax(0,1.5fr)]"
                  >
                    <div className="border-l-2 pl-4" style={{ borderColor: role.color }}>
                      <p className="font-mono text-[9px]" style={{ color: role.color }}>
                        0{index + 1} · {role.label}
                      </p>
                      <h3 className="mt-2 text-sm font-medium">{strand.title}</h3>
                      <p className="text-fg-muted mt-3 text-[11px] leading-5">
                        {strand.contribution}
                      </p>
                      <p className="text-fg-disabled mt-3 text-[10px] leading-5">
                        边界：{strand.boundary}
                      </p>
                    </div>

                    <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                      {strand.steps.map((step) => (
                        <li key={step.nodeId} className="border-border-faint border px-3 py-3">
                          <p className="text-fg-disabled flex items-center gap-2 font-mono text-[9px]">
                            <span
                              className="h-1.5 w-1.5"
                              style={{ backgroundColor: step.domainColor }}
                              aria-hidden="true"
                            />
                            L{step.level} · {step.domainLabel}
                          </p>
                          <Link
                            href={step.articleHref ?? step.graphHref}
                            className="text-fg-secondary hover:text-fg-primary mt-2 block text-[11px] leading-5"
                          >
                            {step.label}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="border-border-faint bg-bg-elevated mt-10 border px-4 py-6 sm:px-6">
            <p className="text-accent-gold font-mono text-[9px] tracking-[0.2em] uppercase">
              L5 convergence
            </p>
            <h2 className="mt-2 text-lg font-medium">{confluence.target.label}</h2>
            <p className="text-fg-secondary mt-3 max-w-4xl text-xs leading-6">
              {confluence.synthesisTask}
            </p>
            <div className="mt-5 flex flex-wrap gap-5 text-xs">
              {confluence.target.articleHref ? (
                <Link
                  href={confluence.target.articleHref}
                  className="text-fg-primary border-b border-current"
                >
                  阅读L5研究节点
                </Link>
              ) : null}
              <Link
                href={buildKnowledgeConfluenceGraphHref(confluence.id, confluence.target.nodeId)}
                className="text-accent-gold border-b border-current"
              >
                在知识图谱中查看完整汇流
              </Link>
            </div>
          </section>

          <div className="border-border-faint mt-10 border">
            <KnowledgeConfluenceEvidenceLedger confluence={confluence} />
          </div>

          <section className="mt-10" aria-labelledby="unresolved-title">
            <h2 id="unresolved-title" className="font-display text-xl font-semibold">
              仍未解决的问题
            </h2>
            <ol className="border-border-faint mt-5 grid border md:grid-cols-3">
              {confluence.unresolvedQuestions.map((question, index) => (
                <li
                  key={question}
                  className="border-border-faint min-h-28 border-b px-4 py-5 text-xs leading-6 md:border-r md:border-b-0"
                >
                  <span className="text-fg-disabled mr-2 font-mono">0{index + 1}</span>
                  {question}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
