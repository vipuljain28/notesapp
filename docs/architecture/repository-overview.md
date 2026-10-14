# Repository overview

The repository builds one client-side React application. [`src/main.tsx`](../../src/main.tsx) mounts the app and Redux store, [`src/App.tsx`](../../src/App.tsx) composes the contact and cart views, and [`vite.config.ts`](../../vite.config.ts) configures the build.

## Runtime areas

| Area | Responsibility |
|---|---|
| `src/components/Common` | Reusable form controls, buttons, cards, alerts, loading, and modal primitives. |
| `src/components/Contact` | Contact list, contact card, and contact creation form. |
| `src/components/Shopping` | Cart entry and saved-cart summary. |
| `src/store` | Redux Toolkit state for contacts, cart, forms, and shared UI state. |
| `src/services` | Fetch-based API client, contact service, and cart persistence. |
| `src/hooks` | React hooks that expose contact loading and refresh behavior. |
| `src/mocks` | MSW handlers used by tests. |
| `src/tests` | Vitest setup. Tests are colocated with source modules. |

## Data flow

The contact view dispatches the contact thunk through `useContacts`. The thunk calls `contactService`, which uses the shared API client; successful results enter the contacts slice and remain cached for five minutes. A manual refresh bypasses the cache.

Cart actions update the cart slice. A store subscription writes the current cart to `localStorage`; startup restores and validates saved items before rendering.

## External boundaries

The application calls JSONPlaceholder from the browser. Its write operations are demo responses, not persistent storage. There is no application-owned API server, database, hosting configuration, or production deployment target in the repository.
