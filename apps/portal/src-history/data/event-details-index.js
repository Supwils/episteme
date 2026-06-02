import { EVENT_DETAILS_PREHISTORIC } from './details/event-details-prehistoric.js';
import { EVENT_DETAILS_CLASSICAL } from './details/event-details-classical.js';
import { EVENT_DETAILS_MEDIEVAL } from './details/event-details-medieval.js';
import { EVENT_DETAILS_EARLY_MODERN } from './details/event-details-early-modern.js';
import { EVENT_DETAILS_MODERN } from './details/event-details-modern.js';
import { EVENT_DETAILS_CONTEMPORARY } from './details/event-details-contemporary.js';
import { EVENT_DETAILS_FUTURE } from './details/event-details-future.js';
import { EVENT_DETAILS_TIER2 } from './details/event-details-tier2-expansion.js';
import { EVENT_DETAILS_TIER3 } from './details/event-details-tier3-core.js';
import { EVENT_DETAILS_TIER3_PARALLEL } from './details/event-details-tier3-parallel.js';

export const EVENT_DETAILS = {
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
};
