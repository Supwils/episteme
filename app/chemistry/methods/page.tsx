import type { Metadata } from "next";
import { DomainSectionList } from "@/components/domain/DomainSectionList";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const sectionConfig = getSectionConfig("chemistry", "methods");
const domainConfig = getDomainConfig("chemistry");

export const metadata: Metadata = {
  title: `${sectionConfig?.label ?? ""} — ${domainConfig?.label ?? ""} — Episteme · 格致`,
  description: sectionConfig?.description ?? "",
};

export default function ChemistryMethodsPage() {
  return <DomainSectionList domain="chemistry" section="methods" />;
}
