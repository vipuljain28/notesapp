# Tasks: Build and Deployment Pipeline (Spec 005)

**Feature**: Build and Deployment Pipeline  
**Feature Number**: 005  
**Created**: 2026-10-14  
**Total Tasks**: 22  
**Estimated Duration**: Phase 3-4 (10 hours)

---

## Implementation Strategy

**MVP Scope**: GitHub Actions CI/CD + Docker containerization
- Local build validation (Vite)
- GitHub Actions workflow (build → test → lint)
- Docker image creation and registry push
- Staging/production deployment

**Incremental Delivery**:
1. Phase 1: GitHub Actions CI/CD pipeline
2. Phase 2: Docker containerization
3. Phase 3: Deployment automation
4. Phase 4: Monitoring and rollback procedures

---

## Phase 1: GitHub Actions CI/CD Pipeline

**Goal**: Automate build, lint, and test on every push  
**Test Criteria**: Workflow runs, all steps pass, artifacts created

### Workflow File Creation

- [ ] T001 Create `.github/workflows/ci.yml` with:
  - Trigger: on push to main/dev branches
  - Run on: ubuntu-latest
  - Node version: 18.x
  - Checkout code
  - Setup Node.js
  - Install dependencies
  - Run lint (npm run lint)
  - Run type-check (npm run type-check)
  - Run tests (npm run test)
  - Build project (npm run build)

- [ ] T002 Create `.github/workflows/build-and-push.yml` with:
  - Trigger: on successful CI completion (workflow_run)
  - Build Docker image
  - Tag image with commit SHA and 'latest'
  - Push to container registry (GitHub Container Registry or Docker Hub)

### Workflow Optimization

- [ ] T003 Add dependency caching in CI workflow (npm cache strategy)
- [ ] T004 Add build artifact caching (dist/ directory)
- [ ] T005 Add workflow status badge to README.md

### Secret Management

- [ ] T006 Document required secrets in `.github/SECRETS.md`:
  - REGISTRY_USERNAME
  - REGISTRY_PASSWORD
  - REGISTRY_URL
  - SLACK_WEBHOOK_URL (optional notifications)

---

## Phase 2: Docker Containerization

**Goal**: Create production-ready Docker image  
**Test Criteria**: Image builds without errors, runs locally, health checks pass

### Dockerfile Setup

- [ ] T007 Create `Dockerfile` with multi-stage build:
  - **Stage 1 (Build)**: Node 18 alpine, install deps, run build (npm run build)
  - **Stage 2 (Runtime)**: Node 18 alpine, copy dist/, setup server
  - Expose port 5173 (dev) or 3000 (prod)
  - Health check endpoint: /health

- [ ] T008 Create `.dockerignore` with patterns:
  - node_modules/
  - dist/
  - .git/
  - .env*.local
  - coverage/
  - .next/

### Docker Compose (Optional, for local development)

- [ ] T009 Create `docker-compose.yml` for local multi-container setup:
  - app service: contact-manager image
  - ports: 3000:3000
  - environment: .env.development
  - volumes: src/ for live reload (dev mode)

### Runtime Configuration

- [ ] T010 Create `docker-entrypoint.sh` to:
  - Source environment variables from /run/secrets/ (Kubernetes)
  - Start application server
  - Execute health check on startup

- [ ] T011 Update `package.json` with production server script:
  - `npm run start:prod` - runs compiled app with Node server (not dev server)
  - Consider express or http-server for serving dist/

---

## Phase 3: Build Optimization & Artifacts

**Goal**: Optimize build size, create deployable artifacts  
**Test Criteria**: Build < 500KB gzip, build time < 3 minutes

### Build Optimization

- [ ] T012 Update `vite.config.ts` with:
  - Build target: ES2023
  - Minify: esbuild
  - Source maps: enabled for debugging
  - Report compressed size

- [ ] T013 Create bundle analysis in CI workflow:
  - Run `npm run build` with size reporting
  - Add size comment to PR
  - Track size over time

### Environment-Specific Builds

- [ ] T014 Create `vite.config.ts` modes:
  - development: HMR, no minify, source maps
  - staging: minify, source maps, performance monitoring hooks
  - production: full optimization, source maps, telemetry

- [ ] T015 Create `.env.staging` with staging API URL and configs
- [ ] T016 Update GitHub Actions to build staging image on release branch

### Build Artifacts

- [ ] T017 Create build artifact upload in CI workflow:
  - Compress dist/ as zip
  - Upload as GitHub Actions artifact
  - Available for 30 days

---

## Phase 4: Deployment Automation

**Goal**: Automate deployment to staging/production environments  
**Test Criteria**: Deployment succeeds, app runs post-deployment, rollback available

### Deployment Workflow

- [ ] T018 Create `.github/workflows/deploy.yml` with:
  - Trigger: manual (workflow_dispatch) + release creation
  - Environment: staging or production (input parameter)
  - Prerequisites: CI successful
  - Deploy steps:
    1. Pull Docker image from registry
    2. Stop running container
    3. Start new container with image
    4. Run health check
    5. Log deployment status
    6. Notify on Slack/email (optional)

- [ ] T019 Create deployment approval gates:
  - Require approval for production deployments
  - Track deployment history in DEPLOYMENT_LOG.md
  - Rollback procedure documented

### Health Checks

- [ ] T020 Implement health check endpoint in `src/server.ts` (or app):
  - GET /health - returns 200 if ready
  - GET /healthz - liveness probe
  - Returns: { status: 'ok', timestamp, version }

- [ ] T021 Add health check to Docker: `HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD node /app/health-check.js`

### Deployment Documentation

- [ ] T022 Create `docs/DEPLOYMENT.md` with:
  - Prerequisites (Docker, registry access, secrets)
  - Local deployment test (docker-compose up)
  - CI/CD workflow overview
  - Manual deployment steps
  - Rollback procedure
  - Monitoring setup
  - Troubleshooting common issues

---

## Summary Statistics

- **CI/CD Pipeline (T001-T006)**: 6 tasks, ~2 hours
- **Docker Setup (T007-T011)**: 5 tasks, ~2 hours
- **Build Optimization (T012-T017)**: 6 tasks, ~3 hours
- **Deployment (T018-T022)**: 5 tasks, ~2 hours
- **Total MVP (Phase 1-2)**: 11 tasks, ~4 hours

---

## Parallel Execution Matrix

**Phase 1 Parallelization**:
```
T001 ─→ CI workflow
T002 ─→ Build-and-push workflow
T003-T005 ─→ Optimization (parallel)
T006 ─→ Secrets documentation
```

**Phase 2 Parallelization**:
```
T007 ─→ Dockerfile
T008 ─→ .dockerignore
T009 ─→ docker-compose.yml
T010-T011 ─→ Runtime config (sequential for app startup)
```

**Phase 3 Parallelization**:
```
T012 ─→ Vite optimization
T013 ─→ Bundle analysis
T014-T016 ─→ Environment builds (parallel)
T017 ─→ Artifact upload
```

**Phase 4 Parallelization**:
```
T018 ─→ Deployment workflow
T019 ─→ Approval gates
T020-T021 ─→ Health checks (parallel)
T022 ─→ Documentation
```

---

## Files to Create/Modify

**GitHub Actions**:
- `.github/workflows/ci.yml` - Build, lint, test workflow
- `.github/workflows/build-and-push.yml` - Docker build and push
- `.github/workflows/deploy.yml` - Deployment automation
- `.github/SECRETS.md` - Secret requirements documentation

**Docker**:
- `Dockerfile` - Multi-stage production image
- `.dockerignore` - Exclude files from image
- `docker-compose.yml` - Local development orchestration
- `docker-entrypoint.sh` - Container startup script

**Configuration**:
- `vite.config.ts` - Updated with build optimization
- `.env.staging` - Staging environment config

**Source**:
- `src/server.ts` or app entry - Health check endpoint
- `scripts/health-check.js` - Standalone health check script

**Documentation**:
- `docs/DEPLOYMENT.md` - Deployment procedures
- `DEPLOYMENT_LOG.md` - Deployment history tracking

---

## Environment Variables

**Required Secrets** (GitHub Actions):
- REGISTRY_USERNAME
- REGISTRY_PASSWORD
- REGISTRY_URL

**Build-Time** (.env.staging, .env.production):
- VITE_API_URL
- VITE_APP_NAME
- VITE_LOG_LEVEL

---

## Next Steps

1. Execute Phase 1 (T001-T006) - CI/CD pipeline
2. Execute Phase 2 (T007-T011) - Docker setup
3. Test local deployment (docker-compose up)
4. Execute Phase 3 (T012-T017) - Build optimization
5. Execute Phase 4 (T018-T022) - Deployment automation
6. Test end-to-end deployment workflow
