import { getAllCuriosities } from "@/lib/curiosities";
import { CuriositiesWall } from "@/components/curiosities/CuriositiesWall";

export const dynamic = "force-static";

export default function CuriositiesPage() {
  return <CuriositiesWall items={getAllCuriosities()} />;
}
