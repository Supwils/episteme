import { astrolabeReadouts } from "@/lib/astrolabe";

// Every domain's readout for the homepage astrolabe. The page ships only the
// default readout; the rest is one static JSON fetched after hydration, so
// the spine data stays out of the homepage HTML and RSC payload.
export const dynamic = "force-static";

export function GET() {
  return Response.json(astrolabeReadouts());
}
