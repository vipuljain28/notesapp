# Task Execution Quick Reference

**Feature**: React Migration for Contact Manager (Spec 001)  
**Total Tasks**: 86 (organized into 8 phases)  
**Generated**: 2026-10-14  

## By the Numbers

| Metric | Value |
|--------|-------|
| **Total Tasks** | 86 |
| **Setup Tasks** | 13 |
| **Foundation Tasks** | 22 |
| **US1 Tasks** | 12 |
| **US2 Tasks** | 4 |
| **US3 Tasks** | 6 |
| **US4 Tasks** | 9 |
| **US5 Tasks** | 4 |
| **Polish Tasks** | 16 |
| **Parallelizable Tasks** | 58 (67%) |
| **Estimated Effort** | 53 hours (~8 weeks @ 6-7 hrs/week) |
| **MVP Scope** | Phase 1-3 (T001-T047): 27 tasks, ~19 hours |

## Phase Breakdown

### Phase 1: Setup (13 tasks)
- Initialize Vite + React + TypeScript
- Install dependencies (Tailwind, Redux, testing tools)
- Configure ESLint, Prettier, TypeScript
- Create directory structure and environment files

**Time**: ~3 hours | **Blocking**: Yes (must complete first)

### Phase 2: Foundation (22 tasks) [58% parallelizable]
- Redux store (5 slices: contacts, cart, forms, ui + selectors)
- API client with retry logic (3 attempts, 5s timeout, error transform)
- Validation utilities (email, name, phone, contact validation)
- Type definitions (Contact, Product, CartItem, Redux, Error)
- Mock data and MSW setup for testing

**Time**: ~8 hours | **Parallel**: T015-T018, T020-T022, T024-T026, T027-T031, T032-T035
**Estimated Parallel Time**: 4-5 hours

### Phase 3: US1 - Contact List (12 tasks)
- useContacts hook
- ContactList + ContactCard components
- LoadingSpinner + ErrorBoundary
- App routing and integration
- Component + hook + API tests

**Time**: ~8 hours | **MVP Completion**: Yes ✅

### Phase 4: US2 - Contact Details (4 tasks)
- ContactDetail + ContactDetailPage components
- App routing (/contact/:id)
- Component tests

**Time**: ~5 hours | **Depends**: US1 (T036: useContacts)

### Phase 5: US3 - Add Contact (6 tasks)
- ContactForm component with validation
- useForm hook
- AddContactPage + routing
- Form + hook tests

**Time**: ~8 hours | **Parallel with US4**: Yes

### Phase 6: US4 - Shopping Cart (9 tasks)
- useCart hook (localStorage persistence)
- ProductList + ProductCard + Cart components
- ShopPage + CartPage + routing
- Cart + hook tests

**Time**: ~8 hours | **Parallel with US3**: Yes

### Phase 7: US5 - Update Contact (4 tasks)
- EditContactPage component (reuses ContactForm)
- ContactDetail edit button
- App routing (/contact/:id/edit)
- Integration tests

**Time**: ~5 hours | **Depends**: US1 + US3

### Phase 8: Polish (16 tasks)
- Error handling + retries across all components
- Toast notifications (Sonner setup)
- Unsaved changes warning (useBlocker)
- Accessibility + keyboard navigation
- Performance optimization (lazy loading, code splitting)
- Documentation (JSDoc, README, CONTRIBUTING)
- Final validation (coverage report, type check, lint, build, manual tests)

**Time**: ~8 hours | **Parallel**: Many [P] marked tasks

## Task Execution Paths

### MVP Fast Track (19 hours)
```
Phase 1 (Setup):        3 hrs
    ↓
Phase 2 (Foundation):   5 hrs (parallel execution)
    ↓
Phase 3 (US1):          8 hrs
    ↓
Phase 4 (US2):          3 hrs (subset - contact detail only)
    ↓
LAUNCH MVP
```

**Result**: Functional contact list + detail view, no cart, no forms

### Full Feature Implementation (53 hours)
```
Phase 1:    3 hrs
Phase 2:    5 hrs (parallel)
Phase 3:    8 hrs
Phase 4:    5 hrs (parallel with Phase 5-6 after US1 done)
Phase 5:    8 hrs (parallel with Phase 6)
Phase 6:    8 hrs (parallel with Phase 5)
Phase 7:    5 hrs
Phase 8:    8 hrs (final polish + validation)
```

## Parallel Execution Opportunities

### Phase 2 Parallelization (Save ~4 hours)
All can run in parallel after T013:
- Redux slices (T015, T016, T017, T018)
- API + Services (T020, T021, T022)
- Utilities (T024, T025, T026)
- Types (T027, T028, T029, T030, T031)
- Mocks + Testing (T032, T033, T034, T035)

### US3 + US4 Parallelization (Save ~2 hours)
After Phase 2 complete, run in parallel:
- Phase 5: Add Contact (T052-T057)
- Phase 6: Shopping Cart (T058-T066)

No dependencies between them; both use separate Redux slices and components.

### Phase 8 Parallelization (Save ~3 hours)
After Phase 7 complete, many polish tasks can run in parallel:
- T071-T078: Error handling, accessibility, performance
- T079-T082: Documentation
- (T083-T086 run after all others complete for final validation)

## Quality Gates

| Gate | Tasks | Pass Criteria | Impact |
|------|-------|--------------|--------|
| **Gate 1** | T001-T013 | `npm run dev` starts, no errors | Blocks all phases |
| **Gate 2** | T014-T035 | Redux store works, API client functional | Blocks US implementation |
| **Gate 3** | T036-T047 | Contact list loads, 80% coverage | MVP complete |
| **Gate 4** | T048-T051 | Details load in < 1s, navigation works | US2 complete |
| **Gate 5** | T052-T086 | All features working, 80%+ coverage, build succeeds | Production ready |

## Test Coverage Strategy

### Phase 2: Infrastructure Tests
- API client retry logic (MSW)
- Validation functions
- Redux reducers/selectors

### Phase 3+: Component Tests (by feature)
- Component rendering
- User interactions (click, type, submit)
- Loading/error states
- API integration (via MSW)

### Phase 8: Final Validation
- Overall coverage: 80%+ (critical paths 100%)
- Manual scenarios: 6 tests from quickstart.md
- Performance: Bundle < 100KB
- Type safety: Zero TypeScript errors
- Linting: Zero ESLint errors

## File Structure After Completion

```
src/
├── components/
│   ├── Common/
│   │   ├── ErrorBoundary.tsx
│   │   └── LoadingSpinner.tsx
│   ├── Contact/
│   │   ├── ContactList.tsx
│   │   ├── ContactCard.tsx
│   │   ├── ContactDetail.tsx
│   │   ├── ContactDetailPage.tsx
│   │   ├── ContactForm.tsx
│   │   ├── AddContactPage.tsx
│   │   ├── EditContactPage.tsx
│   │   ├── *.test.tsx (tests)
│   └── Shopping/
│       ├── ProductList.tsx
│       ├── ProductCard.tsx
│       ├── Cart.tsx
│       ├── ShopPage.tsx
│       ├── CartPage.tsx
│       └── *.test.tsx (tests)
├── services/
│   ├── api.ts
│   ├── contactService.ts
│   ├── cartService.ts
│   └── *.test.ts (tests)
├── hooks/
│   ├── useContacts.ts
│   ├── useCart.ts
│   ├── useForm.ts
│   ├── useFetch.ts
│   └── *.test.ts (tests)
├── types/
│   ├── Contact.ts
│   ├── Product.ts
│   ├── Cart.ts
│   ├── Error.ts
│   └── Redux.ts
├── store/
│   ├── index.ts (configured store)
│   ├── contactSlice.ts
│   ├── cartSlice.ts
│   ├── formSlice.ts
│   ├── uiSlice.ts
│   └── selectors.ts
├── utils/
│   ├── validation.ts
│   ├── formatting.ts
│   └── constants.ts
├── data/
│   └── products.ts (mock data)
├── mocks/
│   └── handlers.ts (MSW)
├── test/
│   └── setup.ts
├── App.tsx
├── main.tsx
└── index.css

tests/ (if separate)
├── components/
├── services/
├── hooks/
└── utils/
```

## Success Criteria

### MVP (After Phase 3)
- ✅ Contact list loads in < 2 seconds
- ✅ Contacts display with name, email, phone
- ✅ Sorting by name works
- ✅ Click contact to view details
- ✅ Navigate back to list
- ✅ 80% test coverage
- ✅ No console errors

### Full Feature (After Phase 8)
- ✅ All 5 user stories working
- ✅ Cart persists across refresh
- ✅ Add contact form with validation
- ✅ Edit contact works
- ✅ Error messages display inline
- ✅ Unsaved changes warning works
- ✅ 80%+ overall test coverage (critical 100%)
- ✅ Zero TypeScript/ESLint errors
- ✅ Build succeeds (< 100KB)
- ✅ All 6 manual test scenarios pass

## Recommended Implementation Team Structure

### Solo Developer
- **Timeline**: 8-9 weeks (53 hours @ 6-7 hrs/week)
- **Pace**: 1 phase per week + 1 week buffer
- **Strategy**: Sequential phases, leverage parallelizable tasks when context-switching needed

### Small Team (2-3 developers)
- **Timeline**: 3-4 weeks (parallel phases)
- **Phase 2 split**: 1 dev (Redux + API), 1 dev (Types + Utils + MSW)
- **Phase 3-6 split**: 1 dev (Contact features), 1 dev (Shopping features)
- **Phase 8**: Team effort for documentation + final validation

### Larger Team (4+ developers)
- **Timeline**: 2-3 weeks
- **Full parallelization**: Each developer owns feature area (contacts, cart, forms, testing, devops)
- **Daily standups**: Coordinate dependencies and gate completions

---

**Quick Reference Version**: 1.0.0  
**Last Updated**: 2026-10-14  
**Full Details**: See [tasks.md](./tasks.md)  
**Next**: Execute tasks with `/speckit-implement`
