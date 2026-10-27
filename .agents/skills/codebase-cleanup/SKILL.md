---
name: codebase-cleanup
description: Systematically detect, audit, and safely remove dead code, unused files, stale exports, orphaned components, and unreferenced npm dependencies with zero regressions.
---

# Codebase & Dead Code Cleanup Skill

This skill provides an automated, evidence-based methodology to audit, verify, and prune dead code, unused exports, orphaned files, and bloated dependencies from JavaScript, TypeScript, and modern web applications (Next.js, React, Node.js).

## Core Philosophy
Dead code removal must follow: **Evidence First, Zero Assumptions, Incremental Verification**.
Never delete code based solely on speculation or without checking dynamic references and testing the build.

---

## 1. Safety Guardrails (DO NOT DELETE)
Before pruning any file or export, verify it does NOT belong to these categories:
- **Framework Entry Points & Routes**:
  - `app/**/page.tsx`, `app/**/layout.tsx`, `app/**/route.ts`, `app/**/loading.tsx`, `app/**/not-found.tsx`
  - `app/sitemap.ts`, `app/robots.ts`, `app/icon.tsx`
  - `pages/**/*.tsx`
- **Configuration & Build Manifests**:
  - `next.config.*`, `tailwind.config.*`, `postcss.config.*`, `eslint.config.*`, `tsconfig.json`
- **Script Entrypoints**:
  - Scripts invoked in `package.json` (`scripts/*` run during prebuild, build, or test).
- **Public Assets & Metadata**:
  - Static files in `public/` referenced via public URLs or SEO schema.
- **Dynamic or Implicit Consumers**:
  - Symbols referenced via string indexing (`window[name]`, event listeners, or CMS fields).

---

## 2. Multi-Pass Audit Process

### Pass 1: Unused Dependency & File Audit (`knip`)
Run Knip to detect unused files, dependencies, and exports:
```bash
npx --yes knip
```
Knip flags:
- Unused files (`Unused files`)
- Unused dependencies (`Unused dependencies` / `Unused devDependencies`)
- Unused exports (`Unused exports` / `Unused exported types`)

### Pass 2: Compiler-Level Dead Code Check
Run TypeScript in strict check mode for unused local variables and parameters:
```bash
npx tsc --noEmit --noUnusedLocals --noUnusedParameters
```

### Pass 3: Orphaned Component & File Verification
For every candidate file flagged:
1. Search the entire codebase for references to the file's base name (without extension) and relative path:
   ```powershell
   Get-ChildItem -Recurse -Include *.ts,*.tsx,*.js,*.jsx,*.json src | Select-String -Pattern "filename"
   ```
2. If total references are 0 and it is not a route or root config, mark as **Confirmed Orphan**.

### Pass 4: Stale Exports & Dead Types
If a component or type is exported from a file:
1. Search if any other file imports that symbol.
2. If it is only used locally within that file, remove the `export` keyword.
3. If it is never used anywhere (even locally), remove the symbol.

---

## 3. Pruning Execution Order
Execute cleanup in strict logical stages:
1. **Unused UI Components / Dead Files**:
   - Delete orphaned `.tsx`/`.ts` files that have 0 consumers.
2. **Unused Exports & Types**:
   - Strip unused exported functions, interfaces, or types.
3. **Unused Dependencies**:
   - Uninstall or remove unreferenced packages from `package.json`.
4. **Clean up Unused Provider Wrappers**:
   - If a context provider (e.g., `TooltipProvider`) wraps the app but no child components consume it, remove the provider and its imports to reduce bundle size and tree shaking overhead.

---

## 4. Verification Protocol
After every deletion stage, run verification commands:
```bash
# 1. Type Check
npx tsc --noEmit

# 2. Lint Check
npm run lint

# 3. Production Build Check
npm run build
```

If any check fails:
- Diagnose the root cause immediately.
- If the symbol was dynamically required or imported in a non-standard way, restore it and document why it is necessary.
