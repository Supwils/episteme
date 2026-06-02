import type { EventDetailsMap } from './types';
import { SCHOLARLY_BATCH_1 } from './scholarly/scholarly-batch-1';
import { SCHOLARLY_BATCH_2 } from './scholarly/scholarly-batch-2';
import { SCHOLARLY_BATCH_3 } from './scholarly/scholarly-batch-3';
import { SCHOLARLY_BATCH_4 } from './scholarly/scholarly-batch-4';

export const SCHOLARLY_DETAILS: EventDetailsMap = {
  ...SCHOLARLY_BATCH_1,
  ...SCHOLARLY_BATCH_2,
  ...SCHOLARLY_BATCH_3,
  ...SCHOLARLY_BATCH_4,
};
