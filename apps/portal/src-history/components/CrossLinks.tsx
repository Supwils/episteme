"use client";

import CrossDomainLinks from "@/components/CrossDomainLinks";

type CrossLinksProps = {
  eventId: string;
};

export default function CrossLinks({ eventId }: CrossLinksProps) {
  return <CrossDomainLinks currentApp="human-history" entityId={eventId} />;
}
