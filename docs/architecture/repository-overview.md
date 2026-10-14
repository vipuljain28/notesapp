# Repository overview

This repository builds one Angular browser application. It has no server-side application, worker, repository-owned database, or deployment definition. Its principal runtime paths are the concept demonstrations, a contacts UI that calls a remote demo API, and a shopping UI backed by in-memory sample data.

Primary implementation and configuration sources: [Angular application entry point](../../src/main.ts), [root module](../../src/app/app.module.ts), [application routes](../../src/app/app-routing.module.ts), [shopping module routes](../../src/app/shopping/product-routing.module.ts), [package manifest](../../package.json), [Angular CLI configuration](../../angular.json), and [Protractor configuration](../../e2e/protractor.conf.js).

The end-to-end tests are a separate project from the application source. The [Angular References directory](<../../Angular References/>) contains tutorial notes and images, not runtime application code.

## Components

| Area | Responsibility |
|---|---|
| Application shell | Bootstraps the root component and displays the shared header, navigation, route outlet, and footer. |
| Concepts | Demonstrates Angular data binding, component inputs and outputs, and directives. The root route redirects here; its pipes tab is empty. |
| Contacts | Lists contacts, submits new contacts, loads an individual contact, and sends an update request. The client uses the contact API described in the [API reference](../api/contact-api.md). |
| Shopping | Displays a static product list, adds products to a shared cart, and removes cart entries. Product and cart data are in memory; see the [data model](../data-model/model.md). |
| Shared UI | Provides header, navigation, search, footer, a not-found component, an attribute directive, a pipe, and a route guard. The search control logs its input; it does not filter results. |

`ProductModule` declares shopping components and registers its child routes. `AppRoutingModule` registers the contacts and concept routes and imports common forms, HTTP, and PrimeNG modules. `AppModule` imports both feature modules and bootstraps the application shell.

## Routes

The application route configuration contains eight declarations, including the empty redirect and wildcard route. The shopping route configuration contains three more.

| Path | Behavior |
|---|---|
| `/` | Redirects to `/concepts`. |
| `/concepts` | Shows the Angular concept demonstrations. |
| `/contacts` | Shows the contact list. |
| `/contacts/new` | Shows the add-contact form. A guard is registered, but it always allows activation. |
| `/contacts/:id` | Loads the contact with the given identifier. |
| `/about` | Shows the PrimeNG demonstration page. |
| `/products` | Shows the static product list. |
| `/products/cart` | Shows the shared in-memory cart. |
| `/products/:id` | Activates a product-details component that renders static placeholder text. |
| Other paths | Show the not-found component. |

There is no authentication flow, authorization service, or tenant boundary in the repository. The login and sign-up links are placeholders. The guard on `/contacts/new` returns `true` unconditionally; it is not an access-control boundary.

## Runtime paths

The browser entry point bootstraps the root module. The root component supplies the shared shell around the Angular router outlet. Contact list, create, details, and update views use the contact service to issue HTTP requests. The shopping feature reads a literal product array and publishes cart updates through an RxJS `BehaviorSubject`; neither contacts nor cart state is persisted by an application-owned store.

There is no message queue, webhook, scheduled job, or server API implementation in the repository. The contact service targets a hard-coded external URL. Build and test workflows are the npm scripts in the package manifest, not CI workflows.

## Known behavior and limitations

- The contact API client has no application-level error display or retry path.
- The new-contact route is not protected by authentication.
- The contact detail screen has an inert delete button, and only its name field is bound to the update model.
- The cart removal handler receives a product object where its service expects an array index.
- Product details are static placeholder text; cart quantity, checkout, and total-price behavior are incomplete.
- The `ContactsComponent` source is not registered in the application module or routes; the actual `/contacts` route renders `ContactsListComponent`.

Further observed defects and the limits of these observations are recorded in [findings](../reviews/findings.md) and [unknowns](../reviews/unknowns.md).
