import type { Metadata } from "next";
import { DomainSectionList } from "@/components/domain/DomainSectionList";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const sc = getSectionConfig("political-science", "international-relations");
const dc = getDomainConfig("political-science");

export const metadata: Metadata = {
  title: `${sc?.label ?? ""} — ${dc?.label ?? ""} — Universe Knowledge`,
  description: sc?.description ?? "",
};

export default function Page() {
  return <DomainSectionList domain="political-science" section="international-relations" />;
}
