# Documentation index

The current documentation describes the React application. Historical inventory and review snapshots are labeled in place. The [repository overview](architecture/repository-overview.md) is the architecture entry point.

| Document | Use it to |
|---|---|
| [Project README](../README.md) | Install, run, and verify the application. |
| [Historical system inventory](inventory.md) | Review counts from the legacy Angular revision. |
| [Repository overview](architecture/repository-overview.md) | Understand the app boundary, modules, routes, and runtime paths. |
| [Data model](data-model/model.md) | Find the client-side data shapes and where state lives. |
| [Contact API](api/contact-api.md) | See HTTP operations sent by the contact client. |
| [OpenAPI contract](../public/swagger/openapi.yaml) | Inspect the client request and response shapes. |
| [Component library](components.md) | Run Storybook and review shared and feature components. |
| [External dependencies](integrations/external-dependencies.md) | Identify network dependencies and externally hosted assets. |
| [Local development](development/local-workflows.md) | Set up the project and run its configured commands. |
| [Build and deployment](operations/build-and-deployment.md) | Build locally and configure the GitHub Pages deployment. |
| [Performance budgets](operations/performance.md) | Check enforced build asset limits and local metrics. |
| [External dependencies](integrations/external-dependencies.md) | Identify services and browser-hosted assets the app uses. |
| [Historical documentation review](reviews/documentation-review.md) | Review findings about the legacy Angular revision. |
| [Historical findings](reviews/findings.md) | Read observed behavior gaps from the legacy revision. |
| [Historical unknowns](reviews/unknowns.md) | See unanswered questions from the legacy review. |
| [Historical coverage ledger](reviews/coverage.md) | Check the legacy revision's counts and document status. |

Claims in these pages are grounded in source files and project configuration. A source link at the start of a page identifies its main evidence. External service behavior, deployment, and local commands are not presented as verified unless explicitly stated.
