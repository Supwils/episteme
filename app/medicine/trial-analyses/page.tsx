import type { Metadata } from "next";
import { DomainSectionList } from "@/components/domain/DomainSectionList";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";

const dc = getDomainConfig("medicine");
const sc = getSectionConfig("medicine", "trial-analyses");
export const metadata: Metadata = {
  title: `${sc?.label} — ${dc?.label}`,
  description: sc?.description,
};
export default function Page() {
  return <DomainSectionList domain="medicine" section="trial-analyses" />;
}
