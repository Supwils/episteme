'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Question = {
  id: number;
  thoughtExperiment: string;
  question: string;
  options: { text: string; school: string; explanation: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    thoughtExperiment: '电车难题',
    question: '一辆失控的电车即将撞上5个人。你可以拉动杠杆让电车转向另一条轨道，但那条轨道上有1个人。你会怎么做？',
    options: [
      { text: '拉动杠杆，牺牲1人救5人', school: 'utilitarian', explanation: '功利主义：选择产生最大幸福总量的行为。' },
      { text: '不拉动杠杆，不主动造成死亡', school: 'deontological', explanation: '义务论：主动杀人违反道德律令，即使结果更好。' },
      { text: '这取决于具体情况和关系', school: 'care', explanation: '关怀伦理：道德判断不能脱离具体的人际关系。' },
      { text: '没有正确答案，但我必须选择并承担责任', school: 'existentialist', explanation: '存在主义：人被判定为自由，必须为选择承担全部责任。' },
    ],
  },
  {
    id: 2,
    thoughtExperiment: '忒修斯之船',
    question: '一艘船的零件被逐一替换，直到所有零件都是新的。这还是原来那艘船吗？',
    options: [
      { text: '是，因为形式/结构保持不变', school: 'aristotelian', explanation: '亚里士多德：事物的本质在于形式而非质料。' },
      { text: '不是，因为物质基础完全改变了', school: 'materialist', explanation: '唯物主义：身份依赖于物质构成。' },
      { text: '这取决于我们如何定义"同一性"', school: 'analytic', explanation: '分析哲学：问题在于概念的精确界定。' },
      { text: '身份本身是一个持续的过程，而非固定状态', school: 'process', explanation: '过程哲学：一切都是流变，身份也是动态的。' },
    ],
  },
  {
    id: 3,
    thoughtExperiment: '缸中之脑',
    question: '如果你的大脑被放在营养液中，由电脑模拟所有感觉体验，你能知道自己是"缸中之脑"吗？',
    options: [
      { text: '不能，所有经验都可能被模拟', school: 'skeptical', explanation: '怀疑论：我们无法超越经验来验证经验的真实性。' },
      { text: '能，我思故我在——思维本身就证明存在', school: 'rationalist', explanation: '理性主义（笛卡尔）：思维的确定性先于经验。' },
      { text: '这个问题没有意义——真实与虚拟的区分本身有问题', school: 'pragmatist', explanation: '实用主义：如果区别无法产生实际差异，就不重要。' },
      { text: '重要的是我在体验，而非体验是否"真实"', school: 'phenomenological', explanation: '现象学：关注体验本身，而非体验背后的实在。' },
    ],
  },
  {
    id: 4,
    thoughtExperiment: '无知之幕',
    question: '如果你不知道自己出生后的身份、才能、财富，你会选择什么样的社会制度？',
    options: [
      { text: '最大化最弱势群体利益的制度', school: 'rawlsian', explanation: '罗尔斯：理性人在无知之幕后会选择差异原则。' },
      { text: '保障个人自由和私有产权的制度', school: 'libertarian', explanation: '自由至上主义（诺齐克）：权利优先于分配。' },
      { text: '追求总体幸福最大化的制度', school: 'utilitarian', explanation: '功利主义：社会制度应最大化总体效用。' },
      { text: '这个问题的假设太抽象了', school: 'communitarian', explanation: '社群主义：人不能脱离具体社群来思考正义。' },
    ],
  },
  {
    id: 5,
    thoughtExperiment: '中文房间',
    question: '一个人在房间里按照规则手册回复中文问题，外面的人以为他懂中文。他真的"理解"中文吗？',
    options: [
      { text: '不理解，他只是在操作符号', school: 'searle', explanation: '塞尔：语法不等于语义，符号操作不等于理解。' },
      { text: '理解——整个系统（人+手册+房间）理解中文', school: 'functionalist', explanation: '功能主义：理解在于功能组织，不在具体载体。' },
      { text: '"理解"本身需要重新定义', school: 'wittgensteinian', explanation: '维特根斯坦：意义在于使用，语言游戏决定含义。' },
      { text: '机器和人的理解没有本质区别', school: 'computational', explanation: '计算主义：心智本身就是一种信息处理系统。' },
    ],
  },
  {
    id: 6,
    thoughtExperiment: '快乐机器',
    question: '如果有一台机器能让你体验永恒的快乐，但你必须永远连接在上面，你会选择连接吗？',
    options: [
      { text: '会，快乐是最高价值', school: 'hedonist', explanation: '享乐主义：快乐是唯一内在的善。' },
      { text: '不会，真实的生活比虚拟快乐更有价值', school: 'authenticity', explanation: '存在主义：真实的存在先于虚假的快乐。' },
      { text: '不会，人生的意义在于成就和成长，而非快乐', school: 'eudaimonist', explanation: '幸福论（亚里士多德）：美好生活在于实现潜能。' },
      { text: '这取决于快乐的"质量"，而不仅是强度', school: 'qualitative', explanation: '密尔：高级快乐与低级快乐有质的区别。' },
    ],
  },
  {
    id: 7,
    thoughtExperiment: '自然状态',
    question: '如果没有法律和政府，人类会怎样？',
    options: [
      { text: '一切人对一切人的战争', school: 'hobbesian', explanation: '霍布斯：人性自私，需要强大的主权者维持秩序。' },
      { text: '人们会自发合作，建立互利秩序', school: 'lockean', explanation: '洛克：人有理性，自然状态有自然法。' },
      { text: '人天生善良，是社会使人堕落', school: 'rousseauean', explanation: '卢梭：文明腐蚀了人的自然善良。' },
      { text: '这个问题太简化了——人性是多面的', school: 'pluralist', explanation: '多元主义：人性不能用单一假设概括。' },
    ],
  },
  {
    id: 8,
    thoughtExperiment: '薛定谔的猫',
    question: '在打开盒子之前，猫既是死的又是活的。这说明了什么？',
    options: [
      { text: '现实依赖于观察', school: 'copenhagen', explanation: '哥本哈根诠释：观测导致波函数坍缩。' },
      { text: '猫在某个分支宇宙中确实死了，在另一个中活着', school: 'many-worlds', explanation: '多世界诠释：所有可能性都实现了，只是在不同分支。' },
      { text: '这说明量子力学还不够完善', school: 'hidden-variable', explanation: '隐变量理论：可能存在我们尚未发现的确定性变量。' },
      { text: '科学理论不必"直观"——只要预测准确就行', school: 'instrumentalist', explanation: '工具主义：理论是预测工具，不是对实在的描述。' },
    ],
  },
  {
    id: 9,
    thoughtExperiment: '诺齐克的体验机',
    question: '如果可以选择进入一台创造任何你想要的体验的机器，但你不会知道自己在机器里——你的真实生活会被遗忘。你会进入吗？',
    options: [
      { text: '会，体验就是人生的全部', school: 'experientialist', explanation: '经验主义：我们只能通过体验来生活。' },
      { text: '不会，我想真正"做"事情，而非只是体验', school: 'nozick', explanation: '诺齐克：我们重视存在和行动，不只是体验。' },
      { text: '不会，真实的痛苦比虚假的快乐更有意义', school: 'absurdist', explanation: '加缪/荒诞主义：直面荒诞比逃避更有尊严。' },
      { text: '这取决于我能否保持自我意识', school: 'identity-theorist', explanation: '身份理论：如果自我消失了，"我"就不存在了。' },
    ],
  },
  {
    id: 10,
    thoughtExperiment: '道德运气',
    question: '两个人同样醉驾，一个人安全到家，另一个人撞死了行人。他们应该受到同等的道德谴责吗？',
    options: [
      { text: '是，他们的道德过错相同——结果是运气', school: 'kantian', explanation: '康德主义：道德评判基于意图和行为本身，非结果。' },
      { text: '不是，造成了实际伤害的人应受更多谴责', school: 'consequentialist', explanation: '后果主义：结果是道德评判的重要因素。' },
      { text: '这个问题揭示了道德评判本身的局限', school: 'moral-luck-skeptic', explanation: '道德运气怀疑论：我们对道德评判的控制远比想象的少。' },
      { text: '两者都应受谴责，但程度可以不同', school: 'moderate', explanation: '温和立场：意图和结果都是相关的道德考量。' },
    ],
  },
];

type ProfileResult = {
  school: string;
  name: string;
  nameEn: string;
  description: string;
  color: string;
};

const PROFILES: Record<string, ProfileResult> = {
  utilitarian: { school: 'utilitarian', name: '功利主义者', nameEn: 'Utilitarian', description: '你关注行为的后果和总体幸福。你倾向于用理性和数据来做决策，追求最大多数人的最大幸福。', color: '#e06c75' },
  deontological: { school: 'deontological', name: '义务论者', nameEn: 'Deontologist', description: '你重视道德原则和义务。你认为某些行为本身就是对的或错的，不取决于后果。', color: '#61afef' },
  care: { school: 'care', name: '关怀伦理学者', nameEn: 'Care Ethicist', description: '你重视人际关系和具体情境。你认为道德判断不能脱离人与人之间的关怀和责任。', color: '#c678dd' },
  existentialist: { school: 'existentialist', name: '存在主义者', nameEn: 'Existentialist', description: '你重视自由、选择和责任。你认为人必须为自己的选择承担全部责任，没有预设的答案。', color: '#e5c07b' },
  aristotelian: { school: 'aristotelian', name: '亚里士多德主义者', nameEn: 'Aristotelian', description: '你追求中庸之道和美德。你认为美好的生活在于培养品格和实现人的潜能。', color: '#98c379' },
  rawlsian: { school: 'rawlsian', name: '罗尔斯主义者', nameEn: 'Rawlsian', description: '你关注公平和正义。你认为社会制度应该保障最弱势群体的利益。', color: '#56b6c2' },
  rationalist: { school: 'rationalist', name: '理性主义者', nameEn: 'Rationalist', description: '你信任理性和逻辑的力量。你认为某些知识是先天的，不依赖于经验。', color: '#61afef' },
  phenomenological: { school: 'phenomenological', name: '现象学者', nameEn: 'Phenomenologist', description: '你关注体验本身。你认为理解世界的方式是回到"事情本身"。', color: '#c678dd' },
  pragmatist: { school: 'pragmatist', name: '实用主义者', nameEn: 'Pragmatist', description: '你关注实际效果。你认为思想的价值在于它能否指导行动和解决问题。', color: '#56b6c2' },
};

function getTopSchool(answers: string[]): string {
  const counts: Record<string, number> = {};
  for (const a of answers) {
    counts[a] = (counts[a] ?? 0) + 1;
  }
  let max = 0;
  let top = answers[0] ?? 'utilitarian';
  for (const [school, count] of Object.entries(counts)) {
    if (count > max) {
      max = count;
      top = school;
    }
  }
  return top;
}

export default function PhilosophyQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentQ]!;

  const handleAnswer = useCallback(
    (optionIdx: number) => {
      const option = question.options[optionIdx]!;
      setLastAnswer(optionIdx);
      setShowExplanation(true);
      setAnswers((prev) => [...prev, option.school]);
    },
    [question],
  );

  const handleNext = useCallback(() => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((p) => p + 1);
      setShowExplanation(false);
      setLastAnswer(null);
    } else {
      setFinished(true);
    }
  }, [currentQ]);

  const handleRestart = useCallback(() => {
    setCurrentQ(0);
    setAnswers([]);
    setShowExplanation(false);
    setLastAnswer(null);
    setFinished(false);
  }, []);

  if (finished) {
    const topSchool = getTopSchool(answers);
    const profile = PROFILES[topSchool] ?? PROFILES['utilitarian']!;
    const schoolCounts: Record<string, number> = {};
    for (const a of answers) {
      schoolCounts[a] = (schoolCounts[a] ?? 0) + 1;
    }

    return (
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-border-faint bg-bg-panel rounded-lg border p-6"
        >
          <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.32em] uppercase">
            quiz result
          </p>
          <h3 className="font-display text-fg-primary mb-2 text-2xl font-semibold">
            你的哲学画像
          </h3>

          <div className="border-border-faint bg-bg-elevated mt-4 rounded-lg border p-5">
            <div className="flex items-center gap-3">
              <div className="h-4 w-1 rounded-full" style={{ backgroundColor: profile.color }} />
              <div>
                <h4 className="font-display text-lg font-semibold" style={{ color: profile.color }}>
                  {profile.name}
                </h4>
                <p className="font-mono text-[10px] tracking-[0.12em]" style={{ color: profile.color }}>
                  {profile.nameEn}
                </p>
              </div>
            </div>
            <p className="text-fg-secondary mt-3 text-sm leading-relaxed">{profile.description}</p>
          </div>

          <div className="mt-4">
            <p className="text-fg-disabled mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
              你的回答分布
            </p>
            <div className="space-y-1.5">
              {Object.entries(schoolCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([school, count]) => {
                  const p = PROFILES[school];
                  if (!p) return null;
                  return (
                    <div key={school} className="flex items-center gap-2">
                      <span className="w-24 text-right font-mono text-[10px]" style={{ color: p.color }}>
                        {p.name}
                      </span>
                      <div className="bg-border-faint h-2 flex-1 overflow-hidden rounded-full">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: p.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / QUESTIONS.length) * 100}%` }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        />
                      </div>
                      <span className="text-fg-muted w-6 font-mono text-[10px]">{count}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 mt-6 cursor-pointer border px-5 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors"
          >
            重新测试
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="border-border-faint bg-bg-panel rounded-lg border p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-fg-muted font-mono text-[10px] tracking-[0.22em] uppercase">
            {question.thoughtExperiment}
          </p>
          <span className="text-fg-disabled font-mono text-[10px]">
            {currentQ + 1} / {QUESTIONS.length}
          </span>
        </div>

        <div className="bg-border-faint mb-4 h-0.5 overflow-hidden rounded-full">
          <motion.div
            className="bg-accent-gold h-full rounded-full"
            animate={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <h3 className="font-display text-fg-primary text-lg font-semibold leading-relaxed">
          {question.question}
        </h3>

        <div className="mt-4 space-y-2">
          {question.options.map((opt, i) => {
            const isSelected = lastAnswer === i;
            const isDisabled = showExplanation;

            return (
              <button
                key={i}
                type="button"
                onClick={() => !isDisabled && handleAnswer(i)}
                disabled={isDisabled}
                className={`block w-full cursor-pointer rounded-lg border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-accent-gold/50 bg-accent-gold/10'
                    : isDisabled
                      ? 'border-border-faint opacity-50'
                      : 'border-border-faint hover:border-fg-disabled/30 hover:bg-bg-elevated'
                }`}
              >
                <span className="text-fg-primary text-sm leading-relaxed">{opt.text}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showExplanation && lastAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-accent-gold/20 bg-accent-gold/5 mt-4 rounded-lg border p-4">
                <p className="text-accent-gold font-mono text-[9px] tracking-[0.18em] uppercase">哲学解读</p>
                <p className="text-fg-secondary mt-1 text-sm leading-relaxed">
                  {question.options[lastAnswer]!.explanation}
                </p>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 mt-3 w-full cursor-pointer border px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors"
              >
                {currentQ < QUESTIONS.length - 1 ? '下一题' : '查看结果'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
