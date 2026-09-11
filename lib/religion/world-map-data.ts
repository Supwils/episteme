export type EpochId = "ancient" | "medieval" | "modern";

export type TraditionNode = {
  id: string;
  label: string;
  epoch: EpochId;
  region: string;
  note: string;
  href: string;
  hrefLabel: string;
  x: number;
  y: number;
};

export const EPOCH_LABELS: readonly { id: EpochId; label: string }[] = [
  { id: "ancient", label: "古代" },
  { id: "medieval", label: "中古" },
  { id: "modern", label: "现代" },
];

export const TRADITION_NODES: readonly TraditionNode[] = [
  {
    id: "vedic",
    label: "吠陀祭祀",
    epoch: "ancient",
    region: "南亚",
    note: "祭祀、颂诗与种姓职责写在可核的文本层里。创立传说和后来的神庙宗教要分开读。",
    href: "/religion/religious-history/axial-age-religions",
    hrefLabel: "轴心时代诸宗教",
    x: 252,
    y: 72,
  },
  {
    id: "hebrew",
    label: "希伯来圣经传统",
    epoch: "ancient",
    region: "西亚",
    note: "正典是逐步关闭的文本集合，不是一次颁布的全书。口传、抄本和译本会改「经」看起来像什么。",
    href: "/religion/texts-and-canons/scripture-and-canon",
    hrefLabel: "经典与正典",
    x: 186,
    y: 58,
  },
  {
    id: "han-ritual",
    label: "汉帝国郊祀",
    epoch: "ancient",
    region: "东亚",
    note: "郊祀、封禅是帝国礼制，和后来的佛道寺观不是同一套机构。位置在长安—洛阳的国家礼仪，不在村庙。",
    href: "/religion/religion-foundations/ritual-and-practice",
    hrefLabel: "仪式与实践",
    x: 292,
    y: 36,
  },
  {
    id: "islam",
    label: "早期伊斯兰共同体",
    epoch: "medieval",
    region: "西亚—北非",
    note: "七至八世纪的扩张是可核的政治史；经注、教法学派和苏非教团是另一条制度史。",
    href: "/religion/religious-history/formation-of-world-religions",
    hrefLabel: "世界宗教的形成",
    x: 176,
    y: 78,
  },
  {
    id: "mahayana",
    label: "大乘经论流通",
    epoch: "medieval",
    region: "东亚",
    note: "写本、译场和寺院经济让经论在丝路与东亚移动。流通不等于某地人口已经「改宗」。",
    href: "/religion/religious-history/empire-and-mission",
    hrefLabel: "帝国与传教",
    x: 300,
    y: 28,
  },
  {
    id: "andes",
    label: "安第斯朝圣地",
    epoch: "medieval",
    region: "美洲",
    note: "朝圣把地方神庙织进更大的政治地理。殖民之后的叠层要另读，不能把前哥伦布圣地写成化石。",
    href: "/religion/religion-and-society/pilgrimage-and-sacred-space",
    hrefLabel: "朝圣与圣地",
    x: 48,
    y: 104,
  },
  {
    id: "pentecostal",
    label: "五旬节运动",
    epoch: "modern",
    region: "全球南方",
    note: "二十世纪从北美城市教会扩散到拉美、非洲与东亚。增长数字必须带来源年份，不能写成「灵性本质」。",
    href: "/religion/religious-history/religion-in-the-twentieth-century",
    hrefLabel: "二十世纪的宗教",
    x: 158,
    y: 108,
  },
  {
    id: "secular-europe",
    label: "欧洲制度世俗化",
    epoch: "modern",
    region: "欧洲",
    note: "国教、税收与公立学校课程是法律事实。参与下降和认同下降常常不同步，见世俗化实验室。",
    href: "/religion/secularization/secularization-debate",
    hrefLabel: "世俗化之争",
    x: 148,
    y: 24,
  },
  {
    id: "nones",
    label: "无宗教身份",
    epoch: "modern",
    region: "北美—欧洲",
    note: "美国皮尤 2023–24 年宗教景观研究里，无宗教身份约占成年人口 29%，近年趋于走平。这是自称，不是无神论人数。",
    href: "/religion/frontier/nones-plateau-after-rls",
    hrefLabel: "无宗教身份的走平",
    x: 28,
    y: 32,
  },
];

export function traditionsInEpoch(epoch: EpochId) {
  return TRADITION_NODES.filter((node) => node.epoch === epoch);
}

export function traditionById(id: string) {
  return TRADITION_NODES.find((node) => node.id === id);
}
