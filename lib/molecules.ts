/**
 * Curated gallery of real macromolecular structures from the RCSB Protein Data
 * Bank. Every entry is an experimentally-determined structure (X-ray / cryo-EM),
 * not an AI-generated or artistic model — accuracy is the point. Rendered on
 * demand by components/molecule/MoleculeViewer via the CDN-loaded Mol* viewer.
 */
export type Molecule = {
  pdbId: string;
  title: string;
  titleEn: string;
  /** One-paragraph plain-language explanation. */
  blurb: string;
  /** Why this structure matters historically/scientifically. */
  significance: string;
  /** Domain tag for grouping/colour. */
  domain: "medicine" | "life-science" | "physics" | "chemistry";
  tags: string[];
  /** Optional in-platform article this molecule illustrates. */
  relatedHref?: string;
  relatedLabel?: string;
};

export const MOLECULES: Molecule[] = [
  {
    pdbId: "1MBN",
    title: "肌红蛋白",
    titleEn: "Myoglobin",
    blurb:
      "肌肉里储存氧的蛋白。它是人类破解的第一个蛋白质三维结构——1958 年由 Kendrew 用 X 射线晶体学测定，第一次让人「看见」了蛋白质折叠的真实样子。",
    significance:
      "史上第一个被解出的蛋白质结构，开创了结构生物学。Kendrew 因此获 1962 年诺贝尔化学奖。",
    domain: "life-science",
    tags: ["结构生物学", "血红素", "氧"],
    relatedHref: "/life-science/knowledge-base/分子生物学--蛋白质折叠",
    relatedLabel: "蛋白质折叠",
  },
  {
    pdbId: "1LYZ",
    title: "溶菌酶",
    titleEn: "Lysozyme",
    blurb:
      "一种能切开细菌细胞壁的酶，存在于眼泪和唾液里，是人体的天然抗菌武器。它是第一个被解出结构的酶，让人类第一次看清酶如何精准地「咬住」底物。",
    significance: "第一个被测定结构的酶（1965, Phillips），奠定了「结构决定催化机制」的认识。",
    domain: "life-science",
    tags: ["酶", "催化", "抗菌"],
    relatedHref: "/medicine/concepts/immune-system",
    relatedLabel: "免疫系统",
  },
  {
    pdbId: "4INS",
    title: "胰岛素",
    titleEn: "Insulin",
    blurb:
      "调节血糖的激素。糖尿病患者注射的正是它。这个经典的「2 锌胰岛素」结构展示了两条肽链如何由二硫键缝合、再围绕锌离子组装成六聚体。",
    significance:
      "胰岛素是第一个被测序的蛋白质，也是首个大规模重组生产的药物——现代生物制药的开端。",
    domain: "medicine",
    tags: ["激素", "糖尿病", "血糖"],
    relatedHref: "/medicine/diseases/diabetes",
    relatedLabel: "糖尿病",
  },
  {
    pdbId: "1HHO",
    title: "血红蛋白",
    titleEn: "Hemoglobin",
    blurb:
      "红细胞里运氧的蛋白，让血液变红。四个亚基协同工作：结合一个氧分子会让其余位点更易结合氧——这种「协同效应」是分子如何「放大信号」的教科书范例。",
    significance: "协同别构调控的典范；镰刀型贫血等血红蛋白病揭示了「一个氨基酸之差」如何致病。",
    domain: "medicine",
    tags: ["氧运输", "别构", "血液"],
    relatedHref: "/medicine/diseases/cardiovascular-disease",
    relatedLabel: "心血管疾病",
  },
  {
    pdbId: "1BNA",
    title: "DNA 双螺旋",
    titleEn: "B-DNA Dodecamer",
    blurb:
      "遗传信息的载体。这是著名的 Dickerson 十二聚体——第一个高分辨率的 B 型 DNA 晶体结构，让 Watson-Crick 提出的双螺旋从模型变成了可测量的真实坐标。",
    significance: "首个原子级 B-DNA 结构，证实并精化了双螺旋模型，是分子生物学的基石。",
    domain: "life-science",
    tags: ["DNA", "双螺旋", "遗传"],
    relatedHref: "/medicine/technologies/crispr-gene-editing",
    relatedLabel: "CRISPR 基因编辑",
  },
  {
    pdbId: "6VSB",
    title: "新冠病毒刺突蛋白",
    titleEn: "SARS-CoV-2 Spike",
    blurb:
      "新冠病毒表面那根「钉子」，负责撬开人体细胞的 ACE2 受体入侵。这个 2020 年初解出的预融合构象结构，直接成了 mRNA 疫苗的设计蓝图。",
    significance: "疫情爆发数周内即被冷冻电镜解出，加速了 mRNA 疫苗研发——结构生物学救命的实例。",
    domain: "medicine",
    tags: ["新冠", "疫苗", "冷冻电镜"],
    relatedHref: "/medicine/diseases/covid-19",
    relatedLabel: "COVID-19",
  },
  {
    pdbId: "1EMA",
    title: "绿色荧光蛋白",
    titleEn: "Green Fluorescent Protein (GFP)",
    blurb:
      "来自水母、会发绿光的蛋白。它的「桶状」结构里藏着一个能自发成熟的发色团。如今它是生命科学最常用的「分子灯泡」，让研究者点亮活细胞里的任意蛋白。",
    significance: "彻底改变了生物成像；Shimomura、Chalfie、Tsien 因 GFP 获 2008 年诺贝尔化学奖。",
    domain: "life-science",
    tags: ["荧光", "成像", "生物技术"],
  },
  {
    pdbId: "1IGT",
    title: "抗体（免疫球蛋白 G）",
    titleEn: "Antibody (IgG)",
    blurb:
      "免疫系统的「制导导弹」。这个 Y 形分子的两个「臂」末端能识别并结合特定抗原，是疫苗保护、单克隆抗体药物与免疫疗法的分子基础。",
    significance: "Y 形结构解释了抗体如何既特异识别抗原、又招募免疫效应——现代抗体药物的设计起点。",
    domain: "medicine",
    tags: ["抗体", "免疫", "疫苗"],
    relatedHref: "/medicine/concepts/vaccination",
    relatedLabel: "疫苗原理",
  },
];

export const MOLECULE_DOMAIN_ACCENT: Record<Molecule["domain"], string> = {
  medicine: "#d9544d",
  "life-science": "#5b9e52",
  physics: "#6a6fd0",
  chemistry: "#e08a3c",
};

export const MOLECULE_DOMAIN_LABEL: Record<Molecule["domain"], string> = {
  medicine: "医学",
  "life-science": "生命科学",
  physics: "物理",
  chemistry: "化学",
};
