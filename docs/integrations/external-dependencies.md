# External dependencies

The application depends on one remote HTTP API and externally hosted browser assets. Shopping data is not fetched from an external product service.

Primary sources: [contact service](../../src/app/contacts/contact.service.ts), [HTML shell](../../src/index.html), [product-list template](../../src/app/shopping/product-list/product-list.component.html), [cart template](../../src/app/shopping/cart/cart.component.html), and [package manifest](../../package.json).

## Contact service

Contact reads and writes target `https://jsonplaceholder.typicode.com/users`. The client sends list and individual `GET` requests, a `POST` for create, and a `PUT` for update. The application provides no API URL configuration, authentication, retry, or error mapping. The client code does not prove remote availability, persistence, or CORS behavior.

## Browser-hosted assets

The HTML shell loads Bootstrap 4.3.1 CSS and JavaScript, jQuery Slim 3.3.1, and Popper 1.14.7 from public CDNs. The markup includes integrity and cross-origin attributes for these CDN resources.

Product and cart templates request placeholder images from `dummyimage.com` over HTTPS and `placehold.it` over HTTP. These are presentation resources, not product data sources. Availability and current service behavior have not been checked.

## Packaged UI dependencies

The manifest declares Angular `^6.1.0`, Angular CLI `~6.2.9`, TypeScript `~2.9.2`, PrimeNG `^7.1.2`, PrimeIcons `^1.0.0`, RxJS `~6.2.0`, and Zone.js `~0.8.26`. Angular CLI, TypeScript, Karma, Jasmine, TSLint, and Protractor are development dependencies. PrimeNG theme and component styles are referenced from installed package assets in the Angular build configuration; they are not fetched from a CDN.

## Configuration boundary

The two environment files expose only a `production` boolean. The contact API URL is hard-coded in the service. The repository declares no environment-variable reads or secret configuration.
