import type { CSSProperties, SelectorFunction, StyleDefinitions } from './types.js';
import { serializeStyle } from './css.js';
import { insertRules } from './sheet.js';
import { registeredNamespaces } from './registry.js';

/**
 * Create a style group and return a selector function.
 *
 * The selector function accepts variant names and returns a composed
 * class name string. Class names are deterministic and human-readable:
 * `{namespace}-{variant}`.
 *
 * @example
 * ```ts
 * const button = createStyles('button', {
 *   base: { padding: '8px 16px', fontSize: '14px' },
 *   primary: { backgroundColor: '#0066ff', color: '#fff' },
 *   large: { padding: '12px 24px', fontSize: '16px' },
 * });
 *
 * button('base', 'primary')          // "button-base button-primary"
 * button('base', isLarge && 'large') // conditional application
 * ```
 */
export function createStyles<K extends string>(
  namespace: string,
  definitions: StyleDefinitions & Record<K, CSSProperties>,
): SelectorFunction<K> {
  // Development-mode duplicate detection
  if (process.env.NODE_ENV !== 'production') {
    if (registeredNamespaces.has(namespace)) {
      console.warn(
        `[typestyles] styles.create('${namespace}', ...) called more than once. ` +
          `This will cause class name collisions. Each namespace should be unique.`,
      );
    }
  }
  registeredNamespaces.add(namespace);

  // Generate and inject CSS for all variants
  const rules: Array<{ key: string; css: string }> = [];

  for (const [variant, properties] of Object.entries(definitions)) {
    const className = `${namespace}-${variant}`;
    const selector = `.${className}`;
    const variantRules = serializeStyle(selector, properties as CSSProperties);
    rules.push(...variantRules);
  }

  insertRules(rules);

  // Return the selector function
  const selectorFn = (...variants: (K | false | null | undefined)[]): string => {
    return variants
      .filter(Boolean)
      .map((v) => `${namespace}-${v as string}`)
      .join(' ');
  };

  return selectorFn as SelectorFunction<K>;
}

/**
 * Compose multiple selector functions or class strings into one.
 * Returns a new SelectorFunction that calls all inputs and joins results.
 *
 * @example
 * ```ts
 * const base = styles.create('base', { padding: '8px' });
 * const primary = styles.create('primary', { color: 'blue' });
 * const button = styles.compose(base, primary);
 *
 * button('padding', 'color'); // "base-padding primary-color"
 * ```
 */
type AnySelectorFunction = {
  (...args: unknown[]): string;
};

export function compose(
  ...selectors: Array<AnySelectorFunction | string | false | null | undefined>
): AnySelectorFunction {
  const validSelectors = selectors.filter(Boolean) as Array<AnySelectorFunction | string>;

  return (...args: unknown[]): string => {
    const classNames: string[] = [];

    for (const selector of validSelectors) {
      if (typeof selector === 'string') {
        classNames.push(selector);
      } else {
        const result = selector(...args);
        if (result) classNames.push(result);
      }
    }

    return classNames.join(' ');
  };
}
