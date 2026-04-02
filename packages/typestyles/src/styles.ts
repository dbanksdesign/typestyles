import type {
  CSSProperties,
  CSSPropertiesWithUtils,
  StyleUtils,
  FlatComponentResult,
  DimensionedComponentResult,
  VariantDefinitions,
} from './types.js';
import { serializeStyle } from './css.js';
import { insertRules } from './sheet.js';
import { registeredNamespaces } from './registry.js';
import {
  buildSingleClassName,
  getClassNamingConfig,
  hashString,
  sanitizeClassSegment,
  stableSerialize,
} from './class-naming.js';
import { createComponent } from './component.js';

/**
 * Create a single class with the given styles. Returns the class name string.
 * Use this when you don't need variants — just a class with typed CSS properties.
 *
 * @example
 * ```ts
 * const card = styles.class('card', {
 *   padding: '1rem',
 *   borderRadius: '0.5rem',
 *   backgroundColor: 'white',
 *   '&:hover': { boxShadow: '0 4px 6px rgb(0 0 0 / 0.1)' },
 * });
 *
 * <div className={card} />  // class="card"
 * ```
 */
export function createClass(name: string, properties: CSSProperties): string {
  if (process.env.NODE_ENV !== 'production') {
    if (registeredNamespaces.has(name)) {
      console.warn(
        `[typestyles] styles.class('${name}', ...) called more than once. ` +
          `This will cause class name collisions. Each class name should be unique.`,
      );
    }
  }
  registeredNamespaces.add(name);

  const className = buildSingleClassName(name, properties);
  const selector = `.${className}`;
  const rules = serializeStyle(selector, properties);
  insertRules(rules);

  return className;
}

/**
 * Create a deterministic hashed class from a style object.
 * The same style object shape+values always returns the same class name.
 *
 * Optional `label` is appended as a readable prefix for debugging.
 *
 * @example
 * ```ts
 * const button = styles.hashClass({
 *   padding: '8px 12px',
 *   borderRadius: '8px',
 * });
 *
 * const danger = styles.hashClass(
 *   { backgroundColor: 'red', color: 'white' },
 *   'danger'
 * );
 * ```
 */
export function createHashClass(properties: CSSProperties, label?: string): string {
  const cfg = getClassNamingConfig();
  const serialized =
    cfg.scopeId !== ''
      ? stableSerialize({ scope: cfg.scopeId, properties })
      : stableSerialize(properties);
  const hash = hashString(serialized);
  const className = label
    ? `${cfg.prefix}-${sanitizeClassSegment(label)}-${hash}`
    : `${cfg.prefix}-${hash}`;
  const selector = `.${className}`;
  const rules = serializeStyle(selector, properties);
  insertRules(rules);
  return className;
}

/**
 * Compose multiple component functions or class strings into one callable.
 *
 * @example
 * ```ts
 * const base = styles.component('base', {
 *   root: { padding: '8px', borderRadius: '4px' },
 * });
 * const primary = styles.component('primary', {
 *   root: { backgroundColor: '#0066ff', color: 'white' },
 * });
 * const button = styles.compose(base, primary);
 * cx(button.root, primary.root); // "base-root primary-root"
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

export type StylesWithUtilsApi<U extends StyleUtils> = {
  class: (name: string, properties: CSSPropertiesWithUtils<U>) => string;
  hashClass: (properties: CSSPropertiesWithUtils<U>, label?: string) => string;
  component: {
    <K extends string>(
      namespace: string,
      config: { base?: CSSPropertiesWithUtils<U>; variants?: never } & Record<
        K,
        CSSPropertiesWithUtils<U>
      >,
    ): FlatComponentResult<K>;
    <V extends VariantDefinitions>(
      namespace: string,
      config: {
        base?: CSSPropertiesWithUtils<U>;
        variants: { [Dim in keyof V]: { [Opt in keyof V[Dim]]: CSSPropertiesWithUtils<U> } };
        compoundVariants?: Array<{
          variants: Record<string, unknown>;
          style: CSSPropertiesWithUtils<U>;
        }>;
        defaultVariants?: Record<string, unknown>;
      },
    ): DimensionedComponentResult<V>;
  };
  compose: typeof compose;
};

/**
 * Create a utility-aware styles API, similar to Stitches' `utils`.
 *
 * @example
 * ```ts
 * const u = styles.withUtils({
 *   marginX: (value: string | number) => ({ marginLeft: value, marginRight: value }),
 *   size: (value: string | number) => ({ width: value, height: value }),
 * });
 *
 * const avatar = u.class('avatar', {
 *   size: 40,
 *   marginX: 8,
 * });
 *
 * const card = u.component('card', {
 *   base: { size: 200 },
 *   compact: { size: 100 },
 * });
 * ```
 */
export function createStylesWithUtils<U extends StyleUtils>(utils: U): StylesWithUtilsApi<U> {
  const apply = (properties: CSSPropertiesWithUtils<U>): CSSProperties =>
    expandStyleWithUtils(properties, utils);

  function applyToRecord(
    record: Record<string, CSSPropertiesWithUtils<U>>,
  ): Record<string, CSSProperties> {
    return Object.fromEntries(Object.entries(record).map(([k, v]) => [k, apply(v)]));
  }

  function component(namespace: string, config: Record<string, unknown>): unknown {
    if ('variants' in config) {
      const { base, variants, compoundVariants, defaultVariants, ...rest } = config as {
        base?: CSSPropertiesWithUtils<U>;
        variants: Record<string, Record<string, CSSPropertiesWithUtils<U>>>;
        compoundVariants?: Array<{
          variants: Record<string, unknown>;
          style: CSSPropertiesWithUtils<U>;
        }>;
        defaultVariants?: Record<string, unknown>;
        [k: string]: unknown;
      };
      void rest;

      const expandedVariants = Object.fromEntries(
        Object.entries(variants).map(([dim, opts]) => [dim, applyToRecord(opts)]),
      );

      const expandedCompound = (compoundVariants ?? []).map((cv) => ({
        variants: cv.variants,
        style: apply(cv.style),
      }));

      return createComponent(namespace, {
        ...(base ? { base: apply(base) } : {}),
        variants: expandedVariants,
        ...(expandedCompound.length ? { compoundVariants: expandedCompound } : {}),
        ...(defaultVariants ? { defaultVariants } : {}),
      } as Parameters<typeof createComponent>[1]);
    }

    // Flat config
    const transformed = Object.fromEntries(
      Object.entries(config).map(([k, v]) => [k, apply(v as CSSPropertiesWithUtils<U>)]),
    ) as Record<string, CSSProperties>;

    return createComponent(namespace, transformed);
  }

  return {
    class: (name, properties) => createClass(name, apply(properties)),
    hashClass: (properties, label) => createHashClass(apply(properties), label),
    component: component as StylesWithUtilsApi<U>['component'],
    compose,
  };
}

function expandStyleWithUtils<U extends StyleUtils>(
  properties: CSSPropertiesWithUtils<U>,
  utils: U,
): CSSProperties {
  const expanded: CSSProperties = {};

  for (const [key, value] of Object.entries(properties as Record<string, unknown>)) {
    if (value == null) continue;

    if (key.startsWith('&') || key.startsWith('[') || key.startsWith('@')) {
      if (isObject(value)) {
        assignStyleEntry(
          expanded,
          key,
          expandStyleWithUtils(value as CSSPropertiesWithUtils<U>, utils),
        );
      }
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(utils, key)) {
      const utilFn = utils[key as keyof U] as unknown as (arg: unknown) => CSSProperties;
      const utilResult = utilFn(value);
      const normalized = expandStyleWithUtils(utilResult as CSSPropertiesWithUtils<U>, utils);
      for (const [utilKey, utilValue] of Object.entries(normalized as Record<string, unknown>)) {
        assignStyleEntry(expanded, utilKey, utilValue);
      }
      continue;
    }

    assignStyleEntry(expanded, key, value);
  }

  return expanded;
}

function assignStyleEntry(target: CSSProperties, key: string, value: unknown): void {
  const targetRecord = target as Record<string, unknown>;

  if (isObject(value)) {
    const existing = targetRecord[key];
    if (isObject(existing)) {
      targetRecord[key] = mergeStyleObjects(existing as CSSProperties, value as CSSProperties);
      return;
    }
    targetRecord[key] = value;
    return;
  }

  targetRecord[key] = value;
}

function mergeStyleObjects(base: CSSProperties, next: CSSProperties): CSSProperties {
  const merged: CSSProperties = { ...base };

  for (const [key, value] of Object.entries(next as Record<string, unknown>)) {
    assignStyleEntry(merged, key, value);
  }

  return merged;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
