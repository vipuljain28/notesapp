# Contact manager

Contact Manager is a React 18 and TypeScript single-page application built with Vite. It loads contacts from JSONPlaceholder, keeps contact state in Redux, and stores cart state in browser `localStorage`.

## Run locally

Use Node.js 22 and npm. From the repository root:

```sh
npm ci
npm run dev
```

Open the address printed by Vite, normally `http://localhost:5173`.

## Verify changes

```sh
npm run type-check
npm run lint
npm run test:run
npm run build
npm run performance:check
```

`npm run test:coverage` creates HTML, text, JSON, and LCOV coverage reports. The development server reads `VITE_API_URL` from the Vite environment. See [.env.example](./.env.example) for the required variable name.

## Project documentation

- [Documentation index](./docs/README.md)
- [Local development](./docs/development/local-workflows.md)
- [Architecture overview](./docs/architecture/repository-overview.md)
- [Contact API contract](./docs/api/contact-api.md)
- [Component library](./docs/components.md)
- [Build and deployment](./docs/operations/build-and-deployment.md)
- [Client-side data model](./docs/data-model/model.md)
- [Performance budgets](./docs/operations/performance.md)

The app uses the public JSONPlaceholder demo API. Its write endpoints return simulated responses and do not provide durable contact storage.
