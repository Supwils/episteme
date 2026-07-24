const HAN = /\p{Script=Han}/u;
const WORD = /[\p{Letter}\p{Number}]/u;

/**
 * Tokenizer shared by the build-time index generator and the browser.
 *
 * MiniSearch's default tokenizer splits on whitespace and punctuation. Chinese
 * prose contains neither inside a sentence, so a whole punctuation-delimited run
 * collapses into one term and search degrades to guessing a prefix: the article
 * 《熵与热力学第二定律》 is reachable by 熵 but not by 热力学.
 *
 * Han runs are therefore emitted as overlapping bigrams (熵与热力学 → 熵与, 与热,
 * 热力, 力学), which is what Elasticsearch's CJK analyzer does — no dictionary, no
 * language pack, and a mid-token query becomes a subset of the indexed terms.
 * Latin and digits keep whole-word semantics so WebGL and 1905 stay single terms.
 *
 * Index side and query side MUST run this same function; a mismatch silently
 * returns no results.
 */
export function tokenize(text: string): string[] {
  const terms: string[] = [];
  let han = "";
  let word = "";

  const flushHan = () => {
    if (!han) return;
    const chars = [...han];
    if (chars.length === 1) terms.push(han);
    else for (let i = 0; i < chars.length - 1; i++) terms.push(chars[i]! + chars[i + 1]!);
    han = "";
  };
  const flushWord = () => {
    if (!word) return;
    terms.push(word.toLowerCase());
    word = "";
  };

  for (const ch of text) {
    if (HAN.test(ch)) {
      flushWord();
      han += ch;
    } else if (WORD.test(ch)) {
      flushHan();
      word += ch;
    } else {
      flushHan();
      flushWord();
    }
  }
  flushHan();
  flushWord();

  return terms;
}
