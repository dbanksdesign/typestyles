---
title: Styles
description: Create standalone classes and compose styles with the styles API
---

# Styles

The `styles` API provides several ways to define CSS-in-TypeScript styles:

- **`styles.class`** — a single named class with CSS properties
- **`styles.component`** — multi-variant component styles with typed dimensions ([Components](/docs/components))
- **`styles.hashClass`** — a content-hashed class for deduplication
- **`styles.compose`** — combine multiple style functions or class strings

## Single classes

Use `styles.class(name, properties)` when you just need a standalone class with no variants:

```ts
import { styles } from 'typestyles';

const card = styles.class('card', {
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid #e5e5e5',
});

// card === "card"
```

To use **hashed** or **hash-only** class strings instead (for example in a design system package), see [Class naming](/docs/class-naming).

## Selectors

Use the `&` prefix for pseudo-classes and nested selectors, just like in CSS:

```ts
const button = styles.class('button', {
  padding: '8px 16px',
  '&:hover': { opacity: 0.9 },
  '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
});
```

### Data and ARIA attribute selectors

Attribute selectors work with `&`-prefixed nested selectors, including all CSS attribute selector operators:

```ts
const trigger = styles.class('trigger', {
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
});
```

## Composing styles

Use `styles.compose()` to combine multiple style functions or class strings:

```ts
const card = styles.class('card', { padding: '8px', borderRadius: '4px' });

const button = styles.component('button', {
  base: { cursor: 'pointer' },
  variants: {
    intent: { primary: { backgroundColor: '#0066ff', color: 'white' } },
  },
});

const composed = styles.compose(card, button);
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
  variants: {
    size: { compact: { paddingY: 4 } },
  },
});
```

Utility keys are fully typed from your utility definitions and can be mixed with normal CSS properties.

## Composing with tokens

Use token references (e.g. from `tokens.create()`) in your style values. They compile to `var(--name-key)` and work with themes.

If you are migrating from CVA, Stitches, or vanilla-extract recipes, see [Migration Guide](/docs/migration).
