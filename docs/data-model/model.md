# Client-side data model

The application defines no database schema, migrations, persistence adapter, or server-owned model. Contact data is exchanged with an external HTTP service. Product data is a literal array, and cart state exists only in the running browser application.

Primary sources: [contact interface](../../src/app/contacts/IContact.ts), [contact service](../../src/app/contacts/contact.service.ts), [product model and sample data](../../src/app/shared/models/product.ts), and [shopping-cart state service](../../src/app/shared/services/shopping-cart-data.service.ts).

## Contact

The client interface has four required TypeScript properties:

| Field | Type | Client meaning |
|---|---|---|
| `id` | `number` | Identifier used to construct an individual-contact URL. |
| `name` | `string` | Contact name. |
| `phone` | `string` | Contact phone value. |
| `email` | `string` | Contact email value. |

The add form validates `name` and `phone` as required and `email` as required with Angular's email validator. It submits the form value, which contains the three editable fields and no `id`. The service uses the response as an `IContact`, but the client does not validate the response at runtime.

The list and details screens retrieve data from the external API. Creating and updating send HTTP requests; the repository does not establish whether the external service persists them. There is no delete operation in the service.

## Product

The product interface contains:

| Field | Type | Client meaning |
|---|---|---|
| `id` | `number` | Sample product identifier. |
| `name` | `string` | Product display name. |
| `category` | `string` | Product category label. |
| `price` | `string` | Preformatted display value, including a currency symbol in the sample data. |

Ten sample products are returned by the product model. There are no product relationships, persistence calls, or numeric price calculations in the client.

## Shopping cart

The cart service seeds one sample product and exposes its list through an RxJS `BehaviorSubject`. Adding appends a product to the current array. The list is shared between the header and cart view while the application is running; it is not written to browser storage or a database. Adding the same product again is not prevented.

The service and shopping components use `any[]` and untyped callback arguments rather than the product interface. Removal is intended to take an array index, but the cart component passes a product object. The service passes that value to `splice`, so removal does not reliably target the selected item. The cart template's quantity input is not connected to application state, and checkout and total calculation are placeholders.

## Ownership and lifecycle

The contact client delegates reads and writes to the remote service; ownership, retention, deletion, and persistence semantics are not specified in this repository. Product records are static source data. Cart records are held in memory and reset when the browser application is reloaded.
