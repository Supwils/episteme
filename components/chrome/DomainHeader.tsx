import { Seal } from "@/components/design/Seal";
import { SubjectHeader } from "@/components/SubjectHeader";
import { DOMAINS } from "@/lib/data";
import { pigmentVar } from "@/lib/design/palette";
import { isSealDomain } from "@/lib/design/seals";

/**
 * Server shell for the shared subject header: renders the domain's seal here so
 * its glyph outline travels as markup, not as client JS on every domain page.
 */
export function DomainHeader({ subject }: { subject: string }) {
  const cluster = DOMAINS.find((domain) => domain.id === subject)?.cluster;
  const mark =
    isSealDomain(subject) && cluster ? (
      <Seal domain={subject} size={22} color={pigmentVar(cluster)} label={false} />
    ) : null;
  return <SubjectHeader subject={subject} mark={mark} />;
}
