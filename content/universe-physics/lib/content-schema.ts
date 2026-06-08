import { z } from "zod";
import { PHYSICS_TIER_ORDER } from "./physics-tier";
import { TIER_ORDER, type AnyTierId } from "./tier";

/**
 * Zod schemas mirroring the TierContent types in `lib/content.ts`.
 *
 * The static TypeScript types catch structural mistakes at compile time.
 * These runtime schemas add the rules that *don't* live in the type system:
 *   • slug-shaped ids
 *   • hex color regex
 *   • minimum card / narrative / source counts
 *   • finite, in-bounds position triplets
 *   • per-tier marker id uniqueness
 *   • absolute URLs on sources
 *
 * Used by `content-schema.test.ts` and `scripts/lint-content.mjs`.
 */

const ALL_TIER_IDS = [...TIER_ORDER, ...PHYSICS_TIER_ORDER] as const;
const tierIdSchema = z.enum(ALL_TIER_IDS as unknown as readonly [string, ...string[]]);

const slugSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[a-z0-9][a-z0-9-]*$/i, "slug must be lower-case alphanumerics + dashes");

const hexColorSchema = z
  .string()
  .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "must be #rgb or #rrggbb");

const httpUrlSchema = z
  .string()
  .url()
  .refine((u) => /^https?:\/\//i.test(u), "must be http(s):// URL");

const finiteNumber = z.number().refine(Number.isFinite, "must be finite");

/**
 * Marker positions must be finite. We also cap the magnitude — every
 * tier scene authors its primary subject inside roughly ±2 units, and
 * the most extreme outlier today (T7's Moon at x≈5) sits well under
 * ±10. A wider bound flags unintended order-of-magnitude bugs without
 * needing a per-tier table.
 */
const positionSchema = z.tuple([
  finiteNumber.refine((v) => Math.abs(v) <= 10, "|x| must be ≤ 10"),
  finiteNumber.refine((v) => Math.abs(v) <= 10, "|y| must be ≤ 10"),
  finiteNumber.refine((v) => Math.abs(v) <= 10, "|z| must be ≤ 10"),
]);

const localizedNameSchema = z.object({
  primary: z.string().min(1),
  latin: z.string().min(1),
});

export const dataCardSchema = z.object({
  label: z.string().min(1),
  latinLabel: z.string().min(1).optional(),
  value: z.string().min(1),
  hint: z.string().min(1).optional(),
});

export const narrativeSectionSchema = z.object({
  heading: z.string().min(1),
  body: z.array(z.string().min(1)).min(1, "narrative section must have at least one paragraph"),
});

export const sourceRefSchema = z.object({
  label: z.string().min(1),
  url: httpUrlSchema,
  kind: z.enum(["paper", "agency", "encyclopedia"]),
});

export const sceneMarkerSchema = z.object({
  id: slugSchema,
  name: localizedNameSchema,
  position: positionSchema,
  description: z.string().min(10, "marker description should be at least 10 chars"),
  data: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      })
    )
    .min(1, "marker should have at least one data chip")
    .max(8, "marker data chips capped at 8 for UI legibility")
    .optional(),
  color: hexColorSchema.optional(),
  size: z.number().positive().max(2, "marker size > 2 units would dominate the scene").optional(),
});

export const tierContentSchema = z
  .object({
    tier: tierIdSchema,
    name: localizedNameSchema,
    tagline: z.string().min(1).max(80),
    whisper: z.string().min(1).max(120).optional(),
    dataCards: z
      .array(dataCardSchema)
      .min(4, "tier needs at least 4 data cards for the panel grid")
      .max(16, "panel grid gets crowded past 16"),
    narrative: z
      .array(narrativeSectionSchema)
      .min(3, "tier needs at least 3 narrative sections")
      .max(8),
    sources: z.array(sourceRefSchema).min(2, "tier needs at least 2 cited sources").max(10),
    markers: z.array(sceneMarkerSchema).min(1).max(20).optional(),
    discussionQuestions: z.array(z.string().min(1)).min(1).max(5).optional(),
  })
  .superRefine((content, ctx) => {
    if (!content.markers) return;
    const seen = new Set<string>();
    content.markers.forEach((m, idx) => {
      if (seen.has(m.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["markers", idx, "id"],
          message: `duplicate marker id "${m.id}" within ${content.tier}`,
        });
      }
      seen.add(m.id);
    });
  });

export type ValidatedTierContent = z.infer<typeof tierContentSchema>;

/**
 * Convenience: format a Zod error against a tier id into a single line.
 * Used by both the test runner and the CLI lint script.
 */
export function formatTierIssue(tier: AnyTierId, issue: z.ZodIssue): string {
  const path = issue.path.length ? issue.path.join(".") : "<root>";
  return `[${tier}] ${path}: ${issue.message}`;
}
