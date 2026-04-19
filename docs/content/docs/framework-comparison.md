---
title: TypeStyles vs other styling options
description: How TypeStyles compares when you are choosing a styling layer for a React design system
---

# TypeStyles vs other styling options

Design systems rarely pick a styling tool in isolation. This page is a **decision lens** for teams comparing TypeStyles to StyleX, Emotion, Panda CSS, vanilla-extract, CSS Modules, and plain CSS.

## Summary table

| Concern                     | TypeStyles                      | StyleX                   | Emotion                      | Panda CSS                | vanilla-extract            | CSS Modules                     | Plain CSS          |
| --------------------------- | ------------------------------- | ------------------------ | ---------------------------- | ------------------------ | -------------------------- | ------------------------------- | ------------------ |
| **Authoring**               | CSS-like objects in TS          | Compiler-enforced props  | Runtime or CSS prop patterns | Recipes + codegen        | TS → static CSS files      | `.module.css` beside components | Any pipeline       |
| **Build**                   | Optional (runtime works)        | Required                 | Optional                     | Required                 | Required                   | Bundler support                 | None               |
| **Class names in DOM**      | Readable by default             | Hashed                   | Hashed                       | Utility / recipe classes | Hashed or modules          | Scoped by bundler               | Whatever you write |
| **Design tokens**           | CSS variables (`tokens.create`) | Limited / app-specific   | Manual                       | First-class codegen      | Contract files + Sprinkles | Manual / variables              | Manual             |
| **Variants / recipes**      | `styles.component`              | `stylex.create` variants | Patterns vary                | `cva` / recipes          | Sprinkles + variants       | Manual BEM / modifiers          | Manual             |
| **Coexist with legacy CSS** | Strong (same vars & selectors)  | Moderate                 | Moderate                     | Moderate                 | Good                       | Excellent                       | N/A                |
| **Zero-runtime path**       | Vite / Rollup / Next plugins    | Compiler                 | Extractors / none            | Build output             | Always                     | Always                          | Always             |
| **SSR story**               | `collectStyles` + extraction    | Compiler                 | Streaming / cache            | Build + runtime mix      | CSS file                   | Link CSS                        | Link CSS           |

## When TypeStyles is a strong default

- You want **human-readable classes** and **first-class CSS custom properties** so design tokens work in DevTools, legacy sheets, and third-party markup.
- You want **typed component variants** (CVA-style) without committing to a particular compiler or PostCSS pipeline on day one.
- You need **incremental adoption** (one surface at a time) and optional **scoped instances** (`createTypeStyles`, `scopeId`) for libraries or micro-frontends.
- You are willing to use **runtime injection in development** and turn on **build extraction** for production when you are ready.

## When another tool might win

- **StyleX** — You have already standardized on Meta’s compiler, want maximum static guarantees, and accept hashed classes and stricter authoring rules.
- **Emotion / styled-components** — You prioritize the classic “component = styled function” API and accept runtime cost or a separate extraction setup.
- **Panda CSS** — You want codegen utilities, strict design-token schemas, and a Panda config as the source of truth; you accept build-time codegen as non-negotiable.
- **vanilla-extract** — You want **all** styles in static files with zero runtime by default and are comfortable with file-based contracts and build configuration.
- **CSS Modules** — Your system is mostly global tokens + small scoped files; you do not need a variant API in the styling layer.
- **Plain CSS** — Maximum portability and zero JS styling layer; you trade away colocated typing and variant ergonomics (or layer a small helper on top).

## Practical migration

If you are coming from another stack, start with the [Migration guide](/docs/migration). Panda and CVA-like APIs map closely to `styles.component`; Emotion and CSS Modules map well to `styles.class` plus `cx()`.

## Related docs

- [Getting started](/docs/getting-started) — install and core APIs
- [Design system with tokens](/docs/design-system) — token layers and governance
- [Cascade layers](/docs/cascade-layers) — `createTypeStyles` and `@layer`
- [Zero-runtime extraction](/docs/zero-runtime) — production CSS files
- [Component library setup](/docs/component-library) — publishing packages
