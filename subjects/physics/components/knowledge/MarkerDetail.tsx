import type { SceneMarker } from "@/subjects/physics/lib/content";
import { DataCard } from "./DataCard";

export function MarkerDetail({ marker }: { marker: SceneMarker }) {
  return (
    <section aria-label={`${marker.name.primary}详情`} className="flex flex-col gap-4">
      <header>
        <p className="text-accent-cool mb-2 font-mono text-xs">天体与主题 · 详情</p>
        <h2 className="text-fg-primary text-3xl leading-tight">{marker.name.primary}</h2>
        <p className="text-fg-muted mt-2 text-sm">{marker.name.latin}</p>
      </header>
      <p className="text-fg-secondary text-base leading-relaxed">{marker.description}</p>
      {marker.data?.length ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {marker.data.map((card) => (
            <DataCard key={card.label} card={card} />
          ))}
        </div>
      ) : null}
      <p className="text-fg-muted border-fg-disabled/25 border-b pb-5 text-xs">
        下方图册提供本层背景、相关阅读与资料来源。
      </p>
    </section>
  );
}
