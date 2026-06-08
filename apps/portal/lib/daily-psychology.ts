export type DailyEvent = {
  year: number;
  month: number;
  day: number;
  title: string;
  description: string;
  url: string;
};

export const PSYCHOLOGY_TODAY: DailyEvent[] = [
  { year: 1856, month: 5, day: 6, title: '弗洛伊德出生', description: '精神分析学派创始人西格蒙德·弗洛伊德出生于摩拉维亚。', url: '/psychology/theorists/sigmund-freud' },
  { year: 1879, month: 12, day: 1, title: '冯特建立心理学实验室', description: '威廉·冯特在莱比锡大学建立世界上第一个心理学实验室。', url: '/psychology' },
  { year: 1900, month: 11, day: 4, title: '《梦的解析》出版', description: '弗洛伊德出版《梦的解析》，开创精神分析学。', url: '/psychology/theorists/sigmund-freud' },
  { year: 1904, month: 9, day: 1, title: '巴甫洛夫获诺贝尔奖', description: '伊万·巴甫洛夫因消化生理学研究获得诺贝尔奖。', url: '/psychology/theorists/ivan-pavlov' },
  { year: 1913, month: 2, day: 1, title: '华生发表行为主义宣言', description: '约翰·华生发表《行为主义者眼中的心理学》。', url: '/psychology/theorists/john-watson' },
  { year: 1920, month: 8, day: 1, title: '小阿尔伯特实验', description: '华生和雷纳进行经典条件反射情绪实验。', url: '/psychology/experiments/pavlov-classical-conditioning' },
  { year: 1938, month: 9, day: 1, title: '斯金纳发表《有机体的行为》', description: 'B.F.斯金纳系统阐述操作性条件反射理论。', url: '/psychology/theorists/b-f-skinner' },
  { year: 1943, month: 7, day: 1, title: '马斯洛提出需求层次理论', description: '亚伯拉罕·马斯洛发表《人类动机理论》。', url: '/psychology/theorists/abraham-maslow' },
  { year: 1951, month: 7, day: 1, title: '阿希从众实验', description: '所罗门·阿希进行经典的从众效应实验。', url: '/psychology/experiments/asch-conformity-1951' },
  { year: 1952, month: 10, day: 1, title: 'DSM-I出版', description: '美国精神医学会出版第一版《精神障碍诊断与统计手册》。', url: '/psychology/disorders' },
  { year: 1953, month: 9, day: 1, title: 'REM睡眠发现', description: '尤金·阿瑟林斯基发现快速眼动睡眠。', url: '/psychology' },
  { year: 1956, month: 9, day: 1, title: '米勒发表《神奇的数字7》', description: '乔治·米勒提出工作记忆容量限制为7±2。', url: '/psychology' },
  { year: 1959, month: 1, day: 1, title: '费斯廷格提出认知失调理论', description: '利昂·费斯廷格发表认知失调理论。', url: '/psychology/theorists/leon-festinger' },
  { year: 1961, month: 12, day: 1, title: '班杜拉波波玩偶实验', description: '阿尔伯特·班杜拉进行观察学习经典实验。', url: '/psychology/experiments/bobo-doll' },
  { year: 1963, month: 8, day: 1, title: '米尔格拉姆服从实验', description: '斯坦利·米尔格拉姆开始电击服从实验。', url: '/psychology/experiments/milgram-obedience-1963' },
  { year: 1969, month: 1, day: 1, title: '鲍尔比依恋理论', description: '约翰·鲍尔比出版《依恋与失落》第一卷。', url: '/psychology/experiments/strange-situation' },
  { year: 1971, month: 8, day: 1, title: '斯坦福监狱实验', description: '菲利普·津巴多进行著名的斯坦福监狱实验。', url: '/psychology/experiments/stanford-prison-1971' },
  { year: 1974, month: 1, day: 1, title: '洛夫特斯汽车撞击实验', description: '伊丽莎白·洛夫特斯研究误导信息对记忆的影响。', url: '/psychology/experiments/loftus-car-crash-1974' },
  { year: 1977, month: 1, day: 1, title: '班杜拉提出自我效能理论', description: '阿尔伯特·班杜拉提出自我效能感概念。', url: '/psychology/theorists/albert-bandura' },
  { year: 1979, month: 3, day: 1, title: '卡尼曼和特沃斯基提出前景理论', description: '丹尼尔·卡尼曼和阿莫斯·特沃斯基发表前景理论。', url: '/psychology/experiments/kahneman-tversky-1979' },
  { year: 1981, month: 10, day: 1, title: '斯佩里获诺贝尔奖', description: '罗杰·斯佩里因裂脑研究获得诺贝尔生理学或医学奖。', url: '/psychology' },
  { year: 1990, month: 1, day: 1, title: '塞利格曼当选APA主席', description: '马丁·塞利格曼当选美国心理学会主席，推动积极心理学。', url: '/psychology/theorists/martin-seligman' },
  { year: 1991, month: 1, day: 1, title: '达马西奥发表躯体标记假说', description: '安东尼奥·达马西奥提出情绪在决策中的关键作用。', url: '/psychology/theorists/antonio-damasio' },
  { year: 1996, month: 1, day: 1, title: '积极心理学运动开始', description: '塞利格曼发起积极心理学运动，关注人类优势与幸福。', url: '/psychology/schools/positive-psychology' },
  { year: 1998, month: 1, day: 1, title: '邓宁-克鲁格效应发表', description: '大卫·邓宁和贾斯汀·克鲁格描述能力与自信的偏差。', url: '/psychology/experiments/dunning-kruger-1999' },
  { year: 1999, month: 1, day: 1, title: '西蒙斯注意力盲视实验', description: '丹尼尔·西蒙斯和克里斯托弗·查布里斯进行大猩猩实验。', url: '/psychology/experiments/gorilla-invisibility' },
  { year: 2000, month: 1, day: 1, title: '契克森米哈赖心流理论普及', description: '米哈里·契克森米哈赖的心流理论被广泛接受。', url: '/psychology/theorists/mihaly-csikszentmihalyi' },
  { year: 2002, month: 10, day: 9, title: '卡尼曼获诺贝尔奖', description: '丹尼尔·卡尼曼因行为经济学研究获得诺贝尔经济学奖。', url: '/psychology/theorists/daniel-kahneman' },
  { year: 2011, month: 10, day: 1, title: '卡尼曼出版《思考，快与慢》', description: '丹尼尔·卡尼曼出版畅销书，普及系统1和系统2思维。', url: '/psychology/theorists/daniel-kahneman' },
  { year: 2015, month: 8, day: 27, title: '可重复性危机报告', description: '开放科学协作组织发布心理学研究可重复性报告。', url: '/psychology/experiments/replication-crisis' },
  { year: 1921, month: 9, day: 1, title: '罗夏墨迹测验出版', description: '赫尔曼·罗夏出版墨迹投射测验。', url: '/psychology' },
  { year: 1937, month: 7, day: 1, title: '奥尔波特发表人格理论', description: '戈登·奥尔波特出版《人格：心理学的解释》。', url: '/psychology' },
  { year: 1954, month: 3, day: 1, title: '马斯洛出版《动机与人格》', description: '亚伯拉罕·马斯洛系统阐述需求层次理论。', url: '/psychology/theorists/abraham-maslow' },
  { year: 1958, month: 1, day: 1, title: '哈洛依恋实验', description: '哈里·哈洛的恒河猴实验证明接触舒适的重要性。', url: '/psychology/experiments/strange-situation' },
  { year: 1968, month: 10, day: 1, title: '罗森塔尔效应发表', description: '罗伯特·罗森塔尔和莱诺尔·雅各布森发表教师期望实验。', url: '/psychology/experiments/rosenthal-jacobson-1968' },
  { year: 1980, month: 1, day: 1, title: '贝克发表认知疗法', description: '亚伦·贝克系统阐述认知疗法理论和方法。', url: '/psychology/theorists/aaron-beck' },
];
