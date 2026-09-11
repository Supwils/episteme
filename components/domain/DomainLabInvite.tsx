import { LabInviteCard } from "@/components/domain/LabInviteCard";
import { labInviteFor } from "@/lib/lab-invite";

export function DomainLabInvite({
  domain,
  section,
  slug,
}: {
  domain: string;
  section: string;
  slug: string;
}) {
  const invite = labInviteFor(domain, section, slug);
  if (!invite) return null;
  return <LabInviteCard href={invite.href} label={invite.label} tease={invite.tease} />;
}
