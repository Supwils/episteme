import { buildSealSprite, spriteResponse } from "@/lib/design/sprites";

export const dynamic = "force-static";

export function GET() {
  return spriteResponse(buildSealSprite());
}
