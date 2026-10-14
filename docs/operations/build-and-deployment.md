# Build and deployment

The repository produces a static Vite build and a Docker image served by Nginx. [`Dockerfile`](../../Dockerfile), [`nginx.conf`](../../nginx.conf), and [`docker-compose.yml`](../../docker-compose.yml) define the local container path. The GitHub Actions workflow validates changes and uploads the `dist/` build artifact; it does not publish an image or deploy to a hosted environment.

## Build

```sh
npm ci
npm run type-check
npm run lint
npm run test:run
npm run build
npm run performance:check
```

Vite writes the static application to `dist/` with content-hashed assets. The build reads `VITE_API_URL` at build time. Keep credentials out of Vite variables because values included in a browser build are public.

## Run the container locally

```sh
docker compose up --build
```

The application is served at `http://localhost:8080`. Nginx falls back to `index.html` for client-side paths and returns `200` from `/health`. The image uses a Node.js build stage and an Nginx runtime stage.

## CI behavior

On pushes to `main` or `develop` and on pull requests, [the CI workflow](../../.github/workflows/ci.yml) installs the lockfile dependencies, runs type checking, lint, tests, build, and the bundle budget check, then uploads `dist/` as an artifact.

## Deployment boundary

No registry, hosting provider, deployment target, production domain, or environment credentials are configured in this repository. Production publishing and rollback cannot be verified here. A deployment workflow requires the project owner to select and configure those external resources.
