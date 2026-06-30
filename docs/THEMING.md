# Theming Guide

The app is **fully dynamic**: change styling from one place and it updates everywhere.

## The single source of truth

➡️ **[`src/theme/_tokens.scss`](../src/theme/_tokens.scss)**

Every color, font, spacing value, radius, and shadow is declared there as a CSS custom
property inside `:root`. Everything else in the app (component classes, utilities, screens)
references those tokens via `var(--token)`. **There are no hardcoded hex values in
component styles.**

### Change the whole app's primary color
Edit one line in `_tokens.scss`:
```scss
--primary: #4f46e5;   /* ← change this */
```
Buttons, links, active tabs, the splash gradient, the update wall, focus rings, FAB, etc.
all update automatically.

### Change fonts
```scss
--font-family: 'Inter', -apple-system, sans-serif;   /* swap the family */
--fs-md: 14px;                                        /* base text size */
```
Also update the Google Fonts `<link>` in [`src/index.html`](../src/index.html) if you pick a
different font.

### Change spacing / radius / shadows
All scales live in `_tokens.scss`:
```scss
--space-4: 16px;   --r-md: 14px;   --shadow-sm: 0 2px 8px rgba(0,0,0,.08);
```

## Per-role accent (one class swap)
Each role area sets a theme class on its `.page-wrapper`:
`admin-theme`, `customer-theme`, or `employee-theme`. Each class re-points `--primary` to
that role's accent (see the bottom of `_tokens.scss`). Change a role's color in one place:
```scss
.admin-theme { --primary: var(--admin-accent); }
:root { --admin-accent: #16a34a; }   /* ← edit the accent here */
```

## File map (`src/theme/`)
| File | Purpose |
|------|---------|
| `_tokens.scss` | **all design tokens — edit here** |
| `_base.scss` | reset + base element styles + mobile shell layout |
| `_components.scss` | reusable classes: `.btn`, `.card`, `.form-*`, `.chip`, `.kpi-*`, `.list-item`, `.tab-*`, `.menu-tile`, … |
| `_utilities.scss` | small helpers: `.text-*`, `.mt-*`, `.flex`, … |

`src/styles.scss` just `@use`s these four partials.

## Runtime theming (optional)
[`ThemeService`](../src/app/core/services/theme.service.ts) can override any token at runtime —
e.g. apply a brand color fetched from the backend or a user-chosen accent:
```ts
theme.setPrimary('#e11d48', '#be123c');   // or theme.setToken('--radius-md', '20px')
```

## Three places a brand color lives (keep in sync)
Native shells can't read CSS variables, so the brand color is duplicated in two extra spots:
1. `src/theme/_tokens.scss` → `--primary` (the web app)
2. `src/index.html` → `<meta name="theme-color">` (browser chrome)
3. `capacitor.config.ts` → SplashScreen / StatusBar colors (native splash & status bar)
