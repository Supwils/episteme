import fs from "node:fs";
import path from "node:path";
import { getDomainContentDir } from "./content-paths";
import { safeParseMatter } from "./content-utils";
import manifest from "./narration-manifest.json";

/**
 * "讲解" — a spoken audio companion authored separately from the article. It is
 * NOT text-to-speech of the article: it gives intuition, story and motivation
 * (what speech is good at), leaving precise data / tables / code to the read
 * (what text is good at). Authored as a sibling `<slug>.narration.md`.
 */
export interface Narration {
  /** Display title for the player ("正在讲解：…"). */
  title: string;
  /** Spoken script — plain prose, used for TTS and as an optional transcript. */
  script: string;
  /** Pre-generated audio URL, or null to fall back to the browser voice. */
  audioUrl: string | null;
}

export interface NarrationManifestEntry {
  hash: string;
  file: string;
  chars: number;
  voiceId: string;
  model: string;
  generatedAt: string;
}

const MANIFEST = manifest as Record<string, NarrationManifestEntry>;

/** Stable key for an article's narration across loader + generator + manifest. */
export function narrationKey(domain: string, section: string, slug: string): string {
  return `${domain}/${section}/${slug}`;
}

/** Load the spoken companion for an article, or null if none was authored. */
export function getNarration(domain: string, section: string, slug: string): Narration | null {
  const file = path.join(getDomainContentDir(domain), section, `${slug}.narration.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = safeParseMatter(fs.readFileSync(file, "utf-8"));
  const script = content.trim();
  if (!script) return null;

  const entry = MANIFEST[narrationKey(domain, section, slug)];
  return {
    title: typeof data.title === "string" && data.title ? data.title : slug,
    script,
    audioUrl: entry ? entry.file : null,
  };
}
