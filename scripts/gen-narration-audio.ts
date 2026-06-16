import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

/**
 * Pre-generate "讲解" audio from every `*.narration.md` via ElevenLabs and write
 * a manifest the app reads at render time. Hash-incremental: a script (or voice)
 * that hasn't changed is skipped, so re-runs are cheap. NOT wired into prebuild
 * — TTS costs money and needs the API key, so it's a manual authoring step.
 *
 *   pnpm gen-narration
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_ROOT = path.join(ROOT, "content");
const AUDIO_DIR = path.join(ROOT, "public", "audio", "narration");
const MANIFEST_PATH = path.join(ROOT, "lib", "narration-manifest.json");

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "zOU486alQL1w83ooSHNz"; // wilson (zh)
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";
const OUTPUT_FORMAT = "mp3_44100_128";

interface ManifestEntry {
  hash: string;
  file: string;
  chars: number;
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

async function synthesize(apiKey: string, text: string): Promise<Buffer> {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=${OUTPUT_FORMAT}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0,
          use_speaker_boost: true,
        },
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`ElevenLabs ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const files = findNarrationFiles(CONTENT_ROOT).sort();
  const manifest: Record<string, ManifestEntry> = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"))
    : {};

  const jobs = files.map((file) => {
    const key = keyOf(file);
    const script = matter(fs.readFileSync(file, "utf-8")).content.trim();
    const hash = crypto
      .createHash("sha256")
      .update(`${VOICE_ID}|${MODEL_ID}|${script}`)
      .digest("hex")
      .slice(0, 16);
    return { key, script, hash };
  });

  const stale = jobs.filter((j) => {
    const m = manifest[j.key];
    return !m || m.hash !== j.hash || !fs.existsSync(path.join(AUDIO_DIR, `${j.hash}.mp3`));
  });

  console.log(`Found ${jobs.length} narration script(s); ${stale.length} need (re)generation.`);
  if (stale.length === 0) {
    console.log("✓ All narration audio is up to date.");
    return;
  }

  const apiKey = readEnvVar("ElevenLabs_API_Key") || readEnvVar("ELEVENLABS_API_KEY");
  if (!apiKey) {
    console.error(
      "✗ No ElevenLabs key found (.env ElevenLabs_API_Key). Cannot generate audio.\n" +
        "  The player will fall back to the browser voice until audio is generated."
    );
    process.exit(1);
  }

  fs.mkdirSync(AUDIO_DIR, { recursive: true });

  for (const job of stale) {
    process.stdout.write(`  → ${job.key} (${job.script.length} chars) … `);
    const audio = await synthesize(apiKey, job.script);
    fs.writeFileSync(path.join(AUDIO_DIR, `${job.hash}.mp3`), audio);
    // prune the previous audio file for this key if the hash changed
    const prev = manifest[job.key];
    if (prev && prev.hash !== job.hash) {
      const old = path.join(AUDIO_DIR, `${prev.hash}.mp3`);
      if (fs.existsSync(old)) fs.rmSync(old);
    }
    manifest[job.key] = {
      hash: job.hash,
      file: `/audio/narration/${job.hash}.mp3`,
      chars: job.script.length,
      voiceId: VOICE_ID,
      model: MODEL_ID,
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
