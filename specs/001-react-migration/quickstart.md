# Quickstart Validation Guide: React Migration

**Version**: 1.0.0  
**Created**: 2026-10-14  
**Feature**: 001 - React Migration  

---

## Overview

This guide provides step-by-step validation scenarios to verify the React migration is working correctly end-to-end. Use this as acceptance criteria for the feature and as a manual testing checklist after deployment.

All scenarios assume the app is running locally (`http://localhost:5173/` with Vite dev server).

---

## Prerequisites

### Environment Setup

**Required**:
- Node.js 18+
- npm 9+
- Git (for cloning/pulling)

**Verify**:
```bash
node --version    # Should output v18.x.x or later
npm --version     # Should output 9.x.x or later
git --version     # Should output 2.x.x or later
```

### Dependencies Installation

```bash
cd contact-manager
npm ci              # Install exact versions from package-lock.json
```

**Expected Output**:
```
added 500+ packages in 45s
```

### Environment Configuration

Create `.env.development.local`:
```bash
REACT_APP_API_URL=https://jsonplaceholder.typicode.com
REACT_APP_LOG_LEVEL=info
REACT_APP_ENV=development
```

**Do NOT commit** `.env.development.local` or `.env*.local` files.

---

## Starting the Application

### Development Server

```bash
npm run dev
```

**Expected Output**:
```
VITE v5.x.x ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

**Open in Browser**:
- Navigate to `http://localhost:5173/`
- Should display app header and main contact list
- No errors in browser console

### Production Build (Optional)

```bash
npm run build
# dist/ folder created with optimized assets

npm run preview
# Preview server running at http://localhost:4173/
```

---

## Validation Scenarios

### Scenario 1: Contact List Loads Successfully ✅

**Objective**: Verify app loads contacts from JSONPlaceholder API within 2 seconds and displays them correctly.

**Steps**:
1. Open `http://localhost:5173/` in browser
2. Observe page loading (should see loading state if implemented)
3. Wait for contacts to display

**Acceptance Criteria**:
- ✅ Page loads completely within **2 seconds** (measure from opening URL to seeing contact list)
- ✅ Contact list displays **at least 10 contacts** (from JSONPlaceholder /users endpoint)
- ✅ Each contact shows:
  - Name (e.g., "Leanne Graham", "Ervin Howell")
  - Email (e.g., "Sincere@april.biz")
  - Phone (e.g., "1-770-736-8031 x56442")
- ✅ Contacts are **sortable by name** (ascending/descending toggle)
- ✅ **No console errors** (open DevTools → Console tab)
- ✅ **No console warnings** about missing dependencies or unhandled errors

**Expected Appearance**:
```
Contact Manager
[+] Add Contact  [Shop]

Contacts (10 results)
┌─────────────────────────────────────────┐
│ Leanne Graham                           │
│ Email: Sincere@april.biz                │
│ Phone: 1-770-736-8031 x56442            │
│ [View Details]                          │
└─────────────────────────────────────────┘
│ Ervin Howell                            │
│ Email: Shanna@melissa.tv                │
│ ... (more contacts)
```

**Troubleshooting**:
- If page is blank: Check browser console for errors (F12)
- If loading forever: Check network tab (DevTools → Network); verify API URL in .env
- If only 1-2 contacts shown: May be sorting/filtering issue; check contacts array in Redux DevTools

---

### Scenario 2: View Contact Details 📄

**Objective**: Verify users can click a contact to see full details and navigate back to list.

**Prerequisites**: Scenario 1 complete (contacts displayed)

**Steps**:
1. From contact list, click on any contact (e.g., "Leanne Graham")
2. Verify detail view displays
3. Examine all visible fields
4. Click "Back" or back arrow to return to list

**Acceptance Criteria**:
- ✅ Clicking contact navigates to detail view **in < 1 second**
- ✅ Detail view displays:
  - Name
  - Email
  - Phone
  - Address (street, city, zipcode)
  - Company (name, catchphrase)
  - Website (if available)
- ✅ "Back" button/link present and functional
- ✅ Clicking "Back" returns to contact list with same contacts visible
- ✅ **No console errors**

**Expected Appearance**:
```
< Back to Contacts

Contact Details: Leanne Graham

Name: Leanne Graham
Email: Sincere@april.biz
Phone: 1-770-736-8031 x56442

Address:
  Street: Kulas Light
  City: Gwenborough
  Zipcode: 92998-3874

Company: Romaguera-Crona
  Catchphrase: Multi-layered client-server neural-net

Website: hildegard.org

[Edit] [Delete]
```

**Troubleshooting**:
- If detail view doesn't load: Check Redux DevTools for selectedContact state
- If address fields missing: Verify data mapping in src/services/api.ts

---

### Scenario 3: Add Contact with Validation ✏️

**Objective**: Verify form validation works, invalid submissions are prevented, and successful adds update the list.

**Prerequisites**: Scenario 1 complete

**Steps**:

#### Part A: Test Validation Errors

1. Click "[+] Add Contact" button
2. Form modal/page opens
3. Leave all fields blank
4. Click "Submit" or "Add Contact" button
5. Verify error messages appear

**Acceptance Criteria**:
- ✅ Form opens immediately (no delay)
- ✅ Form has fields: Name, Email, Phone, Categories (optional)
- ✅ Submit button is **disabled** initially (or validation prevents submit)
- ✅ Leaving name blank shows: **"Name is required"** (inline, not modal)
- ✅ Leaving email blank shows: **"Email is required"**
- ✅ Leaving phone blank shows: **"Phone is required"**
- ✅ Form submission **prevented** (no API call made)

#### Part B: Test Valid Submission

6. Clear any error messages
7. Fill form with valid data:
   - Name: `Jane Smith`
   - Email: `jane.smith@example.com`
   - Phone: `555-1234`
   - Categories: (leave empty or add "work")
8. Click "Submit" / "Add Contact"
9. Verify success behavior

**Acceptance Criteria**:
- ✅ Form submits successfully
- ✅ API call made (check Network tab in DevTools)
- ✅ Success message appears: **"Contact added successfully"** (toast or inline)
- ✅ Form clears (all fields empty)
- ✅ Success message displays for **at least 3 seconds**
- ✅ Contact list updates (new contact may appear with ID 101+, though JSONPlaceholder doesn't persist)
- ✅ **No console errors**

#### Part C: Test Email Validation

10. Open form again
11. Try invalid emails:
    - Missing `@`: `jane.smith`
    - Missing domain: `jane@`
    - Missing TLD: `jane@domain`
12. Verify error appears

**Acceptance Criteria**:
- ✅ Invalid email shows error: **"Email must be a valid email address"**
- ✅ Submit button remains disabled
- ✅ Fixing email clears error and enables submit

**Expected Appearance**:
```
Add Contact

Name: [Jane Smith]
Email: [jane.smith@example.com]
       ↓ Error: "Email is required" (if blank)
Phone: [555-1234]
Categories: [work] [friend] [x]

[Cancel]  [Add Contact]
          (disabled if form invalid)

Success: "Contact added successfully" (appears for 3+ seconds)
```

**Troubleshooting**:
- If submit button not disabled: Check validation logic in ContactForm component
- If no error messages: Verify validation messages are shown inline (not just button disabled)
- If no success toast: Check Sonner toast setup in App component

---

### Scenario 4: Shopping Cart - Add & Remove Items 🛒

**Objective**: Verify shopping cart works, items persist to localStorage, and removal functions correctly.

**Prerequisites**: Scenario 1 complete

**Steps**:

#### Part A: Add Items to Cart

1. Navigate to "Shop" or "Products" section (or find Add to Cart button)
2. Verify product list displays with:
   - Product name
   - Price
   - Image
   - "Add to Cart" button
3. Click "Add to Cart" on any product (e.g., "Laptop Stand")
4. Verify cart updates

**Acceptance Criteria**:
- ✅ Product list displays **at least 3 products** with name, price, image
- ✅ "Add to Cart" button present for each product
- ✅ Clicking "Add to Cart" shows success notification: **"Added to cart"**
- ✅ Cart count in header updates (shows "Cart (1)" instead of empty)
- ✅ Success notification displays for **at least 2 seconds**
- ✅ **No console errors**

#### Part B: Persist Cart Across Refresh

5. Verify cart shows 1 item with product details
6. **Refresh page** (Ctrl+R or Cmd+R)
7. Wait for page to reload

**Acceptance Criteria**:
- ✅ Page reloads successfully
- ✅ Contact list loads (shows contacts)
- ✅ Cart **still shows 1 item** (persisted to localStorage)
- ✅ Cart header still shows "Cart (1)"
- ✅ Product details intact (name, price, quantity)

#### Part C: Remove Item

8. From cart, click "Remove" button on the item
9. Verify removal

**Acceptance Criteria**:
- ✅ Item removed from cart immediately
- ✅ Cart now shows **0 items**
- ✅ **Correct item removed** (if multiple items, verify right one deleted)
- ✅ Empty state message appears: **"Your cart is empty"** or similar
- ✅ Cart count in header updates to empty
- ✅ **No console errors**

#### Part D: Add Multiple Items & Update Quantity

10. Add 2-3 different products to cart
11. From cart, change quantity of one item (e.g., from 1 to 3)
12. Verify total price updates

**Acceptance Criteria**:
- ✅ Cart displays all 2-3 items correctly
- ✅ Changing quantity updates **total price** for that item
- ✅ **Overall cart total** recalculated correctly
- ✅ localStorage updated on every change (verify via DevTools → Application → localStorage)

**Expected Appearance**:
```
Cart (3 items)

Products:
┌──────────────────────────────────────────┐
│ Laptop Stand              $29.99          │
│ Qty: [1] [2] [3] ▼  Remove   Subtotal: $29.99
│                                          │
│ Wireless Mouse           $24.99          │
│ Qty: [1] [1] [2] ▼  Remove   Subtotal: $24.99
│                                          │
│ USB Hub                  $19.99          │
│ Qty: [1] [1] [1] ▼  Remove   Subtotal: $19.99
└──────────────────────────────────────────┘

Cart Total: $74.97

[Clear Cart]  [Checkout]
```

**Troubleshooting**:
- If cart doesn't persist: Check localStorage ('cart' key) in DevTools
- If quantity doesn't update total: Verify Redux selector calculateCartTotal()
- If wrong item removed: Check CartItem comparison logic (product ID match)

---

### Scenario 5: Error Handling & Recovery ⚠️

**Objective**: Verify error messages display and retry mechanism works.

**Prerequisites**: Dev server running

**Steps**:

#### Part A: Simulate Network Error

1. Open DevTools (F12)
2. Go to Network tab
3. Enable throttling: **Offline** mode
4. Attempt to load contacts (reload page or click "Retry")
5. Verify error message appears

**Acceptance Criteria**:
- ✅ Error message displays: **"Failed to load contacts. [Retry Button]"** (inline, not blocking)
- ✅ Error message is **user-friendly** (no stack traces)
- ✅ "[Retry]" button present
- ✅ **No console errors** (only a console.error log is acceptable)

#### Part B: Test Retry

6. Restore network: DevTools → Network → set back to normal throttling
7. Click "[Retry]" button
8. Verify contacts load

**Acceptance Criteria**:
- ✅ Clicking retry **re-attempts** API call
- ✅ If retry succeeds, contacts display
- ✅ Error message disappears
- ✅ Retry happens **automatically up to 3 times** (exponential backoff: 1s, 2s, 4s)

#### Part C: Test Form Submission Error

9. Open Add Contact form
10. Throttle network to Offline
11. Try to submit form with valid data
12. Verify error appears

**Acceptance Criteria**:
- ✅ Error message shows: **"Failed to add contact. [Retry Button]"**
- ✅ Form data **not cleared** (user can retry or cancel)
- ✅ Submit button re-enabled for retry

**Expected Appearance**:
```
Error: Failed to load contacts
[Retry Button]

(Or inline within each section that failed)
```

**Troubleshooting**:
- If no error message: Check error handling in Redux reducers
- If stack traces shown: Verify error transformation in error boundary

---

### Scenario 6: Unsaved Changes Warning ⚠️ 📝

**Objective**: Verify navigation warning appears when user has unsaved form changes.

**Prerequisites**: Scenario 1 complete

**Steps**:

1. Open "Add Contact" form
2. Fill in **Name field**: `John Doe`
3. **DO NOT click Submit**
4. Click "Back" or navigate away (e.g., click contact in list, or navigate to shop)
5. Verify confirmation dialog appears

**Acceptance Criteria**:
- ✅ Confirmation dialog shows with message: **"Are you sure you want to leave? Changes will not be saved."**
- ✅ Two buttons present:
  - "Cancel" (return to form with data intact)
  - "Discard" (navigate away, lose data)
- ✅ Clicking "Cancel" returns to form
- ✅ Form data still present (e.g., `John Doe` still in Name field)
- ✅ Clicking "Discard" navigates away without saving
- ✅ Subsequent re-opening of form shows empty fields

#### Part B: No Warning for Cart

6. Add item to cart
7. Navigate away (click contact, reload page, etc.)

**Acceptance Criteria**:
- ✅ **No warning appears** (cart auto-saves to localStorage)
- ✅ Navigation proceeds immediately
- ✅ Cart data persists (as verified in Scenario 4)

**Expected Appearance**:
```
╔════════════════════════════════════╗
║ Unsaved Changes                    ║
║                                    ║
║ Are you sure you want to leave?    ║
║ Changes will not be saved.         ║
║                                    ║
║  [Cancel]  [Discard]               ║
╚════════════════════════════════════╝
```

**Troubleshooting**:
- If no warning: Check useBlocker hook in ContactForm or form component
- If warning appears for cart: Verify warning only applies to forms, not auto-saving fields

---

## Test Execution: Automated Tests

### Run Unit Tests

```bash
npm run test
```

**Expected Output**:
```
Vitest v0.x.x (test runner)

PASS  src/utils/validation.test.ts
  ✓ validateEmail should accept valid emails (2ms)
  ✓ validateEmail should reject invalid emails (1ms)
  ✓ validatePhone should accept valid phones (1ms)

PASS  src/hooks/useContacts.test.ts
  ✓ useContacts should fetch contacts on mount (45ms)
  ✓ useContacts should handle errors gracefully (10ms)

PASS  src/components/Contact/ContactForm.test.tsx
  ✓ ContactForm should validate email on blur (22ms)
  ✓ ContactForm should disable submit when invalid (8ms)

...

Test Files: 15 passed (15)
Tests: 95 passed (95)
Coverage: 81.2% (target: 80%)
```

**Acceptance Criteria**:
- ✅ **All tests pass** (0 failures)
- ✅ **Coverage >= 80%** (critical paths 100%)
- ✅ No warnings or console errors

### Run Type Checking

```bash
npm run type-check
```

**Expected Output**:
```
✓ No errors
```

**Acceptance Criteria**:
- ✅ Zero TypeScript errors
- ✅ Zero `any` types in production code
- ✅ All types explicit and documented

### Run Linting

```bash
npm run lint
```

**Expected Output**:
```
✓ No ESLint errors
✓ All files pass Prettier formatting
```

**Acceptance Criteria**:
- ✅ Zero ESLint errors (or only warnings)
- ✅ Zero Prettier formatting violations
- ✅ Code follows 19 constitution principles

### Build for Production

```bash
npm run build
```

**Expected Output**:
```
vite v5.x.x build (target: esnext)
✓ built in 2.3s

dist/index.html               1.2 kb
dist/assets/index-abc123.js   42.5 kb
dist/assets/index-def456.css  8.3 kb

Bundle is optimized.
```

**Acceptance Criteria**:
- ✅ Build completes without errors
- ✅ `dist/` folder created with assets
- ✅ Bundle size reasonable (< 100kb JS + CSS combined)

---

## Performance Benchmarks

| Metric | Target | Measured | Status |
|--------|--------|----------|--------|
| Initial load (empty cache) | < 2s | _____ | ⏳ |
| Contact list render | < 100ms | _____ | ⏳ |
| Contact detail navigation | < 1s | _____ | ⏳ |
| Form submission | < 2s | _____ | ⏳ |
| Cart add/remove | < 500ms | _____ | ⏳ |
| Page refresh (cart persist) | < 1s | _____ | ⏳ |

*Fill in measured values during testing*

---

## Sign-Off Checklist

Use this checklist to confirm the feature is complete and ready for production:

- [ ] Scenario 1: Contact List Loads ✅
- [ ] Scenario 2: View Details ✅
- [ ] Scenario 3: Add Contact ✅
- [ ] Scenario 4: Shopping Cart ✅
- [ ] Scenario 5: Error Handling ✅
- [ ] Scenario 6: Unsaved Changes ✅
- [ ] Unit Tests: All passing ✅
- [ ] Type Checking: Zero errors ✅
- [ ] Linting: Zero errors ✅
- [ ] Build: Success ✅
- [ ] Performance: Meets targets ✅
- [ ] No console errors or warnings ✅
- [ ] Accessibility: All interactive elements keyboard navigable ✅

---

## Deployment Readiness

**Production Checklist**:
- [ ] `.env.production` configured with production API URL
- [ ] Secrets NOT committed (use GitHub Secrets or deployment platform)
- [ ] Build process tested and reproducible
- [ ] Static assets cached properly (Cache-Control headers)
- [ ] CORS configured if API on different domain
- [ ] Error tracking/logging configured (Sentry, LogRocket, etc.)
- [ ] Monitoring/alerts set up (uptime, errors, performance)
- [ ] Documentation deployed (API, deployment, troubleshooting)
- [ ] Team notified of release
- [ ] Rollback plan in place

---

**Quickstart Version**: 1.0.0  
**Last Updated**: 2026-10-14  
**References**: [spec.md](./spec.md), [data-model.md](./data-model.md), [plan.md](./plan.md)
