# Mock Database Schema (Firestore)

This is a **starter reference only** — example collections and fields to guide future
development. None of this is real production data. Collection names are centralized in
[`src/app/core/constants/firestore-collections.ts`](../src/app/core/constants/firestore-collections.ts).

> Firestore is schemaless; the "fields" below are the shape your code expects, not an
> enforced schema. Add/rename freely as your app grows.

---

## `users`
One document per authenticated user, keyed by Firebase Auth `uid`.

| Field | Type | Notes |
|-------|------|-------|
| uid | string | = document id |
| email | string | |
| full_name | string | |
| user_type | `'admin' \| 'customer' \| 'employee'` | drives routing + guards |
| is_active | boolean | false = access paused |
| phone | string? | optional |
| photoUrl | string? | optional |
| createdAt | timestamp | |

## `app_config`  (document id: `settings`)
Drives the server-down and force-update walls. Read by `AppConfigService`.

| Field | Type | Notes |
|-------|------|-------|
| maintenanceMode | boolean | true → show server-down wall |
| maintenanceMessage | string | shown on the wall |
| maintenanceEta | string | e.g. "Back by 6 PM" |
| minRequiredVersion | string | e.g. "1.2.0" — force update if app version is lower |
| updateMessage | string | shown on the update wall |
| updateUrl | string | store link |

## `build_management`
History of released builds (for an admin build/version screen).

| Field | Type | Notes |
|-------|------|-------|
| version | string | "1.0.0" |
| buildNumber | number | |
| channel | `'production' \| 'beta' \| 'dev'` | |
| releaseNotes | string | |
| releasedAt | timestamp | |
| isMandatory | boolean | forces update when true |

## `force_update`
Optional per-platform force-update rules (alternative to fields on `app_config`).

| Field | Type | Notes |
|-------|------|-------|
| platform | `'android' \| 'ios' \| 'web'` | |
| minVersion | string | |
| storeUrl | string | |
| message | string | |

## `server_status`
Health/maintenance state (alternative to `app_config.maintenanceMode`).

| Field | Type | Notes |
|-------|------|-------|
| status | `'up' \| 'down' \| 'maintenance'` | |
| message | string | |
| updatedAt | timestamp | |

## `menu_items`
Optional backend-driven menu (so menus can change without an app release).

| Field | Type | Notes |
|-------|------|-------|
| label | string | |
| icon | string | emoji or icon class |
| route | string | app route path |
| roles | string[] | which user_types see it |
| order | number | sort order |
| enabled | boolean | |

## `roles`
Optional role → permission mapping for finer-grained access control.

| Field | Type | Notes |
|-------|------|-------|
| name | string | "admin" |
| permissions | string[] | e.g. ["users.read","users.write"] |

## `notifications`
In-app / push notifications.

| Field | Type | Notes |
|-------|------|-------|
| title | string | |
| message | string | |
| type | string | info / alert / promo |
| recipientIds | string[] | target uids (empty = broadcast) |
| targetRole | string? | or target by role |
| isRead | boolean | |
| createdAt | timestamp | |

---

### How to add a new collection
1. Add its name to `firestore-collections.ts`.
2. Add an interface under `src/app/core/models/`.
3. Use `FirebaseService` (`add`/`list`/`getById`/`update`/`remove`) — no need to import
   Firestore directly in your feature code.
