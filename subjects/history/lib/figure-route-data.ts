import {
  getHistoryFigureSummary,
  type HistoryEraId,
} from "./history-catalog";

export interface HistoryFigure {
  name: string;
  birth: number | null;
  death: number | null;
  title: string;
  desc: string;
  longDesc: string;
  era: HistoryEraId;
  region: string;
  domain: string;
  quote: string;
  impact: string[];
  achievements: string[];
  controversies: string[];
  keyEvents: { year: number; title: string }[];
  references: string[];
}

type FigureRouteModule = {
  FIGURE_ROUTE_RECORDS: Record<string, HistoryFigure>;
};

const figureRouteLoaders: Record<
  HistoryEraId,
  () => Promise<FigureRouteModule>
> = {
  prehistoric: () =>
    import(
      "@/content/human-history/data/generated/figure-route-prehistoric.js"
    ).then((loaded) => loaded as unknown as FigureRouteModule),
  classical: () =>
    import("@/content/human-history/data/generated/figure-route-classical.js").then(
      (loaded) => loaded as unknown as FigureRouteModule,
    ),
  medieval: () =>
    import("@/content/human-history/data/generated/figure-route-medieval.js").then(
      (loaded) => loaded as unknown as FigureRouteModule,
    ),
  earlyModern: () =>
    import(
      "@/content/human-history/data/generated/figure-route-earlyModern.js"
    ).then((loaded) => loaded as unknown as FigureRouteModule),
  modern: () =>
    import("@/content/human-history/data/generated/figure-route-modern.js").then(
      (loaded) => loaded as unknown as FigureRouteModule,
    ),
  contemporary: () =>
    import(
      "@/content/human-history/data/generated/figure-route-contemporary.js"
    ).then((loaded) => loaded as unknown as FigureRouteModule),
  future: () =>
    import("@/content/human-history/data/generated/figure-route-future.js").then(
      (loaded) => loaded as unknown as FigureRouteModule,
    ),
};

export async function getFigureRouteRecord(
  name: string,
): Promise<HistoryFigure | undefined> {
  const summary = getHistoryFigureSummary(name);
  if (!summary) return undefined;
  const routeModule = await figureRouteLoaders[summary.era]();
  return routeModule.FIGURE_ROUTE_RECORDS[summary.name];
}
