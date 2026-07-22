import type { Metadata } from "next";
import Link from "next/link";
import { DomainSectionList } from "@/components/domain/DomainSectionList";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const sectionConfig = getSectionConfig("medicine", "public-health");
const domainConfig = getDomainConfig("medicine");

export const metadata: Metadata = {
  title: `${sectionConfig?.label ?? ""} — ${domainConfig?.label ?? ""} — Episteme · 格致`,
  description: sectionConfig?.description ?? "",
};

export default function MedicinePublicHealthPage() {
  const labs = [
    {
      eyebrow: "effective coverage",
      title: "心理健康服务可及性实验室",
      description:
        "调整识别、首次接触、持续照护、有效反应和公平差距，观察服务链如何从需要逐级收缩。",
      href: "/medicine/mental-health-access",
    },
    {
      eyebrow: "health economics",
      title: "卫生预算优先排序实验室",
      description:
        "用虚构教学情景调整预算、公平权重与严重度保障，观察成本效果和预算影响为何不能单独决定福利包。",
      href: "/medicine/priority-setting",
    },
    {
      eyebrow: "adolescent service portfolio",
      title: "青少年学校与社区服务方案实验室",
      description:
        "把全校促进、定向支持、校外触达、适龄入口、临床能力和连续导航放进同一服务包，检验预算、效果与公平约束。",
      href: "/medicine/adolescent-service-lab",
    },
  ] as const;

  return (
    <>
      <DomainSectionList domain="medicine" section="public-health" />
      <section className="mx-6 mb-20 border border-[#4f9d76]/35 bg-[#4f9d76]/[0.06] sm:mx-10 lg:mx-16">
        <header className="border-b border-[#4f9d76]/25 px-6 py-5 lg:px-8">
          <p className="font-mono text-[10px] tracking-[0.28em] text-[#7bc995] uppercase">
            interactive public health
          </p>
          <h2 className="font-display text-fg-primary mt-2 text-2xl font-semibold">
            公共卫生实验室
          </h2>
        </header>
        {labs.map((lab) => (
          <div
            key={lab.href}
            className="grid gap-5 border-b border-[#4f9d76]/20 px-6 py-6 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-8"
          >
            <div className="max-w-3xl">
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#7bc995] uppercase">
                {lab.eyebrow}
              </p>
              <h3 className="text-fg-primary mt-1 text-lg font-semibold">{lab.title}</h3>
              <p className="text-fg-secondary mt-2 text-sm leading-relaxed">{lab.description}</p>
            </div>
            <Link
              href={lab.href}
              aria-label={`进入${lab.title}`}
              className="inline-flex h-10 items-center justify-center border border-[#7bc995]/50 px-4 font-mono text-[11px] tracking-[0.12em] text-[#9bd9b1] transition-colors hover:bg-[#4f9d76]/15"
            >
              进入实验室 →
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
