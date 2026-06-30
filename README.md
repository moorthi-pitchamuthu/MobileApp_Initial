# MobileApp — Starter Template

A clean, generic **base/starter** mobile app: same structure and flow as a production app,
but with **empty screens and no business logic**. Use it to start new apps fast — just drop
real logic into a ready-made scaffold.

**Stack:** Angular 17 (standalone) · Capacitor 5 · AngularFire (Firestore + Auth) ·
ngx-translate · SCSS design tokens.

## What's included
- 🔐 Auth flow placeholder (login / register) with a **demo role selector** — runs with no backend
- 👥 Three role areas: **admin / customer / employee** (separate guards, dashboards, menus, profiles)
- 🧱 Base infrastructure: **splash, server-down wall, force-update wall, offline overlay,
  global toast, global loader**
- 🎨 **Dynamic theming** from a single file (`src/theme/_tokens.scss`) — see [docs/THEMING.md](docs/THEMING.md)
- 🌐 i18n (English + Tamil sample) via ngx-translate
- 🔥 Firebase wired with **placeholder config** — paste your project and go
- 🗂️ Generic Firestore CRUD service + centralized collection names + mock schema docs
- 📁 Clean, scalable folder structure (constants, models, guards, interceptors, services, shared)

## Quick start
```bash
npm install
npm start          # dev server at http://localhost:4200
```
On the login screen pick a **demo role** and sign in (any email/password) to preview that
role's flow. No backend required.

## Build
```bash
npm run build          # production build → dist/mobile-app-starter
```

## Connect Firebase (when ready)
1. Create a Firebase project; enable **Authentication** (Email/Password) and **Firestore**.
2. Paste your web config into `src/environments/environment.ts` (and `environment.prod.ts`).
3. In `src/app/core/services/auth.service.ts`, swap the demo `login()` body for the real
   Firebase block (the code is there, commented, with a `loadProfile` helper stub).

## Make it a native Android app (when ready)
```bash
npm run cap:add:android   # generates the android/ project (excluded from this starter)
npm run build:apk         # production build + cap sync
npm run cap:open          # open in Android Studio
```

## Docs
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — folder map, app flow, where to add logic
- [docs/THEMING.md](docs/THEMING.md) — change colors/fonts/spacing from one place
- [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) — mock Firestore collections & fields

## Project layout
```
src/
  theme/            ← design tokens (single source of truth for styling)
  environments/     ← firebase config + feature flags (placeholders)
  assets/i18n/      ← en.json, ta.json
  app/
    core/           ← constants, models, guards, interceptors, services
    shared/         ← reusable components (header, nav, walls, overlays, toast…)
    auth/           ← login, register
    admin/ customer/ employee/   ← role areas (home/dashboard, menu, profile)
```

> This is a starter, not a finished product. Screens are intentionally empty and marked
> with `// TODO:` where real logic belongs.
