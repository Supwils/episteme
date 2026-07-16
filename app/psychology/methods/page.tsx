import type { Metadata } from "next";
import { DomainSectionList } from "@/components/domain/DomainSectionList";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const sectionConfig = getSectionConfig("psychology", "methods");
const domainConfig = getDomainConfig("psychology");

export const metadata: Metadata = {
  title: `${sectionConfig?.label ?? ""} — ${domainConfig?.label ?? ""} — Episteme · 格致`,
  description: sectionConfig?.description ?? "",
};

export default function PsychologyMethodsPage() {
  return <DomainSectionList domain="psychology" section="methods" />;
}
