import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

/**
 * Pre-generate "讲解" audio from every `*.narration.md` and write a manifest the
 * app reads at render time. Hash-incremental: a script whose (voice, model,
 * text) is unchanged is skipped, so re-runs are cheap. NOT wired into prebuild —
 * TTS needs an API key, so it's a manual authoring step:  pnpm gen-narration
 *
 * Provider is chosen per domain (PROVIDER_BY_DOMAIN): philosophy uses Xiaomi
 * MiMo (free, tuned for Chinese), the rest use ElevenLabs. Because the hash is
 * over voice+model+script, switching a domain's provider only regenerates that
 * domain's audio — existing entries keep their hash and are skipped.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_ROOT = path.join(ROOT, "content");
const AUDIO_DIR = path.join(ROOT, "public", "audio", "narration");
const MANIFEST_PATH = path.join(ROOT, "lib", "narration-manifest.json");

type Provider = "elevenlabs" | "xiaomi";

const PROVIDER_BY_DOMAIN: Record<string, Provider> = {
  philosophy: "xiaomi",
};

const PROVIDER_CONFIG: Record<
  Provider,
  { voice: string; model: string; ext: string; envKey: string }
> = {
  // Adrian — standard-accent Mandarin narration voice (shared library, direct use).
  elevenlabs: {
    voice: process.env.ELEVENLABS_VOICE_ID || "agczkAUlHLowaNnL72Cc",
    model: process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2",
    ext: "mp3",
    envKey: "ElevenLabs_API_Key",
  },
  // Xiaomi MiMo TTS v2.5 — female "茉莉" by default (env-overridable).
  xiaomi: {
    voice: process.env.MIMO_VOICE || "茉莉",
    model: process.env.MIMO_MODEL || "mimo-v2.5-tts",
    ext: "wav",
    envKey: "Xiaomi_API_Key",
  },
};

interface ManifestEntry {
  hash: string;
  file: string;
  chars: number;
  provider: Provider;
  voiceId: string;
  model: string;
  generatedAt: string;
}

/** Read one var from .env (tsx doesn't auto-load it); no external dep. */
function readEnvVar(name: string): string | undefined {
  const envPath = path.join(ROOT, ".env");
  if (process.env[name]) return process.env[name];
  if (!fs.existsSync(envPath)) return undefined;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && m[1] === name) return m[2]!.replace(/^["']|["']$/g, "").trim();
  }
  return undefined;
}

function findNarrationFiles(dir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findNarrationFiles(full));
    else if (entry.name.endsWith(".narration.md")) out.push(full);
  }
  return out;
}

function keyOf(file: string): string {
  return path
    .relative(CONTENT_ROOT, file)
    .replace(/\.narration\.md$/, "")
    .split(path.sep)
    .join("/");
}

function providerFor(key: string): Provider {
  const domain = key.split("/")[0] ?? "";
  return PROVIDER_BY_DOMAIN[domain] ?? "elevenlabs";
}

async function synthesizeElevenLabs(
  apiKey: string,
  text: string,
  cfg: { voice: string; model: string }
): Promise<Buffer> {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${cfg.voice}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text,
        model_id: cfg.model,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0,
          use_speaker_boost: true,
        },
      }),
    }
  );
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return Buffer.from(await res.arrayBuffer());
}

async function synthesizeXiaomi(
  apiKey: string,
  text: string,
  cfg: { voice: string; model: string }
): Promise<Buffer> {
  // MiMo TTS rides the chat-completions schema: style goes in the user turn,
  // the text to read goes in the assistant turn; audio comes back base64 in
  // choices[0].message.audio.data.
  const res = await fetch("https://api.xiaomimimo.com/v1/chat/completions", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: cfg.model,
      messages: [
        { role: "user", content: "用温暖、清晰、像老师讲课一样自然流畅的语气朗读这段话。" },
        { role: "assistant", content: text },
      ],
      audio: { format: "wav", voice: cfg.voice, stream: false },
    }),
  });
  if (!res.ok) throw new Error(`MiMo ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = (await res.json()) as { choices?: { message?: { audio?: { data?: string } } }[] };
  const b64 = data.choices?.[0]?.message?.audio?.data;
  if (!b64) throw new Error("MiMo: no audio.data in response");
  return Buffer.from(b64, "base64");
}

async function main() {
  const files = findNarrationFiles(CONTENT_ROOT).sort();
  const manifest: Record<string, ManifestEntry> = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"))
    : {};

  const jobs = files.map((file) => {
    const key = keyOf(file);
    const provider = providerFor(key);
    const cfg = PROVIDER_CONFIG[provider];
    const script = matter(fs.readFileSync(file, "utf-8")).content.trim();
    const hash = crypto
      .createHash("sha256")
      .update(`${cfg.voice}|${cfg.model}|${script}`)
      .digest("hex")
      .slice(0, 16);
    return { key, script, hash, provider, cfg };
  });

  const stale = jobs.filter((j) => {
    const m = manifest[j.key];
    return (
      !m || m.hash !== j.hash || !fs.existsSync(path.join(AUDIO_DIR, `${j.hash}.${j.cfg.ext}`))
    );
  });

  console.log(`Found ${jobs.length} narration script(s); ${stale.length} need (re)generation.`);
  if (stale.length === 0) {
    console.log("✓ All narration audio is up to date.");
    return;
  }

  // Load only the keys the stale jobs actually need.
  const keys = new Map<Provider, string>();
  for (const provider of new Set(stale.map((j) => j.provider))) {
    const cfg = PROVIDER_CONFIG[provider];
    const apiKey = readEnvVar(cfg.envKey) || readEnvVar(cfg.envKey.toUpperCase());
    if (!apiKey) {
      console.error(`✗ No API key for ${provider} (.env ${cfg.envKey}). Aborting.`);
      process.exit(1);
    }
    keys.set(provider, apiKey);
  }

  fs.mkdirSync(AUDIO_DIR, { recursive: true });

  for (const job of stale) {
    process.stdout.write(`  → [${job.provider}] ${job.key} (${job.script.length} chars) … `);
    const apiKey = keys.get(job.provider)!;
    const audio =
      job.provider === "xiaomi"
        ? await synthesizeXiaomi(apiKey, job.script, job.cfg)
        : await synthesizeElevenLabs(apiKey, job.script, job.cfg);
    fs.writeFileSync(path.join(AUDIO_DIR, `${job.hash}.${job.cfg.ext}`), audio);
    // prune the previous audio file for this key if the hash changed
    const prev = manifest[job.key];
    if (prev && prev.hash !== job.hash) {
      const old = path.join(AUDIO_DIR, path.basename(prev.file));
      if (fs.existsSync(old)) fs.rmSync(old);
    }
    manifest[job.key] = {
      hash: job.hash,
      file: `/audio/narration/${job.hash}.${job.cfg.ext}`,
      chars: job.script.length,
      provider: job.provider,
      voiceId: job.cfg.voice,
      model: job.cfg.model,
      generatedAt: new Date().toISOString(),
    };
    console.log(`${(audio.length / 1024).toFixed(0)} KB ✓`);
  }

  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b))
  );
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + "\n");
  console.log(
    `\n✓ Wrote ${stale.length} audio file(s) + manifest (${Object.keys(sorted).length} total).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
