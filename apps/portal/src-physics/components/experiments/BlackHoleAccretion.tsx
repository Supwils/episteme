'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/src-physics/lib/cn';

const NUM_PARTICLES = 300;
const JET_PARTICLES = 40;

type Particle = {
  r: number;
  theta: number;
  dr: number;
  dtheta: number;
  size: number;
  brightness: number;
  hue: number;
};

type JetParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

export function BlackHoleAccretion({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showJet, setShowJet] = useState(true);
  const particlesRef = useRef<Particle[]>([]);
  const jetRef = useRef<JetParticle[]>([]);
  const timeRef = useRef(0);

  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const r = 30 + Math.random() * Math.min(w, h) * 0.35;
      particles.push({
        r,
        theta: Math.random() * Math.PI * 2,
        dr: -0.05 - Math.random() * 0.15,
        dtheta: (0.3 + Math.random() * 0.5) / Math.max(r, 30),
        size: 1 + Math.random() * 2.5,
        brightness: 0.4 + Math.random() * 0.6,
        hue: 15 + Math.random() * 30,
      });
    }
    particlesRef.current = particles;

    const jets: JetParticle[] = [];
    for (let i = 0; i < JET_PARTICLES; i++) {
      jets.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -3 - Math.random() * 4,
        life: Math.random(),
        maxLife: 1,
        size: 1 + Math.random() * 2,
      });
    }
    jetRef.current = jets;
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w * 0.5;
    const cy = h * 0.5;
    const bhRadius = Math.min(w, h) * 0.06;
    const t = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    // Background
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6);
    bgGrad.addColorStop(0, '#0a0612');
    bgGrad.addColorStop(1, '#060814');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Background stars
    if (timeRef.current === 0) {
      for (let i = 0; i < 80; i++) {
        const sx = Math.random() * w;
        const sy = Math.random() * h;
        const sa = 0.2 + Math.random() * 0.4;
        ctx.fillStyle = `rgba(200, 210, 240, ${sa})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.5 + Math.random(), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Accretion disk glow
    const glowR = bhRadius * 4;
    const diskGlow = ctx.createRadialGradient(cx, cy, bhRadius, cx, cy, glowR);
    diskGlow.addColorStop(0, 'rgba(255, 140, 50, 0.3)');
    diskGlow.addColorStop(0.5, 'rgba(255, 80, 30, 0.1)');
    diskGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = diskGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
    ctx.fill();

    // Draw accretion disk particles
    for (const p of particlesRef.current) {
      if (p.r < bhRadius * 0.9) continue;

      const x = cx + p.r * Math.cos(p.theta);
      const y = cy + p.r * Math.sin(p.theta) * 0.4; // Perspective tilt

      // Gravitational lensing: bend light near the black hole
      const distToBH = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const lensStrength = distToBH < bhRadius * 3 ? (1 - distToBH / (bhRadius * 3)) * 0.3 : 0;
      const lensOffset = lensStrength * bhRadius;

      // Temperature based on distance (closer = hotter = bluer)
      const tempFactor = Math.max(0, 1 - (p.r - bhRadius) / (Math.min(w, h) * 0.3));
      const hue = p.hue - tempFactor * 30;
      const lightness = 50 + tempFactor * 25;

      const alpha = p.brightness * Math.min(1, (p.r - bhRadius * 0.5) / (bhRadius * 2));

      ctx.fillStyle = `hsla(${Math.max(0, hue)}, 90%, ${lightness}%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x + lensOffset * Math.sin(p.theta), y - lensOffset * Math.cos(p.theta), p.size, 0, Math.PI * 2);
      ctx.fill();

      // Hot inner edge glow
      if (tempFactor > 0.7) {
        ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Photon ring (Einstein ring)
    ctx.strokeStyle = 'rgba(255, 200, 100, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, bhRadius * 1.5, bhRadius * 1.5 * 0.4, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Relativistic jets
    if (showJet) {
      for (const j of jetRef.current) {
        const progress = j.life / j.maxLife;
        const jetLen = Math.min(w, h) * 0.35;
        const px = cx + j.x;
        const py = cy + j.y - progress * jetLen;
        const alpha = (1 - progress) * 0.6;

        ctx.fillStyle = `hsla(210, 80%, 75%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, j.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Mirror jet (bottom)
        const py2 = cy - j.y + progress * jetLen;
        ctx.fillStyle = `hsla(210, 80%, 75%, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(px, py2, j.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Black hole (event horizon)
    const bhGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, bhRadius);
    bhGrad.addColorStop(0, '#000000');
    bhGrad.addColorStop(0.8, '#000000');
    bhGrad.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
    ctx.fillStyle = bhGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, bhRadius, 0, Math.PI * 2);
    ctx.fill();

    // Shadow region
    ctx.strokeStyle = 'rgba(255, 100, 30, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, bhRadius * 2.6, 0, Math.PI * 2);
    ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(168, 173, 189, 0.6)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('事件视界', cx + bhRadius + 8, cy - 4);
    ctx.fillText('吸积盘', cx + bhRadius * 3, cy - bhRadius * 1.5);

    if (showJet) {
      ctx.textAlign = 'center';
      ctx.fillText('相对论性喷流', cx, cy - Math.min(w, h) * 0.35 - 8);
      ctx.fillText('相对论性喷流', cx, cy + Math.min(w, h) * 0.35 + 16);
    }
  }, [showJet]);

  const animate = useCallback(() => {
    timeRef.current += 1;

    // Update disk particles
    for (const p of particlesRef.current) {
      p.theta += p.dtheta;
      p.r += p.dr;

      // Re-spawn when absorbed
      if (p.r < 20) {
        const maxR = Math.min(
          canvasRef.current?.width ?? 800,
          canvasRef.current?.height ?? 600,
        ) * 0.4;
        p.r = 30 + Math.random() * maxR;
        p.theta = Math.random() * Math.PI * 2;
        p.dr = -0.05 - Math.random() * 0.15;
        p.dtheta = (0.3 + Math.random() * 0.5) / Math.max(p.r, 30);
      }

      // Speed up as falling in (angular momentum conservation)
      if (p.r < 80) {
        p.dtheta *= 1.002;
        p.brightness = Math.min(1, p.brightness + 0.005);
      }
    }

    // Update jet particles
    if (showJet) {
      for (const j of jetRef.current) {
        j.life += 0.008;
        j.x += j.vx;
        j.y += j.vy;

        if (j.life >= j.maxLife) {
          j.x = (Math.random() - 0.5) * 8;
          j.y = 0;
          j.vx = (Math.random() - 0.5) * 1.5;
          j.vy = -3 - Math.random() * 4;
          j.life = 0;
          j.maxLife = 0.6 + Math.random() * 0.4;
        }
      }
    }

    render();
    if (isPlaying) {
      animRef.current = requestAnimationFrame(animate);
    }
  }, [isPlaying, render, showJet]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    initParticles(canvas.width, canvas.height);
    render();
  }, [render, initParticles]);

  useEffect(() => {
    if (isPlaying) {
      animRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, animate]);

  const handleStart = () => {
    if (prefersReducedMotion.current) {
      render();
      return;
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    const canvas = canvasRef.current;
    if (canvas) {
      initParticles(canvas.width, canvas.height);
    }
    timeRef.current = 0;
    render();
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-fg-disabled/30 bg-bg-deep">
        <canvas ref={canvasRef} className="h-full w-full" />

        <div className="absolute right-3 top-3 rounded-lg bg-bg-panel/90 px-3 py-2 backdrop-blur-sm">
          <p className="text-xs font-mono text-accent-warm">
            黑洞吸积盘
          </p>
          <p className="mt-1 text-[10px] text-fg-muted">
            {NUM_PARTICLES} 粒子模拟
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={isPlaying ? () => setIsPlaying(false) : handleStart}
          className="rounded-lg bg-accent-warm/20 px-4 py-2 text-sm text-accent-warm transition-colors hover:bg-accent-warm/30"
        >
          {isPlaying ? '暂停' : '开始模拟'}
        </button>
        <button
          onClick={() => setShowJet(!showJet)}
          className={cn(
            'rounded-lg px-4 py-2 text-sm transition-colors',
            showJet
              ? 'bg-accent-cool/20 text-accent-cool hover:bg-accent-cool/30'
              : 'bg-fg-disabled/20 text-fg-secondary hover:bg-fg-disabled/30',
          )}
        >
          {showJet ? '隐藏喷流' : '显示喷流'}
        </button>
        <button
          onClick={handleReset}
          className="rounded-lg bg-fg-disabled/20 px-4 py-2 text-sm text-fg-secondary transition-colors hover:bg-fg-disabled/30"
        >
          重置
        </button>
      </div>

      <div className="rounded-lg border border-accent-warm/20 bg-accent-warm/5 p-3">
        <p className="text-xs text-fg-secondary">
          <span className="font-medium text-accent-warm">黑洞与吸积盘：</span>
          当物质落入黑洞时，由于角动量守恒，它不会直接掉入，而是形成一个旋转的吸积盘。
          盘内侧的物质运动更快、温度更高，发出强烈的 X 射线。部分物质沿黑洞自转轴被
          加速喷出，形成接近光速的相对论性喷流。事件视界之内，连光也无法逃脱。
        </p>
      </div>
    </div>
  );
}
