import { gsap } from 'gsap';

export function $(sel, ctx = document) {
  return ctx.querySelector(sel);
}

export function $$(sel, ctx = document) {
  return [...ctx.querySelectorAll(sel)];
}

export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'html') node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  for (const child of children) {
    if (typeof child === 'string') node.appendChild(document.createTextNode(child));
    else if (child) node.appendChild(child);
  }
  return node;
}

export function clearApp() {
  const app = $('#app');
  if (app) app.innerHTML = '';
  return app;
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function animateIn(elements, opts = {}) {
  if (prefersReducedMotion()) return;
  const targets = Array.isArray(elements) ? elements : [elements];
  gsap.fromTo(
    targets,
    { opacity: 0, y: opts.y ?? 30 },
    { opacity: 1, y: 0, duration: opts.duration ?? 0.6, stagger: opts.stagger ?? 0.08, ease: 'power2.out', delay: opts.delay ?? 0 }
  );
}

export function animateOnScroll(container, selector, opts = {}) {
  if (prefersReducedMotion()) return;
  const items = container.querySelectorAll(selector);
  if (!items.length) return;

  gsap.set(items, { opacity: 0, y: opts.y ?? 24 });

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        gsap.to(entry.target, {
          opacity: 1, y: 0,
          duration: opts.duration ?? 0.5,
          ease: 'power2.out',
          delay: opts.delay ?? 0,
        });
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
  return () => observer.disconnect();
}

export function createParticleCanvas(container) {
  const canvas = el('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;
  // Particle positions live in CSS-pixel space; draw() applies a dpr transform,
  // so all coordinates/bounds must use CSS dimensions (not the device-pixel
  // canvas.width/height) or particles drift off-screen on high-DPR displays.
  let cssW = 0, cssH = 0;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = container.clientHeight;
    cssW = w;
    cssH = h;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * cssW,
        y: Math.random() * cssH,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.4 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, cssW, cssH);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > cssW) p.vx *= -1;
      if (p.y < 0 || p.y > cssH) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,169,81,${p.a})`;
      ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(200,169,81,${0.04 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', resize);

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
    canvas.remove();
  };
}
