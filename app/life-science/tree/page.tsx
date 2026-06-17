import type { Metadata } from "next";
import Link from "next/link";
import { FadeInSection } from "@/components/FadeInSection";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { PhylogeneticTree } from "@/subjects/life-science/components/PhylogeneticTree";
import { TREE_OF_LIFE } from "@/subjects/life-science/lib/tree-data";

export const metadata: Metadata = {
  title: "生命之树 — Episteme · 格致",
  description: "从最后共同祖先（LUCA）到所有现存物种的系统发育关系",
  openGraph: {
    title: "生命之树 — Episteme · 格致",
    description: "从最后共同祖先（LUCA）到所有现存物种的系统发育关系",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "生命之树 — Episteme · 格致",
    description: "从最后共同祖先（LUCA）到所有现存物种的系统发育关系",
  },
};

const DOMAINS = [
  {
    id: "bacteria",
    name: "细菌域",
    latin: "Bacteria",
    description: "地球上最古老、最丰富的生命形式。从土壤到深海，无处不在。",
    branches: ["变形菌门", "厚壁菌门", "放线菌门", "蓝藻门", "拟杆菌门"],
    accent: "#e06c75",
    speciesCount: "数百万种",
  },
  {
    id: "archaea",
    name: "古菌域",
    latin: "Archaea",
    description: "在极端环境中繁盛的微生物，与真核生物的亲缘关系比细菌更近。",
    branches: ["广古菌门", "泉古菌门", "奇古菌门", "洛基古菌"],
    accent: "#c678dd",
    speciesCount: "数千种",
  },
  {
    id: "eukaryota",
    name: "真核生物域",
    latin: "Eukarya",
    description: "拥有细胞核和膜结合细胞器的生命，包括所有多细胞生物。",
    branches: ["原生生物", "真菌界", "植物界", "动物界"],
    accent: "#4a9e6f",
    speciesCount: "数百万种",
  },
] as const;

const ANIMAL_KINGDOM = [
  { name: "海绵动物", latin: "Porifera", branch: "最早的多细胞动物分支", accent: "#d19a66" },
  { name: "刺胞动物", latin: "Cnidaria", branch: "水母、珊瑚、海葵", accent: "#d19a66" },
  {
    name: "节肢动物",
    latin: "Arthropoda",
    branch: "昆虫、甲壳类、蛛形纲——物种数最多的门",
    accent: "#98c379",
  },
  {
    name: "软体动物",
    latin: "Mollusca",
    branch: "章鱼、蜗牛、蛤蜊——海洋中的智慧生命",
    accent: "#98c379",
  },
  {
    name: "棘皮动物",
    latin: "Echinodermata",
    branch: "海星、海胆——五辐对称的海洋生物",
    accent: "#5a9ad8",
  },
  {
    name: "脊索动物",
    latin: "Chordata",
    branch: "鱼类、两栖类、爬行类、鸟类、哺乳类",
    accent: "#c8a45a",
  },
] as const;

const PLANT_KINGDOM = [
  {
    name: "苔藓植物",
    latin: "Bryophyta",
    branch: "最早登陆的植物后代，无维管束",
    accent: "#2d6b45",
  },
  {
    name: "蕨类植物",
    latin: "Pteridophyta",
    branch: "石炭纪森林的主角，用孢子繁殖",
    accent: "#4a9e6f",
  },
  {
    name: "裸子植物",
    latin: "Gymnospermae",
    branch: "松柏、银杏——用种子征服陆地",
    accent: "#5cb87a",
  },
  {
    name: "被子植物",
    latin: "Angiospermae",
    branch: "开花植物——地球植被的统治者",
    accent: "#5ec488",
  },
] as const;

export default function TreePage() {
  return (
    <div className="w-full px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
      <header className="mb-16">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          life science / phylogenetic tree
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          生命<em className="text-accent-green italic"> 之树</em>
        </h1>
        <p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed">
          从最后共同祖先（LUCA）出发，所有生命共享同一棵演化之树
        </p>
      </header>

      <FadeInSection className="mb-16">
        <h2 className="font-display text-fg-primary mb-2 text-xl font-semibold">
          LUCA — 最后共同祖先
        </h2>
        <p className="text-fg-secondary mb-8 max-w-2xl text-sm leading-relaxed">
          所有现存生命的最后共同祖先（Last Universal Common Ancestor），约 35—40
          亿年前生活在深海热泉附近。 它已经拥有 DNA、RNA 和蛋白质的基本分子机制。
        </p>
        <div className="info-card info-card-green">
          <div className="info-card-title">三域分类系统</div>
          <p className="text-fg-secondary text-sm leading-relaxed">
            卡尔·乌斯（Carl Woese）在 1977 年基于 rRNA
            序列分析，将生命分为三个域：细菌、古菌和真核生物。
            这一革命性的分类彻底改变了我们对生命演化树的理解。
          </p>
        </div>
      </FadeInSection>

      <FadeInSection className="mb-16">
        <p className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase">
          交互式系统发育树 · interactive phylogenetic tree
        </p>
        <PhylogeneticTree data={TREE_OF_LIFE} />
      </FadeInSection>

      <FadeInSection className="mb-16">
        <p className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase">
          三域系统 · three domains
        </p>
        <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {DOMAINS.map((domain) => (
            <StaggerItem key={domain.latin}>
              <Link
                href={`/life-science/tree/${domain.id}`}
                className="group border-border-faint bg-bg-near hover:bg-bg-elevated block border p-6 transition-all duration-500 hover:shadow-[0_0_40px_-12px_rgba(74,158,111,0.12)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] tracking-[0.32em] uppercase"
                    style={{ color: domain.accent }}
                  >
                    {domain.latin}
                  </span>
                  <span className="text-fg-disabled font-mono text-[9px]">
                    {domain.speciesCount}
                  </span>
                </div>
                <h3 className="font-display text-fg-primary group-hover:text-accent-green mb-2 text-xl font-semibold transition-colors duration-300">
                  {domain.name}
                </h3>
                <p className="text-fg-secondary mb-4 text-sm leading-relaxed">
                  {domain.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {domain.branches.map((b) => (
                    <span
                      key={b}
                      className="border-fg-disabled/30 text-fg-muted border px-2 py-0.5 font-mono text-[9px] tracking-[0.18em]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </FadeInSection>

      <FadeInSection className="mb-16">
        <p className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase">
          动物界主要门类 · animal phyla
        </p>
        <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ANIMAL_KINGDOM.map((phylum) => (
            <StaggerItem key={phylum.latin}>
              <div className="group border-border-faint bg-bg-near hover:bg-bg-elevated border p-5 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(74,158,111,0.1)]">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-display text-fg-primary group-hover:text-accent-green text-base font-semibold transition-colors duration-300">
                    {phylum.name}
                  </h3>
                  <span className="text-fg-disabled font-mono text-[9px] italic">
                    {phylum.latin}
                  </span>
                </div>
                <p className="text-fg-secondary text-sm leading-relaxed">{phylum.branch}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </FadeInSection>

      <FadeInSection className="mb-16">
        <p className="text-fg-muted mb-8 font-mono text-[10px] tracking-[0.38em] uppercase">
          植物界主要类群 · plant groups
        </p>
        <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANT_KINGDOM.map((group) => (
            <StaggerItem key={group.latin}>
              <div className="group border-border-faint bg-bg-near hover:bg-bg-elevated border p-5 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(74,158,111,0.1)]">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-display text-fg-primary group-hover:text-accent-green text-base font-semibold transition-colors duration-300">
                    {group.name}
                  </h3>
                  <span className="text-fg-disabled font-mono text-[9px] italic">
                    {group.latin}
                  </span>
                </div>
                <p className="text-fg-secondary text-sm leading-relaxed">{group.branch}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </FadeInSection>
    </div>
  );
}
