# CTTA Almanac Sanity Studio Migration Guide

This Studio was originally set up with Sanity Studio v2 patterns. To stay compatible with maintained Sanity releases, follow the official upgrade path from Sanity’s migration docs:

1. Migrate from **v2 to v3** first.
2. Then upgrade one major version at a time (**v3 → v4 → later**).

## What in this repo indicates v2-era setup

- `studio/sanity.json` (v2 configuration format)
- `studio/schemas/schema.js` using:
  - `part:@sanity/base/schema-creator`
  - `all:part:@sanity/base/schema-type`
- `studio/tsconfig.json` includes `@sanity/base/types` paths
- `studio/package.json` still includes legacy dependencies such as `@sanity/components` and React 16

## v2 → v3 migration checklist (project-specific)

Based on <https://www.sanity.io/docs/help/migrating-from-v2>:

1. **Remove deprecated v2 packages**
   - Remove v2-only packages if present (`@sanity/base`, `@sanity/core`, `@sanity/default-layout`, `@sanity/default-login`, `@sanity/desk-tool`).
   - In this project, remove `@sanity/components` (legacy v2 package surface).

2. **Align core dependencies for v3 migration**
   - Use `sanity@^3` while doing the migration.
   - Upgrade React dependencies to:
     - `react@^18.2.0`
     - `react-dom@^18.2.0`
   - Upgrade plugins (for example `@sanity/vision`) to a version that supports your target major.

3. **Move config from `sanity.json` to `sanity.config.(js|ts)`**
   - Replace `studio/sanity.json` with `studio/sanity.config.ts` (or `.js`).
   - Carry over:
     - `projectId: "nxypgfqb"`
     - dataset(s)
     - plugin configuration

4. **Replace v2 `part:` imports with public APIs**
   - Refactor `studio/schemas/schema.js` away from `part:@sanity/*` imports.
   - Export your schema types array and attach it in `defineConfig({ schema: { types } })`.

5. **Update/verify plugins**
   - Ensure each plugin is compatible with Studio v3 (then v4+ as you continue).

6. **Validate before moving to the next major**
   - Start the studio and run checks.
   - Fix any runtime or type issues introduced by API changes.

## Example v3-style config skeleton

```ts
// studio/sanity.config.ts
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'CTTA Almanac',
  projectId: 'nxypgfqb',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes
  }
})
```

## Moving beyond v3

The v2 migration page explicitly notes that v3 is not the latest major. After this project works on v3, continue one major at a time to stay on supported releases.

## Notes from Sanity’s migration guidance

- Content Lake data is not changed by the Studio framework migration.
- Editorial workflows should remain largely unchanged; migration mostly affects project configuration and customizations.
