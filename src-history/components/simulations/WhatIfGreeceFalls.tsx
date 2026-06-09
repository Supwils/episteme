'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Scenario } from './types';

const scenario: Scenario = {
  id: 'greece-falls',
  title: '如果希腊败于波斯',
  year: '公元前480年',
  description: '萨拉米斯海战中，波斯舰队突破希腊联军防线。雅典沦陷，希腊城邦文明面临灭顶之灾。',
  context: '公元前480年，薛西斯一世率领波斯大军入侵希腊。在真实历史中，地米斯托克利率领雅典海军在萨拉米斯海峡以少胜多，击败波斯舰队。如果雅典海军战败，整个西方文明的走向将被彻底改写。',
  choices: [
    {
      id: 'persian-dominance',
      label: '波斯帝国统治地中海',
      description: '波斯征服希腊后，将势力范围扩展到整个地中海东部，建立行省制度',
      consequences: [
        { year: '前470年', event: '波斯在雅典建立行省，废除城邦自治制度，任命波斯总督', impact: 'negative' },
        { year: '前450年', event: '波斯吸收希腊建筑和艺术风格，但关闭了柏拉图学园等哲学机构', impact: 'negative' },
        { year: '前420年', event: '苏格拉底因"蛊惑青年"罪名被波斯当局处死，哲学传统中断', impact: 'negative' },
        { year: '前400年', event: '柏拉图流亡至波斯东部，将哲学思想传播至中亚，但未能回到雅典', impact: 'negative' },
        { year: '前350年', event: '亚里士多德从未出生——其父辈已死于战乱，经验科学传统从未建立', impact: 'negative' },
        { year: '前300年', event: '波斯帝国持续扩张，但缺乏希腊式的理性批判精神，科学发展停滞', impact: 'negative' },
        { year: '前200年', event: '罗马崛起时面对的是统一的波斯-希腊帝国，地中海霸权争夺更加激烈', impact: 'negative' },
        { year: '前100年', event: '一种融合波斯专制与希腊艺术的混合文明主导东地中海', impact: 'neutral' },
      ],
    },
    {
      id: 'culture-suppressed',
      label: '希腊文化被压制',
      description: '波斯允许希腊人继续生活，但严格禁止传播民主思想和自由哲学',
      consequences: [
        { year: '前470年', event: '雅典卫城改为波斯神庙，帕特农神庙被改建为拜火教圣殿', impact: 'negative' },
        { year: '前440年', event: '希腊悲剧和史诗被严格审查，只保留歌颂波斯帝国的内容', impact: 'negative' },
        { year: '前400年', event: '地下学术运动在小亚细亚秘密发展，成为后世文艺复兴的种子', impact: 'positive' },
        { year: '前360年', event: '斯巴达发动大规模起义，但因缺乏盟友而失败，希腊反抗力量被粉碎', impact: 'negative' },
        { year: '前320年', event: '波斯化的希腊文化向东传播，与印度孔雀王朝产生文化交流', impact: 'neutral' },
        { year: '前280年', event: '一种融合波斯、希腊和印度元素的新文化在中亚兴起', impact: 'neutral' },
        { year: '前200年', event: '希腊语言和文学仅在学者圈中秘密流传，如同中世纪的修道院', impact: 'negative' },
        { year: '前100年', event: '波斯帝国衰落时，地下希腊文化重新浮出水面，引发文化复兴', impact: 'positive' },
      ],
    },
    {
      id: 'delayed-democracy',
      label: '民主制度延迟出现',
      description: '希腊虽败，但民主理念的火种在数百年后以另一种形式在地中海世界复兴',
      consequences: [
        { year: '前470年', event: '雅典民主制度被彻底废除，恢复贵族寡头统治', impact: 'negative' },
        { year: '前400年', event: '波斯帝国开始衰落，希腊城邦逐渐恢复有限自治', impact: 'positive' },
        { year: '前350年', event: '新的城邦联盟出现，但采用混合政体而非纯粹民主制', impact: 'neutral' },
        { year: '前300年', event: '希腊化时代仍然到来，但民主实验较少，君主制更为普遍', impact: 'neutral' },
        { year: '前250年', event: '罗马共和国在建立时借鉴了希腊经验，但更强调贵族元老院的权力', impact: 'neutral' },
        { year: '前200年', event: '罗马的共和制度比真实历史更加保守，平民权利更少', impact: 'negative' },
        { year: '前100年', event: '民主理念通过罗马传播至整个地中海，但被改造为有限选举权制度', impact: 'negative' },
        { year: '前50年', event: '凯撒和奥古斯都的崛起更加顺利，因为缺乏民主制衡的传统', impact: 'negative' },
      ],
    },
  ],
};

const impactLabels: Record<string, string> = {
  positive: '积极',
  negative: '消极',
  neutral: '中性',
};

export default function WhatIfGreeceFalls() {
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
              萨拉米斯海战是西方文明的转折点。如果波斯获胜，希腊的命运将走向何方？
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
                  希腊文明的遗产——民主、哲学、科学——构成了西方世界的基石。
                  如果萨拉米斯的结局不同，我们所知的现代世界可能根本不会存在。
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
