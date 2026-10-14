# Local development

The project is configured around Angular CLI 6.2.9, TypeScript 2.9, Karma/Jasmine unit tests, TSLint, and Protractor end-to-end tests. The repository does not pin Node.js or npm versions in a version file or `engines` field.

Primary sources: [package scripts and dependencies](../../package.json), [Angular CLI targets](../../angular.json), [Karma configuration](../../src/karma.conf.js), [Protractor configuration](../../e2e/protractor.conf.js), and [end-to-end test](../../e2e/src/app.e2e-spec.ts).

## Prerequisites and setup

- Node.js and npm are needed to install the package dependencies and invoke the scripts. Supported versions are not declared.
- Chrome is configured as the Karma browser and as the Protractor browser.
- The end-to-end target uses Angular CLI's configured development server target and Protractor direct connection.

The following setup command uses the checked-in npm lock file. It was not run while preparing these documents:

```sh
npm ci
```

## Configured commands

Run these scripts from the repository root after dependency installation:

| Command | Configured action |
|---|---|
| `npm start` | Runs `ng serve`. The Angular CLI serves the app at its default development address, `http://localhost:4200/`. |
| `npm run build` | Runs the default Angular CLI build. |
| `npm test` | Runs Karma through Angular CLI. Karma is configured to launch Chrome, watch files, and remain interactive. |
| `npm run lint` | Runs the Angular CLI TSLint target for application and spec TypeScript configurations. |
| `npm run e2e` | Runs the Protractor target with the configured development server and Chrome. |
| `npm run ng` | Invokes the Angular CLI through its package script alias. |

The Angular CLI production build is selected with `ng build --prod`. The configured output path is described in [Build and deployment](../operations/build-and-deployment.md).

These commands are taken from the manifest and CLI configuration. They were not executed for this documentation task because `node_modules` is absent. The end-to-end and unit-test suites also depend on a local Chrome installation.

## Test scope and limitations

The repository has 26 tracked Karma spec files and one tracked Protractor end-to-end spec. Most component and service specs check construction only. The e2e test expects the generated Angular welcome text, while the current application shell does not render that text. The expected behavior is therefore inconsistent with the checked-in UI.

The Angular unit-test target and Protractor target are configured separately. No test run, test coverage result, or browser compatibility matrix is asserted here.
