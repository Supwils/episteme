import { ATLAS_ERAS } from "@/content/human-history/data/atlas-content";
import type { AtlasEra, AtlasTopic, AtlasState } from "@/subjects/history/types/atlas";
import { escapeHtml } from "@/subjects/history/lib/escape-html";

export type OverviewDeps = {
  selectEra: (era: AtlasEra) => void;
  selectTopic: (topic: AtlasTopic) => void;
  scrollSceneCard: (index: number) => void;
};

export function refreshOverview(
  overviewRef: React.RefObject<HTMLElement | null>,
  state: AtlasState,
  deps: OverviewDeps
) {
  const panel = overviewRef.current;
  if (!panel) return;
  panel.innerHTML = "";

  const heading =
    state.level === 1
      ? "时代目录"
      : state.activeTopic
        ? state.activeTopic.name
        : state.activeEra?.name;
  const meta =
    state.level === 1
      ? `${ATLAS_ERAS.length} 个时代 · ${ATLAS_ERAS.reduce((sum: number, era: AtlasEra) => sum + era.topics.length, 0)} 个主题`
      : state.activeTopic
        ? `${state.activeEra!.name} · ${state.activeTopic.scenes.length} 个场景`
        : `${state.activeEra?.sub} · ${state.activeEra?.topics.length} 个主题`;

  const head = document.createElement("div");
  head.className = "atlas-overview-head";
  head.innerHTML = `<strong>${escapeHtml(heading ?? "")}</strong><span>${escapeHtml(meta)}</span>`;
  panel.appendChild(head);

  const list = document.createElement("div");
  list.className = "atlas-overview-list";

  if (state.level === 1) {
    for (const era of ATLAS_ERAS) {
      const btn = document.createElement("button");
      btn.className = `atlas-overview-item${state.activeEra === era ? " active" : ""}`;
      btn.type = "button";
      const topicNames = era.topics.map((t) => t.name).join("、");
      const sceneCount = era.topics.reduce((sum: number, t) => sum + t.scenes.length, 0);
      btn.innerHTML = `<span class="atlas-overview-title">${escapeHtml(era.name)}</span><span class="atlas-overview-meta">${era.topics.length} 个主题 · ${sceneCount} 个场景</span><span class="atlas-overview-desc">${escapeHtml(topicNames)}</span>`;
      btn.addEventListener("click", () => deps.selectEra(era));
      list.appendChild(btn);
    }
  } else if (state.activeTopic) {
    for (let i = 0; i < state.activeTopic.scenes.length; i++) {
      const scene = state.activeTopic.scenes[i]!;
      const btn = document.createElement("button");
      btn.className = "atlas-overview-item";
      btn.type = "button";
      const preview = scene.body.length > 68 ? `${scene.body.slice(0, 68)}...` : scene.body;
      btn.innerHTML = `<span class="atlas-overview-title">${escapeHtml(scene.title)}</span><span class="atlas-overview-meta">场景 ${i + 1}</span><span class="atlas-overview-desc">${escapeHtml(preview)}</span>`;
      btn.addEventListener("click", () => deps.scrollSceneCard(i));
      list.appendChild(btn);
    }
  } else if (state.activeEra) {
    for (const topic of state.activeEra.topics) {
      const btn = document.createElement("button");
      btn.className = `atlas-overview-item${state.activeTopic === topic ? " active" : ""}`;
      btn.type = "button";
      const sceneNames = topic.scenes.map((sc) => sc.title).join("、");
      btn.innerHTML = `<span class="atlas-overview-title">${escapeHtml(topic.name)}</span><span class="atlas-overview-meta">${topic.scenes.length} 个场景</span><span class="atlas-overview-desc">${escapeHtml(sceneNames)}</span>`;
      btn.addEventListener("click", () => deps.selectTopic(topic));
      list.appendChild(btn);
    }
  }

  panel.appendChild(list);
}

export type ScenePanelDeps = {
  updateBreadcrumb: () => void;
  closeScenePanel: () => void;
  openScenePanel: () => void;
  returnToEra: () => void;
  returnToRoot: (restoreHelp?: boolean) => void;
};

export function showScenePanel(
  scenePanelRef: React.RefObject<HTMLElement | null>,
  topic: AtlasTopic,
  state: AtlasState,
  deps: ScenePanelDeps
) {
  deps.updateBreadcrumb();
  const panel = scenePanelRef.current;
  if (!panel) return;

  deps.closeScenePanel();
  panel.innerHTML = "";

  const header = document.createElement("div");
  header.className = "scene-header";
  const topRow = document.createElement("div");
  topRow.className = "scene-top-row";
  const backBtn = document.createElement("button");
  backBtn.className = "scene-back";
  backBtn.textContent = "← 返回主题";
  backBtn.addEventListener("click", deps.returnToEra);
  const closeBtn = document.createElement("button");
  closeBtn.className = "scene-close";
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", () => deps.returnToRoot(true));
  topRow.appendChild(backBtn);
  topRow.appendChild(closeBtn);
  header.appendChild(topRow);

  const title = document.createElement("h2");
  title.className = "scene-title";
  title.textContent = topic.name;
  header.appendChild(title);

  const meta = document.createElement("p");
  meta.className = "scene-meta";
  meta.textContent = `${state.activeEra!.name} · ${topic.scenes.length} 个场景`;
  header.appendChild(meta);

  const progressBar = document.createElement("div");
  progressBar.className = "scene-progress";
  progressBar.innerHTML = '<div class="scene-progress-fill" style="width:0%"></div>';
  header.appendChild(progressBar);
  panel.appendChild(header);

  const cardsWrap = document.createElement("div");
  cardsWrap.className = "scene-cards";
  for (let i = 0; i < topic.scenes.length; i++) {
    const scene = topic.scenes[i]!;
    const card = document.createElement("div");
    card.className = "scene-card";
    card.innerHTML = `
      <div class="scene-step">
        <span class="scene-num">${i + 1}</span>
        ${i < topic.scenes.length - 1 ? '<div class="scene-line"></div>' : ""}
      </div>
      <div class="scene-body">
        <h3 class="scene-card-title">${escapeHtml(scene.title)}</h3>
        <p class="scene-card-body">${escapeHtml(scene.body)}</p>
      </div>
    `;
    cardsWrap.appendChild(card);
  }
  panel.appendChild(cardsWrap);

  cardsWrap.addEventListener("scroll", () => {
    const scrollable = cardsWrap.scrollHeight - cardsWrap.clientHeight;
    const pct = scrollable > 0 ? (cardsWrap.scrollTop / scrollable) * 100 : 100;
    const fill = panel.querySelector(".scene-progress-fill") as HTMLElement;
    if (fill) fill.style.width = `${Math.min(100, pct)}%`;
  });

  requestAnimationFrame(deps.openScenePanel);
}
