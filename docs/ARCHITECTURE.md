# Architecture

A generic **Angular 17 (standalone) + Capacitor 5 + AngularFire (Firestore/Auth) +
ngx-translate** mobile starter. Empty screens, reusable structure — drop business logic in.

## App flow

```
Splash (app.component)
      │  AppConfigService.checkStatus()
      ├─ maintenanceMode ──────────► Server-Down wall
      ├─ app < minRequiredVersion ─► Force-Update wall
      └─ otherwise ────────────────► <router-outlet>
                                          │
                              '' → /auth/login
                                          │  AuthService.login(role)  [DEMO]
                       ┌──────────────────┼──────────────────┐
                  adminGuard         customerGuard       employeeGuard
                       │                  │                   │
                  /admin/home      /customer/dashboard   /employee/home
              (home · menu ·        (dashboard · menu ·   (home · menu ·
               app-management ·      profile)              profile)
               profile)
```

## Folder map (`src/app`)

| Path | What |
|------|------|
| `app.component.ts` | root shell: splash, server-down, update wall, offline, toast, loader, router-outlet |
| `app.config.ts` | providers: router, http (+interceptor), translate, firebase |
| `app.routes.ts` | top-level routes + lazy role areas, guarded |
| `core/constants/` | `app.constants` (version/name/keys), `routes.constants`, `firestore-collections` |
| `core/models/` | `AppUser`, `AppConfigSettings`, `MenuItem`, `ApiResponse` (+ barrel `index.ts`) |
| `core/guards/` | `auth`, `admin`, `customer`, `employee` route guards |
| `core/interceptors/` | `auth.interceptor` (pass-through placeholder) |
| `core/services/` | `auth`, `app-config`, `firebase` (generic CRUD), `alert`, `loading`, `network`, `language`, `theme` |
| `shared/components/` | `header`, `bottom-nav`, `alert-toast`, `loading-overlay`, `offline-overlay`, `server-down`, `update-wall`, `empty-state` |
| `auth/` | `login`, `register` |
| `admin/` | `home`, `menu`, `app-management`, `profile` (+ `admin-nav.ts`) |
| `customer/` | `dashboard`, `menu`, `profile` (+ `customer-nav.ts`) |
| `employee/` | `home`, `menu`, `profile` (+ `employee-nav.ts`) |

## Where to add real logic

| Need | Add it here |
|------|-------------|
| Real login | `core/services/auth.service.ts` — uncomment the Firebase block, fill `loadProfile` |
| Read/write data | call `FirebaseService` (`core/services/firebase.service.ts`) from a feature service |
| New screen | create a component + add a route in the role's `*.routes.ts` |
| New collection | add to `firestore-collections.ts` + a model in `core/models/` (see DATABASE_SCHEMA.md) |
| New nav tab | edit the role's `*-nav.ts` array |
| App config / force update | backend doc `app_config/settings`; admin UI at `admin/app-management` |
| Restyle | `src/theme/_tokens.scss` (see THEMING.md) |

## Conventions
- **Standalone components only** (no NgModules). Lazy-load screens via `loadComponent`.
- **Signals** for reactive state in services (`AuthService.currentUser`, `LoadingService.isLoading`, …).
- **No hardcoded values** in component styles — use token-backed classes/`var(--token)`.
- **Placeholders** are marked with `// TODO:` comments showing where real logic goes.

## Build / run
See the root [README](../README.md).
