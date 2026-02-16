---
title: API Reference
description: Complete API reference for typestyles
---

# API Reference

Auto-generated documentation for all typestyles APIs.

## Core Exports

### `styles`

Style creation API.

**Methods:**

- `styles.create(namespace, definitions)`: Style creation API


### `tokens`

Design token API using CSS custom properties.

**Methods:**

- `tokens.create(namespace, values)`: Creates CSS custom properties
- `tokens.use(namespace)`: References existing tokens
- `tokens.createTheme(name, overrides)`: Creates theme class

### `keyframes`

Keyframe animation API.

**Methods:**

- `keyframes.create(name, stops)`: Creates @keyframes animation

## Usage Examples

### Creating Styles

```ts
import { styles } from 'typestyles';

const button = styles.create('button', {
  base: { padding: '8px 16px' },
  primary: { backgroundColor: '#0066ff' },
});

button('base', 'primary'); // "button-base button-primary"
```

### Creating Tokens

```ts
import { tokens } from 'typestyles';

const color = tokens.create('color', {
  primary: '#0066ff',
  secondary: '#6b7280',
});

color.primary; // "var(--color-primary)"
```

### Creating Animations

```ts
import { keyframes } from 'typestyles';

const fadeIn = keyframes.create('fadeIn', {
  from: { opacity: 0 },
  to: { opacity: 1 },
});

// Use in styles
animation: `${fadeIn} 300ms ease`
```

---

*This API reference was auto-generated from source code.*
*Last updated: 2026-02-15*
