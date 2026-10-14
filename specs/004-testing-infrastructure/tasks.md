# Tasks: Testing Infrastructure & Test Automation (Spec 004)

**Feature**: Testing Infrastructure and Test Automation  
**Feature Number**: 004  
**Created**: 2026-10-14  
**Total Tasks**: 25  
**Estimated Duration**: Phase 2 (8 hours)

---

## Implementation Strategy

**MVP Scope**: Unit tests + Integration tests for critical paths
- Critical paths (API, Redux, validation): 95% coverage
- Core logic (hooks, utilities): 85% coverage
- UI components: 70% coverage

**Incremental Delivery**:
1. Phase 1: Test infrastructure and utilities setup
2. Phase 2: Critical path tests (API client, Redux, validation)
3. Phase 3: Core logic tests (hooks, services)
4. Phase 4: Component tests (UI components)
5. Phase 5: Coverage enforcement and reporting

---

## Phase 1: Test Infrastructure Setup

**Goal**: Configure test runner, utilities, and environment  
**Test Criteria**: Tests run, vitest works with TypeScript, MSW mocks API

### Test Configuration

- [X] T001 Update `vitest.config.ts` with globals, setupFiles, environment (jsdom), coverage config
- [X] T002 Create test setup file in `src/tests/setup.ts` with library initialization (@testing-library/jest-dom)
- [ ] T003 Create test utilities file in `src/tests/utils.ts` with render helpers, custom matchers
- [X] T004 Setup MSW server in `src/mocks/server.ts` with test lifecycle hooks
- [ ] T005 Create mock data factory in `src/tests/factories.ts` - ContactFactory, CartItemFactory

### Test Helpers & Utilities

- [ ] T006 [P] Create Redux test helpers in `src/tests/redux-helpers.ts` (setupStore, preloadedState)
- [ ] T007 [P] Create React Testing Library custom render in `src/tests/custom-render.tsx` (provider wrappers)
- [ ] T008 [P] Create API mock helpers in `src/tests/api-helpers.ts` (mockSuccess, mockError, mockTimeout)

### Validation & Type Safety

- [ ] T009 Create test type definitions in `src/tests/types.ts` (for test mocks, fixtures)
- [X] T010 Verify tsconfig test paths include src/tests with proper alias mapping

---

## Phase 2: Critical Path Tests (95% Coverage)

**Goal**: Test API client, Redux, and validation with high confidence  
**Test Criteria**: All critical functions tested, error cases covered, async operations handled

### API Client Tests

- [X] T011 Write tests in `src/services/__tests__/api.test.ts`:
  - GET endpoints (getContacts, getContactById) - success and error
  - POST/PUT endpoints (createContact, updateContact) - success and error
  - DELETE endpoint - success and error
  - Retry logic - 3 attempts with backoff
  - Timeout handling - 5-second timeout
  - Error classification - NETWORK, SERVER_ERROR, VALIDATION_ERROR, UNKNOWN

### Redux Tests

- [X] T012 [P] Write contactSlice tests in `src/store/__tests__/contactSlice.test.ts`:
  - Initial state
  - Sync actions (addContact, removeContact)
  - Async thunk states (pending, fulfilled, rejected)
  - Error payload handling

- [X] T013 [P] Write cartSlice tests in `src/store/__tests__/cartSlice.test.ts`:
  - Add/remove items
  - Quantity updates
  - Persistence integration

- [ ] T014 [P] Write formSlice tests in `src/store/__tests__/formSlice.test.ts`:
  - Form state management
  - Field updates
  - Validation errors

- [ ] T015 [P] Write uiSlice tests in `src/store/__tests__/uiSlice.test.ts`:
  - Modal open/close
  - Notification display
  - Theme toggle

### Redux Selectors Tests

- [ ] T016 [P] Write selector tests in `src/store/selectors/__tests__/contactSelectors.test.ts`:
  - selectContacts, selectContactById
  - selectContactsLoading, selectContactsError
  - selectShouldRefreshContacts (cache validation)
  - Memoization verification

### Validation Tests

- [X] T017 [P] Write validation tests in `src/utils/__tests__/validation.test.ts`:
  - Email validation
  - Phone validation (required per data-model)
  - Name length constraints (per data-model)
  - Error message generation

### Error Handling Tests

- [ ] T018 [P] Write error handling tests in `src/utils/__tests__/errors.test.ts`:
  - Error classification logic
  - User-friendly message mapping
  - Recovery strategy selection
  - Logging integration

### Retry Logic Tests

- [X] T019 [P] Write retry tests in `src/utils/__tests__/retry.test.ts`:
  - Exponential backoff (1s, 2s, 4s)
  - Retry only transient errors (5xx, NETWORK, TIMEOUT)
  - Max retry attempts (3)
  - Timeout per request (5s)

---

## Phase 3: Core Logic Tests (85% Coverage)

**Goal**: Test hooks, utilities, and business logic  
**Test Criteria**: Hooks render correctly, utilities return expected values

### Hook Tests

- [ ] T020 Write useContacts hook tests in `src/hooks/__tests__/useContacts.test.ts`:
  - Fetches contacts on mount
  - Respects cache TTL (5-minute)
  - Refetches on dependency change
  - Handles loading/error states
  - Cleanup on unmount

- [ ] T021 [P] Write useCachedContacts hook tests in `src/hooks/__tests__/useCachedContacts.test.ts`:
  - Returns cached data if valid
  - Triggers refetch if cache expired
  - Handles initial load

- [ ] T022 [P] Write useCart hook tests in `src/hooks/__tests__/useCart.test.ts`:
  - Syncs to localStorage
  - Loads from localStorage on mount
  - Handles corrupted data gracefully

### Cache Tests

- [ ] T023 [P] Write cache logic tests in `src/utils/__tests__/cache.test.ts`:
  - 5-minute TTL calculation
  - Cache expiration detection
  - Timestamp tracking

---

## Phase 4: Component Tests (70% Coverage)

**Goal**: Test UI components with React Testing Library  
**Test Criteria**: Components render, user interactions work, props affect output

### Common Component Tests

- [ ] T024 Write tests for Common components in `src/components/Common/__tests__/`:
  - Button: variants, sizes, disabled, click handler
  - TextInput: value changes, error display, types
  - Card: slots, clickable variant
  - Modal: open/close, backdrop click, focus trap
  - Select: option selection, multi-select

### Feature Component Tests

- [ ] T025 [P] Write ContactList tests in `src/components/Contact/__tests__/ContactList.test.tsx`:
  - Render contact list from props
  - Display loading state
  - Display error message
  - Render empty state

- [ ] T026 [P] Write ContactForm tests in `src/components/Contact/__tests__/ContactForm.test.tsx`:
  - Fill form fields
  - Validate required fields
  - Submit handler called
  - Error display on validation failure

- [ ] T027 [P] Write CartSummary tests in `src/components/Shopping/__tests__/CartSummary.test.tsx`:
  - Display item count
  - Display total price
  - Checkout button enabled/disabled

---

## Phase 5: Coverage Enforcement

**Goal**: Measure, report, and enforce coverage thresholds  
**Test Criteria**: Coverage thresholds met, reports generated, CI enforces gates

### Coverage Configuration

- [X] T028 Update `vitest.config.ts` with coverage thresholds:
  - Critical paths: 95% (api.ts, contactSlice.ts, validation.ts)
  - Core logic: 85% (hooks, utilities)
  - UI: 70% (components)
  - Overall: 80%

- [X] T029 Create coverage report script in `package.json`:
  - `npm run test:coverage` - generate HTML and LCOV reports
  - Output to `coverage/` directory

- [ ] T030 Create coverage check in CI/CD:
  - Fail build if thresholds not met
  - Generate coverage badge for README

---

## Summary Statistics

- **Infrastructure (T001-T010)**: 10 tasks, ~3 hours
- **Critical Tests (T011-T019)**: 9 tasks [P], ~4 hours
- **Core Logic Tests (T020-T023)**: 4 tasks [P], ~2 hours
- **Component Tests (T024-T027)**: 4 tasks [P], ~2 hours
- **Coverage Enforcement (T028-T030)**: 3 tasks, ~1 hour
- **Total MVP (Phase 1-2)**: 19 tasks, ~7 hours

---

## Parallel Execution Matrix

**Phase 1 Parallelization** (after T010):
```
T006 ─→ Redux helpers
T007 ─→ Custom render
T008 ─→ API helpers
```

**Phase 2 Parallelization**:
```
T011 ─→ API tests
T012-T015 ─→ Redux tests (parallel per slice)
T016 ─→ Selector tests
T017-T019 ─→ Validation, Error, Retry tests (parallel)
```

**Phase 3 Parallelization**:
```
T020, T021-T022, T023 ─→ Hook tests (parallel)
```

**Phase 4 Parallelization**:
```
T024 ─→ Common component tests
T025-T027 ─→ Feature tests (parallel)
```

---

## Files to Create/Modify

**Configuration**:
- `vitest.config.ts` - Updated with coverage thresholds
- `src/tests/setup.ts` - Test initialization
- `src/tests/utils.ts` - Test utilities

**Test Utilities**:
- `src/tests/mocks.ts` - MSW server
- `src/tests/factories.ts` - Mock data factories
- `src/tests/redux-helpers.ts` - Redux testing
- `src/tests/custom-render.tsx` - React Testing Library wrapper
- `src/tests/api-helpers.ts` - API mock helpers

**Tests**:
- `src/services/__tests__/api.test.ts`
- `src/store/__tests__/*.test.ts`
- `src/store/selectors/__tests__/*.test.ts`
- `src/utils/__tests__/*.test.ts`
- `src/hooks/__tests__/*.test.ts`
- `src/components/**/__tests__/*.test.tsx`

---

## Next Steps

1. Execute Phase 1 (T001-T010) - Setup test infrastructure
2. Execute Phase 2 (T011-T019) - Critical path tests
3. Execute Phase 3 (T020-T023) - Core logic tests
4. Execute Phase 4 (T024-T027) - Component tests
5. Execute Phase 5 (T028-T030) - Coverage enforcement
