---
title: Getting Started
description: Install and use typestyles in your project
---

# Getting Started

typestyles is **CSS-in-TypeScript** that embraces CSS instead of hiding from it. You define styles and tokens in TypeScript and get predictable, scoped class names and design tokens as CSS custom properties.

## Installation

```bash
pnpm add typestyles
# or
npm install typestyles
```

## Basic usage

Create styles with `styles.component()` and apply them with the returned selector function:

```ts
import { styles } from 'typestyles';

const button = styles.component('button', {
  base: { padding: '8px 16px', borderRadius: '6px' },
  primary: { backgroundColor: '#0066ff', color: '#fff' },
});

// In your component: className={button({ primary: true })}
// Or destructure: const { base, primary } = button
```

## Which API should I use?

| You want to...                                                                        | Use                | Why                                                                          |
| ------------------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| Create component styles (flat variants or dimensioned variants)                       | `styles.component` | Unified API: flat variants, `variants`, `compoundVariants`, `defaultVariants`, destructuring |
| Make one standalone class from one style object                                       | `styles.class`     | Best for one-off reusable classes                                            |
| Compose multiple callables/classes together                                           | `styles.compose`   | Reuse and merge style groups cleanly                                         |

Quick rule of thumb:

- Use `styles.component` for all component styles — both flat and dimensioned variants.
- Use `styles.class` for single utility-like classes.

See also:

- [Components](/docs/components)
- [Styles](/docs/styles)
- [Class naming](/docs/class-naming) — semantic vs hashed output for `styles.component`
- [Migration Guide](/docs/migration)

Create design tokens with `tokens.create()` and use them in styles:

```ts
import { tokens } from 'typestyles';

const color = tokens.create('color', {
  primary: '#0066ff',
});

// Use in styles: backgroundColor: color.primary
// Renders as: var(--color-primary)
```

You stay in control of the CSS; typestyles just generates the class names and custom properties.
