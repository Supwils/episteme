import type { Metadata } from "next";
import { DomainSectionList } from "@/components/domain/DomainSectionList";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const sc = getSectionConfig("computer-science", "theory");
const dc = getDomainConfig("computer-science");

export const metadata: Metadata = {
  title: `${sc?.label ?? ""} — ${dc?.label ?? ""} — Episteme · 格致`,
  description: sc?.description ?? "",
};

export default function Page() {
  return <DomainSectionList domain="computer-science" section="theory" />;
}
