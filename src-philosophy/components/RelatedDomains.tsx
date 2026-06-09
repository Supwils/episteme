"use client";

import CrossDomainLinks from "@/components/CrossDomainLinks";

type RelatedDomainsProps = {
  thinkerSlug: string;
};

export default function RelatedDomains({ thinkerSlug }: RelatedDomainsProps) {
  return <CrossDomainLinks currentApp="philosophy" entityId={thinkerSlug} />;
}
