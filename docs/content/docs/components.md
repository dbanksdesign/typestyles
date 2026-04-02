---
title: Components
description: Build typed variant APIs with styles.component
---

# Components

`styles.component()` is the unified API for all component styling in typestyles. It handles both flat variants and dimensioned variants — you no longer need a separate API for each.

Use it when you want:

- `base` styles applied automatically on every call
- Flat named variants (elevated, compact, etc.)
- Typed `variants` dimensions (`intent`, `size`, `tone`) with defaults and compounds
- Destructuring support for individual class strings
- Full TypeScript autocomplete on both call and destructure

## Flat variants

When your config has no `variants` key, all non-`base` keys are flat variants:

```ts
import { styles } from 'typestyles';

const card = styles.component('card', {
  base: { padding: '16px', borderRadius: '8px' },
  elevated: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  compact: { padding: '8px' },
});

card()                    // "card"              (base always applied)
card({ elevated: true })  // "card card-elevated"
card({ compact: true })   // "card card-compact"

const { base, elevated, compact } = card;
// base = "card", elevated = "card-elevated", compact = "card-compact"
```

## Basic component

```ts
import { styles } from 'typestyles';

export const button = styles.component('button', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid transparent',
    borderRadius: '8px',
    fontWeight: 500,
  },
  variants: {
    intent: {
      primary: { backgroundColor: '#2563eb', color: 'white' },
      ghost: { backgroundColor: 'transparent', color: '#1f2937' },
    },
    size: {
      sm: { padding: '6px 10px', fontSize: '14px' },
      lg: { padding: '10px 16px', fontSize: '16px' },
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'sm',
  },
});

button()                              // "button button-intent-primary button-size-sm"
button({ size: 'lg' })                // "button button-intent-primary button-size-lg"
button({ intent: 'ghost', size: 'lg' }) // "button button-intent-ghost button-size-lg"
```

Class strings follow the global [class naming](/docs/class-naming) configuration (`semantic` by default).

Destructure to get individual class strings:

```ts
const { base, primary, ghost, sm, lg } = button;
// base = "button"
// primary = "button-intent-primary", ghost = "button-intent-ghost"
// sm = "button-size-sm", lg = "button-size-lg"
```

## Compound variants

Use `compoundVariants` for styles that should apply only when multiple variant values match.

```ts
const badge = styles.component('badge', {
  variants: {
    tone: {
      success: { color: '#166534' },
      warning: { color: '#92400e' },
      danger: { color: '#991b1b' },
    },
    size: {
      sm: { fontSize: '12px' },
      lg: { fontSize: '14px' },
    },
  },
  compoundVariants: [
    {
      variants: { tone: ['success', 'warning'], size: 'lg' },
      style: { fontWeight: 700 },
    },
  ],
});

badge({ tone: 'success', size: 'lg' }); // includes "badge-compound-0"
badge({ tone: 'danger', size: 'lg' }); // does not include compound class
```

`compoundVariants` supports:

- single values: `{ size: 'lg' }`
- multi-value arrays: `{ tone: ['success', 'warning'] }`

## Boolean variants

Boolean variant dimensions are represented with `"true"` / `"false"` option keys.

```ts
const input = styles.component('input', {
  base: { border: '1px solid #d1d5db' },
  variants: {
    invalid: {
      true: { borderColor: '#ef4444' },
      false: { borderColor: '#d1d5db' },
    },
  },
  defaultVariants: {
    invalid: false,
  },
});

input()                  // "input input-invalid-false"
input({ invalid: true }) // "input input-invalid-true"
```

## Multipart `slots`

Pass a `slots` array for components with multiple parts (for example root, trigger, and panel). `base`, `variants`, `compoundVariants`, and `defaultVariants` can each target specific slot keys.

```ts
const tabs = styles.component('tabs', {
  slots: ['root', 'trigger', 'content'] as const,
  base: {
    root: { display: 'grid' },
    trigger: { cursor: 'pointer' },
  },
  variants: {
    size: {
      sm: {
        trigger: { fontSize: '12px' },
        content: { padding: '8px' },
      },
      lg: {
        trigger: { fontSize: '16px' },
        content: { padding: '12px' },
      },
    },
  },
  defaultVariants: { size: 'sm' },
});

const c = tabs();
c.root; // class string for the root element
c.trigger;
c.content;
```

## Data and ARIA selectors

```ts
const accordionTrigger = styles.component('accordion-trigger', {
  base: {
    '&[data-state="open"]': { fontWeight: 600 },
    '&[aria-expanded="true"]': { color: '#1d4ed8' },
  },
});
```

## Migration quick-start

### From CVA

CVA config maps directly:

- `cva(base, { variants, compoundVariants, defaultVariants })`
- to `styles.component(name, { base, variants, compoundVariants, defaultVariants })`

The main difference is class generation/injection is handled by typestyles.

See the [Migration Guide](/docs/migration) for library-specific examples.

## Related docs

- [Styles](/docs/styles)
- [Migration Guide](/docs/migration)
- [Custom Selectors & At-Rules](/docs/custom-at-rules)
