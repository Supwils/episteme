import type { EventDetailsMap } from "./types";
import { EVENT_DETAILS_PREHISTORIC } from "./details/event-details-prehistoric";
import { EVENT_DETAILS_CLASSICAL } from "./details/event-details-classical";
import { EVENT_DETAILS_MEDIEVAL } from "./details/event-details-medieval";
import { EVENT_DETAILS_EARLY_MODERN } from "./details/event-details-early-modern";
import { EVENT_DETAILS_MODERN } from "./details/event-details-modern";
import { EVENT_DETAILS_CONTEMPORARY } from "./details/event-details-contemporary";
import { EVENT_DETAILS_FUTURE } from "./details/event-details-future";
import { EVENT_DETAILS_TIER2 } from "./details/event-details-tier2-expansion";
import { EVENT_DETAILS_TIER3 } from "./details/event-details-tier3-core";
import { EVENT_DETAILS_TIER3_PARALLEL } from "./details/event-details-tier3-parallel";
import { EVENT_DETAILS_AFRICAN_DEEP } from "./details/event-details-african-deep";
import { EVENT_DETAILS_ISLAMIC_DEEP } from "./details/event-details-islamic-deep";
import { EVENT_DETAILS_LATAM_DEEP } from "./details/event-details-latam-deep";
import { EVENT_DETAILS_PARALLEL_DEEP } from "./details/event-details-parallel-deep";
import { EVENT_DETAILS_MODERN_DEEP } from "./details/event-details-modern-deep";
import { EVENT_DETAILS_ANCIENT_DEEP } from "./details/event-details-ancient-deep";
import { EVENT_DETAILS_EXTRA } from "./details/event-details-extra";
import { EVENT_DETAILS_FINAL } from "./details/event-details-final";
import { EVENT_DETAILS_LAST } from "./details/event-details-last";

export const EVENT_DETAILS: EventDetailsMap = {
  ...EVENT_DETAILS_PREHISTORIC,
  ...EVENT_DETAILS_CLASSICAL,
  ...EVENT_DETAILS_MEDIEVAL,
  ...EVENT_DETAILS_EARLY_MODERN,
  ...EVENT_DETAILS_MODERN,
  ...EVENT_DETAILS_CONTEMPORARY,
  ...EVENT_DETAILS_FUTURE,
  ...EVENT_DETAILS_TIER2,
  ...EVENT_DETAILS_TIER3_PARALLEL,
  ...EVENT_DETAILS_TIER3,
  ...EVENT_DETAILS_AFRICAN_DEEP,
  ...EVENT_DETAILS_ISLAMIC_DEEP,
  ...EVENT_DETAILS_LATAM_DEEP,
  ...EVENT_DETAILS_PARALLEL_DEEP,
  ...EVENT_DETAILS_MODERN_DEEP,
  ...EVENT_DETAILS_ANCIENT_DEEP,
  ...EVENT_DETAILS_EXTRA,
  ...EVENT_DETAILS_FINAL,
  ...EVENT_DETAILS_LAST,
};
