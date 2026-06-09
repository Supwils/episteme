'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Scenario } from './types';

const scenario: Scenario = {
  id: 'no-columbus',
  title: '如果没有哥伦布',
  year: '1492年',
  description: '克里斯托弗·哥伦布未能说服西班牙王室资助西行航路。大西洋仍是一道无人跨越的屏障。',
  context: '1492年，西班牙刚完成收复失地运动，国库空虚。伊莎贝拉女王原本对哥伦布的计划犹豫不决。在真实历史中，她最终同意了。但如果她拒绝了呢？整个世界的面貌将被彻底改写。',
  choices: [
    {
      id: 'delay',
      label: '推迟十年',
      description: '哥伦布继续游说欧洲各国王室，最终在1502年获得资助启航',
      consequences: [
        { year: '1502', event: '哥伦布终于启航，但此时葡萄牙已完全控制好望角航路，东方贸易利润大减', impact: 'neutral' },
        { year: '1510', event: '美洲被发现，但西班牙国力已不如鼎盛时期，殖民规模有限', impact: 'neutral' },
        { year: '1520', event: '天花仍传入美洲，但传播速度较慢，部分文明得以保存更多人口', impact: 'positive' },
        { year: '1530', event: '阿兹特克帝国在与西班牙人接触后进行了更有准备的抵抗', impact: 'positive' },
        { year: '1550', event: '印加文明保留了更多文化传统和行政体系', impact: 'positive' },
        { year: '1580', event: '美洲殖民地发展滞后，非洲奴隶贸易规模较小，大西洋世界形成更晚', impact: 'positive' },
        { year: '1600', event: '全球贸易网络以亚洲为中心，欧洲未能主导世界经济', impact: 'neutral' },
        { year: '1650', event: '一个更多元的世界秩序出现，亚洲文明仍保持领先地位', impact: 'positive' },
      ],
    },
    {
      id: 'portuguese',
      label: '葡萄牙发现美洲',
      description: '葡萄牙航海家在探索巴西海岸时偶然发现新大陆，宣布为主权领土',
      consequences: [
        { year: '1500', event: '葡萄牙人登陆巴西，建立第一个永久定居点', impact: 'neutral' },
        { year: '1510', event: '葡萄牙专注于巴西开发，西班牙则全力投入亚洲香料贸易', impact: 'neutral' },
        { year: '1520', event: '葡萄牙帝国横跨南美和亚洲，成为世界上最大的殖民帝国', impact: 'negative' },
        { year: '1540', event: '西班牙未获美洲巨额金银，欧洲经济中心仍在意北利和低地国家', impact: 'neutral' },
        { year: '1560', event: '没有西班牙无敌舰队，英国未能崛起为海上强国', impact: 'negative' },
        { year: '1580', event: '葡萄牙语成为美洲主要语言，巴西文化更接近葡非混合传统', impact: 'neutral' },
        { year: '1600', event: '荷兰和英国缺乏竞争动力，殖民扩张较慢', impact: 'neutral' },
        { year: '1650', event: '一个以葡萄牙为核心的海上帝国主导大西洋贸易', impact: 'negative' },
      ],
    },
    {
      id: 'no-discovery',
      label: '直到1600年才被发现',
      description: '欧洲各国专注于亚洲贸易路线，美洲在整整一个世纪后才被偶然发现',
      consequences: [
        { year: '1500', event: '欧洲全力投入亚洲香料贸易，绕过好望角的航路日益成熟', impact: 'neutral' },
        { year: '1520', event: '阿兹特克帝国继续扩张，特诺奇提特兰人口超过50万，成为世界最大城市之一', impact: 'positive' },
        { year: '1540', event: '印加帝国修建更多道路网络，安第斯文明达到新的高度', impact: 'positive' },
        { year: '1560', event: '北美洲易洛魁联盟发展出更复杂的政治体系和贸易网络', impact: 'positive' },
        { year: '1570', event: '玛雅城邦在尤卡坦半岛复兴，天文和数学研究取得新进展', impact: 'positive' },
        { year: '1580', event: '欧洲开始出现人口压力和资源危机，向外扩张的动机更加强烈', impact: 'negative' },
        { year: '1590', event: '奥斯曼帝国控制东西方贸易，欧洲面临更大的地缘压力', impact: 'negative' },
        { year: '1600', event: '偶然的发现带来更大的文化冲击，两个世界的碰撞更加剧烈和不可控', impact: 'negative' },
      ],
    },
  ],
};

const impactLabels: Record<string, string> = {
  positive: '积极',
  negative: '消极',
  neutral: '中性',
};

export default function WhatIfNoColumbus() {
  const [phase, setPhase] = useState<'intro' | 'choosing' | 'consequences' | 'complete'>('intro');
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [visibleConsequences, setVisibleConsequences] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeChoice = selectedChoice !== null ? scenario.choices[selectedChoice] : null;

  const showNextConsequence = useCallback(() => {
    if (!activeChoice) return;
    setVisibleConsequences((prev) => {
      if (prev >= activeChoice.consequences.length) return prev;
      return prev + 1;
    });
  }, [activeChoice]);

  useEffect(() => {
    if (phase !== 'consequences' || !activeChoice) return;
    if (visibleConsequences >= activeChoice.consequences.length) {
      timerRef.current = setTimeout(() => setPhase('complete'), 1200);
      return;
    }
    timerRef.current = setTimeout(showNextConsequence, 900);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, visibleConsequences, activeChoice, showNextConsequence]);

  const handleChoice = (index: number) => {
    setSelectedChoice(index);
    setVisibleConsequences(0);
    setPhase('consequences');
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('intro');
    setSelectedChoice(null);
    setVisibleConsequences(0);
  };

  return (
    <div className="sim-container">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="sim-intro">
            <div className="sim-badge">{scenario.year}</div>
            <h2 className="sim-title">{scenario.title}</h2>
            <p className="sim-context">{scenario.context}</p>
            <p className="sim-description">{scenario.description}</p>
            <button className="sim-btn-primary" onClick={() => setPhase('choosing')}>
              探索可能性
            </button>
          </motion.div>
        )}

        {phase === 'choosing' && (
          <motion.div key="choosing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="sim-choices">
            <h3 className="sim-subtitle">做出你的选择</h3>
            <p className="sim-context" style={{ marginBottom: '1.5rem' }}>
              每个选择都会引发不同的历史连锁反应。选择你认为最可能发生的情景：
            </p>
            <div className="sim-choice-grid">
              {scenario.choices.map((choice, i) => (
                <motion.button
                  key={choice.id}
                  className="sim-choice-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice(i)}
                >
                  <span className="sim-choice-label">{choice.label}</span>
                  <span className="sim-choice-desc">{choice.description}</span>
                </motion.button>
              ))}
            </div>
            <button className="sim-btn-secondary" onClick={handleReset}>返回</button>
          </motion.div>
        )}

        {(phase === 'consequences' || phase === 'complete') && activeChoice && (
          <motion.div key="consequences" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="sim-consequences">
            <div className="sim-header-row">
              <h3 className="sim-subtitle">{activeChoice.label}</h3>
              {phase === 'complete' && <span className="sim-complete-badge">模拟完成</span>}
            </div>

            <div className="sim-timeline">
              <div className="sim-timeline-line" />
              <AnimatePresence>
                {activeChoice.consequences.slice(0, visibleConsequences).map((c, i) => (
                  <motion.div
                    key={i}
                    className={`sim-timeline-item sim-impact-${c.impact}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="sim-timeline-dot" />
                    <div className="sim-timeline-content">
                      <div className="sim-timeline-meta">
                        <span className="sim-timeline-year">{c.year}</span>
                        <span className={`sim-impact-tag sim-impact-tag-${c.impact}`}>
                          {impactLabels[c.impact]}
                        </span>
                      </div>
                      <p className="sim-timeline-event">{c.event}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {phase === 'complete' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="sim-complete">
                <p className="sim-complete-text">
                  这只是无数可能性中的一种。历史的走向往往取决于看似微小的决定。
                  哥伦布的航程开启了全球化时代，改变了地球上每一个文明的命运。
                </p>
                <div className="sim-actions">
                  <button className="sim-btn-secondary" onClick={handleReset}>重新模拟</button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
