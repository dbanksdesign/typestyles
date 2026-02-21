---
'typestyles': minor
---

Add support for attribute selectors in nested styles. You can now use `[data-variant]`, `[disabled]`, `[data-size="lg"]` and other attribute selectors directly in style definitions:

```typescript
styles.create('button', {
  padding: '8px',
  '[data-variant="primary"]': { backgroundColor: 'blue' },
  '[disabled]': { opacity: 0.5 },
});
```
