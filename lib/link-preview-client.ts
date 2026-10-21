"use client";

import { shardDomainForHref, type LinkPreview } from "./link-preview-shards";

// Search and inline links share each successful shard; failed requests remain
// retryable when the reader selects or hovers the article again.
const previewShardPromises = new Map<string, Promise<Record<string, LinkPreview>>>();

export function loadLinkPreviews(href: string): Promise<Record<string, LinkPreview>> {
  const domain = shardDomainForHref(href);
  if (!domain) return Promise.resolve({});
  let promise = previewShardPromises.get(domain);
  if (!promise) {
    promise = fetch(`/link-previews/${domain}.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Preview shard unavailable");
        return response.json();
      })
      .catch(() => {
        previewShardPromises.delete(domain);
        return {};
      });
    previewShardPromises.set(domain, promise);
  }
  return promise;
}
