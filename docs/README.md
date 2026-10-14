# Documentation index

This documentation describes the checked-in application, not a proposed design. The [repository overview](architecture/repository-overview.md) is the entry point.

| Document | Use it to |
|---|---|
| [Project README](../README.md) | Install, run, and verify the application. |
| [System inventory](inventory.md) | Find all APIs, settings, databases, external systems, and scheduled jobs (with counts). |
| [Repository overview](architecture/repository-overview.md) | Understand the app boundary, modules, routes, and runtime paths. |
| [Data model](data-model/model.md) | Find the client-side data shapes and where state lives. |
| [Contact API](api/contact-api.md) | See HTTP operations sent by the contact client. |
| [OpenAPI contract](../public/swagger/openapi.yaml) | Inspect the client request and response shapes. |
| [External dependencies](integrations/external-dependencies.md) | Identify network dependencies and externally hosted assets. |
| [Local development](development/local-workflows.md) | Set up the project and run its configured commands. |
| [Build and deployment](operations/build-and-deployment.md) | Find configured build output and deployment unknowns. |
| [Performance budgets](operations/performance.md) | Check enforced build asset limits and local metrics. |
| [Documentation review](reviews/documentation-review.md) | Review findings, confidence limits, and source coverage. |
| [Findings](reviews/findings.md) | Read observed defects and incomplete behavior. |
| [Unknowns](reviews/unknowns.md) | See questions the repository does not answer. |
| [Coverage ledger](reviews/coverage.md) | Check the inventory counts and document review status. |

Claims in these pages are grounded in source files and project configuration. A source link at the start of a page identifies its main evidence. External service behavior, deployment, and local commands are not presented as verified unless explicitly stated.
