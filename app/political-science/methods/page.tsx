import type { Metadata } from "next";
import { DomainSectionList } from "@/components/domain/DomainSectionList";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const sectionConfig = getSectionConfig("political-science", "methods");
const domainConfig = getDomainConfig("political-science");

export const metadata: Metadata = {
  title: `${sectionConfig?.label ?? ""} — ${domainConfig?.label ?? ""} — Episteme · 格致`,
  description: sectionConfig?.description ?? "",
};

export default function PoliticalScienceMethodsPage() {
  return <DomainSectionList domain="political-science" section="methods" />;
}
