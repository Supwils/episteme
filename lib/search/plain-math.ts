/**
 * Readable stand-in for TeX that would otherwise leak into a search snippet.
 * The article renderer still uses KaTeX; this file must not import it, because
 * phrase search runs beside the shared search worker.
 */

/** Shared with the renderer: establish TeX intent before Han prose, so a later
 *  command or Windows path cannot turn an earlier dollar price into math. */
export function isInlineMath(tex: string): boolean {
  const firstHan = tex.search(/\p{Script=Han}/u);
  if (firstHan !== -1) {
    const marker = tex.search(/\\[A-Za-z]+|[_^]\s*\{/);
    return marker !== -1 && marker < firstHan;
  }
  return (
    /[\\^_{]/.test(tex) ||
    /^(?:[A-Za-z]|-?\d+(?:[./+*-]\d+)*)$/.test(tex) ||
    /^-?\d+(?:[./+*-]\d+)*[*/+-][A-Za-z][A-Za-z0-9]*$/.test(tex) ||
    /^\s*[A-Za-z][A-Za-z0-9]*(?:\s*[=<>+*/-]\s*-?[A-Za-z0-9]+)+\s*$/.test(tex) ||
    // Function notation followed by a relation — T(n) = 2T(n/2) + O(n), d(x,y)=0.
    // A dollar amount never opens with a letter applied to an argument list.
    /^\s*[A-Za-z](?:_\w)?\([A-Za-z0-9,\s]*\)\s*(?:[=<>]|\\le|\\ge)/.test(tex)
  );
}

const SYMBOLS: Record<string, string> = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  varepsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  pi: "π",
  rho: "ρ",
  sigma: "σ",
  tau: "τ",
  phi: "φ",
  varphi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  Gamma: "Γ",
  Delta: "Δ",
  Theta: "Θ",
  Lambda: "Λ",
  Sigma: "Σ",
  Phi: "Φ",
  Omega: "Ω",
  infty: "∞",
  to: "→",
  rightarrow: "→",
  leftarrow: "←",
  leftrightarrow: "↔",
  leq: "≤",
  le: "≤",
  geq: "≥",
  ge: "≥",
  neq: "≠",
  ne: "≠",
  approx: "≈",
  equiv: "≡",
  cdot: "·",
  times: "×",
  pm: "±",
  ldots: "…",
  cdots: "⋯",
  sum: "∑",
  prod: "∏",
  int: "∫",
  partial: "∂",
  nabla: "∇",
  forall: "∀",
  exists: "∃",
  in: "∈",
  notin: "∉",
  subset: "⊂",
  cup: "∪",
  cap: "∩",
  langle: "⟨",
  rangle: "⟩",
  quad: " ",
  qquad: " ",
  left: "",
  right: "",
};

const WORD_COMMANDS = new Set([
  "lim",
  "sup",
  "inf",
  "log",
  "ln",
  "sin",
  "cos",
  "tan",
  "max",
  "min",
  "exp",
  "det",
  "dim",
  "Pr",
]);

const SUP: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "+": "⁺",
  "-": "⁻",
  n: "ⁿ",
  i: "ⁱ",
};

const SUB: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  "+": "₊",
  "-": "₋",
  a: "ₐ",
  e: "ₑ",
  i: "ᵢ",
  n: "ₙ",
  r: "ᵣ",
  u: "ᵤ",
  x: "ₓ",
};

function accent(inner: string, mark: string): string {
  const chars = [...inner];
  if (chars.length === 0) return "";
  chars[chars.length - 1] = `${chars[chars.length - 1]}${mark}`;
  return chars.join("");
}

function expandCommands(tex: string): string {
  let current = tex.replace(/\\\\/g, " ");
  for (let pass = 0; pass < 6; pass += 1) {
    const next = current
      .replace(/\\bar\{([^{}]*)\}/g, (_, inner: string) => accent(inner, "\u0304"))
      .replace(/\\hat\{([^{}]*)\}/g, (_, inner: string) => accent(inner, "\u0302"))
      .replace(/\\tilde\{([^{}]*)\}/g, (_, inner: string) => accent(inner, "\u0303"))
      .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)")
      .replace(/\\sqrt\{([^{}]*)\}/g, (_, inner: string) =>
        /^[A-Za-z0-9]+$/.test(inner) ? `√${inner}` : `√(${inner})`
      )
      .replace(/\\(?:text|mathrm|mathbf|mathit|mathbb|boldsymbol|operatorname)\{([^{}]*)\}/g, "$1")
      .replace(/\\xrightarrow\{([^{}]*)\}/g, "→")
      .replace(/\\xleftarrow\{([^{}]*)\}/g, "←");
    if (next === current) return current;
    current = next;
  }
  return current;
}

function replaceSymbols(tex: string): string {
  return tex.replace(/\\([A-Za-z]+)/g, (_, name: string) => {
    if (name in SYMBOLS) return SYMBOLS[name] ?? "";
    if (WORD_COMMANDS.has(name)) return name;
    return "";
  });
}

function asScript(token: string, table: Record<string, string>): string | null {
  let out = "";
  for (const char of token) {
    const mapped = table[char];
    if (!mapped) return null;
    out += mapped;
  }
  return out;
}

function attach(base: string, token: string, table: Record<string, string>): string {
  const script = asScript(token, table);
  return script ? `${base}${script}` : `${base}(${token})`;
}

function applyScripts(tex: string): string {
  return tex
    .replace(/([^^\s])\^\{([^{}]*)\}/g, (_, base: string, token: string) =>
      attach(base, token, SUP)
    )
    .replace(/([^^\s])_\{([^{}]*)\}/g, (_, base: string, token: string) => attach(base, token, SUB))
    .replace(/([^^\s])\^([A-Za-z0-9])/g, (_, base: string, token: string) =>
      attach(base, token, SUP)
    )
    .replace(/([^^\s])_([A-Za-z0-9])/g, (_, base: string, token: string) =>
      attach(base, token, SUB)
    );
}

/** Collapse one formula to plain text. Never returns a backslash. */
export function plainMath(tex: string): string {
  const text = applyScripts(replaceSymbols(expandCommands(tex)))
    .replace(/[{}]/g, "")
    .replace(/[_^~]/g, "")
    .replace(/\*/g, "×")
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text || "公式";
}

/** Walk left to right, the way the renderer does, so a rejected `$…$` does
 *  not swallow the next real formula. */
export function replaceSearchMath(text: string): string {
  let out = "";
  let index = 0;
  while (index < text.length) {
    if (text.startsWith("$$", index)) {
      const end = text.indexOf("$$", index + 2);
      if (end !== -1) {
        out += ` ${plainMath(text.slice(index + 2, end))} `;
        index = end + 2;
        continue;
      }
    }
    if (text[index] === "$") {
      const end = text.indexOf("$", index + 1);
      const newline = text.indexOf("\n", index + 1);
      if (end !== -1 && (newline === -1 || end < newline)) {
        const tex = text.slice(index + 1, end);
        if (isInlineMath(tex)) {
          out += ` ${plainMath(tex)} `;
          index = end + 1;
          continue;
        }
      }
    }
    out += text[index];
    index += 1;
  }
  return out;
}
