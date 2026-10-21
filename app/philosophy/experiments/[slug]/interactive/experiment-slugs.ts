// Lives outside the "use client" component so the server page can reject
// unknown slugs with a real 404 instead of a client-side "not found" message.
export const INTERACTIVE_EXPERIMENT_SLUGS = [
  "trolley-problem",
  "platos-cave",
  "chinese-room",
  "experience-machine",
  "veil-of-ignorance",
  "ship-of-theseus",
  "buridans-ass",
] as const;

export type InteractiveExperimentSlug = (typeof INTERACTIVE_EXPERIMENT_SLUGS)[number];

export function isInteractiveExperimentSlug(slug: string): slug is InteractiveExperimentSlug {
  return (INTERACTIVE_EXPERIMENT_SLUGS as readonly string[]).includes(slug);
}
