import type { CoverageDomainId } from "@/lib/knowledge-continuum-coverage-meta";

export interface FeaturedKnowledgeTour {
  id: string;
  title: string;
  summary: string;
  domains: readonly {
    id: CoverageDomainId;
    label: string;
  }[];
  href: string;
  labHref?: string;
  labLabel?: string;
}

export const FEATURED_KNOWLEDGE_TOURS: readonly FeaturedKnowledgeTour[] = [
  {
    id: "from-distress-to-rights-based-mental-health-care",
    title: "从心理困扰到可持续照护",
    summary: "沿症状、求助、社会支持、临床照护、卫生政策与自主权，核对一条完整的心理健康证据链。",
    domains: [
      { id: "psychology", label: "心理" },
      { id: "sociology", label: "社会" },
      { id: "medicine", label: "医学" },
      { id: "political-science", label: "政治" },
      { id: "philosophy", label: "哲学" },
    ],
    href: "/knowledge-graph?layout=spatial&tourId=from-distress-to-rights-based-mental-health-care&step=0&source=spine-atlas",
    labHref: "/medicine/mental-health-access",
    labLabel: "打开服务可及性实验室",
  },
  {
    id: "from-adolescent-development-to-continuous-support",
    title: "从青春期发展到连续支持",
    summary:
      "沿睡眠、家庭与同伴、数字平台、因果方法、学校服务和适龄权利，追踪风险如何进入支持系统。",
    domains: [
      { id: "psychology", label: "心理" },
      { id: "sociology", label: "社会" },
      { id: "medicine", label: "医学" },
    ],
    href: "/knowledge-graph?layout=spatial&tourId=from-adolescent-development-to-continuous-support&step=0&source=spine-atlas",
    labHref: "/medicine/adolescent-service-lab",
    labLabel: "打开学校与社区服务实验室",
  },
];
