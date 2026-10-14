# Data Model: React Migration for Contact Manager

**Version**: 1.0.0  
**Created**: 2026-10-14  
**Feature**: 001 - React Migration  

---

## Overview

This document defines all data entities, their relationships, validation rules, persistence mechanisms, and lifecycle states for the React migration. All types are implemented in TypeScript using strict mode (per constitution P4) with zero `any` types (per constitution P6).

---

## Entity: Contact

### Type Definition

```typescript
// src/types/Contact.ts
export interface Contact {
  id: string;                    // Unique identifier (JSONPlaceholder user ID)
  name: string;                  // Display name (required, non-empty)
  email: string;                 // Email address (required, valid format)
  phone: string;                 // Phone number (required, digits + separators)
  categories?: string[];         // Optional tags/categories array
  address?: ContactAddress;      // Optional address details
  company?: ContactCompany;      // Optional company details
  website?: string;              // Optional website URL
  createdAt?: Date;              // ISO 8601 creation timestamp
  updatedAt?: Date;              // ISO 8601 last update timestamp
}

export interface ContactAddress {
  street: string;                // Street address
  city: string;                  // City name
  zipcode: string;               // Postal code
}

export interface ContactCompany {
  name: string;                  // Company name
  catchPhrase?: string;          // Company catchphrase
}

export interface CreateContactRequest {
  name: string;                  // Required for creation
  email: string;                 // Required for creation
  phone: string;                 // Required for creation
  categories?: string[];         // Optional
}

export interface UpdateContactRequest {
  name?: string;                 // Optional update
  email?: string;                // Optional update
  phone?: string;                // Optional update
  categories?: string[];         // Optional update
  address?: ContactAddress;      // Optional update
  company?: ContactCompany;      // Optional update
  website?: string;              // Optional update
}
```

### Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| name | Non-empty, max 255 characters | "Name is required and must be < 255 characters" |
| email | RFC 5322 basic (must contain @ and domain), max 255 chars | "Email must be a valid email address" |
| phone | Digits + common separators (-, (, ), +, space), max 20 chars | "Phone must contain only digits and separators (-, (, ), +)" |
| categories | Array of strings, each max 50 characters | "Category must be < 50 characters" |
| address.street | Non-empty if address provided | "Street is required" |
| address.city | Non-empty if address provided | "City is required" |
| address.zipcode | Non-empty if address provided | "Zipcode is required" |
| company.name | Non-empty if company provided | "Company name is required" |
| website | Valid URL format if provided | "Website must be a valid URL" |

**Implementation**: See `src/utils/validation.ts` for validator functions.

### Unique Constraints

- **id**: Primary key, globally unique across all contacts (from JSONPlaceholder)
- **email**: Unique at time of creation (JSONPlaceholder may not enforce, but app treats as unique)

### Lifecycle

#### Create
```
User submits ContactForm
  ↓
Validation via validateContact() → if invalid, show inline errors
  ↓
POST /users (via apiClient.contacts.create)
  ↓
Success: Dispatch addContact action → Redux store updated → Component re-renders
Error: Show inline error message with retry option
```

#### Read
```
App mounted
  ↓
Dispatch fetchContacts action (useEffect in App.tsx)
  ↓
GET /users with retry (3 attempts, 5s timeout)
  ↓
Redux state.contacts.list = [ Contact[], ... ]
  ↓
Components render from Redux state (via useSelector)
```

#### Update
```
User opens edit form for contact
  ↓
Form pre-fills with current contact data from Redux
  ↓
User modifies fields and submits
  ↓
Validation via validateContact() → if invalid, show inline errors
  ↓
PUT /users/{id} (via apiClient.contacts.update)
  ↓
Success: Dispatch updateContact action → Redux store updated
Error: Show inline error message with retry option
```

#### Delete
**Out of scope for MVP** (No delete endpoint on JSONPlaceholder).

### Relationship to Other Entities

- Contact → (none in MVP, but could extend with Notes, Interactions)
- Contact ← Redux.contacts.list (stored in Redux state)

---

## Entity: Product

### Type Definition

```typescript
// src/types/Product.ts
export interface Product {
  id: string;                    // Unique product identifier
  name: string;                  // Product name (required)
  price: number;                 // Price in USD (non-negative)
  image: string;                 // Image URL or data URI
  description?: string;          // Optional product description
}

export interface ProductCatalog {
  items: Product[];              // Static array of products
  lastUpdated: Date;             // Catalog version timestamp
}
```

### Data Source

**Mock Data**: `src/data/products.ts`

```typescript
// src/data/products.ts
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Laptop Stand',
    price: 29.99,
    image: '/images/laptop-stand.jpg',
    description: 'Adjustable aluminum laptop stand for better ergonomics',
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    price: 24.99,
    image: '/images/mouse.jpg',
    description: 'Ergonomic wireless mouse with 2.4GHz connection',
  },
  // ... additional products
];
```

**Rationale**: JSONPlaceholder has no product API. Mock data is sufficient for MVP (no real e-commerce). Future phases could integrate real product database.

### Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| id | Non-empty, unique | "Product ID is required" |
| name | Non-empty, max 255 chars | "Product name is required" |
| price | Non-negative number | "Price must be >= 0" |
| image | Non-empty URL or data URI | "Product image is required" |
| description | Max 1000 characters if provided | "Description must be < 1000 characters" |

### Relationship to Other Entities

- Product → CartItem.productId (reference when added to cart)
- Product ← Redux.cart.items[].productId (referenced by cart)

---

## Entity: CartItem

### Type Definition

```typescript
// src/types/Cart.ts
export interface CartItem {
  productId: string;             // Reference to Product.id
  quantity: number;              // Quantity ordered (positive integer)
  price: number;                 // Price per unit (snapshot at add time)
  addedAt: Date;                 // ISO 8601 timestamp when added
}

export interface Cart {
  items: CartItem[];             // Array of cart items
  lastModified: Date;            // ISO 8601 timestamp of last change
}

export interface CartSummary {
  itemCount: number;             // Total number of items
  totalPrice: number;            // Sum of (price * quantity) for all items
  isEmpty: boolean;              // true if items.length === 0
}
```

### Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| productId | Non-empty, must reference existing Product | "Invalid product" |
| quantity | Positive integer (>= 1) | "Quantity must be at least 1" |
| price | Non-negative number | "Price must be >= 0" |
| addedAt | Valid ISO 8601 date | "Invalid timestamp" |

### Persistence

**Storage Mechanism**: browser `localStorage`

**Key**: `cart` (stringified JSON)

**Serialization Format**:
```json
{
  "items": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 29.99,
      "addedAt": "2026-10-14T18:00:00Z"
    }
  ],
  "lastModified": "2026-10-14T18:05:00Z"
}
```

**Sync Pattern**: Write-through (update Redux state AND localStorage simultaneously on every change)

**Deserialization**: On app mount, load from localStorage, parse JSON, restore Date objects, update Redux state

**Error Handling**: If localStorage contains corrupted JSON, reset cart to empty state and log error

### Lifecycle

#### Add Item
```
User clicks "Add to Cart" on product
  ↓
Validation: product exists, quantity >= 1
  ↓
Dispatch addItemToCart(productId, quantity) action
  ↓
Redux reducer: CartItem created, added to state.cart.items
  ↓
useEffect triggered: Save to localStorage
  ↓
Toast notification: "Added to cart" (via Sonner toast)
  ↓
Component re-renders: Cart count updates in header
```

#### Update Quantity
```
User changes quantity in cart view
  ↓
Validation: quantity >= 1
  ↓
Dispatch updateCartQuantity(productId, newQuantity) action
  ↓
Redux reducer: CartItem.quantity updated
  ↓
useEffect triggered: Save to localStorage
  ↓
Component re-renders: Total price recalculated
```

#### Remove Item
```
User clicks "Remove" button on cart item
  ↓
Dispatch removeFromCart(productId) action
  ↓
Redux reducer: CartItem with matching productId removed from state.cart.items
  ↓
useEffect triggered: Save to localStorage
  ↓
Toast notification: "Removed from cart"
  ↓
Component re-renders: Cart item removed, total recalculated
  ↓
If cart now empty: Show empty state message
```

#### Clear Cart
```
User clicks "Clear Cart" button
  ↓
Confirm: "Are you sure?" dialog
  ↓
Dispatch clearCart() action
  ↓
Redux reducer: state.cart.items = []
  ↓
useEffect triggered: Save to localStorage (or remove localStorage key)
  ↓
Component re-renders: Empty state message shown
```

#### Load Cart (App Mount)
```
App component mounted
  ↓
useEffect: Try to load from localStorage with key 'cart'
  ↓
If found: Parse JSON, restore Cart object, dispatch loadCart(cart) action
If not found or corrupted: Dispatch loadCart({items: [], lastModified: now}) action
  ↓
Redux state.cart = loaded cart
  ↓
Component renders cart items (if any)
```

### Relationship to Other Entities

- CartItem.productId → Product.id (foreign key reference)
- Cart → (stored in Redux state.cart)

---

## Redux Store State

### AppState Structure

```typescript
// src/types/Redux.ts
export interface AppState {
  contacts: ContactsState;
  cart: CartState;
  forms: FormsState;
  ui: UiState;
}

export interface ContactsState {
  list: Contact[];               // All loaded contacts
  loading: boolean;              // Fetching in progress
  error: string | null;          // Last error message (if any)
  selectedId: string | null;     // Currently selected contact ID (for detail view)
}

export interface CartState {
  items: CartItem[];             // Current cart items
  loading: boolean;              // Operation in progress (rare, but for consistency)
  error: string | null;          // Last error message (if any)
}

export interface FormsState {
  contactForm: ContactFormState; // Add/Edit contact form state
  // Future: checkoutForm, searchForm, etc.
}

export interface ContactFormState {
  values: Partial<CreateContactRequest>;  // Current form field values
  errors: Record<string, string>;         // Field-level validation errors
  isDirty: boolean;                       // User has made changes since load
  isSubmitting: boolean;                  // POST/PUT in progress
}

export interface UiState {
  showUnsavedWarning: boolean;   // Show "unsaved changes" dialog
  toastQueue: Toast[];           // Queue of toast notifications
}

export interface Toast {
  id: string;                    // Unique toast ID
  message: string;               // Toast text
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number;              // Duration in ms (0 = infinite)
}
```

### State Selectors

```typescript
// src/store/selectors.ts
export const selectAllContacts = (state: AppState): Contact[] => state.contacts.list;
export const selectContactsLoading = (state: AppState): boolean => state.contacts.loading;
export const selectContactsError = (state: AppState): string | null => state.contacts.error;
export const selectSelectedContact = (state: AppState): Contact | undefined =>
  state.contacts.list.find((c) => c.id === state.contacts.selectedId);

export const selectCartItems = (state: AppState): CartItem[] => state.cart.items;
export const selectCartTotal = (state: AppState): number =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartItemCount = (state: AppState): number =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectIsCartEmpty = (state: AppState): boolean => state.cart.items.length === 0;

export const selectContactFormValues = (state: AppState): Partial<CreateContactRequest> =>
  state.forms.contactForm.values;
export const selectContactFormErrors = (state: AppState): Record<string, string> =>
  state.forms.contactForm.errors;
export const selectIsContactFormDirty = (state: AppState): boolean =>
  state.forms.contactForm.isDirty;
```

### Action Types

```typescript
// src/store/actionTypes.ts
export enum ContactActionType {
  FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST',
  FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS',
  FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE',
  ADD_CONTACT_REQUEST = 'ADD_CONTACT_REQUEST',
  ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS',
  ADD_CONTACT_FAILURE = 'ADD_CONTACT_FAILURE',
  SELECT_CONTACT = 'SELECT_CONTACT',
}

export enum CartActionType {
  ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY',
  CLEAR_CART = 'CLEAR_CART',
  LOAD_CART = 'LOAD_CART',
}

export enum FormActionType {
  UPDATE_CONTACT_FORM_VALUE = 'UPDATE_CONTACT_FORM_VALUE',
  SET_CONTACT_FORM_ERRORS = 'SET_CONTACT_FORM_ERRORS',
  SET_CONTACT_FORM_DIRTY = 'SET_CONTACT_FORM_DIRTY',
  RESET_CONTACT_FORM = 'RESET_CONTACT_FORM',
}

export enum UiActionType {
  SHOW_UNSAVED_WARNING = 'SHOW_UNSAVED_WARNING',
  HIDE_UNSAVED_WARNING = 'HIDE_UNSAVED_WARNING',
  ADD_TOAST = 'ADD_TOAST',
  REMOVE_TOAST = 'REMOVE_TOAST',
}
```

---

## Data Flow Diagram

### Contact List Load

```
App.tsx (useEffect on mount)
  ↓
dispatch(fetchContacts()) [thunk action]
  ↓
Contact Reducer receives FETCH_CONTACTS_REQUEST
  ↓
Redux state.contacts.loading = true
  ↓
Async: await apiClient.contacts.list() [fetch GET /users]
  ↓
Success → Contact Reducer receives FETCH_CONTACTS_SUCCESS
  ↓
Redux state.contacts.list = [ Contact[], ... ]
Redux state.contacts.loading = false
  ↓
Component useSelector(selectAllContacts) → triggers re-render
  ↓
ContactList.tsx renders contact list
```

### Add Item to Cart

```
ProductCard.tsx: User clicks "Add to Cart"
  ↓
dispatch(addItemToCart(productId, quantity))
  ↓
Cart Reducer receives ADD_ITEM_TO_CART
  ↓
Redux state.cart.items.push(new CartItem)
  ↓
useEffect monitors state.cart.items
  ↓
Save to localStorage: JSON.stringify(state.cart) → localStorage['cart']
  ↓
Component useSelector(selectCartItemCount) → triggers re-render
  ↓
Header cart count updates
Sonner toast displays "Added to cart"
```

---

## Constraints & Notes

1. **JSONPlaceholder API**: Read-only data source. POST/PUT requests succeed but don't persist (mock API behavior).
2. **Cart Expiration**: Cart persists until user explicitly clears it (no auto-expiration).
3. **Offline Support**: localStorage provides basic offline persistence, but API calls will fail without network.
4. **Conflict Resolution**: No conflict handling needed (single user, no concurrent edits).
5. **Data Validation**: All validation happens client-side; server validation (if any) is informational only.

---

## Migration Path (Future)

When moving from mock data to real backend:

1. Replace `src/data/products.ts` mock with real API endpoint
2. Add product slice to Redux store
3. Update `apiClient.products.*` methods to call real backend
4. Add server-side persistence for cart (user sessions)
5. Add authentication/authorization layer

---

**Data Model Version**: 1.0.0  
**Last Updated**: 2026-10-14  
**Next**: Implement store, reducers, and actions in Phase 2 (speckit-tasks)
