import type { Metadata } from "next";
import { DomainSectionList } from "@/components/domain/DomainSectionList";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";
const dc = getDomainConfig("earth-science"),
  sc = getSectionConfig("earth-science", "event-analyses");
export const metadata: Metadata = {
  title: `${sc?.label} — ${dc?.label}`,
  description: sc?.description,
};
export default function Page() {
  return <DomainSectionList domain="earth-science" section="event-analyses" />;
}
