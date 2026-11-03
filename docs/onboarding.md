# Developer Onboarding

**Repository:** `goldenpalmera/golden_palmera_global`  
**Application:** Golden Palmera Global website

## 1. Overview

Golden Palmera Global's website is a Next.js App Router application for company information, commodity and service pages, insights, and buyer/partner enquiries.

The repository includes Sanity CMS integration, Auth.js administrator authentication, Resend email, Upstash rate limiting, Prisma/PostgreSQL definitions, automated CI, Docker image workflows and a future VPS deployment pipeline.

## 2. Prerequisites

Install and configure:
- Git.
- Node.js 22 (align with CI and Docker runtime).
- npm, using the committed `package-lock.json`.
- A code editor with TypeScript/ESLint support.
- Access to the GitHub repository.
- Development credentials only when required.

Docker is useful for container-related work. Do not assume a local PostgreSQL instance is required for every task; first identify which services the task exercises.

## 3. Clone and install

```bash
git clone https://github.com/goldenpalmera/golden_palmera_global.git
cd golden_palmera_global
npm ci
```

Use `npm ci` to install the dependency tree from the lockfile. Do not replace the lockfile or switch package managers without an agreed migration.

## 4. Environment configuration

Copy the example environment file if one exists:

```bash
cp .env.example .env.local
```

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

If the repository does not contain `.env.example`, request approved variable names and a development-only configuration. Never copy production secrets into a local environment.

Variables referenced by application code or workflows may include:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset |
| `SANITY_API_TOKEN` | Server-side Sanity access |
| `SANITY_API_VERSION` | Sanity API version |
| `DATABASE_URL` | PostgreSQL connection when used |
| `AUTH_SECRET` | Auth.js session/token secret |
| `AUTH_URL` | Auth.js base URL where required |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `ADMIN_EMAIL` | Server-side administrator allowlist |
| `RESEND_API_KEY` | Resend API access |
| `RESEND_FROM_EMAIL` | Verified sender identity |
| `INQUIRY_NOTIFICATION_EMAIL` | Enquiry notification recipient |
| `UPSTASH_REDIS_REST_URL` | Upstash REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash REST credential |

This is a setup reference, not a guarantee that every variable is required by every branch. Confirm actual usage in source and workflow files. Values prefixed with `NEXT_PUBLIC_` are exposed to browser code and must never contain secrets.

## 5. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

Useful scripts from the package manifest:

```bash
npm run lint
npm run type-check
npm test
npm run test:e2e
npm run build
npm run start
```

The test script is configured for Vitest. Check the CI workflow to ensure its test step actually runs Vitest; a condition based only on Jest config files can skip tests in a Vitest-only repository.

## 6. Prisma workflow

The repository defines a PostgreSQL Prisma schema and generates the client as part of type-check/build setup.

Non-destructive checks:

```bash
npx prisma validate
npx prisma generate
```

Use migration commands only after confirming the active database and environment:

```bash
npx prisma migrate dev
```

Never run reset/drop commands against production. A Prisma model does not prove the live application currently uses PostgreSQL for enquiry persistence; inspect the active route/service implementation first.

## 7. Sanity workflow

Sanity schemas and queries are maintained in the repository's Sanity directories.

When changing content models:
1. Update the schema.
2. Update the related GROQ query.
3. Update the corresponding TypeScript type.
4. Test affected pages with realistic content.
5. Check Studio at `/studio`.
6. Confirm image handling and preview behavior.

The server-side client requires a valid `SANITY_API_TOKEN`. Never move this token into a client component or expose it through a public environment variable.

## 8. Testing expectations

Before requesting review, run checks relevant to the change:
- ESLint.
- TypeScript type-check.
- Vitest unit tests.
- Playwright tests for changed browser journeys.
- Production build.

Include test results and known limitations in the pull request. Do not claim tests passed if a command was skipped or not run.

## 9. Branch and pull-request workflow

1. Create a feature branch from the appropriate current integration branch.
2. Make a focused change and commit it.
3. Push the feature branch.
4. GitHub Actions run on each feature-branch push.
5. Open a pull request; GitHub Actions run again before merge.
6. Address failures and review feedback.
7. Merge only after required checks and approvals.
8. Promote through `develop`, `staging` and protected `main` according to the release process.

The `main` branch is protected: direct pushes are not allowed and administrator approval is required. Do not bypass branch protection.

The CI workflow also declares push and pull-request triggers for `develop`, `staging` and `main`. Confirm live rules and workflow files before changing branch policy.

## 10. Deployment awareness

The live website is currently deployed on Hostinger. The repository's Docker/GHCR/VPS pipeline is retained for a future deployment target; it is not the current production hosting path.

The deployment workflows are referred to by the team as `deploy_development`, `deploy_staging` and `deploy_production`. Workflow files in the inspected branch use hyphenated filenames. Development VPS deployment is gated by `ENABLE_VPS_DEPLOYMENT`.

Do not enable or run a VPS deployment until the target host, secrets, DNS, TLS, health endpoint, backups and rollback process have been verified.

## 11. Coding conventions

- Prefer server components for server-side data access.
- Keep client components focused on browser interactions.
- Validate API input with Zod or the established validation layer.
- Keep secrets server-side and out of source control.
- Reuse existing components, types and Sanity query patterns.
- Avoid duplicate navigation, layout or data-fetching implementations.
- Keep accessibility, responsive behavior and metadata in scope.
- Add or update tests when behavior changes.
- Avoid introducing dependencies for functionality already available in the stack.

## 12. Common troubleshooting

**Install or Prisma generation fails**
- Confirm Node.js 22 and npm.
- Run `npm ci`.
- Check Prisma configuration and environment requirements.
- Do not edit generated client files.

**Sanity content is missing**
- Check project/dataset identifiers, token permissions, schema, query and publication state.

**Google admin login fails**
- Check OAuth callback URL, client credentials, `AUTH_SECRET`, allowlist and HTTPS settings.

**Enquiry email is missing**
- Check whether the enquiry record exists first.
- Then inspect Resend sender verification, API key and delivery logs.

**Rate limiting blocks requests**
- Check Upstash configuration and application logs; do not disable protection without approval.

**CI reports success but tests did not run**
- Inspect the test-step condition and confirm the Vitest command executed.

## 13. Pull request checklist

- [ ] Change is scoped and described.
- [ ] No secrets or production data are included.
- [ ] Lint and type-check pass.
- [ ] Relevant unit/browser tests were executed.
- [ ] Build passes where applicable.
- [ ] Sanity schema/query/types are consistent.
- [ ] Accessibility and responsive behavior are checked.
- [ ] Environment/configuration changes are documented.
- [ ] Deployment impact and rollback are understood.

---
For credentials, provider dashboards or production systems, contact the project administrator. Never request or share passwords or tokens in a pull request.
