# Task Breakdown: React Migration for Contact Manager

**Feature**: React Migration  
**Feature Number**: 001  
**Created**: 2026-10-14  
**Total Tasks**: 52  
**MVP Scope**: Phase 1 (Setup) + Phase 2 (Foundational) + Phase 3 (US1: Contact List)  

---

## Overview

This document provides a detailed, actionable task breakdown for implementing the React migration. Tasks are organized by user story priority (P1, P2, P3) and execution phases. Each task includes file paths, dependencies, and test criteria.

**Key Principles**:
- **Modularity**: Each user story is independently testable
- **Parallelization**: Tasks marked [P] can run in parallel
- **MVP First**: Phase 3 (US1: Contact List) is minimum viable product

---

## User Stories & Priorities

| ID | Title | Priority | Effort | Status |
|---|-------|----------|--------|--------|
| US1 | Browse & Display Contact List | P1 | 8 pts | Ready |
| US2 | View Contact Details | P1 | 5 pts | Ready |
| US3 | Add New Contact Form | P2 | 8 pts | Ready |
| US4 | Shopping Cart Management | P2 | 8 pts | Ready |
| US5 | Update Contact | P3 | 5 pts | Ready |

---

## Phase 1: Project Setup

### Goal
Initialize project structure, dependencies, and configuration per React migration plan.

### Test Criteria
- [ ] Project builds with `npm run build` without errors
- [ ] Dev server starts with `npm run dev` on http://localhost:5173
- [ ] No console errors or warnings on app startup
- [ ] TypeScript compiler runs without errors (`npm run type-check`)
- [ ] ESLint passes all files (`npm run lint`)

### Tasks

- [ ] T001 Initialize Vite React project with TypeScript: `npm create vite@latest contact-manager -- --template react-ts`
- [ ] T002 Install core dependencies: `npm install react@18 react-dom@18 react-router-dom redux react-redux @reduxjs/toolkit`
- [ ] T003 Install styling dependencies: `npm install -D tailwindcss postcss autoprefixer` and `npm install @radix-ui/react-slot lucide-react sonner`
- [ ] T004 Install development dependencies: `npm install -D vitest @testing-library/react @testing-library/jest-dom msw`
- [ ] T005 Configure TypeScript strict mode in `tsconfig.json`: Set `"strict": true`, no `any` types allowed
- [ ] T006 Configure path aliases in `tsconfig.json`: Add `@components`, `@services`, `@hooks`, `@types`, `@utils` paths
- [ ] T007 Configure Tailwind CSS: Create `tailwind.config.js` and `postcss.config.js`
- [ ] T008 Configure Vite: Create `vite.config.ts` with React plugin, environment variable handling
- [ ] T009 Set up ESLint: Create `.eslintrc.cjs` with React + TypeScript rules
- [ ] T010 Set up Prettier: Create `.prettierrc` with project formatting standards (semi, singleQuote, printWidth: 100)
- [ ] T011 Create environment configuration: `.env.development.local`, `.env.production.local` with `REACT_APP_API_URL`, `REACT_APP_LOG_LEVEL`
- [ ] T012 Create `.gitignore` to exclude: `.env*.local`, `node_modules/`, `dist/`, `coverage/`
- [ ] T013 Create project directory structure: `src/{components,services,hooks,types,utils,store,data,mocks}`

---

## Phase 2: Foundational Infrastructure

### Goal
Set up Redux store, API client, validation utilities, and testing infrastructure (blocking prerequisites for all user stories).

### Test Criteria
- [ ] Redux store initializes without errors
- [ ] API client makes requests with retry logic (3 attempts)
- [ ] Validation functions work correctly for all field types
- [ ] MSW mocks intercept network requests
- [ ] Test runner (Vitest) executes sample tests

### Tasks

#### Redux Store Setup

- [ ] T014 Create Redux store structure: `src/store/index.ts` exporting configured store with DevTools
- [ ] T015 [P] Create Contact Redux slice: `src/store/contactSlice.ts` with actions (fetchContacts, addContact, updateContact, selectContact, setError, setLoading)
- [ ] T016 [P] Create Cart Redux slice: `src/store/cartSlice.ts` with actions (addItem, removeItem, updateQuantity, clearCart, loadCart)
- [ ] T017 [P] Create Form Redux slice: `src/store/formSlice.ts` with actions (updateFieldValue, setFieldErrors, setDirty, resetForm)
- [ ] T018 [P] Create UI Redux slice: `src/store/uiSlice.ts` with actions (showUnsavedWarning, hideUnsavedWarning, addToast, removeToast)
- [ ] T019 Create Redux selectors: `src/store/selectors.ts` with selectAllContacts, selectContactsLoading, selectCartItems, selectCartTotal, etc.

#### API Client & Services

- [ ] T020 [P] Create centralized API client: `src/services/api.ts` with retry logic (3 attempts, exponential backoff: 1s/2s/4s), 5-second timeout, error transformation
- [ ] T021 [P] Create Contact service: `src/services/contactService.ts` with methods: list(), get(id), create(contact), update(id, contact)
- [ ] T022 [P] Create Cart service: `src/services/cartService.ts` with methods: loadFromStorage(), saveToStorage(cart), clearStorage()
- [ ] T023 [P] Implement API error transformation: Map HTTP status codes to user-friendly messages (400→validation, 404→not found, 500→retry, network→connectivity)

#### Validation & Utilities

- [ ] T024 [P] Create validation utilities: `src/utils/validation.ts` with functions:
  - validateEmail(email): Must contain @ and domain, max 255 chars
  - validateName(name): Non-empty, max 255 chars
  - validatePhone(phone): Digits + separators (-, (, ), +, space), max 20 chars
  - validateContact(contact): All required fields valid
- [ ] T025 [P] Create formatting utilities: `src/utils/formatting.ts` with formatPhoneNumber(), formatCurrency(), formatDate()
- [ ] T026 [P] Create constants file: `src/utils/constants.ts` with CONTACT_RETRY_ATTEMPTS=3, CART_TIMEOUT_MS=5000, API_BASE_URL, etc.

#### Type Definitions

- [ ] T027 [P] Create Contact types: `src/types/Contact.ts` with Contact, ContactAddress, ContactCompany, CreateContactRequest, UpdateContactRequest interfaces
- [ ] T028 [P] Create Product types: `src/types/Product.ts` with Product, ProductCatalog interfaces
- [ ] T029 [P] Create Cart types: `src/types/Cart.ts` with CartItem, Cart, CartSummary interfaces
- [ ] T030 [P] Create API error types: `src/types/Error.ts` with ApiError interface (status, message, code, details, retryable)
- [ ] T031 [P] Create Redux types: `src/types/Redux.ts` with AppState, ContactsState, CartState, FormsState, UiState interfaces

#### Mock Data & Testing Setup

- [ ] T032 [P] Create mock product data: `src/data/products.ts` with at least 5 mock Product objects (id, name, price, image, description)
- [ ] T033 [P] Set up MSW (Mock Service Worker): Create `src/mocks/handlers.ts` with mock handlers for:
  - GET /users (list contacts, return array of 10 mock contacts)
  - GET /users/:id (get single contact or 404)
  - POST /users (create contact, return mock response with ID 101+)
  - PUT /users/:id (update contact, return mock response)
- [ ] T034 [P] Configure Vitest: Create `vitest.config.ts` with React, jsdom, coverage settings (target: 80%)
- [ ] T035 [P] Set up test utilities: Create `src/test/setup.ts` with MSW server setup, render wrapper, custom render function

---

## Phase 3: User Story 1 - Browse & Display Contact List (P1)

### Goal
Users can load and view a list of contacts from JSONPlaceholder API with sorting capability.

### Acceptance Criteria (Independent Test)
- [ ] Contact list loads and displays within 2 seconds
- [ ] At least 10 contacts visible with name, email, phone
- [ ] Contacts can be sorted by name (ascending/descending)
- [ ] No errors in console; all API calls use centralized client
- [ ] Test coverage: 80%+ for components and hooks

### Implementation Tasks

#### Custom Hooks

- [ ] T036 [P] [US1] Create useContacts hook: `src/hooks/useContacts.ts`
  - Dispatches fetchContacts thunk on mount
  - Returns: contacts[], loading, error, refetch()
  - Implements error handling and retry logic
- [ ] T037 [P] [US1] Create useFetch hook: `src/hooks/useFetch.ts` (generic hook for API calls with retry, timeout, error handling)

#### Components

- [ ] T038 [US1] Create ContactList component: `src/components/Contact/ContactList.tsx`
  - Props interface: ContactListProps (contacts: Contact[], loading: boolean, error: string | null, onSelectContact: (id: string) => void)
  - Displays list of contacts with name, email, phone (per REQ-001)
  - Supports sorting by name (ascending/descending toggle button per REQ-001)
  - Renders within 2 seconds of data load (per REQ-001)
  - Shows loading state (spinner) while fetching
  - Shows error message with retry button on failure
  - Each contact is clickable (onClick handler)
- [ ] T039 [P] [US1] Create ContactCard component: `src/components/Contact/ContactCard.tsx`
  - Props: contact: Contact, onSelect: (id: string) => void
  - Displays name, email, phone in card format
  - Clickable to show details
- [ ] T040 [P] [US1] Create LoadingSpinner component: `src/components/Common/LoadingSpinner.tsx`
  - Simple loading state component (spinner animation)
  - Used during API calls
- [ ] T041 [P] [US1] Create ErrorBoundary component: `src/components/Common/ErrorBoundary.tsx`
  - Catches React errors
  - Shows user-friendly error message (not stack traces)
  - Offers reload/retry option

#### Integration & App Setup

- [ ] T042 [US1] Create App component: `src/App.tsx`
  - Initializes Redux store with Redux DevTools
  - Sets up React Router (routes: /contacts, /contact/:id, /shop, /cart)
  - Renders layout with header, navigation, main content area
- [ ] T043 [US1] Create main entry: `src/main.tsx` with ReactDOM.createRoot(App)
- [ ] T044 [US1] Create index.html: Entry point with root div, Tailwind CSS link

#### Tests

- [ ] T045 [P] [US1] Write ContactList component tests: `src/components/Contact/ContactList.test.tsx`
  - Test render with mock contacts
  - Test sort toggle (ascending → descending)
  - Test click handler on contact card
  - Test loading state
  - Test error state with retry
- [ ] T046 [P] [US1] Write useContacts hook tests: `src/hooks/useContacts.test.ts`
  - Test fetch on mount
  - Test error handling and retry
  - Test refetch functionality
- [ ] T047 [P] [US1] Write API client tests: `src/services/api.test.ts`
  - Test retry logic (3 attempts on 500 error)
  - Test timeout handling (5-second timeout)
  - Test error transformation (HTTP status → user message)

---

## Phase 4: User Story 2 - View Contact Details (P1)

### Goal
Users can click a contact to view full details (address, company, website) and navigate back.

### Acceptance Criteria
- [ ] Detail view loads within 1 second of click
- [ ] All fields display: ID, name, email, phone, address, company, website
- [ ] Back button returns to list (navigation < 100ms)
- [ ] No console errors
- [ ] Test coverage: 80%+ for components

### Implementation Tasks

- [ ] T048 [US2] Create ContactDetail component: `src/components/Contact/ContactDetail.tsx`
  - Props: contact: Contact | undefined, loading: boolean, error: string | null, onBack: () => void
  - Displays full contact information (name, email, phone, address, company, website per REQ-002)
  - Has "Back" link to return to list (per REQ-002)
  - Loads within 1 second (per REQ-002)
  - Shows loading spinner while fetching
  - Shows error message on failure
- [ ] T049 [P] [US2] Create ContactDetailPage component: `src/components/Contact/ContactDetailPage.tsx`
  - Handles routing and URL parameter extraction (useParams)
  - Calls useContacts hook to fetch selected contact
  - Renders ContactDetail component
- [ ] T050 [P] [US2] Update App routing: `src/App.tsx`
  - Add route: `/contact/:id` → ContactDetailPage
  - Add onClick handler in ContactList → navigate to /contact/{id}
- [ ] T051 [US2] Write ContactDetail component tests: `src/components/Contact/ContactDetail.test.tsx`
  - Test render with mock contact
  - Test all fields display correctly
  - Test back button navigation
  - Test loading/error states

---

## Phase 5: User Story 3 - Add New Contact Form (P2)

### Goal
Users can submit a form to add new contacts with real-time validation and error feedback.

### Acceptance Criteria
- [ ] Form validation works (email, required fields, phone format per REQ-003)
- [ ] Submit button disabled if form invalid (per REQ-003)
- [ ] Field-level error messages displayed inline (per REQ-016)
- [ ] Unsaved changes show confirmation dialog (per REQ-018)
- [ ] Success message displays for 3+ seconds (per REQ-003)
- [ ] Form clears after successful submission (per REQ-003)
- [ ] Test coverage: 80%+ for components and hooks

### Implementation Tasks

- [ ] T052 [P] [US3] Create ContactForm component: `src/components/Contact/ContactForm.tsx`
  - Props: ContactFormProps (onSubmit: (contact: CreateContactRequest) => Promise<void>, onCancel: () => void)
  - Form fields: name (required, max 255), email (required, valid format, max 255), phone (required, digits+separators, max 20), categories (optional)
  - Real-time validation per field (validateEmail, validateName, validatePhone from utils/validation.ts)
  - Show inline error messages per field (not modal, not as toast per REQ-016)
  - Disable submit button if any required field invalid or form is submitting
  - Submit button label: "Add Contact"
  - Cancel button to close form
  - Show success toast: "Contact added successfully" for 3+ seconds after successful submission
  - Clear form fields after successful submission
  - Show error message if submit fails, allow retry
  - Show confirmation dialog if user tries to navigate away with unsaved changes (per REQ-018)
- [ ] T053 [US3] Create useForm hook: `src/hooks/useForm.ts`
  - Manages form state: values, errors, isDirty, isSubmitting
  - Implements validation on change/blur
  - Dispatches Redux form actions
  - Handles form reset
- [ ] T054 [US3] Create AddContactPage component: `src/components/Contact/AddContactPage.tsx`
  - Renders ContactForm
  - Handles submit: dispatches Redux addContact thunk (POST to /users)
  - Navigates back to contact list on success
  - Shows error message on failure
- [ ] T055 [US3] Update App routing: `src/App.tsx`
  - Add route: `/add-contact` → AddContactPage
  - Add "Add Contact" button to ContactList → navigate to /add-contact
- [ ] T056 [P] [US3] Write ContactForm component tests: `src/components/Contact/ContactForm.test.tsx`
  - Test validation: email required, valid format, etc.
  - Test submit button disabled when invalid
  - Test field error messages display inline
  - Test form clears after successful submit
  - Test unsaved changes warning dialog
  - Test success message appears for 3+ seconds
- [ ] T057 [P] [US3] Write useForm hook tests: `src/hooks/useForm.test.ts`
  - Test form state updates on field change
  - Test validation on blur
  - Test form reset

---

## Phase 6: User Story 4 - Shopping Cart Management (P2)

### Goal
Users can add/remove products, persist cart to localStorage, and view cart summary.

### Acceptance Criteria
- [ ] Cart items persist across page refresh (per REQ-009)
- [ ] Adding item shows success toast (per REQ-007)
- [ ] Removing item removes correct product (per REQ-008)
- [ ] Cart total calculated correctly (per REQ-008)
- [ ] Empty state displays when no items (per REQ-008)
- [ ] Test coverage: 80%+ for components and hooks

### Implementation Tasks

- [ ] T058 [P] [US4] Create useCart hook: `src/hooks/useCart.ts`
  - Load cart from localStorage on mount (per REQ-009)
  - Exposes: items[], addItem(productId, quantity), removeItem(productId), updateQuantity(productId, newQuantity), clearCart()
  - Persists to localStorage on every change (write-through per REQ-009)
  - Handles corrupted localStorage gracefully (reset to empty)
  - Returns cart summary: itemCount, totalPrice, isEmpty
- [ ] T059 [P] [US4] Create ProductList component: `src/components/Shopping/ProductList.tsx`
  - Props: products: Product[], onAddToCart: (productId: string) => void
  - Displays product grid/list with name, price, image, description (per REQ-006)
  - Each product has "Add to Cart" button (per REQ-007)
  - Clickable to show product details (optional)
- [ ] T060 [P] [US4] Create ProductCard component: `src/components/Shopping/ProductCard.tsx`
  - Props: product: Product, onAddToCart: (productId: string) => void
  - Shows product image, name, price, description
  - "Add to Cart" button triggers onAddToCart
- [ ] T061 [P] [US4] Create Cart component: `src/components/Shopping/Cart.tsx`
  - Props: items: CartItem[], loading: boolean, error: string | null, onRemoveItem: (productId: string) => void, onUpdateQuantity: (productId: string, qty: number) => void, onClearCart: () => void
  - Displays cart items with product name, quantity, price, subtotal (per REQ-008)
  - Each item has "Remove" button (per REQ-008)
  - Each item has quantity selector (spinbox or input per REQ-008)
  - Shows empty cart message if no items (per REQ-008)
  - Shows cart total (sum of all item prices × quantity per REQ-008)
  - "Clear Cart" button (requires confirmation)
  - "Checkout" button (placeholder, shows "checkout not implemented" per REQ-010)
- [ ] T062 [P] [US4] Create ShopPage component: `src/components/Shopping/ShopPage.tsx`
  - Renders ProductList from mock data (src/data/products.ts)
  - Handles addToCart: dispatch addItemToCart, show success toast
  - Navigation: Add link to cart page
- [ ] T063 [P] [US4] Create CartPage component: `src/components/Shopping/CartPage.tsx`
  - Renders Cart component
  - Handles removeItem, updateQuantity, clearCart
  - Show error message if operations fail
- [ ] T064 [US4] Update App layout: `src/App.tsx`
  - Add header with cart icon and item count
  - Add routes: `/shop` → ShopPage, `/cart` → CartPage
  - Cart count syncs with Redux state (useSelector)
- [ ] T065 [P] [US4] Write useCart hook tests: `src/hooks/useCart.test.ts`
  - Test load from localStorage on mount
  - Test add item → localStorage persists
  - Test remove item → removes correct product
  - Test quantity update → total recalculated
  - Test clear cart
  - Test corrupted data handling
- [ ] T066 [P] [US4] Write Cart component tests: `src/components/Shopping/Cart.test.tsx`
  - Test render with items
  - Test empty state
  - Test remove button
  - Test quantity update
  - Test clear cart confirmation

---

## Phase 7: User Story 5 - Update Contact (P3)

### Goal
Users can edit existing contact details with the same form validation as add.

### Acceptance Criteria
- [ ] Edit form pre-fills with current contact data
- [ ] Same validation as add form (email, required fields, phone)
- [ ] Success message shows after update (per REQ-004)
- [ ] Unsaved changes warning on navigation (per REQ-018)
- [ ] Test coverage: 80%+

### Implementation Tasks

- [ ] T067 [US5] Create EditContactPage component: `src/components/Contact/EditContactPage.tsx`
  - Fetch contact by ID from Redux
  - Pre-fill ContactForm with current values
  - On submit: dispatch updateContact thunk (PUT to /users/{id})
  - Show success/error messages
  - Navigate back to contact detail on success
- [ ] T068 [US5] Update ContactDetail component: `src/components/Contact/ContactDetail.tsx`
  - Add "Edit" button that navigates to /contact/:id/edit
- [ ] T069 [US5] Update App routing: `src/App.tsx`
  - Add route: `/contact/:id/edit` → EditContactPage
- [ ] T070 [P] [US5] Write EditContactPage tests: `src/components/Contact/EditContactPage.test.tsx`
  - Test form pre-fills with contact data
  - Test validation works same as add form
  - Test submit updates contact

---

## Phase 8: Polish & Cross-Cutting Concerns

### Goal
Complete error handling, accessibility, performance optimization, and ensure 80%+ test coverage.

### Test Criteria
- [ ] All components have 80%+ coverage (critical paths 100%)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Build succeeds and bundle size < 100KB
- [ ] All manual test scenarios pass (per quickstart.md)
- [ ] Accessibility: All interactive elements keyboard navigable

### Tasks

#### Error Handling & User Feedback

- [ ] T071 [P] Implement error boundary: Wrap all routes with ErrorBoundary for unhandled errors
- [ ] T072 [P] Implement toast notifications: Set up Sonner toast library in App component for success/error messages
- [ ] T073 [P] Implement unsaved changes warning: useBlocker hook in ContactForm, show confirmation dialog on navigation
- [ ] T074 [P] Implement retry logic in all components: Show "[Retry]" button on API errors

#### Accessibility & Performance

- [ ] T075 [P] Ensure keyboard navigation: Tab through all interactive elements, test screen reader labels
- [ ] T076 [P] Optimize images: Lazy load product images in ProductList
- [ ] T077 [P] Implement code splitting: React.lazy() for route components (ContactDetail, AddContact, Shop, Cart)
- [ ] T078 [P] Performance monitoring: Log performance metrics (page load time, component render time)

#### Documentation & Code Quality

- [ ] T079 [P] Add JSDoc comments: Document all exported functions, components, hooks with @param, @returns
- [ ] T080 [P] Create component storybook: (Optional) Create Storybook for component documentation
- [ ] T081 [P] Update README: Document setup, running app, testing, build, deployment steps
- [ ] T082 [P] Document Git workflow: Create CONTRIBUTING.md with commit message conventions

#### Final Validation

- [ ] T083 Generate coverage report: Run `npm run test -- --coverage`, verify 80%+ coverage
- [ ] T084 Run all checks: Execute `npm run type-check && npm run lint && npm run build && npm run test`
- [ ] T085 Manual testing: Run quickstart.md validation scenarios (6 scenarios, all pass)
- [ ] T086 Build optimization: Verify production build (check bundle size, gzip compression)

---

## Task Dependencies

### Critical Path (Minimum MVP)

```
T001-T013 (Setup)
    ↓
T014-T035 (Foundational)
    ↓
T036-T047 (US1: Contact List)  ← MVP Stop Point
```

### Full Feature Implementation

```
T001-T013 (Setup)
    ↓
T014-T035 (Foundational)
    ↓
T036-T047 (US1)  +  T048-T051 (US2) ← Can run in parallel after T035
    ↓
T052-T057 (US3)  +  T058-T066 (US4) ← Can run in parallel after T047
    ↓
T067-T070 (US5)
    ↓
T071-T086 (Polish)
```

---

## Parallel Execution by Phase

### Phase 2 Parallel Tasks (After T013)
```
T014-T019  (Redux slices)     [T015, T016, T017, T018 can run in parallel]
T020-T023  (API & Services)   [T020, T021, T022 can run in parallel]
T024-T026  (Utilities)        [T024, T025, T026 can run in parallel]
T027-T031  (Types)            [T027, T028, T029, T030, T031 can run in parallel]
T032-T035  (Mocks & Testing)  [T032, T033, T034, T035 can run in parallel]
```
**Estimated Parallel Time**: ~4-5 hours (vs. ~8-10 hours sequential)

### Phase 3-4 Parallel Tasks (After T035)
```
T036-T047  (US1: Contact List)
    +
T048-T051  (US2: Contact Detail)  ← Can start after T035
```
**Note**: T048-T051 depend on T036 (useContacts hook) but can overlap

### Phase 5-6 Parallel Tasks (After T047)
```
T052-T057  (US3: Add Contact)
    +
T058-T066  (US4: Shopping Cart)   ← Can run independently
```
**Note**: Both use separate Redux slices and components; no dependencies

---

## Effort Estimates

| Phase | Tasks | Effort (hours) | Notes |
|-------|-------|----------------|-------|
| Phase 1: Setup | T001-T013 | 3 | Sequential, mostly config |
| Phase 2: Foundation | T014-T035 | 8 | Highly parallelizable |
| Phase 3: US1 | T036-T047 | 8 | Contact list + tests |
| Phase 4: US2 | T048-T051 | 5 | Depends on US1 hooks |
| Phase 5: US3 | T052-T057 | 8 | Form + validation + tests |
| Phase 6: US4 | T058-T066 | 8 | Cart + persistence + tests |
| Phase 7: US5 | T067-T070 | 5 | Edit form (reuses US3) |
| Phase 8: Polish | T071-T086 | 8 | Error handling, tests, docs |
| **Total** | **52** | **~53 hours** | **~8 weeks (6-7 per week)** |

---

## MVP Scope Recommendation

**Minimum Viable Product (MVP)**: Phase 1-3
- ✅ Project setup and configuration
- ✅ Redux store + API client + utilities
- ✅ Contact list with sorting
- ⏸️ Stop here for MVP validation

**MVP+ (Phase 4)**: Add contact details
- ✅ Click contact to view full details
- ✅ Back navigation

**Full Feature**: All 5 user stories (Phase 5-7) + Polish (Phase 8)

---

## Quality Gates

### Gate 1: Setup Complete (T001-T013)
- [ ] `npm run dev` starts without errors
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes

### Gate 2: Foundation Complete (T014-T035)
- [ ] Redux store initializes
- [ ] API client makes requests with retry
- [ ] All utilities tested and working
- [ ] MSW mocks intercept requests

### Gate 3: US1 Complete (T036-T047)
- [ ] Contact list loads and displays
- [ ] Sorting works
- [ ] Tests pass with 80%+ coverage
- [ ] All manual test scenarios from quickstart.md pass

### Gate 4: US2 Complete (T048-T051)
- [ ] Contact detail view loads within 1 second
- [ ] Back navigation works
- [ ] Tests pass

### Gate 5: Full Feature Complete (T052-T086)
- [ ] All 5 user stories implemented
- [ ] 80%+ test coverage across all code
- [ ] Manual validation scenarios pass (6 scenarios)
- [ ] Build succeeds, bundle < 100KB

---

## Task Checklist Format

Each task follows this strict format:

```
- [ ] [TaskID] [P] [StoryLabel] Description with file path
```

**Example interpretations**:
- `- [ ] T001 Initialize Vite React project...` → Setup task, sequential
- `- [ ] T015 [P] Create Contact Redux slice...` → Foundation task, parallelizable
- `- [ ] T038 [US1] Create ContactList component...` → US1 task, cannot parallelize (component file)
- `- [ ] T036 [P] [US1] Create useContacts hook...` → US1 hook, parallelizable with other hooks

---

**Task Breakdown Version**: 1.0.0  
**Last Updated**: 2026-10-14  
**Next Step**: `/speckit-implement` to execute tasks and build the React application
