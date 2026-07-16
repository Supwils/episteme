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
  return (
    <>
      <DomainSectionList domain="medicine" section="public-health" />
      <section className="mx-6 mb-20 border border-[#4f9d76]/35 bg-[#4f9d76]/[0.06] p-6 sm:mx-10 lg:mx-16 lg:p-8">
        <p className="mb-3 font-mono text-[10px] tracking-[0.28em] text-[#7bc995] uppercase">
          interactive case · health economics
        </p>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <h2 className="font-display text-fg-primary text-2xl font-semibold">
              卫生预算优先排序实验室
            </h2>
            <p className="text-fg-secondary mt-3 text-sm leading-relaxed">
              用虚构教学情景调整预算、公平权重与严重度保障，观察成本效果和预算影响为何不能单独决定福利包。
            </p>
          </div>
          <Link
            href="/medicine/priority-setting"
            className="inline-flex h-10 items-center justify-center border border-[#7bc995]/50 px-4 font-mono text-[11px] tracking-[0.16em] text-[#9bd9b1] uppercase transition-colors hover:bg-[#4f9d76]/15"
          >
            进入实验室
          </Link>
        </div>
      </section>
    </>
  );
}
