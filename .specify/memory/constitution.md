<!-- SYNC IMPACT REPORT
Version: 0.1.0 → 1.0.0 (MINOR: Initial constitution for Angular→React migration)
Modified Principles: N/A (new document)
Added Sections: 5 (Foundation, JavaScript/TypeScript, React, Code Style, Governance)
Removed Sections: N/A
Deferred TODOs: None
Status: Initial draft for React migration framework
-->

# Project Constitution: contact-manager

**Version**: 1.0.0  
**Ratification Date**: 2026-10-14  
**Last Amended**: 2026-10-14

## Overview

This constitution establishes governance, naming conventions, and coding practices for the contact-manager project during its migration from Angular 6 to React. It serves as the authoritative source for architectural decisions, code quality standards, and development workflows.

All contributors MUST follow these principles. Deviations require documented amendment to this constitution.

---

## Foundation Principles

### P1: Single Responsibility

**Rule**: Each module, component, and function MUST have a single, well-defined responsibility. Code exhibiting multiple concerns MUST be refactored or split.

**Rationale**: Single responsibility enables testing, reuse, and maintenance. It reduces cognitive load and prevents unintended side effects. React components should model one UI concern; utilities should solve one problem.

### P2: Evidence-Based Development

**Rule**: All architectural and implementation decisions MUST be grounded in measurable project evidence: source code, tests, schemas, configuration files, and verified external dependencies.

**Rationale**: The current Angular codebase lacks comprehensive documentation. Future React code MUST be documented at the point of creation. This principle prevents tribal knowledge and enables onboarding.

### P3: No External Secrets in Code

**Rule**: API keys, tokens, credentials, and sensitive configuration MUST NEVER be committed to the repository. Environment variables MUST be documented by name only, never by value.

**Rationale**: Security and compliance. The current project hard-codes the JSONPlaceholder API URL; this pattern MUST NOT be repeated in React.

---

## JavaScript/TypeScript Standards

### P4: Strict TypeScript

**Rule**: All new React code MUST use TypeScript. The project MUST enable `strict: true` in `tsconfig.json`.

**Naming**: TypeScript files MUST use `.ts` for utilities and `.tsx` for React components.

**Rationale**: TypeScript eliminates entire categories of runtime errors and improves IDE support. The current Angular project uses TypeScript 2.x; React migration MUST upgrade to the latest stable version (currently 5.x+).

### P5: Consistent Imports

**Rule**: All import statements MUST use absolute paths (via path aliases) rather than relative paths. Configure `tsconfig.json` with:
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@components/*": ["components/*"],
      "@services/*": ["services/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"],
      "@hooks/*": ["hooks/*"]
    }
  }
}
```

**Naming**: Use `@` prefix for all internal path aliases.

**Rationale**: Absolute imports improve readability and simplify refactoring. They prevent deeply nested relative paths (`../../..`).

### P6: No `any` Type

**Rule**: The TypeScript `any` type is FORBIDDEN in production code. Every value MUST have an explicit, concrete type. 

**Exception**: Only permitted in `.d.ts` type definition files when describing third-party untyped libraries.

**Rationale**: `any` defeats the purpose of TypeScript. Explicit types catch errors early and serve as live documentation.

---

## React Component Architecture

### P7: Functional Components Only

**Rule**: All React components MUST be functional components. Class components are FORBIDDEN.

**Rationale**: Functional components with hooks are simpler, more composable, and align with modern React best practices.

### P8: Component Naming and Organization

**Rule**: React components MUST follow this structure:
```
src/
├── components/
│   ├── Common/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Spinner.tsx
│   ├── Contact/
│   │   ├── ContactList.tsx
│   │   ├── ContactCard.tsx
│   │   └── ContactForm.tsx
│   └── Shopping/
│       ├── ProductList.tsx
│       ├── Cart.tsx
│       └── Checkout.tsx
├── services/
│   ├── api.ts
│   ├── contact.ts
│   └── cart.ts
├── hooks/
│   ├── useContacts.ts
│   ├── useCart.ts
│   └── useFetch.ts
├── types/
│   ├── Contact.ts
│   ├── Product.ts
│   └── Cart.ts
├── utils/
│   ├── validation.ts
│   └── formatting.ts
└── App.tsx
```

**Naming**:
- Component files: PascalCase (e.g., `ContactList.tsx`)
- Utility files: camelCase (e.g., `validation.ts`)
- Custom hooks: `use*` prefix (e.g., `useContacts.ts`)
- Type/interface files: PascalCase (e.g., `Contact.ts`)

**Rationale**: Consistent organization enables team members to locate code quickly and reduces onboarding time.

### P9: Props and State Management

**Rule**: 
- All component props MUST be defined with TypeScript interfaces and MUST be exported.
- Props interfaces MUST be named `[ComponentName]Props` and placed in the same file as the component.
- State MUST be managed using React hooks (`useState`, `useReducer`) or external library (Redux, Zustand, Jotai).
- Prop drilling (passing props 3+ levels deep) is FORBIDDEN; use context or state management instead.

**Example**:
```tsx
export interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (id: string) => void;
  isLoading: boolean;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onSelectContact,
  isLoading,
}) => {
  // Component code
};
```

**Rationale**: Explicit props eliminate hidden dependencies and improve component reusability and testability.

### P10: Custom Hooks for Business Logic

**Rule**: Complex state logic, API calls, and side effects MUST be extracted into custom hooks. Components MUST be "thin" and focus on rendering.

**Naming**: Custom hooks MUST start with `use` and describe their purpose (e.g., `useContacts`, `useFetch`).

**Example**:
```tsx
export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await contactService.list();
      setContacts(data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { contacts, loading, fetchContacts };
};
```

**Rationale**: Hooks enable logic reuse and simplify component testing.

---

## Code Style and Quality

### P11: Consistent Formatting

**Rule**: All source files MUST be formatted with Prettier using these settings:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
```

**Automation**: Format on save using VS Code's `prettier.formatOnSave` or Git pre-commit hooks.

**Rationale**: Consistent formatting reduces style debates and improves readability. No manual formatting discussions in code review.

### P12: ESLint Configuration

**Rule**: All code MUST pass ESLint with the recommended React plugin configuration:
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "no-console": "warn",
    "@typescript-eslint/explicit-function-return-types": "warn"
  }
}
```

**CI Enforcement**: ESLint MUST be run on every pull request. Commits with ESLint errors MUST NOT be merged.

**Rationale**: Automated linting catches common mistakes (unused variables, missing dependencies, prop type errors) before human review.

### P13: No Magic Numbers or Strings

**Rule**: All constants MUST be defined in a `constants.ts` file at the module root. Inline literals are FORBIDDEN except in template strings and exception messages.

**Example**:
```tsx
// constants.ts
export const CONTACT_RETRY_ATTEMPTS = 3;
export const CART_TIMEOUT_MS = 5000;
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';

// ContactList.tsx
const fetchContacts = async () => {
  for (let attempt = 0; attempt < CONTACT_RETRY_ATTEMPTS; attempt++) {
    // Retry logic
  }
};
```

**Rationale**: Constants make code self-documenting and simplify maintenance. Changing a value requires a single edit point.

### P14: Explicit Error Handling

**Rule**: Every async operation MUST include error handling. Silent failures (empty catch blocks) are FORBIDDEN.

**Pattern**:
```tsx
try {
  const data = await apiService.fetch();
  setData(data);
} catch (error) {
  console.error('Failed to fetch data:', error);
  setError(error instanceof Error ? error.message : 'Unknown error');
  // User-facing notification here
}
```

**Rationale**: The current Angular app lacks error handling. React version MUST gracefully degrade and inform users.

### P15: Testing Coverage

**Rule**: All components and hooks MUST have unit tests. Public API services MUST have integration tests.

**Minimum Coverage**:
- Components: 80% line coverage (critical paths 100%)
- Hooks: 85% line coverage
- Utilities: 90% line coverage
- Services: 75% line coverage (3rd-party integration)

**Tools**: Use Vitest + React Testing Library for unit tests.

**Rationale**: The current project has 26 Karma specs; React migration MUST maintain or exceed test coverage.

---

## Data Models

### P16: Explicit Data Contracts

**Rule**: Every API endpoint, service method, and component interface MUST have documented TypeScript types. Types MUST be stored in `src/types/`.

**Pattern**:
```typescript
// src/types/Contact.ts
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone: string;
  categories?: string[];
}

export interface ContactApiResponse {
  id: number; // JSONPlaceholder uses number IDs
  name: string;
  email: string;
  phone: string;
}
```

**Rationale**: Explicit types prevent API/component mismatches and serve as live documentation.

### P17: No In-Memory-Only State for Critical Data

**Rule**: Contact data and shopping cart MUST be persisted to localStorage or a backend API. Pure in-memory state is acceptable only for transient UI state (modal visibility, form drafts).

**Implementation**:
- Use `localStorage` for client-side persistence (cart, preferences)
- Use backend API for server-side persistence (contacts)
- Sync strategy: Write-through (update state and persistence simultaneously) or write-behind (defer to debounced flush)

**Rationale**: The current Angular app loses cart data on page refresh. React version MUST preserve user data.

---

## API Integration

### P18: Centralized API Client

**Rule**: All HTTP calls MUST go through a centralized API client module (`src/services/api.ts`). Direct `fetch()` calls are FORBIDDEN.

**Pattern**:
```typescript
// src/services/api.ts
import type { Contact, CreateContactRequest } from '@types/Contact';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';

export const apiClient = {
  contacts: {
    list: async (): Promise<Contact[]> => {
      const res = await fetch(`${API_BASE_URL}/users`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    get: async (id: string): Promise<Contact> => {
      const res = await fetch(`${API_BASE_URL}/users/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    create: async (contact: CreateContactRequest): Promise<Contact> => {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  },
};
```

**Rationale**: Centralized API client enables retry logic, request/response transformation, authentication injection, and analytics without modifying component code.

### P19: Environment-Specific Configuration

**Rule**: All environment-specific values MUST be defined in `.env` files and accessed via `process.env.REACT_APP_*` prefix.

**Required Variables**:
```
REACT_APP_API_URL=https://jsonplaceholder.typicode.com
REACT_APP_LOG_LEVEL=info
REACT_APP_ENV=development|production
```

**Never Commit**: `.env.local` (user-specific) and `.env.*.local` MUST NOT be committed.

**Rationale**: Decouples configuration from code, enabling different deployments without rebuilds.

---

## Governance

### Amendment Procedure

**Initiator**: Any contributor may propose amendments via pull request, adding a `constitution/amendment` label.

**Review**: Project maintainers MUST review and approve all amendments. Amendments require:
1. Clear rationale tied to ongoing issues or improvements
2. No removal of existing principles without documented deprecation period (minimum 1 sprint)
3. Changes to CONSTITUTION_VERSION following semantic versioning

**Approval**: Maintainers approve via merge. The amendment MUST be documented in `LAST_AMENDED_DATE` and `CONSTITUTION_VERSION`.

### Versioning Policy

**Format**: Semantic versioning `MAJOR.MINOR.PATCH`

- **MAJOR**: Backward-incompatible principle removal or fundamental redefinition
- **MINOR**: New principle added, existing principle materially expanded
- **PATCH**: Wording clarification, typo fix, example updates (no semantic change)

### Compliance Review

**Cadence**: After each major release (end of sprint/quarter)

**Scope**: 
1. Sample pull requests (5-10) to verify ESLint/Prettier compliance
2. Code review for adherence to P7-P10 (components, hooks, props)
3. Test coverage verification (P15)

**Report**: Publish compliance summary in project README under "Code Quality".

**Remediation**: Contributors in violation MUST update code before merge.

---

## Next Steps for React Migration

This constitution establishes the governance framework for contact-manager. To proceed with React migration:

1. **Use `/speckit-specify`** to document requirements for the React version (component structure, state management choice, API strategy)
2. **Use `/speckit-plan`** to map Angular → React component equivalents and dependency upgrade paths
3. **Use `/speckit-tasks`** to generate implementation tasks following this constitution

---

*This constitution is a living document. Amendments are expected as the project evolves.*
