import { SubjectHeader } from "@/components/SubjectHeader";

/**
 * Engine domains (computer-science / political-science) render the shared
 * SubjectHeader; their tabs come from lib/subject-nav (derived from
 * new-domains). Kept as a thin wrapper so the domain layouts stay unchanged.
 */
export function DomainNav({ domain }: { domain: string }) {
  return <SubjectHeader subject={domain} />;
}
