# Build and deployment

The application builds as static Vite assets for GitHub Pages. [`deploy.yml`](../../.github/workflows/deploy.yml) tests and publishes builds from `main`; Docker Compose remains available for local container testing.

## Build

```sh
npm ci
npm run type-check
npm run lint
npm run test:run
npm run build
npm run performance:check
```

Vite writes the static application to `dist/` with content-hashed assets. The build reads `VITE_API_URL` and `VITE_BASE_PATH` at build time. Keep credentials out of Vite variables because browser builds expose their values.

## Run the container locally

```sh
docker compose up --build
```

The application is served at `http://localhost:8080`. Nginx falls back to `index.html` for client-side paths and returns `200` from `/health`. The image uses a Node.js build stage and an Nginx runtime stage.

## CI behavior

On pushes to `main` or `develop` and on pull requests, [the CI workflow](../../.github/workflows/ci.yml) installs the lockfile dependencies, runs type checking, lint, tests, build, and the bundle budget check, then uploads `dist/` as an artifact.

## GitHub Pages deployment

The deployment workflow builds and tests the application, then uploads `dist/` to GitHub Pages. Project sites use the repository path as Vite's base path. Repositories named `<owner>.github.io` use `/`.

Before the first deployment, enable GitHub Pages for the repository and select GitHub Actions as its publishing source. The workflow uses the `github-pages` environment and requires `pages: write` and `id-token: write` permissions. GitHub documents this setup at [custom workflows for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), accessed 2026-10-14 against repository revision `3f7f5ca`.

The workflow reads the optional `VITE_API_URL` Actions variable and defaults to JSONPlaceholder. The deployed app calls that API from the browser. JSONPlaceholder simulates writes and does not persist contact changes.

The workflow definition is present, but a successful Pages deployment has not been verified in the GitHub repository. Repository Pages settings and a deployment run are external to this checkout.
