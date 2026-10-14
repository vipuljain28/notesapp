# Tasks: React Component System & UI Library (Spec 003)

**Feature**: React Component System and UI Library  
**Feature Number**: 003  
**Created**: 2026-10-14  
**Total Tasks**: 28  
**Estimated Duration**: Phase 3 (20 hours)

---

## Implementation Strategy

**MVP Scope**: Phase 1 (Common components) + Phase 2 (Feature components)
- Foundation: Button, Input, Card, Modal components
- Contact Components: ContactList, ContactCard, ContactForm
- Shopping Components: CartSummary, CartItem

**Incremental Delivery**:
1. Phase 1: Common UI components (Button, Input, Select, Card, Modal, Loading)
2. Phase 2: Feature-specific components (ContactList, ContactCard, ContactForm, CartSummary, CartItem)
3. Phase 3: Component stories and Storybook setup (local development reference)
4. Phase 4: Component documentation and accessibility validation

---

## Phase 1: Common UI Components Foundation

**Goal**: Build reusable, styled, accessible UI component primitives  
**Test Criteria**: Components render without errors, props work correctly, styles apply, accessibility passes

### Base Components Setup

- [ ] T001 Create `src/components/Common/` directory with index.ts barrel export
- [ ] T002 Create Button component in `src/components/Common/Button.tsx` with variants (primary, secondary, danger, success), sizes (sm, md, lg), disabled state, and Tailwind styling
- [ ] T003 Create TextInput component in `src/components/Common/TextInput.tsx` supporting types (text, email, password, number), error display, placeholder, disabled state
- [ ] T004 Create Select component in `src/components/Common/Select.tsx` with dropdown options, multi-select option, error state, disabled state
- [ ] T005 Create Card component in `src/components/Common/Card.tsx` with optional header, body, footer slots, clickable variant
- [ ] T006 Create Modal component in `src/components/Common/Modal.tsx` with backdrop, focus trap, scroll handling, close button
- [ ] T007 [P] Create Loading component in `src/components/Common/Loading.tsx` with spinner and skeleton variants
- [ ] T008 [P] Create Badge component in `src/components/Common/Badge.tsx` for status display (success, warning, error, info)
- [ ] T009 [P] Create Alert component in `src/components/Common/Alert.tsx` for inline messages with icons

### Design System Integration

- [ ] T010 Update `tailwind.config.js` with design tokens (colors, spacing, typography per Constitution P13)
- [ ] T011 Create `src/types/theme.ts` with TypeScript definitions for theme colors and sizes
- [ ] T012 Create `src/constants/theme.ts` exporting theme constants used in components
- [ ] T013 Update `src/index.css` with additional component-level styles if needed (not Tailwind-only)

### Component Testing

- [ ] T014 [P] Write Button tests in `src/components/Common/__tests__/Button.test.tsx` (variants, disabled, click handler)
- [ ] T015 [P] Write TextInput tests in `src/components/Common/__tests__/TextInput.test.tsx` (types, value changes, error display)
- [ ] T016 [P] Write Card tests in `src/components/Common/__tests__/Card.test.tsx` (slots render correctly)
- [ ] T017 [P] Write Modal tests in `src/components/Common/__tests__/Modal.test.tsx` (focus management, close on backdrop)

---

## Phase 2: Feature-Specific Components

**Goal**: Build Contact and Shopping domain components  
**Test Criteria**: Components integrate with Redux, render data correctly, handle user interactions

### Contact Components

- [ ] T018 [US1] Create `src/components/Contact/` directory with index.ts barrel export
- [ ] T019 [US1] Create ContactList component in `src/components/Contact/ContactList.tsx` - displays contacts in grid/list, loading and error states, pagination (future)
- [ ] T020 [US1] Create ContactCard component in `src/components/Contact/ContactCard.tsx` - shows contact details, edit/delete buttons, clickable to detail view
- [ ] T021 [US1] Create ContactForm component in `src/components/Contact/ContactForm.tsx` - form for add/edit with validation, required fields per data-model (name, email, phone), submit/cancel handlers
- [ ] T022 [US1] Create ContactDetail component in `src/components/Contact/ContactDetail.tsx` - full contact view with edit/delete modals

### Shopping Components

- [ ] T023 [US2] Create `src/components/Shopping/` directory with index.ts barrel export
- [ ] T024 [US2] Create CartSummary component in `src/components/Shopping/CartSummary.tsx` - shows item count, total price, checkout button
- [ ] T025 [US2] Create CartItem component in `src/components/Shopping/CartItem.tsx` - displays item with quantity, price, remove button

### Component Integration

- [ ] T026 [P] Create component hook integrations in `src/components/hooks/` (useComponentState, useFormValidation)
- [ ] T027 [P] Create `src/components/index.ts` - central component export file for easy importing

### Component Testing

- [ ] T028 [US1] Write ContactList tests in `src/components/Contact/__tests__/ContactList.test.tsx` (render contacts, loading/error states)
- [ ] T029 [US1] Write ContactForm tests in `src/components/Contact/__tests__/ContactForm.test.tsx` (validation, submit, field changes)
- [ ] T030 [US2] Write CartSummary tests in `src/components/Shopping/__tests__/CartSummary.test.tsx` (displays data correctly)

---

## Phase 3: Storybook Setup & Documentation

**Goal**: Create interactive component reference for developers  
**Test Criteria**: Storybook runs locally, all components have stories, stories render correctly

### Storybook Configuration

- [ ] T031 Install Storybook dependencies (@storybook/react, @storybook/addon-essentials)
- [ ] T032 Create `.storybook/main.ts` configuration for React, TypeScript, Tailwind
- [ ] T033 Create `.storybook/preview.ts` with global decorators (theme provider if needed)
- [ ] T034 Update `package.json` with `storybook` script (npm run storybook)

### Component Stories

- [ ] T035 [P] Create Button stories in `src/components/Common/Button.stories.tsx` - all variants, disabled states
- [ ] T036 [P] Create TextInput stories in `src/components/Common/TextInput.stories.tsx` - types, error states
- [ ] T037 [P] Create Card stories in `src/components/Common/Card.stories.tsx` - with/without slots
- [ ] T038 [P] Create Modal stories in `src/components/Common/Modal.stories.tsx` - open/close states
- [ ] T039 [P] Create ContactList stories in `src/components/Contact/ContactList.stories.tsx` - loading, populated, empty states
- [ ] T040 [P] Create CartSummary stories in `src/components/Shopping/CartSummary.stories.tsx` - empty, with items

### Documentation

- [ ] T041 Create component documentation in `docs/COMPONENT_SYSTEM.md` - overview, usage examples, design tokens
- [ ] T042 Update README.md with link to component system documentation

---

## Phase 4: Accessibility & Polish

**Goal**: Ensure WCAG 2.1 AA compliance and quality  
**Test Criteria**: No a11y violations, keyboard navigation works, screen readers compatible

### Accessibility Audit

- [ ] T043 Run axe accessibility tests on all components
- [ ] T044 Fix any WCAG violations found in components
- [ ] T045 Validate keyboard navigation (Tab, Enter, Escape)
- [ ] T046 Test screen reader compatibility with NVDA/JAWS

### Final Polish

- [ ] T047 Update component JSDoc comments for prop documentation
- [ ] T048 Ensure dark mode compatibility (tokens-based, future-ready)

---

## Summary Statistics

- **Common Components (T001-T017)**: 17 tasks, ~10 hours
- **Feature Components (T018-T030)**: 13 tasks [US1/US2], ~8 hours
- **Storybook Setup (T031-T042)**: 12 tasks, ~4 hours
- **A11y & Polish (T043-T048)**: 6 tasks, ~2 hours
- **Total MVP (Phase 1-2)**: 30 tasks, ~18 hours

---

## Parallel Execution Matrix

**Phase 1 Parallelization** (after T013):
```
T014 ─→ Button tests
T015 ─→ TextInput tests
T016 ─→ Card tests
T017 ─→ Modal tests
T007-T009 ─→ Loading/Badge/Alert (independent)
```

**Phase 2 Parallelization**:
```
T019-T022 [US1] ─→ Contact components (sequential within story)
T024-T025 [US2] ─→ Shopping components (sequential within story)
T028-T030 ─→ Component tests (parallel across components)
```

**Phase 3 Parallelization** (after T034):
```
T035-T038 ─→ Common component stories (parallel)
T039-T040 ─→ Feature component stories (parallel)
```

---

## Files to Create/Modify

**Components**:
- `src/components/Common/` - Button, TextInput, Select, Card, Modal, Loading, Badge, Alert
- `src/components/Contact/` - ContactList, ContactCard, ContactForm, ContactDetail
- `src/components/Shopping/` - CartSummary, CartItem
- `src/components/hooks/` - Component-specific hooks
- `src/components/index.ts` - Central export

**Design System**:
- `src/types/theme.ts` - Theme TypeScript types
- `src/constants/theme.ts` - Theme constants
- `tailwind.config.js` - Updated with design tokens

**Storybook**:
- `.storybook/main.ts`
- `.storybook/preview.ts`
- `src/components/**/*.stories.tsx` - Component stories

**Tests**:
- `src/components/**/__tests__/*.test.tsx` - Component tests

**Documentation**:
- `docs/COMPONENT_SYSTEM.md` - Component documentation

---

## Next Steps

1. Execute Phase 1 (T001-T017) - Common components foundation
2. Execute Phase 2 (T018-T030) - Feature components
3. Execute Phase 3 (T031-T042) - Storybook setup
4. Execute Phase 4 (T043-T048) - Accessibility polish
5. Move to Spec 004 (Testing Infrastructure)
