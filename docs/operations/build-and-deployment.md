# Build and deployment

The repository defines Angular CLI build configurations but no CI workflow, container, hosting manifest, release procedure, or deployment target. A successful build would create static browser assets; how those assets are published and served is not defined here.

Primary sources: [Angular CLI build and serve targets](../../angular.json), [production environment](../../src/environments/environment.prod.ts), [development environment](../../src/environments/environment.ts), and [application bootstrap](../../src/main.ts).

## Build outputs

The configured output path is `dist/contact-manager-ng6`. The production configuration enables optimization, hashed output names, ahead-of-time compilation, CSS extraction, license extraction, and the build optimizer. It replaces the development environment file with the production environment file. The production flag enables Angular production mode during bootstrap.

The environment files contain only a boolean `production` value. Neither the API URL nor other runtime service settings are configurable through these files.

## Environment configuration

| Key | Development value | Production value | Usage |
|---|---|---|---|
| `environment.production` | `false` | `true` | The production build replaces the development environment file; bootstrap uses this value to enable Angular production mode. |

No environment variables are read by the application.

## Operational boundaries

- There are no checked-in CI/CD workflows or deployment descriptors.
- The repository does not specify a static host, web server, domain, release process, or SPA route-fallback configuration.
- Contact pages rely on the remote JSONPlaceholder URL, and the browser shell relies on public CDNs and image hosts. Availability, response persistence, and network policy are outside this repository.
- The build and deployment commands have not been run as part of this documentation review.

Use [Local development](../development/local-workflows.md) for the configured build and test commands. Hosting requirements and production behavior remain unverified.
