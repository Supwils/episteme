import { getAllCuriosities } from "@/lib/curiosities";
import { CuriositiesWall } from "@/components/curiosities/CuriositiesWall";
import { SITE_DOMAIN_COUNT_TEXT } from "@/lib/site-copy";

export const dynamic = "force-static";

export default function CuriositiesPage() {
  return <CuriositiesWall items={getAllCuriosities()} domainCountText={SITE_DOMAIN_COUNT_TEXT} />;
}
