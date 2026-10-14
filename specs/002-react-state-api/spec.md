# Specification: State Management and API Integration Layer

**Feature**: React State Management and API Integration  
**Feature Number**: 002  
**Created**: 2026-10-14  
**Status**: READY FOR PLANNING  

## Executive Summary

Establish a robust, centralized state management and API integration layer for the React contact-manager application. This feature defines how data flows through the application, how API calls are made, and how state is managed across components. The implementation will follow the project constitution principles while providing a scalable foundation for future features.

**Target State**: Production-ready API client with centralized data fetching, custom hooks for business logic, and predictable state management patterns.

---

## User Scenarios & Acceptance Scenarios

### Primary User Workflows

#### Scenario 1: API Call with Automatic Retry
**Actor**: End user (implicit - via contact list load)  
**Current State** (Angular): No retry logic; failed API calls show generic error

**Desired Behavior** (React):
1. User opens contact-manager in browser
2. App attempts to fetch contacts from JSONPlaceholder API
3. If network fails or server returns 5xx error, app retries automatically (up to 3 times)
4. Retry waits 1 second between attempts (exponential backoff: 1s, 2s, 4s)
5. If all retries fail, user sees clear error message with option to retry manually
6. If successful, list displays contacts

**Acceptance**:
- API calls are attempted up to 3 times on failure
- Each retry is visible in browser console (debug logs)
- User-facing error message is clear and actionable
- Manual retry button appears after all attempts fail
- Successful response shows immediately

#### Scenario 2: Contact Data Persists Across Navigation
**Actor**: End user  
**Current State** (Angular): Contact list fetched fresh on every navigation

**Desired Behavior** (React):
1. User loads contact list (API call made, data cached)
2. User clicks contact to view details
3. User navigates back to list
4. List displays immediately (cached data, no new API call)
5. If user manually refreshes page, fresh data fetches

**Acceptance**:
- Contact list uses cached data when available
- Browser DevTools Network tab shows zero new requests on back navigation
- Manual refresh triggers new API call
- Cache invalidation strategy is clear (time-based or explicit)

#### Scenario 3: Cart State Persists Without Network
**Actor**: End user  
**Current State** (Angular): Cart only in memory; lost on refresh

**Desired Behavior** (React):
1. User adds products to cart
2. Cart state saved to localStorage immediately
3. User closes browser and opens app later
4. Cart contains all previous items
5. Removing items updates both memory and localStorage
6. Cart state survives network disconnection

**Acceptance**:
- Cart state persists to localStorage on every change
- localStorage and memory state always synchronized
- localStorage handles corrupted data (graceful fallback)
- Cart works offline (no network requests needed)

#### Scenario 4: Error Handling for Network Failures
**Actor**: End user  
**Current State** (Angular): Minimal error handling; cryptic errors shown

**Desired Behavior** (React):
1. User has no network connection
2. App attempts to fetch contacts
3. User sees clear error message (e.g., "No internet connection. Please check your network and try again.")
4. User can click "Retry" to attempt again
5. Once network restored and retry clicked, data loads successfully

**Acceptance**:
- Error messages are user-friendly (not stack traces)
- Error type is identified (network, server, timeout, validation)
- Retry mechanism is available for all transient errors
- Non-retryable errors (4xx) show different messaging

### Testing Workflows

#### Test Scenario 1: API Client Retry Logic
- Mock fetch to fail 2 times, succeed 3rd time
- Verify 3 requests made
- Verify exponential backoff timing (1s, 2s, 4s)
- Verify result contains successful response

#### Test Scenario 2: State Persistence
- Add contact to state
- Save to localStorage
- Create new instance of hook
- Verify state loaded from localStorage
- Verify state changes persist

#### Test Scenario 3: Cache Invalidation
- Fetch contacts (cached)
- Verify no new request on second fetch
- Invalidate cache (manual or time-based)
- Verify new request made on third fetch

#### Test Scenario 4: Error Recovery
- Mock API to return 500 error
- Verify error is caught and logged
- Verify user sees error message
- Mock recovery (API now returns success)
- Verify retry works

---

## Functional Requirements

### Feature Set 1: Centralized API Client

**REQ-001: API Client Structure**
- System MUST provide single API client module at `src/services/api.ts`
- API client MUST export named methods for each endpoint (contacts.list, contacts.get, contacts.create, contacts.update)
- API client MUST NOT be imported directly by components (use custom hooks instead)
- API client MUST use TypeScript with explicit request and response types

**REQ-002: Request Configuration**
- System MUST read API base URL from environment variable `REACT_APP_API_URL`
- System MUST set timeout to 5 seconds (configurable)
- System MUST include standard headers: `Content-Type: application/json`, `Accept: application/json`
- System MUST support authentication headers (for future use) via optional config

**REQ-003: Response Handling**
- System MUST parse JSON responses
- System MUST return typed response objects (not raw fetch Response)
- System MUST validate HTTP status codes (consider 2xx success, others error)
- System MUST handle non-JSON responses gracefully (log warning, treat as error)

**REQ-004: Error Handling**
- System MUST catch all errors (network, timeout, parse, API)
- System MUST normalize errors to APIError type (status, message, code, details, retryable)
- System MUST log errors with context (method, URL, attempt number)
- System MUST classify errors by type (NETWORK, TIMEOUT, SERVER_ERROR, VALIDATION_ERROR, UNKNOWN)

**REQ-005: Retry Logic**
- System MUST retry failed requests up to 3 times (configurable)
- System MUST apply exponential backoff: 1 second, 2 seconds, 4 seconds (base * 2^attempt)
- System MUST NOT retry non-retryable errors (4xx status codes)
- System MUST log each retry attempt with attempt number
- System MUST honor `Retry-After` header if present

**REQ-006: Request/Response Logging**
- System MUST log all requests in development mode (method, URL, duration)
- System MUST log all responses (status, time taken)
- System MUST NOT log sensitive data (passwords, tokens)
- System MUST include log level configuration (debug, info, warn, error)

### Feature Set 2: State Management Hooks

**REQ-007: useContacts Hook**
- System MUST provide custom hook `useContacts()` at `src/hooks/useContacts.ts`
- Hook MUST return object: { contacts, loading, error, refetch, addContact, updateContact }
- Hook MUST fetch contacts on mount using API client
- Hook MUST cache results (no refetch on component remount)
- Hook MUST provide refetch() function to manually refresh
- Hook MUST handle loading state (true while fetching, false otherwise)
- Hook MUST handle error state (error object if failed, null if none)

**REQ-008: useCart Hook**
- System MUST provide custom hook `useCart()` at `src/hooks/useCart.ts`
- Hook MUST return object: { items, total, addItem, removeItem, updateQuantity, clearCart }
- Hook MUST persist cart to localStorage on every change
- Hook MUST load cart from localStorage on mount
- Hook MUST handle corrupted localStorage data (reset to empty array)
- Hook MUST calculate total automatically (sum of item prices * quantities)
- Hook MUST validate item operations (quantity > 0, valid product)

**REQ-009: useFetch Hook (Generic)**
- System MUST provide reusable `useFetch<T>(url: string, options?: FetchOptions)` hook
- Hook MUST handle loading, data, and error states generically
- Hook MUST support manual refetch
- Hook MUST support dependency array for re-fetching on change
- Hook MUST apply API client configuration (timeout, retry, logging)
- Hook MUST accept optional transformation function to process data

**REQ-010: useLocalStorage Hook (Utility)**
- System MUST provide utility hook `useLocalStorage<T>(key: string, initialValue?: T)`
- Hook MUST read/write from localStorage
- Hook MUST handle JSON serialization/deserialization
- Hook MUST sync between multiple component instances (same tab)
- Hook MUST handle storage quota errors gracefully
- Hook MUST support removal via setValue(null)

### Feature Set 3: Data Type Definitions

**REQ-011: API Response Types**
- System MUST define TypeScript interfaces for all API responses
- Types MUST include Contact, CreateContactRequest, ContactApiResponse, Product, CartItem
- Types MUST document field requirements (required vs optional, validation rules)
- Types MUST be exported from `src/types/` directory
- Types MUST match actual API response structure (e.g., JSONPlaceholder uses `id` not `_id`)

**REQ-012: Error Types**
- System MUST define APIError type with fields: status?, message, code?, details?, retryable
- System MUST define ErrorCode enum: NETWORK, TIMEOUT, SERVER_ERROR, VALIDATION_ERROR, UNKNOWN
- System MUST provide error type guards (e.g., isNetworkError, isRetryableError)
- Types MUST be exhaustive (cover all error scenarios)

**REQ-013: API Service Types**
- System MUST define types for API client configuration (timeout, retries, baseUrl)
- System MUST define types for hook options and return values
- Types MUST be documented with JSDoc comments
- Types MUST prevent invalid configurations at compile time

### Feature Set 4: State Synchronization

**REQ-014: Memory ↔ localStorage Sync**
- System MUST keep in-memory state and localStorage always synchronized
- System MUST write to localStorage immediately on state change (synchronous)
- System MUST load from localStorage on app mount (before any renders)
- System MUST handle localStorage not available (quota exceeded, disabled)
- System MUST log sync operations in debug mode

**REQ-015: API ↔ Memory Cache Sync**
- System MUST cache API responses in memory after successful fetch
- System MUST invalidate cache after 5 minutes (configurable TTL)
- System MUST provide manual cache invalidation (refetch function)
- System MUST handle partial updates (adding contact doesn't require refetch of list)
- System MUST log cache operations in debug mode

**REQ-016: State Consistency Validation**
- System MUST validate that memory and localStorage always match
- System MUST detect sync failures and log warnings
- System MUST provide recovery mechanism (reload from localStorage if mismatch detected)
- System MUST prevent invalid state transitions (e.g., negative quantities)

### Feature Set 5: Configuration and Environment

**REQ-017: Environment Variables**
- System MUST support configuration via `.env` files (development, staging, production)
- System MUST read and validate environment variables on app startup
- Required variables: REACT_APP_API_URL, REACT_APP_LOG_LEVEL
- Optional variables: REACT_APP_API_TIMEOUT, REACT_APP_CACHE_TTL, REACT_APP_MAX_RETRIES
- System MUST throw error if required variables missing (fail fast)

**REQ-018: Configuration Management**
- System MUST provide central config module at `src/config/index.ts`
- Config MUST include API settings, cache settings, retry settings, logging settings
- Config MUST be read-only after initialization
- Config MUST be typed and validated on load

**REQ-019: Development Utilities**
- System MUST provide debug logging (console.log in dev mode, silent in prod)
- System MUST provide performance logging (API call duration)
- System MUST provide state inspection utilities (print current state)
- System MUST NOT expose debug info in production build

---

## Success Criteria

### Functional Success Metrics
1. **API Reliability**: All API calls retry automatically up to 3 times with exponential backoff
2. **State Persistence**: Cart data persists across page refresh and browser close/open
3. **Error Recovery**: All transient errors trigger automatic retry; user can manually retry permanent errors
4. **Cache Efficiency**: Contact list loads from cache on navigation (zero API calls for repeated access)
5. **Type Safety**: Zero `any` types in state management code; all state changes type-checked

### Performance Metrics
1. **API Timeout**: All requests timeout after 5 seconds (configurable)
2. **Retry Backoff**: Retries use exponential backoff (1s, 2s, 4s) to avoid thundering herd
3. **Cache Hit Rate**: 100% of repeated contact list requests hit cache (no network calls)
4. **Storage Performance**: localStorage writes complete in < 10ms

### Code Quality Metrics
1. **Test Coverage**: All hooks and API client have 85%+ coverage
2. **Type Completeness**: All state variables have explicit types; no `any` types
3. **Error Handling**: All error paths tested and validated
4. **Documentation**: All hooks and services have JSDoc comments with examples

### Governance Metrics
1. **Constitution Adherence**: Follows P4 (Strict TypeScript), P5 (Consistent Imports), P10 (Custom Hooks), P14 (Error Handling), P16 (Data Contracts), P18 (Centralized API), P19 (Environment Config)
2. **Code Organization**: All files in correct directories; consistent naming conventions
3. **Logging Quality**: Debug logs provide clear context without verbosity

---

## Key Entities & Data Models

### APIError
```typescript
interface APIError {
  status?: number                // HTTP status code (if applicable)
  message: string                // User-facing error message
  code?: ErrorCode               // Machine-readable error code
  details?: Record<string, any>  // Field-specific or context details
  retryable: boolean             // Whether operation should be retried
  originalError?: Error          // Original error for debugging
  timestamp?: Date               // When error occurred
}

enum ErrorCode {
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT = "TIMEOUT",
  SERVER_ERROR = "SERVER_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNKNOWN = "UNKNOWN",
}
```

### APIClientConfig
```typescript
interface APIClientConfig {
  baseUrl: string                // Base URL for all requests
  timeout: number                // Request timeout in milliseconds (default 5000)
  retries: number                // Max retry attempts (default 3)
  retryDelay: number             // Initial retry delay in milliseconds (default 1000)
  logLevel: "debug" | "info" | "warn" | "error"  // Logging verbosity
  headers?: Record<string, string>  // Custom headers
}
```

### Contact (Application Type)
```typescript
interface Contact {
  id: string
  name: string
  email: string
  phone: string
  categories?: string[]
  address?: Address
  company?: Company
  website?: string
}

interface CreateContactRequest {
  name: string
  email: string
  phone: string
  categories?: string[]
}
```

### CartState
```typescript
interface CartItem {
  productId: string
  quantity: number
  price: number
  name: string
  addedAt: Date
}

interface CartState {
  items: CartItem[]
  lastUpdated: Date
}
```

### useContacts Hook Return
```typescript
interface UseContactsReturn {
  contacts: Contact[]
  loading: boolean
  error: APIError | null
  refetch: () => Promise<void>
  addContact: (contact: CreateContactRequest) => Promise<Contact>
  updateContact: (id: string, contact: Partial<Contact>) => Promise<Contact>
}
```

### useCart Hook Return
```typescript
interface UseCartReturn {
  items: CartItem[]
  total: number
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}
```

---

## Assumptions

### Architecture Assumptions
1. **Hooks-Based State**: React hooks (useState, useEffect, useCallback) sufficient for state management (no Redux needed initially)
2. **Single Source of Truth**: Memory state is canonical; localStorage is persistence layer only
3. **No GraphQL**: REST API only (JSONPlaceholder is REST)
4. **No Real-Time**: No WebSockets or server-push updates needed
5. **No Middleware**: Simple fetch-based HTTP; no axios or similar needed (keep dependencies minimal)

### API Assumptions
1. **JSONPlaceholder Behavior**: JSONPlaceholder API accepts POST/PUT requests but doesn't persist (testing only)
2. **Response Format**: All responses are JSON; no XML or other formats
3. **CORS**: JSONPlaceholder allows cross-origin requests from browser
4. **Rate Limiting**: No rate limiting enforcement in JSONPlaceholder (no token bucket needed)

### Storage Assumptions
1. **localStorage Available**: Assume localStorage is available; fail gracefully if not
2. **Storage Quota**: Assume 5-10MB available per origin (sufficient for cart data)
3. **No Cross-Origin Storage**: Cart persists per-origin (no cross-domain sharing)
4. **Data Expiration**: No automatic cleanup (app startup loads all stored data)

### Performance Assumptions
1. **Network Latency**: Typical network round-trip 200ms; retry backoff accommodates this
2. **API Response Time**: JSONPlaceholder responds in < 1 second
3. **Browser Performance**: Modern browsers (V8, SpiderMonkey) sufficient for in-memory caching
4. **Cache TTL**: 5-minute cache invalidation acceptable for contact data

### Error Assumptions
1. **Transient Errors**: Network errors are temporary; retry likely succeeds
2. **4xx Errors**: Validation or permission errors (don't retry)
3. **5xx Errors**: Server errors (retry with backoff)
4. **Offline**: No network → network error (retry when online)

---

## Scope & Boundaries

### In Scope
✅ Centralized API client with retry logic and error handling  
✅ Custom hooks for contacts and cart (useContacts, useCart, useFetch, useLocalStorage)  
✅ Complete TypeScript types for API and state  
✅ localStorage persistence for cart  
✅ Memory caching for API responses  
✅ Exponential backoff retry strategy  
✅ Error classification and user-friendly messaging  
✅ Configuration management via environment variables  
✅ Debug logging utilities  
✅ Comprehensive test suite (85%+ coverage)  

### Out of Scope
❌ Advanced state management (Redux, Zustand, Jotai - kept simple for now)  
❌ GraphQL or other query languages  
❌ WebSocket real-time updates  
❌ Service workers or offline-first PWA  
❌ API authentication/authorization (reserved for future)  
❌ Rate limiting or quota enforcement  
❌ Data synchronization across browser tabs (single-tab only)  
❌ Analytics or error tracking (Sentry, etc.)  
❌ API documentation generation  

---

## Dependencies & Integration Points

### External Dependencies
- **fetch API** (built-in browser API, no npm package)
- **TypeScript** (for type definitions)
- **JSONPlaceholder API** (endpoint: https://jsonplaceholder.typicode.com)

### Internal Dependencies
- **Constitution** (`.specify/memory/constitution.md`) — Principles P4, P5, P10, P14, P16, P18, P19
- **Spec 001** (React Migration) — Depends on components using these hooks
- **React Core** (18.x+) — useState, useEffect, useCallback, useContext

### Environment Configuration
```bash
# Required
REACT_APP_API_URL=https://jsonplaceholder.typicode.com

# Optional (with defaults)
REACT_APP_API_TIMEOUT=5000
REACT_APP_CACHE_TTL=300000    # 5 minutes
REACT_APP_MAX_RETRIES=3
REACT_APP_LOG_LEVEL=info
REACT_APP_ENV=development
```

### File Structure
```
src/
├── services/
│   └── api.ts              # Centralized API client
├── hooks/
│   ├── useContacts.ts      # Contacts hook
│   ├── useCart.ts          # Cart hook
│   ├── useFetch.ts         # Generic fetch hook
│   └── useLocalStorage.ts  # Storage hook
├── types/
│   ├── Contact.ts          # Contact types
│   ├── Cart.ts             # Cart types
│   ├── API.ts              # API request/response types
│   └── Error.ts            # Error types
├── config/
│   └── index.ts            # Configuration
└── utils/
    └── logger.ts           # Debug logging
```

---

## Known Constraints

### Current Application Issues (Being Fixed)
1. **No Centralized API**: Multiple components make fetch calls directly
2. **No Error Handling**: API failures show generic errors
3. **No Retry Logic**: Failed requests don't retry
4. **Hard-Coded URL**: API URL not configurable
5. **No Caching**: Contact list refetches on every navigation
6. **Cart Lost on Refresh**: In-memory storage only

### Technical Constraints
1. **Browser Compatibility**: localStorage may be disabled or unavailable
2. **Storage Quota**: localStorage limited to ~5-10MB per origin
3. **No Server Sync**: Cart is client-only (no user accounts)
4. **Network Dependent**: Offline mode requires different handling (future)
5. **JSONPlaceholder Limitations**: API doesn't persist data; mock only

### Development Constraints
1. **No Test Database**: Tests must mock JSONPlaceholder responses
2. **No Build-Time Config**: Environment variables set at build time
3. **Single Origin**: Cart doesn't sync across different domains
4. **No TypeScript Generics Complexity**: Keep types readable and testable

---

## Success Definition

The state management and API integration layer is **COMPLETE & SUCCESSFUL** when:

1. ✅ Centralized API client exists at `src/services/api.ts` with no direct fetch calls in components
2. ✅ All API requests use centralized client and include retry logic (3 attempts, exponential backoff)
3. ✅ Custom hooks (useContacts, useCart, useFetch, useLocalStorage) are implemented and tested
4. ✅ Cart state persists to localStorage and survives page refresh
5. ✅ Contact list is cached in memory (no repeated API calls on navigation)
6. ✅ All errors are classified and handled with user-friendly messages
7. ✅ Configuration managed via environment variables (REACT_APP_API_URL, etc.)
8. ✅ TypeScript strict mode enabled; zero `any` types in state management code
9. ✅ All types documented (Contact, CartItem, APIError, Config, etc.)
10. ✅ 85%+ test coverage for hooks and API client
11. ✅ Debug logging provides visibility into API calls and state changes
12. ✅ Retry backoff timing verified (1s, 2s, 4s delays)
13. ✅ All code follows constitution principles (P4, P5, P10, P14, P16, P18, P19)

---

## Next Steps

1. **Use `/speckit-plan`** to create implementation strategy for state management and API layers
2. **Use `/speckit-tasks`** to generate detailed work breakdown
3. **Use `/speckit-implement`** to build the API client and custom hooks
