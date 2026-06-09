'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = [
  { id: 'shadows', label: '影子', description: '囚徒只能看到墙上的影子，以为那就是真实。' },
  { id: 'fire', label: '火光', description: '转头看到火光，意识到影子只是投射。' },
  { id: 'outside', label: '洞外', description: '走出洞穴，看到真实的事物。' },
  { id: 'sun', label: '太阳', description: '抬头看到太阳——一切存在的源头。' },
] as const;

type Stage = (typeof STAGES)[number]['id'];

const STAGE_THRESHOLDS = [0, 0.25, 0.5, 0.75] as const;

export default function PlatosCave() {
  const [stage, setStage] = useState<Stage>('shadows');
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const updateStage = useCallback((deg: number) => {
    const normalized = Math.max(0, Math.min(1, deg / 270));
    if (normalized >= STAGE_THRESHOLDS[3]) setStage('sun');
    else if (normalized >= STAGE_THRESHOLDS[2]) setStage('outside');
    else if (normalized >= STAGE_THRESHOLDS[1]) setStage('fire');
    else setStage('shadows');
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - startX.current;
      const newRotation = Math.max(0, Math.min(270, rotation + delta * 0.5));
      setRotation(newRotation);
      startX.current = e.clientX;
      updateStage(newRotation);
    },
    [rotation, updateStage],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const stageIndex = STAGES.findIndex((s) => s.id === stage);
  const stageData = STAGES[stageIndex]!;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative overflow-hidden rounded-lg border border-[var(--color-border-faint)] bg-[var(--color-bg-panel)] p-6">
        <div className="relative h-64 w-full select-none sm:h-72" ref={containerRef}>
          <svg viewBox="0 0 500 260" className="h-full w-full">
            <path d="M 80 40 Q 80 220 250 220 Q 420 220 420 40" fill="var(--color-bg-deep)" stroke="var(--color-fg-disabled)" strokeWidth="2" />

            <motion.g
              animate={{
                opacity: stage === 'shadows' ? 1 : stage === 'fire' ? 0.5 : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              <rect x="180" y="130" width="20" height="60" rx="2" fill="var(--color-fg-disabled)" opacity="0.4" />
              <circle cx="200" cy="115" r="10" fill="var(--color-fg-disabled)" opacity="0.4" />
              <rect x="240" y="140" width="15" height="50" rx="2" fill="var(--color-fg-disabled)" opacity="0.3" />
              <circle cx="248" cy="128" r="8" fill="var(--color-fg-disabled)" opacity="0.3" />
              <rect x="280" y="135" width="18" height="55" rx="2" fill="var(--color-fg-disabled)" opacity="0.35" />
              <circle cx="289" cy="120" r="9" fill="var(--color-fg-disabled)" opacity="0.35" />
            </motion.g>

            <motion.g
              animate={{ opacity: stage === 'fire' || stage === 'shadows' ? 1 : 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <motion.ellipse
                cx="130"
                cy="180"
                rx="12"
                ry="20"
                fill="var(--color-warning)"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <rect x="126" y="195" width="8" height="15" fill="var(--color-fg-disabled)" />
            </motion.g>

            <motion.g
              animate={{ opacity: stage === 'outside' || stage === 'sun' ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <circle cx="300" cy="100" r="15" fill="var(--color-accent-sage)" opacity="0.3" />
              <rect x="290" y="140" width="20" height="50" fill="var(--color-accent-sage)" opacity="0.2" />
              <circle cx="360" cy="110" r="12" fill="var(--color-accent-sage)" opacity="0.25" />
              <rect x="352" y="140" width="16" height="45" fill="var(--color-accent-sage)" opacity="0.15" />
            </motion.g>

            <motion.g
              animate={{ opacity: stage === 'sun' ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.circle
                cx="350"
                cy="50"
                r="25"
                fill="var(--color-accent-gold)"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <line
                    key={angle}
                    x1={350 + Math.cos(rad) * 30}
                    y1={50 + Math.sin(rad) * 30}
                    x2={350 + Math.cos(rad) * 40}
                    y2={50 + Math.sin(rad) * 40}
                    stroke="var(--color-accent-gold)"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                );
              })}
            </motion.g>

            <g
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={{ cursor: 'grab' }}
            >
              <circle cx="250" cy="190" r="20" fill="var(--color-bg-elevated)" stroke="var(--color-accent-gold)" strokeWidth="1.5" />
              <motion.g style={{ originX: '250px', originY: '190px' }} animate={{ rotate: rotation }}>
                <line x1="250" y1="190" x2="250" y2="172" stroke="var(--color-accent-gold)" strokeWidth="2" />
              </motion.g>
              <text x="250" y="225" textAnchor="middle" fill="var(--color-fg-muted)" fontSize="9" fontFamily="var(--font-mono)">
                拖拽旋转视角
              </text>
            </g>
          </svg>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {STAGES.map((s, i) => (
            <div
              key={s.id}
              className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
                i <= stageIndex ? 'bg-[var(--color-accent-gold)]' : 'bg-[var(--color-bg-deep)]'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent-gold)] uppercase">
              阶段 {stageIndex + 1}/4 · {stageData.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-secondary)]">
              {stageData.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
