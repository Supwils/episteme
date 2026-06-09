import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TEXTURE_DIR = join(ROOT, "public", "textures", "planets");

const TEXTURES = [
  {
    name: "Mercury diffuse",
    file: "mercury.jpg",
    size: "1024x512",
    source: "https://svs.gsfc.nasa.gov/4720",
    note: "Search 'mercury' in the SVS gallery; download the cylindrical projection map",
  },
  {
    name: "Venus diffuse",
    file: "venus.jpg",
    size: "1024x512",
    source: "https://svs.gsfc.nasa.gov/4720",
    note: "Surface map (not clouds). Also available at https://planetpixelemporium.com/",
  },
  {
    name: "Earth Blue Marble",
    file: "earth-day.jpg",
    size: "2048x1024",
    source: "https://visibleearth.nasa.gov/collection/1484/blue-marble",
    note: "Download the 2K equirectangular/cylindrical projection. Retile or pick the smallest available.",
  },
  {
    name: "Earth Black Marble (night lights)",
    file: "earth-night.jpg",
    size: "2048x1024",
    source: "https://earthobservatory.nasa.gov/features/NightLights",
    note: "Black Marble 2016/2017 composite. Select the 2K equirectangular version.",
  },
  {
    name: "Earth clouds",
    file: "earth-clouds.jpg",
    size: "2048x1024",
    source: "https://visibleearth.nasa.gov/collection/1486/clouds",
    note: "Cloud texture with alpha or on black background. Used as a semi-transparent overlay.",
  },
  {
    name: "Mars diffuse",
    file: "mars.jpg",
    size: "1024x512",
    source: "https://svs.gsfc.nasa.gov/4720",
    note: "Viking-era or MOLA color map. Also at https://planetpixelemporium.com/",
  },
  {
    name: "Jupiter diffuse",
    file: "jupiter.jpg",
    size: "1024x512",
    source: "https://svs.gsfc.nasa.gov/4720",
    note: "Cylindrical projection Jupiter texture",
  },
  {
    name: "Saturn diffuse",
    file: "saturn.jpg",
    size: "1024x512",
    source: "https://svs.gsfc.nasa.gov/4720",
    note: "Cylindrical projection Saturn texture (without rings)",
  },
  {
    name: "Saturn ring",
    file: "saturn-ring.png",
    size: "512x64",
    source: "https://www.solarsystemscope.com/textures/",
    note: "Ring texture strip (PNG with alpha). Available from Solar System Scope or planetpixelemporium.",
  },
  {
    name: "Uranus diffuse",
    file: "uranus.jpg",
    size: "1024x512",
    source: "https://svs.gsfc.nasa.gov/4720",
    note: "Cylindrical projection; atmosphere bands may be subtle",
  },
  {
    name: "Neptune diffuse",
    file: "neptune.jpg",
    size: "1024x512",
    source: "https://svs.gsfc.nasa.gov/4720",
    note: "Cylindrical projection Neptune texture",
  },
  {
    name: "Moon (LRO)",
    file: "moon.jpg",
    size: "1024x512",
    source: "https://svs.gsfc.nasa.gov/4720",
    note: "LRO WAC / Clementine derived color map",
  },
];

const EXTRA_SOURCES = [
  {
    label: "Solar System Scope Textures",
    url: "https://www.solarsystemscope.com/textures/",
    desc: "Free 2K/4K planet textures (CC BY 4.0). Good all-in-one source.",
  },
  {
    label: "NASA SVS Gallery (4720)",
    url: "https://svs.gsfc.nasa.gov/4720",
    desc: "NASA Scientific Visualization Studio planet maps. Public domain.",
  },
  {
    label: "Planet Pixel Emporium",
    url: "https://planetpixelemporium.com/",
    desc: "High-quality individual planet textures. Free for non-commercial use.",
  },
];

mkdirSync(TEXTURE_DIR, { recursive: true });

const existing = [];
const missing = [];

for (const tex of TEXTURES) {
  const fullPath = join(TEXTURE_DIR, tex.file);
  if (existsSync(fullPath)) {
    existing.push(tex);
  } else {
    missing.push(tex);
  }
}

console.log("");
console.log("=".repeat(70));
console.log("  PLANET TEXTURE PREPARATION REPORT");
console.log("=".repeat(70));
console.log("");
console.log(`  Texture directory : ${TEXTURE_DIR}`);
console.log(`  Total textures   : ${TEXTURES.length}`);
console.log(`  Found             : ${existing.length}`);
console.log(`  Missing           : ${missing.length}`);
console.log("");

if (existing.length > 0) {
  console.log("-".repeat(70));
  console.log("  FOUND:");
  console.log("-".repeat(70));
  for (const tex of existing) {
    console.log(`    ✓ ${tex.file} (${tex.size})`);
  }
  console.log("");
}

if (missing.length > 0) {
  console.log("-".repeat(70));
  console.log("  MISSING TEXTURES — download from the sources listed below:");
  console.log("-".repeat(70));
  console.log("");
  for (const tex of missing) {
    console.log(`  [ ] ${tex.file}`);
    console.log(`      Name   : ${tex.name}`);
    console.log(`      Size   : ${tex.size}`);
    console.log(`      Source : ${tex.source}`);
    console.log(`      Note   : ${tex.note}`);
    console.log(`      Target : public/textures/planets/${tex.file}`);
    console.log("");
  }
}

console.log("-".repeat(70));
console.log("  RECOMMENDED SOURCES:");
console.log("-".repeat(70));
for (const src of EXTRA_SOURCES) {
  console.log(`  • ${src.label}`);
  console.log(`    ${src.url}`);
  console.log(`    ${src.desc}`);
  console.log("");
}

console.log("-".repeat(70));
console.log("  CONVERSION TO KTX2 (for production / three.js GPU textures):");
console.log("-".repeat(70));
console.log("");
console.log("  KTX2 with Basis Universal supercompression provides the best");
console.log("  GPU memory footprint and load time. To convert:");
console.log("");
console.log("  1. Install the KTX-Software CLI (provides toktx):");
console.log("     brew install ktx-software");
console.log("     # or download from https://github.com/KhronosGroup/KTX-Software/releases");
console.log("");
console.log("  2. Convert each texture (example for earth-day):");
console.log("     toktx --bcmp --target_type RGBA \\");
console.log("       public/textures/planets/earth-day.ktx2 \\");
console.log("       public/textures/planets/earth-day.jpg");
console.log("");
console.log("  3. For smaller textures (1024x512) you can use lower quality:");
console.log("     toktx --bcmp --qlevel 128 \\");
console.log("       public/textures/planets/mercury.ktx2 \\");
console.log("       public/textures/planets/mercury.jpg");
console.log("");
console.log("  4. For the ring texture (PNG with alpha):");
console.log("     toktx --bcmp --target_type RGBA \\");
console.log("       public/textures/planets/saturn-ring.ktx2 \\");
console.log("       public/textures/planets/saturn-ring.png");
console.log("");
console.log("  Alternatively, use https://github.com/donmccurdy/glTF-Transform:");
console.log("     npx @gltf-transform/cli ktx2 input.jpg output.ktx2");
console.log("");
console.log("  During development, JPG/PNG textures work fine — KTX2 conversion");
console.log("  is an optimization step for production builds.");
console.log("");

if (missing.length > 0) {
  console.log("=".repeat(70));
  console.log(`  ACTION REQUIRED: ${missing.length} texture(s) need to be downloaded.`);
  console.log("=".repeat(70));
  console.log("");
  process.exit(1);
} else {
  console.log("=".repeat(70));
  console.log("  All textures present. Ready to go!");
  console.log("=".repeat(70));
  console.log("");
  process.exit(0);
}
