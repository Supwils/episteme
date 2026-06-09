export type DailyEvent = {
  year: number;
  month: number;
  day: number;
  title: string;
  description: string;
  url: string;
};

export const ECONOMICS_TODAY: DailyEvent[] = [
  { year: 1776, month: 3, day: 9, title: '《国富论》出版', description: '亚当·斯密出版《国富论》，奠定了古典经济学基础。', url: '/economics/economists/adam-smith' },
  { year: 1867, month: 9, day: 14, title: '《资本论》第一卷出版', description: '卡尔·马克思的《资本论》第一卷在汉堡出版。', url: '/economics/economists/karl-marx' },
  { year: 1936, month: 2, day: 4, title: '凯恩斯发表《通论》', description: '约翰·梅纳德·凯恩斯发表《就业、利息和货币通论》。', url: '/economics/economists/john-maynard-keynes' },
  { year: 1944, month: 7, day: 1, title: '布雷顿森林会议', description: '44国代表在美国布雷顿森林确立战后国际货币体系。', url: '/economics/case-studies/bretton-woods' },
  { year: 1929, month: 10, day: 29, title: '黑色星期二', description: '美国股市暴跌，大萧条开始。', url: '/economics/case-studies/great-depression' },
  { year: 2008, month: 9, day: 15, title: '雷曼兄弟破产', description: '美国第四大投行雷曼兄弟申请破产，全球金融危机爆发。', url: '/economics/case-studies/2008-financial-crisis' },
  { year: 1890, month: 7, day: 16, title: '马歇尔发表《经济学原理》', description: '阿尔弗雷德·马歇尔发表划时代的经济学教科书。', url: '/economics/economists/alfred-marshall' },
  { year: 1962, month: 10, day: 15, title: '弗里德曼提出货币主义', description: '米尔顿·弗里德曼发表《美国货币史》，挑战凯恩斯主义。', url: '/economics/economists/milton-friedman' },
  { year: 1970, month: 10, day: 27, title: '萨缪尔森获诺贝尔奖', description: '保罗·萨缪尔森成为首位获得诺贝尔经济学奖的美国人。', url: '/economics/economists/paul-samuelson' },
  { year: 1994, month: 12, day: 20, title: '墨西哥比索危机', description: '墨西哥比索大幅贬值，引发新兴市场金融危机。', url: '/economics' },
  { year: 2001, month: 10, day: 9, title: '卡尼曼获诺贝尔奖', description: '丹尼尔·卡尼曼因行为经济学研究获得诺贝尔经济学奖。', url: '/economics/economists/daniel-kahneman' },
  { year: 2009, month: 10, day: 12, title: '奥斯特罗姆获诺贝尔奖', description: '埃莉诺·奥斯特罗姆成为首位获得诺贝尔经济学奖的女性。', url: '/economics/economists/elinor-ostrom' },
  { year: 1817, month: 4, day: 19, title: '李嘉图发表《政治经济学及赋税原理》', description: '大卫·李嘉图提出比较优势理论。', url: '/economics/economists/david-ricardo' },
  { year: 1947, month: 4, day: 7, title: '国际货币基金组织成立', description: 'IMF正式成立，监督国际货币体系。', url: '/economics' },
  { year: 1958, month: 3, day: 1, title: '菲利普斯曲线发表', description: 'A.W.菲利普斯提出失业率与通胀率的反向关系。', url: '/economics/theories/keynesian-economics' },
  { year: 1767, month: 3, day: 5, title: '魁奈发表《经济表》', description: '弗朗索瓦·魁奈提出重农主义经济理论。', url: '/economics/schools/classical-economics' },
  { year: 1871, month: 3, day: 1, title: '边际革命开始', description: '门格尔、杰文斯和瓦尔拉斯几乎同时提出边际效用理论。', url: '/economics/theories/supply-demand' },
  { year: 1943, month: 3, day: 1, title: '波兰尼发表《大转型》', description: '卡尔·波兰尼批判市场经济的社会后果。', url: '/economics' },
  { year: 1961, month: 12, day: 1, title: '阿罗获诺贝尔奖', description: '肯尼斯·阿罗因社会选择理论获得诺贝尔经济学奖。', url: '/economics/economists/kenneth-arrow' },
  { year: 1991, month: 10, day: 15, title: '科斯获诺贝尔奖', description: '罗纳德·科斯因产权理论获得诺贝尔经济学奖。', url: '/economics/economists/ronald-coase' },
  { year: 1995, month: 10, day: 10, title: '纳什获诺贝尔奖', description: '约翰·纳什因博弈论获得诺贝尔经济学奖。', url: '/economics/economists/john-nash' },
  { year: 2013, month: 10, day: 14, title: '法玛、汉森、席勒获诺贝尔奖', description: '三位经济学家因资产价格实证研究共同获得诺贝尔奖。', url: '/economics' },
  { year: 2015, month: 10, day: 12, title: '迪顿获诺贝尔奖', description: '安格斯·迪顿因消费、贫困和福利研究获得诺贝尔奖。', url: '/economics' },
  { year: 2019, month: 10, day: 14, title: '班纳吉、迪弗洛获诺贝尔奖', description: '阿比吉特·班纳吉和埃斯特·迪弗洛因减贫实验研究获奖。', url: '/economics/economists/esther-duflo' },
  { year: 1834, month: 1, day: 1, title: '德意志关税同盟成立', description: '普鲁士主导的关税同盟促进了德国经济统一。', url: '/economics' },
  { year: 1602, month: 3, day: 20, title: '荷兰东印度公司成立', description: '世界上第一家股份制公司和上市公司诞生。', url: '/economics' },
  { year: 1971, month: 8, day: 15, title: '尼克松冲击', description: '美国总统尼克松宣布美元与黄金脱钩，布雷顿森林体系崩溃。', url: '/economics/case-studies/bretton-woods' },
  { year: 1978, month: 12, day: 18, title: '中国改革开放', description: '邓小平主导的经济改革开启中国经济高速增长。', url: '/economics/case-studies/east-asian-miracle' },
  { year: 2002, month: 1, day: 1, title: '欧元正式流通', description: '欧元区12国开始使用欧元纸币和硬币。', url: '/economics' },
  { year: 1923, month: 11, day: 15, title: '德国恶性通胀结束', description: '德国魏玛共和国恶性通胀达到顶峰后引入新货币。', url: '/economics/case-studies/hyperinflation-zimbabwe' },
];
