'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/subjects/physics/lib/cn';

type Step = {
  label: string;
  description: string;
  duration: number;
};

const STEPS: Step[] = [
  { label: '初始状态', description: '烧瓶中充满甲烷、氨、氢气和水蒸气', duration: 2000 },
  { label: '电极放电', description: '模拟原始大气中的闪电', duration: 2500 },
  { label: '化学反应', description: '无机分子在能量作用下重新组合', duration: 2000 },
  { label: '冷凝收集', description: '产物随水蒸气冷凝到接收瓶中', duration: 2000 },
  { label: '有机分子', description: '检测到氨基酸等有机分子！', duration: 3000 },
];

const MOLECULES = [
  { symbol: 'CH₄', name: '甲烷', color: '#6ad0ff' },
  { symbol: 'NH₃', name: '氨', color: '#a78bfa' },
  { symbol: 'H₂O', name: '水', color: '#60a5fa' },
  { symbol: 'H₂', name: '氢气', color: '#f0abfc' },
];

const PRODUCTS = [
  { symbol: '氨基酸', name: '甘氨酸', color: '#ffb45a' },
  { symbol: '尿素', name: '尿素', color: '#f97316' },
];

export function MillersUrey({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const stepStartRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const lightningRef = useRef(0);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    alpha: number;
    type: 'gas' | 'spark' | 'product';
  };

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const particles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: 60 + Math.random() * (canvas.width * 0.4 - 60),
        y: 40 + Math.random() * (canvas.height * 0.5 - 40),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 3 + Math.random() * 3,
        color: MOLECULES[Math.floor(Math.random() * MOLECULES.length)]!.color,
        alpha: 0.8,
        type: 'gas',
      });
    }
    particlesRef.current = particles;
  }, []);

  const drawFlask = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const fw = w * 0.5;
    const fh = h * 0.55;
    const fx = w * 0.05;
    const fy = h * 0.15;
    const neckW = fw * 0.2;
    const neckH = fh * 0.15;

    ctx.save();
    ctx.strokeStyle = 'rgba(106, 208, 255, 0.4)';
    ctx.lineWidth = 2;

    // Neck
    ctx.beginPath();
    ctx.moveTo(fx + fw / 2 - neckW / 2, fy);
    ctx.lineTo(fx + fw / 2 - neckW / 2, fy + neckH);
    // Body left
    ctx.lineTo(fx, fy + fh);
    // Bottom
    ctx.lineTo(fx + fw, fy + fh);
    // Body right
    ctx.lineTo(fx + fw / 2 + neckW / 2, fy + neckH);
    // Neck right
    ctx.lineTo(fx + fw / 2 + neckW / 2, fy);
    ctx.stroke();

    // Water level
    const waterY = fy + fh * 0.65;
    ctx.fillStyle = 'rgba(96, 165, 250, 0.15)';
    ctx.beginPath();
    ctx.moveTo(fx + 2, waterY);
    ctx.lineTo(fx + fw - 2, waterY);
    ctx.lineTo(fx + fw - 2, fy + fh - 2);
    ctx.lineTo(fx + 2, fy + fh - 2);
    ctx.closePath();
    ctx.fill();

    // Electrodes
    const elX1 = fx + fw * 0.35;
    const elX2 = fx + fw * 0.65;
    const elTop = fy + fh * 0.1;
    const elBot = fy + fh * 0.45;

    ctx.strokeStyle = 'rgba(168, 139, 250, 0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(elX1, elTop);
    ctx.lineTo(elX1, elBot);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(elX2, elTop);
    ctx.lineTo(elX2, elBot);
    ctx.stroke();

    // Electrode tips
    ctx.fillStyle = '#a78bfa';
    ctx.beginPath();
    ctx.arc(elX1, elBot, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(elX2, elBot, 4, 0, Math.PI * 2);
    ctx.fill();

    // Collection flask
    const cx = w * 0.6;
    const cy = h * 0.55;
    const cr = w * 0.12;

    ctx.strokeStyle = 'rgba(255, 180, 90, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx + cr, cy + cr * 0.5, cr, cr * 0.8, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Connecting tube
    ctx.strokeStyle = 'rgba(106, 208, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(fx + fw, fy + fh * 0.8);
    ctx.quadraticCurveTo(fx + fw + 30, fy + fh * 0.5, cx, cy + cr * 0.3);
    ctx.stroke();

    ctx.restore();
  }, []);

  const drawLightning = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, intensity: number) => {
    if (intensity <= 0) return;

    const fw = w * 0.5;
    const fx = w * 0.05;
    const fy = h * 0.15;
    const fh = h * 0.55;
    const elX1 = fx + fw * 0.35;
    const elX2 = fx + fw * 0.65;
    const elBot = fy + fh * 0.45;

    ctx.save();
    ctx.globalAlpha = intensity;

    for (let i = 0; i < 3; i++) {
      const startX = elX1 + (elX2 - elX1) * Math.random();
      const startY = elBot;
      const endX = startX + (Math.random() - 0.5) * 30;
      const endY = startY + 20 + Math.random() * 30;

      ctx.strokeStyle = `rgba(167, 139, 250, ${0.5 + Math.random() * 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(startX, startY);

      const midX = (startX + endX) / 2 + (Math.random() - 0.5) * 20;
      const midY = (startY + endY) / 2;
      ctx.quadraticCurveTo(midX, midY, endX, endY);
      ctx.stroke();

      // Glow
      ctx.shadowColor = '#a78bfa';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }, []);

  const drawProducts = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, amount: number) => {
    if (amount <= 0) return;

    const cx = w * 0.6;
    const cy = h * 0.55;
    const cr = w * 0.12;

    ctx.save();
    ctx.globalAlpha = amount;

    for (let i = 0; i < Math.floor(amount * 8); i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r = cr * 0.3 + Math.random() * cr * 0.3;
      const px = cx + cr + Math.cos(angle) * r;
      const py = cy + cr * 0.5 + Math.sin(angle) * r * 0.6;

      const prod = PRODUCTS[i % PRODUCTS.length]!;
      ctx.fillStyle = prod.color;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(prod.symbol, px, py - 6);
    }

    ctx.restore();
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#060814');
    grad.addColorStop(1, '#0f1320');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    drawFlask(ctx, w, h);

    // Draw particles
    for (const p of particlesRef.current) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Lightning effect during step 1
    if (currentStep === 1) {
      drawLightning(ctx, w, h, 0.5 + Math.sin(Date.now() / 100) * 0.3);
    }

    // Products during step 4
    if (currentStep === 4) {
      drawProducts(ctx, w, h, progress);
    }
  }, [currentStep, progress, drawFlask, drawLightning, drawProducts]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const now = Date.now();
    const elapsed = now - stepStartRef.current;
    const stepDuration = STEPS[currentStep]?.duration ?? 2000;
    const p = Math.min(elapsed / stepDuration, 1);
    setProgress(p);

    // Update particles
    for (const particle of particlesRef.current) {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounds
      const minX = 60;
      const maxX = canvas.width * 0.5 - 20;
      const minY = 40;
      const maxY = canvas.height * 0.6;

      if (particle.x < minX || particle.x > maxX) particle.vx *= -1;
      if (particle.y < minY || particle.y > maxY) particle.vy *= -1;

      particle.x = Math.max(minX, Math.min(maxX, particle.x));
      particle.y = Math.max(minY, Math.min(maxY, particle.y));
    }

    render();

    if (p >= 1) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((s) => s + 1);
        stepStartRef.current = now;
      } else {
        setIsPlaying(false);
        return;
      }
    }

    if (isPlaying) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, [currentStep, isPlaying, render]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    initParticles(canvas);
    render();
  }, [initParticles, render]);

  useEffect(() => {
    if (isPlaying) {
      stepStartRef.current = Date.now();
      animRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, animate]);

  const handlePlay = () => {
    if (prefersReducedMotion.current) {
      setCurrentStep(STEPS.length - 1);
      setProgress(1);
      render();
      return;
    }
    if (currentStep >= STEPS.length - 1 && progress >= 1) {
      setCurrentStep(0);
      setProgress(0);
      const canvas = canvasRef.current;
      if (canvas) initParticles(canvas);
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
    const canvas = canvasRef.current;
    if (canvas) initParticles(canvas);
    render();
  };

  const currentStepData = STEPS[currentStep]!;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-fg-disabled/30 bg-bg-deep">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ imageRendering: 'auto' }}
        />

        {/* Step indicator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-3 left-3 right-3 rounded-lg bg-bg-panel/90 p-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-cool/20 text-xs font-mono text-accent-cool">
                {currentStep + 1}
              </span>
              <span className="text-sm font-medium text-fg-primary">{currentStepData.label}</span>
            </div>
            <p className="mt-1 text-xs text-fg-secondary">{currentStepData.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Timeline */}
      <div className="flex gap-1">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex-1">
            <div
              className={cn(
                'h-1.5 rounded-full transition-colors duration-300',
                i < currentStep || (i === currentStep && progress >= 1)
                  ? 'bg-accent-cool'
                  : i === currentStep
                    ? 'bg-accent-cool/40'
                    : 'bg-fg-disabled/30',
              )}
            />
            <span className="mt-1 block text-center text-[10px] text-fg-muted">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={isPlaying ? () => setIsPlaying(false) : handlePlay}
          className="rounded-lg bg-accent-cool/20 px-4 py-2 text-sm text-accent-cool transition-colors hover:bg-accent-cool/30"
        >
          {isPlaying ? '暂停' : currentStep >= STEPS.length - 1 && progress >= 1 ? '重新播放' : '播放'}
        </button>
        <button
          onClick={handleReset}
          className="rounded-lg bg-fg-disabled/20 px-4 py-2 text-sm text-fg-secondary transition-colors hover:bg-fg-disabled/30"
        >
          重置
        </button>
      </div>

      {/* Molecules info */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {MOLECULES.map((mol) => (
          <div
            key={mol.symbol}
            className="flex items-center gap-2 rounded-lg bg-bg-panel/50 px-3 py-2"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: mol.color }}
            />
            <span className="text-xs text-fg-secondary">
              {mol.symbol} {mol.name}
            </span>
          </div>
        ))}
      </div>

      {/* Key finding */}
      <div className="rounded-lg border border-accent-warm/20 bg-accent-warm/5 p-3">
        <p className="text-xs text-fg-secondary">
          <span className="font-medium text-accent-warm">关键发现：</span>
          1953年，米勒和尤里证明了在模拟原始地球条件下，无机物可以自发形成有机分子（氨基酸），
          为生命起源的化学进化论提供了实验依据。
        </p>
      </div>
    </div>
  );
}
