'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Scenario } from './types';

const scenario: Scenario = {
  id: 'internet-delayed',
  title: '如果互联网推迟30年',
  year: '1990年',
  description: 'ARPANET始终停留在军用网络阶段，万维网从未被发明。信息时代被推迟到2020年代。',
  context: '1990年，蒂姆·伯纳斯-李在欧洲核子研究中心(CERN)提出了万维网(World Wide Web)的概念。在真实历史中，这一发明彻底改变了人类社会。如果这一发明从未发生，世界将如何不同？',
  choices: [
    {
      id: 'different-comm',
      label: '不同的通信技术',
      description: '传真机、电话会议和卫星电视成为主要远程通信方式',
      consequences: [
        { year: '1995年', event: '传真机和固定电话仍是主要通信工具，电子邮件从未普及', impact: 'neutral' },
        { year: '2000年', event: '移动电话普及，但只能打电话和发短信，没有移动互联网', impact: 'neutral' },
        { year: '2005年', event: '电视和广播仍是主要信息来源，媒体集中度更高，话语权更集中', impact: 'negative' },
        { year: '2008年', event: '奥巴马的网络筹款策略不可能实现，政治动员方式不同', impact: 'neutral' },
        { year: '2010年', event: '阿拉伯之春未能发生，信息封锁更难突破，威权政府更稳定', impact: 'negative' },
        { year: '2015年', event: '电子商务未兴起，全球贸易效率较低，实体店仍是唯一选择', impact: 'negative' },
        { year: '2020年', event: 'COVID-19疫情期间无法远程工作和在线教育，经济冲击更大', impact: 'negative' },
        { year: '2025年', event: '人工智能发展受限，缺乏大规模数据集和云计算基础设施', impact: 'negative' },
      ],
    },
    {
      id: 'corporate-only',
      label: '仅限企业网络',
      description: '大型企业建立内部网络系统，但互联网从未向公众开放',
      consequences: [
        { year: '1995年', event: '企业内部网(Intranet)在大公司普及，但公众无法访问', impact: 'neutral' },
        { year: '2000年', event: '数字鸿沟加深：企业精英与普通民众的信息差距如同天堑', impact: 'negative' },
        { year: '2005年', event: '谷歌、亚马逊、Facebook等公司从未诞生，硅谷发展路径完全不同', impact: 'neutral' },
        { year: '2008年', event: '社交媒体不存在，公众舆论完全由传统媒体和政府主导', impact: 'negative' },
        { year: '2010年', event: '假新闻问题较少，但政府审查和信息控制更加严重', impact: 'negative' },
        { year: '2015年', event: '远程办公不可能，全球化进程放缓，跨国协作效率低下', impact: 'negative' },
        { year: '2020年', event: '开源运动和维基百科从未出现，知识共享极其有限', impact: 'negative' },
        { year: '2025年', event: '企业掌握所有数据和信息，公众知情权极度受限', impact: 'negative' },
      ],
    },
    {
      id: 'government-controlled',
      label: '政府控制网络',
      description: '各国建立封闭的国家信息网络，类似朝鲜的光明网，互相隔离',
      consequences: [
        { year: '1995年', event: '各国建立国家信息网络，严格控制跨境信息流动', impact: 'negative' },
        { year: '2000年', event: '跨国信息交流极其困难，文化全球化进程停滞', impact: 'negative' },
        { year: '2005年', event: '政府监控所有数字通信，隐私权概念从未出现', impact: 'negative' },
        { year: '2008年', event: '各国网络互相隔离，国际合作更加困难，冷战思维延续', impact: 'negative' },
        { year: '2010年', event: '开源运动和维基百科从未出现，知识被国家垄断', impact: 'negative' },
        { year: '2015年', event: '人工智能发展受限，缺乏跨国数据共享和学术交流', impact: 'negative' },
        { year: '2020年', event: '世界更加分裂，信息孤岛加剧误解和冲突', impact: 'negative' },
        { year: '2025年', event: '技术发展速度仅为真实历史的三分之一，创新生态萎缩', impact: 'negative' },
      ],
    },
  ],
};

const impactLabels: Record<string, string> = {
  positive: '积极',
  negative: '消极',
  neutral: '中性',
};

export default function WhatIfInternetDelayed() {
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
              互联网是人类历史上最伟大的信息革命。没有它，我们的日常生活将如何不同？
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
                  互联网不仅改变了我们获取信息的方式，更重塑了政治、经济和人际关系的每一个层面。
                  没有它，21世纪将是一个截然不同的时代。
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
