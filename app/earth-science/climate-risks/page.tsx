import type { Metadata } from "next";
import { DomainSectionList } from "@/components/domain/DomainSectionList";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const sectionConfig = getSectionConfig("earth-science", "climate-risks");
const domainConfig = getDomainConfig("earth-science");

export const metadata: Metadata = {
  title: `${sectionConfig?.label ?? ""} — ${domainConfig?.label ?? ""} — Episteme · 格致`,
  description: sectionConfig?.description ?? "",
};

export default function ClimateRisksPage() {
  return <DomainSectionList domain="earth-science" section="climate-risks" />;
}
