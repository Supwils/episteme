import { writeFileSync, renameSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";

/**
 * Write data to a file atomically by writing to a temporary file in the same
 * directory, then renaming it. On POSIX systems, rename is atomic, so readers
 * never see a partially-written file.
 *
 * The temporary file is placed in the same directory as the target to ensure
 * the rename is atomic (cross-filesystem moves are not atomic).
 *
 * @param targetPath - The final path where the file should be written
 * @param data - The data to write (string or Buffer)
 */
export function writeFileAtomic(targetPath: string, data: string | Buffer): void {
  const dir = dirname(targetPath);
  const tempPath = join(dir, `.tmp-${Date.now()}-${Math.random().toString(36).slice(2)}`);

  try {
    // Write to temp file
    writeFileSync(tempPath, data);
    // Atomic replace (POSIX)
    renameSync(tempPath, targetPath);
  } catch (error) {
    // Clean up temp file if it exists
    try {
      unlinkSync(tempPath);
    } catch {
      // Ignore cleanup errors
    }
    throw error;
  }
}
