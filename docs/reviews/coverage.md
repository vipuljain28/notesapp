# Documentation coverage ledger

> Historical snapshot: this ledger records counts from the legacy Angular commit named below. It is not a coverage report for the current React application.

Counts below were collected from committed revision `6726604274f0edbef5ef715ee6759a65ed7f959b` on 2026-10-14. These values describe that revision and will drift as the repository changes.

## Inventory

| Surface | Count | Evidence command |
|---|---:|---|
| Tracked repository files | 116 | A |
| Tracked Karma spec files | 26 | B |
| Tracked Protractor e2e spec files | 1 | C |
| Application route declarations | 8 | D |
| Shopping route declarations | 3 | E |
| Contact HTTP operations | 4 | F |
| Contact payload shapes | 2 | G and H |
| npm scripts | 6 | I |

The commands were run against `HEAD`. Route and HTTP-operation denominators are based on implementation declarations, not externally implemented endpoints. Command I parses the manifest's `scripts` object. Commands G and H identify the two client payload shapes, the named contact interface and the inferred create-form body.

```powershell
# A
git ls-files | Measure-Object -Line
# B
git ls-files 'src/**/*.spec.ts' | Measure-Object -Line
# C
git ls-files 'e2e/**/*.e2e-spec.ts' | Measure-Object -Line
# D
git grep -n -e 'path:' HEAD src/app/app-routing.module.ts
# E
git grep -n -e 'path:' HEAD src/app/shopping/product-routing.module.ts
# F
git grep -nF -e 'this.http.get' -e 'this.http.post' -e 'this.http.put' HEAD src/app/contacts/contact.service.ts
# G
git grep -n -e 'export interface IContact' HEAD src/app/contacts/IContact.ts
# H
git grep -n -e 'new FormGroup' HEAD src/app/contacts/add-contact/add-contact.component.ts
# I
$manifest = git show HEAD:package.json | ConvertFrom-Json
@($manifest.scripts.PSObject.Properties).Count
```

The npm script count comprises `ng`, `start`, `build`, `test`, `lint`, and `e2e`.

## Documents

| Document | Status | Coverage |
|---|---|---|
| [Repository overview](../architecture/repository-overview.md) | Reviewed against source by the author | App boundary, modules, routes, data flow, and known limits. |
| [Data model](../data-model/model.md) | Reviewed against source by the author | Contact interface, product fields, cart storage, and lifecycle. |
| [Contact API](../api/contact-api.md) | Reviewed against source by the author | 4 of 4 client HTTP operations and 2 client payload shapes; no server guarantees asserted. |
| [External dependencies](../integrations/external-dependencies.md) | Reviewed against source by the author | Remote contact API, CDN assets, image hosts, and package dependencies. |
| [Local development](../development/local-workflows.md) | Reviewed against project configuration by the author | 6 of 6 package scripts and configured test runners. Commands not executed. |
| [Build and deployment](../operations/build-and-deployment.md) | Reviewed against project configuration by the author | Build target, production settings, and absence of deployment configuration. |
| [Findings](findings.md) | Reviewed against source by the author | Observed behavior gaps and source-level test mismatch. |
| [Unknowns](unknowns.md) | Reviewed against available repository evidence by the author | Runtime, external, support, and deployment questions not answerable from source. |

The review was performed by one author. No independent second-reader review was available. Automated markdown-link validation and application test commands were not run.
