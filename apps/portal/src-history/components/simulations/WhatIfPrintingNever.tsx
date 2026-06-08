'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Scenario } from './types';

const scenario: Scenario = {
  id: 'printing-never',
  title: '如果没有印刷术',
  year: '1440年',
  description: '约翰内斯·古腾堡未能发明活字印刷机。知识的传播仍然依赖手抄本，书籍是只有贵族和教会才能负担的奢侈品。',
  context: '1440年代，美因茨的金匠古腾堡正在试验金属活字印刷技术。在真实历史中，这项发明彻底改变了人类知识传播的方式。如果他放弃了，或者这项技术从未被发明，知识传播的速度将被大幅降低。',
  choices: [
    {
      id: 'manuscript',
      label: '手抄本文化延续',
      description: '欧洲继续依赖修道院手抄员复制书籍，知识传播极其缓慢',
      consequences: [
        { year: '1460年', event: '修道院仍是知识生产的唯一中心，全欧洲识字率维持在5%以下', impact: 'negative' },
        { year: '1490年', event: '文艺复兴局限于意大利少数精英阶层，未能向北欧传播', impact: 'negative' },
        { year: '1520年', event: '马丁·路德的九十五条论纲只能手抄传播，宗教改革影响力大减', impact: 'negative' },
        { year: '1540年', event: '天主教会维持对知识的绝对垄断，异端思想难以传播', impact: 'negative' },
        { year: '1560年', event: '哥白尼的《天体运行论》仅存十余份手抄本，日心说传播极慢', impact: 'negative' },
        { year: '1580年', event: '莎士比亚的戏剧仅在剧院口头流传，文学影响力局限于伦敦', impact: 'negative' },
        { year: '1600年', event: '伽伽利无法发表著作，科学革命被推迟至少一个世纪', impact: 'negative' },
        { year: '1650年', event: '欧洲知识传播速度与一千年前几乎没有差别，启蒙运动无从谈起', impact: 'negative' },
      ],
    },
    {
      id: 'asian-printing',
      label: '亚洲印刷术主导',
      description: '中国的活字印刷和木版印刷通过丝绸之路传入欧洲，成为主流技术',
      consequences: [
        { year: '1460年', event: '威尼斯成为东方印刷技术在欧洲的传播中心', impact: 'neutral' },
        { year: '1490年', event: '木版印刷在欧洲普及，但排版效率远低于金属活字，成本仍高', impact: 'neutral' },
        { year: '1520年', event: '宗教改革仍然发生，但传播速度较慢，影响力局限于城市', impact: 'neutral' },
        { year: '1540年', event: '欧洲书籍风格更接近东亚传统，从右到左装订，使用宣纸', impact: 'neutral' },
        { year: '1560年', event: '东西方文化交流更早更深入，欧洲学者学习中文以阅读原著', impact: 'positive' },
        { year: '1580年', event: '中国的火药、指南针等技术更早传入欧洲，航海事业发展更快', impact: 'positive' },
        { year: '1600年', event: '科学革命起步较晚，但融入了更多东方思想和方法', impact: 'neutral' },
        { year: '1650年', event: '一个更加东西融合的欧洲文明出现，但工业化进程较慢', impact: 'neutral' },
      ],
    },
    {
      id: 'digital-delayed',
      label: '数字革命延迟',
      description: '信息传播技术整体滞后，人类进入信息时代的时间被推迟数百年',
      consequences: [
        { year: '1500年', event: '欧洲识字率长期停滞，口头传统仍是主要知识传播方式', impact: 'negative' },
        { year: '1530年', event: '地图和科学图表无法批量生产，地理大发现受限', impact: 'negative' },
        { year: '1560年', event: '报纸从未出现，政治信息传播极慢，民众对时事一无所知', impact: 'negative' },
        { year: '1600年', event: '宗教战争更加残酷，因为双方无法通过出版物进行思想辩论', impact: 'negative' },
        { year: '1700年', event: '启蒙运动未能发生，理性思想和人权观念传播受阻', impact: 'negative' },
        { year: '1750年', event: '工业革命缺少技术文献支撑，蒸汽机等发明推迟出现', impact: 'negative' },
        { year: '1800年', event: '拿破仑战争时期，军队仍依赖口头命令和手绘地图', impact: 'negative' },
        { year: '1900年', event: '全球信息网络仍未建立，各国相互隔绝，国际合作极其困难', impact: 'negative' },
      ],
    },
  ],
};

const impactLabels: Record<string, string> = {
  positive: '积极',
  negative: '消极',
  neutral: '中性',
};

export default function WhatIfPrintingNever() {
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
              印刷术是信息时代的起点。没有它，知识将如何传播？
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
                  印刷术不仅是一项技术发明，更是人类认知能力的延伸。没有它，宗教改革、科学革命和启蒙运动都可能无从发生。
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
