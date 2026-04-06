---
'typestyles': minor
---

Add `fileScopeId(import.meta)` for per-file `scopeId` so the same logical class or component name in different modules does not collide. In development, registering the same `styles.class` or `styles.component` name twice under one scope throws (with guidance to use `scopeId` / `fileScopeId`); production behavior is unchanged. In development, unknown variant dimensions, invalid option values, and unknown flat variant keys emit `console.error`. `createComponent` and `styles.component` overloads use `const` type parameters for sharper literal inference.
