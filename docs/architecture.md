# Golden Palmera Global — System Architecture

**Status:** Engineering reference
**Repository:** `goldenpalmera/golden_palmera_global`
**Primary domain:** `https://goldenpalmeraglobal.com`

## Purpose

This document describes the website architecture, integrations, delivery pipeline and known implementation caveats. It distinguishes verified repository configuration from planned infrastructure.

Golden Palmera Global is an African agricultural commodities and international trade company. The website presents the company, commodities, services, compliance and partnership information, insights, and buyer/partner enquiry journeys.

## Technology stack

The package manifest declares Next.js 16.x App Router, React 19.2.8, TypeScript, Tailwind CSS v4, Radix UI, Lucide React, Font Awesome, Sanity, Prisma 7 with PostgreSQL provider and `pg`, Auth.js/NextAuth v5 beta, Zod 4, Resend, Upstash Redis/Ratelimit, Vitest, Playwright, Docker, GitHub Actions and GHCR. The Docker pipeline also uses Trivy, Cosign, BuildKit provenance and SBOM output. Use the lockfile for exact resolved versions; do not infer installed versions from semver ranges.

## System context

The live website is currently deployed on Hostinger. Sanity provides managed website content and is accessed through a server-only client. Resend handles enquiry notifications, Upstash supports rate limiting, and Auth.js/Google OAuth protects administrator access. A Docker/GHCR/VPS pipeline remains available for a future hosting migration; it is not the current production hosting path.

The repository contains a PostgreSQL Prisma schema and generated-client scripts. A schema does not prove that live enquiry records are written to PostgreSQL. Trace the active route and service implementation to identify the actual system of record before making persistence assumptions.

## Application architecture

The application uses the Next.js App Router. Prefer server components for server-side data access and keep client components focused on browser interactions. The Sanity Studio is mounted under `/studio`. Keep privileged tokens server-only; do not expose them through client components or `NEXT_PUBLIC_` variables.

Sanity schema changes should be accompanied by GROQ query and TypeScript type updates. Test affected pages and Studio behavior. Do not recreate datasets or delete content as a troubleshooting shortcut; export content before destructive operations.

## Data and enquiry flow

The Prisma schema defines PostgreSQL models including enquiries and rate-limit events. The production persistence path must be verified in the active implementation. Enquiry persistence and email notification are separate operations: an email delivery failure does not necessarily mean the enquiry was not saved. Check the record before asking a visitor to submit again.

The enquiry flow uses server-side validation and may include origin checks, honeypot protection, rate limiting, request identifiers and enquiry references. Statuses represented in the model include `NEW`, `IN_PROGRESS`, `CONTACTED`, `RESOLVED` and `REJECTED`.

## Authentication and authorization

Auth.js/NextAuth v5 beta uses Google OAuth for administrator access. Enforce the administrator allowlist on the server and protect each admin route and mutation independently. Authentication is not authorization. Keep `AUTH_SECRET`, OAuth credentials and other privileged values out of client bundles. Verify callback URLs independently for local, staging and production.

## Security controls

Next.js configuration includes security headers such as `nosniff`, strict-origin referrer policy, frame restrictions, Permissions Policy and HSTS. HSTS with `includeSubDomains` assumes all covered subdomains are HTTPS-ready. A nonce-based CSP/`strict-dynamic` approach has been under development; test it against Next.js runtime chunks, Turbopack, Auth.js and Sanity Studio/bridge functionality. Do not disable CSP globally to work around a blocked asset.

The container pipeline includes image/configuration scanning, non-root runtime checks, signing and provenance verification. Describe controls as enforced only after verifying successful runs in the target branch and environment.

## Build and tests

The package scripts include `npm run dev`, `npm run lint`, `npm run type-check`, `npm test`, `npm run test:e2e`, `npm run build` and `npm run start`. The test script runs `vitest run`. The checked-in CI workflow has a test-step condition based on Jest configuration files; if Vitest is used without Jest config, that condition can skip unit tests. Correct and verify this before treating CI as proof that Vitest ran. Build and type-check scripts generate the Prisma client.

## Branch and CI workflow

GitHub Actions run on every push to feature branches and on pull requests before merge. The CI workflow also declares push triggers for `develop`, `staging` and `main`, and pull-request triggers for those integration/release branches. The `main` branch is protected: direct pushes are prohibited and administrator approval is required. The intended promotion path is feature branch → `develop` → `staging` → `main`/production, subject to repository rules and release approvals.

## Hosting and deployment

**Current production host:** Hostinger.

**Future target:** VPS/OCI using Docker and GHCR. The team refers to the deployment workflows as `deploy_development`, `deploy_staging` and `deploy_production`; checked-in filenames in the inspected branch use hyphenated forms such as `deploy-development.yml`, `deploy-staging.yml` and `deploy-production.yml`. The development workflow is gated by `ENABLE_VPS_DEPLOYMENT`. Staging and production have separate trigger/approval models.

The Docker pipeline builds and publishes images, scans them with Trivy, produces provenance/SBOM metadata, signs with Cosign, verifies signatures/provenance during deployment, transfers Docker assets and runs deployment/health checks. This is a future VPS path, not proof that a VPS is currently serving production traffic.

Known verification items: deployment workflows expect `/api/health` to return JSON containing `{"status":"ok"}`, but that route was not found at the inspected path during review; the development workflow's manual-dispatch path must be checked because its job condition references `workflow_run` fields; verify GitHub Environments, secrets, branch protections and workflow filenames before enabling VPS deployment. Confirm compute, DNS, TLS, firewall, SSH, backups, monitoring and rollback before migration. Hostinger shared Business Web Hosting must not be assumed to provide Docker/VPS capabilities.

## Environment configuration

Common names referenced by code/workflows include `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `SANITY_API_VERSION`, `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL` where used, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `ADMIN_EMAIL`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `INQUIRY_NOTIFICATION_EMAIL`, `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Confirm actual usage and requirements per environment before changing configuration. Never commit populated environment files.

## Architecture principles

1. Keep CMS content and application logic separated.
2. Keep privileged integrations server-only.
3. Validate untrusted input at server boundaries.
4. Treat persistence as an explicit implementation decision, not an assumption inferred from Prisma models.
5. Distinguish current Hostinger hosting from future VPS deployment.
6. Promote immutable image tags/digests where container deployment is used.
7. Require health verification and tested rollback before production migration.
8. Separate verified behavior from planned or partially implemented controls.

## Open verification items

- Confirm the live enquiry persistence path.
- Ensure Vitest actually runs in CI.
- Implement or verify the health endpoint expected by deployment scripts.
- Validate manual dispatch behavior in the development deployment workflow.
- Verify CSP behavior with Next.js and Sanity.
- Confirm Hostinger deployment and backup/restore procedures.
- Provision and test VPS/OCI before enabling VPS deployment.

Update this document when the stack, persistence path, authentication, hosting or deployment workflows change.
