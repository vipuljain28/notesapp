# Contact API reference

The browser client sends contact requests to the base URL configured by `VITE_API_URL`. The app's expected request and response shapes are described in the [OpenAPI document](../../public/swagger/openapi.yaml), and the corresponding test behavior is implemented in [MSW handlers](../../src/mocks/handlers.ts). The OpenAPI file documents the client contract used by this project; it does not claim to define the complete JSONPlaceholder service.

## Conventions

- Requests use JSON and the browser Fetch API.
- Requests time out after five seconds.
- Network, timeout, and server errors are retried up to three times after the initial request, with delays of one, two, and four seconds.
- HTTP client errors are not retried.
- API failures are normalized to `ApiError`; UI components display the resulting message.
- Contact writes are sent to JSONPlaceholder, which simulates write responses and does not provide durable storage.

## Operations

| Method | Path | Purpose | Request | Response | Errors |
|---|---|---|---|---|---|
| `GET` | `/users` | Fetch the contact list. | None | External contact response list | Network, timeout, server, or HTTP error |
| `GET` | `/users/{id}` | Fetch one contact. | Path identifier | External contact response | Network, timeout, server, not found |
| `POST` | `/users` | Create a contact. | Contact creation request | External contact response | Network, timeout, server, validation |
| `PUT` | `/users/{id}` | Replace a contact. | Contact update request | External contact response | Network, timeout, server, validation |
| `DELETE` | `/users/{id}` | Delete a contact. | Path identifier | Empty or JSON response | Network, timeout, server, not found |

The service maps the provider's company object to the contact's company name. Address and other provider-only fields are not retained in Redux. The add form requires a non-empty name and a valid email of at most 255 characters. Phone is optional and, when supplied, accepts digits and common phone separators up to 20 characters. These client constraints do not establish external-service validation behavior.

See the [OpenAPI contract](../../public/swagger/openapi.yaml) for wire field definitions and schemas.

The interactive Swagger UI is available at `/swagger/` when the app is served locally. It loads Swagger UI assets from a public CDN.
