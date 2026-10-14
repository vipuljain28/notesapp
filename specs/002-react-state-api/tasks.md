# Tasks: React State Management and API Integration (Spec 002)

**Feature**: React State Management and API Integration  
**Feature Number**: 002  
**Created**: 2026-10-14  
**Total Tasks**: 32  
**Estimated Duration**: Phase 2 (12 hours), Phase 3-4 (18 hours)

---

## Implementation Strategy

**MVP Scope**: Phase 2 + Phase 3 (Contact List API integration)
- Foundation: Redux selectors, API client, error handling
- User Story 1: Contact List with real API and caching

**Incremental Delivery**:
1. Phase 2: Infrastructure (API client, Redux utilities, error handling)
2. Phase 3: Contact List story (selectors, thunks, API integration)
3. Phase 4: Shopping Cart story (persistence, synchronization)

---

## Phase 2: Foundational Redux & API Infrastructure

**Goal**: Establish API communication layer, Redux patterns, error handling  
**Test Criteria**: API client makes requests, Redux actions dispatch correctly, errors handled gracefully

### Setup Tasks

- [ ] T001 Create API client foundation in `src/services/api.ts` with base URL from env vars
- [ ] T002 Define error types and classification in `src/types/errors.ts` (NETWORK, TIMEOUT, SERVER_ERROR, VALIDATION_ERROR, UNKNOWN)
- [ ] T003 Implement retry logic with exponential backoff in `src/utils/retry.ts` (3 attempts: 1s, 2s, 4s; 5-second timeout per request)
- [ ] T004 Create API response interceptor in `src/services/api.ts` for error mapping and retry coordination
- [ ] T005 Setup MSW (Mock Service Worker) in `src/mocks/handlers.ts` with JSONPlaceholder API endpoints
- [ ] T006 Create MSW server initialization in `src/mocks/server.ts` for test environment
- [ ] T007 Setup Redux middleware for API async operations in `src/store/middleware/api.ts`
- [ ] T008 Create Redux utility types in `src/types/redux.ts` (AsyncState<T>, LoadingState)

### Redux Utilities

- [ ] T009 [P] Implement Redux selector factory in `src/store/selectors.ts` (selectContactById, selectAllContacts, selectContactsLoading)
- [ ] T010 [P] Create Redux thunk factory in `src/store/thunks.ts` for async API calls with loading/error/success states
- [ ] T011 [P] Implement cache invalidation timer in `src/utils/cache.ts` (5-minute TTL for contact list per clarification)
- [ ] T012 [P] Create validation utilities in `src/utils/validation.ts` (email format, phone format, name length constraints)

### API Client Implementation

- [ ] T013 [P] Implement `getContacts()` in `src/services/api.ts` - fetch all contacts with retry logic
- [ ] T014 [P] Implement `getContactById(id)` in `src/services/api.ts` with error handling
- [ ] T015 [P] Implement `createContact(data)` in `src/services/api.ts` with validation (mock ID 101+ for writes per MSW strategy)
- [ ] T016 [P] Implement `updateContact(id, data)` in `src/services/api.ts` with optimistic updates
- [ ] T017 [P] Implement `deleteContact(id)` in `src/services/api.ts` with rollback on error

### Error Handling & Logging

- [ ] T018 [P] Create error logger in `src/utils/logger.ts` (console in dev, external service ready in prod)
- [ ] T019 [P] Implement error recovery strategies in `src/services/api.ts` (retry transient errors, fail fast on validation errors)
- [ ] T020 [P] Create user-friendly error messages in `src/types/errors.ts` (map HTTP status codes to UI text)

---

## Phase 3: User Story 1 - Contact List with API Integration

**User Story**: "As a user, I can view all contacts fetched from the API"  
**Priority**: P1  
**Independent Tests**:
- API fetch completes without errors
- Redux state updates with contact data
- Cache invalidation works (5-minute refresh)
- Error recovery (retry) works on transient failures
- Contact list displays fetched data

### Redux Setup for Contact Story

- [ ] T021 [US1] Create `contactThunks.ts` in `src/store/thunks/` - fetchAllContacts thunk with retry and caching
- [ ] T022 [US1] Update `contactSlice.ts` with API states (loading, error, lastFetchTime for cache tracking)
- [ ] T023 [US1] Implement `selectContacts` selector in `src/store/selectors/contactSelectors.ts` with loading/error states
- [ ] T024 [US1] Implement `selectShouldRefreshContacts` selector (returns true if cache expired > 5 min)

### API Integration

- [ ] T025 [US1] Create `useContacts()` hook in `src/hooks/useContacts.ts` - dispatch fetch on mount, handle loading/error
- [ ] T026 [US1] Create `useCachedContacts()` hook in `src/hooks/useCachedContacts.ts` - respects 5-min TTL, refetch if needed
- [ ] T027 [US1] Integrate cache invalidation in contact lifecycle (componentDidMount triggers fetch, timer scheduled)

### Testing

- [ ] T028 [US1] Write Redux thunk tests in `src/store/thunks/__tests__/contactThunks.test.ts` (success, error, retry)
- [ ] T029 [US1] Write API client tests in `src/services/__tests__/api.test.ts` (all endpoints, error handling, retry logic)
- [ ] T030 [US1] Write hook tests in `src/hooks/__tests__/useContacts.test.ts` (fetch on mount, caching behavior)

---

## Phase 4: User Story 2 - Shopping Cart with Persistence

**User Story**: "As a user, I can add/remove items from cart and cart persists across sessions"  
**Priority**: P2  
**Independent Tests**:
- Cart state syncs to localStorage
- Cart loads from localStorage on app startup
- Add/remove items updates both Redux and localStorage

### Cart Persistence

- [ ] T031 [US2] Implement localStorage sync middleware in `src/store/middleware/cartPersistence.ts` (write-through pattern)
- [ ] T032 [US2] Create cart recovery logic in `src/store/middleware/cartPersistence.ts` (graceful degradation on corrupted data)

---

## Summary Statistics

- **Setup Phase (T001-T008)**: 8 tasks, ~4 hours
- **Redux Utils (T009-T012)**: 4 tasks [P], ~2 hours
- **API Client (T013-T017)**: 5 tasks [P], ~3 hours
- **Error Handling (T018-T020)**: 3 tasks [P], ~2 hours
- **Contact Story (T021-T030)**: 10 tasks [US1], ~6 hours
- **Cart Story (T031-T032)**: 2 tasks [US2], ~2 hours
- **Total MVP (Phase 2-3)**: 22 tasks, ~16 hours

---

## Parallel Execution Matrix

**Phase 2 Parallelization** (after T008):
```
T009 ─→ T013-T017 ─→ T021-T022 (Selector → API → Redux)
T010 ─→ T023-T024 (Thunk → Selectors)
T011 ─→ T027 (Cache logic)
T012 ─→ T025-T026 (Validation → Hooks)
T018-T020 (Error handling - independent)
```

**Phase 3 Parallelization** (after T024):
```
T025, T026 run parallel (both hooks, no deps)
T028, T029, T030 run parallel (tests, no deps on each other)
```

---

## Dependency Graph

```
T001-T008 (Setup Foundation)
    ├─→ T009-T012 [P] (Redux Utilities)
    │   ├─→ T013-T017 [P] (API Client)
    │   │   └─→ T021-T027 [US1] (Contact Integration)
    │   │       └─→ T028-T030 [US1] (Contact Tests)
    │   └─→ T023-T024 (Contact Selectors)
    └─→ T018-T020 [P] (Error Handling)
        └─→ T013-T017 (Retry integration)

T002-T007 (Foundational) ─→ T031-T032 [US2] (Cart Story)
```

---

## Files to Create/Modify

**API Layer**:
- `src/services/api.ts` - API client with retry logic
- `src/mocks/handlers.ts` - MSW handlers
- `src/mocks/server.ts` - MSW server setup

**Redux**:
- `src/store/thunks/` - Directory for thunk factories
- `src/store/selectors/` - Directory for selector factories
- `src/store/middleware/api.ts` - API middleware
- `src/store/middleware/cartPersistence.ts` - Cart persistence

**Utilities**:
- `src/utils/retry.ts` - Retry logic with backoff
- `src/utils/cache.ts` - Cache invalidation
- `src/utils/validation.ts` - Input validation
- `src/utils/logger.ts` - Error logging
- `src/types/errors.ts` - Error types and messages
- `src/types/redux.ts` - Redux utility types

**Hooks**:
- `src/hooks/useContacts.ts` - Contact fetching hook
- `src/hooks/useCachedContacts.ts` - Cached contact hook

**Tests**:
- `src/store/thunks/__tests__/contactThunks.test.ts`
- `src/services/__tests__/api.test.ts`
- `src/hooks/__tests__/useContacts.test.ts`

---

## Next Steps

1. Execute Phase 2 tasks (T001-T020) in parallel groups
2. Validate API client with MSW in tests
3. Execute Phase 3 (T021-T030) for Contact List feature
4. Execute Phase 4 (T031-T032) for Cart persistence
5. Move to Spec 003 (Component System)
