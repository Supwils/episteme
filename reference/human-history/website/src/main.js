import './styles/main.css';
import './styles/desktop.css';
import { gsap } from 'gsap';
import { registerRoute, initRouter } from './lib/router.js';
import { renderHome, cleanupHome } from './pages/home.js';
import { renderFigures, cleanupFigures } from './pages/figures.js';
import { renderLessons, cleanupLessons } from './pages/lessons.js';
import { openGlobalSearch } from './components/common/global-search.js';
import { prefersReducedMotion } from './lib/dom.js';

let currentCleanup = null;
let isTransitioning = false;

const NAV_PATHS = new Set(['/', '/timeline', '/atlas', '/graph', '/map', '/figures', '/lessons', '/scholarly']);

function updateNav(path) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === getNavKey(path));
  });

  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }
}

function getNavKey(path) {
  if (path === '/') return 'home';
  return path.slice(1);
}

async function transitionTo(renderFn) {
  if (isTransitioning) return;
  const app = document.getElementById('app');
  if (!app) { renderFn(); return; }

  const reduceMotion = prefersReducedMotion();

  if (!reduceMotion && app.children.length > 0) {
    isTransitioning = true;
    await gsap.to(app, { opacity: 0, y: 8, duration: 0.18, ease: 'power2.in' });
  }

  renderFn();
  window.scrollTo({ top: 0, behavior: 'instant' });

  if (!reduceMotion) {
    gsap.fromTo(app, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', onComplete: () => { isTransitioning = false; } });
  } else {
    isTransitioning = false;
  }
}

function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Auto-detect system theme on first visit
  try {
    if (!localStorage.getItem('history-theme')) {
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.classList.add('light');
      }
    } else {
      if (localStorage.getItem('history-theme') === 'light') {
        document.documentElement.classList.add('light');
      }
    }
  } catch (e) {}

  toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    try { localStorage.setItem('history-theme', isLight ? 'light' : 'dark'); } catch (e) {}
  });

  const searchBtn = document.getElementById('global-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', openGlobalSearch);
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openGlobalSearch();
      }
    });
  }
}

registerRoute('/', () => { transitionTo(() => { renderHome(); currentCleanup = cleanupHome; }); });
registerRoute('/timeline', () => { transitionTo(async () => {
  const { renderTimeline, cleanupTimeline } = await import('./pages/timeline.js');
  renderTimeline(); currentCleanup = cleanupTimeline;
}); });
registerRoute('/atlas', () => { transitionTo(async () => {
  const { renderAtlas, cleanupAtlas } = await import('./pages/atlas.js');
  renderAtlas(); currentCleanup = cleanupAtlas;
}); });
registerRoute('/graph', () => { transitionTo(async () => {
  const { renderGraph, cleanupGraph } = await import('./pages/graph.js');
  renderGraph(); currentCleanup = cleanupGraph;
}); });
registerRoute('/map', () => { transitionTo(async () => {
  const { renderMap, cleanupMap } = await import('./pages/map.js');
  renderMap(); currentCleanup = cleanupMap;
}); });
registerRoute('/figures', () => { transitionTo(() => { renderFigures(); currentCleanup = cleanupFigures; }); });
registerRoute('/lessons', () => { transitionTo(() => { renderLessons(); currentCleanup = cleanupLessons; }); });
registerRoute('/scholarly', () => { transitionTo(async () => {
  const { renderScholarly, cleanupScholarly } = await import('./pages/scholarly.js');
  renderScholarly(); currentCleanup = cleanupScholarly;
}); });

initTheme();
initRouter(updateNav);
