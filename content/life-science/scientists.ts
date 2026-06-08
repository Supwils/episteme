import type { Scientist } from "./types";

export const KEY_SCIENTISTS: Scientist[] = [
  {
    id: "darwin",
    name: { chinese: "达尔文", english: "Charles Darwin" },
    years: "1809-1882",
    nationality: "英国",
    contribution:
      "提出自然选择理论，奠定了现代进化生物学的基础。《物种起源》（1859年）彻底改变了人类对生命多样性的理解。",
    keyWork: "《物种起源》On the Origin of Species (1859)",
    quote: "There is grandeur in this view of life.",
  },
  {
    id: "wallace",
    name: { chinese: "华莱士", english: "Alfred Russel Wallace" },
    years: "1823-1913",
    nationality: "英国",
    contribution:
      "独立于达尔文提出自然选择理论。在东南亚的生物地理学研究中发现了「华莱士线」——亚洲和澳大利亚动物区系之间的分界线。",
    keyWork: "On the Tendency of Varieties to Depart Indefinitely from the Original Type (1858)",
  },
  {
    id: "mendel",
    name: { chinese: "孟德尔", english: "Gregor Mendel" },
    years: "1822-1884",
    nationality: "奥地利（摩拉维亚）",
    contribution:
      "通过豌豆杂交实验发现了遗传的基本规律（分离定律和自由组合定律），被誉为「遗传学之父」。",
    keyWork: "Versuche über Pflanzenhybriden (1866)",
    quote: "我的时代一定会到来。",
  },
  {
    id: "huxley",
    name: { chinese: "赫胥黎", english: "Thomas Henry Huxley" },
    years: "1825-1895",
    nationality: "英国",
    contribution:
      "达尔文最坚定的支持者之一，被称为「达尔文的斗牛犬」。在1860年牛津辩论中有力地捍卫了进化论。创造了「不可知论」一词。",
    keyWork: "Evidence as to Man's Place in Nature (1863)",
  },
  {
    id: "margulis",
    name: { chinese: "马古利斯", english: "Lynn Margulis" },
    years: "1938-2011",
    nationality: "美国",
    contribution:
      "提出内共生理论——线粒体和叶绿体曾经是自由生活的细菌。这一假说被拒稿超过15次，最终被分子生物学证据完全证实。",
    keyWork: "On the Origin of Mitosing Cells (1967)",
    quote: "生命不是通过战斗征服地球的，而是通过结盟。",
  },
  {
    id: "gould",
    name: { chinese: "古尔德", english: "Stephen Jay Gould" },
    years: "1941-2002",
    nationality: "美国",
    contribution:
      "与Niles Eldredge共同提出「间断平衡」理论——进化不是匀速的，而是长期稳定与短期爆发交替出现。擅长科学普及写作。",
    keyWork: "Punctuated Equilibria (1972)、Wonderful Life (1989)",
    quote: "进化是一棵灌木，不是一棵梯子。",
  },
  {
    id: "oparin",
    name: { chinese: "奥巴林", english: "Alexander Oparin" },
    years: "1894-1980",
    nationality: "苏联",
    contribution:
      "提出生命起源的「原始汤」假说——在早期地球的还原性大气中，有机分子可以在紫外线和闪电的驱动下自发合成。",
    keyWork: "The Origin of Life (1924)",
  },
  {
    id: "miller",
    name: { chinese: "米勒", english: "Stanley Miller" },
    years: "1930-2007",
    nationality: "美国",
    contribution:
      "在Harold Urey指导下进行了著名的米勒-尤里实验（1953年），首次在实验室中模拟了前生命化学条件下的有机分子合成。",
    keyWork: "A Production of Amino Acids under Possible Primitive Earth Conditions (1953)",
  },
  {
    id: "cech",
    name: { chinese: "切赫", english: "Thomas Cech" },
    years: "1947-",
    nationality: "美国",
    contribution:
      "发现核酶（ribozyme）——RNA可以催化化学反应。这一发现为RNA世界假说提供了关键支持。1989年获诺贝尔化学奖。",
    keyWork: "Self-splicing RNA in Tetrahymena (1982)",
  },
  {
    id: "sutherland",
    name: { chinese: "萨瑟兰", english: "John Sutherland" },
    years: "1962-",
    nationality: "英国",
    contribution:
      "2009年证明核糖核苷酸可以在前生命条件下一锅合成——无需逐步组装。被称为「化学进化的里程碑」。",
    keyWork: "Synthesis of activated pyrimidine ribonucleotides (2009)",
  },
  {
    id: "wiemann",
    name: { chinese: "维曼", english: "Jasmina Wiemann" },
    years: "1993-",
    nationality: "德国/美国",
    contribution:
      "2022年通过分析恐龙骨骼化石中的分子标志物，证明恐龙是中温（内温）动物——颠覆了恐龙是冷血动物的传统观点。",
    keyWork: "Fossil biomolecules reveal avian metabolism in ancestral dinosaur (2022)",
  },
  {
    id: "shubin",
    name: { chinese: "舒宾", english: "Neil Shubin" },
    years: "1960-",
    nationality: "美国",
    contribution:
      "2004年在加拿大北极发现了提塔利克鱼（Tiktaalik）——从鱼到四足动物的关键过渡化石。根据进化论预测化石位置的典范。",
    keyWork: "Your Inner Fish (2008)",
    quote: "我们的身体是一部进化史的档案。",
  },
  {
    id: "paabo",
    name: { chinese: "帕博", english: "Svante Pääbo" },
    years: "1955-",
    nationality: "瑞典",
    contribution:
      "古基因组学的开创者。完成了尼安德特人基因组测序，发现了丹尼索瓦人。2022年获诺贝尔生理学或医学奖。",
    keyWork: "Neanderthal Man: In Search of Lost Genomes (2014)",
    quote: "我们不是纯粹的智人——我们的基因组中流淌着古老近亲的血液。",
  },
  {
    id: "woese",
    name: { chinese: "沃斯", english: "Carl Woese" },
    years: "1928-2012",
    nationality: "美国",
    contribution:
      "通过16S rRNA测序发现了古菌域（Archaea），将生命从两域（细菌、真核）改为三域系统。彻底改变了我们对生命树的理解。",
    keyWork: "Towards a natural system of organisms (1990)",
  },
  {
    id: "walcott",
    name: { chinese: "沃尔科特", english: "Charles Doolittle Walcott" },
    years: "1850-1927",
    nationality: "美国",
    contribution:
      "1909年在加拿大不列颠哥伦比亚省发现了伯吉斯页岩化石库——寒武纪大爆发最著名的化石证据。",
    keyWork: "Cambrian Geology and Paleontology (1910-1924)",
  },
  {
    id: "hou-xianguang",
    name: { chinese: "侯先光", english: "Xian-Guang Hou" },
    years: "1949-",
    nationality: "中国",
    contribution:
      "1984年在云南澄江帽天山发现了澄江生物群——寒武纪大爆发最精美的化石库之一。2012年澄江化石群被列入世界遗产。",
    keyWork: "Early Cambrian arthropods from Chengjiang (1984-)",
  },
  {
    id: "youyou",
    name: { chinese: "屠呦呦", english: "Tu Youyou" },
    years: "1930-",
    nationality: "中国",
    contribution:
      "从传统中药青蒿中提取了青蒿素——治疗疟疾的特效药。2015年获诺贝尔生理学或医学奖。这是传统知识与现代科学结合的典范。",
    keyWork: "青蒿素的发现（1972年提取）",
    quote: "青蒿素是中医药献给世界的礼物。",
  },
  {
    id: "li-shizhen",
    name: { chinese: "李时珍", english: "Li Shizhen" },
    years: "1518-1593",
    nationality: "中国（明朝）",
    contribution:
      "编写《本草纲目》（1578年完成），收录1892种药物和11096个药方。对动植物的分类和描述达到了当时世界的最高水平。",
    keyWork: "《本草纲目》(Compendium of Materia Medica, 1578)",
  },
  {
    id: "lamarck",
    name: { chinese: "拉马克", english: "Jean-Baptiste Lamarck" },
    years: "1744-1829",
    nationality: "法国",
    contribution:
      "第一个提出系统性进化理论的科学家——虽然「获得性遗传」是错的，但他首次明确提出物种可变和共同祖先的概念。",
    keyWork: "Philosophie Zoologique (1809)",
  },
  {
    id: "hennig",
    name: { chinese: "亨尼希", english: "Willi Hennig" },
    years: "1913-1976",
    nationality: "德国",
    contribution:
      "创立了支序分类学（cladistics）——用共同衍征来确定物种间的亲缘关系。彻底改变了系统分类学的方法论。",
    keyWork: "Grundzüge einer Theorie der phylogenetischen Systematik (1950)",
  },
  {
    id: "ostrom",
    name: { chinese: "奥斯特罗姆", english: "John Ostrom" },
    years: "1928-2005",
    nationality: "美国",
    contribution:
      "1969年描述了恐爪龙（Deinonychus），彻底改变了古生物学对恐龙的认知——恐龙是活跃的、温血的、敏捷的动物。重新提出鸟类起源假说。",
    keyWork: "Osteology of Deinonychus antirrhopus (1969)",
  },
  {
    id: "brunet",
    name: { chinese: "布吕内", english: "Michel Brunet" },
    years: "1940-",
    nationality: "法国",
    contribution:
      "2001年在乍得发现了Sahelanthropus tchadensis（托迈）——目前已知最接近人猿分化点的化石，将人类谱系的起源推到了约700万年前。",
    keyWork: "A new homid from the Upper Miocene of Chad (2002)",
  },
  {
    id: "li-chengsen",
    name: { chinese: "李承森", english: "Li Cheng-Sen" },
    years: "1939-",
    nationality: "中国",
    contribution:
      "中国古植物学的奠基人之一。对东亚地区古植物学和植物系统发育做出了重要贡献。",
    keyWork: "中国古植物学相关著作",
  },
];
