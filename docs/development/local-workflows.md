# Local development

The repository runs a Vite development server, a TypeScript check, ESLint, and Vitest. These commands are defined in [`package.json`](../../package.json); Vitest setup and MSW handlers live under [`src/tests`](../../src/tests) and [`src/mocks`](../../src/mocks).

## Prerequisites

- Node.js 22
- npm

## Install and run

```sh
npm ci
Copy-Item .env.example .env.development
npm run dev
```

Vite serves the app on `http://localhost:5173`. Set `VITE_API_URL` in the development environment file to change the API base URL. The default value is the JSONPlaceholder demo API.

## Check changes

| Command | Result |
|---|---|
| `npm run type-check` | Checks application and test TypeScript without emitting files. |
| `npm run lint` | Runs ESLint against `src`. |
| `npm run test:run` | Runs the Vitest suite once. |
| `npm run test` | Starts Vitest in its default interactive mode. |
| `npm run test:coverage` | Runs Vitest with V8 coverage reports. |
| `npm run build` | Type-checks and builds static production assets in `dist/`. |
| `npm run preview` | Serves the production build locally. |
| `npm run performance:check` | Checks built JavaScript and CSS gzip sizes against budgets. Run it after `npm run build`. |

MSW intercepts requests in tests. The application uses the external JSONPlaceholder service in development; its simulated write endpoints do not persist changes.
