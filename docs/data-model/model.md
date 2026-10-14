# Client-side data model

The application stores contacts and cart items in Redux. Contacts come from an external HTTP service; cart state is persisted in browser `localStorage`. Source definitions are in [`contactSlice.ts`](../../src/store/contactSlice.ts), [`cartSlice.ts`](../../src/store/cartSlice.ts), and [`cartPersistence.ts`](../../src/services/cartPersistence.ts).

## Contact

| Field | Type | Required | Meaning |
|---|---|---|---|
| `id` | number | Yes | Contact identifier. |
| `name` | string | Yes | Display name. |
| `email` | string | Yes | Email address. |
| `phone` | string | No | Phone number. |
| `company` | string | No | Company name. |

The API service converts the external company object to this optional company string. The form validates name and email and accepts phone as optional.

## Cart item

| Field | Type | Constraints | Meaning |
|---|---|---|---|
| `id` | number | Unique for an item in the current cart. | Item identifier. |
| `name` | string | Non-empty in the cart form. | Item label. |
| `quantity` | number | Whole number from 1 to 999 for cart actions. | Item count. |
| `price` | number | Finite and non-negative for cart additions. | Unit price. |

The cart total is derived from `price × quantity` during restoration and updated by cart actions. `localStorage` key `contact-manager-cart` stores the current `items` and `total`; on restore, the total is recalculated from the items. Invalid or unreadable storage is reported with a warning and treated as an empty cart.

## API error

`ApiError` carries a user-facing message, a kind (`NETWORK`, `TIMEOUT`, `SERVER_ERROR`, `VALIDATION_ERROR`, or `UNKNOWN`), an optional HTTP status, and whether the request can be retried. The client maps the HTTP response and fetch failures to this shape in [`api.ts`](../../src/services/api.ts).
