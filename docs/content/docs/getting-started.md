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

Create styles with `styles.create()` and apply them with the returned selector function:

```ts
import { styles } from 'typestyles';

const button = styles.create('button', {
  base: { padding: '8px 16px', borderRadius: '6px' },
  primary: { backgroundColor: '#0066ff', color: '#fff' },
});

// In your component: className={button('base', 'primary')}
```

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
