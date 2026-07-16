import type { Metadata } from "next";
import { DomainSectionList } from "@/components/domain/DomainSectionList";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const DOMAIN = "linguistics";
const SECTION = "writing-systems";
const domainConfig = getDomainConfig(DOMAIN);
const sectionConfig = getSectionConfig(DOMAIN, SECTION);

export const metadata: Metadata = {
  title: `${sectionConfig?.label ?? ""} — ${domainConfig?.label ?? ""} — Episteme · 格致`,
  description: sectionConfig?.description ?? "",
};

export default function Page() {
  return <DomainSectionList domain={DOMAIN} section={SECTION} />;
}
