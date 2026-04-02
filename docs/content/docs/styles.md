---
title: Styles
description: Component styles with styles.component
---

# Styles

`styles.component` is the unified API for all component styling in typestyles. It handles both flat variants and dimensioned variants with full TypeScript support.

## Flat variants

Call `styles.component(namespace, definitions)` with a namespace and an object of variant names to style definitions. Any key that is not `variants`, `compoundVariants`, or `defaultVariants` is treated as a flat variant:

```ts
import { styles } from 'typestyles';

const card = styles.component('card', {
  base: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e5e5',
  },
  elevated: {
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  compact: {
    padding: '8px',
  },
});
```

The base class is just the namespace: `card`. Flat variant classes follow the pattern `{namespace}-{variant}`: `card-elevated`, `card-compact`.

Call the component as a function — base is always applied automatically:

```ts
card()                    // "card"
card({ elevated: true })  // "card card-elevated"
card({ compact: true })   // "card card-compact"
```

Destructure to get individual class strings (without base):

```ts
const { base, elevated, compact } = card;
// base = "card", elevated = "card-elevated", compact = "card-compact"
```

To use **hashed** or **hash-only** class strings instead (for example in a design system package), see [Class naming](/docs/class-naming).

## Dimensioned variants

Use a `variants` key for typed variant dimensions with `compoundVariants` and `defaultVariants` support:

```ts
import { styles } from 'typestyles';

const button = styles.component('button', {
  base: {
    padding: '8px 16px',
    borderRadius: '6px',
  },
  variants: {
    intent: {
      primary: { backgroundColor: '#0066ff', color: '#fff' },
      ghost: { backgroundColor: 'transparent' },
    },
    size: {
      sm: { fontSize: '14px' },
      lg: { fontSize: '18px', padding: '12px 24px' },
    },
  },
  defaultVariants: { intent: 'primary', size: 'sm' },
});

button()                              // "button button-intent-primary button-size-sm"
button({ intent: 'ghost' })           // "button button-intent-ghost button-size-sm"
button({ intent: 'primary', size: 'lg' }) // "button button-intent-primary button-size-lg"
```

Destructure variant option classes by name:

```ts
const { base, primary, ghost, sm, lg } = button;
// base = "button"
// primary = "button-intent-primary", ghost = "button-intent-ghost"
// sm = "button-size-sm", lg = "button-size-lg"
```

See [Components](/docs/components) for compound variants, boolean variants, and multipart slots.

## Selectors

Use the `&` prefix for pseudo-classes and nested selectors, just like in CSS:

```ts
const button = styles.component('button', {
  base: {
    padding: '8px 16px',
    '&:hover': { opacity: 0.9 },
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
  },
});
```

### Data and ARIA attribute selectors

Attribute selectors work with `&`-prefixed nested selectors, including all CSS attribute selector operators:

```ts
const trigger = styles.component('trigger', {
  base: {
    // exact match
    '&[data-state="open"]': { opacity: 1 },

    // starts with / ends with / contains
    '&[data-side^="top"]': { marginTop: '4px' },
    '&[data-size$="-lg"]': { padding: '12px' },
    '&[data-name*="admin"]': { fontWeight: 700 },

    // whitespace-separated token / language-style match
    '&[data-flags~="selected"]': { borderStyle: 'solid' },
    '&[lang|="en"]': { fontFamily: 'system-ui' },

    // accessibility state hooks
    '&[aria-expanded="true"]': { backgroundColor: '#1d4ed8' },
    '&[aria-selected="true"]': { color: 'white' },
  },
});
```

## Composing styles

Use `styles.compose()` to combine multiple callable components or class strings:

```ts
const base = styles.component('base', {
  root: { padding: '8px', borderRadius: '4px' },
});

const primary = styles.component('primary', {
  root: { backgroundColor: '#0066ff', color: 'white' },
});

const button = styles.compose(base, primary);
button('root'); // "base-root primary-root"
```

See the [Style Composition](/docs/compose) guide for more details.

## Utility shortcuts

Use `styles.withUtils()` to define reusable shorthand properties (similar to Stitches `utils`).

```ts
import { styles } from 'typestyles';

const s = styles.withUtils({
  marginX: (value: string | number) => ({
    marginLeft: value,
    marginRight: value,
  }),
  paddingY: (value: string | number) => ({
    paddingTop: value,
    paddingBottom: value,
  }),
  size: (value: string | number) => ({
    width: value,
    height: value,
  }),
});

const avatar = s.class('avatar', {
  size: 40,
  marginX: 8,
});

const button = s.component('button', {
  base: { paddingY: 8 },
  compact: { paddingY: 4 },
});
```

Utility keys are fully typed from your utility definitions and can be mixed with normal CSS properties.

## Composing with tokens

Use token references (e.g. from `tokens.create()`) in your style values. They compile to `var(--name-key)` and work with themes.

If you are migrating from CVA, Stitches, or vanilla-extract recipes, see [Migration Guide](/docs/migration).
