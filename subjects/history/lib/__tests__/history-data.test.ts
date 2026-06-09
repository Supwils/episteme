import { describe, it, expect } from 'vitest';
import { getAllEvents, getEventBySlug, formatYear, getCatLabel, getRegionLabel } from '@/subjects/history/lib/events';
import { ERAS, getEraBySlug, getAdjacentEras, ERA_SLUGS } from '@/subjects/history/lib/eras';
import {
  getEventRelationships,
  getFigureEventLinks,
  getEventRelationsByTitle,
  getFigureLinksByEvent,
  getFigureLinksByFigure,
} from '@/subjects/history/lib/event-relationships';
import { escapeHtml } from '@/subjects/history/lib/escape-html';
import { getAllArticles, getArticleBySlug } from '@/lib/knowledge-base';

describe('history data access', () => {
  describe('getAllEvents', () => {
    it('returns a non-empty array', () => {
      const events = getAllEvents();
      expect(events.length).toBeGreaterThan(0);
    });

    it('each event has required fields (id, title, year)', () => {
      const events = getAllEvents();
      for (const ev of events) {
        expect(ev.title).toBeTruthy();
        expect(typeof ev.title).toBe('string');
        expect(typeof ev.year).toBe('number');
        expect(ev.era).toBeTruthy();
      }
    });

    it('no duplicate IDs', () => {
      const events = getAllEvents();
      const titles = events.map((e) => e.title);
      const unique = new Set(titles);
      expect(unique.size).toBe(titles.length);
    });

    it('enriches events with eraName and eraColor', () => {
      const events = getAllEvents();
      for (const ev of events) {
        expect(ev.eraName).toBeTruthy();
        expect(ev.eraColor).toMatch(/^#/);
      }
    });
  });

  describe('getEventBySlug', () => {
    it('returns an event for a valid slug', () => {
      const all = getAllEvents();
      const first = all[0]!;
      const found = getEventBySlug(first.title);
      expect(found).toBeDefined();
      expect(found!.title).toBe(first.title);
      expect(found!.year).toBe(first.year);
    });

    it('returns undefined for an invalid slug', () => {
      const found = getEventBySlug('nonexistent-event-slug-xyz');
      expect(found).toBeUndefined();
    });
  });

  describe('getEventsByEra (via filtering)', () => {
    it('can filter events by era field', () => {
      const events = getAllEvents();
      const eras = [...new Set(events.map((e) => e.era))];
      expect(eras.length).toBeGreaterThan(0);
      for (const eraId of eras) {
        const eraEvents = events.filter((e) => e.era === eraId);
        expect(eraEvents.length).toBeGreaterThan(0);
      }
    });
  });

  describe('formatYear', () => {
    it('formats negative years with BC', () => {
      expect(formatYear(-3000)).toBe('公元前3000年');
    });

    it('formats year 0', () => {
      expect(formatYear(0)).toBe('公元元年');
    });

    it('formats positive years', () => {
      expect(formatYear(2024)).toBe('公元2024年');
    });
  });

  describe('getCatLabel', () => {
    it('returns Chinese label for known categories', () => {
      expect(getCatLabel('politics')).toBe('政治');
      expect(getCatLabel('military')).toBe('军事');
      expect(getCatLabel('science')).toBe('科技');
    });

    it('returns the raw value for unknown categories', () => {
      expect(getCatLabel('unknown')).toBe('unknown');
    });
  });

  describe('getRegionLabel', () => {
    it('returns Chinese label for known regions', () => {
      expect(getRegionLabel('asia')).toBe('亚洲');
      expect(getRegionLabel('europe')).toBe('欧洲');
    });

    it('returns the raw value for unknown regions', () => {
      expect(getRegionLabel('unknown')).toBe('unknown');
    });
  });
});

describe('eras', () => {
  describe('getAllEras / ERAS', () => {
    it('ERAS is a non-empty array', () => {
      expect(ERAS.length).toBeGreaterThan(0);
    });

    it('each era has required fields', () => {
      for (const era of ERAS) {
        expect(era.id).toBeTruthy();
        expect(era.name).toBeTruthy();
        expect(typeof era.startYear).toBe('number');
        expect(typeof era.endYear).toBe('number');
        expect(era.color).toMatch(/^#/);
      }
    });

    it('eras are ordered chronologically by startYear', () => {
      for (let i = 1; i < ERAS.length; i++) {
        expect(ERAS[i]!.startYear).toBeGreaterThanOrEqual(ERAS[i - 1]!.startYear);
      }
    });
  });

  describe('getEraBySlug', () => {
    it('returns an era for a valid slug', () => {
      const first = ERAS[0]!;
      const found = getEraBySlug(first.id);
      expect(found).toBeDefined();
      expect(found!.id).toBe(first.id);
      expect(found!.name).toBe(first.name);
    });

    it('returns undefined for an invalid slug', () => {
      expect(getEraBySlug('nonexistent')).toBeUndefined();
    });
  });

  describe('ERA_SLUGS', () => {
    it('matches the ids from ERAS', () => {
      expect(ERA_SLUGS).toEqual(ERAS.map((e) => e.id));
    });
  });

  describe('getAdjacentEras', () => {
    it('returns prev and next for a middle era', () => {
      const middleIdx = 1;
      const middleId = ERAS[middleIdx]!.id;
      const adjacent = getAdjacentEras(middleId);
      expect(adjacent.prev).not.toBeNull();
      expect(adjacent.prev!.id).toBe(ERAS[middleIdx - 1]!.id);
      expect(adjacent.next).not.toBeNull();
      expect(adjacent.next!.id).toBe(ERAS[middleIdx + 1]!.id);
    });

    it('returns null prev for first era', () => {
      const firstId = ERAS[0]!.id;
      const adjacent = getAdjacentEras(firstId);
      expect(adjacent.prev).toBeNull();
      expect(adjacent.next).not.toBeNull();
    });

    it('returns null next for last era', () => {
      const lastId = ERAS[ERAS.length - 1]!.id;
      const adjacent = getAdjacentEras(lastId);
      expect(adjacent.prev).not.toBeNull();
      expect(adjacent.next).toBeNull();
    });
  });
});

describe('event-relationships', () => {
  describe('getEventRelationships', () => {
    it('returns a non-empty array', () => {
      const rels = getEventRelationships();
      expect(rels.length).toBeGreaterThan(0);
    });

    it('each relation has required fields', () => {
      const rels = getEventRelationships();
      const validTypes = ['caused', 'influenced', 'contemporary', 'reacted-to'];
      for (const rel of rels) {
        expect(rel.source).toBeTruthy();
        expect(rel.target).toBeTruthy();
        expect(validTypes).toContain(rel.type);
        expect(rel.description).toBeTruthy();
      }
    });

    it('has no duplicate relations (same source+target+type)', () => {
      const rels = getEventRelationships();
      const keys = rels.map((r) => `${r.source}|${r.target}|${r.type}`);
      const unique = new Set(keys);
      expect(unique.size).toBe(keys.length);
    });
  });

  describe('getFigureEventLinks', () => {
    it('returns a non-empty array', () => {
      const links = getFigureEventLinks();
      expect(links.length).toBeGreaterThan(0);
    });

    it('each link has required fields', () => {
      const links = getFigureEventLinks();
      const validRoles = ['initiated', 'participated', 'influenced', 'opposed'];
      for (const link of links) {
        expect(link.figureId).toBeTruthy();
        expect(link.eventId).toBeTruthy();
        expect(validRoles).toContain(link.role);
      }
    });
  });

  describe('getEventRelationsByTitle', () => {
    it('returns relations for an event that has relations', () => {
      const allRels = getEventRelationships();
      const knownTitle = allRels[0]!.source;
      const filtered = getEventRelationsByTitle(knownTitle);
      expect(filtered.length).toBeGreaterThan(0);
      for (const rel of filtered) {
        expect(rel.source === knownTitle || rel.target === knownTitle).toBe(true);
      }
    });

    it('returns empty array for event with no relations', () => {
      const filtered = getEventRelationsByTitle('completely-fake-event-title-xyz');
      expect(filtered).toEqual([]);
    });
  });

  describe('getFigureLinksByEvent', () => {
    it('returns links for an event that has figure links', () => {
      const allLinks = getFigureEventLinks();
      const knownEvent = allLinks[0]!.eventId;
      const filtered = getFigureLinksByEvent(knownEvent);
      expect(filtered.length).toBeGreaterThan(0);
      for (const link of filtered) {
        expect(link.eventId).toBe(knownEvent);
      }
    });

    it('returns empty array for event with no figure links', () => {
      const filtered = getFigureLinksByEvent('completely-fake-event-title-xyz');
      expect(filtered).toEqual([]);
    });
  });

  describe('getFigureLinksByFigure', () => {
    it('returns links for a figure that has links', () => {
      const allLinks = getFigureEventLinks();
      const knownFigure = allLinks[0]!.figureId;
      const filtered = getFigureLinksByFigure(knownFigure);
      expect(filtered.length).toBeGreaterThan(0);
      for (const link of filtered) {
        expect(link.figureId).toBe(knownFigure);
      }
    });

    it('returns empty array for figure with no links', () => {
      const filtered = getFigureLinksByFigure('nonexistent-figure-xyz');
      expect(filtered).toEqual([]);
    });
  });
});

describe('escapeHtml', () => {
  it('escapes & < > " characters', () => {
    expect(escapeHtml('&<>"')).toBe('&amp;&lt;&gt;&quot;');
  });

  it('returns empty string for non-string input', () => {
    expect(escapeHtml(null as unknown as string)).toBe('');
    expect(escapeHtml(undefined as unknown as string)).toBe('');
    expect(escapeHtml(42 as unknown as string)).toBe('');
  });

  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('handles string with no special characters', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });

  it('escapes mixed content', () => {
    expect(escapeHtml('a&b<c>d"e')).toBe('a&amp;b&lt;c&gt;d&quot;e');
  });
});

describe('knowledge-base', () => {
  describe('getAllArticles', () => {
    it('returns a non-empty array', () => {
      const articles = getAllArticles();
      expect(articles.length).toBeGreaterThan(0);
    });

    it('each article has required fields', () => {
      const articles = getAllArticles();
      for (const article of articles) {
        expect(article.slug).toBeTruthy();
        expect(article.title).toBeTruthy();
        expect(article.era).toBeTruthy();
        expect(article.eraLabel).toBeTruthy();
        expect(article.category).toBeTruthy();
        expect(typeof article.excerpt).toBe('string');
        expect(article.filePath).toBeTruthy();
      }
    });

    it('articles are sorted by era order then title', () => {
      const articles = getAllArticles();
      for (let i = 1; i < articles.length; i++) {
        const prev = articles[i - 1]!;
        const curr = articles[i]!;
        const ERA_ORDER: Record<string, number> = {
          远古时期: 0, 古典时期: 1, 中世纪: 2, 近代: 3, 现代: 4, 当代: 5,
          未来展望: 6, 人物: 7, 文明: 8, 事件: 9,
        };
        const prevOrder = ERA_ORDER[prev.era] ?? 99;
        const currOrder = ERA_ORDER[curr.era] ?? 99;
        if (prevOrder === currOrder) {
          expect(prev.title.localeCompare(curr.title, 'zh')).toBeLessThanOrEqual(0);
        } else {
          expect(prevOrder).toBeLessThanOrEqual(currOrder);
        }
      }
    });
  });

  describe('getArticleBySlug', () => {
    it('returns an article for a valid slug', () => {
      const articles = getAllArticles();
      const first = articles[0]!;
      const full = getArticleBySlug(first.slug);
      expect(full).not.toBeNull();
      expect(full!.slug).toBe(first.slug);
      expect(full!.title).toBe(first.title);
      expect(typeof full!.content).toBe('string');
      expect(full!.content.length).toBeGreaterThan(0);
    });

    it('returns null for an invalid slug', () => {
      const result = getArticleBySlug('nonexistent--article--slug');
      expect(result).toBeNull();
    });
  });
});
