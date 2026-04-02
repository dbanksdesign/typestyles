import type {
  CSSProperties,
  VariantDefinitions,
  ComponentConfig,
  DimensionedComponentResult,
  FlatComponentResult,
  SlotComponentConfig,
  SlotComponentFunction,
  SlotVariantDefinitions,
} from './types.js';
import { serializeStyle } from './css.js';
import { insertRules } from './sheet.js';
import { registeredNamespaces } from './registry.js';
import { buildComponentClassName, buildSingleClassName } from './class-naming.js';

/**
 * Create a component style and return a result that is both callable and destructurable.
 *
 * **Flat variants** (no `variants:` key) — each key is a boolean toggle:
 * ```ts
 * const card = styles.component('card', {
 *   base: { padding: '16px', borderRadius: '8px' },
 *   elevated: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
 *   compact: { padding: '8px' },
 * });
 *
 * card()                    // "card"
 * card({ elevated: true })  // "card card-elevated"
 *
 * const { base, elevated, compact } = card;
 * cx(base, isElevated && elevated)
 * ```
 *
 * **Dimensioned variants** (with `variants:` key) — CVA-style:
 * ```ts
 * const button = styles.component('button', {
 *   base: { padding: '8px 16px' },
 *   variants: {
 *     intent: {
 *       primary: { backgroundColor: '#0066ff', color: '#fff' },
 *       ghost:   { backgroundColor: 'transparent' },
 *     },
 *     size: {
 *       sm: { fontSize: '12px' },
 *       lg: { fontSize: '18px' },
 *     },
 *   },
 *   compoundVariants: [
 *     { intent: 'primary', size: 'lg', css: { fontWeight: 700 } },
 *   ],
 *   defaultVariants: { intent: 'primary', size: 'sm' },
 * });
 *
 * button()                        // "button button-intent-primary button-size-sm"
 * button({ intent: 'ghost' })     // "button button-intent-ghost button-size-sm"
 *
 * const { base, primary, ghost, sm, lg } = button;
 * ```
 *
 * Class naming convention (default `semantic` mode):
 *   base                         → `{namespace}`
 *   flat variant `elevated`      → `{namespace}-elevated`
 *   variants.intent.primary      → `{namespace}-intent-primary`
 *   compoundVariants[0]          → `{namespace}-compound-0`
 */
export function createComponent<S extends string, V extends SlotVariantDefinitions<S>>(
  namespace: string,
  config: SlotComponentConfig<S, V>,
): SlotComponentFunction<S, V>;

export function createComponent<V extends VariantDefinitions>(
  namespace: string,
  config: Omit<ComponentConfig<V>, 'variants'> & { variants: V },
): DimensionedComponentResult<V>;

export function createComponent<K extends string>(
  namespace: string,
  config: { base?: CSSProperties; variants?: never } & Record<K, CSSProperties>,
): FlatComponentResult<K>;

export function createComponent(
  namespace: string,
  config:
    | ComponentConfig<VariantDefinitions>
    | SlotComponentConfig<string, SlotVariantDefinitions<string>>
    | Record<string, CSSProperties>,
):
  | DimensionedComponentResult<VariantDefinitions>
  | FlatComponentResult<string>
  | SlotComponentFunction<string, SlotVariantDefinitions<string>> {
  if ('slots' in config) {
    return createSlotComponent(
      namespace,
      config as SlotComponentConfig<string, SlotVariantDefinitions<string>>,
    );
  }
  if ('variants' in config) {
    return createDimensionedComponent(namespace, config as ComponentConfig<VariantDefinitions>);
  }
  return createFlatComponent(namespace, config as Record<string, CSSProperties>);
}

function registerNamespace(namespace: string, apiName: string): void {
  if (process.env.NODE_ENV !== 'production') {
    if (registeredNamespaces.has(namespace)) {
      console.warn(
        `[typestyles] styles.component('${namespace}', ...) called more than once via ${apiName}. ` +
          `This will cause class name collisions. Each namespace should be unique.`,
      );
    }
  }
  registeredNamespaces.add(namespace);
}

/**
 * Flat component: each key (except `base`) is a boolean variant.
 * Base class = namespace itself. Variant classes = namespace-key.
 */
function createFlatComponent<K extends string>(
  namespace: string,
  config: { base?: CSSProperties } & Record<K, CSSProperties>,
): FlatComponentResult<K> {
  registerNamespace(namespace, 'createFlatComponent');

  const rules: Array<{ key: string; css: string }> = [];

  // Base class is the namespace itself
  let baseClassName = '';
  if (config.base) {
    baseClassName = buildSingleClassName(namespace, config.base);
    rules.push(...serializeStyle(`.${baseClassName}`, config.base));
  }

  // Each non-base key maps to namespace-key
  const variantToClass: Record<string, string> = {};
  for (const [key, properties] of Object.entries(config as Record<string, CSSProperties>)) {
    if (key === 'base') continue;
    const className = buildComponentClassName(namespace, key, properties);
    variantToClass[key] = className;
    rules.push(...serializeStyle(`.${className}`, properties));
  }

  insertRules(rules);

  const fn = function (
    selections: { readonly [key in K]?: boolean | null | undefined } = {} as {
      readonly [key in K]?: boolean | null | undefined;
    },
  ): string {
    const classes: string[] = [];
    if (baseClassName) classes.push(baseClassName);
    for (const [key, active] of Object.entries(selections as Record<string, unknown>)) {
      if (active) {
        const cn = variantToClass[key];
        if (cn) classes.push(cn);
      }
    }
    return classes.join(' ');
  };

  // Assign destructurable properties
  const props: Record<string, string> = { base: baseClassName };
  for (const [key, cn] of Object.entries(variantToClass)) {
    props[key] = cn;
  }
  Object.assign(fn, props);

  return fn as FlatComponentResult<K>;
}

/**
 * Dimensioned component: CVA-style with `variants`, `compoundVariants`, `defaultVariants`.
 * Base class = namespace itself. Variant classes = namespace-dimension-option.
 */
function createDimensionedComponent<V extends VariantDefinitions>(
  namespace: string,
  config: ComponentConfig<V>,
): DimensionedComponentResult<V> {
  const { base, variants = {} as V, compoundVariants = [], defaultVariants = {} } = config;

  registerNamespace(namespace, 'createDimensionedComponent');

  const rules: Array<{ key: string; css: string }> = [];

  // Base class is the namespace itself (not namespace-base)
  let baseClassName = '';
  if (base) {
    baseClassName = buildSingleClassName(namespace, base);
    rules.push(...serializeStyle(`.${baseClassName}`, base));
  }

  const variantClassByKey: Record<string, string> = {};
  const compoundClassByIndex: string[] = [];

  // Inject CSS for each variant option
  for (const [dimension, options] of Object.entries(variants)) {
    for (const [option, properties] of Object.entries(options as Record<string, CSSProperties>)) {
      const segment = `${dimension}-${option}`;
      const className = buildComponentClassName(namespace, segment, properties);
      variantClassByKey[segment] = className;
      rules.push(...serializeStyle(`.${className}`, properties));
    }
  }

  // Inject CSS for each compound variant
  (compoundVariants as Array<{ variants: Record<string, unknown>; style: CSSProperties }>).forEach(
    (cv, index) => {
      const className = buildComponentClassName(namespace, `compound-${index}`, cv.style);
      compoundClassByIndex[index] = className;
      rules.push(...serializeStyle(`.${className}`, cv.style));
    },
  );

  insertRules(rules);

  // Build the callable function
  const fn = function (selections: Record<string, unknown> = {}): string {
    const classes: string[] = [];

    if (baseClassName) classes.push(baseClassName);

    // Resolve final selections (explicit overrides defaultVariants)
    const resolvedSelections: Record<string, unknown> = {};
    for (const [dimension, options] of Object.entries(variants)) {
      const optionMap = options as Record<string, CSSProperties>;
      const explicit = selections[dimension];
      const fallback = (defaultVariants as Record<string, unknown>)[dimension];
      resolvedSelections[dimension] = normalizeSelection(explicit ?? fallback, optionMap);
    }

    // Apply variant classes
    for (const [dimension, options] of Object.entries(variants)) {
      const selected = resolvedSelections[dimension];
      const optionMap = options as Record<string, CSSProperties>;
      const selectedKey = normalizeSelection(selected, optionMap);
      if (selectedKey != null) {
        const variantKey = `${dimension}-${selectedKey}`;
        const cn = variantClassByKey[variantKey];
        if (cn) classes.push(cn);
      }
    }

    // Apply compound variant classes
    (
      compoundVariants as Array<{ variants: Record<string, unknown>; style: CSSProperties }>
    ).forEach((cv, index) => {
      const matches = Object.entries(cv.variants).every(([k, expected]) => {
        const options = (variants as Record<string, Record<string, CSSProperties>>)[k];
        if (!options) return false;

        const selected = normalizeSelection(resolvedSelections[k], options);
        if (selected == null) return false;

        if (Array.isArray(expected)) {
          return expected.some((value) => normalizeSelection(value, options) === selected);
        }

        return normalizeSelection(expected, options) === selected;
      });
      if (matches) {
        const cn = compoundClassByIndex[index];
        if (cn) classes.push(cn);
      }
    });

    return classes.join(' ');
  };

  // Assign destructurable properties: base + each variant option
  const props: Record<string, string> = { base: baseClassName };
  for (const [dimension, options] of Object.entries(variants)) {
    for (const option of Object.keys(options as Record<string, CSSProperties>)) {
      const segment = `${dimension}-${option}`;
      props[option] = variantClassByKey[segment] ?? '';
    }
  }
  Object.assign(fn, props);

  return fn as DimensionedComponentResult<V>;
}

function normalizeSelection(value: unknown, options: Record<string, unknown>): string | undefined {
  if (value == null) return undefined;

  if (typeof value === 'boolean') {
    const boolKey = String(value);
    if (Object.prototype.hasOwnProperty.call(options, boolKey)) return boolKey;
    // Preserve existing behavior: false acts as an opt-out when no "false" variant is defined.
    if (value === false) return undefined;
    return boolKey;
  }

  return String(value);
}

function createSlotComponent<S extends string, V extends SlotVariantDefinitions<S>>(
  namespace: string,
  config: SlotComponentConfig<S, V>,
): SlotComponentFunction<S, V> {
  const {
    slots,
    base = {},
    variants = {} as V,
    compoundVariants = [],
    defaultVariants = {},
  } = config;

  registerNamespace(namespace, 'createSlotComponent');

  const rules: Array<{ key: string; css: string }> = [];

  const baseClassBySlot: Record<string, string> = {};
  for (const [slot, properties] of Object.entries(base as Record<string, CSSProperties>)) {
    const className = buildComponentClassName(namespace, slot, properties);
    baseClassBySlot[slot] = className;
    rules.push(...serializeStyle(`.${className}`, properties));
  }

  const variantClassByKey: Record<string, string> = {};
  for (const [dimension, options] of Object.entries(variants)) {
    for (const [option, slotStyles] of Object.entries(
      options as Record<string, Record<string, CSSProperties>>,
    )) {
      for (const [slot, properties] of Object.entries(slotStyles)) {
        const segment = `${slot}-${dimension}-${option}`;
        const className = buildComponentClassName(namespace, segment, properties);
        variantClassByKey[segment] = className;
        rules.push(...serializeStyle(`.${className}`, properties));
      }
    }
  }

  const slotCompoundClassByKey: Record<string, string> = {};
  (
    compoundVariants as Array<{
      variants: Record<string, unknown>;
      style: Record<string, CSSProperties>;
    }>
  ).forEach((cv, index) => {
    for (const [slot, properties] of Object.entries(cv.style)) {
      const segment = `${slot}-compound-${index}`;
      const className = buildComponentClassName(namespace, segment, properties);
      slotCompoundClassByKey[`${slot}::${index}`] = className;
      rules.push(...serializeStyle(`.${className}`, properties));
    }
  });

  insertRules(rules);

  return ((selections: Record<string, unknown> = {}) => {
    const classes = Object.fromEntries(
      (slots as readonly string[]).map((slot) => [slot, [] as string[]]),
    ) as Record<string, string[]>;

    const resolvedSelections: Record<string, unknown> = {};
    for (const [dimension, options] of Object.entries(variants)) {
      const optionMap = options as Record<string, unknown>;
      const explicit = selections[dimension];
      const fallback = (defaultVariants as Record<string, unknown>)[dimension];
      resolvedSelections[dimension] = normalizeSelection(explicit ?? fallback, optionMap);
    }

    for (const slot of Object.keys(base as Record<string, CSSProperties>)) {
      const cn = baseClassBySlot[slot];
      if (cn && classes[slot]) classes[slot].push(cn);
    }

    for (const [dimension, options] of Object.entries(variants)) {
      const optionMap = options as Record<string, Record<string, CSSProperties>>;
      const selected = normalizeSelection(resolvedSelections[dimension], optionMap);
      if (selected == null) continue;
      const slotStyles = optionMap[selected];
      if (!slotStyles) continue;

      for (const slot of Object.keys(slotStyles)) {
        const segment = `${slot}-${dimension}-${selected}`;
        const cn = variantClassByKey[segment];
        if (cn && classes[slot]) classes[slot].push(cn);
      }
    }

    (
      compoundVariants as Array<{
        variants: Record<string, unknown>;
        style: Record<string, CSSProperties>;
      }>
    ).forEach((cv, index) => {
      const matches = Object.entries(cv.variants).every(([k, expected]) => {
        const options = (variants as Record<string, Record<string, unknown>>)[k];
        if (!options) return false;

        const selected = normalizeSelection(resolvedSelections[k], options);
        if (selected == null) return false;

        if (Array.isArray(expected)) {
          return expected.some((value) => normalizeSelection(value, options) === selected);
        }

        return normalizeSelection(expected, options) === selected;
      });

      if (!matches) return;

      for (const slot of Object.keys(cv.style)) {
        const cn = slotCompoundClassByKey[`${slot}::${index}`];
        if (cn && classes[slot]) classes[slot].push(cn);
      }
    });

    return Object.fromEntries(
      (slots as readonly string[]).map((slot) => [slot, classes[slot].join(' ')]),
    ) as Record<S, string>;
  }) as SlotComponentFunction<S, V>;
}
