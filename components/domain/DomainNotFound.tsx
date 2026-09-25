import Link from "next/link";
import { SpecimenPlate } from "@/components/design/SpecimenPlate";
import { UnchartedSearch } from "@/components/chrome/UnchartedSearch";
import "@/components/chrome/states.css";

/**
 * 404（T-DESIGN-03g）：一张「未测绘区域」图版、一个预填了地址关键词的搜索框、
 * 三个去处。领域内的 404 把第一个去处留在当前领域，不把读者踢回门户。
 */
export function DomainNotFound({ homeHref, homeLabel }: { homeHref: string; homeLabel: string }) {
  const onPortal = homeHref === "/";
  const suggestions = [
    { href: homeHref, label: onPortal ? "回到首页" : `返回${homeLabel}` },
    onPortal
      ? { href: "/knowledge-graph", label: "打开知识图谱" }
      : { href: "/read", label: "看看阅读路线" },
    { href: "/random", label: "随机读一篇" },
  ];
  return (
    <div className="state-view">
      <SpecimenPlate domain="uncharted" className="state-view__plate" animate={false} />
      <h1 className="state-view__title">页面未找到</h1>
      <p className="state-view__body">
        这片区域还没有测绘：地址可能拼错了，或者文章换了位置。搜一搜，或者从下面三处继续。
      </p>
      <UnchartedSearch />
      <nav aria-label="继续去哪" className="state-view__actions">
        {suggestions.map((item) => (
          <Link key={item.href} href={item.href} className="state-view__action">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
