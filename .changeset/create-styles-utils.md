---
'typestyles': minor
---

Add **`createStyles({ utils })`** (and **`createTypeStyles({ utils })`**) so shorthand style expanders attach to one styles instance without a separate `withUtils` object. **`styles.withUtils`** remains on the default export; there is no global **`registerUtils`**.
