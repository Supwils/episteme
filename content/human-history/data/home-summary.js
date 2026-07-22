export const HISTORY_HOME_COUNTS = {
  events: 100,
  figures: 202,
};

export const HOME_TIMELINE_EVENTS = [
  {
    year: -300000,
    title: "智人在非洲诞生",
    desc: "现代人类（Homo sapiens）在非洲出现，开始了漫长的演化之旅",
  },
  {
    year: -10000,
    title: "农业革命",
    desc: "多个地区先后驯化动植物，定居、人口增长与社会分工由此加速",
  },
  {
    year: -3200,
    title: "楔形文字",
    desc: "苏美尔书写系统使账目、法律与记忆能够跨越世代积累",
  },
  {
    year: -551,
    title: "孔子诞生",
    desc: "儒家学派创始人，其教育与政治思想持续影响东亚社会",
  },
  {
    year: -138,
    title: "张骞出使西域",
    desc: "汉帝国与中亚建立更稳定的联系，推动既有欧亚陆路网络扩展",
  },
  {
    year: 1347,
    title: "黑死病",
    desc: "瘟疫横跨欧亚与北非，人口损失深刻改变劳动、信仰与国家能力",
  },
  {
    year: 1492,
    title: "哥伦布航行与大交换",
    desc: "持续的跨大西洋接触重组全球生态，也带来殖民、强迫劳动与疾病扩散",
  },
  {
    year: 1687,
    title: "牛顿力学",
    desc: "《自然哲学的数学原理》以统一数学框架解释地面与天体运动",
  },
  {
    year: 1760,
    title: "工业革命",
    desc: "化石能源与机器生产重塑劳动、城市、帝国和全球环境",
  },
  {
    year: 1945,
    title: "二战结束",
    desc: "联合国体系与核时代同时开启，去殖民化和冷战秩序随后展开",
  },
  {
    year: 1969,
    title: "人类登月",
    desc: "阿波罗11号完成首次载人登月，展示国家动员与复杂工程的边界",
  },
  {
    year: 2023,
    title: "生成式AI进入大众应用",
    desc: "大模型快速进入知识工作与公共生活，同时放大治理、劳动和可信度问题",
  },
];

export const HOME_FEATURED_FIGURES = [
  {
    name: "孔子",
    title: "至圣先师",
    desc: "儒家学派创始人，其教育与政治思想持续影响东亚社会",
  },
  {
    name: "伊本·西那",
    title: "医学与哲学大师",
    desc: "《医典》影响欧亚医学教育数百年",
  },
  {
    name: "郑和",
    title: "远洋航海家",
    desc: "七下西洋，连接东南亚、印度洋与东非海岸",
  },
  {
    name: "牛顿",
    title: "近代科学之父",
    desc: "建立经典力学体系，并独立发展微积分方法",
  },
  {
    name: "居里夫人",
    title: "放射性研究先驱",
    desc: "两次获得诺贝尔奖，开创了放射性研究领域",
  },
  {
    name: "曼德拉",
    title: "南非反种族隔离领袖",
    desc: "从政治犯到总统，推动南非结束种族隔离",
  },
];

export function formatHomeYear(year) {
  if (year <= -10000) return `约${Math.abs(year).toLocaleString()}年前`;
  if (year < 0) return `公元前${Math.abs(year)}年`;
  if (year === 0) return "公元元年";
  return `公元${year}年`;
}
