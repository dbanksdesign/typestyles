# @typestyles/props

## 0.1.0

### Initial Release

Type-safe atomic CSS utility generator for typestyles.

**Features:**

- `defineProperties()` - Define CSS properties with allowed values and responsive conditions
- `createProps()` - Generate atomic utility classes with full TypeScript inference
- Responsive/conditional styling via media queries, container queries, and custom selectors
- Shorthand property support (e.g., `padding` expanding to `paddingTop`, `paddingRight`, etc.)
- Automatic CSS injection with SSR support via `getRegisteredCss()`
- Full type safety with autocomplete for properties, values, and conditions

**Example:**

```typescript
import { defineProperties, createProps } from '@typestyles/props';

const responsiveProps = defineProperties({
  conditions: {
    mobile: { '@media': '(min-width: 768px)' },
    desktop: { '@media': '(min-width: 1024px)' },
  },
  properties: {
    display: ['flex', 'block', 'grid', 'none'],
    padding: { 0: '0', 1: '4px', 2: '8px', 3: '16px' },
  },
  shorthands: {
    p: ['padding'],
  },
});

const props = createProps('atoms', responsiveProps);

// Type-safe usage with full autocomplete
props({
  display: 'flex',
  padding: 2,
  p: { mobile: 3, desktop: 4 },
});
```
