# Contact API reference

The browser client issues four HTTP operations against a fixed JSONPlaceholder users URL. This page documents the client request construction and compile-time shapes, not guarantees made by the external service. There is no checked-in OpenAPI specification or server implementation.

Primary sources: [contact HTTP service](../../src/app/contacts/contact.service.ts), [contact type](../../src/app/contacts/IContact.ts), [add form](../../src/app/contacts/add-contact/add-contact.component.ts), and [contact details component](../../src/app/contacts/contact-details/contact-details.component.ts).

## Conventions

- Base URL: `https://jsonplaceholder.typicode.com/users`.
- Requests use Angular `HttpClient`; no authentication header, custom content negotiation, retry, or error mapping is configured in the application code.
- The TypeScript interface used for contacts has required `id`, `name`, `phone`, and `email` fields. The client does not perform runtime schema validation.
- HTTP status codes, error-body format, persistence, and idempotency are not specified by this repository.

## Operations

| Method | Path | Purpose | Request | Response | Errors |
|---|---|---|---|---|---|
| `GET` | `/users` | Load contact list. | None | `Contact[]` | Unspecified |
| `GET` | `/users/{id}` | Load a contact by route identifier. | None | `Contact` | Unspecified |
| `POST` | `/users` | Submit the add-contact form. | [CreateContactRequest](#createcontactrequest) | `Contact` | Unspecified |
| `PUT` | `/users/{id}` | Submit the contact detail view's edit model. | `Contact` | `Contact` | Unspecified |

## Operation semantics

The path identifier for a read is taken from the route as a string. The update path uses the contact object's `id`, which is also included in the submitted contact object. The edit view initializes its model as a copy of the loaded contact. Only the name input is bound to that model, so phone and email edits do not update the submitted object.

The create view displays a success message only when its response has a truthy `id`. The repository defines no other success criteria or side-effect guarantees.

## DTOs

### Contact

Source: [IContact interface](../../src/app/contacts/IContact.ts)

This is the shape the client expects for a contact response and sends for an update. The type describes the client expectation; the received JSON is not validated at runtime.

| Field | Type | Required | Default | Constraints | Meaning |
|---|---|---|---|---|---|
| `id` | JSON number | Yes | None | None enforced by the client type | Contact identifier. |
| `name` | JSON string | Yes | None | None enforced by the client type | Contact name. |
| `phone` | JSON string | Yes | None | None enforced by the client type | Contact phone value. |
| `email` | JSON string | Yes | None | None enforced by the client type | Contact email value. |

### CreateContactRequest

Source: [add-contact component](../../src/app/contacts/add-contact/add-contact.component.ts)

The form submits these properties without an `id`. Its form controls start as empty strings; the client does not specify what the remote service does with omitted or `null` values.

| Field | Type | Required | Default | Constraints | Meaning |
|---|---|---|---|---|---|
| `name` | JSON string | Yes | Empty string before entry | Required validator; submission is not gated on form validity | Contact name. |
| `phone` | JSON string | Yes | Empty string before entry | Required validator; submission is not gated on form validity | Contact phone value. |
| `email` | JSON string | Yes | Empty string before entry | Required and email validators; submission is not gated on form validity | Contact email value. |

The form does not set field length or phone-format constraints. Its submit handler sends the form value without checking the form's validity, so the validators do not prevent the client request. The `Contact` update body contains all four properties in the client object; remote omitted-versus-null handling is not defined here.

## Errors and side effects

The service returns HTTP observables directly apart from identity mapping. The list, create, read, and update subscribers provide success callbacks only. No application-level error callback, retry, or user-visible request failure state is wired to these operations.

No delete request is implemented, despite the delete button in the contact details template. The client defines no status-code list or error envelope. The external service's actual responses and persistence behavior were not contacted or verified during documentation.
