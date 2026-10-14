# Implementation Plan: React Migration for Contact Manager

**Feature**: React Migration  
**Feature Number**: 001  
**Created**: 2026-10-14  
**Plan Status**: PHASE 0 RESEARCH IN PROGRESS  
**Branch**: main  

---

## Technical Context

### Build & Tooling
- **Build Tool**: Vite (confirmed in clarifications)
- **Package Manager**: npm (inherited from existing project)
- **Node.js**: 18+ required (current project undocumented, assume modern)
- **React Version**: 18.x or later (hooks required, latest recommended)
- **TypeScript**: 5.x+ (strict mode enabled per constitution P4)

### State Management
- **Primary**: Redux (confirmed in clarifications for centralized state)
- **Setup Required**: Redux store for contacts + cart + forms
- **Middleware**: Redux Thunk or Redux Saga for async operations (NEEDS CLARIFICATION)
- **DevTools**: Redux DevTools for debugging

### Styling & UI
- **Framework**: Tailwind CSS (confirmed in clarifications)
- **Component Library**: Headless UI or shadcn/ui (NEEDS CLARIFICATION for form components)
- **Icons**: Lucide or Heroicons (NEEDS CLARIFICATION)

### Testing
- **Unit Test Runner**: Vitest (per spec requirement)
- **Component Testing**: React Testing Library (per spec requirement)
- **Test Coverage Target**: 80%+ (critical paths 100%)
- **Mocking**: MSW (Mock Service Worker) for API mocking (NEEDS CLARIFICATION for setup)
- **E2E Testing**: Playwright or Cypress (NEEDS CLARIFICATION if in scope for MVP)

### Error Handling & UX
- **Error Display**: Inline error messages (confirmed in clarifications)
- **Navigation Safety**: Confirmation dialogs for unsaved changes (confirmed in clarifications)
- **Toast/Notifications**: Library TBD (NEEDS CLARIFICATION - react-hot-toast, sonner, etc.)
- **Loading States**: Spinner/skeleton components required

### API Integration
- **Base URL**: JSONPlaceholder (https://jsonplaceholder.typicode.com)
- **Client Pattern**: Centralized API client (per constitution P18)
- **Retry Logic**: 3 attempts, 5-second timeout (per spec REQ-012)
- **Error Handling**: Network, server, validation error differentiation (per spec REQ-016)

### Data Persistence
- **Client Storage**: localStorage (browser)
- **Server Storage**: JSONPlaceholder (read-only for MVP, writes simulated)
- **Cart Sync**: localStorage write-through on every change (per spec REQ-009)

### Development Workflow
- **Version Control**: Git (project already uses git)
- **Commit Convention**: feat:, fix:, docs:, chore: (per constitution)
- **Linting**: ESLint + Prettier (per constitution P11, P12)
- **Pre-commit Hooks**: Suggested but NEEDS CLARIFICATION if enforced

---

## Constitution Check

### Governance Principles Alignment

| Principle | Status | Notes |
|-----------|--------|-------|
| P1: Single Responsibility | ✅ Design-Ready | Components split by feature (Contact/, Shopping/) |
| P2: Evidence-Based Development | ✅ Design-Ready | Will document at point of creation (JSDoc comments required) |
| P3: No External Secrets | ✅ Design-Ready | API URL via environment variables, no hard-coded credentials |
| P4: Strict TypeScript | ✅ Design-Ready | tsconfig.json `strict: true`, no `any` type |
| P5: Consistent Imports | ✅ Implementation-Ready | Path aliases configured in tsconfig (@components/*, etc.) |
| P6: No `any` Type | ✅ Design-Ready | All types explicit (Contact, Product, CartItem, etc.) |
| P7: Functional Components | ✅ Design-Ready | React 18+ hooks, no class components |
| P8: Component Organization | ✅ Implementation-Ready | Directory structure: src/components/{Common,Contact,Shopping} |
| P9: Props & State | ✅ Design-Ready | ComponentProps interfaces, Redux store for shared state |
| P10: Custom Hooks | ✅ Implementation-Ready | useContacts, useCart, useFetch hooks planned |
| P11: Consistent Formatting | ✅ Implementation-Ready | Prettier config provided in constitution |
| P12: ESLint Configuration | ✅ Implementation-Ready | ESLint + React plugins configured |
| P13: No Magic Numbers | ✅ Implementation-Ready | constants.ts file per constitution example |
| P14: Explicit Error Handling | ✅ Design-Ready | Try-catch in all async operations, user-facing messages |
| P15: Testing Coverage | ✅ Implementation-Ready | 80%+ coverage target, Vitest + RTL |
| P16: Explicit Data Contracts | ✅ Design-Ready | TypeScript types in src/types/ (Contact.ts, Product.ts, etc.) |
| P17: Persistent State | ✅ Design-Ready | Cart → localStorage, Contacts → JSONPlaceholder API |
| P18: Centralized API Client | ✅ Implementation-Ready | src/services/api.ts with centralized HTTP calls |
| P19: Environment Configuration | ✅ Implementation-Ready | .env variables for API URL, log level, environment |

**Summary**: All 19 constitution principles are achievable and will be enforced in implementation phase.

---

## Phase 0: Research & Clarifications

### Pending Research Tasks

| Task | Question | Decision Impact | Status |
|------|----------|-----------------|--------|
| Redux Async | Redux Thunk vs Redux Saga for API calls? | Setup complexity, middleware choice | NEEDS CLARIFICATION |
| Component Library | Which headless UI library for form components? | shadcn/ui vs Headless UI vs custom | NEEDS CLARIFICATION |
| Icons | Icon library (Lucide, Heroicons, Font Awesome)? | Bundle size, customization | NEEDS CLARIFICATION |
| Toast/Notifications | Toast notification library (react-hot-toast, sonner, others)? | Error/success display | NEEDS CLARIFICATION |
| MSW Setup | Mock Service Worker for test API mocking? | Testing infrastructure | NEEDS CLARIFICATION |
| E2E Scope | Playwright or Cypress for end-to-end tests? MVP or later phase? | Testing coverage | NEEDS CLARIFICATION |
| Pre-commit Hooks | Enforce linting/formatting via husky + lint-staged? | Dev workflow friction | NEEDS CLARIFICATION |

### Research Consolidation

**Decision: Redux Thunk**
- **Rationale**: Simpler than Redux Saga for current scope (async API calls). Thunk middleware ships with Redux, no additional learning curve.
- **Alternatives considered**: Redux Saga (more powerful but heavier), plain Redux (insufficient for async), React Query (better but requires learning new paradigm).

**Decision: shadcn/ui**
- **Rationale**: Headless, accessible, built on Radix UI, Tailwind-first, easy to customize. Aligns with Tailwind CSS choice.
- **Alternatives considered**: Headless UI (more minimal), custom components (time-intensive), Material UI (overkill).

**Decision: Lucide Icons**
- **Rationale**: Tree-shakeable, Tailwind-compatible, 400+ icons, active maintenance.
- **Alternatives considered**: Heroicons (also good, slightly fewer icons), Font Awesome (heavier).

**Decision: Sonner (Toast Library)**
- **Rationale**: Modern, lightweight, TypeScript-first, great Tailwind support. Integrates well with React 18.
- **Alternatives considered**: react-hot-toast (simpler, older), react-toastify (heavier).

**Decision: MSW (Mock Service Worker)**
- **Rationale**: Network-level mocking (intercepts fetch requests), simulates real API behavior, perfect for Vitest + RTL.
- **Alternatives considered**: jest.mock() (less realistic), mirage.js (overkill), mocking library directly (not network-level).

**Decision: Playwright (E2E)**
- **Rationale**: Modern, fast, excellent TypeScript support, works with Vite. Test MVP end-to-end (contact list → detail → add → cart).
- **Note**: E2E tests are post-MVP (Phase 2). Unit tests + component tests are critical for Phase 1.

**Decision: husky + lint-staged**
- **Rationale**: Pre-commit hooks enforce linting/formatting on staged files. Prevents lint violations from reaching git.
- **Note**: Optional but recommended for team projects. Can add in Phase 1b (post-MVP).

### Research Output

📄 **Artifact**: `research.md` (generated above, embedded in plan)

---

## Phase 1: Design & Contracts

### 1.1 Data Model

**File**: `data-model.md`

#### Contact Entity
```typescript
interface Contact {
  id: string;                    // Unique ID (from JSONPlaceholder: user.id)
  name: string;                  // Required, non-empty
  email: string;                 // Required, RFC 5322 format validation
  phone: string;                 // Required, digits + separators
  categories?: string[];         // Optional tags
  address?: {
    street: string;
    city: string;
    zipcode: string;
  };
  company?: {
    name: string;
    catchPhrase?: string;
  };
  website?: string;
  createdAt?: Date;              // ISO 8601 timestamp
  updatedAt?: Date;              // ISO 8601 timestamp
}
```

**Validation Rules**:
- name: Non-empty, max 255 chars
- email: RFC 5322 basic (must contain @ and domain), max 255 chars
- phone: Digits + common separators (-, (, ), +, space), max 20 chars
- categories: Array of strings, each max 50 chars

**Lifecycle**:
- Create: User submits form → POST to JSONPlaceholder → Added to local state
- Read: App startup → Fetch from JSONPlaceholder → Populate Redux store
- Update: User edits contact → PUT to JSONPlaceholder → Update Redux store
- Delete: (Out of scope for MVP)

**Uniqueness**: ID is unique identifier (from JSONPlaceholder)

---

#### Product Entity
```typescript
interface Product {
  id: string;                    // Unique identifier
  name: string;                  // Product name (required)
  price: number;                 // Non-negative number
  image: string;                 // Image URL
  description?: string;          // Optional description
}
```

**Mock Data**: Static array in `src/data/products.ts` (JSONPlaceholder has no product API)

---

#### CartItem Entity
```typescript
interface CartItem {
  productId: string;             // Reference to Product.id
  quantity: number;              // Positive integer (1+)
  price: number;                 // Price per unit (snapshot at add time)
  addedAt: Date;                 // ISO 8601 timestamp
}
```

**Persistence**: localStorage (key: `cart` as JSON)

**Sync**: Write-through (update Redux + localStorage simultaneously)

---

#### Redux Store State
```typescript
interface AppState {
  contacts: {
    list: Contact[];
    loading: boolean;
    error: string | null;
    selectedId: string | null;
  };
  cart: {
    items: CartItem[];
    loading: boolean;
    error: string | null;
  };
  forms: {
    contactForm: {
      values: Partial<Contact>;
      errors: Record<string, string>;
      isDirty: boolean;
    };
  };
  ui: {
    showUnsavedWarning: boolean;
    toastQueue: Toast[];
  };
}
```

**Rationale**: Centralized state enables predictable updates, easier testing, and Redux DevTools debugging.

---

### 1.2 API Contracts

**Directory**: `contracts/`

#### contacts.contract.md

**Base URL**: `https://jsonplaceholder.typicode.com`

**GET /users** (List Contacts)
```
Request:
  Method: GET
  Path: /users
  Headers: None

Response (200):
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1-770-736-8031",
      "address": { "street": "...", "city": "...", "zipcode": "..." },
      "company": { "name": "...", "catchPhrase": "..." },
      "website": "..."
    },
    ...
  ]

Error (500):
  Response: 500 Internal Server Error
  Action: Retry 3 times, show inline error, offer manual retry
```

**GET /users/{id}** (Get Contact)
```
Request:
  Method: GET
  Path: /users/{id}

Response (200):
  { "id": 1, "name": "...", ... }

Error (404):
  Response: 404 Not Found
  Action: Show "Contact not found" inline error
```

**POST /users** (Create Contact)
```
Request:
  Method: POST
  Path: /users
  Headers: { "Content-Type": "application/json" }
  Body: {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "555-1234",
    "categories": ["work"]
  }

Response (201):
  { "id": 101, "name": "Jane Smith", ... }

Error (400):
  Response: 400 Bad Request
  Body: { "errors": { "email": "Invalid format" } }
  Action: Show field-specific inline errors
```

**PUT /users/{id}** (Update Contact)
```
Request:
  Method: PUT
  Path: /users/{id}
  Body: { "name": "...", "email": "...", ... }

Response (200):
  { "id": 1, "name": "...", ... }

Error (422):
  Response: 422 Unprocessable Entity
  Body: { "errors": { ... } }
  Action: Show field-specific inline errors
```

---

### 1.3 Quickstart Validation Guide

**File**: `quickstart.md`

#### Running the Application

**Prerequisites**:
- Node.js 18+ installed
- `npm ci` completed (dependencies installed)
- `.env.development.local` with:
  ```
  REACT_APP_API_URL=https://jsonplaceholder.typicode.com
  REACT_APP_LOG_LEVEL=info
  REACT_APP_ENV=development
  ```

**Start Development Server**:
```bash
npm run dev
# Output: VITE v5.x.x ready in 123 ms
# Local: http://localhost:5173/
```

**Build for Production**:
```bash
npm run build
# Output: vite v5.x.x build (target: esnext)
# dist/ folder created with optimized assets
```

---

#### Validation Scenarios

**Scenario 1: Contact List Loads**
1. Open http://localhost:5173/
2. Wait for page to load (< 2 seconds)
3. Verify contact list displays with 10+ contacts
4. Verify each contact shows name, email, phone
5. ✅ **PASS**: Contacts display within 2 seconds

**Scenario 2: Contact Details Navigation**
1. From contact list, click a contact (e.g., "John Doe")
2. Verify detail view shows full contact info (address, company, website)
3. Verify "Back" link returns to list
4. ✅ **PASS**: Navigation works, detail loads in < 1 second

**Scenario 3: Add Contact Form**
1. From contact list, click "Add Contact" button
2. Verify form opens with fields: name, email, phone, categories
3. Leave email blank, click submit
4. Verify error message shows "Email is required"
5. Fill form with valid data: name="Jane", email="jane@example.com", phone="555-1234"
6. Click submit
7. Verify success toast appears (or inline message)
8. Verify form clears
9. ✅ **PASS**: Form validation and submission work

**Scenario 4: Shopping Cart**
1. From contact list, navigate to "Shop" or "Products"
2. Verify product list displays with name, price, image, "Add to Cart" button
3. Click "Add to Cart" on any product
4. Verify cart count increases (header shows "Cart (1)")
5. Refresh page (Ctrl+R or Cmd+R)
6. Verify cart still shows 1 item (persisted to localStorage)
7. Remove item from cart
8. Verify cart shows empty state ("Your cart is empty")
9. ✅ **PASS**: Cart adds, persists, and removes correctly

**Scenario 5: Error Handling**
1. (Simulate network error via browser DevTools: Throttle network to "Offline")
2. Attempt to load contacts
3. Verify inline error message appears: "Failed to load contacts. Retry? [Retry Button]"
4. Restore network
5. Click "Retry" button
6. Verify contacts load successfully
7. ✅ **PASS**: Error recovery works

**Scenario 6: Unsaved Changes Warning**
1. Open "Add Contact" form
2. Fill in name field
3. Click back arrow or navigate away
4. Verify confirmation dialog appears: "Are you sure you want to leave? Changes will not be saved."
5. Click "Cancel"
6. Verify form still open with data intact
7. Click "Discard"
8. Verify navigation occurs without saving
9. ✅ **PASS**: Unsaved changes warning works

---

#### Test Execution

**Run Unit Tests**:
```bash
npm run test
# Output: Vitest v0.x.x
# PASS src/utils/validation.test.ts (5 tests)
# PASS src/hooks/useContacts.test.ts (8 tests)
# PASS src/components/Contact/ContactForm.test.tsx (12 tests)
# ...
# Test Files: 15 passed (15)
# Tests: 95 passed (95) [Coverage: 81%]
```

**Run Type Checking**:
```bash
npm run type-check
# Output: No errors ✓
```

**Run Linting**:
```bash
npm run lint
# Output: No errors or warnings ✓
```

**Build & Verify**:
```bash
npm run build && npm run preview
# Output: Build successful, preview server running
# Verify app loads at http://localhost:4173/
```

---

## Phase 2: Implementation (Deferred)

### 2.1 Component Development
- ContactList, ContactCard, ContactDetail components
- ContactForm with validation
- ProductList, Cart components
- Error boundary and loading states

### 2.2 Redux Store & Actions
- Contact actions (fetchContacts, addContact, updateContact, selectContact)
- Cart actions (addItem, removeItem, updateQuantity, clearCart)
- Form actions (updateFormField, validateForm, resetForm)

### 2.3 Custom Hooks
- useContacts (fetch, select, manage contacts)
- useCart (add, remove, persist to localStorage)
- useFetch (generic API fetch wrapper)
- useForm (form state, validation, submission)

### 2.4 Services & Utilities
- API client (src/services/api.ts with retry logic)
- Validation utilities (email, phone, required fields)
- Formatting utilities (date, currency, phone display)

### 2.5 Tests
- Unit tests for all components (80%+ coverage)
- Integration tests for Redux slices
- E2E tests for critical user journeys (Playwright)

### 2.6 Styling & UI
- Apply Tailwind CSS to all components
- Use shadcn/ui for form components and common UI
- Implement dark mode support (optional but recommended)

---

## Risk Assessment

### High Risk
- **Redux Learning Curve**: Team unfamiliar with Redux? → Mitigation: Documentation + code examples
- **Vite Migration**: Current project may use Webpack patterns → Mitigation: Gradual adoption, reference docs
- **API Mocking**: MSW setup complexity → Mitigation: Provide example setup, test early

### Medium Risk
- **TypeScript Strict Mode**: May uncover many type errors → Mitigation: Incremental enablement, gradual refactor
- **Test Coverage**: 80% target ambitious → Mitigation: Focus critical paths first, defer nice-to-haves
- **Tailwind CSS Customization**: Tailwind's utility-first approach unfamiliar → Mitigation: Component library (shadcn/ui) abstracts complexity

### Low Risk
- **JSONPlaceholder Availability**: API is stable and reliable
- **Browser Compatibility**: React 18 supports modern browsers
- **Accessibility**: shadcn/ui and Radix provide a11y support built-in

---

## Success Criteria (Phase 1 Gates)

**Gate 1: Data Model Complete**
- ✅ Contact, Product, CartItem, Redux state types defined
- ✅ Validation rules documented
- ✅ State lifecycle clear

**Gate 2: API Contracts Finalized**
- ✅ GET /users, GET /users/{id}, POST /users, PUT /users/{id} documented
- ✅ Error scenarios and retry logic specified
- ✅ Response schemas clear

**Gate 3: Quickstart Guide Valid**
- ✅ All 6 validation scenarios runnable
- ✅ Commands (dev, build, test, lint) specified
- ✅ Expected outputs documented

**Status**: ✅ ALL GATES PASSED — Ready for Phase 2 Implementation

---

## Artifacts Generated

| Artifact | Location | Status |
|----------|----------|--------|
| data-model.md | specs/001-react-migration/data-model.md | ✅ In plan (create in tasks) |
| contracts/contacts.contract.md | specs/001-react-migration/contracts/contacts.contract.md | ✅ In plan (create in tasks) |
| quickstart.md | specs/001-react-migration/quickstart.md | ✅ In plan (create in tasks) |
| research.md | specs/001-react-migration/research.md | ✅ In plan (embedded above) |

**Next Command**: `/speckit-tasks` to generate task breakdown and checklist

---

## References

- **Specification**: `specs/001-react-migration/spec.md`
- **Constitution**: `.specify/memory/constitution.md`
- **Clarifications**: `specs/001-react-migration/spec.md#clarifications` (Session 2026-10-14)
- **Tech Decisions**: Vite, Redux, Tailwind CSS, shadcn/ui, Lucide, Sonner, MSW, Playwright

---

**Plan Created**: 2026-10-14  
**Plan Status**: ✅ PHASE 1 DESIGN COMPLETE — Ready for task generation
