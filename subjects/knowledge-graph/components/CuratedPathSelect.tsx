import type { CuratedLearningPath } from "../data/curated-learning-paths";

type CuratedPathSelectProps = {
  paths: readonly CuratedLearningPath[];
  value: string | null;
  onChange: (pathId: string | null) => void;
  isMobile: boolean;
};

export function CuratedPathSelect({ paths, value, onChange, isMobile }: CuratedPathSelectProps) {
  const crossDomainPaths = paths.filter((path) => path.scope !== "domain-spine");
  const overviewPaths = crossDomainPaths.slice(0, 6);
  const topicPaths = crossDomainPaths.slice(6);
  const domainSpines = paths.filter((path) => path.scope === "domain-spine");

  return (
    <label className="text-white/45">
      <span className="sr-only">规范知识路径</span>
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value || null)}
        aria-label="规范知识路径"
        className="h-8 max-w-[190px] border border-white/[0.06] bg-[#111118] px-2 text-xs text-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/70"
      >
        <option value="">{isMobile ? "选择知识路径" : "规范路径：自由探索"}</option>
        <optgroup label="六条全景主线">
          {overviewPaths.map((path) => (
            <option key={path.id} value={path.id}>
              {path.title}
            </option>
          ))}
        </optgroup>
        <optgroup label="跨学科专题主干">
          {topicPaths.map((path) => (
            <option key={path.id} value={path.id}>
              {path.title}
            </option>
          ))}
        </optgroup>
        {domainSpines.length > 0 && (
          <optgroup label="学科五级主干">
            {domainSpines.map((path) => (
              <option key={path.id} value={path.id}>
                {path.title}
              </option>
            ))}
          </optgroup>
        )}
      </select>
    </label>
  );
}
