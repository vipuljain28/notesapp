# External dependencies

The React application calls the JSONPlaceholder users API from the browser. The default URL comes from `VITE_API_URL`; local test requests are intercepted by MSW. No API credentials are configured in the repository.

## Contact API

The contact service sends `GET`, `POST`, `PUT`, and `DELETE` requests to the configured users endpoint. Requests use the Fetch API, a five-second timeout, and retries for transient network, timeout, and server failures. JSONPlaceholder simulates writes and does not persist contacts. The app maps the external company object to the contact's company name.

## Build and developer dependencies

The browser build includes React, Redux Toolkit, React Redux, React Router, Sonner, and Lucide React. Vite, TypeScript, Vitest, MSW, ESLint, Storybook, React Testing Library, jsdom, and the V8 coverage provider support development and verification. Exact dependency ranges are recorded in the root package manifest and lock file.

## Browser-hosted assets

The app stylesheet and bundled JavaScript are emitted by Vite. The Swagger UI page loads Swagger UI CSS and JavaScript from the public `unpkg.com` CDN. If that CDN is unavailable, the application still runs, but the interactive API reference does not render. No runtime external image or analytics service is configured.
