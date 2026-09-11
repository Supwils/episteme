export type EpochId = "ancient" | "medieval" | "modern";

export type TraditionNode = {
  id: string;
  label: string;
  epoch: EpochId;
  region: string;
};

export const TRADITION_NODES: readonly TraditionNode[] = [
  { id: "vedic", label: "吠陀祭祀", epoch: "ancient", region: "南亚" },
  { id: "hebrew", label: "希伯来圣经传统", epoch: "ancient", region: "西亚" },
  { id: "han-ritual", label: "汉帝国郊祀", epoch: "ancient", region: "东亚" },
  { id: "islam", label: "早期伊斯兰共同体", epoch: "medieval", region: "西亚—北非" },
  { id: "mahayana", label: "大乘经论流通", epoch: "medieval", region: "东亚" },
  { id: "andes", label: "安第斯朝圣地", epoch: "medieval", region: "美洲" },
  { id: "pentecostal", label: "五旬节运动", epoch: "modern", region: "全球南方" },
  { id: "secular-europe", label: "欧洲制度世俗化", epoch: "modern", region: "欧洲" },
];

export function traditionsInEpoch(epoch: EpochId) {
  return TRADITION_NODES.filter((node) => node.epoch === epoch);
}
