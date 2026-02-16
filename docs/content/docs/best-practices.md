---
title: Best Practices
description: Tips for organizing and maintaining typestyles in your project
---

# Best Practices

These guidelines will help you write maintainable, scalable code with typestyles.

## Naming conventions

### Namespaces

Use kebab-case for namespaces. The namespace should describe the component or pattern:

```ts
// ✅ Good - descriptive and consistent
const button = styles.create('button', { ... });
const card = styles.create('card', { ... });
const navigationMenu = styles.create('navigation-menu', { ... });

// ❌ Avoid - generic or single-letter names
const b = styles.create('b', { ... });
const x = styles.create('x', { ... });
const component = styles.create('component', { ... });
```

### Variants

Use camelCase for variant names. Be descriptive about the style purpose, not just the visual appearance:

```ts
const button = styles.create('button', {
  // ✅ Good - describes the intent
  base: { ... },           // The foundation styles
  primary: { ... },        // The main action
  secondary: { ... },      // Alternative action
  danger: { ... },         // Destructive action
  ghost: { ... },          // Subtle action

  // Size variants
  small: { ... },
  medium: { ... },
  large: { ... },

  // State variants
  disabled: { ... },
  loading: { ... },

  // ❌ Avoid - describes appearance only
  blue: { ... },
  big: { ... },
  rounded: { ... },
});
```

### Tokens

Group tokens by category. Use consistent naming within groups:

```ts
// ✅ Good - clear categories and consistent naming
export const color = tokens.create('color', {
  // Semantic colors
  primary: '#0066ff',
  secondary: '#6b7280',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',

  // Neutral scale
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  // ...etc

  // Text colors
  text: '#111827',
  textMuted: '#6b7280',
  textInverse: '#ffffff',

  // Surface colors
  surface: '#ffffff',
  surfaceRaised: '#f9fafb',
  surfaceSunken: '#f3f4f6',
});

export const space = tokens.create('space', {
  // Scale-based
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',

  // Semantic aliases (optional)
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
});
```

## File organization

### Monorepo/Package structure

```
src/
├── tokens/
│   ├── index.ts          # Re-exports all tokens
│   ├── colors.ts         # Color definitions
│   ├── spacing.ts        # Spacing scale
│   ├── typography.ts     # Font sizes, line heights
│   ├── radii.ts          # Border radius
│   └── shadows.ts        # Box shadows
├── components/
│   ├── Button/
│   │   ├── index.ts      # Component export
│   │   ├── Button.tsx    # Component implementation
│   │   └── Button.styles.ts  # Style definitions
│   ├── Card/
│   │   ├── index.ts
│   │   ├── Card.tsx
│   │   └── Card.styles.ts
│   └── ...
├── layouts/
│   ├── Layout.styles.ts
│   └── ...
└── utils/
    └── styles.ts         # Shared utility styles
```

### Token files

Keep tokens in dedicated files, grouped by category:

```ts
// tokens/colors.ts
import { tokens } from 'typestyles';

export const color = tokens.create('color', {
  // Brand colors
  brand50: '#eff6ff',
  brand100: '#dbeafe',
  brand500: '#3b82f6',
  brand600: '#2563eb',
  brand700: '#1d4ed8',

  // Neutral scale
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  // ... etc
});

// tokens/index.ts
export { color } from './colors';
export { space } from './spacing';
export { font } from './typography';
```

### Component style files

Keep styles co-located with components or in a separate `.styles.ts` file:

**Option 1: Same file (for simple components)**

```tsx
// Button.tsx
import { styles } from 'typestyles';
import { color, space } from '../tokens';

const button = styles.create('button', {
  base: { ... },
  primary: { ... },
});

export function Button({ variant, children }) {
  return <button className={button('base', variant)}>{children}</button>;
}
```

**Option 2: Separate file (for complex components)**

```ts
// Button.styles.ts
import { styles } from 'typestyles';
import { color, space } from '../tokens';

export const button = styles.create('button', {
  base: { ... },
  primary: { ... },
  secondary: { ... },
  // ... many variants
});

// Button.tsx
import { button } from './Button.styles';

export function Button({ variant, children }) {
  return <button className={button('base', variant)}>{children}</button>;
}
```

## Token architecture

### Semantic vs. literal tokens

Use literal tokens for the design system foundation, semantic tokens for application use:

```ts
// tokens/primitives.ts
// Raw values from your design system
export const primitives = {
  colors: {
    blue500: '#0066ff',
    blue600: '#0052cc',
    gray500: '#6b7280',
    red500: '#ef4444',
  },
  space: {
    1: '4px',
    2: '8px',
    3: '16px',
    4: '24px',
  },
};

// tokens/semantic.ts
// Semantic meanings mapped to primitives
export const color = tokens.create('color', {
  primary: primitives.colors.blue500,
  primaryHover: primitives.colors.blue600,
  secondary: primitives.colors.gray500,
  danger: primitives.colors.red500,
  // ... etc
});

export const space = tokens.create('space', primitives.space);
```

### Component-specific tokens

For complex components, you can scope tokens to just that component:

```ts
// components/Calendar/Calendar.tokens.ts
import { tokens } from 'typestyles';

export const calendar = tokens.create('calendar', {
  daySize: '40px',
  headerHeight: '48px',
  gridGap: '4px',
});

// Usage in Calendar.styles.ts
import { calendar } from './Calendar.tokens';

const calendarStyles = styles.create('calendar', {
  day: {
    width: calendar.daySize,
    height: calendar.daySize,
  },
});
```

### Token composition

Reference other tokens when defining new ones:

```ts
const space = tokens.create('space', {
  1: '4px',
  2: '8px',
  3: '16px',
  4: '24px',
  5: '32px',
});

const size = tokens.create('size', {
  // Reference space tokens for consistency
  sm: space[1], // 4px
  md: space[2], // 8px
  lg: space[3], // 16px
  icon: space[4], // 24px
});
```

## Component patterns

### Compound components

For related components (like Form + Input + Label), use consistent namespacing:

```ts
const form = styles.create('form', {
  root: { ... },
  field: { ... },
});

const input = styles.create('input', {
  base: { ... },
  error: { ... },
});

const label = styles.create('label', {
  base: { ... },
  required: { ... },
});

// Usage
<form className={form('root')}>
  <div className={form('field')}>
    <label className={label('base', 'required')}>Name</label>
    <input className={input('base', error && 'error')} />
  </div>
</form>
```

### Variant composition

Compose variants from base to specific:

```ts
const button = styles.create('button', {
  // Base styles every button has
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 500,
    transition: 'all 150ms ease',
  },

  // Visual variants
  primary: { backgroundColor: color.primary, color: '#fff' },
  secondary: { backgroundColor: color.secondary, color: '#fff' },
  ghost: { backgroundColor: 'transparent' },

  // Size variants
  small: { padding: '4px 8px', fontSize: '12px' },
  medium: { padding: '8px 16px', fontSize: '14px' },
  large: { padding: '12px 24px', fontSize: '16px' },

  // State variants
  disabled: { opacity: 0.5, cursor: 'not-allowed' },
  loading: { cursor: 'wait' },
});

// Usage
button('base', 'primary', 'medium'); // Primary medium button
button('base', 'primary', 'medium', 'disabled'); // Disabled primary medium
button('base', 'ghost', 'small'); // Small ghost button
```

### Layout components

Use layout components with flexible spacing:

```ts
const stack = styles.create('stack', {
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
  // Spacing variants
  gap1: { gap: space[1] },
  gap2: { gap: space[2] },
  gap3: { gap: space[3] },
  gap4: { gap: space[4] },
});

const row = styles.create('row', {
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  gap1: { gap: space[1] },
  gap2: { gap: space[2] },
  // ... etc
});
```

## State management

### Boolean variants

For simple on/off states:

```ts
const card = styles.create('card', {
  base: { ... },
  elevated: {
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  interactive: {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 8px 12px rgba(0,0,0,0.15)',
    },
  },
});

// Usage
card('base', isElevated && 'elevated', isInteractive && 'interactive');
```

### Complex state

For more complex state combinations, consider using a helper:

```ts
function getButtonClasses({ variant, size, isDisabled, isLoading }: ButtonProps) {
  return button(
    'base',
    variant, // 'primary' | 'secondary' | 'ghost'
    size, // 'small' | 'medium' | 'large'
    isDisabled && 'disabled',
    isLoading && 'loading',
  );
}
```

## Theming patterns

### Dark mode with createTheme

```ts
// tokens/index.ts
export const color = tokens.create('color', {
  text: '#111827',
  textMuted: '#6b7280',
  surface: '#ffffff',
  surfaceRaised: '#f9fafb',
});

export const darkTheme = tokens.createTheme('dark', {
  color: {
    text: '#e0e0e0',
    textMuted: '#9ca3af',
    surface: '#1a1a2e',
    surfaceRaised: '#25253e',
  },
});

// Apply theme to document body or specific container
document.body.classList.add(darkTheme);
```

### Multiple themes

```ts
const brandLight = tokens.createTheme('brand-light', { ... });
const brandDark = tokens.createTheme('brand-dark', { ... });
const highContrast = tokens.createTheme('high-contrast', { ... });
```

## Code style

### Consistent formatting

```ts
// ✅ Good - consistent structure
const card = styles.create('card', {
  base: {
    padding: space[4],
    borderRadius: '8px',
    backgroundColor: color.surface,
  },

  elevated: {
    boxShadow: shadow.md,
  },

  interactive: {
    cursor: 'pointer',
    transition: 'box-shadow 200ms ease',
    '&:hover': {
      boxShadow: shadow.lg,
    },
  },
});

// ❌ Avoid - inconsistent formatting
const card = styles.create('card', {
  base: { padding: space[4], borderRadius: '8px', backgroundColor: color.surface },
  elevated: { boxShadow: shadow.md },
});
```

### Import organization

```ts
// 1. External imports
import React from 'react';
import { styles, tokens } from 'typestyles';

// 2. Internal absolute imports
import { color, space } from '@/tokens';
import { Button } from '@/components';

// 3. Internal relative imports
import { card } from './Card.styles';
import { useCardState } from './useCardState';
```

## Performance tips

1. **Define styles at module level** - Never create styles inside components
2. **Reuse token references** - Define once, import many times
3. **Minimize variants** - Don't create a variant for every possible state
4. **Use inline styles for dynamic values** - Don't create styles for frequently changing values
5. **Lazy load component styles** - Use dynamic imports for code splitting

## Common mistakes to avoid

### ❌ Creating styles inside components

```tsx
// Bad - creates new styles on every render
function Button({ children }) {
  const button = styles.create('button', { base: { ... } }); // ❌
  return <button className={button('base')}>{children}</button>;
}

// Good - define at module level
const button = styles.create('button', { base: { ... } });

function Button({ children }) {
  return <button className={button('base')}>{children}</button>;
}
```

### ❌ Dynamic style values

```tsx
// Bad - creates styles for every possible value
const button = styles.create('button', {
  base: { width: props.width }, // ❌ Don't do this
});

// Good - use inline styles for dynamic values
const button = styles.create('button', {
  base: { display: 'inline-block' },
});

function Button({ width, children }) {
  return (
    <button
      className={button('base')}
      style={{ width }} // ✅ Dynamic value here
    >
      {children}
    </button>
  );
}
```

### ❌ Duplicate namespaces

```ts
// File A
const button = styles.create('button', { ... });

// File B
const button = styles.create('button', { ... }); // ❌ Collision!

// Good - use descriptive names
const iconButton = styles.create('icon-button', { ... });
const textButton = styles.create('text-button', { ... });
```

## Summary

- Use descriptive, consistent naming for namespaces and variants
- Organize tokens by category in dedicated files
- Define styles at module level, never in components
- Use semantic tokens for application code
- Keep variants focused on style purpose, not appearance
- Use inline styles for truly dynamic values
- Use the Vite plugin to catch duplicate namespaces
