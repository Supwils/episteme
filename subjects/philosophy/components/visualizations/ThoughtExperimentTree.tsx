'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type EthicalFramework = 'utilitarian' | 'deontological' | 'virtue';

interface EthicalAnalysis {
  framework: string;
  frameworkEn: string;
  verdict: string;
  reasoning: string;
  color: string;
}

interface TreeNode {
  id: string;
  scenario: string;
  description: string;
  choices: {
    label: string;
    labelEn: string;
    nextId: string | null;
    stats: number;
  }[];
}

interface Scenario {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  tree: Record<string, TreeNode>;
  analyses: Record<string, Record<EthicalFramework, EthicalAnalysis>>;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'classic',
    title: '经典电车难题',
    titleEn: 'Classic Trolley Problem',
    description: '一辆失控的电车正驶向五个人。你可以拉动杠杆，将电车引向另一条轨道，但那条轨道上有一个人。',
    tree: {
      root: {
        id: 'root',
        scenario: '电车正驶向五个人，你手边有一个拉杆。',
        description: '你必须在几秒内做出决定。',
        choices: [
          { label: '拉动杠杆', labelEn: 'Pull the lever', nextId: 'pulled', stats: 68 },
          { label: '不拉杠杆', labelEn: "Don't pull", nextId: 'not-pulled', stats: 32 },
        ],
      },
      pulled: {
        id: 'pulled',
        scenario: '你拉动了杠杆。电车转向侧轨。',
        description: '1人死亡，5人获救。你的行为直接导致了那1人的死亡。',
        choices: [],
      },
      'not-pulled': {
        id: 'not-pulled',
        scenario: '你没有拉动杠杆。',
        description: '电车继续前行，5人死亡。你选择了不干预。',
        choices: [],
      },
    },
    analyses: {
      pulled: {
        utilitarian: {
          framework: '功利主义',
          frameworkEn: 'Utilitarianism',
          verdict: '正确选择',
          reasoning: '边沁和密尔会认为：5条生命 > 1条生命。最大化总体幸福，拉杆是道德义务。',
          color: 'var(--color-accent-sage)',
        },
        deontological: {
          framework: '义务论',
          frameworkEn: 'Deontology',
          verdict: '道德困境',
          reasoning: '康德会质疑：你把那1个人当作了"手段"而非"目的"。主动杀人即使为了救更多人，也违背了绝对命令。',
          color: 'var(--color-accent-gold)',
        },
        virtue: {
          framework: '美德伦理',
          frameworkEn: 'Virtue Ethics',
          verdict: '取决于品格',
          reasoning: '亚里士多德会问：一个有勇气和正义美德的人会怎么做？关键是行动者的品格和动机。',
          color: 'var(--color-warning)',
        },
      },
      'not-pulled': {
        utilitarian: {
          framework: '功利主义',
          frameworkEn: 'Utilitarianism',
          verdict: '错误选择',
          reasoning: '从结果看，5人死亡比1人死亡造成更大的总体不幸。不作为也是一种选择，但后果更差。',
          color: 'var(--color-danger)',
        },
        deontological: {
          framework: '义务论',
          frameworkEn: 'Deontology',
          verdict: '可辩护',
          reasoning: '康德可能支持：你没有主动杀害任何人。不作为与主动杀人有本质区别——Doctrine of Double Effect。',
          color: 'var(--color-accent-sage)',
        },
        virtue: {
          framework: '美德伦理',
          frameworkEn: 'Virtue Ethics',
          verdict: '值得反思',
          reasoning: '一个有同情心的人会眼睁睁看着5人死去吗？但勇气也意味着承担不行动的后果。',
          color: 'var(--color-warning)',
        },
      },
    },
  },
  {
    id: 'fat-man',
    title: '胖子变体',
    titleEn: 'Fat Man Variant',
    description: '你站在天桥上，电车正驶向五个人。旁边站着一个胖子。如果你推他下去，他的身体能挡住电车。',
    tree: {
      root: {
        id: 'root',
        scenario: '电车正驶向五个人，你站在天桥上。旁边有一个胖子。',
        description: '推他下去可以挡住电车，但他会死。',
        choices: [
          { label: '推胖子下桥', labelEn: 'Push the fat man', nextId: 'pushed', stats: 15 },
          { label: '不推', labelEn: "Don't push", nextId: 'not-pushed', stats: 85 },
        ],
      },
      pushed: {
        id: 'pushed',
        scenario: '你把胖子推下了桥。',
        description: '他的身体挡住了电车，5人获救。但你亲手杀了一个人。',
        choices: [],
      },
      'not-pushed': {
        id: 'not-pushed',
        scenario: '你没有推胖子。',
        description: '电车撞上了五个人。你保持了"干净的手"。',
        choices: [],
      },
    },
    analyses: {
      pushed: {
        utilitarian: {
          framework: '功利主义',
          frameworkEn: 'Utilitarianism',
          verdict: '逻辑一致',
          reasoning: '如果功利主义在经典版本中支持拉杆，那推人也应该支持——结果相同：1死5活。',
          color: 'var(--color-accent-sage)',
        },
        deontological: {
          framework: '义务论',
          frameworkEn: 'Deontology',
          verdict: '严重违反',
          reasoning: '推人致死是直接把人当作工具。这比拉杆更明显地违反了人的尊严和绝对命令。',
          color: 'var(--color-danger)',
        },
        virtue: {
          framework: '美德伦理',
          frameworkEn: 'Virtue Ethics',
          verdict: '品格败坏',
          reasoning: '一个有美德的人不会把无辜的人推下桥。这种行为与勇气和正义的美德相悖。',
          color: 'var(--color-danger)',
        },
      },
      'not-pushed': {
        utilitarian: {
          framework: '功利主义',
          frameworkEn: 'Utilitarianism',
          verdict: '不一致',
          reasoning: '如果你在经典版本中选择拉杆，为什么不推人？结果相同，但你的直觉不同。这暴露了功利主义的反直觉性。',
          color: 'var(--color-warning)',
        },
        deontological: {
          framework: '义务论',
          frameworkEn: 'Deontology',
          verdict: '道德正确',
          reasoning: '你没有主动伤害任何人。保持了道德清白，即使结果不理想。',
          color: 'var(--color-accent-sage)',
        },
        virtue: {
          framework: '美德伦理',
          frameworkEn: 'Virtue Ethics',
          verdict: '品格正直',
          reasoning: '拒绝把人当作手段，体现了对人性尊严的尊重。',
          color: 'var(--color-accent-sage)',
        },
      },
    },
  },
  {
    id: 'loop',
    title: '环形变体',
    titleEn: 'Loop Variant',
    description: '电车驶向五个人。侧轨是一个环形，电车绕回后会撞死那1个人——但如果那1个人不在那里，电车就不会停下来。',
    tree: {
      root: {
        id: 'root',
        scenario: '侧轨是环形的。电车转向后会绕回来撞死轨道上的人。',
        description: '那1个人的身体恰好能让电车停下来，否则电车会继续撞上5人。',
        choices: [
          { label: '让电车转向侧轨', labelEn: 'Divert to loop', nextId: 'diverted', stats: 52 },
          { label: '不干预', labelEn: "Don't intervene", nextId: 'not-diverted', stats: 48 },
        ],
      },
      diverted: {
        id: 'diverted',
        scenario: '电车转入环形轨道，撞死了1个人并停下。',
        description: '5人获救。那1个人的死亡是"必要"的——否则电车会绕回来撞上5人。',
        choices: [],
      },
      'not-diverted': {
        id: 'not-diverted',
        scenario: '电车继续沿主轨道前行。',
        description: '5人死亡。你没有把任何人当作"挡箭牌"。',
        choices: [],
      },
    },
    analyses: {
      diverted: {
        utilitarian: {
          framework: '功利主义',
          frameworkEn: 'Utilitarianism',
          verdict: '正确',
          reasoning: '结果最大化：1死 vs 5死。从纯粹后果看，转向是正确的。',
          color: 'var(--color-accent-sage)',
        },
        deontological: {
          framework: '义务论',
          frameworkEn: 'Deontology',
          verdict: '更接近"手段"',
          reasoning: '环形变体让那1个人成为了"刹车"——他被当作了工具。这比经典版本更接近违反绝对命令。',
          color: 'var(--color-warning)',
        },
        virtue: {
          framework: '美德伦理',
          frameworkEn: 'Virtue Ethics',
          verdict: '需要反思',
          reasoning: '这个变体模糊了"副作用"和"手段"的界限。一个审慎的人需要深思。',
          color: 'var(--color-warning)',
        },
      },
      'not-diverted': {
        utilitarian: {
          framework: '功利主义',
          frameworkEn: 'Utilitarianism',
          verdict: '不可辩护',
          reasoning: '明知可以减少死亡却不作为，功利主义无法为这种选择辩护。',
          color: 'var(--color-danger)',
        },
        deontological: {
          framework: '义务论',
          frameworkEn: 'Deontology',
          verdict: '可辩护',
          reasoning: '你没有利用任何人。不把人当作手段，即使结果更差，也维护了道德原则。',
          color: 'var(--color-accent-sage)',
        },
        virtue: {
          framework: '美德伦理',
          frameworkEn: 'Virtue Ethics',
          verdict: '勇气还是残忍？',
          reasoning: '眼睁睁看5人死去是勇气还是残忍？美德伦理在此面临真正的张力。',
          color: 'var(--color-warning)',
        },
      },
    },
  },
  {
    id: 'transplant',
    title: '器官移植',
    titleEn: 'Transplant Variant',
    description: '你是一个医生。有五个病人分别需要不同的器官移植。一个健康的来做体检的人恰好与他们匹配。',
    tree: {
      root: {
        id: 'root',
        scenario: '五个病人濒临死亡，需要器官移植。',
        description: '一个健康的体检者恰好匹配所有器官。杀他可以救五人。',
        choices: [
          { label: '牺牲体检者', labelEn: 'Sacrifice the patient', nextId: 'sacrificed', stats: 8 },
          { label: '不杀害体检者', labelEn: "Don't kill", nextId: 'spared', stats: 92 },
        ],
      },
      sacrificed: {
        id: 'sacrificed',
        scenario: '你取走了体检者的器官。',
        description: '五人获救，但你杀了一个信任你的人。医学伦理被彻底践踏。',
        choices: [],
      },
      spared: {
        id: 'spared',
        scenario: '你没有伤害体检者。',
        description: '五个病人可能死去，但医生的誓言得到了维护。',
        choices: [],
      },
    },
    analyses: {
      sacrificed: {
        utilitarian: {
          framework: '功利主义',
          frameworkEn: 'Utilitarianism',
          verdict: '逻辑推论',
          reasoning: '如果纯粹按功利计算，5 > 1。但这恰恰暴露了朴素功利主义的荒谬推论。',
          color: 'var(--color-warning)',
        },
        deontological: {
          framework: '义务论',
          frameworkEn: 'Deontology',
          verdict: '绝对错误',
          reasoning: '杀害无辜者、背叛信任、违反誓言——这多重违反了康德的绝对命令。',
          color: 'var(--color-danger)',
        },
        virtue: {
          framework: '美德伦理',
          frameworkEn: 'Virtue Ethics',
          verdict: '背弃医德',
          reasoning: '希波克拉底誓言要求"首先，不伤害"。一个有医德的医生绝不会这样做。',
          color: 'var(--color-danger)',
        },
      },
      spared: {
        utilitarian: {
          framework: '功利主义',
          frameworkEn: 'Utilitarianism',
          verdict: '需要更复杂的模型',
          reasoning: 'Rule utilitarianism（规则功利主义）会支持不杀：如果医生可以杀病人取器官，谁还敢去医院？',
          color: 'var(--color-accent-sage)',
        },
        deontological: {
          framework: '义务论',
          frameworkEn: 'Deontology',
          verdict: '绝对正确',
          reasoning: '保护无辜生命、维护信任关系，这是道德的基石。',
          color: 'var(--color-accent-sage)',
        },
        virtue: {
          framework: '美德伦理',
          frameworkEn: 'Virtue Ethics',
          verdict: '医者仁心',
          reasoning: '一个有医德、有同情心的医生会守护每一个信任他的生命。',
          color: 'var(--color-accent-sage)',
        },
      },
    },
  },
  {
    id: 'autonomous',
    title: '自动驾驶',
    titleEn: 'Autonomous Vehicle',
    description: '你正在为自动驾驶汽车编程。在不可避免的碰撞中，AI必须选择：撞向行人还是牺牲车主？',
    tree: {
      root: {
        id: 'root',
        scenario: '刹车失灵。前方有五个行人，旁边有一堵墙。',
        description: '撞墙会牺牲车主（你），转向会撞上行人。',
        choices: [
          { label: '编程：保护行人', labelEn: 'Protect pedestrians', nextId: 'protect-pedestrians', stats: 42 },
          { label: '编程：保护车主', labelEn: 'Protect passenger', nextId: 'protect-passenger', stats: 35 },
          { label: '编程：随机选择', labelEn: 'Random choice', nextId: 'random', stats: 23 },
        ],
      },
      'protect-pedestrians': {
        id: 'protect-pedestrians',
        scenario: 'AI选择撞墙，牺牲车主。',
        description: '五个行人获救，但车主死亡。谁会买一辆可能杀死自己的车？',
        choices: [],
      },
      'protect-passenger': {
        id: 'protect-passenger',
        scenario: 'AI选择撞向行人。',
        description: '车主安全，但五个行人死亡。AI成了杀人机器。',
        choices: [],
      },
      random: {
        id: 'random',
        scenario: 'AI随机选择。',
        description: '算法不做道德判断，把命运交给概率。这公平吗？',
        choices: [],
      },
    },
    analyses: {
      'protect-pedestrians': {
        utilitarian: {
          framework: '功利主义',
          frameworkEn: 'Utilitarianism',
          verdict: '最大化生命',
          reasoning: '5 > 1，保护更多生命是正确的编程选择。',
          color: 'var(--color-accent-sage)',
        },
        deontological: {
          framework: '义务论',
          frameworkEn: 'Deontology',
          verdict: '编程者的责任',
          reasoning: '预先编程"杀车主"等于预谋杀人。即使是为了救更多人，这也违反了道德法则。',
          color: 'var(--color-warning)',
        },
        virtue: {
          framework: '美德伦理',
          frameworkEn: 'Virtue Ethics',
          verdict: '程序员的品格',
          reasoning: '一个有正义感的程序员会优先保护弱势群体（行人）。',
          color: 'var(--color-accent-sage)',
        },
      },
      'protect-passenger': {
        utilitarian: {
          framework: '功利主义',
          frameworkEn: 'Utilitarianism',
          verdict: '需要考虑连锁效应',
          reasoning: '如果所有车都这样编程，行人会抵制自动驾驶，整体安全反而下降。',
          color: 'var(--color-warning)',
        },
        deontological: {
          framework: '义务论',
          frameworkEn: 'Deontology',
          verdict: '契约义务',
          reasoning: '制造商对车主有契约义务。产品不应主动伤害购买者。',
          color: 'var(--color-accent-sage)',
        },
        virtue: {
          framework: '美德伦理',
          frameworkEn: 'Virtue Ethics',
          verdict: '自保还是自私？',
          reasoning: '保护自己是本能，但以他人生命为代价的自保是否体现了美德？',
          color: 'var(--color-warning)',
        },
      },
      random: {
        utilitarian: {
          framework: '功利主义',
          frameworkEn: 'Utilitarianism',
          verdict: '放弃优化',
          reasoning: '随机选择放弃了最大化幸福的机会，但从概率上可能产生可接受的平均结果。',
          color: 'var(--color-fg-muted)',
        },
        deontological: {
          framework: '义务论',
          frameworkEn: 'Deontology',
          verdict: '推卸责任',
          reasoning: '把道德决策交给骰子是推卸编程者的道德责任。',
          color: 'var(--color-warning)',
        },
        virtue: {
          framework: '美德伦理',
          frameworkEn: 'Virtue Ethics',
          verdict: '回避智慧',
          reasoning: '放弃运用实践智慧（phronesis）来做出道德判断，本身就是一种品格缺陷。',
          color: 'var(--color-warning)',
        },
      },
    },
  },
];

function TrolleySVG({ nodeId, scenarioId }: { nodeId: string; scenarioId: string }) {
  const isResolved = nodeId !== 'root';
  const isClassic = scenarioId === 'classic';
  const isFatMan = scenarioId === 'fat-man';
  const isTransplant = scenarioId === 'transplant';
  const isAutonomous = scenarioId === 'autonomous';

  if (isTransplant) {
    return (
      <svg viewBox="0 0 500 260" className="h-full w-full">
        <rect x="180" y="30" width="140" height="70" rx="8" fill="var(--color-bg-elevated)" stroke="var(--color-border-subtle)" strokeWidth="1" />
        <text x="250" y="55" textAnchor="middle" fill="var(--color-fg-muted)" fontSize="10" fontFamily="var(--font-mono)">手术室</text>
        <text x="250" y="75" textAnchor="middle" fill="var(--color-fg-secondary)" fontSize="9" fontFamily="var(--font-mono)">Operating Room</text>

        <g>
          <circle cx="130" cy="180" r="8" fill="var(--color-accent-sage)" />
          <line x1="130" y1="188" x2="130" y2="210" stroke="var(--color-accent-sage)" strokeWidth="2" />
          <text x="130" y="170" textAnchor="middle" fill="var(--color-accent-sage)" fontSize="9" fontFamily="var(--font-mono)">健康体检者</text>
          {isResolved && nodeId === 'sacrificed' && (
            <text x="130" y="230" textAnchor="middle" fill="var(--color-danger)" fontSize="11" fontFamily="var(--font-mono)">✕</text>
          )}
        </g>

        {[310, 340, 370, 400, 430].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="180" r="8" fill={isResolved && nodeId === 'spared' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} />
            <line x1={x} y1="188" x2={x} y2="210" stroke={isResolved && nodeId === 'spared' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} strokeWidth="2" />
            <text x={x} y="170" textAnchor="middle" fill={isResolved && nodeId === 'spared' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} fontSize="8" fontFamily="var(--font-mono)">病人{i + 1}</text>
            {isResolved && nodeId === 'spared' && (
              <text x={x} y="230" textAnchor="middle" fill="var(--color-fg-disabled)" fontSize="10" fontFamily="var(--font-mono)">✕</text>
            )}
          </g>
        ))}

        <text x="250" y="250" textAnchor="middle" fill="var(--color-fg-disabled)" fontSize="10" fontFamily="var(--font-display)" fontStyle="italic">
          器官移植 · Transplant
        </text>
      </svg>
    );
  }

  if (isAutonomous) {
    return (
      <svg viewBox="0 0 500 260" className="h-full w-full">
        <rect x="200" y="110" width="60" height="35" rx="4" fill="var(--color-info)" opacity="0.7" />
        <text x="230" y="132" textAnchor="middle" fill="var(--color-bg-deep)" fontSize="8" fontFamily="var(--font-mono)">AUTO</text>
        <text x="230" y="100" textAnchor="middle" fill="var(--color-fg-muted)" fontSize="9" fontFamily="var(--font-mono)">自动驾驶汽车</text>

        <line x1="100" y1="170" x2="400" y2="170" stroke="var(--color-fg-disabled)" strokeWidth="2" />

        <g>
          <rect x="60" y="150" width="30" height="20" rx="2" fill="var(--color-fg-disabled)" opacity="0.5" />
          <text x="75" y="190" textAnchor="middle" fill="var(--color-fg-muted)" fontSize="8" fontFamily="var(--font-mono)">墙</text>
        </g>

        {[300, 320, 340, 360, 380].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="150" r="6" fill={isResolved && nodeId === 'protect-passenger' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} />
            <line x1={x} y1="156" x2={x} y2="170" stroke={isResolved && nodeId === 'protect-passenger' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} strokeWidth="1.5" />
          </g>
        ))}

        {isResolved && (
          <motion.line
            x1="230" y1="145"
            x2={nodeId === 'protect-pedestrians' ? '75' : nodeId === 'protect-passenger' ? '340' : '200'}
            y2={nodeId === 'protect-pedestrians' ? '160' : nodeId === 'protect-passenger' ? '150' : '160'}
            stroke="var(--color-danger)"
            strokeWidth="2"
            strokeDasharray="6 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}

        <text x="250" y="240" textAnchor="middle" fill="var(--color-fg-disabled)" fontSize="10" fontFamily="var(--font-display)" fontStyle="italic">
          自动驾驶 · Autonomous Vehicle
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 500 260" className="h-full w-full">
      <line x1="60" y1="180" x2="440" y2="180" stroke="var(--color-fg-disabled)" strokeWidth="3" />

      {isClassic && (
        <>
          <line x1="60" y1="160" x2="60" y2="200" stroke="var(--color-fg-disabled)" strokeWidth="2" />
          <line x1="200" y1="160" x2="200" y2="200" stroke="var(--color-fg-disabled)" strokeWidth="2" />
          <line x1="440" y1="160" x2="440" y2="200" stroke="var(--color-fg-disabled)" strokeWidth="2" />

          <line x1="200" y1="180" x2="120" y2="130" stroke="var(--color-fg-disabled)" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="200" y1="180" x2="350" y2="130" stroke="var(--color-fg-disabled)" strokeWidth="1" strokeDasharray="4 2" />

          {!isResolved && (
            <motion.g exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <line x1="200" y1="180" x2="200" y2="100" stroke="var(--color-accent-gold)" strokeWidth="3" />
              <line x1="200" y1="100" x2="165" y2="82" stroke="var(--color-accent-gold)" strokeWidth="3" />
              <circle cx="165" cy="82" r="6" fill="var(--color-accent-gold)" />
            </motion.g>
          )}
        </>
      )}

      {isClassic && (
        <>
          <motion.g
            animate={{
              x: isResolved
                ? nodeId === 'pulled' ? -140 : 80
                : 0,
            }}
            transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <rect x="280" y="155" width="50" height="25" rx="3" fill="var(--color-fg-muted)" opacity="0.8" />
            <text x="305" y="172" textAnchor="middle" fill="var(--color-bg-deep)" fontSize="8" fontFamily="var(--font-mono)">TROLLEY</text>
            <circle cx="290" cy="183" r="5" fill="var(--color-fg-disabled)" />
            <circle cx="320" cy="183" r="5" fill="var(--color-fg-disabled)" />
          </motion.g>

          <g>
            <circle cx="80" cy="150" r="7" fill={isResolved && nodeId === 'pulled' ? 'var(--color-fg-disabled)' : 'var(--color-accent-sage)'} />
            <line x1="80" y1="157" x2="80" y2="175" stroke={isResolved && nodeId === 'pulled' ? 'var(--color-fg-disabled)' : 'var(--color-accent-sage)'} strokeWidth="2" />
            <text x="80" y="140" textAnchor="middle" fill={isResolved && nodeId === 'pulled' ? 'var(--color-fg-disabled)' : 'var(--color-accent-sage)'} fontSize="9" fontFamily="var(--font-mono)">1人</text>
          </g>

          <g>
            {[340, 360, 380, 400, 420].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="150" r="7" fill={isResolved && nodeId === 'not-pulled' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} />
                <line x1={x} y1="157" x2={x} y2="175" stroke={isResolved && nodeId === 'not-pulled' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} strokeWidth="2" />
              </g>
            ))}
            <text x="380" y="140" textAnchor="middle" fill={isResolved && nodeId === 'not-pulled' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} fontSize="9" fontFamily="var(--font-mono)">5人</text>
          </g>
        </>
      )}

      {isFatMan && (
        <>
          <motion.g
            animate={{ x: isResolved ? (nodeId === 'pushed' ? -60 : 100) : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <rect x="280" y="155" width="50" height="25" rx="3" fill="var(--color-fg-muted)" opacity="0.8" />
            <text x="305" y="172" textAnchor="middle" fill="var(--color-bg-deep)" fontSize="8" fontFamily="var(--font-mono)">TROLLEY</text>
            <circle cx="290" cy="183" r="5" fill="var(--color-fg-disabled)" />
            <circle cx="320" cy="183" r="5" fill="var(--color-fg-disabled)" />
          </motion.g>

          <line x1="200" y1="100" x2="200" y2="180" stroke="var(--color-fg-disabled)" strokeWidth="1" />
          <text x="200" y="90" textAnchor="middle" fill="var(--color-fg-muted)" fontSize="9" fontFamily="var(--font-mono)">天桥</text>

          <motion.g
            animate={{ y: isResolved && nodeId === 'pushed' ? 70 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <circle cx="200" cy="120" r="10" fill={isResolved && nodeId === 'pushed' ? 'var(--color-fg-disabled)' : 'var(--color-warning)'} />
            <line x1="200" y1="130" x2="200" y2="155" stroke={isResolved && nodeId === 'pushed' ? 'var(--color-fg-disabled)' : 'var(--color-warning)'} strokeWidth="2" />
            <text x="218" y="125" fill={isResolved && nodeId === 'pushed' ? 'var(--color-fg-disabled)' : 'var(--color-warning)'} fontSize="8" fontFamily="var(--font-mono)">胖子</text>
          </motion.g>

          <g>
            {[340, 360, 380, 400, 420].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="150" r="7" fill={isResolved && nodeId === 'not-pushed' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} />
                <line x1={x} y1="157" x2={x} y2="175" stroke={isResolved && nodeId === 'not-pushed' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} strokeWidth="2" />
              </g>
            ))}
            <text x="380" y="140" textAnchor="middle" fill={isResolved && nodeId === 'not-pushed' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} fontSize="9" fontFamily="var(--font-mono)">5人</text>
          </g>
        </>
      )}

      {scenarioId === 'loop' && (
        <>
          <path
            d="M 200 180 Q 200 100 300 100 Q 400 100 400 180"
            fill="none"
            stroke="var(--color-fg-disabled)"
            strokeWidth="2"
            strokeDasharray="6 3"
          />

          <motion.g
            animate={{
              x: isResolved ? (nodeId === 'diverted' ? 40 : 120) : 0,
            }}
            transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <rect x="280" y="155" width="50" height="25" rx="3" fill="var(--color-fg-muted)" opacity="0.8" />
            <text x="305" y="172" textAnchor="middle" fill="var(--color-bg-deep)" fontSize="8" fontFamily="var(--font-mono)">TROLLEY</text>
          </motion.g>

          <circle cx="300" cy="110" r="7" fill={isResolved && nodeId === 'diverted' ? 'var(--color-fg-disabled)' : 'var(--color-accent-sage)'} />
          <text x="300" y="100" textAnchor="middle" fill={isResolved && nodeId === 'diverted' ? 'var(--color-fg-disabled)' : 'var(--color-accent-sage)'} fontSize="8" fontFamily="var(--font-mono)">1人（挡车）</text>

          <g>
            {[60, 80, 100, 120, 140].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="150" r="7" fill={isResolved && nodeId === 'not-diverted' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} />
                <line x1={x} y1="157" x2={x} y2="175" stroke={isResolved && nodeId === 'not-diverted' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} strokeWidth="2" />
              </g>
            ))}
            <text x="100" y="140" textAnchor="middle" fill={isResolved && nodeId === 'not-diverted' ? 'var(--color-fg-disabled)' : 'var(--color-danger)'} fontSize="9" fontFamily="var(--font-mono)">5人</text>
          </g>
        </>
      )}

      {isResolved && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <text
            x="250"
            y="240"
            textAnchor="middle"
            fill={nodeId.includes('not') || nodeId === 'spared' ? 'var(--color-fg-muted)' : 'var(--color-danger)'}
            fontSize="10"
            fontFamily="var(--font-display)"
            fontStyle="italic"
          >
            {scenarioId === 'classic' ? '经典电车难题 · Classic Trolley' :
             scenarioId === 'fat-man' ? '胖子变体 · Fat Man' :
             '环形变体 · Loop'}
          </text>
        </motion.g>
      )}
    </svg>
  );
}

function EthicalAnalysisPanel({ analysis }: { analysis: Record<EthicalFramework, EthicalAnalysis> }) {
  const frameworks: EthicalFramework[] = ['utilitarian', 'deontological', 'virtue'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className="mt-5 space-y-3"
    >
      <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent-gold)] uppercase">
        伦理分析 · Ethical Analysis
      </p>
      {frameworks.map((fw) => {
        const a = analysis[fw];
        return (
          <motion.div
            key={fw}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: fw === 'utilitarian' ? 0.1 : fw === 'deontological' ? 0.25 : 0.4 }}
            className="rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-wider" style={{ color: a.color }}>
                {a.framework}
              </span>
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider"
                style={{ color: a.color, background: `color-mix(in oklab, ${a.color} 15%, transparent)` }}
              >
                {a.verdict}
              </span>
            </div>
            <p className="font-mono text-[10px] tracking-wider text-[var(--color-fg-disabled)] mt-0.5">
              {a.frameworkEn}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-secondary)]">
              {a.reasoning}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ScenarioSelector({
  scenarios,
  activeId,
  onSelect,
}: {
  scenarios: Scenario[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {scenarios.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`touch-target cursor-pointer border px-3 py-2 font-mono text-xs tracking-wide transition-colors ${
            activeId === s.id
              ? 'border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]'
              : 'border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg-disabled)] hover:text-[var(--color-fg-secondary)]'
          }`}
        >
          {s.title}
        </button>
      ))}
    </div>
  );
}

export default function ThoughtExperimentTree() {
  const [activeScenarioId, setActiveScenarioId] = useState('classic');
  const [currentNodeId, setCurrentNodeId] = useState('root');
  const [history, setHistory] = useState<string[]>(['root']);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeScenario = SCENARIOS.find((s) => s.id === activeScenarioId) ?? SCENARIOS[0]!;
  const currentNode = activeScenario.tree[currentNodeId];

  useEffect(() => {
    const timer = timerRef.current;
    return () => {
      if (timer !== null) clearTimeout(timer);
    };
  }, []);

  const handleChoice = useCallback((nextId: string) => {
    setCurrentNodeId(nextId);
    setHistory((prev) => [...prev, nextId]);
  }, []);

  const handleScenarioChange = useCallback((id: string) => {
    setActiveScenarioId(id);
    setCurrentNodeId('root');
    setHistory(['root']);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentNodeId('root');
    setHistory(['root']);
  }, []);

  const handleBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentNodeId(newHistory[newHistory.length - 1]!);
    }
  }, [history]);

  const isResolved = !currentNode?.choices.length;
  const analysis = activeScenario.analyses[currentNodeId];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] p-6">
        <div className="mb-5">
          <p className="mb-3 font-mono text-[10px] tracking-[0.4em] text-[var(--color-accent-gold)] uppercase">
            思想实验决策树 · Thought Experiment Decision Tree
          </p>
          <ScenarioSelector
            scenarios={SCENARIOS}
            activeId={activeScenarioId}
            onSelect={handleScenarioChange}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenarioId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <h3 className="font-display text-lg text-[var(--color-fg-primary)]">
                {activeScenario.title}
              </h3>
              <p className="font-mono text-[10px] tracking-wider text-[var(--color-fg-disabled)]">
                {activeScenario.titleEn}
              </p>
              <p className="mt-2 text-sm text-[var(--color-fg-secondary)]">
                {activeScenario.description}
              </p>
            </div>

            <div className="relative h-56 w-full sm:h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeScenarioId}-${currentNodeId}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full"
                >
                  <TrolleySVG nodeId={currentNodeId} scenarioId={activeScenarioId} />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentNodeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="mt-4 border-l-2 border-[var(--color-accent-gold)] pl-4">
                  <p className="font-display text-base text-[var(--color-fg-primary)]">
                    {currentNode?.scenario}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-fg-secondary)]">
                    {currentNode?.description}
                  </p>
                </div>

                {currentNode?.choices.length ? (
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    {currentNode.choices.map((c) => (
                      <button
                        key={c.nextId}
                        onClick={() => handleChoice(c.nextId!)}
                        className="touch-target flex-1 cursor-pointer border border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 px-5 py-3 font-mono text-sm tracking-wide text-[var(--color-accent-gold)] transition-colors hover:bg-[var(--color-accent-gold)]/20"
                      >
                        <span>{c.label}</span>
                        <span className="ml-2 text-[10px] text-[var(--color-fg-disabled)]">
                          {c.labelEn}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}

                {isResolved && analysis && (
                  <EthicalAnalysisPanel analysis={analysis} />
                )}

                {isResolved && (
                  <div className="mt-5 rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-elevated)] p-4">
                    <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent-gold)] uppercase">
                      调查数据 · Survey Results
                    </p>
                    <div className="space-y-2">
                      {activeScenario.tree['root']?.choices.map((c) => (
                        <div key={c.nextId} className="flex items-center gap-3">
                          <span className="w-24 text-right font-mono text-xs text-[var(--color-fg-muted)]">
                            {c.label}
                          </span>
                          <div className="flex-1 h-5 overflow-hidden rounded-sm bg-[var(--color-bg-deep)]">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${c.stats}%` }}
                              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                              className="h-full"
                              style={{
                                background: c.nextId === currentNodeId
                                  ? 'var(--color-accent-gold)'
                                  : 'var(--color-fg-disabled)',
                              }}
                            />
                          </div>
                          <span className="w-10 font-mono text-xs text-[var(--color-fg-primary)]">
                            {c.stats}%
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-[var(--color-fg-muted)]">
                      虚构数据，基于哲学课堂调查趋势（Foot, 1967; Thomson, 1985; Hauser et al., 2007）
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex gap-3">
              {history.length > 1 && (
                <button
                  onClick={handleBack}
                  className="touch-target cursor-pointer border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] px-4 py-2 font-mono text-xs tracking-wider text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-disabled)] hover:text-[var(--color-fg-secondary)]"
                >
                  ← 上一步
                </button>
              )}
              {currentNodeId !== 'root' && (
                <button
                  onClick={handleReset}
                  className="touch-target cursor-pointer border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] px-4 py-2 font-mono text-xs tracking-wider text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-disabled)] hover:text-[var(--color-fg-secondary)]"
                >
                  重新选择
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
