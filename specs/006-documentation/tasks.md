# Tasks: Documentation and Developer Guide (Spec 006)

**Feature**: Documentation and Developer Guide  
**Feature Number**: 006  
**Created**: 2026-10-14  
**Total Tasks**: 18  
**Estimated Duration**: Phase 2 (6 hours)

---

## Implementation Strategy

**MVP Scope**: README + Architecture docs + OpenAPI spec
- Project overview and quick start
- Architecture and data flow documentation
- API documentation (OpenAPI/Swagger spec)
- Developer setup guide

**Incremental Delivery**:
1. Phase 1: Developer onboarding (README, setup guide)
2. Phase 2: Architecture documentation (design, data flow)
3. Phase 3: API documentation (OpenAPI/Swagger)
4. Phase 4: Troubleshooting and advanced topics

---

## Phase 1: Developer Onboarding

**Goal**: Enable new developers to setup and run project in < 15 minutes  
**Test Criteria**: Setup completes without errors, app runs, tests pass

### README Creation

- [X] T001 Create `README.md` with sections:
  - Project overview (1 paragraph)
  - Features (bullet list from spec)
  - Tech stack (list with versions)
  - Quick start (copy-paste commands)
  - Prerequisites (Node 18+, npm 9+)
  - File structure overview
  - Available scripts
  - Links to docs

- [ ] T002 Create `CONTRIBUTING.md` with:
  - Development workflow (fork, branch, PR)
  - Code conventions (TypeScript strict, no `any`)
  - Commit message format
  - Testing requirements (coverage thresholds)
  - Pull request checklist
  - Code review process

### Setup Guide

- [ ] T003 Create `docs/SETUP.md` with step-by-step:
  - Clone repository
  - Install Node.js 18+ (link to nvm guide)
  - Run `npm install`
  - Setup environment (.env.development)
  - Run `npm run dev`
  - Access app at localhost:5173
  - Run tests: `npm run test`
  - Verify setup complete
  - Troubleshooting common errors

- [ ] T004 Create `.nvmrc` with Node version (18.x)

---

## Phase 2: Architecture Documentation

**Goal**: Document system design, data flow, and component hierarchy  
**Test Criteria**: Diagrams clear, explanations complete, code examples match

### Architecture Overview

- [X] T005 Create `docs/architecture/repository-overview.md` with:
  - System overview (app, API, storage)
  - Technology stack rationale
  - Component hierarchy (Common, Contact, Shopping)
  - Redux state structure (contacts, cart, form, UI slices)
  - API integration strategy (MSW mocks, JSONPlaceholder real)

### Data Flow Documentation

- [ ] T006 Create data flow diagrams in `docs/ARCHITECTURE.md`:
  - Contact list fetching (API → Redux → Components)
  - Cart persistence (Redux → localStorage → Redux on startup)
  - Form submission (Form → Validation → Redux → API)
  - Error handling (API error → Redux error state → UI)

### File Structure Documentation

- [ ] T007 Create `docs/FILE_STRUCTURE.md` with:
  - Directory overview
  - Purpose of each directory
  - Key files and their responsibilities
  - Example: `src/components/` → Common, Contact, Shopping subfolders

### Design Decisions Documentation

- [ ] T008 Create `docs/DESIGN_DECISIONS.md` with:
  - Build tool: Vite (why not webpack/parcel)
  - State management: Redux (why not Zustand/MobX)
  - Styling: Tailwind (why not styled-components)
  - API mocking: MSW (why not fixtures)
  - Cache strategy: 5-minute TTL (vs event-based)
  - Each decision includes: context, alternatives considered, tradeoffs

### API Client Documentation

- [X] T009 [P] Create `docs/api/contact-api.md` with:
  - API client overview
  - Retry logic (exponential backoff)
  - Error handling strategy
  - Timeout configuration (5 seconds)
  - Usage examples (useContacts hook)
  - Mocking strategy with MSW

---

## Phase 3: API Documentation (OpenAPI/Swagger)

**Goal**: Document API contracts with interactive UI  
**Test Criteria**: OpenAPI spec valid, Swagger UI runs, examples work

### OpenAPI Specification

- [X] T010 Create `public/swagger/openapi.yaml` with:
  - API info (title, version, description)
  - Servers (dev: localhost:5173, staging, production)
  - Paths:
    - GET /users - list contacts
    - GET /users/{id} - get contact
    - POST /users - create contact
    - PUT /users/{id} - update contact
    - DELETE /users/{id} - delete contact
  - Schemas: Contact, Error, Pagination
  - Security (if applicable)
  - Response codes with descriptions

- [X] T011 Define Contact schema in `public/swagger/openapi.yaml`:
  - id: integer (required)
  - name: string (required, max length per data-model)
  - email: string (required, email format)
  - phone: string (required format per data-model)
  - address: string (optional)
  - createdAt: date-time (auto)
  - updatedAt: date-time (auto)

- [X] T012 Create error schemas in `public/swagger/openapi.yaml`:
  - 400: Bad Request (validation error)
  - 404: Not Found
  - 500: Server Error
  - Each includes: error code, message, details

### Swagger UI Integration

- [ ] T013 Setup Swagger UI server in `src/server.ts`:
  - Install swagger-ui-express
  - Mount Swagger UI at /api/docs
  - Load OpenAPI spec from swagger/openapi.yaml
  - Disable "Try it out" in production (or hide credentials)

- [ ] T014 Add Swagger endpoint to `package.json` startup:
  - Dev server includes Swagger UI
  - Health check ping working

### API Documentation in Code

- [ ] T015 [P] Add JSDoc annotations to API client functions:
  - `getContacts()` - document response, errors, retry behavior
  - `getContactById(id)` - document path parameter, response
  - `createContact(data)` - document payload, response, validation
  - Each with @param, @returns, @throws

- [ ] T016 [P] Create API usage examples in `docs/API_USAGE.md`:
  - Fetch all contacts
  - Get single contact
  - Create contact with validation
  - Error handling example
  - Using useContacts hook

---

## Phase 4: Troubleshooting & Advanced Topics

**Goal**: Help developers solve common issues, understand advanced patterns  
**Test Criteria**: Guides solve actual problems, examples work

### Troubleshooting Guide

- [ ] T017 Create `docs/TROUBLESHOOTING.md` with:
  - "npm install fails" → Clear npm cache, use node 18+
  - "Dev server won't start" → Check port 5173 in use
  - "Tests fail with ENOTFOUND" → Ensure MSW running
  - "Redux state not updating" → Check Redux DevTools
  - "TypeScript errors in tests" → Run npm run type-check
  - Each includes: symptoms, causes, solutions

### Advanced Topics

- [ ] T018 Create `docs/ADVANCED.md` with:
  - Performance optimization (code splitting, lazy loading)
  - Redux DevTools setup and usage
  - Debugging with React DevTools
  - Custom hooks best practices
  - Component testing patterns
  - API mocking patterns with MSW

---

## Summary Statistics

- **Onboarding (T001-T004)**: 4 tasks, ~1 hour
- **Architecture (T005-T009)**: 5 tasks [P], ~2 hours
- **API Docs (T010-T016)**: 7 tasks [P], ~2.5 hours
- **Troubleshooting (T017-T018)**: 2 tasks, ~0.5 hours
- **Total MVP (Phase 1-3)**: 16 tasks, ~5.5 hours

---

## Parallel Execution Matrix

**Phase 1 Parallelization**:
```
T001 ─→ README
T002 ─→ CONTRIBUTING
T003 ─→ SETUP
T004 ─→ .nvmrc (quick)
```

**Phase 2 Parallelization**:
```
T005 ─→ ARCHITECTURE overview
T006 ─→ Data flow diagrams
T007 ─→ FILE_STRUCTURE
T008 ─→ DESIGN_DECISIONS
T009 ─→ API_CLIENT (independent)
```

**Phase 3 Parallelization**:
```
T010 ─→ OpenAPI spec creation
T011 ─→ Schema definitions
T012 ─→ Error schemas
T013 ─→ Swagger UI setup
T014 ─→ Package.json update
T015-T016 ─→ Code examples (parallel)
```

**Phase 4 Parallelization**:
```
T017 ─→ TROUBLESHOOTING
T018 ─→ ADVANCED
```

---

## Files to Create/Modify

**Root Documentation**:
- `README.md` - Project overview and quick start
- `CONTRIBUTING.md` - Developer guidelines
- `.nvmrc` - Node version specification

**Detailed Docs** (`/docs/`):
- `docs/SETUP.md` - Setup instructions
- `docs/ARCHITECTURE.md` - System design and data flow
- `docs/FILE_STRUCTURE.md` - Directory overview
- `docs/DESIGN_DECISIONS.md` - Why decisions were made
- `docs/API_CLIENT.md` - API client guide
- `docs/TROUBLESHOOTING.md` - Common issues and solutions
- `docs/ADVANCED.md` - Advanced topics

**API Documentation**:
- `swagger/openapi.yaml` - OpenAPI specification
- `docs/API_USAGE.md` - API usage examples

**Source Code**:
- `src/server.ts` - Swagger UI endpoint setup (or new file)

---

## Documentation Standards

- **Links**: Relative paths within docs/ directory
- **Code blocks**: Copy-paste ready, tested
- **Audience**: Developers (not end users)
- **Examples**: Real code from project
- **Updates**: Keep in sync with code changes

---

## Next Steps

1. Execute Phase 1 (T001-T004) - Onboarding docs
2. Execute Phase 2 (T005-T009) - Architecture docs
3. Execute Phase 3 (T010-T016) - API documentation
4. Execute Phase 4 (T017-T018) - Troubleshooting
5. Add links from README to all docs
6. Test setup guide with fresh clone
