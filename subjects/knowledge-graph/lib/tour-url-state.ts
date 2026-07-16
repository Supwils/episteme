export const TOUR_ID_PARAM = "tourId";
export const TOUR_STEP_PARAM = "step";

type TourDescriptor = {
  id: string;
  stepCount: number;
};

export type TourUrlState = {
  tourId: string;
  stepIndex: number;
};

export type ResolvedTourUrlState = {
  state: TourUrlState | null;
  needsNormalization: boolean;
};

function parseStepIndex(value: string | null, stepCount: number): number {
  if (!value || !/^\d+$/.test(value)) return 0;
  const requestedIndex = Number(value) - 1;
  return Math.min(Math.max(requestedIndex, 0), Math.max(stepCount - 1, 0));
}

export function resolveTourUrlState(
  searchParams: URLSearchParams,
  tours: TourDescriptor[]
): ResolvedTourUrlState {
  const requestedTourId = searchParams.get(TOUR_ID_PARAM);
  const requestedStep = searchParams.get(TOUR_STEP_PARAM);

  if (!requestedTourId) {
    return {
      state: null,
      needsNormalization: requestedStep !== null,
    };
  }

  const tour = tours.find((candidate) => candidate.id === requestedTourId);
  if (!tour || tour.stepCount < 1) {
    return {
      state: null,
      needsNormalization: true,
    };
  }

  const stepIndex = parseStepIndex(requestedStep, tour.stepCount);
  const canonicalStep = String(stepIndex + 1);

  return {
    state: { tourId: tour.id, stepIndex },
    needsNormalization: requestedStep !== canonicalStep,
  };
}

export function buildTourUrl(
  pathname: string,
  searchParams: URLSearchParams,
  state: TourUrlState | null
): string {
  const nextParams = new URLSearchParams(searchParams);

  if (state) {
    nextParams.set(TOUR_ID_PARAM, state.tourId);
    nextParams.set(TOUR_STEP_PARAM, String(state.stepIndex + 1));
  } else {
    nextParams.delete(TOUR_ID_PARAM);
    nextParams.delete(TOUR_STEP_PARAM);
  }

  const query = nextParams.toString();
  return query ? `${pathname}?${query}` : pathname;
}
