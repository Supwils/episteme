export const ERA_ACCENT: Record<string, string> = {
  冥古宙: "#ff6b6b",
  太古宙: "#e07a5f",
  元古宙: "#f2cc8f",
  古生代: "#81b29a",
  中生代: "#3d8b6e",
  新生代: "#f4a261",
  第四纪: "#e9c46a",
  全新世: "#2a9d8f",
};

export const ERA_BG: Record<string, string> = {
  冥古宙: "rgba(255,107,107,0.08)",
  太古宙: "rgba(224,122,95,0.08)",
  元古宙: "rgba(242,204,143,0.08)",
  古生代: "rgba(129,178,154,0.08)",
  中生代: "rgba(61,139,110,0.08)",
  新生代: "rgba(244,162,97,0.08)",
  第四纪: "rgba(233,196,106,0.08)",
  全新世: "rgba(42,157,143,0.08)",
};

export const ERA_GLOW: Record<string, string> = {
  冥古宙: "rgba(255,107,107,0.15)",
  太古宙: "rgba(224,122,95,0.15)",
  元古宙: "rgba(242,204,143,0.15)",
  古生代: "rgba(129,178,154,0.15)",
  中生代: "rgba(61,139,110,0.15)",
  新生代: "rgba(244,162,97,0.15)",
  第四纪: "rgba(233,196,106,0.15)",
  全新世: "rgba(42,157,143,0.15)",
};

export const TAXONOMY_COLORS: Record<string, string> = {
  动物界: "#e07a5f",
  植物界: "#81b29a",
  真菌界: "#c678dd",
  原核生物界: "#61afef",
  原生生物界: "#e5c07b",
  古菌界: "#56b6c2",
};

export const CATEGORY_ACCENTS: Record<string, string> = {
  animals: "#e07a5f",
  plants: "#81b29a",
  microorganisms: "#61afef",
};

export const PRODUCT_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const PHYLOGENETIC_COLORS = {
  bacteria: "#61afef",
  archaea: "#c678dd",
  eukaryota: "#e5c07b",
  animals: "#e07a5f",
  plants: "#81b29a",
  fungi: "#98c379",
} as const;
