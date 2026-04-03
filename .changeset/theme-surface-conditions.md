---
'typestyles': minor
---

**Breaking:** `tokens.createTheme` now takes a config object with `base`, and either `modes` or `colorMode` (presets). Namespace overrides must live under `base` (for example `{ base: { color: { … } } }`). It returns a **`ThemeSurface`** (`className`, `name`, string coercion) instead of a plain class string—use `surface.className` or `` `${surface}` `` where a string is required.

Adds **`tokens.when`** (media, `prefersDark` / `prefersLight`, attribute/class scope, `selector` escape hatch, `and` / `or` / **`not`**) and **`tokens.colorMode`** presets (`mediaOnly`, `attributeOnly`, `mediaOrAttribute`, `systemWithLightDarkOverride`), plus **`tokens.createDarkMode`** as a shorthand for media-only dark overrides.

Theme rules use stable dedupe keys (`theme:{name}:base`, `theme:{name}:mode:{id}:branch:{n}`). In development, empty mode overrides and dubious `when.selector` / `when.not` shapes log warnings.

**Types:** `ThemeOverrides` allows deep partial nested token maps; new exports include `ThemeConditionNot` and `DeepPartialTokenValues`.
