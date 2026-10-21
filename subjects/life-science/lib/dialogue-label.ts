import { personDisplayName } from "@/lib/person-display-name";

function titleSides(title: string): [string, string] | null {
  const mark = title.indexOf(" vs ");
  if (mark < 0) return null;
  const left = title.slice(0, mark).trim();
  const right = (title.slice(mark + 4).split(/[：:]/u)[0] ?? "").trim();
  if (!/[一-鿿]/.test(left) || !/[一-鿿]/.test(right)) return null;
  return [left, right];
}

/** Page title, then a name already beside the Latin form, then the title's own side. */
export function dialogueParticipantLabel(
  id: string,
  participants: readonly string[],
  title: string,
  body: string
): string {
  const named = personDisplayName(id, body);
  if (named !== id) return named;
  const sides = participants.length === 2 ? titleSides(title) : null;
  const side = sides?.[participants.indexOf(id)];
  return side && side !== id ? side : named;
}
