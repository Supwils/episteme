'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Scenario } from './types';

const scenario: Scenario = {
  id: 'wwi-averted',
  title: '如果一战没有发生',
  year: '1914年',
  description: '弗朗茨·费迪南大公在萨拉热窝躲过了暗杀。欧洲的同盟体系没有被触发，脆弱的和平得以维持。',
  context: '1914年6月28日，奥匈帝国皇储弗朗茨·费迪南大公在萨拉热窝视察。在真实历史中，加夫里洛·普林西普的子弹改变了一切。如果大公的司机没有走错那条街，如果手榴弹没有扔进敞篷车——第一次世界大战可能永远不会爆发。',
  choices: [
    {
      id: 'european-peace',
      label: '欧洲和平延续',
      description: '列强通过外交手段解决巴尔干危机，欧洲和平维持到1920年代',
      consequences: [
        { year: '1916年', event: '欧洲经济持续繁荣，第二次工业革命达到高峰，电气化加速', impact: 'positive' },
        { year: '1918年', event: '德意志帝国、奥匈帝国、奥斯曼帝国三大帝国仍然稳固存在', impact: 'neutral' },
        { year: '1920年', event: '俄罗斯没有经历十月革命，沙皇推行渐进式改革，立宪君主制建立', impact: 'positive' },
        { year: '1925年', event: '欧洲列强维持全球殖民体系，亚非民族独立运动被压制', impact: 'negative' },
        { year: '1930年', event: '没有凡尔赛条约的屈辱，德国没有纳粹崛起的土壤，魏玛共和国稳定', impact: 'positive' },
        { year: '1935年', event: '欧洲仍是最强大的大陆，美国未崛起为世界霸主', impact: 'neutral' },
        { year: '1940年', event: '没有二战，没有大屠杀，600万犹太人幸存', impact: 'positive' },
        { year: '1950年', event: '联合国从未建立，国际联盟继续运作但影响力有限', impact: 'neutral' },
      ],
    },
    {
      id: 'different-conflict',
      label: '不同的冲突爆发',
      description: '巴尔干危机在1916年以另一种形式爆发，但规模和范围远小于真实历史的一战',
      consequences: [
        { year: '1916年', event: '第三次巴尔干战争爆发，但列强保持克制，仅提供有限支持', impact: 'negative' },
        { year: '1918年', event: '局部战争导致奥匈帝国开始解体，但过程缓慢而有序', impact: 'neutral' },
        { year: '1920年', event: '民族自决在中东欧有限度地实现，捷克和南斯拉夫独立', impact: 'positive' },
        { year: '1925年', event: '德国仍然是君主立宪制，经济实力稳步增长，殖民野心受限', impact: 'neutral' },
        { year: '1930年', event: '俄罗斯爆发有限革命，建立君主立宪制，保留了大部分领土', impact: 'neutral' },
        { year: '1935年', event: '世界格局多极化，没有单一霸权，国际合作更加复杂', impact: 'neutral' },
        { year: '1940年', event: '没有全球性冲突，但地区性战争此起彼伏', impact: 'negative' },
        { year: '1950年', event: '去殖民化缓慢进行，殖民帝国在经济压力下逐渐松动', impact: 'neutral' },
      ],
    },
    {
      id: 'empires-survive',
      label: '殖民帝国存续',
      description: '没有世界大战削弱欧洲列强，殖民帝国延续更久，全球秩序更加不平等',
      consequences: [
        { year: '1920年', event: '大英帝国控制全球25%的领土和人口，"日不落帝国"名副其实', impact: 'negative' },
        { year: '1925年', event: '印度独立运动被强力镇压，甘地的非暴力抵抗未能获得国际关注', impact: 'negative' },
        { year: '1930年', event: '非洲仍被欧洲瓜分，民族意识发展缓慢，教育和基础设施匮乏', impact: 'negative' },
        { year: '1935年', event: '中东石油被英法控制，阿拉伯民族主义被压制，巴以冲突从未发生', impact: 'neutral' },
        { year: '1940年', event: '殖民地精英开始觉醒，但缺乏武器和组织，反抗力量有限', impact: 'negative' },
        { year: '1950年', event: '殖民体系终于在经济压力下开始松动，但速度远慢于真实历史', impact: 'neutral' },
        { year: '1960年', event: '去殖民化推迟了20-30年，独立国家面临更多治理挑战', impact: 'negative' },
        { year: '1970年', event: '全球不平等加剧，第三世界国家发展更加困难', impact: 'negative' },
      ],
    },
  ],
};

const impactLabels: Record<string, string> = {
  positive: '积极',
  negative: '消极',
  neutral: '中性',
};

export default function WhatIfWWIAverted() {
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
              一战是20世纪所有灾难的起点。如果没有它，世界会更和平还是更不平等？
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
                  一战不仅是一场战争，它是旧世界的葬礼和新世界的产房。
                  没有它，20世纪的面貌——无论好坏——都将截然不同。
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
