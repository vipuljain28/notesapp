# Specification: React Migration for Contact Manager

**Feature**: React Migration  
**Feature Number**: 001  
**Created**: 2026-10-14  
**Status**: READY FOR PLANNING  

## Executive Summary

Migrate the existing Angular 6 single-page application (contact-manager) to React with full feature parity and improved maintainability. The migration will preserve all user-facing functionality (contact management and shopping cart) while modernizing the architecture with React hooks, TypeScript strict mode, and improved state management.

**Target State**: Functional React application with 100% feature parity to Angular version, 80%+ test coverage, and adherence to the project constitution.

---

## Clarifications

### Session 2026-10-14
- Q: Which build tool should the React migration use? → A: Vite (Recommended) - Faster dev server, instant HMR, optimized builds
- Q: Which state management library should the React app use for complex state (contacts, cart, forms)? → A: Redux (powerful but heavier)
- Q: Which CSS framework should the React app use for styling components? → A: Tailwind CSS (utility-first, recommended for rapid development)
- Q: When an API error occurs, how should the app communicate it to users? → A: Inline error messages (persistent, inline with UI context)
- Q: Should the app warn users when they navigate away with unsaved changes? → A: Yes - show confirmation dialog to prevent accidental data loss

---

## User Scenarios & Acceptance Scenarios

### Primary User Workflows

#### Scenario 1: Browse and Manage Contacts
**Actor**: End user  
**Current State** (Angular): User opens app and sees list of contacts fetched from JSONPlaceholder API

**Desired Behavior** (React):
1. User opens React app in browser
2. App displays list of contacts loaded from JSONPlaceholder (read-only)
3. User can view contact details by clicking on a contact
4. User can navigate between contact list and detail views
5. App persists cart state even after page refresh

**Acceptance**:
- Contact list renders within 2 seconds of page load
- User can click any contact to view its details
- Navigation between views is instantaneous (< 100ms)
- Cart state persists across browser refresh

#### Scenario 2: Add New Contact
**Actor**: End user  
**Current State** (Angular): Form exists but has validation bugs (doesn't enforce)

**Desired Behavior** (React):
1. User clicks "Add Contact" button
2. Modal or form opens with fields: name, email, phone, categories
3. Form validates input in real-time
4. User cannot submit invalid form (button disabled)
5. On submit, contact is sent to JSONPlaceholder API (via centralized client)
6. Form clears and success message appears
7. New contact appears in list (if API returns it)

**Acceptance**:
- Form validation works correctly (email format, required fields)
- Invalid form submission is prevented (button disabled)
- Error messages are clear and helpful
- Success confirmation displays for 3+ seconds

#### Scenario 3: Shopping Cart Persistence
**Actor**: End user  
**Current State** (Angular): Cart data is in-memory only; lost on refresh

**Desired Behavior** (React):
1. User adds products to cart
2. User navigates or refreshes page
3. Cart contents persist (stored in localStorage)
4. User can remove items from cart
5. Cart state updates correctly when items removed

**Acceptance**:
- Cart data persists across page refresh
- Cart removal works correctly (removes correct item)
- Cart state reflects all user actions
- Empty cart state handled gracefully

### Testing Workflows

#### Test Scenario 1: Component Rendering
- Verify ContactList renders without errors
- Verify ContactForm renders with empty fields
- Verify Cart displays correct number of items

#### Test Scenario 2: API Integration
- Mock JSONPlaceholder responses
- Verify API calls use centralized client
- Verify error responses are handled gracefully

#### Test Scenario 3: State Persistence
- Verify cart state saves to localStorage on change
- Verify cart state loads from localStorage on mount
- Verify state survives browser refresh

---

## Functional Requirements

### Feature Set 1: Contact Management

**REQ-001: Display Contact List**
- System MUST fetch contacts from JSONPlaceholder `/users` endpoint
- System MUST display contacts in a list format with name, email, phone visible
- System MUST display contacts within 2 seconds of app load
- Contact list MUST be sortable by name (ascending/descending)

**REQ-002: View Contact Details**
- System MUST allow user to click a contact to view full details
- System MUST display fields: ID, name, email, phone, address, company, website
- System MUST have a "Back" link to return to list
- Contact details MUST load within 1 second of click

**REQ-003: Add New Contact**
- System MUST provide form with fields: name (required), email (required), phone (required), categories (optional)
- System MUST validate email format (must contain @ and domain)
- System MUST prevent form submission if required fields are empty or invalid
- System MUST show error messages for invalid fields in real-time
- System MUST send POST request to JSONPlaceholder `/users` endpoint
- System MUST handle API errors gracefully (display user-friendly message)
- System MUST clear form after successful submission
- System MUST show success confirmation for at least 3 seconds

**REQ-004: Update Contact**
- System MUST allow user to edit contact details (name, email, phone, categories)
- System MUST send PUT request to JSONPlaceholder `/users/{id}` endpoint
- System MUST prevent invalid data submission (validate before send)
- System MUST handle update errors gracefully

**REQ-005: Input Validation**
- System MUST validate email format (RFC 5322 basic pattern: must contain @ and domain)
- System MUST validate required fields (non-empty strings)
- System MUST validate phone format (digits and common separators only)
- System MUST display validation errors in real-time as user types
- System MUST disable submit button if form is invalid

### Feature Set 2: Shopping Cart

**REQ-006: Display Products**
- System MUST display mock product list with name, price, and image
- System MUST display "Add to Cart" button for each product
- Products MUST be organized in a grid or list layout

**REQ-007: Add Items to Cart**
- System MUST allow user to add products to cart
- System MUST update cart count immediately on add
- System MUST show add confirmation (toast or inline message)

**REQ-008: Manage Cart Items**
- System MUST display all items in cart with quantity, price, and total
- System MUST allow user to remove items from cart
- System MUST allow user to change item quantity
- System MUST show empty cart message if no items present
- System MUST display cart total (sum of all item prices)

**REQ-009: Cart Persistence**
- System MUST save cart state to browser localStorage when cart changes
- System MUST load cart state from localStorage on app mount
- System MUST clear cart from localStorage only when user explicitly clears it
- System MUST handle corrupted localStorage data gracefully (reset to empty)

**REQ-010: Checkout (Placeholder)**
- System MUST provide placeholder checkout interface
- System MUST show order summary with all items and total
- System MUST accept submission but indicate "checkout not implemented"

### Feature Set 3: Architecture & Code Quality

**REQ-011: TypeScript Configuration**
- System MUST use TypeScript in strict mode (`"strict": true`)
- System MUST prohibit use of `any` type in production code
- All components and services MUST have explicit type annotations

**REQ-012: API Client Centralization**
- System MUST use single centralized API client (`src/services/api.ts`)
- No component MUST make direct `fetch()` calls
- API client MUST include retry logic for failed requests (3 attempts)
- API client MUST include timeout handling (5-second default)

**REQ-013: Component Structure**
- System MUST use functional components only (no class components)
- System MUST use React hooks for state management (useState, useEffect, useCallback)
- Complex state logic MUST be extracted into custom hooks
- Props MUST be defined with explicit TypeScript interfaces

**REQ-014: Code Organization**
- Code MUST follow directory structure: `src/components/`, `src/services/`, `src/hooks/`, `src/types/`, `src/utils/`
- Components MUST be organized by feature (Contact/, Shopping/)
- File naming MUST follow conventions: PascalCase for components, camelCase for utilities

**REQ-015: Testing Requirements**
- Minimum 80% line coverage for all components and utilities
- All user scenarios MUST have corresponding test cases
- API mocking MUST be used in tests (no live API calls)
- Tests MUST use Vitest + React Testing Library

**REQ-016: Error Handling**
- System MUST catch and log all errors
- System MUST display user-friendly error messages (not stack traces) using **inline error messages** (persistent, contextual UI integration)
- API errors MUST indicate cause (network, server, validation) with actionable guidance
- Failed requests MUST have retry option
- Form submission MUST warn user via **confirmation dialog** if they try to navigate away with unsaved changes

**REQ-018: Navigation Safety**
- System MUST display confirmation dialog when user attempts to navigate away from forms/cart with unsaved changes
- Dialog MUST ask "Are you sure you want to leave? Changes will not be saved."
- User MUST be able to discard changes (proceed) or return to form (cancel)
- Cart auto-saves to localStorage, so warnings apply mainly to forms

**REQ-019: Environment Configuration**
- System MUST read API base URL from environment variable (`REACT_APP_API_URL`)
- System MUST support different configs for development and production
- Sensitive data MUST NOT be committed to repository

---

## Success Criteria

### Functional Success Metrics
1. **Feature Parity**: All Angular features (contact list, detail, add, cart) work identically in React
2. **Performance**: Initial page load completes within 2 seconds (with empty cache)
3. **Form Validation**: 100% of form validations work correctly (email, required fields, phone)
4. **API Integration**: All API calls route through centralized client with retry logic
5. **State Persistence**: Cart survives browser refresh and retains all items
6. **Error Handling**: All error scenarios display user-friendly messages

### Code Quality Metrics
1. **Test Coverage**: 80%+ line coverage (critical paths 100%)
2. **Type Safety**: Zero `any` types in production code
3. **Linting**: 100% ESLint compliance (no warnings or errors)
4. **Formatting**: 100% Prettier compliance (consistent formatting)
5. **Accessibility**: All interactive elements keyboard navigable

### User Experience Metrics
1. **Load Time**: App loads and displays contacts within 2 seconds
2. **Response Time**: UI responds to all user actions within 100ms
3. **Form Completion**: Add contact form completes in < 2 minutes for typical user
4. **Error Recovery**: Users can recover from any error without app restart

### Governance Metrics
1. **Constitution Adherence**: Code passes all 19 constitution principles
2. **Documentation**: All components, hooks, and services have JSDoc comments
3. **Git History**: Commit messages follow convention (feat:, fix:, docs:, etc.)

---

## Key Entities & Data Models

### Contact
```
{
  id: string                    // Unique identifier
  name: string                  // Contact name (required, non-empty)
  email: string                 // Email address (required, valid format)
  phone: string                 // Phone number (required, digits/separators only)
  categories?: string[]         // Optional tags (e.g., "work", "personal", "family")
  address?: {
    street: string
    city: string
    zipcode: string
  }
  company?: {
    name: string
    catchPhrase?: string
  }
  website?: string
  createdAt?: Date              // ISO 8601 timestamp
  updatedAt?: Date              // ISO 8601 timestamp
}
```

### Product
```
{
  id: string                    // Unique identifier
  name: string                  // Product name
  price: number                 // Price in dollars (non-negative)
  image: string                 // Image URL
  description?: string          // Optional product description
}
```

### CartItem
```
{
  productId: string             // Reference to Product.id
  quantity: number              // Number of items (positive integer)
  price: number                 // Price per unit at time of add
  addedAt: Date                 // When item was added
}
```

### APIError
```
{
  status?: number               // HTTP status code (if applicable)
  message: string               // Error description for user
  code?: string                 // Machine-readable error code (e.g., "VALIDATION_ERROR")
  details?: Record<string, any> // Field-specific errors (e.g., { email: "Invalid format" })
  retryable: boolean            // Whether user should retry
}
```

---

## Assumptions

### Project Assumptions
1. **API Availability**: JSONPlaceholder API is available and stable (no uptime SLA needed)
2. **Browser Support**: Target modern browsers (Chrome, Firefox, Safari, Edge - current versions)
3. **Build Tool**: Assume Vite or Create React App (not specified; will be clarified in plan phase)
4. **State Management**: Initial implementation uses React Context or lightweight library (Redux/Zustand not required unless complex state needed)
5. **Styling**: Assume CSS Modules or Tailwind CSS (framework TBD in planning)

### Functional Assumptions
1. **Contact Source**: JSONPlaceholder `/users` endpoint is the source of truth (read-only for initial version)
2. **Cart Storage**: Browser localStorage sufficient for cart persistence (no server sync needed)
3. **No Authentication**: No user login required for MVP (placeholder guard returns true)
4. **No Real Payments**: Checkout is placeholder only (no payment processing)
5. **Product Data**: Mock product list sufficient (no real product API needed)

### Technical Assumptions
1. **TypeScript Version**: Use TypeScript 5.x or later
2. **React Version**: Use React 18.x or later (hooks are standard)
3. **Node.js**: Assume Node.js 18+ for development
4. **Package Manager**: Use npm or yarn (consistent with original project)
5. **Testing Framework**: Vitest for unit tests, React Testing Library for component tests

### Data Assumptions
1. **Contact Categories**: Optional multi-select field (not required for MVP)
2. **Cart Limits**: No limits on cart size or item quantity (placeholder checkout)
3. **Data Retention**: Cart persists until explicitly cleared (no automatic expiration)
4. **Offline Support**: Not required for MVP (localStorage provides basic persistence)

---

## Scope & Boundaries

### In Scope
✅ Contact list view (read-only, from JSONPlaceholder)  
✅ Contact details view  
✅ Add contact form with validation  
✅ Update contact form  
✅ Shopping cart (add, remove, persist to localStorage)  
✅ TypeScript strict mode implementation  
✅ 80%+ test coverage  
✅ Centralized API client with retry logic  
✅ Functional components with React hooks  
✅ Adherence to 19 constitution principles  

### Out of Scope
❌ Real authentication system (placeholder only)  
❌ Real payment processing  
❌ Real product database (mock data only)  
❌ Offline-first PWA (localStorage persistence only)  
❌ Mobile app (web only)  
❌ Advanced filtering/search (sorting only)  
❌ Real-time updates (no WebSockets)  
❌ Internationalization (English only)  
❌ Analytics/tracking  
❌ Admin dashboard  

---

## Dependencies & Integration Points

### External Dependencies
- **JSONPlaceholder API** (`/users` endpoint) — Contact data source
- **Mock Product Data** — Static array or fixture (no API needed)

### Internal Dependencies
- **Constitution** (`.specify/memory/constitution.md`) — 19 principles governing development
- **Spec Kit Skills** — `/speckit-plan`, `/speckit-tasks`, `/speckit-implement` for execution

### Environment Configuration
```bash
REACT_APP_API_URL=https://jsonplaceholder.typicode.com
REACT_APP_LOG_LEVEL=info
REACT_APP_ENV=development
```

### Tech Stack (Confirmed)
- **Build**: Vite (fast dev server, instant HMR, optimized production builds)
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier
- **State Management**: Redux (for centralized state management of contacts, cart, and forms)
- **Styling**: Tailwind CSS (utility-first, rapid component development)
- **Error Display**: Inline error messages (persistent, contextual, user-friendly)
- **Navigation Safety**: Unsaved changes warning (confirmation dialog before navigation away from forms/cart)

---

## Known Constraints

### Current Angular Implementation Issues
1. **Form Validation Bug**: Add contact form doesn't enforce validation (submit works with invalid data)
2. **Cart Persistence Bug**: Cart data lost on page refresh (in-memory only)
3. **Cart Removal Bug**: Removing items can delete wrong item due to type coercion
4. **Hard-Coded URL**: API URL is hard-coded in service (not configurable)
5. **No Error Handling**: Minimal error handling for API failures
6. **Missing E2E Tests**: Only 1 Protractor test suite exists

### React Migration Constraints
1. **API Behavior**: JSONPlaceholder API may not persist data (testing only)
2. **Product Data**: No real product API available (must use mock data)
3. **Browser Storage**: localStorage may be disabled in some environments
4. **No Server State**: Cart is client-only (no user accounts/sync)

---

## Success Definition

The React migration is **COMPLETE & SUCCESSFUL** when:

1. ✅ All Angular features work identically in React (contact list, details, add, cart)
2. ✅ App loads and displays contacts in < 2 seconds
3. ✅ Form validation works correctly (email, required fields, phone)
4. ✅ Cart persists across browser refresh
5. ✅ Cart removal removes the correct item (bug fixed)
6. ✅ All API calls go through centralized client
7. ✅ 80%+ test coverage achieved (critical paths 100%)
8. ✅ TypeScript strict mode enabled, zero `any` types
9. ✅ All code passes ESLint + Prettier checks
10. ✅ All 19 constitution principles are followed
11. ✅ User can recover from any error without app restart
12. ✅ Documentation complete (components, hooks, services)
13. ✅ Git commit history clean and well-documented

---

## Next Steps

1. **Use `/speckit-clarify`** (if needed) to resolve any ambiguities
2. **Use `/speckit-plan`** to create implementation strategy
3. **Use `/speckit-tasks`** to generate work breakdown
4. **Use `/speckit-implement`** to build the React application
