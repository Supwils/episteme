export interface OnThisDayEvent {
  month: number;
  day: number;
  year: number;
  title: string;
  description: string;
  domain: string;
  domainColor: string;
  url: string;
}

export const ON_THIS_DAY: OnThisDayEvent[] = [
  { month: 1, day: 1, year: 1912, title: '中华民国成立', description: '孙中山就任临时大总统', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 1, day: 4, year: 2004, title: '勇气号火星车着陆', description: 'NASA火星探测器成功着陆', domain: '宇宙物理', domainColor: '#6366f1', url: '/universe-physics' },
  { month: 1, day: 15, year: 2001, title: '维基百科上线', description: '免费在线百科全书诞生', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 2, day: 1, year: 2003, title: '哥伦比亚号航天飞机解体', description: '返回大气层时失事，7名宇航员遇难', domain: '宇宙物理', domainColor: '#6366f1', url: '/universe-physics' },
  { month: 2, day: 14, year: 1990, title: '旅行者1号拍摄"暗淡蓝点"', description: '从60亿公里外拍摄地球照片', domain: '宇宙物理', domainColor: '#6366f1', url: '/universe-physics' },
  { month: 3, day: 14, year: 2018, title: '霍金去世', description: '理论物理学家斯蒂芬·霍金辞世', domain: '宇宙物理', domainColor: '#6366f1', url: '/universe-physics' },
  { month: 4, day: 12, year: 1961, title: '加加林首次进入太空', description: '人类首次太空飞行', domain: '宇宙物理', domainColor: '#6366f1', url: '/universe-physics' },
  { month: 4, day: 22, year: 1970, title: '第一个地球日', description: '全球环保运动的开端', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 5, day: 2, year: 1952, title: '喷气式客机首航', description: '彗星号客机首飞', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 6, day: 6, year: 1944, title: '诺曼底登陆', description: 'D-Day，盟军登陆法国', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 7, day: 20, year: 1969, title: '阿波罗11号登月', description: '人类首次登上月球', domain: '宇宙物理', domainColor: '#6366f1', url: '/universe-physics' },
  { month: 8, day: 6, year: 1945, title: '广岛原子弹', description: '人类首次在战争中使用核武器', domain: '宇宙物理', domainColor: '#6366f1', url: '/universe-physics' },
  { month: 9, day: 11, year: 2001, title: '九一一事件', description: '美国遭受恐怖袭击', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 10, day: 1, year: 1949, title: '中华人民共和国成立', description: '毛泽东在天安门城楼宣告', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 11, day: 9, year: 1989, title: '柏林墙倒塌', description: '冷战结束的象征', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 12, day: 25, year: 1991, title: '苏联解体', description: '戈尔巴乔夫辞职，苏联正式解体', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 1, day: 27, year: 1945, title: '奥斯维辛解放', description: '纳粹集中营被苏联红军解放', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 3, day: 8, year: 1910, title: '第一个国际妇女节', description: '全球妇女权益运动的里程碑', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 5, day: 4, year: 1979, title: '撒切尔夫人当选', description: '英国首位女首相', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 7, day: 4, year: 1776, title: '美国独立宣言', description: '美利坚合众国宣告独立', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 9, day: 2, year: 1945, title: '日本投降', description: '第二次世界大战正式结束', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 11, day: 24, year: 1859, title: '《物种起源》出版', description: '达尔文的进化论改变世界', domain: '人类历史', domainColor: '#f59e0b', url: '/human-history/timeline' },
  { month: 4, day: 26, year: 1986, title: '切尔诺贝利核事故', description: '史上最严重的核电站事故', domain: '宇宙物理', domainColor: '#6366f1', url: '/universe-physics' },
  { month: 6, day: 30, year: 1908, title: '通古斯大爆炸', description: '西伯利亚神秘大爆炸', domain: '宇宙物理', domainColor: '#6366f1', url: '/universe-physics' },
];
