import { anthropologyLabInvite } from "@/lib/anthropology/article-lab-invites";
import { artsLabInvite } from "@/lib/arts/article-lab-invites";
import { chemistryLabInvite } from "@/lib/chemistry/article-lab-invites";
import { computerScienceLabInvite } from "@/lib/computer-science/article-lab-invites";
import { earthScienceLabInvite } from "@/lib/earth-science/article-lab-invites";
import { educationLabInvite } from "@/lib/education/article-lab-invites";
import { engineeringLabInvite } from "@/lib/engineering/article-lab-invites";
import { literatureLabInvite } from "@/lib/literature/article-lab-invites";
import { politicalScienceLabInvite } from "@/lib/political-science/article-lab-invites";
import { psychologyLabInvite } from "@/lib/psychology/article-lab-invites";
import { religionLabInvite } from "@/lib/religion/article-lab-invites";
import { sociologyLabInvite } from "@/lib/sociology/article-lab-invites";

export type LabInviteData = {
  href: string;
  label: string;
  tease: string;
};

const RESOLVERS: Record<string, (section: string, slug: string) => LabInviteData | null> = {
  anthropology: anthropologyLabInvite,
  arts: artsLabInvite,
  chemistry: chemistryLabInvite,
  "computer-science": computerScienceLabInvite,
  "earth-science": earthScienceLabInvite,
  education: educationLabInvite,
  engineering: engineeringLabInvite,
  literature: literatureLabInvite,
  "political-science": politicalScienceLabInvite,
  psychology: psychologyLabInvite,
  religion: religionLabInvite,
  sociology: sociologyLabInvite,
};

export function labInviteFor(domain: string, section: string, slug: string): LabInviteData | null {
  const resolve = RESOLVERS[domain];
  return resolve ? resolve(section, slug) : null;
}
