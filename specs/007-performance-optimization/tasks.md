# Tasks: Performance Optimization (Spec 007)

**Feature**: Performance Optimization  
**Feature Number**: 007  
**Created**: 2026-10-14  
**Total Tasks**: 20  
**Estimated Duration**: Phase 4 (8 hours)

---

## Implementation Strategy

**MVP Scope**: Code splitting + Bundle analysis + Lighthouse validation
- Route-based code splitting
- Component lazy loading
- Redux selector memoization
- Lighthouse score > 90

**Incremental Delivery**:
1. Phase 1: Build-time optimization (Vite, tree-shaking)
2. Phase 2: Code splitting and lazy loading
3. Phase 3: Runtime optimization (memoization, virtual scrolling)
4. Phase 4: Performance monitoring and reporting

---

## Phase 1: Build-Time Optimization

**Goal**: Minimize and optimize production bundle  
**Test Criteria**: Bundle < 500KB gzip, build time < 3 minutes, no unused code

### Vite Build Configuration

- [ ] T001 Update `vite.config.ts` with build optimization:
  - target: 'es2023' for modern JavaScript
  - minify: 'esbuild' (faster than terser)
  - sourcemap: true (for production debugging)
  - rollupOptions.output.manualChunks: define vendor chunks

- [ ] T002 Configure vendor chunk splitting in `vite.config.ts`:
  - Separate React/ReactDOM into vendor chunk
  - Separate Redux into vendor chunk
  - Separate Tailwind utilities (if possible)

- [ ] T003 Enable tree-shaking verification:
  - Run build with `--analyze` flag (vite-plugin-analyze or rollup-plugin-visualizer)
  - Verify unused exports removed
  - Document manual tree-shaking (if needed)

### Build Profiling

- [ ] T004 Add build-stats script to `package.json`:
  - `npm run build:analyze` - visualize bundle size
  - `npm run build:stats` - JSON report of bundle breakdown
  - Commits size report to BUNDLE_SIZE.md

- [ ] T005 Create `BUNDLE_SIZE.md` tracking history:
  - Date, version, total size (gzip), breakdown by chunk
  - Track trend (should improve or stay flat)

---

## Phase 2: Code Splitting and Lazy Loading

**Goal**: Load code on-demand to reduce initial bundle  
**Test Criteria**: Initial load < 200KB, route transition < 500ms

### Route-Based Code Splitting

- [ ] T006 Implement lazy-loaded routes in `src/App.tsx`:
  - Use React.lazy for route components
  - ContactListPage: lazy-loaded
  - ContactDetailPage: lazy-loaded
  - CartPage: lazy-loaded
  - Wrap with Suspense(fallback=Loading)

- [ ] T007 Create route configuration in `src/routes/index.ts`:
  - Define routes with lazy-loading
  - Preload routes on link hover (optional)

### Component Lazy Loading

- [ ] T008 [P] Lazy-load heavy components:
  - Modal: lazy-load inside component
  - ContactForm: lazy-load (form heavy with validation)
  - Charts/Analytics: if added later

- [ ] T009 [P] Create Suspense boundary in layout:
  - Global Suspense wrapper
  - Fallback: Loading spinner
  - Per-route Suspense boundaries

### Dynamic Imports

- [ ] T010 [P] Use dynamic imports for:
  - Large utilities (if applicable)
  - Optional features
  - Storybook (not bundled in production)

---

## Phase 3: Runtime Optimization

**Goal**: Minimize re-renders and memory usage  
**Test Criteria**: No unnecessary re-renders, memory steady < 50MB

### Component Memoization

- [ ] T011 [P] Wrap expensive components with React.memo:
  - ContactList component
  - ContactCard component
  - CartSummary component
  - Verify with React DevTools Profiler

- [ ] T012 [P] Optimize hook dependencies:
  - useContacts: deps=[cache TTL]
  - useCachedContacts: deps=[cache validity]
  - useCart: deps=[cart ID]
  - Avoid re-fetches on unrelated changes

### Redux Optimization

- [ ] T013 [P] Create memoized Redux selectors in `src/store/selectors/`:
  - Use reselect for derived state
  - selectVisibleContacts: filter + sort
  - selectCartTotal: sum computation
  - selectFilteredContacts: memoized filter

- [ ] T014 [P] Use useCallback in dispatches:
  - Memoize event handlers passed to components
  - Prevent child re-renders

### Virtual Scrolling (for large lists)

- [ ] T015 [P] Add react-window for contact list:
  - Install react-window
  - Replace ContactList with FixedSizeList (if list > 100 items)
  - Benchmark: render time for 1000 items

### Image Optimization

- [ ] T016 [P] Optimize images (if used):
  - Use modern formats (WebP with fallback)
  - Responsive sizes (srcset)
  - Lazy load images (loading="lazy")

---

## Phase 4: Performance Monitoring

**Goal**: Measure, track, and enforce performance targets  
**Test Criteria**: Lighthouse > 90, Core Web Vitals tracked, budget enforced

### Lighthouse CI

- [ ] T017 Setup Lighthouse CI in GitHub Actions:
  - Install @lhci/cli
  - Create `lighthouserc.json` with thresholds
  - Run Lighthouse on every build
  - Fail if score < 90 (or configurable threshold)
  - Upload results to LHCI server (optional)

- [ ] T018 Configure Lighthouse thresholds in `lighthouserc.json`:
  - Performance: 90
  - Accessibility: 90
  - Best Practices: 90
  - SEO: 90
  - PWA: N/A (not required)

### Performance Budget

- [ ] T019 Create `performance-budget.json`:
  - Total bundle: 500KB
  - Vendor chunk: 300KB
  - App chunk: 100KB
  - Routes: 50KB each
  - Run bundle-budget check in CI

### Web Vitals Tracking

- [ ] T020 Implement Web Vitals tracking in `src/utils/vitals.ts`:
  - Largest Contentful Paint (LCP)
  - First Input Delay (FID) / Interaction to Next Paint (INP)
  - Cumulative Layout Shift (CLS)
  - Send to analytics (optional)
  - Log in development (console)

---

## Summary Statistics

- **Build Optimization (T001-T005)**: 5 tasks, ~2 hours
- **Code Splitting (T006-T010)**: 5 tasks [P], ~2 hours
- **Runtime Optimization (T011-T016)**: 6 tasks [P], ~2.5 hours
- **Monitoring (T017-T020)**: 4 tasks, ~1.5 hours
- **Total MVP (Phase 1-3)**: 15 tasks, ~6.5 hours

---

## Parallel Execution Matrix

**Phase 1 Parallelization**:
```
T001 ─→ Vite optimization
T002 ─→ Vendor splitting
T003 ─→ Tree-shaking verification
T004-T005 ─→ Build stats (sequential for setup)
```

**Phase 2 Parallelization**:
```
T006 ─→ Route-based splitting
T007 ─→ Route configuration
T008-T010 ─→ Component lazy loading (parallel)
```

**Phase 3 Parallelization**:
```
T011-T012 ─→ Component memoization (parallel)
T013-T014 ─→ Redux optimization (parallel)
T015 ─→ Virtual scrolling
T016 ─→ Image optimization
```

**Phase 4 Parallelization**:
```
T017-T018 ─→ Lighthouse CI (sequential for setup)
T019 ─→ Performance budget
T020 ─→ Web Vitals tracking
```

---

## Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint | < 2s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Web Vitals |
| Time to Interactive | < 3s | Lighthouse |
| Total Bundle Size | < 500KB (gzip) | Build stats |
| Initial Route | < 200KB | Bundle analysis |
| Vendor Chunk | < 300KB | Build stats |
| API Response | < 1s (p95) | Application monitoring |
| Memory Usage | < 50MB | DevTools |
| Lighthouse Score | > 90 | Lighthouse CI |

---

## Files to Create/Modify

**Configuration**:
- `vite.config.ts` - Build optimization settings
- `lighthouserc.json` - Lighthouse CI thresholds
- `performance-budget.json` - Bundle size limits

**Source Code**:
- `src/App.tsx` - Lazy-loaded routes with Suspense
- `src/routes/index.ts` - Route definitions with lazy components
- `src/store/selectors/` - Memoized selectors with reselect
- `src/utils/vitals.ts` - Web Vitals tracking
- `src/components/*` - React.memo wrapped components
- `src/hooks/*` - Optimized dependencies

**Documentation**:
- `BUNDLE_SIZE.md` - Bundle size tracking history
- `performance-budget.json` - Budget documentation

---

## Build Optimization Checklist

- [ ] Vite minification enabled
- [ ] Tree-shaking verified (no unused code)
- [ ] Vendor chunks separated
- [ ] Source maps in production (for debugging)
- [ ] Bundle size < 500KB gzip
- [ ] Build time < 3 minutes
- [ ] Bundle analysis tool available
- [ ] Size tracking in CI/CD

---

## Runtime Optimization Checklist

- [ ] React.memo on expensive components
- [ ] Redux selectors memoized with reselect
- [ ] useCallback on event handlers
- [ ] useMemo on expensive computations
- [ ] Route lazy-loading with Suspense
- [ ] Virtual scrolling for large lists (if needed)
- [ ] No unnecessary re-renders (verified with Profiler)
- [ ] Memory leaks checked (DevTools memory profiler)

---

## Monitoring Setup

- [ ] Lighthouse CI in GitHub Actions
- [ ] Performance budget enforced in CI
- [ ] Web Vitals tracked in application
- [ ] Bundle size tracked in BUNDLE_SIZE.md
- [ ] Performance regression detected automatically
- [ ] Reports generated for every build

---

## Next Steps

1. Execute Phase 1 (T001-T005) - Build optimization
2. Test bundle size and build time
3. Execute Phase 2 (T006-T010) - Code splitting
4. Test route lazy-loading with DevTools
5. Execute Phase 3 (T011-T016) - Runtime optimization
6. Profile with React DevTools Profiler
7. Execute Phase 4 (T017-T020) - Monitoring setup
8. Validate Lighthouse score > 90
