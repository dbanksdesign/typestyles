---
'@typestyles/props': minor
'typestyles': minor
---

Fix lint errors and TypeScript issues

- Replace `any` types with `unknown` in type definitions
- Fix empty object types `{}` in defineProperties
- Add proper generic type parameters to functions
- Prefix unused parameters with underscore
- Add eslint ignores for generated docs files and scripts
- Fix test assertions to use proper types
