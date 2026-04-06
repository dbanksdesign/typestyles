---
'typestyles': minor
---

Infer multipart **`slots`** from the array literal passed to **`styles.component`** (and **`createComponent`**) using a `const` type parameter on `Slots extends readonly string[]`. Slot names are typed as `Slots[number]`, so destructuring and `()` return **`Record<…>`** with known keys and errors on unknown properties—**without `as const` on `slots`** when the array is written inline.

**Type-only:** `MultiSlotConfig`, `MultiSlotReturn`, `SlotComponentConfig`, `SlotComponentFunction`, and related inputs now take a **readonly string tuple** type parameter (the `slots` array) instead of a single string union `S`. Call-site inference is unchanged for typical object literals; advanced `extends` / explicit generics may need a small adjustment.

Docs and the design-system example drop redundant `as const` on `slots` where inference applies.
