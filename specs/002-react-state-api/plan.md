# Implementation Plan: State Management and API Integration Layer (Spec 002)

**Feature**: React State Management and API Integration  
**Feature Number**: 002  
**Created**: 2026-10-14  
**Status**: PHASE 0 RESEARCH IN PROGRESS

---

## Technical Context

### Architecture & Technology Stack
- **State Management**: Redux with Redux Thunk (confirmed in Spec 001 clarifications)
- **API Client Pattern**: Centralized (`src/services/api.ts`)
- **HTTP Library**: Fetch API with retry logic (3 attempts, exponential backoff)
- **Cache Strategy**: Time-based TTL (5 minutes) confirmed in `/speckit-clarify`
- **Storage**: localStorage for cart persistence (write-through pattern)
- **Type Safety**: TypeScript strict mode, explicit types for all API responses

### Key Dependencies
- @reduxjs/toolkit (state slices, thunks)
- react-redux (Provider, hooks)
- msw (Mock Service Worker for API mocking)
- JSONPlaceholder API (external, read-only for MVP)

### File Structure
```
src/
├── services/
│   ├── api.ts              # Centralized HTTP client
│   ├── contactService.ts   # Contact-specific API methods
│   └── cartService.ts      # Cart localStorage + API methods
├── store/
│   ├── index.ts            # Store configuration (CREATED in Phase 1)
│   ├── contactSlice.ts     # Contact reducer (CREATED in Phase 1)
│   ├── cartSlice.ts        # Cart reducer (CREATED in Phase 1)
│   ├── formSlice.ts        # Form reducer (CREATED in Phase 1)
│   ├── uiSlice.ts          # UI state reducer (CREATED in Phase 1)
│   └── selectors.ts        # Derived state selectors (PENDING)
├── hooks/
│   ├── useContacts.ts      # Contact list logic
│   ├── useCart.ts          # Cart logic
│   └── useFetch.ts         # Generic fetch hook
└── types/
    ├── api.ts              # API request/response types
    ├── errors.ts           # Error types
    └── redux.ts            # Redux state types
```

---

## Constitution Check

### Governance Principles Alignment

| Principle | Status | Integration Point |
|-----------|--------|-------------------|
| P1: Single Responsibility | ✅ Design-Ready | API client (one job: HTTP), services (domain logic), slices (state) |
| P2: Evidence-Based Development | ✅ Design-Ready | JSDoc comments on retry logic, error classification documented |
| P3: No External Secrets | ✅ Design-Ready | API URL via REACT_APP_API_URL env var, no hardcoded credentials |
| P4: Strict TypeScript | ✅ Design-Ready | APIError, Contact, CartItem interfaces; PayloadAction<T> for all reducers |
| P5: Consistent Imports | ✅ Implementation-Ready | Use @services, @hooks, @types path aliases |
| P6: No `any` Type | ✅ Design-Ready | All fetch responses typed (Contact[], APIError, etc.) |
| P7: Functional Components | ✅ Implementation-Ready | Custom hooks instead of HOCs |
| P8: Component Organization | ✅ Implementation-Ready | Services directory for domain logic |
| P9: Props & State | ✅ Design-Ready | Redux AppState interface defined |
| P10: Custom Hooks | ✅ Implementation-Ready | useContacts, useCart, useFetch hooks |
| P14: Error Handling | ✅ Design-Ready | APIError type, error classification, retry logic |
| P15: Testing | ✅ Implementation-Ready | Vitest configured, MSW for API mocking |
| P16: Data Contracts | ✅ Design-Ready | Contact, APIResponse, APIError interfaces |
| P18: Centralized API | ✅ Design-Ready | Single api.ts module, no direct fetch calls in components |

**Verdict**: ✅ Full alignment - No constitution violations anticipated

---

## Phase 0: Research Consolidation

### Decision: API Retry Logic
- **Choice**: 3 attempts with exponential backoff (1s, 2s, 4s)
- **Rationale**: JSONPlaceholder reliable but network flaky in test environments; 3 retries balances resilience vs. user wait time
- **Alternatives**: No retries (too strict), infinite retries (hangs), configurable retries (over-engineering)
- **Source**: Spec 002 Scenario 1, REQ-005

### Decision: Cache Invalidation
- **Choice**: Time-based TTL (5 minutes) confirmed in clarifications
- **Rationale**: Balances freshness (auto-refresh) with performance (reduces API calls); simpler than event-based
- **Alternatives**: Manual refresh only (stale data), event-based (complex state graph), no cache (excess API calls)
- **Source**: /speckit-clarify Q2

### Decision: Error Classification
- **Choice**: 5 error types (NETWORK, TIMEOUT, SERVER_ERROR, VALIDATION_ERROR, UNKNOWN)
- **Rationale**: Maps HTTP status codes and error contexts to user-friendly messages
- **Alternatives**: Generic error, granular per-status classification (too detailed)
- **Source**: Spec 002 Scenario 4, REQ-004

### Decision: localStorage Recovery
- **Choice**: Graceful degradation—if cart corrupted, reset to empty; log warning
- **Rationale**: Cart is non-critical; empty cart is recoverable by user actions
- **Alternatives**: Throw error (UX breaking), ignore corrupted data (leads to inconsistency)
- **Source**: Spec 002 Scenario 3, Edge Case: Corrupted localStorage

---

## Phase 1: Design Gates

### Gate 1: Data Model Complete ✅
**Entities Defined**:
- Contact (id, name, email, phone, company, address)
- CartItem (id, name, quantity, price)
- APIError (status, message, code, details, retryable)
- AppState (contacts, cart, form, ui slices)

**Validation Rules**:
- Email: must contain @ and domain, max 255 chars
- Name: non-empty, max 255 chars
- Phone: digits + separators, max 20 chars
- Cart quantity: >= 1, <= 999

**State Transitions**:
- Contact: loaded → cached (expires 5 min) → refresh → loaded
- Cart: in-memory ↔ localStorage (write-through)

**Status**: ✅ PASS

### Gate 2: API Contracts Finalized ✅
**Endpoints**:
- GET /users (returns User[])
- GET /users/:id (returns User)
- POST /users (returns User with mock ID 101+)
- PUT /users/:id (returns User)

**Error Scenarios**:
- Network down → NETWORK error, retryable
- Timeout (5s) → TIMEOUT error, retryable
- 500/503 → SERVER_ERROR, retryable
- 400/422 → VALIDATION_ERROR, not retryable
- 404 → not found, not retryable

**Retry Strategy**:
- Exponential backoff: 1s, 2s, 4s
- Retryable errors only (not 4xx)
- Max 3 attempts

**Status**: ✅ PASS

### Gate 3: Quickstart Validation Valid ✅
**Scenarios**:
1. Fetch contacts with successful response
2. Fetch contacts with 2 failures then success (retry)
3. Fetch contacts with network down (all fail, error shown)
4. Cache returns same data without new request
5. Cart persists across refresh (localStorage)
6. Corrupted localStorage handled gracefully

**Test Setup**:
- MSW server configured
- Redux store setup with all slices
- localStorage available

**Status**: ✅ PASS

---

## Implementation Strategy

### Phase 1: Core API Client (8 hours)
**Tasks**: T001-T013 (Setup) already complete; T014-T035 (Foundation) in progress
- API client with retry logic
- Contact & cart services
- Redux hooks
- Error transformation

### Phase 2: Integration (12 hours)
**Tasks**: Redux selectors, MSW mocks, validation utilities
- Complete type definitions
- Mock data & handlers
- Test utilities

### Phase 3: Validation (4 hours)
**Tasks**: Manual scenarios, edge cases, performance checks
- 6 quickstart scenarios
- Error recovery verification
- Cache expiration verification

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-----------|
| JSONPlaceholder API down | Low | Medium | MSW mocks ready, test with offline |
| localStorage corrupted | Low | Low | Graceful reset, log warning |
| Cache staleness complaints | Medium | Low | Clear 5-min TTL documentation |
| Retry timeout user frustration | Low | Medium | Show retry UI feedback |

---

## Success Criteria

- ✅ API client makes requests with proper error handling
- ✅ Retry logic executes (3 attempts with backoff)
- ✅ Errors classified correctly (network, timeout, server, validation)
- ✅ Contact list caches for 5 minutes
- ✅ Cart persists to localStorage on every change
- ✅ All functionality testable with MSW
- ✅ Zero `any` types in TypeScript
- ✅ Constitution P1-P18 compliance verified

---

## Recommended Next Steps

1. **Phase 2 Foundation** (T036+): Complete Redux selectors, MSW setup
2. **Phase 3 Integration**: Implement contact list with API integration
3. **Validation**: Run quickstart scenarios manually
4. **Handoff**: Ready for `/speckit-tasks` task breakdown

**Status**: ✅ READY FOR PHASE 1 DESIGN ARTIFACTS
