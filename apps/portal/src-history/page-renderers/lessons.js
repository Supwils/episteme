import { LESSONS } from '@/content/human-history/data/lessons.js';
import { FIGURES, EVENTS, ERAS, formatYear } from '@/content/human-history/data/index.js';
import { el, clearApp, animateIn, animateOnScroll, prefersReducedMotion } from '../lib/dom.js';
import { hasScholarlyDetail, openScholarlyModal, cleanupScholarlyModal } from '../components/history/scholarly-modal.js';

let expandedLesson = null;
let expandedCase = null;
let searchQuery = '';

export function renderLessons() {
  const app = clearApp();
  expandedLesson = null;
  expandedCase = null;
  searchQuery = '';

  const page = el('div', { class: 'lessons-page' });

  const header = el('div', { class: 'lessons-header' });
  header.innerHTML = `
    <h1 class="section-title">以史为<em>鉴</em></h1>
    <p class="section-sub">历史不会简单重复，但会押韵。从帝国兴衰到技术革命，从文明冲突到民主脆弱性——人类在三十万年中积累了无数教训。问题是：我们真的学会了什么吗？</p>
  `;
  page.appendChild(header);

  const stats = el('div', { class: 'lessons-stats' });
  const totalCases = LESSONS.reduce((sum, l) => sum + (l.cases?.length || 0), 0);
  const totalFigures = new Set(LESSONS.flatMap(l => (l.cases || []).flatMap(c => c.relatedFigures || []))).size;
  const totalEvents = new Set(LESSONS.flatMap(l => (l.cases || []).flatMap(c => c.relatedEvents || []))).size;
  stats.innerHTML = `
    <div class="ls-stat"><strong>${LESSONS.length}</strong><span>历史主题</span></div>
    <div class="ls-stat"><strong>${totalCases}</strong><span>历史案例</span></div>
    <div class="ls-stat"><strong>${totalFigures}</strong><span>关联人物</span></div>
    <div class="ls-stat"><strong>${totalEvents}</strong><span>关联事件</span></div>
  `;
  page.appendChild(stats);

  const tools = el('div', { class: 'lessons-tools' });
  const searchInput = el('input', {
    class: 'lessons-search',
    type: 'search',
    placeholder: '搜索主题、案例、人物、事件...',
    'aria-label': '搜索借鉴内容',
  });
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    rebuildList();
  });
  tools.appendChild(searchInput);
  page.appendChild(tools);

  const intro = el('div', { class: 'lessons-intro' });
  intro.innerHTML = `
    <blockquote class="ls-intro-quote">
      "那些不能铭记过去的人注定要重蹈覆辙。"
      <cite>——乔治·桑塔亚纳</cite>
    </blockquote>
    <div class="ls-scholarly-link">
      <a href="/scholarly" class="ls-scholarly-btn">📖 浏览80篇深度讲稿 →</a>
    </div>
  `;
  page.appendChild(intro);

  const list = el('div', { class: 'lessons-list' });

  function lessonMatches(lesson) {
    if (!searchQuery) return true;
    const hay = [
      lesson.title, lesson.subtitle, lesson.intro, lesson.lesson, lesson.modernRelevance,
      ...(lesson.cases || []).flatMap(c => [c.title, c.summary, c.detail, ...(c.relatedFigures || []), ...(c.relatedEvents || [])]),
    ].filter(Boolean).join(' ').toLowerCase();
    return hay.includes(searchQuery);
  }

  function rebuildList() {
    list.innerHTML = '';
    const filtered = LESSONS.filter(lessonMatches);
    if (filtered.length === 0) {
      list.innerHTML = '<div class="empty-state"><p>没有匹配的借鉴主题，请调整搜索词。</p></div>';
      return;
    }
    for (const lesson of filtered) {
      list.appendChild(createLessonCard(lesson));
    }
    if (!prefersReducedMotion()) {
      animateIn([...list.children], { stagger: 0.06, y: 20 });
    }
  }

  rebuildList();
  page.appendChild(list);

  const epilogue = el('div', { class: 'lessons-epilogue' });
  epilogue.innerHTML = `
    <div class="ls-epilogue-content">
      <h2 class="section-title">历史给我们的<em>终极启示</em></h2>
      <p class="section-sub">人类历史的三十万年告诉我们：进步不是必然的，倒退随时可能发生。但历史也告诉我们：人类有能力从错误中学习、从灾难中重建、从冲突中找到共存之道。</p>
      <div class="ls-epilogue-points">
        <div class="ls-ep-point">
          <div class="ls-ep-num">01</div>
          <div class="ls-ep-body">
            <h3>制度比个人更重要</h3>
            <p>伟大的个人可以推动历史，但只有好的制度才能持续产生好的结果。罗马共和国的制度设计比凯撒的天才更重要，美国宪法比任何一位总统都更持久。</p>
          </div>
        </div>
        <div class="ls-ep-point">
          <div class="ls-ep-num">02</div>
          <div class="ls-ep-body">
            <h3>技术是双刃剑</h3>
            <p>每项重大技术都同时带来进步和风险。关键不是阻止技术发展，而是在技术造成不可逆伤害之前建立治理框架。预防性治理比事后补救更重要。</p>
          </div>
        </div>
        <div class="ls-ep-point">
          <div class="ls-ep-num">03</div>
          <div class="ls-ep-body">
            <h3>多样性是韧性的来源</h3>
            <p>生物多样性使生态系统更 resilient，文化多样性使人类文明更 resilient。单一化（无论是文化、制度还是技术）都会增加系统性风险。</p>
          </div>
        </div>
        <div class="ls-ep-point">
          <div class="ls-ep-num">04</div>
          <div class="ls-ep-body">
            <h3>每一代人都需要重新争取自由</h3>
            <p>民主、自由和平等不是不可逆的历史进步——它们需要每一代人重新争取和维护。魏玛共和国的教训提醒我们：民主可以在合法程序中被摧毁。</p>
          </div>
        </div>
        <div class="ls-ep-point">
          <div class="ls-ep-num">05</div>
          <div class="ls-ep-body">
            <h3>我们是第一代拥有全球力量的人类</h3>
            <p>核武器、AI、基因编辑和气候变化意味着人类第一次拥有了改变整个物种命运的力量。历史上的错误可以被纠正——但某些未来的错误可能是不可逆的。我们这一代人的选择，将决定人类文明的走向。</p>
          </div>
        </div>
      </div>
    </div>
  `;
  page.appendChild(epilogue);

  app.appendChild(page);

  if (!prefersReducedMotion()) {
    animateIn([...page.querySelectorAll('.ls-lesson-card, .lessons-intro, .lessons-epilogue, .lessons-stats')], { stagger: 0.08, y: 20 });
    animateOnScroll(page, '.ls-lesson-card');
  }
}

function createLessonCard(lesson) {
  const card = el('div', { class: 'ls-lesson-card', 'data-lesson': lesson.id });
  card.style.setProperty('--ls-color', lesson.color);

  const head = el('div', { class: 'ls-lesson-head' });
  head.innerHTML = `
    <div class="ls-lesson-icon" style="color:${lesson.color}"><iconify-icon icon="${lesson.icon}"></iconify-icon></div>
    <div class="ls-lesson-info">
      <h2 class="ls-lesson-title">${lesson.title}</h2>
      <p class="ls-lesson-subtitle">${lesson.subtitle}</p>
    </div>
    <span class="ls-lesson-count">${lesson.cases.length}个案例</span>
    <span class="ls-lesson-toggle">▸</span>
  `;
  head.addEventListener('click', () => toggleLesson(lesson.id));
  card.appendChild(head);

  const body = el('div', { class: 'ls-lesson-body' });
  body.innerHTML = `<p class="ls-lesson-intro">${lesson.intro}</p>`;

  const casesList = el('div', { class: 'ls-cases-list' });
  for (const c of lesson.cases) {
    casesList.appendChild(createCaseCard(c, lesson.color));
  }
  body.appendChild(casesList);

  const lessonBlock = el('div', { class: 'ls-lesson-conclusion' });
  lessonBlock.innerHTML = `
    <div class="ls-conclusion-section">
      <h3>历史规律</h3>
      <p>${lesson.lesson}</p>
    </div>
    <div class="ls-conclusion-section ls-modern">
      <h3>当代启示</h3>
      <p>${lesson.modernRelevance}</p>
    </div>
  `;
  body.appendChild(lessonBlock);

  card.appendChild(body);
  return card;
}

function createCaseCard(caseData, color) {
  const card = el('div', { class: 'ls-case-card' });

  const head = el('div', { class: 'ls-case-head' });
  head.innerHTML = `
    <div class="ls-case-header-row">
      <h3 class="ls-case-title">${caseData.title}</h3>
      <span class="ls-case-period">${caseData.period}</span>
    </div>
    <p class="ls-case-summary">${caseData.summary}</p>
  `;
  head.addEventListener('click', () => toggleCase(caseData.title));
  card.appendChild(head);

  const body = el('div', { class: 'ls-case-body' });

  const detailParts = (caseData.detail || '').split('\n\n');
  let detailHtml = '';
  for (const part of detailParts) {
    if (part.startsWith('【史学争论】')) {
      detailHtml += `<div class="ls-case-debate"><span class="ls-debate-label">史学争论</span><p>${part.replace('【史学争论】', '')}</p></div>`;
    } else if (part.startsWith('【方法论注释】')) {
      detailHtml += `<div class="ls-case-methodology"><span class="ls-method-label">方法论注释</span><p>${part.replace('【方法论注释】', '')}</p></div>`;
    } else {
      detailHtml += `<p class="ls-case-detail">${part}</p>`;
    }
  }
  body.innerHTML = detailHtml;

  const relatedFigures = caseData.relatedFigures || [];
  const relatedEvents = caseData.relatedEvents || [];
  if (relatedFigures.length > 0 || relatedEvents.length > 0) {
    const refs = el('div', { class: 'ls-case-refs' });
    for (const figName of relatedFigures) {
      const fig = FIGURES.find(f => f.name === figName);
      if (fig) {
        const chip = el('span', { class: 'ls-ref-chip ls-ref-figure' });
        chip.innerHTML = `<iconify-icon icon="mdi:account"></iconify-icon>${figName}`;
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          navigateToFigure(figName);
        });
        refs.appendChild(chip);
      }
    }
    for (const evTitle of relatedEvents) {
      const ev = EVENTS.find(e => e.title === evTitle);
      if (ev) {
        const chip = el('span', { class: 'ls-ref-chip ls-ref-event' });
        chip.innerHTML = `<iconify-icon icon="mdi:lightning-bolt"></iconify-icon>${evTitle}`;
        refs.appendChild(chip);
      }
      if (hasScholarlyDetail(evTitle)) {
        const schBtn = el('button', { class: 'scholarly-btn ls-sch-btn' });
        schBtn.innerHTML = `📖 ${evTitle}讲稿`;
        schBtn.addEventListener('click', (e) => { e.stopPropagation(); openScholarlyModal(evTitle); });
        refs.appendChild(schBtn);
      }
    }
    body.appendChild(refs);
  }

  card.appendChild(body);
  return card;
}

function toggleLesson(lessonId) {
  const card = document.querySelector(`[data-lesson="${lessonId}"]`);
  if (!card) return;
  const isOpen = card.classList.contains('expanded');
  document.querySelectorAll('.ls-lesson-card.expanded').forEach(c => c.classList.remove('expanded'));
  if (!isOpen) {
    card.classList.add('expanded');
    if (!prefersReducedMotion()) {
      animateIn(card.querySelector('.ls-lesson-body'), { y: 15, duration: 0.4 });
    }
  }
}

function toggleCase(caseTitle) {
  const cards = document.querySelectorAll('.ls-case-card');
  for (const card of cards) {
    const title = card.querySelector('.ls-case-title');
    if (title && title.textContent === caseTitle) {
      card.classList.toggle('expanded');
      break;
    }
  }
}

function navigateToFigure(name) {
  try { sessionStorage.setItem('highlight-figure', name); } catch (e) {}
  window.history.pushState({}, '', '/figures');
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function cleanupLessons() {
  // Scholarly modal is appended to document.body; close it on page exit.
  cleanupScholarlyModal();
}
