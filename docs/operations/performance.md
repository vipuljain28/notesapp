# Performance budgets

The build budget script checks the gzip size of each generated JavaScript and CSS asset. The current limits are 250 KiB for a JavaScript asset and 50 KiB for a CSS asset. The script is [`scripts/check-performance-budget.mjs`](../../scripts/check-performance-budget.mjs), and CI runs it after the production build.

Run the check locally:

```sh
npm run build
npm run performance:check
```

The app lazily imports the cart panel. In development, `observeWebVitals` reports LCP, CLS, and INP to the browser console. It does not send user data to a monitoring service. Lighthouse scores, deployment measurements, API percentiles, and production user metrics are not collected by this repository.
