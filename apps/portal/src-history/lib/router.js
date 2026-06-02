// @ts-nocheck
const routes = {};
let onChange = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.history.pushState({}, '', path);
  resolve();
}

export function getRoute() {
  return window.location.pathname || '/';
}

export function getQuery() {
  const params = new URLSearchParams(window.location.search);
  const obj = {};
  for (const [k, v] of params) obj[k] = v;
  return obj;
}

function resolve() {
  const path = getRoute();
  const handler = routes[path] || routes['/'];
  if (onChange) onChange(path);
  if (handler) handler();
}

export function initRouter(cb) {
  onChange = cb;
  window.addEventListener('popstate', resolve);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="/"]');
    if (a && !a.target && !a.hasAttribute('download')) {
      e.preventDefault();
      navigate(a.getAttribute('href'));
    }
  });
  resolve();
}
