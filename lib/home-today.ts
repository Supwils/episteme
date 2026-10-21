import { dailyShelf } from "./astrolabe";
import { calendarSeed } from "./calendar-day";
import { getDailyKnowledge } from "./daily-knowledge";
import { dailyLabelFor, dedupeDailyEvents } from "./daily-display";
import {
  coincidenceFollowHref,
  curiosityTeaser,
  getSpotlightCoincidence,
  SPOTLIGHT_COINCIDENCE_SALT,
} from "./curiosities";
import { pigmentVar } from "./design/palette";
import { isSealDomain } from "./design/seals";
import { domainCluster } from "./knowledge-geometry";

export function getHomeToday(now = new Date()) {
  const daily = getDailyKnowledge(now);
  const lead = dedupeDailyEvents(daily.items)[0];
  const coincidence = getSpotlightCoincidence(calendarSeed(now) + SPOTLIGHT_COINCIDENCE_SALT);
  return {
    date: daily.date,
    fact: daily.fact,
    lead: lead ? { ...lead, label: dailyLabelFor(lead.url, "知识") } : null,
    shelf: dailyShelf(now).map((pick) => {
      const cluster = domainCluster(pick.domain);
      return {
        ...pick,
        seal: isSealDomain(pick.domain) && cluster ? pick.domain : null,
        pigment: cluster ? pigmentVar(cluster) : null,
      };
    }),
    coincidence: {
      title: coincidence.title,
      href: coincidenceFollowHref(coincidence.url),
      teaser: curiosityTeaser(coincidence.detail),
    },
  };
}

export type HomeToday = ReturnType<typeof getHomeToday>;
