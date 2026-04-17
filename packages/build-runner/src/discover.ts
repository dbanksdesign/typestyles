import { existsSync } from 'node:fs';
import { resolve as resolvePath } from 'node:path';

/**
 * Relative paths checked (in order) when no explicit extraction entry is configured.
 * Shared by `@typestyles/vite` and `@typestyles/next/build` so defaults stay aligned.
 *
 * Includes `styles/…` paths after `src/…` because many Next.js apps use a top-level `styles`
 * folder instead of `src/`.
 */
export const DEFAULT_EXTRACT_MODULE_CANDIDATES = [
  'src/typestyles-entry.ts',
  'src/typestyles.ts',
  'src/styles/index.ts',
  'src/styles.ts',
  'styles/typestyles-entry.ts',
  'styles/typestyles.ts',
] as const;

/**
 * Resolve the default extraction module when the user did not pass explicit `modules`.
 * Returns at most one path using `/` separators, relative to `root`.
 */
export function discoverDefaultExtractModules(root: string): string[] {
  const absRoot = resolvePath(root);
  for (const rel of DEFAULT_EXTRACT_MODULE_CANDIDATES) {
    if (existsSync(resolvePath(absRoot, rel))) {
      return [rel.replace(/\\/g, '/')];
    }
  }
  return [];
}
