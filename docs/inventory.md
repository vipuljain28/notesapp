# System inventory

> Historical snapshot: counts and implementation claims below describe the Angular revision named in this file, not the current React application. Use the [current documentation index](README.md) for current behavior.

This page enumerates the application's external interfaces, configuration, and integrations. All counts are from committed revision `6726604274f0edbef5ef715ee6759a65ed7f959b`.

## APIs and endpoints

The application acts as an HTTP client only; there is no checked-in server or exposed API.

| Count | Audience | Type | Details |
|---:|---|---|---|
| **4** | Remote API | HTTP client operations | Contact service endpoints against JSONPlaceholder: `GET /users`, `GET /users/{id}`, `POST /users`, `PUT /users/{id}` |
| **0** | External systems | Checked-in API definition | No OpenAPI, AsyncAPI, gRPC, or other contract specification. |
| **0** | External systems | Served endpoints | The repository contains no server implementation. |

## Configuration

| Count | Type | Details |
|---:|---|---|
| **1** | Environment files | `development`: `production: false` |
| **1** | Environment files | `production`: `production: true` |
| **0** | Environment variables | No `process.env` or runtime environment reads. |
| **1** | Hard-coded settings | Contact API base URL: `https://jsonplaceholder.typicode.com/users` |
| **0** | Feature flags | No conditional code or configuration branches. |
| **1** | Build configuration | Angular CLI target configuration in `angular.json`. Production configuration replaces environment file and enables AOT, optimization, and CSS extraction. |

## Storage and persistence

| Count | Type | Details |
|---:|---|---|
| **0** | Database schemas | The application has no repository-owned database or schema. |
| **0** | Database tables | Contact and product data reside in external services or in-memory. |
| **0** | Data migrations | No migration scripts or version control. |
| **0** | Persistence layers | No ORM, query builder, or database adapter. |
| **1** | In-memory state | Shopping cart list, held in RxJS `BehaviorSubject` and reset on page reload. |
| **0** | Browser storage | No localStorage, sessionStorage, or IndexedDB usage. |

## External system integrations

| Count | Type | Details |
|---:|---|---|
| **1** | HTTP API | JSONPlaceholder users endpoint for contact CRUD. Base URL hard-coded; no retries, error mapping, or authentication. |
| **3** | CDN-hosted JavaScript | Bootstrap 4.3.1, jQuery Slim 3.3.1, Popper 1.14.7 from public CDNs with SRI integrity attributes. |
| **1** | CDN-hosted CSS | Bootstrap 4.3.1 CSS from public CDN. |
| **2** | Image placeholder services | `dummyimage.com` (HTTPS) and `placehold.it` (HTTP) for product and cart preview images. |
| **11** | npm package dependencies | `@angular/*` (6 scoped packages), `rxjs`, `primeng`, `primeicons`, `zone.js`, `core-js`. |
| **0** | Message queues | No queue broker, pub/sub, or event stream. |
| **0** | Authentication providers | No OAuth, OIDC, SAML, or other auth service. |
| **0** | Payment gateways | No payment processor. |
| **0** | Email services | No SMTP or third-party mail provider. |
| **0** | File storage | No S3, blob storage, or file upload service. |
| **0** | Monitoring or logging | No APM, error tracking, or centralized logging. |

## Background jobs and scheduled work

| Count | Type | Details |
|---:|---|---|
| **0** | Scheduled jobs | No cron, timer, or recurring tasks. |
| **0** | Queue consumers | No workers processing messages. |
| **0** | WebSocket or real-time channels | No subscriptions or push notifications. |
| **0** | Batch processes | No data pipeline or bulk operations. |

## Build and deployment

| Count | Type | Details |
|---:|---|---|
| **6** | npm scripts | `ng`, `start`, `build`, `test`, `lint`, `e2e` |
| **0** | CI/CD workflows | No `.github/workflows`, GitLab CI, Jenkins, or other pipeline definition. |
| **0** | Docker or container configuration | No Dockerfile or docker-compose. |
| **0** | Infrastructure as code | No Terraform, CloudFormation, or Kubernetes manifests. |
| **0** | Deployment targets | No hosting platform definition or deployment credentials. |
| **1** | Build output configuration | `dist/contact-manager-ng6` as the output path. |

## Summary

| Category | Count |
|---|---:|
| External APIs called | 1 |
| HTTP client operations | 4 |
| Configuration environments | 2 |
| Hard-coded settings | 1 |
| Database tables | 0 |
| In-memory state stores | 1 |
| CDN dependencies | 3 (JS), 1 (CSS) |
| Image services | 2 |
| npm dependencies | 11 |
| Message queues | 0 |
| Authentication providers | 0 |
| Payment gateways | 0 |
| Email services | 0 |
| File storage services | 0 |
| Scheduled jobs | 0 |
| Queue consumers | 0 |
| CI/CD workflows | 0 |
| Build scripts | 6 |
| Deployment targets | 0 |
| **Total external dependencies** | **~23 runtime interfaces (APIs, CDNs, services, packages)** |
| **Total infrastructure integrations** | **0 (no CI/CD, deployment, or operational automation)** |
| **Total persistence systems** | **0 (no repository-owned database or backend)** |

## Notes

- The system is a read-only browser application that depends entirely on an external HTTP API and public CDNs.
- Contact data lifecycle, persistence, error handling, and recovery are entirely delegated to the JSONPlaceholder service.
- Shopping and cart features are local-only; no backend store or persistence.
- The application defines no webhooks, message queue bindings, or event subscriptions.
- All configuration is static; runtime behavior is not configurable after build.
- No authentication, authorization, payment, or email integration is implemented.
