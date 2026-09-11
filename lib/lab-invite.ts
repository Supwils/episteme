import { anthropologyLabInvite } from "@/lib/anthropology/article-lab-invites";
import { artsLabInvite } from "@/lib/arts/article-lab-invites";
import { engineeringLabInvite } from "@/lib/engineering/article-lab-invites";
import { literatureLabInvite } from "@/lib/literature/article-lab-invites";
import { religionLabInvite } from "@/lib/religion/article-lab-invites";

export type LabInviteData = {
  href: string;
  label: string;
  tease: string;
};

const RESOLVERS: Record<string, (section: string, slug: string) => LabInviteData> = {
  anthropology: anthropologyLabInvite,
  religion: religionLabInvite,
  literature: literatureLabInvite,
  arts: artsLabInvite,
  engineering: engineeringLabInvite,
};

export function labInviteFor(domain: string, section: string, slug: string): LabInviteData | null {
  const resolve = RESOLVERS[domain];
  return resolve ? resolve(section, slug) : null;
}
