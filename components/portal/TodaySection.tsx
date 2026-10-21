import { getHomeToday } from "@/lib/home-today";
import { HomeUpdates } from "./HomeUpdates";
import { TodaySectionView } from "./TodaySectionView";

export function TodaySection({ now = new Date() }: { now?: Date } = {}) {
  return (
    <TodaySectionView initial={getHomeToday(now)}>
      <HomeUpdates />
    </TodaySectionView>
  );
}
