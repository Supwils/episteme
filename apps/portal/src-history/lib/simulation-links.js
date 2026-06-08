const SIMULATION_MAP = {
  '哥伦布发现新大陆': 'no-columbus',
  '大航海时代': 'no-columbus',
  '古腾堡印刷术': 'printing-never',
  '印刷术发明': 'printing-never',
  '一战爆发': 'wwi-averted',
  '数字革命': 'internet-delayed',
  '波斯帝国': 'greece-falls',
  '亚历山大东征': 'greece-falls',
};

export function getSimulationId(eventTitle) {
  return SIMULATION_MAP[eventTitle] || null;
}

export function hasSimulation(eventTitle) {
  return eventTitle in SIMULATION_MAP;
}
