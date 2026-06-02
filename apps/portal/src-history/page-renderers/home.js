import { gsap } from 'gsap';
import { ERAS, EVENTS, FIGURES, formatYear } from '@/content/human-history/data/index.js';
import { el, clearApp, createParticleCanvas, prefersReducedMotion } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { createEraDetailPanel } from '../components/history/era-detail.js';

let _particleCleanup = null;
let _observers = [];

const STEM_GLYPHS = ['壹', '貳', '叁', '肆', '伍', '陸', '柒'];
const ERA_LATIN = {
  prehistoric: 'Prehistorica',
  classical: 'Antiquitas',
  medieval: 'Medii Aevi',
  earlyModern: 'Aetas Nova',
  modern: 'Modernitas',
  contemporary: 'Hodierna',
  future: 'Futurum',
};

export function cleanupHome() {
  if (_particleCleanup) { _particleCleanup(); _particleCleanup = null; }
  // Disconnect scroll/counter IntersectionObservers so they don't linger
  // after the home page is torn down on navigation.
  for (const obs of _observers) obs.disconnect();
  _observers = [];
}

function buildHero() {
  const hero = el('section', { class: 'hero' });
  _particleCleanup = createParticleCanvas(hero);

  const watermark = el('span', { class: 'hero-watermark', 'aria-hidden': 'true' });
  watermark.textContent = '史';
  hero.appendChild(watermark);

  const content = el('div', { class: 'hero-side' });
  content.innerHTML = `
    <div class="hero-marker">
      <span>CODEX HUMANITATIS</span>
      <em>vol. I — origin to horizon</em>
    </div>
    <div class="hero-seal" aria-hidden="true">
      <span class="hero-seal-glyph">史</span>
    </div>
    <h1>
      <span class="hero-h1-cn">人类文明<br>的全部光年</span>
      <span class="hero-h1-en">A cinematic atlas of human history</span>
    </h1>
    <h2>三十万年 · 七大时代 · 六大洲</h2>
    <p class="hero-desc">
      从智人在非洲点燃第一堆篝火，到丝路上驼铃响动，到工业革命的蒸汽轰鸣，再到当下
      <span class="hero-cinnabar">人工智能</span>
      的奇点临近——在这里，把人类文明读成一条可触摸的长河。
    </p>
    <div class="hero-actions">
      <a href="/atlas" class="btn btn-primary">开启探索</a>
      <a href="/timeline" class="btn btn-outline">浏览时间线</a>
    </div>
    <div class="hero-vitals">
      <div class="hero-vital">
        <div class="hero-vital-val" data-counter="300000" data-suffix="+">0<sup>年</sup></div>
        <div class="hero-vital-label">时间跨度</div>
      </div>
      <div class="hero-vital">
        <div class="hero-vital-val" data-counter="${ERAS.length}">0</div>
        <div class="hero-vital-label">历史篇章</div>
      </div>
      <div class="hero-vital">
        <div class="hero-vital-val" data-counter="${EVENTS.length}" data-suffix="+">0</div>
        <div class="hero-vital-label">关键事件</div>
      </div>
      <div class="hero-vital">
        <div class="hero-vital-val" data-counter="${FIGURES.length}" data-suffix="+">0</div>
        <div class="hero-vital-label">塑造者</div>
      </div>
    </div>
  `;
  hero.appendChild(content);

  const aside = el('aside', { class: 'hero-aside' });
  aside.innerHTML = `
    <div class="hero-aside-head">
      <strong>七幕剧 · The Seven Acts</strong>
      <span>scroll · 卷</span>
    </div>
    <div class="hero-era-strip"></div>
  `;
  const strip = aside.querySelector('.hero-era-strip');
  ERAS.forEach((era, i) => {
    const row = el('a', {
      class: 'hero-era-row',
      href: `/timeline#${era.id}`,
      style: { '--era-color': era.color },
    });
    row.innerHTML = `
      <span class="hero-era-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="hero-era-name">${era.name}<em>${ERA_LATIN[era.id] || ''}</em></span>
      <span class="hero-era-range">${formatYear(era.startYear)} — ${formatYear(era.endYear)}</span>
    `;
    strip.appendChild(row);
  });
  hero.appendChild(aside);

  return { hero, content, aside };
}

function ornament() {
  const div = el('div', { class: 'section-divider' });
  div.innerHTML = `<span class="section-divider-glyph">❖</span>`;
  return div;
}

function buildEraSection() {
  const frame = el('section', { class: 'section-frame' });
  frame.innerHTML = `
    <div class="section-eyebrow">CHAPTER ATLAS <span>历七幕 · 览七彩</span></div>
    <h2 class="section-title">七大时代 · <em>The Seven Eras</em></h2>
    <p class="section-sub">
      从远古的篝火到未来的星辰——每一幕都重塑了人类自我认识的边界。点击进入相应的时间线锚点。
    </p>
  `;
  const list = el('div', { class: 'era-list' });
  ERAS.forEach((era, i) => {
    const card = el('div', {
      class: 'era-card',
      style: { '--era-color': era.color },
      'data-stem': STEM_GLYPHS[i] || '',
    });
    card.innerHTML = `
      <div class="era-stem"><strong>${STEM_GLYPHS[i] || ''}</strong>0${i + 1}</div>
      <a href="/timeline#${era.id}" class="era-card-link">
        <div class="era-card-head">
          <div class="era-icon">${icon(era.icon, 20)}</div>
          <div class="era-name-wrap">
            <span class="era-name">${era.name}<em>${ERA_LATIN[era.id] || ''}</em></span>
          </div>
          <span class="era-date">${formatYear(era.startYear)} ╱ ${formatYear(era.endYear)}</span>
        </div>
        <p class="era-desc">${era.desc}</p>
        <div class="era-tags">${era.highlights.slice(0, 5).map(h => `<span class="tag" style="color:${era.color};border-color:${era.color}40;background:${era.color}10">${h}</span>`).join('')}</div>
      </a>
      <button class="era-expand-btn" aria-label="展开详情">深入探索 ▾</button>
      <div class="era-expand-body"></div>
    `;
    const expandBtn = card.querySelector('.era-expand-btn');
    const expandBody = card.querySelector('.era-expand-body');
    let expanded = false;
    expandBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      expanded = !expanded;
      if (expanded) {
        expandBody.innerHTML = '';
        expandBody.appendChild(createEraDetailPanel(era));
        expandBody.style.display = 'block';
        expandBtn.textContent = '收起 ▴';
        card.classList.add('era-card-expanded');
      } else {
        expandBody.style.display = 'none';
        expandBtn.textContent = '深入探索 ▾';
        card.classList.remove('era-card-expanded');
      }
    });
    list.appendChild(card);
  });
  frame.appendChild(list);
  return frame;
}

function buildMiniTimeline() {
  const frame = el('section', { class: 'section-frame' });
  frame.innerHTML = `
    <div class="section-eyebrow">RIVER <span>历史长河</span></div>
    <h2 class="section-title">关键节点 · <em>moments that bent the arc</em></h2>
    <p class="section-sub">
      从智人诞生到 ChatGPT 上线——挑选了改变人类命运走向的关键时刻，沿河流溯源。
    </p>
  `;
  const track = el('div', { class: 'mini-tl' });
  const majorEvents = EVENTS.filter((_, i) => i % 3 === 0).slice(0, 12);
  for (const ev of majorEvents) {
    const item = el('div', { class: 'mini-tl-item' });
    item.innerHTML = `
      <span class="mini-tl-year">${formatYear(ev.year)}</span>
      <span class="mini-tl-dot"></span>
      <div class="mini-tl-content">
        <h3>${ev.title}</h3>
        <p class="mtl-desc">${ev.desc}</p>
      </div>
    `;
    track.appendChild(item);
  }
  frame.appendChild(track);
  return frame;
}

function buildFiguresSection() {
  const frame = el('section', { class: 'section-frame' });
  frame.innerHTML = `
    <div class="section-eyebrow">CAST <span>塑造历史的人</span></div>
    <h2 class="section-title">关键人物 · <em>they bent the world</em></h2>
    <p class="section-sub">
      从孔子到爱因斯坦——这些人的思想或行动让人类朝着新的方向跃迁。
    </p>
  `;
  const grid = el('div', { class: 'figures-grid' });
  for (const f of FIGURES.slice(0, 6)) {
    const card = el('a', { class: 'figure-card', href: `/figures` });
    card.innerHTML = `
      <div class="figure-head">
        <div class="figure-avatar">${f.name[0]}</div>
        <div>
          <div class="figure-name">${f.name}</div>
          <div class="figure-title-text">${f.title}</div>
        </div>
      </div>
      <p class="figure-desc">${f.desc}</p>
    `;
    grid.appendChild(card);
  }
  frame.appendChild(grid);
  return frame;
}

function buildQuote() {
  const quote = el('div', { class: 'quote-section' });
  quote.innerHTML = `
    <div class="section-eyebrow" style="justify-content:center">EPIGRAPH <span>以史为镜</span></div>
    <blockquote>以铜为镜，可以正衣冠；以史为镜，可以知兴替。</blockquote>
    <cite>唐太宗 · 李世民</cite>
    <div class="quote-seal" aria-hidden="true">史</div>
  `;
  return quote;
}

// Animate counters on visibility
function animateCounter(elNode) {
  const target = parseInt(elNode.dataset.counter, 10);
  if (!Number.isFinite(target)) return;
  const suffix = elNode.dataset.suffix || '';
  const supMatch = elNode.querySelector('sup');
  const sup = supMatch ? supMatch.outerHTML : '';
  if (prefersReducedMotion()) {
    elNode.innerHTML = target.toLocaleString() + suffix + sup;
    return;
  }
  const duration = target > 1000 ? 1.6 : 1.1;
  const state = { v: 0 };
  gsap.to(state, {
    v: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      elNode.innerHTML = Math.round(state.v).toLocaleString() + suffix + sup;
    },
  });
}

export function renderHome() {
  cleanupHome();
  const app = clearApp();

  const { hero, content, aside } = buildHero();
  app.appendChild(hero);

  // Stagger entrance for hero
  if (!prefersReducedMotion()) {
    const heroEls = [...content.children, aside];
    gsap.from(heroEls, {
      opacity: 0,
      y: 28,
      stagger: 0.08,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.2,
    });
    // Float watermark gently
    gsap.to(hero.querySelector('.hero-watermark'), {
      y: '-=18',
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  }

  // Era section
  app.appendChild(buildEraSection());
  app.appendChild(ornament());

  // Mini timeline
  app.appendChild(buildMiniTimeline());
  app.appendChild(ornament());

  // Figures
  app.appendChild(buildFiguresSection());
  app.appendChild(ornament());

  // Quote
  app.appendChild(buildQuote());

  // Animate counters in hero when scrolled or immediately if already in view
  const counterEls = [...app.querySelectorAll('[data-counter]')];
  const counterObs = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    }
  }, { threshold: 0.4 });
  _observers.push(counterObs);
  for (const c of counterEls) counterObs.observe(c);

  // Reveal sections on scroll
  if (!prefersReducedMotion()) {
    const revealTargets = [...app.querySelectorAll('.section-frame, .quote-section')];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const children = [
            ...entry.target.querySelectorAll('.section-eyebrow, .section-title, .section-sub, .era-card, .mini-tl-item, .figure-card, blockquote, cite, .quote-seal'),
          ];
          gsap.fromTo(
            children.length ? children : entry.target,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.04, ease: 'power2.out' }
          );
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });
    _observers.push(observer);
    for (const t of revealTargets) {
      t.style.opacity = '1';
      const init = t.querySelectorAll('.section-eyebrow, .section-title, .section-sub, .era-card, .mini-tl-item, .figure-card, blockquote, cite, .quote-seal');
      init.forEach(c => { c.style.opacity = '0'; });
      observer.observe(t);
    }
  }
}
