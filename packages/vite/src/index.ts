import type { Plugin } from 'vite';

/**
 * Regex patterns to extract namespace strings from typestyles API calls.
 *
 * Matches:
 *   styles.create('button', ...)   → prefix ".button-"
 *   tokens.create('color', ...)    → key "tokens:color"
 *   tokens.createTheme('dark', ...)→ key "theme:dark"  (also createTheme('dark', ...))
 *   keyframes.create('fadeIn', ..) → key "keyframes:fadeIn"
 */
const STYLES_CREATE_RE = /styles\.create\(\s*['"]([^'"]+)['"]/g;
const TOKENS_CREATE_RE = /tokens\.create\(\s*['"]([^'"]+)['"]/g;
const CREATE_THEME_RE = /(?:tokens\.)?createTheme\(\s*['"]([^'"]+)['"]/g;
const KEYFRAMES_CREATE_RE = /keyframes\.create\(\s*['"]([^'"]+)['"]/g;

/** Check whether a module imports from 'typestyles' */
const TYPESTYLES_IMPORT_RE = /(?:from\s+|import\s+|require\s*\(\s*)['"]typestyles['"]/;

export interface TypestylesPluginOptions {
  /** Warn about duplicate namespaces across modules. Defaults to true. */
  warnDuplicates?: boolean;
}

/**
 * Extract namespace information from source code.
 * Returns { keys, prefixes } for invalidation.
 */
export function extractNamespaces(code: string): {
  keys: string[];
  prefixes: string[];
} {
  const keys: string[] = [];
  const prefixes: string[] = [];

  for (const match of code.matchAll(STYLES_CREATE_RE)) {
    prefixes.push(`.${match[1]}-`);
  }

  for (const match of code.matchAll(TOKENS_CREATE_RE)) {
    keys.push(`tokens:${match[1]}`);
  }

  for (const match of code.matchAll(CREATE_THEME_RE)) {
    keys.push(`theme:${match[1]}`);
  }

  for (const match of code.matchAll(KEYFRAMES_CREATE_RE)) {
    keys.push(`keyframes:${match[1]}`);
  }

  return { keys, prefixes };
}

/**
 * Vite plugin for typestyles HMR support.
 *
 * When a module that uses typestyles is edited, this plugin injects HMR
 * accept/dispose handlers that invalidate the module's style registrations
 * before re-execution — so updated CSS takes effect without a full reload.
 */
export default function typestylesPlugin(
  options: TypestylesPluginOptions = {}
): Plugin {
  const { warnDuplicates = true } = options;

  // Track namespaces per module for duplicate detection
  const moduleNamespaces = new Map<string, { keys: string[]; prefixes: string[] }>();

  return {
    name: 'typestyles',
    enforce: 'pre',

    transform(code, id) {
      // Skip non-JS/TS modules and node_modules
      if (!/\.[jt]sx?$/.test(id)) return null;
      if (id.includes('node_modules')) return null;

      // Only transform modules that import from typestyles
      if (!TYPESTYLES_IMPORT_RE.test(code)) return null;

      const { keys, prefixes } = extractNamespaces(code);

      // Nothing to invalidate
      if (keys.length === 0 && prefixes.length === 0) return null;

      // Duplicate namespace detection
      if (warnDuplicates) {
        for (const [otherId, other] of moduleNamespaces) {
          if (otherId === id) continue;
          for (const prefix of prefixes) {
            if (other.prefixes.includes(prefix)) {
              const ns = prefix.slice(1, -1); // strip leading "." and trailing "-"
              this.warn(
                `Style namespace "${ns}" is also used in ${otherId}. ` +
                  `Duplicate namespaces cause class name collisions.`
              );
            }
          }
        }
      }

      moduleNamespaces.set(id, { keys, prefixes });

      // Inject HMR code
      const keysJSON = JSON.stringify(keys);
      const prefixesJSON = JSON.stringify(prefixes);

      const hmrCode = `
if (import.meta.hot) {
  import('typestyles/hmr').then(({ invalidateKeys: __typestyles_invalidateKeys }) => {
    import.meta.hot.accept();
    import.meta.hot.dispose(() => {
      __typestyles_invalidateKeys(${keysJSON}, ${prefixesJSON});
    });
  });
}`;

      return {
        code: code + hmrCode,
        map: null,
      };
    },
  };
}
