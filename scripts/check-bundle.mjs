import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const NEXT_DIR = join(import.meta.dirname, '..', '.next', 'static', 'chunks');
const MAX_CHUNK_KB = 260;

try {
  const files = readdirSync(NEXT_DIR).filter(f => f.endsWith('.js'));
  let totalKB = 0;
  let violations = [];

  for (const file of files) {
    const sizeKB = statSync(join(NEXT_DIR, file)).size / 1024;
    totalKB += sizeKB;
    if (sizeKB > MAX_CHUNK_KB) {
      violations.push(`  ${file}: ${sizeKB.toFixed(1)} KB (limit: ${MAX_CHUNK_KB} KB)`);
    }
  }

  console.log(`Total JS: ${totalKB.toFixed(1)} KB across ${files.length} chunks`);
  if (violations.length) {
    console.warn(`\n⚠️  Chunk size violations:\n${violations.join('\n')}`);
  } else {
    console.log('✅ All chunks within budget');
  }
} catch {
  console.log('No build output found. Run pnpm build first.');
}
