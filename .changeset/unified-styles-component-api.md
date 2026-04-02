---
"typestyles": major
---

# Unified API: `styles.component`

`styles.component` is now the single API for all component styling. `styles.create` has been removed.

## What changed

### `styles.create` → `styles.component`

`styles.component` absorbs all behavior previously split across `styles.create` and the old `styles.component`. It detects flat vs dimensioned variants automatically.

**Flat variants** (no `variants:` key) — boolean toggles:

```ts
// Before
const card = styles.create('card', {
  base: { padding: '16px' },
  elevated: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
});
card('base', 'elevated'); // "card-base card-elevated"

// After
const card = styles.component('card', {
  base: { padding: '16px' },
  elevated: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
});
card()                    // "card"              ← base always auto-applied
card({ elevated: true })  // "card card-elevated"
const { base, elevated } = card; // destructure individual class strings
```

**Dimensioned variants** (with `variants:` key) — CVA style:

```ts
// Before
const button = styles.component('button', {
  base: { padding: '8px 16px' },
  variants: { intent: { primary: {...}, ghost: {...} } },
  defaultVariants: { intent: 'primary' },
});
button({ intent: 'ghost' }); // "button-base button-intent-ghost"

// After
const button = styles.component('button', {
  base: { padding: '8px 16px' },
  variants: { intent: { primary: {...}, ghost: {...} } },
  defaultVariants: { intent: 'primary' },
});
button({ intent: 'ghost' }); // "button button-intent-ghost" ← base = namespace
const { base, primary, ghost } = button; // destructure variant class strings
```

### Base class naming change

The base class is now the namespace itself (not `{namespace}-base`):

```
// Before: button-base
// After:  button
```

### `styles.withUtils` API change

The `create` method on the `withUtils` result has been renamed to `component`:

```ts
// Before
const u = styles.withUtils({ ... });
u.create('card', { base: {...} });

// After
const u = styles.withUtils({ ... });
u.component('card', { base: {...} });
```

## Migration

Replace all `styles.create(` with `styles.component(`. Then update call sites:

```ts
// Old varargs call
foo('variantName')           → foo.variantName
foo('base', 'variantName')   → foo({ variantName: true })
cx(foo('a'), foo('b'))       → cx(foo.a, foo.b)

// Old 3-arg form
styles.create('name', baseCSS, { v1: {...} })
→ styles.component('name', { base: baseCSS, v1: {...} })
```

## What stays

- `styles.class` — single standalone classes
- `styles.hashClass` — hashed escape hatch
- `styles.compose` — compose callables
- `styles.withUtils` — utility API (renamed `create` → `component`)
- `styles.component` with `slots:` — slot component API unchanged
