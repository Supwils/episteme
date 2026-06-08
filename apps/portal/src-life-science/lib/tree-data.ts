import type { PhylogeneticNode } from "./types";
import type { DeepReadingProps } from "../components/DeepReading";
import { PHYLOGENETIC_COLORS } from "./constants";

export type DomainPhylum = {
  name: string;
  nameEn: string;
  description: string;
  representativeSpeciesIds: string[];
};

export type DomainData = {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  accent: string;
  characteristics: string[];
  keyPhyla: DomainPhylum[];
  representativeSpeciesIds: string[];
  evolutionarySignificance: string;
  deepReading: DeepReadingProps;
};

export const TREE_OF_LIFE: PhylogeneticNode = {
  id: "luca",
  name: "LUCA",
  nameEn: "Last Universal Common Ancestor",
  color: "#e8e8f0",
  divergenceMYA: 3800,
  children: [
    {
      id: "bacteria",
      name: "细菌域",
      nameEn: "Bacteria",
      color: PHYLOGENETIC_COLORS.bacteria,
      divergenceMYA: 3500,
      speciesCount: 1_000_000,
      children: [
        {
          id: "proteobacteria",
          name: "变形菌门",
          nameEn: "Proteobacteria",
          color: "#528bcc",
          divergenceMYA: 2800,
          speciesCount: 400_000,
          children: [
            { id: "alphaproteobacteria", name: "α-变形菌纲", nameEn: "Alphaproteobacteria", color: "#4a7db8", divergenceMYA: 2500, speciesCount: 150_000 },
            { id: "gammaproteobacteria", name: "γ-变形菌纲", nameEn: "Gammaproteobacteria", color: "#5a9ad8", divergenceMYA: 2500, speciesCount: 200_000 },
          ],
        },
        {
          id: "firmicutes",
          name: "厚壁菌门",
          nameEn: "Firmicutes",
          color: "#61a8e8",
          divergenceMYA: 2800,
          speciesCount: 300_000,
        },
        {
          id: "cyanobacteria",
          name: "蓝藻门",
          nameEn: "Cyanobacteria",
          color: "#72b5f0",
          divergenceMYA: 2700,
          speciesCount: 50_000,
        },
        {
          id: "actinobacteria",
          name: "放线菌门",
          nameEn: "Actinobacteria",
          color: "#82c0f5",
          divergenceMYA: 2500,
          speciesCount: 100_000,
        },
      ],
    },
    {
      id: "archaea",
      name: "古菌域",
      nameEn: "Archaea",
      color: PHYLOGENETIC_COLORS.archaea,
      divergenceMYA: 3500,
      speciesCount: 5_000,
      children: [
        {
          id: "euryarchaeota",
          name: "广古菌门",
          nameEn: "Euryarchaeota",
          color: "#b86cc0",
          divergenceMYA: 3000,
          speciesCount: 2_000,
        },
        {
          id: "crenarchaeota",
          name: "泉古菌门",
          nameEn: "Crenarchaeota",
          color: "#c97dd0",
          divergenceMYA: 2800,
          speciesCount: 1_500,
        },
        {
          id: "lokiarchaeota",
          name: "洛基古菌",
          nameEn: "Lokiarchaeota",
          color: "#d98ee0",
          divergenceMYA: 2000,
          speciesCount: 50,
        },
      ],
    },
    {
      id: "eukaryota",
      name: "真核生物域",
      nameEn: "Eukarya",
      color: PHYLOGENETIC_COLORS.eukaryota,
      divergenceMYA: 2000,
      speciesCount: 8_000_000,
      children: [
        {
          id: "protists",
          name: "原生生物",
          nameEn: "Protista",
          color: "#d4b050",
          divergenceMYA: 1800,
          speciesCount: 200_000,
        },
        {
          id: "fungi",
          name: "真菌界",
          nameEn: "Fungi",
          color: PHYLOGENETIC_COLORS.fungi,
          divergenceMYA: 1500,
          speciesCount: 150_000,
          children: [
            { id: "ascomycota", name: "子囊菌门", nameEn: "Ascomycota", color: "#8ab86a", divergenceMYA: 900, speciesCount: 64_000 },
            { id: "basidiomycota", name: "担子菌门", nameEn: "Basidiomycota", color: "#9cc87a", divergenceMYA: 900, speciesCount: 32_000 },
          ],
        },
        {
          id: "plants",
          name: "植物界",
          nameEn: "Plantae",
          color: PHYLOGENETIC_COLORS.plants,
          divergenceMYA: 1500,
          speciesCount: 400_000,
          children: [
            {
              id: "bryophytes",
              name: "苔藓植物",
              nameEn: "Bryophyta",
              color: "#5a8a6f",
              divergenceMYA: 480,
              speciesCount: 20_000,
            },
            {
              id: "ferns",
              name: "蕨类植物",
              nameEn: "Pteridophyta",
              color: "#6a9a7f",
              divergenceMYA: 400,
              speciesCount: 15_000,
            },
            {
              id: "gymnosperms",
              name: "裸子植物",
              nameEn: "Gymnospermae",
              color: "#7aaa8f",
              divergenceMYA: 310,
              speciesCount: 1_000,
            },
            {
              id: "angiosperms",
              name: "被子植物",
              nameEn: "Angiospermae",
              color: "#8aba9f",
              divergenceMYA: 140,
              speciesCount: 300_000,
            },
          ],
        },
        {
          id: "animals",
          name: "动物界",
          nameEn: "Animalia",
          color: PHYLOGENETIC_COLORS.animals,
          divergenceMYA: 800,
          speciesCount: 1_500_000,
          children: [
            {
              id: "invertebrates",
              name: "无脊椎动物",
              nameEn: "Invertebrata",
              color: "#c86a50",
              divergenceMYA: 700,
              speciesCount: 1_300_000,
              children: [
                { id: "porifera", name: "海绵动物", nameEn: "Porifera", color: "#b85a40", divergenceMYA: 600, speciesCount: 8_000 },
                { id: "cnidaria", name: "刺胞动物", nameEn: "Cnidaria", color: "#c06848", divergenceMYA: 600, speciesCount: 11_000 },
                { id: "arthropoda", name: "节肢动物", nameEn: "Arthropoda", color: "#c87650", divergenceMYA: 530, speciesCount: 1_200_000 },
                { id: "mollusca", name: "软体动物", nameEn: "Mollusca", color: "#d08458", divergenceMYA: 530, speciesCount: 85_000 },
              ],
            },
            {
              id: "vertebrates",
              name: "脊椎动物",
              nameEn: "Vertebrata",
              color: "#d88860",
              divergenceMYA: 500,
              speciesCount: 70_000,
              children: [
                { id: "fish", name: "鱼类", nameEn: "Pisces", color: "#c47a52", divergenceMYA: 480, speciesCount: 35_000 },
                {
                  id: "tetrapods",
                  name: "四足动物",
                  nameEn: "Tetrapoda",
                  color: "#d49068",
                  divergenceMYA: 370,
                  speciesCount: 35_000,
                  children: [
                    { id: "amphibians", name: "两栖类", nameEn: "Amphibia", color: "#c08060", divergenceMYA: 370, speciesCount: 8_000 },
                    {
                      id: "amniotes",
                      name: "羊膜动物",
                      nameEn: "Amniota",
                      color: "#d09870",
                      divergenceMYA: 310,
                      speciesCount: 27_000,
                      children: [
                        {
                          id: "reptiles",
                          name: "爬行类",
                          nameEn: "Reptilia",
                          color: "#98c379",
                          divergenceMYA: 310,
                          speciesCount: 11_000,
                          children: [
                            { id: "squamata", name: "有鳞目", nameEn: "Squamata", color: "#88b369", divergenceMYA: 200, speciesCount: 10_000 },
                            { id: "testudines", name: "龟鳖目", nameEn: "Testudines", color: "#78a359", divergenceMYA: 220, speciesCount: 350 },
                          ],
                        },
                        {
                          id: "birds",
                          name: "鸟类",
                          nameEn: "Aves",
                          color: "#61afef",
                          divergenceMYA: 160,
                          speciesCount: 10_000,
                          children: [
                            { id: "passeriformes", name: "雀形目", nameEn: "Passeriformes", color: "#51a0e0", divergenceMYA: 60, speciesCount: 6_000 },
                            { id: "raptors", name: "猛禽", nameEn: "Accipitriformes", color: "#4190d0", divergenceMYA: 60, speciesCount: 250 },
                          ],
                        },
                        {
                          id: "mammals",
                          name: "哺乳类",
                          nameEn: "Mammalia",
                          color: "#c8a45a",
                          divergenceMYA: 200,
                          speciesCount: 6_400,
                          children: [
                            { id: "monotremes", name: "单孔目", nameEn: "Monotremata", color: "#b89440", divergenceMYA: 180, speciesCount: 5 },
                            { id: "marsupials", name: "有袋目", nameEn: "Marsupialia", color: "#c0a050", divergenceMYA: 160, speciesCount: 340 },
                            {
                              id: "placentals",
                              name: "胎盘类",
                              nameEn: "Placentalia",
                              color: "#d0b060",
                              divergenceMYA: 100,
                              speciesCount: 6_000,
                              children: [
                                { id: "rodents", name: "啮齿目", nameEn: "Rodentia", color: "#b8a050", divergenceMYA: 66, speciesCount: 2_500 },
                                { id: "cetaceans", name: "鲸偶蹄目", nameEn: "Cetartiodactyla", color: "#c0a858", divergenceMYA: 60, speciesCount: 330 },
                                { id: "carnivora", name: "食肉目", nameEn: "Carnivora", color: "#c8b060", divergenceMYA: 55, speciesCount: 290 },
                                {
                                  id: "primates",
                                  name: "灵长目",
                                  nameEn: "Primates",
                                  color: "#e5c07b",
                                  divergenceMYA: 65,
                                  speciesCount: 500,
                                  children: [
                                    { id: "strepsirrhini", name: "原猴亚目", nameEn: "Strepsirrhini", color: "#d5b06b", divergenceMYA: 55, speciesCount: 110 },
                                    {
                                      id: "haplorhini",
                                      name: "简鼻亚目",
                                      nameEn: "Haplorhini",
                                      color: "#e0c080",
                                      divergenceMYA: 40,
                                      speciesCount: 390,
                                      children: [
                                        { id: "new-world-monkeys", name: "阔鼻猴", nameEn: "Platyrrhini", color: "#d0b070", divergenceMYA: 35, speciesCount: 160 },
                                        {
                                          id: "catarrhini",
                                          name: "狭鼻猴",
                                          nameEn: "Catarrhini",
                                          color: "#e0c890",
                                          divergenceMYA: 25,
                                          speciesCount: 230,
                                          children: [
                                            { id: "cercopithecidae", name: "猴科", nameEn: "Cercopithecidae", color: "#d0b880", divergenceMYA: 20, speciesCount: 160 },
                                            {
                                              id: "hominoids",
                                              name: "人猿总科",
                                              nameEn: "Hominoidea",
                                              color: "#f0d8a0",
                                              divergenceMYA: 15,
                                              speciesCount: 28,
                                              children: [
                                                { id: "hylobatidae", name: "长臂猿科", nameEn: "Hylobatidae", color: "#e0c890", divergenceMYA: 12, speciesCount: 20 },
                                                {
                                                  id: "hominidae",
                                                  name: "人科",
                                                  nameEn: "Hominidae",
                                                  color: "#ffe8b0",
                                                  divergenceMYA: 8,
                                                  speciesCount: 8,
                                                  children: [
                                                    { id: "homininae", name: "人亚科", nameEn: "Homininae", color: "#f0d8a0", divergenceMYA: 6, speciesCount: 4 },
                                                    { id: "ponginae", name: "猩猩亚科", nameEn: "Ponginae", color: "#e0c890", divergenceMYA: 12, speciesCount: 3 },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                                { id: "chiroptera", name: "翼手目", nameEn: "Chiroptera", color: "#d0b868", divergenceMYA: 55, speciesCount: 1_400 },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const DOMAINS: DomainData[] = [
  {
    id: "bacteria",
    name: "细菌域",
    nameEn: "Bacteria",
    description: "地球上最古老、最丰富的生命形式，从土壤到深海无处不在。细菌是最简单的原核生物，没有细胞核和膜结合细胞器，但拥有极其多样的代谢能力。",
    accent: "#61afef",
    characteristics: [
      "原核细胞结构，无细胞核",
      "多样的代谢方式：光合作用、化能合成、异养",
      "二分裂繁殖，速度极快",
      "存在于几乎所有环境中，包括极端环境",
      "与人类健康和生态系统密切相关",
      "拥有环形 DNA 和核糖体",
    ],
    keyPhyla: [
      {
        name: "变形菌门",
        nameEn: "Proteobacteria",
        description: "最大的细菌门类，包括大肠杆菌、根瘤菌等重要物种",
        representativeSpeciesIds: ["e-coli"],
      },
      {
        name: "厚壁菌门",
        nameEn: "Firmicutes",
        description: "包括乳酸菌、梭菌等，与人类肠道健康密切相关",
        representativeSpeciesIds: [],
      },
      {
        name: "蓝藻门",
        nameEn: "Cyanobacteria",
        description: "能进行光合作用的原核生物，引发了大氧化事件",
        representativeSpeciesIds: ["stromatolite"],
      },
      {
        name: "放线菌门",
        nameEn: "Actinobacteria",
        description: "产生多种抗生素的土壤细菌",
        representativeSpeciesIds: [],
      },
    ],
    representativeSpeciesIds: ["stromatolite", "e-coli"],
    evolutionarySignificance: "细菌是地球上最古老的生命形式之一，约35亿年前就已出现。它们通过光合作用释放氧气，彻底改变了地球大气的组成，为复杂生命的演化创造了条件。今天，细菌仍然是地球上数量最多、分布最广的生物类群。",
    deepReading: {
      introduction: "细菌是地球上最成功的生命形式。它们在35亿年的演化中发展出惊人的多样性，从深海热泉到平流层，从酸性矿泉到南极冰盖，几乎无处不在。",
      sections: [
        {
          title: "代谢多样性",
          content: [
            "细菌拥有地球上最丰富的代谢能力，包括光合作用、化能合成、固氮作用等。这些代谢途径不仅维持了细菌自身的生存，还为整个地球生态系统提供了基础。",
            "一些细菌能在极端环境中生存，如嗜热菌能在100°C以上的热泉中生长，嗜盐菌能在饱和盐溶液中繁殖。",
          ],
        },
      ],
      citations: [
        {
          id: "woese-1977",
          authors: "Woese, C.R. & Fox, G.E.",
          year: 1977,
          title: "Phylogenetic structure of the prokaryotic domains",
          journal: "PNAS",
        },
      ],
    },
  },
  {
    id: "archaea",
    name: "古菌域",
    nameEn: "Archaea",
    description: "在极端环境中繁盛的微生物，与真核生物的亲缘关系比细菌更近。古菌的细胞膜脂质结构独特，使它们能在高温、高盐、强酸等极端条件下生存。",
    accent: "#c678dd",
    characteristics: [
      "原核细胞结构，但分子机制更接近真核生物",
      "独特的细胞膜脂质（醚键连接）",
      "能在极端环境中生存（高温、高盐、强酸）",
      "拥有独特的 RNA 聚合酶",
      "参与全球碳循环和甲烷循环",
      "基因组中含有一些真核生物特有的基因",
    ],
    keyPhyla: [
      {
        name: "广古菌门",
        nameEn: "Euryarchaeota",
        description: "包括产甲烷古菌和嗜盐古菌，参与全球甲烷循环",
        representativeSpeciesIds: [],
      },
      {
        name: "泉古菌门",
        nameEn: "Crenarchaeota",
        description: "主要生活在高温环境中的嗜热古菌",
        representativeSpeciesIds: [],
      },
      {
        name: "洛基古菌",
        nameEn: "Lokiarchaeota",
        description: "2015年发现的古菌类群，被认为是真核生物最近的亲缘类群",
        representativeSpeciesIds: [],
      },
    ],
    representativeSpeciesIds: [],
    evolutionarySignificance: "古菌在生命演化中占据关键位置。分子系统发育学研究表明，真核生物很可能起源于古菌与细菌的共生关系。洛基古菌的发现为理解真核生物起源提供了重要线索。",
    deepReading: {
      introduction: "古菌是生命之树上最神秘的分支之一。它们在形态上与细菌相似，但在分子层面上却与真核生物更为接近，这一发现彻底改变了我们对生命演化的理解。",
      sections: [
        {
          title: "三域系统的建立",
          content: [
            "1977年，卡尔·乌斯通过比较 rRNA 序列发现，古菌在分子层面上与细菌存在显著差异，从而提出了三域分类系统。这一革命性的发现表明，生命之树并非简单的两分支结构。",
          ],
        },
      ],
      citations: [
        {
          id: "woese-1990",
          authors: "Woese, C.R. et al.",
          year: 1990,
          title: "Towards a natural system of organisms",
          journal: "PNAS",
        },
      ],
    },
  },
  {
    id: "eukaryota",
    name: "真核生物域",
    nameEn: "Eukarya",
    description: "拥有细胞核和膜结合细胞器的生命，包括所有多细胞生物。真核细胞的复杂内部结构使其能够发展出多细胞组织和器官系统。",
    accent: "#4a9e6f",
    characteristics: [
      "拥有明确的细胞核，DNA 与组蛋白结合",
      "膜结合细胞器：线粒体、内质网、高尔基体等",
      "有丝分裂和减数分裂",
      "细胞骨架系统发达",
      "能形成多细胞生物体",
      "基因含有内含子，需要 RNA 剪接",
    ],
    keyPhyla: [
      {
        name: "原生生物",
        nameEn: "Protista",
        description: "真核生物中最多样化的类群，包括藻类和原生动物",
        representativeSpeciesIds: [],
      },
      {
        name: "真菌界",
        nameEn: "Fungi",
        description: "分解者和共生者，在生态系统中扮演关键角色",
        representativeSpeciesIds: [],
      },
      {
        name: "植物界",
        nameEn: "Plantae",
        description: "光合作用的多细胞生物，是陆地生态系统的生产者",
        representativeSpeciesIds: ["cooksonia"],
      },
      {
        name: "动物界",
        nameEn: "Animalia",
        description: "异养的多细胞生物，拥有神经系统和运动能力",
        representativeSpeciesIds: ["trilobite", "anomalocaris"],
      },
    ],
    representativeSpeciesIds: ["cooksonia", "trilobite"],
    evolutionarySignificance: "真核生物的出现是生命演化史上的重大事件。内共生理论认为，线粒体和叶绿体分别起源于被吞噬的细菌和蓝藻。这一创新为多细胞生命的演化奠定了基础。",
    deepReading: {
      introduction: "真核生物的起源是生命史上最重大的创新事件之一。从简单的原核细胞到复杂的真核细胞，这一转变涉及细胞核、线粒体、内质网等多个关键结构的演化。",
      sections: [
        {
          title: "内共生理论",
          content: [
            "琳·马古利斯提出的内共生理论认为，线粒体起源于被α-变形菌吞噬后形成共生关系的细菌，叶绿体则起源于被吞噬的蓝藻。分子证据强力支持这一理论。",
          ],
        },
      ],
      citations: [
        {
          id: "margulis-1967",
          authors: "Margulis, L.",
          year: 1967,
          title: "On the origin of mitosing cells",
          journal: "Journal of Theoretical Biology",
        },
      ],
    },
  },
];

export function getAllDomains(): DomainData[] {
  return DOMAINS;
}

export function getDomainById(id: string): DomainData | undefined {
  return DOMAINS.find((d) => d.id === id);
}
